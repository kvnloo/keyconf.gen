import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { createCommunityApi } from '../lib/community-api.ts';
import { defaultBuild } from '../lib/build.ts';
import { parseSavedBuild, parseSavedBuildSummaries } from '../lib/community.ts';

const origin = 'https://keyconf.example';
const alice = 'google:verified-alice';
const bob = 'google:verified-bob';
const profile = {
  handle: 'alice_keys',
  displayName: 'Alice',
  bio: '',
  links: [],
};

function database(t) {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const file of readdirSync(new URL('../drizzle/', import.meta.url))
    .filter((file) => file.endsWith('.sql'))
    .sort())
    sqlite.exec(
      readFileSync(new URL(`../drizzle/${file}`, import.meta.url), 'utf8'),
    );
  t.after(() => sqlite.close());
  const queries = [];
  return {
    sqlite,
    queries,
    prepare(sql) {
      queries.push(sql);
      const statement = sqlite.prepare(sql);
      return {
        bind(...parameters) {
          return {
            run: () => statement.run(...parameters),
            async first(column) {
              const row = statement.get(...parameters);
              return row ? (column ? row[column] : { ...row }) : null;
            },
            async all() {
              return {
                results: statement
                  .all(...parameters)
                  .map((row) => ({ ...row })),
              };
            },
          };
        },
      };
    },
  };
}

const apiFor = (db, subject) =>
  createCommunityApi({
    db,
    resolveIdentity: async () => (subject ? { subject } : null),
  });

function request(path, method = 'GET', body, headers = {}) {
  return new Request(new URL(path, origin), {
    method,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    headers: { Origin: origin, 'Content-Type': 'application/json', ...headers },
  });
}

function privateResponse(response, status = 200) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(response.headers.get('Vary'), 'Cookie');
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
}

async function save(api, operationId, name = 'Private keyboard') {
  const response = await api.builds(
    request('/api/community/builds', 'POST', {
      operationId,
      build: { ...defaultBuild, name },
      subject: bob,
      accountId: 'forged-owner',
    }),
  );
  privateResponse(response);
  return parseSavedBuild(await response.json());
}

test('every account handler authenticates before database access, even with forged identity fields', async (t) => {
  const db = database(t);
  const api = apiFor(db, null);
  const forged = {
    'oai-authenticated-user-id': alice,
    Authorization: 'Bearer forged',
    Cookie: 'subject=alice',
  };
  const responses = await Promise.all([
    api.profile(
      request('/api/community/profile?subject=alice', 'GET', undefined, forged),
    ),
    api.profile(
      request(
        '/api/community/profile',
        'PATCH',
        { ...profile, subject: alice },
        forged,
      ),
    ),
    api.builds(request('/api/community/builds', 'GET', undefined, forged)),
    api.builds(
      request('/api/community/builds', 'POST', { subject: alice }, forged),
    ),
    api.build(
      request('/api/community/builds/invalid', 'GET', undefined, forged),
      'invalid',
    ),
  ]);
  for (const response of responses) {
    privateResponse(response, 401);
    assert.equal((await response.json()).error.code, 'authentication_required');
  }
  assert.equal(db.queries.length, 0);
});

test('profiles use the verified owner, normalize chosen fields and do not create public records', async (t) => {
  const db = database(t);
  const api = apiFor(db, alice);
  const empty = await api.profile(request('/api/community/profile'));
  privateResponse(empty);
  assert.deepEqual(await empty.json(), { profile: null });
  const updated = await api.profile(
    request('/api/community/profile', 'PATCH', {
      ...profile,
      handle: ' ALICE_KEYS ',
      subject: bob,
      email: 'private@example.com',
    }),
  );
  privateResponse(updated);
  assert.deepEqual(await updated.json(), { profile });
  assert.deepEqual(
    await (await api.profile(request('/api/community/profile'))).json(),
    { profile },
  );
  assert.deepEqual(
    await (
      await apiFor(db, bob).profile(request('/api/community/profile'))
    ).json(),
    { profile: null },
  );
  const duplicate = await apiFor(db, bob).profile(
    request('/api/community/profile', 'PATCH', profile),
  );
  privateResponse(duplicate, 409);
  assert.equal((await duplicate.json()).error.code, 'handle_taken');
  assert.equal(
    db.sqlite.prepare('SELECT count(*) AS n FROM community_publication').get()
      .n,
    0,
  );
});

test('profile and build mutations reject absent or cross-origin requests before storage', async (t) => {
  const db = database(t);
  const api = apiFor(db, alice);
  for (const suppliedOrigin of [null, 'https://other.example', 'null']) {
    for (const [handler, method, body] of [
      [(input) => api.profile(input), 'PATCH', profile],
      [
        (input) => api.builds(input),
        'POST',
        { operationId: 'origin-rejected-save', build: defaultBuild },
      ],
    ]) {
      const input = request('/api/community/action', method, body);
      if (suppliedOrigin === null) input.headers.delete('Origin');
      else input.headers.set('Origin', suppliedOrigin);
      const response = await handler(input);
      privateResponse(response, 403);
      assert.equal((await response.json()).error.code, 'invalid_origin');
    }
  }
  assert.equal(db.queries.length, 0);
});

test('immutable saves retry once, reject conflicting retries and isolate owner reads', async (t) => {
  const db = database(t);
  const api = apiFor(db, alice);
  const saved = await save(api, 'account-save-operation-001');
  assert.deepEqual(await save(api, 'account-save-operation-001'), saved);
  const conflict = await api.builds(
    request('/api/community/builds', 'POST', {
      operationId: 'account-save-operation-001',
      build: { ...defaultBuild, name: 'Different keyboard' },
    }),
  );
  privateResponse(conflict, 409);
  assert.equal((await conflict.json()).error.code, 'operation_conflict');
  const read = await api.build(
    request(`/api/community/builds/${saved.id}`),
    saved.id,
  );
  privateResponse(read);
  assert.deepEqual(parseSavedBuild(await read.json()), saved);
  const forbidden = await apiFor(db, bob).build(
    request(`/api/community/builds/${saved.id}`),
    saved.id,
  );
  privateResponse(forbidden, 404);
  assert.equal((await forbidden.json()).error.code, 'build_not_found');
  const bobPage = await apiFor(db, bob).builds(
    request('/api/community/builds'),
  );
  assert.deepEqual(await bobPage.json(), { items: [], next: null });
  assert.equal(
    db.sqlite.prepare('SELECT count(*) AS n FROM community_build').get().n,
    1,
  );
  assert.equal(
    db.sqlite.prepare('SELECT count(*) AS n FROM community_publication').get()
      .n,
    0,
  );
  assert.equal(JSON.stringify(saved).includes(alice), false);
  assert.equal(JSON.stringify(saved).includes('operationId'), false);
});

test('saved-build pages expose only owner summaries and preserve tied cursor boundaries', async (t) => {
  const db = database(t);
  const api = apiFor(db, alice);
  const expected = [];
  for (let index = 0; index < 27; index++)
    expected.push(
      (await save(api, `account-page-operation-${index}`, `Keyboard ${index}`))
        .id,
    );
  await save(
    apiFor(db, bob),
    'account-other-owner-001',
    'Other owner private keyboard',
  );
  db.sqlite.exec(
    "UPDATE community_build SET created_at='2026-09-06T00:00:00.000Z'",
  );
  const response = await api.builds(request('/api/community/builds'));
  privateResponse(response);
  const first = await response.json();
  assert.deepEqual(Object.keys(first).sort(), ['items', 'next']);
  assert.equal(parseSavedBuildSummaries(first.items).length, 25);
  assert.deepEqual(first.next, {
    createdAt: first.items.at(-1).createdAt,
    id: first.items.at(-1).id,
  });
  const params = new URLSearchParams({
    before: first.next.createdAt,
    id: first.next.id,
  });
  const nextResponse = await api.builds(
    request(`/api/community/builds?${params}`),
  );
  privateResponse(nextResponse);
  const last = await nextResponse.json();
  assert.equal(parseSavedBuildSummaries(last.items).length, 2);
  assert.equal(last.next, null);
  const items = [...first.items, ...last.items];
  assert.deepEqual(
    items.map((item) => item.id),
    expected.sort().reverse(),
  );
  for (const item of items)
    assert.deepEqual(Object.keys(item).sort(), ['createdAt', 'id', 'name']);
});

test('invalid cursors, identifiers, bodies and unsupported methods fail before storage', async (t) => {
  const db = database(t);
  const api = apiFor(db, alice);
  for (const query of [
    'id=valid-build-identifier',
    'before=2026-09-06T00%3A00%3A00.000Z',
    'before=bad&id=valid-build-identifier',
  ]) {
    const response = await api.builds(
      request(`/api/community/builds?${query}`),
    );
    privateResponse(response, 400);
    assert.equal((await response.json()).error.code, 'invalid_request');
  }
  privateResponse(
    await api.build(request('/api/community/builds/x'), '../private'),
    400,
  );
  privateResponse(
    await api.profile(
      request('/api/community/profile', 'PATCH', {
        ...profile,
        handle: 'admin',
      }),
    ),
    400,
  );
  privateResponse(
    await api.builds(
      request('/api/community/builds', 'POST', {
        operationId: 'bad',
        build: defaultBuild,
      }),
    ),
    400,
  );
  for (const input of [
    new Request(`${origin}/api/community/builds`, {
      method: 'POST',
      headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: '{broken',
    }),
    request(
      '/api/community/builds',
      'POST',
      {},
      { 'Content-Type': 'text/plain' },
    ),
  ])
    privateResponse(await api.builds(input), 400);
  privateResponse(
    await api.builds(
      request('/api/community/builds', 'POST', {
        data: 'x'.repeat(128 * 1024),
      }),
    ),
    413,
  );
  for (const [response, allow] of [
    [
      await api.profile(request('/api/community/profile', 'POST', {})),
      'GET, PATCH',
    ],
    [
      await api.builds(request('/api/community/builds', 'PUT', {})),
      'GET, POST',
    ],
    [
      await api.build(
        request('/api/community/builds/x', 'DELETE'),
        'valid-build-identifier',
      ),
      'GET',
    ],
  ]) {
    privateResponse(response, 405);
    assert.equal(response.headers.get('Allow'), allow);
  }
  assert.equal(db.queries.length, 0);
});

test('identity and database failures return private safe errors without internal details', async (t) => {
  const db = database(t);
  const identityFailure = createCommunityApi({
    db,
    resolveIdentity: async () => {
      throw new Error('private-provider-secret');
    },
  });
  const identityResponse = await identityFailure.profile(
    request('/api/community/profile'),
  );
  privateResponse(identityResponse, 503);
  assert.equal(
    (await identityResponse.text()).includes('private-provider-secret'),
    false,
  );
  assert.equal(db.queries.length, 0);
  db.sqlite.exec('DROP TABLE community_profile');
  const storageResponse = await apiFor(db, alice).profile(
    request('/api/community/profile'),
  );
  privateResponse(storageResponse, 503);
  const failure = await storageResponse.json();
  assert.equal(failure.error.code, 'storage_unavailable');
  assert.equal(JSON.stringify(failure).includes('community_profile'), false);
});

test('favorite requests use verified ownership and redact withdrawn publication details', async (t) => {
  const { publishBuild, withdrawPublication } =
    await import('../db/publications.ts');
  const db = database(t);
  const owner = apiFor(db, alice);
  const reader = apiFor(db, bob);
  await owner.profile(request('/api/community/profile', 'PATCH', profile));
  const saved = await save(owner, 'favorite-api-save-001');
  const publication = await publishBuild(db, alice, {
    operationId: 'favorite-api-publication-001',
    buildId: saved.id,
    title: 'Published favorite',
    note: '',
    kind: 'build',
  });
  const path = `/api/community/favorites/${publication.id}`;
  const add = () =>
    reader.favorite(request(path, 'PUT', { subject: alice }), publication.id);
  const first = await add();
  privateResponse(first);
  const receipt = await first.json();
  assert.deepEqual(await (await add()).json(), receipt);
  assert.deepEqual(
    await (await owner.favorites(request('/api/community/favorites'))).json(),
    { items: [], next: null },
  );
  await owner.favorite(request(path, 'DELETE', {}), publication.id);
  let page = await (
    await reader.favorites(request('/api/community/favorites'))
  ).json();
  assert.equal(page.items.length, 1);
  assert.equal(page.items[0].title, 'Published favorite');
  await withdrawPublication(db, alice, publication.id);
  page = await (
    await reader.favorites(request('/api/community/favorites'))
  ).json();
  assert.deepEqual(page.items, [
    {
      publicationId: publication.id,
      createdAt: receipt.createdAt,
      status: 'unavailable',
    },
  ]);
  privateResponse(await add(), 404);
  for (let i = 0; i < 2; i++)
    privateResponse(
      await reader.favorite(request(path, 'DELETE', {}), publication.id),
    );
  assert.deepEqual(
    await (await reader.favorites(request('/api/community/favorites'))).json(),
    { items: [], next: null },
  );
});

test('favorite request boundaries reject anonymous, cross-origin and malformed requests', async (t) => {
  const db = database(t);
  const anonymous = apiFor(db, null);
  const id = 'publication-test-001';
  privateResponse(
    await anonymous.favorites(request('/api/community/favorites')),
    401,
  );
  privateResponse(
    await anonymous.favorite(
      request('/api/community/favorites/x', 'PUT', { subject: alice }),
      id,
    ),
    401,
  );
  assert.equal(db.queries.length, 0);
  const api = apiFor(db, alice);
  for (const method of ['PUT', 'DELETE']) {
    privateResponse(
      await api.favorite(
        request(
          '/api/community/favorites/x',
          method,
          {},
          { Origin: 'https://attacker.example' },
        ),
        id,
      ),
      403,
    );
    privateResponse(
      await api.favorite(
        request('/api/community/favorites/x', method, {}),
        '../invalid',
      ),
      400,
    );
  }
  for (const suffix of [
    '?before=2026-09-06T00:00:00.000Z',
    '?id=publication-test-001',
    '?before=bad&id=publication-test-001',
  ])
    privateResponse(
      await api.favorites(request(`/api/community/favorites${suffix}`)),
      400,
    );
  const unsupported = await api.favorite(
    request('/api/community/favorites/x'),
    id,
  );
  privateResponse(unsupported, 405);
  assert.equal(unsupported.headers.get('Allow'), 'PUT, DELETE');
  assert.equal(db.queries.length, 0);
});

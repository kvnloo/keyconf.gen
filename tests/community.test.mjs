import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { defaultBuild } from '../lib/build.ts';
import { accessoryCatalog } from '../lib/build-accessories.ts';
import {
  CommunityError,
  communityRequest,
  communityErrorResponse,
  communityResponse,
  parseCommunityProfile,
  parseSaveBuildRequest,
  parseSavedBuild,
  parseSavedBuildSummaries,
} from '../lib/community.ts';
import {
  readProfile,
  saveProfile,
  listBuilds,
  readBuild,
  saveBuild,
} from '../db/community.ts';

function database(t) {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const migration of readdirSync(new URL('../drizzle/', import.meta.url))
    .filter((file) => file.endsWith('.sql'))
    .sort()) {
    sqlite.exec(
      readFileSync(new URL(`../drizzle/${migration}`, import.meta.url), 'utf8'),
    );
  }
  t.after(() => sqlite.close());
  return {
    sqlite,
    queries: [],
    prepare(sql) {
      this.queries.push(sql);
      const statement = sqlite.prepare(sql);
      return {
        bind(...parameters) {
          return {
            async run() {
              return statement.run(...parameters);
            },
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

const alice = 'private-platform-subject-alice';
const bob = 'private-platform-subject-bob';
const operationId = 'operation-id-00000001';
const profile = {
  links: [],
  handle: 'alice_keys',
  displayName: 'Alice',
  bio: 'Small keyboards.',
};
const save = (build = defaultBuild, operation = operationId) =>
  parseSaveBuildRequest({ operationId: operation, build });

test('profiles require chosen identity and enforce normalized unique handles in SQLite', async (t) => {
  const db = database(t);
  assert.equal(await readProfile(db, alice), null);
  assert.deepEqual(await listBuilds(db, alice), []);
  assert.deepEqual(
    await saveProfile(
      db,
      alice,
      parseCommunityProfile({ ...profile, handle: ' ALICE_keys ' }),
    ),
    profile,
  );
  await assert.rejects(saveProfile(db, bob, profile), {
    code: 'handle_taken',
    status: 409,
  });
  assert.equal(await readProfile(db, bob), null);
  assert.deepEqual(await readProfile(db, alice), profile);
  const changed = { ...profile, handle: 'alice_boards', bio: '' };
  assert.deepEqual(await saveProfile(db, alice, changed), changed);
  assert.deepEqual(
    await saveProfile(db, bob, { ...profile, displayName: 'Bob' }),
    { ...profile, displayName: 'Bob' },
  );
  assert.equal(
    db.sqlite.prepare('SELECT count(*) AS count FROM community_account').get()
      .count,
    2,
  );
  assert.deepEqual(db.sqlite.prepare('PRAGMA foreign_key_check').all(), []);
  assert.equal(
    JSON.stringify(await readProfile(db, alice)).includes(alice),
    false,
  );
});

test('account list bounds results and SQLite uses the owner and date index', async (t) => {
  const db = database(t);
  const first = await saveBuild(db, alice, save());
  const seed = db.sqlite
    .prepare('SELECT * FROM community_build WHERE id=?')
    .get(first.id);
  const insert = db.sqlite.prepare(
    'INSERT INTO community_build(id, account_id, operation_id, request_digest, name, payload, evidence, created_at) VALUES(?,?,?,?,?,?,?,?)',
  );
  for (let index = 0; index < 105; index++) {
    insert.run(
      `fixture-build-${String(index).padStart(4, '0')}`,
      seed.account_id,
      `fixture-operation-${index}`,
      seed.request_digest,
      `Copy ${index}`,
      seed.payload,
      seed.evidence,
      `2026-01-01T00:00:${String(index % 60).padStart(2, '0')}.000Z`,
    );
  }
  db.sqlite.exec('PRAGMA optimize');
  const builds = await listBuilds(db, alice);
  assert.equal(builds.length, 100);
  assert.deepEqual(await listBuilds(db, bob), []);
  const query = db.queries.find((sql) => sql.includes('LIMIT 100'));
  assert.ok(query);
  const plan = db.sqlite.prepare(`EXPLAIN QUERY PLAN ${query}`).all(alice);
  assert.ok(
    plan.some((row) => row.detail.includes('community_build_account_created')),
    JSON.stringify(plan),
  );
});

test('private builds are owner-only immutable snapshots with idempotent retries', async (t) => {
  const db = database(t);
  const [first, repeated] = await Promise.all([
    saveBuild(db, alice, save()),
    saveBuild(db, alice, save()),
  ]);
  assert.deepEqual(first, repeated);
  assert.deepEqual(await readBuild(db, alice, first.id), first);
  assert.deepEqual(parseSavedBuild(first), first);
  await assert.rejects(readBuild(db, bob, first.id), {
    code: 'build_not_found',
    status: 404,
  });
  await assert.rejects(readBuild(db, bob, "' OR 1=1 --"), {
    code: 'build_not_found',
  });
  assert.deepEqual(await listBuilds(db, bob), []);
  await assert.rejects(
    saveBuild(db, alice, save({ ...defaultBuild, name: 'Different draft' })),
    { code: 'operation_conflict', status: 409 },
  );
  assert.equal(
    (await readBuild(db, alice, first.id)).build.name,
    defaultBuild.name,
  );
  const otherOwner = await saveBuild(db, bob, save());
  assert.notEqual(otherOwner.id, first.id);
  const copy = await saveBuild(
    db,
    alice,
    save({ ...defaultBuild, name: 'New copy' }, 'operation-id-00000002'),
  );
  assert.notEqual(copy.id, first.id);
  const summaries = await listBuilds(db, alice);
  assert.equal(summaries.length, 2);
  assert.deepEqual(parseSavedBuildSummaries(summaries), summaries);
  assert.equal(JSON.stringify(first).includes(alice), false);
  assert.deepEqual(Object.keys(first).sort(), [
    'build',
    'createdAt',
    'id',
    'name',
  ]);
  assert.equal(
    db.sqlite.prepare('SELECT count(*) AS count FROM community_build').get()
      .count,
    3,
  );
});

test('account saves strip unselected imports and retain selected sources and accessory evidence', async (t) => {
  const db = database(t);
  const selected = {
    id: 'import:selected',
    category: 'switch',
    name: 'Imported switch',
    brand: 'Maker',
    detail: 'Unverified reference',
    source: 'https://example.com/switch?variant=1',
    evidence: 'unknown',
    family: 'unverified',
  };
  const unused = {
    ...selected,
    id: 'import:unused',
    source: 'https://example.com/private-library-reference',
  };
  const accessory = accessoryCatalog.find(
    (product) => product.kind === 'macropad',
  );
  assert.ok(accessory);
  const request = save({
    ...defaultBuild,
    selection: { ...defaultBuild.selection, switch: selected.id },
    customParts: [unused, selected],
    accessories: [
      {
        id: 'accessory-selection',
        productId: accessory.id,
        quantity: 1,
        location: { kind: 'external', position: 'right' },
      },
    ],
  });
  assert.deepEqual(request.build.customParts, [selected]);
  const result = await saveBuild(db, alice, request);
  const raw = db.sqlite
    .prepare('SELECT payload, evidence FROM community_build WHERE id=?')
    .get(result.id);
  assert.equal(raw.payload.includes(unused.source), false);
  assert.equal(raw.evidence.includes(unused.source), false);
  const evidence = JSON.parse(raw.evidence);
  assert.equal(
    evidence.components.find((part) => part.id === selected.id).evidence,
    'unknown',
  );
  assert.equal(evidence.accessoryReferences[0].source, accessory.source);
  assert.equal(
    evidence.accessoryCompatibility['accessory-selection'].status,
    'unknown',
  );
  assert.match(evidence.catalogDigest, /^[a-f0-9]{64}$/);
  assert.match(evidence.sound.accuracy, /full build match unverified/);
  assert.deepEqual(
    (await readBuild(db, alice, result.id)).build.accessories,
    request.build.accessories,
  );
});

test('invalid profiles, documents and response shapes are rejected', () => {
  for (const handle of [
    'admin',
    'OpenAI',
    'a',
    'has spaces',
    '_starts_bad',
    'x'.repeat(25),
  ]) {
    assert.throws(() => parseCommunityProfile({ ...profile, handle }), {
      code: 'invalid_request',
    });
  }
  for (const value of [
    { ...profile, displayName: '' },
    { ...profile, bio: 'x'.repeat(161) },
    { ...profile, displayName: 'bad\nname' },
    { email: 'alice@example.com' },
  ]) {
    assert.throws(() => parseCommunityProfile(value), {
      code: 'invalid_request',
    });
  }
  assert.throws(() => save({ ...defaultBuild, version: 2 }), {
    code: 'invalid_request',
  });
  assert.throws(() => save({ ...defaultBuild, name: 'x'.repeat(81) }), {
    code: 'invalid_request',
  });
  assert.throws(() => save(defaultBuild, 'short'), { code: 'invalid_request' });
  assert.throws(() => parseSavedBuildSummaries({ builds: [] }));
  assert.throws(() =>
    parseSavedBuild({
      id: 'x'.repeat(16),
      name: 'Build',
      createdAt: 'not-a-date',
      build: defaultBuild,
    }),
  );
});

test('same-origin JSON mutation boundary rejects missing and foreign origins and bounds streamed bytes', async () => {
  const url = 'https://keyconf.example/api/community/builds';
  const request = (headers = {}, body = '{}') =>
    new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body,
    });
  await assert.rejects(communityRequest(request()), {
    code: 'invalid_origin',
    status: 403,
  });
  await assert.rejects(
    communityRequest(request({ origin: 'https://evil.example' })),
    { code: 'invalid_origin' },
  );
  await assert.rejects(communityRequest(request({ origin: 'null' })), {
    code: 'invalid_origin',
  });
  await assert.rejects(
    communityRequest(
      request({
        origin: 'https://keyconf.example',
        'Content-Type': 'text/plain',
      }),
    ),
    { code: 'invalid_request' },
  );
  await assert.rejects(
    communityRequest(request({ origin: 'https://keyconf.example' }, '{broken')),
    { code: 'invalid_request' },
  );
  await assert.rejects(
    communityRequest(
      request({ origin: 'https://keyconf.example' }, 'é'.repeat(100)),
      150,
    ),
    { code: 'request_too_large', status: 413 },
  );
  assert.deepEqual(
    await communityRequest(request({ origin: 'https://keyconf.example' })),
    {},
  );
});

test('private responses and all application errors prevent caching and omit internal errors', async () => {
  const success = communityResponse({ profile: null });
  assert.equal(success.headers.get('Cache-Control'), 'private, no-store');
  for (const error of [
    new CommunityError('authentication_required', 'Sign in.', 401),
    new Error('SQL secret private_subject'),
  ]) {
    const response = communityErrorResponse(error);
    assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
    const data = await response.json();
    assert.equal(JSON.stringify(data).includes('private_subject'), false);
    assert.equal(typeof data.error.message, 'string');
  }
});

test('removed catalog IDs retain the stored snapshot and never silently substitute parts', async (t) => {
  const db = database(t);
  const result = await saveBuild(db, alice, save());
  const unsupported = {
    ...defaultBuild,
    selection: { ...defaultBuild.selection, switch: 'removed-catalog-part' },
  };
  db.sqlite
    .prepare('UPDATE community_build SET payload=? WHERE id=?')
    .run(JSON.stringify(unsupported), result.id);
  await assert.rejects(readBuild(db, alice, result.id), {
    code: 'saved_build_unavailable',
    status: 422,
  });
  assert.deepEqual(
    JSON.parse(
      db.sqlite
        .prepare('SELECT payload FROM community_build WHERE id=?')
        .get(result.id).payload,
    ),
    unsupported,
  );
});

test('creator links normalize and persist without exposing another account', async (t) => {
  const db = database(t);
  const linked = parseCommunityProfile({
    ...profile,
    links: [
      { label: ' Channel ', url: 'https://example.com' },
      { label: 'Commissions', url: 'https://example.com/builds' },
    ],
  });
  assert.deepEqual(linked.links[0], {
    label: 'Channel',
    url: 'https://example.com/',
  });
  await saveProfile(db, alice, linked);
  assert.deepEqual(await readProfile(db, alice), linked);
  assert.equal(await readProfile(db, bob), null);
  await saveProfile(db, alice, { ...linked, links: [] });
  assert.deepEqual((await readProfile(db, alice)).links, []);
  assert.deepEqual(
    parseCommunityProfile({
      handle: 'old_profile',
      displayName: 'Old profile',
      bio: '',
    }).links,
    [],
  );
});

test('creator links reject unsafe, duplicate and oversized values', () => {
  for (const links of [
    [{ label: 'Bad', url: 'javascript:alert(1)' }],
    [{ label: 'Bad', url: 'https://user:password@example.com/' }],
    [{ label: 'Bad', url: '/relative' }],
    [{ label: '', url: 'https://example.com' }],
    [{ label: 'bad\nlabel', url: 'https://example.com' }],
    [
      { label: 'A', url: 'https://example.com' },
      { label: 'B', url: 'https://example.com/' },
    ],
    Array.from({ length: 6 }, (_, i) => ({
      label: `Link ${i}`,
      url: `https://example.com/${i}`,
    })),
  ])
    assert.throws(() => parseCommunityProfile({ ...profile, links }), {
      code: 'invalid_request',
    });
});

test('creator-link migration preserves existing profiles and gives them an empty list', (t) => {
  const sqlite = new DatabaseSync(':memory:');
  t.after(() => sqlite.close());
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const file of [
    '0000_supreme_tiger_shark.sql',
    '0001_panoramic_ken_ellis.sql',
  ])
    sqlite.exec(
      readFileSync(new URL(`../drizzle/${file}`, import.meta.url), 'utf8'),
    );
  sqlite
    .prepare(
      'INSERT INTO community_account(id,subject,created_at) VALUES(?,?,?)',
    )
    .run('legacy-owner', 'google:legacy-subject', '2026-09-06T00:00:00Z');
  sqlite
    .prepare(
      'INSERT INTO community_profile(account_id,handle,display_name,bio) VALUES(?,?,?,?)',
    )
    .run(
      'legacy-owner',
      'legacy_builder',
      'Legacy Builder',
      'Custom commissions',
    );
  sqlite.exec(
    readFileSync(
      new URL('../drizzle/0002_far_famine.sql', import.meta.url),
      'utf8',
    ),
  );
  assert.deepEqual(
    {
      ...sqlite
        .prepare('SELECT handle,display_name,bio,links FROM community_profile')
        .get(),
    },
    {
      handle: 'legacy_builder',
      display_name: 'Legacy Builder',
      bio: 'Custom commissions',
      links: '[]',
    },
  );
});

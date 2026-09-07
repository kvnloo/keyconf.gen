import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultBuild } from '../lib/build.ts';
import { snapshotEvidence } from '../db/build-snapshot.ts';
import {
  CommunityClientError,
  createCommunityClient,
  parseOwnedPublicationPage,
  parseSavedBuildPage,
} from '../lib/community-client.ts';

const profile = {
  handle: 'alice_keys',
  displayName: 'Alice',
  bio: '',
  links: [],
};
const saved = {
  id: 'saved-build-00000001',
  name: 'Private keyboard',
  createdAt: '2026-09-06T00:00:00.000Z',
  build: { ...defaultBuild, name: 'Private keyboard' },
};
const summary = (id = saved.id) => ({
  id,
  name: saved.name,
  createdAt: saved.createdAt,
});
const publicationRequest = {
  operationId: 'creator-OPERATION_00001',
  buildId: saved.id,
  title: 'Forest keyboard',
  note: 'My saved revision.',
  kind: 'build',
};
const published = {
  operationId: publicationRequest.operationId,
  buildId: publicationRequest.buildId,
  id: 'publication-000001',
  title: publicationRequest.title,
  note: publicationRequest.note,
  release: { kind: 'build' },
  author: profile,
  build: { ...saved.build, name: publicationRequest.title },
  evidence: JSON.parse(await snapshotEvidence(saved.build)),
  customization: 'available',
  publishedAt: saved.createdAt,
  withdrawnAt: null,
};
const publicationSummary = (id = published.id) => ({
  id,
  title: published.title,
  kind: published.release.kind,
  publishedAt: published.publishedAt,
  withdrawnAt: null,
});
const publishedReceipt = {
  status: 'published',
  id: published.id,
  title: published.title,
  note: published.note,
  release: published.release,
  author: published.author,
  publishedAt: published.publishedAt,
};

function queued(...responses) {
  const calls = [];
  const client = createCommunityClient({
    fetch: async (url, init) => {
      calls.push({ url, ...init });
      const next = responses.shift();
      assert.ok(next, 'Unexpected account request');
      return next;
    },
  });
  return { client, calls };
}

function errorCode(code) {
  return (error) =>
    error instanceof CommunityClientError && error.code === code;
}

test('account operations use fixed paths, private requests and parsed response shapes', async () => {
  const page = { items: [summary()], next: null };
  const { client, calls } = queued(
    Response.json({ profile: null }),
    Response.json({ profile: { ...profile, privateField: 'hidden' } }),
    Response.json({ profile }),
    Response.json(page),
    Response.json(saved),
    Response.json(saved),
  );
  assert.equal(await client.readProfile(), null);
  assert.deepEqual(await client.readProfile(), profile);
  assert.deepEqual(
    await client.saveProfile({ ...profile, handle: ' ALICE_KEYS ' }),
    profile,
  );
  assert.deepEqual(await client.listBuilds(), page);
  const input = {
    operationId: 'client-save-operation-001',
    build: saved.build,
  };
  assert.deepEqual(await client.saveBuild(input), saved);
  assert.deepEqual(await client.readBuild(saved.id), saved);
  assert.deepEqual(
    calls.map(({ url, method }) => [url, method]),
    [
      ['/api/community/profile', 'GET'],
      ['/api/community/profile', 'GET'],
      ['/api/community/profile', 'PATCH'],
      ['/api/community/builds', 'GET'],
      ['/api/community/builds', 'POST'],
      [`/api/community/builds/${saved.id}`, 'GET'],
    ],
  );
  for (const call of calls) {
    assert.equal(call.credentials, 'same-origin');
    assert.equal(call.cache, 'no-store');
    assert.equal(call.redirect, 'error');
    assert.equal(call.headers.Accept, 'application/json');
    assert.ok(call.signal instanceof AbortSignal);
    if (call.method === 'GET') assert.equal(call.body, undefined);
    else assert.equal(call.headers['Content-Type'], 'application/json');
  }
  assert.deepEqual(JSON.parse(calls[2].body), profile);
  assert.deepEqual(JSON.parse(calls[4].body), input);
});

test('saved-build page parsing strips extra fields and enforces cursor correctness', () => {
  const first = { ...summary('saved-build-00000003'), privateField: 'hidden' };
  const second = summary('saved-build-00000002');
  assert.deepEqual(
    parseSavedBuildPage({
      items: [first, second],
      next: { id: second.id, createdAt: second.createdAt },
      owner: 'hidden',
    }),
    {
      items: [summary(first.id), second],
      next: { id: second.id, createdAt: second.createdAt },
    },
  );
  for (const value of [
    null,
    [],
    { items: [] },
    { items: {}, next: null },
    { items: Array.from({ length: 26 }, () => first), next: null },
    { items: [first, first], next: null },
    {
      items: [first, { ...first, createdAt: '2026-09-05T00:00:00.000Z' }],
      next: null,
    },
    { items: [second, first], next: null },
    { items: [{ ...first, createdAt: '2026-09-06T00:00:00Z' }], next: null },
    {
      items: [{ ...first, createdAt: '2026-02-30T00:00:00.000Z' }],
      next: null,
    },
    {
      items: [{ ...first, createdAt: '2026-09-06T01:00:00.000+01:00' }],
      next: null,
    },
    { items: [{ ...first, id: '../private' }], next: null },
    { items: [], next: { id: first.id, createdAt: first.createdAt } },
    { items: [first], next: { id: second.id, createdAt: first.createdAt } },
    {
      items: [first],
      next: { id: first.id, createdAt: '2026-09-05T00:00:00.000Z' },
    },
  ])
    assert.throws(
      () => parseSavedBuildPage(value),
      errorCode('invalid_response'),
    );
});

test('list requests encode the cursor and reject pages that repeat or precede its boundary', async () => {
  const cursor = { createdAt: saved.createdAt, id: 'saved-build-00000003' };
  const page = { items: [summary('saved-build-00000002')], next: null };
  const { client, calls } = queued(
    Response.json(page),
    Response.json({ items: [summary(cursor.id)], next: null }),
  );
  assert.deepEqual(await client.listBuilds(cursor), page);
  const url = new URL(calls[0].url, 'https://keyconf.example');
  assert.equal(url.searchParams.get('before'), cursor.createdAt);
  assert.equal(url.searchParams.get('id'), cursor.id);
  await assert.rejects(
    client.listBuilds(cursor),
    errorCode('invalid_response'),
  );
});

test('safe server error codes remain recognisable without displaying backend messages', async () => {
  const secret = 'SQL private-token <script>alert(1)</script>';
  for (const [status, payload, expected] of [
    [
      401,
      { error: { code: 'authentication_required', message: secret } },
      'authentication_required',
    ],
    [
      409,
      { error: { code: 'operation_conflict', message: secret } },
      'operation_conflict',
    ],
    [409, { error: { code: 'handle_taken', message: secret } }, 'handle_taken'],
    [
      500,
      { error: { code: 'internal_sql_error', message: secret } },
      'storage_unavailable',
    ],
  ]) {
    const { client } = queued(Response.json(payload, { status }));
    await assert.rejects(client.readProfile(), (error) => {
      assert.ok(errorCode(expected)(error));
      assert.equal(error.status, status);
      assert.equal(error.message.includes(secret), false);
      assert.ok(error.message.length < 250);
      return true;
    });
  }
  const { client } = queued(
    new Response('<html>Sign in</html>', {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    }),
  );
  await assert.rejects(
    client.readProfile(),
    errorCode('authentication_required'),
  );
});

test('malformed success responses and error pages never reach the account panel', async () => {
  for (const response of [
    new Response('<html>Service unavailable</html>', {
      headers: { 'Content-Type': 'text/html' },
    }),
    new Response('{broken', {
      headers: { 'Content-Type': 'application/json' },
    }),
    Response.json({}),
    Response.json({ profile: { ...profile, handle: 'admin' } }),
  ]) {
    const { client } = queued(response);
    await assert.rejects(client.readProfile(), errorCode('invalid_response'));
  }
  const nullSave = queued(Response.json({ profile: null })).client;
  await assert.rejects(
    nullSave.saveProfile(profile),
    errorCode('invalid_response'),
  );
  const wrongBuild = queued(
    Response.json({ ...saved, id: 'different-build-0001' }),
  ).client;
  await assert.rejects(
    wrongBuild.readBuild(saved.id),
    errorCode('invalid_response'),
  );
  const malformedBuild = queued(
    Response.json({ ...saved, build: null }),
  ).client;
  await assert.rejects(
    malformedBuild.saveBuild({
      operationId: 'client-save-operation-001',
      build: saved.build,
    }),
    errorCode('invalid_response'),
  );
});

test('account responses are bounded by bytes for declared and streamed bodies', async () => {
  let cancelled = false;
  const body = new ReadableStream({
    cancel() {
      cancelled = true;
    },
  });
  const declared = queued(
    new Response(body, {
      headers: {
        'Content-Length': String(256 * 1024 + 1),
        'Content-Type': 'application/json',
      },
    }),
  ).client;
  await assert.rejects(declared.readProfile(), errorCode('invalid_response'));
  assert.equal(cancelled, true);
  const streamed = queued(
    Response.json({ profile, extra: 'é'.repeat(140000) }),
  ).client;
  await assert.rejects(streamed.readProfile(), errorCode('invalid_response'));
  const oversizedError = queued(
    Response.json(
      { error: { code: 'handle_taken', message: 'private'.repeat(1000) } },
      { status: 409 },
    ),
  ).client;
  await assert.rejects(
    oversizedError.readProfile(),
    errorCode('storage_unavailable'),
  );
});

test('save retries send the original operation ID and never retry automatically', async () => {
  const calls = [];
  const client = createCommunityClient({
    fetch: async (_url, init) => {
      calls.push(JSON.parse(init.body));
      if (calls.length === 1) throw new Error('private network details');
      return Response.json(saved);
    },
  });
  const input = {
    operationId: 'client-retry-operation-001',
    build: saved.build,
  };
  await assert.rejects(client.saveBuild(input), errorCode('network_error'));
  assert.equal(calls.length, 1);
  assert.deepEqual(await client.saveBuild(input), saved);
  assert.deepEqual(calls, [input, input]);
});

test('invalid IDs, cursors and save inputs cannot cause outgoing requests', async () => {
  const { client, calls } = queued();
  for (const action of [
    () => client.readBuild('https://evil.example/steal'),
    () => client.readBuild('../profile'),
    () => client.listBuilds({ id: saved.id, createdAt: 'yesterday' }),
    () => client.saveBuild({ build: saved.build }),
    () => client.saveProfile({ ...profile, handle: 'admin' }),
  ])
    await assert.rejects(async () => action(), errorCode('invalid_request'));
  assert.equal(calls.length, 0);
});

test('cancellation is preserved before fetch and during an active account request', async () => {
  const preAborted = new AbortController();
  preAborted.abort();
  const { client, calls } = queued();
  await assert.rejects(client.readProfile({ signal: preAborted.signal }), {
    name: 'AbortError',
  });
  assert.equal(calls.length, 0);
  const controller = new AbortController();
  let started;
  const ready = new Promise((resolve) => {
    started = resolve;
  });
  const pendingClient = createCommunityClient({
    fetch: async (_url, { signal }) => {
      started();
      return new Promise((_resolve, reject) =>
        signal.addEventListener('abort', () => reject(signal.reason), {
          once: true,
        }),
      );
    },
  });
  const result = pendingClient.readProfile({ signal: controller.signal });
  await ready;
  controller.abort();
  await assert.rejects(result, { name: 'AbortError' });
});

test('request timeouts abort fetch and return a typed retryable error', async () => {
  let aborted = false;
  const client = createCommunityClient({
    timeoutMs: 5,
    fetch: async (_url, { signal }) =>
      new Promise((_resolve, reject) =>
        signal.addEventListener(
          'abort',
          () => {
            aborted = true;
            reject(signal.reason);
          },
          { once: true },
        ),
      ),
  });
  await assert.rejects(client.listBuilds(), errorCode('timeout'));
  assert.equal(aborted, true);
});

test('favorite pages validate ordering and discard withdrawn and private fields', async () => {
  const { parseFavoritePage } = await import('../lib/community-client.ts');
  const first = {
    publicationId: 'publication-000002',
    createdAt: saved.createdAt,
    status: 'available',
    title: 'Forest',
    kind: 'build',
    secret: 'private',
  };
  const last = {
    publicationId: 'publication-000001',
    createdAt: saved.createdAt,
    status: 'unavailable',
    title: 'Withdrawn secret',
  };
  const page = parseFavoritePage({ items: [first, last], next: null });
  assert.equal(JSON.stringify(page).includes('secret'), false);
  assert.deepEqual(page.items[1], {
    publicationId: last.publicationId,
    createdAt: last.createdAt,
    status: 'unavailable',
  });
  for (const value of [
    { items: [last, first], next: null },
    { items: [first, first], next: null },
    { items: [first], next: last },
    { items: [{ ...first, kind: 'unknown' }], next: null },
    { items: [{ ...first, createdAt: 'yesterday' }], next: null },
    { items: [], next: first },
  ])
    assert.throws(() => parseFavoritePage(value), { code: 'invalid_response' });
});

test('favorite client uses explicit repeatable state and checks acknowledgement identity', async () => {
  const publicationId = 'publication-000001';
  const responses = [
    { publicationId, createdAt: saved.createdAt },
    { publicationId, createdAt: saved.createdAt },
    { publicationId, removed: true },
    { publicationId: 'publication-000002', removed: true },
  ];
  const calls = [];
  const client = createCommunityClient({
    fetch: async (url, init) => {
      calls.push({ url, ...init });
      return Response.json(responses.shift());
    },
  });
  assert.deepEqual(await client.setFavorite(publicationId, true), {
    publicationId,
    favorite: true,
  });
  await client.setFavorite(publicationId, true);
  assert.deepEqual(await client.setFavorite(publicationId, false), {
    publicationId,
    favorite: false,
  });
  await assert.rejects(client.setFavorite(publicationId, false), {
    code: 'invalid_response',
  });
  assert.deepEqual(
    calls.map((call) => call.method),
    ['PUT', 'PUT', 'DELETE', 'DELETE'],
  );
  for (const call of calls) {
    assert.equal(call.url, '/api/community/favorites/' + publicationId);
    assert.equal(call.credentials, 'same-origin');
    assert.equal(call.body, '{}');
  }
  assert.throws(() => client.setFavorite('../bad', true), {
    code: 'invalid_request',
  });
});

test('favorites pagination rejects a repeated page and sends the validated cursor', async () => {
  const item = {
    publicationId: 'publication-000001',
    createdAt: saved.createdAt,
    status: 'unavailable',
  };
  let requested;
  const client = createCommunityClient({
    fetch: async (url) => {
      requested = url;
      return Response.json({ items: [item], next: null });
    },
  });
  await assert.rejects(client.listFavorites(item), {
    code: 'invalid_response',
  });
  assert.equal(
    new URL(requested, 'https://keyconf.example').searchParams.get('id'),
    item.publicationId,
  );
});

test('creator operations validate public receipts and discard snapshots and private fields', async () => {
  const page = { items: [publicationSummary()], next: null };
  const withdrawal = {
    id: published.id,
    withdrawnAt: '2026-09-06T01:00:00.000Z',
  };
  const { client, calls } = queued(
    Response.json(page),
    Response.json({
      ...published,
      accountId: 'private-account',
      author: { ...profile, email: 'private@example.com' },
    }),
    Response.json({ ...withdrawal, build: saved.build }),
    Response.json(withdrawal),
    Response.json({
      ...withdrawal,
      operationId: publicationRequest.operationId,
      buildId: publicationRequest.buildId,
    }),
  );
  assert.deepEqual(await client.listOwnedPublications(), page);
  assert.deepEqual(
    await client.publishBuild(publicationRequest),
    publishedReceipt,
  );
  assert.deepEqual(await client.withdrawPublication(published.id), withdrawal);
  assert.deepEqual(await client.withdrawPublication(published.id), withdrawal);
  assert.deepEqual(await client.publishBuild(publicationRequest), {
    status: 'withdrawn',
    ...withdrawal,
  });
  assert.deepEqual(
    calls.map(({ url, method }) => [url, method]),
    [
      ['/api/community/publications', 'GET'],
      ['/api/community/publications', 'POST'],
      ['/api/community/publications/' + published.id, 'DELETE'],
      ['/api/community/publications/' + published.id, 'DELETE'],
      ['/api/community/publications', 'POST'],
    ],
  );
  assert.deepEqual(JSON.parse(calls[1].body), publicationRequest);
  for (const call of calls) {
    assert.equal(call.credentials, 'same-origin');
    assert.equal(call.cache, 'no-store');
    assert.equal(call.redirect, 'error');
    assert.ok(call.signal instanceof AbortSignal);
    if (call.method === 'DELETE') assert.equal(call.body, '{}');
  }
});

test('creator drops match the acknowledged release metadata and validate request links', async () => {
  const request = {
    ...publicationRequest,
    kind: 'drop',
    availability: 'Enquire with the maker',
    externalUrl: 'https://maker.example/enquire',
  };
  const release = {
    kind: request.kind,
    availability: request.availability,
    externalUrl: request.externalUrl,
  };
  const { client, calls } = queued(Response.json({ ...published, release }));
  assert.deepEqual(await client.publishBuild(request), {
    ...publishedReceipt,
    release,
  });
  assert.deepEqual(JSON.parse(calls[0].body), request);
  for (const changed of [
    { ...release, kind: 'build' },
    { ...release, availability: 'In stock' },
    { ...release, externalUrl: 'https://other.example/' },
  ]) {
    const mismatch = queued(
      Response.json({ ...published, release: changed }),
    ).client;
    await assert.rejects(
      mismatch.publishBuild(request),
      errorCode('invalid_response'),
    );
  }
  assert.throws(
    () =>
      client.publishBuild({ ...request, externalUrl: 'javascript:alert(1)' }),
    errorCode('invalid_request'),
  );
  assert.equal(calls.length, 1);
});

test('creator receipts reject wrong withdrawal IDs, mismatched metadata and malformed snapshots', async () => {
  for (const value of [
    null,
    {},
    { ...published, id: '../private' },
    { ...published, title: 'Another publication' },
    { ...published, note: 'Another revision' },
    { ...published, release: { kind: 'drop' } },
    { ...published, author: { ...profile, handle: 'admin' } },
    { ...published, publishedAt: '2026-02-30T00:00:00.000Z' },
    { ...published, withdrawnAt: 'yesterday' },
    { ...published, customization: 'unknown' },
    { ...published, build: {} },
    { ...published, build: saved.build },
    { ...published, evidence: {} },
    { id: published.id, withdrawnAt: null },
  ]) {
    const { client } = queued(Response.json(value));
    await assert.rejects(
      client.publishBuild(publicationRequest),
      errorCode('invalid_response'),
    );
  }
  for (const value of [
    { id: 'publication-000002', withdrawnAt: published.publishedAt },
    { id: published.id, withdrawnAt: null },
    { id: published.id, withdrawnAt: '2026-02-30T00:00:00.000Z' },
    { id: published.id, removed: true },
  ]) {
    const { client } = queued(Response.json(value));
    await assert.rejects(
      client.withdrawPublication(published.id),
      errorCode('invalid_response'),
    );
  }
});

test('publication retries preserve the entire validated operation without automatic retries', async () => {
  const calls = [];
  const client = createCommunityClient({
    fetch: async (_url, init) => {
      calls.push(init.body);
      if (calls.length === 1)
        throw new Error('Lost successful publication response');
      return Response.json(published);
    },
  });
  const request = structuredClone(publicationRequest);
  await assert.rejects(
    client.publishBuild(request),
    errorCode('network_error'),
  );
  assert.equal(calls.length, 1);
  assert.deepEqual(await client.publishBuild(request), publishedReceipt);
  assert.equal(calls[0], calls[1]);
  assert.deepEqual(JSON.parse(calls[0]), publicationRequest);
  assert.deepEqual(request, publicationRequest);
});

test('owned publication pages validate descending dates and IDs including withdrawn entries', () => {
  const first = publicationSummary('publication-000003');
  const second = {
    ...publicationSummary('publication-000002'),
    withdrawnAt: '2026-09-06T01:00:00.000Z',
  };
  const third = {
    ...publicationSummary('publication-000004'),
    publishedAt: '2026-09-05T00:00:00.000Z',
  };
  const next = { id: third.id, publishedAt: third.publishedAt };
  assert.deepEqual(
    parseOwnedPublicationPage({
      items: [
        { ...first, accountId: 'private', build: saved.build },
        second,
        third,
      ],
      next,
    }),
    { items: [first, second, third], next },
  );
  for (const value of [
    { items: [], next },
    { items: [first] },
    { items: [first, first], next: null },
    { items: [second, first], next: null },
    { items: [third, first], next: null },
    { items: [first, { ...third, id: first.id }], next: null },
    { items: [first], next },
    { items: [first], next: { id: first.id, publishedAt: third.publishedAt } },
    { items: Array.from({ length: 26 }, () => first), next: null },
    ...[
      { title: '' },
      { title: 'hidden\nline' },
      { kind: 'unknown' },
      { publishedAt: '2026-02-30T00:00:00.000Z' },
      { id: '../private' },
      { withdrawnAt: undefined },
      { withdrawnAt: 'yesterday' },
    ].map((change) => ({ items: [{ ...first, ...change }], next: null })),
  ])
    assert.throws(
      () => parseOwnedPublicationPage(value),
      errorCode('invalid_response'),
    );
});

test('owned publication pagination rejects repeated or newer page boundaries', async () => {
  const before = {
    id: 'publication-000003',
    publishedAt: published.publishedAt,
  };
  const page = {
    items: [publicationSummary('publication-000002')],
    next: null,
  };
  const { client, calls } = queued(
    Response.json(page),
    Response.json({ items: [publicationSummary(before.id)], next: null }),
    Response.json({
      items: [publicationSummary('publication-000004')],
      next: null,
    }),
    Response.json({
      items: [
        { ...publicationSummary(), publishedAt: '2026-09-07T00:00:00.000Z' },
      ],
      next: null,
    }),
  );
  assert.deepEqual(await client.listOwnedPublications(before), page);
  const url = new URL(calls[0].url, 'https://keyconf.example');
  assert.equal(url.searchParams.get('before'), before.publishedAt);
  assert.equal(url.searchParams.get('id'), before.id);
  for (let index = 0; index < 3; index++)
    await assert.rejects(
      client.listOwnedPublications(before),
      errorCode('invalid_response'),
    );
});

test('invalid creator requests do not reach the transport', () => {
  const { client, calls } = queued();
  for (const action of [
    () =>
      client.publishBuild({ ...publicationRequest, operationId: undefined }),
    () =>
      client.publishBuild({
        ...publicationRequest,
        operationId: ' trimmed-operation-id ',
      }),
    () => client.publishBuild({ ...publicationRequest, buildId: '../private' }),
    () => client.publishBuild({ ...publicationRequest, title: '' }),
    () => client.withdrawPublication('../profile'),
    () => client.withdrawPublication(1234567890123456),
    () =>
      client.listOwnedPublications({
        id: published.id,
        publishedAt: 'yesterday',
      }),
  ])
    assert.throws(action, errorCode('invalid_request'));
  assert.equal(calls.length, 0);
});

test('publish receipts must match the exact operation and saved revision', async () => {
  for (const change of [
    { operationId: 'different-operation-001' },
    { buildId: 'different-saved-build-001' },
    { operationId: undefined },
    { buildId: undefined },
  ]) {
    const { client } = queued(Response.json({ ...published, ...change }));
    await assert.rejects(client.publishBuild(publicationRequest), {
      code: 'invalid_response',
    });
  }
});

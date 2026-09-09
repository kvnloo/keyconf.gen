import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { createCommunityApi } from '../lib/community-api.ts';
import { defaultBuild } from '../lib/build.ts';
import { parseSavedBuild } from '../lib/community.ts';
import { parseCollectionRequest, COLLECTION_LIMIT } from '../lib/collection.ts';
import {
  createCollection,
  readPublicCollection,
  withdrawCollection,
  listOwnedCollections,
  listPublicCollections,
} from '../db/collections.ts';
import { publishBuild, withdrawPublication } from '../db/publications.ts';

const origin = 'https://keyconf.example';
const alice = 'google:verified-alice';
const bob = 'google:verified-bob';
const profile = {
  handle: 'alice_keys',
  displayName: 'Alice',
  bio: '',
  links: [],
};
const bobProfile = {
  handle: 'bob_keys',
  displayName: 'Bob',
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
  return {
    prepare(sql) {
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

async function save(api, operationId, name) {
  const response = await api.builds(
    request('/api/community/builds', 'POST', {
      operationId,
      build: { ...defaultBuild, name },
    }),
  );
  assert.equal(response.status, 200);
  return parseSavedBuild(await response.json());
}

// A published build by `subject`, ready to be curated by anyone.
async function publish(db, subject, api, slug, title) {
  const saved = await save(api, `${slug}-save-000000`, title);
  return publishBuild(db, subject, {
    operationId: `${slug}-publish-000`,
    buildId: saved.id,
    title,
    note: '',
    kind: 'build',
  });
}

async function withProfiles(t) {
  const db = database(t);
  const owner = apiFor(db, alice);
  const other = apiFor(db, bob);
  await owner.profile(request('/api/community/profile', 'PATCH', profile));
  await other.profile(request('/api/community/profile', 'PATCH', bobProfile));
  return { db, owner, other };
}

test('a collection request needs an operation, a title and at least one build', () => {
  const valid = {
    operationId: 'collection-operation-01',
    title: 'Quiet boards',
    note: 'Built for shared rooms.',
    publicationIds: ['published-build-aaaaaaaa'],
  };
  assert.deepEqual(parseCollectionRequest(valid), valid);
  const rejected = {
    'not an object': [],
    'no operation': { ...valid, operationId: 'short' },
    'no title': { ...valid, title: '   ' },
    'no builds': { ...valid, publicationIds: [] },
    'a missing list': { ...valid, publicationIds: undefined },
    'a duplicate build': {
      ...valid,
      publicationIds: ['published-build-aaaaaaaa', 'published-build-aaaaaaaa'],
    },
    'a malformed build id': { ...valid, publicationIds: ['short'] },
    'a control character': { ...valid, title: 'Quiet\u0007boards' },
    'too many builds': {
      ...valid,
      publicationIds: Array.from(
        { length: COLLECTION_LIMIT + 1 },
        (_, index) => `published-build-${String(index).padStart(8, '0')}`,
      ),
    },
  };
  for (const label of Object.keys(rejected))
    assert.throws(
      () => parseCollectionRequest(rejected[label]),
      (error) => error.code === 'invalid_request',
      `should reject ${label}`,
    );
});

test('a collection curates published builds by anyone and keeps the chosen order', async (t) => {
  const { db, owner, other } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'curate-mine', 'My board');
  const theirs = await publish(db, bob, other, 'curate-theirs', 'Their board');
  const collection = await createCollection(db, alice, {
    operationId: 'collection-order-00001',
    title: 'Quiet boards',
    note: 'Two I keep coming back to.',
    publicationIds: [theirs.id, mine.id],
  });
  assert.deepEqual(
    collection.entries.map((entry) => entry.title),
    ['Their board', 'My board'],
  );
  assert.equal(collection.entries[0].author.handle, 'bob_keys');
  assert.equal(collection.author.handle, 'alice_keys');
  const read = await readPublicCollection(db, collection.id);
  assert.deepEqual(
    read.entries.map((entry) => entry.publicationId),
    [theirs.id, mine.id],
  );
});

test('a collection cannot hold a build that was never published or was withdrawn', async (t) => {
  const { db, owner } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'curate-gone', 'My board');
  await assert.rejects(
    createCollection(db, alice, {
      operationId: 'collection-missing-0001',
      title: 'Quiet boards',
      note: '',
      publicationIds: ['published-build-not-real-01'],
    }),
    (error) => error.code === 'publication_not_found',
  );
  await withdrawPublication(db, alice, mine.id);
  await assert.rejects(
    createCollection(db, alice, {
      operationId: 'collection-withdrawn-01',
      title: 'Quiet boards',
      note: '',
      publicationIds: [mine.id],
    }),
    (error) => error.code === 'publication_not_found',
  );
});

test('a build withdrawn after curation leaves the collection instead of showing a stale entry', async (t) => {
  const { db, owner, other } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'stale-mine', 'My board');
  const theirs = await publish(db, bob, other, 'stale-theirs', 'Their board');
  const collection = await createCollection(db, alice, {
    operationId: 'collection-stale-00001',
    title: 'Quiet boards',
    note: '',
    publicationIds: [mine.id, theirs.id],
  });
  assert.equal(collection.entries.length, 2);
  await withdrawPublication(db, bob, theirs.id);
  const read = await readPublicCollection(db, collection.id);
  assert.deepEqual(
    read.entries.map((entry) => entry.publicationId),
    [mine.id],
  );
});

test('the public index lists live collections newest first and counts what survives', async (t) => {
  const { db, owner, other } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'index-mine', 'My board');
  const theirs = await publish(db, bob, other, 'index-theirs', 'Their board');
  const first = await createCollection(db, alice, {
    operationId: 'collection-index-0001',
    title: 'Quiet boards',
    note: '',
    publicationIds: [mine.id, theirs.id],
  });
  const second = await createCollection(db, bob, {
    operationId: 'collection-index-0002',
    title: 'Loud boards',
    note: '',
    publicationIds: [theirs.id],
  });
  const page = await listPublicCollections(db);
  assert.deepEqual(
    page.items.map((item) => item.id),
    [second.id, first.id],
    'newest collection comes first',
  );
  assert.equal(page.next, null);
  assert.equal(page.items[0].title, 'Loud boards');
  assert.equal(page.items[0].author.handle, 'bob_keys');
  assert.equal(page.items[1].count, 2);
  // The curated list still names two builds, but only one is still published,
  // so the index has to say one rather than repeat the original count.
  await withdrawPublication(db, bob, theirs.id);
  const after = await listPublicCollections(db);
  assert.deepEqual(
    after.items.map((item) => [item.id, item.count]),
    [[first.id, 1]],
    'an emptied collection leaves the index and the survivor is recounted',
  );
  assert.equal(
    (await readPublicCollection(db, second.id)).entries.length,
    0,
    'the emptied collection still answers its own link',
  );
});

test('a withdrawn collection leaves the public index', async (t) => {
  const { db, owner } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'index-gone', 'My board');
  const collection = await createCollection(db, alice, {
    operationId: 'collection-index-0003',
    title: 'Quiet boards',
    note: '',
    publicationIds: [mine.id],
  });
  assert.equal((await listPublicCollections(db)).items.length, 1);
  await withdrawCollection(db, alice, collection.id);
  assert.deepEqual((await listPublicCollections(db)).items, []);
});

test('the public index pages through collections and refuses a malformed cursor', async (t) => {
  const { db, owner } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'index-page', 'My board');
  const created = [];
  for (let index = 0; index < 26; index += 1)
    created.push(
      await createCollection(db, alice, {
        operationId: `collection-page-${String(index).padStart(6, '0')}`,
        title: `Set ${index}`,
        note: '',
        publicationIds: [mine.id],
      }),
    );
  const page = await listPublicCollections(db);
  assert.equal(page.items.length, 25);
  assert.ok(page.next);
  const rest = await listPublicCollections(db, page.next);
  assert.equal(rest.items.length, 1);
  assert.equal(rest.next, null);
  const seen = new Set([...page.items, ...rest.items].map((item) => item.id));
  assert.equal(seen.size, 26, 'every collection appears once across the pages');
  assert.equal(seen.size, created.length);
  for (const cursor of [
    { createdAt: 'yesterday', id: page.next.id },
    { createdAt: page.next.createdAt, id: 'short' },
  ])
    await assert.rejects(
      listPublicCollections(db, cursor),
      (error) => error.code === 'invalid_request',
    );
});

test('a repeated collection operation returns the first result and refuses different content', async (t) => {
  const { db, owner } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'repeat-mine', 'My board');
  const input = {
    operationId: 'collection-repeat-00001',
    title: 'Quiet boards',
    note: '',
    publicationIds: [mine.id],
  };
  const first = await createCollection(db, alice, input);
  const again = await createCollection(db, alice, input);
  assert.equal(again.id, first.id);
  assert.equal(again.entries.length, 1);
  await assert.rejects(
    createCollection(db, alice, { ...input, title: 'Loud boards' }),
    (error) => error.code === 'operation_conflict',
  );
});

test('only the owner withdraws a collection, and withdrawal removes the public page', async (t) => {
  const { db, owner } = await withProfiles(t);
  const mine = await publish(db, alice, owner, 'withdraw-mine', 'My board');
  const collection = await createCollection(db, alice, {
    operationId: 'collection-withdraw-01',
    title: 'Quiet boards',
    note: '',
    publicationIds: [mine.id],
  });
  await assert.rejects(
    withdrawCollection(db, bob, collection.id),
    (error) => error.code === 'collection_not_found',
  );
  await readPublicCollection(db, collection.id);
  await withdrawCollection(db, alice, collection.id);
  await assert.rejects(
    readPublicCollection(db, collection.id),
    (error) => error.code === 'collection_not_found',
  );
});

test('a collection needs a creator profile and lists only its own account', async (t) => {
  const db = database(t);
  const owner = apiFor(db, alice);
  const other = apiFor(db, bob);
  await other.profile(request('/api/community/profile', 'PATCH', bobProfile));
  const theirs = await publish(db, bob, other, 'profile-theirs', 'Their board');
  await assert.rejects(
    createCollection(db, alice, {
      operationId: 'collection-noprofile-01',
      title: 'Quiet boards',
      note: '',
      publicationIds: [theirs.id],
    }),
    (error) => error.code === 'profile_required',
  );
  await owner.profile(request('/api/community/profile', 'PATCH', profile));
  const collection = await createCollection(db, alice, {
    operationId: 'collection-profile-0001',
    title: 'Quiet boards',
    note: '',
    publicationIds: [theirs.id],
  });
  assert.deepEqual(
    (await listOwnedCollections(db, alice)).items.map((item) => [
      item.title,
      item.count,
    ]),
    [['Quiet boards', 1]],
  );
  assert.deepEqual((await listOwnedCollections(db, bob)).items, []);
  assert.equal(collection.author.handle, 'alice_keys');
});

test('the collection endpoints authenticate before touching the database', async (t) => {
  const db = database(t);
  const api = apiFor(db, null);
  for (const response of await Promise.all([
    api.collections(request('/api/community/collections')),
    api.collections(
      request('/api/community/collections', 'POST', { subject: alice }),
    ),
    api.collection(request('/api/community/collections/x', 'DELETE', {}), 'x'),
  ])) {
    assert.equal(response.status, 401);
    assert.equal((await response.json()).error.code, 'authentication_required');
  }
});

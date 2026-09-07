import {
  submitProposalResponse,
  readProposalResponse,
  listProposalResponses,
} from '../db/proposal-responses.ts';
import {
  createProposal,
  listOwnedProposals,
  rotateProposalLink,
  readProposalPreview,
  closeProposal,
} from '../db/proposals.ts';
import {
  parseProposalRequest,
  parseProposalRotation,
  parseProposalResponse,
  parseProposalPreview,
} from '../lib/proposal.ts';
import {
  listOwnedPublications,
  publishBuild,
  readPublicPublication,
  withdrawPublication,
} from '../db/publications.ts';
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

function database(t, migrationCount = Infinity) {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const migration of readdirSync(new URL('../drizzle/', import.meta.url))
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .slice(0, migrationCount)) {
    sqlite.exec(
      readFileSync(new URL(`../drizzle/${migration}`, import.meta.url), 'utf8'),
    );
  }
  t.after(() => sqlite.close());
  /** @type {string[]} */
  const queries = [];
  return {
    sqlite,
    queries,
    batch(statements) {
      sqlite.exec('BEGIN');
      try {
        const results = statements.map((statement) => statement.run());
        sqlite.exec('COMMIT');
        return results;
      } catch (error) {
        sqlite.exec('ROLLBACK');
        throw error;
      }
    },
    prepare(sql) {
      queries.push(sql);
      const statement = sqlite.prepare(sql);
      return {
        bind(...parameters) {
          return {
            run() {
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
  assert.deepEqual(await listBuilds(db, alice), { items: [], next: null });
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

test('account list traverses all snapshots across timestamp ties using the owner index', async (t) => {
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
  assert.equal(builds.items.length, 25);
  const all = [...builds.items];
  let cursor = builds.next;
  while (cursor) {
    const page = await listBuilds(db, alice, cursor);
    assert.ok(page.items.length <= 25);
    all.push(...page.items);
    cursor = page.next;
  }
  assert.equal(all.length, 106);
  assert.equal(new Set(all.map((build) => build.id)).size, 106);
  assert.deepEqual(
    all.map((build) => build.id),
    db.sqlite
      .prepare(
        'SELECT id FROM community_build WHERE account_id=? ORDER BY created_at DESC,id DESC',
      )
      .all(seed.account_id)
      .map((row) => row.id),
  );
  assert.deepEqual(await listBuilds(db, bob, builds.next), {
    items: [],
    next: null,
  });
  for (const cursor of [
    { id: first.id, createdAt: 'invalid' },
    { id: first.id, createdAt: '2026-01-01' },
    { id: 'invalid', createdAt: first.createdAt },
  ])
    await assert.rejects(listBuilds(db, alice, cursor), {
      code: 'invalid_request',
      status: 400,
    });
  assert.deepEqual(Object.keys(all[0]).sort(), ['createdAt', 'id', 'name']);
  assert.deepEqual(await listBuilds(db, bob), { items: [], next: null });
  const query = db.queries.find((sql) => sql.includes('LIMIT 26'));
  if (typeof query !== 'string')
    throw new Error('Expected the indexed list query.');
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
  assert.deepEqual(await listBuilds(db, bob), { items: [], next: null });
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
  const { items: summaries } = await listBuilds(db, alice);
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
  await saveProfile(db, alice, profile);
  const legacyPayload = JSON.stringify({
    ...request.build,
    customParts: [unused, selected],
  });
  db.sqlite
    .prepare('UPDATE community_build SET payload=? WHERE id=?')
    .run(legacyPayload, result.id);
  const publication = await publishBuild(db, alice, {
    operationId: 'import-evidence-publication',
    buildId: result.id,
    title: 'Imported switch study',
    note: '',
    kind: 'build',
  });
  const damagedEvidence = structuredClone(evidence);
  Object.assign(damagedEvidence.accessoryReferences[0], {
    kind: 'artisan',
    placement: 'key',
    sizeU: 1,
    stem: 'mx',
  });
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run(JSON.stringify(damagedEvidence), result.id);
  await assert.rejects(readPublicPublication(db, publication.id), {
    code: 'saved_build_unavailable',
  });
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run(JSON.stringify(evidence), result.id);
  const publicRead = await readPublicPublication(db, publication.id);
  assert.deepEqual(publicRead.build.customParts, [selected]);
  assert.equal(JSON.stringify(publicRead).includes(unused.source), false);
  assert.equal(
    publicRead.evidence.components.find((part) => part.id === selected.id)
      .evidence,
    'unknown',
  );
  assert.equal(
    publicRead.evidence.accessoryReferences[0].source,
    accessory.source,
  );
  assert.deepEqual(publicRead.evidence.components, evidence.components);
  assert.deepEqual(publicRead.evidence.compatibility, evidence.compatibility);
  assert.equal(publicRead.evidence.sound.recording.groups, undefined);
  assert.equal(
    db.sqlite
      .prepare('SELECT payload FROM community_build WHERE id=?')
      .get(result.id).payload,
    legacyPayload,
  );

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

test('publications freeze a saved revision and chosen author, with private fields excluded', async (t) => {
  const db = database(t);
  const saved = await saveBuild(
    db,
    alice,
    save({ ...defaultBuild, name: 'Private client draft' }),
  );
  const request = {
    operationId: 'publication-operation-001',
    buildId: saved.id,
    title: 'Public release',
    note: 'Built for quiet typing.',
    kind: 'build',
  };
  await assert.rejects(publishBuild(db, alice, request), {
    code: 'profile_required',
  });
  await saveProfile(db, alice, profile);
  await assert.rejects(publishBuild(db, bob, request), {
    code: 'build_not_found',
  });
  const released = await publishBuild(db, alice, request);
  await saveProfile(db, alice, {
    ...profile,
    displayName: 'New name',
    bio: 'Changed',
  });
  await saveBuild(
    db,
    alice,
    save({ ...defaultBuild, caseColor: '#000000' }, 'another-save-operation'),
  );
  assert.deepEqual(await publishBuild(db, alice, request), released);
  const visible = await readPublicPublication(db, released.id);
  assert.equal(visible.author.displayName, 'Alice');
  assert.equal(visible.build.name, 'Public release');
  assert.equal(visible.build.caseColor, defaultBuild.caseColor);
  const serialized = JSON.stringify(visible);
  for (const privateValue of [
    alice,
    saved.id,
    request.operationId,
    'Private client draft',
  ])
    assert.equal(serialized.includes(privateValue), false);
  await assert.rejects(
    publishBuild(db, alice, { ...request, title: 'Different release' }),
    { code: 'operation_conflict' },
  );
});

test('publication withdrawal is owner-only, repeatable, and cannot be undone by retrying publish', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'publication-operation-002',
    buildId: saved.id,
    title: 'Drop',
    note: '',
    kind: 'drop',
    availability: 'Ask the maker',
    externalUrl: 'https://example.com/commissions',
  };
  const released = await publishBuild(db, alice, request);
  await assert.rejects(withdrawPublication(db, bob, released.id), {
    code: 'publication_not_found',
  });
  assert.equal(
    (await readPublicPublication(db, released.id)).withdrawnAt,
    null,
  );
  const withdrawn = await withdrawPublication(db, alice, released.id);
  assert.ok(withdrawn.withdrawnAt);
  assert.deepEqual(
    await withdrawPublication(db, alice, released.id),
    withdrawn,
  );
  await assert.rejects(readPublicPublication(db, released.id), {
    code: 'publication_not_found',
  });
  assert.deepEqual(await publishBuild(db, alice, request), withdrawn);
});

test('retired build parts cannot prevent withdrawal or silently change a published snapshot', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'retired-publication-001',
    buildId: saved.id,
    title: 'Historical build',
    note: '',
    kind: 'build',
  };
  const released = await publishBuild(db, alice, request);
  const retired = JSON.stringify({
    ...saved.build,
    selection: { ...saved.build.selection, case: 'retired-case' },
  });
  db.sqlite
    .prepare('UPDATE community_build SET payload=? WHERE id=?')
    .run(retired, saved.id);
  await assert.rejects(readPublicPublication(db, released.id), {
    code: 'saved_build_unavailable',
  });
  const receipt = await withdrawPublication(db, alice, released.id);
  assert.ok(receipt.withdrawnAt);
  assert.deepEqual(await publishBuild(db, alice, request), receipt);
  assert.deepEqual(await withdrawPublication(db, alice, released.id), receipt);
  assert.equal(
    db.sqlite
      .prepare('SELECT payload FROM community_build WHERE id=?')
      .get(saved.id).payload,
    retired,
  );
  await assert.rejects(readPublicPublication(db, released.id), {
    code: 'publication_not_found',
  });
});

test('invalid saved snapshots cannot create a publication or consume its operation key', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'invalid-publication-001',
    buildId: saved.id,
    title: 'Reviewed build',
    note: '',
    kind: 'build',
  };
  const original = db.sqlite
    .prepare('SELECT payload,evidence FROM community_build WHERE id=?')
    .get(saved.id);
  for (const [field, damaged] of [
    ['payload', '{broken'],
    ['evidence', '{broken'],
    [
      'payload',
      JSON.stringify({
        ...saved.build,
        selection: { ...saved.build.selection, case: 'retired-case' },
      }),
    ],
  ]) {
    db.sqlite
      .prepare(`UPDATE community_build SET ${field}=? WHERE id=?`)
      .run(damaged, saved.id);
    await assert.rejects(publishBuild(db, alice, request), {
      code: 'saved_build_unavailable',
    });
    assert.equal(
      db.sqlite.prepare('SELECT COUNT(*) AS n FROM community_publication').get()
        .n,
      0,
    );
    db.sqlite
      .prepare(`UPDATE community_build SET ${field}=? WHERE id=?`)
      .run(original[field], saved.id);
  }
  const released = await publishBuild(db, alice, request);
  db.sqlite.prepare('UPDATE community_profile SET links=?').run('{broken');
  assert.deepEqual(await publishBuild(db, alice, request), released);
});

test('concurrent publication retries converge and conflicting requests cannot overwrite the winner', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'concurrent-publication-001',
    buildId: saved.id,
    title: 'Release',
    note: '',
    kind: 'build',
  };
  const copies = await Promise.all([
    publishBuild(db, alice, request),
    publishBuild(db, alice, request),
  ]);
  assert.deepEqual(copies[0], copies[1]);
  const contested = { ...request, operationId: 'concurrent-publication-002' };
  const results = await Promise.allSettled([
    publishBuild(db, alice, contested),
    publishBuild(db, alice, { ...contested, title: 'Different' }),
  ]);
  assert.equal(
    results.filter((result) => result.status === 'fulfilled').length,
    1,
  );
  const failure = results.find((result) => result.status === 'rejected');
  assert.equal(failure.reason.code, 'operation_conflict');
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS n FROM community_publication').get()
      .n,
    2,
  );
});

test('owner publication pages have stable boundaries, retain withdrawn entries and exclude other accounts', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  await saveProfile(db, bob, { ...profile, handle: 'bob_keys' });
  const saved = await saveBuild(db, alice, save());
  const other = await saveBuild(db, bob, save());
  for (let i = 0; i < 28; i++)
    await publishBuild(db, alice, {
      operationId: `publication-page-${String(i).padStart(3, '0')}`,
      buildId: saved.id,
      title: `Build ${i}`,
      note: '',
      kind: 'build',
    });
  const foreign = await publishBuild(db, bob, {
    operationId: 'publication-page-other',
    buildId: other.id,
    title: 'Bob private management',
    note: '',
    kind: 'build',
  });
  db.sqlite
    .prepare('UPDATE community_publication SET published_at=?')
    .run('2026-09-06T00:00:00.000Z');
  const first = await listOwnedPublications(db, alice);
  assert.equal(first.items.length, 25);
  assert.ok(first.next);
  await withdrawPublication(db, alice, first.items[0].id);
  const second = await listOwnedPublications(db, alice, first.next);
  assert.equal(second.items.length, 3);
  assert.equal(second.next, null);
  const ids = [...first.items, ...second.items].map((item) => item.id);
  assert.equal(new Set(ids).size, 28);
  assert.equal(ids.includes(foreign.id), false);
  assert.ok((await listOwnedPublications(db, alice)).items[0].withdrawnAt);
  assert.equal(JSON.stringify(first).includes('payload'), false);
  assert.deepEqual(await listOwnedPublications(db, 'unknown-subject'), {
    items: [],
    next: null,
  });
  await assert.rejects(
    listOwnedPublications(db, alice, { id: 'bad', publishedAt: 'yesterday' }),
    { code: 'invalid_request' },
  );
  const query = db.queries.find(
    (sql) =>
      sql.includes('FROM community_publication WHERE account_id=') &&
      sql.includes('ORDER BY'),
  );
  const plan = db.sqlite.prepare(`EXPLAIN QUERY PLAN ${query}`).all(alice);
  assert.ok(
    plan.some((row) =>
      row.detail.includes('community_publication_account_published'),
    ),
  );
});

test('favorites are private, repeatable, paginated and redact withdrawn releases', async (t) => {
  const { addFavorite, removeFavorite, listFavorites } =
    await import('../db/favorites.ts');
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const releases = [];
  for (let i = 0; i < 27; i++) {
    const release = await publishBuild(db, alice, {
      operationId: `favorite-release-${String(i).padStart(3, '0')}`,
      buildId: saved.id,
      title: `Public title ${i}`,
      note: '',
      kind: 'build',
    });
    releases.push(release);
    const first = await addFavorite(db, bob, release.id);
    assert.deepEqual(await addFavorite(db, bob, release.id), first);
  }
  db.sqlite
    .prepare('UPDATE community_favorite SET created_at=?')
    .run('2026-09-06T00:00:00.000Z');
  const page = await listFavorites(db, bob);
  assert.equal(page.items.length, 25);
  const next = await listFavorites(db, bob, page.next);
  assert.equal(next.items.length, 2);
  assert.equal(next.next, null);
  assert.equal(
    new Set([...page.items, ...next.items].map((item) => item.publicationId))
      .size,
    27,
  );
  assert.deepEqual(await listFavorites(db, alice), { items: [], next: null });
  const target = page.items[0].publicationId;
  await removeFavorite(db, alice, target);
  assert.equal((await listFavorites(db, bob)).items.length, 25);
  await withdrawPublication(db, alice, target);
  const unavailable = (await listFavorites(db, bob)).items[0];
  assert.deepEqual(unavailable, {
    publicationId: target,
    createdAt: '2026-09-06T00:00:00.000Z',
    status: 'unavailable',
  });
  await assert.rejects(addFavorite(db, bob, target), {
    code: 'publication_not_found',
  });
  await removeFavorite(db, bob, target);
  await removeFavorite(db, bob, target);
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS n FROM community_favorite').get().n,
    26,
  );
  await assert.rejects(addFavorite(db, bob, saved.id), {
    code: 'publication_not_found',
  });
  await assert.rejects(addFavorite(db, bob, 'missing'), {
    code: 'publication_not_found',
  });
  const result = JSON.stringify(await listFavorites(db, bob));
  for (const secret of [
    'payload',
    'subject',
    'operationId',
    'accountId',
    saved.id,
  ])
    assert.equal(result.includes(secret), false);
  await assert.rejects(
    listFavorites(db, bob, {
      publicationId: target,
      createdAt: '2026-02-30T00:00:00.000Z',
    }),
    { code: 'invalid_request' },
  );
  const sql = db.queries.find(
    (sql) =>
      sql.includes('CASE WHEN p.withdrawn_at') &&
      !sql.includes('f.created_at<?'),
  );
  assert.ok(
    db.sqlite
      .prepare(`EXPLAIN QUERY PLAN ${sql}`)
      .all(bob)
      .some((row) => row.detail.includes('community_favorite_account_created')),
  );
});

test('publication evidence rejects malformed JSON values before writing and strips internal fields', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const evidence = JSON.parse(
    db.sqlite
      .prepare('SELECT evidence FROM community_build WHERE id=?')
      .get(saved.id).evidence,
  );
  const request = {
    operationId: 'validated-evidence-release',
    buildId: saved.id,
    title: 'Frozen evidence',
    note: '',
    kind: 'build',
  };
  const invalid = [
    null,
    {},
    { ...evidence, version: 2 },
    { ...evidence, components: [] },
    {
      ...evidence,
      accessoryCompatibility: {
        extra: { status: 'confirmed', reasons: [], sources: [] },
      },
    },
    { ...evidence, sound: { ...evidence.sound, volume: 99 } },
  ];
  const unsafe = structuredClone(evidence);
  unsafe.sound.recording.source = 'javascript:alert(1)';
  invalid.push(unsafe);
  const mismatch = structuredClone(evidence);
  mismatch.components[0].id = 'wrong-component';
  invalid.push(mismatch);
  for (const value of invalid) {
    db.sqlite
      .prepare('UPDATE community_build SET evidence=? WHERE id=?')
      .run(JSON.stringify(value), saved.id);
    await assert.rejects(publishBuild(db, alice, request), {
      code: 'saved_build_unavailable',
    });
    assert.equal(
      db.sqlite.prepare('SELECT COUNT(*) AS n FROM community_publication').get()
        .n,
      0,
    );
  }
  evidence.privateNote = 'private-sentinel';
  evidence.components[0].internal = 'private-sentinel';
  evidence.compatibility[0].internal = 'private-sentinel';
  evidence.sound.internal = 'private-sentinel';
  evidence.sound.recording.internal = 'private-sentinel';
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run(JSON.stringify(evidence), saved.id);
  const published = await publishBuild(db, alice, request);
  assert.equal(JSON.stringify(published).includes('private-sentinel'), false);
  assert.equal(published.evidence.sound.recording.groups, undefined);
  assert.equal(published.evidence.sound.kind, 'recorded');
  assert.equal(
    published.evidence.compatibility[0].detail,
    evidence.compatibility[0].detail,
  );
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run('null', saved.id);
  await assert.rejects(readPublicPublication(db, published.id), {
    code: 'saved_build_unavailable',
  });
  assert.ok((await withdrawPublication(db, alice, published.id)).withdrawnAt);
});

test('published snapshots preserve retired component, accessory and recording evidence without enabling editor restoration', async (t) => {
  const { catalog } = await import('../lib/catalog.ts');
  const { soundPacks } = await import('../lib/sound-packs.ts');
  const { parseBuild } = await import('../lib/build.ts');
  const db = database(t);
  await saveProfile(db, alice, profile);
  const accessory = accessoryCatalog.find((item) => item.kind === 'macropad');
  const saved = await saveBuild(
    db,
    alice,
    save({
      ...defaultBuild,
      accessories: [
        {
          id: 'historical-accessory',
          productId: accessory.id,
          quantity: 1,
          location: { kind: 'external', position: 'right' },
        },
      ],
    }),
  );
  const request = {
    operationId: 'historical-evidence-release',
    buildId: saved.id,
    title: 'Historical build',
    note: '',
    kind: 'build',
  };
  const release = await publishBuild(db, alice, request);
  assert.equal(release.customization, 'available');
  const { parseBuildSnapshot } = await import('../lib/build.ts');
  assert.throws(() =>
    parseBuildSnapshot({
      ...saved.build,
      customParts: [],
      selection: { ...saved.build.selection, switch: 'import:missing' },
    }),
  );

  const removals = [
    [catalog, saved.build.selection.case],
    [accessoryCatalog, accessory.id],
    [soundPacks, saved.build.audio.source],
  ];
  for (const [list, id] of removals) {
    const index = list.findIndex((item) => item.id === id);
    assert.ok(index >= 0);
    const [removed] = list.splice(index, 1);
    try {
      const singleRetirement = await readPublicPublication(db, release.id);
      assert.equal(singleRetirement.customization, 'unavailable');
      assert.deepEqual(singleRetirement.evidence, release.evidence);
      assert.throws(() => parseBuild(singleRetirement.build));
    } finally {
      list.splice(index, 0, removed);
    }
  }
  for (const [list, id] of removals) {
    const index = list.findIndex((item) => item.id === id);
    const [removed] = list.splice(index, 1);
    t.after(() => list.splice(index, 0, removed));
  }
  const historical = await readPublicPublication(db, release.id);
  assert.equal(historical.customization, 'unavailable');
  assert.deepEqual(historical.build, release.build);
  assert.deepEqual(historical.evidence, release.evidence);
  assert.throws(() => parseBuild(historical.build));
  assert.deepEqual(await publishBuild(db, alice, request), historical);
  await assert.rejects(
    publishBuild(db, alice, {
      ...request,
      operationId: 'new-retired-evidence-release',
    }),
    { code: 'saved_build_unavailable' },
  );
  assert.ok((await withdrawPublication(db, alice, release.id)).withdrawnAt);
});

test('proposal links freeze chosen identity and snapshots, store only token hashes, and close without leaking private fields', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(
    db,
    alice,
    save({ ...defaultBuild, name: 'Private commission notes' }),
  );
  const request = {
    operationId: 'proposal-operation-0001',
    buildId: saved.id,
    title: 'Client preview',
    brief: 'Review the colors.',
  };
  const created = await createProposal(db, alice, request);
  assert.match(created.token, /^[a-f0-9]{64}$/);
  const stored = db.sqlite.prepare('SELECT * FROM community_proposal').get();
  assert.equal(JSON.stringify(stored).includes(created.token), false);
  const preview = await readProposalPreview(db, created.token);
  assert.equal(preview.build.name, request.title);
  assert.equal(preview.author.displayName, profile.displayName);
  assert.equal(preview.customization, 'available');
  assert.deepEqual(
    parseProposalPreview({
      ...preview,
      token: created.token,
      subject: alice,
      customization: 'forged',
    }),
    preview,
  );
  for (const corrupt of [
    { ...preview, createdAt: 'yesterday' },
    { ...preview, title: 'Hidden\nline' },
    { ...preview, brief: 'x'.repeat(2001) },
    { ...preview, build: {} },
    { ...preview, evidence: {} },
    {
      ...preview,
      author: {
        ...preview.author,
        links: [{ label: 'Bad', url: 'javascript:alert(1)' }],
      },
    },
  ])
    assert.throws(() => parseProposalPreview(corrupt));

  assert.equal(
    JSON.stringify(preview).includes('Private commission notes'),
    false,
  );
  assert.equal(JSON.stringify(preview).includes(alice), false);
  assert.equal(JSON.stringify(preview).includes(stored.token_digest), false);
  await saveProfile(db, alice, { ...profile, displayName: 'Later name' });
  await saveBuild(
    db,
    alice,
    save({ ...defaultBuild, layout: '75' }, 'operation-new-private-copy'),
  );
  assert.deepEqual(await readProposalPreview(db, created.token), preview);
  assert.deepEqual(await createProposal(db, alice, request), {
    id: created.id,
    closedAt: null,
    token: null,
  });
  await assert.rejects(
    createProposal(db, alice, { ...request, brief: 'Changed request' }),
    { code: 'operation_conflict' },
  );
  await assert.rejects(createProposal(db, bob, request), {
    code: 'build_not_found',
  });
  await assert.rejects(closeProposal(db, bob, created.id), {
    code: 'proposal_not_found',
  });
  for (const token of [
    'bad',
    '0'.repeat(64),
    created.token.toUpperCase(),
    ` ${created.token}`,
  ])
    await assert.rejects(readProposalPreview(db, token), {
      code: 'proposal_not_found',
    });
  const closed = await closeProposal(db, alice, created.id);
  assert.ok(closed.closedAt);
  assert.deepEqual(await closeProposal(db, alice, created.id), closed);
  await assert.rejects(readProposalPreview(db, created.token), {
    code: 'proposal_not_found',
  });
  assert.deepEqual(await createProposal(db, alice, request), {
    ...closed,
    token: null,
  });
});

test('concurrent proposal creation returns only the winning token and one row', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'proposal-concurrent-0001',
    buildId: saved.id,
    title: 'Client preview',
    brief: '',
  };
  const results = await Promise.all([
    createProposal(db, alice, request),
    createProposal(db, alice, request),
  ]);
  assert.equal(new Set(results.map((result) => result.id)).size, 1);
  assert.equal(results.filter((result) => result.token !== null).length, 1);
  const winner = results.find((result) => result.token !== null);
  assert.equal((await readProposalPreview(db, winner.token)).id, winner.id);
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_proposal').get()
      .count,
    1,
  );
});

test('proposal creation rejects damaged snapshots and closure survives later damage', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'proposal-damage-0001',
    buildId: saved.id,
    title: 'Client preview',
    brief: '',
  };
  const original = db.sqlite
    .prepare('SELECT evidence FROM community_build WHERE id=?')
    .get(saved.id).evidence;
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run('null', saved.id);
  await assert.rejects(createProposal(db, alice, request), {
    code: 'saved_build_unavailable',
  });
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_proposal').get()
      .count,
    0,
  );
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run(original, saved.id);
  const created = await createProposal(db, alice, request);
  db.sqlite
    .prepare('UPDATE community_build SET payload=? WHERE id=?')
    .run('{}', saved.id);
  await assert.rejects(readProposalPreview(db, created.token), {
    code: 'saved_build_unavailable',
  });
  const closed = await closeProposal(db, alice, created.id);
  assert.ok(closed.closedAt);
  assert.deepEqual(await createProposal(db, alice, request), {
    ...closed,
    token: null,
  });
});

test('proposal boundary requires chosen creator identity and bounded plain text', async (t) => {
  const db = database(t);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'proposal-profile-0001',
    buildId: saved.id,
    title: 'Client preview',
    brief: '',
  };
  await assert.rejects(createProposal(db, alice, request), {
    code: 'profile_required',
  });
  for (const value of [
    null,
    { ...request, title: '' },
    { ...request, title: 'x'.repeat(81) },
    { ...request, brief: 'x'.repeat(2001) },
    { ...request, brief: 'bad\u0000' },
    { ...request, operationId: 'bad' },
  ])
    assert.throws(() => parseProposalRequest(value), {
      code: 'invalid_request',
    });
  assert.equal(
    parseProposalRequest({ ...request, brief: ' line 1\r\nline 2 ' }).brief,
    'line 1\nline 2',
  );
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_proposal').get()
      .count,
    0,
  );
});

test('conflicting concurrent proposals preserve one winner and retired catalog parts preserve its preview', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const request = {
    operationId: 'proposal-conflict-0001',
    buildId: saved.id,
    title: 'First title',
    brief: '',
  };
  const results = await Promise.allSettled([
    createProposal(db, alice, request),
    createProposal(db, alice, { ...request, title: 'Second title' }),
  ]);
  const success = results.find((item) => item.status === 'fulfilled');
  const failure = results.find((item) => item.status === 'rejected');
  assert.equal(failure.reason.code, 'operation_conflict');
  const created = success.value;
  const preview = await readProposalPreview(db, created.token);
  const winningRequest = { ...request, title: preview.title };
  const { catalog } = await import('../lib/catalog.ts');
  const index = catalog.findIndex(
    (part) => part.id === saved.build.selection.case,
  );
  assert.ok(index >= 0);
  const [removed] = catalog.splice(index, 1);
  try {
    assert.deepEqual(await readProposalPreview(db, created.token), {
      ...preview,
      customization: 'unavailable',
    });
    assert.deepEqual(await createProposal(db, alice, winningRequest), {
      id: created.id,
      closedAt: null,
      token: null,
    });
    await assert.rejects(
      createProposal(db, alice, {
        ...winningRequest,
        operationId: 'proposal-retired-new-0001',
      }),
      { code: 'saved_build_unavailable' },
    );
  } finally {
    catalog.splice(index, 0, removed);
  }
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_proposal').get()
      .count,
    1,
  );
  const tokenQuery = db.queries.find((query) =>
    query.includes('WHERE p.token_digest=?'),
  );
  const plan = db.sqlite
    .prepare(`EXPLAIN QUERY PLAN ${tokenQuery}`)
    .all('0'.repeat(64));
  assert.ok(
    plan.some((row) =>
      row.detail.includes('community_proposal_token_digest_unique'),
    ),
  );
});

test('owner proposal pages retain closed items and traverse timestamp ties without reading private payloads or tokens', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const created = [];
  for (let i = 0; i < 28; i++)
    created.push(
      await createProposal(db, alice, {
        operationId: `proposal-list-operation-${i}`,
        buildId: saved.id,
        title: `Proposal ${i}`,
        brief: 'Client-only brief.',
      }),
    );
  db.sqlite
    .prepare('UPDATE community_proposal SET created_at=?')
    .run('2026-09-01T00:00:00.000Z');
  const closed = await closeProposal(db, alice, created[0].id);
  db.sqlite
    .prepare('UPDATE community_build SET payload=? WHERE id=?')
    .run('{}', saved.id);
  const first = await listOwnedProposals(db, alice);
  assert.equal(first.items.length, 25);
  assert.ok(first.next);
  const second = await listOwnedProposals(db, alice, first.next);
  assert.equal(second.items.length, 3);
  assert.equal(second.next, null);
  const all = [...first.items, ...second.items];
  assert.deepEqual(
    all.map((item) => item.id),
    created
      .map((item) => item.id)
      .sort()
      .reverse(),
  );
  assert.equal(
    all.find((item) => item.id === closed.id).closedAt,
    closed.closedAt,
  );
  assert.deepEqual(await listOwnedProposals(db, bob, first.next), {
    items: [],
    next: null,
  });
  assert.deepEqual(Object.keys(all[0]).sort(), [
    'closedAt',
    'createdAt',
    'id',
    'title',
    'tokenVersion',
  ]);
  for (const cursor of [
    { id: 'invalid', createdAt: first.next.createdAt },
    { id: first.next.id, createdAt: 'invalid' },
    { id: first.next.id, createdAt: '2026-09-01' },
  ])
    await assert.rejects(listOwnedProposals(db, alice, cursor), {
      code: 'invalid_request',
    });
  const query = db.queries.find(
    (sql) =>
      sql.includes('FROM community_proposal WHERE account_id=') &&
      sql.includes('LIMIT 26'),
  );
  if (typeof query !== 'string')
    throw new Error('Expected the indexed list query.');
  const plan = db.sqlite.prepare(`EXPLAIN QUERY PLAN ${query}`).all(alice);
  assert.ok(
    plan.some((row) =>
      row.detail.includes('community_proposal_account_created'),
    ),
  );
  assert.doesNotMatch(query, /token_digest|payload|evidence|brief/);
});

test('proposal rotation invalidates old links, preserves the snapshot and replays without reissuing tokens', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const created = await createProposal(db, alice, {
    operationId: 'proposal-to-rotate-0001',
    buildId: saved.id,
    title: 'Client study',
    brief: '',
  });
  const original = await readProposalPreview(db, created.token);
  const request = {
    proposalId: created.id,
    operationId: 'rotate-operation-0001',
    expectedVersion: 0,
  };
  const rotated = await rotateProposalLink(db, alice, request);
  assert.equal(rotated.tokenVersion, 1);
  assert.match(rotated.token, /^[a-f0-9]{64}$/);
  await assert.rejects(readProposalPreview(db, created.token), {
    code: 'proposal_not_found',
  });
  assert.deepEqual(await readProposalPreview(db, rotated.token), original);
  assert.deepEqual(await rotateProposalLink(db, alice, request), {
    ...rotated,
    token: null,
  });
  const latest = await rotateProposalLink(db, alice, {
    ...request,
    operationId: 'rotate-operation-0002',
    expectedVersion: 1,
  });
  assert.equal(latest.tokenVersion, 2);
  assert.deepEqual(await rotateProposalLink(db, alice, request), {
    ...latest,
    token: null,
  });
  await assert.rejects(readProposalPreview(db, rotated.token), {
    code: 'proposal_not_found',
  });
  await assert.rejects(
    rotateProposalLink(db, alice, { ...request, expectedVersion: 2 }),
    { code: 'operation_conflict' },
  );
  await assert.rejects(rotateProposalLink(db, bob, request), {
    code: 'proposal_not_found',
  });
  assert.equal((await listOwnedProposals(db, alice)).items[0].tokenVersion, 2);
  const storage = JSON.stringify(
    db.sqlite.prepare('SELECT * FROM community_proposal_rotation').all(),
  );
  assert.equal(storage.includes(rotated.token), false);
  assert.equal(storage.includes(latest.token), false);
  const closed = await closeProposal(db, alice, created.id);
  assert.deepEqual(await rotateProposalLink(db, alice, request), {
    id: created.id,
    tokenVersion: 2,
    closedAt: closed.closedAt,
    token: null,
  });
  await assert.rejects(
    rotateProposalLink(db, alice, {
      ...request,
      operationId: 'rotate-after-close-0001',
      expectedVersion: 2,
    }),
    { code: 'proposal_not_found' },
  );
  await assert.rejects(readProposalPreview(db, latest.token), {
    code: 'proposal_not_found',
  });
});

test('concurrent rotations issue one winning token and reject competing operations at a stale version', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const created = await createProposal(db, alice, {
    operationId: 'proposal-rotate-race-0001',
    buildId: saved.id,
    title: 'Client study',
    brief: '',
  });
  const request = {
    proposalId: created.id,
    operationId: 'rotate-race-operation-0001',
    expectedVersion: 0,
  };
  const identical = await Promise.all([
    rotateProposalLink(db, alice, request),
    rotateProposalLink(db, alice, request),
  ]);
  assert.equal(identical.filter((row) => row.token !== null).length, 1);
  const winner = identical.find((row) => row.token !== null);
  assert.equal((await readProposalPreview(db, winner.token)).id, created.id);
  const competing = await Promise.allSettled([
    rotateProposalLink(db, alice, {
      ...request,
      operationId: 'rotate-competitor-one',
      expectedVersion: 1,
    }),
    rotateProposalLink(db, alice, {
      ...request,
      operationId: 'rotate-competitor-two',
      expectedVersion: 1,
    }),
  ]);
  assert.equal(competing.filter((row) => row.status === 'fulfilled').length, 1);
  assert.equal(
    competing.find((row) => row.status === 'rejected').reason.code,
    'operation_conflict',
  );
  assert.equal(
    db.sqlite
      .prepare('SELECT COUNT(*) AS count FROM community_proposal_rotation')
      .get().count,
    2,
  );
  const mixed = await Promise.allSettled([
    rotateProposalLink(db, alice, {
      ...request,
      operationId: 'rotate-same-id-conflict',
      expectedVersion: 2,
    }),
    rotateProposalLink(db, alice, {
      ...request,
      operationId: 'rotate-same-id-conflict',
      expectedVersion: 3,
    }),
  ]);
  assert.equal(mixed.filter((row) => row.status === 'fulfilled').length, 1);
  assert.equal(
    mixed.find((row) => row.status === 'rejected').reason.code,
    'operation_conflict',
  );
  assert.equal(
    db.sqlite.prepare('SELECT token_version FROM community_proposal').get()
      .token_version,
    3,
  );
});

test('failed rotation update rolls back issuance and closure wins a pending rotation', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const created = await createProposal(db, alice, {
    operationId: 'proposal-rotate-abort-0001',
    buildId: saved.id,
    title: 'Client study',
    brief: '',
  });
  const request = {
    proposalId: created.id,
    operationId: 'rotate-abort-operation-0001',
    expectedVersion: 0,
  };
  db.sqlite.exec(
    "CREATE TRIGGER fail_rotation BEFORE UPDATE OF token_digest ON community_proposal BEGIN SELECT RAISE(ABORT, 'rotation failed'); END",
  );
  await assert.rejects(
    rotateProposalLink(db, alice, request),
    /rotation failed/,
  );
  assert.equal(
    db.sqlite
      .prepare('SELECT COUNT(*) AS count FROM community_proposal_rotation')
      .get().count,
    0,
  );
  assert.equal((await readProposalPreview(db, created.token)).id, created.id);
  db.sqlite.exec('DROP TRIGGER fail_rotation');
  const batch = db.batch.bind(db);
  db.batch = (statements) => {
    db.sqlite
      .prepare('UPDATE community_proposal SET closed_at=? WHERE id=?')
      .run('2026-09-01T00:00:00.000Z', created.id);
    return batch(statements);
  };
  await assert.rejects(rotateProposalLink(db, alice, request), {
    code: 'proposal_not_found',
  });
  assert.equal(
    db.sqlite
      .prepare('SELECT COUNT(*) AS count FROM community_proposal_rotation')
      .get().count,
    0,
  );
  await assert.rejects(readProposalPreview(db, created.token), {
    code: 'proposal_not_found',
  });
  for (const expectedVersion of [
    -1,
    0.5,
    Infinity,
    Number.MAX_SAFE_INTEGER,
    '0',
  ])
    assert.throws(
      () => parseProposalRotation({ ...request, expectedVersion }),
      { code: 'invalid_request' },
    );
});

test('rotation migration preserves existing proposals and their original links', async (t) => {
  const db = database(t, 7);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const created = await createProposal(db, alice, {
    operationId: 'proposal-before-rotation-migration',
    buildId: saved.id,
    title: 'Existing preview',
    brief: '',
  });
  const before = {
    ...db.sqlite.prepare('SELECT * FROM community_proposal').get(),
  };
  const preview = await readProposalPreview(db, created.token);
  db.sqlite.exec(
    readFileSync(
      new URL('../drizzle/0007_proposal_link_rotation.sql', import.meta.url),
      'utf8',
    ),
  );
  assert.deepEqual(
    { ...db.sqlite.prepare('SELECT * FROM community_proposal').get() },
    { ...before, token_version: 0 },
  );
  assert.deepEqual(await readProposalPreview(db, created.token), preview);
  const rotated = await rotateProposalLink(db, alice, {
    proposalId: created.id,
    operationId: 'rotate-migrated-proposal',
    expectedVersion: 0,
  });
  assert.deepEqual(await readProposalPreview(db, rotated.token), preview);
});

test('client responses freeze normalized builds and chosen authors without changing the proposal', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  await saveProfile(db, bob, {
    ...profile,
    handle: 'bob_keys',
    displayName: 'Bob',
  });
  const saved = await saveBuild(db, alice, save());
  const proposal = await createProposal(db, alice, {
    operationId: 'proposal-client-reply-0001',
    buildId: saved.id,
    title: 'Client preview',
    brief: 'Try the colors.',
  });
  const original = await readProposalPreview(db, proposal.token);
  const request = {
    operationId: 'client-response-0001',
    note: '  Cream accents please.  ',
    build: {
      ...defaultBuild,
      layout: '75',
      customParts: [
        {
          id: 'import:unused-secret',
          category: 'case',
          name: 'Unused private listing',
          brand: 'Maker',
          detail: 'Private library item',
          source: 'https://example.com/private-listing',
          family: 'unknown',
          evidence: 'unknown',
        },
      ],
    },
  };
  const accepted = await submitProposalResponse(
    db,
    bob,
    proposal.token,
    request,
  );
  const response = await readProposalResponse(db, alice, accepted.id);
  assert.equal(response.build.layout, '75');
  assert.equal(response.note, 'Cream accents please.');
  assert.equal(response.author.displayName, 'Bob');
  assert.equal(response.linkVersion, 0);
  assert.deepEqual(response.build.customParts, []);
  assert.equal(JSON.stringify(response).includes('private-listing'), false);
  assert.equal(JSON.stringify(response).includes(bob), false);
  assert.equal(JSON.stringify(response).includes(proposal.token), false);
  assert.deepEqual(await readProposalPreview(db, proposal.token), original);
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_build').get()
      .count,
    1,
  );
  await saveProfile(db, bob, {
    ...profile,
    handle: 'bob_keys',
    displayName: 'Later Bob',
  });
  assert.deepEqual(await readProposalResponse(db, bob, accepted.id), response);
  assert.deepEqual(
    await submitProposalResponse(db, bob, proposal.token, request),
    accepted,
  );
  await assert.rejects(
    submitProposalResponse(db, bob, proposal.token, {
      ...request,
      note: 'Other content',
    }),
    { code: 'operation_conflict' },
  );
  const charlie = 'trusted-google-charlie';
  await saveProfile(db, charlie, {
    ...profile,
    handle: 'charlie_keys',
    displayName: 'Charlie',
  });
  await readProposalPreview(db, proposal.token);
  await assert.rejects(readProposalResponse(db, charlie, accepted.id), {
    code: 'response_not_found',
  });
  assert.deepEqual(await listProposalResponses(db, charlie, proposal.id), {
    items: [],
    next: null,
  });
  await closeProposal(db, alice, proposal.id);
  assert.deepEqual(
    await readProposalResponse(db, alice, accepted.id),
    response,
  );
  assert.deepEqual(await readProposalResponse(db, bob, accepted.id), response);
  assert.equal(
    (await listProposalResponses(db, bob, proposal.id)).items[0].id,
    accepted.id,
  );
  await assert.rejects(
    submitProposalResponse(db, bob, proposal.token, request),
    { code: 'proposal_not_found' },
  );
});

test('concurrent response retries converge, conflicting content cannot replace them, and retired builds remain reviewable', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  await saveProfile(db, bob, { ...profile, handle: 'bob_keys' });
  const saved = await saveBuild(db, alice, save());
  const proposal = await createProposal(db, alice, {
    operationId: 'proposal-reply-race-0001',
    buildId: saved.id,
    title: 'Client preview',
    brief: '',
  });
  const request = {
    operationId: 'reply-race-operation-0001',
    build: defaultBuild,
    note: 'Keep these parts.',
  };
  const results = await Promise.all([
    submitProposalResponse(db, bob, proposal.token, request),
    submitProposalResponse(db, bob, proposal.token, request),
  ]);
  assert.deepEqual(results[0], results[1]);
  assert.equal(
    db.sqlite
      .prepare('SELECT COUNT(*) AS count FROM community_proposal_response')
      .get().count,
    1,
  );
  const conflicts = await Promise.allSettled([
    submitProposalResponse(db, bob, proposal.token, {
      ...request,
      operationId: 'reply-conflicting-operation',
      note: 'One',
    }),
    submitProposalResponse(db, bob, proposal.token, {
      ...request,
      operationId: 'reply-conflicting-operation',
      note: 'Two',
    }),
  ]);
  assert.equal(conflicts.filter((row) => row.status === 'fulfilled').length, 1);
  assert.equal(
    conflicts.find((row) => row.status === 'rejected').reason.code,
    'operation_conflict',
  );
  const response = await readProposalResponse(db, bob, results[0].id);
  const { catalog } = await import('../lib/catalog.ts');
  const index = catalog.findIndex(
    (part) => part.id === defaultBuild.selection.case,
  );
  const [removed] = catalog.splice(index, 1);
  try {
    assert.deepEqual(
      await readProposalResponse(db, alice, response.id),
      response,
    );
    assert.deepEqual(
      await submitProposalResponse(db, bob, proposal.token, request),
      results[0],
    );
    await assert.rejects(
      submitProposalResponse(db, bob, proposal.token, {
        ...request,
        operationId: 'new-unsupported-response',
      }),
      { code: 'invalid_request' },
    );
  } finally {
    catalog.splice(index, 0, removed);
  }
  assert.equal(
    db.sqlite
      .prepare('SELECT COUNT(*) AS count FROM community_proposal_response')
      .get().count,
    2,
  );
});

test('closing or rotating during submission blocks the guarded response insert', async (t) => {
  for (const action of ['close', 'rotate']) {
    const db = database(t);
    await saveProfile(db, alice, profile);
    await saveProfile(db, bob, { ...profile, handle: 'bob_keys' });
    const saved = await saveBuild(db, alice, save());
    const proposal = await createProposal(db, alice, {
      operationId: `proposal-reply-${action}-0001`,
      buildId: saved.id,
      title: 'Client preview',
      brief: '',
    });
    const prepare = db.prepare.bind(db);
    db.prepare = (sql) => {
      const statement = prepare(sql);
      if (!sql.includes('INSERT INTO community_proposal_response'))
        return statement;
      return {
        bind(...args) {
          const bound = statement.bind(...args);
          return {
            ...bound,
            async run() {
              if (action === 'close')
                await closeProposal(db, alice, proposal.id);
              else
                await rotateProposalLink(db, alice, {
                  proposalId: proposal.id,
                  operationId: 'rotate-during-response-0001',
                  expectedVersion: 0,
                });
              return bound.run();
            },
          };
        },
      };
    };
    await assert.rejects(
      submitProposalResponse(db, bob, proposal.token, {
        operationId: 'response-after-invalidated-link',
        build: defaultBuild,
        note: '',
      }),
      { code: 'proposal_not_found' },
    );
    assert.equal(
      db.sqlite
        .prepare('SELECT COUNT(*) AS count FROM community_proposal_response')
        .get().count,
      0,
    );
    assert.equal(
      db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_build').get()
        .count,
      1,
    );
  }
});

test('response validation rejects invalid builds, notes, tokens and missing identities without creating records', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const proposal = await createProposal(db, alice, {
    operationId: 'proposal-response-validation',
    buildId: saved.id,
    title: 'Client preview',
    brief: '',
  });
  const request = {
    operationId: 'response-validation-0001',
    build: defaultBuild,
    note: '',
  };
  await assert.rejects(
    submitProposalResponse(db, bob, proposal.token, request),
    { code: 'profile_required' },
  );
  await assert.rejects(
    submitProposalResponse(db, alice, '0'.repeat(64), request),
    { code: 'proposal_not_found' },
  );
  for (const value of [
    null,
    { ...request, build: {} },
    { ...request, note: 'x'.repeat(2001) },
    { ...request, note: 'bad\u0000note' },
    { ...request, operationId: 'bad' },
  ])
    assert.throws(() => parseProposalResponse(value), {
      code: 'invalid_request',
    });
  await assert.rejects(
    submitProposalResponse(db, alice, proposal.token, {
      ...request,
      build: {
        ...defaultBuild,
        selection: { ...defaultBuild.selection, case: 'unsupported-case' },
      },
    }),
    { code: 'invalid_request' },
  );
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_account').get()
      .count,
    1,
  );
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_build').get()
      .count,
    1,
  );
  assert.equal(
    db.sqlite
      .prepare('SELECT COUNT(*) AS count FROM community_proposal_response')
      .get().count,
    0,
  );
});

test('response lists paginate by owner or author and record the server-selected link version', async (t) => {
  const db = database(t);
  await saveProfile(db, alice, profile);
  await saveProfile(db, bob, {
    ...profile,
    handle: 'bob_keys',
    displayName: 'Bob',
  });
  const charlie = 'trusted-google-charlie';
  await saveProfile(db, charlie, {
    ...profile,
    handle: 'charlie_keys',
    displayName: 'Charlie',
  });
  const saved = await saveBuild(db, alice, save());
  const proposal = await createProposal(db, alice, {
    operationId: 'proposal-paged-responses',
    buildId: saved.id,
    title: 'Client preview',
    brief: '',
  });
  const rotated = await rotateProposalLink(db, alice, {
    proposalId: proposal.id,
    operationId: 'rotate-before-paged-responses',
    expectedVersion: 0,
  });
  const own = [];
  for (let i = 0; i < 28; i++)
    own.push(
      await submitProposalResponse(db, bob, rotated.token, {
        operationId: `paged-client-response-${i}`,
        build: defaultBuild,
        note: 'Private response note.',
        linkVersion: 99,
        author: { displayName: 'Forged' },
        evidence: { approved: true },
      }),
    );
  const other = await submitProposalResponse(db, charlie, rotated.token, {
    operationId: 'paged-client-response-0',
    build: defaultBuild,
    note: 'Another client.',
  });
  assert.equal((await readProposalResponse(db, bob, own[0].id)).linkVersion, 1);
  assert.equal(
    (await readProposalResponse(db, bob, own[0].id)).author.displayName,
    'Bob',
  );
  await assert.rejects(
    submitProposalResponse(db, bob, proposal.token, {
      operationId: 'paged-client-response-0',
      build: defaultBuild,
      note: 'Private response note.',
    }),
    { code: 'proposal_not_found' },
  );
  db.sqlite
    .prepare('UPDATE community_proposal_response SET created_at=?')
    .run('2026-09-01T00:00:00.000Z');
  const first = await listProposalResponses(db, alice, proposal.id);
  const second = await listProposalResponses(
    db,
    alice,
    proposal.id,
    first.next,
  );
  assert.equal(first.items.length, 25);
  assert.equal(second.items.length, 4);
  assert.equal(second.next, null);
  assert.deepEqual(
    [...first.items, ...second.items].map((item) => item.id),
    [...own, other]
      .map((item) => item.id)
      .sort()
      .reverse(),
  );
  const clientFirst = await listProposalResponses(db, bob, proposal.id);
  const clientLast = await listProposalResponses(
    db,
    bob,
    proposal.id,
    clientFirst.next,
  );
  assert.equal(clientFirst.items.length + clientLast.items.length, 28);
  assert.equal(
    (await listProposalResponses(db, charlie, proposal.id)).items[0].id,
    other.id,
  );
  assert.deepEqual(
    await listProposalResponses(db, 'unrelated-subject', proposal.id),
    { items: [], next: null },
  );
  assert.deepEqual(Object.keys(first.items[0]).sort(), [
    'author',
    'createdAt',
    'id',
    'linkVersion',
  ]);
  for (const cursor of [
    { id: 'bad', createdAt: first.next.createdAt },
    { id: first.next.id, createdAt: '2026-09-01' },
  ])
    await assert.rejects(
      listProposalResponses(db, alice, proposal.id, cursor),
      { code: 'invalid_request' },
    );
  const query = db.queries.find(
    (sql) =>
      sql.includes('SELECT r.id,r.author,r.link_version') &&
      sql.includes('LIMIT 26'),
  );
  const plan = db.sqlite
    .prepare(`EXPLAIN QUERY PLAN ${query}`)
    .all(alice, proposal.id);
  assert.ok(
    plan.some((row) =>
      row.detail.includes('community_proposal_response_created'),
    ),
  );
  assert.equal(
    db.sqlite.prepare('SELECT COUNT(*) AS count FROM community_build').get()
      .count,
    1,
  );
});

test('imported accessory snapshots preserve variant evidence through retries and publication', async (t) => {
  const { createImportedAccessory } =
    await import('../lib/imported-accessories.ts');
  const { newAccessorySelection } = await import('../lib/build-accessories.ts');
  const db = database(t);
  const legacy = await saveBuild(db, alice, save());
  assert.deepEqual(
    await saveBuild(
      db,
      alice,
      save({ ...defaultBuild, customAccessories: [] }),
    ),
    legacy,
  );
  const product = await createImportedAccessory({
    origin: 'import',
    name: 'Client display',
    brand: 'Maker',
    detail: 'Unverified reference',
    source: 'https://example.com/display?variant=amber',
    sku: 'AMBER-42',
    observedAt: '2026-09-06T00:00:00.000Z',
    method: 'Pasted JSON-LD',
    fit: 'unknown',
    geometry: 'unavailable',
    kind: 'screen',
    placement: 'external',
    sizeU: null,
    stem: null,
  });
  const selected = newAccessorySelection(product.id, [product]);
  const request = save(
    { ...defaultBuild, customAccessories: [product], accessories: [selected] },
    'imported-accessory-operation',
  );
  const saved = await saveBuild(db, alice, request);
  assert.deepEqual(await saveBuild(db, alice, request), saved);
  assert.deepEqual(
    (await readBuild(db, alice, saved.id)).build.customAccessories,
    [product],
  );
  await saveProfile(db, alice, profile);
  const receipt = await publishBuild(db, alice, {
    operationId: 'imported-accessory-publication',
    buildId: saved.id,
    title: 'Display study',
    note: '',
    kind: 'build',
  });
  const publication = await readPublicPublication(db, receipt.id);
  assert.deepEqual(publication.evidence.accessoryReferences, [product]);
  assert.equal(
    publication.evidence.accessoryCompatibility[selected.id].status,
    'unknown',
  );
  const forged = structuredClone(publication.evidence);
  forged.accessoryReferences[0].source = 'https://example.com/substitution';
  db.sqlite
    .prepare('UPDATE community_build SET evidence=? WHERE id=?')
    .run(JSON.stringify(forged), saved.id);
  await assert.rejects(readPublicPublication(db, receipt.id), {
    code: 'saved_build_unavailable',
  });
});

test('public discovery excludes private work and withdrawals, paginates ties and freezes attribution', async (t) => {
  const { listPublicPublications } = await import('../db/publications.ts');
  const { parseDiscoveryQuery } = await import('../lib/discovery.ts');
  const db = database(t);
  const query = parseDiscoveryQuery(new URLSearchParams());
  await saveBuild(
    db,
    bob,
    save({ ...defaultBuild, name: 'Secret client draft' }),
  );
  assert.deepEqual(await listPublicPublications(db, query), {
    items: [],
    next: null,
  });
  await saveProfile(db, alice, profile);
  const saved = await saveBuild(db, alice, save());
  const ids = [];
  for (let index = 0; index < 27; index++) {
    const released = await publishBuild(db, alice, {
      operationId: `public-discovery-${index.toString().padStart(3, '0')}`,
      buildId: saved.id,
      title: `Keyboard ${index}`,
      note: 'Public note',
      kind: 'build',
    });
    ids.push(released.id);
  }
  db.sqlite.exec(
    "UPDATE community_publication SET published_at='2026-09-06T00:00:00.000Z'",
  );
  await saveProfile(db, alice, {
    ...profile,
    handle: 'new_alice',
    displayName: 'New name',
  });
  await saveProfile(db, bob, { ...profile, displayName: 'Other account' });
  await withdrawPublication(db, alice, ids[0]);
  const first = await listPublicPublications(db, query);
  assert.equal(first.items.length, 25);
  assert.ok(first.next);
  const second = await listPublicPublications(db, {
    ...query,
    cursor: first.next,
  });
  assert.equal(second.items.length, 1);
  assert.equal(second.next, null);
  const items = [...first.items, ...second.items];
  assert.equal(new Set(items.map((item) => item.id)).size, 26);
  assert.ok(!items.some((item) => item.id === ids[0]));
  for (const item of items) {
    assert.deepEqual(Object.keys(item).sort(), [
      'author',
      'id',
      'kind',
      'publishedAt',
      'title',
    ]);
    assert.deepEqual(item.author, {
      handle: profile.handle,
      displayName: profile.displayName,
    });
  }
  for (const secret of [
    alice,
    bob,
    saved.id,
    'Secret client draft',
    'operationId',
    'Public note',
    'Other account',
  ])
    assert.equal(JSON.stringify(items).includes(secret), false);
  assert.equal(
    (await listPublicPublications(db, { ...query, query: 'new_alice' })).items
      .length,
    0,
  );
  assert.equal(
    (await listPublicPublications(db, { ...query, query: 'alice_keys' })).items
      .length,
    25,
  );
  assert.equal(
    (await listPublicPublications(db, { ...query, query: '%' })).items.length,
    0,
  );
  assert.equal(
    (await listPublicPublications(db, { ...query, kind: 'drop' })).items.length,
    0,
  );
  for (const value of [
    'kind=private',
    'q=' + 'a'.repeat(101),
    'before=bad&id=valid-publication-id',
    'id=valid-publication-id',
  ])
    assert.throws(() => parseDiscoveryQuery(new URLSearchParams(value)), {
      code: 'invalid_request',
    });
});

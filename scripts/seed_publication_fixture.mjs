import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { saveProfile, saveBuild } from '../db/community.ts';
import { publishBuild, withdrawPublication } from '../db/publications.ts';
import {
  createProposal,
  closeProposal,
  rotateProposalLink,
} from '../db/proposals.ts';
import { defaultBuild } from '../lib/build.ts';
const root = new URL('../', import.meta.url).pathname;
const sqlite = new DatabaseSync(':memory:');
const migrations = readdirSync(root + '/drizzle')
  .filter((x) => x.endsWith('.sql'))
  .sort()
  .map((x) => readFileSync(root + '/drizzle/' + x, 'utf8'))
  .join('\n');
sqlite.exec(migrations);
const db = {
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
    const statement = sqlite.prepare(sql);
    return {
      bind(...args) {
        return {
          run() {
            return statement.run(...args);
          },
          async first(column) {
            const row = statement.get(...args);
            return row ? (column ? row[column] : { ...row }) : null;
          },
          async all() {
            return {
              results: statement.all(...args).map((row) => ({ ...row })),
            };
          },
        };
      },
    };
  },
};
await saveProfile(db, 'local-test-subject', {
  handle: 'local_test_creator',
  displayName: 'Local test creator',
  bio: 'Local fixture only',
  links: [{ label: 'Maker site', url: 'https://example.com/maker' }],
});
const ids = {};
for (const kind of ['active', 'retired', 'withdrawn']) {
  const saved = await saveBuild(db, 'local-test-subject', {
    operationId: 'local-fixture-save-' + kind,
    build: {
      ...defaultBuild,
      name: 'Private fixture ' + kind,
      accessories: [
        {
          id: 'fixture-encoder',
          productId: 'adafruit-377-encoder',
          quantity: 1,
          location: { kind: 'embedded', slotId: 'unassigned' },
        },
      ],
    },
  });
  const pub = await publishBuild(db, 'local-test-subject', {
    operationId: 'local-fixture-publish-' + kind,
    buildId: saved.id,
    title: 'Local ' + kind + ' release',
    note: 'Frozen release notes.',
    kind: 'drop',
    availability: 'Enquire with the maker',
    externalUrl: 'https://example.com/enquire',
  });
  ids[kind] = pub.id;
  const proposal = await createProposal(db, 'local-test-subject', {
    operationId: 'proposal-fixture-' + kind,
    buildId: saved.id,
    title: 'Local ' + kind + ' proposal',
    brief:
      'A quiet board for your desk. Try the colors and send me your notes.',
  });
  ids['proposal_' + kind] = proposal;
  if (kind === 'withdrawn')
    await closeProposal(db, 'local-test-subject', proposal.id);
  if (kind === 'active') {
    const replaced = await createProposal(db, 'local-test-subject', {
      operationId: 'proposal-fixture-replaced',
      buildId: saved.id,
      title: 'Replacement proposal',
      brief: 'This is the current invitation.',
    });
    ids.proposal_replaced = replaced;
    ids.proposal_replacement = await rotateProposalLink(
      db,
      'local-test-subject',
      {
        proposalId: replaced.id,
        operationId: 'proposal-fixture-rotation',
        expectedVersion: 0,
      },
    );
  }

  if (kind === 'withdrawn')
    await withdrawPublication(db, 'local-test-subject', pub.id);
  if (kind === 'retired') {
    const row = sqlite
      .prepare('SELECT payload,evidence FROM community_build WHERE id=?')
      .get(saved.id);
    const payload = JSON.parse(row.payload),
      evidence = JSON.parse(row.evidence);
    payload.selection.case = 'retired-fixture-case';
    evidence.components.find((p) => p.category === 'case').id =
      'retired-fixture-case';
    sqlite
      .prepare('UPDATE community_build SET payload=?,evidence=? WHERE id=?')
      .run(JSON.stringify(payload), JSON.stringify(evidence), saved.id);
  }
}
const quote = (value) =>
  value === null ? 'NULL' : "'" + String(value).replaceAll("'", "''") + "'";
let sql = migrations + '\n';
for (const table of [
  'community_account',
  'community_profile',
  'community_build',
  'community_publication',
  'community_proposal',
  'community_proposal_rotation',
])
  for (const row of sqlite.prepare('SELECT * FROM ' + table).all())
    sql +=
      'INSERT INTO ' +
      table +
      ' (' +
      Object.keys(row).join(',') +
      ') VALUES (' +
      Object.values(row).map(quote).join(',') +
      ');\n';
writeFileSync('/tmp/keyconf-publication-fixtures.sql', sql);
writeFileSync('/tmp/keyconf-publication-fixtures.json', JSON.stringify(ids));
sqlite.close();

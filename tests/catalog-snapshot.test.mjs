import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { parseCatalogSnapshot } from '../lib/catalog-snapshot.ts';
const payload = readFileSync(
  new URL('../data/store-observations.json', import.meta.url),
  'utf8',
);

test('publication accepts the complete existing evidence snapshot and preserves exact bytes', async () => {
  const parsed = await parseCatalogSnapshot(payload);
  assert.equal(parsed.pages, 12);
  assert.equal(parsed.observations, 128);
  assert.equal(parsed.payload, payload);
  assert.equal(parsed.id, (await parseCatalogSnapshot(payload)).id);
});

test('publication rejects altered prices, source, counts, ordering and oversized input', async () => {
  for (const mutate of [
    (s) => {
      s.evidence[0].result.products[0].name = 'Altered';
    },
    (s) => {
      s.source = 'https://different.example/';
    },
    (s) => {
      s.observations++;
    },
    (s) => {
      s.evidence.reverse();
    },
    (s) => {
      s.pages--;
    },
  ]) {
    const snapshot = JSON.parse(payload);
    mutate(snapshot);
    await assert.rejects(parseCatalogSnapshot(JSON.stringify(snapshot)));
  }
  await assert.rejects(parseCatalogSnapshot(' '.repeat(500001)), /exceeds/);
});

test('generated hosted schema enforces publication identity and uses its source index', () => {
  const db = new DatabaseSync(':memory:');
  try {
    db.exec('PRAGMA foreign_keys=ON');
    db.exec(
      readFileSync(
        new URL('../drizzle/0000_supreme_tiger_shark.sql', import.meta.url),
        'utf8',
      ),
    );
    assert.throws(
      () =>
        db
          .prepare('INSERT INTO catalog_publication VALUES(?,?)')
          .run('https://shop.example/', 'missing'),
      /FOREIGN KEY/,
    );
    db.prepare('INSERT INTO catalog_snapshot VALUES(?,?,?,?)').run(
      'one',
      'https://shop.example/',
      payload,
      '2026-09-06T00:00:00.000Z',
    );
    db.prepare('INSERT INTO catalog_publication VALUES(?,?)').run(
      'https://shop.example/',
      'one',
    );
    const rows = db
      .prepare(
        'EXPLAIN QUERY PLAN SELECT s.payload FROM catalog_publication p JOIN catalog_snapshot s ON s.id=p.snapshot_id WHERE p.source=?',
      )
      .all('https://shop.example/');
    assert.ok(
      rows.every((row) => row.detail.includes('USING INDEX')),
      JSON.stringify(rows),
    );
  } finally {
    db.close();
  }
});

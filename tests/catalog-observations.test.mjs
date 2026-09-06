import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  ObservationCatalog,
  collectCatalog,
} from '../scripts/catalog/observations.ts';

const source = 'https://switch-shop.example/collections/switches';
const next = (after) => ({
  kind: 'shopify',
  source,
  catalog: { kind: 'more', after },
  variants: [],
});
const product = (
  sku,
  price = { kind: 'exact', amount: '12.00', currency: 'USD' },
) => ({
  name: 'Switch ' + sku,
  brand: 'Maker',
  url: 'https://switch-shop.example/products/switch?variant=' + sku,
  sku,
  pricing: price,
  availability: 'In stock',
});
const page = (products, continuation, day = 6) => ({
  source,
  method: 'Shopify Storefront',
  observedAt: `2026-09-${String(day).padStart(2, '0')}T09:00:00.000Z`,
  coverage: 'Observed collection options; storefront filters are not applied.',
  products,
  ...(continuation === undefined ? {} : { next: continuation }),
});
function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'keyconf-catalog-'));
  const path = join(directory, 'observations.sqlite');
  const connections = [];
  t.after(() => {
    for (const connection of connections) {
      try {
        connection.close();
      } catch {}
    }
    rmSync(directory, { recursive: true, force: true });
  });
  return {
    path,
    open: () => {
      const db = new ObservationCatalog(path);
      connections.push(db);
      return db;
    },
    raw: () => {
      const db = new DatabaseSync(path);
      connections.push(db);
      return db;
    },
  };
}

test('SQLite retains original prices, variant identity and observation dates across reopen and later snapshots', (t) => {
  const f = fixture(t),
    db = f.open();
  db.start('first', source);
  const a = page(
    [
      product('101'),
      product('102', { kind: 'unknown' }),
      product('103', { kind: 'from', amount: '20.00', currency: 'EUR' }),
    ],
    next('a'),
  );
  const b = page(
    [
      product('104', {
        kind: 'range',
        min: '25.00',
        max: '30.00',
        currency: 'JPY',
      }),
    ],
    null,
    7,
  );
  db.append('first', 0, a);
  db.append('first', 1, b);
  const original = db.export('first');
  db.close();
  const reopened = f.open();
  assert.deepEqual(reopened.export('first'), original);
  assert.equal(original.progress.kind, 'pagination-ended');
  assert.equal(original.observations, 4);
  assert.deepEqual(
    original.evidence.map((e) => e.result),
    [a, b],
  );
  reopened.start('later', source);
  reopened.append(
    'later',
    0,
    page(
      [product('101', { kind: 'exact', amount: '14.50', currency: 'USD' })],
      null,
      8,
    ),
  );
  assert.deepEqual(reopened.export('first'), original);
  const rows = f
    .raw()
    .prepare(
      `SELECT o.sku,o.pricing_json,p.observed_at FROM catalog_product_observation o JOIN catalog_page p USING(run_id,page_number) WHERE o.sku='101' ORDER BY p.observed_at`,
    )
    .all();
  assert.deepEqual(
    rows.map((r) => [JSON.parse(r.pricing_json).amount, r.observed_at]),
    [
      ['12.00', a.observedAt],
      ['14.50', '2026-09-08T09:00:00.000Z'],
    ],
  );
});

test('replays are idempotent while source reuse and conflicting evidence cannot overwrite a page', (t) => {
  const db = fixture(t).open();
  db.start('run', source, '2026-09-06T08:00:00.000Z');
  const a = page([product('101')], next('a'));
  assert.equal(db.append('run', 0, a), true);
  const reorder = (value) =>
    Array.isArray(value)
      ? value.map(reorder)
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.entries(value)
              .reverse()
              .map(([key, item]) => [key, reorder(item)]),
          )
        : value;
  assert.equal(db.append('run', 0, reorder(a)), false);
  db.start('run', source + '#anchor', '2026-09-08T08:00:00.000Z');
  assert.equal(db.checkpoint('run').startedAt, '2026-09-06T08:00:00.000Z');
  assert.throws(
    () => db.start('run', 'https://another.example/products/switch'),
    /different source/,
  );
  assert.throws(
    () => db.append('run', 0, page([product('101')], next('a'), 7)),
    /different committed evidence/,
  );
  assert.equal(db.checkpoint('run').observations, 1);
  assert.deepEqual(db.export('run').evidence[0].result, a);
});

test('two connections cannot replace one another’s committed observations', (t) => {
  const f = fixture(t),
    first = f.open(),
    second = f.open();
  first.start('race', source);
  second.start('race', source);
  const before = second.checkpoint('race');
  const a = page([product('101')], next('a'));
  first.append('race', 0, a);
  assert.equal(second.append('race', before.pages, a), false);
  assert.throws(
    () =>
      second.append('race', before.pages, page([product('102')], next('a'))),
    /different committed evidence/,
  );
  second.append('race', 1, page([product('102')], null));
  assert.equal(first.checkpoint('race').observations, 2);
});

test('a failed product insert rolls back its entire page and preserves the prior checkpoint', (t) => {
  const f = fixture(t),
    db = f.open(),
    raw = f.raw();
  db.start('atomic', source);
  db.append('atomic', 0, page([product('101')], next('a')));
  const before = db.export('atomic');
  raw.exec(
    "CREATE TRIGGER reject_second BEFORE INSERT ON catalog_product_observation WHEN NEW.sku='reject' BEGIN SELECT RAISE(ABORT,'injected insert failure'); END;",
  );
  const b = page([product('102'), product('reject')], null);
  assert.throws(() => db.append('atomic', 1, b), /injected insert failure/);
  assert.deepEqual(db.export('atomic'), before);
  assert.equal(
    raw.prepare('SELECT COUNT(*) AS n FROM catalog_page').get().n,
    1,
  );
  assert.equal(
    raw.prepare('SELECT COUNT(*) AS n FROM catalog_product_observation').get()
      .n,
    1,
  );
  raw.exec('DROP TRIGGER reject_second');
  db.append('atomic', 1, b);
  assert.equal(db.checkpoint('atomic').observations, 3);
});

test('an interrupted collection resumes its saved cursor and a repeated page limit makes no new requests', async (t) => {
  const f = fixture(t),
    first = f.open();
  const options = { runId: 'resume', source, targetPages: 3, delayMs: 0 };
  let calls = 0;
  await assert.rejects(
    collectCatalog(first, options, async (_, cursor) => {
      calls++;
      if (cursor) throw new Error('Store temporarily unavailable');
      return page([product('101')], next('a'));
    }),
    /temporarily unavailable/,
  );
  assert.equal(calls, 2);
  assert.equal(first.checkpoint('resume').pages, 1);
  first.close();
  const reopened = f.open(),
    cursors = [];
  const done = await collectCatalog(reopened, options, async (url, cursor) => {
    assert.equal(url, source);
    cursors.push(cursor);
    return cursor.catalog.after === 'a'
      ? page([product('102')], next('b'), 7)
      : page([product('103')], null, 8);
  });
  assert.deepEqual(cursors, [next('a'), next('b')]);
  assert.equal(done.pages, 3);
  await collectCatalog(reopened, options, async () => {
    throw new Error('Must not fetch committed pages');
  });
  await collectCatalog(reopened, { ...options, targetPages: 100 }, async () => {
    throw new Error('Must not fetch an ended preview');
  });
  assert.equal(
    reopened.export('resume').evidence[0].result.observedAt,
    '2026-09-06T09:00:00.000Z',
  );
});

test('page limits preserve continuation and a preview without pagination never claims catalog exhaustion', async (t) => {
  const db = fixture(t).open();
  const options = { runId: 'limited', source, targetPages: 1, delayMs: 0 };
  const first = await collectCatalog(db, options, async () =>
    page([product('101')], next('a')),
  );
  assert.equal(first.progress.kind, 'more');
  await collectCatalog(db, options, async () => {
    throw new Error('Page limit must be respected');
  });
  const extended = await collectCatalog(
    db,
    { ...options, targetPages: 2 },
    async (_, cursor) => {
      assert.deepEqual(cursor, next('a'));
      return page([product('102')], null);
    },
  );
  assert.equal(extended.pages, 2);
  const preview = await collectCatalog(
    db,
    { ...options, runId: 'product-preview', targetPages: 100 },
    async () => page([product('101')], undefined),
  );
  assert.equal(preview.progress.kind, 'preview-only');
  assert.equal(preview.pages, 1);
});

test('cursor cycles and malformed observations leave the saved checkpoint unchanged', (t) => {
  const db = fixture(t).open();
  db.start('cycle', source);
  db.append('cycle', 0, page([product('101')], next('a')));
  db.append('cycle', 1, page([product('102')], next('b')));
  const before = db.export('cycle');
  assert.throws(
    () => db.append('cycle', 2, page([product('103')], next('a'))),
    /earlier pagination cursor/,
  );
  assert.throws(
    () => db.append('cycle', 2, page([product('103')], next('b'))),
    /earlier pagination cursor/,
  );
  assert.throws(
    () =>
      db.append('cycle', 2, {
        ...page([product('103')], null),
        observedAt: 'yesterday',
      }),
    /ISO timestamp/,
  );
  assert.throws(
    () =>
      db.append(
        'cycle',
        2,
        page(
          [product('103', { kind: 'exact', amount: '-1', currency: 'USD' })],
          null,
        ),
      ),
    /Invalid catalog observation/,
  );
  assert.throws(
    () => db.append('cycle', 10, page([product('103')], null)),
    /advanced/,
  );
  assert.deepEqual(db.export('cycle'), before);
});

test('changed stored payloads fail integrity verification instead of exporting altered evidence', (t) => {
  const f = fixture(t),
    db = f.open();
  db.start('integrity', source);
  const a = page([product('101')], null);
  db.append('integrity', 0, a);
  f.raw()
    .prepare('UPDATE catalog_page SET payload_json=? WHERE run_id=?')
    .run(JSON.stringify({ ...a, coverage: 'Changed' }), 'integrity');
  assert.throws(() => db.checkpoint('integrity'), /integrity check/);
  assert.throws(() => db.export('integrity'), /integrity check/);
});

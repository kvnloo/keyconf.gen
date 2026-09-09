import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import {
  admissionFaults,
  catalogCoverage,
  comparableOffer,
  mostExpensiveFirst,
} from '../lib/premium-keyboards.ts';
const offer = (amount, changes = {}) => ({
  amount,
  currency: 'USD',
  kind: 'complete',
  basis: 'store-listing',
  availability: 'sold-out',
  configuration: 'Bundle',
  observedAt: '2026-09-08',
  source: 'https://example.com/product',
  ...changes,
});
const keyboard = (id, offers) => ({
  id,
  name: id,
  brand: 'Maker',
  source: 'https://example.com/product',
  description: '',
  offers,
  geometry: { status: 'unmodeled' },
});
const scope = { currency: 'USD', kind: 'complete', basis: 'store-listing' };
test('expensive ordering never compares unlike currencies, kits or historical launch prices', () => {
  const boards = [
    keyboard('unknown', []),
    keyboard('foreign', [offer(90000, { currency: 'JPY' })]),
    keyboard('kit', [offer(3000, { kind: 'kit' })]),
    keyboard('launch', [offer(5000, { basis: 'historical-launch' })]),
    keyboard('lower', [offer(500)]),
    keyboard('higher', [offer(799)]),
  ];
  const ordered = mostExpensiveFirst(boards, scope);
  assert.deepEqual(
    ordered.slice(0, 2).map((board) => board.id),
    ['higher', 'lower'],
  );
  assert.equal(boards[0].id, 'unknown');
  assert.equal(comparableOffer(boards[1], scope), null);
});
test('an unrecorded price is uncomparable rather than a zero-priced board', () => {
  const unpriced = keyboard('unpriced', [offer(0)]);
  assert.equal(comparableOffer(unpriced, scope), null);
  const ordered = mostExpensiveFirst(
    [unpriced, keyboard('priced', [offer(1)])],
    scope,
  );
  assert.deepEqual(
    ordered.map((board) => board.id),
    ['priced', 'unpriced'],
  );
});

test('a colorway or edition is a configuration of one model, not a second model', () => {
  const base = keyboard('base', [offer(500)]);
  base.name = 'Relic 80';
  const colorway = keyboard('colorway', [offer(500)]);
  colorway.name = 'Relic 80 Rose Gold';
  assert.match(
    admissionFaults([base, colorway]).join('\n'),
    /colorway: "Relic 80 Rose Gold" is a variant of "Relic 80"/,
  );
  // A different model that merely shares a prefix length is not a variant.
  const sibling = keyboard('sibling', [offer(500)]);
  sibling.name = 'Relic 65';
  assert.deepEqual(admissionFaults([base, sibling]), []);
});

test('every admitted product and price carries a primary evidence link', () => {
  const noSource = keyboard('no-source', [offer(500)]);
  noSource.source = 'not a url';
  const insecure = keyboard('insecure', [
    offer(500, { source: 'http://example.com/product' }),
  ]);
  assert.deepEqual(admissionFaults([noSource]), [
    'no-source: no primary evidence link',
  ]);
  assert.deepEqual(admissionFaults([insecure]), [
    'insecure: offer "Bundle" has no evidence link',
  ]);
  const twice = keyboard('same', [offer(500)]);
  assert.deepEqual(admissionFaults([twice, twice]), ['same: duplicate id']);
});

test('the shipped catalog obeys the admission rules and reports its real size', () => {
  const boards = JSON.parse(
    readFileSync(new URL('../data/premium-keyboards.json', import.meta.url)),
  ).boards;
  assert.deepEqual(admissionFaults(boards), []);
  const coverage = catalogCoverage(boards);
  // The published number is whatever is actually covered; this asserts the
  // count is derived from the file rather than written by hand.
  assert.equal(coverage.models, boards.length);
  assert.deepEqual(
    coverage.brands,
    [...new Set(boards.map((board) => board.brand))].sort((a, b) =>
      a.localeCompare(b),
    ),
  );
});

test('highest listed configuration retains its identity and sold-out status', () => {
  const board = keyboard('board', [
    offer(600),
    offer(799, { configuration: 'PVD bundle' }),
  ]);
  assert.equal(comparableOffer(board, scope).configuration, 'PVD bundle');
  assert.equal(comparableOffer(board, scope).availability, 'sold-out');
});

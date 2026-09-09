import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
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
test('highest listed configuration retains its identity and sold-out status', () => {
  const board = keyboard('board', [
    offer(600),
    offer(799, { configuration: 'PVD bundle' }),
  ]);
  assert.equal(comparableOffer(board, scope).configuration, 'PVD bundle');
  assert.equal(comparableOffer(board, scope).availability, 'sold-out');
});

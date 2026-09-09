import assert from 'node:assert/strict';
import { test } from 'node:test';
import fc from 'fast-check';
import {
  comparableOffer,
  mostExpensiveFirst,
} from '../lib/premium-keyboards.ts';

const offerArb = fc.record({
  amount: fc.integer({ min: 0, max: 1_000_000 }),
  currency: fc.string({ minLength: 1, maxLength: 4 }),
  kind: fc.constantFrom('complete', 'kit'),
  basis: fc.constantFrom('store-listing', 'historical-launch'),
  availability: fc.constantFrom('available', 'sold-out', 'unknown'),
  configuration: fc.string({ maxLength: 20 }),
  observedAt: fc.string({ minLength: 10, maxLength: 20 }),
  source: fc.webUrl(),
});

test('comparableOffer returns the highest amount within scope', () => {
  fc.assert(
    fc.property(
      fc.array(offerArb, { maxLength: 10 }),
      (offers) => {
        const scope = { currency: 'USD', kind: 'complete', basis: 'store-listing' };
        const filtered = offers.filter(
          (o) => o.currency === 'USD' && o.kind === 'complete' && o.basis === 'store-listing',
        );
        const result = comparableOffer({ offers }, scope);
        if (filtered.length === 0) {
          assert.equal(result, null);
          return;
        }
        assert.ok(result);
        const max = Math.max(...filtered.map((o) => o.amount));
        assert.equal(result.amount, max);
      },
    ),
  );
});

test('mostExpensiveFirst preserves all boards and never throws on empty input', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          id: fc.string({ minLength: 1, maxLength: 10 }),
          name: fc.string({ minLength: 1, maxLength: 20 }),
          brand: fc.string({ minLength: 1, maxLength: 10 }),
          source: fc.webUrl(),
          description: fc.string({ maxLength: 50 }),
          offers: fc.array(offerArb, { maxLength: 5 }),
          geometry: fc.constant({ status: 'unmodeled' }),
        }),
        { maxLength: 20 },
      ),
      (boards) => {
        const scope = { currency: 'USD', kind: 'complete', basis: 'store-listing' };
        const ordered = mostExpensiveFirst(boards, scope);
        assert.equal(ordered.length, boards.length);
        const ids = new Set(boards.map((b) => b.id));
        for (const b of ordered) assert.ok(ids.has(b.id));
      },
    ),
  );
});
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import snapshot from '../data/store-observations.json' with { type: 'json' };
import { storeListings, storeSource } from '../lib/store-observations.ts';

test('published observations retain verified page hashes, option identity and original timestamps', () => {
  assert.equal(snapshot.schemaVersion, 1);
  assert.equal(snapshot.progress.kind, 'more');
  assert.equal(storeSource, 'https://divinikey.com/collections/switches');
  assert.equal(storeListings.length, snapshot.observations);
  assert.equal(
    new Set(storeListings.map((p) => p.url + '|' + p.sku)).size,
    storeListings.length,
  );
  for (const page of snapshot.evidence) {
    assert.equal(
      createHash('sha256').update(JSON.stringify(page.result)).digest('hex'),
      page.sha256,
    );
    for (const product of page.result.products) {
      const listing = storeListings.find(
        (p) => p.url === product.url && p.sku === product.sku,
      );
      assert.deepEqual(listing, {
        ...product,
        observedAt: page.result.observedAt,
      });
    }
  }
});

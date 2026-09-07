import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createImportedAccessory,
  parseImportedAccessory,
  parseCustomAccessories,
  resolveAccessoryProducts,
} from '../lib/imported-accessories.ts';
const reference = {
  origin: 'import',
  name: 'Maker OLED variant',
  brand: 'Maker',
  detail: 'Unverified module reference',
  source: 'https://example.com/products/oled?variant=42',
  sku: '42',
  observedAt: '2026-09-06T00:00:00.000Z',
  method: 'Product structured data',
  fit: 'unknown',
  geometry: 'unavailable',
  kind: 'screen',
  placement: 'embedded',
  sizeU: null,
  stem: null,
};
test('imported accessory identity preserves variant sources without catalog shadowing', async () => {
  const first = await createImportedAccessory(reference);
  const retry = await createImportedAccessory({
    ...reference,
    observedAt: '2026-09-07T00:00:00.000Z',
  });
  assert.equal(first.id, retry.id);
  assert.ok(first.id.length <= 120);
  const variant = await createImportedAccessory({ ...reference, sku: '43' });
  assert.notEqual(first.id, variant.id);
  assert.equal(parseImportedAccessory(first).source, reference.source);
  assert.equal(resolveAccessoryProducts([first]).at(-1), first);
  assert.throws(() =>
    parseImportedAccessory({ ...first, id: 'adafruit-326-oled' }),
  );
  assert.throws(() => parseCustomAccessories([first, first]), /Duplicate/);
});
test('import boundaries reject fake fit, unsafe sources, invalid dates and fabricated artisan dimensions', async () => {
  const first = await createImportedAccessory(reference);
  for (const patch of [
    { fit: 'confirmed' },
    { geometry: 'manufacturer-cad' },
    { source: 'javascript:alert(1)' },
    { source: 'http://127.0.0.1/private' },
    { observedAt: 'yesterday' },
    { placement: 'key' },
    { sizeU: 1 },
    { origin: 'catalog' },
  ])
    assert.throws(() => parseImportedAccessory({ ...first, ...patch }));
  const artisan = await createImportedAccessory({
    ...reference,
    kind: 'artisan',
    placement: 'key',
    sizeU: null,
    stem: null,
  });
  assert.equal(artisan.sizeU, null);
  assert.equal(artisan.stem, null);
  assert.throws(() => parseImportedAccessory({ ...artisan, sizeU: 0 }));
  assert.throws(() => parseImportedAccessory({ ...artisan, sizeU: NaN }));
  assert.throws(() => parseImportedAccessory({ ...artisan, stem: 'topre' }));
  assert.equal(
    'claims' in
      parseImportedAccessory({ ...artisan, claims: [{ status: 'confirmed' }] }),
    false,
  );
  assert.deepEqual(parseCustomAccessories(undefined), []);
});

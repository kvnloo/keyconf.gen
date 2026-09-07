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

test('build files and links preserve selected imports while old build serialization stays unchanged', async () => {
  const {
    defaultBuild,
    parseBuild,
    parseBuildSnapshot,
    encodeBuild,
    decodeBuild,
    pruneBuildImports,
    readBuildFile,
  } = await import('../lib/build.ts');
  const { newAccessorySelection } = await import('../lib/build-accessories.ts');
  const { parseSaveBuildRequest } = await import('../lib/community.ts');
  const product = await createImportedAccessory(reference);
  const unused = await createImportedAccessory({ ...reference, sku: 'unused' });
  const selected = newAccessorySelection(
    product.id,
    resolveAccessoryProducts([product]),
  );
  const build = {
    ...defaultBuild,
    customAccessories: [product, unused],
    accessories: [selected],
  };
  assert.deepEqual(readBuildFile(JSON.stringify(build)), build);
  const portable = decodeBuild(encodeBuild(build));
  assert.deepEqual(portable.customAccessories, [product]);
  assert.deepEqual(portable.accessories, [selected]);
  assert.equal(portable.customAccessories[0].source, reference.source);
  assert.throws(
    () => parseBuild({ ...build, customAccessories: [] }),
    /reference is missing/,
  );
  assert.throws(
    () =>
      parseBuildSnapshot({
        ...build,
        accessories: [
          { ...selected, location: { kind: 'external', position: 'right' } },
        ],
      }),
    /different placement/,
  );
  assert.equal(
    JSON.stringify(pruneBuildImports(defaultBuild)),
    JSON.stringify(defaultBuild),
  );
  assert.equal(
    JSON.stringify(parseBuild({ ...defaultBuild, customAccessories: [] })),
    JSON.stringify(defaultBuild),
  );
  assert.equal(
    JSON.stringify(
      parseSaveBuildRequest({
        operationId: 'legacy-operation-1',
        build: { ...defaultBuild, customAccessories: [] },
      }).build,
    ),
    JSON.stringify(defaultBuild),
  );
  assert.deepEqual(
    parseSaveBuildRequest({ operationId: 'new-operation-123', build }).build
      .customAccessories,
    [product],
  );
});

test('server snapshots freeze imported provenance and reject substituted sources or confirmed fit', async () => {
  const { defaultBuild } = await import('../lib/build.ts');
  const { newAccessorySelection, assessAccessories } =
    await import('../lib/build-accessories.ts');
  const { snapshotEvidence } = await import('../db/build-snapshot.ts');
  const { parsePublicBuildEvidence } = await import('../lib/build-evidence.ts');
  const product = await createImportedAccessory(reference);
  const products = resolveAccessoryProducts([product]);
  const selected = newAccessorySelection(product.id, products);
  const build = {
    ...defaultBuild,
    customAccessories: [product],
    accessories: [selected],
  };
  const saved = JSON.parse(await snapshotEvidence(build));
  const evidence = parsePublicBuildEvidence(saved, build);
  assert.deepEqual(evidence.accessoryReferences, [product]);
  assert.equal(evidence.accessoryCompatibility[selected.id].status, 'unknown');
  const altered = structuredClone(saved);
  altered.accessoryReferences[0].source =
    'https://example.com/different-product';
  assert.throws(
    () => parsePublicBuildEvidence(altered, build),
    /evidence mismatch/,
  );
  const forged = structuredClone(saved);
  forged.accessoryCompatibility[selected.id].status = 'confirmed';
  assert.throws(
    () => parsePublicBuildEvidence(forged, build),
    /cannot be confirmed/,
  );
  const host = {
    id: 'fictional-host',
    source: 'https://example.com/host',
    slots: [{ id: 'slot', kinds: ['screen'], capacity: 1 }],
    keys: null,
    claims: ['mount', 'electrical', 'firmware', 'clearance'].map((aspect) => ({
      productId: product.id,
      locationId: 'slot',
      aspect,
      status: 'confirmed',
      reason: 'Claimed fit',
      source: 'https://example.com/claim',
    })),
  };
  assert.equal(
    assessAccessories(
      [{ ...selected, location: { kind: 'embedded', slotId: 'slot' } }],
      host,
      products,
    )[selected.id].status,
    'unknown',
  );
});

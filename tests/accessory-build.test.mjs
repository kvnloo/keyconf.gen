import test from 'node:test';
import assert from 'node:assert/strict';
import {
  defaultBuild,
  parseBuild,
  encodeBuild,
  decodeBuild,
  readBuildFile,
  buildReducer,
  initialHistory,
} from '../lib/build.ts';
import {
  accessoryCatalog,
  newAccessorySelection,
} from '../lib/build-accessories.ts';

test('accessories survive portable links, files, and undo without replacing the keyset', () => {
  const accessories = accessoryCatalog.map((product) =>
    newAccessorySelection(product.id),
  );
  const build = { ...defaultBuild, accessories };
  assert.deepEqual(decodeBuild(encodeBuild(build)), build);
  assert.deepEqual(readBuildFile(JSON.stringify({ build })), build);
  const changed = buildReducer(initialHistory, {
    kind: 'edit',
    patch: { accessories },
  });
  assert.deepEqual(changed.present.selection, defaultBuild.selection);
  const undone = buildReducer(changed, { kind: 'undo' });
  assert.deepEqual(undone.present.accessories, []);
  assert.deepEqual(
    buildReducer(undone, { kind: 'redo' }).present.accessories,
    accessories,
  );
});

test('older builds restore with no accessories and malformed additions fail visibly', () => {
  const { accessories: _, ...legacy } = defaultBuild;
  assert.deepEqual(parseBuild(legacy).accessories, []);
  assert.throws(() =>
    parseBuild({ ...defaultBuild, accessories: [{ productId: 'invented' }] }),
  );
});

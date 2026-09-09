import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { layerHolds } from '../lib/layer-scene.ts';

const layers = ['keycaps', 'plate', 'pcb', 'case'];

// The isolated views read the shipped board assets, so the node names they
// depend on are read back out of the files rather than restated here.
function rootNodeNames(file) {
  const bytes = readFileSync(file);
  const json = JSON.parse(
    bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString('utf8'),
  );
  return json.scenes[0].nodes.map((index) => json.nodes[index].name);
}

const boards = [
  'public/models/keyboard-60.glb',
  'public/models/keyboard-65.glb',
  'public/models/keyboard-75.glb',
];

test('every board root node belongs to exactly one inspected layer', () => {
  for (const board of boards) {
    const roots = rootNodeNames(board);
    assert.ok(roots.length > 0, `${board} has no root nodes`);
    for (const name of roots) {
      const owners = layers.filter((layer) => layerHolds(layer, name));
      assert.deepEqual(
        owners.length,
        1,
        `${board}: ${name} is claimed by ${owners.length} layers (${owners.join(', ')})`,
      );
    }
  }
});

test('each inspected layer isolates geometry on every board', () => {
  for (const board of boards) {
    const roots = rootNodeNames(board);
    for (const layer of layers) {
      const held = roots.filter((name) => layerHolds(layer, name));
      assert.ok(held.length > 0, `${board}: ${layer} isolates nothing`);
    }
  }
});

test('the case isolates all six of its solids, and the plate and pcb one each', () => {
  for (const board of boards) {
    const roots = rootNodeNames(board);
    const count = (layer) =>
      roots.filter((name) => layerHolds(layer, name)).length;
    assert.equal(count('case'), 6, `${board}: case solids`);
    assert.equal(count('plate'), 1, `${board}: plate nodes`);
    assert.equal(count('pcb'), 1, `${board}: pcb nodes`);
  }
});

test('keycaps follow the key nodes the studio already indexes', () => {
  const roots = rootNodeNames('public/models/keyboard-65.glb');
  const caps = roots.filter((name) => layerHolds('keycaps', name));
  assert.equal(caps.length, 67);
  assert.ok(caps.every((name) => name.startsWith('key_')));
  assert.equal(layerHolds('keycaps', 'plate'), false);
  assert.equal(layerHolds('case', 'pcb'), false);
});

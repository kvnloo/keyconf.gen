import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { createSwitchAssembly } from '../lib/switch-model.ts';
import { UNIT_MM } from '../lib/cad-twin.ts';

const round = (value) => Math.round(value * UNIT_MM * 100) / 100;

test('switch study matches the published Cherry MX envelope', () => {
  const model = createSwitchAssembly([new THREE.Vector3()], 'oil-king');
  const box = (name) => {
    const mesh = model.group.getObjectByName(name);
    mesh.geometry.computeBoundingBox();
    return mesh.geometry.boundingBox;
  };
  const top = box('switch_top_housings');
  assert.equal(round(top.max.x - top.min.x), 15.6, 'housing is 15.6 mm square');
  assert.equal(round(top.max.z - top.min.z), 15.6);
  assert.equal(round(top.max.y), 11.6, 'housing stands 11.6 mm above the PCB');
  const base = box('switch_bases');
  assert.equal(
    round(base.max.x - base.min.x),
    15.6,
    'flange matches the housing',
  );
  const stems = box('switch_cross_stems');
  assert.equal(round(stems.max.y), 15.2, 'stem reaches 15.2 mm overall');
  assert.equal(
    round(stems.max.y - top.max.y),
    3.6,
    'stem clears the housing by 3.6 mm',
  );

  // Only the cross clears the housing; the shoulder below it is wider.
  const points =
    model.group.getObjectByName('switch_cross_stems').geometry.attributes
      .position;
  let widest = 0;
  let deepest = 0;
  for (let index = 0; index < points.count; index += 1) {
    if (round(points.getY(index)) <= 11.7) continue;
    widest = Math.max(widest, Math.abs(points.getX(index)));
    deepest = Math.max(deepest, Math.abs(points.getZ(index)));
  }
  assert.equal(round(widest * 2), 4.1, 'cross is 4.1 mm wide');
  assert.equal(round(deepest * 2), 4.1, 'cross is 4.1 mm deep');
  model.dispose();
});

for (const layout of [60, 65, 75]) {
  test(`switch instances follow every ${layout}% key center`, () => {
    const bytes = readFileSync(
      new URL(`../public/models/keyboard-${layout}.glb`, import.meta.url),
    );
    const document = JSON.parse(
      bytes.subarray(20, 20 + bytes.readUInt32LE(12)),
    );
    const keys = document.nodes.filter((node) => node.name?.startsWith('key_'));
    const positions = keys.map(
      (key) => new THREE.Vector3(key.translation[0], 0.3, key.translation[2]),
    );
    const model = createSwitchAssembly(positions, 'oil-king');
    assert.equal(model.group.name, 'switches');
    assert.equal(
      model.group.children.length,
      4,
      'switch count must not multiply draw calls',
    );
    const matrix = new THREE.Matrix4();
    for (const mesh of model.group.children) {
      assert.ok(mesh instanceof THREE.InstancedMesh);
      assert.equal(mesh.count, keys.length);
      mesh.computeBoundingBox();
      assert.ok(mesh.boundingBox && !mesh.boundingBox.isEmpty());
      keys.forEach((key, index) => {
        mesh.getMatrixAt(index, matrix);
        assert.equal(matrix.elements[12], key.translation[0]);
        assert.equal(matrix.elements[14], key.translation[2]);
      });
    }
    model.separate(0.5);
    assert.equal(
      model.group.getObjectByName('switch_cross_stems').position.y,
      0.575,
    );
    assert.equal(
      model.group.getObjectByName('switch_top_housings').position.y,
      0.325,
    );
    model.separate(1);
    assert.equal(
      model.group.getObjectByName('switch_cross_stems').position.y,
      1.15,
    );
    model.separate(0);
    assert.equal(
      model.group.getObjectByName('switch_cross_stems').position.y,
      0,
    );
    const stems = model.group.getObjectByName('switch_cross_stems');
    const oil = stems.material.color.getHexString();
    model.setColor('g-pro-3-yellow');
    assert.notEqual(stems.material.color.getHexString(), oil);
    model.dispose();
  });
}

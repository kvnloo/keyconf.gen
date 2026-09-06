import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { createSwitchAssembly } from '../lib/switch-model.ts';

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
    model.separate(true);
    assert.equal(
      model.group.getObjectByName('switch_cross_stems').position.y,
      1.15,
    );
    model.separate(false);
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

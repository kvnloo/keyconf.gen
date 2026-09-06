import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createAccessoryPreview } from '../lib/accessory-model.ts';

async function keyboard(layout = 60) {
  const bytes = readFileSync(
    new URL(`../public/models/keyboard-${layout}.glb`, import.meta.url),
  );
  const { scene } = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
  const keys = new Map();
  scene.traverse((object) => {
    if (object.name.startsWith('key_')) keys.set(object.name.slice(4), object);
  });
  return { scene, keys, bounds: new THREE.Box3().setFromObject(scene) };
}
function artisan(keyId, width = 1, id = keyId) {
  return {
    id,
    productId: `jelly-key-zen-pond-v-${width}u`,
    quantity: 1,
    location: { kind: 'key', keyId },
  };
}
function external(position = 'right', id = position) {
  return {
    id,
    productId: 'adafruit-5128-macropad',
    quantity: 100,
    location: { kind: 'external', position },
  };
}

for (const layout of [60, 65, 75]) {
  test(`${layout}% real GLB key replacements follow key transforms and restore originals`, async () => {
    const model = await keyboard(layout);
    const selections = [
      artisan('KeyA'),
      artisan('Enter', 2.25),
      artisan('Space', 6.25),
    ];
    const preview = createAccessoryPreview({ ...model, selections });
    assert.deepEqual(preview.counts, { artisan: 3, external: 0, omitted: 0 });
    for (const selection of selections) {
      const key = model.keys.get(selection.location.keyId);
      const cap = key.getObjectByName('illustrative-artisan');
      const originals = key.children.filter((child) => child !== cap);
      assert.equal(cap.parent, key);
      assert.ok(originals.every((child) => !child.visible));
      const before = cap.getWorldPosition(new THREE.Vector3());
      key.position.y += 4.8 - 0.14;
      key.scale.y = 1.5;
      const after = cap.getWorldPosition(new THREE.Vector3());
      assert.ok(Math.abs(after.y - before.y - 4.66) < 1e-6);
      assert.equal(cap.getWorldScale(new THREE.Vector3()).y, 1.5);
    }
    preview.dispose();
    preview.dispose();
    for (const { location } of selections) {
      const key = model.keys.get(location.keyId);
      assert.equal(key.getObjectByName('illustrative-artisan'), undefined);
      assert.ok(key.children.every((child) => child.visible));
    }
  });
}

test('missing, unassigned, wrong-width, duplicate and multiple-quantity caps are omitted', async () => {
  const model = await keyboard(75);
  const preview = createAccessoryPreview({
    ...model,
    selections: [
      artisan('unassigned'),
      artisan('Escape'),
      artisan('Space'),
      artisan('KeyA', 1, 'first'),
      artisan('KeyA', 1, 'second'),
      { ...artisan('KeyB'), quantity: 2 },
    ],
  });
  assert.deepEqual(preview.counts, { artisan: 0, external: 0, omitted: 6 });
  assert.ok(
    [...model.keys.values()].every((key) =>
      key.children.every((child) => child.visible),
    ),
  );
  preview.dispose();
});

test('desk modules clear each selected keyboard edge and use one twelve-key illustration per selection', async () => {
  const model = await keyboard();
  const preview = createAccessoryPreview({
    ...model,
    selections: [external('left'), external('right'), external('above')],
  });
  assert.deepEqual(preview.counts, { artisan: 0, external: 3, omitted: 0 });
  const [left, right, above] = preview.group.children.map((child) =>
    new THREE.Box3().setFromObject(child),
  );
  assert.ok(left.max.x < model.bounds.min.x);
  assert.ok(right.min.x > model.bounds.max.x);
  assert.ok(above.max.z < model.bounds.min.z);
  for (const pad of preview.group.children) {
    const caps = pad.getObjectByName('macropad-twelve-keys');
    assert.ok(caps instanceof THREE.InstancedMesh);
    assert.equal(caps.count, 12);
  }
  preview.dispose();
});

test('preview cap bounds and every owned GPU resource are disposed once without disposing GLB originals', async () => {
  const model = await keyboard();
  const preview = createAccessoryPreview({
    ...model,
    selections: [
      artisan('KeyA'),
      ...Array.from({ length: 10 }, (_, i) => external('right', String(i))),
    ],
  });
  assert.deepEqual(preview.counts, { artisan: 1, external: 6, omitted: 4 });
  const resources = new Set();
  for (const group of [
    preview.group,
    model.keys.get('KeyA').getObjectByName('illustrative-artisan'),
  ])
    group.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      if (object instanceof THREE.InstancedMesh) resources.add(object);
      resources.add(object.geometry);
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material])
        resources.add(material);
    });
  let disposals = 0;
  for (const resource of resources)
    resource.addEventListener('dispose', () => {
      disposals++;
    });
  let originalDisposals = 0;
  model.keys
    .get('KeyA')
    .children.find((child) => child.name.startsWith('cap'))
    .geometry.addEventListener('dispose', () => {
      originalDisposals++;
    });
  preview.dispose();
  preview.dispose();
  assert.equal(disposals, resources.size);
  assert.equal(originalDisposals, 0);
});

test('disposal restores an originally hidden key component to its previous visibility', async () => {
  const model = await keyboard();
  const legend = model.keys
    .get('KeyA')
    .children.find((child) => child.name.startsWith('legend'));
  legend.visible = false;
  const preview = createAccessoryPreview({
    ...model,
    selections: [artisan('KeyA')],
  });
  preview.dispose();
  assert.equal(legend.visible, false);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { adaptQ1MaxModel } from '../lib/q1-model.ts';
const layout = JSON.parse(
  readFileSync(
    new URL(
      '../docs/reference-assets/keychron-q1-max-layout.json',
      import.meta.url,
    ),
  ),
);
test('real generic GLB adapts to all Q1 cap positions with a separate measured knob', async () => {
  const bytes = readFileSync(
    new URL('../public/models/keyboard-75.glb', import.meta.url),
  );
  const { scene } = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
  adaptQ1MaxModel(scene);
  assert.equal(
    scene.children.filter((child) => child.name.startsWith('key_')).length,
    81,
  );
  for (const key of layout.keys) {
    const mesh = scene.getObjectByName(`key_${key.code}`);
    assert.ok(mesh, key.code);
    assert.equal(mesh.position.x, key.x);
    assert.equal(mesh.position.z, -key.y);
    assert.ok(mesh.children.some((child) => child.name.startsWith('cap')));
  }
  const knob = scene.getObjectByName('control_dial');
  assert.equal(knob.geometry.parameters.radiusTop * 2 * 19.05, 16);
  assert.equal(knob.geometry.parameters.height * 19.05, 14);
  assert.equal(knob.position.x, layout.stockEncoder.x);
  assert.equal(scene.getObjectByName('key_End'), undefined);
});

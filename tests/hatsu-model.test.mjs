import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { adaptHatsuModel } from '../lib/hatsu-model.ts';

const layout = JSON.parse(
  readFileSync(
    new URL('../docs/reference-assets/am-hatsu-layout.json', import.meta.url),
  ),
);

test('HATSU study is two 4x6 halves with a gap, not a single unsplit board', async () => {
  const bytes = readFileSync(
    new URL('../public/models/keyboard-60.glb', import.meta.url),
  );
  const { scene } = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
  adaptHatsuModel(scene);
  const keys = scene.children.filter((child) => child.name.startsWith('key_'));
  assert.equal(keys.length, 48);
  assert.equal(layout.keys.length, 48);
  assert.equal(new Set(layout.keys.map((key) => key.code)).size, 48);
  const left = layout.keys.filter((key) => key.half === 'left');
  const right = layout.keys.filter((key) => key.half === 'right');
  assert.equal(left.length, 24);
  assert.equal(right.length, 24);
  const innerLeft = Math.max(...left.map((key) => key.x + key.width / 2));
  const innerRight = Math.min(...right.map((key) => key.x - key.width / 2));
  assert.ok(
    innerRight - innerLeft >= 3,
    'halves must leave a visible split gap',
  );
  for (const key of layout.keys) {
    const mesh = scene.getObjectByName(`key_${key.code}`);
    assert.ok(mesh, key.code);
    assert.equal(mesh.position.x, key.x);
    assert.equal(mesh.position.z, -key.y);
  }
  assert.ok(scene.getObjectByName('case_left'));
  assert.ok(scene.getObjectByName('case_right'));
  assert.equal(scene.getObjectByName('case_rear'), undefined);
  assert.equal(scene.getObjectByName('control_dial'), undefined);
});

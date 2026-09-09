import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  adaptCyberboardR2Model,
  cyberboardPanel,
} from '../lib/cyberboard-model.ts';

test('CYBERBOARD R2 keeps a 75% key grid and adds a 5x40 panel without the Q1 knob', async () => {
  const bytes = readFileSync(
    new URL('../public/models/keyboard-75.glb', import.meta.url),
  );
  const { scene } = await new GLTFLoader().parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
  const before = scene.children.filter((child) =>
    child.name.startsWith('key_'),
  ).length;
  adaptCyberboardR2Model(scene);
  const keys = scene.children.filter((child) => child.name.startsWith('key_'));
  assert.equal(keys.length, before);
  assert.ok(keys.length > 70);
  const panel = scene.getObjectByName('display_pixels');
  assert.equal(panel.count, cyberboardPanel.rows * cyberboardPanel.columns);
  assert.equal(panel.count, 200);
  assert.equal(scene.getObjectByName('control_dial'), undefined);
});

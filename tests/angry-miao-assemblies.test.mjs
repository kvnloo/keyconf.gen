import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isHatsuAssembly,
  isCyberboardR2Assembly,
  isQ1MaxAssembly,
} from '../lib/keyboard-variant.ts';
import { featuredBuilds } from '../lib/featured-builds.ts';

test('Angry Miao featured presets are not Q1 Max or Bakeneko stand-ins', () => {
  const byId = Object.fromEntries(
    featuredBuilds.map((preset) => [preset.id, preset]),
  );
  assert.equal(byId['am-hatsu'].kind, 'keyboard');
  assert.equal(isHatsuAssembly(byId['am-hatsu'].build), true);
  assert.equal(isQ1MaxAssembly(byId['am-hatsu'].build), false);
  assert.equal(byId['cyberboard-r2'].kind, 'keyboard');
  assert.equal(isCyberboardR2Assembly(byId['cyberboard-r2'].build), true);
  assert.equal(isQ1MaxAssembly(byId['cyberboard-r2'].build), false);
});

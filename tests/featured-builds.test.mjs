import test from 'node:test';
import assert from 'node:assert/strict';
import { featuredBuilds, customizeFeatured } from '../lib/featured-builds.ts';
import {
  defaultBuild,
  parseBuild,
  encodeBuild,
  decodeBuild,
  buildReducer,
} from '../lib/build.ts';
import { parseDeck } from '../lib/control-deck.ts';

test('every featured preset resolves to a valid, portable device-specific build', () => {
  assert.equal(
    new Set(featuredBuilds.map((item) => item.id)).size,
    featuredBuilds.length,
  );
  for (const item of featuredBuilds) {
    if (item.kind === 'keyboard') {
      assert.deepEqual(parseBuild(item.build), item.build);
      assert.deepEqual(decodeBuild(encodeBuild(item.build)), item.build);
    } else assert.deepEqual(parseDeck(item.build), item.build);
  }
});

test('customizing a featured keyboard retains imports and sound preferences and is undone as one edit', () => {
  const current = {
    ...defaultBuild,
    name: 'My saved keyboard',
    audio: { ...defaultBuild.audio, source: 'mx-blue', volume: 1.8 },
    customParts: [
      {
        id: 'import:switch:test',
        name: 'Test',
        brand: 'Maker',
        category: 'switch',
        detail: 'Imported',
        source: 'https://example.com/switch',
        family: 'unverified',
        evidence: 'unknown',
      },
    ],
  };
  const before = structuredClone(current);
  const history = { past: [], present: current, future: [], group: null };
  for (const item of featuredBuilds.filter(
    (item) => item.kind === 'keyboard',
  )) {
    const candidate = customizeFeatured(item, current);
    assert.deepEqual(
      current,
      before,
      'Preview and customization must not mutate the saved value',
    );
    assert.deepEqual(candidate.audio, current.audio);
    assert.deepEqual(candidate.customParts, current.customParts);
    const applied = buildReducer(history, { kind: 'edit', patch: candidate });
    assert.deepEqual(applied.present.selection, item.build.selection);
    assert.deepEqual(buildReducer(applied, { kind: 'undo' }).present, before);
  }
});

test('volume accepts existing preferences and bounded gain through file and link parsing', () => {
  for (const volume of [0, 0.12, 0.45, 1, 1.5, 2]) {
    const build = { ...defaultBuild, audio: { ...defaultBuild.audio, volume } };
    assert.equal(parseBuild(build).audio.volume, volume);
    assert.equal(decodeBuild(encodeBuild(build)).audio.volume, volume);
  }
  for (const volume of [-0.01, 2.001, Infinity, NaN, '2', null])
    assert.throws(() =>
      parseBuild({ ...defaultBuild, audio: { ...defaultBuild.audio, volume } }),
    );
  assert.throws(() =>
    parseBuild({
      ...defaultBuild,
      audio: { ...defaultBuild.audio, damping: 1.5 },
    }),
  );
});

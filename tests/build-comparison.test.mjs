import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultBuild } from '../lib/build.ts';
import { compareBuilds } from '../lib/build-comparison.ts';

test('comparison ignores names and unused imports but reports chosen visual and audio changes', () => {
  const before = structuredClone(defaultBuild);
  const after = structuredClone(defaultBuild);
  after.name = 'Client revision';
  after.palette.name = 'Renamed palette';
  assert.deepEqual(compareBuilds(before, after), []);
  after.layout = '75';
  after.palette.accent = '#123456';
  after.audio.volume = 1.75;
  after.audio.damping = 0.9;
  assert.deepEqual(
    compareBuilds(before, after).map((row) => row.label),
    ['Layout', 'accent key color', 'Playback volume', 'Sound damping'],
  );
  assert.deepEqual(before, defaultBuild);
});

test('accessory placement and quantity matter but selection identifiers and array order do not', () => {
  const original = {
    ...defaultBuild,
    accessories: [
      {
        id: 'one',
        productId: 'adafruit-377-encoder',
        quantity: 1,
        location: { kind: 'embedded', slotId: 'unassigned' },
      },
      {
        id: 'two',
        productId: 'adafruit-4980-neokey',
        quantity: 1,
        location: { kind: 'external', position: 'left' },
      },
    ],
  };
  const candidate = structuredClone(original);
  candidate.accessories.reverse();
  candidate.accessories[0].id = 'new-id';
  assert.deepEqual(compareBuilds(original, candidate), []);
  candidate.accessories[0].location.position = 'right';
  candidate.accessories[0].quantity = 2;
  const changes = compareBuilds(original, candidate);
  assert.equal(changes.length, 1);
  assert.equal(changes[0].label, 'Accessories');
  assert.match(changes[0].after, /× 2.*external: right/);
});

test('selected imported part details are compared while unused parts are ignored', () => {
  const part = {
    id: 'import:client-case',
    category: 'case',
    name: 'Custom case',
    brand: 'Maker',
    detail: 'Original dimensions',
    source: 'https://example.com/case',
    family: 'unknown',
    evidence: 'unknown',
  };
  const original = {
    ...defaultBuild,
    selection: { ...defaultBuild.selection, case: part.id },
    customParts: [part],
  };
  const candidate = structuredClone(original);
  candidate.customParts.push({
    ...part,
    id: 'import:unused',
    name: 'Unused part',
  });
  assert.deepEqual(compareBuilds(original, candidate), []);
  candidate.customParts[0].detail = 'Revised dimensions';
  assert.equal(compareBuilds(original, candidate)[0].label, 'case');
  assert.match(
    compareBuilds(original, candidate)[0].after,
    /Revised dimensions/,
  );
});

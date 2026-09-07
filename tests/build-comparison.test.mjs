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

test('distinct imported part identities and precise volume changes are not hidden by display labels', () => {
  const part = {
    id: 'import:first',
    category: 'case',
    name: 'Custom case',
    brand: 'Maker',
    detail: 'Case',
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
  candidate.customParts[0].id = 'import:second';
  candidate.selection.case = 'import:second';
  assert.equal(compareBuilds(original, candidate)[0]?.label, 'case');
  const quiet = {
    ...defaultBuild,
    audio: { ...defaultBuild.audio, volume: 0.701 },
  };
  const louder = { ...quiet, audio: { ...quiet.audio, volume: 0.702 } };
  assert.equal(compareBuilds(quiet, louder)[0]?.label, 'Playback volume');
});

test('comparison preserves saved maker evidence and exposes original and current source links', async () => {
  const { snapshotEvidence } = await import('../db/build-snapshot.ts');
  const { parsePublicBuildEvidence } = await import('../lib/build-evidence.ts');
  const evidence = parsePublicBuildEvidence(
    JSON.parse(await snapshotEvidence(defaultBuild)),
    defaultBuild,
  );
  const part = evidence.components.find((item) => item.category === 'case');
  part.name = 'Original creator case';
  part.source = 'https://example.com/original-case';
  const change = compareBuilds(defaultBuild, defaultBuild, evidence).find(
    (item) => item.label === 'case',
  );
  assert.match(change.before, /Original creator case/);
  assert.equal(
    change.beforeSources[0].url,
    'https://example.com/original-case',
  );
  assert.notEqual(change.afterSources[0].url, change.beforeSources[0].url);
  assert.equal(compareBuilds(defaultBuild, defaultBuild).length, 0);
});

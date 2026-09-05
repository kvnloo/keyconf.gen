import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildReducer,
  defaultBuild,
  initialHistory,
  parseBuild,
  parseCustomParts,
  encodeBuild,
  decodeBuild,
  readBuildFile,
} from '../lib/build.ts';

const imported = {
  id: 'import:case:my-case',
  name: 'My case',
  brand: 'Maker',
  category: 'case',
  detail: 'Maker description',
  source: 'https://example.com/case',
  family: 'unverified',
  evidence: 'unknown',
};

test('portable links restore a Unicode design and its selected custom parts on a clean catalog', () => {
  const original = {
    ...defaultBuild,
    name: '秋の keyboard 🎹',
    caseColor: '#aBc123',
    layout: '75',
    customParts: [imported, { ...imported, id: 'import:case:other' }],
    selection: { ...defaultBuild.selection, case: imported.id },
    audio: { ...defaultBuild.audio, source: 'mx-blue', volume: 0.12 },
  };
  const decoded = decodeBuild(encodeBuild(original));
  assert.deepEqual(decoded, { ...original, customParts: [imported] });
  assert.equal(
    'enabled' in decoded.audio,
    false,
    'opening a link cannot enable audio',
  );
  assert.deepEqual(
    readBuildFile(
      JSON.stringify({ version: 1, build: decoded, compatibility: [] }),
    ),
    decoded,
  );
});

test('untrusted links cannot forge fit evidence, unsafe source links, missing parts or unsupported settings', () => {
  for (const change of [
    { version: 2 },
    { layout: '100' },
    { caseColor: 'url(x)' },
    { palette: { ...defaultBuild.palette, accent: 'red' } },
    { audio: { ...defaultBuild.audio, source: 'does-not-exist' } },
    { audio: { ...defaultBuild.audio, volume: Infinity } },
    { selection: { ...defaultBuild.selection, case: 'redux-pcb' } },
    { customParts: [{ ...imported, source: 'javascript:alert(1)' }] },
    { customParts: [{ ...imported, source: 'https://localhost' }] },
    { customParts: [{ ...imported, evidence: 'documented' }] },
    { customParts: [{ ...imported, id: 'tofu-case' }] },
    { customParts: [imported, imported] },
  ])
    assert.throws(() => parseBuild({ ...defaultBuild, ...change }));
  assert.equal(
    parseCustomParts([{ ...imported, family: 'tofu60' }])[0].family,
    'unverified',
  );
  for (const link of [
    'broken',
    'abc%',
    'a'.repeat(24_001),
    btoa('{"version":2}'),
  ])
    assert.throws(() => decodeBuild(link));
  assert.throws(() => readBuildFile('{bad json'));
  assert.throws(() => readBuildFile(' '.repeat(1_000_001)));
});

test('undo and redo preserve full component/audio changes and discard an abandoned redo branch', () => {
  const first = buildReducer(initialHistory, {
    kind: 'edit',
    patch: { layout: '65' },
  });
  const second = buildReducer(first, {
    kind: 'edit',
    patch: { audio: { ...defaultBuild.audio, source: 'mx-blue' } },
  });
  const undone = buildReducer(second, { kind: 'undo' });
  assert.deepEqual(undone.present, first.present);
  assert.deepEqual(
    buildReducer(undone, { kind: 'redo' }).present,
    second.present,
  );
  const newBranch = buildReducer(undone, {
    kind: 'edit',
    patch: { layout: '75' },
  });
  assert.equal(newBranch.future.length, 0);
  assert.equal(buildReducer(newBranch, { kind: 'redo' }), newBranch);
});

test('continuous gestures undo as one change and history has a bounded size', () => {
  let state = initialHistory;
  for (let i = 1; i < 20; i++)
    state = buildReducer(state, {
      kind: 'edit',
      patch: { name: 'Build ' + i },
      group: 'name',
    });
  assert.equal(state.past.length, 1);
  assert.deepEqual(buildReducer(state, { kind: 'undo' }).present, defaultBuild);
  state = buildReducer(state, { kind: 'commit' });
  state = buildReducer(state, {
    kind: 'edit',
    patch: { name: 'Next' },
    group: 'name',
  });
  assert.equal(state.past.length, 2);
  for (let i = 0; i < 100; i++)
    state = buildReducer(state, {
      kind: 'edit',
      patch: { name: 'Different ' + i },
    });
  assert.equal(state.past.length, 60);
  const noChange = buildReducer(state, {
    kind: 'edit',
    patch: { name: state.present.name },
  });
  assert.equal(noChange, state);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultBuild } from '../lib/build.ts';
import {
  createBuildThumbnail,
  parseBuildThumbnail,
} from '../lib/build-thumbnail.ts';

const palette = {
  name: 'Private palette label',
  alpha: '#123456',
  mod: '#abcdef',
  accent: '#FEDCBA',
  space: '#654321',
};
const build = {
  ...defaultBuild,
  name: 'Private snapshot name',
  caseColor: '#A1B2C3',
  palette,
};
const colors = {
  alpha: palette.alpha,
  mod: palette.mod,
  accent: palette.accent,
  space: palette.space,
};

test('thumbnail recipes preserve saved colors and expose only supported visual fields', () => {
  for (const layout of ['60', '65', '75']) {
    const thumbnail = createBuildThumbnail({ ...build, layout });
    assert.deepEqual(thumbnail, {
      geometry: `generic-${layout}`,
      caseColor: build.caseColor,
      colors,
    });
    assert.deepEqual(parseBuildThumbnail(thumbnail), thumbnail);
    for (const privateValue of [
      'Private',
      'selection',
      'customParts',
      'audio',
      'name',
    ])
      assert.equal(JSON.stringify(thumbnail).includes(privateValue), false);
  }
  const thumbnail = createBuildThumbnail(build);
  thumbnail.colors.alpha = '#000000';
  assert.equal(build.palette.alpha, '#123456');
});

test('only the complete Q1 Max 75 percent assembly selects documented ANSI geometry', () => {
  const q1 = {
    ...build,
    layout: '75',
    selection: {
      ...build.selection,
      case: 'q1-max-case',
      pcb: 'q1-max-pcb',
      plate: 'q1-max-plate',
    },
  };
  assert.equal(createBuildThumbnail(q1).geometry, 'q1-max-ansi');
  for (const category of ['case', 'pcb', 'plate'])
    assert.equal(
      createBuildThumbnail({
        ...q1,
        selection: { ...q1.selection, [category]: 'another-part' },
      }).geometry,
      'generic-75',
    );
  assert.equal(
    createBuildThumbnail({ ...q1, layout: '65' }).geometry,
    'generic-65',
  );
  assert.equal(createBuildThumbnail({ ...build, layout: '100' }), null);
  assert.equal(createBuildThumbnail({ ...build, layout: 'split' }), null);
});

test('retired component IDs preserve the saved layout study instead of substituting a product', () => {
  const thumbnail = createBuildThumbnail({
    ...build,
    layout: '65',
    selection: {
      ...build.selection,
      case: 'retired-case',
      pcb: 'retired-pcb',
      plate: 'retired-plate',
    },
  });
  assert.deepEqual(thumbnail, {
    geometry: 'generic-65',
    caseColor: build.caseColor,
    colors,
  });
});

test('thumbnail parsing supports older responses and rejects malformed supplied recipes', () => {
  assert.equal(parseBuildThumbnail(undefined), null);
  assert.equal(parseBuildThumbnail(null), null);
  const valid = createBuildThumbnail(build);
  assert.deepEqual(
    parseBuildThumbnail({
      ...valid,
      owner: 'private',
      colors: { ...colors, name: 'private' },
    }),
    valid,
  );
  for (const value of [
    false,
    '',
    [],
    {},
    { ...valid, geometry: 'manufacturer-cad' },
    { ...valid, geometry: 'generic-100' },
    { ...valid, colors: null },
    { ...valid, colors: { alpha: '#123456' } },
    { ...valid, caseColor: '#fff' },
    { ...valid, caseColor: 'url(https://example.com/private)' },
    { ...valid, colors: { ...colors, space: '#12345z' } },
  ])
    assert.throws(() => parseBuildThumbnail(value));
});

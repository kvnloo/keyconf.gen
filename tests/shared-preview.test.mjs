import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultBuild, encodeBuild } from '../lib/build.ts';
import { previewLink, sharedPreview } from '../lib/shared-preview.ts';

test('preview links carry the same complete build without using the device-restore route', () => {
  const build = { ...defaultBuild, name: 'Client 🪴 study' };
  const before = JSON.stringify(build);
  const url = new URL(
    previewLink(
      build,
      'https://example.com/keyconf.gen/nightly/?from=creator#studio',
    ),
  );
  assert.equal(url.pathname, '/keyconf.gen/nightly/');
  assert.equal(url.search, '?from=creator');
  assert.ok(url.hash.startsWith('#preview='));
  assert.deepEqual(sharedPreview(url.hash), { kind: 'ready', build });
  assert.equal(JSON.stringify(build), before);
  assert.deepEqual(sharedPreview('#build=' + encodeBuild(build)), {
    kind: 'none',
  });
});

test('invalid previews recover instead of becoming the device draft', () => {
  for (const hash of [
    '#preview=',
    '#preview=not-valid',
    '#preview=' + 'x'.repeat(24001),
  ]) {
    const result = sharedPreview(hash);
    assert.equal(result.kind, 'error');
    assert.ok(result.message.length > 0);
    assert.equal('build' in result, false);
  }
});

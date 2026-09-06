import test from 'node:test';
import assert from 'node:assert/strict';
import { importEndpoint } from '../lib/import-endpoint.ts';
import { previewChannel, previewStorageKey } from '../lib/preview-storage.ts';

test('nightly Pages imports use the separate backend; stable and dev remain stable', () => {
  for (const path of ['/', '/main/', '/dev/']) {
    assert.equal(
      importEndpoint(new URL('https://kvnloo.github.io/keyconf.gen' + path)),
      'https://keyconf-studio.kvnloo.chatgpt.site/api/import',
    );
  }
  assert.equal(
    importEndpoint(
      new URL('https://kvnloo.github.io/keyconf.gen/nightly/#studio'),
    ),
    'https://keyconf-nightly.kvnloo.chatgpt.site/api/import',
  );
  for (const origin of [
    'http://localhost:3000',
    'https://keyconf-nightly.kvnloo.chatgpt.site',
    'https://keyconf-studio.kvnloo.chatgpt.site',
  ]) {
    assert.equal(importEndpoint(new URL(origin)), '/api/import');
  }
});

test('nightly Sites identifies its preview and scopes saved builds', (t) => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'document');
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'document', previous);
    else delete globalThis.document;
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: { baseURI: 'https://keyconf-nightly.kvnloo.chatgpt.site/' },
  });
  assert.equal(previewChannel(), 'nightly');
  assert.equal(previewStorageKey('build'), 'build:nightly');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { samplesFor, soundPacks } from '../lib/sound-packs.ts';

const manifest = JSON.parse(
  readFileSync(new URL('../data/sound-packs.json', import.meta.url)),
);

test('recorded packs retain license notices and the pinned original audio bytes', () => {
  assert.ok(soundPacks.length >= 7);
  for (const pack of manifest.packs) {
    const directory = new URL(`../public/sounds/${pack.id}/`, import.meta.url);
    const license = readFileSync(new URL('LICENSE.txt', directory), 'utf8');
    assert.match(
      license,
      /Audio samples from https:\/\/github.com\/tplai\/kbsim/,
    );
    assert.match(license, /Permission is hereby granted/);
    const files = new Set(
      Object.values(pack.groups).flatMap((groups) =>
        Object.values(groups).flat(),
      ),
    );
    assert.deepEqual([...files].sort(), Object.keys(pack.sha256).sort());
    for (const file of files) {
      assert.match(file, /^[a-z0-9_]+\.mp3$/);
      const bytes = readFileSync(new URL(file, directory));
      assert.equal(
        createHash('sha256').update(bytes).digest('hex'),
        pack.sha256[file],
      );
    }
    assert.ok(pack.groups.down.default.length > 1);
    assert.ok(pack.groups.up.default.length > 0);
  }
});

test('modifier keys use their recordings while packs with limited coverage fall back', () => {
  const ink = soundPacks.find((pack) => pack.id === 'gateron-black-ink');
  const blue = soundPacks.find((pack) => pack.id === 'mx-blue');
  assert.ok(ink && blue);
  assert.deepEqual(samplesFor(ink, 'Space', 'down'), ['press_space.mp3']);
  assert.deepEqual(samplesFor(ink, 'NumpadEnter', 'up'), ['release_enter.mp3']);
  assert.deepEqual(samplesFor(ink, 'Delete', 'up'), ['release_back.mp3']);
  assert.deepEqual(samplesFor(blue, 'Space', 'up'), ['release.mp3']);
  assert.equal(samplesFor(ink, 'KeyQ', 'down').length, 5);
});

test('recording references are unique attributed videos with valid creator URLs', () => {
  const data = JSON.parse(
    readFileSync(new URL('../data/sound-references.json', import.meta.url)),
  );
  assert.ok(data.records.length >= 200);
  assert.equal(
    new Set(data.records.map((record) => record.id)).size,
    data.records.length,
  );
  assert.equal(
    new Set(data.records.map((record) => record.videoId)).size,
    data.records.length,
  );
  for (const record of data.records) {
    assert.match(record.videoId, /^[A-Za-z0-9_-]{11}$/);
    assert.equal(
      new URL(record.source).origin,
      'https://www.clickandthock.com',
    );
    assert.equal(record.creator, 'Click and Thock');
    assert.ok(record.name.trim());
  }
});

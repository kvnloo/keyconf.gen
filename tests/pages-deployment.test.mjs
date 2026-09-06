import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { assemblePages } from '../scripts/assemble-pages.mjs';

test('Publishing one channel preserves the other builds and refuses out-of-order releases', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'keyconf-pages-'));
  try {
    const destination = path.join(root, 'site');
    const options = {
      destination,
      repository: 'kvnloo/keyconf.gen',
      sha: 'a'.repeat(40),
    };
    for (const channel of ['main', 'dev', 'nightly']) {
      const artifact = path.join(root, channel);
      await mkdir(artifact);
      await writeFile(
        path.join(artifact, 'index.html'),
        `<base href="/keyconf.gen/${channel}/"><p>${channel}</p>`,
      );
      await writeFile(path.join(artifact, 'old.js'), channel);
      await assemblePages({ ...options, artifact, channel, runNumber: 1 });
    }
    const mainBefore = await readFile(
      path.join(destination, 'main/index.html'),
    );
    const devBefore = await readFile(path.join(destination, 'dev/index.html'));
    const artifact = path.join(root, 'nightly');
    await rm(path.join(artifact, 'old.js'));
    await writeFile(path.join(artifact, 'new.js'), 'new nightly');
    await assemblePages({
      ...options,
      artifact,
      channel: 'nightly',
      sha: 'b'.repeat(40),
      runNumber: 3,
    });
    assert.deepEqual(
      await readFile(path.join(destination, 'main/index.html')),
      mainBefore,
    );
    assert.deepEqual(
      await readFile(path.join(destination, 'dev/index.html')),
      devBefore,
    );
    await assert.rejects(readFile(path.join(destination, 'nightly/old.js')), {
      code: 'ENOENT',
    });
    assert.equal(
      await readFile(path.join(destination, 'nightly/new.js'), 'utf8'),
      'new nightly',
    );
    const stale = await assemblePages({
      ...options,
      artifact,
      channel: 'nightly',
      runNumber: 2,
    });
    assert.equal(stale.published, false);
    assert.equal(stale.release.sha, 'b'.repeat(40));
    const duplicate = await assemblePages({
      ...options,
      artifact,
      channel: 'nightly',
      runNumber: 3,
    });
    assert.equal(duplicate.published, false);
    const releases = JSON.parse(
      await readFile(path.join(destination, 'environments.json'), 'utf8'),
    );
    assert.deepEqual(Object.keys(releases), ['main', 'dev', 'nightly']);
    assert.equal(releases.nightly.sha, 'b'.repeat(40));
    assert.match(
      await readFile(path.join(destination, 'index.html'), 'utf8'),
      /location.search \+ location.hash/,
    );
    await assert.rejects(
      assemblePages({ ...options, artifact, channel: '../main', runNumber: 4 }),
      /Unknown release channel/,
    );
    await assert.rejects(
      assemblePages({ ...options, artifact, channel: 'main', runNumber: 4 }),
      /built for/,
    );
    assert.deepEqual(
      await readFile(path.join(destination, 'main/index.html')),
      mainBefore,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

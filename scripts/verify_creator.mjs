import assert from 'node:assert/strict';
import { accountFixture } from './account-fixture/server.mjs';
import { createCommunityClient } from '../lib/community-client.ts';
import { defaultBuild } from '../lib/build.ts';

const fixture = await accountFixture();
try {
  const client = createCommunityClient({
    fetch: (path, options) => {
      const headers = new Headers(options.headers);
      headers.set('Origin', new URL(fixture.url).origin);
      headers.set('Cookie', `fixture_session=${fixture.alice}`);
      return fetch(new URL(path, fixture.url), { ...options, headers });
    },
  });
  await client.saveProfile({
    handle: 'fixture_creator',
    displayName: 'Fixture creator',
    bio: '',
    links: [],
  });
  const saved = await client.saveBuild({
    operationId: 'creator-transport-save-001',
    build: defaultBuild,
  });
  const request = {
    operationId: 'creator-transport-publish-001',
    buildId: saved.id,
    title: 'Forest release',
    note: '',
    kind: 'build',
  };
  const release = await client.publishBuild(request);
  assert.deepEqual(await client.publishBuild(request), release);
  const page = await client.listOwnedPublications();
  assert.equal(page.items.length, 1);
  assert.equal(page.items[0].title, request.title);
  const withdrawn = await client.withdrawPublication(page.items[0].id);
  assert.deepEqual(
    await client.withdrawPublication(page.items[0].id),
    withdrawn,
  );
  assert.ok((await client.listOwnedPublications()).items[0].withdrawnAt);
  console.log(
    'Creator client and real HTTP handlers passed publish/retry/list/withdraw against SQLite.',
  );
} finally {
  await fixture.close();
}

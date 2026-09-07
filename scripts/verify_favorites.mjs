import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { accountFixture } from './account-fixture/server.mjs';
import { saveBuild, saveProfile } from '../db/community.ts';
import { publishBuild, withdrawPublication } from '../db/publications.ts';
import { addFavorite } from '../db/favorites.ts';
import { mkdir } from 'node:fs/promises';
import { defaultBuild } from '../lib/build.ts';

const fixture = await accountFixture();
const browser = await chromium.launch();
try {
  await saveProfile(fixture.db, 'fixture:alice', {
    handle: 'favorite_creator',
    displayName: 'Fixture creator',
    bio: '',
    links: [],
  });
  const saved = await saveBuild(fixture.db, 'fixture:alice', {
    operationId: 'favorites-browser-save-001',
    build: defaultBuild,
  });
  const release = await publishBuild(fixture.db, 'fixture:alice', {
    operationId: 'favorites-browser-release-001',
    buildId: saved.id,
    title: 'Forest reference',
    note: '',
    kind: 'build',
  });
  const context = await browser.newContext({
    viewport: { width: 320, height: 844 },
  });
  await context.addCookies([
    { name: 'fixture_session', value: fixture.bob, url: fixture.url },
  ]);
  const page = await context.newPage();
  await page.goto(fixture.url + '?publication=' + release.id);
  const favorites = page.getByRole('region', { name: 'Your favorites' });
  await expect(favorites.getByText('No favorites yet')).toBeVisible();
  await page
    .getByRole('button', { name: 'Add this build to favorites' })
    .click();
  await expect(
    favorites.getByRole('link', { name: 'Forest reference' }),
  ).toBeVisible();
  const audit = await new AxeBuilder({ page })
    .include('.favorites-panel')
    .analyze();
  assert.deepEqual(
    audit.violations.map((item) => item.id),
    [],
  );
  const path = `/api/community/favorites/${release.id}`;
  const mutate = (method) =>
    page.evaluate(
      async ({ path, method }) => {
        const response = await fetch(path, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        });
        return { status: response.status, body: await response.json() };
      },
      { path, method },
    );
  const first = await mutate('PUT');
  assert.equal(first.status, 200);
  assert.deepEqual(await mutate('PUT'), first);
  await withdrawPublication(fixture.db, 'fixture:alice', release.id);
  const list = await context.request.get(
    new URL('/api/community/favorites', fixture.url).href,
  );
  assert.deepEqual((await list.json()).items, [
    {
      publicationId: release.id,
      createdAt: first.body.createdAt,
      status: 'unavailable',
    },
  ]);
  await page.reload();
  await expect(favorites.getByRole('link')).toHaveCount(0);
  await favorites
    .getByRole('button', {
      name: 'Remove this unavailable release from favorites',
    })
    .click();
  await expect(favorites.getByText('No favorites yet')).toBeVisible();
  assert.equal((await mutate('DELETE')).status, 200);
  assert.equal((await mutate('DELETE')).status, 200);
  await expect(
    page.getByText('No saved builds yet.', { exact: false }),
  ).toBeVisible();
  for (let index = 0; index < 27; index++) {
    const published = await publishBuild(fixture.db, 'fixture:alice', {
      operationId: `favorite-browser-page-${String(index).padStart(3, '0')}`,
      buildId: saved.id,
      title: `Reference ${index}`,
      note: '',
      kind: 'build',
    });
    await addFavorite(fixture.db, 'fixture:bob', published.id);
  }
  await page.reload();
  await expect(favorites.locator('li')).toHaveCount(25);
  await favorites.getByRole('button', { name: 'Load more favorites' }).click();
  await expect(favorites.locator('li')).toHaveCount(27);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await mkdir('outputs', { recursive: true });
  await favorites.screenshot({ path: 'outputs/favorites-mobile.png' });
  await context.clearCookies();
  await context.addCookies([
    { name: 'fixture_session', value: fixture.alice, url: fixture.url },
  ]);
  await page.reload();
  await expect(favorites.getByText('No favorites yet')).toBeVisible();
  console.log(
    'Favorites browser transport, repeat requests and withdrawal privacy passed.',
  );
} finally {
  await browser.close();
  await fixture.close();
}

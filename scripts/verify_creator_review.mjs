import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { accountFixture } from './account-fixture/server.mjs';
import { saveBuild, saveProfile } from '../db/community.ts';
import { defaultBuild } from '../lib/build.ts';

const fixture = await accountFixture();
const browser = await chromium.launch();
try {
  await saveProfile(fixture.db, 'fixture:alice', {
    handle: 'review_creator',
    displayName: 'Review creator',
    bio: '',
    links: [],
  });
  const saved = await saveBuild(fixture.db, 'fixture:alice', {
    operationId: 'review-browser-save-001',
    build: { ...defaultBuild, name: 'Frozen forest' },
  });
  fixture.sqlite
    .prepare(
      "UPDATE community_build SET evidence=json_set(evidence,'$.components[0].detail',?) WHERE id=?",
    )
    .run('Historical maker evidence retained with this revision', saved.id);
  const context = await browser.newContext({
    viewport: { width: 320, height: 844 },
  });
  await context.addCookies([
    { name: 'fixture_session', value: fixture.alice, url: fixture.url },
  ]);
  const page = await context.newPage();
  await page.goto(fixture.url + '?review=' + saved.id);
  await expect(
    page.getByRole('heading', { name: 'Prepare publication' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Cancel publication', exact: true })
    .click();
  assert.equal(
    fixture.sqlite
      .prepare('SELECT count(*) AS n FROM community_publication')
      .get().n,
    0,
  );
  await page.reload();
  await page
    .getByLabel('Publication title', { exact: true })
    .fill('Forest client release');
  await page.getByLabel(/^Creator note/).fill('A saved revision for review.');
  assert.equal(
    fixture.sqlite
      .prepare('SELECT count(*) AS n FROM community_publication')
      .get().n,
    0,
  );
  await page
    .getByText('Original parts and source links', { exact: true })
    .click();
  await expect(
    page.getByText('Historical maker evidence retained with this revision', {
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Review publication', exact: true })
    .click();
  await page
    .getByLabel('Device build name', { exact: true })
    .fill('Unrelated device edit');
  await mkdir('outputs', { recursive: true });
  await page
    .locator('.publication-review')
    .screenshot({ path: 'outputs/creator-review-mobile.png' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page
    .locator('.publication-review')
    .screenshot({ path: 'outputs/creator-review-desktop.png' });
  await page.setViewportSize({ width: 320, height: 844 });
  fixture.losePublicationResponse();
  await page
    .getByRole('button', { name: 'Publish build', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Retry same publication', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Retry same publication', exact: true })
    .click();
  await expect(page.locator('a[href^="/builds/"]')).toHaveCount(1);
  assert.equal(
    fixture.sqlite
      .prepare('SELECT count(*) AS n FROM community_publication')
      .get().n,
    1,
  );
  assert.equal(
    fixture.sqlite
      .prepare('SELECT build_id AS id FROM community_publication')
      .get().id,
    saved.id,
  );
  await expect(
    page.getByLabel('Device build name', { exact: true }),
  ).toHaveValue('Unrelated device edit');
  const audit = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(
    audit.violations.map((item) => item.id),
    [],
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.reload();
  await page.getByRole('radio', { name: 'Creator drop', exact: true }).check();
  await page
    .getByLabel('Publication title', { exact: true })
    .fill('Forest drop');
  await page
    .getByLabel(/^Availability/)
    .fill('Enquiries open with the creator');
  await page
    .getByLabel(/^Original purchase or enquiry link/)
    .fill('https://example.com/creator-enquiry');
  await page
    .getByRole('button', { name: 'Review publication', exact: true })
    .click();
  await saveProfile(fixture.db, 'fixture:alice', {
    handle: 'review_creator',
    displayName: 'Updated creator',
    bio: '',
    links: [],
  });
  await page.getByRole('button', { name: 'Publish drop', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText(
    'creator profile changed',
  );
  assert.equal(
    fixture.sqlite
      .prepare('SELECT count(*) AS n FROM community_publication')
      .get().n,
    1,
  );
  await page
    .getByRole('button', { name: 'Refresh creator profile', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Prepare publication' }),
  ).toBeVisible();
  await expect(
    page.getByLabel('Publication title', { exact: true }),
  ).toHaveValue('Forest drop');
  await expect(
    page.getByLabel(/^Original purchase or enquiry link/),
  ).toHaveValue('https://example.com/creator-enquiry');
  await page
    .getByRole('button', { name: 'Review publication', exact: true })
    .click();
  await expect(page.locator('.publication-review')).toContainText(
    'Updated creator',
  );
  await page.getByRole('button', { name: 'Publish drop', exact: true }).click();
  await expect(page.locator('a[href^="/builds/"]')).toHaveCount(1);
  const drop = fixture.sqlite
    .prepare(
      "SELECT metadata FROM community_publication WHERE json_extract(metadata, '$.kind')='drop'",
    )
    .get();
  assert.equal(
    JSON.parse(drop.metadata).externalUrl,
    'https://example.com/creator-enquiry',
  );
  assert.equal(
    JSON.parse(drop.metadata).availability,
    'Enquiries open with the creator',
  );
  console.log(
    'Creator review publishes the frozen revision once after a lost acknowledgement and preserves the device draft.',
  );
} finally {
  await browser.close();
  await fixture.close();
}

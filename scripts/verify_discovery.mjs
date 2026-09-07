import assert from 'node:assert/strict';
import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
const base =
  process.env.KEYCONF_PUBLICATION_BASE_URL ?? 'http://localhost:4180/';
const ids = JSON.parse(
  await readFile('/tmp/keyconf-publication-fixtures.json', 'utf8'),
);
const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const response = await page.request.get(
    new URL('api/publications', base).href,
  );
  assert.equal(response.status(), 200);
  assert.equal(response.headers()['cache-control'], 'no-store');
  const data = await response.json();
  assert.equal(data.items.length, 25);
  assert.ok(data.next);
  const next = await (
    await page.request.get(
      new URL(
        'api/publications?' +
          new URLSearchParams({
            before: data.next.publishedAt,
            id: data.next.id,
          }),
        base,
      ).href,
    )
  ).json();
  const all = [...data.items, ...next.items];
  assert.equal(all.length, 29);
  assert.equal(new Set(all.map((item) => item.id)).size, 29);
  assert.ok(all.some((item) => item.id === ids.active));
  assert.ok(all.some((item) => item.id === ids.retired));
  for (const secret of [
    'local-test-subject',
    'operationId',
    'proposal_',
    ids.withdrawn,
  ])
    assert.equal(JSON.stringify(all).includes(secret), false);
  assert.equal(
    (
      await page.request.get(
        new URL('api/publications?kind=private', base).href,
      )
    ).status(),
    400,
  );
  await page.goto(new URL('#discover', base).href);
  const gallery = page.getByRole('region', { name: 'Built to be shared.' });
  await expect(gallery.locator('.community-grid li')).toHaveCount(25);
  const more = gallery.getByRole('button', { name: 'Load more builds' });
  await more.focus();
  await page.keyboard.press('Enter');
  await expect(gallery.locator('.community-grid li')).toHaveCount(29);
  await expect(gallery.locator('.community-grid a').nth(25)).toBeFocused();
  await expect(gallery.locator('output')).toHaveText(
    '29 published builds shown.',
  );
  await gallery
    .getByRole('searchbox', { name: 'Search community builds' })
    .fill('élodie');
  await gallery.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(gallery.locator('.community-grid li')).toHaveCount(25);
  await page.route('**/api/publications?*', (route) => route.abort(), {
    times: 1,
  });
  await gallery.getByRole('button', { name: 'Load more builds' }).focus();
  await page.keyboard.press('Enter');
  const retryMore = gallery.getByRole('button', { name: 'Retry loading more' });
  await expect(retryMore).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(gallery.locator('.community-grid li')).toHaveCount(27);
  await expect(gallery.locator('.community-grid a').nth(25)).toBeFocused();
  await gallery
    .getByRole('searchbox', { name: 'Search community builds' })
    .fill('Local active');
  await gallery.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(gallery.locator('.community-grid li')).toHaveCount(1);
  assert.equal(
    await gallery.evaluate(
      (element) => element.scrollWidth > element.clientWidth + 1,
    ),
    false,
  );
  const accessibility = await new AxeBuilder({ page })
    .include('.community-discovery')
    .analyze();
  assert.deepEqual(
    accessibility.violations.map((entry) => entry.id),
    [],
  );
  await gallery.screenshot({ path: 'outputs/community-discovery-mobile.png' });
  await gallery
    .getByRole('searchbox', { name: 'Search community builds' })
    .fill('no matching build');
  await gallery.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(
    gallery.getByText('No matching releases.', { exact: false }),
  ).toBeVisible();
  await gallery
    .getByRole('searchbox', { name: 'Search community builds' })
    .fill('Local active');
  await page.route('**/api/publications?*', (route) => route.abort(), {
    times: 1,
  });
  await gallery.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(gallery.getByRole('alert')).toHaveText(
    'Published builds could not load.',
  );
  await gallery.getByRole('button', { name: 'Try again' }).click();
  await expect(gallery.locator('.community-grid li')).toHaveCount(1);
  await page.setViewportSize({ width: 1280, height: 900 });
  await gallery.screenshot({ path: 'outputs/community-discovery-desktop.png' });
  await gallery.getByRole('link', { name: /Local active release/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Local active release', exact: true }),
  ).toBeVisible();
  assert.ok(page.url().includes(ids.active));
  assert.deepEqual(errors, []);
  console.log(
    'Discovery Worker API, privacy exclusions, search, retry, mobile accessibility and publication navigation passed.',
  );
} finally {
  await browser.close();
}

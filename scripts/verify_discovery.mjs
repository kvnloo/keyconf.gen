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
  assert.equal(all.length, 32);
  assert.equal(new Set(all.map((item) => item.id)).size, 32);
  assert.ok(all.some((item) => item.id === ids.active));
  assert.ok(all.some((item) => item.id === ids.retired));
  for (const secret of [
    'local-test-subject',
    'operationId',
    'proposal_',
    ids.withdrawn,
    'Private palette name',
    'Private thumbnail',
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
  const skip = page.getByRole('link', {
    name: 'Skip to community builds',
    exact: true,
  });
  await skip.focus();
  assert.deepEqual(
    (await new AxeBuilder({ page }).include('.skip-link').analyze()).violations,
    [],
  );
  await skip.focus();
  await page.keyboard.press('Enter');
  await expect(
    gallery.getByRole('heading', { name: 'Built to be shared.', exact: true }),
  ).toBeFocused();
  assert.equal(new URL(page.url()).hash, '#discover');
  await expect(gallery.locator('.community-grid li')).toHaveCount(25);
  const more = gallery.getByRole('button', { name: 'Load more builds' });
  await more.focus();
  await page.keyboard.press('Enter');
  await expect(gallery.locator('.community-grid li')).toHaveCount(32);
  await expect(gallery.locator('.community-grid a').nth(25)).toBeFocused();
  await expect(gallery.locator('output')).toHaveText(
    '32 published builds shown.',
  );
  await expect(gallery.locator('canvas')).toHaveCount(0);
  const keyCounts = {
    'generic-60': 61,
    'generic-65': 67,
    'generic-75': 83,
    'q1-max-ansi': 81,
  };
  for (const geometry of Object.keys(keyCounts)) {
    const thumbnail = gallery
      .locator(`.build-thumbnail[data-geometry="${geometry}"]`)
      .first();
    await expect(thumbnail).toBeVisible();
    await expect(thumbnail.locator('[data-key]')).toHaveCount(
      keyCounts[geometry],
    );
    await expect(thumbnail.locator('[data-part="encoder"]')).toHaveCount(
      geometry === 'q1-max-ansi' ? 1 : 0,
    );
    if (geometry === 'q1-max-ansi')
      await expect(
        thumbnail.locator('[data-part="encoder"] circle').first(),
      ).toHaveAttribute('fill', '#858887');
  }
  for (const item of all) {
    assert.ok(item.thumbnail);
    const thumbnail = gallery.locator(
      `#publication-${item.id} .build-thumbnail`,
    );
    await expect(thumbnail.locator('[data-part="case"]')).toHaveAttribute(
      'fill',
      item.thumbnail.caseColor,
    );
    await expect(
      thumbnail.locator('[data-key="KeyA"] > rect').first(),
    ).toHaveAttribute('fill', item.thumbnail.colors.alpha);
    await expect(
      thumbnail.locator('[data-key="Enter"] > rect').first(),
    ).toHaveAttribute('fill', item.thumbnail.colors.accent);
    await expect(
      thumbnail.locator('[data-key="Space"] > rect').first(),
    ).toHaveAttribute('fill', item.thumbnail.colors.space);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await gallery
    .getByRole('searchbox', { name: 'Search community builds' })
    .fill('Thumbnail');
  await gallery.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(gallery.locator('.community-grid li')).toHaveCount(3);
  await gallery.screenshot({
    path: 'outputs/community-thumbnail-variants-desktop.png',
  });
  await page.setViewportSize({ width: 320, height: 844 });
  await gallery
    .locator('.build-thumbnail[data-geometry="q1-max-ansi"]')
    .screenshot({ path: 'outputs/community-thumbnail-q1-mobile.png' });
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
  await gallery.getByRole('button', { name: 'Search', exact: true }).focus();
  const filterBounds = await gallery.getByRole('combobox').boundingBox();
  const searchBounds = await gallery
    .getByRole('button', { name: 'Search', exact: true })
    .boundingBox();
  assert.ok(
    filterBounds &&
      searchBounds &&
      Math.abs(filterBounds.y - searchBounds.y) < 10,
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

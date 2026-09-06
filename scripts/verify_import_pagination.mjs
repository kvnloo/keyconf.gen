import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const source = 'https://store.example/collections/cases';
const next = {
  kind: 'shopify',
  source,
  catalog: { kind: 'more', after: 'page-2' },
  variants: [],
};
const product = (id) => ({
  name: 'Case option ' + id,
  brand: 'Fixture',
  url: `https://store.example/products/case?variant=${id}`,
  sku: 'CASE-' + id,
  pricing: { kind: 'exact', amount: '90', currency: 'USD' },
  availability: 'Available',
});
const result = (products, observedAt, continuation) => ({
  products,
  source,
  observedAt,
  next: continuation,
  method: 'Shopify Storefront API',
  coverage: 'Fixture collection page.',
});
const browser = await chromium.launch({ args: ['--disable-webgl'] });
const folder = await mkdtemp(path.join(tmpdir(), 'keyconf-import-pages-'));
try {
  const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
  const requests = [];
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('**/api/import', async (route) => {
    requests.push(route.request().postDataJSON());
    if (requests.length === 2)
      return route.fulfill({
        status: 503,
        json: { error: 'Temporary store failure.' },
      });
    await route.fulfill({
      json:
        requests.length === 1
          ? result([product(1), product(2)], '2026-09-05T10:00:00Z', next)
          : result(
              [product(2), product(3), product(4)],
              '2026-09-06T10:00:00Z',
              null,
            ),
    });
  });
  await page.goto(new URL('#studio', base).href);
  const button = (name) => page.getByRole('button', { name, exact: true });
  await button('Import a website').click();
  const url = page.getByRole('textbox', { name: 'Website URL' });
  await url.fill(source);
  await button('Preview').click();
  await page.getByText('2 products found', { exact: true }).waitFor();
  const checkboxes = page.locator('.import-list input[type="checkbox"]');
  await checkboxes.nth(0).uncheck();
  await url.fill('https://different-store.example/');
  await button('Load more options').click();
  await page
    .getByRole('alert')
    .filter({ hasText: 'Temporary store failure.' })
    .waitFor();
  assert.equal(await url.getAttribute('aria-invalid'), 'false');
  assert.equal(await checkboxes.count(), 2);
  assert.equal(await checkboxes.nth(1).isChecked(), true);
  await button('Load more options').click();
  await page.getByText('4 products found', { exact: true }).waitFor();
  assert.equal(await checkboxes.nth(0).isChecked(), false);
  assert.equal(await checkboxes.nth(1).isChecked(), true);
  assert.equal(await checkboxes.nth(2).isChecked(), false);
  assert.equal(await checkboxes.nth(3).isChecked(), false);
  assert.equal(await button('Load more options').count(), 0);
  assert.deepEqual(requests.slice(1), [
    { url: source, next },
    { url: source, next },
  ]);
  await checkboxes.nth(3).check();
  await button('Add 2 selected products').click();
  await button('Added to this browser').waitFor();
  await checkboxes.nth(2).check();
  await button('Add 3 selected products').click();
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.screenshot({
    path: 'outputs/import-pagination-phone.png',
  });
  await button('Close dialog').click();
  const downloadPending = page.waitForEvent('download');
  await button('Export your build').click();
  const download = await downloadPending;
  const file = path.join(folder, 'build.json');
  await download.saveAs(file);
  const exported = JSON.parse(await readFile(file, 'utf8'));
  assert.deepEqual(exported.build.customParts.map((p) => p.name).sort(), [
    'Case option 2',
    'Case option 3',
    'Case option 4',
  ]);
  assert.match(
    exported.build.customParts.find((p) => p.name === 'Case option 2').detail,
    /Observed 2026-09-05/,
  );
  assert.match(
    exported.build.customParts.find((p) => p.name === 'Case option 4').detail,
    /Observed 2026-09-06/,
  );
  assert.deepEqual(errors, []);
  console.log(
    '320px import pagination: source-bound retry, preserved choices, duplicate removal, explicit new selections, repeat add and per-page observation dates survive export.',
  );
} finally {
  await browser.close();
  await rm(folder, { recursive: true, force: true });
}

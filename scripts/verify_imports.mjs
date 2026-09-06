import { chromium, expect } from 'playwright/test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const directory = await mkdtemp(join(tmpdir(), 'keyconf-imports-'));
const browser = await chromium.launch({ args: ['--disable-webgl'] });
const source = 'https://example.com/products/caps';
const fixture = {
  '@graph': [
    {
      '@type': 'ProductGroup',
      name: 'Desk keycaps',
      brand: 'Fixture',
      hasVariant: [
        { '@id': '#ivory' },
        { '@id': '#sage' },
        { '@id': '#unpriced' },
      ],
    },
    {
      '@type': 'Product',
      '@id': source + '#ivory',
      color: 'Ivory',
      sku: 'CAP-I',
      url: '?variant=ivory',
      offers: { lowPrice: '45.00', highPrice: '65.00', priceCurrency: 'USD' },
    },
    {
      '@type': 'Product',
      '@id': '#sage',
      color: 'Sage',
      sku: 'CAP-S',
      url: '?variant=sage',
      offers: { lowPrice: '40.00', priceCurrency: 'USD' },
    },
    {
      '@type': 'Product',
      '@id': '#unpriced',
      color: 'Clear',
      sku: 'CAP-C',
      url: '?variant=clear',
    },
  ],
};
const saved = (page) =>
  page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
const button = (page, name) => page.getByRole('button', { name, exact: true });
try {
  const context = await browser.newContext({
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(new URL('#studio', base).href);
  await saved(page);
  await page.getByRole('tab', { name: 'Components', exact: true }).click();
  await button(page, 'Import a website').click();
  await page.getByRole('textbox', { name: 'Website URL' }).fill(source);
  await page.getByText('Have a product data export?', { exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Product JSON-LD' })
    .fill(JSON.stringify(fixture));
  await button(page, 'Preview').click();
  const rows = page.locator('.import-product');
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText('Desk keycaps · Ivory');
  await expect(rows.nth(0)).toContainText('USD 45.00 to 65.00');
  await expect(rows.nth(1)).toContainText('From USD 40.00');
  await expect(rows.nth(2)).toContainText('Price unverified');
  await expect(rows.nth(0)).toContainText('Fixture · CAP-I');
  await page
    .getByRole('combobox', { name: 'Add selected products as' })
    .click();
  await page.getByRole('option', { name: 'keycaps', exact: true }).click();
  await rows.nth(1).getByRole('checkbox').uncheck();
  const overflow = await page
    .getByRole('dialog')
    .evaluate(
      (dialog) =>
        [...dialog.querySelectorAll('.import-list, .import-product')].filter(
          (element) => element.scrollWidth > element.clientWidth + 1,
        ).length,
    );
  assert.equal(overflow, 0, 'Import rows must fit the 320px dialog');
  await page.screenshot({ path: join(directory, 'import-mobile.png') });
  if (process.env.KEYCONF_IMPORT_SCREENSHOT)
    await page.screenshot({ path: process.env.KEYCONF_IMPORT_SCREENSHOT });
  await button(page, 'Add 2 selected products').click();
  await expect(button(page, 'Added to this browser')).toBeDisabled();
  await button(page, 'Close dialog').click();
  await page.getByRole('button', { name: /^Keycaps / }).click();
  await page
    .getByRole('searchbox', { name: 'Search components' })
    .fill('Desk keycaps');
  await button(page, 'Use Fixture Desk keycaps · Ivory').click();
  await saved(page);
  await button(page, 'Share build').click();
  const share = await page
    .getByRole('textbox', { name: 'Build link' })
    .inputValue();
  await page.keyboard.press('Escape');
  const downloadPending = page.waitForEvent('download');
  await button(page, 'Export your build').click();
  const download = await downloadPending;
  const file = join(directory, 'build.json');
  await download.saveAs(file);
  const { build } = JSON.parse(await readFile(file, 'utf8'));
  assert.equal(build.customParts.length, 2);
  const ivory = build.customParts.find((part) => part.name.endsWith('Ivory'));
  const clear = build.customParts.find((part) => part.name.endsWith('Clear'));
  assert.equal(build.selection.keycaps, ivory.id);
  assert.match(ivory.detail, /CAP-I · USD 45.00 to 65.00/);
  assert.equal(ivory.source, source + '?variant=ivory');
  assert.equal(ivory.evidence, 'unknown');
  assert.match(clear.detail, /Price unverified/);
  const friend = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const friendPage = await friend.newPage();
  friendPage.on('pageerror', (error) => errors.push(error.message));
  await friendPage.goto(share);
  await button(friendPage, 'Customize a copy').first().click();
  await saved(friendPage);
  await friendPage
    .getByRole('tab', { name: 'Components', exact: true })
    .click();
  await expect(
    button(friendPage, 'Keycaps Desk keycaps · Ivory'),
  ).toBeVisible();
  await button(friendPage, 'Keycaps Desk keycaps · Ivory').click();
  await friendPage
    .getByRole('searchbox', { name: 'Search components' })
    .fill('Desk keycaps');
  const part = friendPage
    .getByRole('article')
    .filter({ has: button(friendPage, 'Use Fixture Desk keycaps · Ivory') });
  await expect(part).toContainText('USD 45.00 to 65.00');
  await expect(
    part.getByRole('link', { name: 'Unverified reference' }),
  ).toHaveAttribute('href', ivory.source);
  assert.deepEqual(errors, []);
  console.log(
    'PASS: variant names, price ranges and unknown prices survive selection, mobile import, download and sharing into a fresh desktop browser; no imported fit claim is invented.',
  );
} finally {
  await browser.close();
  await rm(directory, { recursive: true, force: true });
}

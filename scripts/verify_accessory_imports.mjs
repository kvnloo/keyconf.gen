import { chromium, expect } from 'playwright/test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const browser = await chromium.launch({ args: ['--disable-webgl'] });
const source = 'https://example.com/products/display?variant=amber';
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const button = (page, name) => page.getByRole('button', { name, exact: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(new URL('#studio', base).href);
  await button(page, 'Import a website').click();
  await page.getByRole('textbox', { name: 'Website URL' }).fill(source);
  await page.getByText('Have a product data export?', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Product JSON-LD' }).fill(
    JSON.stringify({
      '@type': 'Product',
      name: 'Amber desk display',
      brand: 'Fixture maker',
      sku: 'AMBER-42',
      url: source,
    }),
  );
  await button(page, 'Preview').click();
  await page
    .getByRole('combobox', { name: 'Add selected products as' })
    .click();
  await page
    .getByRole('option', { name: 'Screen · beside the keyboard', exact: true })
    .click();
  await button(page, 'Add 1 selected products').click();
  await expect(button(page, 'Added to this browser')).toBeDisabled();
  await button(page, 'Close dialog').click();
  await page
    .getByText('Accessories & artisan caps', { exact: false })
    .first()
    .click();
  await expect(
    page.getByRole('heading', { name: 'Amber desk display', exact: true }),
  ).toBeVisible();
  await button(page, 'Undo change').click();
  await expect(
    page.getByRole('heading', { name: 'Amber desk display', exact: true }),
  ).toHaveCount(0);
  await button(page, 'Redo change').click();
  await expect(
    page.getByRole('heading', { name: 'Amber desk display', exact: true }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole('tab', { name: 'Components', exact: true }).click();
  await page
    .getByText('Accessories & artisan caps', { exact: false })
    .first()
    .click();
  await expect(
    page.getByRole('heading', { name: 'Amber desk display', exact: true }),
  ).toBeVisible();
  const downloadPending = page.waitForEvent('download');
  await button(page, 'Export your build').click();
  const download = await downloadPending;
  const path = await download.path();
  const exported = JSON.parse(await readFile(path, 'utf8'));
  assert.equal(exported.build.customAccessories.length, 1);
  assert.equal(exported.build.accessories.length, 1);
  const product = exported.build.customAccessories[0];
  assert.equal(product.source, source);
  assert.equal(product.sku, 'AMBER-42');
  assert.equal(product.placement, 'external');
  assert.equal(product.geometry, 'unavailable');
  assert.deepEqual(exported.accessoryReferences, [product]);
  await button(page, 'Search parts and studio').click();
  await page
    .getByRole('searchbox', { name: 'Search parts and studio' })
    .fill('Amber desk display');
  await expect(page.locator('.search-results button')).toHaveCount(1);
  await page.locator('.search-results button').click();
  await expect(page.getByRole('dialog').getByRole('link')).toHaveAttribute(
    'href',
    source,
  );
  await button(page, 'Close dialog').click();
  await button(page, 'Share build').click();
  const link = await page
    .getByRole('textbox', { name: 'Build link' })
    .inputValue();
  const friend = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  friend.on('pageerror', (error) => errors.push(error.message));
  await friend.goto(link);
  await expect(
    friend.getByRole('link', { name: 'Amber desk display', exact: true }),
  ).toHaveAttribute('href', source);
  assert.deepEqual(errors, []);
  console.log(
    'Reviewed accessory import, atomic Undo/Redo, reload, export and clean-device preview passed.',
  );
} finally {
  await browser.close();
}

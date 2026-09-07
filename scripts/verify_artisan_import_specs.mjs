import { chromium, expect } from 'playwright/test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const browser = await chromium.launch({ args: ['--disable-webgl'] });
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const source = 'https://example.com/artisan?variant=one-unit';
try {
  const page = await browser.newPage({ viewport: { width: 320, height: 844 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(new URL('#studio', base).href);
  await page
    .getByRole('button', { name: 'Import a website', exact: true })
    .click();
  await page.getByRole('textbox', { name: 'Website URL' }).fill(source);
  await page.getByText('Have a product data export?', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Product JSON-LD' }).fill(
    JSON.stringify({
      '@type': 'Product',
      name: 'Maker artisan',
      brand: 'Maker',
      url: source,
      sku: '1U',
    }),
  );
  await page.getByRole('button', { name: 'Preview', exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Add selected products as' })
    .click();
  await page
    .getByRole('option', { name: 'Artisan keycap · on a key', exact: true })
    .click();
  const width = page.getByRole('spinbutton', {
    name: 'Width in key units (u)',
  });
  await expect(width).toHaveValue('');
  await width.fill('-1');
  await page.getByRole('button', { name: 'Add 1 selected products' }).click();
  await expect(page.getByRole('dialog').getByRole('alert')).toContainText(
    'Invalid imported artisan specification.',
  );
  await width.fill('1');
  await page.getByRole('combobox', { name: 'Stem interface' }).click();
  await page
    .getByRole('option', { name: 'MX cross stem', exact: true })
    .click();
  assert.equal(
    await page
      .locator('.artisan-import-specs')
      .evaluate((element) => element.scrollWidth > element.clientWidth + 1),
    false,
  );
  await page.getByRole('button', { name: 'Add 1 selected products' }).click();
  await expect(
    page.getByRole('button', { name: 'Added to this browser' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page
    .getByText('Accessories & artisan caps', { exact: false })
    .first()
    .click();
  await page
    .getByRole('combobox', { name: 'Target key for Maker artisan' })
    .click();
  await page.getByRole('option', { name: /· KeyA · 1u$/ }).click();
  const downloadPending = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Export your build', exact: true })
    .click();
  const path = await (await downloadPending).path();
  const exported = JSON.parse(await readFile(path, 'utf8'));
  const product = exported.build.customAccessories[0];
  assert.equal(product.sizeU, 1);
  assert.equal(product.stem, 'mx');
  assert.equal(product.fit, 'unknown');
  assert.equal(product.geometry, 'unavailable');
  assert.equal(product.source, source);
  assert.match(product.detail, /entered by user/);
  assert.equal(exported.build.accessories[0].location.keyId, 'KeyA');
  assert.deepEqual(errors, []);
  console.log(
    'Reviewed artisan width/stem, invalid-width recovery, key assignment and export passed at 320px.',
  );
} finally {
  await browser.close();
}

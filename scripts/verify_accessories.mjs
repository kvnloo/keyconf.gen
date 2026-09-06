import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { decodeBuild } from '../lib/build.ts';
import { accessoryCatalog } from '../lib/build-accessories.ts';

const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(
    new URL('#studio', process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/')
      .href,
  );
  await page.getByRole('tab', { name: 'Components', exact: true }).click();
  const accessories = page.locator('.build-accessories');
  await accessories.locator(':scope > summary').click();
  await accessories.getByText('Add an accessory', { exact: true }).click();
  const add = accessories.getByRole('button', { name: /^Add / }).first();
  for (const product of accessoryCatalog) {
    const makerLink = page
      .locator('.accessory-options a')
      .filter({ hasText: product.brand })
      .filter({ visible: true });
    assert.ok(
      (
        await makerLink.evaluateAll((links) => links.map((link) => link.href))
      ).includes(product.source),
    );
  }
  await add.click();
  assert.equal(await page.locator('.accessory-selections article').count(), 1);
  const slot = accessories.getByRole('textbox').first();
  await slot.fill('upper-right');
  await slot.press('Tab');
  await accessories
    .getByRole('status')
    .filter({ hasText: 'Placement saved' })
    .waitFor();
  await slot.fill('invalid space');
  await slot.press('Tab');
  assert.equal(await slot.inputValue(), 'upper-right');
  await page.getByRole('button', { name: 'Share build', exact: true }).click();
  const url = await page
    .getByRole('textbox', { name: 'Build link' })
    .inputValue();
  assert.equal(
    decodeBuild(new URL(url).hash.slice(7)).accessories[0].location.slotId,
    'upper-right',
  );
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.reload();
  await page.getByRole('tab', { name: 'Components', exact: true }).click();
  await accessories.locator(':scope > summary').click();
  assert.equal(await page.locator('.accessory-selections article').count(), 1);
  assert.equal(
    await accessories.getByRole('textbox').first().inputValue(),
    'upper-right',
  );
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
  }
  await accessories.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: 'outputs/accessories-desktop.png',
    fullPage: true,
  });
  await accessories.getByRole('button', { name: /^Remove / }).click();
  assert.equal(await page.locator('.accessory-selections article').count(), 0);
  console.log(
    'Accessory add, placement validation, share, reload, remove and three-width checks passed.',
  );
} finally {
  await browser.close();
}

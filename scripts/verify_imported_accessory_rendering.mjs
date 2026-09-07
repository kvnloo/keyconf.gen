import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { defaultBuild, encodeBuild } from '../lib/build.ts';
import { createImportedAccessory } from '../lib/imported-accessories.ts';
import { newAccessorySelection } from '../lib/build-accessories.ts';

const customAccessories = await Promise.all(
  [
    { kind: 'screen', placement: 'external' },
    { kind: 'knob', placement: 'embedded' },
  ].map((variant) =>
    createImportedAccessory({
      ...variant,
      origin: 'import',
      name: `Imported ${variant.kind}`,
      brand: 'Maker',
      detail: 'Unverified imported reference',
      source: 'https://example.com/product',
      sku: null,
      observedAt: '2026-09-06T00:00:00.000Z',
      method: 'Structured data',
      fit: 'unknown',
      geometry: 'unavailable',
      sizeU: null,
      stem: null,
    }),
  ),
);
const build = {
  ...defaultBuild,
  customAccessories,
  accessories: customAccessories.map((product) =>
    newAccessorySelection(product.id, customAccessories),
  ),
};
const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
page.setDefaultTimeout(60000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  await page.goto(
    new URL(
      '#build=' + encodeBuild(build),
      process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/',
    ).href,
  );
  await page.waitForFunction(() => {
    const node = document.querySelector('[data-accessory-external-count]');
    return (
      node?.dataset.accessoryExternalCount === '1' &&
      node.dataset.accessoryPlannedCount === '1'
    );
  });
  await page
    .getByText('Accessories & artisan caps', { exact: false })
    .first()
    .click();
  assert.equal(
    await page
      .getByRole('heading', { name: 'Imported screen', exact: true })
      .count(),
    1,
  );
  assert.equal(
    await page
      .getByRole('heading', { name: 'Imported knob', exact: true })
      .count(),
    1,
  );
  assert.equal(
    await page
      .getByText('Imported reference. Product geometry is unavailable;', {
        exact: false,
      })
      .count(),
    2,
  );
  await page.screenshot({ path: 'outputs/imported-accessories-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'outputs/imported-accessories-mobile.png' });
  await page
    .getByRole('button', { name: 'Remove Imported screen', exact: true })
    .click();
  await page.waitForFunction(
    () =>
      document.querySelector('[data-accessory-external-count]')?.dataset
        .accessoryExternalCount === '0',
  );
  assert.deepEqual(errors, []);
  console.log(
    'Imported accessory rendering and removal passed at desktop and mobile widths.',
  );
} finally {
  await browser.close();
}

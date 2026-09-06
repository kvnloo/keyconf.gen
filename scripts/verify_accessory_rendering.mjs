import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { defaultBuild, encodeBuild } from '../lib/build.ts';
import { newAccessorySelection } from '../lib/build-accessories.ts';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
page.setDefaultTimeout(60000);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const artisan = {
  ...newAccessorySelection('jelly-key-zen-pond-v-1u'),
  location: { kind: 'key', keyId: 'KeyA' },
};
const pad = {
  ...newAccessorySelection('adafruit-5128-macropad'),
  location: { kind: 'external', position: 'left' },
};
async function open(accessories, layout = '60') {
  await page.goto(
    new URL(
      '#build=' + encodeBuild({ ...defaultBuild, layout, accessories }),
      base,
    ).href,
  );
  await page.locator('[data-accessory-artisan-count]').waitFor();
}
async function counts(artisans, externals) {
  await page.waitForFunction(
    ({ artisans, externals }) => {
      const node = document.querySelector('[data-accessory-artisan-count]');
      return (
        node?.dataset.accessoryArtisanCount === String(artisans) &&
        node?.dataset.accessoryExternalCount === String(externals)
      );
    },
    { artisans, externals },
  );
}
try {
  await open([artisan, pad]);
  await counts(1, 1);
  await page.screenshot({
    path: 'outputs/accessories-rendered-desktop.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Explode', exact: true }).click();
  await counts(1, 1);
  await page.screenshot({
    path: 'outputs/accessories-rendered-exploded.png',
    fullPage: true,
  });
  await open([{ ...artisan, location: { kind: 'key', keyId: 'Space' } }, pad]);
  await counts(0, 1);
  await open([artisan, { ...artisan, id: 'duplicate-key' }, pad]);
  await counts(0, 1);
  await open([artisan, pad], '75');
  await counts(1, 1);
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    true,
  );
  const layers = await page
    .getByRole('navigation', { name: 'Exploded keyboard layers' })
    .boundingBox();
  const dial = await page.locator('.stage > .volume-dial').boundingBox();
  assert.ok(
    layers &&
      dial &&
      (layers.y + layers.height <= dial.y ||
        layers.x + layers.width <= dial.x ||
        dial.x + dial.width <= layers.x),
    'Exploded layer links must not overlap volume controls on mobile',
  );
  await page.screenshot({
    path: 'outputs/accessories-rendered-mobile.png',
    fullPage: true,
  });
  for (const position of ['right', 'above']) {
    await open([artisan, { ...pad, location: { kind: 'external', position } }]);
    await counts(1, 1);
  }
  await open([]);
  await counts(0, 0);
  assert.deepEqual(errors, []);
  console.log(
    'Rendered artisan/macropad, explosion, invalid width, duplicate placement, layout change, mobile and removal checks passed.',
  );
} finally {
  await context.close();
  await browser.close();
}

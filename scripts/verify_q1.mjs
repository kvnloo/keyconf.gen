import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { defaultBuild, encodeBuild } from '../lib/build.ts';
const browser = await chromium.launch({
  headless: !process.env.KEYCONF_HEADED,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const build = {
    ...defaultBuild,
    layout: '75',
    selection: {
      ...defaultBuild.selection,
      case: 'q1-max-case',
      pcb: 'q1-max-pcb',
      plate: 'q1-max-plate',
    },
    accessories: [
      {
        id: 'knob',
        productId: 'keychron-aluminum-knob',
        quantity: 1,
        location: { kind: 'embedded', slotId: 'stock-knob' },
      },
    ],
  };
  await page.goto(
    new URL(
      '#build=' + encodeBuild(build),
      process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/',
    ).href,
    { waitUntil: 'domcontentloaded', timeout: 60000 },
  );
  await page.waitForFunction(
    () => document.querySelector('[data-switch-count="81"]'),
    null,
    { timeout: 120000 },
  );
  await page.locator('.build-accessories > summary').click();
  assert.match(
    await page.locator('.accessory-fit').innerText(),
    /Fit confirmed/,
  );
  const slot = page.getByRole('combobox', {
    name: 'Board slot for Aluminum knob',
  });
  await slot.click();
  await page
    .getByRole('option', { name: 'Choose a slot', exact: true })
    .click();
  await page.waitForFunction(() =>
    document
      .querySelector('.accessory-fit')
      ?.textContent?.includes('Fit unknown'),
  );
  await slot.click();
  await page
    .getByRole('option', { name: 'Stock knob cap', exact: true })
    .click();
  await page.waitForFunction(() =>
    document
      .querySelector('.accessory-fit')
      ?.textContent?.includes('Fit confirmed'),
  );
  console.log('Q1 Max rendered: 81 switches; stock cap fit confirmed.');
  await page.screenshot({
    path: 'outputs/q1-max-desktop.png',
    animations: 'disabled',
    timeout: 60000,
  });
  await page.getByRole('button', { name: 'Explode', exact: true }).click();
  await page.screenshot({
    path: 'outputs/q1-max-exploded.png',
    animations: 'disabled',
    timeout: 60000,
  });
  await page.goto(
    new URL(
      '#preview=' + encodeBuild(build),
      process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/',
    ).href,
    { waitUntil: 'domcontentloaded', timeout: 60000 },
  );
  await page.waitForFunction(
    () => document.querySelector('[data-switch-count="81"]'),
    null,
    { timeout: 120000 },
  );
  assert.match(
    await page
      .getByRole('listitem')
      .filter({ has: page.getByRole('link', { name: 'Aluminum knob' }) })
      .innerText(),
    /Placement: stock-knob\. Fit: confirmed/,
  );
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
      `Q1 preview overflows at ${width}px`,
    );
    assert.equal(
      await page.getByRole('button', { name: /Customize a copy/ }).isVisible(),
      true,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    'Q1 Max renders 81 switches and confirms the stock replacement cap.',
  );
} finally {
  await browser.close();
}

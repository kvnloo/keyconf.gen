import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { defaultBuild } from '../lib/build.ts';
import { previewLink } from '../lib/shared-preview.ts';
import { catalog, categories } from '../lib/catalog.ts';
import { accessoryCatalog } from '../lib/build-accessories.ts';

const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  await page.addInitScript(() => {
    window.previewGains = [];
    window.previewRamps = [];
    const ramp = Reflect.get(AudioParam.prototype, 'linearRampToValueAtTime');
    AudioParam.prototype.linearRampToValueAtTime = function (value, time) {
      window.previewRamps.push({ param: this, value, time });
      return ramp.call(this, value, time);
    };
    window.finishUnlock = null;
    window.holdUnlock = false;
    const resume = Reflect.get(AudioContext.prototype, 'resume');
    AudioContext.prototype.resume = function () {
      const result = resume.call(this);
      return window.holdUnlock
        ? result.then(
            () =>
              new Promise((resolve) => {
                window.finishUnlock = resolve;
              }),
          )
        : result;
    };
    const gain = Reflect.get(AudioContext.prototype, 'createGain');
    AudioContext.prototype.createGain = function () {
      const node = gain.call(this);
      window.previewGains.push(node);
      return node;
    };
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
  const mine = { ...defaultBuild, name: 'Keep my original keyboard' };
  const artisan = accessoryCatalog.find(
    (part) => part.kind === 'artisan' && part.sizeU === 1,
  );
  assert.ok(artisan);
  const shared = {
    ...defaultBuild,
    name: 'A creator’s shared study',
    layout: '65',
    accessories: [
      {
        id: 'preview-artisan',
        productId: artisan.id,
        quantity: 1,
        location: { kind: 'key', keyId: 'Escape' },
      },
    ],
  };
  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  const storageKey = await page.evaluate(() =>
    Object.keys(localStorage).find((key) =>
      /^keyconf-build-v1(?::nightly|:dev)?$/.test(key),
    ),
  );
  assert.ok(storageKey);
  await page.evaluate(
    ({ storageKey, mine }) =>
      localStorage.setItem(storageKey, JSON.stringify(mine)),
    { storageKey, mine },
  );
  await page.goto(previewLink(shared, base));
  await page.getByRole('heading', { name: shared.name, exact: true }).waitFor();
  const stored = () =>
    page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey);
  assert.deepEqual(await stored(), mine);
  await page.locator('[data-scene-status="ready"]').waitFor({ timeout: 30000 });
  for (const category of categories) {
    const part = catalog.find((item) => item.id === shared.selection[category]);
    assert.ok(part);
    assert.ok(
      await page
        .locator('.preview-parts a')
        .evaluateAll(
          (links, source) => links.some((link) => link.href === source),
          part.source,
        ),
    );
  }
  assert.ok(
    await page
      .locator('.preview-parts a')
      .evaluateAll(
        (links, source) => links.some((link) => link.href === source),
        artisan.source,
      ),
  );
  await page.getByRole('button', { name: 'Explode', exact: true }).click();
  await page.getByRole('button', { name: 'Hear a key', exact: true }).click();
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .waitFor();
  await page.keyboard.press('KeyA');
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .click();
  assert.deepEqual(await stored(), mine);
  await page.evaluate(async () => {
    await window.previewGains
      .find((node) => node.context.state !== 'closed')
      .context.suspend();
    window.holdUnlock = true;
  });
  await page
    .getByRole('button', { name: 'Enable keyboard sound', exact: true })
    .click();
  await page.waitForFunction(() => window.finishUnlock !== null);
  const volume = page.getByRole('slider', {
    name: 'Keyboard volume',
    exact: true,
  });
  await volume.press('Home');
  for (let i = 0; i < 3; i++) await volume.press('PageUp');
  for (let i = 0; i < 7; i++) await volume.press('ArrowUp');
  assert.equal(await volume.inputValue(), '74');
  await page.waitForFunction(() => window.previewRamps.at(-1)?.value === 0.74);
  const rampsBeforeUnlock = await page.evaluate(
    () => window.previewRamps.length,
  );
  await page.evaluate(() => {
    window.holdUnlock = false;
    window.finishUnlock();
  });
  await page.waitForFunction(
    (count) => window.previewRamps.length > count,
    rampsBeforeUnlock,
  );
  assert.equal(
    await page.evaluate(() => window.previewRamps.at(-1).value),
    0.74,
  );
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .click();
  await page.reload();
  await page.locator('[data-scene-status="ready"]').waitFor();
  await mkdir('outputs', { recursive: true });
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const axe = await new AxeBuilder({ page }).analyze();
    assert.deepEqual(axe.violations, []);
    await page.screenshot({
      path: `outputs/shared-preview-${width}.png`,
      fullPage: false,
    });
  }
  console.log('Preview scene, sound and responsive accessibility passed.');
  const editor = await context.newPage();
  await editor.goto(new URL('#studio', base).href);
  await editor
    .getByRole('textbox', { name: 'Build name', exact: true })
    .fill('Newer edit in another tab');
  await editor
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  const latest = { ...mine, name: 'Newer edit in another tab' };
  const reader = await context.newPage();
  await reader.goto(previewLink(shared, base));
  await reader
    .getByRole('heading', { name: shared.name, exact: true })
    .waitFor();
  await reader.close();
  assert.deepEqual(await stored(), latest);
  await editor.close();
  await page.reload();
  await page.getByRole('heading', { name: shared.name, exact: true }).waitFor();
  assert.deepEqual(await stored(), latest);
  await page.getByRole('link', { name: 'My studio', exact: true }).click();
  assert.equal(
    await page
      .getByRole('textbox', { name: 'Build name', exact: true })
      .inputValue(),
    latest.name,
  );
  await page.goBack();
  await page
    .getByRole('button', { name: 'Customize a copy', exact: true })
    .click();
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  assert.equal(
    await page
      .getByRole('textbox', { name: 'Build name', exact: true })
      .inputValue(),
    shared.name,
  );
  await page.getByRole('button', { name: 'Undo change', exact: true }).click();
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  assert.deepEqual(await stored(), latest);
  await page.goto(new URL('#preview=broken', base).href);
  await page
    .getByRole('heading', { name: 'Preview unavailable', exact: true })
    .waitFor();
  assert.deepEqual(await stored(), latest);
  const fresh = await browser.newContext();
  const freshPage = await fresh.newPage();
  await freshPage.goto(previewLink(shared, base));
  await freshPage
    .getByRole('heading', { name: shared.name, exact: true })
    .waitFor();
  assert.equal(
    await freshPage.evaluate(() =>
      Object.keys(localStorage).some((key) =>
        key.startsWith('keyconf-build-v1'),
      ),
    ),
    false,
    'Cold preview must not create a device draft',
  );
  await fresh.close();
  assert.deepEqual(errors, []);
  console.log(
    'Shared preview: real 3D, sound controls, source links, 320/390/1280 accessibility, refresh, return, explicit copy/undo and malformed-link isolation passed.',
  );
} finally {
  await browser.close();
}

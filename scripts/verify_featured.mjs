import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { decodeBuild } from '../lib/build.ts';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const browser = await chromium.launch({ args: ['--disable-webgl'] });
const context = await browser.newContext();
const page = await context.newPage();
page.setDefaultTimeout(15000);
const button = (name) => page.getByRole('button', { name, exact: true });
const link = (name) => page.getByRole('link', { name, exact: true });
async function snapshot() {
  await button('Share build').click();
  const url = await page
    .getByRole('textbox', { name: 'Build link' })
    .inputValue();
  await button('Close dialog').click();
  return decodeBuild(new URL(url).hash.slice(7));
}

try {
  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  await page
    .getByRole('textbox', { name: 'Build name', exact: true })
    .fill('Keep my working build');
  const volume = page.getByRole('slider', {
    name: 'Keyboard volume',
    exact: true,
  });
  await volume.focus();
  await page.keyboard.press('End');
  await page.keyboard.press('PageDown');
  assert.equal(await volume.inputValue(), '180');
  const original = await snapshot();
  assert.equal(original.audio.volume, 1.8);

  await link('keyconf beta').click();
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const more = button('More builds');
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="More builds"]')?.disabled,
  );
  assert.equal(await button('Previous builds').isEnabled(), false);
  for (let step = 0; step < 6 && (await more.isEnabled()); step++) {
    const before = await page
      .locator('.featured-cards')
      .evaluate((el) => el.scrollLeft);
    await more.click();
    await page.waitForFunction(
      (before) => document.querySelector('.featured-cards').scrollLeft > before,
      before,
    );
    await page.waitForFunction(() => {
      const strip = document.querySelector('.featured-cards');
      return (
        document.querySelector('[aria-label="More builds"]').disabled ===
        strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1
      );
    });
  }
  await page.waitForFunction(() => {
    const strip = document
      .querySelector('.featured-cards')
      .getBoundingClientRect();
    const last = document
      .querySelector('.featured-card:last-child')
      .getBoundingClientRect();
    return last.left >= strip.left - 1 && last.right <= strip.right + 1;
  });
  assert.equal(await more.isEnabled(), false);
  assert.equal(
    await button('Preview Forest Line').getAttribute('aria-pressed'),
    'true',
    'Browsing the strip must not change the selected build',
  );
  await button('Previous builds').click();
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="More builds"]')?.disabled,
  );
  await page.setViewportSize({ width: 1280, height: 900 });
  await button('Preview Blush').click();
  await button('Preview Grok Bot').click();
  await button('Preview Codex Micro').click();
  await page.keyboard.press('Control+z');
  await link('Resume build').click();
  assert.deepEqual(
    await snapshot(),
    original,
    'Browsing and preview shortcuts must preserve the working build',
  );

  await link('keyconf beta').click();
  await button('Preview Blush').click();
  assert.equal(
    await button('Customize Blush').count(),
    2,
    'Both entry points must name the selected build',
  );
  assert.equal(
    await button('Preview Blush').getAttribute('aria-pressed'),
    'true',
  );
  assert.equal(
    await button('Preview Forest Line').getAttribute('aria-pressed'),
    'false',
  );
  await page
    .getByRole('complementary', { name: 'Featured build preview' })
    .getByRole('button', { name: 'Customize Blush', exact: true })
    .click();
  const customized = await snapshot();
  assert.equal(customized.name, 'Blush');
  assert.equal(customized.layout, '65');
  assert.equal(customized.audio.volume, 1.8);
  await button('Undo change').click();
  assert.deepEqual(
    await snapshot(),
    original,
    'One undo must restore the whole previous build',
  );

  await link('Sound').click();
  assert.deepEqual(await snapshot(), original);
  await link('Play').click();
  assert.deepEqual(await snapshot(), original);
  await link('Discover').click();
  await page
    .getByRole('heading', { name: 'Find your next favorite.' })
    .waitFor();
  await link('Build').click();
  assert.deepEqual(await snapshot(), original);
  await page.reload();
  assert.deepEqual(
    await snapshot(),
    original,
    'Navigation and reload retain gain and build state',
  );
  assert.equal(
    await button('Enable keyboard sound').count(),
    1,
    'Restoration cannot enable sound',
  );
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of ['Build', 'Sound', 'Play', 'Discover']) {
      const nav = page.getByRole('navigation', { name: 'Studio pages' });
      await nav.getByRole('link', { name, exact: true }).click();
      await nav
        .getByRole('link', { name, exact: true })
        .and(page.locator('[aria-current="page"]'))
        .waitFor();
      assert.equal(
        await nav
          .getByRole('link', { name, exact: true })
          .getAttribute('aria-current'),
        'page',
      );
      for (const destination of ['Build', 'Sound', 'Play', 'Discover'])
        assert.ok(
          await nav
            .getByRole('link', { name: destination, exact: true })
            .isVisible(),
          `${destination} must remain visible on ${name} at ${width}px`,
        );
      assert.ok(
        await button('Share build').isVisible(),
        `Build utilities remain available on ${name}`,
      );
      const dimensions = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert.ok(
        dimensions.scroll <= dimensions.client + 1,
        `${name} overflows at ${width}px`,
      );
    }
  }
  console.log(
    'PASS: all six presets reachable at 320px without changing selection; preview isolation, named customization and one-step undo, four-route persistence, volume control and muted reload.',
  );
} finally {
  await context.close();
  await browser.close();
}

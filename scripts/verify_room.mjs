import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const headed = process.env.KEYCONF_HEADED === '1';
const browser = await chromium.launch({
  headless: !headed,
  args: headed
    ? []
    : [
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
      ],
});
const evidence = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  });
  page.setDefaultTimeout(45000);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  const textures = new Map();
  page.on('response', (response) => {
    if (response.url().includes('/textures/'))
      textures.set(
        new URL(response.url()).pathname.split('/').pop(),
        response.status(),
      );
  });
  await page.goto(base);
  await page.locator('.scene-host[data-scene-status="ready"]').waitFor();
  await page.waitForFunction(
    () =>
      document.querySelector('.scene-host')?.dataset.renderState === 'active',
  );
  await page
    .getByRole('button', { name: 'Pause room motion', exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  const frozen = await page.locator('.scene-host canvas').screenshot();
  await page.waitForTimeout(750);
  assert.deepEqual(
    await page.locator('.scene-host canvas').screenshot(),
    frozen,
    'Pausing must freeze the actual rendered room',
  );
  await page.screenshot({
    path: 'outputs/solarpunk-landing.png',
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Resume room motion', exact: true })
    .click();
  await page.waitForTimeout(1400);
  assert.ok(
    !(await page.locator('.scene-host canvas').screenshot()).equals(frozen),
    'Breeze and steam must change rendered pixels',
  );
  await page.evaluate(() => {
    document.body.style.paddingBottom = '2400px';
    window.scrollTo(0, 2400);
  });
  await page.waitForFunction(
    () =>
      document.querySelector('.scene-host')?.dataset.renderState === 'paused',
  );
  const frame = await page
    .locator('.scene-host')
    .getAttribute('data-render-frames');
  await page.waitForTimeout(500);
  assert.equal(
    await page.locator('.scene-host').getAttribute('data-render-frames'),
    frame,
    'Offscreen room must stop rendering',
  );
  await page.evaluate(() => {
    document.body.style.paddingBottom = '';
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () =>
      document.querySelector('.scene-host')?.dataset.renderState === 'active',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  await page
    .getByRole('button', { name: 'Pause room motion', exact: true })
    .waitFor({ state: 'hidden' });
  assert.equal(textures.get('solarpunk-sketchbook.png'), 200);
  assert.equal(textures.get('solarpunk-window-garden.png'), 200);
  assert.deepEqual(errors, []);
  evidence.push(
    'Actual room pixels animate, pause freezes them, offscreen frames stop, return resumes, and live reduced-motion changes stop ambient work. Both original texture assets load without runtime or shader errors.',
  );
  await page.close();
} finally {
  await browser.close();
}
const fallbackBrowser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const page = await fallbackBrowser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await page.goto(new URL('#play', base).href);
  await page.locator('.scene-host[data-scene-status="error"]').waitFor();
  const frame = page.frameLocator('.typing-frame');
  await frame.locator('#words .word').first().waitFor();
  await page.locator('.typing-load').waitFor({ state: 'hidden' });
  const bounds = await page.locator('.monitor-display').boundingBox();
  assert.ok(
    bounds.width > 280 && bounds.x >= 0 && bounds.x + bounds.width <= 390,
    '3D failure must retain a readable typing viewport',
  );
  await frame
    .getByRole('button', { name: 'test settings', exact: true })
    .click();
  await page.keyboard.press('Escape');
  await page.screenshot({
    path: 'outputs/solarpunk-typing-fallback.png',
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Back to builder', exact: true })
    .click();
  evidence.push(
    'Monkeytype settings and return to builder remain usable at 390px when WebGL creation fails.',
  );
} finally {
  await fallbackBrowser.close();
}
await writeFile(
  'outputs/room-verification.json',
  JSON.stringify({ base, evidence }, null, 2),
);
console.log(evidence.join('\n'));

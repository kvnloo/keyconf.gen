import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const headed = process.env.KEYCONF_HEADED === '1';
const software = !headed || process.env.KEYCONF_SOFTWARE === '1';
const browser = await chromium.launch({
  headless: !headed,
  args: !software
    ? []
    : [
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
        ...(headed && process.platform === 'linux'
          ? ['--ozone-platform=x11']
          : []),
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
  // The studio room paints its forest, plaster, walnut and wallpapers
  // procedurally; the sketchbook illustration is the only texture it fetches.
  const textureLoads = ['solarpunk-sketchbook.png'].map((name) =>
    page
      .waitForResponse((response) =>
        response.url().endsWith('/textures/' + name),
      )
      .then((response) => response.finished()),
  );
  await page.goto(base);
  await Promise.all(textureLoads);
  await page.locator('.scene-host[data-scene-status="ready"]').waitFor();
  if (software)
    assert.equal(
      await page.locator('.scene-host').getAttribute('data-render-quality'),
      'efficient',
      'Software rendering must use the lighter effects path',
    );
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
  const roomBounds = await page.locator('.scene-host canvas').boundingBox();
  assert.ok(roomBounds && roomBounds.width > 0 && roomBounds.height > 0);
  // The landing chrome now floats over the canvas (glass header, panels,
  // lazy thumbnails, backdrop blur), so hide it while capturing: these checks
  // are about the rendered room, not the DOM above it.
  const captureRoom = async () => {
    await page.addStyleTag({
      content:
        '.studio-header,.stage > :not(.scene-host),.scene-host > :not(canvas){visibility:hidden !important}',
    });
    const shot = await page.screenshot({ clip: roomBounds });
    await page.evaluate(
      () =>
        document.head.lastElementChild?.matches('style') &&
        document.head.lastElementChild.remove(),
    );
    return shot;
  };
  const framesBefore = await page
    .locator('.scene-host')
    .getAttribute('data-render-frames');
  const frozen = await captureRoom();
  await page.waitForTimeout(750);
  // Buffer.equals, not deepEqual: a failing deepEqual on two full-page PNGs
  // spends minutes building its diff and looks like a hang.
  const after = await captureRoom();
  const framesAfter = await page
    .locator('.scene-host')
    .getAttribute('data-render-frames');
  assert.ok(
    after.equals(frozen),
    `Pausing must freeze the actual rendered room (frames ${framesBefore} -> ${framesAfter})`,
  );
  await page.screenshot({
    path: 'outputs/solarpunk-landing.png',
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Resume room motion', exact: true })
    .click();
  assert.deepEqual(
    await page.locator('.scene-host canvas').boundingBox(),
    roomBounds,
  );
  const moving = await captureRoom();
  await page.waitForTimeout(1400);
  assert.ok(
    !(await captureRoom()).equals(moving),
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
  // Lighting presets re-light the actual rendered room and persist.
  await page
    .getByRole('button', { name: 'Pause room motion', exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  const afternoon = await captureRoom();
  await page.getByRole('button', { name: /^Night lighting/ }).click();
  await page.waitForFunction(
    () =>
      window.__studio?.state().preset === 'night' &&
      window.__studio.state().transition === 1,
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  assert.equal(
    await page
      .getByRole('button', { name: /^Night lighting/ })
      .getAttribute('aria-pressed'),
    'true',
  );
  assert.ok(
    !(await captureRoom()).equals(afternoon),
    'A lighting preset must change the rendered room',
  );
  const night = await page.evaluate(() => window.__studio.state());
  await page.getByRole('slider', { name: 'Brightness' }).focus();
  await page.keyboard.press('End');
  await page.waitForFunction(() => window.__studio.state().brightness === 100);
  await page.waitForFunction(
    (before) => window.__studio.state().exposure > before + 0.05,
    night.exposure,
  );
  await page.reload();
  await page.locator('.scene-host[data-scene-status="ready"]').waitFor();
  assert.deepEqual(
    await page.evaluate(() => {
      const { preset, brightness } = window.__studio.state();
      return { preset, brightness };
    }),
    { preset: 'night', brightness: 100 },
    'Preset and brightness must survive a reload',
  );
  await page.evaluate(() => {
    window.__studio.setPreset('afternoon');
    window.__studio.setBrightness(72);
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.__studio.setPreset('sunset'));
  assert.equal(
    await page.evaluate(() => window.__studio.state().transition),
    1,
    'Reduced motion must apply a preset without a transition',
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  await page
    .getByRole('button', { name: 'Pause room motion', exact: true })
    .waitFor({ state: 'hidden' });
  // The reload above revalidates the texture, so a 304 also proves it loaded.
  assert.ok(
    [200, 304].includes(textures.get('solarpunk-sketchbook.png')),
    'The sketchbook texture must load',
  );
  assert.deepEqual(errors, []);
  evidence.push(
    'Actual room pixels animate, pause freezes them, offscreen frames stop, return resumes, and live reduced-motion changes stop ambient work. A lighting preset changes the rendered room, brightness raises exposure, both persist across reload, and reduced motion applies presets instantly. The sketchbook texture loads and no runtime or shader errors occur.',
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

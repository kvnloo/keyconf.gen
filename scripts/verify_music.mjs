import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  const errors = [];
  const musicRequests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (/\/music\/.*\.(ogg|mp3)/.test(request.url()))
      musicRequests.push(request.url());
  });
  await page.addInitScript(() => {
    window.musicAudits = [];
    const makeSource = Reflect.get(
      AudioContext.prototype,
      'createMediaElementSource',
    );
    AudioContext.prototype.createMediaElementSource = function (media) {
      const source = makeSource.call(this, media);
      const connect = source.connect.bind(source);
      const analyser = this.createAnalyser();
      source.connect = (gain) => {
        gain.connect(analyser);
        window.musicProbe = { media, gain, analyser };
        return connect(gain);
      };
      return source;
    };
    const start = Reflect.get(AudioBufferSourceNode.prototype, 'start');
    AudioBufferSourceNode.prototype.start = function (...args) {
      const probe = window.musicProbe;
      if (probe)
        window.musicAudits.push({
          gain: probe.gain.gain.value,
          paused: probe.media.paused,
        });
      return start.apply(this, args);
    };
  });
  const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
  await page.goto(new URL('#studio', base).href);
  const openMusic = async () => {
    if (!(await page.locator('.music-popup').isVisible()))
      await page
        .getByRole('button', { name: 'Music controls', exact: true })
        .first()
        .click();
  };
  const status = (kind) =>
    page.locator(`[data-music-state="${kind}"]`).waitFor();
  await openMusic();
  assert.equal(
    musicRequests.length,
    0,
    'Opening controls must not fetch music',
  );
  await page.getByRole('button', { name: 'Play music', exact: true }).click();
  await status('playing');
  await page.waitForFunction(() => {
    const probe = window.musicProbe;
    if (!probe) return false;
    const samples = new Float32Array(probe.analyser.fftSize);
    probe.analyser.getFloatTimeDomainData(samples);
    return samples.some((sample) => Math.abs(sample) > 0.0001);
  });
  assert.ok(musicRequests.length > 0);
  await page
    .getByRole('slider', { name: 'Music volume', exact: true })
    .fill('30');
  await page.waitForFunction(
    () => Math.abs(window.musicProbe.gain.gain.value - 0.3) < 0.001,
  );
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: 'Enable keyboard sound', exact: true })
    .click();
  await openMusic();
  await status('paused');
  assert.match(
    await page.locator('[data-music-state]').innerText(),
    /keyboard/,
  );
  assert.deepEqual(
    await page.evaluate(() => ({
      gain: window.musicProbe.gain.gain.value,
      paused: window.musicProbe.media.paused,
    })),
    { gain: 0, paused: true },
  );
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Sound', exact: true }).click();
  await page
    .getByRole('button', { name: 'Try a typing sequence', exact: true })
    .click();
  await page.waitForFunction(() => window.musicAudits.length > 5);
  assert.ok(
    (await page.evaluate(() => window.musicAudits)).every(
      (audit) => audit.gain === 0 && audit.paused,
    ),
  );
  await openMusic();
  await page.getByRole('button', { name: 'Pause music', exact: true }).click();
  await status('off');
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .click();
  await openMusic();
  await status('off');
  assert.equal(
    await page.evaluate(() => window.musicProbe.media.paused),
    true,
    'Clearing a blocker must not undo Pause',
  );
  await page.getByRole('button', { name: 'Play music', exact: true }).click();
  await status('playing');
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: 'Enable keyboard sound', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .click();
  await openMusic();
  await status('playing');
  await page.keyboard.press('Escape');
  await page.route('https://www.youtube-nocookie.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<p>Reference player fixture</p>',
    }),
  );
  await page.locator('.sound-results button').first().click();
  await openMusic();
  await status('paused');
  assert.match(
    await page.locator('[data-music-state]').innerText(),
    /reference/,
  );
  assert.equal(await page.evaluate(() => window.musicProbe.media.paused), true);
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', { name: 'Close recording', exact: true })
    .click();
  await openMusic();
  await status('playing');
  await mkdir('outputs', { recursive: true });
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const bounds = await page.locator('.music-popup').boundingBox();
    assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width + 1);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    const axe = await new AxeBuilder({ page })
      .include('.music-popup')
      .analyze();
    assert.deepEqual(axe.violations, []);
    await page.screenshot({ path: `outputs/music-${width}.png` });
  }
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await status('off');
  assert.equal(await page.evaluate(() => window.musicProbe.media.paused), true);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await status('off');
  await page.reload();
  await openMusic();
  await status('off');
  assert.equal(
    await page.evaluate(() => !!window.musicProbe),
    false,
    'Reload requires fresh opt-in',
  );
  assert.deepEqual(errors, []);
  console.log(
    'Music: real decoded output, gain, keyboard-source priority, pause intent, recovery, lifecycle, reload, 320/390/1280 and accessibility passed.',
  );
} finally {
  await browser.close();
}

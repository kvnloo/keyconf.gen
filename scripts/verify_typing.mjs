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
const button = (surface, name) =>
  surface.getByRole('button', { name, exact: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  await context.addInitScript(() => {
    let count = 0;
    const resume = Reflect.get(AudioContext.prototype, 'resume');
    AudioContext.prototype.resume = async function (...args) {
      await resume.apply(this, args);
      await new Promise((resolve) => setTimeout(resolve, 100));
    };
    const start = Reflect.get(AudioBufferSourceNode.prototype, 'start');
    AudioBufferSourceNode.prototype.start = function (...args) {
      count++;
      return start.apply(this, args);
    };
    window.keyconfTypingAudioCount = () => count;
  });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  const errors = [];
  const external = [];
  page.on('pageerror', (error) => errors.push(error.stack ?? error.message));
  page.on('request', (request) => {
    if (
      request.frame().url().includes('/monkeytype/') &&
      new URL(request.url()).origin !== new URL(base).origin
    )
      external.push(request.url());
  });
  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  const buildName = await page
    .getByRole('textbox', { name: 'Build name' })
    .inputValue();
  await page.waitForFunction(
    () => document.querySelector('.model-status') === null,
    null,
    { timeout: 60000 },
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  assert.equal(await page.locator('.scene-host canvas').count(), 1);
  await button(page, 'Explode').click();
  await button(page, 'Start typing test').click();
  const frame = page.frameLocator(
    'iframe[title="Monkeytype guest typing test"]',
  );
  await frame.locator('#words .word').first().waitFor({ timeout: 60000 });
  await page.locator('.typing-load').waitFor({ state: 'hidden' });
  // Use a word-count test so rendering evidence cannot expire a timed test.
  if (!(await button(frame, 'words').isVisible()))
    await button(frame, 'test settings').click();
  await button(frame, 'words').click();
  if (!(await button(frame, '10').isVisible()))
    await button(frame, 'test settings').click();
  await button(frame, '10').click();
  await page.keyboard.press('Escape');
  await page.waitForFunction(
    () =>
      document.querySelector('.scene-host')?.dataset.monitor === 'projected',
  );
  const monitor = await page.locator('.monitor-display').boundingBox();
  const scene = await page.locator('.scene-host').boundingBox();
  const keyboardY = await page
    .locator('.scene-host')
    .evaluate((element) => Number(element.dataset.keyboardY));
  assert.ok(
    monitor.width > 550,
    'Desktop monitor must be large enough to read',
  );
  assert.ok(
    scene.y + keyboardY > monitor.y + monitor.height,
    'Rendered keyboard must remain below the monitor',
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  await page.evaluate(() => {
    const host = document.querySelector('.scene-host');
    window.scrollTo(0, scrollY + host.getBoundingClientRect().top);
  });
  const keyboardPixels = async () => {
    const screen = await page.locator('.monitor-display').boundingBox();
    const host = await page.locator('.scene-host').boundingBox();
    const y = Math.max(0, screen.y + screen.height + 12);
    const height = Math.min(host.y + host.height, 900) - y;
    assert.ok(height > 100, 'Keyboard must be visible below the monitor');
    return page.screenshot({
      timeout: 60000,
      clip: { x: host.x, y, width: host.width, height },
    });
  };
  const before = await keyboardPixels();
  await frame.locator('#wordsInput').focus();
  const audioBefore = await page.evaluate(() =>
    window.keyconfTypingAudioCount(),
  );
  // Capture a modifier before starting Monkeytype's performance-sensitive timer.
  await page.keyboard.down('Shift');
  await page.waitForFunction(
    (previous) => window.keyconfTypingAudioCount() > previous,
    audioBefore,
  );
  const pressed = await keyboardPixels();
  assert.ok(
    !before.equals(pressed),
    'A key held inside Monkeytype must change the rendered keyboard',
  );
  await page.keyboard.up('Shift');
  await button(page, 'Mute keyboard').click();
  const mutedCount = await page.evaluate(() =>
    window.keyconfTypingAudioCount(),
  );
  await frame.locator('#wordsInput').focus();
  await page.keyboard.press('Shift');
  assert.equal(
    await page.evaluate(() => window.keyconfTypingAudioCount()),
    mutedCount,
    'Typing must respect mute',
  );
  await frame.locator('#words .word').nth(9).waitFor();
  await frame
    .locator('#words .word')
    .nth(10)
    .waitFor({ state: 'detached', timeout: 5000 });
  const words = await frame.locator('#words .word').allTextContents();
  await frame.locator('#wordsInput').focus();
  await page.keyboard.type(words.join(' ') + ' ', { delay: 60 });
  await frame.locator('#result').waitFor({ state: 'visible' });
  const result = await frame.locator('#result').innerText();
  assert.match(result, /wpm/i);
  assert.match(result, /100%/);
  assert.match(result, /words 10/);
  await frame.locator('#words .word').first().waitFor({ state: 'detached' });
  await frame
    .locator('body')
    .evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
  assert.deepEqual(
    errors,
    [],
    'Completed test must dispose queued word updates',
  );
  await page.screenshot({
    path: 'outputs/typing-results.png',
    fullPage: false,
  });
  await frame.locator('#nextTestButton').click();
  await frame.locator('#wordsInput').waitFor({ state: 'visible' });
  await button(page, 'Back to builder').click();
  await page.locator('.typing-frame').waitFor({ state: 'detached' });
  assert.equal(await page.locator('.typing-frame').count(), 0);
  assert.equal(
    await button(page, 'Explode').getAttribute('aria-pressed'),
    'true',
    'Returning must restore the exploded builder view',
  );
  assert.equal(
    await page.getByRole('textbox', { name: 'Build name' }).inputValue(),
    buildName,
  );
  await page.waitForFunction(
    () => document.activeElement?.id === 'start-typing-test',
  );
  assert.ok(
    await button(page, 'Start typing test').evaluate(
      (element) => element === document.activeElement,
    ),
  );
  assert.equal(await page.locator('.scene-host canvas').count(), 1);
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  evidence.push(
    'Real WebGL keyboard beneath Monkeytype; key animation and recorded audio; mute; 10-word result; restart; return and preserved build; no external iframe requests or runtime errors.',
  );
  await context.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const phone = await mobile.newPage();
  await phone.goto(new URL('#studio', base).href);
  await button(phone, 'Start typing test').tap();
  const phoneFrame = phone.frameLocator('.typing-frame');
  await phoneFrame.locator('#words .word').first().waitFor();
  await phone.locator('.typing-load').waitFor({ state: 'hidden' });
  assert.ok(
    await phone.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  assert.ok(
    await phoneFrame
      .locator('html')
      .evaluate((element) => element.scrollWidth <= innerWidth),
  );
  const phoneMonitor = await phone.locator('.monitor-display').boundingBox();
  assert.ok(
    phoneMonitor.width >= 300,
    'Phone monitor must preserve readable text',
  );
  await button(phoneFrame, 'test settings').tap();
  await phone.screenshot({
    path: 'outputs/typing-mobile-settings.png',
    fullPage: false,
  });
  await phone.keyboard.press('Escape');
  await button(phone, 'Back to builder').tap();
  evidence.push(
    '390px touch entry, iframe reflow, Monkeytype mobile settings, and return to builder.',
  );
  await mobile.close();

  const recovery = await browser.newContext();
  const broken = await recovery.newPage();
  let fail = true;
  await broken.route('**/monkeytype/index.html', (route) =>
    fail
      ? route.fulfill({
          status: 503,
          contentType: 'text/html',
          body: 'Temporarily unavailable',
        })
      : route.continue(),
  );
  await broken.goto(new URL('#studio', base).href);
  await button(broken, 'Start typing test').click();
  await button(broken, 'Retry typing test').waitFor({ timeout: 35000 });
  fail = false;
  await button(broken, 'Retry typing test').click();
  await broken
    .frameLocator('.typing-frame')
    .locator('#words .word')
    .first()
    .waitFor();
  await broken.locator('.typing-load').waitFor({ state: 'hidden' });
  await broken.evaluate(() =>
    window.postMessage(
      { type: 'keyconf:monkeytype', event: 'key', code: 'KeyZ', down: true },
      location.origin,
    ),
  );
  await button(broken, 'Back to builder').click();
  await button(broken, 'Start typing test').click();
  await broken
    .frameLocator('.typing-frame')
    .locator('#words .word')
    .first()
    .waitFor();
  evidence.push(
    'Failed frame request exposes retry; retry and repeated entry recover.',
  );
  await recovery.close();
  await writeFile(
    'outputs/typing-verification.json',
    JSON.stringify({ base, evidence }, null, 2),
  );
  console.log(evidence.join('\n'));
} finally {
  await browser.close();
}

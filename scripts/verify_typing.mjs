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
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  assert.equal(await page.locator('.scene-host canvas').count(), 1);
  await button(page, 'Start typing test').click();
  const frame = page.frameLocator(
    'iframe[title="Monkeytype guest typing test"]',
  );
  await frame.locator('#words .word').first().waitFor();
  await page.locator('.typing-load').waitFor({ state: 'hidden' });
  const widget = await page.locator('.typing-widget').boundingBox();
  const keyboard = await page.locator('.scene-host').boundingBox();
  assert.ok(
    keyboard.y >= widget.y + widget.height - 2,
    'Keyboard must be below the test widget',
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  const before = await page.locator('.scene-host canvas').screenshot();
  await frame.locator('#wordsInput').focus();
  const audioBefore = await page.evaluate(() =>
    window.keyconfTypingAudioCount(),
  );
  await page.keyboard.down('a');
  await page.waitForFunction(
    (previous) => window.keyconfTypingAudioCount() > previous,
    audioBefore,
  );
  const pressed = await page.locator('.scene-host canvas').screenshot();
  assert.ok(
    !before.equals(pressed),
    'A key held inside Monkeytype must change the rendered keyboard',
  );
  await page.keyboard.up('a');
  await button(page, 'Mute keyboard').click();
  const mutedCount = await page.evaluate(() =>
    window.keyconfTypingAudioCount(),
  );
  await frame.locator('#wordsInput').focus();
  await page.keyboard.press('b');
  assert.equal(
    await page.evaluate(() => window.keyconfTypingAudioCount()),
    mutedCount,
    'Typing must respect mute',
  );
  await button(frame, 'Restart Test').click();
  await button(frame, 'words').click();
  await button(frame, '10').click();
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
  await page.screenshot({ path: 'outputs/typing-results.png', fullPage: true });
  await frame.locator('#nextTestButton').click();
  await frame.locator('#wordsInput').waitFor({ state: 'visible' });
  await button(page, 'Back to builder').click();
  await page.locator('.typing-frame').waitFor({ state: 'detached' });
  assert.equal(await page.locator('.typing-frame').count(), 0);
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
  await button(phoneFrame, 'test settings').tap();
  await phone.screenshot({
    path: 'outputs/typing-mobile-settings.png',
    fullPage: true,
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

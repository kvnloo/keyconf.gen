import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const directory = await mkdtemp(join(tmpdir(), 'keyconf-verification-'));
const browser = await chromium.launch({
  executablePath: process.env.KEYCONF_CHROME || chromium.executablePath(),
  args: ['--autoplay-policy=no-user-gesture-required', '--disable-webgl'],
});
const saved = async (page) => {
  try {
    await page
      .locator('.save-state')
      .filter({ hasText: 'Saved on this device' })
      .waitFor();
  } catch (error) {
    console.error(
      'Save status:',
      await page.locator('.save-state').allTextContents(),
    );
    console.error(
      'Page:',
      page.url(),
      (await page.locator('body').innerText()).slice(0, 500),
    );
    throw error;
  }
};
const button = (page, name) => page.getByRole('button', { name, exact: true });
const tab = (page, name) => page.getByRole('tab', { name, exact: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', (error) =>
    console.error('Browser error:', error.message),
  );
  await page.goto(base);
  await saved(page);
  await page
    .getByRole('textbox', { name: 'Build name', exact: true })
    .fill('Portable violet build');
  await tab(page, 'Components').click();
  await page
    .getByRole('combobox', { name: 'Starting assembly' })
    .selectOption('q1-max');
  await button(page, 'Import a website').click();
  await page
    .getByRole('textbox', { name: 'Website URL' })
    .fill('https://example.com/violet-case');
  await page.getByText('Have a product data export?', { exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Product JSON-LD' })
    .fill(
      JSON.stringify({
        '@type': 'Product',
        name: 'Violet case fixture',
        brand: 'Fixture',
        sku: 'VIOLET-1',
      }),
    );
  await button(page, 'Preview').click();
  await button(page, 'Add 1 selected products').click();
  await button(page, 'Close dialog').click();
  await button(page, 'Case Q1 Max case').click();
  await page
    .getByRole('searchbox', { name: 'Search components' })
    .fill('violet');
  await button(page, 'Use Fixture Violet case fixture').click();
  await saved(page);
  await button(page, 'Share build').click();
  const shareUrl = await page
    .getByRole('textbox', { name: 'Build link' })
    .inputValue();
  assert.ok(new URL(shareUrl).hash.startsWith('#build='));
  await page.keyboard.press('Escape');
  const downloadPending = page.waitForEvent('download');
  await button(page, 'Export your build').click();
  const download = await downloadPending;
  const file = join(directory, 'build.json');
  await download.saveAs(file);
  const exported = JSON.parse(await readFile(file, 'utf8'));
  assert.equal(exported.build.name, 'Portable violet build');
  assert.equal(exported.build.layout, '75');
  assert.ok(exported.build.selection.case.startsWith('import:'));
  assert.equal(exported.build.customParts.length, 1);

  const friend = await browser.newContext();
  const friendPage = await friend.newPage();
  await friendPage.goto(shareUrl);
  await saved(friendPage);
  assert.equal(
    await friendPage.getByRole('textbox', { name: 'Build name' }).inputValue(),
    'Portable violet build',
  );
  assert.equal(new URL(friendPage.url()).hash, '');
  await tab(friendPage, 'Components').click();
  assert.ok(await button(friendPage, 'Case Violet case fixture').isVisible());
  assert.ok(await button(friendPage, 'Enable keyboard sound').isVisible());
  await friendPage
    .getByRole('textbox', { name: 'Build name' })
    .fill('Friend edit');
  await saved(friendPage);
  await friendPage.reload();
  await saved(friendPage);
  assert.equal(
    await friendPage.getByRole('textbox', { name: 'Build name' }).inputValue(),
    'Friend edit',
  );
  await friendPage.locator('input[type="file"]').setInputFiles(file);
  await saved(friendPage);
  assert.equal(
    await friendPage.getByRole('textbox', { name: 'Build name' }).inputValue(),
    'Portable violet build',
  );
  console.log(
    'PASS: a fresh browser restores a shared build with its imported part; refresh and downloaded-file restore preserve it.',
  );

  const audioContext = await browser.newContext();
  await audioContext.addInitScript(() => {
    const active = new Set();
    const start = Reflect.get(AudioBufferSourceNode.prototype, 'start');
    const stop = Reflect.get(AudioBufferSourceNode.prototype, 'stop');
    AudioBufferSourceNode.prototype.start = function (...args) {
      active.add(this);
      this.addEventListener('ended', () => active.delete(this));
      return start.apply(this, args);
    };
    AudioBufferSourceNode.prototype.stop = function (...args) {
      active.delete(this);
      return stop.apply(this, args);
    };
    window.keyconfAudioProbe = () => active.size;
  });
  const audioPage = await audioContext.newPage();
  let failRecordings = true;
  await audioPage.route('**/sounds/gateron-black-ink/*.mp3', async (route) => {
    if (failRecordings) await route.fulfill({ status: 503, body: '' });
    else await route.continue();
  });
  await audioPage.goto(base);
  await tab(audioPage, 'Sound').click();
  await audioPage
    .getByRole('alert')
    .filter({ hasText: 'Recordings could not load' })
    .waitFor();
  assert.ok(await button(audioPage, 'Try a typing sequence').isDisabled());
  failRecordings = false;
  await button(audioPage, 'Try again').click();
  await button(audioPage, 'Try a typing sequence').click();
  await button(audioPage, 'Stop playback').waitFor();
  assert.ok((await audioPage.evaluate(() => window.keyconfAudioProbe())) > 0);
  await audioPage
    .getByRole('combobox', { name: 'Typing sound' })
    .selectOption('mx-blue');
  await button(audioPage, 'Try a typing sequence').waitFor();
  assert.equal(await audioPage.evaluate(() => window.keyconfAudioProbe()), 0);
  await button(audioPage, 'space Spacebar').click();
  await button(audioPage, 'Mute keyboard').click();
  assert.equal(await audioPage.evaluate(() => window.keyconfAudioProbe()), 0);
  console.log(
    'PASS: failed sample loads retry; preset changes and mute cancel actual scheduled audio nodes.',
  );

  const denied = await browser.newContext();
  await denied.addInitScript(() => {
    for (const name of ['getItem', 'setItem']) {
      const original = Storage.prototype[name];
      Storage.prototype[name] = function (key, ...args) {
        if (key.startsWith('keyconf-'))
          throw new DOMException('Storage denied', 'SecurityError');
        return original.call(this, key, ...args);
      };
    }
  });
  const deniedPage = await denied.newPage();
  await deniedPage.goto(base);
  await deniedPage
    .locator('.save-state')
    .filter({ hasText: 'Session only. Download to keep.' })
    .waitFor();
  assert.ok(await button(deniedPage, 'Export your build').isEnabled());
  console.log(
    'PASS: storage denial leaves a usable builder and a visible export fallback.',
  );
} finally {
  await browser.close();
  await rm(directory, { recursive: true, force: true });
}

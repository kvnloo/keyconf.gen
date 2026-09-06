import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { defaultBuild } from '../lib/build.ts';
import { newDeck } from '../lib/control-deck.ts';

const base =
  process.env.KEYCONF_BASE_URL ?? 'http://127.0.0.1:4174/keyconf.gen/nightly/';
const channel = new URL(base).pathname.match(/\/(dev|nightly)\/$/)?.[1];
assert.ok(
  channel,
  'This regression must run against a dev or nightly production build',
);
const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const context = await browser.newContext();
  await context.addInitScript(
    ({ build, deck }) => {
      if (localStorage.getItem('preview-fixture-seeded')) return;
      localStorage.setItem('keyconf-build-v1', JSON.stringify(build));
      localStorage.setItem('keyconf-deck-v1-codex-micro', JSON.stringify(deck));
      localStorage.setItem('keyconf-build-recovery', 'protected main recovery');
      localStorage.setItem('preview-fixture-seeded', 'true');
    },
    {
      build: { ...defaultBuild, name: 'Protected main build' },
      deck: { ...newDeck('codex-micro'), name: 'Protected main deck' },
    },
  );
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  await page.goto(new URL('#studio', base).href);
  const checkPreviewLabel = async () => {
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const label = page.locator('.preview-label');
      assert.equal(
        (await label.textContent())?.trim(),
        channel === 'nightly' ? 'Nightly' : 'Dev',
      );
      assert.ok(
        await label.isVisible(),
        `Preview label remains visible at ${width}px`,
      );
      const bounds = await label.boundingBox();
      assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      assert.ok(
        dimensions.scroll <= dimensions.client,
        `Preview has no horizontal overflow at ${width}px`,
      );
    }
  };
  await checkPreviewLabel();
  const saved = () =>
    page
      .locator('.save-state')
      .filter({ hasText: 'Saved on this device' })
      .waitFor();
  await saved();
  const name = page.getByRole('textbox', { name: 'Build name', exact: true });
  assert.notEqual(
    await name.inputValue(),
    'Protected main build',
    'A preview must not inherit the stable build',
  );
  await name.fill('Preview experiment');
  await saved();
  await page.reload();
  await saved();
  assert.equal(await name.inputValue(), 'Preview experiment');
  const buildKey = 'keyconf-build-v1:' + channel;
  assert.equal(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)).name,
      buildKey,
    ),
    'Preview experiment',
  );
  await page.goto(new URL('#deck/codex-micro', base).href);
  const study = page.getByRole('textbox', { name: 'Study name', exact: true });
  await study.waitFor();
  await checkPreviewLabel();
  assert.notEqual(await study.inputValue(), 'Protected main deck');
  await study.fill('Preview control deck');
  await page.waitForFunction(
    (key) =>
      JSON.parse(localStorage.getItem(key) || 'null')?.name ===
      'Preview control deck',
    'keyconf-deck-v1-codex-micro:' + channel,
  );
  await page.reload();
  assert.equal(await study.inputValue(), 'Preview control deck');
  await page.goto(new URL('#studio', base).href);
  await saved();
  await page.addInitScript(
    (key) => localStorage.setItem(key, 'broken preview document'),
    buildKey,
  );
  await page.reload();
  await saved();
  assert.equal(
    await page.evaluate(
      (key) => localStorage.getItem(key),
      'keyconf-build-recovery:' + channel,
    ),
    'broken preview document',
  );
  const stable = await page.evaluate(() => ({
    build: JSON.parse(localStorage.getItem('keyconf-build-v1')).name,
    deck: JSON.parse(localStorage.getItem('keyconf-deck-v1-codex-micro')).name,
    recovery: localStorage.getItem('keyconf-build-recovery'),
  }));
  assert.deepEqual(stable, {
    build: 'Protected main build',
    deck: 'Protected main deck',
    recovery: 'protected main recovery',
  });
  console.log(
    `${channel}: keyboard and control-deck edits survive refresh; preview recovery stays separate; stable saves remain unchanged.`,
  );
} finally {
  await browser.close();
}

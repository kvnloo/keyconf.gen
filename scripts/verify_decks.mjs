import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';

const baseUrl =
  process.env.KEYCONF_BASE_URL ?? process.argv[2] ?? 'http://localhost:3000/';
const artifacts = await mkdtemp(join(tmpdir(), 'keyconf-decks-'));
const browser = await chromium.launch({
  args: ['--disable-webgl'],
  ...(process.env.KEYCONF_CHROME
    ? { executablePath: process.env.KEYCONF_CHROME }
    : {}),
});
const decks = [
  {
    id: 'grok-bot',
    title: 'Grok Bot / 01',
    source: 'https://x.com/omarsar0/status/2096321091148947887',
  },
  {
    id: 'codex-micro',
    title: 'Codex Micro',
    source: 'https://openai.com/supply/co-lab/work-louder/',
  },
];
const results = [];
let context;
let page;

async function openContext(options = {}) {
  await context?.close();
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ['clipboard-read', 'clipboard-write'],
    ...options,
  });
  page = await context.newPage();
  page.setDefaultTimeout(10_000);
}

async function keyboardState() {
  await page.getByRole('tab', { name: 'Design', exact: true }).click();
  return {
    name: await page
      .getByRole('textbox', { name: 'Build name', exact: true })
      .inputValue(),
    layout75: await page
      .getByRole('button', { name: '75%', exact: true })
      .getAttribute('aria-pressed'),
    material: (
      await page
        .getByRole('combobox', { name: 'Case material', exact: true })
        .innerText()
    ).trim(),
  };
}

try {
  await openContext();
  await page.goto(new URL('#studio', baseUrl).href, {
    waitUntil: 'networkidle',
  });
  await page
    .getByRole('textbox', { name: 'Build name', exact: true })
    .fill('Deck shortcut isolation');
  await page.getByRole('tab', { name: 'Design', exact: true }).click();
  await page.getByRole('button', { name: '75%', exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Case material', exact: true })
    .click();
  await page.getByRole('option', { name: 'Brass', exact: true }).click();
  const expectedKeyboard = await keyboardState();
  assert.deepEqual(expectedKeyboard, {
    name: 'Deck shortcut isolation',
    layout75: 'true',
    material: 'Brass',
  });

  for (const deck of decks) {
    await page.goto(new URL(`#deck/${deck.id}`, baseUrl).href, {
      waitUntil: 'networkidle',
    });
    await page
      .getByRole('heading', { name: deck.title, exact: true })
      .waitFor();
    const name = `Shared ${deck.title}`;
    await page
      .getByRole('textbox', { name: 'Study name', exact: true })
      .fill(name);
    const color = page.getByRole('textbox', {
      name: 'Case color',
      exact: true,
    });
    const original = await color.inputValue();
    const edited = original === '#7722aa' ? '#347b59' : '#7722aa';
    await color.fill(edited);
    // WebGL is disabled, so this state check focuses a non-editable deck control.
    await page.getByRole('button', { name: 'Top view', exact: true }).focus();
    await page.keyboard.press('ControlOrMeta+z');
    assert.equal(
      await color.inputValue(),
      original,
      `${deck.id}: canvas undo must restore the deck color`,
    );
    await page.keyboard.press('ControlOrMeta+Shift+z');
    assert.equal(
      await color.inputValue(),
      edited,
      `${deck.id}: Shift+Z must redo the deck edit`,
    );
    await page.keyboard.press('ControlOrMeta+z');
    assert.equal(
      await color.inputValue(),
      original,
      `${deck.id}: second undo must restore the deck color`,
    );
    await page.keyboard.press('ControlOrMeta+y');
    assert.equal(
      await color.inputValue(),
      edited,
      `${deck.id}: Y must redo the deck edit`,
    );
    assert.equal(
      await page
        .getByRole('textbox', { name: 'Study name', exact: true })
        .inputValue(),
      name,
    );

    await page
      .getByRole('button', { name: 'Share study', exact: true })
      .click();
    const sharedUrl = await page.evaluate(() => navigator.clipboard.readText());
    assert.equal(new URL(sharedUrl).origin, new URL(baseUrl).origin);
    await page.getByRole('link', { name: 'keyconf', exact: true }).click();
    assert.deepEqual(
      await keyboardState(),
      expectedKeyboard,
      `${deck.id}: deck shortcuts must preserve keyboard work`,
    );
    results.push({
      ...deck,
      name,
      color: edited,
      sharedUrl,
      keyboard: expectedKeyboard,
    });
    console.log(
      `PASS ${deck.id}: undo, both redo shortcuts, and keyboard isolation`,
    );
  }

  for (const result of results) {
    await openContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    await page.goto(result.sharedUrl, { waitUntil: 'networkidle' });
    await page
      .getByRole('heading', { name: result.title, exact: true })
      .waitFor();
    assert.equal(
      await page
        .getByRole('textbox', { name: 'Study name', exact: true })
        .inputValue(),
      result.name,
    );
    assert.equal(
      await page
        .getByRole('textbox', { name: 'Case color', exact: true })
        .inputValue(),
      result.color,
    );
    const reference = page.getByRole('link', {
      name: 'Original reference',
      exact: true,
    });
    await reference.scrollIntoViewIfNeeded();
    assert.ok(
      await reference.isVisible(),
      `${result.id}: source link must be visible on mobile`,
    );
    assert.equal(await reference.getAttribute('href'), result.source);
    const box = await reference.boundingBox();
    assert.ok(
      box.x >= 0 &&
        box.x + box.width <= 390 &&
        box.y >= 0 &&
        box.y + box.height <= 844,
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    console.log(
      `PASS ${result.id}: fresh shared state and reachable mobile source`,
    );
  }

  await writeFile(
    join(artifacts, 'results.json'),
    JSON.stringify(results, null, 2),
  );
  console.log(
    `Deck state regression passed with focus on Top view. WebGL was disabled; headed canvas and visual checks are separate. Evidence: ${artifacts}`,
  );
} catch (error) {
  await page
    ?.screenshot({ path: join(artifacts, 'failure.png'), fullPage: true })
    .catch(() => {});
  console.error(`Deck state regression failed. Evidence: ${artifacts}`);
  throw error;
} finally {
  await browser.close();
}

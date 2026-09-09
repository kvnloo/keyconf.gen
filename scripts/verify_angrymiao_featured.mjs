import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base =
  process.env.KEYCONF_BASE_URL ??
  'https://kvnloo.github.io/keyconf.gen/nightly/';

const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const context = await browser.newContext();
const page = await context.newPage();
page.setDefaultTimeout(20000);

async function sceneVariant() {
  return page.locator('.scene-host').getAttribute('data-keyboard-variant');
}

async function waitForVariant(variant, extra = {}) {
  await page.waitForFunction(
    ({ variant: expected, keyCount }) => {
      const host = document.querySelector('.scene-host');
      if (host?.getAttribute('data-keyboard-variant') !== expected)
        return false;
      if (keyCount && host.getAttribute('data-key-count') !== keyCount)
        return false;
      return host.getAttribute('data-scene-status') === 'ready';
    },
    { variant, ...extra },
    { timeout: 60000 },
  );
}

try {
  await page.goto(new URL('#home', base).href, { waitUntil: 'networkidle' });
  const cyber = page.getByRole('button', {
    name: 'Preview CYBERBOARD R2',
    exact: true,
  });
  const hatsu = page.getByRole('button', {
    name: 'Preview AM HATSU',
    exact: true,
  });
  await cyber.waitFor();
  await hatsu.waitFor();
  assert.equal(await hatsu.getAttribute('data-layout'), '45');
  assert.equal(await hatsu.getAttribute('data-case'), 'am-hatsu-case');
  assert.notEqual(await hatsu.getAttribute('data-case'), 'bakeneko-case');
  assert.equal(await cyber.getAttribute('data-layout'), '75');
  assert.equal(await cyber.getAttribute('data-case'), 'am-cyberboard-r2-case');
  assert.notEqual(await cyber.getAttribute('data-case'), 'q1-max-case');

  const readToken = (name) =>
    page.evaluate(
      (token) =>
        getComputedStyle(document.documentElement)
          .getPropertyValue(token)
          .trim(),
      name,
    );

  const forestSurface = await readToken('--surface');
  const forestStage = await readToken('--palette-space');
  await cyber.click();
  assert.equal(
    await cyber.getAttribute('aria-pressed'),
    'true',
    'CYBERBOARD R2 must become the selected featured build',
  );
  await page.waitForFunction(
    ([surface, stage]) => {
      const root = getComputedStyle(document.documentElement);
      const nextSurface = root.getPropertyValue('--surface').trim();
      const nextStage = root.getPropertyValue('--palette-space').trim();
      return nextSurface !== surface || nextStage !== stage;
    },
    [forestSurface, forestStage],
  );
  await waitForVariant('keyboard-cyberboard-r2');
  assert.equal(await sceneVariant(), 'keyboard-cyberboard-r2');
  assert.notEqual(await sceneVariant(), 'keyboard-q1-max');
  const cyberSurface = await readToken('--surface');
  const cyberStage = await readToken('--palette-space');
  assert.notEqual(
    forestStage,
    cyberStage,
    'Selecting CYBERBOARD R2 must update landing stage color (--palette-space)',
  );
  assert.notEqual(
    forestSurface,
    cyberSurface,
    'Selecting CYBERBOARD R2 must update page theme (--surface)',
  );

  await hatsu.click();
  assert.equal(await hatsu.getAttribute('aria-pressed'), 'true');
  await page.waitForFunction(
    ([surface, stage]) => {
      const root = getComputedStyle(document.documentElement);
      const nextSurface = root.getPropertyValue('--surface').trim();
      const nextStage = root.getPropertyValue('--palette-space').trim();
      return nextSurface !== surface || nextStage !== stage;
    },
    [cyberSurface, cyberStage],
  );
  await waitForVariant('keyboard-hatsu', { keyCount: '48' });
  assert.equal(await sceneVariant(), 'keyboard-hatsu');
  assert.equal(
    await page.locator('.scene-host').getAttribute('data-key-count'),
    '48',
  );
  const hatsuSurface = await readToken('--surface');
  const hatsuStage = await readToken('--palette-space');
  assert.notEqual(
    cyberStage,
    hatsuStage,
    'AM HATSU must change landing stage color again',
  );
  assert.notEqual(
    cyberSurface,
    hatsuSurface,
    'AM HATSU must change theme again',
  );

  console.log(
    `PASS: Angry Miao featured presets visible at ${base}; CYBERBOARD R2 is not Q1 Max; AM HATSU loads a 48-key split study.`,
  );
} finally {
  await context.close();
  await browser.close();
}

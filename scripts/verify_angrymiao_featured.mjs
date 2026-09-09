import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base =
  process.env.KEYCONF_BASE_URL ??
  'https://kvnloo.github.io/keyconf.gen/nightly/';

const browser = await chromium.launch({ args: ['--disable-webgl'] });
const context = await browser.newContext();
const page = await context.newPage();
page.setDefaultTimeout(20000);

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
    `PASS: Angry Miao featured presets visible at ${base} and landing theme tracks selection.`,
  );
} finally {
  await context.close();
  await browser.close();
}

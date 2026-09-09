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
  const hatsu = page.getByRole('button', { name: 'Preview AM HATSU', exact: true });
  await cyber.waitFor();
  await hatsu.waitFor();

  const readSurface = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--surface')
        .trim(),
    );

  const forestSurface = await readSurface();
  await cyber.click();
  assert.equal(
    await cyber.getAttribute('aria-pressed'),
    'true',
    'CYBERBOARD R2 must become the selected featured build',
  );
  const cyberSurface = await readSurface();
  assert.notEqual(
    forestSurface,
    cyberSurface,
    'Selecting CYBERBOARD R2 must update page theme (--surface)',
  );

  await hatsu.click();
  assert.equal(await hatsu.getAttribute('aria-pressed'), 'true');
  const hatsuSurface = await readSurface();
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

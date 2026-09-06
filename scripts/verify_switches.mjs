import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const evidence = 'work/switch-evidence';
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const report = { flows: [], audits: [], errors: [] };
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(90000);
  page.on('pageerror', (error) => report.errors.push(error.message));
  const ready = () => page.locator('[data-switch-status="ready"]').waitFor();
  const selection = () =>
    page.evaluate(() => {
      const key = Object.keys(localStorage).find((key) =>
        key.startsWith('keyconf-build-v1'),
      );
      return key
        ? JSON.parse(localStorage.getItem(key)).selection.switch
        : null;
    });
  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  const original = await selection();
  await page.goto(new URL('#switch=oil-king', base).href);
  await ready();
  assert.equal(
    await selection(),
    original,
    'inspection must not apply a switch',
  );
  assert.match(
    await page.locator('#switch-specifications').innerText(),
    /55 ± 5 gf operating/,
  );
  assert.equal(
    await page
      .getByRole('link', { name: 'Watch sound test', exact: true })
      .getAttribute('href'),
    'https://www.youtube.com/watch?v=-A_M_hvjVNY',
  );
  await page.getByRole('button', { name: 'Add to build', exact: true }).click();
  await page
    .getByRole('button', { name: 'In your build', exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole('button', { name: 'In your build', exact: true })
      .isDisabled(),
    true,
  );
  await page.getByRole('button', { name: 'Undo change', exact: true }).click();
  await page
    .getByRole('button', { name: 'Add to build', exact: true })
    .waitFor();
  await page.getByRole('button', { name: 'Redo change', exact: true }).click();
  await page
    .getByRole('button', { name: 'In your build', exact: true })
    .waitFor();
  report.flows.push(
    'inspection is read-only; add, undo, redo update the real build',
  );
  await page
    .getByRole('navigation', { name: 'Switch sections', exact: true })
    .getByRole('button', { name: 'Sound', exact: true })
    .click();
  assert.ok(
    page.url().endsWith('#switch=oil-king'),
    'section jumps must retain the route',
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  const canvas = page.locator('.switch-canvas canvas');
  await canvas.focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('+');
  await page.keyboard.press('Tab');
  assert.equal(
    await page
      .getByRole('button', { name: 'Separate housing', exact: true })
      .evaluate((element) => element === document.activeElement),
    true,
  );
  await page.screenshot({
    path: `${evidence}/detail-desktop.png`,
    fullPage: true,
  });
  await page.keyboard.press('Enter');
  await page
    .getByRole('button', { name: 'Assemble switch', exact: true })
    .waitFor();
  await page.screenshot({ path: `${evidence}/detail-separated.png` });
  report.flows.push(
    'keyboard orbit, zoom, Tab and housing toggle work with reduced motion',
  );
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert.ok(
      dimensions.scroll <= dimensions.width + 1,
      `overflow at ${width}px`,
    );
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    report.audits.push({ width, violations: audit.violations });
    assert.deepEqual(
      audit.violations.map((item) => ({
        id: item.id,
        targets: item.nodes.map((node) => node.target),
      })),
      [],
      `accessibility at ${width}px`,
    );
    if (width === 390)
      await page.screenshot({
        path: `${evidence}/detail-mobile.png`,
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(new URL('#switch=g-pro-3-red', base).href);
  await ready();
  assert.match(
    await page.locator('#switch-recordings').innerText(),
    /No exact recording/,
  );
  assert.notEqual(await selection(), 'g-pro-3-red');
  await page.goBack();
  await ready();
  assert.equal(await page.locator('h1').innerText(), 'Oil King');
  await page.reload();
  await ready();
  await page
    .getByRole('button', { name: 'In your build', exact: true })
    .waitFor();
  report.flows.push(
    'alternatives, missing audio, browser Back, and reload retain selection',
  );
  await page.getByRole('link', { name: 'Back to build', exact: true }).click();
  await page.locator('[data-scene-status="ready"]').waitFor();
  await page.getByRole('button', { name: 'Explode', exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  const count = Number(
    await page.locator('.scene-host').getAttribute('data-switch-count'),
  );
  assert.equal(count, 61);
  await page.screenshot({ path: `${evidence}/exploded-desktop.png` });
  await page
    .getByRole('navigation', { name: 'Exploded keyboard layers' })
    .getByRole('link', { name: 'Switches', exact: true })
    .click();
  await ready();
  assert.equal(await page.locator('h1').innerText(), 'Oil King');
  report.flows.push(
    '61 individual switch instances in 60% exploded model; layer link opens the selected switch',
  );
  await page.goto(new URL('#switch=%E0%A4%A', base).href);
  assert.equal(await page.locator('h1').innerText(), 'Switch not found.');
  assert.equal(report.errors.length, 0);
  const fallback = await browser.newPage({
    viewport: { width: 390, height: 850 },
  });
  await fallback.addInitScript(() => {
    const original = Object.getOwnPropertyDescriptor(
      HTMLCanvasElement.prototype,
      'getContext',
    ).value;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return /webgl/.test(type) ? null : original.call(this, type, ...args);
    };
  });
  await fallback.goto(new URL('#switch=g-pro-3-red', base).href);
  await fallback.locator('[data-switch-status="error"]').waitFor();
  await fallback
    .getByRole('button', { name: 'Add to build', exact: true })
    .click();
  await fallback
    .getByRole('button', { name: 'In your build', exact: true })
    .waitFor();
  await fallback.screenshot({
    path: `${evidence}/graphics-fallback.png`,
    fullPage: true,
  });
  report.flows.push(
    'malformed IDs fail safely; WebGL failure keeps specs and add-to-build working',
  );
  await writeFile(`${evidence}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}

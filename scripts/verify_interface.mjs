import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const directory = await mkdtemp(join(tmpdir(), 'keyconf-interface-'));
await writeFile(
  join(directory, 'manifest.json'),
  JSON.stringify({
    manifest_version: 3,
    name: 'Keyconf zoom verification',
    version: '1.0',
    permissions: ['tabs'],
    background: { service_worker: 'worker.js' },
  }),
);
await writeFile(
  join(directory, 'worker.js'),
  'chrome.runtime.onInstalled.addListener(() => {});',
);
const context = await chromium.launchPersistentContext('', {
  executablePath: process.env.KEYCONF_CHROME || chromium.executablePath(),
  viewport: { width: 1280, height: 900 },
  args: [
    '--disable-webgl',
    `--disable-extensions-except=${directory}`,
    `--load-extension=${directory}`,
  ],
});
const reports = [];
const page = await context.newPage();
const button = (name) => page.getByRole('button', { name, exact: true });
const tab = (name) => page.getByRole('tab', { name, exact: true });

async function reflow(name) {
  const dimensions = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
    dialog: document
      .querySelector('dialog[open]')
      ?.getBoundingClientRect()
      .toJSON(),
  }));
  assert.ok(
    dimensions.scroll <= dimensions.client + 1,
    `${name}: horizontal page overflow`,
  );
  if (dimensions.dialog) {
    assert.ok(
      dimensions.dialog.left >= 0 &&
        dimensions.dialog.right <= dimensions.client + 1,
      `${name}: dialog outside viewport`,
    );
  }
}

async function audit(name) {
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.playState === 'running')
        .map((a) => a.finished.catch(() => {})),
    ),
  );
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  reports.push({
    name,
    violations: result.violations,
    incomplete: result.incomplete,
  });
  if (result.violations.length)
    console.log(
      'Audit findings:',
      name,
      result.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    );
}

async function keyboardUntil(predicate) {
  for (let i = 0; i < 90; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      const style = getComputedStyle(el);
      return {
        name: el.getAttribute('aria-label') || el.textContent.trim(),
        role: el.getAttribute('role'),
        visible: el.matches(':focus-visible'),
        outline: parseFloat(style.outlineWidth),
        outlineStyle: style.outlineStyle,
      };
    });
    assert.ok(
      focused.visible &&
        focused.outline >= 2 &&
        focused.outlineStyle !== 'none',
      `Missing focus indicator: ${focused.name}`,
    );
    if (predicate(focused)) return;
  }
  assert.fail('Keyboard destination was not reachable');
}

try {
  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  await tab('Design').click();
  await page.locator('.brand').focus();
  await keyboardUntil((item) => item.name === 'Share build');
  await page.keyboard.press('Enter');
  await page.locator('dialog[open]').waitFor();
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press('Tab');
    assert.ok(
      await page.evaluate(
        () =>
          !document.hasFocus() || !!document.activeElement.closest('dialog'),
      ),
      'Dialog focus escaped',
    );
  }
  await page.keyboard.press('Escape');
  assert.ok(
    await button('Share build').evaluate((el) => el === document.activeElement),
    'Dialog did not restore focus',
  );
  await keyboardUntil((item) => item.role === 'tab');
  await page.keyboard.press('ArrowRight');
  assert.equal(await tab('Components').getAttribute('aria-selected'), 'true');
  await page.keyboard.press('End');
  assert.equal(await tab('Sound').getAttribute('aria-selected'), 'true');
  await page.keyboard.press('Home');
  assert.equal(await tab('Design').getAttribute('aria-selected'), 'true');
  await keyboardUntil((item) => item.name === 'Champagne case');
  console.log(
    'PASS: keyboard navigation, visible focus, tab keys and dialog focus restoration.',
  );

  for (const width of [320, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of ['Design', 'Components', 'Sound']) {
      await tab(name).click();
      await reflow(`${name} at ${width}px`);
      if (width === 320 || width === 1280) {
        await audit(`${name}, top, ${width}px`);
        const panel = page.getByRole('tabpanel', { name, exact: true });
        await panel.evaluate((el) => {
          el.scrollTop = el.scrollHeight;
        });
        await audit(`${name}, bottom, ${width}px`);
      }
    }
    for (const name of ['Share build', 'Import a website']) {
      await button(name).click();
      await reflow(`${name} at ${width}px`);
      await button('Close dialog').click({ trial: true });
      if (width === 320 || width === 1280) await audit(`${name}, ${width}px`);
      await page.keyboard.press('Escape');
    }
    await button('Research & sources').click();
    await reflow(`Research at ${width}px`);
    if (width === 320 || width === 1280) await audit(`Research, ${width}px`);
    await page.keyboard.press('Escape');
    console.log(
      `PASS: design, components, sound and dialogs reflow at ${width}px.`,
    );
  }

  const worker =
    context.serviceWorkers()[0] ??
    (await context.waitForEvent('serviceworker'));
  await page.setViewportSize({ width: 1280, height: 900 });
  const zoom = await worker.evaluate(async (url) => {
    const tabs = await chrome.tabs.query({});
    const target = tabs.find((tab) => tab.url === url);
    await chrome.tabs.setZoom(target.id, 2);
    return chrome.tabs.getZoom(target.id);
  }, page.url());
  assert.equal(zoom, 2);
  await page.waitForFunction(() => innerWidth === 640);
  for (const name of ['Design', 'Components', 'Sound']) {
    await tab(name).click();
    await reflow(`${name} at 200% browser zoom`);
    await button('Export your build').click({ trial: true });
  }
  for (const name of [
    'Share build',
    'Import a website',
    'Research & sources',
  ]) {
    await button(name).click();
    await reflow(`${name} at 200% browser zoom`);
    await button('Close dialog').click();
  }
  console.log(
    'PASS: actual 200% browser zoom reflows all primary panels and dialogs; export and close remain reachable.',
  );
  assert.deepEqual(
    reports
      .filter((report) => report.violations.length)
      .map((report) => report.name),
    [],
    'Accessibility violations, see outputs/interface-audit.json',
  );
} finally {
  await mkdir('outputs', { recursive: true });
  await writeFile(
    'outputs/interface-audit.json',
    JSON.stringify(reports, null, 2),
  );
  await context.close();
  await rm(directory, { recursive: true, force: true });
}

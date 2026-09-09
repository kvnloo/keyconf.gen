import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const browser = await chromium.launch({
  headless: !process.env.KEYCONF_HEADED,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const tab = (name) => page.getByRole('tab', { name, exact: true });
  const button = (name) => page.getByRole('button', { name, exact: true });
  const canvas = page.locator('[data-keyboard-variant] canvas').first();

  async function settle() {
    await page.waitForFunction(
      () => document.querySelector('[data-render-state="idle"]'),
      null,
      { timeout: 120000 },
    );
  }

  /**
   * The renderer resizes its canvas from a ResizeObserver, which queues behind
   * whatever frame the software renderer is drawing. Measure the preview only
   * once it fills the slot the layout already gave it, so a state transition
   * is judged where it lands rather than part way there.
   */
  async function previewFillsSlot() {
    await page.waitForFunction(
      () => {
        const host = document.querySelector('[data-keyboard-variant]');
        const canvas = host?.querySelector('canvas');
        if (!host || !canvas) return false;
        const drawn = canvas.getBoundingClientRect().height;
        return Math.abs(drawn - host.clientHeight) <= 1;
      },
      null,
      { timeout: 30000 },
    );
  }

  /** Every state must keep the preview reachable without scrolling the page. */
  async function inspect(name, { preview = true } = {}) {
    if (preview) await previewFillsSlot();
    const view = await page.evaluate(() => {
      const doc = document.documentElement;
      const rect = document
        .querySelector('[data-keyboard-variant] canvas')
        .getBoundingClientRect();
      const width = Math.max(
        0,
        Math.min(rect.right, innerWidth) - Math.max(rect.left, 0),
      );
      const height = Math.max(
        0,
        Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0),
      );
      const inspector = document.querySelector('.mobile-workbench-inspector');
      return {
        state: inspector?.dataset.inspectorState,
        scrollY,
        scrollHeight: doc.scrollHeight,
        clientHeight: doc.clientHeight,
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        visible: width * height,
        viewport: innerWidth * innerHeight,
      };
    });
    assert.ok(
      view.scrollHeight <= view.clientHeight + 1,
      `${name}: document scrolls vertically (${view.scrollHeight} > ${view.clientHeight})`,
    );
    assert.ok(
      view.scrollWidth <= view.clientWidth + 1,
      `${name}: horizontal overflow (${view.scrollWidth} > ${view.clientWidth})`,
    );
    if (preview) {
      const share = view.visible / view.viewport;
      assert.ok(
        share >= 0.15,
        `${name}: preview is not visible (${(share * 100).toFixed(1)}% of the viewport)`,
      );
    }
    return view;
  }

  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.locator('[data-keyboard-variant]').waitFor({ timeout: 120000 });
  await settle();
  // The landing is a scrolling page by design; the workbench is what must not.
  const customize = page.getByRole('button', { name: /^Customize / }).first();
  await customize.click();
  await customize.waitFor({ state: 'hidden', timeout: 30000 });
  await settle();
  const start = await inspect('workbench');
  assert.equal(start.state, 'editing');

  // Without a static scene, "the pixels changed" would prove nothing below.
  const idle = await canvas.screenshot();
  assert.ok(
    (await canvas.screenshot()).equals(idle),
    'the settled scene still repaints, so pixel comparison cannot prove anything',
  );

  await tab('Design').click();
  const swatch = page
    .locator('button[aria-label$=" case"][aria-pressed="false"]')
    .first();
  const swatchName = await swatch.getAttribute('aria-label');
  await swatch.click();
  await settle();
  assert.ok(
    !(await canvas.screenshot()).equals(idle),
    `choosing ${swatchName} did not change the render`,
  );
  const painted = await inspect(`after ${swatchName}`);
  assert.equal(painted.scrollY, 0, 'appearance edit scrolled the document');
  console.log(`PASS: ${swatchName} repaints the visible preview in place.`);

  await tab('Components').click();
  await inspect('components tab');
  const part = page
    .locator('button[aria-label^="Use "][aria-pressed="false"]')
    .first();
  const partName = await part.getAttribute('aria-label');
  await part.click();
  await settle();
  await page
    .locator(`button[aria-label="${partName}"][aria-pressed="true"]`)
    .waitFor({ timeout: 30000 });
  const swapped = await inspect(`after ${partName}`);
  assert.equal(swapped.scrollY, 0, 'component edit scrolled the document');
  console.log(`PASS: ${partName} applies with the preview still on screen.`);

  await button('Collapse').click();
  const collapsed = await inspect('collapsed');
  assert.equal(collapsed.state, 'collapsed');
  assert.ok(
    collapsed.visible >= start.visible,
    'collapsing the inspector did not give the preview at least as much room',
  );
  assert.equal(
    await button('Edit').getAttribute('aria-expanded'),
    'false',
    'the collapsed inspector still reports itself expanded',
  );
  await button('Edit').click();
  assert.equal((await inspect('editing')).state, 'editing');
  await button('Catalog').click();
  // The catalog is a deliberate full-height browse, so the preview may yield.
  assert.equal(
    (await inspect('expanded', { preview: false })).state,
    'expanded',
  );
  await button('Compact').click();
  assert.equal((await inspect('compact')).state, 'editing');
  console.log(
    'PASS: collapsed, editing and expanded are explicit and reversible.',
  );

  await tab('Design').click();
  await tab('Design').focus();
  await page.keyboard.press('ArrowRight');
  await tab('Components').and(page.locator('[aria-selected="true"]')).waitFor();
  assert.equal(
    await page.evaluate(() => document.activeElement?.id),
    'tab-parts',
    'arrow keys move selection without moving focus',
  );

  const footer = await page.evaluate(() => {
    const element = document.querySelector('.config-footer');
    return element ? getComputedStyle(element).paddingBottom : null;
  });
  assert.ok(
    footer && Number.parseFloat(footer) >= 12,
    `footer does not reserve the bottom safe area (${footer})`,
  );
  console.log('PASS: roving tab focus and bottom safe area at 390px.');

  // The viewport-height shell must not reach screens that scroll their content.
  await tab('Components').click();
  await page
    .getByRole('link', { name: /^Inspect / })
    .first()
    .click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('.studio-shell')
        ?.classList.contains('screen-switch'),
    null,
    { timeout: 30000 },
  );
  const reach = await page.evaluate(() => {
    const shell = document.querySelector('.studio-shell');
    return {
      overflowY: getComputedStyle(shell).overflowY,
      scrollHeight: shell.scrollHeight,
      clientHeight: shell.clientHeight,
    };
  });
  assert.ok(
    reach.overflowY !== 'hidden' ||
      reach.scrollHeight <= reach.clientHeight + 1,
    `the switch page hides ${reach.scrollHeight - reach.clientHeight}px it cannot scroll to`,
  );
  assert.deepEqual(errors, [], 'page errors');
  console.log('PASS: the switch page keeps its content reachable.');
} finally {
  await browser.close();
}

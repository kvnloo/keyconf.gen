import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});

async function ensureServer() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(base, { signal: controller.signal });
    assert.ok(response.ok, `Expected ${base} to return an HTTP success status`);
  } catch (error) {
    throw new Error(
      `Keyboard scene server is unavailable at ${base}. Start the local app or set KEYCONF_BASE_URL. ${error.message}`,
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function pinch(client, center, startRadius, endRadius) {
  const points = (radius) => [
    { id: 1, x: center.x - radius, y: center.y, radiusX: 8, radiusY: 8 },
    { id: 2, x: center.x + radius, y: center.y, radiusX: 8, radiusY: 8 },
  ];
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: points(startRadius),
  });
  for (const radius of [
    startRadius + (endRadius - startRadius) / 3,
    startRadius + ((endRadius - startRadius) * 2) / 3,
    endRadius,
  ]) {
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: points(radius),
    });
  }
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
}

try {
  await ensureServer();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  const host = page.locator('.scene-host[data-scene-status="ready"]');
  await host.waitFor();
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
  );
  await host.scrollIntoViewIfNeeded();
  const canvas = host.locator('canvas');
  const box = await canvas.boundingBox();
  assert.ok(
    box && box.width > 180 && box.height > 180,
    'Canvas must be visible',
  );

  const beforeScale = await page.evaluate(() => visualViewport?.scale);
  const touchAction = await canvas.evaluate(
    (element) => getComputedStyle(element).touchAction,
  );
  assert.equal(touchAction, 'none', 'OrbitControls must own the pinch gesture');
  const before = await canvas.screenshot();
  const client = await context.newCDPSession(page);
  await pinch(
    client,
    { x: box.x + box.width / 2, y: box.y + box.height / 2 },
    Math.min(28, box.width / 8),
    Math.min(112, box.width / 2.8),
  );
  await page.waitForTimeout(150);
  const afterScale = await page.evaluate(() => visualViewport?.scale);
  const after = await canvas.screenshot();

  assert.equal(
    afterScale,
    beforeScale,
    'A scene pinch must not change visualViewport.scale',
  );
  assert.ok(
    !after.equals(before),
    'A scene pinch must change the rendered camera view',
  );
  assert.deepEqual(errors, [], 'The gesture must not cause page errors');
  console.log(
    JSON.stringify({
      base,
      viewport: { width: 390, height: 844 },
      touchAction,
      visualViewportScale: { before: beforeScale, after: afterScale },
      canvasChanged: !after.equals(before),
    }),
  );
} finally {
  await browser.close();
}

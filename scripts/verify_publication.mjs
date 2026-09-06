import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const ids = JSON.parse(
  await readFile(
    process.env.KEYCONF_PUBLICATION_FIXTURES ??
      '/tmp/keyconf-publication-fixtures.json',
    'utf8',
  ),
);
const base =
  process.env.KEYCONF_PUBLICATION_BASE_URL ?? 'http://localhost:4180/';
const browser = await chromium.launch({
  headless: !process.env.KEYCONF_HEADED,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const active = new URL(`builds/${ids.active}`, base).href;
  const response = await page.goto(active);
  assert.equal(response.status(), 200);
  await page
    .getByRole('heading', { name: 'Local active release', exact: true })
    .waitFor();
  await page
    .getByRole('heading', { name: 'Local test creator @local_test_creator' })
    .waitFor();
  assert.equal(
    await page
      .getByRole('link', { name: 'Visit the creator' })
      .getAttribute('href'),
    'https://example.com/enquire',
  );
  await page.locator('[data-scene-status=ready]').waitFor({ state: 'visible' });
  await page.locator('.preview-hear:not([disabled])').waitFor();
  assert.equal(
    (await page.content()).includes('Private fixture active'),
    false,
  );
  assert.equal((await page.content()).includes('local-test-subject'), false);
  await mkdir('outputs', { recursive: true });
  await page.screenshot({ path: 'outputs/publication-desktop.png' });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
  }
  await page.screenshot({
    path: 'outputs/publication-mobile.png',
    fullPage: true,
  });
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    axe.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
    [],
  );
  await page.getByText('Compatibility notes', { exact: true }).click();
  assert.ok(
    await page
      .getByRole('region', { name: 'Accessory compatibility notes' })
      .locator('li')
      .count(),
  );
  await page.getByRole('button', { name: 'Customize a copy' }).click();
  await page.waitForURL(
    (url) => url.pathname === '/' && url.hash === '#studio',
  );
  await page.goto(new URL(`builds/${ids.retired}`, base).href);
  await page
    .getByRole('heading', { name: 'Local retired release', exact: true })
    .waitFor();
  await page
    .getByText(
      'Some parts or recordings are no longer supported in the studio.',
      { exact: false },
    )
    .waitFor();
  assert.equal(
    await page.getByRole('button', { name: 'Customize a copy' }).count(),
    0,
  );
  assert.ok(await page.getByRole('link', { name: /KBDfans/ }).count());
  assert.ok(
    await page
      .getByRole('region', { name: 'Accessory compatibility notes' })
      .locator('li')
      .count(),
  );
  for (const id of [ids.withdrawn, 'missing-publication-id']) {
    const res = await page.goto(new URL(`builds/${id}`, base).href);
    assert.equal(res.status(), 404);
    assert.equal(
      (await page.content()).includes('Frozen release notes.'),
      false,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    'Published page: creator/source links, private-field exclusion, 3D, phone layout, accessibility, customization, archived parts and withdrawn/missing 404 passed.',
  );
} finally {
  await browser.close();
}

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
  assert.equal(await page.title(), 'Local active release | Keyconf');
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
  const availability = await page.locator('.publication-drop').innerText();
  assert.match(availability, /Availability, from the creator:/);
  assert.match(
    availability,
    /Keyconf does not hold stock, take payment, or represent the seller, and that link leaves this site\./,
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
  await page.getByText('Try changes', { exact: true }).click();
  await page.getByRole('button', { name: 'Midnight', exact: true }).click();
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.variationFeedback = text;
        },
      },
    });
  });
  await page.getByText('Feedback for the builder', { exact: true }).click();
  await page
    .getByLabel('Your notes', { exact: true })
    .fill('Try this darker version.');
  await page.getByRole('button', { name: 'Copy notes & build link' }).click();
  const variationUrl = new URL(
    (await page.evaluate(() => window.variationFeedback)).split(
      'Build preview: ',
    )[1],
  );
  assert.equal(variationUrl.pathname, '/');
  assert.ok(variationUrl.hash.startsWith('#preview='));
  await page.goto(variationUrl.href);
  await page.getByText('Try changes', { exact: true }).click();
  assert.equal(
    await page
      .getByRole('button', { name: 'Midnight', exact: true })
      .getAttribute('aria-pressed'),
    'true',
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
  const draftBeforeFeedback = await page.evaluate(() =>
    Object.fromEntries(
      Object.keys(localStorage)
        .sort()
        .map((key) => [key, localStorage.getItem(key)]),
    ),
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error('Clipboard denied');
        },
      },
    });
  });
  await page.getByText('Feedback for the builder', { exact: true }).click();
  await page
    .getByLabel('Your notes', { exact: true })
    .fill('Which current switch would you recommend instead?');
  await page.getByRole('button', { name: 'Copy notes & build link' }).click();
  const feedback = await page
    .getByLabel('Message to copy', { exact: true })
    .inputValue();
  assert.ok(
    feedback.includes('Which current switch would you recommend instead?'),
  );
  assert.equal(
    feedback.split('Build preview: ')[1],
    new URL(`builds/${ids.retired}`, base).href,
  );
  assert.deepEqual(
    await page.evaluate(() =>
      Object.fromEntries(
        Object.keys(localStorage)
          .sort()
          .map((key) => [key, localStorage.getItem(key)]),
      ),
    ),
    draftBeforeFeedback,
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  const archiveAxe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    archiveAxe.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
    [],
  );
  for (const id of [ids.withdrawn, 'missing-publication-id']) {
    const res = await page.goto(new URL(`builds/${id}`, base).href);
    assert.equal(res.status(), 404);
    assert.doesNotMatch(
      await page.title(),
      /Local (active|retired|withdrawn) release/,
    );
    assert.match(
      await page.locator('meta[name=robots]').first().getAttribute('content'),
      /noindex/,
    );
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

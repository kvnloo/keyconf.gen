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

  const response = await page.goto(
    new URL(`collections/${ids.collection}`, base).href,
  );
  assert.equal(response.status(), 200);
  assert.equal(
    await page.title(),
    'Boards I keep going back to | Keyconf',
    'the collection title should reach the tab',
  );
  await page
    .getByRole('heading', { name: 'Boards I keep going back to', exact: true })
    .waitFor();

  // The curator is named as the curator, not as the builds' creator.
  assert.match(
    await page.locator('.published-collection-curator').innerText(),
    /Curated by Local test creator\s+@local_test_creator/,
  );

  // The build withdrawn after curation leaves the page rather than 404ing from it.
  const entries = page.locator('.published-collection-entries li');
  assert.equal(
    await entries.count(),
    2,
    'a build withdrawn after curation should leave the collection',
  );
  const text = await page.locator('.published-collection').innerText();
  assert.equal(
    text.includes('Local curated release'),
    false,
    'the withdrawn build should not be named anywhere on the page',
  );
  assert.match(text, /Local active release/);

  // Every remaining entry links to the build's own published page.
  for (const link of await page
    .locator('.published-collection-entries a')
    .all()) {
    const href = await link.getAttribute('href');
    assert.match(href, /^\/builds\/[a-zA-Z0-9_-]{16,100}$/);
    assert.notEqual(
      href,
      `/builds/${ids.collectionWithdrawn}`,
      'the withdrawn build should not still be linked',
    );
  }

  // Honest attribution, and nothing that reads like a shop.
  assert.match(
    text,
    /Each build belongs to the creator listed beside it, who published it themselves and can withdraw it at any time/,
  );
  assert.match(
    text,
    /Keyconf does not hold stock, take payment, or represent anyone named here\./,
  );
  for (const forbidden of [
    /add to cart/i,
    /\bbuy now\b/i,
    /\bcheckout\b/i,
    /\bin stock\b/i,
  ])
    assert.equal(
      forbidden.test(text),
      false,
      `a collection page must not read like a shop: ${forbidden}`,
    );

  // Private fixture details never reach a public page.
  const html = await page.content();
  assert.equal(html.includes('Private fixture'), false);
  assert.equal(html.includes('local-test-subject'), false);

  const audit = await new AxeBuilder({ page })
    .include('.published-collection')
    .analyze();
  assert.deepEqual(
    audit.violations.map((violation) => violation.id),
    [],
  );

  await mkdir('outputs', { recursive: true });
  await page.screenshot({ path: 'outputs/collection-desktop.png' });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `the collection page should fit ${width}px`,
    );
  }

  // The index makes a collection findable without being handed its link.
  await page.setViewportSize({ width: 1280, height: 900 });
  const index = await page.goto(new URL('collections', base).href);
  assert.equal(index.status(), 200);
  assert.equal(await page.title(), 'Collections | Keyconf');
  const listed = page.locator('.collection-index-list li');
  assert.equal(await listed.count(), 1, 'the fixture collection should list');
  const entry = listed.first();
  assert.equal(
    await entry.getByRole('link').getAttribute('href'),
    `/collections/${ids.collection}`,
  );
  assert.match(
    await entry.innerText(),
    /Curated by Local test creator\s+@local_test_creator/,
  );
  // Two of the three curated builds are still published, so the index has to
  // count two rather than repeat the number the curator originally chose.
  assert.match(await entry.innerText(), /\b2 builds\b/);
  const indexText = await page.locator('.collection-index').innerText();
  assert.equal(
    indexText.includes('Local curated release'),
    false,
    'the withdrawn build should not surface through the index',
  );
  assert.match(
    indexText,
    /Keyconf does not hold stock, take payment, or represent anyone listed here\./,
  );
  for (const forbidden of [/add to cart/i, /\bbuy now\b/i, /\bcheckout\b/i])
    assert.equal(
      forbidden.test(indexText),
      false,
      `the collections index must not read like a shop: ${forbidden}`,
    );
  assert.equal(
    (await page.content()).includes('local-test-subject'),
    false,
    'the index must not leak the owning account',
  );
  const indexAudit = await new AxeBuilder({ page })
    .include('.collection-index')
    .analyze();
  assert.deepEqual(
    indexAudit.violations.map((violation) => violation.id),
    [],
  );
  await page.screenshot({ path: 'outputs/collection-index.png' });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `the collections index should fit ${width}px`,
    );
  }

  // Following the index link lands on the collection it advertised.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(new URL('collections', base).href);
  await page.locator('.collection-index-list a').first().click();
  await page
    .getByRole('heading', { name: 'Boards I keep going back to', exact: true })
    .waitFor();

  // A withdrawn build's id is not a collection, and neither is a stranger's.
  for (const missing of [ids.collectionWithdrawn, 'missing-collection-000000'])
    assert.equal(
      (await page.goto(new URL(`collections/${missing}`, base).href)).status(),
      404,
      `${missing} should not resolve to a collection`,
    );

  assert.deepEqual(errors, []);
  console.log('collection page verified');
} finally {
  await browser.close();
}

import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('outputs', { recursive: true });
const browser = await chromium.launch({ args: ['--disable-webgl'] });
const storeModule = /\/(?:lib\/store-observations|assets\/store-observations-)/;
const base = process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/';
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  let downloads = 0;
  page.on('request', (request) => {
    if (storeModule.test(request.url())) downloads++;
  });
  for (const width of [320, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + '#discover');
    const section = page.locator('.store-observations');
    if (width === 320) assert.equal(downloads, 0);
    await section.locator('summary').click();
    const cards = section.locator('.research-product');
    await cards.first().waitFor();
    assert.equal(await cards.count(), 12);
    assert.ok(downloads > 0);
    await section.getByRole('button', { name: 'Show more options' }).click();
    assert.equal(await cards.count(), 24);
    await section.getByRole('searchbox').fill('Gateron Ink');
    await page.waitForFunction(() => {
      const cards = [
        ...document.querySelectorAll('.store-observations .research-product'),
      ];
      return (
        cards.length > 0 &&
        cards.every((card) => /Gateron Ink/i.test(card.textContent ?? ''))
      );
    });
    assert.ok((await cards.count()) > 0);
    for (const text of await cards.allTextContents())
      assert.match(text, /Gateron Ink/i);
    const href = await cards.first().getAttribute('href');
    assert.match(href, /https:\/\/divinikey.com\/products\/.*variant=/);
    assert.match(await section.innerText(), /not per switch/);
    await section.screenshot({
      path: `outputs/store-observations-${width}.png`,
    });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await section
      .getByRole('searchbox')
      .fill('there-is-no-switch-with-this-name');
    await section
      .getByText('No observed options match. Try a brand or switch name.')
      .waitFor();
    await section.getByRole('searchbox').fill('');
    assert.equal(await cards.count(), 12);
    await section.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await section.getAttribute('open'), null);
  }
  assert.deepEqual(errors, []);
  const recovery = await browser.newPage();
  recovery.on('pageerror', (e) => errors.push(e.message));
  await recovery.route(storeModule, (route) => route.abort());
  await recovery.goto(base + '#discover');
  await recovery.locator('.store-observations summary').click();
  await recovery
    .getByText(
      'The store observations could not be loaded. Your build is unchanged.',
    )
    .waitFor();
  assert.equal(
    await recovery
      .locator('.research-products')
      .first()
      .getByRole('searchbox', { name: 'Search research products' })
      .count(),
    1,
  );
  await recovery.unroute(storeModule);
  await Promise.all([
    recovery.waitForEvent('domcontentloaded'),
    recovery.getByRole('button', { name: 'Reload page', exact: true }).click(),
  ]);
  await recovery.locator('.store-observations summary').click();
  await recovery
    .locator('.store-observations .research-product')
    .first()
    .waitFor();
  assert.deepEqual(errors, []);
  await recovery.close();
  console.log(
    'Store observations: deferred download, failed-download recovery, 320/1920px search, expansion, original variant links, empty/reset, keyboard disclosure and overflow pass.',
  );
} finally {
  await browser.close();
}

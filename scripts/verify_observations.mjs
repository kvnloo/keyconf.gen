import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('outputs', { recursive: true });
const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [320, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(
      (process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/') + '#discover',
    );
    const section = page.locator('.store-observations');
    await section.locator('summary').click();
    const cards = section.locator('.research-product');
    await cards.first().waitFor();
    assert.equal(await cards.count(), 12);
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
  console.log(
    'Store observations: 320/1920px search, expansion, original variant links, empty/reset, keyboard disclosure and overflow pass.',
  );
} finally {
  await browser.close();
}

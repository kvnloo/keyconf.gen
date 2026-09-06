import assert from 'node:assert/strict';
import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(
    new URL('#studio', process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/')
      .href,
  );
  const saved = () =>
    page
      .locator('.save-state')
      .filter({ hasText: 'Saved on this device' })
      .waitFor();
  await saved();
  const state = () =>
    page.evaluate(() =>
      JSON.parse(
        localStorage.getItem(
          Object.keys(localStorage).find((k) =>
            /^keyconf-build-v1(?::dev|:nightly)?$/.test(k),
          ),
        ),
      ),
    );
  const before = await state();
  const trigger = page.getByRole('button', {
    name: 'Search parts and studio',
    exact: true,
  });
  const search = page.getByRole('searchbox', {
    name: 'Search parts and studio',
    exact: true,
  });
  await trigger.click();
  await expect(search).toBeFocused();
  await search.fill('oil king');
  await search.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Oil King', exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole('link', { name: 'Visit original source' }),
  ).toHaveAttribute('href', /gateron/);
  assert.deepEqual(
    await state(),
    before,
    'Inspecting a result must not modify the build',
  );
  await page.getByRole('button', { name: 'Use in build', exact: true }).click();
  await saved();
  assert.notEqual((await state()).selection.switch, before.selection.switch);
  await page.getByRole('button', { name: 'Undo change', exact: true }).click();
  await saved();
  assert.deepEqual(await state(), before);
  await page.keyboard.press('Control+k');
  await expect(search).toBeFocused();
  await search.fill('jelly artisan');
  await search.press('ArrowDown');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Back to results' }).click();
  await expect(search).toBeFocused();
  await search.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Add to plan' }).click();
  await saved();
  assert.equal(
    (await state()).accessories.length,
    before.accessories.length + 1,
  );
  await page.getByRole('button', { name: 'Undo change', exact: true }).click();
  await saved();
  assert.deepEqual(await state(), before);
  await page.getByRole('button', { name: 'Focus', exact: true }).click();
  await page.keyboard.press('Control+k');
  await expect(search).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('.studio-shell')).toHaveClass(/focus-mode/);
  await page.keyboard.press('Control+k');
  await search.fill('Parts & accessories');
  await page
    .getByRole('button', {
      name: 'Parts & accessories Components, compatibility and artisan placement',
    })
    .click();
  await expect(page.locator('.studio-shell')).not.toHaveClass(/focus-mode/);
  await mkdir('outputs/search', { recursive: true });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await trigger.click();
    await search.fill('no-matching-part-927');
    await expect(
      page.getByText('No matches yet.', { exact: false }),
    ).toBeVisible();
    assert.deepEqual((await new AxeBuilder({ page }).analyze()).violations, []);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.screenshot({ path: `outputs/search/${width}.png` });
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
  }
  await trigger.click();
  await search.fill('typing');
  await page
    .getByRole('button', { name: 'Typing test Try your keyboard' })
    .click();
  await expect(page).toHaveURL(/#play$/);
  const typing = page.frameLocator(
    'iframe[title="Monkeytype guest typing test"]',
  );
  await typing.locator('#wordsInput').focus();
  await page.keyboard.press('Control+k');
  await expect(search).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(/#play$/);

  assert.deepEqual(await state(), before);
  assert.deepEqual(errors, []);
  console.log(
    'Search: keyboard focus/navigation, maker sources, explicit edits/Undo, artisan planning, empty states, 320/390/1440 accessibility and typing destination passed.',
  );
} finally {
  await browser.close();
}

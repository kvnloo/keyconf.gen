import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { defaultBuild } from '../lib/build.ts';
import { previewLink, sharedPreview } from '../lib/shared-preview.ts';
const browser = await chromium.launch({
  headless: !process.env.KEYCONF_HEADED,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.copiedFeedback = '';
    window.denyCopy = false;
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text) => {
          if (window.denyCopy) throw new Error('Clipboard unavailable');
          window.copiedFeedback = text;
        },
      },
    });
  });
  const build = { ...defaultBuild, name: 'Client green study' };
  await page.goto(
    previewLink(
      build,
      process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/',
    ),
  );
  await page.getByText('Feedback for the builder', { exact: true }).click();
  const copy = page.getByRole('button', { name: 'Copy notes & build link' });
  assert.equal(await copy.isDisabled(), true);
  const notes = page.getByLabel('Your notes', { exact: true });
  await notes.fill('Keep the green. Try a quieter switch.');
  await copy.click();
  await page
    .getByText('Copied. Paste it into your conversation with the builder.', {
      exact: true,
    })
    .waitFor();
  const message = await page.evaluate(() => window.copiedFeedback);
  assert.ok(message.includes('Keep the green. Try a quieter switch.'));
  const link = message.split('Build preview: ')[1];
  assert.equal(sharedPreview(new URL(link).hash).build.name, build.name);
  await page.evaluate(() => {
    window.denyCopy = true;
  });
  await notes.fill('Could we use cream keycaps?');
  await copy.click();
  const fallback = page.getByLabel('Message to copy', { exact: true });
  await fallback.waitFor();
  assert.ok(
    (await fallback.inputValue()).includes('Could we use cream keycaps?'),
  );
  await fallback.focus();
  assert.equal(
    await fallback.evaluate((el) => el.selectionEnd - el.selectionStart),
    (await fallback.inputValue()).length,
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await notes.fill('  ');
  assert.equal(await copy.isDisabled(), true);
  assert.equal(await fallback.count(), 0);
  assert.deepEqual(errors, []);
  console.log(
    'Feedback copy, exact build link, denied-clipboard fallback, empty notes and mobile layout passed.',
  );
} finally {
  await browser.close();
}

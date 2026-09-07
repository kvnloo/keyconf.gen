import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
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
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.copiedFeedback = '';
    window.denyCopy = false;
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text) => {
          if (window.delayCopy)
            await new Promise((resolve) => {
              window.finishCopy = resolve;
            });
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
  const storedBefore = await page.evaluate(() => JSON.stringify(localStorage));
  await page.getByText('Compare another build', { exact: true }).click();
  const upload = page.getByLabel('Build file to compare', { exact: true });
  await upload.setInputFiles({
    name: 'revision.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ ...build, layout: '75' })),
  });
  await page.getByText('1 setting differs.', { exact: false }).waitFor();
  assert.equal(
    await page.locator('.preview-comparison dt').textContent(),
    'Layout',
  );
  assert.match(
    await page.locator('.preview-comparison dl').textContent(),
    /60%.*75%/,
  );
  await upload.setInputFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{'),
  });
  await page
    .locator('.preview-comparison output')
    .filter({ hasText: 'This file is not readable JSON.' })
    .waitFor();
  assert.equal(
    await page.locator('.preview-comparison dt').textContent(),
    'Layout',
  );
  assert.equal(
    await page.evaluate(() => JSON.stringify(localStorage)),
    storedBefore,
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  const importedCase = {
    id: 'import:comparison-case',
    category: 'case',
    name: 'Client case',
    brand: 'Independent maker',
    detail: 'Client supplied dimensions',
    source: 'https://example.com/client-case',
    family: 'unknown',
    evidence: 'unknown',
  };
  await upload.setInputFiles({
    name: 'maker-revision.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...build,
        selection: { ...build.selection, case: importedCase.id },
        customParts: [importedCase],
      }),
    ),
  });
  const makerLink = page.getByRole('link', {
    name: 'Visit Independent maker Client case',
  });
  await makerLink.waitFor();
  assert.equal(await makerLink.getAttribute('href'), importedCase.source);
  assert.equal(await makerLink.getAttribute('target'), '_blank');
  assert.equal(await page.locator('.preview-comparison dd a').count(), 2);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.equal(
    await page.evaluate(() => JSON.stringify(localStorage)),
    storedBefore,
  );
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    accessibility.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
    [],
  );
  await page.getByRole('button', { name: 'Clear comparison' }).click();
  assert.equal(await page.locator('.preview-comparison dt').count(), 0);
  await page.getByText('Try changes', { exact: true }).click();
  await page.getByRole('button', { name: 'Hear a key', exact: true }).click();
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .waitFor();
  await page.getByLabel('Sound reference', { exact: true }).click();
  await page
    .getByRole('option', { name: 'Synthesized study', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Enable keyboard sound', exact: true })
    .waitFor();
  await page.getByRole('button', { name: 'Hear a key', exact: true }).click();
  await page
    .getByRole('button', { name: 'Mute keyboard', exact: true })
    .waitFor();
  await page
    .getByRole('button', { name: 'Reset to original', exact: true })
    .click();
  await page.getByRole('button', { name: 'Midnight', exact: true }).click();
  await page
    .getByText('Viewing the original build.', { exact: true })
    .waitFor({ state: 'hidden' });
  assert.equal(
    await page.evaluate(() => JSON.stringify(localStorage)),
    storedBefore,
  );
  await page.evaluate(() => {
    window.denyCopy = false;
  });
  await notes.fill('Please use this darker colorway.');
  await copy.click();
  const changedMessage = await page.evaluate(() => window.copiedFeedback);
  const variation = sharedPreview(
    new URL(changedMessage.split('Build preview: ')[1]).hash,
  );
  assert.equal(variation.build.palette.name, 'Midnight');
  assert.equal(variation.build.selection.switch, build.selection.switch);
  await page
    .getByRole('button', { name: 'Reset to original', exact: true })
    .click();
  await page
    .getByText('Viewing the original build.', { exact: true })
    .waitFor();
  await copy.click();
  const resetMessage = await page.evaluate(() => window.copiedFeedback);
  assert.deepEqual(
    sharedPreview(new URL(resetMessage.split('Build preview: ')[1]).hash).build,
    build,
  );
  const feedbackReceipt = page
    .locator('.preview-feedback')
    .filter({ has: page.locator('#build-feedback-note') })
    .locator('output');
  await page.getByRole('button', { name: 'Midnight', exact: true }).click();
  assert.equal(await feedbackReceipt.textContent(), '');
  assert.equal(await notes.inputValue(), 'Please use this darker colorway.');
  await page.evaluate(() => {
    window.copiedFeedback = '';
    window.delayCopy = true;
  });
  await copy.click();
  await page.waitForFunction(() => typeof window.finishCopy === 'function');
  await notes.fill('Updated notes while clipboard is pending.');
  await page.evaluate(() => {
    window.finishCopy();
    window.delayCopy = false;
  });
  await page.waitForFunction(() =>
    window.copiedFeedback.includes('Please use this darker colorway.'),
  );
  assert.equal(await feedbackReceipt.textContent(), '');
  await page.evaluate(() => {
    window.denyCopy = true;
  });
  await copy.click();
  await fallback.waitFor();
  await page
    .getByRole('button', { name: 'Reset to original', exact: true })
    .click();
  assert.equal(await fallback.count(), 0);
  assert.equal(await feedbackReceipt.textContent(), '');
  await page.evaluate(() => {
    window.denyCopy = false;
  });
  await page.getByRole('button', { name: 'Porcelain', exact: true }).click();
  const editAccessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    editAccessibility.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
    [],
  );
  await page.screenshot({
    path: 'outputs/preview-adjustments-mobile.png',
    fullPage: true,
  });

  await page
    .getByRole('button', { name: 'Customize a copy', exact: true })
    .click();
  await page.waitForURL((url) => url.hash === '#studio');
  await page.waitForFunction(() =>
    Object.keys(localStorage).some((key) => {
      try {
        return (
          JSON.parse(localStorage.getItem(key)).palette?.name === 'Porcelain'
        );
      } catch {
        return false;
      }
    }),
  );
  assert.deepEqual(errors, []);
  console.log(
    'Feedback copy, exact build link, denied-clipboard fallback, empty notes and mobile layout passed.',
  );
} finally {
  await browser.close();
}

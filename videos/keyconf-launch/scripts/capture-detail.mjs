import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const b = await chromium.launch({
  headless: true,
  args: [
    '--use-gl=angle',
    '--use-angle=gl-egl',
    '--ignore-gpu-blocklist',
    '--enable-gpu-rasterization',
  ],
});
const p = await b.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
p.setDefaultTimeout(60000);
try {
  await p.goto('http://localhost:3000/');
  await p.waitForFunction(() => !document.querySelector('.model-status'));
  await p
    .getByRole('button', { name: 'Customize this build', exact: true })
    .click();
  await p.getByRole('tab', { name: 'Components', exact: true }).click();
  const input = p.getByRole('searchbox', { name: 'Search components' });
  await input.fill('Oil King');
  await input.scrollIntoViewIfNeeded();
  console.log(await p.locator('.catalog-choice').allTextContents());
  const card = p.locator('.catalog-card').first();
  await card.waitFor();
  await mkdir('assets/details', { recursive: true });
  await card.screenshot({ path: 'assets/details/switch-card.png' });
  await p
    .locator('.component-slots')
    .screenshot({ path: 'assets/details/component-slots.png' });
  await p
    .locator('.component-slots button[aria-pressed=true]')
    .screenshot({ path: 'assets/details/selected-switch.png' });
  await p.getByRole('tab', { name: 'Design', exact: true }).click();
  await p
    .locator('.config')
    .screenshot({ path: 'assets/details/design-panel.png' });
} finally {
  await b.close();
}

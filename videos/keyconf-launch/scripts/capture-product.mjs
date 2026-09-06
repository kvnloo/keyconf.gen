import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('assets/footage', { recursive: true });
await mkdir('assets/stills', { recursive: true });
const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({
  viewport: { width: 1536, height: 864 },
  deviceScaleFactor: 1.25,
  reducedMotion: 'reduce',
  recordVideo: { dir: 'capture/takes', size: { width: 1536, height: 864 } },
});
const page = await context.newPage();
page.setDefaultTimeout(60000);
const events = [];
const origin = Date.now();
const log = (name) => {
  const row = { name, time: (Date.now() - origin) / 1000 };
  events.push(row);
  console.log(row);
};
const ready = async () => {
  await page.waitForFunction(
    () => !document.querySelector('.model-status'),
    {},
    { timeout: 90000 },
  );
  await page.waitForFunction(
    () => document.querySelector('.scene-host')?.dataset.renderState === 'idle',
    {},
    { timeout: 60000 },
  );
};
const shot = async (name) => {
  await ready();
  await page.screenshot({ path: `assets/stills/${name}.png`, timeout: 90000 });
  log(`still:${name}`);
};
try {
  await page.goto('http://localhost:3000/');
  log('navigate');
  await shot('landing');
  log('landing-start');
  await page.waitForTimeout(6000);
  log('landing-end');
  await page
    .getByRole('button', { name: 'Customize this build', exact: true })
    .click();
  await shot('build');
  console.log(
    'BUILDBUTTONS',
    await page.locator('button:visible').allTextContents(),
  );
  log('build-start');
  await page.waitForTimeout(3500);
  log('build-end');
  await page.getByRole('button', { name: 'Explode', exact: true }).click();
  await shot('exploded');
  log('exploded-start');
  await page.waitForTimeout(5000);
  log('exploded-end');
  await page.getByRole('button', { name: 'Explode', exact: true }).click();
  await page.getByRole('link', { name: 'Sound', exact: true }).click();
  await shot('sound');
  console.log(
    'SOUNDBUTTONS',
    await page.locator('button:visible').allTextContents(),
  );
  log('sound-start');
  await page.waitForTimeout(5000);
  log('sound-end');
  await page.getByRole('link', { name: 'Play', exact: true }).click();
  const frame = page.frameLocator(
    'iframe[title="Monkeytype guest typing test"]',
  );
  await frame.locator('#words .word').first().waitFor();
  await ready();
  await frame.locator('#wordsInput').focus();
  await page.screenshot({ path: 'assets/stills/play.png' });
  const words = await frame.locator('#words .word').allTextContents();
  log('typing-start');
  await page.keyboard.type(words.slice(0, 12).join(' ') + ' ', { delay: 95 });
  log('typing-end');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await writeFile('capture/take-events.json', JSON.stringify(events, null, 2));
  const video = page.video();
  await context.close();
  await video.saveAs('assets/footage/product-take.webm');
  await browser.close();
}

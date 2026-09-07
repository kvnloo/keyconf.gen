import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { defaultBuild } from '../lib/build.ts';
import { sharedPreview } from '../lib/shared-preview.ts';

const fixtures = JSON.parse(
  await readFile(
    process.env.KEYCONF_PUBLICATION_FIXTURES ??
      '/tmp/keyconf-publication-fixtures.json',
    'utf8',
  ),
);
const base =
  process.env.KEYCONF_PUBLICATION_BASE_URL ?? 'http://localhost:4180/';
const origin = new URL(base).origin;
const endpoint = new URL('/api/proposal-preview', base).href;
const invitation = (token) => new URL(`/proposal#token=${token}`, base).href;
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
  const requests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) =>
    requests.push({
      url: request.url(),
      headers: request.headers(),
      body: request.postData(),
    }),
  );
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.copiedProposalFeedback = text;
        },
      },
    });
  });

  await page.goto(new URL('#studio', base).href);
  await page
    .locator('.save-state')
    .filter({ hasText: 'Saved on this device' })
    .waitFor();
  const storageKey = await page.evaluate(() =>
    Object.keys(localStorage).find((key) =>
      /^keyconf-build-v1(?::nightly|:dev)?$/.test(key),
    ),
  );
  assert.ok(storageKey);
  const mine = { ...defaultBuild, name: 'Existing personal draft' };
  await page.evaluate(
    ({ storageKey, mine }) =>
      localStorage.setItem(storageKey, JSON.stringify(mine)),
    { storageKey, mine },
  );

  const post = (token, extra = {}) =>
    context.request.post(endpoint, {
      headers: { Origin: origin },
      data: { token },
      ...extra,
    });
  const response = await post(fixtures.proposal_active.token);
  assert.equal(response.status(), 200);
  assert.match(response.headers()['cache-control'], /no-store/);
  assert.equal(response.headers()['referrer-policy'], 'no-referrer');
  assert.match(response.headers()['x-robots-tag'], /noindex/);
  const payload = await response.json();
  assert.equal(payload.customization, 'available');
  assert.equal(payload.build.name, 'Local active proposal');
  for (const secret of [
    fixtures.proposal_active.token,
    'local-test-subject',
    'Private fixture active',
    'operationId',
    'tokenDigest',
  ])
    assert.equal(JSON.stringify(payload).includes(secret), false);
  const document = await page.goto(invitation(fixtures.proposal_active.token));
  assert.match(document.headers()['cache-control'], /no-store/);
  assert.equal(document.headers()['referrer-policy'], 'no-referrer');
  assert.match(document.headers()['x-robots-tag'], /noindex/);
  assert.equal(await page.title(), 'Your keyboard proposal | Keyconf');
  await page
    .getByRole('heading', { name: 'Local active proposal', exact: true })
    .waitFor();
  await page
    .getByText(
      'A quiet board for your desk. Try the colors and send me your notes.',
      { exact: true },
    )
    .waitFor();
  await page.locator('[data-scene-status=ready]').waitFor();
  const stored = await page.evaluate(() => JSON.stringify(localStorage));
  assert.deepEqual(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)),
      storageKey,
    ),
    mine,
  );
  await page.getByText('Try changes', { exact: true }).click();
  await page.getByRole('button', { name: 'Midnight', exact: true }).click();
  await page.getByText('Feedback for the builder', { exact: true }).click();
  await page
    .getByLabel('Your notes', { exact: true })
    .fill('Please try this darker colorway.');
  await page.getByRole('button', { name: 'Copy notes & build link' }).click();
  const feedback = await page.evaluate(() => window.copiedProposalFeedback);
  assert.equal(feedback.includes(fixtures.proposal_active.token), false);
  const variationLink = new URL(feedback.split('Build preview: ')[1]);
  assert.equal(variationLink.pathname, '/');
  assert.equal(
    sharedPreview(variationLink.hash).build.palette.name,
    'Midnight',
  );
  assert.equal(await page.evaluate(() => JSON.stringify(localStorage)), stored);
  assert.equal((await post(fixtures.proposal_active.token)).status(), 200);
  assert.deepEqual(
    (await (await post(fixtures.proposal_active.token)).json()).build,
    payload.build,
  );
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
  }
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
  await page.screenshot({
    path: 'outputs/proposal-mobile.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Customize a copy' }).click();
  await page.waitForURL(
    (url) => url.pathname === '/' && url.hash === '#studio',
  );
  await page.waitForFunction(
    (key) => JSON.parse(localStorage.getItem(key))?.palette.name === 'Midnight',
    storageKey,
  );
  await page.getByRole('button', { name: 'Undo change', exact: true }).click();
  await page.waitForFunction(
    (key) =>
      JSON.parse(localStorage.getItem(key))?.name === 'Existing personal draft',
    storageKey,
  );

  await page.goto(invitation(fixtures.proposal_retired.token));
  await page
    .getByRole('heading', { name: 'Local retired proposal', exact: true })
    .waitFor();
  assert.equal(
    await page.getByRole('button', { name: 'Customize a copy' }).count(),
    0,
  );
  assert.ok(await page.getByRole('link', { name: /KBDfans/ }).count());
  await page.getByText('Feedback for the builder', { exact: true }).click();
  await page
    .getByLabel('Your notes', { exact: true })
    .fill('Can you suggest a current case?');
  await page.getByRole('button', { name: 'Copy notes', exact: true }).click();
  const archivedFeedback = await page.evaluate(
    () => window.copiedProposalFeedback,
  );
  assert.equal(
    archivedFeedback.includes(fixtures.proposal_retired.token),
    false,
  );
  assert.match(archivedFeedback, /Attach the downloaded build file/);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download build file' }).click();
  const file = await download;
  const exported = JSON.parse(await readFile(await file.path(), 'utf8'));
  assert.equal(exported.name, 'Local retired proposal');
  assert.equal(exported.selection.case, 'retired-fixture-case');
  for (const token of [
    fixtures.proposal_withdrawn.token,
    fixtures.proposal_replaced.token,
  ]) {
    await page.goto(invitation(token));
    await page
      .getByRole('heading', { name: 'This proposal is unavailable' })
      .waitFor();
    assert.equal(
      await page
        .getByText('A quiet board for your desk.', { exact: false })
        .count(),
      0,
    );
  }

  let release;
  let capture;
  const hold = new Promise((resolve) => {
    release = resolve;
  });
  const captured = new Promise((resolve) => {
    capture = resolve;
  });
  await page.route('**/api/proposal-preview', async (route) => {
    if (route.request().postDataJSON().token !== fixtures.proposal_active.token)
      return route.continue();
    const result = await route.fetch();
    capture();
    await hold;
    try {
      await route.fulfill({ response: result });
    } catch {
      /* The old request can be aborted by navigation. */
    }
  });
  await page.goto(invitation(fixtures.proposal_active.token));
  await captured;
  await page.evaluate((token) => {
    window.location.hash = 'token=' + token;
  }, fixtures.proposal_withdrawn.token);
  await page
    .getByRole('heading', { name: 'This proposal is unavailable' })
    .waitFor();
  release();
  await page.waitForTimeout(200);
  assert.equal(
    await page
      .getByRole('heading', { name: 'Local active proposal', exact: true })
      .count(),
    0,
  );
  for (const request of requests) {
    for (const { token } of Object.values(fixtures).filter(
      (value) => typeof value === 'object' && value.token,
    )) {
      assert.equal(request.url.includes(token), false);
      assert.equal(JSON.stringify(request.headers).includes(token), false);
      if (request.body?.includes(token))
        assert.equal(new URL(request.url).pathname, '/api/proposal-preview');
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    'Proposal preview: bearer privacy, bounded reads, invitation closure/rotation, frozen evidence, isolated variations, archived file feedback, mobile accessibility and superseded requests passed.',
  );
} finally {
  await browser.close();
}

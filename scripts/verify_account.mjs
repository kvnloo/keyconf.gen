import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { accountFixture } from './account-fixture/server.mjs';
import { saveBuild } from '../db/community.ts';
import { defaultBuild } from '../lib/build.ts';

const fixture = await accountFixture();
const browser = await chromium.launch();
async function waitForHeldResponse(hold) {
  let timer;
  try {
    await Promise.race([
      hold.arrived,
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error('Expected fixture response was not held.')),
          10000,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
try {
  const context = await browser.newContext({
    viewport: { width: 320, height: 844 },
  });
  await context.addCookies([
    { name: 'fixture_session', value: fixture.alice, url: fixture.url },
  ]);
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(fixture.url);
  await expect(
    page.getByText('No saved builds yet.', { exact: false }),
  ).toBeVisible();
  const name = page.getByRole('textbox', {
    name: 'Device build name',
    exact: true,
  });
  await name.fill('First private keyboard');
  fixture.loseSaveResponse();
  await page
    .getByRole('button', { name: 'Save current build', exact: true })
    .click();
  const retry = page.getByRole('button', {
    name: 'Retry saving First private keyboard',
    exact: true,
  });
  await expect(retry).toBeVisible();
  await name.fill('Unsaved device variation');
  await retry.click();
  await expect(
    page.getByText('First private keyboard saved to your account.', {
      exact: true,
    }),
  ).toBeVisible();
  assert.equal(
    fixture.sqlite.prepare('SELECT count(*) AS n FROM community_build').get().n,
    1,
  );
  await expect(name).toHaveValue('Unsaved device variation');
  await page
    .getByRole('button', { name: 'Open First private keyboard', exact: true })
    .click();
  await expect(name).toHaveValue('First private keyboard');
  await page
    .getByRole('button', { name: 'Undo studio change', exact: true })
    .click();
  await expect(name).toHaveValue('Unsaved device variation');
  await page.getByText('Your creator profile', { exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Display name', exact: true })
    .fill('Alice Keys');
  await page
    .getByRole('textbox', { name: 'Handle', exact: true })
    .fill('alice_keys');
  await page
    .getByRole('textbox', { name: 'About you', exact: true })
    .fill('Quiet boards, careful builds.');
  await page
    .getByRole('button', { name: 'Add creator link', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Link 1 label', exact: true })
    .fill('My builds');
  await page
    .getByRole('textbox', { name: 'Link 1 URL', exact: true })
    .fill('https://example.com/alice');
  await page.getByRole('button', { name: 'Save profile', exact: true }).click();
  await expect(
    page.getByText('Profile saved. Nothing has been published.', {
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('.account-panel')).toBeVisible();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
    false,
  );
  assert.deepEqual(
    (await new AxeBuilder({ page }).include('.account-panel').analyze())
      .violations,
    [],
  );
  await mkdir('outputs', { recursive: true });
  await page.screenshot({ path: 'outputs/account-mobile.png', fullPage: true });
  const friend = await browser.newContext();
  await friend.addCookies([
    { name: 'fixture_session', value: fixture.bob, url: fixture.url },
  ]);
  const other = await friend.newPage();
  await other.goto(fixture.url);
  await expect(
    other.getByText('No saved builds yet.', { exact: false }),
  ).toBeVisible();
  await expect(
    other.getByRole('button', {
      name: 'Open First private keyboard',
      exact: true,
    }),
  ).toHaveCount(0);
  fixture.sessions.delete(fixture.alice);
  await page
    .getByRole('button', { name: 'Save current build', exact: true })
    .click();
  await expect(page.getByRole('alert')).toContainText('Your session ended.');
  await expect(name).toHaveValue('Unsaved device variation');
  fixture.sessions.set(fixture.alice, 'fixture:alice');
  await page
    .getByRole('button', { name: 'Retry account', exact: true })
    .click();
  await expect(
    page.getByRole('button', {
      name: 'Retry saving Unsaved device variation',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('button', {
      name: 'Retry saving Unsaved device variation',
      exact: true,
    })
    .click();
  await expect(
    page.getByText('Unsaved device variation saved to your account.', {
      exact: true,
    }),
  ).toBeVisible();
  await page.reload();
  await expect(name).toHaveValue('Unsaved device variation');
  await page.getByText('Your creator profile', { exact: true }).click();
  await expect(
    page.getByRole('textbox', { name: 'Display name', exact: true }),
  ).toHaveValue('Alice Keys');
  await expect(
    page.getByRole('textbox', { name: 'Link 1 URL', exact: true }),
  ).toHaveValue('https://example.com/alice');
  assert.equal(
    fixture.sqlite
      .prepare('SELECT count(*) AS n FROM community_publication')
      .get().n,
    0,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: 'outputs/account-desktop.png',
    fullPage: true,
  });
  for (let index = 0; index < 27; index++)
    await saveBuild(fixture.db, 'fixture:alice', {
      operationId: `fixture-pagination-${index}`,
      build: { ...defaultBuild, name: `Saved fixture ${index}` },
    });
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Load more saved builds', exact: true }),
  ).toBeVisible();
  const pagination = fixture.holdNext('/api/community/builds', 'GET');
  await page
    .getByRole('button', { name: 'Load more saved builds', exact: true })
    .click();
  await waitForHeldResponse(pagination);
  await name.fill('Saved during pagination');
  await page
    .getByRole('button', { name: 'Save current build', exact: true })
    .click();
  await expect(
    page.getByText('Saved during pagination saved to your account.', {
      exact: true,
    }),
  ).toBeVisible();
  const concurrentBuild = fixture.sqlite
    .prepare('SELECT id FROM community_build WHERE name=?')
    .get('Saved during pagination');
  if (typeof concurrentBuild?.id !== 'string')
    throw new Error('The concurrently saved build is missing.');
  const openHold = fixture.holdNext(
    `/api/community/builds/${concurrentBuild.id}`,
    'GET',
  );
  await page
    .getByRole('button', { name: 'Open Saved during pagination', exact: true })
    .click();
  await waitForHeldResponse(openHold);
  pagination.release();
  await expect(
    page.getByText('More saved builds loaded.', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', {
      name: 'Open Saved during pagination',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('.account-build-list li')).toHaveCount(30);
  await expect(page.locator('.account-build-list li:focus')).toHaveCount(1);
  openHold.release();
  await expect(
    page.getByRole('button', {
      name: 'Open Saved during pagination',
      exact: true,
    }),
  ).toBeEnabled();

  await page.getByText('Your creator profile', { exact: true }).click();
  const profileHold = fixture.holdNext('/api/community/profile', 'PATCH');
  await page.getByRole('button', { name: 'Save profile', exact: true }).click();
  await waitForHeldResponse(profileHold);
  fixture.sessions.delete(fixture.alice);
  await page
    .getByRole('button', { name: 'Open Saved during pagination', exact: true })
    .click();
  await expect(page.getByRole('alert')).toContainText('Your session ended.');
  fixture.sessions.set(fixture.alice, 'fixture:alice');
  await page
    .getByRole('button', { name: 'Retry account', exact: true })
    .click();
  await page.getByText('Your creator profile', { exact: true }).click();
  await expect(
    page.getByRole('textbox', { name: 'Display name', exact: true }),
  ).toBeEnabled();
  profileHold.release();

  const saveHold = fixture.holdNext('/api/community/builds', 'POST');
  await name.fill('Interrupted acknowledged save');
  await page
    .getByRole('button', { name: 'Save current build', exact: true })
    .click();
  await waitForHeldResponse(saveHold);
  fixture.sessions.delete(fixture.alice);
  await page
    .getByRole('button', { name: 'Open Saved during pagination', exact: true })
    .click();
  await expect(page.getByRole('alert')).toContainText('Your session ended.');
  fixture.sessions.set(fixture.alice, 'fixture:alice');
  await page
    .getByRole('button', { name: 'Retry account', exact: true })
    .click();
  const interruptedRetry = page.getByRole('button', {
    name: 'Retry saving Interrupted acknowledged save',
    exact: true,
  });
  await expect(interruptedRetry).toBeEnabled();
  saveHold.release();
  await interruptedRetry.click();
  await expect(
    page.getByText('Interrupted acknowledged save saved to your account.', {
      exact: true,
    }),
  ).toBeVisible();
  assert.equal(
    fixture.sqlite.prepare('SELECT count(*) AS n FROM community_build').get().n,
    31,
  );
  await name.fill('X'.repeat(81));
  await page
    .getByRole('button', { name: 'Save current build', exact: true })
    .click();
  await expect(
    page.getByRole('button', {
      name: 'Use current draft for a new save',
      exact: true,
    }),
  ).toBeVisible();
  await name.fill('Corrected draft');
  await page
    .getByRole('button', {
      name: 'Use current draft for a new save',
      exact: true,
    })
    .click();
  await page
    .getByRole('button', { name: 'Save current build', exact: true })
    .click();
  await expect(
    page.getByText('Corrected draft saved to your account.', { exact: true }),
  ).toBeVisible();
  assert.deepEqual(errors, []);
  console.log(
    'Account profile, lost-save retry, owner isolation, reopen/Undo, session recovery, pagination/save races, interrupted operations, corrected-draft recovery and mobile accessibility passed against the isolated SQLite fixture. Google authentication remains unverified.',
  );
} finally {
  await browser.close();
  await fixture.close();
}

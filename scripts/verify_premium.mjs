import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

// PREMIUM-2: the published ordering must be most expensive first inside one
// comparable scope, must say which configuration each price belongs to, and
// must never turn an unrecorded price into a zero-priced board.
const data = JSON.parse(readFileSync('data/premium-keyboards.json', 'utf8'));
const inScope = (offer, kind) =>
  offer.currency === 'USD' &&
  offer.basis === 'store-listing' &&
  offer.kind === kind &&
  offer.amount > 0;

function expected(kind) {
  const ranked = [];
  const unranked = [];
  for (const board of data.boards) {
    const offers = board.offers.filter((offer) => inScope(offer, kind));
    if (offers.length)
      ranked.push({
        board,
        offer: offers.reduce((a, b) => (b.amount > a.amount ? b : a)),
      });
    else unranked.push(board);
  }
  ranked.sort((a, b) => b.offer.amount - a.offer.amount);
  return { ranked, unranked };
}

const browser = await chromium.launch({ args: ['--disable-webgl'] });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(
    new URL(
      '#discover',
      process.env.KEYCONF_BASE_URL ?? 'http://localhost:3000/',
    ).href,
  );

  const section = page.getByRole('region', {
    name: 'Premium keyboard catalog',
  });
  await expect(section).toBeVisible();
  const rankedList = section.locator(
    '.research-product-list:not([data-premium-unranked])',
  );
  const unrankedList = section.locator('[data-premium-unranked]');

  const complete = expected('complete');
  assert.ok(
    complete.ranked.length >= 8,
    'expected a populated complete-board ranking to check',
  );

  // Ordering: the rendered amounts must descend and match the data exactly.
  const shown = await rankedList
    .locator('[data-premium-amount]')
    .evaluateAll((nodes) =>
      nodes.map((node) => Number(node.dataset.premiumAmount)),
    );
  assert.deepEqual(
    shown,
    complete.ranked.map((row) => row.offer.amount),
    'rendered ordering must match most-expensive-first over the source data',
  );
  for (let i = 1; i < shown.length; i += 1)
    assert.ok(
      shown[i - 1] >= shown[i],
      `ordering broke at position ${i}: ${shown[i - 1]} then ${shown[i]}`,
    );

  // The top price must name the configuration it belongs to, so the headline
  // number is not read as the price of the base board.
  const top = complete.ranked[0];
  const first = rankedList.locator('.research-product').first();
  const firstText = await first.innerText();
  assert.ok(
    firstText.includes(top.board.name),
    `top card must be ${top.board.name}, got: ${firstText}`,
  );
  assert.ok(
    firstText.includes(top.offer.configuration),
    `top card must name its configuration "${top.offer.configuration}", got: ${firstText}`,
  );
  assert.ok(
    firstText.includes(top.offer.observedAt),
    `top card must carry the observation date, got: ${firstText}`,
  );

  // An unrecorded price is never published as a number.
  const sectionText = await section.innerText();
  assert.doesNotMatch(
    sectionText,
    /\$0(?:[.,]00)?\b/,
    'an unrecorded price must never render as $0',
  );
  for (const board of complete.unranked) {
    const card = unrankedList.locator('.research-product', {
      hasText: board.name,
    });
    await expect(card).toHaveCount(1);
    assert.match(await card.innerText(), /Price unverified/);
    await expect(
      rankedList.locator('.research-product', { hasText: board.name }),
    ).toHaveCount(0);
  }

  // Every board stays reachable: ranking a board out of scope must not hide it.
  await expect(section.locator('.research-product')).toHaveCount(
    data.boards.length,
  );

  // Kit and full-board prices are never ranked against each other.
  await section.getByRole('button', { name: 'Kit' }).click();
  const kit = expected('kit');
  await expect(rankedList.locator('[data-premium-amount]')).toHaveCount(
    kit.ranked.length,
  );
  await expect(unrankedList.locator('.research-product')).toHaveCount(
    kit.unranked.length,
  );
  assert.match(await section.innerText(), /No kit listing in USD/);

  await section.getByRole('button', { name: 'Full board' }).click();
  await expect(rankedList.locator('[data-premium-amount]')).toHaveCount(
    complete.ranked.length,
  );

  // Search must narrow the ranking without breaking its order.
  const search = section.getByRole('searchbox', {
    name: 'Search premium keyboards',
  });
  await search.fill('cyberboard');
  const narrowed = await rankedList
    .locator('[data-premium-amount]')
    .evaluateAll((nodes) =>
      nodes.map((node) => Number(node.dataset.premiumAmount)),
    );
  assert.ok(narrowed.length > 1, 'search should keep several CYBERBOARD rows');
  assert.deepEqual(
    narrowed,
    [...narrowed].sort((a, b) => b - a),
  );
  await search.fill('');

  const scan = await new AxeBuilder({ page })
    .include('[aria-label="Premium keyboard catalog"]')
    .analyze();
  assert.deepEqual(
    scan.violations.map((violation) => violation.id),
    [],
    'premium catalog must have no accessibility violations',
  );

  assert.deepEqual(errors, [], 'page errors');
  console.log(
    `PASS: premium ordering (${complete.ranked.length} ranked, ${complete.unranked.length} unpriced), configuration/date attribution, kit separation and accessibility verified.`,
  );
} finally {
  await browser.close();
}

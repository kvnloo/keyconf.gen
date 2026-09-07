import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDiscoveryPage } from '../lib/discovery.ts';
const item = {
  id: 'published-build-0001',
  title: 'Forest',
  kind: 'build',
  author: { handle: 'maker', displayName: 'Maker', privateField: 'hidden' },
  publishedAt: '2026-09-06T00:00:00.000Z',
  accountId: 'private',
};
test('discovery response parsing strips private fields and rejects malformed pagination', () => {
  const page = parseDiscoveryPage({ items: [item], next: null });
  assert.equal('accountId' in page.items[0], false);
  assert.equal(page.items[0].thumbnail, null);
  assert.deepEqual(page.items[0].author, {
    handle: 'maker',
    displayName: 'Maker',
  });
  for (const payload of [
    { items: [item, item], next: null },
    { items: [{ ...item, id: '../private' }], next: null },
    { items: [{ ...item, kind: 'draft' }], next: null },
    {
      items: [item],
      next: { publishedAt: item.publishedAt, id: 'different-release-1' },
    },
    { items: [], next: { publishedAt: item.publishedAt, id: item.id } },
    { items: [item] },
  ])
    assert.throws(() => parseDiscoveryPage(payload));
  assert.deepEqual(
    parseDiscoveryPage({
      items: [item],
      next: { publishedAt: item.publishedAt, id: item.id },
    }).next,
    { publishedAt: item.publishedAt, id: item.id },
  );
});

test('discovery responses accept bounded thumbnail recipes and reject malformed supplied previews', () => {
  const thumbnail = {
    geometry: 'generic-65',
    caseColor: '#123456',
    colors: {
      alpha: '#abcdef',
      mod: '#654321',
      accent: '#fedcba',
      space: '#000000',
    },
  };
  assert.deepEqual(
    parseDiscoveryPage({ items: [{ ...item, thumbnail }], next: null }).items[0]
      .thumbnail,
    thumbnail,
  );
  assert.equal(
    parseDiscoveryPage({ items: [{ ...item, thumbnail: null }], next: null })
      .items[0].thumbnail,
    null,
  );
  for (const preview of [
    {},
    { ...thumbnail, geometry: 'unsupported' },
    { ...thumbnail, caseColor: 'red' },
  ])
    assert.throws(() =>
      parseDiscoveryPage({
        items: [{ ...item, thumbnail: preview }],
        next: null,
      }),
    );
});

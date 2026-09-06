import assert from 'node:assert/strict';
import { test } from 'node:test';
import { searchStudio, studioDestinations } from '../lib/studio-search.ts';
import { catalog } from '../lib/catalog.ts';

test('blank search offers real studio destinations without changing catalog data', () => {
  const before = JSON.stringify(catalog);
  assert.deepEqual(
    searchStudio('  ', catalog).map((result) => result.item.id),
    studioDestinations.map((item) => item.id),
  );
  assert.equal(JSON.stringify(catalog), before);
});
test('search matches every word across maker, product and category and retains source', () => {
  const results = searchStudio('GATERON oil', catalog);
  assert.ok(results.length > 0);
  assert.ok(
    results.every(
      (result) => result.kind === 'part' && result.item.brand === 'Gateron',
    ),
  );
  assert.equal(searchStudio('nonsense-928734', catalog).length, 0);
  const artisans = searchStudio('jelly artisan', catalog);
  assert.equal(artisans.length, 3);
  assert.ok(
    artisans.every(
      (result) =>
        result.kind === 'accessory' &&
        result.item.source.startsWith('https://www.jellykey.com/'),
    ),
  );
});
test('imported products are searchable, preserve identity and tolerate accents', () => {
  const part = {
    id: 'imported',
    name: 'Étude caps',
    brand: 'Café',
    category: 'keycaps',
    detail: 'PBT reference',
    family: 'unknown',
    evidence: 'unknown',
    source: 'https://example.com/caps',
  };
  const result = searchStudio('etude cafe', [...catalog, part]);
  assert.equal(result.length, 1);
  assert.equal(result[0].item, part);
  assert.equal(result[0].item.evidence, 'unknown');
});

test('category plurals and everyday accessory terms find product references', () => {
  assert.equal(
    searchStudio('switches', catalog).filter((result) => result.kind === 'part')
      .length,
    catalog.filter((part) => part.category === 'switch').length,
  );
  assert.ok(
    searchStudio('dials', catalog).some(
      (result) => result.kind === 'accessory' && result.item.kind === 'encoder',
    ),
  );
  assert.ok(
    searchStudio('displays', catalog).some(
      (result) => result.kind === 'accessory' && result.item.kind === 'screen',
    ),
  );
});

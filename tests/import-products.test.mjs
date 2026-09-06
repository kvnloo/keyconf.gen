import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseStructuredProducts,
  importWebsite,
  isImportResult,
} from '../lib/import-products.ts';

const source = 'https://switch-shop.example/collections/switches';
const parse = (data) =>
  parseStructuredProducts(
    `<script type="application/ld+json">${JSON.stringify(data)}</script>`,
    source,
  );

test('aggregate offer keeps its range instead of pretending the lowest price is exact', () => {
  const [product] = parse({
    '@type': 'Product',
    name: 'Switch sampler',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '12.50',
      highPrice: '35',
      priceCurrency: 'USD',
    },
  });
  assert.deepEqual(product.pricing, {
    kind: 'range',
    min: '12.50',
    max: '35',
    currency: 'USD',
  });
  const [from] = parse({
    '@type': 'Product',
    name: 'Switch sampler',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '12.50',
      priceCurrency: 'USD',
    },
  });
  assert.deepEqual(from.pricing, {
    kind: 'from',
    amount: '12.50',
    currency: 'USD',
  });
});

test('conflicting currencies and mixed stock do not become one invented offer', () => {
  const [product] = parse({
    '@type': 'Product',
    name: 'Switch sampler',
    offers: [
      {
        price: '12',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        price: '10',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/OutOfStock',
      },
    ],
  });
  assert.deepEqual(product.pricing, { kind: 'unknown' });
  assert.equal(product.availability, 'Varies by offer');
});

test('referenced variants inherit group identity but keep their own SKU, URL and price', () => {
  const products = parse({
    '@graph': [
      {
        '@id': '#ivory',
        '@type': 'Product',
        name: 'Desk keycaps · Ivory',
        sku: 'CAP-I',
        offers: {
          price: '45',
          priceCurrency: 'USD',
          url: '/products/caps?variant=ivory',
        },
      },
      {
        '@id': '#caps',
        '@type': 'ProductGroup',
        name: 'Desk keycaps',
        brand: { name: 'Key Maker' },
        hasVariant: [
          { '@id': '#ivory' },
          {
            '@type': 'Product',
            color: 'Sage',
            sku: 'CAP-S',
            url: '/products/caps?variant=sage',
          },
        ],
      },
    ],
  });
  assert.equal(products.length, 2);
  assert.deepEqual(
    products.map((p) => p.brand),
    ['Key Maker', 'Key Maker'],
  );
  assert.equal(
    products[0].url,
    'https://switch-shop.example/products/caps?variant=ivory',
  );
  assert.deepEqual(products[0].pricing, {
    kind: 'exact',
    amount: '45',
    currency: 'USD',
  });
  assert.equal(products[1].name, 'Desk keycaps · Sage');
  assert.deepEqual(products[1].pricing, { kind: 'unknown' });
  assert.deepEqual(
    products.map((p) => p.sku),
    ['CAP-I', 'CAP-S'],
  );
});

test('Shopify catalog previews keep both switch variants and their variant-specific links', async (t) => {
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = String(input);
    if (url.startsWith('https://cloudflare-dns.com/'))
      return Response.json({ Answer: [{ type: 1, data: '1.1.1.1' }] });
    if (url.includes('/graphql.json'))
      return Response.json({
        data: {
          products: {
            nodes: [
              {
                title: 'Linear switches',
                vendor: 'Switch Maker',
                onlineStoreUrl: 'https://switch-shop.example/products/linear',
                variants: {
                  nodes: [
                    {
                      id: 'gid://shopify/ProductVariant/101',
                      title: '45 g / 70 switches',
                      sku: '45-70',
                      price: { amount: '42.00', currencyCode: 'USD' },
                      availableForSale: true,
                    },
                    {
                      id: 'gid://shopify/ProductVariant/102',
                      title: '55 g / 90 switches',
                      sku: '55-90',
                      price: { amount: '54.00', currencyCode: 'USD' },
                      availableForSale: false,
                    },
                  ],
                  pageInfo: { hasNextPage: false },
                },
              },
            ],
            pageInfo: { hasNextPage: true },
          },
        },
      });
    return new Response(
      '<html><script>Shopify.shop="switch-shop.example"</script></html>',
    );
  });
  const result = await importWebsite(source);
  assert.equal(result.products.length, 2);
  assert.deepEqual(
    result.products.map((p) => p.name),
    [
      'Linear switches · 45 g / 70 switches',
      'Linear switches · 55 g / 90 switches',
    ],
  );
  assert.deepEqual(
    result.products.map((p) => new URL(p.url).searchParams.get('variant')),
    ['101', '102'],
  );
  assert.deepEqual(result.products[1].pricing, {
    kind: 'exact',
    amount: '54.00',
    currency: 'USD',
  });
  assert.equal(result.products[1].availability, 'Unavailable');
  assert.match(result.coverage, /more products/i);
});

test('equivalent relative and absolute node identifiers resolve the same group, brand and offer', () => {
  const [product] = parse({
    '@graph': [
      {
        '@type': 'Product',
        '@id': '#sage',
        color: 'Sage',
        sku: 'SAGE',
        offers: { '@id': source + '#offer' },
      },
      {
        '@type': 'ProductGroup',
        name: 'Desk keycaps',
        brand: { '@id': source + '#maker' },
        hasVariant: { '@id': source + '#sage' },
      },
      { '@id': '#maker', name: 'Key Maker' },
      { '@id': '#offer', price: '45', priceCurrency: 'USD' },
    ],
  });
  assert.equal(product.name, 'Desk keycaps · Sage');
  assert.equal(product.brand, 'Key Maker');
  assert.deepEqual(product.pricing, {
    kind: 'exact',
    amount: '45',
    currency: 'USD',
  });
});

test('malformed prices stay unverified and malformed API results are rejected', () => {
  for (const offers of [
    { price: '-12', priceCurrency: 'USD' },
    { price: '12' },
    { lowPrice: '25', highPrice: '12', priceCurrency: 'USD' },
    [
      { price: '12', priceCurrency: 'USD' },
      { price: 'unknown', priceCurrency: 'USD' },
    ],
  ]) {
    const products = parse({ '@type': 'Product', name: 'Switches', offers });
    assert.deepEqual(products[0].pricing, { kind: 'unknown' });
    const result = {
      products,
      method: 'Structured data',
      source,
      observedAt: '2026-09-05',
      coverage: 'One page',
    };
    assert.equal(isImportResult(result), true);
    products[0].pricing = {
      kind: 'range',
      min: '25',
      max: '12',
      currency: 'USD',
    };
    assert.equal(isImportResult(result), false);
  }
});

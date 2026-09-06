import test from 'node:test';
import assert from 'node:assert/strict';
import { importWebsite } from '../lib/import-products.ts';

const source = 'https://switch-shop.example/collections/switches';
const variant = (id) => ({
  id: 'gid://shopify/ProductVariant/' + id,
  title: 'Option ' + id,
  sku: String(id),
  price: { amount: '12.00', currencyCode: 'USD' },
  availableForSale: true,
});
const product = (id, ids, more = false) => ({
  id: 'gid://shopify/Product/' + id,
  title: 'Switch ' + id,
  vendor: 'Maker',
  onlineStoreUrl: 'https://switch-shop.example/products/switch-' + id,
  variants: {
    nodes: ids.map(variant),
    pageInfo: { hasNextPage: more, endCursor: more ? 'variants-' + id : null },
  },
});
function serve(t, graphql) {
  t.mock.method(globalThis, 'fetch', async (input, init) => {
    const url = String(input);
    if (url.startsWith('https://cloudflare-dns.com/'))
      return Response.json({ Answer: [{ type: 1, data: '1.1.1.1' }] });
    if (url.includes('/graphql.json'))
      return Response.json(graphql(JSON.parse(init.body)));
    return new Response('<script>Shopify.shop="switch-shop.example"</script>');
  });
}

test('a collection URL queries its own products, without importing storewide accessories', async (t) => {
  serve(t, ({ query, variables }) =>
    query.includes('collection(') && variables.handle === 'switches'
      ? {
          data: {
            collection: {
              title: 'Keyboard switches',
              products: {
                nodes: [product(1, [101])],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        }
      : {
          data: {
            products: {
              nodes: [{ ...product(2, [201]), title: 'Switch lube' }],
              pageInfo: { hasNextPage: false },
            },
          },
        },
  );
  const page = await importWebsite(source);
  assert.equal(page.products[0].name, 'Switch 1 · Option 101');
  assert.match(page.coverage, /collection/i);
  assert.equal(page.next, null);
});

test('pagination finishes outstanding variants before advancing the catalog, without loss or duplicates', async (t) => {
  const first = [
    product(
      1,
      Array.from({ length: 10 }, (_, i) => 100 + i),
      true,
    ),
    product(
      2,
      Array.from({ length: 10 }, (_, i) => 200 + i),
      true,
    ),
    ...Array.from({ length: 6 }, (_, i) => product(i + 3, [(i + 3) * 100])),
  ];
  serve(t, ({ query, variables = {} }) => {
    if (query.includes('product0:'))
      return {
        data: Object.fromEntries(
          [0, 1].map((i) => [
            'product' + i,
            product(i + 1, [(i + 1) * 100 + 10, (i + 1) * 100 + 11]),
          ]),
        ),
      };
    const connection =
      variables.after === 'products-8'
        ? {
            nodes: [product(9, [900])],
            pageInfo: { hasNextPage: false, endCursor: null },
          }
        : {
            nodes: first,
            pageInfo: { hasNextPage: true, endCursor: 'products-8' },
          };
    return query.includes('collection(')
      ? {
          data: {
            collection: { title: 'Keyboard switches', products: connection },
          },
        }
      : { data: { products: connection } };
  });
  const a = await importWebsite(source);
  assert.ok(a.next, 'The first preview must expose continuation');
  const b = await importWebsite(source, a.next);
  assert.deepEqual(
    b.products.map((p) => p.sku),
    ['110', '111', '210', '211'],
  );
  assert.ok(b.next, 'The catalog still has another product page');
  const c = await importWebsite(source, b.next);
  assert.deepEqual(
    c.products.map((p) => p.sku),
    ['900'],
  );
  assert.equal(c.next, null);
  const all = [a, b, c].flatMap((page) => page.products);
  assert.equal(all.length, 31);
  assert.equal(new Set(all.map((p) => p.sku)).size, 31);
  assert.ok([a, b, c].every((page) => page.products.length <= 80));
});

test('a missing collection does not silently become the whole store', async (t) => {
  serve(t, () => ({
    data: {
      collection: null,
      products: {
        nodes: [product(1, [101])],
        pageInfo: { hasNextPage: false },
      },
    },
  }));
  await assert.rejects(importWebsite(source), /collection.*not found/i);
});

test('continuations are bound to their source and reject malformed product IDs before network access', async (t) => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    calls++;
    throw new Error('Network must not run');
  });
  const cursor = {
    kind: 'shopify',
    source,
    catalog: { kind: 'more', after: 'products-8' },
    variants: [],
  };
  await assert.rejects(
    importWebsite('https://other-shop.example/', cursor),
    /continuation/i,
  );
  await assert.rejects(
    importWebsite(source, {
      ...cursor,
      variants: [{ id: 'https://internal.example/', after: 'variant-1' }],
    }),
    /continuation/i,
  );
  assert.equal(calls, 0);
});

test('partial GraphQL errors and repeated page cursors fail instead of claiming a complete catalog', async (t) => {
  serve(t, () => ({
    errors: [{ message: 'Temporary failure' }],
    data: {
      collection: {
        products: {
          nodes: [product(1, [101])],
          pageInfo: { hasNextPage: false },
        },
      },
    },
  }));
  await assert.rejects(importWebsite(source), /could not provide/i);
  t.mock.restoreAll();
  serve(t, () => ({
    data: {
      collection: {
        products: {
          nodes: [product(1, [101])],
          pageInfo: { hasNextPage: true, endCursor: 'same-cursor' },
        },
      },
    },
  }));
  await assert.rejects(
    importWebsite(source, {
      kind: 'shopify',
      source,
      catalog: { kind: 'more', after: 'same-cursor' },
      variants: [],
    }),
    /repeated/i,
  );
});

test('the HTTP import endpoint forwards a valid continuation and rejects a mismatched source', async (t) => {
  const { POST } = await import('../app/api/import/route.ts');
  let queryCount = 0;
  serve(t, ({ variables }) => {
    queryCount++;
    assert.equal(variables.after, 'products-8');
    return {
      data: {
        collection: {
          title: 'Switches',
          products: {
            nodes: [product(9, [900])],
            pageInfo: { hasNextPage: false },
          },
        },
      },
    };
  });
  const next = {
    kind: 'shopify',
    source,
    catalog: { kind: 'more', after: 'products-8' },
    variants: [],
  };
  const request = (body) =>
    new Request('http://localhost:3000/api/import', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  const response = await POST(request({ url: source, next }));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.products[0].sku, '900');
  assert.equal(data.next, null);
  const rejected = await POST(request({ url: 'https://other.example/', next }));
  assert.equal(rejected.status, 422);
  assert.match((await rejected.json()).error, /continuation/i);
  assert.equal(queryCount, 1);
});

import {
  exactPrice,
  isProductPrice,
  offerPricing,
  type ProductPrice,
} from './product-pricing.ts';

export type ImportedProduct = {
  name: string;
  brand: string;
  url: string;
  sku: string;
  pricing: ProductPrice;
  availability: string;
};
export type ImportResult = {
  products: ImportedProduct[];
  method: string;
  source: string;
  observedAt: string;
  coverage: string;
  next?: ImportContinuation | null;
};
type CatalogCursor = { kind: 'done' } | { kind: 'more'; after: string };
export type ImportContinuation = {
  kind: 'shopify';
  source: string;
  catalog: CatalogCursor;
  variants: { id: string; after: string }[];
};
function record(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}
function cursor(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= 512;
}
export function isImportContinuation(
  value: unknown,
): value is ImportContinuation {
  return (
    record(value) &&
    value.kind === 'shopify' &&
    typeof value.source === 'string' &&
    value.source.length <= 2048 &&
    record(value.catalog) &&
    (value.catalog.kind === 'done' ||
      (value.catalog.kind === 'more' && cursor(value.catalog.after))) &&
    Array.isArray(value.variants) &&
    value.variants.length <= 8 &&
    value.variants.every(
      (item) =>
        record(item) &&
        typeof item.id === 'string' &&
        /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) &&
        cursor(item.after),
    ) &&
    new Set(value.variants.map((item) => item.id)).size ===
      value.variants.length &&
    (value.catalog.kind === 'more' || value.variants.length > 0)
  );
}
function string(x: unknown) {
  return typeof x === 'string' ? x : typeof x === 'number' ? String(x) : '';
}
function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}
function hasType(value: Record<string, unknown>, type: string) {
  return list(value['@type']).some(
    (t) =>
      t === type ||
      t === 'schema:' + type ||
      t === 'https://schema.org/' + type ||
      t === 'http://schema.org/' + type,
  );
}
function safeLink(value: unknown, base: string) {
  try {
    const u = new URL(string(value) || base, base);
    return u.protocol === 'https:' && !u.username && !u.password
      ? u.href
      : base;
  } catch {
    return base;
  }
}
export function isImportResult(x: unknown): x is ImportResult {
  return (
    record(x) &&
    Array.isArray(x.products) &&
    x.products.length <= 80 &&
    x.products.every(
      (p) =>
        record(p) &&
        ['name', 'brand', 'url', 'sku', 'availability'].every(
          (k) => typeof p[k] === 'string',
        ) &&
        isProductPrice(p.pricing),
    ) &&
    ['method', 'source', 'observedAt', 'coverage'].every(
      (k) => typeof x[k] === 'string',
    ) &&
    (x.next === undefined ||
      x.next === null ||
      (isImportContinuation(x.next) && x.next.source === x.source))
  );
}
export function parseStructuredProducts(
  html: string,
  source: string,
): ImportedProduct[] {
  const nodes: Record<string, unknown>[] = [];
  const references = new Map<string, Record<string, unknown>>();
  function nodeId(value: unknown) {
    const id = string(value);
    if (!id || id.startsWith('_:')) return id;
    try {
      return new URL(id, source).href;
    } catch {
      return id;
    }
  }
  function collect(value: unknown, depth = 0) {
    if (depth > 12 || nodes.length >= 10000) return;
    if (Array.isArray(value)) {
      value.forEach((v) => collect(v, depth + 1));
      return;
    }
    if (!record(value)) return;
    nodes.push(value);
    const id = nodeId(value['@id']);
    if (id) references.set(id, { ...references.get(id), ...value });
    for (const [key, child] of Object.entries(value))
      if (key !== '@context') collect(child, depth + 1);
  }
  const script = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let match: RegExpExecArray | null;
  while ((match = script.exec(html)) !== null) {
    if (!/type\s*=\s*["']application\/ld\+json["']/i.test(match[1])) continue;
    try {
      collect(JSON.parse(match[2]));
    } catch {
      continue;
    }
  }
  function resolve(value: unknown): Record<string, unknown> | undefined {
    if (!record(value)) return undefined;
    const target = references.get(nodeId(value['@id']));
    return target ? { ...target, ...value } : value;
  }
  const parents = new Map<Record<string, unknown>, Record<string, unknown>>();
  const parentIds = new Map<string, Record<string, unknown>>();
  for (const node of nodes) {
    if (!hasType(node, 'ProductGroup')) continue;
    for (const variant of list(node.hasVariant)) {
      if (!record(variant)) continue;
      parents.set(variant, node);
      const id = nodeId(variant['@id']);
      if (id) parentIds.set(id, node);
    }
  }
  const products: ImportedProduct[] = [],
    visited = new Set<string>();
  for (const raw of nodes) {
    if (products.length >= 80) break;
    const value = resolve(raw);
    if (
      !value ||
      (!hasType(value, 'Product') && !hasType(value, 'ProductGroup'))
    )
      continue;
    if (hasType(value, 'ProductGroup') && list(value.hasVariant).length)
      continue;
    const parent =
      parents.get(raw) ??
      parentIds.get(nodeId(value['@id'])) ??
      resolve(value.isVariantOf);
    const variation = [value.color, value.size, value.material]
      .map(string)
      .filter(Boolean)
      .join(' · ');
    const name =
      string(value.name).trim() ||
      [string(parent?.name).trim(), variation || string(value.sku)]
        .filter(Boolean)
        .join(' · ');
    if (!name) continue;
    const brandValue = value.brand ?? parent?.brand;
    const brand = record(brandValue)
      ? string(resolve(brandValue)?.name)
      : string(brandValue);
    const offers = list(value.offers).map(resolve);
    const urls = new Set(offers.map((o) => string(o?.url)).filter(Boolean));
    const offerUrl = urls.size === 1 ? [...urls][0] : undefined;
    const url = safeLink(value.url ?? offerUrl ?? parent?.url, source);
    const sku = string(value.sku);
    const key = sku + '|' + url + '|' + name;
    if (visited.has(key)) continue;
    visited.add(key);
    const stocks = offers.map(
      (o) => string(o?.availability).split('/').pop() ?? '',
    );
    const known = new Set(stocks.filter(Boolean));
    const availability =
      known.size > 1
        ? 'Varies by offer'
        : stocks.some((s) => !s)
          ? ''
          : (stocks[0] ?? '');
    products.push({
      name: name.slice(0, 300),
      brand: brand.slice(0, 150),
      url,
      sku,
      pricing: offerPricing(offers),
      availability,
    });
  }
  return products;
}
export function publicUrl(input: string): URL {
  const u = new URL(input);
  const host = u.hostname.toLowerCase();
  if (
    u.protocol !== 'https:' ||
    u.username ||
    u.password ||
    (u.port && u.port !== '443') ||
    !host.includes('.') ||
    /^[\d.]+$/.test(host) ||
    host.includes(':') ||
    host.endsWith('.local') ||
    host.endsWith('.localhost') ||
    host.endsWith('.internal')
  )
    throw new Error('Use a public HTTPS product or store URL.');
  u.hash = '';
  return u;
}
export function isPublicAddress(ip: string) {
  if (ip.includes(':')) {
    const p = ip.toLowerCase();
    return (
      !p.startsWith('fc') &&
      !p.startsWith('fd') &&
      !p.startsWith('fe8') &&
      !p.startsWith('fe9') &&
      !p.startsWith('fea') &&
      !p.startsWith('feb') &&
      !p.startsWith('ff') &&
      !p.startsWith('::') &&
      p !== '::1' &&
      /^[23]/.test(p)
    );
  }
  const n = ip.split('.').map(Number);
  if (n.length !== 4 || n.some((x) => !Number.isInteger(x) || x < 0 || x > 255))
    return false;
  return !(
    n[0] === 0 ||
    n[0] === 10 ||
    n[0] === 127 ||
    n[0] >= 224 ||
    (n[0] === 169 && n[1] === 254) ||
    (n[0] === 172 && n[1] >= 16 && n[1] <= 31) ||
    (n[0] === 192 && (n[1] === 168 || n[1] === 0)) ||
    (n[0] === 100 && n[1] >= 64 && n[1] <= 127) ||
    (n[0] === 198 && (n[1] === 18 || n[1] === 19))
  );
}
async function verifyHost(u: URL) {
  const answers = await Promise.all(
    ['A', 'AAAA'].map(async (type) => {
      const r = await fetch(
        'https://cloudflare-dns.com/dns-query?name=' +
          encodeURIComponent(u.hostname) +
          '&type=' +
          type,
        {
          headers: { accept: 'application/dns-json' },
          signal: AbortSignal.timeout(5000),
        },
      );
      if (!r.ok) throw new Error('Could not verify the store address.');
      const json: unknown = await r.json();
      if (!record(json)) return [];
      const a = json.Answer;
      if (!Array.isArray(a)) return [];
      return a
        .filter(record)
        .filter((x) => x.type === 1 || x.type === 28)
        .map((x) => string(x.data));
    }),
  );
  const ips = answers.flat();
  if (!ips.length || ips.some((ip) => !isPublicAddress(ip)))
    throw new Error('This address is not a public store.');
}
async function fetchPublic(
  u: URL,
  init: RequestInit = {},
  redirects = 0,
): Promise<Response> {
  await verifyHost(u);
  const headers = new Headers(init.headers);
  headers.set('User-Agent', 'KeyconfCatalogPreview/0.1');
  const r = await fetch(u, {
    ...init,
    redirect: 'manual',
    signal: AbortSignal.timeout(12000),
    headers,
  });
  if (r.status >= 300 && r.status < 400) {
    const location = r.headers.get('location');
    await r.body?.cancel();
    if (!location || redirects >= 3)
      throw new Error('The store redirected too many times.');
    return fetchPublic(publicUrl(new URL(location, u).href), {}, redirects + 1);
  }
  if (!r.ok) {
    await r.body?.cancel();
    throw new Error(
      'The store returned HTTP ' +
        r.status +
        '. Try a public product page or a JSON-LD export.',
    );
  }
  return r;
}
async function boundedText(r: Response) {
  if (Number(r.headers.get('content-length')) > 2_000_000) {
    await r.body?.cancel();
    throw new Error('The page is too large to preview.');
  }
  if (!r.body) return '';
  const reader = r.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0,
    text = '';
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 2_000_000)
        throw new Error('The page is too large to preview.');
      text += decoder.decode(chunk.value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    await reader.cancel();
  }
}
export async function importWebsite(
  input: string,
  continuation?: unknown,
): Promise<ImportResult> {
  const u = publicUrl(input);
  if (continuation !== undefined && continuation !== null) {
    if (!isImportContinuation(continuation) || continuation.source !== u.href)
      throw new Error('Invalid continuation. Preview this source again.');
    return shopifyPage(u, continuation);
  }
  if (/\/products\/[^/]+\/?$/.test(u.pathname)) {
    try {
      const endpoint = new URL(u);
      endpoint.pathname = endpoint.pathname.replace(/\/$/, '') + '.js';
      endpoint.search = '';
      const response = await fetchPublic(endpoint);
      const data: unknown = JSON.parse(await boundedText(response));
      if (
        record(data) &&
        typeof data.title === 'string' &&
        Array.isArray(data.variants)
      ) {
        const title = data.title;
        const products = data.variants
          .filter(record)
          .slice(0, 80)
          .map((variant): ImportedProduct => {
            const url = new URL(u);
            if (
              typeof variant.id === 'number' ||
              typeof variant.id === 'string'
            )
              url.searchParams.set('variant', String(variant.id));
            const name =
              title +
              (typeof variant.title === 'string' &&
              variant.title !== 'Default Title'
                ? ' · ' + variant.title
                : '');
            return {
              name,
              brand: string(data.vendor),
              url: url.href,
              sku: string(variant.sku),
              pricing: { kind: 'unknown' },
              availability:
                variant.available === true
                  ? 'Available'
                  : variant.available === false
                    ? 'Unavailable'
                    : '',
            };
          });
        if (products.length)
          return {
            products,
            source: u.href,
            observedAt: new Date().toISOString(),
            method: 'Shopify product JSON',
            next: null,
            coverage:
              'Up to 80 variants of this product. Price omitted because this endpoint does not establish the presentment currency. Shopify product JSON can truncate very large variant sets.',
          };
      }
    } catch {
      // A non-Shopify product URL may still expose Product JSON-LD below.
    }
  }
  const response = await fetchPublic(u);
  const html = await boundedText(response);
  const shopify = /cdn\.shopify\.com|Shopify\.shop/i.test(html);
  if (shopify && collectionHandle(u)) return shopifyPage(u);
  const products = parseStructuredProducts(html, u.href);
  if (products.length)
    return {
      products,
      source: u.href,
      observedAt: new Date().toISOString(),
      method: 'Product structured data',
      coverage:
        'Up to 80 product options found on this page. Prices and availability are snapshots; compatibility needs review.',
      next: null,
    };
  if (shopify) return shopifyPage(u);

  throw new Error(
    'No readable product data found. This site may need a dedicated importer. Try a specific product URL, or paste its JSON-LD below.',
  );
}

function collectionHandle(url: URL): string | undefined {
  if (url.pathname.includes('/products/')) return undefined;
  const value = url.pathname.match(/\/collections\/([^/]+)(?:\/|$)/)?.[1];
  return value && value !== 'all' ? decodeURIComponent(value) : undefined;
}
const variantFields =
  'nodes { id title sku price { amount currencyCode } availableForSale } pageInfo { hasNextPage endCursor }';
const productFields = 'id title vendor onlineStoreUrl';
function nextCursor(value: unknown): CatalogCursor {
  if (!record(value) || typeof value.hasNextPage !== 'boolean')
    throw new Error('The store did not return valid pagination details.');
  if (!value.hasNextPage) return { kind: 'done' };
  if (!cursor(value.endCursor))
    throw new Error(
      'The store has more products but did not return a usable continuation.',
    );
  return { kind: 'more', after: value.endCursor };
}
async function shopifyPage(
  url: URL,
  continuation?: ImportContinuation,
): Promise<ImportResult> {
  const handle = collectionHandle(url);
  const pending = continuation?.variants ?? [];
  const variables: Record<string, string | null> = {};
  let query: string;
  if (pending.length) {
    const argumentsList = pending
      .map((_, index) => `$id${index}: ID!, $after${index}: String!`)
      .join(', ');
    const fields = pending
      .map((item, index) => {
        variables['id' + index] = item.id;
        variables['after' + index] = item.after;
        return `product${index}: product(id: $id${index}) { ${productFields} variants(first: 10, after: $after${index}) { ${variantFields} } }`;
      })
      .join(' ');
    query = `query MoreVariants(${argumentsList}) { ${fields} }`;
  } else {
    variables.after =
      continuation?.catalog.kind === 'more' ? continuation.catalog.after : null;
    const products = `products(first: 8, after: $after, sortKey: ID) { nodes { ${productFields} variants(first: 10) { ${variantFields} } } pageInfo { hasNextPage endCursor } }`;
    if (handle) {
      variables.handle = handle;
      query = `query CollectionProducts($handle: String!, $after: String) { collection(handle: $handle) { title ${products} } }`;
    } else query = `query StoreProducts($after: String) { ${products} }`;
  }
  const response = await fetchPublic(
    new URL('/api/2026-07/graphql.json', url),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    },
  );
  const json: unknown = JSON.parse(await boundedText(response));
  if (
    !record(json) ||
    !record(json.data) ||
    (Array.isArray(json.errors) && json.errors.length)
  )
    throw new Error(
      'The store could not provide this catalog page. Try a product URL or a JSON-LD export.',
    );
  const data = json.data;
  let catalog: CatalogCursor = continuation?.catalog ?? { kind: 'done' };
  let nodes: unknown[];
  let title = handle ?? '';
  if (pending.length) {
    nodes = pending.map((_, index) => data['product' + index]);
    if (nodes.some((item) => item === null))
      throw new Error(
        'A product changed or disappeared while loading its variants. Preview the source again.',
      );
  } else {
    const collection = data.collection;
    if (handle && !record(collection))
      throw new Error(
        'This collection was not found in the store. Check its URL.',
      );
    const connection =
      handle && record(collection) ? collection.products : data.products;
    if (
      !record(connection) ||
      !Array.isArray(connection.nodes) ||
      connection.nodes.length > 8
    )
      throw new Error('The store returned an unreadable catalog page.');
    nodes = connection.nodes;
    catalog = nextCursor(connection.pageInfo);
    if (
      catalog.kind === 'more' &&
      continuation?.catalog.kind === 'more' &&
      catalog.after === continuation.catalog.after
    )
      throw new Error(
        'The store repeated a catalog page. Preview the source again.',
      );
    if (record(collection) && typeof collection.title === 'string')
      title = collection.title.slice(0, 255);
  }
  const products: ImportedProduct[] = [];
  const variants: ImportContinuation['variants'] = [];
  const seen = new Set<string>();
  for (const [index, item] of nodes.entries()) {
    if (
      !record(item) ||
      typeof item.title !== 'string' ||
      !record(item.variants) ||
      !Array.isArray(item.variants.nodes) ||
      item.variants.nodes.length > 10
    )
      throw new Error('The store returned unreadable product options.');
    if (pending[index] && item.id !== pending[index].id)
      throw new Error('The store returned options for an unexpected product.');
    const after = nextCursor(item.variants.pageInfo);
    if (after.kind === 'more') {
      if (
        typeof item.id !== 'string' ||
        !/^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) ||
        after.after === pending[index]?.after
      )
        throw new Error(
          'The store did not return a usable variant continuation.',
        );
      variants.push({ id: item.id, after: after.after });
    }
    for (const variant of item.variants.nodes) {
      if (!record(variant))
        throw new Error('The store returned an unreadable variant.');
      const id = string(variant.id).match(
        /^gid:\/\/shopify\/ProductVariant\/(\d+)$/,
      )?.[1];
      if (!id)
        throw new Error('A product option has no valid variant identity.');
      if (seen.has(id)) continue;
      seen.add(id);
      const link = new URL(safeLink(item.onlineStoreUrl, url.href));
      if (item.onlineStoreUrl && /\/products\/[^/]+\/?$/.test(link.pathname))
        link.searchParams.set('variant', id);
      const variantTitle = string(variant.title);
      const price = record(variant.price) ? variant.price : {};
      products.push({
        name: (
          item.title +
          (variantTitle && variantTitle !== 'Default Title'
            ? ' · ' + variantTitle
            : '')
        ).slice(0, 300),
        brand: string(item.vendor).slice(0, 150),
        url: link.href,
        sku: string(variant.sku),
        pricing: exactPrice(price.amount, price.currencyCode),
        availability:
          variant.availableForSale === true
            ? 'Available'
            : variant.availableForSale === false
              ? 'Unavailable'
              : '',
      });
    }
  }
  const next: ImportContinuation | null =
    catalog.kind === 'more' || variants.length
      ? { kind: 'shopify', source: url.href, catalog, variants }
      : null;
  return {
    products,
    source: url.href,
    observedAt: new Date().toISOString(),
    method: 'Shopify Storefront API',
    next,
    coverage:
      (handle ? `Collection “${title}”. ` : 'Storewide catalog. ') +
      'Up to 80 options per page. ' +
      (next
        ? 'More products or variants are available. '
        : 'Last catalog page. ') +
      'Website filters and sorting are not applied. Prices and stock are snapshots; compatibility needs review.',
  };
}

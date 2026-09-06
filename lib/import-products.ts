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
};
function record(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
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
    )
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
    if (!location || redirects >= 3)
      throw new Error('The store redirected too many times.');
    return fetchPublic(publicUrl(new URL(location, u).href), {}, redirects + 1);
  }
  if (!r.ok)
    throw new Error(
      'The store returned HTTP ' +
        r.status +
        '. Try a public product page or a JSON-LD export.',
    );
  return r;
}
async function boundedText(r: Response) {
  if (Number(r.headers.get('content-length')) > 2_000_000)
    throw new Error('The page is too large to preview.');
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
export async function importWebsite(input: string): Promise<ImportResult> {
  const u = publicUrl(input);
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
  const products = parseStructuredProducts(html, u.href);
  if (products.length)
    return {
      products,
      source: u.href,
      observedAt: new Date().toISOString(),
      method: 'Product structured data',
      coverage:
        'Up to 80 product options found on this page. Prices and availability are snapshots; compatibility needs review.',
    };
  if (/cdn\.shopify\.com|Shopify\.shop/i.test(html)) {
    const query =
      '{ products(first: 40) { nodes { title vendor onlineStoreUrl variants(first: 20) { nodes { id title sku price { amount currencyCode } availableForSale } pageInfo { hasNextPage } } } pageInfo { hasNextPage } } }';
    const r = await fetchPublic(new URL('/api/2026-07/graphql.json', u), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json: unknown = JSON.parse(await boundedText(r));
    if (
      record(json) &&
      record(json.data) &&
      record(json.data.products) &&
      Array.isArray(json.data.products.nodes)
    ) {
      const found: ImportedProduct[] = [];
      let moreVariants = false;
      for (const item of json.data.products.nodes) {
        if (!record(item) || typeof item.title !== 'string') continue;
        const connection = record(item.variants) ? item.variants : {};
        const variants = Array.isArray(connection.nodes)
          ? connection.nodes
          : [];
        moreVariants ||=
          record(connection.pageInfo) &&
          connection.pageInfo.hasNextPage === true;
        for (const variant of variants) {
          if (!record(variant)) continue;
          if (found.length >= 80) {
            moreVariants = true;
            break;
          }
          const title = string(variant.title);
          const url = new URL(safeLink(item.onlineStoreUrl, u.href));
          const variantId = string(variant.id).match(/(?:^|\/)(\d+)$/)?.[1];
          if (
            variantId &&
            item.onlineStoreUrl &&
            /\/products\/[^/]+\/?$/.test(url.pathname)
          )
            url.searchParams.set('variant', variantId);
          const price = record(variant.price) ? variant.price : {};
          found.push({
            name:
              item.title +
              (title && title !== 'Default Title' ? ' · ' + title : ''),
            brand: string(item.vendor),
            url: url.href,
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
      const moreProducts =
        record(json.data.products.pageInfo) &&
        json.data.products.pageInfo.hasNextPage === true;
      if (found.length)
        return {
          products: found,
          source: u.href,
          observedAt: new Date().toISOString(),
          method: 'Shopify Storefront API',
          coverage:
            'Storewide preview of up to 80 options across the first 40 products, with up to 20 variants per product. ' +
            (moreProducts ? 'The store has more products. ' : '') +
            (moreVariants
              ? 'More variants are available beyond this preview. '
              : '') +
            'Prices and stock are snapshots; compatibility needs review.',
        };
    }
  }

  throw new Error(
    'No readable product data found. This site may need a dedicated importer. Try a specific product URL, or paste its JSON-LD below.',
  );
}

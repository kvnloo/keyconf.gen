import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { catalog, initialSelection, checkBuild } from '../lib/catalog.ts';
import {
  parseStructuredProducts,
  publicUrl,
  isPublicAddress,
} from '../lib/import-products.ts';
test('Redux rejects the documented Durock stabilizer exception', () => {
  assert.ok(
    checkBuild(
      { ...initialSelection, stabilizers: 'durock-stabs' },
      catalog,
      '60',
    ).some(
      (x) =>
        x.status === 'incompatible' && x.title === 'Stabilizer interference',
    ),
  );
});
test('Hall effect switch is incompatible with mechanical PCB', () => {
  assert.ok(
    checkBuild(
      { ...initialSelection, switch: 'he-switch' },
      catalog,
      '60',
    ).some((x) => x.status === 'incompatible'),
  );
});
test('Matching family never claims whole build is verified', () => {
  const checks = checkBuild(initialSelection, catalog, '60');
  assert.ok(checks.some((x) => x.status === 'documented'));
  assert.ok(checks.some((x) => x.status === 'unknown'));
});
test('Unknown imported parts and changed layouts cannot inherit verified fit', () => {
  assert.equal(
    checkBuild({ ...initialSelection, pcb: 'missing' }, catalog, '60')[0]
      .status,
    'unknown',
  );
  assert.equal(
    checkBuild(initialSelection, catalog, '75')[0].status,
    'unknown',
  );
});
test('ProductGroup variant data retains identifiers and offer currencies', () => {
  const data = {
    '@type': 'ProductGroup',
    hasVariant: [
      {
        '@type': 'Product',
        name: 'Case green',
        sku: 'K1',
        brand: { name: 'Maker' },
        offers: {
          price: '99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: '/products/green',
        },
      },
      {
        '@type': 'Product',
        name: 'Case blue',
        sku: 'K2',
        offers: { price: '109', priceCurrency: 'EUR' },
      },
    ],
  };
  const html =
    '<script type="application/ld+json">' + JSON.stringify(data) + '</script>';
  const result = parseStructuredProducts(html, 'https://example.com/shop');
  assert.equal(result.length, 2);
  assert.equal(result[0].currency, 'USD');
  assert.equal(result[0].url, 'https://example.com/products/green');
  assert.equal(result[1].sku, 'K2');
});
test('Malformed JSON-LD does not hide later valid data or allow javascript links', () => {
  const r = parseStructuredProducts(
    '<script type="application/ld+json">broken</script><script type="application/ld+json">{"@type":"Product","name":"A","url":"javascript:alert(1)"}</script>',
    'https://example.com/',
  );
  assert.equal(r.length, 1);
  assert.equal(r[0].url, 'https://example.com/');
});
test('Importer rejects local, credentialed and non-HTTPS targets', () => {
  for (const url of [
    'http://example.com',
    'https://localhost',
    'https://127.0.0.1',
    'https://0x7f000001',
    'https://[::1]',
    'https://user:pass@example.com',
    'https://example.com:8443',
  ])
    assert.throws(() => publicUrl(url));
  for (const ip of [
    '127.0.0.1',
    '10.0.0.1',
    '192.168.1.1',
    '172.16.0.1',
    '169.254.169.254',
    '100.64.0.1',
    '::ffff:127.0.0.1',
    'fc00::1',
  ])
    assert.equal(isPublicAddress(ip), false, ip);
  assert.equal(isPublicAddress('1.1.1.1'), true);
});
test('Blender exports contain separate key groups and all configurable materials', () => {
  for (const layout of ['60', '65', '75']) {
    const b = readFileSync(
      new URL('../public/models/keyboard-' + layout + '.glb', import.meta.url),
    );
    assert.equal(b.toString('ascii', 0, 4), 'glTF');
    const length = b.readUInt32LE(12);
    const json = JSON.parse(b.toString('utf8', 20, 20 + length));
    assert.ok(
      json.nodes.filter((n) => n.name?.startsWith('key_')).length >= 61,
    );
    for (const name of ['case', 'alpha', 'mod', 'accent', 'space'])
      assert.ok(json.materials.some((m) => m.name.split('.')[0] === name));
  }
});
import { parseStudy } from '../lib/webmcp.ts';
test('Study tool validates layout and palette before mutating state', () => {
  assert.deepEqual(parseStudy({ layout: '65', palette: 'Porcelain' }), {
    layout: '65',
    palette: 'Porcelain',
  });
  assert.throws(() => parseStudy({ layout: '99', palette: 'Porcelain' }));
  assert.throws(() => parseStudy({ layout: '60', palette: 'not a palette' }));
});

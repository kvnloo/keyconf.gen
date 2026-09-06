import test from 'node:test';
import assert from 'node:assert/strict';
import {
  accessoryCatalog,
  newAccessorySelection,
  parseAccessories,
  assessAccessoryCompatibility,
  assessAccessories,
} from '../lib/build-accessories.ts';

const artisan = () => ({
  ...newAccessorySelection('jelly-key-zen-pond-v-1u'),
  location: { kind: 'key', keyId: 'Escape' },
});
const host = () => ({
  id: 'test-fixture-only',
  source: 'https://example.com/test-fixture',
  slots: null,
  keys: [{ id: 'Escape', sizeU: 1, stem: 'mx' }],
  claims: [],
});

// These host facts are test fixtures, not manufacturer compatibility claims.
const claim = (aspect, patch = {}) => ({
  productId: 'jelly-key-zen-pond-v-1u',
  locationId: 'Escape',
  aspect,
  status: 'confirmed',
  source: 'https://example.com/test-fixture',
  reason: `Fixture verifies ${aspect}.`,
  ...patch,
});

test('all accessory families survive a JSON round trip with distinct placements', () => {
  const selections = accessoryCatalog.map((product) =>
    newAccessorySelection(product.id),
  );
  assert.deepEqual(
    parseAccessories(JSON.parse(JSON.stringify(selections))),
    selections,
  );
  assert.equal(
    new Set(selections.map((item) => item.id)).size,
    selections.length,
  );
  assert.deepEqual(
    new Set(accessoryCatalog.map((item) => item.kind)),
    new Set(['knob', 'encoder', 'screen', 'buttons', 'macropad', 'artisan']),
  );
  assert.deepEqual(parseAccessories(undefined), []);
  assert.equal(
    selections.find((item) => item.productId.includes('macropad')).location
      .kind,
    'external',
  );
  assert.equal(
    selections.find((item) => item.productId.includes('oled')).location.kind,
    'embedded',
  );
});

test('imports reject damaged quantities, locations and product references', () => {
  const original = artisan();
  for (const patch of [
    { id: '' },
    { id: '__proto__' },
    { productId: 'not-a-product' },
    { quantity: 0 },
    { quantity: 101 },
    { quantity: 1.5 },
    { quantity: NaN },
    { quantity: Infinity },
    { quantity: 2 },
    { location: { kind: 'external', position: 'right' } },
    { location: { kind: 'key', keyId: '' } },
    { location: { kind: 'key', keyId: 'a'.repeat(121) } },
    { location: { kind: 'key', keyId: '<script>' } },
  ])
    assert.throws(() => parseAccessories([{ ...original, ...patch }]));
  for (const input of [
    null,
    {},
    [null],
    [original, original],
    Array(101).fill(original),
  ])
    assert.throws(() => parseAccessories(input));
  assert.throws(() => newAccessorySelection('missing'));
});

test('imports retain only selections and never trust claimed compatibility', () => {
  const original = artisan();
  const [parsed] = parseAccessories([
    {
      ...original,
      status: 'confirmed',
      claims: [claim('clearance')],
      source: 'https://example.com/forged',
    },
  ]);
  assert.deepEqual(parsed, original);
  assert.equal(assessAccessoryCompatibility(parsed).status, 'unknown');
});

test('MX stem and matching width alone do not establish artisan clearance', () => {
  const result = assessAccessoryCompatibility(artisan(), host());
  assert.equal(result.status, 'unknown');
  assert.ok(result.reasons.some((reason) => reason.startsWith('Clearance')));
  const clear = { ...host(), claims: [claim('clearance')] };
  assert.equal(
    assessAccessoryCompatibility(artisan(), clear).status,
    'confirmed',
  );
  for (const patch of [{ sizeU: 1.25 }, { stem: 'choc' }]) {
    const mismatch = { ...clear, keys: [{ ...clear.keys[0], ...patch }] };
    assert.equal(
      assessAccessoryCompatibility(artisan(), mismatch).status,
      'conflict',
    );
  }
  assert.equal(
    assessAccessoryCompatibility(artisan(), { ...clear, keys: [] }).status,
    'conflict',
  );
});

test('evidence is scoped to the selected product and location; conflicts win', () => {
  for (const patch of [
    { productId: 'other-product' },
    { locationId: 'Space' },
    { source: '' },
    { reason: '' },
  ]) {
    assert.equal(
      assessAccessoryCompatibility(artisan(), {
        ...host(),
        claims: [claim('clearance', patch)],
      }).status,
      'unknown',
    );
  }
  const claims = [
    claim('clearance'),
    claim('clearance', {
      status: 'conflict',
      reason: 'Fixture detects neighboring cap collision.',
    }),
  ];
  assert.equal(
    assessAccessoryCompatibility(artisan(), { ...host(), claims }).status,
    'conflict',
  );
});

test('multiple artisans cannot occupy one key, but may occupy separate keys', () => {
  const first = artisan();
  const second = artisan();
  const results = assessAccessories([first, second]);
  assert.equal(results[first.id].status, 'conflict');
  assert.equal(results[second.id].status, 'conflict');
  second.location.keyId = 'F1';
  assert.equal(assessAccessories([first, second])[second.id].status, 'unknown');
});

test('embedded modules require a matching host slot and respect total capacity', () => {
  const encoder = {
    ...newAccessorySelection('adafruit-377-encoder'),
    location: { kind: 'embedded', slotId: 'top-right' },
  };
  const knob = {
    ...newAccessorySelection('keychron-aluminum-knob'),
    location: encoder.location,
  };
  const fittedHost = {
    ...host(),
    slots: [{ id: 'top-right', kinds: ['encoder', 'knob'], capacity: 1 }],
  };
  assert.equal(
    assessAccessoryCompatibility(encoder, { ...fittedHost, slots: [] }).status,
    'conflict',
  );
  assert.equal(
    assessAccessoryCompatibility({ ...encoder, quantity: 2 }, fittedHost)
      .status,
    'conflict',
  );
  assert.equal(
    assessAccessoryCompatibility(encoder, {
      ...fittedHost,
      slots: [{ id: 'top-right', kinds: ['screen'], capacity: 1 }],
    }).status,
    'conflict',
  );
  const combined = assessAccessories([encoder, knob], fittedHost);
  assert.equal(combined[encoder.id].status, 'unknown');
  assert.equal(combined[knob.id].status, 'unknown');
  const otherEncoder = { ...encoder, id: 'another-encoder' };
  assert.equal(
    assessAccessories([encoder, otherEncoder], fittedHost)[encoder.id].status,
    'conflict',
  );
});

test('a documented knob cap never establishes encoder electrical or firmware support', () => {
  const knob = {
    ...newAccessorySelection('keychron-aluminum-knob'),
    location: { kind: 'embedded', slotId: 'top-right' },
  };
  const configuredHost = {
    ...host(),
    slots: [{ id: 'top-right', kinds: ['knob', 'encoder'], capacity: 1 }],
    claims: ['mount', 'clearance'].map((aspect) =>
      claim(aspect, { productId: knob.productId, locationId: 'top-right' }),
    ),
  };
  assert.equal(
    assessAccessoryCompatibility(knob, configuredHost).status,
    'confirmed',
  );
  const encoder = {
    ...newAccessorySelection('adafruit-377-encoder'),
    location: knob.location,
  };
  const result = assessAccessoryCompatibility(encoder, configuredHost);
  assert.equal(result.status, 'unknown');
  assert.ok(result.reasons.some((reason) => reason.startsWith('Electrical')));
  assert.ok(result.reasons.some((reason) => reason.startsWith('Firmware')));
});

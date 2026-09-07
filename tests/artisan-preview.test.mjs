import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultBuild } from '../lib/build.ts';
import { artisanPreviewNote } from '../lib/artisan-preview.ts';
const cap = {
  id: 'cap',
  productId: 'jelly-key-zen-pond-v-1u',
  quantity: 1,
  location: { kind: 'key', keyId: 'KeyA' },
};
const note = (item, extra = []) =>
  artisanPreviewNote(
    { ...defaultBuild, accessories: [item, ...extra] },
    item.id,
  );
test('artisan preview explains repairable omission without asserting physical fit', () => {
  assert.match(
    note({ ...cap, location: { kind: 'key', keyId: 'unassigned' } }),
    /choose a target key/,
  );
  assert.match(
    note({ ...cap, location: { kind: 'key', keyId: 'AbsentKey' } }),
    /absent from this layout/,
  );
  assert.match(
    note({ ...cap, location: { kind: 'key', keyId: 'Space' } }),
    /matching-width key/,
  );
  assert.match(
    note(cap, [{ ...cap, id: 'second' }]),
    /multiple artisan selections/,
  );
  assert.match(note(cap), /physical clearance still need verification/);
  assert.equal(artisanPreviewNote(defaultBuild, 'missing'), null);
});

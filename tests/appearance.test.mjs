import test from 'node:test';
import assert from 'node:assert/strict';
import { legendInk } from '../lib/appearance.ts';

test('mixed palettes keep each key group readable independently', () => {
  assert.equal(legendInk('#000000'), '#f8f8ef');
  assert.equal(legendInk('#ffffff'), '#20251f');
  assert.equal(legendInk('#d8e0ca'), '#20251f');
  assert.equal(legendInk('#53725e'), '#f8f8ef');
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseTypingMessage } from '../lib/typing-test.ts';

test('typing bridge accepts only known keyboard events and bounded sizing', () => {
  const type = 'keyconf:monkeytype';
  assert.deepEqual(
    parseTypingMessage({ type, event: 'key', code: 'KeyA', down: true }),
    { event: 'key', code: 'KeyA', down: true },
  );
  assert.deepEqual(
    parseTypingMessage({ type, event: 'height', height: 90000 }),
    { event: 'height', height: 720 },
  );
  for (const value of [
    null,
    {},
    { type, event: 'key', code: 'F1', down: true },
    { type, event: 'key', code: 'KeyA', down: 'true' },
    { type, event: 'height', height: Infinity },
    { type: 'elsewhere', event: 'ready' },
  ])
    assert.equal(parseTypingMessage(value), null);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const layout = JSON.parse(
  readFileSync(
    new URL(
      '../docs/reference-assets/keychron-q1-max-layout.json',
      import.meta.url,
    ),
  ),
);

test('Q1 Max ANSI layout preserves every documented cap position and separates the encoder', () => {
  assert.equal(layout.keys.length, 81);
  assert.equal(new Set(layout.keys.map((key) => key.code)).size, 81);
  assert.equal(layout.sourcePositions.length, 82);
  for (const position of layout.sourcePositions) {
    const key =
      position.kind === 'keycap'
        ? layout.keys.find((entry) => entry.code === position.code)
        : layout.stockEncoder;
    assert.ok(key, `Missing ${position.code}`);
    assert.equal(key.width, position.w ?? 1);
    assert.equal(key.x, position.x + key.width / 2 - layout.bounds.width / 2);
    assert.equal(
      key.y,
      layout.bounds.height / 2 - position.y - (position.h ?? 1) / 2,
    );
  }
  assert.deepEqual(layout.stockEncoder.matrix, [0, 14]);
  assert.equal(layout.stockEncoder.code, 'AudioVolumeMute');
  assert.equal(
    layout.keys.some((key) => key.code === 'AudioVolumeMute'),
    false,
  );
  assert.equal(
    layout.keys.some((key) => key.code === 'End'),
    false,
  );
  assert.ok(layout.keys.some((key) => key.code === 'ControlRight'));
});

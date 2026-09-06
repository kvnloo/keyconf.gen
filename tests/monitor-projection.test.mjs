import { test } from 'node:test';
import assert from 'node:assert/strict';
import { monitorTransform } from '../lib/monitor-projection.ts';

function transform(css, x, y) {
  const m = css.slice(9, -1).split(',').map(Number);
  const w = m[3] * x + m[7] * y + m[15];
  return [(m[0] * x + m[4] * y + m[12]) / w, (m[1] * x + m[5] * y + m[13]) / w];
}

test('Monitor projection keeps all four corners on a tilted screen', () => {
  for (const corners of [
    [
      { x: 20, y: 40 },
      { x: 820, y: 40 },
      { x: 820, y: 490 },
      { x: 20, y: 490 },
    ],
    [
      { x: 130, y: 80 },
      { x: 750, y: 140 },
      { x: 720, y: 550 },
      { x: 100, y: 500 },
    ],
  ]) {
    const css = monitorTransform(corners, 960, 540);
    assert.ok(css);
    for (const [i, [x, y]] of [
      [0, 0],
      [960, 0],
      [960, 540],
      [0, 540],
    ].entries()) {
      const actual = transform(css, x, y);
      assert.ok(Math.abs(actual[0] - corners[i].x) < 1e-8);
      assert.ok(Math.abs(actual[1] - corners[i].y) < 1e-8);
    }
  }
});

test('A collapsed monitor cannot produce invalid CSS transforms', () => {
  assert.equal(monitorTransform(Array(4).fill({ x: 0, y: 0 }), 960, 540), null);
});

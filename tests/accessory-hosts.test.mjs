import test from 'node:test';
import assert from 'node:assert/strict';
import { accessoryHost } from '../lib/accessory-hosts.ts';
import { assessAccessories } from '../lib/build-accessories.ts';
const board = {
  layout: '75',
  selection: { case: 'q1-max-case', pcb: 'q1-max-pcb', plate: 'q1-max-plate' },
};
const knob = {
  id: 'knob',
  productId: 'keychron-aluminum-knob',
  quantity: 1,
  location: { kind: 'embedded', slotId: 'stock-knob' },
};
test('replacement cap is confirmed only on a complete Q1 Max assembly and documented slot', () => {
  const host = accessoryHost(board);
  assert.equal(assessAccessories([knob], host).knob.status, 'confirmed');
  for (const category of ['case', 'pcb', 'plate']) {
    const mixed = {
      ...board,
      selection: { ...board.selection, [category]: 'another-part' },
    };
    assert.equal(accessoryHost(mixed), undefined);
    assert.equal(
      assessAccessories([knob], accessoryHost(mixed)).knob.status,
      'unknown',
    );
  }
  assert.equal(accessoryHost({ ...board, layout: '65' }), undefined);
  assert.equal(
    assessAccessories(
      [{ ...knob, location: { kind: 'embedded', slotId: 'unassigned' } }],
      host,
    ).knob.status,
    'unknown',
  );
  assert.equal(
    assessAccessories([knob, { ...knob, id: 'duplicate' }], host).knob.status,
    'conflict',
  );
  assert.equal(
    assessAccessories([{ ...knob, productId: 'adafruit-377-encoder' }], host)
      .knob.status,
    'conflict',
  );
  assert.equal(host.keys.length, 81);
  assert.equal(
    host.keys.some((key) => key.id === 'AudioVolumeMute'),
    false,
  );
});

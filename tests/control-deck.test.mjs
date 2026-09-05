import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  newDeck,
  parseDeck,
  encodeDeck,
  decodeDeck,
} from '../lib/control-deck.ts';
import { defaultBuild } from '../lib/build.ts';

test('control deck links retain a distinct device and Unicode customization without keyboard parts', () => {
  for (const device of ['grok-bot', 'codex-micro']) {
    const build = {
      ...newDeck(device),
      name: 'Kevin’s study 日本語',
      colors: {
        case: '#aBc123',
        keys: '#998877',
        commands: '#223344',
        wide: '#eeeeee',
      },
      lighting: 'After hours',
      dial: 0.82,
    };
    assert.deepEqual(decodeDeck(encodeDeck(build)), build);
    assert.deepEqual(parseDeck(JSON.parse(JSON.stringify(build))), build);
    assert.equal('selection' in build, false);
    assert.equal('enabled' in build, false);
  }
  assert.throws(() => parseDeck(defaultBuild));
});

test('malformed deck links cannot select arbitrary models or inject unbounded settings', () => {
  const original = newDeck('grok-bot');
  for (const patch of [
    { version: 2 },
    { kind: 'keyboard' },
    { device: '../../private' },
    { name: 'x'.repeat(81) },
    { colors: { ...original.colors, case: 'url(https://example.com)' } },
    { colors: { ...original.colors, keys: null } },
    { lighting: 'Unknown' },
    { dial: NaN },
    { dial: Infinity },
    { dial: -0.1 },
    { dial: 1.01 },
  ])
    assert.throws(() => parseDeck({ ...original, ...patch }));
  for (const input of ['bad!', 'a'.repeat(4001), 'bnVsbA', 'e30'])
    assert.throws(() => decodeDeck(input));
  assert.equal(parseDeck({ ...original, name: '  ' }).name, original.name);
});

test('exported control-deck models retain their distinct visible key counts and real assembly groups', () => {
  for (const [device, count, extra] of [
    ['grok-bot', 11, 'screen'],
    ['codex-micro', 12, 'control_joystick'],
  ]) {
    const data = readFileSync(
      new URL(`../public/models/${device}.glb`, import.meta.url),
    );
    assert.equal(data.toString('ascii', 0, 4), 'glTF');
    const model = JSON.parse(
      data.subarray(20, 20 + data.readUInt32LE(12)).toString(),
    );
    const nodes = model.nodes;
    const names = nodes.map((node) => node.name);
    assert.equal(
      names.filter((name) => name?.startsWith('key_')).length,
      count,
    );
    assert.equal(
      new Set(names.filter((name) => name?.startsWith('key_'))).size,
      count,
    );
    for (const name of ['plate', 'pcb', 'switches', 'control_dial', extra])
      assert.ok(names.includes(name), `${device}: ${name}`);
    assert.ok(
      model.meshes.length < 60,
      'static details are batched to bound draw calls',
    );
  }
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { featuredBuilds } from '../lib/featured-builds.ts';

test('Angry Miao keyboards are reachable featured presets', () => {
  const byId = Object.fromEntries(
    featuredBuilds.map((preset) => [preset.id, preset]),
  );
  for (const id of ['cyberboard-r2', 'am-hatsu']) {
    assert.ok(byId[id], `missing featured preset ${id}`);
    assert.equal(byId[id].kind, 'keyboard');
    assert.match(byId[id].subtitle, /Angry Miao/i);
  }
  assert.equal(byId['am-hatsu'].build.layout, '45');
  assert.equal(byId['am-hatsu'].build.selection.case, 'am-hatsu-case');
  assert.notEqual(byId['am-hatsu'].build.selection.case, 'bakeneko-case');
  assert.equal(byId['cyberboard-r2'].build.layout, '75');
  assert.equal(
    byId['cyberboard-r2'].build.selection.case,
    'am-cyberboard-r2-case',
  );
  assert.notEqual(byId['cyberboard-r2'].build.selection.case, 'q1-max-case');
});

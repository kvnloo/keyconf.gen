import assert from 'node:assert/strict';
import { test } from 'node:test';
import { featuredBuilds } from '../lib/featured-builds.ts';

test('Angry Miao keyboards are reachable featured presets', () => {
  const byId = Object.fromEntries(featuredBuilds.map((preset) => [preset.id, preset]));
  for (const id of ['cyberboard-r2', 'am-hatsu']) {
    assert.ok(byId[id], `missing featured preset ${id}`);
    assert.equal(byId[id].kind, 'keyboard');
    assert.match(byId[id].subtitle, /Angry Miao/i);
  }
});

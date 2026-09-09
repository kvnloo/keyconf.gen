// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const layout = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("21801") ? "" : (stryCov_9fa48("21801"), '../docs/reference-assets/keychron-q1-max-layout.json'), import.meta.url)));
test(stryMutAct_9fa48("21803") ? "" : (stryCov_9fa48("21803"), 'Q1 Max ANSI layout preserves every documented cap position and separates the encoder'), () => {
  if (stryMutAct_9fa48("21804")) {
    {}
  } else {
    stryCov_9fa48("21804");
    if (stryMutAct_9fa48("21805")) {
      ;
    } else {
      stryCov_9fa48("21805");
      assert.equal(layout.keys.length, 81);
    }
    assert.equal(new Set(layout.keys.map(stryMutAct_9fa48("21807") ? () => undefined : (stryCov_9fa48("21807"), key => key.code))).size, 81);
    if (stryMutAct_9fa48("21808")) {
      ;
    } else {
      stryCov_9fa48("21808");
      assert.equal(layout.sourcePositions.length, 82);
    }
    for (const position of layout.sourcePositions) {
      if (stryMutAct_9fa48("21809")) {
        {}
      } else {
        stryCov_9fa48("21809");
        const key = (stryMutAct_9fa48("21812") ? position.kind !== 'keycap' : stryMutAct_9fa48("21811") ? false : stryMutAct_9fa48("21810") ? true : (stryCov_9fa48("21810", "21811", "21812"), position.kind === (stryMutAct_9fa48("21813") ? "" : (stryCov_9fa48("21813"), 'keycap')))) ? layout.keys.find(stryMutAct_9fa48("21814") ? () => undefined : (stryCov_9fa48("21814"), entry => stryMutAct_9fa48("21817") ? entry.code !== position.code : stryMutAct_9fa48("21816") ? false : stryMutAct_9fa48("21815") ? true : (stryCov_9fa48("21815", "21816", "21817"), entry.code === position.code))) : layout.stockEncoder;
        assert.ok(key, stryMutAct_9fa48("21819") ? `` : (stryCov_9fa48("21819"), `Missing ${position.code}`));
        assert.equal(key.width, stryMutAct_9fa48("21821") ? position.w && 1 : (stryCov_9fa48("21821"), position.w ?? 1));
        assert.equal(key.x, stryMutAct_9fa48("21823") ? position.x + key.width / 2 + layout.bounds.width / 2 : (stryCov_9fa48("21823"), (stryMutAct_9fa48("21824") ? position.x - key.width / 2 : (stryCov_9fa48("21824"), position.x + (stryMutAct_9fa48("21825") ? key.width * 2 : (stryCov_9fa48("21825"), key.width / 2)))) - (stryMutAct_9fa48("21826") ? layout.bounds.width * 2 : (stryCov_9fa48("21826"), layout.bounds.width / 2))));
        assert.equal(key.y, stryMutAct_9fa48("21828") ? layout.bounds.height / 2 - position.y + (position.h ?? 1) / 2 : (stryCov_9fa48("21828"), (stryMutAct_9fa48("21829") ? layout.bounds.height / 2 + position.y : (stryCov_9fa48("21829"), (stryMutAct_9fa48("21830") ? layout.bounds.height * 2 : (stryCov_9fa48("21830"), layout.bounds.height / 2)) - position.y)) - (stryMutAct_9fa48("21831") ? (position.h ?? 1) * 2 : (stryCov_9fa48("21831"), (stryMutAct_9fa48("21832") ? position.h && 1 : (stryCov_9fa48("21832"), position.h ?? 1)) / 2))));
      }
    }
    assert.deepEqual(layout.stockEncoder.matrix, stryMutAct_9fa48("21834") ? [] : (stryCov_9fa48("21834"), [0, 14]));
    assert.equal(layout.stockEncoder.code, stryMutAct_9fa48("21836") ? "" : (stryCov_9fa48("21836"), 'AudioVolumeMute'));
    assert.equal(stryMutAct_9fa48("21838") ? layout.keys.every(key => key.code === 'AudioVolumeMute') : (stryCov_9fa48("21838"), layout.keys.some(stryMutAct_9fa48("21839") ? () => undefined : (stryCov_9fa48("21839"), key => stryMutAct_9fa48("21842") ? key.code !== 'AudioVolumeMute' : stryMutAct_9fa48("21841") ? false : stryMutAct_9fa48("21840") ? true : (stryCov_9fa48("21840", "21841", "21842"), key.code === (stryMutAct_9fa48("21843") ? "" : (stryCov_9fa48("21843"), 'AudioVolumeMute')))))), stryMutAct_9fa48("21844") ? true : (stryCov_9fa48("21844"), false));
    assert.equal(stryMutAct_9fa48("21846") ? layout.keys.every(key => key.code === 'End') : (stryCov_9fa48("21846"), layout.keys.some(stryMutAct_9fa48("21847") ? () => undefined : (stryCov_9fa48("21847"), key => stryMutAct_9fa48("21850") ? key.code !== 'End' : stryMutAct_9fa48("21849") ? false : stryMutAct_9fa48("21848") ? true : (stryCov_9fa48("21848", "21849", "21850"), key.code === (stryMutAct_9fa48("21851") ? "" : (stryCov_9fa48("21851"), 'End')))))), stryMutAct_9fa48("21852") ? true : (stryCov_9fa48("21852"), false));
    assert.ok(stryMutAct_9fa48("21854") ? layout.keys.every(key => key.code === 'ControlRight') : (stryCov_9fa48("21854"), layout.keys.some(stryMutAct_9fa48("21855") ? () => undefined : (stryCov_9fa48("21855"), key => stryMutAct_9fa48("21858") ? key.code !== 'ControlRight' : stryMutAct_9fa48("21857") ? false : stryMutAct_9fa48("21856") ? true : (stryCov_9fa48("21856", "21857", "21858"), key.code === (stryMutAct_9fa48("21859") ? "" : (stryCov_9fa48("21859"), 'ControlRight')))))));
  }
});
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
const layout = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("21870") ? "" : (stryCov_9fa48("21870"), '../docs/reference-assets/keychron-q1-max-layout.json'), import.meta.url)));
test(stryMutAct_9fa48("21872") ? "" : (stryCov_9fa48("21872"), 'Q1 Max ANSI layout preserves every documented cap position and separates the encoder'), () => {
  if (stryMutAct_9fa48("21873")) {
    {}
  } else {
    stryCov_9fa48("21873");
    if (stryMutAct_9fa48("21874")) {
      ;
    } else {
      stryCov_9fa48("21874");
      assert.equal(layout.keys.length, 81);
    }
    assert.equal(new Set(layout.keys.map(stryMutAct_9fa48("21876") ? () => undefined : (stryCov_9fa48("21876"), key => key.code))).size, 81);
    if (stryMutAct_9fa48("21877")) {
      ;
    } else {
      stryCov_9fa48("21877");
      assert.equal(layout.sourcePositions.length, 82);
    }
    for (const position of layout.sourcePositions) {
      if (stryMutAct_9fa48("21878")) {
        {}
      } else {
        stryCov_9fa48("21878");
        const key = (stryMutAct_9fa48("21881") ? position.kind !== 'keycap' : stryMutAct_9fa48("21880") ? false : stryMutAct_9fa48("21879") ? true : (stryCov_9fa48("21879", "21880", "21881"), position.kind === (stryMutAct_9fa48("21882") ? "" : (stryCov_9fa48("21882"), 'keycap')))) ? layout.keys.find(stryMutAct_9fa48("21883") ? () => undefined : (stryCov_9fa48("21883"), entry => stryMutAct_9fa48("21886") ? entry.code !== position.code : stryMutAct_9fa48("21885") ? false : stryMutAct_9fa48("21884") ? true : (stryCov_9fa48("21884", "21885", "21886"), entry.code === position.code))) : layout.stockEncoder;
        assert.ok(key, stryMutAct_9fa48("21888") ? `` : (stryCov_9fa48("21888"), `Missing ${position.code}`));
        assert.equal(key.width, stryMutAct_9fa48("21890") ? position.w && 1 : (stryCov_9fa48("21890"), position.w ?? 1));
        assert.equal(key.x, stryMutAct_9fa48("21892") ? position.x + key.width / 2 + layout.bounds.width / 2 : (stryCov_9fa48("21892"), (stryMutAct_9fa48("21893") ? position.x - key.width / 2 : (stryCov_9fa48("21893"), position.x + (stryMutAct_9fa48("21894") ? key.width * 2 : (stryCov_9fa48("21894"), key.width / 2)))) - (stryMutAct_9fa48("21895") ? layout.bounds.width * 2 : (stryCov_9fa48("21895"), layout.bounds.width / 2))));
        assert.equal(key.y, stryMutAct_9fa48("21897") ? layout.bounds.height / 2 - position.y + (position.h ?? 1) / 2 : (stryCov_9fa48("21897"), (stryMutAct_9fa48("21898") ? layout.bounds.height / 2 + position.y : (stryCov_9fa48("21898"), (stryMutAct_9fa48("21899") ? layout.bounds.height * 2 : (stryCov_9fa48("21899"), layout.bounds.height / 2)) - position.y)) - (stryMutAct_9fa48("21900") ? (position.h ?? 1) * 2 : (stryCov_9fa48("21900"), (stryMutAct_9fa48("21901") ? position.h && 1 : (stryCov_9fa48("21901"), position.h ?? 1)) / 2))));
      }
    }
    assert.deepEqual(layout.stockEncoder.matrix, stryMutAct_9fa48("21903") ? [] : (stryCov_9fa48("21903"), [0, 14]));
    assert.equal(layout.stockEncoder.code, stryMutAct_9fa48("21905") ? "" : (stryCov_9fa48("21905"), 'AudioVolumeMute'));
    assert.equal(stryMutAct_9fa48("21907") ? layout.keys.every(key => key.code === 'AudioVolumeMute') : (stryCov_9fa48("21907"), layout.keys.some(stryMutAct_9fa48("21908") ? () => undefined : (stryCov_9fa48("21908"), key => stryMutAct_9fa48("21911") ? key.code !== 'AudioVolumeMute' : stryMutAct_9fa48("21910") ? false : stryMutAct_9fa48("21909") ? true : (stryCov_9fa48("21909", "21910", "21911"), key.code === (stryMutAct_9fa48("21912") ? "" : (stryCov_9fa48("21912"), 'AudioVolumeMute')))))), stryMutAct_9fa48("21913") ? true : (stryCov_9fa48("21913"), false));
    assert.equal(stryMutAct_9fa48("21915") ? layout.keys.every(key => key.code === 'End') : (stryCov_9fa48("21915"), layout.keys.some(stryMutAct_9fa48("21916") ? () => undefined : (stryCov_9fa48("21916"), key => stryMutAct_9fa48("21919") ? key.code !== 'End' : stryMutAct_9fa48("21918") ? false : stryMutAct_9fa48("21917") ? true : (stryCov_9fa48("21917", "21918", "21919"), key.code === (stryMutAct_9fa48("21920") ? "" : (stryCov_9fa48("21920"), 'End')))))), stryMutAct_9fa48("21921") ? true : (stryCov_9fa48("21921"), false));
    assert.ok(stryMutAct_9fa48("21923") ? layout.keys.every(key => key.code === 'ControlRight') : (stryCov_9fa48("21923"), layout.keys.some(stryMutAct_9fa48("21924") ? () => undefined : (stryCov_9fa48("21924"), key => stryMutAct_9fa48("21927") ? key.code !== 'ControlRight' : stryMutAct_9fa48("21926") ? false : stryMutAct_9fa48("21925") ? true : (stryCov_9fa48("21925", "21926", "21927"), key.code === (stryMutAct_9fa48("21928") ? "" : (stryCov_9fa48("21928"), 'ControlRight')))))));
  }
});
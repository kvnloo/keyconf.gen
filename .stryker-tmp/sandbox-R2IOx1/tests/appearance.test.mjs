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
import { legendInk } from '../lib/appearance.ts';
test(stryMutAct_9fa48("15137") ? "" : (stryCov_9fa48("15137"), 'mixed palettes keep each key group readable independently'), () => {
  if (stryMutAct_9fa48("15138")) {
    {}
  } else {
    stryCov_9fa48("15138");
    assert.equal(legendInk(stryMutAct_9fa48("15140") ? "" : (stryCov_9fa48("15140"), '#000000')), stryMutAct_9fa48("15141") ? "" : (stryCov_9fa48("15141"), '#f8f8ef'));
    assert.equal(legendInk(stryMutAct_9fa48("15143") ? "" : (stryCov_9fa48("15143"), '#ffffff')), stryMutAct_9fa48("15144") ? "" : (stryCov_9fa48("15144"), '#20251f'));
    assert.equal(legendInk(stryMutAct_9fa48("15146") ? "" : (stryCov_9fa48("15146"), '#d8e0ca')), stryMutAct_9fa48("15147") ? "" : (stryCov_9fa48("15147"), '#20251f'));
    assert.equal(legendInk(stryMutAct_9fa48("15149") ? "" : (stryCov_9fa48("15149"), '#53725e')), stryMutAct_9fa48("15150") ? "" : (stryCov_9fa48("15150"), '#f8f8ef'));
  }
});
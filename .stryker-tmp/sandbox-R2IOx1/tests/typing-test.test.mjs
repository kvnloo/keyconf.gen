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
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseTypingMessage } from '../lib/typing-test.ts';
test(stryMutAct_9fa48("22362") ? "" : (stryCov_9fa48("22362"), 'typing bridge accepts only known keyboard events and bounded sizing'), () => {
  if (stryMutAct_9fa48("22363")) {
    {}
  } else {
    stryCov_9fa48("22363");
    const type = stryMutAct_9fa48("22364") ? "" : (stryCov_9fa48("22364"), 'keyconf:monkeytype');
    assert.deepEqual(parseTypingMessage(stryMutAct_9fa48("22366") ? {} : (stryCov_9fa48("22366"), {
      type,
      event: stryMutAct_9fa48("22367") ? "" : (stryCov_9fa48("22367"), 'key'),
      code: stryMutAct_9fa48("22368") ? "" : (stryCov_9fa48("22368"), 'KeyA'),
      down: stryMutAct_9fa48("22369") ? false : (stryCov_9fa48("22369"), true)
    })), stryMutAct_9fa48("22370") ? {} : (stryCov_9fa48("22370"), {
      event: stryMutAct_9fa48("22371") ? "" : (stryCov_9fa48("22371"), 'key'),
      code: stryMutAct_9fa48("22372") ? "" : (stryCov_9fa48("22372"), 'KeyA'),
      down: stryMutAct_9fa48("22373") ? false : (stryCov_9fa48("22373"), true)
    }));
    assert.deepEqual(parseTypingMessage(stryMutAct_9fa48("22375") ? {} : (stryCov_9fa48("22375"), {
      type,
      event: stryMutAct_9fa48("22376") ? "" : (stryCov_9fa48("22376"), 'height'),
      height: 90000
    })), stryMutAct_9fa48("22377") ? {} : (stryCov_9fa48("22377"), {
      event: stryMutAct_9fa48("22378") ? "" : (stryCov_9fa48("22378"), 'height'),
      height: 720
    }));
    for (const value of stryMutAct_9fa48("22379") ? [] : (stryCov_9fa48("22379"), [null, {}, stryMutAct_9fa48("22380") ? {} : (stryCov_9fa48("22380"), {
      type,
      event: stryMutAct_9fa48("22381") ? "" : (stryCov_9fa48("22381"), 'key'),
      code: stryMutAct_9fa48("22382") ? "" : (stryCov_9fa48("22382"), 'F1'),
      down: stryMutAct_9fa48("22383") ? false : (stryCov_9fa48("22383"), true)
    }), stryMutAct_9fa48("22384") ? {} : (stryCov_9fa48("22384"), {
      type,
      event: stryMutAct_9fa48("22385") ? "" : (stryCov_9fa48("22385"), 'key'),
      code: stryMutAct_9fa48("22386") ? "" : (stryCov_9fa48("22386"), 'KeyA'),
      down: stryMutAct_9fa48("22387") ? "" : (stryCov_9fa48("22387"), 'true')
    }), stryMutAct_9fa48("22388") ? {} : (stryCov_9fa48("22388"), {
      type,
      event: stryMutAct_9fa48("22389") ? "" : (stryCov_9fa48("22389"), 'height'),
      height: Infinity
    }), stryMutAct_9fa48("22390") ? {} : (stryCov_9fa48("22390"), {
      type: stryMutAct_9fa48("22391") ? "" : (stryCov_9fa48("22391"), 'elsewhere'),
      event: stryMutAct_9fa48("22392") ? "" : (stryCov_9fa48("22392"), 'ready')
    })])) if (stryMutAct_9fa48("22393")) {
      ;
    } else {
      stryCov_9fa48("22393");
      assert.equal(parseTypingMessage(value), null);
    }
  }
});
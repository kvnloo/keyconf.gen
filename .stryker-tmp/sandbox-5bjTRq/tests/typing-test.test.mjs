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
test(stryMutAct_9fa48("22293") ? "" : (stryCov_9fa48("22293"), 'typing bridge accepts only known keyboard events and bounded sizing'), () => {
  if (stryMutAct_9fa48("22294")) {
    {}
  } else {
    stryCov_9fa48("22294");
    const type = stryMutAct_9fa48("22295") ? "" : (stryCov_9fa48("22295"), 'keyconf:monkeytype');
    assert.deepEqual(parseTypingMessage(stryMutAct_9fa48("22297") ? {} : (stryCov_9fa48("22297"), {
      type,
      event: stryMutAct_9fa48("22298") ? "" : (stryCov_9fa48("22298"), 'key'),
      code: stryMutAct_9fa48("22299") ? "" : (stryCov_9fa48("22299"), 'KeyA'),
      down: stryMutAct_9fa48("22300") ? false : (stryCov_9fa48("22300"), true)
    })), stryMutAct_9fa48("22301") ? {} : (stryCov_9fa48("22301"), {
      event: stryMutAct_9fa48("22302") ? "" : (stryCov_9fa48("22302"), 'key'),
      code: stryMutAct_9fa48("22303") ? "" : (stryCov_9fa48("22303"), 'KeyA'),
      down: stryMutAct_9fa48("22304") ? false : (stryCov_9fa48("22304"), true)
    }));
    assert.deepEqual(parseTypingMessage(stryMutAct_9fa48("22306") ? {} : (stryCov_9fa48("22306"), {
      type,
      event: stryMutAct_9fa48("22307") ? "" : (stryCov_9fa48("22307"), 'height'),
      height: 90000
    })), stryMutAct_9fa48("22308") ? {} : (stryCov_9fa48("22308"), {
      event: stryMutAct_9fa48("22309") ? "" : (stryCov_9fa48("22309"), 'height'),
      height: 720
    }));
    for (const value of stryMutAct_9fa48("22310") ? [] : (stryCov_9fa48("22310"), [null, {}, stryMutAct_9fa48("22311") ? {} : (stryCov_9fa48("22311"), {
      type,
      event: stryMutAct_9fa48("22312") ? "" : (stryCov_9fa48("22312"), 'key'),
      code: stryMutAct_9fa48("22313") ? "" : (stryCov_9fa48("22313"), 'F1'),
      down: stryMutAct_9fa48("22314") ? false : (stryCov_9fa48("22314"), true)
    }), stryMutAct_9fa48("22315") ? {} : (stryCov_9fa48("22315"), {
      type,
      event: stryMutAct_9fa48("22316") ? "" : (stryCov_9fa48("22316"), 'key'),
      code: stryMutAct_9fa48("22317") ? "" : (stryCov_9fa48("22317"), 'KeyA'),
      down: stryMutAct_9fa48("22318") ? "" : (stryCov_9fa48("22318"), 'true')
    }), stryMutAct_9fa48("22319") ? {} : (stryCov_9fa48("22319"), {
      type,
      event: stryMutAct_9fa48("22320") ? "" : (stryCov_9fa48("22320"), 'height'),
      height: Infinity
    }), stryMutAct_9fa48("22321") ? {} : (stryCov_9fa48("22321"), {
      type: stryMutAct_9fa48("22322") ? "" : (stryCov_9fa48("22322"), 'elsewhere'),
      event: stryMutAct_9fa48("22323") ? "" : (stryCov_9fa48("22323"), 'ready')
    })])) if (stryMutAct_9fa48("22324")) {
      ;
    } else {
      stryCov_9fa48("22324");
      assert.equal(parseTypingMessage(value), null);
    }
  }
});
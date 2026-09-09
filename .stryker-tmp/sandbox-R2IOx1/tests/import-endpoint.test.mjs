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
import { importEndpoint } from '../lib/import-endpoint.ts';
import { previewChannel, previewStorageKey } from '../lib/preview-storage.ts';
test(stryMutAct_9fa48("20267") ? "" : (stryCov_9fa48("20267"), 'nightly Pages imports use the separate backend; stable and dev remain stable'), () => {
  if (stryMutAct_9fa48("20268")) {
    {}
  } else {
    stryCov_9fa48("20268");
    for (const path of stryMutAct_9fa48("20269") ? [] : (stryCov_9fa48("20269"), [stryMutAct_9fa48("20270") ? "" : (stryCov_9fa48("20270"), '/'), stryMutAct_9fa48("20271") ? "" : (stryCov_9fa48("20271"), '/main/'), stryMutAct_9fa48("20272") ? "" : (stryCov_9fa48("20272"), '/dev/')])) {
      if (stryMutAct_9fa48("20273")) {
        {}
      } else {
        stryCov_9fa48("20273");
        assert.equal(importEndpoint(new URL((stryMutAct_9fa48("20275") ? "" : (stryCov_9fa48("20275"), 'https://kvnloo.github.io/keyconf.gen')) + path)), stryMutAct_9fa48("20276") ? "" : (stryCov_9fa48("20276"), 'https://keyconf-studio.kvnloo.chatgpt.site/api/import'));
      }
    }
    assert.equal(importEndpoint(new URL(stryMutAct_9fa48("20278") ? "" : (stryCov_9fa48("20278"), 'https://kvnloo.github.io/keyconf.gen/nightly/#studio'))), stryMutAct_9fa48("20279") ? "" : (stryCov_9fa48("20279"), 'https://keyconf-nightly.kvnloo.chatgpt.site/api/import'));
    for (const origin of stryMutAct_9fa48("20280") ? [] : (stryCov_9fa48("20280"), [stryMutAct_9fa48("20281") ? "" : (stryCov_9fa48("20281"), 'http://localhost:3000'), stryMutAct_9fa48("20282") ? "" : (stryCov_9fa48("20282"), 'https://keyconf-nightly.kvnloo.chatgpt.site'), stryMutAct_9fa48("20283") ? "" : (stryCov_9fa48("20283"), 'https://keyconf-studio.kvnloo.chatgpt.site')])) {
      if (stryMutAct_9fa48("20284")) {
        {}
      } else {
        stryCov_9fa48("20284");
        assert.equal(importEndpoint(new URL(origin)), stryMutAct_9fa48("20286") ? "" : (stryCov_9fa48("20286"), '/api/import'));
      }
    }
  }
});
test(stryMutAct_9fa48("20288") ? "" : (stryCov_9fa48("20288"), 'nightly Sites identifies its preview and scopes saved builds'), t => {
  if (stryMutAct_9fa48("20289")) {
    {}
  } else {
    stryCov_9fa48("20289");
    const previous = Object.getOwnPropertyDescriptor(globalThis, stryMutAct_9fa48("20290") ? "" : (stryCov_9fa48("20290"), 'document'));
    t.after(() => {
      if (stryMutAct_9fa48("20292")) {
        {}
      } else {
        stryCov_9fa48("20292");
        if (stryMutAct_9fa48("20294") ? false : stryMutAct_9fa48("20293") ? true : (stryCov_9fa48("20293", "20294"), previous)) Object.defineProperty(globalThis, stryMutAct_9fa48("20296") ? "" : (stryCov_9fa48("20296"), 'document'), previous);else delete globalThis.document;
      }
    });
    Object.defineProperty(globalThis, stryMutAct_9fa48("20298") ? "" : (stryCov_9fa48("20298"), 'document'), stryMutAct_9fa48("20299") ? {} : (stryCov_9fa48("20299"), {
      configurable: stryMutAct_9fa48("20300") ? false : (stryCov_9fa48("20300"), true),
      value: stryMutAct_9fa48("20301") ? {} : (stryCov_9fa48("20301"), {
        baseURI: stryMutAct_9fa48("20302") ? "" : (stryCov_9fa48("20302"), 'https://keyconf-nightly.kvnloo.chatgpt.site/')
      })
    }));
    assert.equal(previewChannel(), stryMutAct_9fa48("20304") ? "" : (stryCov_9fa48("20304"), 'nightly'));
    assert.equal(previewStorageKey(stryMutAct_9fa48("20306") ? "" : (stryCov_9fa48("20306"), 'build')), stryMutAct_9fa48("20307") ? "" : (stryCov_9fa48("20307"), 'build:nightly'));
  }
});
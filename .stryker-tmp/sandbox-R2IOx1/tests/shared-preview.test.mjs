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
import { defaultBuild, encodeBuild } from '../lib/build.ts';
import { previewLink, sharedPreview } from '../lib/shared-preview.ts';
test(stryMutAct_9fa48("21964") ? "" : (stryCov_9fa48("21964"), 'preview links carry the same complete build without using the device-restore route'), () => {
  if (stryMutAct_9fa48("21965")) {
    {}
  } else {
    stryCov_9fa48("21965");
    const build = stryMutAct_9fa48("21966") ? {} : (stryCov_9fa48("21966"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("21967") ? "" : (stryCov_9fa48("21967"), 'Client 🪴 study')
    });
    const before = JSON.stringify(build);
    const url = new URL(previewLink(build, stryMutAct_9fa48("21968") ? "" : (stryCov_9fa48("21968"), 'https://example.com/keyconf.gen/nightly/?from=creator#studio')));
    assert.equal(url.pathname, stryMutAct_9fa48("21970") ? "" : (stryCov_9fa48("21970"), '/keyconf.gen/nightly/'));
    assert.equal(url.search, stryMutAct_9fa48("21972") ? "" : (stryCov_9fa48("21972"), '?from=creator'));
    assert.ok(stryMutAct_9fa48("21974") ? url.hash.endsWith('#preview=') : (stryCov_9fa48("21974"), url.hash.startsWith(stryMutAct_9fa48("21975") ? "" : (stryCov_9fa48("21975"), '#preview='))));
    assert.deepEqual(sharedPreview(url.hash), stryMutAct_9fa48("21977") ? {} : (stryCov_9fa48("21977"), {
      kind: stryMutAct_9fa48("21978") ? "" : (stryCov_9fa48("21978"), 'ready'),
      build
    }));
    if (stryMutAct_9fa48("21979")) {
      ;
    } else {
      stryCov_9fa48("21979");
      assert.equal(JSON.stringify(build), before);
    }
    assert.deepEqual(sharedPreview((stryMutAct_9fa48("21981") ? "" : (stryCov_9fa48("21981"), '#build=')) + encodeBuild(build)), stryMutAct_9fa48("21982") ? {} : (stryCov_9fa48("21982"), {
      kind: stryMutAct_9fa48("21983") ? "" : (stryCov_9fa48("21983"), 'none')
    }));
  }
});
test(stryMutAct_9fa48("21985") ? "" : (stryCov_9fa48("21985"), 'invalid previews recover instead of becoming the device draft'), () => {
  if (stryMutAct_9fa48("21986")) {
    {}
  } else {
    stryCov_9fa48("21986");
    for (const hash of stryMutAct_9fa48("21987") ? [] : (stryCov_9fa48("21987"), [stryMutAct_9fa48("21988") ? "" : (stryCov_9fa48("21988"), '#preview='), stryMutAct_9fa48("21989") ? "" : (stryCov_9fa48("21989"), '#preview=not-valid'), (stryMutAct_9fa48("21990") ? "" : (stryCov_9fa48("21990"), '#preview=')) + (stryMutAct_9fa48("21991") ? "" : (stryCov_9fa48("21991"), 'x')).repeat(24001)])) {
      if (stryMutAct_9fa48("21992")) {
        {}
      } else {
        stryCov_9fa48("21992");
        const result = sharedPreview(hash);
        assert.equal(result.kind, stryMutAct_9fa48("21994") ? "" : (stryCov_9fa48("21994"), 'error'));
        assert.ok(stryMutAct_9fa48("21999") ? result.message.length <= 0 : stryMutAct_9fa48("21998") ? result.message.length >= 0 : stryMutAct_9fa48("21997") ? false : stryMutAct_9fa48("21996") ? true : (stryCov_9fa48("21996", "21997", "21998", "21999"), result.message.length > 0));
        assert.equal((stryMutAct_9fa48("22001") ? "" : (stryCov_9fa48("22001"), 'build')) in result, stryMutAct_9fa48("22002") ? true : (stryCov_9fa48("22002"), false));
      }
    }
  }
});
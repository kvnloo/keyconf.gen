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
test(stryMutAct_9fa48("21895") ? "" : (stryCov_9fa48("21895"), 'preview links carry the same complete build without using the device-restore route'), () => {
  if (stryMutAct_9fa48("21896")) {
    {}
  } else {
    stryCov_9fa48("21896");
    const build = stryMutAct_9fa48("21897") ? {} : (stryCov_9fa48("21897"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("21898") ? "" : (stryCov_9fa48("21898"), 'Client 🪴 study')
    });
    const before = JSON.stringify(build);
    const url = new URL(previewLink(build, stryMutAct_9fa48("21899") ? "" : (stryCov_9fa48("21899"), 'https://example.com/keyconf.gen/nightly/?from=creator#studio')));
    assert.equal(url.pathname, stryMutAct_9fa48("21901") ? "" : (stryCov_9fa48("21901"), '/keyconf.gen/nightly/'));
    assert.equal(url.search, stryMutAct_9fa48("21903") ? "" : (stryCov_9fa48("21903"), '?from=creator'));
    assert.ok(stryMutAct_9fa48("21905") ? url.hash.endsWith('#preview=') : (stryCov_9fa48("21905"), url.hash.startsWith(stryMutAct_9fa48("21906") ? "" : (stryCov_9fa48("21906"), '#preview='))));
    assert.deepEqual(sharedPreview(url.hash), stryMutAct_9fa48("21908") ? {} : (stryCov_9fa48("21908"), {
      kind: stryMutAct_9fa48("21909") ? "" : (stryCov_9fa48("21909"), 'ready'),
      build
    }));
    if (stryMutAct_9fa48("21910")) {
      ;
    } else {
      stryCov_9fa48("21910");
      assert.equal(JSON.stringify(build), before);
    }
    assert.deepEqual(sharedPreview((stryMutAct_9fa48("21912") ? "" : (stryCov_9fa48("21912"), '#build=')) + encodeBuild(build)), stryMutAct_9fa48("21913") ? {} : (stryCov_9fa48("21913"), {
      kind: stryMutAct_9fa48("21914") ? "" : (stryCov_9fa48("21914"), 'none')
    }));
  }
});
test(stryMutAct_9fa48("21916") ? "" : (stryCov_9fa48("21916"), 'invalid previews recover instead of becoming the device draft'), () => {
  if (stryMutAct_9fa48("21917")) {
    {}
  } else {
    stryCov_9fa48("21917");
    for (const hash of stryMutAct_9fa48("21918") ? [] : (stryCov_9fa48("21918"), [stryMutAct_9fa48("21919") ? "" : (stryCov_9fa48("21919"), '#preview='), stryMutAct_9fa48("21920") ? "" : (stryCov_9fa48("21920"), '#preview=not-valid'), (stryMutAct_9fa48("21921") ? "" : (stryCov_9fa48("21921"), '#preview=')) + (stryMutAct_9fa48("21922") ? "" : (stryCov_9fa48("21922"), 'x')).repeat(24001)])) {
      if (stryMutAct_9fa48("21923")) {
        {}
      } else {
        stryCov_9fa48("21923");
        const result = sharedPreview(hash);
        assert.equal(result.kind, stryMutAct_9fa48("21925") ? "" : (stryCov_9fa48("21925"), 'error'));
        assert.ok(stryMutAct_9fa48("21930") ? result.message.length <= 0 : stryMutAct_9fa48("21929") ? result.message.length >= 0 : stryMutAct_9fa48("21928") ? false : stryMutAct_9fa48("21927") ? true : (stryCov_9fa48("21927", "21928", "21929", "21930"), result.message.length > 0));
        assert.equal((stryMutAct_9fa48("21932") ? "" : (stryCov_9fa48("21932"), 'build')) in result, stryMutAct_9fa48("21933") ? true : (stryCov_9fa48("21933"), false));
      }
    }
  }
});
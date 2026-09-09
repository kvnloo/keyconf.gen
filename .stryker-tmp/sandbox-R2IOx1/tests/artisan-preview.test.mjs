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
import { defaultBuild } from '../lib/build.ts';
import { artisanPreviewNote } from '../lib/artisan-preview.ts';
const cap = stryMutAct_9fa48("15151") ? {} : (stryCov_9fa48("15151"), {
  id: stryMutAct_9fa48("15152") ? "" : (stryCov_9fa48("15152"), 'cap'),
  productId: stryMutAct_9fa48("15153") ? "" : (stryCov_9fa48("15153"), 'jelly-key-zen-pond-v-1u'),
  quantity: 1,
  location: stryMutAct_9fa48("15154") ? {} : (stryCov_9fa48("15154"), {
    kind: stryMutAct_9fa48("15155") ? "" : (stryCov_9fa48("15155"), 'key'),
    keyId: stryMutAct_9fa48("15156") ? "" : (stryCov_9fa48("15156"), 'KeyA')
  })
});
const note = stryMutAct_9fa48("15157") ? () => undefined : (stryCov_9fa48("15157"), (() => {
  const note = (item, extra = stryMutAct_9fa48("15158") ? ["Stryker was here"] : (stryCov_9fa48("15158"), [])) => artisanPreviewNote(stryMutAct_9fa48("15159") ? {} : (stryCov_9fa48("15159"), {
    ...defaultBuild,
    accessories: stryMutAct_9fa48("15160") ? [] : (stryCov_9fa48("15160"), [item, ...extra])
  }), item.id);
  return note;
})());
test(stryMutAct_9fa48("15162") ? "" : (stryCov_9fa48("15162"), 'artisan preview explains repairable omission without asserting physical fit'), () => {
  if (stryMutAct_9fa48("15163")) {
    {}
  } else {
    stryCov_9fa48("15163");
    assert.match(note(stryMutAct_9fa48("15165") ? {} : (stryCov_9fa48("15165"), {
      ...cap,
      location: stryMutAct_9fa48("15166") ? {} : (stryCov_9fa48("15166"), {
        kind: stryMutAct_9fa48("15167") ? "" : (stryCov_9fa48("15167"), 'key'),
        keyId: stryMutAct_9fa48("15168") ? "" : (stryCov_9fa48("15168"), 'unassigned')
      })
    })), /choose a target key/);
    assert.match(note(stryMutAct_9fa48("15170") ? {} : (stryCov_9fa48("15170"), {
      ...cap,
      location: stryMutAct_9fa48("15171") ? {} : (stryCov_9fa48("15171"), {
        kind: stryMutAct_9fa48("15172") ? "" : (stryCov_9fa48("15172"), 'key'),
        keyId: stryMutAct_9fa48("15173") ? "" : (stryCov_9fa48("15173"), 'AbsentKey')
      })
    })), /absent from this layout/);
    assert.match(note(stryMutAct_9fa48("15175") ? {} : (stryCov_9fa48("15175"), {
      ...cap,
      location: stryMutAct_9fa48("15176") ? {} : (stryCov_9fa48("15176"), {
        kind: stryMutAct_9fa48("15177") ? "" : (stryCov_9fa48("15177"), 'key'),
        keyId: stryMutAct_9fa48("15178") ? "" : (stryCov_9fa48("15178"), 'Space')
      })
    })), /matching-width key/);
    assert.match(note(cap, stryMutAct_9fa48("15180") ? [] : (stryCov_9fa48("15180"), [stryMutAct_9fa48("15181") ? {} : (stryCov_9fa48("15181"), {
      ...cap,
      id: stryMutAct_9fa48("15182") ? "" : (stryCov_9fa48("15182"), 'second')
    })])), /multiple artisan selections/);
    if (stryMutAct_9fa48("15183")) {
      ;
    } else {
      stryCov_9fa48("15183");
      assert.match(note(cap), /physical clearance still need verification/);
    }
    assert.equal(artisanPreviewNote(defaultBuild, stryMutAct_9fa48("15185") ? "" : (stryCov_9fa48("15185"), 'missing')), null);
  }
});
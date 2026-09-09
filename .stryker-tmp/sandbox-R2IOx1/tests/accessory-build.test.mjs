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
import { defaultBuild, parseBuild, encodeBuild, decodeBuild, readBuildFile, buildReducer, initialHistory } from '../lib/build.ts';
import { accessoryCatalog, newAccessorySelection } from '../lib/build-accessories.ts';
test(stryMutAct_9fa48("14732") ? "" : (stryCov_9fa48("14732"), 'accessories survive portable links, files, and undo without replacing the keyset'), () => {
  if (stryMutAct_9fa48("14733")) {
    {}
  } else {
    stryCov_9fa48("14733");
    const accessories = accessoryCatalog.map(stryMutAct_9fa48("14734") ? () => undefined : (stryCov_9fa48("14734"), product => newAccessorySelection(product.id)));
    const build = stryMutAct_9fa48("14735") ? {} : (stryCov_9fa48("14735"), {
      ...defaultBuild,
      accessories
    });
    if (stryMutAct_9fa48("14736")) {
      ;
    } else {
      stryCov_9fa48("14736");
      assert.deepEqual(decodeBuild(encodeBuild(build)), build);
    }
    assert.deepEqual(readBuildFile(JSON.stringify(stryMutAct_9fa48("14738") ? {} : (stryCov_9fa48("14738"), {
      build
    }))), build);
    const changed = buildReducer(initialHistory, stryMutAct_9fa48("14739") ? {} : (stryCov_9fa48("14739"), {
      kind: stryMutAct_9fa48("14740") ? "" : (stryCov_9fa48("14740"), 'edit'),
      patch: stryMutAct_9fa48("14741") ? {} : (stryCov_9fa48("14741"), {
        accessories
      })
    }));
    if (stryMutAct_9fa48("14742")) {
      ;
    } else {
      stryCov_9fa48("14742");
      assert.deepEqual(changed.present.selection, defaultBuild.selection);
    }
    const undone = buildReducer(changed, stryMutAct_9fa48("14743") ? {} : (stryCov_9fa48("14743"), {
      kind: stryMutAct_9fa48("14744") ? "" : (stryCov_9fa48("14744"), 'undo')
    }));
    assert.deepEqual(undone.present.accessories, stryMutAct_9fa48("14746") ? ["Stryker was here"] : (stryCov_9fa48("14746"), []));
    assert.deepEqual(buildReducer(undone, stryMutAct_9fa48("14748") ? {} : (stryCov_9fa48("14748"), {
      kind: stryMutAct_9fa48("14749") ? "" : (stryCov_9fa48("14749"), 'redo')
    })).present.accessories, accessories);
  }
});
test(stryMutAct_9fa48("14751") ? "" : (stryCov_9fa48("14751"), 'older builds restore with no accessories and malformed additions fail visibly'), () => {
  if (stryMutAct_9fa48("14752")) {
    {}
  } else {
    stryCov_9fa48("14752");
    const {
      accessories: _,
      ...legacy
    } = defaultBuild;
    assert.deepEqual(parseBuild(legacy).accessories, stryMutAct_9fa48("14754") ? ["Stryker was here"] : (stryCov_9fa48("14754"), []));
    assert.throws(stryMutAct_9fa48("14756") ? () => undefined : (stryCov_9fa48("14756"), () => parseBuild(stryMutAct_9fa48("14757") ? {} : (stryCov_9fa48("14757"), {
      ...defaultBuild,
      accessories: stryMutAct_9fa48("14758") ? [] : (stryCov_9fa48("14758"), [stryMutAct_9fa48("14759") ? {} : (stryCov_9fa48("14759"), {
        productId: stryMutAct_9fa48("14760") ? "" : (stryCov_9fa48("14760"), 'invented')
      })])
    }))));
  }
});
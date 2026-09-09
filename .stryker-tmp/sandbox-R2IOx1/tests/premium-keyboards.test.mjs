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
import { comparableOffer, mostExpensiveFirst } from '../lib/premium-keyboards.ts';
const offer = stryMutAct_9fa48("21758") ? () => undefined : (stryCov_9fa48("21758"), (() => {
  const offer = (amount, changes = {}) => stryMutAct_9fa48("21759") ? {} : (stryCov_9fa48("21759"), {
    amount,
    currency: stryMutAct_9fa48("21760") ? "" : (stryCov_9fa48("21760"), 'USD'),
    kind: stryMutAct_9fa48("21761") ? "" : (stryCov_9fa48("21761"), 'complete'),
    basis: stryMutAct_9fa48("21762") ? "" : (stryCov_9fa48("21762"), 'store-listing'),
    availability: stryMutAct_9fa48("21763") ? "" : (stryCov_9fa48("21763"), 'sold-out'),
    configuration: stryMutAct_9fa48("21764") ? "" : (stryCov_9fa48("21764"), 'Bundle'),
    observedAt: stryMutAct_9fa48("21765") ? "" : (stryCov_9fa48("21765"), '2026-09-08'),
    source: stryMutAct_9fa48("21766") ? "" : (stryCov_9fa48("21766"), 'https://example.com/product'),
    ...changes
  });
  return offer;
})());
const keyboard = stryMutAct_9fa48("21767") ? () => undefined : (stryCov_9fa48("21767"), (() => {
  const keyboard = (id, offers) => stryMutAct_9fa48("21768") ? {} : (stryCov_9fa48("21768"), {
    id,
    name: id,
    brand: stryMutAct_9fa48("21769") ? "" : (stryCov_9fa48("21769"), 'Maker'),
    source: stryMutAct_9fa48("21770") ? "" : (stryCov_9fa48("21770"), 'https://example.com/product'),
    description: stryMutAct_9fa48("21771") ? "Stryker was here!" : (stryCov_9fa48("21771"), ''),
    offers,
    geometry: stryMutAct_9fa48("21772") ? {} : (stryCov_9fa48("21772"), {
      status: stryMutAct_9fa48("21773") ? "" : (stryCov_9fa48("21773"), 'unmodeled')
    })
  });
  return keyboard;
})());
const scope = stryMutAct_9fa48("21774") ? {} : (stryCov_9fa48("21774"), {
  currency: stryMutAct_9fa48("21775") ? "" : (stryCov_9fa48("21775"), 'USD'),
  kind: stryMutAct_9fa48("21776") ? "" : (stryCov_9fa48("21776"), 'complete'),
  basis: stryMutAct_9fa48("21777") ? "" : (stryCov_9fa48("21777"), 'store-listing')
});
test(stryMutAct_9fa48("21779") ? "" : (stryCov_9fa48("21779"), 'expensive ordering never compares unlike currencies, kits or historical launch prices'), () => {
  if (stryMutAct_9fa48("21780")) {
    {}
  } else {
    stryCov_9fa48("21780");
    const boards = stryMutAct_9fa48("21781") ? [] : (stryCov_9fa48("21781"), [keyboard(stryMutAct_9fa48("21782") ? "" : (stryCov_9fa48("21782"), 'unknown'), stryMutAct_9fa48("21783") ? ["Stryker was here"] : (stryCov_9fa48("21783"), [])), keyboard(stryMutAct_9fa48("21784") ? "" : (stryCov_9fa48("21784"), 'foreign'), stryMutAct_9fa48("21785") ? [] : (stryCov_9fa48("21785"), [offer(90000, stryMutAct_9fa48("21786") ? {} : (stryCov_9fa48("21786"), {
      currency: stryMutAct_9fa48("21787") ? "" : (stryCov_9fa48("21787"), 'JPY')
    }))])), keyboard(stryMutAct_9fa48("21788") ? "" : (stryCov_9fa48("21788"), 'kit'), stryMutAct_9fa48("21789") ? [] : (stryCov_9fa48("21789"), [offer(3000, stryMutAct_9fa48("21790") ? {} : (stryCov_9fa48("21790"), {
      kind: stryMutAct_9fa48("21791") ? "" : (stryCov_9fa48("21791"), 'kit')
    }))])), keyboard(stryMutAct_9fa48("21792") ? "" : (stryCov_9fa48("21792"), 'launch'), stryMutAct_9fa48("21793") ? [] : (stryCov_9fa48("21793"), [offer(5000, stryMutAct_9fa48("21794") ? {} : (stryCov_9fa48("21794"), {
      basis: stryMutAct_9fa48("21795") ? "" : (stryCov_9fa48("21795"), 'historical-launch')
    }))])), keyboard(stryMutAct_9fa48("21796") ? "" : (stryCov_9fa48("21796"), 'lower'), stryMutAct_9fa48("21797") ? [] : (stryCov_9fa48("21797"), [offer(500)])), keyboard(stryMutAct_9fa48("21798") ? "" : (stryCov_9fa48("21798"), 'higher'), stryMutAct_9fa48("21799") ? [] : (stryCov_9fa48("21799"), [offer(799)]))]);
    const ordered = mostExpensiveFirst(boards, scope);
    assert.deepEqual(stryMutAct_9fa48("21801") ? ordered.map(board => board.id) : (stryCov_9fa48("21801"), ordered.slice(0, 2).map(stryMutAct_9fa48("21802") ? () => undefined : (stryCov_9fa48("21802"), board => board.id))), stryMutAct_9fa48("21803") ? [] : (stryCov_9fa48("21803"), [stryMutAct_9fa48("21804") ? "" : (stryCov_9fa48("21804"), 'higher'), stryMutAct_9fa48("21805") ? "" : (stryCov_9fa48("21805"), 'lower')]));
    assert.equal(boards[0].id, stryMutAct_9fa48("21807") ? "" : (stryCov_9fa48("21807"), 'unknown'));
    if (stryMutAct_9fa48("21808")) {
      ;
    } else {
      stryCov_9fa48("21808");
      assert.equal(comparableOffer(boards[1], scope), null);
    }
  }
});
test(stryMutAct_9fa48("21810") ? "" : (stryCov_9fa48("21810"), 'highest listed configuration retains its identity and sold-out status'), () => {
  if (stryMutAct_9fa48("21811")) {
    {}
  } else {
    stryCov_9fa48("21811");
    const board = keyboard(stryMutAct_9fa48("21812") ? "" : (stryCov_9fa48("21812"), 'board'), stryMutAct_9fa48("21813") ? [] : (stryCov_9fa48("21813"), [offer(600), offer(799, stryMutAct_9fa48("21814") ? {} : (stryCov_9fa48("21814"), {
      configuration: stryMutAct_9fa48("21815") ? "" : (stryCov_9fa48("21815"), 'PVD bundle')
    }))]));
    assert.equal(comparableOffer(board, scope).configuration, stryMutAct_9fa48("21817") ? "" : (stryCov_9fa48("21817"), 'PVD bundle'));
    assert.equal(comparableOffer(board, scope).availability, stryMutAct_9fa48("21819") ? "" : (stryCov_9fa48("21819"), 'sold-out'));
  }
});
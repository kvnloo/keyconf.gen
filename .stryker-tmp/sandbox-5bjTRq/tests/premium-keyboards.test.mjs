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
const offer = stryMutAct_9fa48("21689") ? () => undefined : (stryCov_9fa48("21689"), (() => {
  const offer = (amount, changes = {}) => stryMutAct_9fa48("21690") ? {} : (stryCov_9fa48("21690"), {
    amount,
    currency: stryMutAct_9fa48("21691") ? "" : (stryCov_9fa48("21691"), 'USD'),
    kind: stryMutAct_9fa48("21692") ? "" : (stryCov_9fa48("21692"), 'complete'),
    basis: stryMutAct_9fa48("21693") ? "" : (stryCov_9fa48("21693"), 'store-listing'),
    availability: stryMutAct_9fa48("21694") ? "" : (stryCov_9fa48("21694"), 'sold-out'),
    configuration: stryMutAct_9fa48("21695") ? "" : (stryCov_9fa48("21695"), 'Bundle'),
    observedAt: stryMutAct_9fa48("21696") ? "" : (stryCov_9fa48("21696"), '2026-09-08'),
    source: stryMutAct_9fa48("21697") ? "" : (stryCov_9fa48("21697"), 'https://example.com/product'),
    ...changes
  });
  return offer;
})());
const keyboard = stryMutAct_9fa48("21698") ? () => undefined : (stryCov_9fa48("21698"), (() => {
  const keyboard = (id, offers) => stryMutAct_9fa48("21699") ? {} : (stryCov_9fa48("21699"), {
    id,
    name: id,
    brand: stryMutAct_9fa48("21700") ? "" : (stryCov_9fa48("21700"), 'Maker'),
    source: stryMutAct_9fa48("21701") ? "" : (stryCov_9fa48("21701"), 'https://example.com/product'),
    description: stryMutAct_9fa48("21702") ? "Stryker was here!" : (stryCov_9fa48("21702"), ''),
    offers,
    geometry: stryMutAct_9fa48("21703") ? {} : (stryCov_9fa48("21703"), {
      status: stryMutAct_9fa48("21704") ? "" : (stryCov_9fa48("21704"), 'unmodeled')
    })
  });
  return keyboard;
})());
const scope = stryMutAct_9fa48("21705") ? {} : (stryCov_9fa48("21705"), {
  currency: stryMutAct_9fa48("21706") ? "" : (stryCov_9fa48("21706"), 'USD'),
  kind: stryMutAct_9fa48("21707") ? "" : (stryCov_9fa48("21707"), 'complete'),
  basis: stryMutAct_9fa48("21708") ? "" : (stryCov_9fa48("21708"), 'store-listing')
});
test(stryMutAct_9fa48("21710") ? "" : (stryCov_9fa48("21710"), 'expensive ordering never compares unlike currencies, kits or historical launch prices'), () => {
  if (stryMutAct_9fa48("21711")) {
    {}
  } else {
    stryCov_9fa48("21711");
    const boards = stryMutAct_9fa48("21712") ? [] : (stryCov_9fa48("21712"), [keyboard(stryMutAct_9fa48("21713") ? "" : (stryCov_9fa48("21713"), 'unknown'), stryMutAct_9fa48("21714") ? ["Stryker was here"] : (stryCov_9fa48("21714"), [])), keyboard(stryMutAct_9fa48("21715") ? "" : (stryCov_9fa48("21715"), 'foreign'), stryMutAct_9fa48("21716") ? [] : (stryCov_9fa48("21716"), [offer(90000, stryMutAct_9fa48("21717") ? {} : (stryCov_9fa48("21717"), {
      currency: stryMutAct_9fa48("21718") ? "" : (stryCov_9fa48("21718"), 'JPY')
    }))])), keyboard(stryMutAct_9fa48("21719") ? "" : (stryCov_9fa48("21719"), 'kit'), stryMutAct_9fa48("21720") ? [] : (stryCov_9fa48("21720"), [offer(3000, stryMutAct_9fa48("21721") ? {} : (stryCov_9fa48("21721"), {
      kind: stryMutAct_9fa48("21722") ? "" : (stryCov_9fa48("21722"), 'kit')
    }))])), keyboard(stryMutAct_9fa48("21723") ? "" : (stryCov_9fa48("21723"), 'launch'), stryMutAct_9fa48("21724") ? [] : (stryCov_9fa48("21724"), [offer(5000, stryMutAct_9fa48("21725") ? {} : (stryCov_9fa48("21725"), {
      basis: stryMutAct_9fa48("21726") ? "" : (stryCov_9fa48("21726"), 'historical-launch')
    }))])), keyboard(stryMutAct_9fa48("21727") ? "" : (stryCov_9fa48("21727"), 'lower'), stryMutAct_9fa48("21728") ? [] : (stryCov_9fa48("21728"), [offer(500)])), keyboard(stryMutAct_9fa48("21729") ? "" : (stryCov_9fa48("21729"), 'higher'), stryMutAct_9fa48("21730") ? [] : (stryCov_9fa48("21730"), [offer(799)]))]);
    const ordered = mostExpensiveFirst(boards, scope);
    assert.deepEqual(stryMutAct_9fa48("21732") ? ordered.map(board => board.id) : (stryCov_9fa48("21732"), ordered.slice(0, 2).map(stryMutAct_9fa48("21733") ? () => undefined : (stryCov_9fa48("21733"), board => board.id))), stryMutAct_9fa48("21734") ? [] : (stryCov_9fa48("21734"), [stryMutAct_9fa48("21735") ? "" : (stryCov_9fa48("21735"), 'higher'), stryMutAct_9fa48("21736") ? "" : (stryCov_9fa48("21736"), 'lower')]));
    assert.equal(boards[0].id, stryMutAct_9fa48("21738") ? "" : (stryCov_9fa48("21738"), 'unknown'));
    if (stryMutAct_9fa48("21739")) {
      ;
    } else {
      stryCov_9fa48("21739");
      assert.equal(comparableOffer(boards[1], scope), null);
    }
  }
});
test(stryMutAct_9fa48("21741") ? "" : (stryCov_9fa48("21741"), 'highest listed configuration retains its identity and sold-out status'), () => {
  if (stryMutAct_9fa48("21742")) {
    {}
  } else {
    stryCov_9fa48("21742");
    const board = keyboard(stryMutAct_9fa48("21743") ? "" : (stryCov_9fa48("21743"), 'board'), stryMutAct_9fa48("21744") ? [] : (stryCov_9fa48("21744"), [offer(600), offer(799, stryMutAct_9fa48("21745") ? {} : (stryCov_9fa48("21745"), {
      configuration: stryMutAct_9fa48("21746") ? "" : (stryCov_9fa48("21746"), 'PVD bundle')
    }))]));
    assert.equal(comparableOffer(board, scope).configuration, stryMutAct_9fa48("21748") ? "" : (stryCov_9fa48("21748"), 'PVD bundle'));
    assert.equal(comparableOffer(board, scope).availability, stryMutAct_9fa48("21750") ? "" : (stryCov_9fa48("21750"), 'sold-out'));
  }
});
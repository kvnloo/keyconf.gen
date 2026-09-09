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
import fc from 'fast-check';
import { comparableOffer, mostExpensiveFirst } from '../lib/premium-keyboards.ts';
const offerArb = fc.record(stryMutAct_9fa48("21689") ? {} : (stryCov_9fa48("21689"), {
  amount: fc.integer(stryMutAct_9fa48("21690") ? {} : (stryCov_9fa48("21690"), {
    min: 0,
    max: 1_000_000
  })),
  currency: fc.string(stryMutAct_9fa48("21691") ? {} : (stryCov_9fa48("21691"), {
    minLength: 1,
    maxLength: 4
  })),
  kind: fc.constantFrom(stryMutAct_9fa48("21692") ? "" : (stryCov_9fa48("21692"), 'complete'), stryMutAct_9fa48("21693") ? "" : (stryCov_9fa48("21693"), 'kit')),
  basis: fc.constantFrom(stryMutAct_9fa48("21694") ? "" : (stryCov_9fa48("21694"), 'store-listing'), stryMutAct_9fa48("21695") ? "" : (stryCov_9fa48("21695"), 'historical-launch')),
  availability: fc.constantFrom(stryMutAct_9fa48("21696") ? "" : (stryCov_9fa48("21696"), 'available'), stryMutAct_9fa48("21697") ? "" : (stryCov_9fa48("21697"), 'sold-out'), stryMutAct_9fa48("21698") ? "" : (stryCov_9fa48("21698"), 'unknown')),
  configuration: fc.string(stryMutAct_9fa48("21699") ? {} : (stryCov_9fa48("21699"), {
    maxLength: 20
  })),
  observedAt: fc.string(stryMutAct_9fa48("21700") ? {} : (stryCov_9fa48("21700"), {
    minLength: 10,
    maxLength: 20
  })),
  source: fc.webUrl()
}));
test(stryMutAct_9fa48("21702") ? "" : (stryCov_9fa48("21702"), 'comparableOffer returns the highest amount within scope'), () => {
  if (stryMutAct_9fa48("21703")) {
    {}
  } else {
    stryCov_9fa48("21703");
    fc.assert(fc.property(fc.array(offerArb, stryMutAct_9fa48("21705") ? {} : (stryCov_9fa48("21705"), {
      maxLength: 10
    })), offers => {
      if (stryMutAct_9fa48("21706")) {
        {}
      } else {
        stryCov_9fa48("21706");
        const scope = stryMutAct_9fa48("21707") ? {} : (stryCov_9fa48("21707"), {
          currency: stryMutAct_9fa48("21708") ? "" : (stryCov_9fa48("21708"), 'USD'),
          kind: stryMutAct_9fa48("21709") ? "" : (stryCov_9fa48("21709"), 'complete'),
          basis: stryMutAct_9fa48("21710") ? "" : (stryCov_9fa48("21710"), 'store-listing')
        });
        const filtered = stryMutAct_9fa48("21711") ? offers : (stryCov_9fa48("21711"), offers.filter(stryMutAct_9fa48("21712") ? () => undefined : (stryCov_9fa48("21712"), o => stryMutAct_9fa48("21715") ? o.currency === 'USD' && o.kind === 'complete' || o.basis === 'store-listing' : stryMutAct_9fa48("21714") ? false : stryMutAct_9fa48("21713") ? true : (stryCov_9fa48("21713", "21714", "21715"), (stryMutAct_9fa48("21717") ? o.currency === 'USD' || o.kind === 'complete' : stryMutAct_9fa48("21716") ? true : (stryCov_9fa48("21716", "21717"), (stryMutAct_9fa48("21719") ? o.currency !== 'USD' : stryMutAct_9fa48("21718") ? true : (stryCov_9fa48("21718", "21719"), o.currency === (stryMutAct_9fa48("21720") ? "" : (stryCov_9fa48("21720"), 'USD')))) && (stryMutAct_9fa48("21722") ? o.kind !== 'complete' : stryMutAct_9fa48("21721") ? true : (stryCov_9fa48("21721", "21722"), o.kind === (stryMutAct_9fa48("21723") ? "" : (stryCov_9fa48("21723"), 'complete')))))) && (stryMutAct_9fa48("21725") ? o.basis !== 'store-listing' : stryMutAct_9fa48("21724") ? true : (stryCov_9fa48("21724", "21725"), o.basis === (stryMutAct_9fa48("21726") ? "" : (stryCov_9fa48("21726"), 'store-listing'))))))));
        const result = comparableOffer(stryMutAct_9fa48("21727") ? {} : (stryCov_9fa48("21727"), {
          offers
        }), scope);
        if (stryMutAct_9fa48("21730") ? filtered.length !== 0 : stryMutAct_9fa48("21729") ? false : stryMutAct_9fa48("21728") ? true : (stryCov_9fa48("21728", "21729", "21730"), filtered.length === 0)) {
          if (stryMutAct_9fa48("21731")) {
            {}
          } else {
            stryCov_9fa48("21731");
            if (stryMutAct_9fa48("21732")) {
              ;
            } else {
              stryCov_9fa48("21732");
              assert.equal(result, null);
            }
            return;
          }
        }
        if (stryMutAct_9fa48("21733")) {
          ;
        } else {
          stryCov_9fa48("21733");
          assert.ok(result);
        }
        const max = stryMutAct_9fa48("21734") ? Math.min(...filtered.map(o => o.amount)) : (stryCov_9fa48("21734"), Math.max(...filtered.map(stryMutAct_9fa48("21735") ? () => undefined : (stryCov_9fa48("21735"), o => o.amount))));
        if (stryMutAct_9fa48("21736")) {
          ;
        } else {
          stryCov_9fa48("21736");
          assert.equal(result.amount, max);
        }
      }
    }));
  }
});
test(stryMutAct_9fa48("21738") ? "" : (stryCov_9fa48("21738"), 'mostExpensiveFirst preserves all boards and never throws on empty input'), () => {
  if (stryMutAct_9fa48("21739")) {
    {}
  } else {
    stryCov_9fa48("21739");
    fc.assert(fc.property(fc.array(fc.record(stryMutAct_9fa48("21741") ? {} : (stryCov_9fa48("21741"), {
      id: fc.string(stryMutAct_9fa48("21742") ? {} : (stryCov_9fa48("21742"), {
        minLength: 1,
        maxLength: 10
      })),
      name: fc.string(stryMutAct_9fa48("21743") ? {} : (stryCov_9fa48("21743"), {
        minLength: 1,
        maxLength: 20
      })),
      brand: fc.string(stryMutAct_9fa48("21744") ? {} : (stryCov_9fa48("21744"), {
        minLength: 1,
        maxLength: 10
      })),
      source: fc.webUrl(),
      description: fc.string(stryMutAct_9fa48("21745") ? {} : (stryCov_9fa48("21745"), {
        maxLength: 50
      })),
      offers: fc.array(offerArb, stryMutAct_9fa48("21746") ? {} : (stryCov_9fa48("21746"), {
        maxLength: 5
      })),
      geometry: fc.constant(stryMutAct_9fa48("21747") ? {} : (stryCov_9fa48("21747"), {
        status: stryMutAct_9fa48("21748") ? "" : (stryCov_9fa48("21748"), 'unmodeled')
      }))
    })), stryMutAct_9fa48("21749") ? {} : (stryCov_9fa48("21749"), {
      maxLength: 20
    })), boards => {
      if (stryMutAct_9fa48("21750")) {
        {}
      } else {
        stryCov_9fa48("21750");
        const scope = stryMutAct_9fa48("21751") ? {} : (stryCov_9fa48("21751"), {
          currency: stryMutAct_9fa48("21752") ? "" : (stryCov_9fa48("21752"), 'USD'),
          kind: stryMutAct_9fa48("21753") ? "" : (stryCov_9fa48("21753"), 'complete'),
          basis: stryMutAct_9fa48("21754") ? "" : (stryCov_9fa48("21754"), 'store-listing')
        });
        const ordered = mostExpensiveFirst(boards, scope);
        if (stryMutAct_9fa48("21755")) {
          ;
        } else {
          stryCov_9fa48("21755");
          assert.equal(ordered.length, boards.length);
        }
        const ids = new Set(boards.map(stryMutAct_9fa48("21756") ? () => undefined : (stryCov_9fa48("21756"), b => b.id)));
        for (const b of ordered) if (stryMutAct_9fa48("21757")) {
          ;
        } else {
          stryCov_9fa48("21757");
          assert.ok(ids.has(b.id));
        }
      }
    }));
  }
});
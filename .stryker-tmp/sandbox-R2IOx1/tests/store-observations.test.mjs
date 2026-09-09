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
import { createHash } from 'node:crypto';
import snapshot from '../data/store-observations.json' with { type: 'json' };
import { storeListings, storeSource } from '../lib/store-observations.ts';
test(stryMutAct_9fa48("22182") ? "" : (stryCov_9fa48("22182"), 'published observations retain verified page hashes, option identity and original timestamps'), () => {
  if (stryMutAct_9fa48("22183")) {
    {}
  } else {
    stryCov_9fa48("22183");
    if (stryMutAct_9fa48("22184")) {
      ;
    } else {
      stryCov_9fa48("22184");
      assert.equal(snapshot.schemaVersion, 1);
    }
    assert.equal(snapshot.progress.kind, stryMutAct_9fa48("22186") ? "" : (stryCov_9fa48("22186"), 'more'));
    assert.equal(storeSource, stryMutAct_9fa48("22188") ? "" : (stryCov_9fa48("22188"), 'https://divinikey.com/collections/switches'));
    if (stryMutAct_9fa48("22189")) {
      ;
    } else {
      stryCov_9fa48("22189");
      assert.equal(storeListings.length, snapshot.observations);
    }
    assert.equal(new Set(storeListings.map(stryMutAct_9fa48("22191") ? () => undefined : (stryCov_9fa48("22191"), p => p.url + (stryMutAct_9fa48("22192") ? "" : (stryCov_9fa48("22192"), '|')) + p.sku))).size, storeListings.length);
    for (const page of snapshot.evidence) {
      if (stryMutAct_9fa48("22193")) {
        {}
      } else {
        stryCov_9fa48("22193");
        assert.equal(createHash(stryMutAct_9fa48("22195") ? "" : (stryCov_9fa48("22195"), 'sha256')).update(JSON.stringify(page.result)).digest(stryMutAct_9fa48("22196") ? "" : (stryCov_9fa48("22196"), 'hex')), page.sha256);
        for (const product of page.result.products) {
          if (stryMutAct_9fa48("22197")) {
            {}
          } else {
            stryCov_9fa48("22197");
            const listing = storeListings.find(stryMutAct_9fa48("22198") ? () => undefined : (stryCov_9fa48("22198"), p => stryMutAct_9fa48("22201") ? p.url === product.url || p.sku === product.sku : stryMutAct_9fa48("22200") ? false : stryMutAct_9fa48("22199") ? true : (stryCov_9fa48("22199", "22200", "22201"), (stryMutAct_9fa48("22203") ? p.url !== product.url : stryMutAct_9fa48("22202") ? true : (stryCov_9fa48("22202", "22203"), p.url === product.url)) && (stryMutAct_9fa48("22205") ? p.sku !== product.sku : stryMutAct_9fa48("22204") ? true : (stryCov_9fa48("22204", "22205"), p.sku === product.sku)))));
            assert.deepEqual(listing, stryMutAct_9fa48("22207") ? {} : (stryCov_9fa48("22207"), {
              ...product,
              observedAt: page.result.observedAt
            }));
          }
        }
      }
    }
  }
});
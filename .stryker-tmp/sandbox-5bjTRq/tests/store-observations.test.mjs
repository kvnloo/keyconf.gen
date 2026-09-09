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
test(stryMutAct_9fa48("22113") ? "" : (stryCov_9fa48("22113"), 'published observations retain verified page hashes, option identity and original timestamps'), () => {
  if (stryMutAct_9fa48("22114")) {
    {}
  } else {
    stryCov_9fa48("22114");
    if (stryMutAct_9fa48("22115")) {
      ;
    } else {
      stryCov_9fa48("22115");
      assert.equal(snapshot.schemaVersion, 1);
    }
    assert.equal(snapshot.progress.kind, stryMutAct_9fa48("22117") ? "" : (stryCov_9fa48("22117"), 'more'));
    assert.equal(storeSource, stryMutAct_9fa48("22119") ? "" : (stryCov_9fa48("22119"), 'https://divinikey.com/collections/switches'));
    if (stryMutAct_9fa48("22120")) {
      ;
    } else {
      stryCov_9fa48("22120");
      assert.equal(storeListings.length, snapshot.observations);
    }
    assert.equal(new Set(storeListings.map(stryMutAct_9fa48("22122") ? () => undefined : (stryCov_9fa48("22122"), p => p.url + (stryMutAct_9fa48("22123") ? "" : (stryCov_9fa48("22123"), '|')) + p.sku))).size, storeListings.length);
    for (const page of snapshot.evidence) {
      if (stryMutAct_9fa48("22124")) {
        {}
      } else {
        stryCov_9fa48("22124");
        assert.equal(createHash(stryMutAct_9fa48("22126") ? "" : (stryCov_9fa48("22126"), 'sha256')).update(JSON.stringify(page.result)).digest(stryMutAct_9fa48("22127") ? "" : (stryCov_9fa48("22127"), 'hex')), page.sha256);
        for (const product of page.result.products) {
          if (stryMutAct_9fa48("22128")) {
            {}
          } else {
            stryCov_9fa48("22128");
            const listing = storeListings.find(stryMutAct_9fa48("22129") ? () => undefined : (stryCov_9fa48("22129"), p => stryMutAct_9fa48("22132") ? p.url === product.url || p.sku === product.sku : stryMutAct_9fa48("22131") ? false : stryMutAct_9fa48("22130") ? true : (stryCov_9fa48("22130", "22131", "22132"), (stryMutAct_9fa48("22134") ? p.url !== product.url : stryMutAct_9fa48("22133") ? true : (stryCov_9fa48("22133", "22134"), p.url === product.url)) && (stryMutAct_9fa48("22136") ? p.sku !== product.sku : stryMutAct_9fa48("22135") ? true : (stryCov_9fa48("22135", "22136"), p.sku === product.sku)))));
            assert.deepEqual(listing, stryMutAct_9fa48("22138") ? {} : (stryCov_9fa48("22138"), {
              ...product,
              observedAt: page.result.observedAt
            }));
          }
        }
      }
    }
  }
});
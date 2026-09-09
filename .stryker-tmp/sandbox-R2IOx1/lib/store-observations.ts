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
import { importEndpoint } from './import-endpoint.ts';
import { parseCatalogSnapshot } from './catalog-snapshot.ts';
import { requestText } from './request-text.ts';
import snapshot from '../data/store-observations.json' with { type: 'json' };
import { isImportResult } from './import-products.ts';
export const storeSource = snapshot.source;
function pageListings(result: unknown) {
  if (stryMutAct_9fa48("14158")) {
    {}
  } else {
    stryCov_9fa48("14158");
    if (stryMutAct_9fa48("14161") ? !isImportResult(result) && result.source !== storeSource : stryMutAct_9fa48("14160") ? false : stryMutAct_9fa48("14159") ? true : (stryCov_9fa48("14159", "14160", "14161"), (stryMutAct_9fa48("14162") ? isImportResult(result) : (stryCov_9fa48("14162"), !isImportResult(result))) || (stryMutAct_9fa48("14164") ? result.source === storeSource : stryMutAct_9fa48("14163") ? false : (stryCov_9fa48("14163", "14164"), result.source !== storeSource)))) throw new Error(stryMutAct_9fa48("14166") ? "" : (stryCov_9fa48("14166"), 'Invalid store observation snapshot.'));
    return result.products.map(stryMutAct_9fa48("14167") ? () => undefined : (stryCov_9fa48("14167"), product => stryMutAct_9fa48("14168") ? {} : (stryCov_9fa48("14168"), {
      ...product,
      observedAt: result.observedAt
    })));
  }
}
export const storeListings = snapshot.evidence.flatMap(stryMutAct_9fa48("14169") ? () => undefined : (stryCov_9fa48("14169"), ({
  result
}) => pageListings(result)));
export async function loadStoreObservations(location: URL, signal: AbortSignal) {
  if (stryMutAct_9fa48("14170")) {
    {}
  } else {
    stryCov_9fa48("14170");
    try {
      if (stryMutAct_9fa48("14171")) {
        {}
      } else {
        stryCov_9fa48("14171");
        const endpoint = new URL(importEndpoint(location), location);
        endpoint.pathname = stryMutAct_9fa48("14172") ? "" : (stryCov_9fa48("14172"), '/api/catalog');
        endpoint.searchParams.set(stryMutAct_9fa48("14174") ? "" : (stryCov_9fa48("14174"), 'source'), storeSource);
        const response = await fetch(endpoint, stryMutAct_9fa48("14175") ? {} : (stryCov_9fa48("14175"), {
          signal: AbortSignal.any(stryMutAct_9fa48("14176") ? [] : (stryCov_9fa48("14176"), [signal, AbortSignal.timeout(8000)]))
        }));
        if (stryMutAct_9fa48("14179") ? false : stryMutAct_9fa48("14178") ? true : stryMutAct_9fa48("14177") ? response.ok : (stryCov_9fa48("14177", "14178", "14179"), !response.ok)) {
          if (stryMutAct_9fa48("14180")) {
            {}
          } else {
            stryCov_9fa48("14180");
            await (stryMutAct_9fa48("14181") ? response.body.cancel() : (stryCov_9fa48("14181"), response.body?.cancel()));
            throw new Error(stryMutAct_9fa48("14183") ? "" : (stryCov_9fa48("14183"), 'Hosted catalog unavailable.'));
          }
        }
        const payload = await requestText(response, 500_000);
        if (stryMutAct_9fa48("14186") ? payload !== null : stryMutAct_9fa48("14185") ? false : stryMutAct_9fa48("14184") ? true : (stryCov_9fa48("14184", "14185", "14186"), payload === null)) throw new Error(stryMutAct_9fa48("14188") ? "" : (stryCov_9fa48("14188"), 'Hosted catalog is too large.'));
        const catalog = await parseCatalogSnapshot(payload);
        if (stryMutAct_9fa48("14191") ? catalog.source === storeSource : stryMutAct_9fa48("14190") ? false : stryMutAct_9fa48("14189") ? true : (stryCov_9fa48("14189", "14190", "14191"), catalog.source !== storeSource)) throw new Error(stryMutAct_9fa48("14193") ? "" : (stryCov_9fa48("14193"), 'Unexpected catalog source.'));
        return stryMutAct_9fa48("14194") ? {} : (stryCov_9fa48("14194"), {
          origin: 'hosted' as const,
          storeSource,
          storeListings: catalog.listings
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("14195")) {
        {}
      } else {
        stryCov_9fa48("14195");
        if (stryMutAct_9fa48("14197") ? false : stryMutAct_9fa48("14196") ? true : (stryCov_9fa48("14196", "14197"), signal.aborted)) throw error;
        return stryMutAct_9fa48("14198") ? {} : (stryCov_9fa48("14198"), {
          origin: 'bundled' as const,
          storeSource,
          storeListings
        });
      }
    }
  }
}
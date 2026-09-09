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
import type { AccessoryHost } from './build-accessories.ts';
import { isQ1MaxAssembly } from './keyboard-variant.ts';
import layout from '../docs/reference-assets/keychron-q1-max-layout.json' with { type: 'json' };
const source = stryMutAct_9fa48("5088") ? "" : (stryCov_9fa48("5088"), 'https://www.keychron.com/products/keychron-aluminum-knob');
const q1MaxHost: AccessoryHost = stryMutAct_9fa48("5089") ? {} : (stryCov_9fa48("5089"), {
  id: stryMutAct_9fa48("5090") ? "" : (stryCov_9fa48("5090"), 'q1-max-ansi'),
  source: layout.source.layoutUrl,
  slots: stryMutAct_9fa48("5091") ? [] : (stryCov_9fa48("5091"), [stryMutAct_9fa48("5092") ? {} : (stryCov_9fa48("5092"), {
    id: stryMutAct_9fa48("5093") ? "" : (stryCov_9fa48("5093"), 'stock-knob'),
    kinds: stryMutAct_9fa48("5094") ? [] : (stryCov_9fa48("5094"), [stryMutAct_9fa48("5095") ? "" : (stryCov_9fa48("5095"), 'knob')]),
    capacity: 1
  })]),
  keys: layout.keys.map(stryMutAct_9fa48("5096") ? () => undefined : (stryCov_9fa48("5096"), key => stryMutAct_9fa48("5097") ? {} : (stryCov_9fa48("5097"), {
    id: key.code,
    sizeU: key.width,
    stem: null
  }))),
  claims: stryMutAct_9fa48("5098") ? [] : (stryCov_9fa48("5098"), [stryMutAct_9fa48("5099") ? {} : (stryCov_9fa48("5099"), {
    productId: stryMutAct_9fa48("5100") ? "" : (stryCov_9fa48("5100"), 'keychron-aluminum-knob'),
    locationId: stryMutAct_9fa48("5101") ? "" : (stryCov_9fa48("5101"), 'stock-knob'),
    aspect: stryMutAct_9fa48("5102") ? "" : (stryCov_9fa48("5102"), 'mount'),
    status: stryMutAct_9fa48("5103") ? "" : (stryCov_9fa48("5103"), 'confirmed'),
    reason: stryMutAct_9fa48("5104") ? "" : (stryCov_9fa48("5104"), 'Keychron lists its aluminum replacement knob for Q Max knob versions.'),
    source
  }), stryMutAct_9fa48("5105") ? {} : (stryCov_9fa48("5105"), {
    productId: stryMutAct_9fa48("5106") ? "" : (stryCov_9fa48("5106"), 'keychron-aluminum-knob'),
    locationId: stryMutAct_9fa48("5107") ? "" : (stryCov_9fa48("5107"), 'stock-knob'),
    aspect: stryMutAct_9fa48("5108") ? "" : (stryCov_9fa48("5108"), 'clearance'),
    status: stryMutAct_9fa48("5109") ? "" : (stryCov_9fa48("5109"), 'confirmed'),
    reason: stryMutAct_9fa48("5110") ? "" : (stryCov_9fa48("5110"), 'Manufacturer compatibility covers replacement of the stock knob cap.'),
    source
  })])
});
export function accessoryHost(build: Parameters<typeof isQ1MaxAssembly>[0]): AccessoryHost | undefined {
  if (stryMutAct_9fa48("5111")) {
    {}
  } else {
    stryCov_9fa48("5111");
    return isQ1MaxAssembly(build) ? q1MaxHost : undefined;
  }
}
export function documentedKeys(build: Parameters<typeof isQ1MaxAssembly>[0]) {
  if (stryMutAct_9fa48("5112")) {
    {}
  } else {
    stryCov_9fa48("5112");
    return isQ1MaxAssembly(build) ? layout.keys : undefined;
  }
}
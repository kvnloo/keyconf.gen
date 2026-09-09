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
export type KeyboardOffer = {
  amount: number;
  currency: string;
  configuration: string;
  kind: 'complete' | 'kit';
  basis: 'store-listing' | 'historical-launch';
  availability: 'available' | 'sold-out' | 'unknown';
  observedAt: string;
  source: string;
};
export type PremiumKeyboard = {
  id: string;
  brand: string;
  name: string;
  source: string;
  description: string;
  offers: KeyboardOffer[];
  geometry: {
    status: 'unmodeled';
  } | {
    status: 'modeled';
    modelId: string;
    fidelity: 'illustrative' | 'dimension-verified';
    evidence: string[];
  };
};
export type PriceScope = Pick<KeyboardOffer, 'currency' | 'kind' | 'basis'>;
export function comparableOffer(keyboard: PremiumKeyboard, scope: PriceScope) {
  if (stryMutAct_9fa48("13185")) {
    {}
  } else {
    stryCov_9fa48("13185");
    return stryMutAct_9fa48("13186") ? keyboard.offers.reduce<KeyboardOffer | null>((highest, offer) => !highest || offer.amount > highest.amount ? offer : highest, null) : (stryCov_9fa48("13186"), keyboard.offers.filter(stryMutAct_9fa48("13187") ? () => undefined : (stryCov_9fa48("13187"), offer => stryMutAct_9fa48("13190") ? offer.currency === scope.currency && offer.kind === scope.kind || offer.basis === scope.basis : stryMutAct_9fa48("13189") ? false : stryMutAct_9fa48("13188") ? true : (stryCov_9fa48("13188", "13189", "13190"), (stryMutAct_9fa48("13192") ? offer.currency === scope.currency || offer.kind === scope.kind : stryMutAct_9fa48("13191") ? true : (stryCov_9fa48("13191", "13192"), (stryMutAct_9fa48("13194") ? offer.currency !== scope.currency : stryMutAct_9fa48("13193") ? true : (stryCov_9fa48("13193", "13194"), offer.currency === scope.currency)) && (stryMutAct_9fa48("13196") ? offer.kind !== scope.kind : stryMutAct_9fa48("13195") ? true : (stryCov_9fa48("13195", "13196"), offer.kind === scope.kind)))) && (stryMutAct_9fa48("13198") ? offer.basis !== scope.basis : stryMutAct_9fa48("13197") ? true : (stryCov_9fa48("13197", "13198"), offer.basis === scope.basis))))).reduce<KeyboardOffer | null>(stryMutAct_9fa48("13199") ? () => undefined : (stryCov_9fa48("13199"), (highest, offer) => (stryMutAct_9fa48("13202") ? !highest && offer.amount > highest.amount : stryMutAct_9fa48("13201") ? false : stryMutAct_9fa48("13200") ? true : (stryCov_9fa48("13200", "13201", "13202"), (stryMutAct_9fa48("13203") ? highest : (stryCov_9fa48("13203"), !highest)) || (stryMutAct_9fa48("13206") ? offer.amount <= highest.amount : stryMutAct_9fa48("13205") ? offer.amount >= highest.amount : stryMutAct_9fa48("13204") ? false : (stryCov_9fa48("13204", "13205", "13206"), offer.amount > highest.amount)))) ? offer : highest), null));
  }
}
export function mostExpensiveFirst(keyboards: PremiumKeyboard[], scope: PriceScope) {
  if (stryMutAct_9fa48("13207")) {
    {}
  } else {
    stryCov_9fa48("13207");
    return stryMutAct_9fa48("13208") ? [...keyboards] : (stryCov_9fa48("13208"), (stryMutAct_9fa48("13209") ? [] : (stryCov_9fa48("13209"), [...keyboards])).sort((a, b) => {
      if (stryMutAct_9fa48("13210")) {
        {}
      } else {
        stryCov_9fa48("13210");
        const left = comparableOffer(a, scope);
        const right = comparableOffer(b, scope);
        if (stryMutAct_9fa48("13213") ? !left || right : stryMutAct_9fa48("13212") ? false : stryMutAct_9fa48("13211") ? true : (stryCov_9fa48("13211", "13212", "13213"), (stryMutAct_9fa48("13214") ? left : (stryCov_9fa48("13214"), !left)) && right)) return 1;
        if (stryMutAct_9fa48("13217") ? left || !right : stryMutAct_9fa48("13216") ? false : stryMutAct_9fa48("13215") ? true : (stryCov_9fa48("13215", "13216", "13217"), left && (stryMutAct_9fa48("13218") ? right : (stryCov_9fa48("13218"), !right)))) return stryMutAct_9fa48("13219") ? +1 : (stryCov_9fa48("13219"), -1);
        return stryMutAct_9fa48("13222") ? ((right?.amount ?? 0) - (left?.amount ?? 0) || a.name.localeCompare(b.name)) && a.id.localeCompare(b.id) : stryMutAct_9fa48("13221") ? false : stryMutAct_9fa48("13220") ? true : (stryCov_9fa48("13220", "13221", "13222"), (stryMutAct_9fa48("13224") ? (right?.amount ?? 0) - (left?.amount ?? 0) && a.name.localeCompare(b.name) : stryMutAct_9fa48("13223") ? false : (stryCov_9fa48("13223", "13224"), (stryMutAct_9fa48("13225") ? (right?.amount ?? 0) + (left?.amount ?? 0) : (stryCov_9fa48("13225"), (stryMutAct_9fa48("13226") ? right?.amount && 0 : (stryCov_9fa48("13226"), (stryMutAct_9fa48("13227") ? right.amount : (stryCov_9fa48("13227"), right?.amount)) ?? 0)) - (stryMutAct_9fa48("13228") ? left?.amount && 0 : (stryCov_9fa48("13228"), (stryMutAct_9fa48("13229") ? left.amount : (stryCov_9fa48("13229"), left?.amount)) ?? 0)))) || a.name.localeCompare(b.name))) || a.id.localeCompare(b.id));
      }
    }));
  }
}
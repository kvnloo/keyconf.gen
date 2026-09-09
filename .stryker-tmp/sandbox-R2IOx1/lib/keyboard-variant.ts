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
export const q1StockEncoderColor = stryMutAct_9fa48("12920") ? "" : (stryCov_9fa48("12920"), '#858887');
export function isQ1MaxAssembly(build: {
  layout: string;
  selection: {
    case: string;
    pcb: string;
    plate: string;
  };
}): boolean {
  if (stryMutAct_9fa48("12921")) {
    {}
  } else {
    stryCov_9fa48("12921");
    return stryMutAct_9fa48("12924") ? build.layout === '75' && build.selection.case === 'q1-max-case' && build.selection.pcb === 'q1-max-pcb' || build.selection.plate === 'q1-max-plate' : stryMutAct_9fa48("12923") ? false : stryMutAct_9fa48("12922") ? true : (stryCov_9fa48("12922", "12923", "12924"), (stryMutAct_9fa48("12926") ? build.layout === '75' && build.selection.case === 'q1-max-case' || build.selection.pcb === 'q1-max-pcb' : stryMutAct_9fa48("12925") ? true : (stryCov_9fa48("12925", "12926"), (stryMutAct_9fa48("12928") ? build.layout === '75' || build.selection.case === 'q1-max-case' : stryMutAct_9fa48("12927") ? true : (stryCov_9fa48("12927", "12928"), (stryMutAct_9fa48("12930") ? build.layout !== '75' : stryMutAct_9fa48("12929") ? true : (stryCov_9fa48("12929", "12930"), build.layout === (stryMutAct_9fa48("12931") ? "" : (stryCov_9fa48("12931"), '75')))) && (stryMutAct_9fa48("12933") ? build.selection.case !== 'q1-max-case' : stryMutAct_9fa48("12932") ? true : (stryCov_9fa48("12932", "12933"), build.selection.case === (stryMutAct_9fa48("12934") ? "" : (stryCov_9fa48("12934"), 'q1-max-case')))))) && (stryMutAct_9fa48("12936") ? build.selection.pcb !== 'q1-max-pcb' : stryMutAct_9fa48("12935") ? true : (stryCov_9fa48("12935", "12936"), build.selection.pcb === (stryMutAct_9fa48("12937") ? "" : (stryCov_9fa48("12937"), 'q1-max-pcb')))))) && (stryMutAct_9fa48("12939") ? build.selection.plate !== 'q1-max-plate' : stryMutAct_9fa48("12938") ? true : (stryCov_9fa48("12938", "12939"), build.selection.plate === (stryMutAct_9fa48("12940") ? "" : (stryCov_9fa48("12940"), 'q1-max-plate')))));
  }
}
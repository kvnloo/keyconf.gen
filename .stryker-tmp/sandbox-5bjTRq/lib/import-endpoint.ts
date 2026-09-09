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
export function importEndpoint(location: URL): string {
  if (stryMutAct_9fa48("10519")) {
    {}
  } else {
    stryCov_9fa48("10519");
    if (stryMutAct_9fa48("10522") ? location.hostname === 'kvnloo.github.io' : stryMutAct_9fa48("10521") ? false : stryMutAct_9fa48("10520") ? true : (stryCov_9fa48("10520", "10521", "10522"), location.hostname !== (stryMutAct_9fa48("10523") ? "" : (stryCov_9fa48("10523"), 'kvnloo.github.io')))) return stryMutAct_9fa48("10524") ? "" : (stryCov_9fa48("10524"), '/api/import');
    return (stryMutAct_9fa48("10525") ? location.pathname.endsWith('/keyconf.gen/nightly/') : (stryCov_9fa48("10525"), location.pathname.startsWith(stryMutAct_9fa48("10526") ? "" : (stryCov_9fa48("10526"), '/keyconf.gen/nightly/')))) ? stryMutAct_9fa48("10527") ? "" : (stryCov_9fa48("10527"), 'https://keyconf-nightly.kvnloo.chatgpt.site/api/import') : stryMutAct_9fa48("10528") ? "" : (stryCov_9fa48("10528"), 'https://keyconf-studio.kvnloo.chatgpt.site/api/import');
  }
}
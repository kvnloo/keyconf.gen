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
export function previewChannel(): 'dev' | 'nightly' | null {
  if (stryMutAct_9fa48("13230")) {
    {}
  } else {
    stryCov_9fa48("13230");
    if (stryMutAct_9fa48("13233") ? typeof document !== 'undefined' : stryMutAct_9fa48("13232") ? false : stryMutAct_9fa48("13231") ? true : (stryCov_9fa48("13231", "13232", "13233"), typeof document === (stryMutAct_9fa48("13234") ? "" : (stryCov_9fa48("13234"), 'undefined')))) return null;
    const url = new URL(document.baseURI);
    if (stryMutAct_9fa48("13237") ? url.hostname !== 'keyconf-nightly.kvnloo.chatgpt.site' : stryMutAct_9fa48("13236") ? false : stryMutAct_9fa48("13235") ? true : (stryCov_9fa48("13235", "13236", "13237"), url.hostname === (stryMutAct_9fa48("13238") ? "" : (stryCov_9fa48("13238"), 'keyconf-nightly.kvnloo.chatgpt.site')))) return stryMutAct_9fa48("13239") ? "" : (stryCov_9fa48("13239"), 'nightly');
    const channel = stryMutAct_9fa48("13240") ? url.pathname.match(/^\/keyconf\.gen\/(dev|nightly)\/$/)[1] : (stryCov_9fa48("13240"), url.pathname.match(stryMutAct_9fa48("13242") ? /^\/keyconf\.gen\/(dev|nightly)\// : stryMutAct_9fa48("13241") ? /\/keyconf\.gen\/(dev|nightly)\/$/ : (stryCov_9fa48("13241", "13242"), /^\/keyconf\.gen\/(dev|nightly)\/$/))?.[1]);
    return (stryMutAct_9fa48("13245") ? channel === 'dev' && channel === 'nightly' : stryMutAct_9fa48("13244") ? false : stryMutAct_9fa48("13243") ? true : (stryCov_9fa48("13243", "13244", "13245"), (stryMutAct_9fa48("13247") ? channel !== 'dev' : stryMutAct_9fa48("13246") ? false : (stryCov_9fa48("13246", "13247"), channel === (stryMutAct_9fa48("13248") ? "" : (stryCov_9fa48("13248"), 'dev')))) || (stryMutAct_9fa48("13250") ? channel !== 'nightly' : stryMutAct_9fa48("13249") ? false : (stryCov_9fa48("13249", "13250"), channel === (stryMutAct_9fa48("13251") ? "" : (stryCov_9fa48("13251"), 'nightly')))))) ? channel : null;
  }
}
export function previewStorageKey(key: string): string {
  if (stryMutAct_9fa48("13252")) {
    {}
  } else {
    stryCov_9fa48("13252");
    const channel = previewChannel();
    return channel ? stryMutAct_9fa48("13253") ? `` : (stryCov_9fa48("13253"), `${key}:${channel}`) : key;
  }
}
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
import data from '../data/sound-packs.json' with { type: 'json' };
export type KeyPhase = 'down' | 'up';
type Groups = {
  default: string[];
  Space?: string[];
  Enter?: string[];
  Backspace?: string[];
};
export type SoundPack = {
  id: string;
  name: string;
  creator: string;
  license: string;
  source: string;
  capture: string;
  groups: Record<KeyPhase, Groups>;
};
export const soundPacks: SoundPack[] = data.packs;
export function samplesFor(pack: SoundPack, code: string, phase: KeyPhase) {
  if (stryMutAct_9fa48("14132")) {
    {}
  } else {
    stryCov_9fa48("14132");
    const groups = pack.groups[phase];
    if (stryMutAct_9fa48("14135") ? code !== 'Space' : stryMutAct_9fa48("14134") ? false : stryMutAct_9fa48("14133") ? true : (stryCov_9fa48("14133", "14134", "14135"), code === (stryMutAct_9fa48("14136") ? "" : (stryCov_9fa48("14136"), 'Space')))) return stryMutAct_9fa48("14137") ? groups.Space && groups.default : (stryCov_9fa48("14137"), groups.Space ?? groups.default);
    if (stryMutAct_9fa48("14140") ? code === 'Enter' && code === 'NumpadEnter' : stryMutAct_9fa48("14139") ? false : stryMutAct_9fa48("14138") ? true : (stryCov_9fa48("14138", "14139", "14140"), (stryMutAct_9fa48("14142") ? code !== 'Enter' : stryMutAct_9fa48("14141") ? false : (stryCov_9fa48("14141", "14142"), code === (stryMutAct_9fa48("14143") ? "" : (stryCov_9fa48("14143"), 'Enter')))) || (stryMutAct_9fa48("14145") ? code !== 'NumpadEnter' : stryMutAct_9fa48("14144") ? false : (stryCov_9fa48("14144", "14145"), code === (stryMutAct_9fa48("14146") ? "" : (stryCov_9fa48("14146"), 'NumpadEnter')))))) return stryMutAct_9fa48("14147") ? groups.Enter && groups.default : (stryCov_9fa48("14147"), groups.Enter ?? groups.default);
    if (stryMutAct_9fa48("14150") ? code === 'Backspace' && code === 'Delete' : stryMutAct_9fa48("14149") ? false : stryMutAct_9fa48("14148") ? true : (stryCov_9fa48("14148", "14149", "14150"), (stryMutAct_9fa48("14152") ? code !== 'Backspace' : stryMutAct_9fa48("14151") ? false : (stryCov_9fa48("14151", "14152"), code === (stryMutAct_9fa48("14153") ? "" : (stryCov_9fa48("14153"), 'Backspace')))) || (stryMutAct_9fa48("14155") ? code !== 'Delete' : stryMutAct_9fa48("14154") ? false : (stryCov_9fa48("14154", "14155"), code === (stryMutAct_9fa48("14156") ? "" : (stryCov_9fa48("14156"), 'Delete')))))) return stryMutAct_9fa48("14157") ? groups.Backspace && groups.default : (stryCov_9fa48("14157"), groups.Backspace ?? groups.default);
    return groups.default;
  }
}
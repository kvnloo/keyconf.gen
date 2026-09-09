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
import type { Build } from './build.ts';
import { isQ1MaxAssembly } from './keyboard-variant.ts';
const geometries = ['generic-60', 'generic-65', 'generic-75', 'q1-max-ansi'] as const;
export type BuildThumbnail = {
  geometry: typeof geometries[number];
  caseColor: string;
  colors: Pick<Build['palette'], 'alpha' | 'mod' | 'accent' | 'space'>;
};
export function createBuildThumbnail(build: Parameters<typeof isQ1MaxAssembly>[0] & {
  caseColor: string;
  palette: BuildThumbnail['colors'];
}): BuildThumbnail | null {
  if (stryMutAct_9fa48("6809")) {
    {}
  } else {
    stryCov_9fa48("6809");
    const geometry = isQ1MaxAssembly(build) ? stryMutAct_9fa48("6810") ? "" : (stryCov_9fa48("6810"), 'q1-max-ansi') : geometries.find(stryMutAct_9fa48("6811") ? () => undefined : (stryCov_9fa48("6811"), value => stryMutAct_9fa48("6814") ? value !== `generic-${build.layout}` : stryMutAct_9fa48("6813") ? false : stryMutAct_9fa48("6812") ? true : (stryCov_9fa48("6812", "6813", "6814"), value === (stryMutAct_9fa48("6815") ? `` : (stryCov_9fa48("6815"), `generic-${build.layout}`)))));
    if (stryMutAct_9fa48("6818") ? false : stryMutAct_9fa48("6817") ? true : stryMutAct_9fa48("6816") ? geometry : (stryCov_9fa48("6816", "6817", "6818"), !geometry)) return null;
    return stryMutAct_9fa48("6819") ? {} : (stryCov_9fa48("6819"), {
      geometry,
      caseColor: build.caseColor,
      colors: stryMutAct_9fa48("6820") ? {} : (stryCov_9fa48("6820"), {
        alpha: build.palette.alpha,
        mod: build.palette.mod,
        accent: build.palette.accent,
        space: build.palette.space
      })
    });
  }
}
export function parseBuildThumbnail(value: unknown): BuildThumbnail | null {
  if (stryMutAct_9fa48("6821")) {
    {}
  } else {
    stryCov_9fa48("6821");
    if (stryMutAct_9fa48("6824") ? value === undefined && value === null : stryMutAct_9fa48("6823") ? false : stryMutAct_9fa48("6822") ? true : (stryCov_9fa48("6822", "6823", "6824"), (stryMutAct_9fa48("6826") ? value !== undefined : stryMutAct_9fa48("6825") ? false : (stryCov_9fa48("6825", "6826"), value === undefined)) || (stryMutAct_9fa48("6828") ? value !== null : stryMutAct_9fa48("6827") ? false : (stryCov_9fa48("6827", "6828"), value === null)))) return null;
    if (stryMutAct_9fa48("6831") ? !object(value) && !object(value.colors) : stryMutAct_9fa48("6830") ? false : stryMutAct_9fa48("6829") ? true : (stryCov_9fa48("6829", "6830", "6831"), (stryMutAct_9fa48("6832") ? object(value) : (stryCov_9fa48("6832"), !object(value))) || (stryMutAct_9fa48("6833") ? object(value.colors) : (stryCov_9fa48("6833"), !object(value.colors))))) throw invalid();
    const geometry = geometries.find(stryMutAct_9fa48("6834") ? () => undefined : (stryCov_9fa48("6834"), candidate => stryMutAct_9fa48("6837") ? candidate !== value.geometry : stryMutAct_9fa48("6836") ? false : stryMutAct_9fa48("6835") ? true : (stryCov_9fa48("6835", "6836", "6837"), candidate === value.geometry)));
    if (stryMutAct_9fa48("6840") ? false : stryMutAct_9fa48("6839") ? true : stryMutAct_9fa48("6838") ? geometry : (stryCov_9fa48("6838", "6839", "6840"), !geometry)) throw invalid();
    return stryMutAct_9fa48("6841") ? {} : (stryCov_9fa48("6841"), {
      geometry,
      caseColor: color(value.caseColor),
      colors: stryMutAct_9fa48("6842") ? {} : (stryCov_9fa48("6842"), {
        alpha: color(value.colors.alpha),
        mod: color(value.colors.mod),
        accent: color(value.colors.accent),
        space: color(value.colors.space)
      })
    });
  }
}
function object(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("6843")) {
    {}
  } else {
    stryCov_9fa48("6843");
    return stryMutAct_9fa48("6846") ? !!value && typeof value === 'object' || !Array.isArray(value) : stryMutAct_9fa48("6845") ? false : stryMutAct_9fa48("6844") ? true : (stryCov_9fa48("6844", "6845", "6846"), (stryMutAct_9fa48("6848") ? !!value || typeof value === 'object' : stryMutAct_9fa48("6847") ? true : (stryCov_9fa48("6847", "6848"), (stryMutAct_9fa48("6849") ? !value : (stryCov_9fa48("6849"), !(stryMutAct_9fa48("6850") ? value : (stryCov_9fa48("6850"), !value)))) && (stryMutAct_9fa48("6852") ? typeof value !== 'object' : stryMutAct_9fa48("6851") ? true : (stryCov_9fa48("6851", "6852"), typeof value === (stryMutAct_9fa48("6853") ? "" : (stryCov_9fa48("6853"), 'object')))))) && (stryMutAct_9fa48("6854") ? Array.isArray(value) : (stryCov_9fa48("6854"), !Array.isArray(value))));
  }
}
function color(value: unknown): string {
  if (stryMutAct_9fa48("6855")) {
    {}
  } else {
    stryCov_9fa48("6855");
    if (stryMutAct_9fa48("6858") ? typeof value !== 'string' && !/^#[\da-f]{6}$/i.test(value) : stryMutAct_9fa48("6857") ? false : stryMutAct_9fa48("6856") ? true : (stryCov_9fa48("6856", "6857", "6858"), (stryMutAct_9fa48("6860") ? typeof value === 'string' : stryMutAct_9fa48("6859") ? false : (stryCov_9fa48("6859", "6860"), typeof value !== (stryMutAct_9fa48("6861") ? "" : (stryCov_9fa48("6861"), 'string')))) || (stryMutAct_9fa48("6862") ? /^#[\da-f]{6}$/i.test(value) : (stryCov_9fa48("6862"), !(stryMutAct_9fa48("6867") ? /^#[\Da-f]{6}$/i : stryMutAct_9fa48("6866") ? /^#[^\da-f]{6}$/i : stryMutAct_9fa48("6865") ? /^#[\da-f]$/i : stryMutAct_9fa48("6864") ? /^#[\da-f]{6}/i : stryMutAct_9fa48("6863") ? /#[\da-f]{6}$/i : (stryCov_9fa48("6863", "6864", "6865", "6866", "6867"), /^#[\da-f]{6}$/i)).test(value))))) throw invalid();
    return value;
  }
}
function invalid() {
  if (stryMutAct_9fa48("6868")) {
    {}
  } else {
    stryCov_9fa48("6868");
    return new Error(stryMutAct_9fa48("6869") ? "" : (stryCov_9fa48("6869"), 'The published build preview could not be read.'));
  }
}
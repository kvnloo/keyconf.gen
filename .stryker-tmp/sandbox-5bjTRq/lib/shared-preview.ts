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
import { decodeBuild, encodeBuild, type Build } from './build.ts';
const prefix = stryMutAct_9fa48("14114") ? "" : (stryCov_9fa48("14114"), '#preview=');
export type SharedPreview = {
  kind: 'none';
} | {
  kind: 'ready';
  build: Build;
} | {
  kind: 'error';
  message: string;
};
export function sharedPreview(hash: string): SharedPreview {
  if (stryMutAct_9fa48("14115")) {
    {}
  } else {
    stryCov_9fa48("14115");
    if (stryMutAct_9fa48("14118") ? false : stryMutAct_9fa48("14117") ? true : stryMutAct_9fa48("14116") ? hash.startsWith(prefix) : (stryCov_9fa48("14116", "14117", "14118"), !(stryMutAct_9fa48("14119") ? hash.endsWith(prefix) : (stryCov_9fa48("14119"), hash.startsWith(prefix))))) return stryMutAct_9fa48("14120") ? {} : (stryCov_9fa48("14120"), {
      kind: stryMutAct_9fa48("14121") ? "" : (stryCov_9fa48("14121"), 'none')
    });
    try {
      if (stryMutAct_9fa48("14122")) {
        {}
      } else {
        stryCov_9fa48("14122");
        return stryMutAct_9fa48("14123") ? {} : (stryCov_9fa48("14123"), {
          kind: stryMutAct_9fa48("14124") ? "" : (stryCov_9fa48("14124"), 'ready'),
          build: decodeBuild(stryMutAct_9fa48("14125") ? hash : (stryCov_9fa48("14125"), hash.slice(prefix.length)))
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("14126")) {
        {}
      } else {
        stryCov_9fa48("14126");
        return stryMutAct_9fa48("14127") ? {} : (stryCov_9fa48("14127"), {
          kind: stryMutAct_9fa48("14128") ? "" : (stryCov_9fa48("14128"), 'error'),
          message: error instanceof Error ? error.message : stryMutAct_9fa48("14129") ? "" : (stryCov_9fa48("14129"), 'This preview could not be read.')
        });
      }
    }
  }
}
export function previewLink(build: Build, base: string): string {
  if (stryMutAct_9fa48("14130")) {
    {}
  } else {
    stryCov_9fa48("14130");
    const url = new URL(base);
    url.hash = stryMutAct_9fa48("14131") ? prefix - encodeBuild(build) : (stryCov_9fa48("14131"), prefix + encodeBuild(build));
    return url.href;
  }
}
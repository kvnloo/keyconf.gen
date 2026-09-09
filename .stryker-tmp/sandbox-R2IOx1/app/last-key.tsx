// @ts-nocheck
'use client';

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
import { useSyncExternalStore } from 'react';
export function createLastKey() {
  if (stryMutAct_9fa48("1833")) {
    {}
  } else {
    stryCov_9fa48("1833");
    let key = stryMutAct_9fa48("1834") ? "Stryker was here!" : (stryCov_9fa48("1834"), '');
    const listeners = new Set<() => void>();
    return stryMutAct_9fa48("1835") ? {} : (stryCov_9fa48("1835"), {
      press(code: string) {
        if (stryMutAct_9fa48("1836")) {
          {}
        } else {
          stryCov_9fa48("1836");
          const next = code.replace(stryMutAct_9fa48("1837") ? "" : (stryCov_9fa48("1837"), 'Key'), stryMutAct_9fa48("1838") ? "Stryker was here!" : (stryCov_9fa48("1838"), '')).replace(stryMutAct_9fa48("1839") ? "" : (stryCov_9fa48("1839"), 'Digit'), stryMutAct_9fa48("1840") ? "Stryker was here!" : (stryCov_9fa48("1840"), ''));
          if (stryMutAct_9fa48("1843") ? key !== next : stryMutAct_9fa48("1842") ? false : stryMutAct_9fa48("1841") ? true : (stryCov_9fa48("1841", "1842", "1843"), key === next)) return;
          key = next;
          for (const listener of listeners) if (stryMutAct_9fa48("1844")) {
            ;
          } else {
            stryCov_9fa48("1844");
            listener();
          }
        }
      },
      getSnapshot: stryMutAct_9fa48("1845") ? () => undefined : (stryCov_9fa48("1845"), () => key),
      subscribe: (listener: () => void) => {
        if (stryMutAct_9fa48("1846")) {
          {}
        } else {
          stryCov_9fa48("1846");
          if (stryMutAct_9fa48("1847")) {
            ;
          } else {
            stryCov_9fa48("1847");
            listeners.add(listener);
          }
          return stryMutAct_9fa48("1848") ? () => undefined : (stryCov_9fa48("1848"), () => listeners.delete(listener));
        }
      }
    });
  }
}
export default function LastKey({
  source
}: {
  source: ReturnType<typeof createLastKey>;
}) {
  if (stryMutAct_9fa48("1849")) {
    {}
  } else {
    stryCov_9fa48("1849");
    const key = useSyncExternalStore(source.subscribe, source.getSnapshot, source.getSnapshot);
    return <div className="last-key">
      Last key <kbd>{stryMutAct_9fa48("1852") ? key && '—' : stryMutAct_9fa48("1851") ? false : stryMutAct_9fa48("1850") ? true : (stryCov_9fa48("1850", "1851", "1852"), key || (stryMutAct_9fa48("1853") ? "" : (stryCov_9fa48("1853"), '—')))}</kbd>
    </div>;
  }
}
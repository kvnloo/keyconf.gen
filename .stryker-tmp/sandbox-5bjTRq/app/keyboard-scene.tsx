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
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { SceneOptions, SceneStatus, createKeyboardScene } from '../lib/keyboard-scene';
export type { SceneOptions } from '../lib/keyboard-scene';
export default function KeyboardScene({
  options,
  onPress,
  onRelease,
  children
}: {
  children?: ReactNode;
  options: SceneOptions;
  onPress: (code: string) => void;
  onRelease: (code: string) => void;
}) {
  if (stryMutAct_9fa48("1782")) {
    {}
  } else {
    stryCov_9fa48("1782");
    const host = useRef<HTMLFieldSetElement>(null);
    const controller = useRef<ReturnType<typeof createKeyboardScene> | null>(null);
    const latest = useRef(stryMutAct_9fa48("1783") ? {} : (stryCov_9fa48("1783"), {
      options,
      onPress,
      onRelease
    }));
    const [status, setStatus] = useState<SceneStatus>(stryMutAct_9fa48("1784") ? {} : (stryCov_9fa48("1784"), {
      kind: stryMutAct_9fa48("1785") ? "" : (stryCov_9fa48("1785"), 'loading')
    }));
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
      if (stryMutAct_9fa48("1787")) {
        {}
      } else {
        stryCov_9fa48("1787");
        latest.current = stryMutAct_9fa48("1788") ? {} : (stryCov_9fa48("1788"), {
          options,
          onPress,
          onRelease
        });
        stryMutAct_9fa48("1789") ? controller.current.update(options, {
          press: onPress,
          release: onRelease,
          status: setStatus
        }) : (stryCov_9fa48("1789"), controller.current?.update(options, stryMutAct_9fa48("1790") ? {} : (stryCov_9fa48("1790"), {
          press: onPress,
          release: onRelease,
          status: setStatus
        })));
      }
    }, stryMutAct_9fa48("1791") ? [] : (stryCov_9fa48("1791"), [options, onPress, onRelease]));
    useEffect(() => {
      if (stryMutAct_9fa48("1793")) {
        {}
      } else {
        stryCov_9fa48("1793");
        const element = host.current;
        if (stryMutAct_9fa48("1796") ? false : stryMutAct_9fa48("1795") ? true : stryMutAct_9fa48("1794") ? element : (stryCov_9fa48("1794", "1795", "1796"), !element)) return;
        let cancelled = stryMutAct_9fa48("1797") ? true : (stryCov_9fa48("1797"), false);
        void import('../lib/keyboard-scene').then(({
          createKeyboardScene
        }) => {
          if (stryMutAct_9fa48("1798")) {
            {}
          } else {
            stryCov_9fa48("1798");
            if (stryMutAct_9fa48("1800") ? false : stryMutAct_9fa48("1799") ? true : (stryCov_9fa48("1799", "1800"), cancelled)) return;
            const {
              options,
              onPress,
              onRelease
            } = latest.current;
            controller.current = createKeyboardScene(element, options, stryMutAct_9fa48("1801") ? {} : (stryCov_9fa48("1801"), {
              press: onPress,
              release: onRelease,
              status: setStatus
            }));
          }
        }).catch(() => {
          if (stryMutAct_9fa48("1802")) {
            {}
          } else {
            stryCov_9fa48("1802");
            if (stryMutAct_9fa48("1805") ? false : stryMutAct_9fa48("1804") ? true : stryMutAct_9fa48("1803") ? cancelled : (stryCov_9fa48("1803", "1804", "1805"), !cancelled)) setStatus(stryMutAct_9fa48("1807") ? {} : (stryCov_9fa48("1807"), {
              kind: stryMutAct_9fa48("1808") ? "" : (stryCov_9fa48("1808"), 'error'),
              message: stryMutAct_9fa48("1809") ? "" : (stryCov_9fa48("1809"), '3D needs a browser with hardware acceleration. Check your connection and try again.')
            }));
          }
        });
        return () => {
          if (stryMutAct_9fa48("1810")) {
            {}
          } else {
            stryCov_9fa48("1810");
            cancelled = stryMutAct_9fa48("1811") ? false : (stryCov_9fa48("1811"), true);
            stryMutAct_9fa48("1812") ? controller.current.dispose() : (stryCov_9fa48("1812"), controller.current?.dispose());
            controller.current = null;
          }
        };
      }
    }, stryMutAct_9fa48("1813") ? [] : (stryCov_9fa48("1813"), [attempt]));
    return <fieldset className="scene-host" ref={host} data-scene-status={status.kind} aria-label="Interactive keyboard preview">
      {children}
      {stryMutAct_9fa48("1816") ? status.kind === 'loading' || <output className="model-status">Preparing your keyboard…</output> : stryMutAct_9fa48("1815") ? false : stryMutAct_9fa48("1814") ? true : (stryCov_9fa48("1814", "1815", "1816"), (stryMutAct_9fa48("1818") ? status.kind !== 'loading' : stryMutAct_9fa48("1817") ? true : (stryCov_9fa48("1817", "1818"), status.kind === (stryMutAct_9fa48("1819") ? "" : (stryCov_9fa48("1819"), 'loading')))) && <output className="model-status">Preparing your keyboard…</output>)}
      {stryMutAct_9fa48("1822") ? status.kind === 'error' || <div className="model-status" role="alert">
          <p>{status.message}</p>
          <button className="button secondary" onClick={() => {
          setStatus({
            kind: 'loading'
          });
          setAttempt(n => n + 1);
        }}>
            Try 3D again
          </button>
        </div> : stryMutAct_9fa48("1821") ? false : stryMutAct_9fa48("1820") ? true : (stryCov_9fa48("1820", "1821", "1822"), (stryMutAct_9fa48("1824") ? status.kind !== 'error' : stryMutAct_9fa48("1823") ? true : (stryCov_9fa48("1823", "1824"), status.kind === (stryMutAct_9fa48("1825") ? "" : (stryCov_9fa48("1825"), 'error')))) && <div className="model-status" role="alert">
          <p>{status.message}</p>
          <button className="button secondary" onClick={() => {
          if (stryMutAct_9fa48("1826")) {
            {}
          } else {
            stryCov_9fa48("1826");
            setStatus(stryMutAct_9fa48("1828") ? {} : (stryCov_9fa48("1828"), {
              kind: stryMutAct_9fa48("1829") ? "" : (stryCov_9fa48("1829"), 'loading')
            }));
            setAttempt(stryMutAct_9fa48("1831") ? () => undefined : (stryCov_9fa48("1831"), n => stryMutAct_9fa48("1832") ? n - 1 : (stryCov_9fa48("1832"), n + 1)));
          }
        }}>
            Try 3D again
          </button>
        </div>)}
    </fieldset>;
  }
}
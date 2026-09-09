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
import { computeTheme } from '../lib/theme';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { parseTypingMessage } from '../lib/typing-test';
export default function TypingTest({
  onPress,
  onRelease,
  onExit,
  onSearch
}: {
  onPress: (code: string) => void;
  onRelease: (code: string) => void;
  onExit: () => void;
  onSearch: () => void;
}) {
  if (stryMutAct_9fa48("4839")) {
    {}
  } else {
    stryCov_9fa48("4839");
    const frame = useRef<HTMLIFrameElement>(null);
    const callbacks = useRef(stryMutAct_9fa48("4840") ? {} : (stryCov_9fa48("4840"), {
      onPress,
      onRelease,
      onSearch
    }));
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(stryMutAct_9fa48("4841") ? "" : (stryCov_9fa48("4841"), 'loading'));
    const [attempt, setAttempt] = useState(0);
    const [height, setHeight] = useState(320);
    useEffect(() => {
      if (stryMutAct_9fa48("4843")) {
        {}
      } else {
        stryCov_9fa48("4843");
        callbacks.current = stryMutAct_9fa48("4844") ? {} : (stryCov_9fa48("4844"), {
          onPress,
          onRelease,
          onSearch
        });
      }
    }, stryMutAct_9fa48("4845") ? [] : (stryCov_9fa48("4845"), [onPress, onRelease, onSearch]));
    if (stryMutAct_9fa48("4846")) {
      ;
    } else {
      stryCov_9fa48("4846");
      useEffect(() => {
        if (stryMutAct_9fa48("4847")) {
          {}
        } else {
          stryCov_9fa48("4847");
          const held = new Set<string>();
          const clear = () => {
            if (stryMutAct_9fa48("4848")) {
              {}
            } else {
              stryCov_9fa48("4848");
              for (const code of held) if (stryMutAct_9fa48("4849")) {
                ;
              } else {
                stryCov_9fa48("4849");
                callbacks.current.onRelease(code);
              }
              if (stryMutAct_9fa48("4850")) {
                ;
              } else {
                stryCov_9fa48("4850");
                held.clear();
              }
              window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("4852") ? "" : (stryCov_9fa48("4852"), 'keyconf-demo'), stryMutAct_9fa48("4853") ? {} : (stryCov_9fa48("4853"), {
                detail: stryMutAct_9fa48("4854") ? {} : (stryCov_9fa48("4854"), {
                  reset: stryMutAct_9fa48("4855") ? false : (stryCov_9fa48("4855"), true)
                })
              })));
            }
          };
          const timeout = window.setTimeout(stryMutAct_9fa48("4856") ? () => undefined : (stryCov_9fa48("4856"), () => setStatus(stryMutAct_9fa48("4857") ? "" : (stryCov_9fa48("4857"), 'error'))), 30000);
          const receive = (event: MessageEvent<unknown>) => {
            if (stryMutAct_9fa48("4858")) {
              {}
            } else {
              stryCov_9fa48("4858");
              if (stryMutAct_9fa48("4861") ? event.source !== frame.current?.contentWindow && event.origin !== window.location.origin : stryMutAct_9fa48("4860") ? false : stryMutAct_9fa48("4859") ? true : (stryCov_9fa48("4859", "4860", "4861"), (stryMutAct_9fa48("4863") ? event.source === frame.current?.contentWindow : stryMutAct_9fa48("4862") ? false : (stryCov_9fa48("4862", "4863"), event.source !== (stryMutAct_9fa48("4864") ? frame.current.contentWindow : (stryCov_9fa48("4864"), frame.current?.contentWindow)))) || (stryMutAct_9fa48("4866") ? event.origin === window.location.origin : stryMutAct_9fa48("4865") ? false : (stryCov_9fa48("4865", "4866"), event.origin !== window.location.origin)))) return;
              const message = parseTypingMessage(event.data);
              if (stryMutAct_9fa48("4869") ? false : stryMutAct_9fa48("4868") ? true : stryMutAct_9fa48("4867") ? message : (stryCov_9fa48("4867", "4868", "4869"), !message)) return;
              if (stryMutAct_9fa48("4872") ? message.event !== 'ready' : stryMutAct_9fa48("4871") ? false : stryMutAct_9fa48("4870") ? true : (stryCov_9fa48("4870", "4871", "4872"), message.event === (stryMutAct_9fa48("4873") ? "" : (stryCov_9fa48("4873"), 'ready')))) {
                if (stryMutAct_9fa48("4874")) {
                  {}
                } else {
                  stryCov_9fa48("4874");
                  if (stryMutAct_9fa48("4875")) {
                    ;
                  } else {
                    stryCov_9fa48("4875");
                    clearTimeout(timeout);
                  }
                  setStatus(stryMutAct_9fa48("4877") ? "" : (stryCov_9fa48("4877"), 'ready'));
                }
              } else if (stryMutAct_9fa48("4880") ? message.event !== 'height' : stryMutAct_9fa48("4879") ? false : stryMutAct_9fa48("4878") ? true : (stryCov_9fa48("4878", "4879", "4880"), message.event === (stryMutAct_9fa48("4881") ? "" : (stryCov_9fa48("4881"), 'height')))) {
                if (stryMutAct_9fa48("4882")) {
                  ;
                } else {
                  stryCov_9fa48("4882");
                  setHeight(message.height);
                }
              } else if (stryMutAct_9fa48("4885") ? message.event !== 'clear' : stryMutAct_9fa48("4884") ? false : stryMutAct_9fa48("4883") ? true : (stryCov_9fa48("4883", "4884", "4885"), message.event === (stryMutAct_9fa48("4886") ? "" : (stryCov_9fa48("4886"), 'clear')))) {
                if (stryMutAct_9fa48("4887")) {
                  ;
                } else {
                  stryCov_9fa48("4887");
                  clear();
                }
              } else if (stryMutAct_9fa48("4890") ? message.event !== 'key' : stryMutAct_9fa48("4889") ? false : stryMutAct_9fa48("4888") ? true : (stryCov_9fa48("4888", "4889", "4890"), message.event === (stryMutAct_9fa48("4891") ? "" : (stryCov_9fa48("4891"), 'key')))) {
                if (stryMutAct_9fa48("4892")) {
                  {}
                } else {
                  stryCov_9fa48("4892");
                  if (stryMutAct_9fa48("4894") ? false : stryMutAct_9fa48("4893") ? true : (stryCov_9fa48("4893", "4894"), message.down)) {
                    if (stryMutAct_9fa48("4895")) {
                      {}
                    } else {
                      stryCov_9fa48("4895");
                      if (stryMutAct_9fa48("4897") ? false : stryMutAct_9fa48("4896") ? true : (stryCov_9fa48("4896", "4897"), held.has(message.code))) return;
                      if (stryMutAct_9fa48("4898")) {
                        ;
                      } else {
                        stryCov_9fa48("4898");
                        held.add(message.code);
                      }
                      if (stryMutAct_9fa48("4899")) {
                        ;
                      } else {
                        stryCov_9fa48("4899");
                        callbacks.current.onPress(message.code);
                      }
                    }
                  } else {
                    if (stryMutAct_9fa48("4900")) {
                      {}
                    } else {
                      stryCov_9fa48("4900");
                      if (stryMutAct_9fa48("4903") ? false : stryMutAct_9fa48("4902") ? true : stryMutAct_9fa48("4901") ? held.delete(message.code) : (stryCov_9fa48("4901", "4902", "4903"), !held.delete(message.code))) return;
                      if (stryMutAct_9fa48("4904")) {
                        ;
                      } else {
                        stryCov_9fa48("4904");
                        callbacks.current.onRelease(message.code);
                      }
                    }
                  }
                  window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("4906") ? "" : (stryCov_9fa48("4906"), 'keyconf-demo'), stryMutAct_9fa48("4907") ? {} : (stryCov_9fa48("4907"), {
                    detail: message
                  })));
                }
              }
            }
          };
          window.addEventListener(stryMutAct_9fa48("4909") ? "" : (stryCov_9fa48("4909"), 'message'), receive);
          return () => {
            if (stryMutAct_9fa48("4910")) {
              {}
            } else {
              stryCov_9fa48("4910");
              if (stryMutAct_9fa48("4911")) {
                ;
              } else {
                stryCov_9fa48("4911");
                clearTimeout(timeout);
              }
              window.removeEventListener(stryMutAct_9fa48("4913") ? "" : (stryCov_9fa48("4913"), 'message'), receive);
              if (stryMutAct_9fa48("4914")) {
                ;
              } else {
                stryCov_9fa48("4914");
                clear();
              }
            }
          };
        }
      }, stryMutAct_9fa48("4915") ? [] : (stryCov_9fa48("4915"), [attempt]));
    }
    return <section className="typing-widget" aria-label="Monkeytype typing test">
      <div className="typing-heading">
        <button className="button secondary compact" onClick={onExit}>
          <ArrowLeft size={16} /> Back to builder
        </button>
        <div className="typing-title">
          <strong>Monkeytype</strong>
          <span>Guest test</span>
        </div>
        <a href="https://monkeytype.com/" target="_blank" rel="noreferrer">
          Open Monkeytype <ArrowUpRight size={14} />
        </a>
      </div>
      {/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Keyboard users need to scroll this monitor viewport to reach results. */}
      <section className="monitor-display" tabIndex={0} aria-label="Monitor screen. Scroll for test results and settings.">
        {stryMutAct_9fa48("4918") ? status !== 'ready' || <div className="typing-load" role={status === 'error' ? 'alert' : 'status'}>
            {status === 'loading' ? 'Preparing your typing test…' : <>
                <p>The typing test could not load.</p>
                <button className="button secondary" onClick={() => {
              setStatus('loading');
              setAttempt(n => n + 1);
            }}>
                  <RotateCcw size={16} /> Retry typing test
                </button>
              </>}
          </div> : stryMutAct_9fa48("4917") ? false : stryMutAct_9fa48("4916") ? true : (stryCov_9fa48("4916", "4917", "4918"), (stryMutAct_9fa48("4920") ? status === 'ready' : stryMutAct_9fa48("4919") ? true : (stryCov_9fa48("4919", "4920"), status !== (stryMutAct_9fa48("4921") ? "" : (stryCov_9fa48("4921"), 'ready')))) && <div className="typing-load" role={(stryMutAct_9fa48("4924") ? status !== 'error' : stryMutAct_9fa48("4923") ? false : stryMutAct_9fa48("4922") ? true : (stryCov_9fa48("4922", "4923", "4924"), status === (stryMutAct_9fa48("4925") ? "" : (stryCov_9fa48("4925"), 'error')))) ? stryMutAct_9fa48("4926") ? "" : (stryCov_9fa48("4926"), 'alert') : stryMutAct_9fa48("4927") ? "" : (stryCov_9fa48("4927"), 'status')}>
            {(stryMutAct_9fa48("4930") ? status !== 'loading' : stryMutAct_9fa48("4929") ? false : stryMutAct_9fa48("4928") ? true : (stryCov_9fa48("4928", "4929", "4930"), status === (stryMutAct_9fa48("4931") ? "" : (stryCov_9fa48("4931"), 'loading')))) ? stryMutAct_9fa48("4932") ? "" : (stryCov_9fa48("4932"), 'Preparing your typing test…') : <>
                <p>The typing test could not load.</p>
                <button className="button secondary" onClick={() => {
              if (stryMutAct_9fa48("4933")) {
                {}
              } else {
                stryCov_9fa48("4933");
                setStatus(stryMutAct_9fa48("4935") ? "" : (stryCov_9fa48("4935"), 'loading'));
                setAttempt(stryMutAct_9fa48("4937") ? () => undefined : (stryCov_9fa48("4937"), n => stryMutAct_9fa48("4938") ? n - 1 : (stryCov_9fa48("4938"), n + 1)));
              }
            }}>
                  <RotateCcw size={16} /> Retry typing test
                </button>
              </>}
          </div>)}
        <iframe key={attempt} ref={frame} src="monkeytype/index.html" title="Monkeytype guest typing test" className="typing-frame" style={stryMutAct_9fa48("4939") ? {} : (stryCov_9fa48("4939"), {
          height
        })} onLoad={() => {
          if (stryMutAct_9fa48("4940")) {
            {}
          } else {
            stryCov_9fa48("4940");
            const document = stryMutAct_9fa48("4941") ? frame.current.contentDocument : (stryCov_9fa48("4941"), frame.current?.contentDocument);
            if (stryMutAct_9fa48("4944") ? false : stryMutAct_9fa48("4943") ? true : stryMutAct_9fa48("4942") ? document?.head : (stryCov_9fa48("4942", "4943", "4944"), !(stryMutAct_9fa48("4945") ? document.head : (stryCov_9fa48("4945"), document?.head)))) return;
            const theme = document.createElement(stryMutAct_9fa48("4946") ? "" : (stryCov_9fa48("4946"), 'style'));
            try {
              if (stryMutAct_9fa48("4947")) {
                {}
              } else {
                stryCov_9fa48("4947");
                const dataAttr = document.documentElement.getAttribute(stryMutAct_9fa48("4948") ? "" : (stryCov_9fa48("4948"), 'data-palette'));
                if (stryMutAct_9fa48("4950") ? false : stryMutAct_9fa48("4949") ? true : (stryCov_9fa48("4949", "4950"), dataAttr)) {
                  if (stryMutAct_9fa48("4951")) {
                    {}
                  } else {
                    stryCov_9fa48("4951");
                    const p = JSON.parse(dataAttr);
                    theme.textContent = computeTheme(p).theme;
                  }
                } else {
                  if (stryMutAct_9fa48("4952")) {
                    {}
                  } else {
                    stryCov_9fa48("4952");
                    theme.textContent = stryMutAct_9fa48("4953") ? `` : (stryCov_9fa48("4953"), `:root { --bg-color: #18221c !important; --main-color: #d7dfbb !important; --caret-color: #e5c788 !important; --sub-color: #a0b29e !important; --sub-alt-color: #223229 !important; --text-color: #f1eedf !important; --error-color: #f29581 !important; --error-extra-color: #c95d4b !important; }`);
                  }
                }
              }
            } catch {
              if (stryMutAct_9fa48("4954")) {
                {}
              } else {
                stryCov_9fa48("4954");
                theme.textContent = stryMutAct_9fa48("4955") ? `` : (stryCov_9fa48("4955"), `:root { --bg-color: #18221c !important; --main-color: #d7dfbb !important; --caret-color: #e5c788 !important; --sub-color: #a0b29e !important; --sub-alt-color: #223229 !important; --text-color: #f1eedf !important; --error-color: #f29581 !important; --error-extra-color: #c95d4b !important; }`);
              }
            }
            if (stryMutAct_9fa48("4956")) {
              ;
            } else {
              stryCov_9fa48("4956");
              document.head.appendChild(theme);
            }
            document.addEventListener(stryMutAct_9fa48("4958") ? "" : (stryCov_9fa48("4958"), 'keydown'), event => {
              if (stryMutAct_9fa48("4959")) {
                {}
              } else {
                stryCov_9fa48("4959");
                if (stryMutAct_9fa48("4962") ? (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && !event.isComposing || event.key.toLowerCase() === 'k' : stryMutAct_9fa48("4961") ? false : stryMutAct_9fa48("4960") ? true : (stryCov_9fa48("4960", "4961", "4962"), (stryMutAct_9fa48("4964") ? (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey || !event.isComposing : stryMutAct_9fa48("4963") ? true : (stryCov_9fa48("4963", "4964"), (stryMutAct_9fa48("4966") ? (event.ctrlKey || event.metaKey) && !event.altKey || !event.shiftKey : stryMutAct_9fa48("4965") ? true : (stryCov_9fa48("4965", "4966"), (stryMutAct_9fa48("4968") ? event.ctrlKey || event.metaKey || !event.altKey : stryMutAct_9fa48("4967") ? true : (stryCov_9fa48("4967", "4968"), (stryMutAct_9fa48("4970") ? event.ctrlKey && event.metaKey : stryMutAct_9fa48("4969") ? true : (stryCov_9fa48("4969", "4970"), event.ctrlKey || event.metaKey)) && (stryMutAct_9fa48("4971") ? event.altKey : (stryCov_9fa48("4971"), !event.altKey)))) && (stryMutAct_9fa48("4972") ? event.shiftKey : (stryCov_9fa48("4972"), !event.shiftKey)))) && (stryMutAct_9fa48("4973") ? event.isComposing : (stryCov_9fa48("4973"), !event.isComposing)))) && (stryMutAct_9fa48("4975") ? event.key.toLowerCase() !== 'k' : stryMutAct_9fa48("4974") ? true : (stryCov_9fa48("4974", "4975"), (stryMutAct_9fa48("4976") ? event.key.toUpperCase() : (stryCov_9fa48("4976"), event.key.toLowerCase())) === (stryMutAct_9fa48("4977") ? "" : (stryCov_9fa48("4977"), 'k')))))) {
                  if (stryMutAct_9fa48("4978")) {
                    {}
                  } else {
                    stryCov_9fa48("4978");
                    if (stryMutAct_9fa48("4979")) {
                      ;
                    } else {
                      stryCov_9fa48("4979");
                      event.preventDefault();
                    }
                    if (stryMutAct_9fa48("4980")) {
                      ;
                    } else {
                      stryCov_9fa48("4980");
                      event.stopImmediatePropagation();
                    }
                    if (stryMutAct_9fa48("4981")) {
                      ;
                    } else {
                      stryCov_9fa48("4981");
                      callbacks.current.onSearch();
                    }
                  }
                }
              }
            }, stryMutAct_9fa48("4982") ? false : (stryCov_9fa48("4982"), true));
          }
        }} onError={stryMutAct_9fa48("4983") ? () => undefined : (stryCov_9fa48("4983"), () => setStatus(stryMutAct_9fa48("4984") ? "" : (stryCov_9fa48("4984"), 'error')))} />
      </section>
      {/* oxlint-enable jsx-a11y/no-noninteractive-tabindex */}
      <div className="typing-footer">
        <span>Type to begin. Your keyboard responds below.</span>
        <a href="monkeytype/source.html" target="_blank" rel="noreferrer">
          Monkeytype source · GPLv3
        </a>
      </div>
    </section>;
  }
}
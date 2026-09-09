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
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Download, Layers, RotateCcw, Share2, Undo2, Redo2 } from 'lucide-react';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import { useHistoryShortcuts } from './use-history-shortcuts';
import { previewStorageKey } from '../lib/preview-storage';
import PreviewLabel from './preview-label';
import { controlDecks, deckLighting, encodeDeck, newDeck, parseDeck, type DeckBuild } from '../lib/control-deck';
import './control-deck-studio.css';
type History = {
  present: DeckBuild;
  past: DeckBuild[];
  future: DeckBuild[];
  group: string | null;
};
type Action = {
  kind: 'edit';
  patch: Partial<DeckBuild>;
  group?: string;
} | {
  kind: 'undo';
} | {
  kind: 'redo';
} | {
  kind: 'commit';
};
function reduce(state: History, action: Action): History {
  if (stryMutAct_9fa48("995")) {
    {}
  } else {
    stryCov_9fa48("995");
    if (stryMutAct_9fa48("998") ? action.kind !== 'commit' : stryMutAct_9fa48("997") ? false : stryMutAct_9fa48("996") ? true : (stryCov_9fa48("996", "997", "998"), action.kind === (stryMutAct_9fa48("999") ? "" : (stryCov_9fa48("999"), 'commit')))) return stryMutAct_9fa48("1000") ? {} : (stryCov_9fa48("1000"), {
      ...state,
      group: null
    });
    if (stryMutAct_9fa48("1003") ? action.kind !== 'undo' : stryMutAct_9fa48("1002") ? false : stryMutAct_9fa48("1001") ? true : (stryCov_9fa48("1001", "1002", "1003"), action.kind === (stryMutAct_9fa48("1004") ? "" : (stryCov_9fa48("1004"), 'undo')))) {
      if (stryMutAct_9fa48("1005")) {
        {}
      } else {
        stryCov_9fa48("1005");
        const previous = state.past.at(stryMutAct_9fa48("1006") ? +1 : (stryCov_9fa48("1006"), -1));
        return previous ? stryMutAct_9fa48("1007") ? {} : (stryCov_9fa48("1007"), {
          present: previous,
          past: stryMutAct_9fa48("1008") ? state.past : (stryCov_9fa48("1008"), state.past.slice(0, stryMutAct_9fa48("1009") ? +1 : (stryCov_9fa48("1009"), -1))),
          future: stryMutAct_9fa48("1010") ? [] : (stryCov_9fa48("1010"), [state.present, ...state.future]),
          group: null
        }) : state;
      }
    }
    if (stryMutAct_9fa48("1013") ? action.kind !== 'redo' : stryMutAct_9fa48("1012") ? false : stryMutAct_9fa48("1011") ? true : (stryCov_9fa48("1011", "1012", "1013"), action.kind === (stryMutAct_9fa48("1014") ? "" : (stryCov_9fa48("1014"), 'redo')))) {
      if (stryMutAct_9fa48("1015")) {
        {}
      } else {
        stryCov_9fa48("1015");
        const next = state.future[0];
        return next ? stryMutAct_9fa48("1016") ? {} : (stryCov_9fa48("1016"), {
          present: next,
          past: stryMutAct_9fa48("1017") ? [] : (stryCov_9fa48("1017"), [...state.past, state.present]),
          future: stryMutAct_9fa48("1018") ? state.future : (stryCov_9fa48("1018"), state.future.slice(1)),
          group: null
        }) : state;
      }
    }
    const present = stryMutAct_9fa48("1019") ? {} : (stryCov_9fa48("1019"), {
      ...state.present,
      ...action.patch
    });
    if (stryMutAct_9fa48("1022") ? JSON.stringify(present) !== JSON.stringify(state.present) : stryMutAct_9fa48("1021") ? false : stryMutAct_9fa48("1020") ? true : (stryCov_9fa48("1020", "1021", "1022"), JSON.stringify(present) === JSON.stringify(state.present))) return state;
    return stryMutAct_9fa48("1023") ? {} : (stryCov_9fa48("1023"), {
      present,
      past: (stryMutAct_9fa48("1026") ? action.group || action.group === state.group : stryMutAct_9fa48("1025") ? false : stryMutAct_9fa48("1024") ? true : (stryCov_9fa48("1024", "1025", "1026"), action.group && (stryMutAct_9fa48("1028") ? action.group !== state.group : stryMutAct_9fa48("1027") ? true : (stryCov_9fa48("1027", "1028"), action.group === state.group)))) ? state.past : stryMutAct_9fa48("1029") ? [] : (stryCov_9fa48("1029"), [...(stryMutAct_9fa48("1030") ? state.past : (stryCov_9fa48("1030"), state.past.slice(stryMutAct_9fa48("1031") ? +59 : (stryCov_9fa48("1031"), -59)))), state.present]),
      future: stryMutAct_9fa48("1032") ? ["Stryker was here"] : (stryCov_9fa48("1032"), []),
      group: stryMutAct_9fa48("1033") ? action.group && null : (stryCov_9fa48("1033"), action.group ?? null)
    });
  }
}
export default function ControlDeckStudio({
  initial,
  restoreLocal,
  onChange
}: {
  initial: DeckBuild;
  restoreLocal: boolean;
  onChange: (build: DeckBuild) => void;
}) {
  if (stryMutAct_9fa48("1034")) {
    {}
  } else {
    stryCov_9fa48("1034");
    const storageKey = previewStorageKey((stryMutAct_9fa48("1035") ? "" : (stryCov_9fa48("1035"), 'keyconf-deck-v1-')) + initial.device);
    const [restoration] = useState(() => {
      if (stryMutAct_9fa48("1036")) {
        {}
      } else {
        stryCov_9fa48("1036");
        if (stryMutAct_9fa48("1039") ? restoreLocal || typeof window !== 'undefined' : stryMutAct_9fa48("1038") ? false : stryMutAct_9fa48("1037") ? true : (stryCov_9fa48("1037", "1038", "1039"), restoreLocal && (stryMutAct_9fa48("1041") ? typeof window === 'undefined' : stryMutAct_9fa48("1040") ? true : (stryCov_9fa48("1040", "1041"), typeof window !== (stryMutAct_9fa48("1042") ? "" : (stryCov_9fa48("1042"), 'undefined')))))) {
          if (stryMutAct_9fa48("1043")) {
            {}
          } else {
            stryCov_9fa48("1043");
            try {
              if (stryMutAct_9fa48("1044")) {
                {}
              } else {
                stryCov_9fa48("1044");
                const raw = localStorage.getItem(storageKey);
                if (stryMutAct_9fa48("1046") ? false : stryMutAct_9fa48("1045") ? true : (stryCov_9fa48("1045", "1046"), raw)) {
                  if (stryMutAct_9fa48("1047")) {
                    {}
                  } else {
                    stryCov_9fa48("1047");
                    const build = parseDeck(JSON.parse(raw));
                    if (stryMutAct_9fa48("1050") ? build.device === initial.device : stryMutAct_9fa48("1049") ? false : stryMutAct_9fa48("1048") ? true : (stryCov_9fa48("1048", "1049", "1050"), build.device !== initial.device)) throw new Error(stryMutAct_9fa48("1052") ? "" : (stryCov_9fa48("1052"), 'Wrong device'));
                    return stryMutAct_9fa48("1053") ? {} : (stryCov_9fa48("1053"), {
                      build,
                      message: stryMutAct_9fa48("1054") ? "Stryker was here!" : (stryCov_9fa48("1054"), '')
                    });
                  }
                }
              }
            } catch {
              if (stryMutAct_9fa48("1055")) {
                {}
              } else {
                stryCov_9fa48("1055");
                return stryMutAct_9fa48("1056") ? {} : (stryCov_9fa48("1056"), {
                  build: initial,
                  message: stryMutAct_9fa48("1057") ? "" : (stryCov_9fa48("1057"), 'Your saved deck could not be restored. The original preset is open.')
                });
              }
            }
          }
        }
        return stryMutAct_9fa48("1058") ? {} : (stryCov_9fa48("1058"), {
          build: initial,
          message: stryMutAct_9fa48("1059") ? "Stryker was here!" : (stryCov_9fa48("1059"), '')
        });
      }
    });
    const [history, dispatch] = useReducer(reduce, stryMutAct_9fa48("1060") ? {} : (stryCov_9fa48("1060"), {
      present: restoration.build,
      past: stryMutAct_9fa48("1061") ? ["Stryker was here"] : (stryCov_9fa48("1061"), []),
      future: stryMutAct_9fa48("1062") ? ["Stryker was here"] : (stryCov_9fa48("1062"), []),
      group: null
    }));
    const build = history.present;
    useHistoryShortcuts(stryMutAct_9fa48("1064") ? false : (stryCov_9fa48("1064"), true), dispatch);
    const preset = controlDecks[build.device];
    const [persisted, setPersisted] = useState<{
      build: DeckBuild;
      status: 'saved' | 'unavailable';
    } | null>(null);
    const saved = (stryMutAct_9fa48("1067") ? persisted?.build !== build : stryMutAct_9fa48("1066") ? false : stryMutAct_9fa48("1065") ? true : (stryCov_9fa48("1065", "1066", "1067"), (stryMutAct_9fa48("1068") ? persisted.build : (stryCov_9fa48("1068"), persisted?.build)) === build)) ? persisted.status : stryMutAct_9fa48("1069") ? "" : (stryCov_9fa48("1069"), 'saving');
    const [notice, setNotice] = useState(restoration.message);
    const [shareUrl, setShareUrl] = useState(stryMutAct_9fa48("1070") ? "Stryker was here!" : (stryCov_9fa48("1070"), ''));
    const [exploded, setExploded] = useState(stryMutAct_9fa48("1071") ? true : (stryCov_9fa48("1071"), false));
    const [view, setView] = useState(stryMutAct_9fa48("1072") ? "" : (stryCov_9fa48("1072"), 'perspective'));
    const [lastKey, setLastKey] = useState(stryMutAct_9fa48("1073") ? "Stryker was here!" : (stryCov_9fa48("1073"), ''));
    const latestSavedBuild = useRef<DeckBuild | null>(null);
    const openFile = useRef<HTMLInputElement>(null);
    useEffect(stryMutAct_9fa48("1075") ? () => undefined : (stryCov_9fa48("1075"), () => () => {
      if (stryMutAct_9fa48("1076")) {
        {}
      } else {
        stryCov_9fa48("1076");
        if (stryMutAct_9fa48("1078") ? false : stryMutAct_9fa48("1077") ? true : (stryCov_9fa48("1077", "1078"), latestSavedBuild.current)) {
          if (stryMutAct_9fa48("1079")) {
            {}
          } else {
            stryCov_9fa48("1079");
            try {
              if (stryMutAct_9fa48("1080")) {
                {}
              } else {
                stryCov_9fa48("1080");
                if (stryMutAct_9fa48("1081")) {
                  ;
                } else {
                  stryCov_9fa48("1081");
                  localStorage.setItem(storageKey, JSON.stringify(latestSavedBuild.current));
                }
              }
            } catch {
              /* The active session already exposes storage failures. */
            }
          }
        }
      }
    }), stryMutAct_9fa48("1082") ? [] : (stryCov_9fa48("1082"), [storageKey]));
    useEffect(() => {
      if (stryMutAct_9fa48("1084")) {
        {}
      } else {
        stryCov_9fa48("1084");
        latestSavedBuild.current = build;
        if (stryMutAct_9fa48("1085")) {
          ;
        } else {
          stryCov_9fa48("1085");
          onChange(build);
        }
        const save = () => {
          if (stryMutAct_9fa48("1086")) {
            {}
          } else {
            stryCov_9fa48("1086");
            try {
              if (stryMutAct_9fa48("1087")) {
                {}
              } else {
                stryCov_9fa48("1087");
                if (stryMutAct_9fa48("1088")) {
                  ;
                } else {
                  stryCov_9fa48("1088");
                  localStorage.setItem(storageKey, JSON.stringify(build));
                }
                setPersisted(stryMutAct_9fa48("1090") ? {} : (stryCov_9fa48("1090"), {
                  build,
                  status: stryMutAct_9fa48("1091") ? "" : (stryCov_9fa48("1091"), 'saved')
                }));
              }
            } catch {
              if (stryMutAct_9fa48("1092")) {
                {}
              } else {
                stryCov_9fa48("1092");
                setPersisted(stryMutAct_9fa48("1094") ? {} : (stryCov_9fa48("1094"), {
                  build,
                  status: stryMutAct_9fa48("1095") ? "" : (stryCov_9fa48("1095"), 'unavailable')
                }));
              }
            }
          }
        };
        const timer = setTimeout(save, 250);
        window.addEventListener(stryMutAct_9fa48("1097") ? "" : (stryCov_9fa48("1097"), 'pagehide'), save);
        return () => {
          if (stryMutAct_9fa48("1098")) {
            {}
          } else {
            stryCov_9fa48("1098");
            if (stryMutAct_9fa48("1099")) {
              ;
            } else {
              stryCov_9fa48("1099");
              clearTimeout(timer);
            }
            window.removeEventListener(stryMutAct_9fa48("1101") ? "" : (stryCov_9fa48("1101"), 'pagehide'), save);
          }
        };
      }
    }, stryMutAct_9fa48("1102") ? [] : (stryCov_9fa48("1102"), [build, storageKey, onChange]));
    const options = useMemo<SceneOptions>(stryMutAct_9fa48("1103") ? () => undefined : (stryCov_9fa48("1103"), () => stryMutAct_9fa48("1104") ? {} : (stryCov_9fa48("1104"), {
      device: stryMutAct_9fa48("1105") ? {} : (stryCov_9fa48("1105"), {
        kind: stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), 'control-deck'),
        model: build.device,
        dial: build.dial,
        lighting: build.lighting
      }),
      alpha: build.colors.keys,
      mod: build.colors.commands,
      space: build.colors.wide,
      accent: build.colors.keys,
      caseColor: build.colors.case,
      finish: stryMutAct_9fa48("1107") ? "" : (stryCov_9fa48("1107"), 'Aluminum'),
      profile: stryMutAct_9fa48("1108") ? "" : (stryCov_9fa48("1108"), 'Sculpted'),
      exploded,
      view,
      environment: stryMutAct_9fa48("1109") ? "" : (stryCov_9fa48("1109"), 'studio')
    })), stryMutAct_9fa48("1110") ? [] : (stryCov_9fa48("1110"), [build, exploded, view]));
    async function share() {
      if (stryMutAct_9fa48("1111")) {
        {}
      } else {
        stryCov_9fa48("1111");
        const url = new URL(location.href);
        url.hash = (stryMutAct_9fa48("1112") ? "" : (stryCov_9fa48("1112"), 'deck=')) + encodeDeck(build);
        if (stryMutAct_9fa48("1113")) {
          ;
        } else {
          stryCov_9fa48("1113");
          setShareUrl(url.href);
        }
        try {
          if (stryMutAct_9fa48("1114")) {
            {}
          } else {
            stryCov_9fa48("1114");
            await navigator.clipboard.writeText(url.href);
            setNotice(stryMutAct_9fa48("1116") ? "" : (stryCov_9fa48("1116"), 'Deck link copied.'));
          }
        } catch {
          if (stryMutAct_9fa48("1117")) {
            {}
          } else {
            stryCov_9fa48("1117");
            setNotice(stryMutAct_9fa48("1119") ? "" : (stryCov_9fa48("1119"), 'Select the link below to copy it.'));
          }
        }
      }
    }
    function download() {
      if (stryMutAct_9fa48("1120")) {
        {}
      } else {
        stryCov_9fa48("1120");
        const url = URL.createObjectURL(new Blob(stryMutAct_9fa48("1121") ? [] : (stryCov_9fa48("1121"), [JSON.stringify(build, null, 2)]), stryMutAct_9fa48("1122") ? {} : (stryCov_9fa48("1122"), {
          type: stryMutAct_9fa48("1123") ? "" : (stryCov_9fa48("1123"), 'application/json')
        })));
        const link = document.createElement(stryMutAct_9fa48("1124") ? "" : (stryCov_9fa48("1124"), 'a'));
        link.href = url;
        link.download = build.device + (stryMutAct_9fa48("1125") ? "" : (stryCov_9fa48("1125"), '-study.json'));
        if (stryMutAct_9fa48("1126")) {
          ;
        } else {
          stryCov_9fa48("1126");
          link.click();
        }
        if (stryMutAct_9fa48("1127")) {
          ;
        } else {
          stryCov_9fa48("1127");
          URL.revokeObjectURL(url);
        }
        setNotice(stryMutAct_9fa48("1129") ? "" : (stryCov_9fa48("1129"), 'Deck study downloaded.'));
      }
    }
    return <main className="deck-studio">
      <a className="skip-link" href="#deck-settings" onClick={event => {
        if (stryMutAct_9fa48("1130")) {
          {}
        } else {
          stryCov_9fa48("1130");
          if (stryMutAct_9fa48("1131")) {
            ;
          } else {
            stryCov_9fa48("1131");
            event.preventDefault();
          }
          stryMutAct_9fa48("1132") ? document.getElementById('deck-settings').focus() : (stryCov_9fa48("1132"), document.getElementById(stryMutAct_9fa48("1133") ? "" : (stryCov_9fa48("1133"), 'deck-settings'))?.focus());
        }
      }}>
        Skip to deck settings
      </a>
      <header className="deck-header">
        <a className="deck-brand" href="#studio">
          <ArrowLeft size={16} />
          <span className="deck-brand-copy">
            keyconf <PreviewLabel />
          </span>
        </a>
        <nav aria-label="Control deck presets">
          <a href="#deck/grok-bot" aria-current={(stryMutAct_9fa48("1136") ? build.device !== 'grok-bot' : stryMutAct_9fa48("1135") ? false : stryMutAct_9fa48("1134") ? true : (stryCov_9fa48("1134", "1135", "1136"), build.device === (stryMutAct_9fa48("1137") ? "" : (stryCov_9fa48("1137"), 'grok-bot')))) ? stryMutAct_9fa48("1138") ? "" : (stryCov_9fa48("1138"), 'page') : undefined}>
            Grok Bot
          </a>
          <a href="#deck/codex-micro" aria-current={(stryMutAct_9fa48("1141") ? build.device !== 'codex-micro' : stryMutAct_9fa48("1140") ? false : stryMutAct_9fa48("1139") ? true : (stryCov_9fa48("1139", "1140", "1141"), build.device === (stryMutAct_9fa48("1142") ? "" : (stryCov_9fa48("1142"), 'codex-micro')))) ? stryMutAct_9fa48("1143") ? "" : (stryCov_9fa48("1143"), 'page') : undefined}>
            Codex Micro
          </a>
        </nav>
        <a className="deck-source" href={preset.source} target="_blank" rel="noreferrer">
          Original reference <ArrowUpRight size={15} />
        </a>
      </header>
      <div className="deck-workspace">
        <section className="deck-stage" aria-label={preset.name + (stryMutAct_9fa48("1144") ? "" : (stryCov_9fa48("1144"), ' interactive study'))}>
          <div className="deck-heading">
            <p className="deck-eyebrow">{preset.provenance}</p>
            <h1>{preset.name}</h1>
            <p>{preset.description}</p>
          </div>
          <KeyboardScene options={options} onPress={stryMutAct_9fa48("1145") ? () => undefined : (stryCov_9fa48("1145"), code => setLastKey((stryMutAct_9fa48("1148") ? code !== 'Space' : stryMutAct_9fa48("1147") ? false : stryMutAct_9fa48("1146") ? true : (stryCov_9fa48("1146", "1147", "1148"), code === (stryMutAct_9fa48("1149") ? "" : (stryCov_9fa48("1149"), 'Space')))) ? stryMutAct_9fa48("1150") ? "" : (stryCov_9fa48("1150"), 'Space') : code.replace(stryMutAct_9fa48("1152") ? /^Key|Digit/ : stryMutAct_9fa48("1151") ? /Key|^Digit/ : (stryCov_9fa48("1151", "1152"), /^Key|^Digit/), stryMutAct_9fa48("1153") ? "Stryker was here!" : (stryCov_9fa48("1153"), ''))))} onRelease={() => {}} />
          <output className="deck-feedback">
            {lastKey ? stryMutAct_9fa48("1154") ? `` : (stryCov_9fa48("1154"), `${lastKey} · local key preview`) : stryMutAct_9fa48("1155") ? "" : (stryCov_9fa48("1155"), 'Tap a key. Turn it over. Look inside.')}
          </output>
          <div className="deck-toolbar" aria-label="Deck view controls">
            <button onClick={stryMutAct_9fa48("1156") ? () => undefined : (stryCov_9fa48("1156"), () => setView((stryMutAct_9fa48("1159") ? view !== 'top' : stryMutAct_9fa48("1158") ? false : stryMutAct_9fa48("1157") ? true : (stryCov_9fa48("1157", "1158", "1159"), view === (stryMutAct_9fa48("1160") ? "" : (stryCov_9fa48("1160"), 'top')))) ? stryMutAct_9fa48("1161") ? "" : (stryCov_9fa48("1161"), 'perspective') : stryMutAct_9fa48("1162") ? "" : (stryCov_9fa48("1162"), 'top')))}>
              {(stryMutAct_9fa48("1165") ? view !== 'top' : stryMutAct_9fa48("1164") ? false : stryMutAct_9fa48("1163") ? true : (stryCov_9fa48("1163", "1164", "1165"), view === (stryMutAct_9fa48("1166") ? "" : (stryCov_9fa48("1166"), 'top')))) ? stryMutAct_9fa48("1167") ? "" : (stryCov_9fa48("1167"), 'Perspective') : stryMutAct_9fa48("1168") ? "" : (stryCov_9fa48("1168"), 'Top view')}
            </button>
            <button aria-pressed={exploded} onClick={stryMutAct_9fa48("1169") ? () => undefined : (stryCov_9fa48("1169"), () => setExploded(stryMutAct_9fa48("1170") ? exploded : (stryCov_9fa48("1170"), !exploded)))}>
              <Layers size={16} />
              {exploded ? stryMutAct_9fa48("1171") ? "" : (stryCov_9fa48("1171"), 'Assemble') : stryMutAct_9fa48("1172") ? "" : (stryCov_9fa48("1172"), 'Explode')}
            </button>
            <button aria-label="Reset deck view" onClick={() => {
              if (stryMutAct_9fa48("1173")) {
                {}
              } else {
                stryCov_9fa48("1173");
                setView((stryMutAct_9fa48("1177") ? view !== 'reset' : stryMutAct_9fa48("1176") ? false : stryMutAct_9fa48("1175") ? true : (stryCov_9fa48("1175", "1176", "1177"), view === (stryMutAct_9fa48("1178") ? "" : (stryCov_9fa48("1178"), 'reset')))) ? stryMutAct_9fa48("1179") ? "" : (stryCov_9fa48("1179"), 'perspective') : stryMutAct_9fa48("1180") ? "" : (stryCov_9fa48("1180"), 'reset'));
                setExploded(stryMutAct_9fa48("1182") ? true : (stryCov_9fa48("1182"), false));
              }
            }}>
              <RotateCcw size={16} />
            </button>
          </div>
          <p className="deck-instructions">
            Drag to orbit · + / − to zoom · Type the mapped keys
          </p>
        </section>
        <aside className="deck-inspector" id="deck-settings" tabIndex={stryMutAct_9fa48("1183") ? +1 : (stryCov_9fa48("1183"), -1)} aria-label="Control deck settings">
          <div className="deck-inspector-title">
            <h2>Your study</h2>
            <output>
              {(stryMutAct_9fa48("1186") ? saved !== 'saved' : stryMutAct_9fa48("1185") ? false : stryMutAct_9fa48("1184") ? true : (stryCov_9fa48("1184", "1185", "1186"), saved === (stryMutAct_9fa48("1187") ? "" : (stryCov_9fa48("1187"), 'saved')))) ? stryMutAct_9fa48("1188") ? "" : (stryCov_9fa48("1188"), 'Saved on this device') : (stryMutAct_9fa48("1191") ? saved !== 'unavailable' : stryMutAct_9fa48("1190") ? false : stryMutAct_9fa48("1189") ? true : (stryCov_9fa48("1189", "1190", "1191"), saved === (stryMutAct_9fa48("1192") ? "" : (stryCov_9fa48("1192"), 'unavailable')))) ? stryMutAct_9fa48("1193") ? "" : (stryCov_9fa48("1193"), 'Session only') : stryMutAct_9fa48("1194") ? "" : (stryCov_9fa48("1194"), 'Saving…')}
            </output>
          </div>
          <label className="deck-name">
            Study name
            <input value={build.name} maxLength={80} onChange={stryMutAct_9fa48("1195") ? () => undefined : (stryCov_9fa48("1195"), e => dispatch(stryMutAct_9fa48("1196") ? {} : (stryCov_9fa48("1196"), {
              kind: stryMutAct_9fa48("1197") ? "" : (stryCov_9fa48("1197"), 'edit'),
              patch: stryMutAct_9fa48("1198") ? {} : (stryCov_9fa48("1198"), {
                name: e.target.value
              }),
              group: stryMutAct_9fa48("1199") ? "" : (stryCov_9fa48("1199"), 'name')
            })))} onBlur={() => {
              if (stryMutAct_9fa48("1200")) {
                {}
              } else {
                stryCov_9fa48("1200");
                if (stryMutAct_9fa48("1203") ? false : stryMutAct_9fa48("1202") ? true : stryMutAct_9fa48("1201") ? build.name.trim() : (stryCov_9fa48("1201", "1202", "1203"), !(stryMutAct_9fa48("1204") ? build.name : (stryCov_9fa48("1204"), build.name.trim())))) dispatch(stryMutAct_9fa48("1206") ? {} : (stryCov_9fa48("1206"), {
                  kind: stryMutAct_9fa48("1207") ? "" : (stryCov_9fa48("1207"), 'edit'),
                  patch: stryMutAct_9fa48("1208") ? {} : (stryCov_9fa48("1208"), {
                    name: preset.name
                  })
                }));
                dispatch(stryMutAct_9fa48("1210") ? {} : (stryCov_9fa48("1210"), {
                  kind: stryMutAct_9fa48("1211") ? "" : (stryCov_9fa48("1211"), 'commit')
                }));
              }
            }} />
          </label>
          <div className="deck-history">
            <button disabled={stryMutAct_9fa48("1212") ? history.past.length : (stryCov_9fa48("1212"), !history.past.length)} onClick={stryMutAct_9fa48("1213") ? () => undefined : (stryCov_9fa48("1213"), () => dispatch(stryMutAct_9fa48("1214") ? {} : (stryCov_9fa48("1214"), {
              kind: stryMutAct_9fa48("1215") ? "" : (stryCov_9fa48("1215"), 'undo')
            })))}>
              <Undo2 size={16} /> Undo
            </button>
            <button disabled={stryMutAct_9fa48("1216") ? history.future.length : (stryCov_9fa48("1216"), !history.future.length)} onClick={stryMutAct_9fa48("1217") ? () => undefined : (stryCov_9fa48("1217"), () => dispatch(stryMutAct_9fa48("1218") ? {} : (stryCov_9fa48("1218"), {
              kind: stryMutAct_9fa48("1219") ? "" : (stryCov_9fa48("1219"), 'redo')
            })))}>
              <Redo2 size={16} /> Redo
            </button>
          </div>
          <fieldset className="deck-colors">
            <legend>Appearance</legend>
            {([{
              key: 'case',
              label: 'Case'
            }, {
              key: 'keys',
              label: 'Role keys'
            }, {
              key: 'commands',
              label: 'Command keys'
            }, {
              key: 'wide',
              label: 'Wide key'
            }] as const).map(stryMutAct_9fa48("1220") ? () => undefined : (stryCov_9fa48("1220"), ({
              key,
              label
            }) => <label key={key}>
                <span>{label}</span>
                <input type="color" value={build.colors[key]} aria-label={label + (stryMutAct_9fa48("1221") ? "" : (stryCov_9fa48("1221"), ' color'))} onChange={stryMutAct_9fa48("1222") ? () => undefined : (stryCov_9fa48("1222"), e => dispatch(stryMutAct_9fa48("1223") ? {} : (stryCov_9fa48("1223"), {
                kind: stryMutAct_9fa48("1224") ? "" : (stryCov_9fa48("1224"), 'edit'),
                patch: stryMutAct_9fa48("1225") ? {} : (stryCov_9fa48("1225"), {
                  colors: stryMutAct_9fa48("1226") ? {} : (stryCov_9fa48("1226"), {
                    ...build.colors,
                    [key]: e.target.value
                  })
                }),
                group: key
              })))} onBlur={stryMutAct_9fa48("1227") ? () => undefined : (stryCov_9fa48("1227"), () => dispatch(stryMutAct_9fa48("1228") ? {} : (stryCov_9fa48("1228"), {
                kind: stryMutAct_9fa48("1229") ? "" : (stryCov_9fa48("1229"), 'commit')
              })))} />
              </label>))}
          </fieldset>
          <fieldset className="deck-lighting">
            <legend>Scene lighting</legend>
            <div>
              {deckLighting.map(stryMutAct_9fa48("1230") ? () => undefined : (stryCov_9fa48("1230"), lighting => <button key={lighting} aria-pressed={stryMutAct_9fa48("1233") ? build.lighting !== lighting : stryMutAct_9fa48("1232") ? false : stryMutAct_9fa48("1231") ? true : (stryCov_9fa48("1231", "1232", "1233"), build.lighting === lighting)} onClick={stryMutAct_9fa48("1234") ? () => undefined : (stryCov_9fa48("1234"), () => dispatch(stryMutAct_9fa48("1235") ? {} : (stryCov_9fa48("1235"), {
                kind: stryMutAct_9fa48("1236") ? "" : (stryCov_9fa48("1236"), 'edit'),
                patch: stryMutAct_9fa48("1237") ? {} : (stryCov_9fa48("1237"), {
                  lighting
                })
              })))}>
                  {lighting}
                </button>))}
            </div>
          </fieldset>
          <label className="deck-dial">
            Dial position <output>{Math.round(stryMutAct_9fa48("1238") ? build.dial / 100 : (stryCov_9fa48("1238"), build.dial * 100))}%</output>
            <input type="range" aria-label="Dial position" min="0" max="1" step="0.02" value={build.dial} onChange={stryMutAct_9fa48("1239") ? () => undefined : (stryCov_9fa48("1239"), e => dispatch(stryMutAct_9fa48("1240") ? {} : (stryCov_9fa48("1240"), {
              kind: stryMutAct_9fa48("1241") ? "" : (stryCov_9fa48("1241"), 'edit'),
              patch: stryMutAct_9fa48("1242") ? {} : (stryCov_9fa48("1242"), {
                dial: Number(e.target.value)
              }),
              group: stryMutAct_9fa48("1243") ? "" : (stryCov_9fa48("1243"), 'dial')
            })))} onPointerUp={stryMutAct_9fa48("1244") ? () => undefined : (stryCov_9fa48("1244"), () => dispatch(stryMutAct_9fa48("1245") ? {} : (stryCov_9fa48("1245"), {
              kind: stryMutAct_9fa48("1246") ? "" : (stryCov_9fa48("1246"), 'commit')
            })))} onKeyUp={stryMutAct_9fa48("1247") ? () => undefined : (stryCov_9fa48("1247"), () => dispatch(stryMutAct_9fa48("1248") ? {} : (stryCov_9fa48("1248"), {
              kind: stryMutAct_9fa48("1249") ? "" : (stryCov_9fa48("1249"), 'commit')
            })))} />
          </label>
          <details className="deck-details">
            <summary>Try the mapped keys</summary>
            <ul>
              {preset.keys.map(stryMutAct_9fa48("1250") ? () => undefined : (stryCov_9fa48("1250"), key => <li key={key}>{key}</li>))}
            </ul>
          </details>
          <p className="deck-limit">
            Illustrative geometry. Buttons and dial preview locally. No agent
            connection or device-specific sound recording.
          </p>
          <a className="deck-inspector-source" href={preset.source} target="_blank" rel="noreferrer">
            Original reference <ArrowUpRight size={15} />
          </a>
          <div className="deck-share">
            <button onClick={stryMutAct_9fa48("1251") ? () => undefined : (stryCov_9fa48("1251"), () => void share())}>
              <Share2 size={16} /> Share study
            </button>
            <button aria-label="Download deck study" onClick={download}>
              <Download size={16} />
            </button>
          </div>
          <input ref={openFile} type="file" accept="application/json,.json" hidden onChange={async event => {
            if (stryMutAct_9fa48("1252")) {
              {}
            } else {
              stryCov_9fa48("1252");
              const file = stryMutAct_9fa48("1253") ? event.target.files[0] : (stryCov_9fa48("1253"), event.target.files?.[0]);
              event.target.value = stryMutAct_9fa48("1254") ? "Stryker was here!" : (stryCov_9fa48("1254"), '');
              if (stryMutAct_9fa48("1257") ? false : stryMutAct_9fa48("1256") ? true : stryMutAct_9fa48("1255") ? file : (stryCov_9fa48("1255", "1256", "1257"), !file)) return;
              try {
                if (stryMutAct_9fa48("1258")) {
                  {}
                } else {
                  stryCov_9fa48("1258");
                  if (stryMutAct_9fa48("1262") ? file.size <= 16_000 : stryMutAct_9fa48("1261") ? file.size >= 16_000 : stryMutAct_9fa48("1260") ? false : stryMutAct_9fa48("1259") ? true : (stryCov_9fa48("1259", "1260", "1261", "1262"), file.size > 16_000)) throw new Error(stryMutAct_9fa48("1264") ? "" : (stryCov_9fa48("1264"), 'Choose a control deck study under 16 KB.'));
                  const incoming = parseDeck(JSON.parse(await file.text()));
                  if (stryMutAct_9fa48("1267") ? incoming.device !== build.device : stryMutAct_9fa48("1266") ? false : stryMutAct_9fa48("1265") ? true : (stryCov_9fa48("1265", "1266", "1267"), incoming.device === build.device)) dispatch(stryMutAct_9fa48("1269") ? {} : (stryCov_9fa48("1269"), {
                    kind: stryMutAct_9fa48("1270") ? "" : (stryCov_9fa48("1270"), 'edit'),
                    patch: incoming
                  }));else location.hash = (stryMutAct_9fa48("1271") ? "" : (stryCov_9fa48("1271"), 'deck=')) + encodeDeck(incoming);
                  setNotice(stryMutAct_9fa48("1273") ? "" : (stryCov_9fa48("1273"), 'Deck study opened.'));
                }
              } catch (error) {
                if (stryMutAct_9fa48("1274")) {
                  {}
                } else {
                  stryCov_9fa48("1274");
                  setNotice(error instanceof Error ? error.message : stryMutAct_9fa48("1276") ? "" : (stryCov_9fa48("1276"), 'This deck study could not be opened.'));
                }
              }
            }
          }} />
          <button className="deck-reset" onClick={stryMutAct_9fa48("1277") ? () => undefined : (stryCov_9fa48("1277"), () => stryMutAct_9fa48("1278") ? openFile.current.click() : (stryCov_9fa48("1278"), openFile.current?.click()))}>
            Open deck file
          </button>
          {stryMutAct_9fa48("1281") ? shareUrl || <label className="deck-name">
              Share link
              <input readOnly value={shareUrl} onFocus={e => e.target.select()} />
            </label> : stryMutAct_9fa48("1280") ? false : stryMutAct_9fa48("1279") ? true : (stryCov_9fa48("1279", "1280", "1281"), shareUrl && <label className="deck-name">
              Share link
              <input readOnly value={shareUrl} onFocus={stryMutAct_9fa48("1282") ? () => undefined : (stryCov_9fa48("1282"), e => e.target.select())} />
            </label>)}
          <output className="deck-notice">{notice}</output>
          <button className="deck-reset" onClick={stryMutAct_9fa48("1283") ? () => undefined : (stryCov_9fa48("1283"), () => dispatch(stryMutAct_9fa48("1284") ? {} : (stryCov_9fa48("1284"), {
            kind: stryMutAct_9fa48("1285") ? "" : (stryCov_9fa48("1285"), 'edit'),
            patch: newDeck(build.device)
          })))}>
            Reset to original preset
          </button>
        </aside>
      </div>
    </main>;
  }
}
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
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { parseDiscoveryPage, type DiscoveryPage, type DiscoveryQuery } from '../lib/discovery';
import { importEndpoint } from '../lib/import-endpoint';
import { requestText } from '../lib/request-text';
import StudioSelect from './studio-select';
import BuildThumbnail from './build-thumbnail';
import './community-discovery.css';
type State = {
  kind: 'loading';
  previous: DiscoveryPage | null;
} | {
  kind: 'ready';
  page: DiscoveryPage;
} | {
  kind: 'error';
  previous: DiscoveryPage | null;
};
export default function CommunityDiscovery() {
  if (stryMutAct_9fa48("528")) {
    {}
  } else {
    stryCov_9fa48("528");
    const [query, setQuery] = useState(stryMutAct_9fa48("529") ? "Stryker was here!" : (stryCov_9fa48("529"), ''));
    const [kind, setKind] = useState<DiscoveryQuery['kind']>(stryMutAct_9fa48("530") ? "" : (stryCov_9fa48("530"), 'all'));
    const [request, setRequest] = useState<DiscoveryQuery>(stryMutAct_9fa48("531") ? {} : (stryCov_9fa48("531"), {
      query: stryMutAct_9fa48("532") ? "Stryker was here!" : (stryCov_9fa48("532"), ''),
      kind: stryMutAct_9fa48("533") ? "" : (stryCov_9fa48("533"), 'all'),
      cursor: null
    }));
    const [state, setState] = useState<State>(stryMutAct_9fa48("534") ? {} : (stryCov_9fa48("534"), {
      kind: stryMutAct_9fa48("535") ? "" : (stryCov_9fa48("535"), 'loading'),
      previous: null
    }));
    const [origin, setOrigin] = useState(stryMutAct_9fa48("536") ? "Stryker was here!" : (stryCov_9fa48("536"), ''));
    const pending = useRef<AbortController | null>(null);
    const nextFocus = useRef<string | null>(null);
    useEffect(() => {
      if (stryMutAct_9fa48("538")) {
        {}
      } else {
        stryCov_9fa48("538");
        const controller = new AbortController();
        pending.current = controller;
        const site = new URL(importEndpoint(new URL(window.location.href)), window.location.href);
        site.pathname = stryMutAct_9fa48("539") ? "" : (stryCov_9fa48("539"), '/api/publications');
        site.search = new URLSearchParams(stryMutAct_9fa48("540") ? {} : (stryCov_9fa48("540"), {
          q: request.query,
          kind: request.kind,
          ...(request.cursor ? stryMutAct_9fa48("541") ? {} : (stryCov_9fa48("541"), {
            before: request.cursor.publishedAt,
            id: request.cursor.id
          }) : {})
        })).toString();
        void (async () => {
          if (stryMutAct_9fa48("542")) {
            {}
          } else {
            stryCov_9fa48("542");
            try {
              if (stryMutAct_9fa48("543")) {
                {}
              } else {
                stryCov_9fa48("543");
                const response = await fetch(site, stryMutAct_9fa48("544") ? {} : (stryCov_9fa48("544"), {
                  signal: AbortSignal.any(stryMutAct_9fa48("545") ? [] : (stryCov_9fa48("545"), [controller.signal, AbortSignal.timeout(15000)])),
                  credentials: stryMutAct_9fa48("546") ? "" : (stryCov_9fa48("546"), 'omit')
                }));
                if (stryMutAct_9fa48("549") ? false : stryMutAct_9fa48("548") ? true : stryMutAct_9fa48("547") ? response.ok : (stryCov_9fa48("547", "548", "549"), !response.ok)) throw new Error(stryMutAct_9fa48("551") ? "" : (stryCov_9fa48("551"), 'Unavailable'));
                const raw = await requestText(response, 100_000);
                if (stryMutAct_9fa48("554") ? raw !== null : stryMutAct_9fa48("553") ? false : stryMutAct_9fa48("552") ? true : (stryCov_9fa48("552", "553", "554"), raw === null)) throw new Error(stryMutAct_9fa48("556") ? "" : (stryCov_9fa48("556"), 'Too large'));
                const page = parseDiscoveryPage(JSON.parse(raw));
                if (stryMutAct_9fa48("559") ? request.cursor && page.next?.id === request.cursor.id || page.next.publishedAt === request.cursor.publishedAt : stryMutAct_9fa48("558") ? false : stryMutAct_9fa48("557") ? true : (stryCov_9fa48("557", "558", "559"), (stryMutAct_9fa48("561") ? request.cursor || page.next?.id === request.cursor.id : stryMutAct_9fa48("560") ? true : (stryCov_9fa48("560", "561"), request.cursor && (stryMutAct_9fa48("563") ? page.next?.id !== request.cursor.id : stryMutAct_9fa48("562") ? true : (stryCov_9fa48("562", "563"), (stryMutAct_9fa48("564") ? page.next.id : (stryCov_9fa48("564"), page.next?.id)) === request.cursor.id)))) && (stryMutAct_9fa48("566") ? page.next.publishedAt !== request.cursor.publishedAt : stryMutAct_9fa48("565") ? true : (stryCov_9fa48("565", "566"), page.next.publishedAt === request.cursor.publishedAt)))) throw new Error(stryMutAct_9fa48("568") ? "" : (stryCov_9fa48("568"), 'This publication page did not advance.'));
                if (stryMutAct_9fa48("571") ? false : stryMutAct_9fa48("570") ? true : stryMutAct_9fa48("569") ? controller.signal.aborted : (stryCov_9fa48("569", "570", "571"), !controller.signal.aborted)) {
                  if (stryMutAct_9fa48("572")) {
                    {}
                  } else {
                    stryCov_9fa48("572");
                    if (stryMutAct_9fa48("573")) {
                      ;
                    } else {
                      stryCov_9fa48("573");
                      setOrigin(site.origin);
                    }
                    if (stryMutAct_9fa48("575") ? false : stryMutAct_9fa48("574") ? true : (stryCov_9fa48("574", "575"), request.cursor)) nextFocus.current = stryMutAct_9fa48("576") ? page.items[0]?.id && null : (stryCov_9fa48("576"), (stryMutAct_9fa48("577") ? page.items[0].id : (stryCov_9fa48("577"), page.items[0]?.id)) ?? null);
                    setState(previous => {
                      if (stryMutAct_9fa48("579")) {
                        {}
                      } else {
                        stryCov_9fa48("579");
                        const earlier = (stryMutAct_9fa48("582") ? previous.kind !== 'ready' : stryMutAct_9fa48("581") ? false : stryMutAct_9fa48("580") ? true : (stryCov_9fa48("580", "581", "582"), previous.kind === (stryMutAct_9fa48("583") ? "" : (stryCov_9fa48("583"), 'ready')))) ? previous.page : previous.previous;
                        const items = (stryMutAct_9fa48("586") ? request.cursor || earlier : stryMutAct_9fa48("585") ? false : stryMutAct_9fa48("584") ? true : (stryCov_9fa48("584", "585", "586"), request.cursor && earlier)) ? Array.from(new Map((stryMutAct_9fa48("587") ? [] : (stryCov_9fa48("587"), [...earlier.items, ...page.items])).map(stryMutAct_9fa48("588") ? () => undefined : (stryCov_9fa48("588"), item => stryMutAct_9fa48("589") ? [] : (stryCov_9fa48("589"), [item.id, item])))).values()) : page.items;
                        return stryMutAct_9fa48("590") ? {} : (stryCov_9fa48("590"), {
                          kind: stryMutAct_9fa48("591") ? "" : (stryCov_9fa48("591"), 'ready'),
                          page: stryMutAct_9fa48("592") ? {} : (stryCov_9fa48("592"), {
                            ...page,
                            items
                          })
                        });
                      }
                    });
                  }
                }
              }
            } catch {
              if (stryMutAct_9fa48("593")) {
                {}
              } else {
                stryCov_9fa48("593");
                if (stryMutAct_9fa48("596") ? false : stryMutAct_9fa48("595") ? true : stryMutAct_9fa48("594") ? controller.signal.aborted : (stryCov_9fa48("594", "595", "596"), !controller.signal.aborted)) {
                  if (stryMutAct_9fa48("597")) {
                    {}
                  } else {
                    stryCov_9fa48("597");
                    if (stryMutAct_9fa48("598")) {
                      ;
                    } else {
                      stryCov_9fa48("598");
                      setOrigin(site.origin);
                    }
                    setState(stryMutAct_9fa48("600") ? () => undefined : (stryCov_9fa48("600"), previous => stryMutAct_9fa48("601") ? {} : (stryCov_9fa48("601"), {
                      kind: stryMutAct_9fa48("602") ? "" : (stryCov_9fa48("602"), 'error'),
                      previous: (stryMutAct_9fa48("605") ? previous.kind !== 'ready' : stryMutAct_9fa48("604") ? false : stryMutAct_9fa48("603") ? true : (stryCov_9fa48("603", "604", "605"), previous.kind === (stryMutAct_9fa48("606") ? "" : (stryCov_9fa48("606"), 'ready')))) ? previous.page : previous.previous
                    })));
                  }
                }
              }
            }
          }
        })();
        return stryMutAct_9fa48("607") ? () => undefined : (stryCov_9fa48("607"), () => controller.abort());
      }
    }, stryMutAct_9fa48("608") ? [] : (stryCov_9fa48("608"), [request]));
    useEffect(() => {
      if (stryMutAct_9fa48("610")) {
        {}
      } else {
        stryCov_9fa48("610");
        if (stryMutAct_9fa48("613") ? state.kind === 'ready' || nextFocus.current : stryMutAct_9fa48("612") ? false : stryMutAct_9fa48("611") ? true : (stryCov_9fa48("611", "612", "613"), (stryMutAct_9fa48("615") ? state.kind !== 'ready' : stryMutAct_9fa48("614") ? true : (stryCov_9fa48("614", "615"), state.kind === (stryMutAct_9fa48("616") ? "" : (stryCov_9fa48("616"), 'ready')))) && nextFocus.current)) {
          if (stryMutAct_9fa48("617")) {
            {}
          } else {
            stryCov_9fa48("617");
            stryMutAct_9fa48("618") ? document.getElementById(`publication-${nextFocus.current}`).focus() : (stryCov_9fa48("618"), document.getElementById(stryMutAct_9fa48("619") ? `` : (stryCov_9fa48("619"), `publication-${nextFocus.current}`))?.focus());
            nextFocus.current = null;
          }
        }
      }
    }, stryMutAct_9fa48("620") ? [] : (stryCov_9fa48("620"), [state]));
    function load(next: DiscoveryQuery) {
      if (stryMutAct_9fa48("621")) {
        {}
      } else {
        stryCov_9fa48("621");
        nextFocus.current = null;
        stryMutAct_9fa48("622") ? pending.current.abort() : (stryCov_9fa48("622"), pending.current?.abort());
        setState(stryMutAct_9fa48("624") ? () => undefined : (stryCov_9fa48("624"), previous => stryMutAct_9fa48("625") ? {} : (stryCov_9fa48("625"), {
          kind: stryMutAct_9fa48("626") ? "" : (stryCov_9fa48("626"), 'loading'),
          previous: next.cursor ? (stryMutAct_9fa48("629") ? previous.kind !== 'ready' : stryMutAct_9fa48("628") ? false : stryMutAct_9fa48("627") ? true : (stryCov_9fa48("627", "628", "629"), previous.kind === (stryMutAct_9fa48("630") ? "" : (stryCov_9fa48("630"), 'ready')))) ? previous.page : previous.previous : null
        })));
        if (stryMutAct_9fa48("631")) {
          ;
        } else {
          stryCov_9fa48("631");
          setRequest(next);
        }
      }
    }
    const page = (stryMutAct_9fa48("634") ? state.kind !== 'ready' : stryMutAct_9fa48("633") ? false : stryMutAct_9fa48("632") ? true : (stryCov_9fa48("632", "633", "634"), state.kind === (stryMutAct_9fa48("635") ? "" : (stryCov_9fa48("635"), 'ready')))) ? state.page : state.previous;
    return <section className="community-discovery" aria-labelledby="community-heading">
      <div>
        <span className="eyebrow">FROM THE COMMUNITY</span>
        <h2 id="community-heading" tabIndex={stryMutAct_9fa48("636") ? +1 : (stryCov_9fa48("636"), -1)}>
          Built to be shared.
        </h2>
        <p>
          Explore published builds and creator drops. Open one to hear it,
          inspect its parts, or make a copy.
        </p>
      </div>
      <form className="community-search" onSubmit={event => {
        if (stryMutAct_9fa48("637")) {
          {}
        } else {
          stryCov_9fa48("637");
          if (stryMutAct_9fa48("638")) {
            ;
          } else {
            stryCov_9fa48("638");
            event.preventDefault();
          }
          load(stryMutAct_9fa48("640") ? {} : (stryCov_9fa48("640"), {
            query: stryMutAct_9fa48("641") ? query : (stryCov_9fa48("641"), query.trim()),
            kind,
            cursor: null
          }));
        }
      }}>
        <label className="community-query">
          <Search size={18} aria-hidden="true" />
          <input type="search" aria-label="Search community builds" placeholder="Build or creator name" maxLength={100} value={query} onChange={stryMutAct_9fa48("642") ? () => undefined : (stryCov_9fa48("642"), event => setQuery(event.target.value))} />
        </label>
        <StudioSelect aria-label="Release type" value={kind} options={stryMutAct_9fa48("643") ? [] : (stryCov_9fa48("643"), [stryMutAct_9fa48("644") ? {} : (stryCov_9fa48("644"), {
          value: stryMutAct_9fa48("645") ? "" : (stryCov_9fa48("645"), 'all'),
          label: stryMutAct_9fa48("646") ? "" : (stryCov_9fa48("646"), 'All releases')
        }), stryMutAct_9fa48("647") ? {} : (stryCov_9fa48("647"), {
          value: stryMutAct_9fa48("648") ? "" : (stryCov_9fa48("648"), 'build'),
          label: stryMutAct_9fa48("649") ? "" : (stryCov_9fa48("649"), 'Builds')
        }), stryMutAct_9fa48("650") ? {} : (stryCov_9fa48("650"), {
          value: stryMutAct_9fa48("651") ? "" : (stryCov_9fa48("651"), 'drop'),
          label: stryMutAct_9fa48("652") ? "" : (stryCov_9fa48("652"), 'Drops')
        })])} onValueChange={value => {
          if (stryMutAct_9fa48("653")) {
            {}
          } else {
            stryCov_9fa48("653");
            if (stryMutAct_9fa48("656") ? (value === 'all' || value === 'build') && value === 'drop' : stryMutAct_9fa48("655") ? false : stryMutAct_9fa48("654") ? true : (stryCov_9fa48("654", "655", "656"), (stryMutAct_9fa48("658") ? value === 'all' && value === 'build' : stryMutAct_9fa48("657") ? false : (stryCov_9fa48("657", "658"), (stryMutAct_9fa48("660") ? value !== 'all' : stryMutAct_9fa48("659") ? false : (stryCov_9fa48("659", "660"), value === (stryMutAct_9fa48("661") ? "" : (stryCov_9fa48("661"), 'all')))) || (stryMutAct_9fa48("663") ? value !== 'build' : stryMutAct_9fa48("662") ? false : (stryCov_9fa48("662", "663"), value === (stryMutAct_9fa48("664") ? "" : (stryCov_9fa48("664"), 'build')))))) || (stryMutAct_9fa48("666") ? value !== 'drop' : stryMutAct_9fa48("665") ? false : (stryCov_9fa48("665", "666"), value === (stryMutAct_9fa48("667") ? "" : (stryCov_9fa48("667"), 'drop')))))) if (stryMutAct_9fa48("668")) {
              ;
            } else {
              stryCov_9fa48("668");
              setKind(value);
            }
          }
        }} />
        <button className="button secondary" type="submit">
          Search
        </button>
      </form>
      <output aria-live="polite">
        {(stryMutAct_9fa48("671") ? state.kind !== 'loading' : stryMutAct_9fa48("670") ? false : stryMutAct_9fa48("669") ? true : (stryCov_9fa48("669", "670", "671"), state.kind === (stryMutAct_9fa48("672") ? "" : (stryCov_9fa48("672"), 'loading')))) ? stryMutAct_9fa48("673") ? "" : (stryCov_9fa48("673"), 'Loading published builds…') : (stryMutAct_9fa48("676") ? state.kind === 'ready' || !page?.items.length : stryMutAct_9fa48("675") ? false : stryMutAct_9fa48("674") ? true : (stryCov_9fa48("674", "675", "676"), (stryMutAct_9fa48("678") ? state.kind !== 'ready' : stryMutAct_9fa48("677") ? true : (stryCov_9fa48("677", "678"), state.kind === (stryMutAct_9fa48("679") ? "" : (stryCov_9fa48("679"), 'ready')))) && (stryMutAct_9fa48("680") ? page?.items.length : (stryCov_9fa48("680"), !(stryMutAct_9fa48("681") ? page.items.length : (stryCov_9fa48("681"), page?.items.length)))))) ? (stryMutAct_9fa48("684") ? request.query && request.kind !== 'all' : stryMutAct_9fa48("683") ? false : stryMutAct_9fa48("682") ? true : (stryCov_9fa48("682", "683", "684"), request.query || (stryMutAct_9fa48("686") ? request.kind === 'all' : stryMutAct_9fa48("685") ? false : (stryCov_9fa48("685", "686"), request.kind !== (stryMutAct_9fa48("687") ? "" : (stryCov_9fa48("687"), 'all')))))) ? stryMutAct_9fa48("688") ? "" : (stryCov_9fa48("688"), 'No matching releases. Try another name or release type.') : stryMutAct_9fa48("689") ? "" : (stryCov_9fa48("689"), 'No community builds published yet. Shared releases will appear here.') : (stryMutAct_9fa48("692") ? state.kind !== 'ready' : stryMutAct_9fa48("691") ? false : stryMutAct_9fa48("690") ? true : (stryCov_9fa48("690", "691", "692"), state.kind === (stryMutAct_9fa48("693") ? "" : (stryCov_9fa48("693"), 'ready')))) ? stryMutAct_9fa48("694") ? `` : (stryCov_9fa48("694"), `${stryMutAct_9fa48("695") ? page?.items.length && 0 : (stryCov_9fa48("695"), (stryMutAct_9fa48("696") ? page.items.length : (stryCov_9fa48("696"), page?.items.length)) ?? 0)} published ${(stryMutAct_9fa48("699") ? page?.items.length !== 1 : stryMutAct_9fa48("698") ? false : stryMutAct_9fa48("697") ? true : (stryCov_9fa48("697", "698", "699"), (stryMutAct_9fa48("700") ? page.items.length : (stryCov_9fa48("700"), page?.items.length)) === 1)) ? stryMutAct_9fa48("701") ? "" : (stryCov_9fa48("701"), 'build') : stryMutAct_9fa48("702") ? "" : (stryCov_9fa48("702"), 'builds')} shown.`) : stryMutAct_9fa48("703") ? "Stryker was here!" : (stryCov_9fa48("703"), '')}
      </output>
      {stryMutAct_9fa48("706") ? state.kind === 'error' || <div className="community-error">
          <p role="alert">Published builds could not load.</p>
          {!page?.next && <button className="button secondary" onClick={() => load({
          ...request
        })}>
              Try again
            </button>}
        </div> : stryMutAct_9fa48("705") ? false : stryMutAct_9fa48("704") ? true : (stryCov_9fa48("704", "705", "706"), (stryMutAct_9fa48("708") ? state.kind !== 'error' : stryMutAct_9fa48("707") ? true : (stryCov_9fa48("707", "708"), state.kind === (stryMutAct_9fa48("709") ? "" : (stryCov_9fa48("709"), 'error')))) && <div className="community-error">
          <p role="alert">Published builds could not load.</p>
          {stryMutAct_9fa48("712") ? !page?.next || <button className="button secondary" onClick={() => load({
          ...request
        })}>
              Try again
            </button> : stryMutAct_9fa48("711") ? false : stryMutAct_9fa48("710") ? true : (stryCov_9fa48("710", "711", "712"), (stryMutAct_9fa48("713") ? page?.next : (stryCov_9fa48("713"), !(stryMutAct_9fa48("714") ? page.next : (stryCov_9fa48("714"), page?.next)))) && <button className="button secondary" onClick={stryMutAct_9fa48("715") ? () => undefined : (stryCov_9fa48("715"), () => load(stryMutAct_9fa48("716") ? {} : (stryCov_9fa48("716"), {
          ...request
        })))}>
              Try again
            </button>)}
        </div>)}
      {stryMutAct_9fa48("719") ? !!page?.items.length || <p className="community-preview-note">
          Card illustrations show saved layouts and colors. Open a build for its
          parts, accessories and preview limits.
        </p> : stryMutAct_9fa48("718") ? false : stryMutAct_9fa48("717") ? true : (stryCov_9fa48("717", "718", "719"), (stryMutAct_9fa48("720") ? !page?.items.length : (stryCov_9fa48("720"), !(stryMutAct_9fa48("721") ? page?.items.length : (stryCov_9fa48("721"), !(stryMutAct_9fa48("722") ? page.items.length : (stryCov_9fa48("722"), page?.items.length)))))) && <p className="community-preview-note">
          Card illustrations show saved layouts and colors. Open a build for its
          parts, accessories and preview limits.
        </p>)}
      {stryMutAct_9fa48("725") ? !!page?.items.length || <ul className="community-grid">
          {page.items.map(item => <li key={item.id}>
              <a id={`publication-${item.id}`} href={`${origin}/builds/${encodeURIComponent(item.id)}`}>
                <BuildThumbnail thumbnail={item.thumbnail} />
                <span className="eyebrow">
                  {item.kind === 'drop' ? 'CREATOR DROP' : 'COMMUNITY BUILD'}
                </span>
                <h3>{item.title}</h3>
                <p>
                  {item.author.displayName} <span>@{item.author.handle}</span>
                </p>
                <div className="community-card-footer">
                  <time dateTime={item.publishedAt}>
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </time>
                  <span>
                    Experience build{' '}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>)}
        </ul> : stryMutAct_9fa48("724") ? false : stryMutAct_9fa48("723") ? true : (stryCov_9fa48("723", "724", "725"), (stryMutAct_9fa48("726") ? !page?.items.length : (stryCov_9fa48("726"), !(stryMutAct_9fa48("727") ? page?.items.length : (stryCov_9fa48("727"), !(stryMutAct_9fa48("728") ? page.items.length : (stryCov_9fa48("728"), page?.items.length)))))) && <ul className="community-grid">
          {page.items.map(stryMutAct_9fa48("729") ? () => undefined : (stryCov_9fa48("729"), item => <li key={item.id}>
              <a id={stryMutAct_9fa48("730") ? `` : (stryCov_9fa48("730"), `publication-${item.id}`)} href={stryMutAct_9fa48("731") ? `` : (stryCov_9fa48("731"), `${origin}/builds/${encodeURIComponent(item.id)}`)}>
                <BuildThumbnail thumbnail={item.thumbnail} />
                <span className="eyebrow">
                  {(stryMutAct_9fa48("734") ? item.kind !== 'drop' : stryMutAct_9fa48("733") ? false : stryMutAct_9fa48("732") ? true : (stryCov_9fa48("732", "733", "734"), item.kind === (stryMutAct_9fa48("735") ? "" : (stryCov_9fa48("735"), 'drop')))) ? stryMutAct_9fa48("736") ? "" : (stryCov_9fa48("736"), 'CREATOR DROP') : stryMutAct_9fa48("737") ? "" : (stryCov_9fa48("737"), 'COMMUNITY BUILD')}
                </span>
                <h3>{item.title}</h3>
                <p>
                  {item.author.displayName} <span>@{item.author.handle}</span>
                </p>
                <div className="community-card-footer">
                  <time dateTime={item.publishedAt}>
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </time>
                  <span>
                    Experience build{stryMutAct_9fa48("738") ? "" : (stryCov_9fa48("738"), ' ')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>))}
        </ul>)}
      {stryMutAct_9fa48("741") ? page?.next || <button className="button secondary" aria-disabled={state.kind === 'loading'} onClick={() => {
        if (state.kind !== 'loading') load({
          ...request,
          cursor: page.next
        });
      }}>
          {state.kind === 'error' ? 'Retry loading more' : 'Load more builds'}
        </button> : stryMutAct_9fa48("740") ? false : stryMutAct_9fa48("739") ? true : (stryCov_9fa48("739", "740", "741"), (stryMutAct_9fa48("742") ? page.next : (stryCov_9fa48("742"), page?.next)) && <button className="button secondary" aria-disabled={stryMutAct_9fa48("745") ? state.kind !== 'loading' : stryMutAct_9fa48("744") ? false : stryMutAct_9fa48("743") ? true : (stryCov_9fa48("743", "744", "745"), state.kind === (stryMutAct_9fa48("746") ? "" : (stryCov_9fa48("746"), 'loading')))} onClick={() => {
        if (stryMutAct_9fa48("747")) {
          {}
        } else {
          stryCov_9fa48("747");
          if (stryMutAct_9fa48("750") ? state.kind === 'loading' : stryMutAct_9fa48("749") ? false : stryMutAct_9fa48("748") ? true : (stryCov_9fa48("748", "749", "750"), state.kind !== (stryMutAct_9fa48("751") ? "" : (stryCov_9fa48("751"), 'loading')))) load(stryMutAct_9fa48("753") ? {} : (stryCov_9fa48("753"), {
            ...request,
            cursor: page.next
          }));
        }
      }}>
          {(stryMutAct_9fa48("756") ? state.kind !== 'error' : stryMutAct_9fa48("755") ? false : stryMutAct_9fa48("754") ? true : (stryCov_9fa48("754", "755", "756"), state.kind === (stryMutAct_9fa48("757") ? "" : (stryCov_9fa48("757"), 'error')))) ? stryMutAct_9fa48("758") ? "" : (stryCov_9fa48("758"), 'Retry loading more') : stryMutAct_9fa48("759") ? "" : (stryCov_9fa48("759"), 'Load more builds')}
        </button>)}
    </section>;
  }
}
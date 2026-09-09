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
import { isQ1MaxAssembly } from '../lib/keyboard-variant';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import ControlDeckStudio from './control-deck-studio';
import SharedBuildPreview from './shared-build-preview';
import { sharedPreview, previewLink } from '../lib/shared-preview';
import PreviewLabel from './preview-label';
import { decodeDeck, newDeck, type DeckBuild, type DeckId } from '../lib/control-deck';
import { Layers, Search, RotateCcw, ArrowUpRight, ArrowRight, Plus, Check, Volume2, VolumeX, Download, X, SlidersHorizontal, ChevronRight, Play, Undo2, Redo2, Share2, Upload, Shuffle, Maximize2, Minimize2, Wind, Pause } from 'lucide-react';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import ImportDialog, { type ImportAddition } from './import-dialog';
import StudioSearch from './studio-search';
import TypingTest from './typing-test';
import LastKey, { createLastKey } from './last-key';
import VolumeDial from './volume-dial';
import MusicControls from './music-controls';
import { StudioMusic } from '../lib/music';
import { FeaturedGallery, FeaturedInspector } from './featured-gallery';
import { featuredBuilds, customizeFeatured } from '../lib/featured-builds';
import { encodeDeck } from '../lib/control-deck';
import CommunityDiscovery from './community-discovery';
import TechnologyGuide from './technology-guide';
import './studio.css';
import SoundReferences, { type SoundReference } from './sound-references';
import type { SamplePreview } from '../lib/audio-preview';
import SampleWaveform from './sample-waveform';
import ComponentsPanel from './components-panel';
import MobileWorkbench from './mobile-workbench';
import SwitchDetail from './switch-detail';
import LayerInspector from './layer-inspector';
import BuildAccessories from './build-accessories';
import { newAccessorySelection } from '../lib/build-accessories';
import { resolveAccessoryProducts, parseCustomAccessories } from '../lib/imported-accessories';
import PremiumKeyboards from './premium-keyboards';
import ResearchProducts from './research-products';
import StudioSelect from './studio-select';
import { useBuild } from './use-build';
import { applyPaletteTheme } from '../lib/theme';
import { palettes, caseColors, layouts, finishes, profiles, readBuildFile, parseCustomParts, parseBuild, encodeBuild } from '../lib/build';
import { soundPacks } from '../lib/sound-packs';
import { registerStudioTools } from '../lib/webmcp';
import { catalog, categories, checkBuild } from '../lib/catalog';
import { KeyboardAudio, type SoundSettings } from '../lib/audio';
function subscribeLocation(onChange: () => void) {
  if (stryMutAct_9fa48("1998")) {
    {}
  } else {
    stryCov_9fa48("1998");
    window.addEventListener(stryMutAct_9fa48("2000") ? "" : (stryCov_9fa48("2000"), 'hashchange'), onChange);
    return stryMutAct_9fa48("2001") ? () => undefined : (stryCov_9fa48("2001"), () => window.removeEventListener(stryMutAct_9fa48("2002") ? "" : (stryCov_9fa48("2002"), 'hashchange'), onChange));
  }
}
const currentHash = stryMutAct_9fa48("2003") ? () => undefined : (stryCov_9fa48("2003"), (() => {
  const currentHash = () => window.location.hash;
  return currentHash;
})());
const serverHash = stryMutAct_9fa48("2004") ? () => undefined : (stryCov_9fa48("2004"), (() => {
  const serverHash = () => stryMutAct_9fa48("2005") ? "Stryker was here!" : (stryCov_9fa48("2005"), '');
  return serverHash;
})());
export default function Home() {
  if (stryMutAct_9fa48("2006")) {
    {}
  } else {
    stryCov_9fa48("2006");
    const [notice, setNotice] = useState(stryMutAct_9fa48("2007") ? "Stryker was here!" : (stryCov_9fa48("2007"), ''));
    useEffect(() => {
      if (stryMutAct_9fa48("2009")) {
        {}
      } else {
        stryCov_9fa48("2009");
        if (stryMutAct_9fa48("2012") ? false : stryMutAct_9fa48("2011") ? true : stryMutAct_9fa48("2010") ? notice : (stryCov_9fa48("2010", "2011", "2012"), !notice)) return;
        const timer = window.setTimeout(stryMutAct_9fa48("2013") ? () => undefined : (stryCov_9fa48("2013"), () => setNotice(stryMutAct_9fa48("2014") ? "Stryker was here!" : (stryCov_9fa48("2014"), ''))), 7000);
        return stryMutAct_9fa48("2015") ? () => undefined : (stryCov_9fa48("2015"), () => window.clearTimeout(timer));
      }
    }, stryMutAct_9fa48("2016") ? [] : (stryCov_9fa48("2016"), [notice]));
    const hash = useSyncExternalStore(subscribeLocation, currentHash, serverHash);
    const preview = useMemo(stryMutAct_9fa48("2017") ? () => undefined : (stryCov_9fa48("2017"), () => sharedPreview(hash)), stryMutAct_9fa48("2018") ? [] : (stryCov_9fa48("2018"), [hash]));
    if (stryMutAct_9fa48("2021") ? preview.kind !== 'error' : stryMutAct_9fa48("2020") ? false : stryMutAct_9fa48("2019") ? true : (stryCov_9fa48("2019", "2020", "2021"), preview.kind === (stryMutAct_9fa48("2022") ? "" : (stryCov_9fa48("2022"), 'error')))) return <main className="shared-preview">
        <section className="preview-link-error">
          <h1>Preview unavailable</h1>
          <p role="alert">{preview.message}</p>
          <p>Your saved build has not been changed.</p>
          <a href="#studio">Return to your studio</a>
        </section>
      </main>;
    if (stryMutAct_9fa48("2025") ? preview.kind !== 'ready' : stryMutAct_9fa48("2024") ? false : stryMutAct_9fa48("2023") ? true : (stryCov_9fa48("2023", "2024", "2025"), preview.kind === (stryMutAct_9fa48("2026") ? "" : (stryCov_9fa48("2026"), 'ready')))) return <SharedBuildPreview key={hash} build={preview.build} onCustomize={draft => {
      if (stryMutAct_9fa48("2027")) {
        {}
      } else {
        stryCov_9fa48("2027");
        window.location.hash = (stryMutAct_9fa48("2028") ? "" : (stryCov_9fa48("2028"), 'build=')) + encodeBuild(draft);
      }
    }} />;
    return <DeviceWorkspace hash={hash} notice={notice} setNotice={setNotice} />;
  }
}
function DeviceWorkspace({
  hash,
  notice,
  setNotice
}: {
  hash: string;
  notice: string;
  setNotice: (notice: string) => void;
}) {
  if (stryMutAct_9fa48("2029")) {
    {}
  } else {
    stryCov_9fa48("2029");
    const manager = useBuild(setNotice, stryMutAct_9fa48("2030") ? {} : (stryCov_9fa48("2030"), {
      shortcutsEnabled: stryMutAct_9fa48("2033") ? ['#studio', '#sound', '#play', '#build-settings', '#fit-checks'].includes(hash) && hash.startsWith('#switch=') : stryMutAct_9fa48("2032") ? false : stryMutAct_9fa48("2031") ? true : (stryCov_9fa48("2031", "2032", "2033"), (stryMutAct_9fa48("2034") ? [] : (stryCov_9fa48("2034"), [stryMutAct_9fa48("2035") ? "" : (stryCov_9fa48("2035"), '#studio'), stryMutAct_9fa48("2036") ? "" : (stryCov_9fa48("2036"), '#sound'), stryMutAct_9fa48("2037") ? "" : (stryCov_9fa48("2037"), '#play'), stryMutAct_9fa48("2038") ? "" : (stryCov_9fa48("2038"), '#build-settings'), stryMutAct_9fa48("2039") ? "" : (stryCov_9fa48("2039"), '#fit-checks')])).includes(hash) || (stryMutAct_9fa48("2040") ? hash.endsWith('#switch=') : (stryCov_9fa48("2040"), hash.startsWith(stryMutAct_9fa48("2041") ? "" : (stryCov_9fa48("2041"), '#switch=')))))
    }));
    const [deckSessions, setDeckSessions] = useState(new Map<DeckId, DeckBuild>());
    const rememberDeck = useCallback((build: DeckBuild) => {
      if (stryMutAct_9fa48("2042")) {
        {}
      } else {
        stryCov_9fa48("2042");
        setDeckSessions(stryMutAct_9fa48("2044") ? () => undefined : (stryCov_9fa48("2044"), previous => (stryMutAct_9fa48("2047") ? previous.get(build.device) !== build : stryMutAct_9fa48("2046") ? false : stryMutAct_9fa48("2045") ? true : (stryCov_9fa48("2045", "2046", "2047"), previous.get(build.device) === build)) ? previous : new Map(previous).set(build.device, build)));
      }
    }, stryMutAct_9fa48("2048") ? ["Stryker was here"] : (stryCov_9fa48("2048"), []));
    const deck = useMemo(() => {
      if (stryMutAct_9fa48("2049")) {
        {}
      } else {
        stryCov_9fa48("2049");
        if (stryMutAct_9fa48("2052") ? hash !== '#deck/grok-bot' : stryMutAct_9fa48("2051") ? false : stryMutAct_9fa48("2050") ? true : (stryCov_9fa48("2050", "2051", "2052"), hash === (stryMutAct_9fa48("2053") ? "" : (stryCov_9fa48("2053"), '#deck/grok-bot')))) return {
          kind: 'deck',
          build: deckSessions.get('grok-bot') ?? newDeck('grok-bot'),
          restoreLocal: !deckSessions.has('grok-bot')
        } as const;
        if (stryMutAct_9fa48("2056") ? hash !== '#deck/codex-micro' : stryMutAct_9fa48("2055") ? false : stryMutAct_9fa48("2054") ? true : (stryCov_9fa48("2054", "2055", "2056"), hash === (stryMutAct_9fa48("2057") ? "" : (stryCov_9fa48("2057"), '#deck/codex-micro')))) return {
          kind: 'deck',
          build: deckSessions.get('codex-micro') ?? newDeck('codex-micro'),
          restoreLocal: !deckSessions.has('codex-micro')
        } as const;
        if (stryMutAct_9fa48("2060") ? hash.endsWith('#deck=') : stryMutAct_9fa48("2059") ? false : stryMutAct_9fa48("2058") ? true : (stryCov_9fa48("2058", "2059", "2060"), hash.startsWith(stryMutAct_9fa48("2061") ? "" : (stryCov_9fa48("2061"), '#deck=')))) {
          if (stryMutAct_9fa48("2062")) {
            {}
          } else {
            stryCov_9fa48("2062");
            try {
              if (stryMutAct_9fa48("2063")) {
                {}
              } else {
                stryCov_9fa48("2063");
                return {
                  kind: 'deck',
                  build: decodeDeck(hash.slice(6)),
                  restoreLocal: false
                } as const;
              }
            } catch (error) {
              if (stryMutAct_9fa48("2064")) {
                {}
              } else {
                stryCov_9fa48("2064");
                return {
                  kind: 'error',
                  message: error instanceof Error ? error.message : 'The control deck could not be read.'
                } as const;
              }
            }
          }
        }
        return {
          kind: 'keyboard'
        } as const;
      }
    }, stryMutAct_9fa48("2065") ? [] : (stryCov_9fa48("2065"), [hash, deckSessions]));
    if (stryMutAct_9fa48("2068") ? deck.kind !== 'error' : stryMutAct_9fa48("2067") ? false : stryMutAct_9fa48("2066") ? true : (stryCov_9fa48("2066", "2067", "2068"), deck.kind === (stryMutAct_9fa48("2069") ? "" : (stryCov_9fa48("2069"), 'error')))) return <main className="deck-studio">
        <div className="deck-inspector">
          <h1>Deck link unavailable</h1>
          <p role="alert">{deck.message}</p>
          <a href="#studio">Return to your keyboard</a>
        </div>
      </main>;
    if (stryMutAct_9fa48("2072") ? deck.kind !== 'deck' : stryMutAct_9fa48("2071") ? false : stryMutAct_9fa48("2070") ? true : (stryCov_9fa48("2070", "2071", "2072"), deck.kind === (stryMutAct_9fa48("2073") ? "" : (stryCov_9fa48("2073"), 'deck')))) return <ControlDeckStudio key={hash} initial={deck.build} restoreLocal={deck.restoreLocal} onChange={rememberDeck} />;
    return <KeyboardStudio hash={hash} manager={manager} notice={notice} setNotice={setNotice} />;
  }
}
const sources = stryMutAct_9fa48("2074") ? [] : (stryCov_9fa48("2074"), [stryMutAct_9fa48("2075") ? {} : (stryCov_9fa48("2075"), {
  title: stryMutAct_9fa48("2076") ? "" : (stryCov_9fa48("2076"), 'Grok Bot control deck concept'),
  by: stryMutAct_9fa48("2077") ? "" : (stryCov_9fa48("2077"), 'Elvis · X · concept reference'),
  url: stryMutAct_9fa48("2078") ? "" : (stryCov_9fa48("2078"), 'https://x.com/omarsar0/status/2096321091148947887'),
  text: stryMutAct_9fa48("2079") ? "" : (stryCov_9fa48("2079"), 'A speculative control deck with illuminated role keys, a screen, a rotary dial and an exploded assembly. The video is a visual reference and has no audio track.')
}), stryMutAct_9fa48("2080") ? {} : (stryCov_9fa48("2080"), {
  title: stryMutAct_9fa48("2081") ? "" : (stryCov_9fa48("2081"), 'Codex Micro'),
  by: stryMutAct_9fa48("2082") ? "" : (stryCov_9fa48("2082"), 'OpenAI × Work Louder · product reference'),
  url: stryMutAct_9fa48("2083") ? "" : (stryCov_9fa48("2083"), 'https://openai.com/supply/co-lab/work-louder/'),
  text: stryMutAct_9fa48("2084") ? "" : (stryCov_9fa48("2084"), 'Official reference for the compact control deck, its translucent caps, mechanical switches, rotary encoder, touch sensor and joystick.')
}), stryMutAct_9fa48("2085") ? {} : (stryCov_9fa48("2085"), {
  title: stryMutAct_9fa48("2086") ? "" : (stryCov_9fa48("2086"), 'The original reference'),
  by: stryMutAct_9fa48("2087") ? "" : (stryCov_9fa48("2087"), 'bluedev · X'),
  url: stryMutAct_9fa48("2088") ? "" : (stryCov_9fa48("2088"), 'https://x.com/blueemi99/status/2096217626334650719'),
  text: stryMutAct_9fa48("2089") ? "" : (stryCov_9fa48("2089"), 'Rounded keycaps, a warm studio scene, and responsive keypresses. The post credits GPT Astra; its implementation stack was not published in the retrieved text.')
}), stryMutAct_9fa48("2090") ? {} : (stryCov_9fa48("2090"), {
  title: stryMutAct_9fa48("2091") ? "" : (stryCov_9fa48("2091"), 'Taeha Types'),
  by: stryMutAct_9fa48("2092") ? "" : (stryCov_9fa48("2092"), 'Build craft & recording reference'),
  url: stryMutAct_9fa48("2093") ? "" : (stryCov_9fa48("2093"), 'https://www.taehatypes.com/'),
  text: stryMutAct_9fa48("2094") ? "" : (stryCov_9fa48("2094"), 'A reference for the care, presentation, and individuality of custom keyboard builds. Audio is linked for research, not copied into this app.')
}), stryMutAct_9fa48("2095") ? {} : (stryCov_9fa48("2095"), {
  title: stryMutAct_9fa48("2096") ? "" : (stryCov_9fa48("2096"), 'How keyboard sound is recorded'),
  by: stryMutAct_9fa48("2097") ? "" : (stryCov_9fa48("2097"), 'Kinetic Labs'),
  url: stryMutAct_9fa48("2098") ? "" : (stryCov_9fa48("2098"), 'https://kineticlabs.com/blog/tips-for-recording-a-good-keyboard-typing-sound-test'),
  text: stryMutAct_9fa48("2099") ? "" : (stryCov_9fa48("2099"), 'Mic position, room, desk, and processing affect a recording. A useful comparison records known builds under consistent conditions.')
}), stryMutAct_9fa48("2100") ? {} : (stryCov_9fa48("2100"), {
  title: stryMutAct_9fa48("2101") ? "" : (stryCov_9fa48("2101"), 'Sample-based sound packs'),
  by: stryMutAct_9fa48("2102") ? "" : (stryCov_9fa48("2102"), 'Mechvibes'),
  url: stryMutAct_9fa48("2103") ? "" : (stryCov_9fa48("2103"), 'https://github.com/hainguyents13/mechvibes/wiki/Config-Versions'),
  text: stryMutAct_9fa48("2104") ? "" : (stryCov_9fa48("2104"), 'Maps keys to recordings. The studio now includes seven attributed recorded presets and a searchable library of original switch-test videos.')
}), stryMutAct_9fa48("2105") ? {} : (stryCov_9fa48("2105"), {
  title: stryMutAct_9fa48("2106") ? "" : (stryCov_9fa48("2106"), 'Compatibility is more than layout'),
  by: stryMutAct_9fa48("2107") ? "" : (stryCov_9fa48("2107"), 'CannonKeys · Bakeneko build guide'),
  url: stryMutAct_9fa48("2108") ? "" : (stryCov_9fa48("2108"), 'https://docs.cannonkeys.com/bakeneko/'),
  text: stryMutAct_9fa48("2109") ? "" : (stryCov_9fa48("2109"), 'O-ring mounting requires clip-in stabilizers. A shared percentage or stem type does not establish mechanical fit.')
}), stryMutAct_9fa48("2110") ? {} : (stryCov_9fa48("2110"), {
  title: stryMutAct_9fa48("2111") ? "" : (stryCov_9fa48("2111"), 'A real clearance exception'),
  by: stryMutAct_9fa48("2112") ? "" : (stryCov_9fa48("2112"), 'KBDfans · Tofu60 Redux plate'),
  url: stryMutAct_9fa48("2113") ? "" : (stryCov_9fa48("2113"), 'https://kbdfans.com/products/tofu60-redux-plate'),
  text: stryMutAct_9fa48("2114") ? "" : (stryCov_9fa48("2114"), 'Manufacturer documentation explicitly excludes Durock and Typeplus × YIKB screw-in stabilizers. This exception is encoded in the builder.')
}), stryMutAct_9fa48("2115") ? {} : (stryCov_9fa48("2115"), {
  title: stryMutAct_9fa48("2116") ? "" : (stryCov_9fa48("2116"), 'Product catalog ingestion'),
  by: stryMutAct_9fa48("2117") ? "" : (stryCov_9fa48("2117"), 'Shopify Storefront API'),
  url: stryMutAct_9fa48("2118") ? "" : (stryCov_9fa48("2118"), 'https://shopify.dev/docs/api/storefront/latest'),
  text: stryMutAct_9fa48("2119") ? "" : (stryCov_9fa48("2119"), 'Public catalog access supports an import preview. Variants, pagination, regional pricing, and storefront access still affect coverage.')
}), stryMutAct_9fa48("2120") ? {} : (stryCov_9fa48("2120"), {
  title: stryMutAct_9fa48("2121") ? "" : (stryCov_9fa48("2121"), 'Exact layout geometry'),
  by: stryMutAct_9fa48("2122") ? "" : (stryCov_9fa48("2122"), 'QMK · info.json specification'),
  url: stryMutAct_9fa48("2123") ? "" : (stryCov_9fa48("2123"), 'https://docs.qmk.fm/reference_info_json'),
  text: stryMutAct_9fa48("2124") ? "" : (stryCov_9fa48("2124"), 'Named layouts provide per-key positions and sizes. They can describe keycap coverage, but do not prove case or PCB fit.')
})]);
type Tab = 'design' | 'parts' | 'sound';
type Modal = 'import' | 'research' | 'search' | 'share' | {
  kind: 'import';
  source: string;
} | null;
function KeyboardStudio({
  hash,
  manager,
  notice,
  setNotice
}: {
  hash: string;
  manager: ReturnType<typeof useBuild>;
  notice: string;
  setNotice: (notice: string) => void;
}) {
  if (stryMutAct_9fa48("2125")) {
    {}
  } else {
    stryCov_9fa48("2125");
    const switchId = (stryMutAct_9fa48("2126") ? hash.endsWith('#switch=') : (stryCov_9fa48("2126"), hash.startsWith(stryMutAct_9fa48("2127") ? "" : (stryCov_9fa48("2127"), '#switch=')))) ? (() => {
      if (stryMutAct_9fa48("2128")) {
        {}
      } else {
        stryCov_9fa48("2128");
        try {
          if (stryMutAct_9fa48("2129")) {
            {}
          } else {
            stryCov_9fa48("2129");
            return decodeURIComponent(stryMutAct_9fa48("2130") ? hash : (stryCov_9fa48("2130"), hash.slice(8)));
          }
        } catch {
          if (stryMutAct_9fa48("2131")) {
            {}
          } else {
            stryCov_9fa48("2131");
            return stryMutAct_9fa48("2132") ? "Stryker was here!" : (stryCov_9fa48("2132"), '');
          }
        }
      }
    })() : null;
    const screen = (stryMutAct_9fa48("2135") ? switchId === null : stryMutAct_9fa48("2134") ? false : stryMutAct_9fa48("2133") ? true : (stryCov_9fa48("2133", "2134", "2135"), switchId !== null)) ? stryMutAct_9fa48("2136") ? "" : (stryCov_9fa48("2136"), 'switch') : (stryMutAct_9fa48("2139") ? hash === '' && hash === '#home' : stryMutAct_9fa48("2138") ? false : stryMutAct_9fa48("2137") ? true : (stryCov_9fa48("2137", "2138", "2139"), (stryMutAct_9fa48("2141") ? hash !== '' : stryMutAct_9fa48("2140") ? false : (stryCov_9fa48("2140", "2141"), hash === (stryMutAct_9fa48("2142") ? "Stryker was here!" : (stryCov_9fa48("2142"), '')))) || (stryMutAct_9fa48("2144") ? hash !== '#home' : stryMutAct_9fa48("2143") ? false : (stryCov_9fa48("2143", "2144"), hash === (stryMutAct_9fa48("2145") ? "" : (stryCov_9fa48("2145"), '#home')))))) ? stryMutAct_9fa48("2146") ? "" : (stryCov_9fa48("2146"), 'home') : (stryMutAct_9fa48("2149") ? hash !== '#sound' : stryMutAct_9fa48("2148") ? false : stryMutAct_9fa48("2147") ? true : (stryCov_9fa48("2147", "2148", "2149"), hash === (stryMutAct_9fa48("2150") ? "" : (stryCov_9fa48("2150"), '#sound')))) ? stryMutAct_9fa48("2151") ? "" : (stryCov_9fa48("2151"), 'sound') : (stryMutAct_9fa48("2154") ? hash !== '#play' : stryMutAct_9fa48("2153") ? false : stryMutAct_9fa48("2152") ? true : (stryCov_9fa48("2152", "2153", "2154"), hash === (stryMutAct_9fa48("2155") ? "" : (stryCov_9fa48("2155"), '#play')))) ? stryMutAct_9fa48("2156") ? "" : (stryCov_9fa48("2156"), 'play') : (stryMutAct_9fa48("2159") ? hash === '#discover' && hash === '#research' : stryMutAct_9fa48("2158") ? false : stryMutAct_9fa48("2157") ? true : (stryCov_9fa48("2157", "2158", "2159"), (stryMutAct_9fa48("2161") ? hash !== '#discover' : stryMutAct_9fa48("2160") ? false : (stryCov_9fa48("2160", "2161"), hash === (stryMutAct_9fa48("2162") ? "" : (stryCov_9fa48("2162"), '#discover')))) || (stryMutAct_9fa48("2164") ? hash !== '#research' : stryMutAct_9fa48("2163") ? false : (stryCov_9fa48("2163", "2164"), hash === (stryMutAct_9fa48("2165") ? "" : (stryCov_9fa48("2165"), '#research')))))) ? stryMutAct_9fa48("2166") ? "" : (stryCov_9fa48("2166"), 'discover') : stryMutAct_9fa48("2167") ? "" : (stryCov_9fa48("2167"), 'build');
    const landing = stryMutAct_9fa48("2170") ? screen !== 'home' : stryMutAct_9fa48("2169") ? false : stryMutAct_9fa48("2168") ? true : (stryCov_9fa48("2168", "2169", "2170"), screen === (stryMutAct_9fa48("2171") ? "" : (stryCov_9fa48("2171"), 'home')));
    useEffect(() => {
      if (stryMutAct_9fa48("2173")) {
        {}
      } else {
        stryCov_9fa48("2173");
        if (stryMutAct_9fa48("2176") ? false : stryMutAct_9fa48("2175") ? true : stryMutAct_9fa48("2174") ? ['', '#home', '#studio', '#sound', '#play', '#discover', '#research'].includes(hash) : (stryCov_9fa48("2174", "2175", "2176"), !(stryMutAct_9fa48("2177") ? [] : (stryCov_9fa48("2177"), [stryMutAct_9fa48("2178") ? "Stryker was here!" : (stryCov_9fa48("2178"), ''), stryMutAct_9fa48("2179") ? "" : (stryCov_9fa48("2179"), '#home'), stryMutAct_9fa48("2180") ? "" : (stryCov_9fa48("2180"), '#studio'), stryMutAct_9fa48("2181") ? "" : (stryCov_9fa48("2181"), '#sound'), stryMutAct_9fa48("2182") ? "" : (stryCov_9fa48("2182"), '#play'), stryMutAct_9fa48("2183") ? "" : (stryCov_9fa48("2183"), '#discover'), stryMutAct_9fa48("2184") ? "" : (stryCov_9fa48("2184"), '#research')])).includes(hash))) return;
        window.scrollTo(stryMutAct_9fa48("2186") ? {} : (stryCov_9fa48("2186"), {
          top: 0,
          behavior: stryMutAct_9fa48("2187") ? "" : (stryCov_9fa48("2187"), 'instant')
        }));
        stryMutAct_9fa48("2188") ? document.querySelector('.config-scroll').scrollTo({
          top: 0
        }) : (stryCov_9fa48("2188"), document.querySelector(stryMutAct_9fa48("2189") ? "" : (stryCov_9fa48("2189"), '.config-scroll'))?.scrollTo(stryMutAct_9fa48("2190") ? {} : (stryCov_9fa48("2190"), {
          top: 0
        })));
      }
    }, stryMutAct_9fa48("2191") ? [] : (stryCov_9fa48("2191"), [hash]));
    const [featured, setFeatured] = useState(featuredBuilds[0]);
    const {
      build,
      ready,
      saveState,
      edit,
      commit,
      undo,
      redo,
      canUndo,
      canRedo
    } = manager;
    const {
      palette,
      caseColor,
      layout,
      finish,
      profile,
      selection,
      customParts: imports
    } = build;
    const {
      character,
      volume,
      damping
    } = build.audio;
    const pack = stryMutAct_9fa48("2192") ? soundPacks.find(p => p.id === build.audio.source) && null : (stryCov_9fa48("2192"), soundPacks.find(stryMutAct_9fa48("2193") ? () => undefined : (stryCov_9fa48("2193"), p => stryMutAct_9fa48("2196") ? p.id !== build.audio.source : stryMutAct_9fa48("2195") ? false : stryMutAct_9fa48("2194") ? true : (stryCov_9fa48("2194", "2195", "2196"), p.id === build.audio.source))) ?? null);
    const setPalette = stryMutAct_9fa48("2197") ? () => undefined : (stryCov_9fa48("2197"), (() => {
      const setPalette = (palette: typeof build.palette) => edit(stryMutAct_9fa48("2198") ? {} : (stryCov_9fa48("2198"), {
        palette
      }));
      return setPalette;
    })());
    const setLayout = stryMutAct_9fa48("2199") ? () => undefined : (stryCov_9fa48("2199"), (() => {
      const setLayout = (layout: typeof build.layout) => edit(stryMutAct_9fa48("2200") ? {} : (stryCov_9fa48("2200"), {
        layout
      }));
      return setLayout;
    })());
    useEffect(() => {
      if (stryMutAct_9fa48("2202")) {
        {}
      } else {
        stryCov_9fa48("2202");
        const p = build.palette;
        applyPaletteTheme(stryMutAct_9fa48("2204") ? {} : (stryCov_9fa48("2204"), {
          alpha: p.alpha,
          mod: p.mod,
          accent: p.accent,
          space: p.space
        }));
        document.documentElement.setAttribute(stryMutAct_9fa48("2206") ? "" : (stryCov_9fa48("2206"), 'data-palette'), JSON.stringify(stryMutAct_9fa48("2207") ? {} : (stryCov_9fa48("2207"), {
          alpha: p.alpha,
          mod: p.mod,
          accent: p.accent,
          space: p.space
        })));
      }
    }, stryMutAct_9fa48("2208") ? [] : (stryCov_9fa48("2208"), [build.palette]));
    const [exploded, setExploded] = useState(stryMutAct_9fa48("2209") ? true : (stryCov_9fa48("2209"), false));
    const [view, setView] = useState(stryMutAct_9fa48("2210") ? "" : (stryCov_9fa48("2210"), 'perspective'));
    const [focusAt, setFocusAt] = useState<string | null>(null);
    const returnToTypingLauncher = useRef(stryMutAct_9fa48("2211") ? true : (stryCov_9fa48("2211"), false));
    useEffect(() => {
      if (stryMutAct_9fa48("2213")) {
        {}
      } else {
        stryCov_9fa48("2213");
        if (stryMutAct_9fa48("2216") ? screen !== 'build' && !returnToTypingLauncher.current : stryMutAct_9fa48("2215") ? false : stryMutAct_9fa48("2214") ? true : (stryCov_9fa48("2214", "2215", "2216"), (stryMutAct_9fa48("2218") ? screen === 'build' : stryMutAct_9fa48("2217") ? false : (stryCov_9fa48("2217", "2218"), screen !== (stryMutAct_9fa48("2219") ? "" : (stryCov_9fa48("2219"), 'build')))) || (stryMutAct_9fa48("2220") ? returnToTypingLauncher.current : (stryCov_9fa48("2220"), !returnToTypingLauncher.current)))) return;
        returnToTypingLauncher.current = stryMutAct_9fa48("2221") ? true : (stryCov_9fa48("2221"), false);
        stryMutAct_9fa48("2222") ? document.getElementById('start-typing-test').focus() : (stryCov_9fa48("2222"), document.getElementById(stryMutAct_9fa48("2223") ? "" : (stryCov_9fa48("2223"), 'start-typing-test'))?.focus());
      }
    }, stryMutAct_9fa48("2224") ? [] : (stryCov_9fa48("2224"), [screen]));
    const experience = (stryMutAct_9fa48("2227") ? focusAt !== hash : stryMutAct_9fa48("2226") ? false : stryMutAct_9fa48("2225") ? true : (stryCov_9fa48("2225", "2226", "2227"), focusAt === hash)) ? stryMutAct_9fa48("2228") ? "" : (stryCov_9fa48("2228"), 'focus') : (stryMutAct_9fa48("2231") ? screen !== 'play' : stryMutAct_9fa48("2230") ? false : stryMutAct_9fa48("2229") ? true : (stryCov_9fa48("2229", "2230", "2231"), screen === (stryMutAct_9fa48("2232") ? "" : (stryCov_9fa48("2232"), 'play')))) ? stryMutAct_9fa48("2233") ? "" : (stryCov_9fa48("2233"), 'typing') : stryMutAct_9fa48("2234") ? "" : (stryCov_9fa48("2234"), 'builder');
    function setExperience(next: 'builder' | 'focus' | 'typing') {
      if (stryMutAct_9fa48("2235")) {
        {}
      } else {
        stryCov_9fa48("2235");
        setFocusAt((stryMutAct_9fa48("2239") ? next !== 'focus' : stryMutAct_9fa48("2238") ? false : stryMutAct_9fa48("2237") ? true : (stryCov_9fa48("2237", "2238", "2239"), next === (stryMutAct_9fa48("2240") ? "" : (stryCov_9fa48("2240"), 'focus')))) ? hash : null);
        if (stryMutAct_9fa48("2243") ? next !== 'typing' : stryMutAct_9fa48("2242") ? false : stryMutAct_9fa48("2241") ? true : (stryCov_9fa48("2241", "2242", "2243"), next === (stryMutAct_9fa48("2244") ? "" : (stryCov_9fa48("2244"), 'typing')))) window.location.hash = stryMutAct_9fa48("2245") ? "" : (stryCov_9fa48("2245"), 'play');else if (stryMutAct_9fa48("2248") ? next === 'builder' || screen === 'play' : stryMutAct_9fa48("2247") ? false : stryMutAct_9fa48("2246") ? true : (stryCov_9fa48("2246", "2247", "2248"), (stryMutAct_9fa48("2250") ? next !== 'builder' : stryMutAct_9fa48("2249") ? true : (stryCov_9fa48("2249", "2250"), next === (stryMutAct_9fa48("2251") ? "" : (stryCov_9fa48("2251"), 'builder')))) && (stryMutAct_9fa48("2253") ? screen !== 'play' : stryMutAct_9fa48("2252") ? true : (stryCov_9fa48("2252", "2253"), screen === (stryMutAct_9fa48("2254") ? "" : (stryCov_9fa48("2254"), 'play')))))) window.location.assign(stryMutAct_9fa48("2256") ? "" : (stryCov_9fa48("2256"), '#studio'));
      }
    }
    const focusMode = stryMutAct_9fa48("2259") ? experience !== 'focus' : stryMutAct_9fa48("2258") ? false : stryMutAct_9fa48("2257") ? true : (stryCov_9fa48("2257", "2258", "2259"), experience === (stryMutAct_9fa48("2260") ? "" : (stryCov_9fa48("2260"), 'focus')));
    if (stryMutAct_9fa48("2261")) {
      ;
    } else {
      stryCov_9fa48("2261");
      useEffect(() => {
        if (stryMutAct_9fa48("2262")) {
          {}
        } else {
          stryCov_9fa48("2262");
          if (stryMutAct_9fa48("2265") ? false : stryMutAct_9fa48("2264") ? true : stryMutAct_9fa48("2263") ? focusMode : (stryCov_9fa48("2263", "2264", "2265"), !focusMode)) return;
          const escape = (event: KeyboardEvent) => {
            if (stryMutAct_9fa48("2266")) {
              {}
            } else {
              stryCov_9fa48("2266");
              if (stryMutAct_9fa48("2269") ? event.key === 'Escape' || !document.querySelector('dialog[open]') : stryMutAct_9fa48("2268") ? false : stryMutAct_9fa48("2267") ? true : (stryCov_9fa48("2267", "2268", "2269"), (stryMutAct_9fa48("2271") ? event.key !== 'Escape' : stryMutAct_9fa48("2270") ? true : (stryCov_9fa48("2270", "2271"), event.key === (stryMutAct_9fa48("2272") ? "" : (stryCov_9fa48("2272"), 'Escape')))) && (stryMutAct_9fa48("2273") ? document.querySelector('dialog[open]') : (stryCov_9fa48("2273"), !document.querySelector(stryMutAct_9fa48("2274") ? "" : (stryCov_9fa48("2274"), 'dialog[open]')))))) if (stryMutAct_9fa48("2275")) {
                ;
              } else {
                stryCov_9fa48("2275");
                setFocusAt(null);
              }
            }
          };
          window.addEventListener(stryMutAct_9fa48("2277") ? "" : (stryCov_9fa48("2277"), 'keydown'), escape);
          return stryMutAct_9fa48("2278") ? () => undefined : (stryCov_9fa48("2278"), () => window.removeEventListener(stryMutAct_9fa48("2279") ? "" : (stryCov_9fa48("2279"), 'keydown'), escape));
        }
      }, stryMutAct_9fa48("2280") ? [] : (stryCov_9fa48("2280"), [focusMode]));
    }
    const [buildTab, setActiveTab] = useState<'design' | 'parts'>(stryMutAct_9fa48("2281") ? "" : (stryCov_9fa48("2281"), 'parts'));
    const tab: Tab = (stryMutAct_9fa48("2284") ? screen !== 'sound' : stryMutAct_9fa48("2283") ? false : stryMutAct_9fa48("2282") ? true : (stryCov_9fa48("2282", "2283", "2284"), screen === (stryMutAct_9fa48("2285") ? "" : (stryCov_9fa48("2285"), 'sound')))) ? stryMutAct_9fa48("2286") ? "" : (stryCov_9fa48("2286"), 'sound') : buildTab;
    const [reference, setReference] = useState<SoundReference | null>(null);
    function setTab(value: Tab) {
      if (stryMutAct_9fa48("2287")) {
        {}
      } else {
        stryCov_9fa48("2287");
        if (stryMutAct_9fa48("2288")) {
          ;
        } else {
          stryCov_9fa48("2288");
          setReference(null);
        }
        stryMutAct_9fa48("2289") ? document.querySelector('.config-scroll').scrollTo({
          top: 0
        }) : (stryCov_9fa48("2289"), document.querySelector(stryMutAct_9fa48("2290") ? "" : (stryCov_9fa48("2290"), '.config-scroll'))?.scrollTo(stryMutAct_9fa48("2291") ? {} : (stryCov_9fa48("2291"), {
          top: 0
        })));
        if (stryMutAct_9fa48("2294") ? value !== 'sound' : stryMutAct_9fa48("2293") ? false : stryMutAct_9fa48("2292") ? true : (stryCov_9fa48("2292", "2293", "2294"), value === (stryMutAct_9fa48("2295") ? "" : (stryCov_9fa48("2295"), 'sound')))) window.location.assign(stryMutAct_9fa48("2297") ? "" : (stryCov_9fa48("2297"), '#sound'));else {
          if (stryMutAct_9fa48("2298")) {
            {}
          } else {
            stryCov_9fa48("2298");
            if (stryMutAct_9fa48("2299")) {
              ;
            } else {
              stryCov_9fa48("2299");
              setActiveTab(value);
            }
            window.location.assign(stryMutAct_9fa48("2301") ? "" : (stryCov_9fa48("2301"), '#studio'));
          }
        }
      }
    }
    const [modal, setModal] = useState<Modal>(null);
    const searchOrigin = useRef<HTMLElement | null>(null);
    const importing = stryMutAct_9fa48("2304") ? modal === 'import' && modal !== null && typeof modal === 'object' : stryMutAct_9fa48("2303") ? false : stryMutAct_9fa48("2302") ? true : (stryCov_9fa48("2302", "2303", "2304"), (stryMutAct_9fa48("2306") ? modal !== 'import' : stryMutAct_9fa48("2305") ? false : (stryCov_9fa48("2305", "2306"), modal === (stryMutAct_9fa48("2307") ? "" : (stryCov_9fa48("2307"), 'import')))) || (stryMutAct_9fa48("2309") ? modal !== null || typeof modal === 'object' : stryMutAct_9fa48("2308") ? false : (stryCov_9fa48("2308", "2309"), (stryMutAct_9fa48("2311") ? modal === null : stryMutAct_9fa48("2310") ? true : (stryCov_9fa48("2310", "2311"), modal !== null)) && (stryMutAct_9fa48("2313") ? typeof modal !== 'object' : stryMutAct_9fa48("2312") ? true : (stryCov_9fa48("2312", "2313"), typeof modal === (stryMutAct_9fa48("2314") ? "" : (stryCov_9fa48("2314"), 'object')))))));
    const reviewSwitch = stryMutAct_9fa48("2315") ? () => undefined : (stryCov_9fa48("2315"), (() => {
      const reviewSwitch = (source: string) => setModal(stryMutAct_9fa48("2316") ? {} : (stryCov_9fa48("2316"), {
        kind: stryMutAct_9fa48("2317") ? "" : (stryCov_9fa48("2317"), 'import'),
        source
      }));
      return reviewSwitch;
    })());
    if (stryMutAct_9fa48("2318")) {
      ;
    } else {
      stryCov_9fa48("2318");
      useEffect(() => {
        if (stryMutAct_9fa48("2319")) {
          {}
        } else {
          stryCov_9fa48("2319");
          const searchShortcut = (event: KeyboardEvent) => {
            if (stryMutAct_9fa48("2320")) {
              {}
            } else {
              stryCov_9fa48("2320");
              if (stryMutAct_9fa48("2323") ? (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k' || !event.isComposing : stryMutAct_9fa48("2322") ? false : stryMutAct_9fa48("2321") ? true : (stryCov_9fa48("2321", "2322", "2323"), (stryMutAct_9fa48("2325") ? (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey || event.key.toLowerCase() === 'k' : stryMutAct_9fa48("2324") ? true : (stryCov_9fa48("2324", "2325"), (stryMutAct_9fa48("2327") ? (event.metaKey || event.ctrlKey) && !event.altKey || !event.shiftKey : stryMutAct_9fa48("2326") ? true : (stryCov_9fa48("2326", "2327"), (stryMutAct_9fa48("2329") ? event.metaKey || event.ctrlKey || !event.altKey : stryMutAct_9fa48("2328") ? true : (stryCov_9fa48("2328", "2329"), (stryMutAct_9fa48("2331") ? event.metaKey && event.ctrlKey : stryMutAct_9fa48("2330") ? true : (stryCov_9fa48("2330", "2331"), event.metaKey || event.ctrlKey)) && (stryMutAct_9fa48("2332") ? event.altKey : (stryCov_9fa48("2332"), !event.altKey)))) && (stryMutAct_9fa48("2333") ? event.shiftKey : (stryCov_9fa48("2333"), !event.shiftKey)))) && (stryMutAct_9fa48("2335") ? event.key.toLowerCase() !== 'k' : stryMutAct_9fa48("2334") ? true : (stryCov_9fa48("2334", "2335"), (stryMutAct_9fa48("2336") ? event.key.toUpperCase() : (stryCov_9fa48("2336"), event.key.toLowerCase())) === (stryMutAct_9fa48("2337") ? "" : (stryCov_9fa48("2337"), 'k')))))) && (stryMutAct_9fa48("2338") ? event.isComposing : (stryCov_9fa48("2338"), !event.isComposing)))) {
                if (stryMutAct_9fa48("2339")) {
                  {}
                } else {
                  stryCov_9fa48("2339");
                  if (stryMutAct_9fa48("2341") ? false : stryMutAct_9fa48("2340") ? true : (stryCov_9fa48("2340", "2341"), document.querySelector(stryMutAct_9fa48("2342") ? "" : (stryCov_9fa48("2342"), 'dialog[open]')))) return;
                  if (stryMutAct_9fa48("2343")) {
                    ;
                  } else {
                    stryCov_9fa48("2343");
                    event.preventDefault();
                  }
                  searchOrigin.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
                  setModal(stryMutAct_9fa48("2345") ? "" : (stryCov_9fa48("2345"), 'search'));
                }
              }
            }
          };
          window.addEventListener(stryMutAct_9fa48("2347") ? "" : (stryCov_9fa48("2347"), 'keydown'), searchShortcut);
          return stryMutAct_9fa48("2348") ? () => undefined : (stryCov_9fa48("2348"), () => window.removeEventListener(stryMutAct_9fa48("2349") ? "" : (stryCov_9fa48("2349"), 'keydown'), searchShortcut));
        }
      }, stryMutAct_9fa48("2350") ? ["Stryker was here"] : (stryCov_9fa48("2350"), []));
    }
    const [enabled, setEnabled] = useState(stryMutAct_9fa48("2351") ? true : (stryCov_9fa48("2351"), false));
    const [shareUrl, setShareUrl] = useState(stryMutAct_9fa48("2352") ? "Stryker was here!" : (stryCov_9fa48("2352"), ''));
    const buildFile = useRef<HTMLInputElement>(null);
    const [loaded, setLoaded] = useState<{
      id: string;
      attempt: number;
      state: 'ready' | 'error';
      preview: SamplePreview | null;
    } | null>(null);
    const [loadAttempt, setLoadAttempt] = useState(0);
    const currentRecording = (stryMutAct_9fa48("2355") ? pack && loaded?.id === pack.id || loaded.attempt === loadAttempt : stryMutAct_9fa48("2354") ? false : stryMutAct_9fa48("2353") ? true : (stryCov_9fa48("2353", "2354", "2355"), (stryMutAct_9fa48("2357") ? pack || loaded?.id === pack.id : stryMutAct_9fa48("2356") ? true : (stryCov_9fa48("2356", "2357"), pack && (stryMutAct_9fa48("2359") ? loaded?.id !== pack.id : stryMutAct_9fa48("2358") ? true : (stryCov_9fa48("2358", "2359"), (stryMutAct_9fa48("2360") ? loaded.id : (stryCov_9fa48("2360"), loaded?.id)) === pack.id)))) && (stryMutAct_9fa48("2362") ? loaded.attempt !== loadAttempt : stryMutAct_9fa48("2361") ? true : (stryCov_9fa48("2361", "2362"), loaded.attempt === loadAttempt)))) ? loaded : null;
    const sampleState = pack ? stryMutAct_9fa48("2363") ? currentRecording?.state && 'loading' : (stryCov_9fa48("2363"), (stryMutAct_9fa48("2364") ? currentRecording.state : (stryCov_9fa48("2364"), currentRecording?.state)) ?? (stryMutAct_9fa48("2365") ? "" : (stryCov_9fa48("2365"), 'loading'))) : stryMutAct_9fa48("2366") ? "" : (stryCov_9fa48("2366"), 'ready');
    const [lastKey] = useState(createLastKey);
    const [demo, setDemo] = useState(stryMutAct_9fa48("2367") ? true : (stryCov_9fa48("2367"), false));
    const [roomMotion, setRoomMotion] = useState(stryMutAct_9fa48("2368") ? false : (stryCov_9fa48("2368"), true));
    const dialog = useRef<HTMLDialogElement>(null);
    const audio = useRef<KeyboardAudio | null>(null);
    const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
    const audioAction = useRef(stryMutAct_9fa48("2369") ? {} : (stryCov_9fa48("2369"), {
      revision: 0
    }));
    const visibleBuild = (stryMutAct_9fa48("2372") ? landing || featured.kind === 'keyboard' : stryMutAct_9fa48("2371") ? false : stryMutAct_9fa48("2370") ? true : (stryCov_9fa48("2370", "2371", "2372"), landing && (stryMutAct_9fa48("2374") ? featured.kind !== 'keyboard' : stryMutAct_9fa48("2373") ? true : (stryCov_9fa48("2373", "2374"), featured.kind === (stryMutAct_9fa48("2375") ? "" : (stryCov_9fa48("2375"), 'keyboard')))))) ? featured.build : build;
    const playbackEnabled = stryMutAct_9fa48("2378") ? enabled && !landing || screen !== 'discover' : stryMutAct_9fa48("2377") ? false : stryMutAct_9fa48("2376") ? true : (stryCov_9fa48("2376", "2377", "2378"), (stryMutAct_9fa48("2380") ? enabled || !landing : stryMutAct_9fa48("2379") ? true : (stryCov_9fa48("2379", "2380"), enabled && (stryMutAct_9fa48("2381") ? landing : (stryCov_9fa48("2381"), !landing)))) && (stryMutAct_9fa48("2383") ? screen === 'discover' : stryMutAct_9fa48("2382") ? true : (stryCov_9fa48("2382", "2383"), screen !== (stryMutAct_9fa48("2384") ? "" : (stryCov_9fa48("2384"), 'discover')))));
    const [music] = useState(stryMutAct_9fa48("2385") ? () => undefined : (stryCov_9fa48("2385"), () => new StudioMusic()));
    useEffect(() => {
      if (stryMutAct_9fa48("2387")) {
        {}
      } else {
        stryCov_9fa48("2387");
        music.setBlocked(stryMutAct_9fa48("2389") ? "" : (stryCov_9fa48("2389"), 'keyboard'), playbackEnabled);
        music.setBlocked(stryMutAct_9fa48("2391") ? "" : (stryCov_9fa48("2391"), 'reference'), stryMutAct_9fa48("2394") ? reference === null : stryMutAct_9fa48("2393") ? false : stryMutAct_9fa48("2392") ? true : (stryCov_9fa48("2392", "2393", "2394"), reference !== null));
      }
    }, stryMutAct_9fa48("2395") ? [] : (stryCov_9fa48("2395"), [music, playbackEnabled, reference]));
    useEffect(() => {
      if (stryMutAct_9fa48("2397")) {
        {}
      } else {
        stryCov_9fa48("2397");
        const hide = () => {
          if (stryMutAct_9fa48("2398")) {
            {}
          } else {
            stryCov_9fa48("2398");
            if (stryMutAct_9fa48("2400") ? false : stryMutAct_9fa48("2399") ? true : (stryCov_9fa48("2399", "2400"), document.hidden)) if (stryMutAct_9fa48("2401")) {
              ;
            } else {
              stryCov_9fa48("2401");
              music.pause();
            }
          }
        };
        document.addEventListener(stryMutAct_9fa48("2403") ? "" : (stryCov_9fa48("2403"), 'visibilitychange'), hide);
        const leave = stryMutAct_9fa48("2404") ? () => undefined : (stryCov_9fa48("2404"), (() => {
          const leave = () => music.pause();
          return leave;
        })());
        window.addEventListener(stryMutAct_9fa48("2406") ? "" : (stryCov_9fa48("2406"), 'pagehide'), leave);
        return () => {
          if (stryMutAct_9fa48("2407")) {
            {}
          } else {
            stryCov_9fa48("2407");
            document.removeEventListener(stryMutAct_9fa48("2409") ? "" : (stryCov_9fa48("2409"), 'visibilitychange'), hide);
            window.removeEventListener(stryMutAct_9fa48("2411") ? "" : (stryCov_9fa48("2411"), 'pagehide'), leave);
            if (stryMutAct_9fa48("2412")) {
              ;
            } else {
              stryCov_9fa48("2412");
              music.close();
            }
          }
        };
      }
    }, stryMutAct_9fa48("2413") ? [] : (stryCov_9fa48("2413"), [music]));
    if (stryMutAct_9fa48("2414")) {
      ;
    } else {
      stryCov_9fa48("2414");
      useEffect(() => {
        if (stryMutAct_9fa48("2415")) {
          {}
        } else {
          stryCov_9fa48("2415");
          let started = stryMutAct_9fa48("2416") ? true : (stryCov_9fa48("2416"), false);
          const startMusic = (event: Event) => {
            if (stryMutAct_9fa48("2417")) {
              {}
            } else {
              stryCov_9fa48("2417");
              if (stryMutAct_9fa48("2419") ? false : stryMutAct_9fa48("2418") ? true : (stryCov_9fa48("2418", "2419"), started)) return;
              if (stryMutAct_9fa48("2422") ? event.target instanceof Element || event.target.closest('.music-trigger, .music-popup') : stryMutAct_9fa48("2421") ? false : stryMutAct_9fa48("2420") ? true : (stryCov_9fa48("2420", "2421", "2422"), event.target instanceof Element && event.target.closest(stryMutAct_9fa48("2423") ? "" : (stryCov_9fa48("2423"), '.music-trigger, .music-popup')))) return;
              started = stryMutAct_9fa48("2424") ? false : (stryCov_9fa48("2424"), true);
              document.removeEventListener(stryMutAct_9fa48("2426") ? "" : (stryCov_9fa48("2426"), 'pointerdown'), startMusic, stryMutAct_9fa48("2427") ? false : (stryCov_9fa48("2427"), true));
              document.removeEventListener(stryMutAct_9fa48("2429") ? "" : (stryCov_9fa48("2429"), 'keydown'), startMusic, stryMutAct_9fa48("2430") ? false : (stryCov_9fa48("2430"), true));
              document.removeEventListener(stryMutAct_9fa48("2432") ? "" : (stryCov_9fa48("2432"), 'touchstart'), startMusic, stryMutAct_9fa48("2433") ? false : (stryCov_9fa48("2433"), true));
              void music.startOnFirstGesture();
            }
          };
          document.addEventListener(stryMutAct_9fa48("2435") ? "" : (stryCov_9fa48("2435"), 'pointerdown'), startMusic, stryMutAct_9fa48("2436") ? false : (stryCov_9fa48("2436"), true));
          document.addEventListener(stryMutAct_9fa48("2438") ? "" : (stryCov_9fa48("2438"), 'keydown'), startMusic, stryMutAct_9fa48("2439") ? false : (stryCov_9fa48("2439"), true));
          document.addEventListener(stryMutAct_9fa48("2441") ? "" : (stryCov_9fa48("2441"), 'touchstart'), startMusic, stryMutAct_9fa48("2442") ? false : (stryCov_9fa48("2442"), true));
          return () => {
            if (stryMutAct_9fa48("2443")) {
              {}
            } else {
              stryCov_9fa48("2443");
              document.removeEventListener(stryMutAct_9fa48("2445") ? "" : (stryCov_9fa48("2445"), 'pointerdown'), startMusic, stryMutAct_9fa48("2446") ? false : (stryCov_9fa48("2446"), true));
              document.removeEventListener(stryMutAct_9fa48("2448") ? "" : (stryCov_9fa48("2448"), 'keydown'), startMusic, stryMutAct_9fa48("2449") ? false : (stryCov_9fa48("2449"), true));
              document.removeEventListener(stryMutAct_9fa48("2451") ? "" : (stryCov_9fa48("2451"), 'touchstart'), startMusic, stryMutAct_9fa48("2452") ? false : (stryCov_9fa48("2452"), true));
            }
          };
        }
      }, stryMutAct_9fa48("2453") ? [] : (stryCov_9fa48("2453"), [music]));
    }
    const options = useMemo<SceneOptions>(() => {
      if (stryMutAct_9fa48("2454")) {
        {}
      } else {
        stryCov_9fa48("2454");
        if (stryMutAct_9fa48("2457") ? landing || featured.kind === 'control-deck' : stryMutAct_9fa48("2456") ? false : stryMutAct_9fa48("2455") ? true : (stryCov_9fa48("2455", "2456", "2457"), landing && (stryMutAct_9fa48("2459") ? featured.kind !== 'control-deck' : stryMutAct_9fa48("2458") ? true : (stryCov_9fa48("2458", "2459"), featured.kind === (stryMutAct_9fa48("2460") ? "" : (stryCov_9fa48("2460"), 'control-deck')))))) {
          if (stryMutAct_9fa48("2461")) {
            {}
          } else {
            stryCov_9fa48("2461");
            const {
              colors,
              device,
              lighting,
              dial
            } = featured.build;
            return stryMutAct_9fa48("2462") ? {} : (stryCov_9fa48("2462"), {
              alpha: colors.keys,
              mod: colors.commands,
              accent: colors.keys,
              space: colors.wide,
              caseColor: colors.case,
              finish: stryMutAct_9fa48("2463") ? "" : (stryCov_9fa48("2463"), 'Aluminum'),
              profile: stryMutAct_9fa48("2464") ? "" : (stryCov_9fa48("2464"), 'Sculpted'),
              device: stryMutAct_9fa48("2465") ? {} : (stryCov_9fa48("2465"), {
                kind: stryMutAct_9fa48("2466") ? "" : (stryCov_9fa48("2466"), 'control-deck'),
                model: device,
                lighting,
                dial
              }),
              exploded,
              view,
              environment: stryMutAct_9fa48("2467") ? "" : (stryCov_9fa48("2467"), 'desk'),
              roomMotion
            });
          }
        }
        return stryMutAct_9fa48("2468") ? {} : (stryCov_9fa48("2468"), {
          ...visibleBuild.palette,
          caseColor: visibleBuild.caseColor,
          device: stryMutAct_9fa48("2469") ? {} : (stryCov_9fa48("2469"), {
            kind: stryMutAct_9fa48("2470") ? "" : (stryCov_9fa48("2470"), 'keyboard'),
            layout: visibleBuild.layout,
            q1Max: isQ1MaxAssembly(visibleBuild)
          }),
          switchId: visibleBuild.selection.switch,
          accessories: visibleBuild.accessories,
          customAccessories: visibleBuild.customAccessories,
          exploded: (stryMutAct_9fa48("2473") ? experience !== 'typing' : stryMutAct_9fa48("2472") ? false : stryMutAct_9fa48("2471") ? true : (stryCov_9fa48("2471", "2472", "2473"), experience === (stryMutAct_9fa48("2474") ? "" : (stryCov_9fa48("2474"), 'typing')))) ? stryMutAct_9fa48("2475") ? true : (stryCov_9fa48("2475"), false) : exploded,
          view,
          finish: visibleBuild.finish,
          profile: visibleBuild.profile,
          environment: (stryMutAct_9fa48("2478") ? experience !== 'typing' : stryMutAct_9fa48("2477") ? false : stryMutAct_9fa48("2476") ? true : (stryCov_9fa48("2476", "2477", "2478"), experience === (stryMutAct_9fa48("2479") ? "" : (stryCov_9fa48("2479"), 'typing')))) ? stryMutAct_9fa48("2480") ? "" : (stryCov_9fa48("2480"), 'typing') : landing ? stryMutAct_9fa48("2481") ? "" : (stryCov_9fa48("2481"), 'desk') : stryMutAct_9fa48("2482") ? "" : (stryCov_9fa48("2482"), 'studio'),
          roomMotion
        });
      }
    }, stryMutAct_9fa48("2483") ? [] : (stryCov_9fa48("2483"), [visibleBuild, landing, featured, exploded, view, experience, roomMotion]));
    function customizePreview() {
      if (stryMutAct_9fa48("2484")) {
        {}
      } else {
        stryCov_9fa48("2484");
        if (stryMutAct_9fa48("2487") ? featured.kind !== 'control-deck' : stryMutAct_9fa48("2486") ? false : stryMutAct_9fa48("2485") ? true : (stryCov_9fa48("2485", "2486", "2487"), featured.kind === (stryMutAct_9fa48("2488") ? "" : (stryCov_9fa48("2488"), 'control-deck')))) {
          if (stryMutAct_9fa48("2489")) {
            {}
          } else {
            stryCov_9fa48("2489");
            window.location.hash = (stryMutAct_9fa48("2490") ? "" : (stryCov_9fa48("2490"), 'deck=')) + encodeDeck(featured.build);
            return;
          }
        }
        if (stryMutAct_9fa48("2491")) {
          ;
        } else {
          stryCov_9fa48("2491");
          edit(customizeFeatured(featured, build));
        }
        setActiveTab(stryMutAct_9fa48("2493") ? "" : (stryCov_9fa48("2493"), 'parts'));
        setExploded(stryMutAct_9fa48("2495") ? true : (stryCov_9fa48("2495"), false));
        setView(stryMutAct_9fa48("2497") ? "" : (stryCov_9fa48("2497"), 'perspective'));
        window.location.assign(stryMutAct_9fa48("2499") ? "" : (stryCov_9fa48("2499"), '#studio'));
        setNotice(featured.name + (stryMutAct_9fa48("2501") ? "" : (stryCov_9fa48("2501"), ' opened. Undo returns to your previous build.')));
      }
    }
    const parts = useMemo(stryMutAct_9fa48("2502") ? () => undefined : (stryCov_9fa48("2502"), () => stryMutAct_9fa48("2503") ? [] : (stryCov_9fa48("2503"), [...catalog, ...imports])), stryMutAct_9fa48("2504") ? [] : (stryCov_9fa48("2504"), [imports]));
    const selectedSwitch = parts.find(stryMutAct_9fa48("2505") ? () => undefined : (stryCov_9fa48("2505"), part => stryMutAct_9fa48("2508") ? part.id !== selection.switch : stryMutAct_9fa48("2507") ? false : stryMutAct_9fa48("2506") ? true : (stryCov_9fa48("2506", "2507", "2508"), part.id === selection.switch)));
    const checks = useMemo(stryMutAct_9fa48("2509") ? () => undefined : (stryCov_9fa48("2509"), () => checkBuild(selection, parts, layout)), stryMutAct_9fa48("2510") ? [] : (stryCov_9fa48("2510"), [selection, parts, layout]));
    const blocked = stryMutAct_9fa48("2511") ? checks.length : (stryCov_9fa48("2511"), checks.filter(stryMutAct_9fa48("2512") ? () => undefined : (stryCov_9fa48("2512"), c => stryMutAct_9fa48("2515") ? c.status !== 'incompatible' : stryMutAct_9fa48("2514") ? false : stryMutAct_9fa48("2513") ? true : (stryCov_9fa48("2513", "2514", "2515"), c.status === (stryMutAct_9fa48("2516") ? "" : (stryCov_9fa48("2516"), 'incompatible'))))).length);
    const sound = useMemo<SoundSettings>(stryMutAct_9fa48("2517") ? () => undefined : (stryCov_9fa48("2517"), () => stryMutAct_9fa48("2518") ? {} : (stryCov_9fa48("2518"), {
      enabled: playbackEnabled,
      character,
      volume,
      damping,
      material: finish,
      source: pack ? stryMutAct_9fa48("2519") ? {} : (stryCov_9fa48("2519"), {
        kind: stryMutAct_9fa48("2520") ? "" : (stryCov_9fa48("2520"), 'recorded'),
        id: pack.id
      }) : stryMutAct_9fa48("2521") ? {} : (stryCov_9fa48("2521"), {
        kind: stryMutAct_9fa48("2522") ? "" : (stryCov_9fa48("2522"), 'synthesized')
      })
    })), stryMutAct_9fa48("2523") ? [] : (stryCov_9fa48("2523"), [playbackEnabled, character, volume, damping, finish, pack]));
    const soundRef = useRef(sound);
    useEffect(() => {
      if (stryMutAct_9fa48("2525")) {
        {}
      } else {
        stryCov_9fa48("2525");
        soundRef.current = sound;
      }
    }, stryMutAct_9fa48("2526") ? [] : (stryCov_9fa48("2526"), [sound]));
    const buildRef = useRef(stryMutAct_9fa48("2527") ? {} : (stryCov_9fa48("2527"), {
      options,
      selection,
      checks,
      sound,
      sampleState
    }));
    useEffect(() => {
      if (stryMutAct_9fa48("2529")) {
        {}
      } else {
        stryCov_9fa48("2529");
        buildRef.current = stryMutAct_9fa48("2530") ? {} : (stryCov_9fa48("2530"), {
          options,
          selection,
          checks,
          sound,
          sampleState
        });
      }
    }, stryMutAct_9fa48("2531") ? [] : (stryCov_9fa48("2531"), [options, selection, checks, sound, sampleState]));
    useEffect(stryMutAct_9fa48("2533") ? () => undefined : (stryCov_9fa48("2533"), () => registerStudioTools(stryMutAct_9fa48("2534") ? () => undefined : (stryCov_9fa48("2534"), () => buildRef.current), input => {
      if (stryMutAct_9fa48("2535")) {
        {}
      } else {
        stryCov_9fa48("2535");
        const palette = palettes.find(stryMutAct_9fa48("2536") ? () => undefined : (stryCov_9fa48("2536"), p => stryMutAct_9fa48("2539") ? p.name !== input.palette : stryMutAct_9fa48("2538") ? false : stryMutAct_9fa48("2537") ? true : (stryCov_9fa48("2537", "2538", "2539"), p.name === input.palette)));
        if (stryMutAct_9fa48("2541") ? false : stryMutAct_9fa48("2540") ? true : (stryCov_9fa48("2540", "2541"), palette)) {
          if (stryMutAct_9fa48("2542")) {
            {}
          } else {
            stryCov_9fa48("2542");
            edit(stryMutAct_9fa48("2544") ? {} : (stryCov_9fa48("2544"), {
              layout: input.layout,
              palette
            }));
            window.location.assign(stryMutAct_9fa48("2546") ? "" : (stryCov_9fa48("2546"), '#studio'));
          }
        }
      }
    })), stryMutAct_9fa48("2547") ? [] : (stryCov_9fa48("2547"), [edit]));
    useEffect(() => {
      if (stryMutAct_9fa48("2549")) {
        {}
      } else {
        stryCov_9fa48("2549");
        const engine = new KeyboardAudio();
        audio.current = engine;
        const pendingTimers = timers.current;
        const actionClock = audioAction.current;
        return () => {
          if (stryMutAct_9fa48("2550")) {
            {}
          } else {
            stryCov_9fa48("2550");
            stryMutAct_9fa48("2551") ? actionClock.revision-- : (stryCov_9fa48("2551"), actionClock.revision++);
            if (stryMutAct_9fa48("2552")) {
              ;
            } else {
              stryCov_9fa48("2552");
              engine.close();
            }
            if (stryMutAct_9fa48("2553")) {
              ;
            } else {
              stryCov_9fa48("2553");
              pendingTimers.forEach(clearTimeout);
            }
            if (stryMutAct_9fa48("2554")) {
              ;
            } else {
              stryCov_9fa48("2554");
              pendingTimers.clear();
            }
          }
        };
      }
    }, stryMutAct_9fa48("2555") ? ["Stryker was here"] : (stryCov_9fa48("2555"), []));
    if (stryMutAct_9fa48("2556")) {
      ;
    } else {
      stryCov_9fa48("2556");
      useEffect(() => {
        if (stryMutAct_9fa48("2557")) {
          {}
        } else {
          stryCov_9fa48("2557");
          const element = dialog.current;
          if (stryMutAct_9fa48("2560") ? false : stryMutAct_9fa48("2559") ? true : stryMutAct_9fa48("2558") ? element : (stryCov_9fa48("2558", "2559", "2560"), !element)) return;
          const dismissBackdrop = (event: MouseEvent) => {
            if (stryMutAct_9fa48("2561")) {
              {}
            } else {
              stryCov_9fa48("2561");
              if (stryMutAct_9fa48("2564") ? event.target !== element : stryMutAct_9fa48("2563") ? false : stryMutAct_9fa48("2562") ? true : (stryCov_9fa48("2562", "2563", "2564"), event.target === element)) if (stryMutAct_9fa48("2565")) {
                ;
              } else {
                stryCov_9fa48("2565");
                setModal(null);
              }
            }
          };
          element.addEventListener(stryMutAct_9fa48("2567") ? "" : (stryCov_9fa48("2567"), 'click'), dismissBackdrop);
          if (stryMutAct_9fa48("2569") ? false : stryMutAct_9fa48("2568") ? true : (stryCov_9fa48("2568", "2569"), modal)) {
            if (stryMutAct_9fa48("2570")) {
              {}
            } else {
              stryCov_9fa48("2570");
              if (stryMutAct_9fa48("2571")) {
                ;
              } else {
                stryCov_9fa48("2571");
                element.showModal();
              }
              if (stryMutAct_9fa48("2574") ? modal !== 'search' : stryMutAct_9fa48("2573") ? false : stryMutAct_9fa48("2572") ? true : (stryCov_9fa48("2572", "2573", "2574"), modal === (stryMutAct_9fa48("2575") ? "" : (stryCov_9fa48("2575"), 'search')))) stryMutAct_9fa48("2576") ? element.querySelector<HTMLInputElement>('input[name="studio-search"]').focus() : (stryCov_9fa48("2576"), element.querySelector<HTMLInputElement>(stryMutAct_9fa48("2577") ? "" : (stryCov_9fa48("2577"), 'input[name="studio-search"]'))?.focus());
              if (stryMutAct_9fa48("2580") ? typeof modal !== 'object' : stryMutAct_9fa48("2579") ? false : stryMutAct_9fa48("2578") ? true : (stryCov_9fa48("2578", "2579", "2580"), typeof modal === (stryMutAct_9fa48("2581") ? "" : (stryCov_9fa48("2581"), 'object')))) stryMutAct_9fa48("2582") ? element.querySelector<HTMLInputElement>('input[name="store-url"]').focus() : (stryCov_9fa48("2582"), element.querySelector<HTMLInputElement>(stryMutAct_9fa48("2583") ? "" : (stryCov_9fa48("2583"), 'input[name="store-url"]'))?.focus());
            }
          } else {
            if (stryMutAct_9fa48("2584")) {
              {}
            } else {
              stryCov_9fa48("2584");
              if (stryMutAct_9fa48("2585")) {
                ;
              } else {
                stryCov_9fa48("2585");
                element.close();
              }
              stryMutAct_9fa48("2586") ? searchOrigin.current.focus() : (stryCov_9fa48("2586"), searchOrigin.current?.focus());
              searchOrigin.current = null;
            }
          }
          return stryMutAct_9fa48("2587") ? () => undefined : (stryCov_9fa48("2587"), () => element.removeEventListener(stryMutAct_9fa48("2588") ? "" : (stryCov_9fa48("2588"), 'click'), dismissBackdrop));
        }
      }, stryMutAct_9fa48("2589") ? [] : (stryCov_9fa48("2589"), [modal]));
    }
    useEffect(() => {
      if (stryMutAct_9fa48("2591")) {
        {}
      } else {
        stryCov_9fa48("2591");
        let cancelled = stryMutAct_9fa48("2592") ? true : (stryCov_9fa48("2592"), false);
        const engine = audio.current;
        const pendingTimers = timers.current;
        const actionClock = audioAction.current;
        const loading = pack ? stryMutAct_9fa48("2593") ? engine.prepare(pack) : (stryCov_9fa48("2593"), engine?.prepare(pack)) : Promise.resolve();
        void (stryMutAct_9fa48("2594") ? loading.then(() => {
          if (!cancelled) {
            setDemo(false);
            setLoaded({
              id: pack?.id ?? 'synthesized',
              attempt: loadAttempt,
              state: 'ready',
              preview: pack ? engine?.preview(pack) ?? null : null
            });
          }
        }).catch(() => {
          if (!cancelled) {
            setDemo(false);
            setLoaded({
              id: pack?.id ?? 'synthesized',
              attempt: loadAttempt,
              state: 'error',
              preview: null
            });
          }
        }) : (stryCov_9fa48("2594"), loading?.then(() => {
          if (stryMutAct_9fa48("2595")) {
            {}
          } else {
            stryCov_9fa48("2595");
            if (stryMutAct_9fa48("2598") ? false : stryMutAct_9fa48("2597") ? true : stryMutAct_9fa48("2596") ? cancelled : (stryCov_9fa48("2596", "2597", "2598"), !cancelled)) {
              if (stryMutAct_9fa48("2599")) {
                {}
              } else {
                stryCov_9fa48("2599");
                setDemo(stryMutAct_9fa48("2601") ? true : (stryCov_9fa48("2601"), false));
                setLoaded(stryMutAct_9fa48("2603") ? {} : (stryCov_9fa48("2603"), {
                  id: stryMutAct_9fa48("2604") ? pack?.id && 'synthesized' : (stryCov_9fa48("2604"), (stryMutAct_9fa48("2605") ? pack.id : (stryCov_9fa48("2605"), pack?.id)) ?? (stryMutAct_9fa48("2606") ? "" : (stryCov_9fa48("2606"), 'synthesized'))),
                  attempt: loadAttempt,
                  state: stryMutAct_9fa48("2607") ? "" : (stryCov_9fa48("2607"), 'ready'),
                  preview: pack ? stryMutAct_9fa48("2608") ? engine?.preview(pack) && null : (stryCov_9fa48("2608"), (stryMutAct_9fa48("2609") ? engine.preview(pack) : (stryCov_9fa48("2609"), engine?.preview(pack))) ?? null) : null
                }));
              }
            }
          }
        }).catch(() => {
          if (stryMutAct_9fa48("2610")) {
            {}
          } else {
            stryCov_9fa48("2610");
            if (stryMutAct_9fa48("2613") ? false : stryMutAct_9fa48("2612") ? true : stryMutAct_9fa48("2611") ? cancelled : (stryCov_9fa48("2611", "2612", "2613"), !cancelled)) {
              if (stryMutAct_9fa48("2614")) {
                {}
              } else {
                stryCov_9fa48("2614");
                setDemo(stryMutAct_9fa48("2616") ? true : (stryCov_9fa48("2616"), false));
                setLoaded(stryMutAct_9fa48("2618") ? {} : (stryCov_9fa48("2618"), {
                  id: stryMutAct_9fa48("2619") ? pack?.id && 'synthesized' : (stryCov_9fa48("2619"), (stryMutAct_9fa48("2620") ? pack.id : (stryCov_9fa48("2620"), pack?.id)) ?? (stryMutAct_9fa48("2621") ? "" : (stryCov_9fa48("2621"), 'synthesized'))),
                  attempt: loadAttempt,
                  state: stryMutAct_9fa48("2622") ? "" : (stryCov_9fa48("2622"), 'error'),
                  preview: null
                }));
              }
            }
          }
        })));
        return () => {
          if (stryMutAct_9fa48("2623")) {
            {}
          } else {
            stryCov_9fa48("2623");
            cancelled = stryMutAct_9fa48("2624") ? false : (stryCov_9fa48("2624"), true);
            stryMutAct_9fa48("2625") ? actionClock.revision-- : (stryCov_9fa48("2625"), actionClock.revision++);
            stryMutAct_9fa48("2626") ? engine.stop() : (stryCov_9fa48("2626"), engine?.stop());
            if (stryMutAct_9fa48("2627")) {
              ;
            } else {
              stryCov_9fa48("2627");
              pendingTimers.forEach(clearTimeout);
            }
            if (stryMutAct_9fa48("2628")) {
              ;
            } else {
              stryCov_9fa48("2628");
              pendingTimers.clear();
            }
            window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("2630") ? "" : (stryCov_9fa48("2630"), 'keyconf-demo'), stryMutAct_9fa48("2631") ? {} : (stryCov_9fa48("2631"), {
              detail: stryMutAct_9fa48("2632") ? {} : (stryCov_9fa48("2632"), {
                reset: stryMutAct_9fa48("2633") ? false : (stryCov_9fa48("2633"), true)
              })
            })));
          }
        };
      }
    }, stryMutAct_9fa48("2634") ? [] : (stryCov_9fa48("2634"), [pack, loadAttempt]));
    useEffect(() => {
      if (stryMutAct_9fa48("2636")) {
        {}
      } else {
        stryCov_9fa48("2636");
        stryMutAct_9fa48("2637") ? audio.current.setLevel(playbackEnabled, volume) : (stryCov_9fa48("2637"), audio.current?.setLevel(playbackEnabled, volume));
      }
    }, stryMutAct_9fa48("2638") ? [] : (stryCov_9fa48("2638"), [playbackEnabled, volume]));
    const stopDemo = useCallback(() => {
      if (stryMutAct_9fa48("2639")) {
        {}
      } else {
        stryCov_9fa48("2639");
        stryMutAct_9fa48("2640") ? audioAction.current.revision-- : (stryCov_9fa48("2640"), audioAction.current.revision++);
        if (stryMutAct_9fa48("2641")) {
          ;
        } else {
          stryCov_9fa48("2641");
          timers.current.forEach(clearTimeout);
        }
        if (stryMutAct_9fa48("2642")) {
          ;
        } else {
          stryCov_9fa48("2642");
          timers.current.clear();
        }
        stryMutAct_9fa48("2643") ? audio.current.stop() : (stryCov_9fa48("2643"), audio.current?.stop());
        setDemo(stryMutAct_9fa48("2645") ? true : (stryCov_9fa48("2645"), false));
        window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("2647") ? "" : (stryCov_9fa48("2647"), 'keyconf-demo'), stryMutAct_9fa48("2648") ? {} : (stryCov_9fa48("2648"), {
          detail: stryMutAct_9fa48("2649") ? {} : (stryCov_9fa48("2649"), {
            reset: stryMutAct_9fa48("2650") ? false : (stryCov_9fa48("2650"), true)
          })
        })));
      }
    }, stryMutAct_9fa48("2651") ? ["Stryker was here"] : (stryCov_9fa48("2651"), []));
    useEffect(() => {
      if (stryMutAct_9fa48("2653")) {
        {}
      } else {
        stryCov_9fa48("2653");
        const leave = () => {
          if (stryMutAct_9fa48("2654")) {
            {}
          } else {
            stryCov_9fa48("2654");
            if (stryMutAct_9fa48("2655")) {
              ;
            } else {
              stryCov_9fa48("2655");
              stopDemo();
            }
            if (stryMutAct_9fa48("2656")) {
              ;
            } else {
              stryCov_9fa48("2656");
              setReference(null);
            }
          }
        };
        window.addEventListener(stryMutAct_9fa48("2658") ? "" : (stryCov_9fa48("2658"), 'hashchange'), leave);
        return stryMutAct_9fa48("2659") ? () => undefined : (stryCov_9fa48("2659"), () => window.removeEventListener(stryMutAct_9fa48("2660") ? "" : (stryCov_9fa48("2660"), 'hashchange'), leave));
      }
    }, stryMutAct_9fa48("2661") ? [] : (stryCov_9fa48("2661"), [stopDemo]));
    async function enableSound(action = audioAction.current.revision) {
      if (stryMutAct_9fa48("2662")) {
        {}
      } else {
        stryCov_9fa48("2662");
        music.setBlocked(stryMutAct_9fa48("2664") ? "" : (stryCov_9fa48("2664"), 'keyboard'), stryMutAct_9fa48("2665") ? false : (stryCov_9fa48("2665"), true));
        if (stryMutAct_9fa48("2666")) {
          ;
        } else {
          stryCov_9fa48("2666");
          setReference(null);
        }
        try {
          if (stryMutAct_9fa48("2667")) {
            {}
          } else {
            stryCov_9fa48("2667");
            await (stryMutAct_9fa48("2668") ? audio.current.unlock() : (stryCov_9fa48("2668"), audio.current?.unlock()));
            if (stryMutAct_9fa48("2671") ? action === audioAction.current.revision : stryMutAct_9fa48("2670") ? false : stryMutAct_9fa48("2669") ? true : (stryCov_9fa48("2669", "2670", "2671"), action !== audioAction.current.revision)) {
              if (stryMutAct_9fa48("2672")) {
                {}
              } else {
                stryCov_9fa48("2672");
                music.setBlocked(stryMutAct_9fa48("2674") ? "" : (stryCov_9fa48("2674"), 'keyboard'), soundRef.current.enabled);
                return stryMutAct_9fa48("2675") ? true : (stryCov_9fa48("2675"), false);
              }
            }
            setEnabled(stryMutAct_9fa48("2677") ? false : (stryCov_9fa48("2677"), true));
            stryMutAct_9fa48("2678") ? audio.current.setLevel(true, soundRef.current.volume) : (stryCov_9fa48("2678"), audio.current?.setLevel(stryMutAct_9fa48("2679") ? false : (stryCov_9fa48("2679"), true), soundRef.current.volume));
            return stryMutAct_9fa48("2680") ? false : (stryCov_9fa48("2680"), true);
          }
        } catch {
          if (stryMutAct_9fa48("2681")) {
            {}
          } else {
            stryCov_9fa48("2681");
            music.setBlocked(stryMutAct_9fa48("2683") ? "" : (stryCov_9fa48("2683"), 'keyboard'), soundRef.current.enabled);
            setNotice(stryMutAct_9fa48("2685") ? "" : (stryCov_9fa48("2685"), 'Audio could not start. Try enabling sound again.'));
            return stryMutAct_9fa48("2686") ? true : (stryCov_9fa48("2686"), false);
          }
        }
      }
    }
    function press(code: string) {
      if (stryMutAct_9fa48("2687")) {
        {}
      } else {
        stryCov_9fa48("2687");
        if (stryMutAct_9fa48("2689") ? false : stryMutAct_9fa48("2688") ? true : (stryCov_9fa48("2688", "2689"), soundRef.current.enabled)) music.setBlocked(stryMutAct_9fa48("2691") ? "" : (stryCov_9fa48("2691"), 'keyboard'), stryMutAct_9fa48("2692") ? false : (stryCov_9fa48("2692"), true));
        if (stryMutAct_9fa48("2693")) {
          ;
        } else {
          stryCov_9fa48("2693");
          lastKey.press(code);
        }
        stryMutAct_9fa48("2694") ? audio.current.play(code, soundRef.current) : (stryCov_9fa48("2694"), audio.current?.play(code, soundRef.current));
      }
    }
    function release(code: string) {
      if (stryMutAct_9fa48("2695")) {
        {}
      } else {
        stryCov_9fa48("2695");
        if (stryMutAct_9fa48("2697") ? false : stryMutAct_9fa48("2696") ? true : (stryCov_9fa48("2696", "2697"), soundRef.current.enabled)) music.setBlocked(stryMutAct_9fa48("2699") ? "" : (stryCov_9fa48("2699"), 'keyboard'), stryMutAct_9fa48("2700") ? false : (stryCov_9fa48("2700"), true));
        stryMutAct_9fa48("2701") ? audio.current.play(code, soundRef.current, 'up') : (stryCov_9fa48("2701"), audio.current?.play(code, soundRef.current, stryMutAct_9fa48("2702") ? "" : (stryCov_9fa48("2702"), 'up')));
      }
    }
    async function playSequence(phrase: string[]) {
      if (stryMutAct_9fa48("2703")) {
        {}
      } else {
        stryCov_9fa48("2703");
        if (stryMutAct_9fa48("2704")) {
          ;
        } else {
          stryCov_9fa48("2704");
          stopDemo();
        }
        if (stryMutAct_9fa48("2707") ? false : stryMutAct_9fa48("2706") ? true : stryMutAct_9fa48("2705") ? await enableSound() : (stryCov_9fa48("2705", "2706", "2707"), !(await enableSound()))) return;
        setDemo(stryMutAct_9fa48("2709") ? false : (stryCov_9fa48("2709"), true));
        const start = stryMutAct_9fa48("2710") ? (audio.current?.now() ?? 0) - 0.04 : (stryCov_9fa48("2710"), (stryMutAct_9fa48("2711") ? audio.current?.now() && 0 : (stryCov_9fa48("2711"), (stryMutAct_9fa48("2712") ? audio.current.now() : (stryCov_9fa48("2712"), audio.current?.now())) ?? 0)) + 0.04);
        phrase.forEach((code, i) => {
          if (stryMutAct_9fa48("2714")) {
            {}
          } else {
            stryCov_9fa48("2714");
            const settings = stryMutAct_9fa48("2715") ? {} : (stryCov_9fa48("2715"), {
              ...soundRef.current,
              enabled: stryMutAct_9fa48("2716") ? false : (stryCov_9fa48("2716"), true)
            });
            stryMutAct_9fa48("2717") ? audio.current.play(code, settings, 'down', start + i * 0.13) : (stryCov_9fa48("2717"), audio.current?.play(code, settings, stryMutAct_9fa48("2718") ? "" : (stryCov_9fa48("2718"), 'down'), stryMutAct_9fa48("2719") ? start - i * 0.13 : (stryCov_9fa48("2719"), start + (stryMutAct_9fa48("2720") ? i / 0.13 : (stryCov_9fa48("2720"), i * 0.13)))));
            stryMutAct_9fa48("2721") ? audio.current.play(code, settings, 'up', start + i * 0.13 + 0.08) : (stryCov_9fa48("2721"), audio.current?.play(code, settings, stryMutAct_9fa48("2722") ? "" : (stryCov_9fa48("2722"), 'up'), stryMutAct_9fa48("2723") ? start + i * 0.13 - 0.08 : (stryCov_9fa48("2723"), (stryMutAct_9fa48("2724") ? start - i * 0.13 : (stryCov_9fa48("2724"), start + (stryMutAct_9fa48("2725") ? i / 0.13 : (stryCov_9fa48("2725"), i * 0.13)))) + 0.08)));
            timers.current.add(setTimeout(() => {
              if (stryMutAct_9fa48("2727")) {
                {}
              } else {
                stryCov_9fa48("2727");
                if (stryMutAct_9fa48("2728")) {
                  ;
                } else {
                  stryCov_9fa48("2728");
                  lastKey.press(code);
                }
                window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("2730") ? "" : (stryCov_9fa48("2730"), 'keyconf-demo'), stryMutAct_9fa48("2731") ? {} : (stryCov_9fa48("2731"), {
                  detail: stryMutAct_9fa48("2732") ? {} : (stryCov_9fa48("2732"), {
                    code,
                    down: stryMutAct_9fa48("2733") ? false : (stryCov_9fa48("2733"), true)
                  })
                })));
              }
            }, stryMutAct_9fa48("2734") ? 40 - i * 130 : (stryCov_9fa48("2734"), 40 + (stryMutAct_9fa48("2735") ? i / 130 : (stryCov_9fa48("2735"), i * 130)))));
            timers.current.add(setTimeout(() => {
              if (stryMutAct_9fa48("2737")) {
                {}
              } else {
                stryCov_9fa48("2737");
                window.dispatchEvent(new CustomEvent(stryMutAct_9fa48("2739") ? "" : (stryCov_9fa48("2739"), 'keyconf-demo'), stryMutAct_9fa48("2740") ? {} : (stryCov_9fa48("2740"), {
                  detail: stryMutAct_9fa48("2741") ? {} : (stryCov_9fa48("2741"), {
                    code,
                    down: stryMutAct_9fa48("2742") ? true : (stryCov_9fa48("2742"), false)
                  })
                })));
              }
            }, stryMutAct_9fa48("2743") ? 120 - i * 130 : (stryCov_9fa48("2743"), 120 + (stryMutAct_9fa48("2744") ? i / 130 : (stryCov_9fa48("2744"), i * 130)))));
          }
        });
        timers.current.add(setTimeout(() => {
          if (stryMutAct_9fa48("2746")) {
            {}
          } else {
            stryCov_9fa48("2746");
            setDemo(stryMutAct_9fa48("2748") ? true : (stryCov_9fa48("2748"), false));
            if (stryMutAct_9fa48("2749")) {
              ;
            } else {
              stryCov_9fa48("2749");
              timers.current.clear();
            }
          }
        }, stryMutAct_9fa48("2750") ? 40 - phrase.length * 130 : (stryCov_9fa48("2750"), 40 + (stryMutAct_9fa48("2751") ? phrase.length / 130 : (stryCov_9fa48("2751"), phrase.length * 130)))));
      }
    }
    function addImported(addition: ImportAddition) {
      if (stryMutAct_9fa48("2752")) {
        {}
      } else {
        stryCov_9fa48("2752");
        if (stryMutAct_9fa48("2755") ? addition.kind !== 'accessories' : stryMutAct_9fa48("2754") ? false : stryMutAct_9fa48("2753") ? true : (stryCov_9fa48("2753", "2754", "2755"), addition.kind === (stryMutAct_9fa48("2756") ? "" : (stryCov_9fa48("2756"), 'accessories')))) {
          if (stryMutAct_9fa48("2757")) {
            {}
          } else {
            stryCov_9fa48("2757");
            const references = parseCustomAccessories(Array.from(new Map((stryMutAct_9fa48("2758") ? [] : (stryCov_9fa48("2758"), [...(stryMutAct_9fa48("2759") ? build.customAccessories && [] : (stryCov_9fa48("2759"), build.customAccessories ?? (stryMutAct_9fa48("2760") ? ["Stryker was here"] : (stryCov_9fa48("2760"), [])))), ...addition.products])).map(stryMutAct_9fa48("2761") ? () => undefined : (stryCov_9fa48("2761"), product => stryMutAct_9fa48("2762") ? [] : (stryCov_9fa48("2762"), [product.id, product])))).values()));
            const products = resolveAccessoryProducts(references);
            const existing = new Set(build.accessories.map(stryMutAct_9fa48("2763") ? () => undefined : (stryCov_9fa48("2763"), item => item.productId)));
            const additions = stryMutAct_9fa48("2764") ? Array.from(new Map(addition.products.map(product => [product.id, product])).values()).map(product => newAccessorySelection(product.id, products)) : (stryCov_9fa48("2764"), Array.from(new Map(addition.products.map(stryMutAct_9fa48("2765") ? () => undefined : (stryCov_9fa48("2765"), product => stryMutAct_9fa48("2766") ? [] : (stryCov_9fa48("2766"), [product.id, product])))).values()).filter(stryMutAct_9fa48("2767") ? () => undefined : (stryCov_9fa48("2767"), product => stryMutAct_9fa48("2768") ? existing.has(product.id) : (stryCov_9fa48("2768"), !existing.has(product.id)))).map(stryMutAct_9fa48("2769") ? () => undefined : (stryCov_9fa48("2769"), product => newAccessorySelection(product.id, products))));
            const next = parseBuild(stryMutAct_9fa48("2770") ? {} : (stryCov_9fa48("2770"), {
              ...build,
              customAccessories: references,
              accessories: stryMutAct_9fa48("2771") ? [] : (stryCov_9fa48("2771"), [...build.accessories, ...additions])
            }));
            edit(stryMutAct_9fa48("2773") ? {} : (stryCov_9fa48("2773"), {
              customAccessories: next.customAccessories,
              accessories: next.accessories
            }));
            setNotice(stryMutAct_9fa48("2775") ? `` : (stryCov_9fa48("2775"), `${additions.length} accessories added. Review placement and fit in Components.`));
            setTab(stryMutAct_9fa48("2777") ? "" : (stryCov_9fa48("2777"), 'parts'));
            return;
          }
        }
        const incoming = addition.parts;
        const merged = Array.from(new Map((stryMutAct_9fa48("2778") ? [] : (stryCov_9fa48("2778"), [...imports, ...incoming])).map(stryMutAct_9fa48("2779") ? () => undefined : (stryCov_9fa48("2779"), p => stryMutAct_9fa48("2780") ? [] : (stryCov_9fa48("2780"), [p.id, p])))).values());
        edit(stryMutAct_9fa48("2782") ? {} : (stryCov_9fa48("2782"), {
          customParts: parseCustomParts(merged)
        }));
        setNotice(incoming.length + (stryMutAct_9fa48("2784") ? "" : (stryCov_9fa48("2784"), ' parts added to this build.')));
      }
    }
    async function shareBuild() {
      if (stryMutAct_9fa48("2785")) {
        {}
      } else {
        stryCov_9fa48("2785");
        try {
          if (stryMutAct_9fa48("2786")) {
            {}
          } else {
            stryCov_9fa48("2786");
            const url = previewLink(build, window.location.href);
            if (stryMutAct_9fa48("2787")) {
              ;
            } else {
              stryCov_9fa48("2787");
              setShareUrl(url);
            }
            setModal(stryMutAct_9fa48("2789") ? "" : (stryCov_9fa48("2789"), 'share'));
            try {
              if (stryMutAct_9fa48("2790")) {
                {}
              } else {
                stryCov_9fa48("2790");
                await navigator.clipboard.writeText(url);
                setNotice(stryMutAct_9fa48("2792") ? "" : (stryCov_9fa48("2792"), 'Build link copied. Anyone with the link can open this design.'));
              }
            } catch {
              if (stryMutAct_9fa48("2793")) {
                {}
              } else {
                stryCov_9fa48("2793");
                setNotice(stryMutAct_9fa48("2795") ? "" : (stryCov_9fa48("2795"), 'Select and copy the build link below.'));
              }
            }
          }
        } catch (error) {
          if (stryMutAct_9fa48("2796")) {
            {}
          } else {
            stryCov_9fa48("2796");
            setNotice(error instanceof Error ? error.message : stryMutAct_9fa48("2798") ? "" : (stryCov_9fa48("2798"), 'The build link could not be created. Download the build instead.'));
          }
        }
      }
    }
    async function openBuild(file: File | undefined) {
      if (stryMutAct_9fa48("2799")) {
        {}
      } else {
        stryCov_9fa48("2799");
        if (stryMutAct_9fa48("2802") ? false : stryMutAct_9fa48("2801") ? true : stryMutAct_9fa48("2800") ? file : (stryCov_9fa48("2800", "2801", "2802"), !file)) return;
        try {
          if (stryMutAct_9fa48("2803")) {
            {}
          } else {
            stryCov_9fa48("2803");
            if (stryMutAct_9fa48("2807") ? file.size <= 1_000_000 : stryMutAct_9fa48("2806") ? file.size >= 1_000_000 : stryMutAct_9fa48("2805") ? false : stryMutAct_9fa48("2804") ? true : (stryCov_9fa48("2804", "2805", "2806", "2807"), file.size > 1_000_000)) throw new Error(stryMutAct_9fa48("2809") ? "" : (stryCov_9fa48("2809"), 'Choose a Keyconf build file under 1 MB.'));
            const restored = readBuildFile(await file.text());
            if (stryMutAct_9fa48("2810")) {
              ;
            } else {
              stryCov_9fa48("2810");
              stopDemo();
            }
            if (stryMutAct_9fa48("2811")) {
              ;
            } else {
              stryCov_9fa48("2811");
              edit(restored);
            }
            setNotice(stryMutAct_9fa48("2813") ? "" : (stryCov_9fa48("2813"), 'Build opened. Undo returns to your previous design.'));
          }
        } catch (error) {
          if (stryMutAct_9fa48("2814")) {
            {}
          } else {
            stryCov_9fa48("2814");
            setNotice(error instanceof Error ? error.message : stryMutAct_9fa48("2816") ? "" : (stryCov_9fa48("2816"), 'The build file could not be opened.'));
          }
        }
      }
    }
    function exportBuild() {
      if (stryMutAct_9fa48("2817")) {
        {}
      } else {
        stryCov_9fa48("2817");
        const data = stryMutAct_9fa48("2818") ? {} : (stryCov_9fa48("2818"), {
          version: 1,
          build,
          visualStudy: options,
          components: categories.map(stryMutAct_9fa48("2819") ? () => undefined : (stryCov_9fa48("2819"), c => parts.find(stryMutAct_9fa48("2820") ? () => undefined : (stryCov_9fa48("2820"), p => stryMutAct_9fa48("2823") ? p.id !== selection[c] : stryMutAct_9fa48("2822") ? false : stryMutAct_9fa48("2821") ? true : (stryCov_9fa48("2821", "2822", "2823"), p.id === selection[c]))))),
          compatibility: checks,
          accessoryReferences: stryMutAct_9fa48("2824") ? resolveAccessoryProducts(build.customAccessories) : (stryCov_9fa48("2824"), resolveAccessoryProducts(build.customAccessories).filter(stryMutAct_9fa48("2825") ? () => undefined : (stryCov_9fa48("2825"), product => stryMutAct_9fa48("2826") ? build.accessories.every(accessory => accessory.productId === product.id) : (stryCov_9fa48("2826"), build.accessories.some(stryMutAct_9fa48("2827") ? () => undefined : (stryCov_9fa48("2827"), accessory => stryMutAct_9fa48("2830") ? accessory.productId !== product.id : stryMutAct_9fa48("2829") ? false : stryMutAct_9fa48("2828") ? true : (stryCov_9fa48("2828", "2829", "2830"), accessory.productId === product.id))))))),
          sound: stryMutAct_9fa48("2831") ? {} : (stryCov_9fa48("2831"), {
            ...sound,
            accuracy: pack ? stryMutAct_9fa48("2832") ? "" : (stryCov_9fa48("2832"), 'recorded switch reference; full build match unverified') : stryMutAct_9fa48("2833") ? "" : (stryCov_9fa48("2833"), 'synthesized approximation'),
            recording: pack
          }),
          exportedAt: new Date().toISOString()
        });
        const url = URL.createObjectURL(new Blob(stryMutAct_9fa48("2834") ? [] : (stryCov_9fa48("2834"), [JSON.stringify(data, null, 2)]), stryMutAct_9fa48("2835") ? {} : (stryCov_9fa48("2835"), {
          type: stryMutAct_9fa48("2836") ? "" : (stryCov_9fa48("2836"), 'application/json')
        })));
        const a = document.createElement(stryMutAct_9fa48("2837") ? "" : (stryCov_9fa48("2837"), 'a'));
        a.href = url;
        a.download = stryMutAct_9fa48("2838") ? "" : (stryCov_9fa48("2838"), 'keyconf-build.json');
        if (stryMutAct_9fa48("2839")) {
          ;
        } else {
          stryCov_9fa48("2839");
          a.click();
        }
        if (stryMutAct_9fa48("2840")) {
          ;
        } else {
          stryCov_9fa48("2840");
          URL.revokeObjectURL(url);
        }
        setNotice(stryMutAct_9fa48("2842") ? "" : (stryCov_9fa48("2842"), 'Build exported with sources and compatibility notes.'));
      }
    }
    const skipTarget = (stryMutAct_9fa48("2845") ? screen !== 'switch' : stryMutAct_9fa48("2844") ? false : stryMutAct_9fa48("2843") ? true : (stryCov_9fa48("2843", "2844", "2845"), screen === (stryMutAct_9fa48("2846") ? "" : (stryCov_9fa48("2846"), 'switch')))) ? stryMutAct_9fa48("2847") ? "" : (stryCov_9fa48("2847"), 'switch-information') : (stryMutAct_9fa48("2850") ? screen !== 'discover' : stryMutAct_9fa48("2849") ? false : stryMutAct_9fa48("2848") ? true : (stryCov_9fa48("2848", "2849", "2850"), screen === (stryMutAct_9fa48("2851") ? "" : (stryCov_9fa48("2851"), 'discover')))) ? stryMutAct_9fa48("2852") ? "" : (stryCov_9fa48("2852"), 'community-heading') : stryMutAct_9fa48("2853") ? "" : (stryCov_9fa48("2853"), 'build-settings');
    return <main className={stryMutAct_9fa48("2854") ? 'studio-shell screen-' + screen - (experience === 'builder' ? '' : ' ' + experience + '-mode') : (stryCov_9fa48("2854"), (stryMutAct_9fa48("2855") ? "" : (stryCov_9fa48("2855"), 'studio-shell screen-')) + screen + ((stryMutAct_9fa48("2858") ? experience !== 'builder' : stryMutAct_9fa48("2857") ? false : stryMutAct_9fa48("2856") ? true : (stryCov_9fa48("2856", "2857", "2858"), experience === (stryMutAct_9fa48("2859") ? "" : (stryCov_9fa48("2859"), 'builder')))) ? stryMutAct_9fa48("2860") ? "Stryker was here!" : (stryCov_9fa48("2860"), '') : (stryMutAct_9fa48("2861") ? "" : (stryCov_9fa48("2861"), ' ')) + experience + (stryMutAct_9fa48("2862") ? "" : (stryCov_9fa48("2862"), '-mode'))))}>
      <a className="skip-link" href={stryMutAct_9fa48("2863") ? `` : (stryCov_9fa48("2863"), `#${skipTarget}`)} onClick={(stryMutAct_9fa48("2866") ? screen === 'switch' && screen === 'discover' : stryMutAct_9fa48("2865") ? false : stryMutAct_9fa48("2864") ? true : (stryCov_9fa48("2864", "2865", "2866"), (stryMutAct_9fa48("2868") ? screen !== 'switch' : stryMutAct_9fa48("2867") ? false : (stryCov_9fa48("2867", "2868"), screen === (stryMutAct_9fa48("2869") ? "" : (stryCov_9fa48("2869"), 'switch')))) || (stryMutAct_9fa48("2871") ? screen !== 'discover' : stryMutAct_9fa48("2870") ? false : (stryCov_9fa48("2870", "2871"), screen === (stryMutAct_9fa48("2872") ? "" : (stryCov_9fa48("2872"), 'discover')))))) ? event => {
        if (stryMutAct_9fa48("2873")) {
          {}
        } else {
          stryCov_9fa48("2873");
          if (stryMutAct_9fa48("2874")) {
            ;
          } else {
            stryCov_9fa48("2874");
            event.preventDefault();
          }
          const target = document.getElementById(skipTarget);
          stryMutAct_9fa48("2875") ? target.scrollIntoView() : (stryCov_9fa48("2875"), target?.scrollIntoView());
          stryMutAct_9fa48("2876") ? target.focus() : (stryCov_9fa48("2876"), target?.focus());
        }
      } : undefined}>
        {(stryMutAct_9fa48("2879") ? screen !== 'switch' : stryMutAct_9fa48("2878") ? false : stryMutAct_9fa48("2877") ? true : (stryCov_9fa48("2877", "2878", "2879"), screen === (stryMutAct_9fa48("2880") ? "" : (stryCov_9fa48("2880"), 'switch')))) ? stryMutAct_9fa48("2881") ? "" : (stryCov_9fa48("2881"), 'Skip to switch information') : (stryMutAct_9fa48("2884") ? screen !== 'discover' : stryMutAct_9fa48("2883") ? false : stryMutAct_9fa48("2882") ? true : (stryCov_9fa48("2882", "2883", "2884"), screen === (stryMutAct_9fa48("2885") ? "" : (stryCov_9fa48("2885"), 'discover')))) ? stryMutAct_9fa48("2886") ? "" : (stryCov_9fa48("2886"), 'Skip to community builds') : stryMutAct_9fa48("2887") ? "" : (stryCov_9fa48("2887"), 'Skip to build settings')}
      </a>
      <header className="header studio-header">
        <a className="brand" href="#home">
          keyconf <PreviewLabel fallback="beta" />
        </a>
        <nav aria-label="Studio pages">
          <a href="#studio" aria-current={(stryMutAct_9fa48("2890") ? (screen === 'build' || screen === 'switch') && landing : stryMutAct_9fa48("2889") ? false : stryMutAct_9fa48("2888") ? true : (stryCov_9fa48("2888", "2889", "2890"), (stryMutAct_9fa48("2892") ? screen === 'build' && screen === 'switch' : stryMutAct_9fa48("2891") ? false : (stryCov_9fa48("2891", "2892"), (stryMutAct_9fa48("2894") ? screen !== 'build' : stryMutAct_9fa48("2893") ? false : (stryCov_9fa48("2893", "2894"), screen === (stryMutAct_9fa48("2895") ? "" : (stryCov_9fa48("2895"), 'build')))) || (stryMutAct_9fa48("2897") ? screen !== 'switch' : stryMutAct_9fa48("2896") ? false : (stryCov_9fa48("2896", "2897"), screen === (stryMutAct_9fa48("2898") ? "" : (stryCov_9fa48("2898"), 'switch')))))) || landing)) ? stryMutAct_9fa48("2899") ? "" : (stryCov_9fa48("2899"), 'page') : undefined}>
            Build
          </a>
          <a href="#sound" aria-current={(stryMutAct_9fa48("2902") ? screen !== 'sound' : stryMutAct_9fa48("2901") ? false : stryMutAct_9fa48("2900") ? true : (stryCov_9fa48("2900", "2901", "2902"), screen === (stryMutAct_9fa48("2903") ? "" : (stryCov_9fa48("2903"), 'sound')))) ? stryMutAct_9fa48("2904") ? "" : (stryCov_9fa48("2904"), 'page') : undefined}>
            Sound
          </a>
          <a href="#play" aria-current={(stryMutAct_9fa48("2907") ? screen !== 'play' : stryMutAct_9fa48("2906") ? false : stryMutAct_9fa48("2905") ? true : (stryCov_9fa48("2905", "2906", "2907"), screen === (stryMutAct_9fa48("2908") ? "" : (stryCov_9fa48("2908"), 'play')))) ? stryMutAct_9fa48("2909") ? "" : (stryCov_9fa48("2909"), 'page') : undefined}>
            Play
          </a>
          <a href="#discover" aria-current={(stryMutAct_9fa48("2912") ? screen !== 'discover' : stryMutAct_9fa48("2911") ? false : stryMutAct_9fa48("2910") ? true : (stryCov_9fa48("2910", "2911", "2912"), screen === (stryMutAct_9fa48("2913") ? "" : (stryCov_9fa48("2913"), 'discover')))) ? stryMutAct_9fa48("2914") ? "" : (stryCov_9fa48("2914"), 'page') : undefined}>
            Discover
          </a>
        </nav>
        <div className="header-utilities">
          <button className="header-search" aria-label="Search parts and studio" aria-keyshortcuts="Control+k Meta+k" onClick={event => {
            if (stryMutAct_9fa48("2915")) {
              {}
            } else {
              stryCov_9fa48("2915");
              searchOrigin.current = event.currentTarget;
              setModal(stryMutAct_9fa48("2917") ? "" : (stryCov_9fa48("2917"), 'search'));
            }
          }}>
            <Search size={18} />
            <span>Find parts or jump to…</span>
            <kbd>Ctrl / ⌘ K</kbd>
          </button>
          <MusicControls music={music} />
          <a className="header-resume" href="#studio">
            Resume build <ArrowUpRight size={13} />
          </a>
          <button className="button secondary" onClick={stryMutAct_9fa48("2918") ? () => undefined : (stryCov_9fa48("2918"), () => setModal(stryMutAct_9fa48("2919") ? "" : (stryCov_9fa48("2919"), 'import')))}>
            <Plus size={16} /> Import a website
          </button>
        </div>
      </header>
      <div className="build-bar">
        <label className="build-name">
          <span className="sr-only">Build name</span>
          <input value={build.name} maxLength={80} onChange={stryMutAct_9fa48("2920") ? () => undefined : (stryCov_9fa48("2920"), e => edit(stryMutAct_9fa48("2921") ? {} : (stryCov_9fa48("2921"), {
            name: e.target.value
          }), stryMutAct_9fa48("2922") ? "" : (stryCov_9fa48("2922"), 'name')))} onBlur={e => {
            if (stryMutAct_9fa48("2923")) {
              {}
            } else {
              stryCov_9fa48("2923");
              if (stryMutAct_9fa48("2926") ? false : stryMutAct_9fa48("2925") ? true : stryMutAct_9fa48("2924") ? e.target.value.trim() : (stryCov_9fa48("2924", "2925", "2926"), !(stryMutAct_9fa48("2927") ? e.target.value : (stryCov_9fa48("2927"), e.target.value.trim())))) edit(stryMutAct_9fa48("2929") ? {} : (stryCov_9fa48("2929"), {
                name: stryMutAct_9fa48("2930") ? "" : (stryCov_9fa48("2930"), 'Untitled build')
              }));
              if (stryMutAct_9fa48("2931")) {
                ;
              } else {
                stryCov_9fa48("2931");
                commit();
              }
            }
          }} />
        </label>
        <output className="save-state">
          {(stryMutAct_9fa48("2934") ? saveState !== 'saved' : stryMutAct_9fa48("2933") ? false : stryMutAct_9fa48("2932") ? true : (stryCov_9fa48("2932", "2933", "2934"), saveState === (stryMutAct_9fa48("2935") ? "" : (stryCov_9fa48("2935"), 'saved')))) ? stryMutAct_9fa48("2936") ? "" : (stryCov_9fa48("2936"), 'Saved on this device') : (stryMutAct_9fa48("2939") ? saveState !== 'saving' : stryMutAct_9fa48("2938") ? false : stryMutAct_9fa48("2937") ? true : (stryCov_9fa48("2937", "2938", "2939"), saveState === (stryMutAct_9fa48("2940") ? "" : (stryCov_9fa48("2940"), 'saving')))) ? stryMutAct_9fa48("2941") ? "" : (stryCov_9fa48("2941"), 'Saving…') : (stryMutAct_9fa48("2944") ? saveState !== 'unavailable' : stryMutAct_9fa48("2943") ? false : stryMutAct_9fa48("2942") ? true : (stryCov_9fa48("2942", "2943", "2944"), saveState === (stryMutAct_9fa48("2945") ? "" : (stryCov_9fa48("2945"), 'unavailable')))) ? stryMutAct_9fa48("2946") ? "" : (stryCov_9fa48("2946"), 'Session only. Download to keep.') : stryMutAct_9fa48("2947") ? "" : (stryCov_9fa48("2947"), 'Opening build…')}
        </output>
        <div className="build-actions">
          <button className="icon-button" aria-label="Undo change" title="Undo (Ctrl/⌘ Z)" disabled={stryMutAct_9fa48("2950") ? !ready && !canUndo : stryMutAct_9fa48("2949") ? false : stryMutAct_9fa48("2948") ? true : (stryCov_9fa48("2948", "2949", "2950"), (stryMutAct_9fa48("2951") ? ready : (stryCov_9fa48("2951"), !ready)) || (stryMutAct_9fa48("2952") ? canUndo : (stryCov_9fa48("2952"), !canUndo)))} onClick={undo}>
            <Undo2 size={17} />
          </button>
          <button className="icon-button" aria-label="Redo change" title="Redo (Ctrl/⌘ Shift Z)" disabled={stryMutAct_9fa48("2955") ? !ready && !canRedo : stryMutAct_9fa48("2954") ? false : stryMutAct_9fa48("2953") ? true : (stryCov_9fa48("2953", "2954", "2955"), (stryMutAct_9fa48("2956") ? ready : (stryCov_9fa48("2956"), !ready)) || (stryMutAct_9fa48("2957") ? canRedo : (stryCov_9fa48("2957"), !canRedo)))} onClick={redo}>
            <Redo2 size={17} />
          </button>
          <button className="icon-button" aria-label="Open build file" title="Open build file" onClick={stryMutAct_9fa48("2958") ? () => undefined : (stryCov_9fa48("2958"), () => stryMutAct_9fa48("2959") ? buildFile.current.click() : (stryCov_9fa48("2959"), buildFile.current?.click()))}>
            <Upload size={17} />
          </button>
          <button className="button secondary compact" disabled={stryMutAct_9fa48("2960") ? ready : (stryCov_9fa48("2960"), !ready)} onClick={shareBuild}>
            <Share2 size={15} /> Share build
          </button>
          <input ref={buildFile} type="file" accept="application/json,.json" hidden onChange={e => {
            if (stryMutAct_9fa48("2961")) {
              {}
            } else {
              stryCov_9fa48("2961");
              void openBuild(stryMutAct_9fa48("2962") ? e.target.files[0] : (stryCov_9fa48("2962"), e.target.files?.[0]));
              e.target.value = stryMutAct_9fa48("2963") ? "Stryker was here!" : (stryCov_9fa48("2963"), '');
            }
          }} />
        </div>
      </div>
      {(stryMutAct_9fa48("2966") ? screen !== 'switch' : stryMutAct_9fa48("2965") ? false : stryMutAct_9fa48("2964") ? true : (stryCov_9fa48("2964", "2965", "2966"), screen === (stryMutAct_9fa48("2967") ? "" : (stryCov_9fa48("2967"), 'switch')))) ? <SwitchDetail part={parts.find(stryMutAct_9fa48("2968") ? () => undefined : (stryCov_9fa48("2968"), part => stryMutAct_9fa48("2971") ? part.category === 'switch' || part.id === switchId : stryMutAct_9fa48("2970") ? false : stryMutAct_9fa48("2969") ? true : (stryCov_9fa48("2969", "2970", "2971"), (stryMutAct_9fa48("2973") ? part.category !== 'switch' : stryMutAct_9fa48("2972") ? true : (stryCov_9fa48("2972", "2973"), part.category === (stryMutAct_9fa48("2974") ? "" : (stryCov_9fa48("2974"), 'switch')))) && (stryMutAct_9fa48("2976") ? part.id !== switchId : stryMutAct_9fa48("2975") ? true : (stryCov_9fa48("2975", "2976"), part.id === switchId)))))} parts={parts} selected={selection.switch} checks={checkBuild(stryMutAct_9fa48("2977") ? {} : (stryCov_9fa48("2977"), {
        ...selection,
        switch: stryMutAct_9fa48("2978") ? switchId && selection.switch : (stryCov_9fa48("2978"), switchId ?? selection.switch)
      }), parts, layout)} onSelect={part => {
        if (stryMutAct_9fa48("2979")) {
          {}
        } else {
          stryCov_9fa48("2979");
          edit(stryMutAct_9fa48("2981") ? {} : (stryCov_9fa48("2981"), {
            selection: stryMutAct_9fa48("2982") ? {} : (stryCov_9fa48("2982"), {
              ...selection,
              switch: part.id
            })
          }));
          setNotice(stryMutAct_9fa48("2984") ? `` : (stryCov_9fa48("2984"), `${part.brand} ${part.name} added to your build. Undo returns to the previous switch.`));
        }
      }} /> : <div className="workspace mobile-workbench">
          <section className="stage">
            <div className="stage-heading">
              <div className="eyebrow">
                {landing ? stryMutAct_9fa48("2985") ? "" : (stryCov_9fa48("2985"), 'KEYBOARDS FOR GREATER IDEAS') : (stryMutAct_9fa48("2988") ? screen !== 'sound' : stryMutAct_9fa48("2987") ? false : stryMutAct_9fa48("2986") ? true : (stryCov_9fa48("2986", "2987", "2988"), screen === (stryMutAct_9fa48("2989") ? "" : (stryCov_9fa48("2989"), 'sound')))) ? stryMutAct_9fa48("2990") ? "" : (stryCov_9fa48("2990"), 'THE SOUND LAB') : stryMutAct_9fa48("2991") ? "" : (stryCov_9fa48("2991"), 'YOUR WORKBENCH')}{stryMutAct_9fa48("2992") ? "" : (stryCov_9fa48("2992"), ' ')}
                {stryMutAct_9fa48("2995") ? !landing || <span>{layout}%</span> : stryMutAct_9fa48("2994") ? false : stryMutAct_9fa48("2993") ? true : (stryCov_9fa48("2993", "2994", "2995"), (stryMutAct_9fa48("2996") ? landing : (stryCov_9fa48("2996"), !landing)) && <span>{layout}%</span>)}
              </div>
              <h1>
                {landing ? <>
                    Make it
                    <br />
                    yours.
                  </> : (stryMutAct_9fa48("2999") ? screen !== 'sound' : stryMutAct_9fa48("2998") ? false : stryMutAct_9fa48("2997") ? true : (stryCov_9fa48("2997", "2998", "2999"), screen === (stryMutAct_9fa48("3000") ? "" : (stryCov_9fa48("3000"), 'sound')))) ? stryMutAct_9fa48("3001") ? "" : (stryCov_9fa48("3001"), 'Hear the difference.') : stryMutAct_9fa48("3002") ? "" : (stryCov_9fa48("3002"), 'Make it yours.')}
              </h1>
              <p>
                {landing ? <>
                    Design. Experiment. Hear. Build.
                    <br />A better keyboard starts here.
                  </> : (stryMutAct_9fa48("3005") ? screen !== 'sound' : stryMutAct_9fa48("3004") ? false : stryMutAct_9fa48("3003") ? true : (stryCov_9fa48("3003", "3004", "3005"), screen === (stryMutAct_9fa48("3006") ? "" : (stryCov_9fa48("3006"), 'sound')))) ? stryMutAct_9fa48("3007") ? "" : (stryCov_9fa48("3007"), 'Listen closely. Find your feel.') : stryMutAct_9fa48("3008") ? "" : (stryCov_9fa48("3008"), 'Every part. Every detail. Your call.')}
              </p>
              {landing ? <div className="landing-actions">
                  <button className="button" onClick={customizePreview}>
                    Customize {featured.name} <ArrowRight size={18} />
                  </button>
                  <a href="#studio">
                    Resume {build.name} <ArrowUpRight size={13} />
                  </a>
                </div> : <button id="start-typing-test" className="button secondary compact typing-launch" onClick={async () => {
              if (stryMutAct_9fa48("3009")) {
                {}
              } else {
                stryCov_9fa48("3009");
                if (stryMutAct_9fa48("3010")) {
                  ;
                } else {
                  stryCov_9fa48("3010");
                  stopDemo();
                }
                const action = audioAction.current.revision;
                await enableSound(action);
                if (stryMutAct_9fa48("3013") ? action === audioAction.current.revision : stryMutAct_9fa48("3012") ? false : stryMutAct_9fa48("3011") ? true : (stryCov_9fa48("3011", "3012", "3013"), action !== audioAction.current.revision)) return;
                setExperience(stryMutAct_9fa48("3015") ? "" : (stryCov_9fa48("3015"), 'typing'));
              }
            }}>
                  <Play size={14} /> Start typing test
                </button>}
            </div>
            <div className="study-label">
              <span className="status-dot" /> 3D design study{stryMutAct_9fa48("3016") ? "" : (stryCov_9fa48("3016"), ' ')}
              <ArrowUpRight size={13} />
            </div>
            <KeyboardScene options={options} onPress={press} onRelease={release}>
              {stryMutAct_9fa48("3019") ? experience === 'typing' || <TypingTest onSearch={() => {
              searchOrigin.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
              setModal('search');
            }} onPress={press} onRelease={release} onExit={() => {
              stopDemo();
              returnToTypingLauncher.current = true;
              setExperience('builder');
            }} /> : stryMutAct_9fa48("3018") ? false : stryMutAct_9fa48("3017") ? true : (stryCov_9fa48("3017", "3018", "3019"), (stryMutAct_9fa48("3021") ? experience !== 'typing' : stryMutAct_9fa48("3020") ? true : (stryCov_9fa48("3020", "3021"), experience === (stryMutAct_9fa48("3022") ? "" : (stryCov_9fa48("3022"), 'typing')))) && <TypingTest onSearch={() => {
              if (stryMutAct_9fa48("3023")) {
                {}
              } else {
                stryCov_9fa48("3023");
                searchOrigin.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
                setModal(stryMutAct_9fa48("3025") ? "" : (stryCov_9fa48("3025"), 'search'));
              }
            }} onPress={press} onRelease={release} onExit={() => {
              if (stryMutAct_9fa48("3026")) {
                {}
              } else {
                stryCov_9fa48("3026");
                if (stryMutAct_9fa48("3027")) {
                  ;
                } else {
                  stryCov_9fa48("3027");
                  stopDemo();
                }
                returnToTypingLauncher.current = stryMutAct_9fa48("3028") ? false : (stryCov_9fa48("3028"), true);
                setExperience(stryMutAct_9fa48("3030") ? "" : (stryCov_9fa48("3030"), 'builder'));
              }
            }} />)}
            </KeyboardScene>
            {stryMutAct_9fa48("3033") ? exploded && options.device.kind === 'keyboard' && experience !== 'typing' || <nav className="exploded-layer-guide" aria-label="Exploded keyboard layers">
                  <LayerInspector label="Keycaps" part={parts.find(part => part.category === 'keycaps' && part.id === visibleBuild.selection.keycaps)} />
                  <a href={`#switch=${encodeURIComponent(visibleBuild.selection.switch)}`}>
                    Switches <ArrowUpRight size={13} />
                  </a>
                  <LayerInspector label="Plate" part={parts.find(part => part.category === 'plate' && part.id === visibleBuild.selection.plate)} />
                  <LayerInspector label="PCB" part={parts.find(part => part.category === 'pcb' && part.id === visibleBuild.selection.pcb)} />
                  <LayerInspector label="Case" part={parts.find(part => part.category === 'case' && part.id === visibleBuild.selection.case)} />
                </nav> : stryMutAct_9fa48("3032") ? false : stryMutAct_9fa48("3031") ? true : (stryCov_9fa48("3031", "3032", "3033"), (stryMutAct_9fa48("3035") ? exploded && options.device.kind === 'keyboard' || experience !== 'typing' : stryMutAct_9fa48("3034") ? true : (stryCov_9fa48("3034", "3035"), (stryMutAct_9fa48("3037") ? exploded || options.device.kind === 'keyboard' : stryMutAct_9fa48("3036") ? true : (stryCov_9fa48("3036", "3037"), exploded && (stryMutAct_9fa48("3039") ? options.device.kind !== 'keyboard' : stryMutAct_9fa48("3038") ? true : (stryCov_9fa48("3038", "3039"), options.device.kind === (stryMutAct_9fa48("3040") ? "" : (stryCov_9fa48("3040"), 'keyboard')))))) && (stryMutAct_9fa48("3042") ? experience === 'typing' : stryMutAct_9fa48("3041") ? true : (stryCov_9fa48("3041", "3042"), experience !== (stryMutAct_9fa48("3043") ? "" : (stryCov_9fa48("3043"), 'typing')))))) && <nav className="exploded-layer-guide" aria-label="Exploded keyboard layers">
                  <LayerInspector label="Keycaps" part={parts.find(stryMutAct_9fa48("3044") ? () => undefined : (stryCov_9fa48("3044"), part => stryMutAct_9fa48("3047") ? part.category === 'keycaps' || part.id === visibleBuild.selection.keycaps : stryMutAct_9fa48("3046") ? false : stryMutAct_9fa48("3045") ? true : (stryCov_9fa48("3045", "3046", "3047"), (stryMutAct_9fa48("3049") ? part.category !== 'keycaps' : stryMutAct_9fa48("3048") ? true : (stryCov_9fa48("3048", "3049"), part.category === (stryMutAct_9fa48("3050") ? "" : (stryCov_9fa48("3050"), 'keycaps')))) && (stryMutAct_9fa48("3052") ? part.id !== visibleBuild.selection.keycaps : stryMutAct_9fa48("3051") ? true : (stryCov_9fa48("3051", "3052"), part.id === visibleBuild.selection.keycaps)))))} />
                  <a href={stryMutAct_9fa48("3053") ? `` : (stryCov_9fa48("3053"), `#switch=${encodeURIComponent(visibleBuild.selection.switch)}`)}>
                    Switches <ArrowUpRight size={13} />
                  </a>
                  <LayerInspector label="Plate" part={parts.find(stryMutAct_9fa48("3054") ? () => undefined : (stryCov_9fa48("3054"), part => stryMutAct_9fa48("3057") ? part.category === 'plate' || part.id === visibleBuild.selection.plate : stryMutAct_9fa48("3056") ? false : stryMutAct_9fa48("3055") ? true : (stryCov_9fa48("3055", "3056", "3057"), (stryMutAct_9fa48("3059") ? part.category !== 'plate' : stryMutAct_9fa48("3058") ? true : (stryCov_9fa48("3058", "3059"), part.category === (stryMutAct_9fa48("3060") ? "" : (stryCov_9fa48("3060"), 'plate')))) && (stryMutAct_9fa48("3062") ? part.id !== visibleBuild.selection.plate : stryMutAct_9fa48("3061") ? true : (stryCov_9fa48("3061", "3062"), part.id === visibleBuild.selection.plate)))))} />
                  <LayerInspector label="PCB" part={parts.find(stryMutAct_9fa48("3063") ? () => undefined : (stryCov_9fa48("3063"), part => stryMutAct_9fa48("3066") ? part.category === 'pcb' || part.id === visibleBuild.selection.pcb : stryMutAct_9fa48("3065") ? false : stryMutAct_9fa48("3064") ? true : (stryCov_9fa48("3064", "3065", "3066"), (stryMutAct_9fa48("3068") ? part.category !== 'pcb' : stryMutAct_9fa48("3067") ? true : (stryCov_9fa48("3067", "3068"), part.category === (stryMutAct_9fa48("3069") ? "" : (stryCov_9fa48("3069"), 'pcb')))) && (stryMutAct_9fa48("3071") ? part.id !== visibleBuild.selection.pcb : stryMutAct_9fa48("3070") ? true : (stryCov_9fa48("3070", "3071"), part.id === visibleBuild.selection.pcb)))))} />
                  <LayerInspector label="Case" part={parts.find(stryMutAct_9fa48("3072") ? () => undefined : (stryCov_9fa48("3072"), part => stryMutAct_9fa48("3075") ? part.category === 'case' || part.id === visibleBuild.selection.case : stryMutAct_9fa48("3074") ? false : stryMutAct_9fa48("3073") ? true : (stryCov_9fa48("3073", "3074", "3075"), (stryMutAct_9fa48("3077") ? part.category !== 'case' : stryMutAct_9fa48("3076") ? true : (stryCov_9fa48("3076", "3077"), part.category === (stryMutAct_9fa48("3078") ? "" : (stryCov_9fa48("3078"), 'case')))) && (stryMutAct_9fa48("3080") ? part.id !== visibleBuild.selection.case : stryMutAct_9fa48("3079") ? true : (stryCov_9fa48("3079", "3080"), part.id === visibleBuild.selection.case)))))} />
                </nav>)}
            {stryMutAct_9fa48("3083") ? !landing || <VolumeDial value={volume} enabled={enabled} canEnable={sampleState === 'ready'} onChange={volume => edit({
            audio: {
              ...build.audio,
              volume
            }
          }, 'volume')} onCommit={commit} onToggle={() => {
            if (enabled) {
              stopDemo();
              setEnabled(false);
            } else void enableSound();
          }} /> : stryMutAct_9fa48("3082") ? false : stryMutAct_9fa48("3081") ? true : (stryCov_9fa48("3081", "3082", "3083"), (stryMutAct_9fa48("3084") ? landing : (stryCov_9fa48("3084"), !landing)) && <VolumeDial value={volume} enabled={enabled} canEnable={stryMutAct_9fa48("3087") ? sampleState !== 'ready' : stryMutAct_9fa48("3086") ? false : stryMutAct_9fa48("3085") ? true : (stryCov_9fa48("3085", "3086", "3087"), sampleState === (stryMutAct_9fa48("3088") ? "" : (stryCov_9fa48("3088"), 'ready')))} onChange={stryMutAct_9fa48("3089") ? () => undefined : (stryCov_9fa48("3089"), volume => edit(stryMutAct_9fa48("3090") ? {} : (stryCov_9fa48("3090"), {
            audio: stryMutAct_9fa48("3091") ? {} : (stryCov_9fa48("3091"), {
              ...build.audio,
              volume
            })
          }), stryMutAct_9fa48("3092") ? "" : (stryCov_9fa48("3092"), 'volume')))} onCommit={commit} onToggle={() => {
            if (stryMutAct_9fa48("3093")) {
              {}
            } else {
              stryCov_9fa48("3093");
              if (stryMutAct_9fa48("3095") ? false : stryMutAct_9fa48("3094") ? true : (stryCov_9fa48("3094", "3095"), enabled)) {
                if (stryMutAct_9fa48("3096")) {
                  {}
                } else {
                  stryCov_9fa48("3096");
                  if (stryMutAct_9fa48("3097")) {
                    ;
                  } else {
                    stryCov_9fa48("3097");
                    stopDemo();
                  }
                  setEnabled(stryMutAct_9fa48("3099") ? true : (stryCov_9fa48("3099"), false));
                }
              } else void enableSound();
            }
          }} />)}
            <div className="stage-bottom">
              {stryMutAct_9fa48("3102") ? focusMode || <MusicControls music={music} /> : stryMutAct_9fa48("3101") ? false : stryMutAct_9fa48("3100") ? true : (stryCov_9fa48("3100", "3101", "3102"), focusMode && <MusicControls music={music} />)}
              {stryMutAct_9fa48("3105") ? landing || experience === 'typing' || <button className="room-motion" aria-pressed={!roomMotion} aria-label={roomMotion ? 'Pause room motion' : 'Resume room motion'} onClick={() => setRoomMotion(!roomMotion)}>
                  {roomMotion ? <Wind size={15} /> : <Pause size={15} />}
                  <span>{roomMotion ? 'Breeze on' : 'Room paused'}</span>
                </button> : stryMutAct_9fa48("3104") ? false : stryMutAct_9fa48("3103") ? true : (stryCov_9fa48("3103", "3104", "3105"), (stryMutAct_9fa48("3107") ? landing && experience === 'typing' : stryMutAct_9fa48("3106") ? true : (stryCov_9fa48("3106", "3107"), landing || (stryMutAct_9fa48("3109") ? experience !== 'typing' : stryMutAct_9fa48("3108") ? false : (stryCov_9fa48("3108", "3109"), experience === (stryMutAct_9fa48("3110") ? "" : (stryCov_9fa48("3110"), 'typing')))))) && <button className="room-motion" aria-pressed={stryMutAct_9fa48("3111") ? roomMotion : (stryCov_9fa48("3111"), !roomMotion)} aria-label={roomMotion ? stryMutAct_9fa48("3112") ? "" : (stryCov_9fa48("3112"), 'Pause room motion') : stryMutAct_9fa48("3113") ? "" : (stryCov_9fa48("3113"), 'Resume room motion')} onClick={stryMutAct_9fa48("3114") ? () => undefined : (stryCov_9fa48("3114"), () => setRoomMotion(stryMutAct_9fa48("3115") ? roomMotion : (stryCov_9fa48("3115"), !roomMotion)))}>
                  {roomMotion ? <Wind size={15} /> : <Pause size={15} />}
                  <span>{roomMotion ? stryMutAct_9fa48("3116") ? "" : (stryCov_9fa48("3116"), 'Breeze on') : stryMutAct_9fa48("3117") ? "" : (stryCov_9fa48("3117"), 'Room paused')}</span>
                </button>)}
              <div className="view-controls">
                <button onClick={stryMutAct_9fa48("3118") ? () => undefined : (stryCov_9fa48("3118"), () => setView((stryMutAct_9fa48("3121") ? view !== 'top' : stryMutAct_9fa48("3120") ? false : stryMutAct_9fa48("3119") ? true : (stryCov_9fa48("3119", "3120", "3121"), view === (stryMutAct_9fa48("3122") ? "" : (stryCov_9fa48("3122"), 'top')))) ? stryMutAct_9fa48("3123") ? "" : (stryCov_9fa48("3123"), 'perspective') : stryMutAct_9fa48("3124") ? "" : (stryCov_9fa48("3124"), 'top')))}>
                  {(stryMutAct_9fa48("3127") ? view !== 'top' : stryMutAct_9fa48("3126") ? false : stryMutAct_9fa48("3125") ? true : (stryCov_9fa48("3125", "3126", "3127"), view === (stryMutAct_9fa48("3128") ? "" : (stryCov_9fa48("3128"), 'top')))) ? stryMutAct_9fa48("3129") ? "" : (stryCov_9fa48("3129"), 'Perspective') : stryMutAct_9fa48("3130") ? "" : (stryCov_9fa48("3130"), 'Top view')}
                </button>
                <button aria-pressed={exploded} onClick={stryMutAct_9fa48("3131") ? () => undefined : (stryCov_9fa48("3131"), () => setExploded(stryMutAct_9fa48("3132") ? exploded : (stryCov_9fa48("3132"), !exploded)))}>
                  <Layers size={16} /> Explode
                </button>
                <button aria-label="Reset view" onClick={() => {
                if (stryMutAct_9fa48("3133")) {
                  {}
                } else {
                  stryCov_9fa48("3133");
                  setView((stryMutAct_9fa48("3137") ? view !== 'reset' : stryMutAct_9fa48("3136") ? false : stryMutAct_9fa48("3135") ? true : (stryCov_9fa48("3135", "3136", "3137"), view === (stryMutAct_9fa48("3138") ? "" : (stryCov_9fa48("3138"), 'reset')))) ? stryMutAct_9fa48("3139") ? "" : (stryCov_9fa48("3139"), 'perspective') : stryMutAct_9fa48("3140") ? "" : (stryCov_9fa48("3140"), 'reset'));
                  setExploded(stryMutAct_9fa48("3142") ? true : (stryCov_9fa48("3142"), false));
                }
              }}>
                  <RotateCcw size={16} />
                </button>
                <button aria-pressed={focusMode} onClick={stryMutAct_9fa48("3143") ? () => undefined : (stryCov_9fa48("3143"), () => setExperience(focusMode ? stryMutAct_9fa48("3144") ? "" : (stryCov_9fa48("3144"), 'builder') : stryMutAct_9fa48("3145") ? "" : (stryCov_9fa48("3145"), 'focus')))}>
                  {focusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  {focusMode ? landing ? stryMutAct_9fa48("3146") ? "" : (stryCov_9fa48("3146"), 'Back to preview') : stryMutAct_9fa48("3147") ? "" : (stryCov_9fa48("3147"), 'Back to builder') : stryMutAct_9fa48("3148") ? "" : (stryCov_9fa48("3148"), 'Focus')}
                </button>
              </div>
              <span>
                <span className="pointer-instructions">
                  Drag to orbit · Scroll to zoom · Type to try
                </span>
                <span className="touch-instructions">
                  Swipe sideways to orbit · Swipe up to scroll
                </span>
              </span>
            </div>
            {stryMutAct_9fa48("3151") ? screen === 'sound' && !focusMode || <section className="sound-audition" aria-label="Audition your typing sound">
                <div className="audition-title">
                  <span>{pack?.name ?? 'Synthesized study'}</span>
                  <small>
                    {pack ? 'Recorded reference' : 'Approximate sound'}
                  </small>
                </div>
                <SampleWaveform preview={currentRecording?.preview ?? null} synthesized={!pack} playing={demo} />
                <div className="audition-keys">
                  <button disabled={sampleState !== 'ready'} onClick={() => void playSequence(['KeyA'])}>
                    <kbd>A</kbd> Letter key
                  </button>
                  <button disabled={sampleState !== 'ready'} onClick={() => void playSequence(['Space'])}>
                    <kbd>space</kbd> Spacebar
                  </button>
                </div>
                <button className="button full" disabled={sampleState !== 'ready'} onClick={() => {
              if (demo) stopDemo();else void playSequence(['KeyM', 'KeyA', 'KeyK', 'KeyE', 'Space', 'KeyI', 'KeyT', 'Space', 'KeyY', 'KeyO', 'KeyU', 'KeyR', 'KeyS']);
            }}>
                  {demo ? <VolumeX size={15} /> : <Play size={15} />}
                  {demo ? 'Stop playback' : 'Try a typing sequence'}
                </button>
              </section> : stryMutAct_9fa48("3150") ? false : stryMutAct_9fa48("3149") ? true : (stryCov_9fa48("3149", "3150", "3151"), (stryMutAct_9fa48("3153") ? screen === 'sound' || !focusMode : stryMutAct_9fa48("3152") ? true : (stryCov_9fa48("3152", "3153"), (stryMutAct_9fa48("3155") ? screen !== 'sound' : stryMutAct_9fa48("3154") ? true : (stryCov_9fa48("3154", "3155"), screen === (stryMutAct_9fa48("3156") ? "" : (stryCov_9fa48("3156"), 'sound')))) && (stryMutAct_9fa48("3157") ? focusMode : (stryCov_9fa48("3157"), !focusMode)))) && <section className="sound-audition" aria-label="Audition your typing sound">
                <div className="audition-title">
                  <span>{stryMutAct_9fa48("3158") ? pack?.name && 'Synthesized study' : (stryCov_9fa48("3158"), (stryMutAct_9fa48("3159") ? pack.name : (stryCov_9fa48("3159"), pack?.name)) ?? (stryMutAct_9fa48("3160") ? "" : (stryCov_9fa48("3160"), 'Synthesized study')))}</span>
                  <small>
                    {pack ? stryMutAct_9fa48("3161") ? "" : (stryCov_9fa48("3161"), 'Recorded reference') : stryMutAct_9fa48("3162") ? "" : (stryCov_9fa48("3162"), 'Approximate sound')}
                  </small>
                </div>
                <SampleWaveform preview={stryMutAct_9fa48("3163") ? currentRecording?.preview && null : (stryCov_9fa48("3163"), (stryMutAct_9fa48("3164") ? currentRecording.preview : (stryCov_9fa48("3164"), currentRecording?.preview)) ?? null)} synthesized={stryMutAct_9fa48("3165") ? pack : (stryCov_9fa48("3165"), !pack)} playing={demo} />
                <div className="audition-keys">
                  <button disabled={stryMutAct_9fa48("3168") ? sampleState === 'ready' : stryMutAct_9fa48("3167") ? false : stryMutAct_9fa48("3166") ? true : (stryCov_9fa48("3166", "3167", "3168"), sampleState !== (stryMutAct_9fa48("3169") ? "" : (stryCov_9fa48("3169"), 'ready')))} onClick={stryMutAct_9fa48("3170") ? () => undefined : (stryCov_9fa48("3170"), () => void playSequence(stryMutAct_9fa48("3171") ? [] : (stryCov_9fa48("3171"), [stryMutAct_9fa48("3172") ? "" : (stryCov_9fa48("3172"), 'KeyA')])))}>
                    <kbd>A</kbd> Letter key
                  </button>
                  <button disabled={stryMutAct_9fa48("3175") ? sampleState === 'ready' : stryMutAct_9fa48("3174") ? false : stryMutAct_9fa48("3173") ? true : (stryCov_9fa48("3173", "3174", "3175"), sampleState !== (stryMutAct_9fa48("3176") ? "" : (stryCov_9fa48("3176"), 'ready')))} onClick={stryMutAct_9fa48("3177") ? () => undefined : (stryCov_9fa48("3177"), () => void playSequence(stryMutAct_9fa48("3178") ? [] : (stryCov_9fa48("3178"), [stryMutAct_9fa48("3179") ? "" : (stryCov_9fa48("3179"), 'Space')])))}>
                    <kbd>space</kbd> Spacebar
                  </button>
                </div>
                <button className="button full" disabled={stryMutAct_9fa48("3182") ? sampleState === 'ready' : stryMutAct_9fa48("3181") ? false : stryMutAct_9fa48("3180") ? true : (stryCov_9fa48("3180", "3181", "3182"), sampleState !== (stryMutAct_9fa48("3183") ? "" : (stryCov_9fa48("3183"), 'ready')))} onClick={() => {
              if (stryMutAct_9fa48("3184")) {
                {}
              } else {
                stryCov_9fa48("3184");
                if (stryMutAct_9fa48("3186") ? false : stryMutAct_9fa48("3185") ? true : (stryCov_9fa48("3185", "3186"), demo)) {
                  if (stryMutAct_9fa48("3187")) {
                    ;
                  } else {
                    stryCov_9fa48("3187");
                    stopDemo();
                  }
                } else void playSequence(stryMutAct_9fa48("3188") ? [] : (stryCov_9fa48("3188"), [stryMutAct_9fa48("3189") ? "" : (stryCov_9fa48("3189"), 'KeyM'), stryMutAct_9fa48("3190") ? "" : (stryCov_9fa48("3190"), 'KeyA'), stryMutAct_9fa48("3191") ? "" : (stryCov_9fa48("3191"), 'KeyK'), stryMutAct_9fa48("3192") ? "" : (stryCov_9fa48("3192"), 'KeyE'), stryMutAct_9fa48("3193") ? "" : (stryCov_9fa48("3193"), 'Space'), stryMutAct_9fa48("3194") ? "" : (stryCov_9fa48("3194"), 'KeyI'), stryMutAct_9fa48("3195") ? "" : (stryCov_9fa48("3195"), 'KeyT'), stryMutAct_9fa48("3196") ? "" : (stryCov_9fa48("3196"), 'Space'), stryMutAct_9fa48("3197") ? "" : (stryCov_9fa48("3197"), 'KeyY'), stryMutAct_9fa48("3198") ? "" : (stryCov_9fa48("3198"), 'KeyO'), stryMutAct_9fa48("3199") ? "" : (stryCov_9fa48("3199"), 'KeyU'), stryMutAct_9fa48("3200") ? "" : (stryCov_9fa48("3200"), 'KeyR'), stryMutAct_9fa48("3201") ? "" : (stryCov_9fa48("3201"), 'KeyS')]));
              }
            }}>
                  {demo ? <VolumeX size={15} /> : <Play size={15} />}
                  {demo ? stryMutAct_9fa48("3202") ? "" : (stryCov_9fa48("3202"), 'Stop playback') : stryMutAct_9fa48("3203") ? "" : (stryCov_9fa48("3203"), 'Try a typing sequence')}
                </button>
              </section>)}
            <div className="stage-caption">
              <span>
                STUDY / {layout} <i>·</i> {stryMutAct_9fa48("3204") ? palette.name.toLowerCase() : (stryCov_9fa48("3204"), palette.name.toUpperCase())}
              </span>
              <span>
                {enabled ? pack ? stryMutAct_9fa48("3205") ? `` : (stryCov_9fa48("3205"), `${pack.name} · recorded reference`) : stryMutAct_9fa48("3206") ? "" : (stryCov_9fa48("3206"), 'Synthesized sound · approximate') : stryMutAct_9fa48("3207") ? "" : (stryCov_9fa48("3207"), 'A space to try things.')}
              </span>
            </div>
          </section>
          {stryMutAct_9fa48("3210") ? landing || <FeaturedGallery selected={featured.id} onSelect={preset => {
          setFeatured(preset);
          setExploded(false);
          setView('perspective');
        }} /> : stryMutAct_9fa48("3209") ? false : stryMutAct_9fa48("3208") ? true : (stryCov_9fa48("3208", "3209", "3210"), landing && <FeaturedGallery selected={featured.id} onSelect={preset => {
          if (stryMutAct_9fa48("3211")) {
            {}
          } else {
            stryCov_9fa48("3211");
            if (stryMutAct_9fa48("3212")) {
              ;
            } else {
              stryCov_9fa48("3212");
              setFeatured(preset);
            }
            setExploded(stryMutAct_9fa48("3214") ? true : (stryCov_9fa48("3214"), false));
            setView(stryMutAct_9fa48("3216") ? "" : (stryCov_9fa48("3216"), 'perspective'));
          }
        }} />)}
          {stryMutAct_9fa48("3219") ? landing || <FeaturedInspector featured={featured} onCustomize={customizePreview} /> : stryMutAct_9fa48("3218") ? false : stryMutAct_9fa48("3217") ? true : (stryCov_9fa48("3217", "3218", "3219"), landing && <FeaturedInspector featured={featured} onCustomize={customizePreview} />)}
          <MobileWorkbench activeTab={tab} onTabChange={setTab} footer={<>
                <button className="build-status" onClick={stryMutAct_9fa48("3220") ? () => undefined : (stryCov_9fa48("3220"), () => setTab(stryMutAct_9fa48("3221") ? "" : (stryCov_9fa48("3221"), 'parts')))}>
                  <span className={blocked ? stryMutAct_9fa48("3222") ? "" : (stryCov_9fa48("3222"), 'warn-dot') : stryMutAct_9fa48("3223") ? "" : (stryCov_9fa48("3223"), 'neutral-dot')} />
                  {blocked ? blocked + (stryMutAct_9fa48("3224") ? "" : (stryCov_9fa48("3224"), ' compatibility conflicts')) : stryMutAct_9fa48("3225") ? "" : (stryCov_9fa48("3225"), 'Review component compatibility')}
                  <ChevronRight size={15} />
                </button>
                <button className="button full" onClick={exportBuild}>
                  <Download size={16} /> Export your build
                </button>
                <small>Visual study · Product dimensions not verified</small>
                <button className="text-button research-entry" onClick={stryMutAct_9fa48("3226") ? () => undefined : (stryCov_9fa48("3226"), () => setModal(stryMutAct_9fa48("3227") ? "" : (stryCov_9fa48("3227"), 'research')))}>
                  Research & sources <ArrowUpRight size={14} />
                </button>
              </>}>
              {stryMutAct_9fa48("3230") ? tab === 'design' || <>
                  <section>
                    <div className="section-label">
                      <span>01</span>
                      <h3>Form & foundation</h3>
                    </div>
                    <fieldset className="control-group">
                      <legend>Layout</legend>
                      <div className="segmented">
                        {layouts.map(x => <button key={x} aria-pressed={x === layout} className={x === layout ? 'selected' : ''} onClick={() => setLayout(x)}>
                            {x}%
                          </button>)}
                      </div>
                    </fieldset>
                    <label htmlFor="finish">Case material</label>
                    <StudioSelect id="finish" value={finish} onValueChange={value => {
                const finish = finishes.find(x => x === value);
                if (finish) edit({
                  finish
                });
              }} options={finishes.map(x => ({
                value: x,
                label: x
              }))} />
                    <fieldset className="control-group">
                      <legend>
                        Case finish{' '}
                        <span>
                          {caseColors.find(c => c.color === caseColor)?.name || 'Custom'}
                        </span>
                      </legend>
                      <div className="swatches">
                        {caseColors.map(x => <button key={x.color} style={{
                    background: x.color
                  }} aria-label={x.name + ' case'} aria-pressed={caseColor === x.color} onClick={() => edit({
                    caseColor: x.color
                  })}>
                            {caseColor === x.color && <Check size={15} />}
                          </button>)}
                      </div>
                    </fieldset>
                  </section>
                  <section>
                    <div className="section-label">
                      <span>02</span>
                      <h3>Color & character</h3>
                    </div>
                    <div className="palette-list">
                      {palettes.map(p => <button key={p.name} aria-pressed={palette.name === p.name} className={palette.name === p.name ? 'palette selected' : 'palette'} onClick={() => setPalette(p)}>
                          <span className="palette-colors">
                            {[p.alpha, p.mod, p.accent, p.space].map((c, i) => <i key={i} style={{
                      background: c
                    }} />)}
                          </span>
                          {p.name}
                          {palette.name === p.name && <Check size={16} />}
                        </button>)}
                    </div>
                    <details className="custom-colors">
                      <summary>
                        <SlidersHorizontal size={14} /> Make it your own
                      </summary>
                      <div className="color-inputs">
                        {(['alpha', 'mod', 'accent', 'space'] satisfies (keyof typeof palette)[]).map(zone => <label key={zone}>
                            {zone}
                            <input type="color" aria-label={zone + ' color'} value={palette[zone]} onChange={e => edit({
                      palette: {
                        ...palette,
                        name: 'Custom',
                        [zone]: e.target.value
                      }
                    }, 'color-' + zone)} onBlur={commit} />
                          </label>)}
                      </div>
                    </details>
                    <button className="text-button" onClick={() => {
                const choices = palettes.filter(p => p.name !== palette.name);
                const next = choices[Math.floor(Math.random() * choices.length)];
                edit({
                  palette: next,
                  caseColor: caseColors[Math.floor(Math.random() * caseColors.length)].color
                });
              }}>
                      <Shuffle size={15} /> Surprise me
                    </button>
                    <label htmlFor="profile">
                      Keycap silhouette <span>Illustrative</span>
                    </label>
                    <StudioSelect id="profile" value={profile} onValueChange={value => {
                const profile = profiles.find(x => x === value);
                if (profile) edit({
                  profile
                });
              }} options={profiles.map(p => ({
                value: p,
                label: p
              }))} />
                  </section>
                </> : stryMutAct_9fa48("3229") ? false : stryMutAct_9fa48("3228") ? true : (stryCov_9fa48("3228", "3229", "3230"), (stryMutAct_9fa48("3232") ? tab !== 'design' : stryMutAct_9fa48("3231") ? true : (stryCov_9fa48("3231", "3232"), tab === (stryMutAct_9fa48("3233") ? "" : (stryCov_9fa48("3233"), 'design')))) && <>
                  <section>
                    <div className="section-label">
                      <span>01</span>
                      <h3>Form & foundation</h3>
                    </div>
                    <fieldset className="control-group">
                      <legend>Layout</legend>
                      <div className="segmented">
                        {layouts.map(stryMutAct_9fa48("3234") ? () => undefined : (stryCov_9fa48("3234"), x => <button key={x} aria-pressed={stryMutAct_9fa48("3237") ? x !== layout : stryMutAct_9fa48("3236") ? false : stryMutAct_9fa48("3235") ? true : (stryCov_9fa48("3235", "3236", "3237"), x === layout)} className={(stryMutAct_9fa48("3240") ? x !== layout : stryMutAct_9fa48("3239") ? false : stryMutAct_9fa48("3238") ? true : (stryCov_9fa48("3238", "3239", "3240"), x === layout)) ? stryMutAct_9fa48("3241") ? "" : (stryCov_9fa48("3241"), 'selected') : stryMutAct_9fa48("3242") ? "Stryker was here!" : (stryCov_9fa48("3242"), '')} onClick={stryMutAct_9fa48("3243") ? () => undefined : (stryCov_9fa48("3243"), () => setLayout(x))}>
                            {x}%
                          </button>))}
                      </div>
                    </fieldset>
                    <label htmlFor="finish">Case material</label>
                    <StudioSelect id="finish" value={finish} onValueChange={value => {
                if (stryMutAct_9fa48("3244")) {
                  {}
                } else {
                  stryCov_9fa48("3244");
                  const finish = finishes.find(stryMutAct_9fa48("3245") ? () => undefined : (stryCov_9fa48("3245"), x => stryMutAct_9fa48("3248") ? x !== value : stryMutAct_9fa48("3247") ? false : stryMutAct_9fa48("3246") ? true : (stryCov_9fa48("3246", "3247", "3248"), x === value)));
                  if (stryMutAct_9fa48("3250") ? false : stryMutAct_9fa48("3249") ? true : (stryCov_9fa48("3249", "3250"), finish)) edit(stryMutAct_9fa48("3252") ? {} : (stryCov_9fa48("3252"), {
                    finish
                  }));
                }
              }} options={finishes.map(stryMutAct_9fa48("3253") ? () => undefined : (stryCov_9fa48("3253"), x => stryMutAct_9fa48("3254") ? {} : (stryCov_9fa48("3254"), {
                value: x,
                label: x
              })))} />
                    <fieldset className="control-group">
                      <legend>
                        Case finish{stryMutAct_9fa48("3255") ? "" : (stryCov_9fa48("3255"), ' ')}
                        <span>
                          {stryMutAct_9fa48("3258") ? caseColors.find(c => c.color === caseColor)?.name && 'Custom' : stryMutAct_9fa48("3257") ? false : stryMutAct_9fa48("3256") ? true : (stryCov_9fa48("3256", "3257", "3258"), (stryMutAct_9fa48("3259") ? caseColors.find(c => c.color === caseColor).name : (stryCov_9fa48("3259"), caseColors.find(stryMutAct_9fa48("3260") ? () => undefined : (stryCov_9fa48("3260"), c => stryMutAct_9fa48("3263") ? c.color !== caseColor : stryMutAct_9fa48("3262") ? false : stryMutAct_9fa48("3261") ? true : (stryCov_9fa48("3261", "3262", "3263"), c.color === caseColor)))?.name)) || (stryMutAct_9fa48("3264") ? "" : (stryCov_9fa48("3264"), 'Custom')))}
                        </span>
                      </legend>
                      <div className="swatches">
                        {caseColors.map(stryMutAct_9fa48("3265") ? () => undefined : (stryCov_9fa48("3265"), x => <button key={x.color} style={stryMutAct_9fa48("3266") ? {} : (stryCov_9fa48("3266"), {
                    background: x.color
                  })} aria-label={x.name + (stryMutAct_9fa48("3267") ? "" : (stryCov_9fa48("3267"), ' case'))} aria-pressed={stryMutAct_9fa48("3270") ? caseColor !== x.color : stryMutAct_9fa48("3269") ? false : stryMutAct_9fa48("3268") ? true : (stryCov_9fa48("3268", "3269", "3270"), caseColor === x.color)} onClick={stryMutAct_9fa48("3271") ? () => undefined : (stryCov_9fa48("3271"), () => edit(stryMutAct_9fa48("3272") ? {} : (stryCov_9fa48("3272"), {
                    caseColor: x.color
                  })))}>
                            {stryMutAct_9fa48("3275") ? caseColor === x.color || <Check size={15} /> : stryMutAct_9fa48("3274") ? false : stryMutAct_9fa48("3273") ? true : (stryCov_9fa48("3273", "3274", "3275"), (stryMutAct_9fa48("3277") ? caseColor !== x.color : stryMutAct_9fa48("3276") ? true : (stryCov_9fa48("3276", "3277"), caseColor === x.color)) && <Check size={15} />)}
                          </button>))}
                      </div>
                    </fieldset>
                  </section>
                  <section>
                    <div className="section-label">
                      <span>02</span>
                      <h3>Color & character</h3>
                    </div>
                    <div className="palette-list">
                      {palettes.map(stryMutAct_9fa48("3278") ? () => undefined : (stryCov_9fa48("3278"), p => <button key={p.name} aria-pressed={stryMutAct_9fa48("3281") ? palette.name !== p.name : stryMutAct_9fa48("3280") ? false : stryMutAct_9fa48("3279") ? true : (stryCov_9fa48("3279", "3280", "3281"), palette.name === p.name)} className={(stryMutAct_9fa48("3284") ? palette.name !== p.name : stryMutAct_9fa48("3283") ? false : stryMutAct_9fa48("3282") ? true : (stryCov_9fa48("3282", "3283", "3284"), palette.name === p.name)) ? stryMutAct_9fa48("3285") ? "" : (stryCov_9fa48("3285"), 'palette selected') : stryMutAct_9fa48("3286") ? "" : (stryCov_9fa48("3286"), 'palette')} onClick={stryMutAct_9fa48("3287") ? () => undefined : (stryCov_9fa48("3287"), () => setPalette(p))}>
                          <span className="palette-colors">
                            {(stryMutAct_9fa48("3288") ? [] : (stryCov_9fa48("3288"), [p.alpha, p.mod, p.accent, p.space])).map(stryMutAct_9fa48("3289") ? () => undefined : (stryCov_9fa48("3289"), (c, i) => <i key={i} style={stryMutAct_9fa48("3290") ? {} : (stryCov_9fa48("3290"), {
                      background: c
                    })} />))}
                          </span>
                          {p.name}
                          {stryMutAct_9fa48("3293") ? palette.name === p.name || <Check size={16} /> : stryMutAct_9fa48("3292") ? false : stryMutAct_9fa48("3291") ? true : (stryCov_9fa48("3291", "3292", "3293"), (stryMutAct_9fa48("3295") ? palette.name !== p.name : stryMutAct_9fa48("3294") ? true : (stryCov_9fa48("3294", "3295"), palette.name === p.name)) && <Check size={16} />)}
                        </button>))}
                    </div>
                    <details className="custom-colors">
                      <summary>
                        <SlidersHorizontal size={14} /> Make it your own
                      </summary>
                      <div className="color-inputs">
                        {((stryMutAct_9fa48("3296") ? [] : (stryCov_9fa48("3296"), [stryMutAct_9fa48("3297") ? "" : (stryCov_9fa48("3297"), 'alpha'), stryMutAct_9fa48("3298") ? "" : (stryCov_9fa48("3298"), 'mod'), stryMutAct_9fa48("3299") ? "" : (stryCov_9fa48("3299"), 'accent'), stryMutAct_9fa48("3300") ? "" : (stryCov_9fa48("3300"), 'space')])) satisfies (keyof typeof palette)[]).map(stryMutAct_9fa48("3301") ? () => undefined : (stryCov_9fa48("3301"), zone => <label key={zone}>
                            {zone}
                            <input type="color" aria-label={zone + (stryMutAct_9fa48("3302") ? "" : (stryCov_9fa48("3302"), ' color'))} value={palette[zone]} onChange={stryMutAct_9fa48("3303") ? () => undefined : (stryCov_9fa48("3303"), e => edit(stryMutAct_9fa48("3304") ? {} : (stryCov_9fa48("3304"), {
                      palette: stryMutAct_9fa48("3305") ? {} : (stryCov_9fa48("3305"), {
                        ...palette,
                        name: stryMutAct_9fa48("3306") ? "" : (stryCov_9fa48("3306"), 'Custom'),
                        [zone]: e.target.value
                      })
                    }), (stryMutAct_9fa48("3307") ? "" : (stryCov_9fa48("3307"), 'color-')) + zone))} onBlur={commit} />
                          </label>))}
                      </div>
                    </details>
                    <button className="text-button" onClick={() => {
                if (stryMutAct_9fa48("3308")) {
                  {}
                } else {
                  stryCov_9fa48("3308");
                  const choices = stryMutAct_9fa48("3309") ? palettes : (stryCov_9fa48("3309"), palettes.filter(stryMutAct_9fa48("3310") ? () => undefined : (stryCov_9fa48("3310"), p => stryMutAct_9fa48("3313") ? p.name === palette.name : stryMutAct_9fa48("3312") ? false : stryMutAct_9fa48("3311") ? true : (stryCov_9fa48("3311", "3312", "3313"), p.name !== palette.name))));
                  const next = choices[Math.floor(stryMutAct_9fa48("3314") ? Math.random() / choices.length : (stryCov_9fa48("3314"), Math.random() * choices.length))];
                  edit(stryMutAct_9fa48("3316") ? {} : (stryCov_9fa48("3316"), {
                    palette: next,
                    caseColor: caseColors[Math.floor(stryMutAct_9fa48("3317") ? Math.random() / caseColors.length : (stryCov_9fa48("3317"), Math.random() * caseColors.length))].color
                  }));
                }
              }}>
                      <Shuffle size={15} /> Surprise me
                    </button>
                    <label htmlFor="profile">
                      Keycap silhouette <span>Illustrative</span>
                    </label>
                    <StudioSelect id="profile" value={profile} onValueChange={value => {
                if (stryMutAct_9fa48("3318")) {
                  {}
                } else {
                  stryCov_9fa48("3318");
                  const profile = profiles.find(stryMutAct_9fa48("3319") ? () => undefined : (stryCov_9fa48("3319"), x => stryMutAct_9fa48("3322") ? x !== value : stryMutAct_9fa48("3321") ? false : stryMutAct_9fa48("3320") ? true : (stryCov_9fa48("3320", "3321", "3322"), x === value)));
                  if (stryMutAct_9fa48("3324") ? false : stryMutAct_9fa48("3323") ? true : (stryCov_9fa48("3323", "3324"), profile)) edit(stryMutAct_9fa48("3326") ? {} : (stryCov_9fa48("3326"), {
                    profile
                  }));
                }
              }} options={profiles.map(stryMutAct_9fa48("3327") ? () => undefined : (stryCov_9fa48("3327"), p => stryMutAct_9fa48("3328") ? {} : (stryCov_9fa48("3328"), {
                value: p,
                label: p
              })))} />
                  </section>
                </>)}
              {stryMutAct_9fa48("3331") ? tab === 'parts' || <>
                  <ComponentsPanel parts={parts} selection={selection} checks={checks} onSelect={part => edit({
              selection: {
                ...selection,
                [part.category]: part.id
              }
            })} onAssembly={assembly => {
              edit({
                layout: assembly.layout,
                finish: assembly.finish,
                selection: assembly.selection
              });
              setNotice(assembly.name + ' parts selected. Appearance and recording remain your choices.');
            }} onImport={() => setModal('import')} onResearch={() => setModal('research')} />
                  <BuildAccessories customAccessories={build.customAccessories} layout={build.layout} selection={build.selection} selections={build.accessories} onChange={accessories => edit({
              accessories
            })} />
                </> : stryMutAct_9fa48("3330") ? false : stryMutAct_9fa48("3329") ? true : (stryCov_9fa48("3329", "3330", "3331"), (stryMutAct_9fa48("3333") ? tab !== 'parts' : stryMutAct_9fa48("3332") ? true : (stryCov_9fa48("3332", "3333"), tab === (stryMutAct_9fa48("3334") ? "" : (stryCov_9fa48("3334"), 'parts')))) && <>
                  <ComponentsPanel parts={parts} selection={selection} checks={checks} onSelect={stryMutAct_9fa48("3335") ? () => undefined : (stryCov_9fa48("3335"), part => edit(stryMutAct_9fa48("3336") ? {} : (stryCov_9fa48("3336"), {
              selection: stryMutAct_9fa48("3337") ? {} : (stryCov_9fa48("3337"), {
                ...selection,
                [part.category]: part.id
              })
            })))} onAssembly={assembly => {
              if (stryMutAct_9fa48("3338")) {
                {}
              } else {
                stryCov_9fa48("3338");
                edit(stryMutAct_9fa48("3340") ? {} : (stryCov_9fa48("3340"), {
                  layout: assembly.layout,
                  finish: assembly.finish,
                  selection: assembly.selection
                }));
                setNotice(assembly.name + (stryMutAct_9fa48("3342") ? "" : (stryCov_9fa48("3342"), ' parts selected. Appearance and recording remain your choices.')));
              }
            }} onImport={stryMutAct_9fa48("3343") ? () => undefined : (stryCov_9fa48("3343"), () => setModal(stryMutAct_9fa48("3344") ? "" : (stryCov_9fa48("3344"), 'import')))} onResearch={stryMutAct_9fa48("3345") ? () => undefined : (stryCov_9fa48("3345"), () => setModal(stryMutAct_9fa48("3346") ? "" : (stryCov_9fa48("3346"), 'research')))} />
                  <BuildAccessories customAccessories={build.customAccessories} layout={build.layout} selection={build.selection} selections={build.accessories} onChange={stryMutAct_9fa48("3347") ? () => undefined : (stryCov_9fa48("3347"), accessories => edit(stryMutAct_9fa48("3348") ? {} : (stryCov_9fa48("3348"), {
              accessories
            })))} />
                </>)}
              {stryMutAct_9fa48("3351") ? tab === 'sound' || <>
                  <div className="sound-intro">
                    <span className="pill">
                      {pack ? 'Real recorded samples' : 'Synthesized · approximate'}
                    </span>
                    <h3>Hear the switch.</h3>
                    <p className="muted">
                      Your build uses{' '}
                      {selectedSwitch?.name ?? 'an unverified switch'}. Typing
                      audio uses the recording you choose here. Changing parts
                      does not change that recording.
                    </p>
                  </div>
                  <label htmlFor="sound-pack">Typing sound</label>
                  <StudioSelect id="sound-pack" value={pack?.id ?? 'synthesized'} onValueChange={value => {
              stopDemo();
              edit({
                audio: {
                  ...build.audio,
                  source: value
                }
              });
            }} options={[...soundPacks.map(item => ({
              value: item.id,
              label: item.name
            })), {
              value: 'synthesized',
              label: 'Synthesized sound study'
            }]} />
                  {sampleState === 'loading' && <output className="muted recording-count">
                      Loading recordings…
                    </output>}
                  {sampleState === 'error' && <p role="alert">
                      Recordings could not load.{' '}
                      <button className="text-button" onClick={() => setLoadAttempt(n => n + 1)}>
                        Try again
                      </button>
                    </p>}
                  <LastKey source={lastKey} />
                  {!pack && <>
                      <label htmlFor="character">Switch character</label>
                      <StudioSelect id="character" value={character} onValueChange={v => {
                if (v === 'linear' || v === 'tactile' || v === 'clicky') edit({
                  audio: {
                    ...build.audio,
                    character: v
                  }
                });
              }} options={[{
                value: 'linear',
                label: 'Soft linear'
              }, {
                value: 'tactile',
                label: 'Crisp tactile'
              }, {
                value: 'clicky',
                label: 'Bright clicky'
              }]} />
                      <label htmlFor="damping">
                        Damping <span>{Math.round(damping * 100)}%</span>
                      </label>
                      <input id="damping" type="range" min="0" max="1" step=".01" value={damping} onChange={e => edit({
                audio: {
                  ...build.audio,
                  damping: Number(e.target.value)
                }
              }, 'damping')} onPointerUp={commit} onBlur={commit} />
                    </>}
                  <label htmlFor="volume">
                    Volume <span>{Math.round(volume * 100)}%</span>
                  </label>
                  <input id="volume" type="range" min="0" max="2" step=".01" value={volume} onChange={e => edit({
              audio: {
                ...build.audio,
                volume: Number(e.target.value)
              }
            }, 'volume')} onPointerUp={commit} onBlur={commit} />
                  <div className="recording-note">
                    <Volume2 size={18} />
                    <h3>{pack ? pack.name : 'A sound study'}</h3>
                    <p>
                      {pack ? 'Original press and release samples. Case, keycap and foam changes do not alter this recording.' : 'An approximate sound character. Choose a recorded switch above to hear real samples.'}
                    </p>
                    {pack && <>
                        <small>
                          {pack.creator} · {pack.license} · mono MP3, 44.1 kHz
                        </small>
                        <p>
                          {pack.capture} The files retain their original
                          dynamics; the volume control applies gain only.
                        </p>
                        <a className="text-button" href={pack.source} target="_blank" rel="noreferrer">
                          Recording source & license <ArrowUpRight size={14} />
                        </a>
                      </>}
                  </div>
                  <SoundReferences switchName={selectedSwitch?.name} selected={reference} onSelect={record => {
              if (record) {
                music.setBlocked('reference', true);
                stopDemo();
                audio.current?.setLevel(false, volume);
                setEnabled(false);
              }
              setReference(record);
            }} />
                </> : stryMutAct_9fa48("3350") ? false : stryMutAct_9fa48("3349") ? true : (stryCov_9fa48("3349", "3350", "3351"), (stryMutAct_9fa48("3353") ? tab !== 'sound' : stryMutAct_9fa48("3352") ? true : (stryCov_9fa48("3352", "3353"), tab === (stryMutAct_9fa48("3354") ? "" : (stryCov_9fa48("3354"), 'sound')))) && <>
                  <div className="sound-intro">
                    <span className="pill">
                      {pack ? stryMutAct_9fa48("3355") ? "" : (stryCov_9fa48("3355"), 'Real recorded samples') : stryMutAct_9fa48("3356") ? "" : (stryCov_9fa48("3356"), 'Synthesized · approximate')}
                    </span>
                    <h3>Hear the switch.</h3>
                    <p className="muted">
                      Your build uses{stryMutAct_9fa48("3357") ? "" : (stryCov_9fa48("3357"), ' ')}
                      {stryMutAct_9fa48("3358") ? selectedSwitch?.name && 'an unverified switch' : (stryCov_9fa48("3358"), (stryMutAct_9fa48("3359") ? selectedSwitch.name : (stryCov_9fa48("3359"), selectedSwitch?.name)) ?? (stryMutAct_9fa48("3360") ? "" : (stryCov_9fa48("3360"), 'an unverified switch')))}. Typing
                      audio uses the recording you choose here. Changing parts
                      does not change that recording.
                    </p>
                  </div>
                  <label htmlFor="sound-pack">Typing sound</label>
                  <StudioSelect id="sound-pack" value={stryMutAct_9fa48("3361") ? pack?.id && 'synthesized' : (stryCov_9fa48("3361"), (stryMutAct_9fa48("3362") ? pack.id : (stryCov_9fa48("3362"), pack?.id)) ?? (stryMutAct_9fa48("3363") ? "" : (stryCov_9fa48("3363"), 'synthesized')))} onValueChange={value => {
              if (stryMutAct_9fa48("3364")) {
                {}
              } else {
                stryCov_9fa48("3364");
                if (stryMutAct_9fa48("3365")) {
                  ;
                } else {
                  stryCov_9fa48("3365");
                  stopDemo();
                }
                edit(stryMutAct_9fa48("3367") ? {} : (stryCov_9fa48("3367"), {
                  audio: stryMutAct_9fa48("3368") ? {} : (stryCov_9fa48("3368"), {
                    ...build.audio,
                    source: value
                  })
                }));
              }
            }} options={stryMutAct_9fa48("3369") ? [] : (stryCov_9fa48("3369"), [...soundPacks.map(stryMutAct_9fa48("3370") ? () => undefined : (stryCov_9fa48("3370"), item => stryMutAct_9fa48("3371") ? {} : (stryCov_9fa48("3371"), {
              value: item.id,
              label: item.name
            }))), stryMutAct_9fa48("3372") ? {} : (stryCov_9fa48("3372"), {
              value: stryMutAct_9fa48("3373") ? "" : (stryCov_9fa48("3373"), 'synthesized'),
              label: stryMutAct_9fa48("3374") ? "" : (stryCov_9fa48("3374"), 'Synthesized sound study')
            })])} />
                  {stryMutAct_9fa48("3377") ? sampleState === 'loading' || <output className="muted recording-count">
                      Loading recordings…
                    </output> : stryMutAct_9fa48("3376") ? false : stryMutAct_9fa48("3375") ? true : (stryCov_9fa48("3375", "3376", "3377"), (stryMutAct_9fa48("3379") ? sampleState !== 'loading' : stryMutAct_9fa48("3378") ? true : (stryCov_9fa48("3378", "3379"), sampleState === (stryMutAct_9fa48("3380") ? "" : (stryCov_9fa48("3380"), 'loading')))) && <output className="muted recording-count">
                      Loading recordings…
                    </output>)}
                  {stryMutAct_9fa48("3383") ? sampleState === 'error' || <p role="alert">
                      Recordings could not load.{' '}
                      <button className="text-button" onClick={() => setLoadAttempt(n => n + 1)}>
                        Try again
                      </button>
                    </p> : stryMutAct_9fa48("3382") ? false : stryMutAct_9fa48("3381") ? true : (stryCov_9fa48("3381", "3382", "3383"), (stryMutAct_9fa48("3385") ? sampleState !== 'error' : stryMutAct_9fa48("3384") ? true : (stryCov_9fa48("3384", "3385"), sampleState === (stryMutAct_9fa48("3386") ? "" : (stryCov_9fa48("3386"), 'error')))) && <p role="alert">
                      Recordings could not load.{stryMutAct_9fa48("3387") ? "" : (stryCov_9fa48("3387"), ' ')}
                      <button className="text-button" onClick={stryMutAct_9fa48("3388") ? () => undefined : (stryCov_9fa48("3388"), () => setLoadAttempt(stryMutAct_9fa48("3389") ? () => undefined : (stryCov_9fa48("3389"), n => stryMutAct_9fa48("3390") ? n - 1 : (stryCov_9fa48("3390"), n + 1))))}>
                        Try again
                      </button>
                    </p>)}
                  <LastKey source={lastKey} />
                  {stryMutAct_9fa48("3393") ? !pack || <>
                      <label htmlFor="character">Switch character</label>
                      <StudioSelect id="character" value={character} onValueChange={v => {
                if (v === 'linear' || v === 'tactile' || v === 'clicky') edit({
                  audio: {
                    ...build.audio,
                    character: v
                  }
                });
              }} options={[{
                value: 'linear',
                label: 'Soft linear'
              }, {
                value: 'tactile',
                label: 'Crisp tactile'
              }, {
                value: 'clicky',
                label: 'Bright clicky'
              }]} />
                      <label htmlFor="damping">
                        Damping <span>{Math.round(damping * 100)}%</span>
                      </label>
                      <input id="damping" type="range" min="0" max="1" step=".01" value={damping} onChange={e => edit({
                audio: {
                  ...build.audio,
                  damping: Number(e.target.value)
                }
              }, 'damping')} onPointerUp={commit} onBlur={commit} />
                    </> : stryMutAct_9fa48("3392") ? false : stryMutAct_9fa48("3391") ? true : (stryCov_9fa48("3391", "3392", "3393"), (stryMutAct_9fa48("3394") ? pack : (stryCov_9fa48("3394"), !pack)) && <>
                      <label htmlFor="character">Switch character</label>
                      <StudioSelect id="character" value={character} onValueChange={v => {
                if (stryMutAct_9fa48("3395")) {
                  {}
                } else {
                  stryCov_9fa48("3395");
                  if (stryMutAct_9fa48("3398") ? (v === 'linear' || v === 'tactile') && v === 'clicky' : stryMutAct_9fa48("3397") ? false : stryMutAct_9fa48("3396") ? true : (stryCov_9fa48("3396", "3397", "3398"), (stryMutAct_9fa48("3400") ? v === 'linear' && v === 'tactile' : stryMutAct_9fa48("3399") ? false : (stryCov_9fa48("3399", "3400"), (stryMutAct_9fa48("3402") ? v !== 'linear' : stryMutAct_9fa48("3401") ? false : (stryCov_9fa48("3401", "3402"), v === (stryMutAct_9fa48("3403") ? "" : (stryCov_9fa48("3403"), 'linear')))) || (stryMutAct_9fa48("3405") ? v !== 'tactile' : stryMutAct_9fa48("3404") ? false : (stryCov_9fa48("3404", "3405"), v === (stryMutAct_9fa48("3406") ? "" : (stryCov_9fa48("3406"), 'tactile')))))) || (stryMutAct_9fa48("3408") ? v !== 'clicky' : stryMutAct_9fa48("3407") ? false : (stryCov_9fa48("3407", "3408"), v === (stryMutAct_9fa48("3409") ? "" : (stryCov_9fa48("3409"), 'clicky')))))) edit(stryMutAct_9fa48("3411") ? {} : (stryCov_9fa48("3411"), {
                    audio: stryMutAct_9fa48("3412") ? {} : (stryCov_9fa48("3412"), {
                      ...build.audio,
                      character: v
                    })
                  }));
                }
              }} options={stryMutAct_9fa48("3413") ? [] : (stryCov_9fa48("3413"), [stryMutAct_9fa48("3414") ? {} : (stryCov_9fa48("3414"), {
                value: stryMutAct_9fa48("3415") ? "" : (stryCov_9fa48("3415"), 'linear'),
                label: stryMutAct_9fa48("3416") ? "" : (stryCov_9fa48("3416"), 'Soft linear')
              }), stryMutAct_9fa48("3417") ? {} : (stryCov_9fa48("3417"), {
                value: stryMutAct_9fa48("3418") ? "" : (stryCov_9fa48("3418"), 'tactile'),
                label: stryMutAct_9fa48("3419") ? "" : (stryCov_9fa48("3419"), 'Crisp tactile')
              }), stryMutAct_9fa48("3420") ? {} : (stryCov_9fa48("3420"), {
                value: stryMutAct_9fa48("3421") ? "" : (stryCov_9fa48("3421"), 'clicky'),
                label: stryMutAct_9fa48("3422") ? "" : (stryCov_9fa48("3422"), 'Bright clicky')
              })])} />
                      <label htmlFor="damping">
                        Damping <span>{Math.round(stryMutAct_9fa48("3423") ? damping / 100 : (stryCov_9fa48("3423"), damping * 100))}%</span>
                      </label>
                      <input id="damping" type="range" min="0" max="1" step=".01" value={damping} onChange={stryMutAct_9fa48("3424") ? () => undefined : (stryCov_9fa48("3424"), e => edit(stryMutAct_9fa48("3425") ? {} : (stryCov_9fa48("3425"), {
                audio: stryMutAct_9fa48("3426") ? {} : (stryCov_9fa48("3426"), {
                  ...build.audio,
                  damping: Number(e.target.value)
                })
              }), stryMutAct_9fa48("3427") ? "" : (stryCov_9fa48("3427"), 'damping')))} onPointerUp={commit} onBlur={commit} />
                    </>)}
                  <label htmlFor="volume">
                    Volume <span>{Math.round(stryMutAct_9fa48("3428") ? volume / 100 : (stryCov_9fa48("3428"), volume * 100))}%</span>
                  </label>
                  <input id="volume" type="range" min="0" max="2" step=".01" value={volume} onChange={stryMutAct_9fa48("3429") ? () => undefined : (stryCov_9fa48("3429"), e => edit(stryMutAct_9fa48("3430") ? {} : (stryCov_9fa48("3430"), {
              audio: stryMutAct_9fa48("3431") ? {} : (stryCov_9fa48("3431"), {
                ...build.audio,
                volume: Number(e.target.value)
              })
            }), stryMutAct_9fa48("3432") ? "" : (stryCov_9fa48("3432"), 'volume')))} onPointerUp={commit} onBlur={commit} />
                  <div className="recording-note">
                    <Volume2 size={18} />
                    <h3>{pack ? pack.name : stryMutAct_9fa48("3433") ? "" : (stryCov_9fa48("3433"), 'A sound study')}</h3>
                    <p>
                      {pack ? stryMutAct_9fa48("3434") ? "" : (stryCov_9fa48("3434"), 'Original press and release samples. Case, keycap and foam changes do not alter this recording.') : stryMutAct_9fa48("3435") ? "" : (stryCov_9fa48("3435"), 'An approximate sound character. Choose a recorded switch above to hear real samples.')}
                    </p>
                    {stryMutAct_9fa48("3438") ? pack || <>
                        <small>
                          {pack.creator} · {pack.license} · mono MP3, 44.1 kHz
                        </small>
                        <p>
                          {pack.capture} The files retain their original
                          dynamics; the volume control applies gain only.
                        </p>
                        <a className="text-button" href={pack.source} target="_blank" rel="noreferrer">
                          Recording source & license <ArrowUpRight size={14} />
                        </a>
                      </> : stryMutAct_9fa48("3437") ? false : stryMutAct_9fa48("3436") ? true : (stryCov_9fa48("3436", "3437", "3438"), pack && <>
                        <small>
                          {pack.creator} · {pack.license} · mono MP3, 44.1 kHz
                        </small>
                        <p>
                          {pack.capture} The files retain their original
                          dynamics; the volume control applies gain only.
                        </p>
                        <a className="text-button" href={pack.source} target="_blank" rel="noreferrer">
                          Recording source & license <ArrowUpRight size={14} />
                        </a>
                      </>)}
                  </div>
                  <SoundReferences switchName={stryMutAct_9fa48("3439") ? selectedSwitch.name : (stryCov_9fa48("3439"), selectedSwitch?.name)} selected={reference} onSelect={record => {
              if (stryMutAct_9fa48("3440")) {
                {}
              } else {
                stryCov_9fa48("3440");
                if (stryMutAct_9fa48("3442") ? false : stryMutAct_9fa48("3441") ? true : (stryCov_9fa48("3441", "3442"), record)) {
                  if (stryMutAct_9fa48("3443")) {
                    {}
                  } else {
                    stryCov_9fa48("3443");
                    music.setBlocked(stryMutAct_9fa48("3445") ? "" : (stryCov_9fa48("3445"), 'reference'), stryMutAct_9fa48("3446") ? false : (stryCov_9fa48("3446"), true));
                    if (stryMutAct_9fa48("3447")) {
                      ;
                    } else {
                      stryCov_9fa48("3447");
                      stopDemo();
                    }
                    stryMutAct_9fa48("3448") ? audio.current.setLevel(false, volume) : (stryCov_9fa48("3448"), audio.current?.setLevel(stryMutAct_9fa48("3449") ? true : (stryCov_9fa48("3449"), false), volume));
                    setEnabled(stryMutAct_9fa48("3451") ? true : (stryCov_9fa48("3451"), false));
                  }
                }
                if (stryMutAct_9fa48("3452")) {
                  ;
                } else {
                  stryCov_9fa48("3452");
                  setReference(record);
                }
              }
            }} />
                </>)}
          </MobileWorkbench>
        </div>}
      <output className="sr-only" aria-live="polite">
        {notice}
      </output>
      {stryMutAct_9fa48("3455") ? notice || <div className="toast">
          {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss notification">
            <X size={15} />
          </button>
        </div> : stryMutAct_9fa48("3454") ? false : stryMutAct_9fa48("3453") ? true : (stryCov_9fa48("3453", "3454", "3455"), notice && <div className="toast">
          {notice}
          <button onClick={stryMutAct_9fa48("3456") ? () => undefined : (stryCov_9fa48("3456"), () => setNotice(stryMutAct_9fa48("3457") ? "Stryker was here!" : (stryCov_9fa48("3457"), '')))} aria-label="Dismiss notification">
            <X size={15} />
          </button>
        </div>)}
      {stryMutAct_9fa48("3460") ? screen === 'discover' || <section className="discover-page">
          <div className="discover-heading">
            <div>
              <div className="eyebrow">KNOW WHAT GOES INTO IT</div>
              <h1>Find your next favorite.</h1>
              <p>Builds, makers, and the parts behind them.</p>
            </div>
            <button className="button" onClick={() => setModal('import')}>
              <Plus size={16} /> Import a website
            </button>
          </div>
          <CommunityDiscovery />
          <TechnologyGuide />
          <PremiumKeyboards />
          <ResearchLibrary onReviewSwitch={reviewSwitch} />
        </section> : stryMutAct_9fa48("3459") ? false : stryMutAct_9fa48("3458") ? true : (stryCov_9fa48("3458", "3459", "3460"), (stryMutAct_9fa48("3462") ? screen !== 'discover' : stryMutAct_9fa48("3461") ? true : (stryCov_9fa48("3461", "3462"), screen === (stryMutAct_9fa48("3463") ? "" : (stryCov_9fa48("3463"), 'discover')))) && <section className="discover-page">
          <div className="discover-heading">
            <div>
              <div className="eyebrow">KNOW WHAT GOES INTO IT</div>
              <h1>Find your next favorite.</h1>
              <p>Builds, makers, and the parts behind them.</p>
            </div>
            <button className="button" onClick={stryMutAct_9fa48("3464") ? () => undefined : (stryCov_9fa48("3464"), () => setModal(stryMutAct_9fa48("3465") ? "" : (stryCov_9fa48("3465"), 'import')))}>
              <Plus size={16} /> Import a website
            </button>
          </div>
          <CommunityDiscovery />
          <TechnologyGuide />
          <PremiumKeyboards />
          <ResearchLibrary onReviewSwitch={reviewSwitch} />
        </section>)}
      {stryMutAct_9fa48("3468") ? landing || <footer className="landing-footer">
          <span>DREAM / EXPERIMENT / BUILD / REPEAT</span>
          <span>Same keys. A different story.</span>
        </footer> : stryMutAct_9fa48("3467") ? false : stryMutAct_9fa48("3466") ? true : (stryCov_9fa48("3466", "3467", "3468"), landing && <footer className="landing-footer">
          <span>DREAM / EXPERIMENT / BUILD / REPEAT</span>
          <span>Same keys. A different story.</span>
        </footer>)}
      <dialog ref={dialog} className={(stryMutAct_9fa48("3469") ? "" : (stryCov_9fa48("3469"), 'modal ')) + ((stryMutAct_9fa48("3472") ? modal !== 'research' : stryMutAct_9fa48("3471") ? false : stryMutAct_9fa48("3470") ? true : (stryCov_9fa48("3470", "3471", "3472"), modal === (stryMutAct_9fa48("3473") ? "" : (stryCov_9fa48("3473"), 'research')))) ? stryMutAct_9fa48("3474") ? "" : (stryCov_9fa48("3474"), 'research-modal') : stryMutAct_9fa48("3475") ? "Stryker was here!" : (stryCov_9fa48("3475"), ''))} aria-label={importing ? stryMutAct_9fa48("3476") ? "" : (stryCov_9fa48("3476"), 'Import products') : (stryMutAct_9fa48("3479") ? modal !== 'share' : stryMutAct_9fa48("3478") ? false : stryMutAct_9fa48("3477") ? true : (stryCov_9fa48("3477", "3478", "3479"), modal === (stryMutAct_9fa48("3480") ? "" : (stryCov_9fa48("3480"), 'share')))) ? stryMutAct_9fa48("3481") ? "" : (stryCov_9fa48("3481"), 'Share build') : (stryMutAct_9fa48("3484") ? modal !== 'search' : stryMutAct_9fa48("3483") ? false : stryMutAct_9fa48("3482") ? true : (stryCov_9fa48("3482", "3483", "3484"), modal === (stryMutAct_9fa48("3485") ? "" : (stryCov_9fa48("3485"), 'search')))) ? stryMutAct_9fa48("3486") ? "" : (stryCov_9fa48("3486"), 'Search parts and studio') : stryMutAct_9fa48("3487") ? "" : (stryCov_9fa48("3487"), 'Research library')} onKeyDown={event => {
        if (stryMutAct_9fa48("3488")) {
          {}
        } else {
          stryCov_9fa48("3488");
          if (stryMutAct_9fa48("3491") ? modal === 'search' || event.key === 'Escape' : stryMutAct_9fa48("3490") ? false : stryMutAct_9fa48("3489") ? true : (stryCov_9fa48("3489", "3490", "3491"), (stryMutAct_9fa48("3493") ? modal !== 'search' : stryMutAct_9fa48("3492") ? true : (stryCov_9fa48("3492", "3493"), modal === (stryMutAct_9fa48("3494") ? "" : (stryCov_9fa48("3494"), 'search')))) && (stryMutAct_9fa48("3496") ? event.key !== 'Escape' : stryMutAct_9fa48("3495") ? true : (stryCov_9fa48("3495", "3496"), event.key === (stryMutAct_9fa48("3497") ? "" : (stryCov_9fa48("3497"), 'Escape')))))) {
            if (stryMutAct_9fa48("3498")) {
              {}
            } else {
              stryCov_9fa48("3498");
              if (stryMutAct_9fa48("3499")) {
                ;
              } else {
                stryCov_9fa48("3499");
                event.preventDefault();
              }
              if (stryMutAct_9fa48("3500")) {
                ;
              } else {
                stryCov_9fa48("3500");
                event.stopPropagation();
              }
              if (stryMutAct_9fa48("3501")) {
                ;
              } else {
                stryCov_9fa48("3501");
                setModal(null);
              }
            }
          }
        }
      }} onCancel={event => {
        if (stryMutAct_9fa48("3502")) {
          {}
        } else {
          stryCov_9fa48("3502");
          if (stryMutAct_9fa48("3505") ? modal !== 'search' : stryMutAct_9fa48("3504") ? false : stryMutAct_9fa48("3503") ? true : (stryCov_9fa48("3503", "3504", "3505"), modal === (stryMutAct_9fa48("3506") ? "" : (stryCov_9fa48("3506"), 'search')))) if (stryMutAct_9fa48("3507")) {
            ;
          } else {
            stryCov_9fa48("3507");
            event.preventDefault();
          }
          if (stryMutAct_9fa48("3508")) {
            ;
          } else {
            stryCov_9fa48("3508");
            setModal(null);
          }
        }
      }}>
        <button className="modal-close" aria-label="Close dialog" onClick={stryMutAct_9fa48("3509") ? () => undefined : (stryCov_9fa48("3509"), () => setModal(null))}>
          <X size={20} />
        </button>
        {stryMutAct_9fa48("3512") ? modal === 'search' || <StudioSearch parts={parts} accessories={resolveAccessoryProducts(build.customAccessories)} canAddAccessory={build.accessories.length < 100} onNavigate={destination => {
          setFocusAt(null);
          setModal(null);
          if (destination === 'parts') setTab('parts');else if (destination === 'build') setTab('design');else window.location.hash = destination;
        }} onPart={part => {
          setFocusAt(null);
          edit({
            selection: {
              ...selection,
              [part.category]: part.id
            }
          });
          setModal(null);
          setTab('parts');
          setNotice(`${part.name} selected. Check the fit notes in Components.`);
        }} onAccessory={part => {
          setFocusAt(null);
          edit({
            accessories: [...build.accessories, newAccessorySelection(part.id, resolveAccessoryProducts(build.customAccessories))]
          });
          setModal(null);
          setTab('parts');
          setNotice(`${part.name} added. Choose its placement in Accessories & artisan caps.`);
          requestAnimationFrame(() => {
            const plan = document.querySelector<HTMLDetailsElement>('details.build-accessories');
            if (plan) {
              plan.open = true;
              plan.scrollIntoView({
                block: 'nearest'
              });
              plan.querySelector('summary')?.focus();
            }
          });
        }} /> : stryMutAct_9fa48("3511") ? false : stryMutAct_9fa48("3510") ? true : (stryCov_9fa48("3510", "3511", "3512"), (stryMutAct_9fa48("3514") ? modal !== 'search' : stryMutAct_9fa48("3513") ? true : (stryCov_9fa48("3513", "3514"), modal === (stryMutAct_9fa48("3515") ? "" : (stryCov_9fa48("3515"), 'search')))) && <StudioSearch parts={parts} accessories={resolveAccessoryProducts(build.customAccessories)} canAddAccessory={stryMutAct_9fa48("3519") ? build.accessories.length >= 100 : stryMutAct_9fa48("3518") ? build.accessories.length <= 100 : stryMutAct_9fa48("3517") ? false : stryMutAct_9fa48("3516") ? true : (stryCov_9fa48("3516", "3517", "3518", "3519"), build.accessories.length < 100)} onNavigate={destination => {
          if (stryMutAct_9fa48("3520")) {
            {}
          } else {
            stryCov_9fa48("3520");
            if (stryMutAct_9fa48("3521")) {
              ;
            } else {
              stryCov_9fa48("3521");
              setFocusAt(null);
            }
            if (stryMutAct_9fa48("3522")) {
              ;
            } else {
              stryCov_9fa48("3522");
              setModal(null);
            }
            if (stryMutAct_9fa48("3525") ? destination !== 'parts' : stryMutAct_9fa48("3524") ? false : stryMutAct_9fa48("3523") ? true : (stryCov_9fa48("3523", "3524", "3525"), destination === (stryMutAct_9fa48("3526") ? "" : (stryCov_9fa48("3526"), 'parts')))) setTab(stryMutAct_9fa48("3528") ? "" : (stryCov_9fa48("3528"), 'parts'));else if (stryMutAct_9fa48("3531") ? destination !== 'build' : stryMutAct_9fa48("3530") ? false : stryMutAct_9fa48("3529") ? true : (stryCov_9fa48("3529", "3530", "3531"), destination === (stryMutAct_9fa48("3532") ? "" : (stryCov_9fa48("3532"), 'build')))) setTab(stryMutAct_9fa48("3534") ? "" : (stryCov_9fa48("3534"), 'design'));else window.location.hash = destination;
          }
        }} onPart={part => {
          if (stryMutAct_9fa48("3535")) {
            {}
          } else {
            stryCov_9fa48("3535");
            if (stryMutAct_9fa48("3536")) {
              ;
            } else {
              stryCov_9fa48("3536");
              setFocusAt(null);
            }
            edit(stryMutAct_9fa48("3538") ? {} : (stryCov_9fa48("3538"), {
              selection: stryMutAct_9fa48("3539") ? {} : (stryCov_9fa48("3539"), {
                ...selection,
                [part.category]: part.id
              })
            }));
            if (stryMutAct_9fa48("3540")) {
              ;
            } else {
              stryCov_9fa48("3540");
              setModal(null);
            }
            setTab(stryMutAct_9fa48("3542") ? "" : (stryCov_9fa48("3542"), 'parts'));
            setNotice(stryMutAct_9fa48("3544") ? `` : (stryCov_9fa48("3544"), `${part.name} selected. Check the fit notes in Components.`));
          }
        }} onAccessory={part => {
          if (stryMutAct_9fa48("3545")) {
            {}
          } else {
            stryCov_9fa48("3545");
            if (stryMutAct_9fa48("3546")) {
              ;
            } else {
              stryCov_9fa48("3546");
              setFocusAt(null);
            }
            edit(stryMutAct_9fa48("3548") ? {} : (stryCov_9fa48("3548"), {
              accessories: stryMutAct_9fa48("3549") ? [] : (stryCov_9fa48("3549"), [...build.accessories, newAccessorySelection(part.id, resolveAccessoryProducts(build.customAccessories))])
            }));
            if (stryMutAct_9fa48("3550")) {
              ;
            } else {
              stryCov_9fa48("3550");
              setModal(null);
            }
            setTab(stryMutAct_9fa48("3552") ? "" : (stryCov_9fa48("3552"), 'parts'));
            setNotice(stryMutAct_9fa48("3554") ? `` : (stryCov_9fa48("3554"), `${part.name} added. Choose its placement in Accessories & artisan caps.`));
            if (stryMutAct_9fa48("3555")) {
              ;
            } else {
              stryCov_9fa48("3555");
              requestAnimationFrame(() => {
                if (stryMutAct_9fa48("3556")) {
                  {}
                } else {
                  stryCov_9fa48("3556");
                  const plan = document.querySelector<HTMLDetailsElement>(stryMutAct_9fa48("3557") ? "" : (stryCov_9fa48("3557"), 'details.build-accessories'));
                  if (stryMutAct_9fa48("3559") ? false : stryMutAct_9fa48("3558") ? true : (stryCov_9fa48("3558", "3559"), plan)) {
                    if (stryMutAct_9fa48("3560")) {
                      {}
                    } else {
                      stryCov_9fa48("3560");
                      plan.open = stryMutAct_9fa48("3561") ? false : (stryCov_9fa48("3561"), true);
                      plan.scrollIntoView(stryMutAct_9fa48("3563") ? {} : (stryCov_9fa48("3563"), {
                        block: stryMutAct_9fa48("3564") ? "" : (stryCov_9fa48("3564"), 'nearest')
                      }));
                      stryMutAct_9fa48("3565") ? plan.querySelector('summary').focus() : (stryCov_9fa48("3565"), plan.querySelector(stryMutAct_9fa48("3566") ? "" : (stryCov_9fa48("3566"), 'summary'))?.focus());
                    }
                  }
                }
              });
            }
          }
        }} />)}
        {stryMutAct_9fa48("3569") ? modal === 'share' || <div className="share-content">
            <div className="modal-icon">
              <Share2 size={24} />
            </div>
            <h2>Pass it around.</h2>
            <p className="muted">
              This link opens an independent preview of your design, parts and
              sound preference. Your friend can customize a copy when ready.
            </p>
            <label htmlFor="share-link">Build link</label>
            <input id="share-link" type="url" value={shareUrl} readOnly onFocus={e => e.target.select()} />
            <div className="share-actions">
              <button className="button" onClick={async () => {
              try {
                await navigator.clipboard.writeText(shareUrl);
                setNotice('Build link copied.');
              } catch {
                setNotice('Select the link and copy it with your keyboard or browser menu.');
              }
            }}>
                Copy link <Share2 size={16} />
              </button>
              <button className="button secondary" onClick={exportBuild}>
                <Download size={16} /> Download build
              </button>
            </div>
            <output className="muted recording-count">{notice}</output>
            <p className="muted">
              Anyone with the link can read the included product details. Sound
              starts muted when they open it.
            </p>
          </div> : stryMutAct_9fa48("3568") ? false : stryMutAct_9fa48("3567") ? true : (stryCov_9fa48("3567", "3568", "3569"), (stryMutAct_9fa48("3571") ? modal !== 'share' : stryMutAct_9fa48("3570") ? true : (stryCov_9fa48("3570", "3571"), modal === (stryMutAct_9fa48("3572") ? "" : (stryCov_9fa48("3572"), 'share')))) && <div className="share-content">
            <div className="modal-icon">
              <Share2 size={24} />
            </div>
            <h2>Pass it around.</h2>
            <p className="muted">
              This link opens an independent preview of your design, parts and
              sound preference. Your friend can customize a copy when ready.
            </p>
            <label htmlFor="share-link">Build link</label>
            <input id="share-link" type="url" value={shareUrl} readOnly onFocus={stryMutAct_9fa48("3573") ? () => undefined : (stryCov_9fa48("3573"), e => e.target.select())} />
            <div className="share-actions">
              <button className="button" onClick={async () => {
              if (stryMutAct_9fa48("3574")) {
                {}
              } else {
                stryCov_9fa48("3574");
                try {
                  if (stryMutAct_9fa48("3575")) {
                    {}
                  } else {
                    stryCov_9fa48("3575");
                    await navigator.clipboard.writeText(shareUrl);
                    setNotice(stryMutAct_9fa48("3577") ? "" : (stryCov_9fa48("3577"), 'Build link copied.'));
                  }
                } catch {
                  if (stryMutAct_9fa48("3578")) {
                    {}
                  } else {
                    stryCov_9fa48("3578");
                    setNotice(stryMutAct_9fa48("3580") ? "" : (stryCov_9fa48("3580"), 'Select the link and copy it with your keyboard or browser menu.'));
                  }
                }
              }
            }}>
                Copy link <Share2 size={16} />
              </button>
              <button className="button secondary" onClick={exportBuild}>
                <Download size={16} /> Download build
              </button>
            </div>
            <output className="muted recording-count">{notice}</output>
            <p className="muted">
              Anyone with the link can read the included product details. Sound
              starts muted when they open it.
            </p>
          </div>)}
        {stryMutAct_9fa48("3583") ? importing || <ImportDialog onAdd={addImported} initialUrl={typeof modal === 'object' ? modal?.source : undefined} initialCategory={typeof modal === 'object' ? 'switch' : undefined} /> : stryMutAct_9fa48("3582") ? false : stryMutAct_9fa48("3581") ? true : (stryCov_9fa48("3581", "3582", "3583"), importing && <ImportDialog onAdd={addImported} initialUrl={(stryMutAct_9fa48("3586") ? typeof modal !== 'object' : stryMutAct_9fa48("3585") ? false : stryMutAct_9fa48("3584") ? true : (stryCov_9fa48("3584", "3585", "3586"), typeof modal === (stryMutAct_9fa48("3587") ? "" : (stryCov_9fa48("3587"), 'object')))) ? stryMutAct_9fa48("3588") ? modal.source : (stryCov_9fa48("3588"), modal?.source) : undefined} initialCategory={(stryMutAct_9fa48("3591") ? typeof modal !== 'object' : stryMutAct_9fa48("3590") ? false : stryMutAct_9fa48("3589") ? true : (stryCov_9fa48("3589", "3590", "3591"), typeof modal === (stryMutAct_9fa48("3592") ? "" : (stryCov_9fa48("3592"), 'object')))) ? stryMutAct_9fa48("3593") ? "" : (stryCov_9fa48("3593"), 'switch') : undefined} />)}{stryMutAct_9fa48("3594") ? "" : (stryCov_9fa48("3594"), ' ')}
        {stryMutAct_9fa48("3597") ? modal === 'research' || <ResearchLibrary onReviewSwitch={reviewSwitch} /> : stryMutAct_9fa48("3596") ? false : stryMutAct_9fa48("3595") ? true : (stryCov_9fa48("3595", "3596", "3597"), (stryMutAct_9fa48("3599") ? modal !== 'research' : stryMutAct_9fa48("3598") ? true : (stryCov_9fa48("3598", "3599"), modal === (stryMutAct_9fa48("3600") ? "" : (stryCov_9fa48("3600"), 'research')))) && <ResearchLibrary onReviewSwitch={reviewSwitch} />)}
      </dialog>
    </main>;
  }
}
function ResearchLibrary({
  onReviewSwitch
}: {
  onReviewSwitch: (source: string) => void;
}) {
  if (stryMutAct_9fa48("3601")) {
    {}
  } else {
    stryCov_9fa48("3601");
    return <div>
      <div className="eyebrow">THE REFERENCE LIBRARY</div>
      <h2>Good builds start with evidence.</h2>
      <p className="muted">
        Research reviewed September 5, 2026. This is the foundation for the
        catalog, asset pipeline, and sound library, not an exhaustive keyboard
        database.
      </p>
      <ResearchProducts onReviewSwitch={onReviewSwitch} />
      <div className="deck-entry-links">
        <a className="button secondary" href="#deck/grok-bot">
          Explore Grok Bot <ArrowUpRight size={15} />
        </a>
        <a className="button secondary" href="#deck/codex-micro">
          Explore Codex Micro <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="dataset-summary">
        <div>
          <strong>7,267</strong>
          <span>firmware definitions</span>
        </div>
        <div>
          <strong>9,047</strong>
          <span>QMK layouts</span>
        </div>
        <div>
          <strong>28</strong>
          <span>research sources</span>
        </div>
      </div>
      <p className="muted">
        Definitions include overlapping versions and are not unique retail
        keyboards. The research catalog separates retail products, firmware,
        measurements, and compatibility evidence.
      </p>
      <a className="button secondary" href="https://github.com/kvnloo/keyconf.gen/blob/main/docs/research.md" target="_blank" rel="noreferrer">
        Read the full database &amp; switch research <ArrowUpRight size={15} />
      </a>
      <div className="research-grid">
        {sources.map(stryMutAct_9fa48("3602") ? () => undefined : (stryCov_9fa48("3602"), s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
            <small>{s.by}</small>
            <h3>
              {s.title}
              <ArrowUpRight size={16} />
            </h3>
            <p>{s.text}</p>
          </a>))}
      </div>
      <p className="muted">
        Keyboard models were created for Keyconf in Blender; the desk objects
        are original Three.js geometry. Material colors, silhouettes, and
        synthesized sound are illustrative. Imported listings do not grant
        permission to reproduce their images, CAD, or audio.
      </p>
    </div>;
  }
}
'use client';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import ControlDeckStudio from './control-deck-studio';
import PreviewLabel from './preview-label';
import {
  decodeDeck,
  newDeck,
  type DeckBuild,
  type DeckId,
} from '../lib/control-deck';
import {
  Layers,
  RotateCcw,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Check,
  Volume2,
  VolumeX,
  Download,
  X,
  SlidersHorizontal,
  ChevronRight,
  Play,
  Undo2,
  Redo2,
  Share2,
  Upload,
  Shuffle,
  Maximize2,
  Minimize2,
  Wind,
  Pause,
} from 'lucide-react';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import ImportDialog from './import-dialog';
import TypingTest from './typing-test';
import VolumeDial from './volume-dial';
import { FeaturedGallery, FeaturedInspector } from './featured-gallery';
import { featuredBuilds, customizeFeatured } from '../lib/featured-builds';
import { encodeDeck } from '../lib/control-deck';
import TechnologyGuide from './technology-guide';
import './studio.css';
import SoundReferences, { type SoundReference } from './sound-references';
import type { SamplePreview } from '../lib/audio-preview';
import SampleWaveform from './sample-waveform';
import ComponentsPanel from './components-panel';
import ResearchProducts from './research-products';
import StudioSelect from './studio-select';
import { useBuild } from './use-build';
import {
  palettes,
  caseColors,
  layouts,
  finishes,
  profiles,
  encodeBuild,
  readBuildFile,
  parseCustomParts,
} from '../lib/build';
import { soundPacks } from '../lib/sound-packs';
import { registerStudioTools } from '../lib/webmcp';
import { catalog, categories, checkBuild, type Part } from '../lib/catalog';
import { KeyboardAudio, type SoundSettings } from '../lib/audio';

function subscribeLocation(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}
const currentHash = () => window.location.hash;
const serverHash = () => '';

export default function Home() {
  const [notice, setNotice] = useState('');
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 7000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  const hash = useSyncExternalStore(subscribeLocation, currentHash, serverHash);
  const manager = useBuild(setNotice, {
    shortcutsEnabled: [
      '#studio',
      '#sound',
      '#play',
      '#build-settings',
      '#fit-checks',
    ].includes(hash),
  });
  const [deckSessions, setDeckSessions] = useState(
    new Map<DeckId, DeckBuild>(),
  );
  const rememberDeck = useCallback((build: DeckBuild) => {
    setDeckSessions((previous) =>
      previous.get(build.device) === build
        ? previous
        : new Map(previous).set(build.device, build),
    );
  }, []);
  const deck = useMemo(() => {
    if (hash === '#deck/grok-bot')
      return {
        kind: 'deck',
        build: deckSessions.get('grok-bot') ?? newDeck('grok-bot'),
        restoreLocal: !deckSessions.has('grok-bot'),
      } as const;
    if (hash === '#deck/codex-micro')
      return {
        kind: 'deck',
        build: deckSessions.get('codex-micro') ?? newDeck('codex-micro'),
        restoreLocal: !deckSessions.has('codex-micro'),
      } as const;
    if (hash.startsWith('#deck=')) {
      try {
        return {
          kind: 'deck',
          build: decodeDeck(hash.slice(6)),
          restoreLocal: false,
        } as const;
      } catch (error) {
        return {
          kind: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'The control deck could not be read.',
        } as const;
      }
    }
    return { kind: 'keyboard' } as const;
  }, [hash, deckSessions]);
  if (deck.kind === 'error')
    return (
      <main className="deck-studio">
        <div className="deck-inspector">
          <h1>Deck link unavailable</h1>
          <p role="alert">{deck.message}</p>
          <a href="#studio">Return to your keyboard</a>
        </div>
      </main>
    );
  if (deck.kind === 'deck')
    return (
      <ControlDeckStudio
        key={hash}
        initial={deck.build}
        restoreLocal={deck.restoreLocal}
        onChange={rememberDeck}
      />
    );
  return (
    <KeyboardStudio
      hash={hash}
      manager={manager}
      notice={notice}
      setNotice={setNotice}
    />
  );
}

const sources = [
  {
    title: 'Grok Bot control deck concept',
    by: 'Elvis · X · concept reference',
    url: 'https://x.com/omarsar0/status/2096321091148947887',
    text: 'A speculative control deck with illuminated role keys, a screen, a rotary dial and an exploded assembly. The video is a visual reference and has no audio track.',
  },
  {
    title: 'Codex Micro',
    by: 'OpenAI × Work Louder · product reference',
    url: 'https://openai.com/supply/co-lab/work-louder/',
    text: 'Official reference for the compact control deck, its translucent caps, mechanical switches, rotary encoder, touch sensor and joystick.',
  },
  {
    title: 'The original reference',
    by: 'bluedev · X',
    url: 'https://x.com/blueemi99/status/2096217626334650719',
    text: 'Rounded keycaps, a warm studio scene, and responsive keypresses. The post credits GPT Astra; its implementation stack was not published in the retrieved text.',
  },
  {
    title: 'Taeha Types',
    by: 'Build craft & recording reference',
    url: 'https://www.taehatypes.com/',
    text: 'A reference for the care, presentation, and individuality of custom keyboard builds. Audio is linked for research, not copied into this app.',
  },
  {
    title: 'How keyboard sound is recorded',
    by: 'Kinetic Labs',
    url: 'https://kineticlabs.com/blog/tips-for-recording-a-good-keyboard-typing-sound-test',
    text: 'Mic position, room, desk, and processing affect a recording. A useful comparison records known builds under consistent conditions.',
  },
  {
    title: 'Sample-based sound packs',
    by: 'Mechvibes',
    url: 'https://github.com/hainguyents13/mechvibes/wiki/Config-Versions',
    text: 'Maps keys to recordings. The studio now includes seven attributed recorded presets and a searchable library of original switch-test videos.',
  },
  {
    title: 'Compatibility is more than layout',
    by: 'CannonKeys · Bakeneko build guide',
    url: 'https://docs.cannonkeys.com/bakeneko/',
    text: 'O-ring mounting requires clip-in stabilizers. A shared percentage or stem type does not establish mechanical fit.',
  },
  {
    title: 'A real clearance exception',
    by: 'KBDfans · Tofu60 Redux plate',
    url: 'https://kbdfans.com/products/tofu60-redux-plate',
    text: 'Manufacturer documentation explicitly excludes Durock and Typeplus × YIKB screw-in stabilizers. This exception is encoded in the builder.',
  },
  {
    title: 'Product catalog ingestion',
    by: 'Shopify Storefront API',
    url: 'https://shopify.dev/docs/api/storefront/latest',
    text: 'Public catalog access supports an import preview. Variants, pagination, regional pricing, and storefront access still affect coverage.',
  },
  {
    title: 'Exact layout geometry',
    by: 'QMK · info.json specification',
    url: 'https://docs.qmk.fm/reference_info_json',
    text: 'Named layouts provide per-key positions and sizes. They can describe keycap coverage, but do not prove case or PCB fit.',
  },
];
type Tab = 'design' | 'parts' | 'sound';
type Modal =
  | 'import'
  | 'research'
  | 'share'
  | { kind: 'import'; source: string }
  | null;
function KeyboardStudio({
  hash,
  manager,
  notice,
  setNotice,
}: {
  hash: string;
  manager: ReturnType<typeof useBuild>;
  notice: string;
  setNotice: (notice: string) => void;
}) {
  const screen =
    hash === '' || hash === '#home'
      ? 'home'
      : hash === '#sound'
        ? 'sound'
        : hash === '#play'
          ? 'play'
          : hash === '#discover' || hash === '#research'
            ? 'discover'
            : 'build';
  const landing = screen === 'home';
  useEffect(() => {
    if (
      ![
        '',
        '#home',
        '#studio',
        '#sound',
        '#play',
        '#discover',
        '#research',
      ].includes(hash)
    )
      return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('.config-scroll')?.scrollTo({ top: 0 });
  }, [hash]);
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
    canRedo,
  } = manager;
  const {
    palette,
    caseColor,
    layout,
    finish,
    profile,
    selection,
    customParts: imports,
  } = build;
  const { character, volume, damping } = build.audio;
  const pack = soundPacks.find((p) => p.id === build.audio.source) ?? null;
  const setPalette = (palette: typeof build.palette) => edit({ palette });
  const setLayout = (layout: typeof build.layout) => edit({ layout });
  const [exploded, setExploded] = useState(false);
  const [view, setView] = useState('perspective');
  const [focusAt, setFocusAt] = useState<string | null>(null);
  const returnToTypingLauncher = useRef(false);
  useEffect(() => {
    if (screen !== 'build' || !returnToTypingLauncher.current) return;
    returnToTypingLauncher.current = false;
    document.getElementById('start-typing-test')?.focus();
  }, [screen]);
  const experience =
    focusAt === hash ? 'focus' : screen === 'play' ? 'typing' : 'builder';
  function setExperience(next: 'builder' | 'focus' | 'typing') {
    setFocusAt(next === 'focus' ? hash : null);
    if (next === 'typing') window.location.hash = 'play';
    else if (next === 'builder' && screen === 'play')
      window.location.assign('#studio');
  }
  const focusMode = experience === 'focus';
  useEffect(() => {
    if (!focusMode) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFocusAt(null);
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [focusMode]);
  const [buildTab, setActiveTab] = useState<'design' | 'parts'>('parts');
  const tab: Tab = screen === 'sound' ? 'sound' : buildTab;
  const [reference, setReference] = useState<SoundReference | null>(null);
  function setTab(value: Tab) {
    setReference(null);
    document.querySelector('.config-scroll')?.scrollTo({ top: 0 });
    if (value === 'sound') window.location.assign('#sound');
    else {
      setActiveTab(value);
      window.location.assign('#studio');
    }
  }
  const [modal, setModal] = useState<Modal>(null);
  const importing =
    modal === 'import' || (modal !== null && typeof modal === 'object');
  const reviewSwitch = (source: string) => setModal({ kind: 'import', source });
  const [enabled, setEnabled] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const buildFile = useRef<HTMLInputElement>(null);
  const [loaded, setLoaded] = useState<{
    id: string;
    attempt: number;
    state: 'ready' | 'error';
    preview: SamplePreview | null;
  } | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const currentRecording =
    pack && loaded?.id === pack.id && loaded.attempt === loadAttempt
      ? loaded
      : null;
  const sampleState = pack ? (currentRecording?.state ?? 'loading') : 'ready';
  const [lastKey, setLastKey] = useState('');
  const [demo, setDemo] = useState(false);
  const [roomMotion, setRoomMotion] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<KeyboardAudio | null>(null);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const audioAction = useRef({ revision: 0 });
  const visibleBuild =
    landing && featured.kind === 'keyboard' ? featured.build : build;
  const playbackEnabled = enabled && !landing && screen !== 'discover';
  const options = useMemo<SceneOptions>(() => {
    if (landing && featured.kind === 'control-deck') {
      const { colors, device, lighting, dial } = featured.build;
      return {
        alpha: colors.keys,
        mod: colors.commands,
        accent: colors.keys,
        space: colors.wide,
        caseColor: colors.case,
        finish: 'Aluminum',
        profile: 'Sculpted',
        device: { kind: 'control-deck', model: device, lighting, dial },
        exploded,
        view,
        environment: 'desk',
        roomMotion,
      };
    }
    return {
      ...visibleBuild.palette,
      caseColor: visibleBuild.caseColor,
      device: { kind: 'keyboard', layout: visibleBuild.layout },
      exploded: experience === 'typing' ? false : exploded,
      view,
      finish: visibleBuild.finish,
      profile: visibleBuild.profile,
      environment:
        experience === 'typing' ? 'typing' : landing ? 'desk' : 'studio',
      roomMotion,
    };
  }, [visibleBuild, landing, featured, exploded, view, experience, roomMotion]);
  function customizePreview() {
    if (featured.kind === 'control-deck') {
      window.location.hash = 'deck=' + encodeDeck(featured.build);
      return;
    }
    edit(customizeFeatured(featured, build));
    setActiveTab('parts');
    setExploded(false);
    setView('perspective');
    window.location.assign('#studio');
    setNotice(featured.name + ' opened. Undo returns to your previous build.');
  }
  const parts = useMemo(() => [...catalog, ...imports], [imports]);
  const checks = useMemo(
    () => checkBuild(selection, parts, layout),
    [selection, parts, layout],
  );
  const blocked = checks.filter((c) => c.status === 'incompatible').length;
  const sound = useMemo<SoundSettings>(
    () => ({
      enabled: playbackEnabled,
      character,
      volume,
      damping,
      material: finish,
      source: pack
        ? { kind: 'recorded', id: pack.id }
        : { kind: 'synthesized' },
    }),
    [playbackEnabled, character, volume, damping, finish, pack],
  );
  const soundRef = useRef(sound);
  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);
  const buildRef = useRef({ options, selection, checks, sound, sampleState });
  useEffect(() => {
    buildRef.current = { options, selection, checks, sound, sampleState };
  }, [options, selection, checks, sound, sampleState]);
  useEffect(
    () =>
      registerStudioTools(
        () => buildRef.current,
        (input) => {
          const palette = palettes.find((p) => p.name === input.palette);
          if (palette) {
            edit({ layout: input.layout, palette });
            window.location.assign('#studio');
          }
        },
      ),
    [edit],
  );
  useEffect(() => {
    const engine = new KeyboardAudio();
    audio.current = engine;
    const pendingTimers = timers.current;
    const actionClock = audioAction.current;
    return () => {
      actionClock.revision++;
      engine.close();
      pendingTimers.forEach(clearTimeout);
      pendingTimers.clear();
    };
  }, []);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const dismissBackdrop = (event: MouseEvent) => {
      if (event.target === element) setModal(null);
    };
    element.addEventListener('click', dismissBackdrop);
    if (modal) {
      element.showModal();
      if (typeof modal === 'object')
        element
          .querySelector<HTMLInputElement>('input[name="store-url"]')
          ?.focus();
    } else element.close();
    return () => element.removeEventListener('click', dismissBackdrop);
  }, [modal]);
  useEffect(() => {
    let cancelled = false;
    const engine = audio.current;
    const pendingTimers = timers.current;
    const actionClock = audioAction.current;
    const loading = pack ? engine?.prepare(pack) : Promise.resolve();
    void loading
      ?.then(() => {
        if (!cancelled) {
          setDemo(false);
          setLoaded({
            id: pack?.id ?? 'synthesized',
            attempt: loadAttempt,
            state: 'ready',
            preview: pack ? (engine?.preview(pack) ?? null) : null,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDemo(false);
          setLoaded({
            id: pack?.id ?? 'synthesized',
            attempt: loadAttempt,
            state: 'error',
            preview: null,
          });
        }
      });
    return () => {
      cancelled = true;
      actionClock.revision++;
      engine?.stop();
      pendingTimers.forEach(clearTimeout);
      pendingTimers.clear();
      window.dispatchEvent(
        new CustomEvent('keyconf-demo', { detail: { reset: true } }),
      );
    };
  }, [pack, loadAttempt]);
  useEffect(() => {
    audio.current?.setLevel(playbackEnabled, volume);
  }, [playbackEnabled, volume]);

  const stopDemo = useCallback(() => {
    audioAction.current.revision++;
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    audio.current?.stop();
    setDemo(false);
    window.dispatchEvent(
      new CustomEvent('keyconf-demo', { detail: { reset: true } }),
    );
  }, []);
  useEffect(() => {
    const leave = () => {
      stopDemo();
      setReference(null);
    };
    window.addEventListener('hashchange', leave);
    return () => window.removeEventListener('hashchange', leave);
  }, [stopDemo]);
  async function enableSound(action = audioAction.current.revision) {
    setReference(null);
    try {
      await audio.current?.unlock();
      if (action !== audioAction.current.revision) return false;
      setEnabled(true);
      audio.current?.setLevel(true, volume);
      return true;
    } catch {
      setNotice('Audio could not start. Try enabling sound again.');
      return false;
    }
  }
  function press(code: string) {
    setLastKey(code.replace('Key', '').replace('Digit', ''));
    audio.current?.play(code, soundRef.current);
  }
  function release(code: string) {
    audio.current?.play(code, soundRef.current, 'up');
  }
  async function playSequence(phrase: string[]) {
    stopDemo();
    if (!(await enableSound())) return;
    setDemo(true);
    const start = (audio.current?.now() ?? 0) + 0.04;
    phrase.forEach((code, i) => {
      const settings = { ...soundRef.current, enabled: true };
      audio.current?.play(code, settings, 'down', start + i * 0.13);
      audio.current?.play(code, settings, 'up', start + i * 0.13 + 0.08);
      timers.current.add(
        setTimeout(
          () => {
            setLastKey(code.replace('Key', '').replace('Digit', ''));
            window.dispatchEvent(
              new CustomEvent('keyconf-demo', { detail: { code, down: true } }),
            );
          },
          40 + i * 130,
        ),
      );
      timers.current.add(
        setTimeout(
          () => {
            window.dispatchEvent(
              new CustomEvent('keyconf-demo', {
                detail: { code, down: false },
              }),
            );
          },
          120 + i * 130,
        ),
      );
    });
    timers.current.add(
      setTimeout(
        () => {
          setDemo(false);
          timers.current.clear();
        },
        40 + phrase.length * 130,
      ),
    );
  }
  function addParts(incoming: Part[]) {
    const merged = Array.from(
      new Map([...imports, ...incoming].map((p) => [p.id, p])).values(),
    );
    edit({ customParts: parseCustomParts(merged) });
    setNotice(incoming.length + ' parts added to this build.');
  }
  async function shareBuild() {
    try {
      const url = new URL(window.location.href);
      url.hash = 'build=' + encodeBuild(build);
      setShareUrl(url.href);
      setModal('share');
      try {
        await navigator.clipboard.writeText(url.href);
        setNotice(
          'Build link copied. Anyone with the link can open this design.',
        );
      } catch {
        setNotice('Select and copy the build link below.');
      }
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : 'The build link could not be created. Download the build instead.',
      );
    }
  }
  async function openBuild(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 1_000_000)
        throw new Error('Choose a Keyconf build file under 1 MB.');
      const restored = readBuildFile(await file.text());
      stopDemo();
      edit(restored);
      setNotice('Build opened. Undo returns to your previous design.');
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : 'The build file could not be opened.',
      );
    }
  }

  function exportBuild() {
    const data = {
      version: 1,
      build,
      visualStudy: options,
      components: categories.map((c) =>
        parts.find((p) => p.id === selection[c]),
      ),
      compatibility: checks,
      sound: {
        ...sound,
        accuracy: pack
          ? 'recorded switch reference; full build match unverified'
          : 'synthesized approximation',
        recording: pack,
      },
      exportedAt: new Date().toISOString(),
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyconf-build.json';
    a.click();
    URL.revokeObjectURL(url);
    setNotice('Build exported with sources and compatibility notes.');
  }
  return (
    <main
      className={
        'studio-shell screen-' +
        screen +
        (experience === 'builder' ? '' : ' ' + experience + '-mode')
      }
    >
      <a className="skip-link" href="#build-settings">
        Skip to build settings
      </a>
      <header className="header studio-header">
        <a className="brand" href="#home">
          keyconf <PreviewLabel fallback="beta" />
        </a>
        <nav aria-label="Studio pages">
          <a
            href="#studio"
            aria-current={screen === 'build' || landing ? 'page' : undefined}
          >
            Build
          </a>
          <a
            href="#sound"
            aria-current={screen === 'sound' ? 'page' : undefined}
          >
            Sound
          </a>
          <a href="#play" aria-current={screen === 'play' ? 'page' : undefined}>
            Play
          </a>
          <a
            href="#discover"
            aria-current={screen === 'discover' ? 'page' : undefined}
          >
            Discover
          </a>
        </nav>
        <div className="header-utilities">
          <a className="header-resume" href="#studio">
            Resume build <ArrowUpRight size={13} />
          </a>
          <button
            className="button secondary"
            onClick={() => setModal('import')}
          >
            <Plus size={16} /> Import a website
          </button>
        </div>
      </header>
      <div className="build-bar">
        <label className="build-name">
          <span className="sr-only">Build name</span>
          <input
            value={build.name}
            maxLength={80}
            onChange={(e) => edit({ name: e.target.value }, 'name')}
            onBlur={(e) => {
              if (!e.target.value.trim()) edit({ name: 'Untitled build' });
              commit();
            }}
          />
        </label>
        <output className="save-state">
          {saveState === 'saved'
            ? 'Saved on this device'
            : saveState === 'saving'
              ? 'Saving…'
              : saveState === 'unavailable'
                ? 'Session only. Download to keep.'
                : 'Opening build…'}
        </output>
        <div className="build-actions">
          <button
            className="icon-button"
            aria-label="Undo change"
            title="Undo (Ctrl/⌘ Z)"
            disabled={!ready || !canUndo}
            onClick={undo}
          >
            <Undo2 size={17} />
          </button>
          <button
            className="icon-button"
            aria-label="Redo change"
            title="Redo (Ctrl/⌘ Shift Z)"
            disabled={!ready || !canRedo}
            onClick={redo}
          >
            <Redo2 size={17} />
          </button>
          <button
            className="icon-button"
            aria-label="Open build file"
            title="Open build file"
            onClick={() => buildFile.current?.click()}
          >
            <Upload size={17} />
          </button>
          <button
            className="button secondary compact"
            disabled={!ready}
            onClick={shareBuild}
          >
            <Share2 size={15} /> Share build
          </button>
          <input
            ref={buildFile}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              void openBuild(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>
      </div>
      <div className="workspace">
        <section className="stage">
          <div className="stage-heading">
            <div className="eyebrow">
              {landing
                ? 'KEYBOARDS FOR GREATER IDEAS'
                : screen === 'sound'
                  ? 'THE SOUND LAB'
                  : 'YOUR WORKBENCH'}{' '}
              {!landing && <span>{layout}%</span>}
            </div>
            <h1>
              {landing ? (
                <>
                  Make it
                  <br />
                  yours.
                </>
              ) : screen === 'sound' ? (
                'Hear the difference.'
              ) : (
                'Make it yours.'
              )}
            </h1>
            <p>
              {landing ? (
                <>
                  Design. Experiment. Hear. Build.
                  <br />A better keyboard starts here.
                </>
              ) : screen === 'sound' ? (
                'Listen closely. Find your feel.'
              ) : (
                'Every part. Every detail. Your call.'
              )}
            </p>
            {landing ? (
              <div className="landing-actions">
                <button className="button" onClick={customizePreview}>
                  Customize {featured.name} <ArrowRight size={18} />
                </button>
                <a href="#studio">
                  Resume {build.name} <ArrowUpRight size={13} />
                </a>
              </div>
            ) : (
              <button
                id="start-typing-test"
                className="button secondary compact typing-launch"
                onClick={async () => {
                  stopDemo();
                  const action = audioAction.current.revision;
                  await enableSound(action);
                  if (action !== audioAction.current.revision) return;
                  setExperience('typing');
                }}
              >
                <Play size={14} /> Start typing test
              </button>
            )}
          </div>
          <div className="study-label">
            <span className="status-dot" /> 3D design study{' '}
            <ArrowUpRight size={13} />
          </div>
          <KeyboardScene options={options} onPress={press} onRelease={release}>
            {experience === 'typing' && (
              <TypingTest
                onPress={press}
                onRelease={release}
                onExit={() => {
                  stopDemo();
                  returnToTypingLauncher.current = true;
                  setExperience('builder');
                }}
              />
            )}
          </KeyboardScene>
          {!landing && (
            <VolumeDial
              value={volume}
              enabled={enabled}
              canEnable={sampleState === 'ready'}
              onChange={(volume) =>
                edit({ audio: { ...build.audio, volume } }, 'volume')
              }
              onCommit={commit}
              onToggle={() => {
                if (enabled) {
                  stopDemo();
                  setEnabled(false);
                } else void enableSound();
              }}
            />
          )}
          <div className="stage-bottom">
            {(landing || experience === 'typing') && (
              <button
                className="room-motion"
                aria-pressed={!roomMotion}
                aria-label={
                  roomMotion ? 'Pause room motion' : 'Resume room motion'
                }
                onClick={() => setRoomMotion(!roomMotion)}
              >
                {roomMotion ? <Wind size={15} /> : <Pause size={15} />}
                <span>{roomMotion ? 'Breeze on' : 'Room paused'}</span>
              </button>
            )}
            <div className="view-controls">
              <button
                onClick={() => setView(view === 'top' ? 'perspective' : 'top')}
              >
                {view === 'top' ? 'Perspective' : 'Top view'}
              </button>
              <button
                aria-pressed={exploded}
                onClick={() => setExploded(!exploded)}
              >
                <Layers size={16} /> Explode
              </button>
              <button
                aria-label="Reset view"
                onClick={() => {
                  setView(view === 'reset' ? 'perspective' : 'reset');
                  setExploded(false);
                }}
              >
                <RotateCcw size={16} />
              </button>
              <button
                aria-pressed={focusMode}
                onClick={() => setExperience(focusMode ? 'builder' : 'focus')}
              >
                {focusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {focusMode
                  ? landing
                    ? 'Back to preview'
                    : 'Back to builder'
                  : 'Focus'}
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
          {screen === 'sound' && !focusMode && (
            <section
              className="sound-audition"
              aria-label="Audition your typing sound"
            >
              <div className="audition-title">
                <span>{pack?.name ?? 'Synthesized study'}</span>
                <small>
                  {pack ? 'Recorded reference' : 'Approximate sound'}
                </small>
              </div>
              <SampleWaveform
                preview={currentRecording?.preview ?? null}
                synthesized={!pack}
                playing={demo}
              />
              <div className="audition-keys">
                <button
                  disabled={sampleState !== 'ready'}
                  onClick={() => void playSequence(['KeyA'])}
                >
                  <kbd>A</kbd> Letter key
                </button>
                <button
                  disabled={sampleState !== 'ready'}
                  onClick={() => void playSequence(['Space'])}
                >
                  <kbd>space</kbd> Spacebar
                </button>
              </div>
              <button
                className="button full"
                disabled={sampleState !== 'ready'}
                onClick={() => {
                  if (demo) stopDemo();
                  else
                    void playSequence([
                      'KeyM',
                      'KeyA',
                      'KeyK',
                      'KeyE',
                      'Space',
                      'KeyI',
                      'KeyT',
                      'Space',
                      'KeyY',
                      'KeyO',
                      'KeyU',
                      'KeyR',
                      'KeyS',
                    ]);
                }}
              >
                {demo ? <VolumeX size={15} /> : <Play size={15} />}
                {demo ? 'Stop playback' : 'Try a typing sequence'}
              </button>
            </section>
          )}
          <div className="stage-caption">
            <span>
              STUDY / {layout} <i>·</i> {palette.name.toUpperCase()}
            </span>
            <span>
              {enabled
                ? pack
                  ? `${pack.name} · recorded reference`
                  : 'Synthesized sound · approximate'
                : 'A space to try things.'}
            </span>
          </div>
        </section>
        {landing && (
          <FeaturedGallery
            selected={featured.id}
            onSelect={(preset) => {
              setFeatured(preset);
              setExploded(false);
              setView('perspective');
            }}
          />
        )}
        {landing && (
          <FeaturedInspector
            featured={featured}
            onCustomize={customizePreview}
          />
        )}
        <aside
          className="config"
          id="build-settings"
          aria-label="Keyboard configuration"
        >
          <div className="config-title">
            <h2>Your build</h2>
            <span className="pill">Live preview</span>
          </div>
          <div
            className="config-tabs"
            role="tablist"
            aria-label="Build settings"
          >
            {(['design', 'parts', 'sound'] satisfies Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                id={'tab-' + t}
                aria-controls={'panel-' + t}
                tabIndex={tab === t ? 0 : -1}
                onKeyDown={(event) => {
                  const tabs: Tab[] = ['design', 'parts', 'sound'];
                  const index = tabs.indexOf(t);
                  const next =
                    event.key === 'ArrowRight'
                      ? tabs[(index + 1) % tabs.length]
                      : event.key === 'ArrowLeft'
                        ? tabs[(index + tabs.length - 1) % tabs.length]
                        : event.key === 'Home'
                          ? tabs[0]
                          : event.key === 'End'
                            ? tabs[tabs.length - 1]
                            : undefined;
                  if (next) {
                    event.preventDefault();
                    setTab(next);
                    document.getElementById('tab-' + next)?.focus();
                  }
                }}
                aria-selected={tab === t}
                onClick={() => setTab(t)}
              >
                {t === 'design'
                  ? 'Design'
                  : t === 'parts'
                    ? 'Components'
                    : 'Sound'}
              </button>
            ))}
          </div>
          <div
            className="config-scroll"
            role="tabpanel"
            id={'panel-' + tab}
            aria-labelledby={'tab-' + tab}
            tabIndex={0}
          >
            {tab === 'design' && (
              <>
                <section>
                  <div className="section-label">
                    <span>01</span>
                    <h3>Form & foundation</h3>
                  </div>
                  <fieldset className="control-group">
                    <legend>Layout</legend>
                    <div className="segmented">
                      {layouts.map((x) => (
                        <button
                          key={x}
                          aria-pressed={x === layout}
                          className={x === layout ? 'selected' : ''}
                          onClick={() => setLayout(x)}
                        >
                          {x}%
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label htmlFor="finish">Case material</label>
                  <StudioSelect
                    id="finish"
                    value={finish}
                    onValueChange={(value) => {
                      const finish = finishes.find((x) => x === value);
                      if (finish) edit({ finish });
                    }}
                    options={finishes.map((x) => ({ value: x, label: x }))}
                  />
                  <fieldset className="control-group">
                    <legend>
                      Case finish{' '}
                      <span>
                        {caseColors.find((c) => c.color === caseColor)?.name ||
                          'Custom'}
                      </span>
                    </legend>
                    <div className="swatches">
                      {caseColors.map((x) => (
                        <button
                          key={x.color}
                          style={{ background: x.color }}
                          aria-label={x.name + ' case'}
                          aria-pressed={caseColor === x.color}
                          onClick={() => edit({ caseColor: x.color })}
                        >
                          {caseColor === x.color && <Check size={15} />}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </section>
                <section>
                  <div className="section-label">
                    <span>02</span>
                    <h3>Color & character</h3>
                  </div>
                  <div className="palette-list">
                    {palettes.map((p) => (
                      <button
                        key={p.name}
                        aria-pressed={palette.name === p.name}
                        className={
                          palette.name === p.name
                            ? 'palette selected'
                            : 'palette'
                        }
                        onClick={() => setPalette(p)}
                      >
                        <span className="palette-colors">
                          {[p.alpha, p.mod, p.accent, p.space].map((c, i) => (
                            <i key={i} style={{ background: c }} />
                          ))}
                        </span>
                        {p.name}
                        {palette.name === p.name && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                  <details className="custom-colors">
                    <summary>
                      <SlidersHorizontal size={14} /> Make it your own
                    </summary>
                    <div className="color-inputs">
                      {(
                        [
                          'alpha',
                          'mod',
                          'accent',
                          'space',
                        ] satisfies (keyof typeof palette)[]
                      ).map((zone) => (
                        <label key={zone}>
                          {zone}
                          <input
                            type="color"
                            aria-label={zone + ' color'}
                            value={palette[zone]}
                            onChange={(e) =>
                              edit(
                                {
                                  palette: {
                                    ...palette,
                                    name: 'Custom',
                                    [zone]: e.target.value,
                                  },
                                },
                                'color-' + zone,
                              )
                            }
                            onBlur={commit}
                          />
                        </label>
                      ))}
                    </div>
                  </details>
                  <button
                    className="text-button"
                    onClick={() => {
                      const choices = palettes.filter(
                        (p) => p.name !== palette.name,
                      );
                      const next =
                        choices[Math.floor(Math.random() * choices.length)];
                      edit({
                        palette: next,
                        caseColor:
                          caseColors[
                            Math.floor(Math.random() * caseColors.length)
                          ].color,
                      });
                    }}
                  >
                    <Shuffle size={15} /> Surprise me
                  </button>
                  <label htmlFor="profile">
                    Keycap silhouette <span>Illustrative</span>
                  </label>
                  <StudioSelect
                    id="profile"
                    value={profile}
                    onValueChange={(value) => {
                      const profile = profiles.find((x) => x === value);
                      if (profile) edit({ profile });
                    }}
                    options={profiles.map((p) => ({ value: p, label: p }))}
                  />
                </section>
              </>
            )}
            {tab === 'parts' && (
              <ComponentsPanel
                parts={parts}
                selection={selection}
                checks={checks}
                onSelect={(part) =>
                  edit({
                    selection: { ...selection, [part.category]: part.id },
                  })
                }
                onAssembly={(assembly) => {
                  edit({
                    layout: assembly.layout,
                    finish: assembly.finish,
                    selection: assembly.selection,
                  });
                  setNotice(
                    assembly.name +
                      ' parts selected. Appearance and recording remain your choices.',
                  );
                }}
                onImport={() => setModal('import')}
                onResearch={() => setModal('research')}
              />
            )}
            {tab === 'sound' && (
              <>
                <div className="sound-intro">
                  <span className="pill">
                    {pack
                      ? 'Real recorded samples'
                      : 'Synthesized · approximate'}
                  </span>
                  <h3>Hear the switch.</h3>
                  <p className="muted">
                    Type with a recorded switch, or explore original typing
                    tests below. Each recording reflects the keyboard it was
                    captured on.
                  </p>
                </div>
                <label htmlFor="sound-pack">Typing sound</label>
                <StudioSelect
                  id="sound-pack"
                  value={pack?.id ?? 'synthesized'}
                  onValueChange={(value) => {
                    stopDemo();
                    edit({
                      audio: { ...build.audio, source: value },
                    });
                  }}
                  options={[
                    ...soundPacks.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })),
                    { value: 'synthesized', label: 'Synthesized sound study' },
                  ]}
                />
                {sampleState === 'loading' && (
                  <output className="muted recording-count">
                    Loading recordings…
                  </output>
                )}
                {sampleState === 'error' && (
                  <p role="alert">
                    Recordings could not load.{' '}
                    <button
                      className="text-button"
                      onClick={() => setLoadAttempt((n) => n + 1)}
                    >
                      Try again
                    </button>
                  </p>
                )}
                <div className="last-key">
                  Last key <kbd>{lastKey || '—'}</kbd>
                </div>
                {!pack && (
                  <>
                    <label htmlFor="character">Switch character</label>
                    <StudioSelect
                      id="character"
                      value={character}
                      onValueChange={(v) => {
                        if (v === 'linear' || v === 'tactile' || v === 'clicky')
                          edit({ audio: { ...build.audio, character: v } });
                      }}
                      options={[
                        { value: 'linear', label: 'Soft linear' },
                        { value: 'tactile', label: 'Crisp tactile' },
                        { value: 'clicky', label: 'Bright clicky' },
                      ]}
                    />
                    <label htmlFor="damping">
                      Damping <span>{Math.round(damping * 100)}%</span>
                    </label>
                    <input
                      id="damping"
                      type="range"
                      min="0"
                      max="1"
                      step=".01"
                      value={damping}
                      onChange={(e) =>
                        edit(
                          {
                            audio: {
                              ...build.audio,
                              damping: Number(e.target.value),
                            },
                          },
                          'damping',
                        )
                      }
                      onPointerUp={commit}
                      onBlur={commit}
                    />
                  </>
                )}
                <label htmlFor="volume">
                  Volume <span>{Math.round(volume * 100)}%</span>
                </label>
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="2"
                  step=".01"
                  value={volume}
                  onChange={(e) =>
                    edit(
                      {
                        audio: {
                          ...build.audio,
                          volume: Number(e.target.value),
                        },
                      },
                      'volume',
                    )
                  }
                  onPointerUp={commit}
                  onBlur={commit}
                />
                <div className="recording-note">
                  <Volume2 size={18} />
                  <h3>{pack ? pack.name : 'A sound study'}</h3>
                  <p>
                    {pack
                      ? 'Original press and release samples. Case, keycap and foam changes do not alter this recording.'
                      : 'An approximate sound character. Choose a recorded switch above to hear real samples.'}
                  </p>
                  {pack && (
                    <>
                      <small>
                        {pack.creator} · {pack.license} · mono MP3, 44.1 kHz
                      </small>
                      <p>
                        {pack.capture} The files retain their original dynamics;
                        the volume control applies gain only.
                      </p>
                      <a
                        className="text-button"
                        href={pack.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Recording source & license <ArrowUpRight size={14} />
                      </a>
                    </>
                  )}
                </div>
                <SoundReferences
                  selected={reference}
                  onSelect={(record) => {
                    if (record) {
                      stopDemo();
                      audio.current?.setLevel(false, volume);
                      setEnabled(false);
                    }
                    setReference(record);
                  }}
                />
              </>
            )}
          </div>
          <div className="config-footer">
            <button className="build-status" onClick={() => setTab('parts')}>
              <span className={blocked ? 'warn-dot' : 'neutral-dot'} />
              {blocked
                ? blocked + ' compatibility conflicts'
                : 'Review component compatibility'}
              <ChevronRight size={15} />
            </button>
            <button className="button full" onClick={exportBuild}>
              <Download size={16} /> Export your build
            </button>
            <small>Visual study · Product dimensions not verified</small>
            <button
              className="text-button research-entry"
              onClick={() => setModal('research')}
            >
              Research & sources <ArrowUpRight size={14} />
            </button>
          </div>
        </aside>
      </div>
      <output className="sr-only" aria-live="polite">
        {notice}
      </output>
      {notice && (
        <div className="toast">
          {notice}
          <button
            onClick={() => setNotice('')}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}
      {screen === 'discover' && (
        <section className="discover-page">
          <div className="discover-heading">
            <div>
              <div className="eyebrow">KNOW WHAT GOES INTO IT</div>
              <h1>Find your next favorite.</h1>
              <p>Parts, possibilities, and the sources behind them.</p>
            </div>
            <button className="button" onClick={() => setModal('import')}>
              <Plus size={16} /> Import a website
            </button>
          </div>
          <TechnologyGuide />
          <ResearchLibrary onReviewSwitch={reviewSwitch} />
        </section>
      )}
      {landing && (
        <footer className="landing-footer">
          <span>DREAM / EXPERIMENT / BUILD / REPEAT</span>
          <span>Same keys. A different story.</span>
        </footer>
      )}
      <dialog
        ref={dialog}
        className={'modal ' + (modal === 'research' ? 'research-modal' : '')}
        aria-label={
          importing
            ? 'Import products'
            : modal === 'share'
              ? 'Share build'
              : 'Research library'
        }
        onCancel={() => setModal(null)}
      >
        <button
          className="modal-close"
          aria-label="Close dialog"
          onClick={() => setModal(null)}
        >
          <X size={20} />
        </button>
        {modal === 'share' && (
          <div className="share-content">
            <div className="modal-icon">
              <Share2 size={24} />
            </div>
            <h2>Pass it around.</h2>
            <p className="muted">
              This link includes your design, selected components and sound
              preference. Your friend can make it their own.
            </p>
            <label htmlFor="share-link">Build link</label>
            <input
              id="share-link"
              type="url"
              value={shareUrl}
              readOnly
              onFocus={(e) => e.target.select()}
            />
            <div className="share-actions">
              <button
                className="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setNotice('Build link copied.');
                  } catch {
                    setNotice(
                      'Select the link and copy it with your keyboard or browser menu.',
                    );
                  }
                }}
              >
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
          </div>
        )}
        {importing && (
          <ImportDialog
            onAdd={addParts}
            initialUrl={typeof modal === 'object' ? modal?.source : undefined}
            initialCategory={typeof modal === 'object' ? 'switch' : undefined}
          />
        )}{' '}
        {modal === 'research' && (
          <ResearchLibrary onReviewSwitch={reviewSwitch} />
        )}
      </dialog>
    </main>
  );
}

function ResearchLibrary({
  onReviewSwitch,
}: {
  onReviewSwitch: (source: string) => void;
}) {
  return (
    <div>
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
      <a
        className="button secondary"
        href="https://github.com/kvnloo/keyconf.gen/blob/main/docs/research.md"
        target="_blank"
        rel="noreferrer"
      >
        Read the full database &amp; switch research <ArrowUpRight size={15} />
      </a>
      <div className="research-grid">
        {sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
            <small>{s.by}</small>
            <h3>
              {s.title}
              <ArrowUpRight size={16} />
            </h3>
            <p>{s.text}</p>
          </a>
        ))}
      </div>
      <p className="muted">
        Keyboard models were created for Keyconf in Blender; the desk objects
        are original Three.js geometry. Material colors, silhouettes, and
        synthesized sound are illustrative. Imported listings do not grant
        permission to reproduce their images, CAD, or audio.
      </p>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Layers,
  RotateCcw,
  ArrowUpRight,
  Keyboard,
  Plus,
  Check,
  Volume2,
  VolumeX,
  Download,
  X,
  SlidersHorizontal,
  CircleAlert,
  ChevronRight,
  Play,
  Undo2,
  Redo2,
  Share2,
  Upload,
  Shuffle,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import ImportDialog from './import-dialog';
import SoundReferences from './sound-references';
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
const sources = [
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
type Modal = 'import' | 'research' | 'share' | null;
export default function Home() {
  const [notice, setNotice] = useState('');
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
  } = useBuild(setNotice);
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
  const [focusMode, setFocusMode] = useState(false);
  useEffect(() => {
    if (!focusMode) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFocusMode(false);
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [focusMode]);
  const [tab, setTab] = useState<Tab>('design');
  const [modal, setModal] = useState<Modal>(null);
  const [enabled, setEnabled] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const buildFile = useRef<HTMLInputElement>(null);
  const [sampleState, setSampleState] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [lastKey, setLastKey] = useState('');
  const [demo, setDemo] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<KeyboardAudio | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioAction = useRef(0);
  const options: SceneOptions = {
    ...palette,
    caseColor,
    layout,
    exploded,
    view,
    finish,
    profile,
  };
  const parts = [...catalog, ...imports];
  const checks = checkBuild(selection, parts, layout);
  const blocked = checks.filter((c) => c.status === 'incompatible').length;
  const sound: SoundSettings = {
    enabled,
    character,
    volume,
    damping,
    material: finish,
    source: pack ? { kind: 'recorded', id: pack.id } : { kind: 'synthesized' },
  };
  const soundRef = useRef(sound);
  soundRef.current = sound;
  const buildRef = useRef({ options, selection, checks, sound, sampleState });
  buildRef.current = { options, selection, checks, sound, sampleState };
  useEffect(
    () =>
      registerStudioTools(
        () => buildRef.current,
        (input) => {
          setLayout(input.layout);
          const p = palettes.find((p) => p.name === input.palette);
          if (p) setPalette(p);
        },
      ),
    [],
  );
  useEffect(() => {
    audio.current = new KeyboardAudio();
    return () => {
      audioAction.current++;
      audio.current?.close();
      timers.current.forEach(clearTimeout);
    };
  }, []);
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  useEffect(() => {
    let cancelled = false;
    if (!pack) {
      setSampleState('ready');
      return;
    }
    setSampleState('loading');
    audio.current
      ?.prepare(pack)
      .then(() => {
        if (!cancelled) setSampleState('ready');
      })
      .catch(() => {
        if (!cancelled) setSampleState('error');
      });
    return () => {
      cancelled = true;
    };
  }, [pack, loadAttempt]);
  useEffect(() => {
    audio.current?.setLevel(enabled, volume);
  }, [enabled, volume]);

  function stopDemo() {
    audioAction.current++;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    audio.current?.stop();
    setDemo(false);
    window.dispatchEvent(
      new CustomEvent('keyconf-demo', { detail: { reset: true } }),
    );
  }
  async function enableSound(action = audioAction.current) {
    try {
      await audio.current?.unlock();
      if (action !== audioAction.current) return false;
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
  async function playDemo() {
    stopDemo();
    if (!(await enableSound())) return;
    setDemo(true);
    const phrase = [
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
    ];
    const start = (audio.current?.now() ?? 0) + 0.04;
    phrase.forEach((code, i) => {
      audio.current?.play(
        code,
        { ...soundRef.current, enabled: true },
        'down',
        start + i * 0.13,
      );
      audio.current?.play(
        code,
        { ...soundRef.current, enabled: true },
        'up',
        start + i * 0.13 + 0.08,
      );
    });
    timers.current = phrase.map((code, i) =>
      setTimeout(
        () => {
          setLastKey(code.replace('Key', ''));
          window.dispatchEvent(
            new CustomEvent('keyconf-demo', { detail: { code, down: true } }),
          );
          timers.current.push(
            setTimeout(
              () =>
                window.dispatchEvent(
                  new CustomEvent('keyconf-demo', {
                    detail: { code, down: false },
                  }),
                ),
              80,
            ),
          );
        },
        40 + i * 130,
      ),
    );
    timers.current.push(
      setTimeout(() => setDemo(false), 40 + phrase.length * 130),
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
    <main className={focusMode ? 'focus-mode' : undefined}>
      <a className="skip-link" href="#build-settings">
        Skip to build settings
      </a>
      <header className="header">
        <a className="brand" href="./">
          <Keyboard size={25} /> keyconf<span>studio</span>
        </a>
        <nav>
          <button
            className={tab === 'design' ? 'nav-active' : ''}
            onClick={() => setTab('design')}
          >
            Builder
          </button>
          <button
            className={tab === 'parts' ? 'nav-active' : ''}
            onClick={() => setTab('parts')}
          >
            Parts library
          </button>
          <button onClick={() => setModal('research')}>
            Research <ArrowUpRight size={12} />
          </button>
        </nav>
        <button className="button secondary" onClick={() => setModal('import')}>
          <Plus size={16} /> Import a website
        </button>
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
        <span className="save-state" role="status">
          {saveState === 'saved'
            ? 'Saved on this device'
            : saveState === 'saving'
              ? 'Saving…'
              : saveState === 'unavailable'
                ? 'Session only. Download to keep.'
                : 'Opening build…'}
        </span>
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
              YOUR WORKBENCH <span>{layout}%</span>
            </div>
            <h1>Make it yours.</h1>
            <p>Choose a color. Press a key. Find your feel.</p>
          </div>
          <div className="study-label">
            <span className="status-dot" /> 3D design study{' '}
            <ArrowUpRight size={13} />
          </div>
          <KeyboardScene
            options={options}
            onPress={press}
            onRelease={release}
          />
          <button
            className={'sound-toggle ' + (enabled ? 'on' : '')}
            aria-label={enabled ? 'Mute keyboard' : 'Enable keyboard sound'}
            disabled={sampleState !== 'ready'}
            onClick={() => {
              if (enabled) {
                stopDemo();
                setEnabled(false);
              } else void enableSound();
            }}
          >
            {enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            <span>{enabled ? 'Sound on' : 'Sound off'}</span>
          </button>
          <div className="stage-bottom">
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
                onClick={() => setFocusMode(!focusMode)}
              >
                {focusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {focusMode ? 'Back to builder' : 'Focus'}
              </button>
            </div>
            <span>Drag to orbit · Scroll to zoom · Type to try</span>
          </div>
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
                  <label>Layout</label>
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
                  <label htmlFor="finish">Case material</label>
                  <select
                    id="finish"
                    value={finish}
                    onChange={(e) => {
                      const finish = finishes.find((x) => x === e.target.value);
                      if (finish) edit({ finish });
                    }}
                  >
                    {finishes.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                  <label>
                    Case finish{' '}
                    <span>
                      {caseColors.find((c) => c.color === caseColor)?.name ||
                        'Custom'}
                    </span>
                  </label>
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
                      const next =
                        palettes[
                          (palettes.indexOf(palette) +
                            1 +
                            Math.floor(Math.random() * (palettes.length - 1))) %
                            palettes.length
                        ];
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
                  <select
                    id="profile"
                    value={profile}
                    onChange={(e) => {
                      const profile = profiles.find(
                        (x) => x === e.target.value,
                      );
                      if (profile) edit({ profile });
                    }}
                  >
                    {profiles.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </section>
              </>
            )}
            {tab === 'parts' && (
              <>
                <div className="part-intro">
                  <h3>Build around real parts.</h3>
                  <p className="muted">
                    Seed references cover two 60% ecosystems. Part selection
                    checks fit; the 3D model remains an illustrative study.
                  </p>
                </div>
                {categories.map((c) => (
                  <div className="part-field" key={c}>
                    <label htmlFor={'part-' + c}>
                      {c === 'pcb' ? 'PCB' : c[0].toUpperCase() + c.slice(1)}
                    </label>
                    <select
                      id={'part-' + c}
                      value={selection[c]}
                      onChange={(e) =>
                        edit({
                          selection: { ...selection, [c]: e.target.value },
                        })
                      }
                    >
                      {parts
                        .filter((p) => p.category === c)
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                    <div className="part-detail">
                      <span>
                        {parts.find((p) => p.id === selection[c])?.detail}
                      </span>
                      <a
                        href={parts.find((p) => p.id === selection[c])?.source}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={'Source for selected ' + c}
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                ))}
                <div className="fit-panel">
                  <h3>
                    {blocked
                      ? blocked +
                        ' fit ' +
                        (blocked === 1 ? 'conflict' : 'conflicts')
                      : 'Compatibility review'}
                  </h3>
                  {checks.map((c) => (
                    <a
                      key={c.title}
                      className={'fit-check ' + c.status}
                      href={c.source || undefined}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.status === 'documented' ? (
                        <Check size={16} />
                      ) : (
                        <CircleAlert size={16} />
                      )}
                      <span>
                        <strong>{c.title}</strong>
                        <small>{c.detail}</small>
                        <em>
                          {c.status === 'documented'
                            ? 'Family documented'
                            : c.status === 'unknown'
                              ? 'Needs review'
                              : 'Incompatible'}
                        </em>
                      </span>
                    </a>
                  ))}
                </div>
                <button
                  className="text-button"
                  onClick={() => setModal('import')}
                >
                  <Plus size={15} /> Add products from a website
                </button>
              </>
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
                <select
                  id="sound-pack"
                  value={pack?.id ?? 'synthesized'}
                  onChange={(event) => {
                    stopDemo();
                    edit({
                      audio: { ...build.audio, source: event.target.value },
                    });
                  }}
                >
                  <optgroup label="Recorded switches">
                    {soundPacks.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                  <option value="synthesized">Synthesized sound study</option>
                </select>
                {sampleState === 'loading' && (
                  <p className="muted" role="status">
                    Loading recordings…
                  </p>
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
                <div className="sound-visual" aria-hidden="true">
                  {Array.from({ length: 39 }, (_, i) => (
                    <i
                      key={i}
                      style={{
                        height:
                          12 +
                          Math.abs(Math.sin(i * 1.7)) * 28 +
                          (i > 10 && i < 28 ? 22 : 0),
                        animationDelay: i * 0.035 + 's',
                      }}
                      className={demo ? 'playing' : ''}
                    />
                  ))}
                </div>
                <button
                  className="button full"
                  disabled={sampleState !== 'ready'}
                  onClick={() => {
                    if (demo) stopDemo();
                    else void playDemo();
                  }}
                >
                  <Play size={15} />
                  {demo ? 'Stop typing sequence' : 'Try a typing sequence'}
                </button>
                <div className="last-key">
                  Last key <kbd>{lastKey || '—'}</kbd>
                </div>
                {!pack && (
                  <>
                    <label htmlFor="character">Switch character</label>
                    <select
                      id="character"
                      value={character}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === 'linear' || v === 'tactile' || v === 'clicky')
                          edit({ audio: { ...build.audio, character: v } });
                      }}
                    >
                      <option value="linear">Soft linear</option>
                      <option value="tactile">Crisp tactile</option>
                      <option value="clicky">Bright clicky</option>
                    </select>
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
                  max="1"
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
                        {pack.creator} · {pack.license} · MP3 source
                      </small>
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
                  nativeEnabled={enabled}
                  onListen={() => {
                    stopDemo();
                    setEnabled(false);
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
      <div className="sr-only" role="status" aria-live="polite">
        {notice}
      </div>
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
      <dialog
        ref={dialog}
        className={'modal ' + (modal === 'research' ? 'research-modal' : '')}
        aria-label={
          modal === 'import'
            ? 'Import products'
            : modal === 'share'
              ? 'Share build'
              : 'Research library'
        }
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal(null);
        }}
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
            <p className="muted" role="status">
              {notice}
            </p>
            <p className="muted">
              Anyone with the link can read the included product details. Sound
              starts muted when they open it.
            </p>
          </div>
        )}
        {modal === 'import' && <ImportDialog onAdd={addParts} />}{' '}
        {modal === 'research' && (
          <div>
            <div className="eyebrow">THE REFERENCE LIBRARY</div>
            <h2>Good builds start with evidence.</h2>
            <p className="muted">
              Research reviewed September 5, 2026. This is the foundation for
              the catalog, asset pipeline, and sound library, not an exhaustive
              keyboard database.
            </p>
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
              keyboards. The research catalog separates retail products,
              firmware, measurements, and compatibility evidence.
            </p>
            <a
              className="button secondary"
              href="https://github.com/kvnloo/keyconf.gen/blob/main/docs/research.md"
              target="_blank"
              rel="noreferrer"
            >
              Read the full database &amp; switch research{' '}
              <ArrowUpRight size={15} />
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
              All 3D assets in this study were generated for Keyconf using
              Blender. Material colors, silhouettes, and synthesized sound are
              illustrative. Imported listings do not grant permission to
              reproduce their images, CAD, or audio.
            </p>
          </div>
        )}
      </dialog>
    </main>
  );
}

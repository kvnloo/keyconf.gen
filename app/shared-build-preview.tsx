'use client';
import AccessoryFitNotes from './accessory-fit-notes';
import { accessoryHost } from '../lib/accessory-hosts.ts';
import { isQ1MaxAssembly } from '../lib/keyboard-variant';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Play,
  RotateCcw,
} from 'lucide-react';
import type { PublicPublication } from '../db/publications';
import type { ProposalPreview } from '../lib/proposal';
import type { Build } from '../lib/build';
import PreviewAdjustments from './preview-adjustments';
import { compareBuilds } from '../lib/build-comparison';
import { catalog, categories, checkBuild } from '../lib/catalog';
import { accessoryCatalog, assessAccessories } from '../lib/build-accessories';
import { KeyboardAudio, type SoundSettings } from '../lib/audio';
import { soundPacks } from '../lib/sound-packs';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import VolumeDial from './volume-dial';
import BuildFeedback from './build-feedback';
import BuildComparison from './build-comparison';
import './shared-build-preview.css';

export default function SharedBuildPreview({
  build: original,
  onCustomize,
  record,
  creatorDetails,
}: {
  build: Build;
  onCustomize: (build: Build) => void;
  record?:
    | { kind: 'publication'; value: PublicPublication }
    | { kind: 'proposal'; value: ProposalPreview };
  creatorDetails?: ReactNode;
}) {
  const frozen = record?.value;
  const [build, setBuild] = useState(original);
  const changed = compareBuilds(original, build).length > 0;
  const snapshot = changed ? undefined : frozen;
  const [exploded, setExploded] = useState(false);
  const [view, setView] = useState('perspective');
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(build.audio.volume);
  const [loaded, setLoaded] = useState<{
    attempt: number;
    source: string;
    state: 'ready' | 'error';
  } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const source = build.audio.source;
  const load =
    loaded?.attempt === attempt && loaded.source === source
      ? loaded.state
      : 'loading';
  const [notice, setNotice] = useState('');
  const audio = useRef<KeyboardAudio | null>(null);
  const revision = useRef({ value: 0 });
  const currentVolume = useRef(volume);
  const pack = soundPacks.find((item) => item.id === build.audio.source);
  const parts = useMemo(
    () => snapshot?.evidence.components ?? [...catalog, ...build.customParts],
    [build.customParts, snapshot],
  );
  const checks = useMemo(
    () =>
      snapshot?.evidence.compatibility ??
      checkBuild(build.selection, parts, build.layout),
    [build, parts, snapshot],
  );
  const accessoryChecks =
    snapshot?.evidence.accessoryCompatibility ??
    assessAccessories(build.accessories, accessoryHost(build));
  const sound: SoundSettings = {
    ...build.audio,
    enabled,
    volume,
    material: build.finish,
    source: pack ? { kind: 'recorded', id: pack.id } : { kind: 'synthesized' },
  };
  const options = useMemo<SceneOptions>(
    () => ({
      ...build.palette,
      caseColor: build.caseColor,
      finish: build.finish,
      profile: build.profile,
      device: {
        kind: 'keyboard',
        layout: build.layout,
        q1Max: isQ1MaxAssembly(build),
      },
      switchId: build.selection.switch,
      accessories: build.accessories,
      exploded,
      view,
      environment: 'studio',
      roomMotion: false,
    }),
    [build, exploded, view],
  );
  useEffect(() => {
    const engine = new KeyboardAudio();
    audio.current = engine;
    const actionClock = revision.current;
    void (pack ? engine.prepare(pack) : Promise.resolve())
      .then(() => {
        if (audio.current === engine)
          setLoaded({ attempt, source, state: 'ready' });
      })
      .catch(() => {
        if (audio.current === engine)
          setLoaded({ attempt, source, state: 'error' });
      });
    return () => {
      actionClock.value++;
      audio.current = null;
      engine.close();
    };
  }, [pack, attempt, source]);
  useEffect(() => {
    currentVolume.current = volume;
    audio.current?.setLevel(enabled, volume);
  }, [enabled, volume]);
  useEffect(() => {
    const hide = () => {
      if (!document.hidden) return;
      revision.current.value++;
      audio.current?.stop();
      audio.current?.setLevel(false, 0);
      setEnabled(false);
    };
    document.addEventListener('visibilitychange', hide);
    return () => document.removeEventListener('visibilitychange', hide);
  }, []);
  async function enable() {
    const action = ++revision.current.value;
    const engine = audio.current;
    if (!engine || load !== 'ready') return false;
    setEnabled(true);
    setNotice('');
    try {
      await engine.unlock();
      if (action !== revision.current.value || engine !== audio.current)
        return false;
      engine.setLevel(true, currentVolume.current);
      return true;
    } catch {
      if (action === revision.current.value) {
        setEnabled(false);
        setNotice('Sound could not start. Try again.');
      }
      return false;
    }
  }
  return (
    <main className="shared-preview">
      <header>
        <a className="brand" href={frozen ? '/#home' : '#home'}>
          keyconf
        </a>
        <a className="preview-back" href={frozen ? '/#studio' : '#studio'}>
          <ArrowLeft size={16} /> My studio
        </a>
      </header>
      <div className="preview-heading">
        <div>
          <span className="preview-eyebrow">
            {record?.kind === 'proposal'
              ? 'PROPOSED KEYBOARD'
              : 'SHARED KEYBOARD'}
          </span>
          <h1>{build.name}</h1>
          <p>
            {frozen
              ? `${changed ? 'Your variation · Original by' : 'By'} ${frozen.author.displayName} · @${frozen.author.handle}`
              : 'A snapshot to explore. Your saved build stays untouched.'}
          </p>
        </div>
        <button
          className="preview-customize"
          onClick={() => {
            try {
              onCustomize(build);
            } catch {
              setNotice(
                'This build is too large for a link. Use Download this variation under Try changes, then open the file in your studio.',
              );
            }
          }}
        >
          Customize a copy <ArrowRight size={17} />
        </button>
      </div>
      <div className="preview-layout">
        <section
          className="preview-scene"
          aria-label="Shared keyboard experience"
        >
          <KeyboardScene
            options={options}
            onPress={(code) => audio.current?.play(code, sound)}
            onRelease={(code) => audio.current?.play(code, sound, 'up')}
          />
          <div className="preview-scene-controls">
            <button
              aria-pressed={exploded}
              onClick={() => setExploded(!exploded)}
            >
              <Layers size={16} /> Explode
            </button>
            <button
              onClick={() => setView(view === 'top' ? 'perspective' : 'top')}
            >
              {view === 'top' ? 'Perspective' : 'Top view'}
            </button>
            <button
              aria-label="Reset preview view"
              onClick={() => {
                setExploded(false);
                setView(view === 'reset' ? 'perspective' : 'reset');
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <span className="preview-scope">
            Illustrative geometry · Product dimensions unverified
          </span>
        </section>
        <aside className="preview-details" aria-label="Shared build details">
          {creatorDetails}
          <PreviewAdjustments
            original={original}
            build={build}
            onChange={(next) => {
              if (next.audio.source !== build.audio.source) {
                revision.current.value++;
                audio.current?.stop();
                setEnabled(false);
                setAttempt((value) => value + 1);
              }
              setBuild(next);
            }}
          />
          <BuildFeedback
            build={build}
            linkMode={
              record?.kind === 'publication' && !changed
                ? 'publication'
                : record
                  ? 'root-preview'
                  : 'preview'
            }
          />
          <BuildComparison build={build} />
          <section className="preview-sound">
            <span className="preview-eyebrow">LISTEN</span>
            <h2>
              {snapshot?.evidence.sound.recording?.name ??
                pack?.name ??
                'Synthesized study'}
            </h2>
            <p>
              {pack
                ? 'Recorded switch reference. Not a recording of this complete build.'
                : 'An approximation, not a measured keyboard sound.'}
            </p>
            <VolumeDial
              value={volume}
              enabled={enabled}
              canEnable={load === 'ready'}
              onChange={setVolume}
              onCommit={() => {}}
              onToggle={() => {
                if (enabled) {
                  revision.current.value++;
                  audio.current?.stop();
                  audio.current?.setLevel(false, 0);
                  setEnabled(false);
                } else void enable();
              }}
            />
            <button
              className="preview-hear"
              disabled={load !== 'ready'}
              onClick={async () => {
                if (!(await enable())) return;
                const engine = audio.current;
                if (!engine) return;
                const time = engine.now() + 0.025;
                engine.play('KeyA', { ...sound, enabled: true }, 'down', time);
                engine.play(
                  'KeyA',
                  { ...sound, enabled: true },
                  'up',
                  time + 0.08,
                );
              }}
            >
              <Play size={16} /> Hear a key
            </button>
            {load === 'loading' && <output>Loading switch recordings…</output>}
            {load === 'error' && (
              <div role="alert">
                <p>The recording could not load.</p>
                <button onClick={() => setAttempt(attempt + 1)}>
                  Retry recording
                </button>
              </div>
            )}
            <output>{notice}</output>
            <p className="preview-tip">
              Enable sound, then type or tap the 3D keys. Listening changes stay
              in this preview.
            </p>
            {pack && (
              <a
                href={snapshot?.evidence.sound.recording?.source ?? pack.source}
                target="_blank"
                rel="noreferrer"
              >
                Recording source & license <ArrowUpRight size={14} />
              </a>
            )}
          </section>
          <section>
            <span className="preview-eyebrow">
              {changed ? 'YOUR VARIATION' : 'THE PARTS'}
            </span>
            <h2>Explore the originals</h2>
            <ul className="preview-parts">
              {categories.map((category) => {
                const part = parts.find(
                  (item) => item.id === build.selection[category],
                );
                return (
                  part && (
                    <li key={category}>
                      <span>{category}</span>
                      <a href={part.source} target="_blank" rel="noreferrer">
                        <span>
                          {part.brand} {part.name}
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    </li>
                  )
                );
              })}
              {build.accessories.map((selection) => {
                const part = (
                  snapshot?.evidence.accessoryReferences ?? accessoryCatalog
                ).find((item) => item.id === selection.productId);
                return (
                  part && (
                    <li key={selection.id}>
                      <span>
                        {part.kind} · {selection.quantity}×
                      </span>
                      <a href={part.source} target="_blank" rel="noreferrer">
                        <span>{part.name}</span>
                        <ArrowUpRight size={15} />
                      </a>
                      <small>
                        Placement:{' '}
                        {selection.location.kind === 'key'
                          ? selection.location.keyId
                          : selection.location.kind === 'embedded'
                            ? selection.location.slotId
                            : selection.location.position}
                        . Fit: {accessoryChecks[selection.id].status}.
                      </small>
                    </li>
                  )
                );
              })}
            </ul>
          </section>
          <details className="preview-fit">
            <summary>
              {changed
                ? 'Compatibility for your changes'
                : 'Compatibility notes'}
            </summary>
            {changed && (
              <p>
                These checks use the current catalog. Reset to see the original
                build’s saved evidence.
              </p>
            )}
            <ul>
              {checks.map((check, index) => (
                <li key={index}>
                  <strong>
                    {check.title} · {check.status}
                  </strong>
                  <p>{check.detail}</p>
                  <a href={check.source} target="_blank" rel="noreferrer">
                    Compatibility source <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
            <AccessoryFitNotes
              selections={build.accessories}
              products={
                snapshot?.evidence.accessoryReferences ?? accessoryCatalog
              }
              checks={accessoryChecks}
            />
            <p>
              Accessory fit and illustrated dimensions still need verification
              with the maker.
            </p>
          </details>
          <p className="preview-tip">
            Visit the makers for current prices and availability.
          </p>
          <p className="preview-tip">
            Customize opens a copy in your studio. Undo returns to your previous
            build.
          </p>
        </aside>
      </div>
    </main>
  );
}

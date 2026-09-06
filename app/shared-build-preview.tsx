'use client';
import { accessoryHost } from '../lib/accessory-hosts.ts';
import { isQ1MaxAssembly } from '../lib/keyboard-variant';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Play,
  RotateCcw,
} from 'lucide-react';
import type { Build } from '../lib/build';
import { catalog, categories, checkBuild } from '../lib/catalog';
import { accessoryCatalog, assessAccessories } from '../lib/build-accessories';
import { KeyboardAudio, type SoundSettings } from '../lib/audio';
import { soundPacks } from '../lib/sound-packs';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import VolumeDial from './volume-dial';
import './shared-build-preview.css';

export default function SharedBuildPreview({
  build,
  onCustomize,
}: {
  build: Build;
  onCustomize: () => void;
}) {
  const [exploded, setExploded] = useState(false);
  const [view, setView] = useState('perspective');
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(build.audio.volume);
  const [loaded, setLoaded] = useState<{
    attempt: number;
    state: 'ready' | 'error';
  } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const load = loaded?.attempt === attempt ? loaded.state : 'loading';
  const [notice, setNotice] = useState('');
  const audio = useRef<KeyboardAudio | null>(null);
  const revision = useRef({ value: 0 });
  const currentVolume = useRef(volume);
  const pack = soundPacks.find((item) => item.id === build.audio.source);
  const parts = useMemo(
    () => [...catalog, ...build.customParts],
    [build.customParts],
  );
  const checks = useMemo(
    () => checkBuild(build.selection, parts, build.layout),
    [build, parts],
  );
  const accessoryChecks = assessAccessories(
    build.accessories,
    accessoryHost(build),
  );
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
        if (audio.current === engine) setLoaded({ attempt, state: 'ready' });
      })
      .catch(() => {
        if (audio.current === engine) setLoaded({ attempt, state: 'error' });
      });
    return () => {
      actionClock.value++;
      audio.current = null;
      engine.close();
    };
  }, [pack, attempt]);
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
        <a className="brand" href="#home">
          keyconf
        </a>
        <a className="preview-back" href="#studio">
          <ArrowLeft size={16} /> My studio
        </a>
      </header>
      <div className="preview-heading">
        <div>
          <span className="preview-eyebrow">SHARED KEYBOARD</span>
          <h1>{build.name}</h1>
          <p>A snapshot to explore. Your saved build stays untouched.</p>
        </div>
        <button className="preview-customize" onClick={onCustomize}>
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
          <section className="preview-sound">
            <span className="preview-eyebrow">LISTEN</span>
            <h2>{pack?.name ?? 'Synthesized study'}</h2>
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
              <a href={pack.source} target="_blank" rel="noreferrer">
                Recording source & license <ArrowUpRight size={14} />
              </a>
            )}
          </section>
          <section>
            <span className="preview-eyebrow">THE PARTS</span>
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
                const part = accessoryCatalog.find(
                  (item) => item.id === selection.productId,
                );
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
            <summary>Compatibility notes</summary>
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

'use client';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Layers,
  RotateCcw,
  Share2,
  Undo2,
  Redo2,
} from 'lucide-react';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import { useHistoryShortcuts } from './use-history-shortcuts';
import { previewStorageKey } from '../lib/preview-storage';
import {
  controlDecks,
  deckLighting,
  encodeDeck,
  newDeck,
  parseDeck,
  type DeckBuild,
} from '../lib/control-deck';
import './control-deck-studio.css';

type History = {
  present: DeckBuild;
  past: DeckBuild[];
  future: DeckBuild[];
  group: string | null;
};
type Action =
  | { kind: 'edit'; patch: Partial<DeckBuild>; group?: string }
  | { kind: 'undo' }
  | { kind: 'redo' }
  | { kind: 'commit' };
function reduce(state: History, action: Action): History {
  if (action.kind === 'commit') return { ...state, group: null };
  if (action.kind === 'undo') {
    const previous = state.past.at(-1);
    return previous
      ? {
          present: previous,
          past: state.past.slice(0, -1),
          future: [state.present, ...state.future],
          group: null,
        }
      : state;
  }
  if (action.kind === 'redo') {
    const next = state.future[0];
    return next
      ? {
          present: next,
          past: [...state.past, state.present],
          future: state.future.slice(1),
          group: null,
        }
      : state;
  }
  const present = { ...state.present, ...action.patch };
  if (JSON.stringify(present) === JSON.stringify(state.present)) return state;
  return {
    present,
    past:
      action.group && action.group === state.group
        ? state.past
        : [...state.past.slice(-59), state.present],
    future: [],
    group: action.group ?? null,
  };
}

export default function ControlDeckStudio({
  initial,
  restoreLocal,
  onChange,
}: {
  initial: DeckBuild;
  restoreLocal: boolean;
  onChange: (build: DeckBuild) => void;
}) {
  const storageKey = previewStorageKey('keyconf-deck-v1-' + initial.device);
  const [restoration] = useState(() => {
    if (restoreLocal && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const build = parseDeck(JSON.parse(raw));
          if (build.device !== initial.device) throw new Error('Wrong device');
          return { build, message: '' };
        }
      } catch {
        return {
          build: initial,
          message:
            'Your saved deck could not be restored. The original preset is open.',
        };
      }
    }
    return { build: initial, message: '' };
  });
  const [history, dispatch] = useReducer(reduce, {
    present: restoration.build,
    past: [],
    future: [],
    group: null,
  });
  const build = history.present;
  useHistoryShortcuts(true, dispatch);
  const preset = controlDecks[build.device];
  const [persisted, setPersisted] = useState<{
    build: DeckBuild;
    status: 'saved' | 'unavailable';
  } | null>(null);
  const saved = persisted?.build === build ? persisted.status : 'saving';
  const [notice, setNotice] = useState(restoration.message);
  const [shareUrl, setShareUrl] = useState('');
  const [exploded, setExploded] = useState(false);
  const [view, setView] = useState('perspective');
  const [lastKey, setLastKey] = useState('');
  const latestSavedBuild = useRef<DeckBuild | null>(null);
  const openFile = useRef<HTMLInputElement>(null);
  useEffect(
    () => () => {
      if (latestSavedBuild.current) {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify(latestSavedBuild.current),
          );
        } catch {
          /* The active session already exposes storage failures. */
        }
      }
    },
    [storageKey],
  );
  useEffect(() => {
    latestSavedBuild.current = build;
    onChange(build);
    const save = () => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(build));
        setPersisted({ build, status: 'saved' });
      } catch {
        setPersisted({ build, status: 'unavailable' });
      }
    };
    const timer = setTimeout(save, 250);
    window.addEventListener('pagehide', save);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pagehide', save);
    };
  }, [build, storageKey, onChange]);
  const options = useMemo<SceneOptions>(
    () => ({
      device: {
        kind: 'control-deck',
        model: build.device,
        dial: build.dial,
        lighting: build.lighting,
      },
      alpha: build.colors.keys,
      mod: build.colors.commands,
      space: build.colors.wide,
      accent: build.colors.keys,
      caseColor: build.colors.case,
      finish: 'Aluminum',
      profile: 'Sculpted',
      exploded,
      view,
      environment: 'studio',
    }),
    [build, exploded, view],
  );
  async function share() {
    const url = new URL(location.href);
    url.hash = 'deck=' + encodeDeck(build);
    setShareUrl(url.href);
    try {
      await navigator.clipboard.writeText(url.href);
      setNotice('Deck link copied.');
    } catch {
      setNotice('Select the link below to copy it.');
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(build, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = build.device + '-study.json';
    link.click();
    URL.revokeObjectURL(url);
    setNotice('Deck study downloaded.');
  }
  return (
    <main className="deck-studio">
      <a
        className="skip-link"
        href="#deck-settings"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('deck-settings')?.focus();
        }}
      >
        Skip to deck settings
      </a>
      <header className="deck-header">
        <a className="deck-brand" href="#studio">
          <ArrowLeft size={16} /> keyconf
        </a>
        <nav aria-label="Control deck presets">
          <a
            href="#deck/grok-bot"
            aria-current={build.device === 'grok-bot' ? 'page' : undefined}
          >
            Grok Bot
          </a>
          <a
            href="#deck/codex-micro"
            aria-current={build.device === 'codex-micro' ? 'page' : undefined}
          >
            Codex Micro
          </a>
        </nav>
        <a
          className="deck-source"
          href={preset.source}
          target="_blank"
          rel="noreferrer"
        >
          Original reference <ArrowUpRight size={15} />
        </a>
      </header>
      <div className="deck-workspace">
        <section
          className="deck-stage"
          aria-label={preset.name + ' interactive study'}
        >
          <div className="deck-heading">
            <p className="deck-eyebrow">{preset.provenance}</p>
            <h1>{preset.name}</h1>
            <p>{preset.description}</p>
          </div>
          <KeyboardScene
            options={options}
            onPress={(code) =>
              setLastKey(
                code === 'Space' ? 'Space' : code.replace(/^Key|^Digit/, ''),
              )
            }
            onRelease={() => {}}
          />
          <output className="deck-feedback">
            {lastKey
              ? `${lastKey} · local key preview`
              : 'Tap a key. Turn it over. Look inside.'}
          </output>
          <div className="deck-toolbar" aria-label="Deck view controls">
            <button
              onClick={() => setView(view === 'top' ? 'perspective' : 'top')}
            >
              {view === 'top' ? 'Perspective' : 'Top view'}
            </button>
            <button
              aria-pressed={exploded}
              onClick={() => setExploded(!exploded)}
            >
              <Layers size={16} />
              {exploded ? 'Assemble' : 'Explode'}
            </button>
            <button
              aria-label="Reset deck view"
              onClick={() => {
                setView(view === 'reset' ? 'perspective' : 'reset');
                setExploded(false);
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <p className="deck-instructions">
            Drag to orbit · + / − to zoom · Type the mapped keys
          </p>
        </section>
        <aside
          className="deck-inspector"
          id="deck-settings"
          tabIndex={-1}
          aria-label="Control deck settings"
        >
          <div className="deck-inspector-title">
            <h2>Your study</h2>
            <output>
              {saved === 'saved'
                ? 'Saved on this device'
                : saved === 'unavailable'
                  ? 'Session only'
                  : 'Saving…'}
            </output>
          </div>
          <label className="deck-name">
            Study name
            <input
              value={build.name}
              maxLength={80}
              onChange={(e) =>
                dispatch({
                  kind: 'edit',
                  patch: { name: e.target.value },
                  group: 'name',
                })
              }
              onBlur={() => {
                if (!build.name.trim())
                  dispatch({ kind: 'edit', patch: { name: preset.name } });
                dispatch({ kind: 'commit' });
              }}
            />
          </label>
          <div className="deck-history">
            <button
              disabled={!history.past.length}
              onClick={() => dispatch({ kind: 'undo' })}
            >
              <Undo2 size={16} /> Undo
            </button>
            <button
              disabled={!history.future.length}
              onClick={() => dispatch({ kind: 'redo' })}
            >
              <Redo2 size={16} /> Redo
            </button>
          </div>
          <fieldset className="deck-colors">
            <legend>Appearance</legend>
            {(
              [
                { key: 'case', label: 'Case' },
                { key: 'keys', label: 'Role keys' },
                { key: 'commands', label: 'Command keys' },
                { key: 'wide', label: 'Wide key' },
              ] as const
            ).map(({ key, label }) => (
              <label key={key}>
                <span>{label}</span>
                <input
                  type="color"
                  value={build.colors[key]}
                  aria-label={label + ' color'}
                  onChange={(e) =>
                    dispatch({
                      kind: 'edit',
                      patch: {
                        colors: { ...build.colors, [key]: e.target.value },
                      },
                      group: key,
                    })
                  }
                  onBlur={() => dispatch({ kind: 'commit' })}
                />
              </label>
            ))}
          </fieldset>
          <fieldset className="deck-lighting">
            <legend>Scene lighting</legend>
            <div>
              {deckLighting.map((lighting) => (
                <button
                  key={lighting}
                  aria-pressed={build.lighting === lighting}
                  onClick={() =>
                    dispatch({ kind: 'edit', patch: { lighting } })
                  }
                >
                  {lighting}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="deck-dial">
            Dial position <output>{Math.round(build.dial * 100)}%</output>
            <input
              type="range"
              aria-label="Dial position"
              min="0"
              max="1"
              step="0.02"
              value={build.dial}
              onChange={(e) =>
                dispatch({
                  kind: 'edit',
                  patch: { dial: Number(e.target.value) },
                  group: 'dial',
                })
              }
              onPointerUp={() => dispatch({ kind: 'commit' })}
              onKeyUp={() => dispatch({ kind: 'commit' })}
            />
          </label>
          <details className="deck-details">
            <summary>Try the mapped keys</summary>
            <ul>
              {preset.keys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </details>
          <p className="deck-limit">
            Illustrative geometry. Buttons and dial preview locally. No agent
            connection or device-specific sound recording.
          </p>
          <a
            className="deck-inspector-source"
            href={preset.source}
            target="_blank"
            rel="noreferrer"
          >
            Original reference <ArrowUpRight size={15} />
          </a>
          <div className="deck-share">
            <button onClick={() => void share()}>
              <Share2 size={16} /> Share study
            </button>
            <button aria-label="Download deck study" onClick={download}>
              <Download size={16} />
            </button>
          </div>
          <input
            ref={openFile}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (!file) return;
              try {
                if (file.size > 16_000)
                  throw new Error('Choose a control deck study under 16 KB.');
                const incoming = parseDeck(JSON.parse(await file.text()));
                if (incoming.device === build.device)
                  dispatch({ kind: 'edit', patch: incoming });
                else location.hash = 'deck=' + encodeDeck(incoming);
                setNotice('Deck study opened.');
              } catch (error) {
                setNotice(
                  error instanceof Error
                    ? error.message
                    : 'This deck study could not be opened.',
                );
              }
            }}
          />
          <button
            className="deck-reset"
            onClick={() => openFile.current?.click()}
          >
            Open deck file
          </button>
          {shareUrl && (
            <label className="deck-name">
              Share link
              <input
                readOnly
                value={shareUrl}
                onFocus={(e) => e.target.select()}
              />
            </label>
          )}
          <output className="deck-notice">{notice}</output>
          <button
            className="deck-reset"
            onClick={() =>
              dispatch({ kind: 'edit', patch: newDeck(build.device) })
            }
          >
            Reset to original preset
          </button>
        </aside>
      </div>
    </main>
  );
}

'use client';
import { useId, useSyncExternalStore } from 'react';
import { Popover } from '@base-ui/react/popover';
import { Music2, Pause, Play } from 'lucide-react';
import type { StudioMusic } from '../lib/music';
import './music-controls.css';

export default function MusicControls({ music }: { music: StudioMusic }) {
  const { state, requested, volume } = useSyncExternalStore(
    music.subscribe,
    music.getSnapshot,
    music.getSnapshot,
  );
  const volumeId = useId();
  const status =
    state.kind === 'paused'
      ? state.reason === 'reference'
        ? 'Paused for sound reference'
        : 'Paused for keyboard sound'
      : state.kind === 'error'
        ? state.message
        : state.kind === 'loading'
          ? 'Starting music…'
          : state.kind === 'playing'
            ? 'Playing'
            : 'Music off';
  return (
    <Popover.Root>
      <Popover.Trigger
        className="music-trigger"
        aria-label="Music controls"
        data-playing={state.kind === 'playing'}
      >
        <Music2 size={16} />
        <span>Music</span>
        <span className="music-status-dot" aria-hidden="true" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="end"
          sideOffset={8}
          collisionPadding={12}
          positionMethod="fixed"
          className="music-positioner"
        >
          <Popover.Popup className="music-popup" aria-label="Studio music">
            <Popover.Title>Studio music</Popover.Title>
            <Popover.Description>
              Lofi again <span>by OMF-Games</span>
            </Popover.Description>
            <button
              className="music-play"
              onClick={() => (requested ? music.pause() : void music.play())}
            >
              {requested ? <Pause size={17} /> : <Play size={17} />}
              {requested ? 'Pause music' : 'Play music'}
            </button>
            <output data-music-state={state.kind}>{status}</output>
            <label htmlFor={volumeId}>
              Music volume <span>{Math.round(volume * 100)}%</span>
            </label>
            <input
              id={volumeId}
              aria-label="Music volume"
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(event) =>
                music.setVolume(Number(event.target.value) / 100)
              }
            />
            <p className="music-hint">
              Keyboard sound takes priority. Mute the keyboard to hear music
              while typing.
            </p>
            <a
              href="https://opengameart.org/content/lofi-again"
              target="_blank"
              rel="noreferrer"
            >
              Original track & CC0 license ↗
            </a>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

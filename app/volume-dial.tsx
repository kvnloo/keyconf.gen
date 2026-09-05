'use client';
import { useId, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { maxVolume } from '../lib/build';
import './volume-dial.css';

export default function VolumeDial({
  value,
  enabled,
  canEnable,
  onChange,
  onCommit,
  onToggle,
}: {
  value: number;
  enabled: boolean;
  canEnable: boolean;
  onChange: (value: number) => void;
  onCommit: () => void;
  onToggle: () => void;
}) {
  const hint = useId();
  const drag = useRef<{ id: number; y: number; value: number } | null>(null);
  const change = (next: number) =>
    onChange(Math.round(Math.min(maxVolume, Math.max(0, next)) * 100) / 100);
  const percent = Math.round(value * 100);
  return (
    <div className="volume-dial">
      <button
        className="volume-mute"
        aria-label={enabled ? 'Mute keyboard' : 'Enable keyboard sound'}
        aria-pressed={enabled}
        disabled={!enabled && !canEnable}
        onClick={onToggle}
      >
        {enabled && value > 0 ? <Volume2 size={19} /> : <VolumeX size={19} />}
      </button>
      <div className="volume-knob">
        <input
          className="volume-knob-input"
          type="range"
          min={0}
          max={maxVolume * 100}
          value={percent}
          step={1}
          onChange={(event) => change(Number(event.target.value) / 100)}
          aria-label="Keyboard volume"
          aria-describedby={hint}
          aria-valuemin={0}
          aria-valuemax={maxVolume * 100}
          aria-valuenow={percent}
          aria-valuetext={`${percent} percent${enabled ? '' : ', sound off'}`}
          aria-orientation="vertical"
          onKeyDown={(event) => {
            const step = event.shiftKey ? 0.1 : 0.02;
            const next =
              event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? maxVolume
                  : event.key === 'PageUp'
                    ? value + 0.2
                    : event.key === 'PageDown'
                      ? value - 0.2
                      : event.key === 'ArrowUp' || event.key === 'ArrowRight'
                        ? value + step
                        : event.key === 'ArrowDown' || event.key === 'ArrowLeft'
                          ? value - step
                          : null;
            if (next === null) return;
            event.preventDefault();
            event.stopPropagation();
            change(next);
          }}
          onKeyUp={onCommit}
          onBlur={onCommit}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus();
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = { id: event.pointerId, y: event.clientY, value };
          }}
          onPointerMove={(event) => {
            const active = drag.current;
            if (active?.id === event.pointerId)
              change(active.value + (active.y - event.clientY) / 75);
          }}
          onLostPointerCapture={() => {
            drag.current = null;
            onCommit();
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
          }}
        />
        <span
          aria-hidden="true"
          className="volume-knob-face"
          style={{
            transform: `rotate(${-135 + (value / maxVolume) * 270}deg)`,
          }}
        >
          <span />
        </span>
      </div>
      <div className="volume-reading">
        <span>{enabled ? 'Volume' : 'Sound off'}</span>
        <output>
          {percent}
          <small>%</small>
        </output>
      </div>
      <span className="sr-only" id={hint}>
        Drag up to turn up, or use arrow keys. Home is zero; End is 200 percent.
        Above 100 percent adds gain.
      </span>
    </div>
  );
}

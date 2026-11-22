'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
} from 'react';
import {
  Check,
  ChevronDown,
  CloudLightning,
  GripHorizontal,
  Headphones,
  Hourglass,
  Mic,
  PenLine,
  RotateCcw,
  Sun,
} from 'lucide-react';
import {
  PRESET_COPY,
  exposeStudioHook,
  studioLighting,
  type LightingPreset,
} from '../lib/studio-lighting';
import {
  WAVE_SECONDS,
  glassRegistry,
  type GlassEntry,
} from '../lib/glass-registry';
import './studio-lighting.css';

const ICONS: Record<LightingPreset, typeof Sun> = {
  morning: PenLine,
  thunderstorm: CloudLightning,
  sunset: Hourglass,
  afternoon: Mic,
  night: Headphones,
};
const ORDER: LightingPreset[] = [
  'morning',
  'thunderstorm',
  'sunset',
  'afternoon',
  'night',
];

const { subscribe: subscribeLighting, get: readLighting } = studioLighting;
function useLighting() {
  return useSyncExternalStore(subscribeLighting, readLighting, readLighting);
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/**
 * Registers an element as a refracting lens and wires the press / release
 * wave from the shade-glass-button-press technique. Without WebGL the same
 * contact point drives a CSS highlight and ring.
 */
function useGlass(radius: number, selected: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const entry = useRef<GlassEntry | null>(null);
  const [waving, setWaving] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const created: GlassEntry = {
      element,
      radius,
      selected: 0,
      contact: [0.5, 0.5],
      hold: 0,
      holdTarget: 0,
      releasedAt: -Infinity,
    };
    entry.current = created;
    const remove = glassRegistry.add(created);
    return () => {
      remove();
      entry.current = null;
    };
    // Selection is applied by the next effect, so a click's release wave
    // survives the re-render that marks the tile selected.
  }, [radius]);
  useEffect(() => {
    if (entry.current) entry.current.selected = selected ? 1 : 0;
    glassRegistry.invalidate();
  }, [selected]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const setContact = (x: number, y: number) => {
    const element = ref.current;
    if (!element || !entry.current) return;
    entry.current.contact = [x, y];
    element.style.setProperty('--contact-x', `${(x * 100).toFixed(1)}%`);
    element.style.setProperty('--contact-y', `${(y * 100).toFixed(1)}%`);
  };
  const press = (x: number, y: number) => {
    setContact(x, y);
    if (!entry.current) return;
    entry.current.holdTarget = 1;
    entry.current.releasedAt = -Infinity;
    ref.current?.setAttribute('data-held', '');
    glassRegistry.invalidate();
  };
  const release = (wave: boolean) => {
    if (!entry.current) return;
    entry.current.holdTarget = 0;
    ref.current?.removeAttribute('data-held');
    if (wave) {
      entry.current.releasedAt = performance.now();
      setWaving((n) => n + 1);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setWaving(0), WAVE_SECONDS * 1000);
    }
    glassRegistry.invalidate();
  };
  const handlers = {
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      const box = event.currentTarget.getBoundingClientRect();
      press(
        (event.clientX - box.left) / box.width,
        (event.clientY - box.top) / box.height,
      );
    },
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => {
      const box = event.currentTarget.getBoundingClientRect();
      const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      release(inside);
    },
    onPointerCancel: () => {
      release(false);
    },
    onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.buttons) release(false);
    },
    onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
      if ((event.key === 'Enter' || event.key === ' ') && !event.repeat)
        press(0.5, 0.5);
    },
    onKeyUp: (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') release(true);
    },
    onBlur: () => {
      release(false);
    },
  };
  return { ref, handlers, waving: waving > 0 };
}

function PresetTile({
  preset,
  selected,
  compact,
}: {
  preset: LightingPreset;
  selected: boolean;
  compact: boolean;
}) {
  const copy = PRESET_COPY[preset];
  const Icon = ICONS[preset];
  const { ref, handlers, waving } = useGlass(compact ? 16 : 20, selected);
  return (
    <button
      type="button"
      ref={ref as Ref<HTMLButtonElement>}
      className="lighting-tile"
      data-preset={preset}
      data-waving={waving ? '' : undefined}
      aria-pressed={selected}
      aria-label={`${copy.title} lighting: ${copy.subtitle}`}
      onClick={() => studioLighting.setPreset(preset)}
      {...handlers}
    >
      <span className="lighting-tile-top" aria-hidden="true">
        <Icon
          size={preset === 'morning' && !compact ? 30 : 18}
          strokeWidth={1.4}
        />
        <span className="lighting-level">
          {selected && <Check size={11} strokeWidth={2.4} />}
          {copy.level}
          <sup>%</sup>
        </span>
      </span>
      <span className="lighting-tile-text" aria-hidden="true">
        <strong data-ink={copy.title}>{copy.title}</strong>
        <small>{copy.subtitle}</small>
      </span>
    </button>
  );
}

function BrightnessPill({
  value,
  compact,
}: {
  value: number;
  compact: boolean;
}) {
  const { ref, handlers } = useGlass(compact ? 18 : 32, false);
  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className="lighting-brightness"
      data-low={value < 30 ? '' : undefined}
      style={{ '--level': `${value}%` } as CSSProperties}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlers.onPointerUp}
      onPointerCancel={handlers.onPointerCancel}
    >
      <span className="lighting-brightness-fill" aria-hidden="true" />
      <span className="lighting-brightness-label" aria-hidden="true">
        <Sun size={15} strokeWidth={1.6} />
        <span>Brightness</span>
        <span className="lighting-brightness-value">{value}</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        aria-label="Brightness"
        aria-valuetext={`${value}%`}
        aria-orientation={compact ? 'horizontal' : 'vertical'}
        onChange={(event) =>
          studioLighting.setBrightness(Number(event.currentTarget.value))
        }
        onBlur={() => handlers.onBlur()}
      />
    </div>
  );
}

const SPRING = { stiffness: 220, damping: 13 };

/**
 * The floating "Studio lighting" panel: five presets and a brightness pill
 * that re-light the room. Draggable by its grip with a damped spring, reset
 * with one button; on phones it collapses into a chip.
 */
export default function StudioLighting({ children }: { children?: ReactNode }) {
  const state = useLighting();
  const compact = useMedia('(max-width: 700px)');
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const [open, setOpen] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const bodyId = useId();
  const target = useRef({ x: 0, y: 0 });
  const shown = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const drag = useRef<{ id: number; dx: number; dy: number } | null>(null);
  const frame = useRef(0);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    exposeStudioHook();
    return glassRegistry.onAvailability(setWebgl);
  }, []);

  function paint() {
    const element = panel.current;
    if (!element) return;
    const { x, y, vx } = shown.current;
    const shear = Math.max(-0.08, Math.min(0.08, -vx / 4200));
    element.style.setProperty('--drag-x', `${x.toFixed(2)}px`);
    element.style.setProperty('--drag-y', `${y.toFixed(2)}px`);
    element.style.setProperty('--shear', shear.toFixed(4));
    glassRegistry.invalidate();
  }

  function animate() {
    cancelAnimationFrame(frame.current);
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const s = shown.current,
        t = target.current;
      if (reduced) {
        s.x = t.x;
        s.y = t.y;
        s.vx = s.vy = 0;
      } else {
        s.vx +=
          (SPRING.stiffness * (t.x - s.x) - SPRING.damping * 2 * s.vx) * dt;
        s.vy +=
          (SPRING.stiffness * (t.y - s.y) - SPRING.damping * 2 * s.vy) * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
      }
      paint();
      const settled =
        Math.abs(t.x - s.x) + Math.abs(t.y - s.y) < 0.2 &&
        Math.abs(s.vx) + Math.abs(s.vy) < 2;
      if (settled && !drag.current) {
        s.x = t.x;
        s.y = t.y;
        s.vx = s.vy = 0;
        paint();
        frame.current = 0;
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function clamp(x: number, y: number) {
    const element = panel.current;
    const host = element?.offsetParent as HTMLElement | null;
    if (!element || !host) return { x, y };
    const box = element.getBoundingClientRect();
    const bounds = host.getBoundingClientRect();
    const baseLeft = box.left - shown.current.x,
      baseTop = box.top - shown.current.y;
    return {
      x: Math.max(
        bounds.left - baseLeft + 8,
        Math.min(bounds.right - box.width - baseLeft - 8, x),
      ),
      y: Math.max(
        bounds.top - baseTop + 8,
        Math.min(bounds.bottom - box.height - baseTop - 8, y),
      ),
    };
  }

  function moveTo(x: number, y: number) {
    target.current = clamp(x, y);
    setMoved(Math.abs(target.current.x) + Math.abs(target.current.y) > 1);
    animate();
  }

  const tiles = (
    <fieldset className="lighting-grid">
      <legend className="sr-only">Lighting presets</legend>
      {ORDER.map((preset) => (
        <PresetTile
          key={preset}
          preset={preset}
          selected={state.preset === preset}
          compact={compact}
        />
      ))}
      <BrightnessPill value={state.brightness} compact={compact} />
    </fieldset>
  );

  return (
    <section
      ref={panel}
      className="studio-lighting"
      aria-label="Studio lighting"
      data-glass={webgl ? 'webgl' : 'css'}
      data-compact={compact ? '' : undefined}
      data-open={open ? '' : undefined}
      data-preset={state.preset}
    >
      {compact ? (
        <button
          type="button"
          className="lighting-chip"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen(!open)}
        >
          <Sun size={15} strokeWidth={1.6} />
          <span>Studio lighting</span>
          <span className="lighting-chip-value">
            {PRESET_COPY[state.preset].title}
          </span>
          <ChevronDown size={15} className="lighting-chip-caret" />
        </button>
      ) : (
        <div className="lighting-header">
          <button
            type="button"
            className="lighting-grip"
            aria-label="Move studio lighting panel. Drag, or use the arrow keys."
            title="Drag to move"
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              drag.current = {
                id: event.pointerId,
                dx: target.current.x - event.clientX,
                dy: target.current.y - event.clientY,
              };
              panel.current?.setAttribute('data-dragging', '');
            }}
            onPointerMove={(event) => {
              const current = drag.current;
              if (!current || current.id !== event.pointerId) return;
              moveTo(event.clientX + current.dx, event.clientY + current.dy);
            }}
            onPointerUp={() => {
              drag.current = null;
              panel.current?.removeAttribute('data-dragging');
              animate();
            }}
            onPointerCancel={() => {
              drag.current = null;
              panel.current?.removeAttribute('data-dragging');
              animate();
            }}
            onKeyDown={(event) => {
              const step = event.shiftKey ? 48 : 16;
              const offset = {
                ArrowLeft: [-step, 0],
                ArrowRight: [step, 0],
                ArrowUp: [0, -step],
                ArrowDown: [0, step],
              }[event.key];
              if (!offset) return;
              event.preventDefault();
              moveTo(
                target.current.x + offset[0],
                target.current.y + offset[1],
              );
            }}
          >
            <span>Studio lighting</span>
            <GripHorizontal size={15} aria-hidden="true" />
          </button>
          {moved && (
            <button
              type="button"
              className="lighting-reset"
              aria-label="Reset panel position"
              title="Reset position"
              onClick={() => moveTo(0, 0)}
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      )}
      <div className="lighting-body" id={bodyId} hidden={compact && !open}>
        {tiles}
      </div>
      {children}
    </section>
  );
}

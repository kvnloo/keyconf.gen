/**
 * DOM elements that want real refracted glass register here. The keyboard
 * scene draws each one into its own canvas, sampling the frame it has just
 * rendered, so the glass bends the actual room behind it. Text and icons stay
 * DOM above the canvas, which keeps them crisp.
 */
export type GlassEntry = {
  element: HTMLElement;
  radius: number;
  selected: number;
  /** Contact point inside the element, 0–1 on each axis. */
  contact: [number, number];
  /** Pressed amount, eased by the scene from 0 to 1. */
  hold: number;
  holdTarget: number;
  /** performance.now() of the release that launched a wave, or -Infinity. */
  releasedAt: number;
};

type Host = { wake: () => void; enabled: boolean };

const entries = new Set<GlassEntry>();
let host: Host | null = null;
const listeners = new Set<(enabled: boolean) => void>();

export const glassRegistry = {
  add(entry: GlassEntry) {
    entries.add(entry);
    host?.wake();
    return () => {
      entries.delete(entry);
      host?.wake();
    };
  },
  entries() {
    return entries;
  },
  invalidate() {
    host?.wake();
  },
  /** The renderer that will draw glass, or null when only CSS glass is available. */
  attach(next: Host | null) {
    host = next;
    listeners.forEach((listener) => listener(!!next?.enabled));
  },
  enabled() {
    return !!host?.enabled;
  },
  onAvailability(listener: (enabled: boolean) => void) {
    listeners.add(listener);
    listener(!!host?.enabled);
    return () => {
      listeners.delete(listener);
    };
  },
};

/** Seconds a release wave travels before it settles. */
export const WAVE_SECONDS = 0.82;

/**
 * Studio lighting presets shared by the 3D room and the "Studio lighting"
 * glass panel. The store lives outside React so the renderer can follow it
 * without re-rendering the page, and so tests can drive it through
 * `window.__studio`.
 */

export const LIGHTING_PRESETS = [
  'morning',
  'afternoon',
  'sunset',
  'thunderstorm',
  'night',
] as const;
export type LightingPreset = (typeof LIGHTING_PRESETS)[number];

export type LightingState = {
  preset: LightingPreset;
  /** Master brightness, 0–100. */
  brightness: number;
};

export const PRESET_COPY: Record<
  LightingPreset,
  { title: string; subtitle: string; level: number }
> = {
  morning: {
    title: 'Morning',
    subtitle: 'Soft sun through the window',
    level: 78,
  },
  afternoon: {
    title: 'Afternoon',
    subtitle: 'Bright, clear daylight',
    level: 100,
  },
  sunset: { title: 'Sunset', subtitle: 'Low amber light', level: 64 },
  thunderstorm: { title: 'Thunderstorm', subtitle: 'Rain on glass', level: 36 },
  night: { title: 'Night', subtitle: 'Moonlight and a desk lamp', level: 22 },
};

/**
 * Every value the room reads for a preset. They move together so a preset
 * re-lights the whole room coherently (sun, sky, exposure, practicals, screen,
 * window and shafts) instead of tinting one light.
 */
export type RoomLight = {
  /** Sun elevation and azimuth in degrees; azimuth 0 = straight through the window. */
  sunElevation: number;
  sunAzimuth: number;
  sunColor: string;
  sunIntensity: number;
  skyColor: string;
  groundColor: string;
  skyIntensity: number;
  environment: number;
  exposure: number;
  lampIntensity: number;
  screenGain: number;
  /** Index into the monitor wallpaper variants. */
  screen: 'day' | 'sunset' | 'storm' | 'night';
  outside: string;
  outsideGain: number;
  shaftColor: string;
  shaftDensity: number;
  /** Blind slat tilt in radians. */
  blindTilt: number;
  rain: number;
  wall: string;
  keyFill: number;
};

export const ROOM_LIGHT: Record<LightingPreset, RoomLight> = {
  morning: {
    sunElevation: 24,
    sunAzimuth: -18,
    sunColor: '#ffe6c8',
    sunIntensity: 3.4,
    skyColor: '#a9c2c6',
    groundColor: '#3b3226',
    skyIntensity: 0.42,
    environment: 0.3,
    exposure: 1,
    lampIntensity: 0.9,
    screenGain: 1,
    screen: 'day',
    outside: '#c3d6cf',
    outsideGain: 0.95,
    shaftColor: '#ffeed6',
    shaftDensity: 1,
    blindTilt: 0.55,
    rain: 0,
    wall: '#2b4b45',
    keyFill: 0.35,
  },
  afternoon: {
    sunElevation: 34,
    sunAzimuth: -6,
    sunColor: '#fff6ea',
    sunIntensity: 4.6,
    skyColor: '#c4d4d6',
    groundColor: '#4a3e2e',
    skyIntensity: 0.55,
    environment: 0.38,
    exposure: 1.05,
    lampIntensity: 0.55,
    screenGain: 1.05,
    screen: 'day',
    outside: '#e2ecdf',
    outsideGain: 1.15,
    shaftColor: '#fff5e4',
    shaftDensity: 1.15,
    blindTilt: 0.35,
    rain: 0,
    wall: '#2c4d47',
    keyFill: 0.4,
  },
  sunset: {
    sunElevation: 9,
    sunAzimuth: -30,
    sunColor: '#ff9a55',
    sunIntensity: 3.6,
    skyColor: '#8c7486',
    groundColor: '#3c2518',
    skyIntensity: 0.42,
    environment: 0.22,
    exposure: 1,
    lampIntensity: 1.6,
    screenGain: 0.95,
    screen: 'sunset',
    outside: '#f0b27e',
    outsideGain: 0.9,
    shaftColor: '#ffb06a',
    shaftDensity: 1.35,
    blindTilt: 0.7,
    rain: 0,
    wall: '#3a4c44',
    keyFill: 0.3,
  },
  thunderstorm: {
    sunElevation: 40,
    sunAzimuth: 0,
    sunColor: '#a9b8c8',
    sunIntensity: 0.25,
    skyColor: '#8796a6',
    groundColor: '#262a2c',
    skyIntensity: 0.95,
    environment: 0.3,
    exposure: 0.92,
    lampIntensity: 1.3,
    screenGain: 0.9,
    screen: 'storm',
    outside: '#6f8288',
    outsideGain: 0.62,
    shaftColor: '#b9c6d2',
    shaftDensity: 0.08,
    blindTilt: 0.2,
    rain: 1,
    wall: '#2e4643',
    keyFill: 0.4,
  },
  night: {
    sunElevation: 32,
    sunAzimuth: -12,
    sunColor: '#8eaaff',
    sunIntensity: 0.75,
    skyColor: '#1d2c48',
    groundColor: '#0c0e12',
    skyIntensity: 0.3,
    environment: 0.1,
    exposure: 0.95,
    lampIntensity: 3.4,
    screenGain: 1.1,
    screen: 'night',
    outside: '#2b4266',
    outsideGain: 0.55,
    shaftColor: '#8fb0ff',
    shaftDensity: 0.22,
    blindTilt: 0.45,
    rain: 0,
    wall: '#24363a',
    keyFill: 0.22,
  },
};

const STORAGE_KEY = 'keyconf-studio-lighting';
export const DEFAULT_LIGHTING: LightingState = {
  preset: 'afternoon',
  brightness: 72,
};

export function isPreset(value: unknown): value is LightingPreset {
  return (
    typeof value === 'string' &&
    (LIGHTING_PRESETS as readonly string[]).includes(value)
  );
}

export function clampBrightness(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_LIGHTING.brightness;
  return Math.round(Math.min(100, Math.max(0, value)));
}

/** Brightness 0–100 → exposure multiplier, monotonic, 72 ≈ 1. */
export function brightnessGain(brightness: number) {
  return 0.38 + (clampBrightness(brightness) / 100) * 0.86;
}

export function parseLighting(raw: string | null): LightingState {
  if (!raw) return { ...DEFAULT_LIGHTING };
  try {
    const value = JSON.parse(raw) as Partial<LightingState>;
    return {
      preset: isPreset(value.preset) ? value.preset : DEFAULT_LIGHTING.preset,
      brightness:
        typeof value.brightness === 'number'
          ? clampBrightness(value.brightness)
          : DEFAULT_LIGHTING.brightness,
    };
  } catch {
    return { ...DEFAULT_LIGHTING };
  }
}

type Listener = (state: LightingState) => void;

function createStore() {
  let state: LightingState = { ...DEFAULT_LIGHTING };
  let loaded = false;
  const listeners = new Set<Listener>();
  function load() {
    if (loaded || typeof window === 'undefined') return;
    loaded = true;
    try {
      state = parseLighting(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      state = { ...DEFAULT_LIGHTING };
    }
  }
  function set(next: LightingState) {
    load();
    if (next.preset === state.preset && next.brightness === state.brightness)
      return;
    state = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be denied; the choice still applies for this session.
    }
    listeners.forEach((listener) => listener(state));
  }
  const get = () => {
    load();
    return state;
  };
  return {
    get,
    setPreset: (preset: LightingPreset) => {
      if (isPreset(preset)) set({ ...get(), preset });
    },
    setBrightness: (brightness: number) => {
      set({ ...get(), brightness: clampBrightness(brightness) });
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export const studioLighting = createStore();

/** Live renderer facts the scene reports for tests (`window.__studio.state()`). */
export const studioReport: {
  transition: number;
  exposure: number;
  quality: string;
  shafts: string;
  glass: string;
  /** Lenses drawn in the last rendered frame. */
  lenses: number;
} = {
  transition: 1,
  exposure: 1,
  quality: '',
  shafts: '',
  glass: '',
  lenses: 0,
};

declare global {
  interface Window {
    __studio?: {
      setPreset: (name: string) => void;
      setBrightness: (value: number) => void;
      state: () => LightingState & typeof studioReport;
    };
  }
}

export function exposeStudioHook() {
  if (typeof window === 'undefined') return;
  window.__studio = {
    setPreset: (name) => {
      if (isPreset(name)) studioLighting.setPreset(name);
    },
    setBrightness: (value) => studioLighting.setBrightness(value),
    state: () => ({ ...studioLighting.get(), ...studioReport }),
  };
}

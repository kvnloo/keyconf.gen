import {
  catalog,
  categories,
  initialSelection,
  type Part,
  type Selection,
} from './catalog.ts';
import { soundPacks } from './sound-packs.ts';
import { publicUrl } from './import-products.ts';

export const palettes = [
  {
    name: 'Matcha & cream',
    alpha: '#e8e2cd',
    mod: '#cec5aa',
    accent: '#db7843',
    space: '#acbca0',
  },
  {
    name: 'Midnight',
    alpha: '#3e454a',
    mod: '#272e33',
    accent: '#c67746',
    space: '#667c7a',
  },
  {
    name: 'Porcelain',
    alpha: '#f0f0e9',
    mod: '#d6d9d9',
    accent: '#518ba4',
    space: '#99b7c6',
  },
  {
    name: 'Botanical',
    alpha: '#d8e0ca',
    mod: '#9aa78b',
    accent: '#53725e',
    space: '#53725e',
  },
];
export type Palette = (typeof palettes)[number];
export const caseColors = [
  { name: 'Champagne', color: '#c5b792' },
  { name: 'Silver', color: '#deded6' },
  { name: 'Graphite', color: '#454c4b' },
  { name: 'Sage', color: '#a9b5a3' },
  { name: 'Copper', color: '#b17152' },
  { name: 'Slate', color: '#606a84' },
];
export const layouts = ['60', '65', '75'] as const;
export const finishes = ['Aluminum', 'Polycarbonate', 'Brass'] as const;
export const profiles = ['Sculpted', 'Tall sculpted', 'Low uniform'] as const;
export type Build = {
  version: 1;
  name: string;
  palette: Palette;
  caseColor: string;
  layout: (typeof layouts)[number];
  finish: (typeof finishes)[number];
  profile: (typeof profiles)[number];
  selection: Selection;
  customParts: Part[];
  audio: {
    source: string;
    character: 'linear' | 'tactile' | 'clicky';
    volume: number;
    damping: number;
  };
};
export const defaultBuild: Build = {
  version: 1,
  name: 'My first build',
  palette: palettes[0],
  caseColor: caseColors[0].color,
  layout: '60',
  finish: 'Aluminum',
  profile: 'Sculpted',
  selection: initialSelection,
  customParts: [],
  audio: {
    source: 'gateron-black-ink',
    character: 'linear',
    volume: 0.45,
    damping: 0.55,
  },
};

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function text(value: unknown, max = 200): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max;
}
function color(value: unknown): value is string {
  return typeof value === 'string' && /^#[\da-f]{6}$/i.test(value);
}
function unit(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}
function palette(value: unknown): value is Palette {
  return (
    object(value) &&
    text(value.name, 80) &&
    color(value.alpha) &&
    color(value.mod) &&
    color(value.accent) &&
    color(value.space)
  );
}

export function parseCustomParts(value: unknown): Part[] {
  if (!Array.isArray(value) || value.length > 500)
    throw new Error(
      'This parts library is too large or damaged. Import the products again.',
    );
  const ids = new Set<string>();
  return value.map((part: unknown) => {
    if (!object(part))
      throw new Error('A saved part could not be read. Import it again.');
    const category = categories.find((c) => c === part.category);
    if (
      !category ||
      !text(part.id, 4000) ||
      !part.id.startsWith('import:') ||
      ids.has(part.id) ||
      !text(part.name, 300) ||
      !text(part.brand) ||
      typeof part.detail !== 'string' ||
      part.detail.length > 2000 ||
      !text(part.source, 2000) ||
      part.evidence !== 'unknown'
    ) {
      throw new Error('A saved part could not be read. Import it again.');
    }
    ids.add(part.id);
    return {
      id: part.id,
      category,
      name: part.name,
      brand: part.brand,
      detail: part.detail,
      source: publicUrl(part.source).href,
      family: 'unverified',
      evidence: 'unknown',
    };
  });
}

export function parseBuild(value: unknown): Build {
  if (!object(value) || value.version !== 1)
    throw new Error(
      'This build format is not supported. Open a current Keyconf build file or link.',
    );
  const layout = layouts.find((x) => x === value.layout);
  const finish = finishes.find((x) => x === value.finish);
  const profile = profiles.find((x) => x === value.profile);
  if (
    !layout ||
    !finish ||
    !profile ||
    typeof value.name !== 'string' ||
    value.name.length > 80 ||
    !palette(value.palette) ||
    !color(value.caseColor)
  ) {
    throw new Error(
      'The saved design is incomplete. Open another build file or link.',
    );
  }
  const audio = value.audio;
  if (
    !object(audio) ||
    typeof audio.source !== 'string' ||
    !(
      audio.source === 'synthesized' ||
      soundPacks.some((p) => p.id === audio.source)
    ) ||
    !(
      audio.character === 'linear' ||
      audio.character === 'tactile' ||
      audio.character === 'clicky'
    ) ||
    !unit(audio.volume) ||
    !unit(audio.damping)
  )
    throw new Error(
      'The saved audio settings are not supported. Open another build file or link.',
    );
  const customParts = parseCustomParts(value.customParts);
  const parts = [...catalog, ...customParts];
  const selection = { ...initialSelection };
  if (!object(value.selection))
    throw new Error('The saved build is missing its component list.');
  for (const category of categories) {
    const id = value.selection[category];
    if (
      typeof id !== 'string' ||
      !parts.some((p) => p.id === id && p.category === category)
    ) {
      throw new Error(
        `The saved ${category} is missing from this build. Open a complete build file or link.`,
      );
    }
    selection[category] = id;
  }
  return {
    version: 1,
    name: value.name.trim() || 'Untitled build',
    palette: {
      name: value.palette.name,
      alpha: value.palette.alpha,
      mod: value.palette.mod,
      accent: value.palette.accent,
      space: value.palette.space,
    },
    caseColor: value.caseColor,
    layout,
    finish,
    profile,
    selection,
    customParts,
    audio: {
      source: audio.source,
      character: audio.character,
      volume: audio.volume,
      damping: audio.damping,
    },
  };
}

export function readBuildFile(content: string): Build {
  if (content.length > 1_000_000)
    throw new Error(
      'This file is too large. Choose a Keyconf build file under 1 MB.',
    );
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch {
    throw new Error(
      'This file is not readable JSON. Choose an exported Keyconf build.',
    );
  }
  if (object(data) && 'build' in data) return parseBuild(data.build);
  if (
    object(data) &&
    data.version === 1 &&
    object(data.visualStudy) &&
    object(data.sound) &&
    Array.isArray(data.components)
  ) {
    const components = data.components.filter(object);
    if (
      components.length !== categories.length ||
      categories.some(
        (category) =>
          components.filter((part) => part.category === category).length !== 1,
      )
    ) {
      throw new Error(
        'This older export has missing or duplicate components. Choose another build file.',
      );
    }
    const study = data.visualStudy;
    const sound = data.sound;
    const source =
      sound.source === undefined
        ? 'synthesized'
        : object(sound.source) && sound.source.kind === 'recorded'
          ? sound.source.id
          : object(sound.source) && sound.source.kind === 'synthesized'
            ? 'synthesized'
            : undefined;
    return parseBuild({
      version: 1,
      name: 'Imported build',
      palette: {
        name: study.name,
        alpha: study.alpha,
        mod: study.mod,
        accent: study.accent,
        space: study.space,
      },
      caseColor: study.caseColor,
      layout: study.layout,
      finish: study.finish,
      profile: study.profile,
      selection: Object.fromEntries(
        components.map((part) => [part.category, part.id]),
      ),
      customParts: components.filter(
        (part) => typeof part.id === 'string' && part.id.startsWith('import:'),
      ),
      audio: {
        source,
        character: sound.character,
        volume: sound.volume,
        damping: sound.damping,
      },
    });
  }
  return parseBuild(data);
}

export function encodeBuild(build: Build): string {
  const ids = new Set(Object.values(build.selection));
  const portable = {
    ...build,
    customParts: build.customParts.filter((p) => ids.has(p.id)),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(portable));
  const encoded = btoa(
    Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''),
  )
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
  if (encoded.length > 24_000)
    throw new Error(
      'This build is too large for a link. Download the build file to share it.',
    );
  return encoded;
}

export function decodeBuild(encoded: string): Build {
  if (!/^[\w-]+$/.test(encoded) || encoded.length > 24_000)
    throw new Error(
      'This build link is incomplete. Ask for a new link or open a build file.',
    );
  try {
    const binary = atob(encoded.replaceAll('-', '+').replaceAll('_', '/'));
    return readBuildFile(
      new TextDecoder('utf-8', { fatal: true }).decode(
        Uint8Array.from(binary, (c) => c.charCodeAt(0)),
      ),
    );
  } catch {
    throw new Error(
      'This build link could not be read. Ask for a new link or open a build file.',
    );
  }
}

export type BuildHistory = {
  past: Build[];
  present: Build;
  future: Build[];
  group: string | null;
};
export type BuildAction =
  | { kind: 'edit'; patch: Partial<Build>; group?: string }
  | { kind: 'restore'; build: Build }
  | { kind: 'undo' | 'redo' | 'commit' };
export const initialHistory: BuildHistory = {
  past: [],
  present: defaultBuild,
  future: [],
  group: null,
};
export function buildReducer(
  state: BuildHistory,
  action: BuildAction,
): BuildHistory {
  switch (action.kind) {
    case 'commit':
      return { ...state, group: null };
    case 'restore':
      return { past: [], present: action.build, future: [], group: null };
    case 'undo': {
      const previous = state.past.at(-1);
      return previous
        ? {
            past: state.past.slice(0, -1),
            present: previous,
            future: [state.present, ...state.future],
            group: null,
          }
        : state;
    }
    case 'redo': {
      const next = state.future[0];
      return next
        ? {
            past: [...state.past, state.present],
            present: next,
            future: state.future.slice(1),
            group: null,
          }
        : state;
    }
    case 'edit': {
      const present = { ...state.present, ...action.patch };
      if (JSON.stringify(present) === JSON.stringify(state.present))
        return state;
      const grouped =
        action.group !== undefined && action.group === state.group;
      return {
        past: grouped ? state.past : [...state.past.slice(-59), state.present],
        present,
        future: [],
        group: action.group ?? null,
      };
    }
    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}

type PaletteLike = {
  alpha: string;
  mod: string;
  accent: string;
  space: string;
};

const MIN_UI_CONTRAST = 4.5;

const DEFAULT_CHROME = {
  surface: '#222c26',
  paper: '#161d19',
  ink: '#e9ede6',
  muted: '#b3bdb2',
  focus: '#bdd9c0',
  green: '#c5d9c5',
} as const;

function blendColor(c1: string, c2: string, ratio = 0.35): string {
  const p = (hex: string, offset: number) =>
    parseInt(hex.slice(offset, offset + 2), 16) / 255;
  const r1 = p(c1, 1),
    g1 = p(c1, 3),
    b1 = p(c1, 5);
  const r2 = p(c2, 1),
    g2 = p(c2, 3),
    b2 = p(c2, 5);
  const blend = (a: number, b: number) =>
    Math.round((a * ratio + b * (1 - ratio)) * 255);
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(blend(r1, r2))}${toHex(blend(g1, g2))}${toHex(blend(b1, b2))}`;
}

function contrastRatio(ink: string, background: string): number {
  const lum = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map(
      (off) => parseInt(hex.slice(off, off + 2), 16) / 255,
    );
    const adjust = (v: number) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };
  const L1 = lum(background),
    L2 = lum(ink);
  return Math.max(L1, L2) / Math.min(L1, L2);
}

function readableOn(
  background: string,
  preferred: string,
  options: { light?: string; dark?: string } = {},
): string {
  const candidates = [
    preferred,
    options.light ?? '#e9ede6',
    options.dark ?? '#2a332d',
    '#f8f8ef',
    '#ffffff',
    '#20251f',
    '#000000',
  ];
  const passing = candidates.filter(
    (candidate) => contrastRatio(candidate, background) >= MIN_UI_CONTRAST,
  );
  if (passing.length > 0) {
    if (passing.includes(preferred)) return preferred;
    return passing.reduce((best, candidate) =>
      contrastRatio(candidate, background) > contrastRatio(best, background)
        ? candidate
        : best,
    );
  }
  return candidates.reduce((best, candidate) =>
    contrastRatio(candidate, background) > contrastRatio(best, background)
      ? candidate
      : best,
  );
}

function pickInk(background: string) {
  return contrastRatio('#f8f8ef', background) >
    contrastRatio('#20251f', background)
    ? '#f8f8ef'
    : '#20251f';
}

function computeTheme(p: PaletteLike) {
  const paper = blendColor(p.space, '#161d19', 0.35);
  const uiSurface = blendColor(p.space, '#161d19', 0.58);
  const typingInk = pickInk(p.space);
  const ink = pickInk(uiSurface);
  const muted = readableOn(uiSurface, p.mod);
  const accent = readableOn(uiSurface, p.accent, {
    light: '#d4e8d4',
    dark: '#6a946a',
  });
  const theme = `:root { --bg-color: ${p.space} !important; --main-color: ${p.alpha} !important; --text-color: ${typingInk} !important; --sub-color: ${p.mod} !important; --caret-color: ${p.accent} !important; --sub-alt-color: ${paper} !important; --error-color: #f29581 !important; --error-extra-color: #c95d4b !important; }`;
  return {
    theme,
    ink,
    paper,
    uiSurface,
    muted,
    accent,
    paletteSpace: p.space,
  };
}

export type PaletteThemeOptions = {
  /** Sync UI chrome tokens (--surface, --ink, …). Landing only; studio keeps defaults. */
  chrome?: boolean;
};

export function applyPaletteTheme(
  p: PaletteLike,
  target: Document = document,
  options: PaletteThemeOptions = {},
) {
  const syncChrome = options.chrome ?? true;
  const { theme, ink, paper, uiSurface, muted, accent, paletteSpace } =
    computeTheme(p);
  const style =
    target.head.querySelector<HTMLStyleElement>('#keyconf-theme') ??
    target.createElement('style');
  style.id = 'keyconf-theme';
  style.textContent = theme;
  if (!style.isConnected) target.head.appendChild(style);
  target.documentElement.style.setProperty('--palette-space', paletteSpace);
  if (syncChrome) {
    target.documentElement.style.setProperty('--surface', uiSurface);
    target.documentElement.style.setProperty('--paper', paper);
    target.documentElement.style.setProperty('--ink', ink);
    target.documentElement.style.setProperty('--muted', muted);
    target.documentElement.style.setProperty('--focus', accent);
    target.documentElement.style.setProperty('--green', accent);
  } else {
    target.documentElement.style.setProperty(
      '--surface',
      DEFAULT_CHROME.surface,
    );
    target.documentElement.style.setProperty('--paper', DEFAULT_CHROME.paper);
    target.documentElement.style.setProperty('--ink', DEFAULT_CHROME.ink);
    target.documentElement.style.setProperty('--muted', DEFAULT_CHROME.muted);
    target.documentElement.style.setProperty('--focus', DEFAULT_CHROME.focus);
    target.documentElement.style.setProperty('--green', DEFAULT_CHROME.green);
  }
  return style;
}

export { computeTheme, blendColor, contrastRatio, readableOn };

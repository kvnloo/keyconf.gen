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

/**
 * WCAG 2 contrast with the 0.05 flare term. `contrastRatio` above omits it,
 * which overstates contrast on dark colours; the palette chrome still relies
 * on that older measure, so the glass checks use this one instead.
 */
function wcagContrast(ink: string, background: string): number {
  const lum = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map(
      (off) => parseInt(hex.slice(off, off + 2), 16) / 255,
    );
    const adjust = (v: number) =>
      v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };
  const a = lum(ink),
    b = lum(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
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

/**
 * Liquid-glass chrome over the lit studio room. Panels are a smoked tint
 * (GLASS.tint at GLASS.alpha) composited over whatever the room shows behind
 * them, so text must pass against that composite over both the brightest and
 * the darkest backdrop any lighting preset produces.
 *
 * The extremes come from rendered frames with the chrome hidden, sampled
 * inside every glass element's box for each preset at brightness 0 and 100
 * (1440x900 and 390x844). CSS panels see the room through a 22px blur: the
 * brightest blurred sample was #75a1b9 (luminance 0.33), padded here to
 * #cfd8de. WebGL lenses refract the sharp frame: the brightest sharp sample
 * was #fff3da, so they are checked against pure white. The darkest sample was
 * #000303, checked as black.
 */
export const GLASS = {
  ink: '#ffffff',
  muted: '#dde4e0',
  tint: '#0c1211',
  alpha: 0.62,
  /** The WebGL lens multiplies the room by this, then adds `lensLift`. */
  lensBody: 0.34,
  lensLift: '#090b0b',
  brightestBlurred: '#cfd8de',
  brightestSharp: '#ffffff',
  darkest: '#000000',
} as const;

function mixHex(top: string, bottom: string, alpha: number) {
  return blendColor(top, bottom, alpha);
}

/** The colour a glass panel shows over `backdrop`. */
export function glassComposite(backdrop: string, alpha: number = GLASS.alpha) {
  return mixHex(GLASS.tint, backdrop, alpha);
}

/** The colour a WebGL lens shows over `backdrop` (multiply, then lift). */
export function lensComposite(backdrop: string) {
  const channel = (hex: string, offset: number) =>
    parseInt(hex.slice(offset, offset + 2), 16);
  const toHex = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, '0');
  return `#${[1, 3, 5]
    .map((o) =>
      toHex(channel(backdrop, o) * GLASS.lensBody + channel(GLASS.lensLift, o)),
    )
    .join('')}`;
}

/** Worst-case contrast of glass ink and muted text across both extremes. */
export function glassContrast() {
  const surfaces = [
    glassComposite(GLASS.brightestBlurred),
    glassComposite(GLASS.darkest),
    lensComposite(GLASS.brightestSharp),
    lensComposite(GLASS.darkest),
  ];
  return {
    ink: Math.min(...surfaces.map((s) => wcagContrast(GLASS.ink, s))),
    muted: Math.min(...surfaces.map((s) => wcagContrast(GLASS.muted, s))),
  };
}

export type PaletteThemeOptions = {
  /**
   * Sync UI chrome tokens (--surface, --ink, …). `true` derives them from the
   * palette; `'glass'` uses the contrast-checked glass tokens over the room;
   * false keeps the studio defaults.
   */
  chrome?: boolean | 'glass';
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
  if (syncChrome === 'glass') {
    const worst = glassComposite(GLASS.brightestBlurred);
    target.documentElement.style.setProperty('--surface', worst);
    target.documentElement.style.setProperty('--paper', DEFAULT_CHROME.paper);
    target.documentElement.style.setProperty('--ink', GLASS.ink);
    target.documentElement.style.setProperty('--muted', GLASS.muted);
    // The palette accent still tints focus and highlights, made readable on glass.
    const glassAccent = readableOn(worst, p.accent, {
      light: '#d4e8d4',
      dark: '#6a946a',
    });
    target.documentElement.style.setProperty('--focus', glassAccent);
    target.documentElement.style.setProperty('--green', glassAccent);
  } else if (syncChrome) {
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

export {
  computeTheme,
  blendColor,
  contrastRatio,
  wcagContrast,
  readableOn,
  MIN_UI_CONTRAST,
};

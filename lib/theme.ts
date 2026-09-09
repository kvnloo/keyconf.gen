type PaletteLike = { alpha: string; mod: string; accent: string; space: string };

function blendColor(c1: string, c2: string, ratio = 0.35): string {
  const p = (hex: string, offset: number) =>
    parseInt(hex.slice(offset, offset + 2), 16) / 255;
  const r1 = p(c1, 1), g1 = p(c1, 3), b1 = p(c1, 5);
  const r2 = p(c2, 1), g2 = p(c2, 3), b2 = p(c2, 5);
  const blend = (a: number, b: number) => Math.round(a * ratio + b * (1 - ratio)) / 255;
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(blend(r1, r2))}${toHex(blend(g1, g2))}${toHex(blend(b1, b2))}`;
}

function contrastRatio(ink: string, background: string): number {
  const lum = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map(off => parseInt(hex.slice(off, off + 2), 16) / 255);
    const adjust = (v: number) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };
  const L1 = lum(background), L2 = lum(ink);
  return Math.max(L1, L2) / Math.min(L1, L2);
}

function computeTheme(p: PaletteLike) {
  const paper = blendColor(p.space, '#161d19', 0.35);
  const ink = contrastRatio('#f8f8ef', p.space) > contrastRatio('#20251f', p.space) ? '#f8f8ef' : '#20251f';
  const theme = `:root { --bg-color: ${p.space} !important; --main-color: ${p.alpha} !important; --text-color: ${ink} !important; --sub-color: ${p.mod} !important; --caret-color: ${p.accent} !important; --sub-alt-color: ${paper} !important; --error-color: #f29581 !important; --error-extra-color: #c95d4b !important; }`;
  return { theme, ink, paper };
}

export function applyPaletteTheme(p: PaletteLike, target: Document = document) {
  const { theme, ink, paper } = computeTheme(p);
  const style = target.head.querySelector<HTMLStyleElement>('#keyconf-theme') ?? target.createElement('style');
  style.id = 'keyconf-theme';
  style.textContent = theme;
  if (!style.isConnected) target.head.appendChild(style);
  target.documentElement.style.setProperty('--surface', p.space);
  target.documentElement.style.setProperty('--paper', paper);
  target.documentElement.style.setProperty('--ink', ink);
  target.documentElement.style.setProperty('--muted', p.mod);
  target.documentElement.style.setProperty('--focus', p.accent);
  target.documentElement.style.setProperty('--green', p.accent);
  return style;
}

export { computeTheme, blendColor, contrastRatio };

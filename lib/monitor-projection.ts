export type ScreenPoint = { x: number; y: number };

// Map a readable DOM viewport onto the four corners of the physical screen.
export function monitorTransform(
  [tl, tr, br, bl]: [ScreenPoint, ScreenPoint, ScreenPoint, ScreenPoint],
  width: number,
  height: number,
): string | null {
  const dx1 = tr.x - br.x,
    dx2 = bl.x - br.x;
  const dy1 = tr.y - br.y,
    dy2 = bl.y - br.y;
  const dx3 = tl.x - tr.x + br.x - bl.x;
  const dy3 = tl.y - tr.y + br.y - bl.y;
  const denominator = dx1 * dy2 - dx2 * dy1;
  if (Math.abs(denominator) < 0.001 || width <= 0 || height <= 0) return null;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  return `matrix3d(${[
    (tr.x - tl.x + g * tr.x) / width,
    (tr.y - tl.y + g * tr.y) / width,
    0,
    g / width,
    (bl.x - tl.x + h * bl.x) / height,
    (bl.y - tl.y + h * bl.y) / height,
    0,
    h / height,
    0,
    0,
    1,
    0,
    tl.x,
    tl.y,
    0,
    1,
  ].join(',')})`;
}

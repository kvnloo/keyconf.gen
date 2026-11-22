/**
 * Procedural, seeded canvas textures for the studio room. Nothing here is
 * downloaded: wood grain, plaster, the forest outside and the monitor
 * wallpapers are painted locally so every load looks the same.
 */

export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function canvas(width: number, height: number) {
  const element = document.createElement('canvas');
  element.width = width;
  element.height = height;
  const ctx = element.getContext('2d');
  return { element, ctx };
}

/** Walnut boards with grain running along the board's long axis (u). */
export function walnutCanvas() {
  const { element, ctx } = canvas(2048, 512);
  if (!ctx) return element;
  const random = seeded(1987);
  const base = ctx.createLinearGradient(0, 0, 0, 512);
  base.addColorStop(0, '#6e3a22');
  base.addColorStop(0.5, '#7d4428');
  base.addColorStop(1, '#69351f');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 2048, 512);
  // Board seams: four boards across the depth.
  for (let board = 0; board < 4; board++) {
    const y = board * 128;
    ctx.fillStyle = `rgba(${random() > 0.5 ? '120,62,34' : '96,48,26'},${0.25 + random() * 0.3})`;
    ctx.fillRect(0, y, 2048, 128);
    ctx.fillStyle = 'rgba(32,14,6,.55)';
    ctx.fillRect(0, y, 2048, 1.5);
  }
  for (let i = 0; i < 2600; i++) {
    const y = random() * 512,
      x = random() * 2200 - 100,
      w = 60 + random() * 900;
    ctx.strokeStyle =
      random() < 0.55
        ? `rgba(48,20,8,${0.08 + random() * 0.16})`
        : `rgba(196,118,70,${0.06 + random() * 0.12})`;
    ctx.lineWidth = 0.4 + random() * 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + w * 0.3,
      y - 1.5 + random() * 3,
      x + w * 0.65,
      y + random() * 4 - 2,
      x + w,
      y + random() * 2 - 1,
    );
    ctx.stroke();
  }
  // A few cathedral figures.
  for (let i = 0; i < 9; i++) {
    const cx = random() * 2048,
      cy = random() * 512;
    for (let ring = 0; ring < 7; ring++) {
      ctx.strokeStyle = `rgba(52,22,9,${0.05 + ring * 0.012})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 70 + ring * 22, 7 + ring * 3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  return element;
}

/** Plaster: soft mottling plus fine trowel strokes, grey-scale for roughness/bump. */
export function plasterCanvas() {
  const { element, ctx } = canvas(512, 512);
  if (!ctx) return element;
  const random = seeded(4401);
  ctx.fillStyle = '#9a9a9a';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 1400; i++) {
    const x = random() * 512,
      y = random() * 512,
      r = 6 + random() * 46;
    const tone = Math.round(120 + random() * 90);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `rgba(${tone},${tone},${tone},.16)`);
    gradient.addColorStop(1, `rgba(${tone},${tone},${tone},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  for (let i = 0; i < 260; i++) {
    const x = random() * 512,
      y = random() * 512;
    ctx.strokeStyle = `rgba(${random() > 0.5 ? 210 : 70},${random() > 0.5 ? 210 : 70},${random() > 0.5 ? 210 : 70},.05)`;
    ctx.lineWidth = 2 + random() * 6;
    ctx.beginPath();
    ctx.arc(x, y, 30 + random() * 80, random() * 6, random() * 6 + 0.8);
    ctx.stroke();
  }
  return element;
}

/**
 * One layer of forest beyond the window: pines and broadleaf crowns on a
 * transparent canvas, so several layers at different depths give parallax.
 */
export function forestLayerCanvas(layer: number) {
  const { element, ctx } = canvas(1024, 512);
  if (!ctx) return element;
  const random = seeded(733 + layer * 97);
  const tones = [
    ['#8fae9f', '#a3bfae', '#7f9e8c'],
    ['#5f8770', '#6f9878', '#557a62'],
    ['#365a43', '#41684b', '#2c4c37'],
  ][layer];
  const base = [250, 190, 120][layer];
  ctx.fillStyle = tones[2];
  ctx.beginPath();
  ctx.moveTo(0, 512);
  for (let x = 0; x <= 1024; x += 8)
    ctx.lineTo(
      x,
      base +
        30 +
        22 * Math.sin(x * 0.006 + layer * 2) +
        10 * Math.sin(x * 0.03),
    );
  ctx.lineTo(1024, 512);
  ctx.fill();
  const count = [170, 150, 120][layer];
  for (let i = 0; i < count; i++) {
    const x = random() * 1060 - 18;
    const size = (layer + 1) * (26 + random() * 40);
    const top = base - size * (0.6 + random() * 0.8) + 40 * Math.sin(x * 0.01);
    ctx.fillStyle = tones[Math.floor(random() * 3)];
    if (random() < (layer === 0 ? 0.7 : layer === 1 ? 0.45 : 0.15)) {
      // Pine: stacked triangles.
      for (let j = 0; j < 7; j++) {
        const v = (j + 1) / 7,
          r = size * (0.12 + 0.32 * v);
        ctx.beginPath();
        ctx.moveTo(x, top + v * size * 0.9 - size * 0.25);
        ctx.lineTo(x + r, top + v * size * 1.05);
        ctx.lineTo(x - r, top + v * size * 1.05);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillRect(x - size * 0.02, top + size, size * 0.04, 60 + size);
    } else {
      // Broadleaf: clustered crowns.
      for (let j = 0; j < 14; j++) {
        ctx.beginPath();
        ctx.ellipse(
          x + (random() - 0.5) * size * 0.9,
          top + random() * size * 0.7,
          size * (0.22 + random() * 0.2),
          size * (0.18 + random() * 0.18),
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(30,40,30,.6)';
      ctx.fillRect(
        x - size * 0.03,
        top + size * 0.6,
        size * 0.06,
        40 + size * 0.6,
      );
    }
  }
  if (layer === 2) {
    // Overhanging canopy so the nearest trees frame the view from above.
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = tones[Math.floor(random() * 3)];
      ctx.beginPath();
      ctx.ellipse(
        random() * 1024,
        random() * 150,
        20 + random() * 50,
        14 + random() * 30,
        0,
        0,
        7,
      );
      ctx.fill();
    }
  }
  // Light filtering through the canopy.
  for (let i = 0; i < 260 - layer * 60; i++) {
    ctx.fillStyle = `rgba(230,240,214,${0.03 + random() * 0.05})`;
    ctx.beginPath();
    ctx.arc(
      random() * 1024,
      base - 60 + random() * 260,
      1 + random() * 4,
      0,
      7,
    );
    ctx.fill();
  }
  return element;
}

export function skyCanvas() {
  const { element, ctx } = canvas(64, 256);
  if (!ctx) return element;
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, '#e9f0ec');
  gradient.addColorStop(0.55, '#f4f1e4');
  gradient.addColorStop(1, '#c9d3c4');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 256);
  return element;
}

export type Wallpaper = 'day' | 'sunset' | 'storm' | 'night';

/** Mountain lake wallpaper for the studio display. */
export function wallpaperCanvas(kind: Wallpaper) {
  const width = 1280,
    height = 720;
  const { element, ctx } = canvas(width, height);
  if (!ctx) return element;
  const random = seeded(1873);
  const palette = {
    day: {
      sky: ['#5f9fd6', '#a9cfe9', '#e7eef0'],
      ridges: ['#a7b9c6', '#7f98a8', '#5d7889', '#3c5866'],
      peak: '#7d8a92',
      snow: '#f4f6f6',
      trees: '#1f3d2c',
      water: [32, 92, 110],
      glow: null as null | string,
    },
    sunset: {
      sky: ['#43375e', '#c86e5a', '#f6c27f'],
      ridges: ['#9a6a73', '#7b5260', '#59404f', '#3a2c38'],
      peak: '#6e4a52',
      snow: '#f7c9a5',
      trees: '#22171d',
      water: [70, 38, 48],
      glow: '#ffd49a',
    },
    storm: {
      sky: ['#4c5864', '#76838e', '#9aa4ab'],
      ridges: ['#7d8992', '#66737c', '#4f5c65', '#36424a'],
      peak: '#58646c',
      snow: '#c8d0d4',
      trees: '#1b2927',
      water: [44, 58, 64],
      glow: null,
    },
    night: {
      sky: ['#070f2a', '#14275a', '#2a4580'],
      ridges: ['#2a3c66', '#203158', '#182648', '#101b36'],
      peak: '#1e2c52',
      snow: '#9fb2e0',
      trees: '#07101f',
      water: [12, 24, 58],
      glow: '#e9efff',
    },
  }[kind];
  const horizon = height * 0.58;
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, palette.sky[0]);
  sky.addColorStop(0.6, palette.sky[1]);
  sky.addColorStop(1, palette.sky[2]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, horizon);
  if (kind === 'night') {
    for (let i = 0; i < 220; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.2 + random() * 0.7})`;
      ctx.fillRect(random() * width, random() * horizon * 0.8, 1.4, 1.4);
    }
  }
  if (palette.glow) {
    const cx = kind === 'night' ? width * 0.68 : width * 0.62;
    const cy = kind === 'night' ? height * 0.16 : horizon * 0.86;
    const radius = kind === 'night' ? 22 : 46;
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 7);
    halo.addColorStop(0, palette.glow);
    halo.addColorStop(0.12, palette.glow + 'cc');
    halo.addColorStop(1, palette.glow + '00');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, horizon);
    ctx.fillStyle = palette.glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  if (kind === 'storm') {
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(60,68,78,${0.12 + random() * 0.15})`;
      ctx.beginPath();
      ctx.ellipse(
        random() * width,
        random() * horizon * 0.5,
        120 + random() * 220,
        30 + random() * 40,
        0,
        0,
        7,
      );
      ctx.fill();
    }
  }
  // Distant ridges.
  palette.ridges.forEach((color, j) => {
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    for (let x = 0; x <= width; x += 4) {
      const z = x / width;
      const y =
        horizon -
        (60 - j * 9) -
        (26 + 10 * j) * Math.sin(z * 7 + j * 1.7) -
        12 * Math.sin(z * 21 + j * 3);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, horizon);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  });
  // The peak.
  const px = width * 0.46,
    py = height * 0.17;
  ctx.fillStyle = palette.peak;
  ctx.beginPath();
  ctx.moveTo(px - 330, horizon);
  ctx.lineTo(px - 60, py + 70);
  ctx.lineTo(px, py);
  ctx.lineTo(px + 70, py + 90);
  ctx.lineTo(px + 360, horizon);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = palette.snow;
  ctx.beginPath();
  ctx.moveTo(px - 92, py + 108);
  ctx.lineTo(px - 60, py + 70);
  ctx.lineTo(px, py);
  ctx.lineTo(px + 70, py + 90);
  ctx.lineTo(px + 104, py + 132);
  ctx.lineTo(px + 52, py + 112);
  ctx.lineTo(px + 18, py + 140);
  ctx.lineTo(px - 22, py + 104);
  ctx.lineTo(px - 58, py + 130);
  ctx.closePath();
  ctx.fill();
  // Tree lines on both shores.
  function pine(x: number, y: number, size: number) {
    if (!ctx) return;
    ctx.fillRect(x - size * 0.015, y - size, size * 0.03, size);
    for (let j = 0; j < 9; j++) {
      const v = (j + 1) / 10,
        r = size * (0.02 + 0.17 * v);
      ctx.beginPath();
      ctx.moveTo(x, y - size + v * size * 0.75 - size * 0.12);
      ctx.lineTo(x + r, y - size + v * size * 0.92);
      ctx.lineTo(x - r, y - size + v * size * 0.92);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.fillStyle = palette.trees;
  for (let i = 0; i < 260; i++) {
    const side = random() < 0.5;
    const t = random();
    const x = side ? t * width * 0.36 : width - t * width * 0.34;
    pine(
      x,
      horizon + 6 + (1 - t) * 30,
      (16 + (1 - t) * 120) * (0.5 + random()),
    );
  }
  // Lake: mirror the sky and mountains with ripples.
  const mirrored = ctx.getImageData(0, 0, width, Math.floor(horizon));
  const water = ctx.createImageData(width, height - Math.floor(horizon));
  for (let y = 0; y < water.height; y++) {
    const depth = y / water.height;
    const from = Math.max(
      0,
      mirrored.height - 1 - Math.floor(y * 0.9 + 4 * Math.sin(y * 0.3) * depth),
    );
    for (let x = 0; x < width; x++) {
      const sx = Math.min(
        width - 1,
        Math.max(0, x + Math.floor(6 * depth * Math.sin(y * 0.2 + x * 0.01))),
      );
      const a = (from * width + sx) * 4,
        b = (y * width + x) * 4;
      for (let c = 0; c < 3; c++)
        water.data[b + c] =
          mirrored.data[a + c] * (0.72 - 0.3 * depth) +
          palette.water[c] * (0.28 + 0.3 * depth);
      water.data[b + 3] = 255;
    }
  }
  ctx.putImageData(water, 0, Math.floor(horizon));
  ctx.fillStyle = palette.trees;
  ctx.globalAlpha = 0.55;
  ctx.fillRect(0, horizon, width, 3);
  ctx.globalAlpha = 1;
  return element;
}

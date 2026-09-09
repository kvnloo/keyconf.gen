import test from 'node:test';
import assert from 'node:assert/strict';
import { palettes } from '../lib/build.ts';
import { featuredBuilds } from '../lib/featured-builds.ts';
import {
  applyPaletteTheme,
  computeTheme,
  contrastRatio,
} from '../lib/theme.ts';

const MIN_UI_CONTRAST = 4.5;

function paletteSources() {
  const fromFeatured = featuredBuilds.flatMap((featured) =>
    featured.kind === 'keyboard'
      ? [featured.build.palette]
      : [
          {
            alpha: featured.build.colors.keys,
            mod: featured.build.colors.commands,
            accent: featured.build.colors.keys,
            space: featured.build.colors.wide,
          },
        ],
  );
  return [...palettes, ...fromFeatured];
}

test('UI theme tokens stay readable on chrome surfaces', () => {
  for (const palette of paletteSources()) {
    const theme = computeTheme(palette);
    assert.ok(
      contrastRatio(theme.ink, theme.uiSurface) >= MIN_UI_CONTRAST,
      `${palette.name ?? 'palette'} ink on surface`,
    );
    assert.ok(
      contrastRatio(theme.muted, theme.uiSurface) >= MIN_UI_CONTRAST,
      `${palette.name ?? 'palette'} muted on surface`,
    );
    assert.ok(
      contrastRatio(theme.accent, theme.uiSurface) >= MIN_UI_CONTRAST,
      `${palette.name ?? 'palette'} accent on surface`,
    );
  }
});

test('studio mode keeps default chrome while stage follows palette', () => {
  const harsh = {
    alpha: '#f5f5f5',
    mod: '#d0d0d0',
    accent: '#ffffff',
    space: '#f0f0f0',
  };
  const props = {};
  const root = {
    documentElement: {
      style: {
        setProperty: (name, value) => {
          props[name] = value;
        },
      },
    },
    head: {
      querySelector: () => null,
      appendChild: () => {},
    },
    createElement: () => ({ id: '', textContent: '', isConnected: false }),
  };
  applyPaletteTheme(harsh, root, { chrome: false });
  assert.equal(props['--surface'], '#222c26');
  assert.equal(props['--ink'], '#e9ede6');
  assert.equal(props['--palette-space'], harsh.space);
});

import type { Build } from './build.ts';
import { isQ1MaxAssembly } from './keyboard-variant.ts';

const geometries = [
  'generic-60',
  'generic-65',
  'generic-75',
  'q1-max-ansi',
] as const;
export type BuildThumbnail = {
  geometry: (typeof geometries)[number];
  caseColor: string;
  colors: Pick<Build['palette'], 'alpha' | 'mod' | 'accent' | 'space'>;
};

export function createBuildThumbnail(
  build: Parameters<typeof isQ1MaxAssembly>[0] & {
    caseColor: string;
    palette: BuildThumbnail['colors'];
  },
): BuildThumbnail | null {
  const geometry = isQ1MaxAssembly(build)
    ? 'q1-max-ansi'
    : geometries.find((value) => value === `generic-${build.layout}`);
  if (!geometry) return null;
  return {
    geometry,
    caseColor: build.caseColor,
    colors: {
      alpha: build.palette.alpha,
      mod: build.palette.mod,
      accent: build.palette.accent,
      space: build.palette.space,
    },
  };
}

export function parseBuildThumbnail(value: unknown): BuildThumbnail | null {
  if (value === undefined || value === null) return null;
  if (!object(value) || !object(value.colors)) throw invalid();
  const geometry = geometries.find((candidate) => candidate === value.geometry);
  if (!geometry) throw invalid();
  return {
    geometry,
    caseColor: color(value.caseColor),
    colors: {
      alpha: color(value.colors.alpha),
      mod: color(value.colors.mod),
      accent: color(value.colors.accent),
      space: color(value.colors.space),
    },
  };
}

function object(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
function color(value: unknown): string {
  if (typeof value !== 'string' || !/^#[\da-f]{6}$/i.test(value))
    throw invalid();
  return value;
}
function invalid() {
  return new Error('The published build preview could not be read.');
}

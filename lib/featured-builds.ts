import { assemblies } from './component-data.ts';
import { defaultBuild, type Build, type Palette } from './build.ts';
import { newDeck, type DeckBuild } from './control-deck.ts';

export type FeaturedBuild =
  | {
      kind: 'keyboard';
      id: string;
      name: string;
      subtitle: string;
      build: Build;
    }
  | {
      kind: 'control-deck';
      id: string;
      name: string;
      subtitle: string;
      build: DeckBuild;
    };

function keyboard(
  id: string,
  name: string,
  assemblyId: string,
  palette: Palette,
  caseColor: string,
  subtitle?: string,
): FeaturedBuild {
  const assembly = assemblies.find((item) => item.id === assemblyId);
  if (!assembly) throw new Error(`Featured assembly is missing: ${assemblyId}`);
  return {
    kind: 'keyboard',
    id,
    name,
    subtitle:
      subtitle ??
      `${assembly.name} · ${assembly.layout}% study${assemblyId === 'nk65-entry' ? ' · retired kit' : ''}`,
    build: {
      ...defaultBuild,
      name,
      palette,
      caseColor,
      layout: assembly.layout,
      finish: assembly.finish,
      selection: { ...assembly.selection },
    },
  };
}
export const featuredBuilds: FeaturedBuild[] = [
  keyboard(
    'forest-line',
    'Forest Line',
    'bakeneko60',
    {
      name: 'Forest Line',
      alpha: '#e7e1cd',
      mod: '#30473b',
      accent: '#688765',
      space: '#95aa86',
    },
    '#c1bcb0',
  ),
  keyboard(
    'blush',
    'Blush',
    'nk65-entry',
    {
      name: 'Blush',
      alpha: '#ead6cd',
      mod: '#bb9699',
      accent: '#745558',
      space: '#b5757c',
    },
    '#735256',
  ),
  keyboard(
    'midnight',
    'Midnight',
    'q1-max',
    {
      name: 'Midnight',
      alpha: '#343b3f',
      mod: '#20282b',
      accent: '#526c75',
      space: '#4b6067',
    },
    '#272f33',
  ),
  keyboard(
    'retro',
    'Retro',
    'tofu60',
    {
      name: 'Retro',
      alpha: '#e3dbc7',
      mod: '#a5a99e',
      accent: '#c97b44',
      space: '#d1b48a',
    },
    '#c3b69b',
  ),
  keyboard(
    'cyberboard-r2',
    'CYBERBOARD R2',
    'cyberboard-r2',
    {
      name: 'Jet Black',
      alpha: '#2a2a2e',
      mod: '#111114',
      accent: '#5ce1ff',
      space: '#1a1a1f',
    },
    '#0d0d10',
    'Angry Miao · 75% LED-panel study · not CAD',
  ),
  keyboard(
    'am-hatsu',
    'AM HATSU',
    'am-hatsu',
    {
      name: 'Battleship',
      alpha: '#c8cdd4',
      mod: '#5a6575',
      accent: '#9aa8b8',
      space: '#7a8796',
    },
    '#4a5564',
    'Angry Miao · split 4×6 study · not CAD',
  ),
  {
    kind: 'control-deck',
    id: 'grok-bot',
    name: 'Grok Bot',
    subtitle: 'Independent control-deck concept',
    build: newDeck('grok-bot'),
  },
  {
    kind: 'control-deck',
    id: 'codex-micro',
    name: 'Codex Micro',
    subtitle: 'OpenAI × Work Louder · study',
    build: newDeck('codex-micro'),
  },
];

export function customizeFeatured(
  featured: FeaturedBuild & { kind: 'keyboard' },
  current: Build,
): Build {
  return {
    ...featured.build,
    customParts: current.customParts,
    audio: { ...current.audio },
  };
}

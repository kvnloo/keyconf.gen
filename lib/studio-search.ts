import type { Part, Category } from './catalog.ts';
import {
  accessoryCatalog,
  type AccessoryProduct,
  type AccessoryKind,
} from './build-accessories.ts';

export const studioDestinations = [
  {
    id: 'build',
    name: 'Build',
    detail: 'Design, colors and materials',
    keywords: 'studio customize case keycaps',
  },
  {
    id: 'parts',
    name: 'Parts & accessories',
    detail: 'Components, compatibility and artisan placement',
    keywords: 'mods knobs screens fit',
  },
  {
    id: 'sound',
    name: 'Sound lab',
    detail: 'Recorded references and listening controls',
    keywords: 'audio switches volume',
  },
  {
    id: 'play',
    name: 'Typing test',
    detail: 'Try your keyboard',
    keywords: 'play type wpm monkeytype',
  },
  {
    id: 'discover',
    name: 'Discover',
    detail: 'Research, technologies and sources',
    keywords: 'learn gaming topre magnetic',
  },
] as const;
export type StudioDestination = (typeof studioDestinations)[number]['id'];
export type StudioSearchResult =
  | { kind: 'destination'; item: (typeof studioDestinations)[number] }
  | { kind: 'part'; item: Part }
  | { kind: 'accessory'; item: AccessoryProduct };

const categoryTerms: Record<Category, string> = {
  case: 'case cases enclosure',
  pcb: 'pcb pcbs circuit board',
  plate: 'plate plates',
  switch: 'switch switches',
  keycaps: 'keycaps keyset',
  stabilizers: 'stabilizers stabs',
};
const accessoryTerms: Record<AccessoryKind, string> = {
  knob: 'knob knobs dial dials',
  encoder: 'encoder encoders dial dials rotary',
  screen: 'screen screens display displays',
  buttons: 'buttons controls',
  macropad: 'macropad macropads',
  artisan: 'artisan artisans keycap keycaps',
};

const normalize = (value: string) =>
  value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();

export function searchStudio(
  query: string,
  parts: readonly Part[],
): StudioSearchResult[] {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const destinations: StudioSearchResult[] = studioDestinations.map((item) => ({
    kind: 'destination',
    item,
  }));
  if (!terms.length) return destinations;
  const candidates: StudioSearchResult[] = [
    ...destinations,
    ...parts.map((item): StudioSearchResult => ({ kind: 'part', item })),
    ...accessoryCatalog.map(
      (item): StudioSearchResult => ({ kind: 'accessory', item }),
    ),
  ];
  return candidates
    .map((result) => {
      const name = normalize(result.item.name);
      const context =
        result.kind === 'destination'
          ? result.item.keywords
          : `${result.item.brand} ${result.kind === 'part' ? categoryTerms[result.item.category] : accessoryTerms[result.item.kind]}`;
      const text = normalize(
        `${result.item.name} ${result.item.detail} ${context}`,
      );
      return {
        result,
        matches: terms.every((term) => text.includes(term)),
        score: terms.filter((term) => name.includes(term)).length,
      };
    })
    .filter((item) => item.matches)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.result);
}

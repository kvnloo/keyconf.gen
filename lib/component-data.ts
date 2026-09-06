import type { Part, Selection } from './catalog';
import type { Build } from './build';

export const catalogObservedAt = 'September 5–6, 2026';
const q1Max =
  'https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard';
const q1He =
  'https://www.keychron.com/products/keychron-q1-he-qmk-wireless-custom-keyboard';
const q1He8k =
  'https://www.keychron.com/products/keychron-q1-he-8k-magnetic-switch-keyboard';
const lime =
  'https://www.keychron.com/products/keychron-ultra-fast-lime-magnetic-switch';
const nk65 = 'https://novelkeys.com/products/nk65-entry-edition';
const doubleRail =
  'https://www.keychron.com/products/gateron-double-rail-magnetic-switch';
const gPro = 'https://www.gateron.com/products/gateron-g-pro-30-switch-set';

export type Assembly = Pick<Build, 'layout' | 'finish'> & {
  id: string;
  name: string;
  brand: string;
  mount: string;
  source: string;
  note: string;
  availability: 'reference' | 'retired';
  suppliedKeycaps?: true;
  selection: Selection;
};
const contactChoices = {
  switch: 'oil-king',
  keycaps: 'keychron-bow',
};
export const assemblies: Assembly[] = [
  {
    id: 'q1-he-8k',
    suppliedKeycaps: true,
    name: 'Q1 HE 8K',
    brand: 'Keychron',
    layout: '75',
    finish: 'Aluminum',
    mount: 'Factory assembly',
    availability: 'reference',
    source: q1He8k,
    note: 'Wired 75% · up to 8,000 Hz polling, not measured latency. September 6, 2026: Keychron lists Jade support in one section and Lime-only in another; Jade fit remains unresolved here.',
    selection: {
      case: 'q1-he-8k-case',
      pcb: 'q1-he-8k-pcb',
      plate: 'q1-he-8k-plate',
      stabilizers: 'q1-he-8k-stabs',
      switch: 'ultrafast-lime',
      keycaps: 'q1-he-8k-caps',
    },
  },
  {
    id: 'tofu60',
    name: 'Tofu60 Redux',
    brand: 'KBDfans',
    layout: '60',
    finish: 'Aluminum',
    mount: 'Tray mount',
    availability: 'reference',
    source: 'https://kbdfans.com/products/tofu60-redux-plate',
    note: 'Redux PCB and plate references. Check revisions and the documented stabilizer exclusions.',
    selection: {
      ...contactChoices,
      case: 'tofu-case',
      pcb: 'redux-pcb',
      plate: 'redux-plate',
      stabilizers: 'clip-stabs',
    },
  },
  {
    id: 'bakeneko60',
    name: 'Bakeneko60',
    brand: 'CannonKeys',
    layout: '60',
    finish: 'Aluminum',
    mount: 'O-ring mount',
    availability: 'reference',
    source: 'https://docs.cannonkeys.com/bakeneko/',
    note: 'AN-C V2 solder build from the guide. Clip-in stabilizers leave room for the O-ring.',
    selection: {
      ...contactChoices,
      case: 'bakeneko-case',
      pcb: 'anc-pcb',
      plate: 'bakeneko-plate',
      stabilizers: 'clip-stabs',
    },
  },
  {
    id: 'nk65-entry',
    name: 'NK65 Entry Edition',
    brand: 'NovelKeys',
    layout: '65',
    finish: 'Polycarbonate',
    mount: 'Kit assembly',
    availability: 'retired',
    source: nk65,
    note: 'Retired product reference. The current archive describes a polycarbonate case and plate, MX hot-swap PCB and plate-mounted stabilizers.',
    selection: {
      ...contactChoices,
      case: 'nk65-case',
      pcb: 'nk65-pcb',
      plate: 'nk65-plate',
      stabilizers: 'nk65-stabs',
    },
  },
  {
    id: 'q1-max',
    name: 'Q1 Max',
    brand: 'Keychron',
    layout: '75',
    finish: 'Aluminum',
    mount: 'Double gasket',
    availability: 'reference',
    source: q1Max,
    note: 'Mechanical Q1 Max assembly. 1,000 Hz wired and 2.4 GHz; 90 Hz Bluetooth, per Keychron. Bundled parts are references, not separate offers.',
    selection: {
      ...contactChoices,
      case: 'q1-max-case',
      pcb: 'q1-max-pcb',
      plate: 'q1-max-plate',
      stabilizers: 'q1-max-stabs',
    },
  },
  {
    id: 'q1-he',
    name: 'Q1 HE',
    brand: 'Keychron',
    layout: '75',
    finish: 'Aluminum',
    mount: 'Double gasket',
    availability: 'reference',
    source: q1He,
    note: 'Original Q1 HE, separate from the HE 8K model. Keychron currently describes TMR sensing and a specific Gateron Double-Rail switch family.',
    selection: {
      case: 'q1-he-case',
      pcb: 'q1-he-pcb',
      plate: 'q1-he-plate',
      stabilizers: 'q1-he-stabs',
      switch: 'double-rail-nebula',
      keycaps: 'keychron-bow',
    },
  },
];

const kitParts: {
  id: string;
  name: string;
  brand: string;
  source: string;
  family: string;
  category: Part['category'];
  detail: string;
}[] = [
  {
    id: 'q1-he-8k-case',
    name: 'Q1 HE 8K case',
    brand: 'Keychron',
    source: q1He8k,
    family: 'q1-he-8k',
    category: 'case',
    detail: 'Factory component · aluminum · 75%',
  },
  {
    id: 'q1-he-8k-pcb',
    name: 'Q1 HE 8K PCB',
    brand: 'Keychron',
    source: q1He8k,
    family: 'q1-he-8k',
    category: 'pcb',
    detail: 'Factory component · wired magnetic · 1,000/2,000/8,000 Hz polling',
  },
  {
    id: 'q1-he-8k-plate',
    name: 'Q1 HE 8K plate',
    brand: 'Keychron',
    source: q1He8k,
    family: 'q1-he-8k',
    category: 'plate',
    detail: 'Factory component · aluminum plate',
  },
  {
    id: 'q1-he-8k-stabs',
    name: 'Q1 HE 8K factory stabilizers',
    brand: 'Keychron',
    source: q1He8k,
    family: 'screw',
    category: 'stabilizers',
    detail: 'Factory component · PCB screw-in',
  },
  {
    id: 'q1-he-8k-caps',
    name: 'Q1 HE 8K factory keycaps',
    brand: 'Keychron',
    source: q1He8k,
    family: 'mx',
    category: 'keycaps',
    detail:
      'Factory component · OSA profile · double-shot PBT; verify exact layout variant',
  },
  {
    id: 'ultrafast-lime',
    name: 'Ultra-Fast Lime Magnetic',
    brand: 'Keychron',
    source: lime,
    family: 'keychron-ultrafast',
    category: 'switch',
    detail:
      'Magnetic · manufacturer-listed for Q HE 8K; not a mechanical contact switch',
  },
  {
    id: 'nk65-case',
    name: 'NK65 Entry case',
    brand: 'NovelKeys',
    source: nk65,
    family: 'nk65-entry',
    category: 'case',
    detail: '65% · injection-molded polycarbonate · retired kit',
  },
  {
    id: 'nk65-pcb',
    name: 'NK65 Entry PCB',
    brand: 'NovelKeys',
    source: nk65,
    family: 'nk65-entry',
    category: 'pcb',
    detail: 'Kit component · fixed 65% · 3/5-pin MX hot-swap · VIA',
  },
  {
    id: 'nk65-plate',
    name: 'NK65 Entry plate',
    brand: 'NovelKeys',
    source: nk65,
    family: 'nk65-entry',
    category: 'plate',
    detail: 'Kit component · polycarbonate in the archived listing',
  },
  {
    id: 'nk65-stabs',
    name: 'NK65 kit stabilizers',
    brand: 'NovelKeys',
    source: nk65,
    family: 'plate-mount',
    category: 'stabilizers',
    detail: 'Included NK plate-mounted stabilizers · NK65 Entry',
  },
  {
    id: 'q1-max-case',
    name: 'Q1 Max case',
    brand: 'Keychron',
    source: q1Max,
    family: 'q1-max',
    category: 'case',
    detail: 'Assembly component · 75% · CNC 6063 aluminum',
  },
  {
    id: 'q1-max-pcb',
    name: 'Q1 Max PCB',
    brand: 'Keychron',
    source: q1Max,
    family: 'q1-max',
    category: 'pcb',
    detail: 'Assembly component · 3/5-pin MX contact hot-swap · QMK',
  },
  {
    id: 'q1-max-plate',
    name: 'Q1 Max PC plate',
    brand: 'Keychron',
    source: q1Max,
    family: 'q1-max',
    category: 'plate',
    detail: 'Assembly component · polycarbonate · double gasket',
  },
  {
    id: 'q1-max-stabs',
    name: 'Q1 Max factory stabilizers',
    brand: 'Keychron',
    source: q1Max,
    family: 'screw',
    category: 'stabilizers',
    detail: 'Assembly component · PCB-mounted screw-in stabilizers',
  },
  {
    id: 'q1-he-case',
    name: 'Q1 HE case',
    brand: 'Keychron',
    source: q1He,
    family: 'q1-he',
    category: 'case',
    detail: 'Original Q1 HE assembly · 75% · aluminum',
  },
  {
    id: 'q1-he-pcb',
    name: 'Q1 HE sensor PCB',
    brand: 'Keychron',
    source: q1He,
    family: 'q1-he',
    category: 'pcb',
    detail: 'Original Q1 HE assembly · Gateron Double-Rail compatibility only',
  },
  {
    id: 'q1-he-plate',
    name: 'Q1 HE aluminum plate',
    brand: 'Keychron',
    source: q1He,
    family: 'q1-he',
    category: 'plate',
    detail: 'Included in the original Q1 HE fully assembled keyboard',
  },
  {
    id: 'q1-he-stabs',
    name: 'Q1 HE factory stabilizers',
    brand: 'Keychron',
    source: q1He,
    family: 'screw',
    category: 'stabilizers',
    detail: 'Original Q1 HE assembly · screw-in PCB stabilizers',
  },
];

export const extraParts: Part[] = [
  ...kitParts.map((part): Part => ({ ...part, evidence: 'documented' })),
  {
    id: 'oil-king',
    name: 'Oil King',
    brand: 'Gateron',
    category: 'switch',
    family: 'mx',
    evidence: 'documented',
    detail:
      'Linear · 55 ± 5 gf operating · 4 mm travel · 5-pin · factory lubed',
    source:
      'https://www.gateron.com/products/gateron-oil-king-pre-lubed-switches-linear',
  },
  ...[
    ['white', 'White', 'Linear · 38 ± 15 gf'],
    ['silver', 'Silver', 'Linear · 45 ± 15 gf · 1.2 mm nominal pre-travel'],
    ['red', 'Red', 'Linear · 45 ± 15 gf'],
    ['yellow', 'Yellow', 'Linear · 50 ± 15 gf'],
    ['black', 'Black', 'Linear · 60 ± 15 gf'],
    ['brown', 'Brown', 'Tactile · 55 ± 15 gf'],
    ['blue', 'Blue', 'Clicky · 60 ± 15 gf'],
  ].map(
    ([id, name, detail]): Part => ({
      id: 'g-pro-3-' + id,
      name: 'G Pro 3.0 ' + name,
      brand: 'Gateron',
      category: 'switch',
      family: 'mx',
      evidence: 'documented',
      source: gPro,
      detail:
        detail + ' · 3/5-pin variants; select the exact pack before buying',
    }),
  ),
  ...['Dawn', 'Nebula', 'Aurora'].map(
    (name): Part => ({
      id: 'double-rail-' + name.toLowerCase(),
      name: 'Double-Rail Magnetic ' + name,
      brand: 'Gateron',
      category: 'switch',
      family: 'keychron-double-rail',
      evidence: 'documented',
      source: doubleRail,
      detail:
        'Linear magnetic · Keychron-listed family for original Q HE; excludes Q HE 8K',
    }),
  ),
  ...['Jade', 'KS-20'].map(
    (name): Part => ({
      id: 'magnetic-' + name.toLowerCase(),
      name: 'Magnetic ' + name,
      brand: 'Gateron',
      category: 'switch',
      family: 'he',
      evidence: 'documented',
      source: q1He,
      detail:
        'Magnetic switch reference · explicitly excluded from original Q1 HE compatibility',
    }),
  ),
  {
    id: 'keychron-bow',
    name: 'Cherry PBT Black on White',
    brand: 'Keychron',
    category: 'keycaps',
    family: 'mx',
    evidence: 'documented',
    source:
      'https://www.keychron.com/collections/cherry-profile-double-shot-pbt-keycaps/products/cherry-profile-double-shot-pbt-full-set-keycaps-black-on-white-bow',
    detail:
      '218 keys · double-shot PBT · 1.5 mm · Cherry profile · MX stems · ANSI / ISO-UK',
  },
  {
    id: 'keychron-hacker',
    name: 'Cherry PBT Hacker Mint',
    brand: 'Keychron',
    category: 'keycaps',
    family: 'mx',
    evidence: 'documented',
    source:
      'https://www.keychron.com/collections/cherry-profile-double-shot-pbt-keycaps/products/double-shot-pbt-cherry-full-set-keycap-set-hacker',
    detail:
      '218 keys · double-shot PBT · 1.5 mm · Cherry profile · MX stems · ANSI / ISO-UK',
  },
  {
    id: 'keychron-shine',
    name: 'Cherry PBT Shine-Through',
    brand: 'Keychron',
    category: 'keycaps',
    family: 'mx',
    evidence: 'documented',
    source:
      'https://www.keychron.com/products/cherry-profile-double-shot-pbt-shine-through-keycap-set',
    detail:
      '121 keys · PBT · Cherry profile · MX stems · ANSI · no Scroll Lock or Pause Break keys',
  },
];

export type SwitchInterface =
  | 'mx-contact'
  | 'keychron-double-rail'
  | 'keychron-ultrafast'
  | 'other-magnetic';
export const pcbInterfaces: Record<string, SwitchInterface> = {
  'redux-pcb': 'mx-contact',
  'anc-pcb': 'mx-contact',
  'nk65-pcb': 'mx-contact',
  'q1-max-pcb': 'mx-contact',
  'q1-he-pcb': 'keychron-double-rail',
  'q1-he-8k-pcb': 'keychron-ultrafast',
};
export function switchInterface(part: Part): SwitchInterface | undefined {
  if (part.category !== 'switch' || part.evidence !== 'documented') return;
  if (part.family === 'mx') return 'mx-contact';
  if (part.family === 'keychron-double-rail') return 'keychron-double-rail';
  if (part.family === 'keychron-ultrafast') return 'keychron-ultrafast';
  if (part.family === 'he') return 'other-magnetic';
}

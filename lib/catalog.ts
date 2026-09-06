import {
  assemblies,
  extraParts,
  pcbInterfaces,
  switchInterface,
} from './component-data.ts';
export type Category =
  | 'case'
  | 'pcb'
  | 'plate'
  | 'switch'
  | 'keycaps'
  | 'stabilizers';
export type Part = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  detail: string;
  source: string;
  family: string;
  evidence: 'documented' | 'unknown';
};
export const catalog: Part[] = [
  ...extraParts,
  {
    id: 'tofu-case',
    name: 'Tofu60 Redux',
    brand: 'KBDfans',
    category: 'case',
    detail: '60% · tray mount · aluminum case',
    source: 'https://kbdfans.com/products/tofu60-redux-case',
    family: 'tofu60',
    evidence: 'documented',
  },
  {
    id: 'bakeneko-case',
    name: 'Bakeneko60',
    brand: 'CannonKeys',
    category: 'case',
    detail: '60% · O-ring mount · kit',
    source: 'https://docs.cannonkeys.com/bakeneko/',
    family: 'bakeneko60',
    evidence: 'documented',
  },
  {
    id: 'redux-pcb',
    name: 'Redux 60 RGB ANSI PCB',
    brand: 'KBDfans',
    category: 'pcb',
    detail: 'Named compatible PCB for the Redux plate',
    source: 'https://kbdfans.com/products/tofu60-redux-plate',
    family: 'tofu60',
    evidence: 'documented',
  },
  {
    id: 'anc-pcb',
    name: 'AN-C V2',
    brand: 'CannonKeys',
    category: 'pcb',
    detail: 'Solder PCB · Bakeneko60 build guide',
    source: 'https://docs.cannonkeys.com/bakeneko/',
    family: 'bakeneko60',
    evidence: 'documented',
  },
  {
    id: 'redux-plate',
    name: 'Tofu60 Redux plate',
    brand: 'KBDfans',
    category: 'plate',
    detail: '60% ANSI · explicit stabilizer exclusions',
    source: 'https://kbdfans.com/products/tofu60-redux-plate',
    family: 'tofu60',
    evidence: 'documented',
  },
  {
    id: 'bakeneko-plate',
    name: 'Bakeneko60 kit plate',
    brand: 'CannonKeys',
    category: 'plate',
    detail: 'Designed for the Bakeneko60 O-ring mount',
    source: 'https://docs.cannonkeys.com/bakeneko/',
    family: 'bakeneko60',
    evidence: 'documented',
  },
  {
    id: 'mx-switch',
    name: 'MX mechanical switch',
    brand: 'Specification',
    category: 'switch',
    detail: 'Choose a product to verify pins and clearances',
    source:
      'https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard',
    family: 'mx',
    evidence: 'unknown',
  },
  {
    id: 'he-switch',
    name: 'Dual-rail Magnetic Orange',
    brand: 'Gateron',
    category: 'switch',
    detail: 'Hall-effect · requires a matching magnetic PCB',
    source:
      'https://www.gateron.com/u_file/2506/10/file/GATERONDual-railMagneticOrangeSwitchSPEC-KS-20U-005KS-20UO10B045NW-X14.pdf',
    family: 'he',
    evidence: 'documented',
  },
  {
    id: 'cherry-caps',
    name: 'Cherry-profile keycap kit',
    brand: 'Specification',
    category: 'keycaps',
    detail: 'Exact kit inventory and row coverage unverified',
    source:
      'https://www.gmk-electronic-design.de/fileadmin/user_upload/faq/Guidelines_for_Custom_GMK_Keycap_Set_14.pdf',
    family: 'mx',
    evidence: 'unknown',
  },
  {
    id: 'clip-stabs',
    name: 'Cherry-style clip-in stabilizers',
    brand: 'Specification',
    category: 'stabilizers',
    detail: '4 × 2u + 1 × 6.25u for Bakeneko60',
    source: 'https://docs.cannonkeys.com/bakeneko/',
    family: 'clip',
    evidence: 'documented',
  },
  {
    id: 'durock-stabs',
    name: 'Durock screw-in stabilizers',
    brand: 'Durock',
    category: 'stabilizers',
    detail: 'Excluded by the Redux plate; interferes with Bakeneko mount',
    source: 'https://kbdfans.com/products/tofu60-redux-plate',
    family: 'screw',
    evidence: 'documented',
  },
];
export const categories: Category[] = [
  'case',
  'pcb',
  'plate',
  'switch',
  'keycaps',
  'stabilizers',
];
export type Selection = Record<Category, string>;
export const initialSelection: Selection = {
  case: 'tofu-case',
  pcb: 'redux-pcb',
  plate: 'redux-plate',
  switch: 'mx-switch',
  keycaps: 'cherry-caps',
  stabilizers: 'clip-stabs',
};
export type FitCheck = {
  status: 'documented' | 'incompatible' | 'unknown';
  title: string;
  detail: string;
  source: string;
};
export function checkBuild(
  selection: Selection,
  parts: Part[],
  layout: string,
): FitCheck[] {
  const find = (category: Category) =>
    parts.find((p) => p.id === selection[category] && p.category === category);
  const c = find('case'),
    pcb = find('pcb'),
    plate = find('plate'),
    sw = find('switch'),
    stabs = find('stabilizers'),
    caps = find('keycaps');
  const assembly = assemblies.find(
    (item) =>
      item.selection.case === c?.id &&
      item.selection.pcb === pcb?.id &&
      item.selection.plate === plate?.id &&
      [c, pcb, plate].every((part) => part?.evidence === 'documented'),
  );
  const result: FitCheck[] = [
    {
      status: assembly && assembly.layout === layout ? 'documented' : 'unknown',
      title: assembly
        ? assembly.layout === layout
          ? 'Case, PCB & plate assembly'
          : 'Visual layout differs from the parts'
        : 'Assembly fit needs review',
      detail: assembly
        ? assembly.layout === layout
          ? `Manufacturer documentation identifies this ${assembly.name} assembly. Check its exact revision and variant before ordering.`
          : `The selected parts belong to a ${assembly.layout}% assembly; the scene is set to ${layout}%.`
        : 'A shared percentage does not establish mounting, outline or connector fit. Mixed and imported assemblies need mechanical specifications.',
      source: assembly?.source ?? c?.source ?? '',
    },
  ];
  const pcbInterface =
    pcb?.evidence === 'documented' ? pcbInterfaces[pcb.id] : undefined;
  const swInterface = sw ? switchInterface(sw) : undefined;
  const excluded =
    pcb?.id === 'q1-he-pcb' &&
    ['magnetic-jade', 'magnetic-ks-20'].includes(sw?.id ?? '');
  const electricalConflict =
    pcbInterface &&
    swInterface &&
    (pcbInterface === 'mx-contact') !== (swInterface === 'mx-contact');
  const documentedSwitch =
    pcbInterface &&
    pcbInterface === swInterface &&
    (pcb?.id === 'q1-max-pcb' ||
      pcb?.id === 'nk65-pcb' ||
      pcb?.id === 'q1-he-pcb' ||
      pcb?.id === 'q1-he-8k-pcb');
  result.push({
    status:
      excluded || electricalConflict
        ? 'incompatible'
        : documentedSwitch
          ? 'documented'
          : 'unknown',
    title: excluded
      ? 'This magnetic switch is excluded'
      : 'Switch & PCB interface',
    detail: excluded
      ? 'Keychron explicitly excludes Gateron Magnetic Jade and KS-20 from the original Q1 HE. Magnetic switches are not universally interchangeable.'
      : electricalConflict
        ? 'These parts use different electrical interfaces. A contact switch cannot use this magnetic sensor PCB, and a magnetic switch cannot use this contact PCB.'
        : documentedSwitch
          ? pcbInterface === 'keychron-ultrafast'
            ? 'Keychron lists Ultra-Fast Lime for Q1 HE 8K. Other magnetic families need separate evidence and calibration support.'
            : pcbInterface === 'keychron-double-rail'
              ? 'Keychron lists this Gateron Double-Rail family for the original Q1 HE. This does not extend to the Q1 HE 8K.'
              : 'The manufacturer lists 3/5-pin MX contact switches for this PCB. Check the exact pin variant and housing clearance.'
          : 'Confirm the exact switch family, pin count, sensor support and calibration. A matching stem or magnet is not proof of PCB compatibility.',
    source:
      excluded || documentedSwitch
        ? (pcb?.source ?? '')
        : (sw?.source ?? pcb?.source ?? ''),
  });
  const reduxConflict =
    plate?.id === 'redux-plate' && stabs?.id === 'durock-stabs';
  const oRingConflict = c?.id === 'bakeneko-case' && stabs?.family === 'screw';
  const plateMountConflict =
    assembly?.id === 'nk65-entry' &&
    (stabs?.family === 'screw' || stabs?.family === 'clip');
  const factoryStabs =
    stabs?.evidence === 'documented' &&
    assembly &&
    assembly.selection.stabilizers === stabs?.id &&
    ['nk65-entry', 'q1-max', 'q1-he', 'q1-he-8k', 'bakeneko60'].includes(
      assembly.id,
    );
  result.push({
    status:
      reduxConflict || oRingConflict || plateMountConflict
        ? 'incompatible'
        : factoryStabs
          ? 'documented'
          : 'unknown',
    title:
      reduxConflict || oRingConflict || plateMountConflict
        ? 'Stabilizer interference'
        : 'Stabilizer fit & quantity',
    detail: reduxConflict
      ? 'KBDfans explicitly excludes Durock screw-in stabilizers from this plate.'
      : oRingConflict
        ? 'Screw-in stabilizers interfere with the Bakeneko O-ring mount.'
        : plateMountConflict
          ? 'NK65 Entry uses plate-mounted stabilizers; these selected stabilizers mount to the PCB.'
          : factoryStabs
            ? 'This is the stabilizer reference supplied with the assembly or specified by its build guide. Check the spacebar and replacement-kit revision.'
            : 'Confirm the exact model, mount, wire lengths and clearances. Mount type alone does not establish fit.',
    source: reduxConflict
      ? (plate?.source ?? '')
      : oRingConflict
        ? (c?.source ?? '')
        : factoryStabs
          ? assembly.source
          : (stabs?.source ?? ''),
  });
  result.push({
    status: 'unknown',
    title: 'Keycap kit & row coverage',
    detail:
      caps?.evidence === 'documented'
        ? 'Compare the kit diagram with every key width and sculpted row. MX stems alone do not establish full coverage; Cherry profiles can also interfere with some north-facing switch setups.'
        : 'The exact keycap inventory is unverified. Check stems, modifier widths, spacebar length and sculpted rows.',
    source: caps?.source ?? '',
  });
  return result;
}

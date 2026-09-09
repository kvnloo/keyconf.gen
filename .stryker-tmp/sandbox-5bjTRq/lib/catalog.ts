// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { assemblies, extraParts, pcbInterfaces, switchInterface } from './component-data.ts';
export type Category = 'case' | 'pcb' | 'plate' | 'switch' | 'keycaps' | 'stabilizers';
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
export const catalog: Part[] = stryMutAct_9fa48("7549") ? [] : (stryCov_9fa48("7549"), [...extraParts, stryMutAct_9fa48("7550") ? {} : (stryCov_9fa48("7550"), {
  id: stryMutAct_9fa48("7551") ? "" : (stryCov_9fa48("7551"), 'tofu-case'),
  name: stryMutAct_9fa48("7552") ? "" : (stryCov_9fa48("7552"), 'Tofu60 Redux'),
  brand: stryMutAct_9fa48("7553") ? "" : (stryCov_9fa48("7553"), 'KBDfans'),
  category: stryMutAct_9fa48("7554") ? "" : (stryCov_9fa48("7554"), 'case'),
  detail: stryMutAct_9fa48("7555") ? "" : (stryCov_9fa48("7555"), '60% · tray mount · aluminum case'),
  source: stryMutAct_9fa48("7556") ? "" : (stryCov_9fa48("7556"), 'https://kbdfans.com/products/tofu60-redux-case'),
  family: stryMutAct_9fa48("7557") ? "" : (stryCov_9fa48("7557"), 'tofu60'),
  evidence: stryMutAct_9fa48("7558") ? "" : (stryCov_9fa48("7558"), 'documented')
}), stryMutAct_9fa48("7559") ? {} : (stryCov_9fa48("7559"), {
  id: stryMutAct_9fa48("7560") ? "" : (stryCov_9fa48("7560"), 'bakeneko-case'),
  name: stryMutAct_9fa48("7561") ? "" : (stryCov_9fa48("7561"), 'Bakeneko60'),
  brand: stryMutAct_9fa48("7562") ? "" : (stryCov_9fa48("7562"), 'CannonKeys'),
  category: stryMutAct_9fa48("7563") ? "" : (stryCov_9fa48("7563"), 'case'),
  detail: stryMutAct_9fa48("7564") ? "" : (stryCov_9fa48("7564"), '60% · O-ring mount · kit'),
  source: stryMutAct_9fa48("7565") ? "" : (stryCov_9fa48("7565"), 'https://docs.cannonkeys.com/bakeneko/'),
  family: stryMutAct_9fa48("7566") ? "" : (stryCov_9fa48("7566"), 'bakeneko60'),
  evidence: stryMutAct_9fa48("7567") ? "" : (stryCov_9fa48("7567"), 'documented')
}), stryMutAct_9fa48("7568") ? {} : (stryCov_9fa48("7568"), {
  id: stryMutAct_9fa48("7569") ? "" : (stryCov_9fa48("7569"), 'redux-pcb'),
  name: stryMutAct_9fa48("7570") ? "" : (stryCov_9fa48("7570"), 'Redux 60 RGB ANSI PCB'),
  brand: stryMutAct_9fa48("7571") ? "" : (stryCov_9fa48("7571"), 'KBDfans'),
  category: stryMutAct_9fa48("7572") ? "" : (stryCov_9fa48("7572"), 'pcb'),
  detail: stryMutAct_9fa48("7573") ? "" : (stryCov_9fa48("7573"), 'Named compatible PCB for the Redux plate'),
  source: stryMutAct_9fa48("7574") ? "" : (stryCov_9fa48("7574"), 'https://kbdfans.com/products/tofu60-redux-plate'),
  family: stryMutAct_9fa48("7575") ? "" : (stryCov_9fa48("7575"), 'tofu60'),
  evidence: stryMutAct_9fa48("7576") ? "" : (stryCov_9fa48("7576"), 'documented')
}), stryMutAct_9fa48("7577") ? {} : (stryCov_9fa48("7577"), {
  id: stryMutAct_9fa48("7578") ? "" : (stryCov_9fa48("7578"), 'anc-pcb'),
  name: stryMutAct_9fa48("7579") ? "" : (stryCov_9fa48("7579"), 'AN-C V2'),
  brand: stryMutAct_9fa48("7580") ? "" : (stryCov_9fa48("7580"), 'CannonKeys'),
  category: stryMutAct_9fa48("7581") ? "" : (stryCov_9fa48("7581"), 'pcb'),
  detail: stryMutAct_9fa48("7582") ? "" : (stryCov_9fa48("7582"), 'Solder PCB · Bakeneko60 build guide'),
  source: stryMutAct_9fa48("7583") ? "" : (stryCov_9fa48("7583"), 'https://docs.cannonkeys.com/bakeneko/'),
  family: stryMutAct_9fa48("7584") ? "" : (stryCov_9fa48("7584"), 'bakeneko60'),
  evidence: stryMutAct_9fa48("7585") ? "" : (stryCov_9fa48("7585"), 'documented')
}), stryMutAct_9fa48("7586") ? {} : (stryCov_9fa48("7586"), {
  id: stryMutAct_9fa48("7587") ? "" : (stryCov_9fa48("7587"), 'redux-plate'),
  name: stryMutAct_9fa48("7588") ? "" : (stryCov_9fa48("7588"), 'Tofu60 Redux plate'),
  brand: stryMutAct_9fa48("7589") ? "" : (stryCov_9fa48("7589"), 'KBDfans'),
  category: stryMutAct_9fa48("7590") ? "" : (stryCov_9fa48("7590"), 'plate'),
  detail: stryMutAct_9fa48("7591") ? "" : (stryCov_9fa48("7591"), '60% ANSI · explicit stabilizer exclusions'),
  source: stryMutAct_9fa48("7592") ? "" : (stryCov_9fa48("7592"), 'https://kbdfans.com/products/tofu60-redux-plate'),
  family: stryMutAct_9fa48("7593") ? "" : (stryCov_9fa48("7593"), 'tofu60'),
  evidence: stryMutAct_9fa48("7594") ? "" : (stryCov_9fa48("7594"), 'documented')
}), stryMutAct_9fa48("7595") ? {} : (stryCov_9fa48("7595"), {
  id: stryMutAct_9fa48("7596") ? "" : (stryCov_9fa48("7596"), 'bakeneko-plate'),
  name: stryMutAct_9fa48("7597") ? "" : (stryCov_9fa48("7597"), 'Bakeneko60 kit plate'),
  brand: stryMutAct_9fa48("7598") ? "" : (stryCov_9fa48("7598"), 'CannonKeys'),
  category: stryMutAct_9fa48("7599") ? "" : (stryCov_9fa48("7599"), 'plate'),
  detail: stryMutAct_9fa48("7600") ? "" : (stryCov_9fa48("7600"), 'Designed for the Bakeneko60 O-ring mount'),
  source: stryMutAct_9fa48("7601") ? "" : (stryCov_9fa48("7601"), 'https://docs.cannonkeys.com/bakeneko/'),
  family: stryMutAct_9fa48("7602") ? "" : (stryCov_9fa48("7602"), 'bakeneko60'),
  evidence: stryMutAct_9fa48("7603") ? "" : (stryCov_9fa48("7603"), 'documented')
}), stryMutAct_9fa48("7604") ? {} : (stryCov_9fa48("7604"), {
  id: stryMutAct_9fa48("7605") ? "" : (stryCov_9fa48("7605"), 'mx-switch'),
  name: stryMutAct_9fa48("7606") ? "" : (stryCov_9fa48("7606"), 'MX mechanical switch'),
  brand: stryMutAct_9fa48("7607") ? "" : (stryCov_9fa48("7607"), 'Specification'),
  category: stryMutAct_9fa48("7608") ? "" : (stryCov_9fa48("7608"), 'switch'),
  detail: stryMutAct_9fa48("7609") ? "" : (stryCov_9fa48("7609"), 'Choose a product to verify pins and clearances'),
  source: stryMutAct_9fa48("7610") ? "" : (stryCov_9fa48("7610"), 'https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard'),
  family: stryMutAct_9fa48("7611") ? "" : (stryCov_9fa48("7611"), 'mx'),
  evidence: stryMutAct_9fa48("7612") ? "" : (stryCov_9fa48("7612"), 'unknown')
}), stryMutAct_9fa48("7613") ? {} : (stryCov_9fa48("7613"), {
  id: stryMutAct_9fa48("7614") ? "" : (stryCov_9fa48("7614"), 'he-switch'),
  name: stryMutAct_9fa48("7615") ? "" : (stryCov_9fa48("7615"), 'Dual-rail Magnetic Orange'),
  brand: stryMutAct_9fa48("7616") ? "" : (stryCov_9fa48("7616"), 'Gateron'),
  category: stryMutAct_9fa48("7617") ? "" : (stryCov_9fa48("7617"), 'switch'),
  detail: stryMutAct_9fa48("7618") ? "" : (stryCov_9fa48("7618"), 'Hall-effect · requires a matching magnetic PCB'),
  source: stryMutAct_9fa48("7619") ? "" : (stryCov_9fa48("7619"), 'https://www.gateron.com/u_file/2506/10/file/GATERONDual-railMagneticOrangeSwitchSPEC-KS-20U-005KS-20UO10B045NW-X14.pdf'),
  family: stryMutAct_9fa48("7620") ? "" : (stryCov_9fa48("7620"), 'he'),
  evidence: stryMutAct_9fa48("7621") ? "" : (stryCov_9fa48("7621"), 'documented')
}), stryMutAct_9fa48("7622") ? {} : (stryCov_9fa48("7622"), {
  id: stryMutAct_9fa48("7623") ? "" : (stryCov_9fa48("7623"), 'cherry-caps'),
  name: stryMutAct_9fa48("7624") ? "" : (stryCov_9fa48("7624"), 'Cherry-profile keycap kit'),
  brand: stryMutAct_9fa48("7625") ? "" : (stryCov_9fa48("7625"), 'Specification'),
  category: stryMutAct_9fa48("7626") ? "" : (stryCov_9fa48("7626"), 'keycaps'),
  detail: stryMutAct_9fa48("7627") ? "" : (stryCov_9fa48("7627"), 'Exact kit inventory and row coverage unverified'),
  source: stryMutAct_9fa48("7628") ? "" : (stryCov_9fa48("7628"), 'https://www.gmk-electronic-design.de/fileadmin/user_upload/faq/Guidelines_for_Custom_GMK_Keycap_Set_14.pdf'),
  family: stryMutAct_9fa48("7629") ? "" : (stryCov_9fa48("7629"), 'mx'),
  evidence: stryMutAct_9fa48("7630") ? "" : (stryCov_9fa48("7630"), 'unknown')
}), stryMutAct_9fa48("7631") ? {} : (stryCov_9fa48("7631"), {
  id: stryMutAct_9fa48("7632") ? "" : (stryCov_9fa48("7632"), 'clip-stabs'),
  name: stryMutAct_9fa48("7633") ? "" : (stryCov_9fa48("7633"), 'Cherry-style clip-in stabilizers'),
  brand: stryMutAct_9fa48("7634") ? "" : (stryCov_9fa48("7634"), 'Specification'),
  category: stryMutAct_9fa48("7635") ? "" : (stryCov_9fa48("7635"), 'stabilizers'),
  detail: stryMutAct_9fa48("7636") ? "" : (stryCov_9fa48("7636"), '4 × 2u + 1 × 6.25u for Bakeneko60'),
  source: stryMutAct_9fa48("7637") ? "" : (stryCov_9fa48("7637"), 'https://docs.cannonkeys.com/bakeneko/'),
  family: stryMutAct_9fa48("7638") ? "" : (stryCov_9fa48("7638"), 'clip'),
  evidence: stryMutAct_9fa48("7639") ? "" : (stryCov_9fa48("7639"), 'documented')
}), stryMutAct_9fa48("7640") ? {} : (stryCov_9fa48("7640"), {
  id: stryMutAct_9fa48("7641") ? "" : (stryCov_9fa48("7641"), 'durock-stabs'),
  name: stryMutAct_9fa48("7642") ? "" : (stryCov_9fa48("7642"), 'Durock screw-in stabilizers'),
  brand: stryMutAct_9fa48("7643") ? "" : (stryCov_9fa48("7643"), 'Durock'),
  category: stryMutAct_9fa48("7644") ? "" : (stryCov_9fa48("7644"), 'stabilizers'),
  detail: stryMutAct_9fa48("7645") ? "" : (stryCov_9fa48("7645"), 'Excluded by the Redux plate; interferes with Bakeneko mount'),
  source: stryMutAct_9fa48("7646") ? "" : (stryCov_9fa48("7646"), 'https://kbdfans.com/products/tofu60-redux-plate'),
  family: stryMutAct_9fa48("7647") ? "" : (stryCov_9fa48("7647"), 'screw'),
  evidence: stryMutAct_9fa48("7648") ? "" : (stryCov_9fa48("7648"), 'documented')
})]);
export const categories: Category[] = stryMutAct_9fa48("7649") ? [] : (stryCov_9fa48("7649"), [stryMutAct_9fa48("7650") ? "" : (stryCov_9fa48("7650"), 'case'), stryMutAct_9fa48("7651") ? "" : (stryCov_9fa48("7651"), 'pcb'), stryMutAct_9fa48("7652") ? "" : (stryCov_9fa48("7652"), 'plate'), stryMutAct_9fa48("7653") ? "" : (stryCov_9fa48("7653"), 'switch'), stryMutAct_9fa48("7654") ? "" : (stryCov_9fa48("7654"), 'keycaps'), stryMutAct_9fa48("7655") ? "" : (stryCov_9fa48("7655"), 'stabilizers')]);
export type Selection = Record<Category, string>;
export const initialSelection: Selection = stryMutAct_9fa48("7656") ? {} : (stryCov_9fa48("7656"), {
  case: stryMutAct_9fa48("7657") ? "" : (stryCov_9fa48("7657"), 'tofu-case'),
  pcb: stryMutAct_9fa48("7658") ? "" : (stryCov_9fa48("7658"), 'redux-pcb'),
  plate: stryMutAct_9fa48("7659") ? "" : (stryCov_9fa48("7659"), 'redux-plate'),
  switch: stryMutAct_9fa48("7660") ? "" : (stryCov_9fa48("7660"), 'mx-switch'),
  keycaps: stryMutAct_9fa48("7661") ? "" : (stryCov_9fa48("7661"), 'cherry-caps'),
  stabilizers: stryMutAct_9fa48("7662") ? "" : (stryCov_9fa48("7662"), 'clip-stabs')
});
export type FitCheck = {
  status: 'documented' | 'incompatible' | 'unknown';
  title: string;
  detail: string;
  source: string;
};
export function checkBuild(selection: Selection, parts: Part[], layout: string): FitCheck[] {
  if (stryMutAct_9fa48("7663")) {
    {}
  } else {
    stryCov_9fa48("7663");
    const find = stryMutAct_9fa48("7664") ? () => undefined : (stryCov_9fa48("7664"), (() => {
      const find = (category: Category) => parts.find(stryMutAct_9fa48("7665") ? () => undefined : (stryCov_9fa48("7665"), p => stryMutAct_9fa48("7668") ? p.id === selection[category] || p.category === category : stryMutAct_9fa48("7667") ? false : stryMutAct_9fa48("7666") ? true : (stryCov_9fa48("7666", "7667", "7668"), (stryMutAct_9fa48("7670") ? p.id !== selection[category] : stryMutAct_9fa48("7669") ? true : (stryCov_9fa48("7669", "7670"), p.id === selection[category])) && (stryMutAct_9fa48("7672") ? p.category !== category : stryMutAct_9fa48("7671") ? true : (stryCov_9fa48("7671", "7672"), p.category === category)))));
      return find;
    })());
    const c = find(stryMutAct_9fa48("7673") ? "" : (stryCov_9fa48("7673"), 'case')),
      pcb = find(stryMutAct_9fa48("7674") ? "" : (stryCov_9fa48("7674"), 'pcb')),
      plate = find(stryMutAct_9fa48("7675") ? "" : (stryCov_9fa48("7675"), 'plate')),
      sw = find(stryMutAct_9fa48("7676") ? "" : (stryCov_9fa48("7676"), 'switch')),
      stabs = find(stryMutAct_9fa48("7677") ? "" : (stryCov_9fa48("7677"), 'stabilizers')),
      caps = find(stryMutAct_9fa48("7678") ? "" : (stryCov_9fa48("7678"), 'keycaps'));
    const assembly = assemblies.find(stryMutAct_9fa48("7679") ? () => undefined : (stryCov_9fa48("7679"), item => stryMutAct_9fa48("7682") ? item.selection.case === c?.id && item.selection.pcb === pcb?.id && item.selection.plate === plate?.id || [c, pcb, plate].every(part => part?.evidence === 'documented') : stryMutAct_9fa48("7681") ? false : stryMutAct_9fa48("7680") ? true : (stryCov_9fa48("7680", "7681", "7682"), (stryMutAct_9fa48("7684") ? item.selection.case === c?.id && item.selection.pcb === pcb?.id || item.selection.plate === plate?.id : stryMutAct_9fa48("7683") ? true : (stryCov_9fa48("7683", "7684"), (stryMutAct_9fa48("7686") ? item.selection.case === c?.id || item.selection.pcb === pcb?.id : stryMutAct_9fa48("7685") ? true : (stryCov_9fa48("7685", "7686"), (stryMutAct_9fa48("7688") ? item.selection.case !== c?.id : stryMutAct_9fa48("7687") ? true : (stryCov_9fa48("7687", "7688"), item.selection.case === (stryMutAct_9fa48("7689") ? c.id : (stryCov_9fa48("7689"), c?.id)))) && (stryMutAct_9fa48("7691") ? item.selection.pcb !== pcb?.id : stryMutAct_9fa48("7690") ? true : (stryCov_9fa48("7690", "7691"), item.selection.pcb === (stryMutAct_9fa48("7692") ? pcb.id : (stryCov_9fa48("7692"), pcb?.id)))))) && (stryMutAct_9fa48("7694") ? item.selection.plate !== plate?.id : stryMutAct_9fa48("7693") ? true : (stryCov_9fa48("7693", "7694"), item.selection.plate === (stryMutAct_9fa48("7695") ? plate.id : (stryCov_9fa48("7695"), plate?.id)))))) && (stryMutAct_9fa48("7696") ? [c, pcb, plate].some(part => part?.evidence === 'documented') : (stryCov_9fa48("7696"), (stryMutAct_9fa48("7697") ? [] : (stryCov_9fa48("7697"), [c, pcb, plate])).every(stryMutAct_9fa48("7698") ? () => undefined : (stryCov_9fa48("7698"), part => stryMutAct_9fa48("7701") ? part?.evidence !== 'documented' : stryMutAct_9fa48("7700") ? false : stryMutAct_9fa48("7699") ? true : (stryCov_9fa48("7699", "7700", "7701"), (stryMutAct_9fa48("7702") ? part.evidence : (stryCov_9fa48("7702"), part?.evidence)) === (stryMutAct_9fa48("7703") ? "" : (stryCov_9fa48("7703"), 'documented'))))))))));
    const result: FitCheck[] = stryMutAct_9fa48("7704") ? [] : (stryCov_9fa48("7704"), [stryMutAct_9fa48("7705") ? {} : (stryCov_9fa48("7705"), {
      status: (stryMutAct_9fa48("7708") ? assembly || assembly.layout === layout : stryMutAct_9fa48("7707") ? false : stryMutAct_9fa48("7706") ? true : (stryCov_9fa48("7706", "7707", "7708"), assembly && (stryMutAct_9fa48("7710") ? assembly.layout !== layout : stryMutAct_9fa48("7709") ? true : (stryCov_9fa48("7709", "7710"), assembly.layout === layout)))) ? stryMutAct_9fa48("7711") ? "" : (stryCov_9fa48("7711"), 'documented') : stryMutAct_9fa48("7712") ? "" : (stryCov_9fa48("7712"), 'unknown'),
      title: assembly ? (stryMutAct_9fa48("7715") ? assembly.layout !== layout : stryMutAct_9fa48("7714") ? false : stryMutAct_9fa48("7713") ? true : (stryCov_9fa48("7713", "7714", "7715"), assembly.layout === layout)) ? stryMutAct_9fa48("7716") ? "" : (stryCov_9fa48("7716"), 'Case, PCB & plate assembly') : stryMutAct_9fa48("7717") ? "" : (stryCov_9fa48("7717"), 'Visual layout differs from the parts') : stryMutAct_9fa48("7718") ? "" : (stryCov_9fa48("7718"), 'Assembly fit needs review'),
      detail: assembly ? (stryMutAct_9fa48("7721") ? assembly.layout !== layout : stryMutAct_9fa48("7720") ? false : stryMutAct_9fa48("7719") ? true : (stryCov_9fa48("7719", "7720", "7721"), assembly.layout === layout)) ? stryMutAct_9fa48("7722") ? `` : (stryCov_9fa48("7722"), `Manufacturer documentation identifies this ${assembly.name} assembly. Check its exact revision and variant before ordering.`) : stryMutAct_9fa48("7723") ? `` : (stryCov_9fa48("7723"), `The selected parts belong to a ${assembly.layout}% assembly; the scene is set to ${layout}%.`) : stryMutAct_9fa48("7724") ? "" : (stryCov_9fa48("7724"), 'A shared percentage does not establish mounting, outline or connector fit. Mixed and imported assemblies need mechanical specifications.'),
      source: stryMutAct_9fa48("7725") ? (assembly?.source ?? c?.source) && '' : (stryCov_9fa48("7725"), (stryMutAct_9fa48("7726") ? assembly?.source && c?.source : (stryCov_9fa48("7726"), (stryMutAct_9fa48("7727") ? assembly.source : (stryCov_9fa48("7727"), assembly?.source)) ?? (stryMutAct_9fa48("7728") ? c.source : (stryCov_9fa48("7728"), c?.source)))) ?? (stryMutAct_9fa48("7729") ? "Stryker was here!" : (stryCov_9fa48("7729"), '')))
    })]);
    const pcbInterface = (stryMutAct_9fa48("7732") ? pcb?.evidence !== 'documented' : stryMutAct_9fa48("7731") ? false : stryMutAct_9fa48("7730") ? true : (stryCov_9fa48("7730", "7731", "7732"), (stryMutAct_9fa48("7733") ? pcb.evidence : (stryCov_9fa48("7733"), pcb?.evidence)) === (stryMutAct_9fa48("7734") ? "" : (stryCov_9fa48("7734"), 'documented')))) ? pcbInterfaces[pcb.id] : undefined;
    const swInterface = sw ? switchInterface(sw) : undefined;
    const excluded = stryMutAct_9fa48("7737") ? pcb?.id === 'q1-he-pcb' || ['magnetic-jade', 'magnetic-ks-20'].includes(sw?.id ?? '') : stryMutAct_9fa48("7736") ? false : stryMutAct_9fa48("7735") ? true : (stryCov_9fa48("7735", "7736", "7737"), (stryMutAct_9fa48("7739") ? pcb?.id !== 'q1-he-pcb' : stryMutAct_9fa48("7738") ? true : (stryCov_9fa48("7738", "7739"), (stryMutAct_9fa48("7740") ? pcb.id : (stryCov_9fa48("7740"), pcb?.id)) === (stryMutAct_9fa48("7741") ? "" : (stryCov_9fa48("7741"), 'q1-he-pcb')))) && (stryMutAct_9fa48("7742") ? [] : (stryCov_9fa48("7742"), [stryMutAct_9fa48("7743") ? "" : (stryCov_9fa48("7743"), 'magnetic-jade'), stryMutAct_9fa48("7744") ? "" : (stryCov_9fa48("7744"), 'magnetic-ks-20')])).includes(stryMutAct_9fa48("7745") ? sw?.id && '' : (stryCov_9fa48("7745"), (stryMutAct_9fa48("7746") ? sw.id : (stryCov_9fa48("7746"), sw?.id)) ?? (stryMutAct_9fa48("7747") ? "Stryker was here!" : (stryCov_9fa48("7747"), '')))));
    const electricalConflict = stryMutAct_9fa48("7750") ? pcbInterface && swInterface || pcbInterface === 'mx-contact' !== (swInterface === 'mx-contact') : stryMutAct_9fa48("7749") ? false : stryMutAct_9fa48("7748") ? true : (stryCov_9fa48("7748", "7749", "7750"), (stryMutAct_9fa48("7752") ? pcbInterface || swInterface : stryMutAct_9fa48("7751") ? true : (stryCov_9fa48("7751", "7752"), pcbInterface && swInterface)) && (stryMutAct_9fa48("7754") ? pcbInterface === 'mx-contact' === (swInterface === 'mx-contact') : stryMutAct_9fa48("7753") ? true : (stryCov_9fa48("7753", "7754"), (stryMutAct_9fa48("7757") ? pcbInterface !== 'mx-contact' : stryMutAct_9fa48("7756") ? false : stryMutAct_9fa48("7755") ? true : (stryCov_9fa48("7755", "7756", "7757"), pcbInterface === (stryMutAct_9fa48("7758") ? "" : (stryCov_9fa48("7758"), 'mx-contact')))) !== (stryMutAct_9fa48("7761") ? swInterface !== 'mx-contact' : stryMutAct_9fa48("7760") ? false : stryMutAct_9fa48("7759") ? true : (stryCov_9fa48("7759", "7760", "7761"), swInterface === (stryMutAct_9fa48("7762") ? "" : (stryCov_9fa48("7762"), 'mx-contact')))))));
    const documentedSwitch = stryMutAct_9fa48("7765") ? pcbInterface && pcbInterface === swInterface || pcb?.id === 'q1-max-pcb' || pcb?.id === 'nk65-pcb' || pcb?.id === 'q1-he-pcb' || pcb?.id === 'q1-he-8k-pcb' : stryMutAct_9fa48("7764") ? false : stryMutAct_9fa48("7763") ? true : (stryCov_9fa48("7763", "7764", "7765"), (stryMutAct_9fa48("7767") ? pcbInterface || pcbInterface === swInterface : stryMutAct_9fa48("7766") ? true : (stryCov_9fa48("7766", "7767"), pcbInterface && (stryMutAct_9fa48("7769") ? pcbInterface !== swInterface : stryMutAct_9fa48("7768") ? true : (stryCov_9fa48("7768", "7769"), pcbInterface === swInterface)))) && (stryMutAct_9fa48("7771") ? (pcb?.id === 'q1-max-pcb' || pcb?.id === 'nk65-pcb' || pcb?.id === 'q1-he-pcb') && pcb?.id === 'q1-he-8k-pcb' : stryMutAct_9fa48("7770") ? true : (stryCov_9fa48("7770", "7771"), (stryMutAct_9fa48("7773") ? (pcb?.id === 'q1-max-pcb' || pcb?.id === 'nk65-pcb') && pcb?.id === 'q1-he-pcb' : stryMutAct_9fa48("7772") ? false : (stryCov_9fa48("7772", "7773"), (stryMutAct_9fa48("7775") ? pcb?.id === 'q1-max-pcb' && pcb?.id === 'nk65-pcb' : stryMutAct_9fa48("7774") ? false : (stryCov_9fa48("7774", "7775"), (stryMutAct_9fa48("7777") ? pcb?.id !== 'q1-max-pcb' : stryMutAct_9fa48("7776") ? false : (stryCov_9fa48("7776", "7777"), (stryMutAct_9fa48("7778") ? pcb.id : (stryCov_9fa48("7778"), pcb?.id)) === (stryMutAct_9fa48("7779") ? "" : (stryCov_9fa48("7779"), 'q1-max-pcb')))) || (stryMutAct_9fa48("7781") ? pcb?.id !== 'nk65-pcb' : stryMutAct_9fa48("7780") ? false : (stryCov_9fa48("7780", "7781"), (stryMutAct_9fa48("7782") ? pcb.id : (stryCov_9fa48("7782"), pcb?.id)) === (stryMutAct_9fa48("7783") ? "" : (stryCov_9fa48("7783"), 'nk65-pcb')))))) || (stryMutAct_9fa48("7785") ? pcb?.id !== 'q1-he-pcb' : stryMutAct_9fa48("7784") ? false : (stryCov_9fa48("7784", "7785"), (stryMutAct_9fa48("7786") ? pcb.id : (stryCov_9fa48("7786"), pcb?.id)) === (stryMutAct_9fa48("7787") ? "" : (stryCov_9fa48("7787"), 'q1-he-pcb')))))) || (stryMutAct_9fa48("7789") ? pcb?.id !== 'q1-he-8k-pcb' : stryMutAct_9fa48("7788") ? false : (stryCov_9fa48("7788", "7789"), (stryMutAct_9fa48("7790") ? pcb.id : (stryCov_9fa48("7790"), pcb?.id)) === (stryMutAct_9fa48("7791") ? "" : (stryCov_9fa48("7791"), 'q1-he-8k-pcb')))))));
    result.push(stryMutAct_9fa48("7793") ? {} : (stryCov_9fa48("7793"), {
      status: (stryMutAct_9fa48("7796") ? excluded && electricalConflict : stryMutAct_9fa48("7795") ? false : stryMutAct_9fa48("7794") ? true : (stryCov_9fa48("7794", "7795", "7796"), excluded || electricalConflict)) ? stryMutAct_9fa48("7797") ? "" : (stryCov_9fa48("7797"), 'incompatible') : documentedSwitch ? stryMutAct_9fa48("7798") ? "" : (stryCov_9fa48("7798"), 'documented') : stryMutAct_9fa48("7799") ? "" : (stryCov_9fa48("7799"), 'unknown'),
      title: excluded ? stryMutAct_9fa48("7800") ? "" : (stryCov_9fa48("7800"), 'This magnetic switch is excluded') : stryMutAct_9fa48("7801") ? "" : (stryCov_9fa48("7801"), 'Switch & PCB interface'),
      detail: excluded ? stryMutAct_9fa48("7802") ? "" : (stryCov_9fa48("7802"), 'Keychron explicitly excludes Gateron Magnetic Jade and KS-20 from the original Q1 HE. Magnetic switches are not universally interchangeable.') : electricalConflict ? stryMutAct_9fa48("7803") ? "" : (stryCov_9fa48("7803"), 'These parts use different electrical interfaces. A contact switch cannot use this magnetic sensor PCB, and a magnetic switch cannot use this contact PCB.') : documentedSwitch ? (stryMutAct_9fa48("7806") ? pcbInterface !== 'keychron-ultrafast' : stryMutAct_9fa48("7805") ? false : stryMutAct_9fa48("7804") ? true : (stryCov_9fa48("7804", "7805", "7806"), pcbInterface === (stryMutAct_9fa48("7807") ? "" : (stryCov_9fa48("7807"), 'keychron-ultrafast')))) ? stryMutAct_9fa48("7808") ? "" : (stryCov_9fa48("7808"), 'Keychron lists Ultra-Fast Lime for Q1 HE 8K. Other magnetic families need separate evidence and calibration support.') : (stryMutAct_9fa48("7811") ? pcbInterface !== 'keychron-double-rail' : stryMutAct_9fa48("7810") ? false : stryMutAct_9fa48("7809") ? true : (stryCov_9fa48("7809", "7810", "7811"), pcbInterface === (stryMutAct_9fa48("7812") ? "" : (stryCov_9fa48("7812"), 'keychron-double-rail')))) ? stryMutAct_9fa48("7813") ? "" : (stryCov_9fa48("7813"), 'Keychron lists this Gateron Double-Rail family for the original Q1 HE. This does not extend to the Q1 HE 8K.') : stryMutAct_9fa48("7814") ? "" : (stryCov_9fa48("7814"), 'The manufacturer lists 3/5-pin MX contact switches for this PCB. Check the exact pin variant and housing clearance.') : stryMutAct_9fa48("7815") ? "" : (stryCov_9fa48("7815"), 'Confirm the exact switch family, pin count, sensor support and calibration. A matching stem or magnet is not proof of PCB compatibility.'),
      source: (stryMutAct_9fa48("7818") ? excluded && documentedSwitch : stryMutAct_9fa48("7817") ? false : stryMutAct_9fa48("7816") ? true : (stryCov_9fa48("7816", "7817", "7818"), excluded || documentedSwitch)) ? stryMutAct_9fa48("7819") ? pcb?.source && '' : (stryCov_9fa48("7819"), (stryMutAct_9fa48("7820") ? pcb.source : (stryCov_9fa48("7820"), pcb?.source)) ?? (stryMutAct_9fa48("7821") ? "Stryker was here!" : (stryCov_9fa48("7821"), ''))) : stryMutAct_9fa48("7822") ? (sw?.source ?? pcb?.source) && '' : (stryCov_9fa48("7822"), (stryMutAct_9fa48("7823") ? sw?.source && pcb?.source : (stryCov_9fa48("7823"), (stryMutAct_9fa48("7824") ? sw.source : (stryCov_9fa48("7824"), sw?.source)) ?? (stryMutAct_9fa48("7825") ? pcb.source : (stryCov_9fa48("7825"), pcb?.source)))) ?? (stryMutAct_9fa48("7826") ? "Stryker was here!" : (stryCov_9fa48("7826"), '')))
    }));
    const reduxConflict = stryMutAct_9fa48("7829") ? plate?.id === 'redux-plate' || stabs?.id === 'durock-stabs' : stryMutAct_9fa48("7828") ? false : stryMutAct_9fa48("7827") ? true : (stryCov_9fa48("7827", "7828", "7829"), (stryMutAct_9fa48("7831") ? plate?.id !== 'redux-plate' : stryMutAct_9fa48("7830") ? true : (stryCov_9fa48("7830", "7831"), (stryMutAct_9fa48("7832") ? plate.id : (stryCov_9fa48("7832"), plate?.id)) === (stryMutAct_9fa48("7833") ? "" : (stryCov_9fa48("7833"), 'redux-plate')))) && (stryMutAct_9fa48("7835") ? stabs?.id !== 'durock-stabs' : stryMutAct_9fa48("7834") ? true : (stryCov_9fa48("7834", "7835"), (stryMutAct_9fa48("7836") ? stabs.id : (stryCov_9fa48("7836"), stabs?.id)) === (stryMutAct_9fa48("7837") ? "" : (stryCov_9fa48("7837"), 'durock-stabs')))));
    const oRingConflict = stryMutAct_9fa48("7840") ? c?.id === 'bakeneko-case' || stabs?.family === 'screw' : stryMutAct_9fa48("7839") ? false : stryMutAct_9fa48("7838") ? true : (stryCov_9fa48("7838", "7839", "7840"), (stryMutAct_9fa48("7842") ? c?.id !== 'bakeneko-case' : stryMutAct_9fa48("7841") ? true : (stryCov_9fa48("7841", "7842"), (stryMutAct_9fa48("7843") ? c.id : (stryCov_9fa48("7843"), c?.id)) === (stryMutAct_9fa48("7844") ? "" : (stryCov_9fa48("7844"), 'bakeneko-case')))) && (stryMutAct_9fa48("7846") ? stabs?.family !== 'screw' : stryMutAct_9fa48("7845") ? true : (stryCov_9fa48("7845", "7846"), (stryMutAct_9fa48("7847") ? stabs.family : (stryCov_9fa48("7847"), stabs?.family)) === (stryMutAct_9fa48("7848") ? "" : (stryCov_9fa48("7848"), 'screw')))));
    const plateMountConflict = stryMutAct_9fa48("7851") ? assembly?.id === 'nk65-entry' || stabs?.family === 'screw' || stabs?.family === 'clip' : stryMutAct_9fa48("7850") ? false : stryMutAct_9fa48("7849") ? true : (stryCov_9fa48("7849", "7850", "7851"), (stryMutAct_9fa48("7853") ? assembly?.id !== 'nk65-entry' : stryMutAct_9fa48("7852") ? true : (stryCov_9fa48("7852", "7853"), (stryMutAct_9fa48("7854") ? assembly.id : (stryCov_9fa48("7854"), assembly?.id)) === (stryMutAct_9fa48("7855") ? "" : (stryCov_9fa48("7855"), 'nk65-entry')))) && (stryMutAct_9fa48("7857") ? stabs?.family === 'screw' && stabs?.family === 'clip' : stryMutAct_9fa48("7856") ? true : (stryCov_9fa48("7856", "7857"), (stryMutAct_9fa48("7859") ? stabs?.family !== 'screw' : stryMutAct_9fa48("7858") ? false : (stryCov_9fa48("7858", "7859"), (stryMutAct_9fa48("7860") ? stabs.family : (stryCov_9fa48("7860"), stabs?.family)) === (stryMutAct_9fa48("7861") ? "" : (stryCov_9fa48("7861"), 'screw')))) || (stryMutAct_9fa48("7863") ? stabs?.family !== 'clip' : stryMutAct_9fa48("7862") ? false : (stryCov_9fa48("7862", "7863"), (stryMutAct_9fa48("7864") ? stabs.family : (stryCov_9fa48("7864"), stabs?.family)) === (stryMutAct_9fa48("7865") ? "" : (stryCov_9fa48("7865"), 'clip')))))));
    const factoryStabs = stryMutAct_9fa48("7868") ? stabs?.evidence === 'documented' && assembly && assembly.selection.stabilizers === stabs?.id || ['nk65-entry', 'q1-max', 'q1-he', 'q1-he-8k', 'bakeneko60'].includes(assembly.id) : stryMutAct_9fa48("7867") ? false : stryMutAct_9fa48("7866") ? true : (stryCov_9fa48("7866", "7867", "7868"), (stryMutAct_9fa48("7870") ? stabs?.evidence === 'documented' && assembly || assembly.selection.stabilizers === stabs?.id : stryMutAct_9fa48("7869") ? true : (stryCov_9fa48("7869", "7870"), (stryMutAct_9fa48("7872") ? stabs?.evidence === 'documented' || assembly : stryMutAct_9fa48("7871") ? true : (stryCov_9fa48("7871", "7872"), (stryMutAct_9fa48("7874") ? stabs?.evidence !== 'documented' : stryMutAct_9fa48("7873") ? true : (stryCov_9fa48("7873", "7874"), (stryMutAct_9fa48("7875") ? stabs.evidence : (stryCov_9fa48("7875"), stabs?.evidence)) === (stryMutAct_9fa48("7876") ? "" : (stryCov_9fa48("7876"), 'documented')))) && assembly)) && (stryMutAct_9fa48("7878") ? assembly.selection.stabilizers !== stabs?.id : stryMutAct_9fa48("7877") ? true : (stryCov_9fa48("7877", "7878"), assembly.selection.stabilizers === (stryMutAct_9fa48("7879") ? stabs.id : (stryCov_9fa48("7879"), stabs?.id)))))) && (stryMutAct_9fa48("7880") ? [] : (stryCov_9fa48("7880"), [stryMutAct_9fa48("7881") ? "" : (stryCov_9fa48("7881"), 'nk65-entry'), stryMutAct_9fa48("7882") ? "" : (stryCov_9fa48("7882"), 'q1-max'), stryMutAct_9fa48("7883") ? "" : (stryCov_9fa48("7883"), 'q1-he'), stryMutAct_9fa48("7884") ? "" : (stryCov_9fa48("7884"), 'q1-he-8k'), stryMutAct_9fa48("7885") ? "" : (stryCov_9fa48("7885"), 'bakeneko60')])).includes(assembly.id));
    result.push(stryMutAct_9fa48("7887") ? {} : (stryCov_9fa48("7887"), {
      status: (stryMutAct_9fa48("7890") ? (reduxConflict || oRingConflict) && plateMountConflict : stryMutAct_9fa48("7889") ? false : stryMutAct_9fa48("7888") ? true : (stryCov_9fa48("7888", "7889", "7890"), (stryMutAct_9fa48("7892") ? reduxConflict && oRingConflict : stryMutAct_9fa48("7891") ? false : (stryCov_9fa48("7891", "7892"), reduxConflict || oRingConflict)) || plateMountConflict)) ? stryMutAct_9fa48("7893") ? "" : (stryCov_9fa48("7893"), 'incompatible') : factoryStabs ? stryMutAct_9fa48("7894") ? "" : (stryCov_9fa48("7894"), 'documented') : stryMutAct_9fa48("7895") ? "" : (stryCov_9fa48("7895"), 'unknown'),
      title: (stryMutAct_9fa48("7898") ? (reduxConflict || oRingConflict) && plateMountConflict : stryMutAct_9fa48("7897") ? false : stryMutAct_9fa48("7896") ? true : (stryCov_9fa48("7896", "7897", "7898"), (stryMutAct_9fa48("7900") ? reduxConflict && oRingConflict : stryMutAct_9fa48("7899") ? false : (stryCov_9fa48("7899", "7900"), reduxConflict || oRingConflict)) || plateMountConflict)) ? stryMutAct_9fa48("7901") ? "" : (stryCov_9fa48("7901"), 'Stabilizer interference') : stryMutAct_9fa48("7902") ? "" : (stryCov_9fa48("7902"), 'Stabilizer fit & quantity'),
      detail: reduxConflict ? stryMutAct_9fa48("7903") ? "" : (stryCov_9fa48("7903"), 'KBDfans explicitly excludes Durock screw-in stabilizers from this plate.') : oRingConflict ? stryMutAct_9fa48("7904") ? "" : (stryCov_9fa48("7904"), 'Screw-in stabilizers interfere with the Bakeneko O-ring mount.') : plateMountConflict ? stryMutAct_9fa48("7905") ? "" : (stryCov_9fa48("7905"), 'NK65 Entry uses plate-mounted stabilizers; these selected stabilizers mount to the PCB.') : factoryStabs ? stryMutAct_9fa48("7906") ? "" : (stryCov_9fa48("7906"), 'This is the stabilizer reference supplied with the assembly or specified by its build guide. Check the spacebar and replacement-kit revision.') : stryMutAct_9fa48("7907") ? "" : (stryCov_9fa48("7907"), 'Confirm the exact model, mount, wire lengths and clearances. Mount type alone does not establish fit.'),
      source: reduxConflict ? stryMutAct_9fa48("7908") ? plate?.source && '' : (stryCov_9fa48("7908"), (stryMutAct_9fa48("7909") ? plate.source : (stryCov_9fa48("7909"), plate?.source)) ?? (stryMutAct_9fa48("7910") ? "Stryker was here!" : (stryCov_9fa48("7910"), ''))) : oRingConflict ? stryMutAct_9fa48("7911") ? c?.source && '' : (stryCov_9fa48("7911"), (stryMutAct_9fa48("7912") ? c.source : (stryCov_9fa48("7912"), c?.source)) ?? (stryMutAct_9fa48("7913") ? "Stryker was here!" : (stryCov_9fa48("7913"), ''))) : factoryStabs ? assembly.source : stryMutAct_9fa48("7914") ? stabs?.source && '' : (stryCov_9fa48("7914"), (stryMutAct_9fa48("7915") ? stabs.source : (stryCov_9fa48("7915"), stabs?.source)) ?? (stryMutAct_9fa48("7916") ? "Stryker was here!" : (stryCov_9fa48("7916"), '')))
    }));
    const suppliedCaps = stryMutAct_9fa48("7919") ? assembly?.suppliedKeycaps && assembly.layout === layout && caps?.id === assembly.selection.keycaps && caps.evidence === 'documented' && sw?.id === assembly.selection.switch || sw.evidence === 'documented' : stryMutAct_9fa48("7918") ? false : stryMutAct_9fa48("7917") ? true : (stryCov_9fa48("7917", "7918", "7919"), (stryMutAct_9fa48("7921") ? assembly?.suppliedKeycaps && assembly.layout === layout && caps?.id === assembly.selection.keycaps && caps.evidence === 'documented' || sw?.id === assembly.selection.switch : stryMutAct_9fa48("7920") ? true : (stryCov_9fa48("7920", "7921"), (stryMutAct_9fa48("7923") ? assembly?.suppliedKeycaps && assembly.layout === layout && caps?.id === assembly.selection.keycaps || caps.evidence === 'documented' : stryMutAct_9fa48("7922") ? true : (stryCov_9fa48("7922", "7923"), (stryMutAct_9fa48("7925") ? assembly?.suppliedKeycaps && assembly.layout === layout || caps?.id === assembly.selection.keycaps : stryMutAct_9fa48("7924") ? true : (stryCov_9fa48("7924", "7925"), (stryMutAct_9fa48("7927") ? assembly?.suppliedKeycaps || assembly.layout === layout : stryMutAct_9fa48("7926") ? true : (stryCov_9fa48("7926", "7927"), (stryMutAct_9fa48("7928") ? assembly.suppliedKeycaps : (stryCov_9fa48("7928"), assembly?.suppliedKeycaps)) && (stryMutAct_9fa48("7930") ? assembly.layout !== layout : stryMutAct_9fa48("7929") ? true : (stryCov_9fa48("7929", "7930"), assembly.layout === layout)))) && (stryMutAct_9fa48("7932") ? caps?.id !== assembly.selection.keycaps : stryMutAct_9fa48("7931") ? true : (stryCov_9fa48("7931", "7932"), (stryMutAct_9fa48("7933") ? caps.id : (stryCov_9fa48("7933"), caps?.id)) === assembly.selection.keycaps)))) && (stryMutAct_9fa48("7935") ? caps.evidence !== 'documented' : stryMutAct_9fa48("7934") ? true : (stryCov_9fa48("7934", "7935"), caps.evidence === (stryMutAct_9fa48("7936") ? "" : (stryCov_9fa48("7936"), 'documented')))))) && (stryMutAct_9fa48("7938") ? sw?.id !== assembly.selection.switch : stryMutAct_9fa48("7937") ? true : (stryCov_9fa48("7937", "7938"), (stryMutAct_9fa48("7939") ? sw.id : (stryCov_9fa48("7939"), sw?.id)) === assembly.selection.switch)))) && (stryMutAct_9fa48("7941") ? sw.evidence !== 'documented' : stryMutAct_9fa48("7940") ? true : (stryCov_9fa48("7940", "7941"), sw.evidence === (stryMutAct_9fa48("7942") ? "" : (stryCov_9fa48("7942"), 'documented')))));
    result.push(stryMutAct_9fa48("7944") ? {} : (stryCov_9fa48("7944"), {
      status: suppliedCaps ? stryMutAct_9fa48("7945") ? "" : (stryCov_9fa48("7945"), 'documented') : stryMutAct_9fa48("7946") ? "" : (stryCov_9fa48("7946"), 'unknown'),
      title: stryMutAct_9fa48("7947") ? "" : (stryCov_9fa48("7947"), 'Keycap kit & row coverage'),
      detail: suppliedCaps ? stryMutAct_9fa48("7948") ? "" : (stryCov_9fa48("7948"), 'The manufacturer supplies these keycaps with this factory assembly and switch. Match the exact regional layout and revision before ordering; this does not establish coverage for mixed builds.') : (stryMutAct_9fa48("7951") ? caps?.evidence !== 'documented' : stryMutAct_9fa48("7950") ? false : stryMutAct_9fa48("7949") ? true : (stryCov_9fa48("7949", "7950", "7951"), (stryMutAct_9fa48("7952") ? caps.evidence : (stryCov_9fa48("7952"), caps?.evidence)) === (stryMutAct_9fa48("7953") ? "" : (stryCov_9fa48("7953"), 'documented')))) ? stryMutAct_9fa48("7954") ? "" : (stryCov_9fa48("7954"), 'Compare the kit diagram with every key width and sculpted row. MX stems alone do not establish full coverage; Cherry profiles can also interfere with some north-facing switch setups.') : stryMutAct_9fa48("7955") ? "" : (stryCov_9fa48("7955"), 'The exact keycap inventory is unverified. Check stems, modifier widths, spacebar length and sculpted rows.'),
      source: suppliedCaps ? assembly.source : stryMutAct_9fa48("7956") ? caps?.source && '' : (stryCov_9fa48("7956"), (stryMutAct_9fa48("7957") ? caps.source : (stryCov_9fa48("7957"), caps?.source)) ?? (stryMutAct_9fa48("7958") ? "Stryker was here!" : (stryCov_9fa48("7958"), '')))
    }));
    return result;
  }
}
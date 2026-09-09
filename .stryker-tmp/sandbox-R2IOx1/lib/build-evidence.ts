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
import { parseImportedAccessory } from './imported-accessories.ts';
import type { Build } from './build.ts';
import { categories, type Part, type FitCheck } from './catalog.ts';
import type { AccessoryProduct, AccessoryCompatibility } from './build-accessories.ts';
import { publicUrl } from './import-products.ts';
function object(value: unknown): Record<string, unknown> {
  if (stryMutAct_9fa48("6508")) {
    {}
  } else {
    stryCov_9fa48("6508");
    if (stryMutAct_9fa48("6511") ? (!value || typeof value !== 'object') && Array.isArray(value) : stryMutAct_9fa48("6510") ? false : stryMutAct_9fa48("6509") ? true : (stryCov_9fa48("6509", "6510", "6511"), (stryMutAct_9fa48("6513") ? !value && typeof value !== 'object' : stryMutAct_9fa48("6512") ? false : (stryCov_9fa48("6512", "6513"), (stryMutAct_9fa48("6514") ? value : (stryCov_9fa48("6514"), !value)) || (stryMutAct_9fa48("6516") ? typeof value === 'object' : stryMutAct_9fa48("6515") ? false : (stryCov_9fa48("6515", "6516"), typeof value !== (stryMutAct_9fa48("6517") ? "" : (stryCov_9fa48("6517"), 'object')))))) || Array.isArray(value))) throw new Error(stryMutAct_9fa48("6519") ? "" : (stryCov_9fa48("6519"), 'Invalid evidence object.'));
    return Object.fromEntries(Object.entries(value));
  }
}
function text(value: unknown): string {
  if (stryMutAct_9fa48("6520")) {
    {}
  } else {
    stryCov_9fa48("6520");
    if (stryMutAct_9fa48("6523") ? typeof value !== 'string' && value.length > 4096 : stryMutAct_9fa48("6522") ? false : stryMutAct_9fa48("6521") ? true : (stryCov_9fa48("6521", "6522", "6523"), (stryMutAct_9fa48("6525") ? typeof value === 'string' : stryMutAct_9fa48("6524") ? false : (stryCov_9fa48("6524", "6525"), typeof value !== (stryMutAct_9fa48("6526") ? "" : (stryCov_9fa48("6526"), 'string')))) || (stryMutAct_9fa48("6529") ? value.length <= 4096 : stryMutAct_9fa48("6528") ? value.length >= 4096 : stryMutAct_9fa48("6527") ? false : (stryCov_9fa48("6527", "6528", "6529"), value.length > 4096)))) throw new Error(stryMutAct_9fa48("6531") ? "" : (stryCov_9fa48("6531"), 'Invalid evidence text.'));
    return value;
  }
}
function list(value: unknown): unknown[] {
  if (stryMutAct_9fa48("6532")) {
    {}
  } else {
    stryCov_9fa48("6532");
    if (stryMutAct_9fa48("6535") ? !Array.isArray(value) && value.length > 100 : stryMutAct_9fa48("6534") ? false : stryMutAct_9fa48("6533") ? true : (stryCov_9fa48("6533", "6534", "6535"), (stryMutAct_9fa48("6536") ? Array.isArray(value) : (stryCov_9fa48("6536"), !Array.isArray(value))) || (stryMutAct_9fa48("6539") ? value.length <= 100 : stryMutAct_9fa48("6538") ? value.length >= 100 : stryMutAct_9fa48("6537") ? false : (stryCov_9fa48("6537", "6538", "6539"), value.length > 100)))) throw new Error(stryMutAct_9fa48("6541") ? "" : (stryCov_9fa48("6541"), 'Invalid evidence list.'));
    return value;
  }
}
function choice<const T extends string>(value: unknown, choices: readonly T[]): T {
  if (stryMutAct_9fa48("6542")) {
    {}
  } else {
    stryCov_9fa48("6542");
    const found = choices.find(stryMutAct_9fa48("6543") ? () => undefined : (stryCov_9fa48("6543"), item => stryMutAct_9fa48("6546") ? item !== value : stryMutAct_9fa48("6545") ? false : stryMutAct_9fa48("6544") ? true : (stryCov_9fa48("6544", "6545", "6546"), item === value)));
    if (stryMutAct_9fa48("6549") ? found !== undefined : stryMutAct_9fa48("6548") ? false : stryMutAct_9fa48("6547") ? true : (stryCov_9fa48("6547", "6548", "6549"), found === undefined)) throw new Error(stryMutAct_9fa48("6551") ? "" : (stryCov_9fa48("6551"), 'Invalid evidence choice.'));
    return found;
  }
}
function source(value: unknown, empty = stryMutAct_9fa48("6552") ? true : (stryCov_9fa48("6552"), false)): string {
  if (stryMutAct_9fa48("6553")) {
    {}
  } else {
    stryCov_9fa48("6553");
    const url = text(value);
    if (stryMutAct_9fa48("6556") ? !url || empty : stryMutAct_9fa48("6555") ? false : stryMutAct_9fa48("6554") ? true : (stryCov_9fa48("6554", "6555", "6556"), (stryMutAct_9fa48("6557") ? url : (stryCov_9fa48("6557"), !url)) && empty)) return stryMutAct_9fa48("6558") ? "Stryker was here!" : (stryCov_9fa48("6558"), '');
    if (stryMutAct_9fa48("6559")) {
      ;
    } else {
      stryCov_9fa48("6559");
      publicUrl(url);
    }
    return url;
  }
}
function part(value: unknown): Part {
  if (stryMutAct_9fa48("6560")) {
    {}
  } else {
    stryCov_9fa48("6560");
    const item = object(value);
    return stryMutAct_9fa48("6561") ? {} : (stryCov_9fa48("6561"), {
      id: text(item.id),
      name: text(item.name),
      brand: text(item.brand),
      category: choice(item.category, categories),
      detail: text(item.detail),
      source: source(item.source),
      family: text(item.family),
      evidence: choice(item.evidence, stryMutAct_9fa48("6562") ? [] : (stryCov_9fa48("6562"), [stryMutAct_9fa48("6563") ? "" : (stryCov_9fa48("6563"), 'documented'), stryMutAct_9fa48("6564") ? "" : (stryCov_9fa48("6564"), 'unknown')]))
    });
  }
}
function accessory(value: unknown): AccessoryProduct {
  if (stryMutAct_9fa48("6565")) {
    {}
  } else {
    stryCov_9fa48("6565");
    const item = object(value);
    if (stryMutAct_9fa48("6568") ? typeof item.id === 'string' || item.id.startsWith('import-accessory:') : stryMutAct_9fa48("6567") ? false : stryMutAct_9fa48("6566") ? true : (stryCov_9fa48("6566", "6567", "6568"), (stryMutAct_9fa48("6570") ? typeof item.id !== 'string' : stryMutAct_9fa48("6569") ? true : (stryCov_9fa48("6569", "6570"), typeof item.id === (stryMutAct_9fa48("6571") ? "" : (stryCov_9fa48("6571"), 'string')))) && (stryMutAct_9fa48("6572") ? item.id.endsWith('import-accessory:') : (stryCov_9fa48("6572"), item.id.startsWith(stryMutAct_9fa48("6573") ? "" : (stryCov_9fa48("6573"), 'import-accessory:')))))) return parseImportedAccessory(item);
    const info = stryMutAct_9fa48("6574") ? {} : (stryCov_9fa48("6574"), {
      id: text(item.id),
      name: text(item.name),
      brand: text(item.brand),
      detail: text(item.detail),
      source: source(item.source)
    });
    const kind = choice(item.kind, stryMutAct_9fa48("6575") ? [] : (stryCov_9fa48("6575"), [stryMutAct_9fa48("6576") ? "" : (stryCov_9fa48("6576"), 'artisan'), stryMutAct_9fa48("6577") ? "" : (stryCov_9fa48("6577"), 'knob'), stryMutAct_9fa48("6578") ? "" : (stryCov_9fa48("6578"), 'encoder'), stryMutAct_9fa48("6579") ? "" : (stryCov_9fa48("6579"), 'screen'), stryMutAct_9fa48("6580") ? "" : (stryCov_9fa48("6580"), 'buttons'), stryMutAct_9fa48("6581") ? "" : (stryCov_9fa48("6581"), 'macropad')]));
    if (stryMutAct_9fa48("6584") ? kind !== 'artisan' : stryMutAct_9fa48("6583") ? false : stryMutAct_9fa48("6582") ? true : (stryCov_9fa48("6582", "6583", "6584"), kind === (stryMutAct_9fa48("6585") ? "" : (stryCov_9fa48("6585"), 'artisan')))) {
      if (stryMutAct_9fa48("6586")) {
        {}
      } else {
        stryCov_9fa48("6586");
        if (stryMutAct_9fa48("6589") ? (item.placement !== 'key' || typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU) || item.sizeU <= 0) && item.sizeU > 10 : stryMutAct_9fa48("6588") ? false : stryMutAct_9fa48("6587") ? true : (stryCov_9fa48("6587", "6588", "6589"), (stryMutAct_9fa48("6591") ? (item.placement !== 'key' || typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU)) && item.sizeU <= 0 : stryMutAct_9fa48("6590") ? false : (stryCov_9fa48("6590", "6591"), (stryMutAct_9fa48("6593") ? (item.placement !== 'key' || typeof item.sizeU !== 'number') && !Number.isFinite(item.sizeU) : stryMutAct_9fa48("6592") ? false : (stryCov_9fa48("6592", "6593"), (stryMutAct_9fa48("6595") ? item.placement !== 'key' && typeof item.sizeU !== 'number' : stryMutAct_9fa48("6594") ? false : (stryCov_9fa48("6594", "6595"), (stryMutAct_9fa48("6597") ? item.placement === 'key' : stryMutAct_9fa48("6596") ? false : (stryCov_9fa48("6596", "6597"), item.placement !== (stryMutAct_9fa48("6598") ? "" : (stryCov_9fa48("6598"), 'key')))) || (stryMutAct_9fa48("6600") ? typeof item.sizeU === 'number' : stryMutAct_9fa48("6599") ? false : (stryCov_9fa48("6599", "6600"), typeof item.sizeU !== (stryMutAct_9fa48("6601") ? "" : (stryCov_9fa48("6601"), 'number')))))) || (stryMutAct_9fa48("6602") ? Number.isFinite(item.sizeU) : (stryCov_9fa48("6602"), !Number.isFinite(item.sizeU))))) || (stryMutAct_9fa48("6605") ? item.sizeU > 0 : stryMutAct_9fa48("6604") ? item.sizeU < 0 : stryMutAct_9fa48("6603") ? false : (stryCov_9fa48("6603", "6604", "6605"), item.sizeU <= 0)))) || (stryMutAct_9fa48("6608") ? item.sizeU <= 10 : stryMutAct_9fa48("6607") ? item.sizeU >= 10 : stryMutAct_9fa48("6606") ? false : (stryCov_9fa48("6606", "6607", "6608"), item.sizeU > 10)))) throw new Error(stryMutAct_9fa48("6610") ? "" : (stryCov_9fa48("6610"), 'Invalid artisan evidence.'));
        return stryMutAct_9fa48("6611") ? {} : (stryCov_9fa48("6611"), {
          ...info,
          kind,
          placement: stryMutAct_9fa48("6612") ? "" : (stryCov_9fa48("6612"), 'key'),
          sizeU: item.sizeU,
          stem: (stryMutAct_9fa48("6615") ? item.stem !== null : stryMutAct_9fa48("6614") ? false : stryMutAct_9fa48("6613") ? true : (stryCov_9fa48("6613", "6614", "6615"), item.stem === null)) ? null : choice(item.stem, stryMutAct_9fa48("6616") ? [] : (stryCov_9fa48("6616"), [stryMutAct_9fa48("6617") ? "" : (stryCov_9fa48("6617"), 'mx'), stryMutAct_9fa48("6618") ? "" : (stryCov_9fa48("6618"), 'choc')]))
        });
      }
    }
    if (stryMutAct_9fa48("6621") ? item.sizeU !== null && item.stem !== null : stryMutAct_9fa48("6620") ? false : stryMutAct_9fa48("6619") ? true : (stryCov_9fa48("6619", "6620", "6621"), (stryMutAct_9fa48("6623") ? item.sizeU === null : stryMutAct_9fa48("6622") ? false : (stryCov_9fa48("6622", "6623"), item.sizeU !== null)) || (stryMutAct_9fa48("6625") ? item.stem === null : stryMutAct_9fa48("6624") ? false : (stryCov_9fa48("6624", "6625"), item.stem !== null)))) throw new Error(stryMutAct_9fa48("6627") ? "" : (stryCov_9fa48("6627"), 'Invalid module evidence.'));
    if (stryMutAct_9fa48("6630") ? kind !== 'macropad' : stryMutAct_9fa48("6629") ? false : stryMutAct_9fa48("6628") ? true : (stryCov_9fa48("6628", "6629", "6630"), kind === (stryMutAct_9fa48("6631") ? "" : (stryCov_9fa48("6631"), 'macropad')))) return stryMutAct_9fa48("6632") ? {} : (stryCov_9fa48("6632"), {
      ...info,
      kind,
      placement: choice(item.placement, stryMutAct_9fa48("6633") ? [] : (stryCov_9fa48("6633"), [stryMutAct_9fa48("6634") ? "" : (stryCov_9fa48("6634"), 'external')])),
      sizeU: null,
      stem: null
    });
    if (stryMutAct_9fa48("6637") ? kind === 'knob' && kind === 'encoder' : stryMutAct_9fa48("6636") ? false : stryMutAct_9fa48("6635") ? true : (stryCov_9fa48("6635", "6636", "6637"), (stryMutAct_9fa48("6639") ? kind !== 'knob' : stryMutAct_9fa48("6638") ? false : (stryCov_9fa48("6638", "6639"), kind === (stryMutAct_9fa48("6640") ? "" : (stryCov_9fa48("6640"), 'knob')))) || (stryMutAct_9fa48("6642") ? kind !== 'encoder' : stryMutAct_9fa48("6641") ? false : (stryCov_9fa48("6641", "6642"), kind === (stryMutAct_9fa48("6643") ? "" : (stryCov_9fa48("6643"), 'encoder')))))) return stryMutAct_9fa48("6644") ? {} : (stryCov_9fa48("6644"), {
      ...info,
      kind,
      placement: choice(item.placement, stryMutAct_9fa48("6645") ? [] : (stryCov_9fa48("6645"), [stryMutAct_9fa48("6646") ? "" : (stryCov_9fa48("6646"), 'embedded')])),
      sizeU: null,
      stem: null
    });
    return stryMutAct_9fa48("6647") ? {} : (stryCov_9fa48("6647"), {
      ...info,
      kind,
      placement: choice(item.placement, stryMutAct_9fa48("6648") ? [] : (stryCov_9fa48("6648"), [stryMutAct_9fa48("6649") ? "" : (stryCov_9fa48("6649"), 'embedded'), stryMutAct_9fa48("6650") ? "" : (stryCov_9fa48("6650"), 'external')])),
      sizeU: null,
      stem: null
    });
  }
}
function exactIds(actual: string[], expected: string[]) {
  if (stryMutAct_9fa48("6651")) {
    {}
  } else {
    stryCov_9fa48("6651");
    if (stryMutAct_9fa48("6654") ? (new Set(actual).size !== actual.length || actual.length !== expected.length) && actual.some(id => !expected.includes(id)) : stryMutAct_9fa48("6653") ? false : stryMutAct_9fa48("6652") ? true : (stryCov_9fa48("6652", "6653", "6654"), (stryMutAct_9fa48("6656") ? new Set(actual).size !== actual.length && actual.length !== expected.length : stryMutAct_9fa48("6655") ? false : (stryCov_9fa48("6655", "6656"), (stryMutAct_9fa48("6658") ? new Set(actual).size === actual.length : stryMutAct_9fa48("6657") ? false : (stryCov_9fa48("6657", "6658"), new Set(actual).size !== actual.length)) || (stryMutAct_9fa48("6660") ? actual.length === expected.length : stryMutAct_9fa48("6659") ? false : (stryCov_9fa48("6659", "6660"), actual.length !== expected.length)))) || (stryMutAct_9fa48("6661") ? actual.every(id => !expected.includes(id)) : (stryCov_9fa48("6661"), actual.some(stryMutAct_9fa48("6662") ? () => undefined : (stryCov_9fa48("6662"), id => stryMutAct_9fa48("6663") ? expected.includes(id) : (stryCov_9fa48("6663"), !expected.includes(id)))))))) throw new Error(stryMutAct_9fa48("6665") ? "" : (stryCov_9fa48("6665"), 'Evidence does not match the build.'));
  }
}
export function parsePublicBuildEvidence(value: unknown, build: Build) {
  if (stryMutAct_9fa48("6666")) {
    {}
  } else {
    stryCov_9fa48("6666");
    const data = object(value);
    if (stryMutAct_9fa48("6669") ? (data.version !== 1 || typeof data.catalogDigest !== 'string') && !/^[a-f0-9]{64}$/.test(data.catalogDigest) : stryMutAct_9fa48("6668") ? false : stryMutAct_9fa48("6667") ? true : (stryCov_9fa48("6667", "6668", "6669"), (stryMutAct_9fa48("6671") ? data.version !== 1 && typeof data.catalogDigest !== 'string' : stryMutAct_9fa48("6670") ? false : (stryCov_9fa48("6670", "6671"), (stryMutAct_9fa48("6673") ? data.version === 1 : stryMutAct_9fa48("6672") ? false : (stryCov_9fa48("6672", "6673"), data.version !== 1)) || (stryMutAct_9fa48("6675") ? typeof data.catalogDigest === 'string' : stryMutAct_9fa48("6674") ? false : (stryCov_9fa48("6674", "6675"), typeof data.catalogDigest !== (stryMutAct_9fa48("6676") ? "" : (stryCov_9fa48("6676"), 'string')))))) || (stryMutAct_9fa48("6677") ? /^[a-f0-9]{64}$/.test(data.catalogDigest) : (stryCov_9fa48("6677"), !(stryMutAct_9fa48("6681") ? /^[^a-f0-9]{64}$/ : stryMutAct_9fa48("6680") ? /^[a-f0-9]$/ : stryMutAct_9fa48("6679") ? /^[a-f0-9]{64}/ : stryMutAct_9fa48("6678") ? /[a-f0-9]{64}$/ : (stryCov_9fa48("6678", "6679", "6680", "6681"), /^[a-f0-9]{64}$/)).test(data.catalogDigest))))) throw new Error(stryMutAct_9fa48("6683") ? "" : (stryCov_9fa48("6683"), 'Unsupported build evidence.'));
    const components = list(data.components).map(part);
    exactIds(components.map(stryMutAct_9fa48("6685") ? () => undefined : (stryCov_9fa48("6685"), item => item.category)), stryMutAct_9fa48("6686") ? [] : (stryCov_9fa48("6686"), [...categories]));
    for (const item of components) {
      if (stryMutAct_9fa48("6687")) {
        {}
      } else {
        stryCov_9fa48("6687");
        if (stryMutAct_9fa48("6690") ? build.selection[item.category] === item.id : stryMutAct_9fa48("6689") ? false : stryMutAct_9fa48("6688") ? true : (stryCov_9fa48("6688", "6689", "6690"), build.selection[item.category] !== item.id)) throw new Error(stryMutAct_9fa48("6692") ? "" : (stryCov_9fa48("6692"), 'Component evidence mismatch.'));
        const imported = build.customParts.find(stryMutAct_9fa48("6693") ? () => undefined : (stryCov_9fa48("6693"), part => stryMutAct_9fa48("6696") ? part.id !== item.id : stryMutAct_9fa48("6695") ? false : stryMutAct_9fa48("6694") ? true : (stryCov_9fa48("6694", "6695", "6696"), part.id === item.id)));
        if (stryMutAct_9fa48("6699") ? imported || item.evidence !== 'unknown' || Object.entries(item).some(([key, value]) => Reflect.get(imported, key) !== value) : stryMutAct_9fa48("6698") ? false : stryMutAct_9fa48("6697") ? true : (stryCov_9fa48("6697", "6698", "6699"), imported && (stryMutAct_9fa48("6701") ? item.evidence !== 'unknown' && Object.entries(item).some(([key, value]) => Reflect.get(imported, key) !== value) : stryMutAct_9fa48("6700") ? true : (stryCov_9fa48("6700", "6701"), (stryMutAct_9fa48("6703") ? item.evidence === 'unknown' : stryMutAct_9fa48("6702") ? false : (stryCov_9fa48("6702", "6703"), item.evidence !== (stryMutAct_9fa48("6704") ? "" : (stryCov_9fa48("6704"), 'unknown')))) || (stryMutAct_9fa48("6705") ? Object.entries(item).every(([key, value]) => Reflect.get(imported, key) !== value) : (stryCov_9fa48("6705"), Object.entries(item).some(stryMutAct_9fa48("6706") ? () => undefined : (stryCov_9fa48("6706"), ([key, value]) => stryMutAct_9fa48("6709") ? Reflect.get(imported, key) === value : stryMutAct_9fa48("6708") ? false : stryMutAct_9fa48("6707") ? true : (stryCov_9fa48("6707", "6708", "6709"), Reflect.get(imported, key) !== value))))))))) throw new Error(stryMutAct_9fa48("6711") ? "" : (stryCov_9fa48("6711"), 'Imported evidence mismatch.'));
      }
    }
    const compatibility: FitCheck[] = list(data.compatibility).map(value => {
      if (stryMutAct_9fa48("6712")) {
        {}
      } else {
        stryCov_9fa48("6712");
        const item = object(value);
        return stryMutAct_9fa48("6713") ? {} : (stryCov_9fa48("6713"), {
          status: choice(item.status, stryMutAct_9fa48("6714") ? [] : (stryCov_9fa48("6714"), [stryMutAct_9fa48("6715") ? "" : (stryCov_9fa48("6715"), 'documented'), stryMutAct_9fa48("6716") ? "" : (stryCov_9fa48("6716"), 'incompatible'), stryMutAct_9fa48("6717") ? "" : (stryCov_9fa48("6717"), 'unknown')])),
          title: text(item.title),
          detail: text(item.detail),
          source: source(item.source, stryMutAct_9fa48("6718") ? false : (stryCov_9fa48("6718"), true))
        });
      }
    });
    const accessoryReferences = list(data.accessoryReferences).map(accessory);
    exactIds(accessoryReferences.map(stryMutAct_9fa48("6720") ? () => undefined : (stryCov_9fa48("6720"), item => item.id)), stryMutAct_9fa48("6721") ? [] : (stryCov_9fa48("6721"), [...new Set(build.accessories.map(stryMutAct_9fa48("6722") ? () => undefined : (stryCov_9fa48("6722"), item => item.productId)))]));
    for (const selected of build.accessories) {
      if (stryMutAct_9fa48("6723")) {
        {}
      } else {
        stryCov_9fa48("6723");
        const reference = accessoryReferences.find(stryMutAct_9fa48("6724") ? () => undefined : (stryCov_9fa48("6724"), item => stryMutAct_9fa48("6727") ? item.id !== selected.productId : stryMutAct_9fa48("6726") ? false : stryMutAct_9fa48("6725") ? true : (stryCov_9fa48("6725", "6726", "6727"), item.id === selected.productId)));
        if (stryMutAct_9fa48("6730") ? reference?.placement === selected.location.kind : stryMutAct_9fa48("6729") ? false : stryMutAct_9fa48("6728") ? true : (stryCov_9fa48("6728", "6729", "6730"), (stryMutAct_9fa48("6731") ? reference.placement : (stryCov_9fa48("6731"), reference?.placement)) !== selected.location.kind)) throw new Error(stryMutAct_9fa48("6733") ? "" : (stryCov_9fa48("6733"), 'Accessory placement evidence mismatch.'));
        const imported = stryMutAct_9fa48("6734") ? build.customAccessories.find(product => product.id === selected.productId) : (stryCov_9fa48("6734"), build.customAccessories?.find(stryMutAct_9fa48("6735") ? () => undefined : (stryCov_9fa48("6735"), product => stryMutAct_9fa48("6738") ? product.id !== selected.productId : stryMutAct_9fa48("6737") ? false : stryMutAct_9fa48("6736") ? true : (stryCov_9fa48("6736", "6737", "6738"), product.id === selected.productId))));
        if (stryMutAct_9fa48("6741") ? imported || !reference || Object.entries(imported).some(([key, value]) => Reflect.get(reference, key) !== value) : stryMutAct_9fa48("6740") ? false : stryMutAct_9fa48("6739") ? true : (stryCov_9fa48("6739", "6740", "6741"), imported && (stryMutAct_9fa48("6743") ? !reference && Object.entries(imported).some(([key, value]) => Reflect.get(reference, key) !== value) : stryMutAct_9fa48("6742") ? true : (stryCov_9fa48("6742", "6743"), (stryMutAct_9fa48("6744") ? reference : (stryCov_9fa48("6744"), !reference)) || (stryMutAct_9fa48("6745") ? Object.entries(imported).every(([key, value]) => Reflect.get(reference, key) !== value) : (stryCov_9fa48("6745"), Object.entries(imported).some(stryMutAct_9fa48("6746") ? () => undefined : (stryCov_9fa48("6746"), ([key, value]) => stryMutAct_9fa48("6749") ? Reflect.get(reference, key) === value : stryMutAct_9fa48("6748") ? false : stryMutAct_9fa48("6747") ? true : (stryCov_9fa48("6747", "6748", "6749"), Reflect.get(reference, key) !== value))))))))) throw new Error(stryMutAct_9fa48("6751") ? "" : (stryCov_9fa48("6751"), 'Imported accessory evidence mismatch.'));
      }
    }
    const checks = object(data.accessoryCompatibility);
    exactIds(Object.keys(checks), build.accessories.map(stryMutAct_9fa48("6753") ? () => undefined : (stryCov_9fa48("6753"), item => item.id)));
    const accessoryCompatibility: Record<string, AccessoryCompatibility> = Object.fromEntries(Object.entries(checks).map(([id, value]) => {
      if (stryMutAct_9fa48("6754")) {
        {}
      } else {
        stryCov_9fa48("6754");
        const item = object(value);
        return stryMutAct_9fa48("6755") ? [] : (stryCov_9fa48("6755"), [id, stryMutAct_9fa48("6756") ? {} : (stryCov_9fa48("6756"), {
          status: choice(item.status, stryMutAct_9fa48("6757") ? [] : (stryCov_9fa48("6757"), [stryMutAct_9fa48("6758") ? "" : (stryCov_9fa48("6758"), 'confirmed'), stryMutAct_9fa48("6759") ? "" : (stryCov_9fa48("6759"), 'unknown'), stryMutAct_9fa48("6760") ? "" : (stryCov_9fa48("6760"), 'conflict')])),
          reasons: list(item.reasons).map(text),
          sources: list(item.sources).map(stryMutAct_9fa48("6761") ? () => undefined : (stryCov_9fa48("6761"), value => source(value)))
        })]);
      }
    }));
    const audio = object(data.sound);
    for (const [key, value] of Object.entries(build.audio)) if (stryMutAct_9fa48("6764") ? audio[key] === value : stryMutAct_9fa48("6763") ? false : stryMutAct_9fa48("6762") ? true : (stryCov_9fa48("6762", "6763", "6764"), audio[key] !== value)) throw new Error(stryMutAct_9fa48("6766") ? "" : (stryCov_9fa48("6766"), 'Sound evidence mismatch.'));
    let sound;
    if (stryMutAct_9fa48("6769") ? build.audio.source !== 'synthesized' : stryMutAct_9fa48("6768") ? false : stryMutAct_9fa48("6767") ? true : (stryCov_9fa48("6767", "6768", "6769"), build.audio.source === (stryMutAct_9fa48("6770") ? "" : (stryCov_9fa48("6770"), 'synthesized')))) {
      if (stryMutAct_9fa48("6771")) {
        {}
      } else {
        stryCov_9fa48("6771");
        if (stryMutAct_9fa48("6774") ? audio.recording !== null && audio.accuracy !== 'synthesized approximation' : stryMutAct_9fa48("6773") ? false : stryMutAct_9fa48("6772") ? true : (stryCov_9fa48("6772", "6773", "6774"), (stryMutAct_9fa48("6776") ? audio.recording === null : stryMutAct_9fa48("6775") ? false : (stryCov_9fa48("6775", "6776"), audio.recording !== null)) || (stryMutAct_9fa48("6778") ? audio.accuracy === 'synthesized approximation' : stryMutAct_9fa48("6777") ? false : (stryCov_9fa48("6777", "6778"), audio.accuracy !== (stryMutAct_9fa48("6779") ? "" : (stryCov_9fa48("6779"), 'synthesized approximation')))))) throw new Error(stryMutAct_9fa48("6781") ? "" : (stryCov_9fa48("6781"), 'Invalid synthesized evidence.'));
        sound = stryMutAct_9fa48("6782") ? {} : (stryCov_9fa48("6782"), {
          ...build.audio,
          kind: 'synthesized' as const,
          accuracy: 'synthesized approximation' as const,
          recording: null
        });
      }
    } else {
      if (stryMutAct_9fa48("6783")) {
        {}
      } else {
        stryCov_9fa48("6783");
        const recording = object(audio.recording);
        if (stryMutAct_9fa48("6786") ? recording.id !== build.audio.source && audio.accuracy !== 'recorded switch reference; full build match unverified' : stryMutAct_9fa48("6785") ? false : stryMutAct_9fa48("6784") ? true : (stryCov_9fa48("6784", "6785", "6786"), (stryMutAct_9fa48("6788") ? recording.id === build.audio.source : stryMutAct_9fa48("6787") ? false : (stryCov_9fa48("6787", "6788"), recording.id !== build.audio.source)) || (stryMutAct_9fa48("6790") ? audio.accuracy === 'recorded switch reference; full build match unverified' : stryMutAct_9fa48("6789") ? false : (stryCov_9fa48("6789", "6790"), audio.accuracy !== (stryMutAct_9fa48("6791") ? "" : (stryCov_9fa48("6791"), 'recorded switch reference; full build match unverified')))))) throw new Error(stryMutAct_9fa48("6793") ? "" : (stryCov_9fa48("6793"), 'Invalid recording evidence.'));
        sound = stryMutAct_9fa48("6794") ? {} : (stryCov_9fa48("6794"), {
          ...build.audio,
          kind: 'recorded' as const,
          accuracy: 'recorded switch reference; full build match unverified' as const,
          recording: stryMutAct_9fa48("6795") ? {} : (stryCov_9fa48("6795"), {
            id: text(recording.id),
            name: text(recording.name),
            creator: text(recording.creator),
            license: text(recording.license),
            capture: text(recording.capture),
            source: source(recording.source)
          })
        });
      }
    }
    for (const selected of build.accessories) {
      if (stryMutAct_9fa48("6796")) {
        {}
      } else {
        stryCov_9fa48("6796");
        if (stryMutAct_9fa48("6799") ? selected.productId.startsWith('import-accessory:') || accessoryCompatibility[selected.id]?.status === 'confirmed' : stryMutAct_9fa48("6798") ? false : stryMutAct_9fa48("6797") ? true : (stryCov_9fa48("6797", "6798", "6799"), (stryMutAct_9fa48("6800") ? selected.productId.endsWith('import-accessory:') : (stryCov_9fa48("6800"), selected.productId.startsWith(stryMutAct_9fa48("6801") ? "" : (stryCov_9fa48("6801"), 'import-accessory:')))) && (stryMutAct_9fa48("6803") ? accessoryCompatibility[selected.id]?.status !== 'confirmed' : stryMutAct_9fa48("6802") ? true : (stryCov_9fa48("6802", "6803"), (stryMutAct_9fa48("6804") ? accessoryCompatibility[selected.id].status : (stryCov_9fa48("6804"), accessoryCompatibility[selected.id]?.status)) === (stryMutAct_9fa48("6805") ? "" : (stryCov_9fa48("6805"), 'confirmed')))))) throw new Error(stryMutAct_9fa48("6807") ? "" : (stryCov_9fa48("6807"), 'Imported accessory fit cannot be confirmed.'));
      }
    }
    return stryMutAct_9fa48("6808") ? {} : (stryCov_9fa48("6808"), {
      version: 1 as const,
      catalogDigest: data.catalogDigest,
      components,
      compatibility,
      accessoryReferences,
      accessoryCompatibility,
      sound
    });
  }
}
export type PublicBuildEvidence = ReturnType<typeof parsePublicBuildEvidence>;
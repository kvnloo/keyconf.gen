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
import type { AccessoryProduct } from './build-accessories.ts';
import { accessoryCatalog } from './build-accessories.ts';
import { publicUrl } from './import-products.ts';
import { digestText } from './content-digest.ts';
export type ImportedAccessory = AccessoryProduct & {
  origin: 'import';
  sku: string | null;
  observedAt: string;
  method: string;
  fit: 'unknown';
  geometry: 'unavailable';
};
function text(value: unknown, limit: number): string {
  if (stryMutAct_9fa48("11579")) {
    {}
  } else {
    stryCov_9fa48("11579");
    if (stryMutAct_9fa48("11582") ? (typeof value !== 'string' || !value.trim() || value.length > limit) && /\p{Cc}/u.test(value) : stryMutAct_9fa48("11581") ? false : stryMutAct_9fa48("11580") ? true : (stryCov_9fa48("11580", "11581", "11582"), (stryMutAct_9fa48("11584") ? (typeof value !== 'string' || !value.trim()) && value.length > limit : stryMutAct_9fa48("11583") ? false : (stryCov_9fa48("11583", "11584"), (stryMutAct_9fa48("11586") ? typeof value !== 'string' && !value.trim() : stryMutAct_9fa48("11585") ? false : (stryCov_9fa48("11585", "11586"), (stryMutAct_9fa48("11588") ? typeof value === 'string' : stryMutAct_9fa48("11587") ? false : (stryCov_9fa48("11587", "11588"), typeof value !== (stryMutAct_9fa48("11589") ? "" : (stryCov_9fa48("11589"), 'string')))) || (stryMutAct_9fa48("11590") ? value.trim() : (stryCov_9fa48("11590"), !(stryMutAct_9fa48("11591") ? value : (stryCov_9fa48("11591"), value.trim())))))) || (stryMutAct_9fa48("11594") ? value.length <= limit : stryMutAct_9fa48("11593") ? value.length >= limit : stryMutAct_9fa48("11592") ? false : (stryCov_9fa48("11592", "11593", "11594"), value.length > limit)))) || (stryMutAct_9fa48("11595") ? /\P{Cc}/u : (stryCov_9fa48("11595"), /\p{Cc}/u)).test(value))) throw new Error(stryMutAct_9fa48("11597") ? "" : (stryCov_9fa48("11597"), 'Imported accessory text is missing or invalid.'));
    return stryMutAct_9fa48("11598") ? value : (stryCov_9fa48("11598"), value.trim());
  }
}
export function parseImportedAccessory(value: unknown): ImportedAccessory {
  if (stryMutAct_9fa48("11599")) {
    {}
  } else {
    stryCov_9fa48("11599");
    if (stryMutAct_9fa48("11602") ? (typeof value !== 'object' || value === null) && Array.isArray(value) : stryMutAct_9fa48("11601") ? false : stryMutAct_9fa48("11600") ? true : (stryCov_9fa48("11600", "11601", "11602"), (stryMutAct_9fa48("11604") ? typeof value !== 'object' && value === null : stryMutAct_9fa48("11603") ? false : (stryCov_9fa48("11603", "11604"), (stryMutAct_9fa48("11606") ? typeof value === 'object' : stryMutAct_9fa48("11605") ? false : (stryCov_9fa48("11605", "11606"), typeof value !== (stryMutAct_9fa48("11607") ? "" : (stryCov_9fa48("11607"), 'object')))) || (stryMutAct_9fa48("11609") ? value !== null : stryMutAct_9fa48("11608") ? false : (stryCov_9fa48("11608", "11609"), value === null)))) || Array.isArray(value))) throw new Error(stryMutAct_9fa48("11611") ? "" : (stryCov_9fa48("11611"), 'Invalid imported accessory reference.'));
    const item: Record<string, unknown> = Object.fromEntries(Object.entries(value));
    const id = text(item.id, 120);
    if (stryMutAct_9fa48("11614") ? false : stryMutAct_9fa48("11613") ? true : stryMutAct_9fa48("11612") ? /^import-accessory:[a-f0-9]{64}$/.test(id) : (stryCov_9fa48("11612", "11613", "11614"), !(stryMutAct_9fa48("11618") ? /^import-accessory:[^a-f0-9]{64}$/ : stryMutAct_9fa48("11617") ? /^import-accessory:[a-f0-9]$/ : stryMutAct_9fa48("11616") ? /^import-accessory:[a-f0-9]{64}/ : stryMutAct_9fa48("11615") ? /import-accessory:[a-f0-9]{64}$/ : (stryCov_9fa48("11615", "11616", "11617", "11618"), /^import-accessory:[a-f0-9]{64}$/)).test(id))) throw new Error(stryMutAct_9fa48("11620") ? "" : (stryCov_9fa48("11620"), 'Imported accessories need their own source identity.'));
    if (stryMutAct_9fa48("11623") ? (item.origin !== 'import' || item.fit !== 'unknown') && item.geometry !== 'unavailable' : stryMutAct_9fa48("11622") ? false : stryMutAct_9fa48("11621") ? true : (stryCov_9fa48("11621", "11622", "11623"), (stryMutAct_9fa48("11625") ? item.origin !== 'import' && item.fit !== 'unknown' : stryMutAct_9fa48("11624") ? false : (stryCov_9fa48("11624", "11625"), (stryMutAct_9fa48("11627") ? item.origin === 'import' : stryMutAct_9fa48("11626") ? false : (stryCov_9fa48("11626", "11627"), item.origin !== (stryMutAct_9fa48("11628") ? "" : (stryCov_9fa48("11628"), 'import')))) || (stryMutAct_9fa48("11630") ? item.fit === 'unknown' : stryMutAct_9fa48("11629") ? false : (stryCov_9fa48("11629", "11630"), item.fit !== (stryMutAct_9fa48("11631") ? "" : (stryCov_9fa48("11631"), 'unknown')))))) || (stryMutAct_9fa48("11633") ? item.geometry === 'unavailable' : stryMutAct_9fa48("11632") ? false : (stryCov_9fa48("11632", "11633"), item.geometry !== (stryMutAct_9fa48("11634") ? "" : (stryCov_9fa48("11634"), 'unavailable')))))) throw new Error(stryMutAct_9fa48("11636") ? "" : (stryCov_9fa48("11636"), 'Imported accessory fit and geometry must remain unverified.'));
    const source = publicUrl(text(item.source, 4000)).href;
    const observedAt = text(item.observedAt, 40);
    if (stryMutAct_9fa48("11639") ? !Number.isFinite(Date.parse(observedAt)) && new Date(observedAt).toISOString() !== observedAt : stryMutAct_9fa48("11638") ? false : stryMutAct_9fa48("11637") ? true : (stryCov_9fa48("11637", "11638", "11639"), (stryMutAct_9fa48("11640") ? Number.isFinite(Date.parse(observedAt)) : (stryCov_9fa48("11640"), !Number.isFinite(Date.parse(observedAt)))) || (stryMutAct_9fa48("11642") ? new Date(observedAt).toISOString() === observedAt : stryMutAct_9fa48("11641") ? false : (stryCov_9fa48("11641", "11642"), new Date(observedAt).toISOString() !== observedAt)))) throw new Error(stryMutAct_9fa48("11644") ? "" : (stryCov_9fa48("11644"), 'Invalid accessory observation date.'));
    const info = stryMutAct_9fa48("11645") ? {} : (stryCov_9fa48("11645"), {
      id,
      name: text(item.name, 300),
      brand: text(item.brand, 160),
      detail: text(item.detail, 2000),
      source,
      origin: 'import' as const,
      sku: (stryMutAct_9fa48("11648") ? item.sku !== null : stryMutAct_9fa48("11647") ? false : stryMutAct_9fa48("11646") ? true : (stryCov_9fa48("11646", "11647", "11648"), item.sku === null)) ? null : text(item.sku, 512),
      observedAt,
      method: text(item.method, 120),
      fit: 'unknown' as const,
      geometry: 'unavailable' as const
    });
    const kind = item.kind;
    if (stryMutAct_9fa48("11651") ? kind !== 'artisan' : stryMutAct_9fa48("11650") ? false : stryMutAct_9fa48("11649") ? true : (stryCov_9fa48("11649", "11650", "11651"), kind === (stryMutAct_9fa48("11652") ? "" : (stryCov_9fa48("11652"), 'artisan')))) {
      if (stryMutAct_9fa48("11653")) {
        {}
      } else {
        stryCov_9fa48("11653");
        if (stryMutAct_9fa48("11656") ? (item.placement !== 'key' || item.sizeU !== null && (typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU) || item.sizeU <= 0 || item.sizeU > 10)) && item.stem !== null && item.stem !== 'mx' && item.stem !== 'choc' : stryMutAct_9fa48("11655") ? false : stryMutAct_9fa48("11654") ? true : (stryCov_9fa48("11654", "11655", "11656"), (stryMutAct_9fa48("11658") ? item.placement !== 'key' && item.sizeU !== null && (typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU) || item.sizeU <= 0 || item.sizeU > 10) : stryMutAct_9fa48("11657") ? false : (stryCov_9fa48("11657", "11658"), (stryMutAct_9fa48("11660") ? item.placement === 'key' : stryMutAct_9fa48("11659") ? false : (stryCov_9fa48("11659", "11660"), item.placement !== (stryMutAct_9fa48("11661") ? "" : (stryCov_9fa48("11661"), 'key')))) || (stryMutAct_9fa48("11663") ? item.sizeU !== null || typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU) || item.sizeU <= 0 || item.sizeU > 10 : stryMutAct_9fa48("11662") ? false : (stryCov_9fa48("11662", "11663"), (stryMutAct_9fa48("11665") ? item.sizeU === null : stryMutAct_9fa48("11664") ? true : (stryCov_9fa48("11664", "11665"), item.sizeU !== null)) && (stryMutAct_9fa48("11667") ? (typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU) || item.sizeU <= 0) && item.sizeU > 10 : stryMutAct_9fa48("11666") ? true : (stryCov_9fa48("11666", "11667"), (stryMutAct_9fa48("11669") ? (typeof item.sizeU !== 'number' || !Number.isFinite(item.sizeU)) && item.sizeU <= 0 : stryMutAct_9fa48("11668") ? false : (stryCov_9fa48("11668", "11669"), (stryMutAct_9fa48("11671") ? typeof item.sizeU !== 'number' && !Number.isFinite(item.sizeU) : stryMutAct_9fa48("11670") ? false : (stryCov_9fa48("11670", "11671"), (stryMutAct_9fa48("11673") ? typeof item.sizeU === 'number' : stryMutAct_9fa48("11672") ? false : (stryCov_9fa48("11672", "11673"), typeof item.sizeU !== (stryMutAct_9fa48("11674") ? "" : (stryCov_9fa48("11674"), 'number')))) || (stryMutAct_9fa48("11675") ? Number.isFinite(item.sizeU) : (stryCov_9fa48("11675"), !Number.isFinite(item.sizeU))))) || (stryMutAct_9fa48("11678") ? item.sizeU > 0 : stryMutAct_9fa48("11677") ? item.sizeU < 0 : stryMutAct_9fa48("11676") ? false : (stryCov_9fa48("11676", "11677", "11678"), item.sizeU <= 0)))) || (stryMutAct_9fa48("11681") ? item.sizeU <= 10 : stryMutAct_9fa48("11680") ? item.sizeU >= 10 : stryMutAct_9fa48("11679") ? false : (stryCov_9fa48("11679", "11680", "11681"), item.sizeU > 10)))))))) || (stryMutAct_9fa48("11683") ? item.stem !== null && item.stem !== 'mx' || item.stem !== 'choc' : stryMutAct_9fa48("11682") ? false : (stryCov_9fa48("11682", "11683"), (stryMutAct_9fa48("11685") ? item.stem !== null || item.stem !== 'mx' : stryMutAct_9fa48("11684") ? true : (stryCov_9fa48("11684", "11685"), (stryMutAct_9fa48("11687") ? item.stem === null : stryMutAct_9fa48("11686") ? true : (stryCov_9fa48("11686", "11687"), item.stem !== null)) && (stryMutAct_9fa48("11689") ? item.stem === 'mx' : stryMutAct_9fa48("11688") ? true : (stryCov_9fa48("11688", "11689"), item.stem !== (stryMutAct_9fa48("11690") ? "" : (stryCov_9fa48("11690"), 'mx')))))) && (stryMutAct_9fa48("11692") ? item.stem === 'choc' : stryMutAct_9fa48("11691") ? true : (stryCov_9fa48("11691", "11692"), item.stem !== (stryMutAct_9fa48("11693") ? "" : (stryCov_9fa48("11693"), 'choc')))))))) throw new Error(stryMutAct_9fa48("11695") ? "" : (stryCov_9fa48("11695"), 'Invalid imported artisan specification.'));
        return stryMutAct_9fa48("11696") ? {} : (stryCov_9fa48("11696"), {
          ...info,
          kind,
          placement: stryMutAct_9fa48("11697") ? "" : (stryCov_9fa48("11697"), 'key'),
          sizeU: item.sizeU,
          stem: item.stem
        });
      }
    }
    if (stryMutAct_9fa48("11700") ? item.sizeU !== null && item.stem !== null : stryMutAct_9fa48("11699") ? false : stryMutAct_9fa48("11698") ? true : (stryCov_9fa48("11698", "11699", "11700"), (stryMutAct_9fa48("11702") ? item.sizeU === null : stryMutAct_9fa48("11701") ? false : (stryCov_9fa48("11701", "11702"), item.sizeU !== null)) || (stryMutAct_9fa48("11704") ? item.stem === null : stryMutAct_9fa48("11703") ? false : (stryCov_9fa48("11703", "11704"), item.stem !== null)))) throw new Error(stryMutAct_9fa48("11706") ? "" : (stryCov_9fa48("11706"), 'Module references cannot supply keycap dimensions.'));
    if (stryMutAct_9fa48("11709") ? kind === 'knob' && kind === 'encoder' : stryMutAct_9fa48("11708") ? false : stryMutAct_9fa48("11707") ? true : (stryCov_9fa48("11707", "11708", "11709"), (stryMutAct_9fa48("11711") ? kind !== 'knob' : stryMutAct_9fa48("11710") ? false : (stryCov_9fa48("11710", "11711"), kind === (stryMutAct_9fa48("11712") ? "" : (stryCov_9fa48("11712"), 'knob')))) || (stryMutAct_9fa48("11714") ? kind !== 'encoder' : stryMutAct_9fa48("11713") ? false : (stryCov_9fa48("11713", "11714"), kind === (stryMutAct_9fa48("11715") ? "" : (stryCov_9fa48("11715"), 'encoder')))))) {
      if (stryMutAct_9fa48("11716")) {
        {}
      } else {
        stryCov_9fa48("11716");
        if (stryMutAct_9fa48("11719") ? item.placement === 'embedded' : stryMutAct_9fa48("11718") ? false : stryMutAct_9fa48("11717") ? true : (stryCov_9fa48("11717", "11718", "11719"), item.placement !== (stryMutAct_9fa48("11720") ? "" : (stryCov_9fa48("11720"), 'embedded')))) throw new Error(stryMutAct_9fa48("11722") ? "" : (stryCov_9fa48("11722"), 'Choose an embedded placement for this accessory.'));
        return stryMutAct_9fa48("11723") ? {} : (stryCov_9fa48("11723"), {
          ...info,
          kind,
          placement: stryMutAct_9fa48("11724") ? "" : (stryCov_9fa48("11724"), 'embedded'),
          sizeU: null,
          stem: null
        });
      }
    }
    if (stryMutAct_9fa48("11727") ? kind !== 'macropad' : stryMutAct_9fa48("11726") ? false : stryMutAct_9fa48("11725") ? true : (stryCov_9fa48("11725", "11726", "11727"), kind === (stryMutAct_9fa48("11728") ? "" : (stryCov_9fa48("11728"), 'macropad')))) {
      if (stryMutAct_9fa48("11729")) {
        {}
      } else {
        stryCov_9fa48("11729");
        if (stryMutAct_9fa48("11732") ? item.placement === 'external' : stryMutAct_9fa48("11731") ? false : stryMutAct_9fa48("11730") ? true : (stryCov_9fa48("11730", "11731", "11732"), item.placement !== (stryMutAct_9fa48("11733") ? "" : (stryCov_9fa48("11733"), 'external')))) throw new Error(stryMutAct_9fa48("11735") ? "" : (stryCov_9fa48("11735"), 'A macropad needs an external placement.'));
        return stryMutAct_9fa48("11736") ? {} : (stryCov_9fa48("11736"), {
          ...info,
          kind,
          placement: stryMutAct_9fa48("11737") ? "" : (stryCov_9fa48("11737"), 'external'),
          sizeU: null,
          stem: null
        });
      }
    }
    if (stryMutAct_9fa48("11740") ? kind === 'screen' && kind === 'buttons' : stryMutAct_9fa48("11739") ? false : stryMutAct_9fa48("11738") ? true : (stryCov_9fa48("11738", "11739", "11740"), (stryMutAct_9fa48("11742") ? kind !== 'screen' : stryMutAct_9fa48("11741") ? false : (stryCov_9fa48("11741", "11742"), kind === (stryMutAct_9fa48("11743") ? "" : (stryCov_9fa48("11743"), 'screen')))) || (stryMutAct_9fa48("11745") ? kind !== 'buttons' : stryMutAct_9fa48("11744") ? false : (stryCov_9fa48("11744", "11745"), kind === (stryMutAct_9fa48("11746") ? "" : (stryCov_9fa48("11746"), 'buttons')))))) {
      if (stryMutAct_9fa48("11747")) {
        {}
      } else {
        stryCov_9fa48("11747");
        if (stryMutAct_9fa48("11750") ? item.placement !== 'external' || item.placement !== 'embedded' : stryMutAct_9fa48("11749") ? false : stryMutAct_9fa48("11748") ? true : (stryCov_9fa48("11748", "11749", "11750"), (stryMutAct_9fa48("11752") ? item.placement === 'external' : stryMutAct_9fa48("11751") ? true : (stryCov_9fa48("11751", "11752"), item.placement !== (stryMutAct_9fa48("11753") ? "" : (stryCov_9fa48("11753"), 'external')))) && (stryMutAct_9fa48("11755") ? item.placement === 'embedded' : stryMutAct_9fa48("11754") ? true : (stryCov_9fa48("11754", "11755"), item.placement !== (stryMutAct_9fa48("11756") ? "" : (stryCov_9fa48("11756"), 'embedded')))))) throw new Error(stryMutAct_9fa48("11758") ? "" : (stryCov_9fa48("11758"), 'Choose a module placement.'));
        return stryMutAct_9fa48("11759") ? {} : (stryCov_9fa48("11759"), {
          ...info,
          kind,
          placement: item.placement,
          sizeU: null,
          stem: null
        });
      }
    }
    throw new Error(stryMutAct_9fa48("11761") ? "" : (stryCov_9fa48("11761"), 'Choose a supported accessory category.'));
  }
}
export function parseCustomAccessories(value: unknown): ImportedAccessory[] {
  if (stryMutAct_9fa48("11762")) {
    {}
  } else {
    stryCov_9fa48("11762");
    if (stryMutAct_9fa48("11765") ? value !== undefined : stryMutAct_9fa48("11764") ? false : stryMutAct_9fa48("11763") ? true : (stryCov_9fa48("11763", "11764", "11765"), value === undefined)) return stryMutAct_9fa48("11766") ? ["Stryker was here"] : (stryCov_9fa48("11766"), []);
    if (stryMutAct_9fa48("11769") ? !Array.isArray(value) && value.length > 100 : stryMutAct_9fa48("11768") ? false : stryMutAct_9fa48("11767") ? true : (stryCov_9fa48("11767", "11768", "11769"), (stryMutAct_9fa48("11770") ? Array.isArray(value) : (stryCov_9fa48("11770"), !Array.isArray(value))) || (stryMutAct_9fa48("11773") ? value.length <= 100 : stryMutAct_9fa48("11772") ? value.length >= 100 : stryMutAct_9fa48("11771") ? false : (stryCov_9fa48("11771", "11772", "11773"), value.length > 100)))) throw new Error(stryMutAct_9fa48("11775") ? "" : (stryCov_9fa48("11775"), 'Choose at most 100 imported accessory references.'));
    const products = value.map(parseImportedAccessory);
    if (stryMutAct_9fa48("11778") ? new Set(products.map(product => product.id)).size === products.length : stryMutAct_9fa48("11777") ? false : stryMutAct_9fa48("11776") ? true : (stryCov_9fa48("11776", "11777", "11778"), new Set(products.map(stryMutAct_9fa48("11779") ? () => undefined : (stryCov_9fa48("11779"), product => product.id))).size !== products.length)) throw new Error(stryMutAct_9fa48("11781") ? "" : (stryCov_9fa48("11781"), 'Duplicate imported accessory identity.'));
    return products;
  }
}
export function resolveAccessoryProducts(custom: readonly ImportedAccessory[] = stryMutAct_9fa48("11782") ? ["Stryker was here"] : (stryCov_9fa48("11782"), [])): readonly AccessoryProduct[] {
  if (stryMutAct_9fa48("11783")) {
    {}
  } else {
    stryCov_9fa48("11783");
    return stryMutAct_9fa48("11784") ? [] : (stryCov_9fa48("11784"), [...accessoryCatalog, ...custom]);
  }
}
export async function createImportedAccessory(value: Omit<ImportedAccessory, 'id'>): Promise<ImportedAccessory> {
  if (stryMutAct_9fa48("11785")) {
    {}
  } else {
    stryCov_9fa48("11785");
    const normalized = parseImportedAccessory(stryMutAct_9fa48("11786") ? {} : (stryCov_9fa48("11786"), {
      ...value,
      id: stryMutAct_9fa48("11787") ? `` : (stryCov_9fa48("11787"), `import-accessory:${(stryMutAct_9fa48("11788") ? "" : (stryCov_9fa48("11788"), '0')).repeat(64)}`)
    }));
    const identity = await digestText(JSON.stringify(stryMutAct_9fa48("11789") ? [] : (stryCov_9fa48("11789"), [normalized.source, normalized.sku, normalized.name, normalized.kind, normalized.placement])));
    return stryMutAct_9fa48("11790") ? {} : (stryCov_9fa48("11790"), {
      ...normalized,
      id: stryMutAct_9fa48("11791") ? `` : (stryCov_9fa48("11791"), `import-accessory:${identity}`)
    });
  }
}
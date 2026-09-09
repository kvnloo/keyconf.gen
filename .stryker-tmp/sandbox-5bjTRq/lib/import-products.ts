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
import { exactPrice, isProductPrice, offerPricing, type ProductPrice } from './product-pricing.ts';
export type ImportedProduct = {
  name: string;
  brand: string;
  url: string;
  sku: string;
  pricing: ProductPrice;
  availability: string;
};
export type ImportResult = {
  products: ImportedProduct[];
  method: string;
  source: string;
  observedAt: string;
  coverage: string;
  next?: ImportContinuation | null;
};
type CatalogCursor = {
  kind: 'done';
} | {
  kind: 'more';
  after: string;
};
export type ImportContinuation = {
  kind: 'shopify';
  source: string;
  catalog: CatalogCursor;
  variants: {
    id: string;
    after: string;
  }[];
};
function record(x: unknown): x is Record<string, unknown> {
  if (stryMutAct_9fa48("10529")) {
    {}
  } else {
    stryCov_9fa48("10529");
    return stryMutAct_9fa48("10532") ? typeof x === 'object' && x !== null || !Array.isArray(x) : stryMutAct_9fa48("10531") ? false : stryMutAct_9fa48("10530") ? true : (stryCov_9fa48("10530", "10531", "10532"), (stryMutAct_9fa48("10534") ? typeof x === 'object' || x !== null : stryMutAct_9fa48("10533") ? true : (stryCov_9fa48("10533", "10534"), (stryMutAct_9fa48("10536") ? typeof x !== 'object' : stryMutAct_9fa48("10535") ? true : (stryCov_9fa48("10535", "10536"), typeof x === (stryMutAct_9fa48("10537") ? "" : (stryCov_9fa48("10537"), 'object')))) && (stryMutAct_9fa48("10539") ? x === null : stryMutAct_9fa48("10538") ? true : (stryCov_9fa48("10538", "10539"), x !== null)))) && (stryMutAct_9fa48("10540") ? Array.isArray(x) : (stryCov_9fa48("10540"), !Array.isArray(x))));
  }
}
function cursor(value: unknown): value is string {
  if (stryMutAct_9fa48("10541")) {
    {}
  } else {
    stryCov_9fa48("10541");
    return stryMutAct_9fa48("10544") ? typeof value === 'string' && value.length > 0 || value.length <= 512 : stryMutAct_9fa48("10543") ? false : stryMutAct_9fa48("10542") ? true : (stryCov_9fa48("10542", "10543", "10544"), (stryMutAct_9fa48("10546") ? typeof value === 'string' || value.length > 0 : stryMutAct_9fa48("10545") ? true : (stryCov_9fa48("10545", "10546"), (stryMutAct_9fa48("10548") ? typeof value !== 'string' : stryMutAct_9fa48("10547") ? true : (stryCov_9fa48("10547", "10548"), typeof value === (stryMutAct_9fa48("10549") ? "" : (stryCov_9fa48("10549"), 'string')))) && (stryMutAct_9fa48("10552") ? value.length <= 0 : stryMutAct_9fa48("10551") ? value.length >= 0 : stryMutAct_9fa48("10550") ? true : (stryCov_9fa48("10550", "10551", "10552"), value.length > 0)))) && (stryMutAct_9fa48("10555") ? value.length > 512 : stryMutAct_9fa48("10554") ? value.length < 512 : stryMutAct_9fa48("10553") ? true : (stryCov_9fa48("10553", "10554", "10555"), value.length <= 512)));
  }
}
export function isImportContinuation(value: unknown): value is ImportContinuation {
  if (stryMutAct_9fa48("10556")) {
    {}
  } else {
    stryCov_9fa48("10556");
    return stryMutAct_9fa48("10559") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 && record(value.catalog) && (value.catalog.kind === 'done' || value.catalog.kind === 'more' && cursor(value.catalog.after)) && Array.isArray(value.variants) && value.variants.length <= 8 && value.variants.every(item => record(item) && typeof item.id === 'string' && /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) && cursor(item.after)) && new Set(value.variants.map(item => item.id)).size === value.variants.length || value.catalog.kind === 'more' || value.variants.length > 0 : stryMutAct_9fa48("10558") ? false : stryMutAct_9fa48("10557") ? true : (stryCov_9fa48("10557", "10558", "10559"), (stryMutAct_9fa48("10561") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 && record(value.catalog) && (value.catalog.kind === 'done' || value.catalog.kind === 'more' && cursor(value.catalog.after)) && Array.isArray(value.variants) && value.variants.length <= 8 && value.variants.every(item => record(item) && typeof item.id === 'string' && /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) && cursor(item.after)) || new Set(value.variants.map(item => item.id)).size === value.variants.length : stryMutAct_9fa48("10560") ? true : (stryCov_9fa48("10560", "10561"), (stryMutAct_9fa48("10563") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 && record(value.catalog) && (value.catalog.kind === 'done' || value.catalog.kind === 'more' && cursor(value.catalog.after)) && Array.isArray(value.variants) && value.variants.length <= 8 || value.variants.every(item => record(item) && typeof item.id === 'string' && /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) && cursor(item.after)) : stryMutAct_9fa48("10562") ? true : (stryCov_9fa48("10562", "10563"), (stryMutAct_9fa48("10565") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 && record(value.catalog) && (value.catalog.kind === 'done' || value.catalog.kind === 'more' && cursor(value.catalog.after)) && Array.isArray(value.variants) || value.variants.length <= 8 : stryMutAct_9fa48("10564") ? true : (stryCov_9fa48("10564", "10565"), (stryMutAct_9fa48("10567") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 && record(value.catalog) && (value.catalog.kind === 'done' || value.catalog.kind === 'more' && cursor(value.catalog.after)) || Array.isArray(value.variants) : stryMutAct_9fa48("10566") ? true : (stryCov_9fa48("10566", "10567"), (stryMutAct_9fa48("10569") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 && record(value.catalog) || value.catalog.kind === 'done' || value.catalog.kind === 'more' && cursor(value.catalog.after) : stryMutAct_9fa48("10568") ? true : (stryCov_9fa48("10568", "10569"), (stryMutAct_9fa48("10571") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' && value.source.length <= 2048 || record(value.catalog) : stryMutAct_9fa48("10570") ? true : (stryCov_9fa48("10570", "10571"), (stryMutAct_9fa48("10573") ? record(value) && value.kind === 'shopify' && typeof value.source === 'string' || value.source.length <= 2048 : stryMutAct_9fa48("10572") ? true : (stryCov_9fa48("10572", "10573"), (stryMutAct_9fa48("10575") ? record(value) && value.kind === 'shopify' || typeof value.source === 'string' : stryMutAct_9fa48("10574") ? true : (stryCov_9fa48("10574", "10575"), (stryMutAct_9fa48("10577") ? record(value) || value.kind === 'shopify' : stryMutAct_9fa48("10576") ? true : (stryCov_9fa48("10576", "10577"), record(value) && (stryMutAct_9fa48("10579") ? value.kind !== 'shopify' : stryMutAct_9fa48("10578") ? true : (stryCov_9fa48("10578", "10579"), value.kind === (stryMutAct_9fa48("10580") ? "" : (stryCov_9fa48("10580"), 'shopify')))))) && (stryMutAct_9fa48("10582") ? typeof value.source !== 'string' : stryMutAct_9fa48("10581") ? true : (stryCov_9fa48("10581", "10582"), typeof value.source === (stryMutAct_9fa48("10583") ? "" : (stryCov_9fa48("10583"), 'string')))))) && (stryMutAct_9fa48("10586") ? value.source.length > 2048 : stryMutAct_9fa48("10585") ? value.source.length < 2048 : stryMutAct_9fa48("10584") ? true : (stryCov_9fa48("10584", "10585", "10586"), value.source.length <= 2048)))) && record(value.catalog))) && (stryMutAct_9fa48("10588") ? value.catalog.kind === 'done' && value.catalog.kind === 'more' && cursor(value.catalog.after) : stryMutAct_9fa48("10587") ? true : (stryCov_9fa48("10587", "10588"), (stryMutAct_9fa48("10590") ? value.catalog.kind !== 'done' : stryMutAct_9fa48("10589") ? false : (stryCov_9fa48("10589", "10590"), value.catalog.kind === (stryMutAct_9fa48("10591") ? "" : (stryCov_9fa48("10591"), 'done')))) || (stryMutAct_9fa48("10593") ? value.catalog.kind === 'more' || cursor(value.catalog.after) : stryMutAct_9fa48("10592") ? false : (stryCov_9fa48("10592", "10593"), (stryMutAct_9fa48("10595") ? value.catalog.kind !== 'more' : stryMutAct_9fa48("10594") ? true : (stryCov_9fa48("10594", "10595"), value.catalog.kind === (stryMutAct_9fa48("10596") ? "" : (stryCov_9fa48("10596"), 'more')))) && cursor(value.catalog.after))))))) && Array.isArray(value.variants))) && (stryMutAct_9fa48("10599") ? value.variants.length > 8 : stryMutAct_9fa48("10598") ? value.variants.length < 8 : stryMutAct_9fa48("10597") ? true : (stryCov_9fa48("10597", "10598", "10599"), value.variants.length <= 8)))) && (stryMutAct_9fa48("10600") ? value.variants.some(item => record(item) && typeof item.id === 'string' && /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) && cursor(item.after)) : (stryCov_9fa48("10600"), value.variants.every(stryMutAct_9fa48("10601") ? () => undefined : (stryCov_9fa48("10601"), item => stryMutAct_9fa48("10604") ? record(item) && typeof item.id === 'string' && /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) || cursor(item.after) : stryMutAct_9fa48("10603") ? false : stryMutAct_9fa48("10602") ? true : (stryCov_9fa48("10602", "10603", "10604"), (stryMutAct_9fa48("10606") ? record(item) && typeof item.id === 'string' || /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) : stryMutAct_9fa48("10605") ? true : (stryCov_9fa48("10605", "10606"), (stryMutAct_9fa48("10608") ? record(item) || typeof item.id === 'string' : stryMutAct_9fa48("10607") ? true : (stryCov_9fa48("10607", "10608"), record(item) && (stryMutAct_9fa48("10610") ? typeof item.id !== 'string' : stryMutAct_9fa48("10609") ? true : (stryCov_9fa48("10609", "10610"), typeof item.id === (stryMutAct_9fa48("10611") ? "" : (stryCov_9fa48("10611"), 'string')))))) && (stryMutAct_9fa48("10615") ? /^gid:\/\/shopify\/Product\/\D{1,30}$/ : stryMutAct_9fa48("10614") ? /^gid:\/\/shopify\/Product\/\d$/ : stryMutAct_9fa48("10613") ? /^gid:\/\/shopify\/Product\/\d{1,30}/ : stryMutAct_9fa48("10612") ? /gid:\/\/shopify\/Product\/\d{1,30}$/ : (stryCov_9fa48("10612", "10613", "10614", "10615"), /^gid:\/\/shopify\/Product\/\d{1,30}$/)).test(item.id))) && cursor(item.after)))))))) && (stryMutAct_9fa48("10617") ? new Set(value.variants.map(item => item.id)).size !== value.variants.length : stryMutAct_9fa48("10616") ? true : (stryCov_9fa48("10616", "10617"), new Set(value.variants.map(stryMutAct_9fa48("10618") ? () => undefined : (stryCov_9fa48("10618"), item => item.id))).size === value.variants.length)))) && (stryMutAct_9fa48("10620") ? value.catalog.kind === 'more' && value.variants.length > 0 : stryMutAct_9fa48("10619") ? true : (stryCov_9fa48("10619", "10620"), (stryMutAct_9fa48("10622") ? value.catalog.kind !== 'more' : stryMutAct_9fa48("10621") ? false : (stryCov_9fa48("10621", "10622"), value.catalog.kind === (stryMutAct_9fa48("10623") ? "" : (stryCov_9fa48("10623"), 'more')))) || (stryMutAct_9fa48("10626") ? value.variants.length <= 0 : stryMutAct_9fa48("10625") ? value.variants.length >= 0 : stryMutAct_9fa48("10624") ? false : (stryCov_9fa48("10624", "10625", "10626"), value.variants.length > 0)))));
  }
}
function string(x: unknown) {
  if (stryMutAct_9fa48("10627")) {
    {}
  } else {
    stryCov_9fa48("10627");
    return (stryMutAct_9fa48("10630") ? typeof x !== 'string' : stryMutAct_9fa48("10629") ? false : stryMutAct_9fa48("10628") ? true : (stryCov_9fa48("10628", "10629", "10630"), typeof x === (stryMutAct_9fa48("10631") ? "" : (stryCov_9fa48("10631"), 'string')))) ? x : (stryMutAct_9fa48("10634") ? typeof x !== 'number' : stryMutAct_9fa48("10633") ? false : stryMutAct_9fa48("10632") ? true : (stryCov_9fa48("10632", "10633", "10634"), typeof x === (stryMutAct_9fa48("10635") ? "" : (stryCov_9fa48("10635"), 'number')))) ? String(x) : stryMutAct_9fa48("10636") ? "Stryker was here!" : (stryCov_9fa48("10636"), '');
  }
}
function list(value: unknown): unknown[] {
  if (stryMutAct_9fa48("10637")) {
    {}
  } else {
    stryCov_9fa48("10637");
    return Array.isArray(value) ? value : (stryMutAct_9fa48("10640") ? value !== undefined : stryMutAct_9fa48("10639") ? false : stryMutAct_9fa48("10638") ? true : (stryCov_9fa48("10638", "10639", "10640"), value === undefined)) ? stryMutAct_9fa48("10641") ? ["Stryker was here"] : (stryCov_9fa48("10641"), []) : stryMutAct_9fa48("10642") ? [] : (stryCov_9fa48("10642"), [value]);
  }
}
function hasType(value: Record<string, unknown>, type: string) {
  if (stryMutAct_9fa48("10643")) {
    {}
  } else {
    stryCov_9fa48("10643");
    return stryMutAct_9fa48("10644") ? list(value['@type']).every(t => t === type || t === 'schema:' + type || t === 'https://schema.org/' + type || t === 'http://schema.org/' + type) : (stryCov_9fa48("10644"), list(value[stryMutAct_9fa48("10645") ? "" : (stryCov_9fa48("10645"), '@type')]).some(stryMutAct_9fa48("10646") ? () => undefined : (stryCov_9fa48("10646"), t => stryMutAct_9fa48("10649") ? (t === type || t === 'schema:' + type || t === 'https://schema.org/' + type) && t === 'http://schema.org/' + type : stryMutAct_9fa48("10648") ? false : stryMutAct_9fa48("10647") ? true : (stryCov_9fa48("10647", "10648", "10649"), (stryMutAct_9fa48("10651") ? (t === type || t === 'schema:' + type) && t === 'https://schema.org/' + type : stryMutAct_9fa48("10650") ? false : (stryCov_9fa48("10650", "10651"), (stryMutAct_9fa48("10653") ? t === type && t === 'schema:' + type : stryMutAct_9fa48("10652") ? false : (stryCov_9fa48("10652", "10653"), (stryMutAct_9fa48("10655") ? t !== type : stryMutAct_9fa48("10654") ? false : (stryCov_9fa48("10654", "10655"), t === type)) || (stryMutAct_9fa48("10657") ? t !== 'schema:' + type : stryMutAct_9fa48("10656") ? false : (stryCov_9fa48("10656", "10657"), t === (stryMutAct_9fa48("10658") ? "" : (stryCov_9fa48("10658"), 'schema:')) + type)))) || (stryMutAct_9fa48("10660") ? t !== 'https://schema.org/' + type : stryMutAct_9fa48("10659") ? false : (stryCov_9fa48("10659", "10660"), t === (stryMutAct_9fa48("10661") ? "" : (stryCov_9fa48("10661"), 'https://schema.org/')) + type)))) || (stryMutAct_9fa48("10663") ? t !== 'http://schema.org/' + type : stryMutAct_9fa48("10662") ? false : (stryCov_9fa48("10662", "10663"), t === (stryMutAct_9fa48("10664") ? "" : (stryCov_9fa48("10664"), 'http://schema.org/')) + type))))));
  }
}
function safeLink(value: unknown, base: string) {
  if (stryMutAct_9fa48("10665")) {
    {}
  } else {
    stryCov_9fa48("10665");
    try {
      if (stryMutAct_9fa48("10666")) {
        {}
      } else {
        stryCov_9fa48("10666");
        const u = new URL(stryMutAct_9fa48("10669") ? string(value) && base : stryMutAct_9fa48("10668") ? false : stryMutAct_9fa48("10667") ? true : (stryCov_9fa48("10667", "10668", "10669"), string(value) || base), base);
        return (stryMutAct_9fa48("10672") ? u.protocol === 'https:' && !u.username || !u.password : stryMutAct_9fa48("10671") ? false : stryMutAct_9fa48("10670") ? true : (stryCov_9fa48("10670", "10671", "10672"), (stryMutAct_9fa48("10674") ? u.protocol === 'https:' || !u.username : stryMutAct_9fa48("10673") ? true : (stryCov_9fa48("10673", "10674"), (stryMutAct_9fa48("10676") ? u.protocol !== 'https:' : stryMutAct_9fa48("10675") ? true : (stryCov_9fa48("10675", "10676"), u.protocol === (stryMutAct_9fa48("10677") ? "" : (stryCov_9fa48("10677"), 'https:')))) && (stryMutAct_9fa48("10678") ? u.username : (stryCov_9fa48("10678"), !u.username)))) && (stryMutAct_9fa48("10679") ? u.password : (stryCov_9fa48("10679"), !u.password)))) ? u.href : base;
      }
    } catch {
      if (stryMutAct_9fa48("10680")) {
        {}
      } else {
        stryCov_9fa48("10680");
        return base;
      }
    }
  }
}
export function isImportResult(x: unknown): x is ImportResult {
  if (stryMutAct_9fa48("10681")) {
    {}
  } else {
    stryCov_9fa48("10681");
    return stryMutAct_9fa48("10684") ? record(x) && Array.isArray(x.products) && x.products.length <= 80 && x.products.every(p => record(p) && ['name', 'brand', 'url', 'sku', 'availability'].every(k => typeof p[k] === 'string') && isProductPrice(p.pricing)) && ['method', 'source', 'observedAt', 'coverage'].every(k => typeof x[k] === 'string') || x.next === undefined || x.next === null || isImportContinuation(x.next) && x.next.source === x.source : stryMutAct_9fa48("10683") ? false : stryMutAct_9fa48("10682") ? true : (stryCov_9fa48("10682", "10683", "10684"), (stryMutAct_9fa48("10686") ? record(x) && Array.isArray(x.products) && x.products.length <= 80 && x.products.every(p => record(p) && ['name', 'brand', 'url', 'sku', 'availability'].every(k => typeof p[k] === 'string') && isProductPrice(p.pricing)) || ['method', 'source', 'observedAt', 'coverage'].every(k => typeof x[k] === 'string') : stryMutAct_9fa48("10685") ? true : (stryCov_9fa48("10685", "10686"), (stryMutAct_9fa48("10688") ? record(x) && Array.isArray(x.products) && x.products.length <= 80 || x.products.every(p => record(p) && ['name', 'brand', 'url', 'sku', 'availability'].every(k => typeof p[k] === 'string') && isProductPrice(p.pricing)) : stryMutAct_9fa48("10687") ? true : (stryCov_9fa48("10687", "10688"), (stryMutAct_9fa48("10690") ? record(x) && Array.isArray(x.products) || x.products.length <= 80 : stryMutAct_9fa48("10689") ? true : (stryCov_9fa48("10689", "10690"), (stryMutAct_9fa48("10692") ? record(x) || Array.isArray(x.products) : stryMutAct_9fa48("10691") ? true : (stryCov_9fa48("10691", "10692"), record(x) && Array.isArray(x.products))) && (stryMutAct_9fa48("10695") ? x.products.length > 80 : stryMutAct_9fa48("10694") ? x.products.length < 80 : stryMutAct_9fa48("10693") ? true : (stryCov_9fa48("10693", "10694", "10695"), x.products.length <= 80)))) && (stryMutAct_9fa48("10696") ? x.products.some(p => record(p) && ['name', 'brand', 'url', 'sku', 'availability'].every(k => typeof p[k] === 'string') && isProductPrice(p.pricing)) : (stryCov_9fa48("10696"), x.products.every(stryMutAct_9fa48("10697") ? () => undefined : (stryCov_9fa48("10697"), p => stryMutAct_9fa48("10700") ? record(p) && ['name', 'brand', 'url', 'sku', 'availability'].every(k => typeof p[k] === 'string') || isProductPrice(p.pricing) : stryMutAct_9fa48("10699") ? false : stryMutAct_9fa48("10698") ? true : (stryCov_9fa48("10698", "10699", "10700"), (stryMutAct_9fa48("10702") ? record(p) || ['name', 'brand', 'url', 'sku', 'availability'].every(k => typeof p[k] === 'string') : stryMutAct_9fa48("10701") ? true : (stryCov_9fa48("10701", "10702"), record(p) && (stryMutAct_9fa48("10703") ? ['name', 'brand', 'url', 'sku', 'availability'].some(k => typeof p[k] === 'string') : (stryCov_9fa48("10703"), (stryMutAct_9fa48("10704") ? [] : (stryCov_9fa48("10704"), [stryMutAct_9fa48("10705") ? "" : (stryCov_9fa48("10705"), 'name'), stryMutAct_9fa48("10706") ? "" : (stryCov_9fa48("10706"), 'brand'), stryMutAct_9fa48("10707") ? "" : (stryCov_9fa48("10707"), 'url'), stryMutAct_9fa48("10708") ? "" : (stryCov_9fa48("10708"), 'sku'), stryMutAct_9fa48("10709") ? "" : (stryCov_9fa48("10709"), 'availability')])).every(stryMutAct_9fa48("10710") ? () => undefined : (stryCov_9fa48("10710"), k => stryMutAct_9fa48("10713") ? typeof p[k] !== 'string' : stryMutAct_9fa48("10712") ? false : stryMutAct_9fa48("10711") ? true : (stryCov_9fa48("10711", "10712", "10713"), typeof p[k] === (stryMutAct_9fa48("10714") ? "" : (stryCov_9fa48("10714"), 'string'))))))))) && isProductPrice(p.pricing)))))))) && (stryMutAct_9fa48("10715") ? ['method', 'source', 'observedAt', 'coverage'].some(k => typeof x[k] === 'string') : (stryCov_9fa48("10715"), (stryMutAct_9fa48("10716") ? [] : (stryCov_9fa48("10716"), [stryMutAct_9fa48("10717") ? "" : (stryCov_9fa48("10717"), 'method'), stryMutAct_9fa48("10718") ? "" : (stryCov_9fa48("10718"), 'source'), stryMutAct_9fa48("10719") ? "" : (stryCov_9fa48("10719"), 'observedAt'), stryMutAct_9fa48("10720") ? "" : (stryCov_9fa48("10720"), 'coverage')])).every(stryMutAct_9fa48("10721") ? () => undefined : (stryCov_9fa48("10721"), k => stryMutAct_9fa48("10724") ? typeof x[k] !== 'string' : stryMutAct_9fa48("10723") ? false : stryMutAct_9fa48("10722") ? true : (stryCov_9fa48("10722", "10723", "10724"), typeof x[k] === (stryMutAct_9fa48("10725") ? "" : (stryCov_9fa48("10725"), 'string'))))))))) && (stryMutAct_9fa48("10727") ? (x.next === undefined || x.next === null) && isImportContinuation(x.next) && x.next.source === x.source : stryMutAct_9fa48("10726") ? true : (stryCov_9fa48("10726", "10727"), (stryMutAct_9fa48("10729") ? x.next === undefined && x.next === null : stryMutAct_9fa48("10728") ? false : (stryCov_9fa48("10728", "10729"), (stryMutAct_9fa48("10731") ? x.next !== undefined : stryMutAct_9fa48("10730") ? false : (stryCov_9fa48("10730", "10731"), x.next === undefined)) || (stryMutAct_9fa48("10733") ? x.next !== null : stryMutAct_9fa48("10732") ? false : (stryCov_9fa48("10732", "10733"), x.next === null)))) || (stryMutAct_9fa48("10735") ? isImportContinuation(x.next) || x.next.source === x.source : stryMutAct_9fa48("10734") ? false : (stryCov_9fa48("10734", "10735"), isImportContinuation(x.next) && (stryMutAct_9fa48("10737") ? x.next.source !== x.source : stryMutAct_9fa48("10736") ? true : (stryCov_9fa48("10736", "10737"), x.next.source === x.source)))))));
  }
}
export function parseStructuredProducts(html: string, source: string): ImportedProduct[] {
  if (stryMutAct_9fa48("10738")) {
    {}
  } else {
    stryCov_9fa48("10738");
    const nodes: Record<string, unknown>[] = stryMutAct_9fa48("10739") ? ["Stryker was here"] : (stryCov_9fa48("10739"), []);
    const references = new Map<string, Record<string, unknown>>();
    function nodeId(value: unknown) {
      if (stryMutAct_9fa48("10740")) {
        {}
      } else {
        stryCov_9fa48("10740");
        const id = string(value);
        if (stryMutAct_9fa48("10743") ? !id && id.startsWith('_:') : stryMutAct_9fa48("10742") ? false : stryMutAct_9fa48("10741") ? true : (stryCov_9fa48("10741", "10742", "10743"), (stryMutAct_9fa48("10744") ? id : (stryCov_9fa48("10744"), !id)) || (stryMutAct_9fa48("10745") ? id.endsWith('_:') : (stryCov_9fa48("10745"), id.startsWith(stryMutAct_9fa48("10746") ? "" : (stryCov_9fa48("10746"), '_:')))))) return id;
        try {
          if (stryMutAct_9fa48("10747")) {
            {}
          } else {
            stryCov_9fa48("10747");
            return new URL(id, source).href;
          }
        } catch {
          if (stryMutAct_9fa48("10748")) {
            {}
          } else {
            stryCov_9fa48("10748");
            return id;
          }
        }
      }
    }
    function collect(value: unknown, depth = 0) {
      if (stryMutAct_9fa48("10749")) {
        {}
      } else {
        stryCov_9fa48("10749");
        if (stryMutAct_9fa48("10752") ? depth > 12 && nodes.length >= 10000 : stryMutAct_9fa48("10751") ? false : stryMutAct_9fa48("10750") ? true : (stryCov_9fa48("10750", "10751", "10752"), (stryMutAct_9fa48("10755") ? depth <= 12 : stryMutAct_9fa48("10754") ? depth >= 12 : stryMutAct_9fa48("10753") ? false : (stryCov_9fa48("10753", "10754", "10755"), depth > 12)) || (stryMutAct_9fa48("10758") ? nodes.length < 10000 : stryMutAct_9fa48("10757") ? nodes.length > 10000 : stryMutAct_9fa48("10756") ? false : (stryCov_9fa48("10756", "10757", "10758"), nodes.length >= 10000)))) return;
        if (stryMutAct_9fa48("10760") ? false : stryMutAct_9fa48("10759") ? true : (stryCov_9fa48("10759", "10760"), Array.isArray(value))) {
          if (stryMutAct_9fa48("10761")) {
            {}
          } else {
            stryCov_9fa48("10761");
            value.forEach(stryMutAct_9fa48("10763") ? () => undefined : (stryCov_9fa48("10763"), v => collect(v, stryMutAct_9fa48("10764") ? depth - 1 : (stryCov_9fa48("10764"), depth + 1))));
            return;
          }
        }
        if (stryMutAct_9fa48("10767") ? false : stryMutAct_9fa48("10766") ? true : stryMutAct_9fa48("10765") ? record(value) : (stryCov_9fa48("10765", "10766", "10767"), !record(value))) return;
        if (stryMutAct_9fa48("10768")) {
          ;
        } else {
          stryCov_9fa48("10768");
          nodes.push(value);
        }
        const id = nodeId(value[stryMutAct_9fa48("10769") ? "" : (stryCov_9fa48("10769"), '@id')]);
        if (stryMutAct_9fa48("10771") ? false : stryMutAct_9fa48("10770") ? true : (stryCov_9fa48("10770", "10771"), id)) references.set(id, stryMutAct_9fa48("10773") ? {} : (stryCov_9fa48("10773"), {
          ...references.get(id),
          ...value
        }));
        for (const [key, child] of Object.entries(value)) if (stryMutAct_9fa48("10776") ? key === '@context' : stryMutAct_9fa48("10775") ? false : stryMutAct_9fa48("10774") ? true : (stryCov_9fa48("10774", "10775", "10776"), key !== (stryMutAct_9fa48("10777") ? "" : (stryCov_9fa48("10777"), '@context')))) collect(child, stryMutAct_9fa48("10779") ? depth - 1 : (stryCov_9fa48("10779"), depth + 1));
      }
    }
    const script = stryMutAct_9fa48("10787") ? /<script\b([^>]*)>([\s\S]*?)<\/script\S*>/gi : stryMutAct_9fa48("10786") ? /<script\b([^>]*)>([\s\S]*?)<\/script\s>/gi : stryMutAct_9fa48("10785") ? /<script\b([^>]*)>([\s\s]*?)<\/script\s*>/gi : stryMutAct_9fa48("10784") ? /<script\b([^>]*)>([\S\S]*?)<\/script\s*>/gi : stryMutAct_9fa48("10783") ? /<script\b([^>]*)>([^\s\S]*?)<\/script\s*>/gi : stryMutAct_9fa48("10782") ? /<script\b([^>]*)>([\s\S])<\/script\s*>/gi : stryMutAct_9fa48("10781") ? /<script\b([>]*)>([\s\S]*?)<\/script\s*>/gi : stryMutAct_9fa48("10780") ? /<script\b([^>])>([\s\S]*?)<\/script\s*>/gi : (stryCov_9fa48("10780", "10781", "10782", "10783", "10784", "10785", "10786", "10787"), /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi);
    let match: RegExpExecArray | null;
    while (stryMutAct_9fa48("10789") ? (match = script.exec(html)) === null : stryMutAct_9fa48("10788") ? false : (stryCov_9fa48("10788", "10789"), (match = script.exec(html)) !== null)) {
      if (stryMutAct_9fa48("10790")) {
        {}
      } else {
        stryCov_9fa48("10790");
        if (stryMutAct_9fa48("10793") ? false : stryMutAct_9fa48("10792") ? true : stryMutAct_9fa48("10791") ? /type\s*=\s*["']application\/ld\+json["']/i.test(match[1]) : (stryCov_9fa48("10791", "10792", "10793"), !(stryMutAct_9fa48("10799") ? /type\s*=\s*["']application\/ld\+json[^"']/i : stryMutAct_9fa48("10798") ? /type\s*=\s*[^"']application\/ld\+json["']/i : stryMutAct_9fa48("10797") ? /type\s*=\S*["']application\/ld\+json["']/i : stryMutAct_9fa48("10796") ? /type\s*=\s["']application\/ld\+json["']/i : stryMutAct_9fa48("10795") ? /type\S*=\s*["']application\/ld\+json["']/i : stryMutAct_9fa48("10794") ? /type\s=\s*["']application\/ld\+json["']/i : (stryCov_9fa48("10794", "10795", "10796", "10797", "10798", "10799"), /type\s*=\s*["']application\/ld\+json["']/i)).test(match[1]))) continue;
        try {
          if (stryMutAct_9fa48("10800")) {
            {}
          } else {
            stryCov_9fa48("10800");
            if (stryMutAct_9fa48("10801")) {
              ;
            } else {
              stryCov_9fa48("10801");
              collect(JSON.parse(match[2]));
            }
          }
        } catch {
          if (stryMutAct_9fa48("10802")) {
            {}
          } else {
            stryCov_9fa48("10802");
            continue;
          }
        }
      }
    }
    function resolve(value: unknown): Record<string, unknown> | undefined {
      if (stryMutAct_9fa48("10803")) {
        {}
      } else {
        stryCov_9fa48("10803");
        if (stryMutAct_9fa48("10806") ? false : stryMutAct_9fa48("10805") ? true : stryMutAct_9fa48("10804") ? record(value) : (stryCov_9fa48("10804", "10805", "10806"), !record(value))) return undefined;
        const target = references.get(nodeId(value[stryMutAct_9fa48("10807") ? "" : (stryCov_9fa48("10807"), '@id')]));
        return target ? stryMutAct_9fa48("10808") ? {} : (stryCov_9fa48("10808"), {
          ...target,
          ...value
        }) : value;
      }
    }
    const parents = new Map<Record<string, unknown>, Record<string, unknown>>();
    const parentIds = new Map<string, Record<string, unknown>>();
    for (const node of nodes) {
      if (stryMutAct_9fa48("10809")) {
        {}
      } else {
        stryCov_9fa48("10809");
        if (stryMutAct_9fa48("10812") ? false : stryMutAct_9fa48("10811") ? true : stryMutAct_9fa48("10810") ? hasType(node, 'ProductGroup') : (stryCov_9fa48("10810", "10811", "10812"), !hasType(node, stryMutAct_9fa48("10813") ? "" : (stryCov_9fa48("10813"), 'ProductGroup')))) continue;
        for (const variant of list(node.hasVariant)) {
          if (stryMutAct_9fa48("10814")) {
            {}
          } else {
            stryCov_9fa48("10814");
            if (stryMutAct_9fa48("10817") ? false : stryMutAct_9fa48("10816") ? true : stryMutAct_9fa48("10815") ? record(variant) : (stryCov_9fa48("10815", "10816", "10817"), !record(variant))) continue;
            if (stryMutAct_9fa48("10818")) {
              ;
            } else {
              stryCov_9fa48("10818");
              parents.set(variant, node);
            }
            const id = nodeId(variant[stryMutAct_9fa48("10819") ? "" : (stryCov_9fa48("10819"), '@id')]);
            if (stryMutAct_9fa48("10821") ? false : stryMutAct_9fa48("10820") ? true : (stryCov_9fa48("10820", "10821"), id)) if (stryMutAct_9fa48("10822")) {
              ;
            } else {
              stryCov_9fa48("10822");
              parentIds.set(id, node);
            }
          }
        }
      }
    }
    const products: ImportedProduct[] = stryMutAct_9fa48("10823") ? ["Stryker was here"] : (stryCov_9fa48("10823"), []),
      visited = new Set<string>();
    for (const raw of nodes) {
      if (stryMutAct_9fa48("10824")) {
        {}
      } else {
        stryCov_9fa48("10824");
        if (stryMutAct_9fa48("10828") ? products.length < 80 : stryMutAct_9fa48("10827") ? products.length > 80 : stryMutAct_9fa48("10826") ? false : stryMutAct_9fa48("10825") ? true : (stryCov_9fa48("10825", "10826", "10827", "10828"), products.length >= 80)) break;
        const value = resolve(raw);
        if (stryMutAct_9fa48("10831") ? !value && !hasType(value, 'Product') && !hasType(value, 'ProductGroup') : stryMutAct_9fa48("10830") ? false : stryMutAct_9fa48("10829") ? true : (stryCov_9fa48("10829", "10830", "10831"), (stryMutAct_9fa48("10832") ? value : (stryCov_9fa48("10832"), !value)) || (stryMutAct_9fa48("10834") ? !hasType(value, 'Product') || !hasType(value, 'ProductGroup') : stryMutAct_9fa48("10833") ? false : (stryCov_9fa48("10833", "10834"), (stryMutAct_9fa48("10835") ? hasType(value, 'Product') : (stryCov_9fa48("10835"), !hasType(value, stryMutAct_9fa48("10836") ? "" : (stryCov_9fa48("10836"), 'Product')))) && (stryMutAct_9fa48("10837") ? hasType(value, 'ProductGroup') : (stryCov_9fa48("10837"), !hasType(value, stryMutAct_9fa48("10838") ? "" : (stryCov_9fa48("10838"), 'ProductGroup')))))))) continue;
        if (stryMutAct_9fa48("10841") ? hasType(value, 'ProductGroup') || list(value.hasVariant).length : stryMutAct_9fa48("10840") ? false : stryMutAct_9fa48("10839") ? true : (stryCov_9fa48("10839", "10840", "10841"), hasType(value, stryMutAct_9fa48("10842") ? "" : (stryCov_9fa48("10842"), 'ProductGroup')) && list(value.hasVariant).length)) continue;
        const parent = stryMutAct_9fa48("10843") ? (parents.get(raw) ?? parentIds.get(nodeId(value['@id']))) && resolve(value.isVariantOf) : (stryCov_9fa48("10843"), (stryMutAct_9fa48("10844") ? parents.get(raw) && parentIds.get(nodeId(value['@id'])) : (stryCov_9fa48("10844"), parents.get(raw) ?? parentIds.get(nodeId(value[stryMutAct_9fa48("10845") ? "" : (stryCov_9fa48("10845"), '@id')])))) ?? resolve(value.isVariantOf));
        const variation = stryMutAct_9fa48("10846") ? [value.color, value.size, value.material].map(string).join(' · ') : (stryCov_9fa48("10846"), (stryMutAct_9fa48("10847") ? [] : (stryCov_9fa48("10847"), [value.color, value.size, value.material])).map(string).filter(Boolean).join(stryMutAct_9fa48("10848") ? "" : (stryCov_9fa48("10848"), ' · ')));
        const name = stryMutAct_9fa48("10851") ? string(value.name).trim() && [string(parent?.name).trim(), variation || string(value.sku)].filter(Boolean).join(' · ') : stryMutAct_9fa48("10850") ? false : stryMutAct_9fa48("10849") ? true : (stryCov_9fa48("10849", "10850", "10851"), (stryMutAct_9fa48("10852") ? string(value.name) : (stryCov_9fa48("10852"), string(value.name).trim())) || (stryMutAct_9fa48("10853") ? [string(parent?.name).trim(), variation || string(value.sku)].join(' · ') : (stryCov_9fa48("10853"), (stryMutAct_9fa48("10854") ? [] : (stryCov_9fa48("10854"), [stryMutAct_9fa48("10855") ? string(parent?.name) : (stryCov_9fa48("10855"), string(stryMutAct_9fa48("10856") ? parent.name : (stryCov_9fa48("10856"), parent?.name)).trim()), stryMutAct_9fa48("10859") ? variation && string(value.sku) : stryMutAct_9fa48("10858") ? false : stryMutAct_9fa48("10857") ? true : (stryCov_9fa48("10857", "10858", "10859"), variation || string(value.sku))])).filter(Boolean).join(stryMutAct_9fa48("10860") ? "" : (stryCov_9fa48("10860"), ' · ')))));
        if (stryMutAct_9fa48("10863") ? false : stryMutAct_9fa48("10862") ? true : stryMutAct_9fa48("10861") ? name : (stryCov_9fa48("10861", "10862", "10863"), !name)) continue;
        const brandValue = stryMutAct_9fa48("10864") ? value.brand && parent?.brand : (stryCov_9fa48("10864"), value.brand ?? (stryMutAct_9fa48("10865") ? parent.brand : (stryCov_9fa48("10865"), parent?.brand)));
        const brand = record(brandValue) ? string(stryMutAct_9fa48("10866") ? resolve(brandValue).name : (stryCov_9fa48("10866"), resolve(brandValue)?.name)) : string(brandValue);
        const offers = list(value.offers).map(resolve);
        const urls = new Set(stryMutAct_9fa48("10867") ? offers.map(o => string(o?.url)) : (stryCov_9fa48("10867"), offers.map(stryMutAct_9fa48("10868") ? () => undefined : (stryCov_9fa48("10868"), o => string(stryMutAct_9fa48("10869") ? o.url : (stryCov_9fa48("10869"), o?.url)))).filter(Boolean)));
        const offerUrl = (stryMutAct_9fa48("10872") ? urls.size !== 1 : stryMutAct_9fa48("10871") ? false : stryMutAct_9fa48("10870") ? true : (stryCov_9fa48("10870", "10871", "10872"), urls.size === 1)) ? (stryMutAct_9fa48("10873") ? [] : (stryCov_9fa48("10873"), [...urls]))[0] : undefined;
        const url = safeLink(stryMutAct_9fa48("10874") ? (value.url ?? offerUrl) && parent?.url : (stryCov_9fa48("10874"), (stryMutAct_9fa48("10875") ? value.url && offerUrl : (stryCov_9fa48("10875"), value.url ?? offerUrl)) ?? (stryMutAct_9fa48("10876") ? parent.url : (stryCov_9fa48("10876"), parent?.url))), source);
        const sku = string(value.sku);
        const key = sku + (stryMutAct_9fa48("10877") ? "" : (stryCov_9fa48("10877"), '|')) + url + (stryMutAct_9fa48("10878") ? "" : (stryCov_9fa48("10878"), '|')) + name;
        if (stryMutAct_9fa48("10880") ? false : stryMutAct_9fa48("10879") ? true : (stryCov_9fa48("10879", "10880"), visited.has(key))) continue;
        if (stryMutAct_9fa48("10881")) {
          ;
        } else {
          stryCov_9fa48("10881");
          visited.add(key);
        }
        const stocks = offers.map(stryMutAct_9fa48("10882") ? () => undefined : (stryCov_9fa48("10882"), o => stryMutAct_9fa48("10883") ? string(o?.availability).split('/').pop() && '' : (stryCov_9fa48("10883"), string(stryMutAct_9fa48("10884") ? o.availability : (stryCov_9fa48("10884"), o?.availability)).split(stryMutAct_9fa48("10885") ? "" : (stryCov_9fa48("10885"), '/')).pop() ?? (stryMutAct_9fa48("10886") ? "Stryker was here!" : (stryCov_9fa48("10886"), '')))));
        const known = new Set(stryMutAct_9fa48("10887") ? stocks : (stryCov_9fa48("10887"), stocks.filter(Boolean)));
        const availability = (stryMutAct_9fa48("10891") ? known.size <= 1 : stryMutAct_9fa48("10890") ? known.size >= 1 : stryMutAct_9fa48("10889") ? false : stryMutAct_9fa48("10888") ? true : (stryCov_9fa48("10888", "10889", "10890", "10891"), known.size > 1)) ? stryMutAct_9fa48("10892") ? "" : (stryCov_9fa48("10892"), 'Varies by offer') : (stryMutAct_9fa48("10893") ? stocks.every(s => !s) : (stryCov_9fa48("10893"), stocks.some(stryMutAct_9fa48("10894") ? () => undefined : (stryCov_9fa48("10894"), s => stryMutAct_9fa48("10895") ? s : (stryCov_9fa48("10895"), !s))))) ? stryMutAct_9fa48("10896") ? "Stryker was here!" : (stryCov_9fa48("10896"), '') : stryMutAct_9fa48("10897") ? stocks[0] && '' : (stryCov_9fa48("10897"), stocks[0] ?? (stryMutAct_9fa48("10898") ? "Stryker was here!" : (stryCov_9fa48("10898"), '')));
        products.push(stryMutAct_9fa48("10900") ? {} : (stryCov_9fa48("10900"), {
          name: stryMutAct_9fa48("10901") ? name : (stryCov_9fa48("10901"), name.slice(0, 300)),
          brand: stryMutAct_9fa48("10902") ? brand : (stryCov_9fa48("10902"), brand.slice(0, 150)),
          url,
          sku,
          pricing: offerPricing(offers),
          availability
        }));
      }
    }
    return products;
  }
}
export function publicUrl(input: string): URL {
  if (stryMutAct_9fa48("10903")) {
    {}
  } else {
    stryCov_9fa48("10903");
    const u = new URL(input);
    const host = stryMutAct_9fa48("10904") ? u.hostname.toUpperCase() : (stryCov_9fa48("10904"), u.hostname.toLowerCase());
    if (stryMutAct_9fa48("10907") ? (u.protocol !== 'https:' || u.username || u.password || u.port && u.port !== '443' || !host.includes('.') || /^[\d.]+$/.test(host) || host.includes(':') || host.endsWith('.local') || host.endsWith('.localhost')) && host.endsWith('.internal') : stryMutAct_9fa48("10906") ? false : stryMutAct_9fa48("10905") ? true : (stryCov_9fa48("10905", "10906", "10907"), (stryMutAct_9fa48("10909") ? (u.protocol !== 'https:' || u.username || u.password || u.port && u.port !== '443' || !host.includes('.') || /^[\d.]+$/.test(host) || host.includes(':') || host.endsWith('.local')) && host.endsWith('.localhost') : stryMutAct_9fa48("10908") ? false : (stryCov_9fa48("10908", "10909"), (stryMutAct_9fa48("10911") ? (u.protocol !== 'https:' || u.username || u.password || u.port && u.port !== '443' || !host.includes('.') || /^[\d.]+$/.test(host) || host.includes(':')) && host.endsWith('.local') : stryMutAct_9fa48("10910") ? false : (stryCov_9fa48("10910", "10911"), (stryMutAct_9fa48("10913") ? (u.protocol !== 'https:' || u.username || u.password || u.port && u.port !== '443' || !host.includes('.') || /^[\d.]+$/.test(host)) && host.includes(':') : stryMutAct_9fa48("10912") ? false : (stryCov_9fa48("10912", "10913"), (stryMutAct_9fa48("10915") ? (u.protocol !== 'https:' || u.username || u.password || u.port && u.port !== '443' || !host.includes('.')) && /^[\d.]+$/.test(host) : stryMutAct_9fa48("10914") ? false : (stryCov_9fa48("10914", "10915"), (stryMutAct_9fa48("10917") ? (u.protocol !== 'https:' || u.username || u.password || u.port && u.port !== '443') && !host.includes('.') : stryMutAct_9fa48("10916") ? false : (stryCov_9fa48("10916", "10917"), (stryMutAct_9fa48("10919") ? (u.protocol !== 'https:' || u.username || u.password) && u.port && u.port !== '443' : stryMutAct_9fa48("10918") ? false : (stryCov_9fa48("10918", "10919"), (stryMutAct_9fa48("10921") ? (u.protocol !== 'https:' || u.username) && u.password : stryMutAct_9fa48("10920") ? false : (stryCov_9fa48("10920", "10921"), (stryMutAct_9fa48("10923") ? u.protocol !== 'https:' && u.username : stryMutAct_9fa48("10922") ? false : (stryCov_9fa48("10922", "10923"), (stryMutAct_9fa48("10925") ? u.protocol === 'https:' : stryMutAct_9fa48("10924") ? false : (stryCov_9fa48("10924", "10925"), u.protocol !== (stryMutAct_9fa48("10926") ? "" : (stryCov_9fa48("10926"), 'https:')))) || u.username)) || u.password)) || (stryMutAct_9fa48("10928") ? u.port || u.port !== '443' : stryMutAct_9fa48("10927") ? false : (stryCov_9fa48("10927", "10928"), u.port && (stryMutAct_9fa48("10930") ? u.port === '443' : stryMutAct_9fa48("10929") ? true : (stryCov_9fa48("10929", "10930"), u.port !== (stryMutAct_9fa48("10931") ? "" : (stryCov_9fa48("10931"), '443')))))))) || (stryMutAct_9fa48("10932") ? host.includes('.') : (stryCov_9fa48("10932"), !host.includes(stryMutAct_9fa48("10933") ? "" : (stryCov_9fa48("10933"), '.')))))) || (stryMutAct_9fa48("10938") ? /^[\D.]+$/ : stryMutAct_9fa48("10937") ? /^[^\d.]+$/ : stryMutAct_9fa48("10936") ? /^[\d.]$/ : stryMutAct_9fa48("10935") ? /^[\d.]+/ : stryMutAct_9fa48("10934") ? /[\d.]+$/ : (stryCov_9fa48("10934", "10935", "10936", "10937", "10938"), /^[\d.]+$/)).test(host))) || host.includes(stryMutAct_9fa48("10939") ? "" : (stryCov_9fa48("10939"), ':')))) || (stryMutAct_9fa48("10940") ? host.startsWith('.local') : (stryCov_9fa48("10940"), host.endsWith(stryMutAct_9fa48("10941") ? "" : (stryCov_9fa48("10941"), '.local')))))) || (stryMutAct_9fa48("10942") ? host.startsWith('.localhost') : (stryCov_9fa48("10942"), host.endsWith(stryMutAct_9fa48("10943") ? "" : (stryCov_9fa48("10943"), '.localhost')))))) || (stryMutAct_9fa48("10944") ? host.startsWith('.internal') : (stryCov_9fa48("10944"), host.endsWith(stryMutAct_9fa48("10945") ? "" : (stryCov_9fa48("10945"), '.internal')))))) throw new Error(stryMutAct_9fa48("10947") ? "" : (stryCov_9fa48("10947"), 'Use a public HTTPS product or store URL.'));
    u.hash = stryMutAct_9fa48("10948") ? "Stryker was here!" : (stryCov_9fa48("10948"), '');
    return u;
  }
}
export function isPublicAddress(ip: string) {
  if (stryMutAct_9fa48("10949")) {
    {}
  } else {
    stryCov_9fa48("10949");
    if (stryMutAct_9fa48("10951") ? false : stryMutAct_9fa48("10950") ? true : (stryCov_9fa48("10950", "10951"), ip.includes(stryMutAct_9fa48("10952") ? "" : (stryCov_9fa48("10952"), ':')))) {
      if (stryMutAct_9fa48("10953")) {
        {}
      } else {
        stryCov_9fa48("10953");
        const p = stryMutAct_9fa48("10954") ? ip.toUpperCase() : (stryCov_9fa48("10954"), ip.toLowerCase());
        return stryMutAct_9fa48("10957") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') && !p.startsWith('fe9') && !p.startsWith('fea') && !p.startsWith('feb') && !p.startsWith('ff') && !p.startsWith('::') && p !== '::1' || /^[23]/.test(p) : stryMutAct_9fa48("10956") ? false : stryMutAct_9fa48("10955") ? true : (stryCov_9fa48("10955", "10956", "10957"), (stryMutAct_9fa48("10959") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') && !p.startsWith('fe9') && !p.startsWith('fea') && !p.startsWith('feb') && !p.startsWith('ff') && !p.startsWith('::') || p !== '::1' : stryMutAct_9fa48("10958") ? true : (stryCov_9fa48("10958", "10959"), (stryMutAct_9fa48("10961") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') && !p.startsWith('fe9') && !p.startsWith('fea') && !p.startsWith('feb') && !p.startsWith('ff') || !p.startsWith('::') : stryMutAct_9fa48("10960") ? true : (stryCov_9fa48("10960", "10961"), (stryMutAct_9fa48("10963") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') && !p.startsWith('fe9') && !p.startsWith('fea') && !p.startsWith('feb') || !p.startsWith('ff') : stryMutAct_9fa48("10962") ? true : (stryCov_9fa48("10962", "10963"), (stryMutAct_9fa48("10965") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') && !p.startsWith('fe9') && !p.startsWith('fea') || !p.startsWith('feb') : stryMutAct_9fa48("10964") ? true : (stryCov_9fa48("10964", "10965"), (stryMutAct_9fa48("10967") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') && !p.startsWith('fe9') || !p.startsWith('fea') : stryMutAct_9fa48("10966") ? true : (stryCov_9fa48("10966", "10967"), (stryMutAct_9fa48("10969") ? !p.startsWith('fc') && !p.startsWith('fd') && !p.startsWith('fe8') || !p.startsWith('fe9') : stryMutAct_9fa48("10968") ? true : (stryCov_9fa48("10968", "10969"), (stryMutAct_9fa48("10971") ? !p.startsWith('fc') && !p.startsWith('fd') || !p.startsWith('fe8') : stryMutAct_9fa48("10970") ? true : (stryCov_9fa48("10970", "10971"), (stryMutAct_9fa48("10973") ? !p.startsWith('fc') || !p.startsWith('fd') : stryMutAct_9fa48("10972") ? true : (stryCov_9fa48("10972", "10973"), (stryMutAct_9fa48("10974") ? p.startsWith('fc') : (stryCov_9fa48("10974"), !(stryMutAct_9fa48("10975") ? p.endsWith('fc') : (stryCov_9fa48("10975"), p.startsWith(stryMutAct_9fa48("10976") ? "" : (stryCov_9fa48("10976"), 'fc')))))) && (stryMutAct_9fa48("10977") ? p.startsWith('fd') : (stryCov_9fa48("10977"), !(stryMutAct_9fa48("10978") ? p.endsWith('fd') : (stryCov_9fa48("10978"), p.startsWith(stryMutAct_9fa48("10979") ? "" : (stryCov_9fa48("10979"), 'fd')))))))) && (stryMutAct_9fa48("10980") ? p.startsWith('fe8') : (stryCov_9fa48("10980"), !(stryMutAct_9fa48("10981") ? p.endsWith('fe8') : (stryCov_9fa48("10981"), p.startsWith(stryMutAct_9fa48("10982") ? "" : (stryCov_9fa48("10982"), 'fe8')))))))) && (stryMutAct_9fa48("10983") ? p.startsWith('fe9') : (stryCov_9fa48("10983"), !(stryMutAct_9fa48("10984") ? p.endsWith('fe9') : (stryCov_9fa48("10984"), p.startsWith(stryMutAct_9fa48("10985") ? "" : (stryCov_9fa48("10985"), 'fe9')))))))) && (stryMutAct_9fa48("10986") ? p.startsWith('fea') : (stryCov_9fa48("10986"), !(stryMutAct_9fa48("10987") ? p.endsWith('fea') : (stryCov_9fa48("10987"), p.startsWith(stryMutAct_9fa48("10988") ? "" : (stryCov_9fa48("10988"), 'fea')))))))) && (stryMutAct_9fa48("10989") ? p.startsWith('feb') : (stryCov_9fa48("10989"), !(stryMutAct_9fa48("10990") ? p.endsWith('feb') : (stryCov_9fa48("10990"), p.startsWith(stryMutAct_9fa48("10991") ? "" : (stryCov_9fa48("10991"), 'feb')))))))) && (stryMutAct_9fa48("10992") ? p.startsWith('ff') : (stryCov_9fa48("10992"), !(stryMutAct_9fa48("10993") ? p.endsWith('ff') : (stryCov_9fa48("10993"), p.startsWith(stryMutAct_9fa48("10994") ? "" : (stryCov_9fa48("10994"), 'ff')))))))) && (stryMutAct_9fa48("10995") ? p.startsWith('::') : (stryCov_9fa48("10995"), !(stryMutAct_9fa48("10996") ? p.endsWith('::') : (stryCov_9fa48("10996"), p.startsWith(stryMutAct_9fa48("10997") ? "" : (stryCov_9fa48("10997"), '::')))))))) && (stryMutAct_9fa48("10999") ? p === '::1' : stryMutAct_9fa48("10998") ? true : (stryCov_9fa48("10998", "10999"), p !== (stryMutAct_9fa48("11000") ? "" : (stryCov_9fa48("11000"), '::1')))))) && (stryMutAct_9fa48("11002") ? /^[^23]/ : stryMutAct_9fa48("11001") ? /[23]/ : (stryCov_9fa48("11001", "11002"), /^[23]/)).test(p));
      }
    }
    const n = ip.split(stryMutAct_9fa48("11003") ? "" : (stryCov_9fa48("11003"), '.')).map(Number);
    if (stryMutAct_9fa48("11006") ? n.length !== 4 && n.some(x => !Number.isInteger(x) || x < 0 || x > 255) : stryMutAct_9fa48("11005") ? false : stryMutAct_9fa48("11004") ? true : (stryCov_9fa48("11004", "11005", "11006"), (stryMutAct_9fa48("11008") ? n.length === 4 : stryMutAct_9fa48("11007") ? false : (stryCov_9fa48("11007", "11008"), n.length !== 4)) || (stryMutAct_9fa48("11009") ? n.every(x => !Number.isInteger(x) || x < 0 || x > 255) : (stryCov_9fa48("11009"), n.some(stryMutAct_9fa48("11010") ? () => undefined : (stryCov_9fa48("11010"), x => stryMutAct_9fa48("11013") ? (!Number.isInteger(x) || x < 0) && x > 255 : stryMutAct_9fa48("11012") ? false : stryMutAct_9fa48("11011") ? true : (stryCov_9fa48("11011", "11012", "11013"), (stryMutAct_9fa48("11015") ? !Number.isInteger(x) && x < 0 : stryMutAct_9fa48("11014") ? false : (stryCov_9fa48("11014", "11015"), (stryMutAct_9fa48("11016") ? Number.isInteger(x) : (stryCov_9fa48("11016"), !Number.isInteger(x))) || (stryMutAct_9fa48("11019") ? x >= 0 : stryMutAct_9fa48("11018") ? x <= 0 : stryMutAct_9fa48("11017") ? false : (stryCov_9fa48("11017", "11018", "11019"), x < 0)))) || (stryMutAct_9fa48("11022") ? x <= 255 : stryMutAct_9fa48("11021") ? x >= 255 : stryMutAct_9fa48("11020") ? false : (stryCov_9fa48("11020", "11021", "11022"), x > 255))))))))) return stryMutAct_9fa48("11023") ? true : (stryCov_9fa48("11023"), false);
    return stryMutAct_9fa48("11024") ? n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224 || n[0] === 169 && n[1] === 254 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && (n[1] === 168 || n[1] === 0) || n[0] === 100 && n[1] >= 64 && n[1] <= 127 || n[0] === 198 && (n[1] === 18 || n[1] === 19) : (stryCov_9fa48("11024"), !(stryMutAct_9fa48("11027") ? (n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224 || n[0] === 169 && n[1] === 254 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && (n[1] === 168 || n[1] === 0) || n[0] === 100 && n[1] >= 64 && n[1] <= 127) && n[0] === 198 && (n[1] === 18 || n[1] === 19) : stryMutAct_9fa48("11026") ? false : stryMutAct_9fa48("11025") ? true : (stryCov_9fa48("11025", "11026", "11027"), (stryMutAct_9fa48("11029") ? (n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224 || n[0] === 169 && n[1] === 254 || n[0] === 172 && n[1] >= 16 && n[1] <= 31 || n[0] === 192 && (n[1] === 168 || n[1] === 0)) && n[0] === 100 && n[1] >= 64 && n[1] <= 127 : stryMutAct_9fa48("11028") ? false : (stryCov_9fa48("11028", "11029"), (stryMutAct_9fa48("11031") ? (n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224 || n[0] === 169 && n[1] === 254 || n[0] === 172 && n[1] >= 16 && n[1] <= 31) && n[0] === 192 && (n[1] === 168 || n[1] === 0) : stryMutAct_9fa48("11030") ? false : (stryCov_9fa48("11030", "11031"), (stryMutAct_9fa48("11033") ? (n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224 || n[0] === 169 && n[1] === 254) && n[0] === 172 && n[1] >= 16 && n[1] <= 31 : stryMutAct_9fa48("11032") ? false : (stryCov_9fa48("11032", "11033"), (stryMutAct_9fa48("11035") ? (n[0] === 0 || n[0] === 10 || n[0] === 127 || n[0] >= 224) && n[0] === 169 && n[1] === 254 : stryMutAct_9fa48("11034") ? false : (stryCov_9fa48("11034", "11035"), (stryMutAct_9fa48("11037") ? (n[0] === 0 || n[0] === 10 || n[0] === 127) && n[0] >= 224 : stryMutAct_9fa48("11036") ? false : (stryCov_9fa48("11036", "11037"), (stryMutAct_9fa48("11039") ? (n[0] === 0 || n[0] === 10) && n[0] === 127 : stryMutAct_9fa48("11038") ? false : (stryCov_9fa48("11038", "11039"), (stryMutAct_9fa48("11041") ? n[0] === 0 && n[0] === 10 : stryMutAct_9fa48("11040") ? false : (stryCov_9fa48("11040", "11041"), (stryMutAct_9fa48("11043") ? n[0] !== 0 : stryMutAct_9fa48("11042") ? false : (stryCov_9fa48("11042", "11043"), n[0] === 0)) || (stryMutAct_9fa48("11045") ? n[0] !== 10 : stryMutAct_9fa48("11044") ? false : (stryCov_9fa48("11044", "11045"), n[0] === 10)))) || (stryMutAct_9fa48("11047") ? n[0] !== 127 : stryMutAct_9fa48("11046") ? false : (stryCov_9fa48("11046", "11047"), n[0] === 127)))) || (stryMutAct_9fa48("11050") ? n[0] < 224 : stryMutAct_9fa48("11049") ? n[0] > 224 : stryMutAct_9fa48("11048") ? false : (stryCov_9fa48("11048", "11049", "11050"), n[0] >= 224)))) || (stryMutAct_9fa48("11052") ? n[0] === 169 || n[1] === 254 : stryMutAct_9fa48("11051") ? false : (stryCov_9fa48("11051", "11052"), (stryMutAct_9fa48("11054") ? n[0] !== 169 : stryMutAct_9fa48("11053") ? true : (stryCov_9fa48("11053", "11054"), n[0] === 169)) && (stryMutAct_9fa48("11056") ? n[1] !== 254 : stryMutAct_9fa48("11055") ? true : (stryCov_9fa48("11055", "11056"), n[1] === 254)))))) || (stryMutAct_9fa48("11058") ? n[0] === 172 && n[1] >= 16 || n[1] <= 31 : stryMutAct_9fa48("11057") ? false : (stryCov_9fa48("11057", "11058"), (stryMutAct_9fa48("11060") ? n[0] === 172 || n[1] >= 16 : stryMutAct_9fa48("11059") ? true : (stryCov_9fa48("11059", "11060"), (stryMutAct_9fa48("11062") ? n[0] !== 172 : stryMutAct_9fa48("11061") ? true : (stryCov_9fa48("11061", "11062"), n[0] === 172)) && (stryMutAct_9fa48("11065") ? n[1] < 16 : stryMutAct_9fa48("11064") ? n[1] > 16 : stryMutAct_9fa48("11063") ? true : (stryCov_9fa48("11063", "11064", "11065"), n[1] >= 16)))) && (stryMutAct_9fa48("11068") ? n[1] > 31 : stryMutAct_9fa48("11067") ? n[1] < 31 : stryMutAct_9fa48("11066") ? true : (stryCov_9fa48("11066", "11067", "11068"), n[1] <= 31)))))) || (stryMutAct_9fa48("11070") ? n[0] === 192 || n[1] === 168 || n[1] === 0 : stryMutAct_9fa48("11069") ? false : (stryCov_9fa48("11069", "11070"), (stryMutAct_9fa48("11072") ? n[0] !== 192 : stryMutAct_9fa48("11071") ? true : (stryCov_9fa48("11071", "11072"), n[0] === 192)) && (stryMutAct_9fa48("11074") ? n[1] === 168 && n[1] === 0 : stryMutAct_9fa48("11073") ? true : (stryCov_9fa48("11073", "11074"), (stryMutAct_9fa48("11076") ? n[1] !== 168 : stryMutAct_9fa48("11075") ? false : (stryCov_9fa48("11075", "11076"), n[1] === 168)) || (stryMutAct_9fa48("11078") ? n[1] !== 0 : stryMutAct_9fa48("11077") ? false : (stryCov_9fa48("11077", "11078"), n[1] === 0)))))))) || (stryMutAct_9fa48("11080") ? n[0] === 100 && n[1] >= 64 || n[1] <= 127 : stryMutAct_9fa48("11079") ? false : (stryCov_9fa48("11079", "11080"), (stryMutAct_9fa48("11082") ? n[0] === 100 || n[1] >= 64 : stryMutAct_9fa48("11081") ? true : (stryCov_9fa48("11081", "11082"), (stryMutAct_9fa48("11084") ? n[0] !== 100 : stryMutAct_9fa48("11083") ? true : (stryCov_9fa48("11083", "11084"), n[0] === 100)) && (stryMutAct_9fa48("11087") ? n[1] < 64 : stryMutAct_9fa48("11086") ? n[1] > 64 : stryMutAct_9fa48("11085") ? true : (stryCov_9fa48("11085", "11086", "11087"), n[1] >= 64)))) && (stryMutAct_9fa48("11090") ? n[1] > 127 : stryMutAct_9fa48("11089") ? n[1] < 127 : stryMutAct_9fa48("11088") ? true : (stryCov_9fa48("11088", "11089", "11090"), n[1] <= 127)))))) || (stryMutAct_9fa48("11092") ? n[0] === 198 || n[1] === 18 || n[1] === 19 : stryMutAct_9fa48("11091") ? false : (stryCov_9fa48("11091", "11092"), (stryMutAct_9fa48("11094") ? n[0] !== 198 : stryMutAct_9fa48("11093") ? true : (stryCov_9fa48("11093", "11094"), n[0] === 198)) && (stryMutAct_9fa48("11096") ? n[1] === 18 && n[1] === 19 : stryMutAct_9fa48("11095") ? true : (stryCov_9fa48("11095", "11096"), (stryMutAct_9fa48("11098") ? n[1] !== 18 : stryMutAct_9fa48("11097") ? false : (stryCov_9fa48("11097", "11098"), n[1] === 18)) || (stryMutAct_9fa48("11100") ? n[1] !== 19 : stryMutAct_9fa48("11099") ? false : (stryCov_9fa48("11099", "11100"), n[1] === 19)))))))));
  }
}
async function verifyHost(u: URL) {
  if (stryMutAct_9fa48("11101")) {
    {}
  } else {
    stryCov_9fa48("11101");
    const answers = await Promise.all((stryMutAct_9fa48("11102") ? [] : (stryCov_9fa48("11102"), [stryMutAct_9fa48("11103") ? "" : (stryCov_9fa48("11103"), 'A'), stryMutAct_9fa48("11104") ? "" : (stryCov_9fa48("11104"), 'AAAA')])).map(async type => {
      if (stryMutAct_9fa48("11105")) {
        {}
      } else {
        stryCov_9fa48("11105");
        const r = await fetch((stryMutAct_9fa48("11106") ? "" : (stryCov_9fa48("11106"), 'https://cloudflare-dns.com/dns-query?name=')) + encodeURIComponent(u.hostname) + (stryMutAct_9fa48("11107") ? "" : (stryCov_9fa48("11107"), '&type=')) + type, stryMutAct_9fa48("11108") ? {} : (stryCov_9fa48("11108"), {
          headers: stryMutAct_9fa48("11109") ? {} : (stryCov_9fa48("11109"), {
            accept: stryMutAct_9fa48("11110") ? "" : (stryCov_9fa48("11110"), 'application/dns-json')
          }),
          signal: AbortSignal.timeout(5000)
        }));
        if (stryMutAct_9fa48("11113") ? false : stryMutAct_9fa48("11112") ? true : stryMutAct_9fa48("11111") ? r.ok : (stryCov_9fa48("11111", "11112", "11113"), !r.ok)) throw new Error(stryMutAct_9fa48("11115") ? "" : (stryCov_9fa48("11115"), 'Could not verify the store address.'));
        const json: unknown = await r.json();
        if (stryMutAct_9fa48("11118") ? false : stryMutAct_9fa48("11117") ? true : stryMutAct_9fa48("11116") ? record(json) : (stryCov_9fa48("11116", "11117", "11118"), !record(json))) return stryMutAct_9fa48("11119") ? ["Stryker was here"] : (stryCov_9fa48("11119"), []);
        const a = json.Answer;
        if (stryMutAct_9fa48("11122") ? false : stryMutAct_9fa48("11121") ? true : stryMutAct_9fa48("11120") ? Array.isArray(a) : (stryCov_9fa48("11120", "11121", "11122"), !Array.isArray(a))) return stryMutAct_9fa48("11123") ? ["Stryker was here"] : (stryCov_9fa48("11123"), []);
        return stryMutAct_9fa48("11125") ? a.filter(x => x.type === 1 || x.type === 28).map(x => string(x.data)) : stryMutAct_9fa48("11124") ? a.filter(record).map(x => string(x.data)) : (stryCov_9fa48("11124", "11125"), a.filter(record).filter(stryMutAct_9fa48("11126") ? () => undefined : (stryCov_9fa48("11126"), x => stryMutAct_9fa48("11129") ? x.type === 1 && x.type === 28 : stryMutAct_9fa48("11128") ? false : stryMutAct_9fa48("11127") ? true : (stryCov_9fa48("11127", "11128", "11129"), (stryMutAct_9fa48("11131") ? x.type !== 1 : stryMutAct_9fa48("11130") ? false : (stryCov_9fa48("11130", "11131"), x.type === 1)) || (stryMutAct_9fa48("11133") ? x.type !== 28 : stryMutAct_9fa48("11132") ? false : (stryCov_9fa48("11132", "11133"), x.type === 28))))).map(stryMutAct_9fa48("11134") ? () => undefined : (stryCov_9fa48("11134"), x => string(x.data))));
      }
    }));
    const ips = answers.flat();
    if (stryMutAct_9fa48("11137") ? !ips.length && ips.some(ip => !isPublicAddress(ip)) : stryMutAct_9fa48("11136") ? false : stryMutAct_9fa48("11135") ? true : (stryCov_9fa48("11135", "11136", "11137"), (stryMutAct_9fa48("11138") ? ips.length : (stryCov_9fa48("11138"), !ips.length)) || (stryMutAct_9fa48("11139") ? ips.every(ip => !isPublicAddress(ip)) : (stryCov_9fa48("11139"), ips.some(stryMutAct_9fa48("11140") ? () => undefined : (stryCov_9fa48("11140"), ip => stryMutAct_9fa48("11141") ? isPublicAddress(ip) : (stryCov_9fa48("11141"), !isPublicAddress(ip)))))))) throw new Error(stryMutAct_9fa48("11143") ? "" : (stryCov_9fa48("11143"), 'This address is not a public store.'));
  }
}
async function fetchPublic(u: URL, init: RequestInit = {}, redirects = 0): Promise<Response> {
  if (stryMutAct_9fa48("11144")) {
    {}
  } else {
    stryCov_9fa48("11144");
    await verifyHost(u);
    const headers = new Headers(init.headers);
    headers.set(stryMutAct_9fa48("11146") ? "" : (stryCov_9fa48("11146"), 'User-Agent'), stryMutAct_9fa48("11147") ? "" : (stryCov_9fa48("11147"), 'KeyconfCatalogPreview/0.1'));
    const r = await fetch(u, stryMutAct_9fa48("11148") ? {} : (stryCov_9fa48("11148"), {
      ...init,
      redirect: stryMutAct_9fa48("11149") ? "" : (stryCov_9fa48("11149"), 'manual'),
      signal: AbortSignal.timeout(12000),
      headers
    }));
    if (stryMutAct_9fa48("11152") ? r.status >= 300 || r.status < 400 : stryMutAct_9fa48("11151") ? false : stryMutAct_9fa48("11150") ? true : (stryCov_9fa48("11150", "11151", "11152"), (stryMutAct_9fa48("11155") ? r.status < 300 : stryMutAct_9fa48("11154") ? r.status > 300 : stryMutAct_9fa48("11153") ? true : (stryCov_9fa48("11153", "11154", "11155"), r.status >= 300)) && (stryMutAct_9fa48("11158") ? r.status >= 400 : stryMutAct_9fa48("11157") ? r.status <= 400 : stryMutAct_9fa48("11156") ? true : (stryCov_9fa48("11156", "11157", "11158"), r.status < 400)))) {
      if (stryMutAct_9fa48("11159")) {
        {}
      } else {
        stryCov_9fa48("11159");
        const location = r.headers.get(stryMutAct_9fa48("11160") ? "" : (stryCov_9fa48("11160"), 'location'));
        await (stryMutAct_9fa48("11161") ? r.body.cancel() : (stryCov_9fa48("11161"), r.body?.cancel()));
        if (stryMutAct_9fa48("11164") ? !location && redirects >= 3 : stryMutAct_9fa48("11163") ? false : stryMutAct_9fa48("11162") ? true : (stryCov_9fa48("11162", "11163", "11164"), (stryMutAct_9fa48("11165") ? location : (stryCov_9fa48("11165"), !location)) || (stryMutAct_9fa48("11168") ? redirects < 3 : stryMutAct_9fa48("11167") ? redirects > 3 : stryMutAct_9fa48("11166") ? false : (stryCov_9fa48("11166", "11167", "11168"), redirects >= 3)))) throw new Error(stryMutAct_9fa48("11170") ? "" : (stryCov_9fa48("11170"), 'The store redirected too many times.'));
        return fetchPublic(publicUrl(new URL(location, u).href), {}, stryMutAct_9fa48("11171") ? redirects - 1 : (stryCov_9fa48("11171"), redirects + 1));
      }
    }
    if (stryMutAct_9fa48("11174") ? false : stryMutAct_9fa48("11173") ? true : stryMutAct_9fa48("11172") ? r.ok : (stryCov_9fa48("11172", "11173", "11174"), !r.ok)) {
      if (stryMutAct_9fa48("11175")) {
        {}
      } else {
        stryCov_9fa48("11175");
        await (stryMutAct_9fa48("11176") ? r.body.cancel() : (stryCov_9fa48("11176"), r.body?.cancel()));
        throw new Error((stryMutAct_9fa48("11178") ? "" : (stryCov_9fa48("11178"), 'The store returned HTTP ')) + r.status + (stryMutAct_9fa48("11179") ? "" : (stryCov_9fa48("11179"), '. Try a public product page or a JSON-LD export.')));
      }
    }
    return r;
  }
}
async function boundedText(r: Response) {
  if (stryMutAct_9fa48("11180")) {
    {}
  } else {
    stryCov_9fa48("11180");
    if (stryMutAct_9fa48("11184") ? Number(r.headers.get('content-length')) <= 2_000_000 : stryMutAct_9fa48("11183") ? Number(r.headers.get('content-length')) >= 2_000_000 : stryMutAct_9fa48("11182") ? false : stryMutAct_9fa48("11181") ? true : (stryCov_9fa48("11181", "11182", "11183", "11184"), Number(r.headers.get(stryMutAct_9fa48("11185") ? "" : (stryCov_9fa48("11185"), 'content-length'))) > 2_000_000)) {
      if (stryMutAct_9fa48("11186")) {
        {}
      } else {
        stryCov_9fa48("11186");
        await (stryMutAct_9fa48("11187") ? r.body.cancel() : (stryCov_9fa48("11187"), r.body?.cancel()));
        throw new Error(stryMutAct_9fa48("11189") ? "" : (stryCov_9fa48("11189"), 'The page is too large to preview.'));
      }
    }
    if (stryMutAct_9fa48("11192") ? false : stryMutAct_9fa48("11191") ? true : stryMutAct_9fa48("11190") ? r.body : (stryCov_9fa48("11190", "11191", "11192"), !r.body)) return stryMutAct_9fa48("11193") ? "Stryker was here!" : (stryCov_9fa48("11193"), '');
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let bytes = 0,
      text = stryMutAct_9fa48("11194") ? "Stryker was here!" : (stryCov_9fa48("11194"), '');
    try {
      if (stryMutAct_9fa48("11195")) {
        {}
      } else {
        stryCov_9fa48("11195");
        while (stryMutAct_9fa48("11197") ? false : stryMutAct_9fa48("11196") ? false : (stryCov_9fa48("11196", "11197"), true)) {
          if (stryMutAct_9fa48("11198")) {
            {}
          } else {
            stryCov_9fa48("11198");
            const chunk = await reader.read();
            if (stryMutAct_9fa48("11200") ? false : stryMutAct_9fa48("11199") ? true : (stryCov_9fa48("11199", "11200"), chunk.done)) break;
            stryMutAct_9fa48("11201") ? bytes -= chunk.value.byteLength : (stryCov_9fa48("11201"), bytes += chunk.value.byteLength);
            if (stryMutAct_9fa48("11205") ? bytes <= 2_000_000 : stryMutAct_9fa48("11204") ? bytes >= 2_000_000 : stryMutAct_9fa48("11203") ? false : stryMutAct_9fa48("11202") ? true : (stryCov_9fa48("11202", "11203", "11204", "11205"), bytes > 2_000_000)) throw new Error(stryMutAct_9fa48("11207") ? "" : (stryCov_9fa48("11207"), 'The page is too large to preview.'));
            stryMutAct_9fa48("11208") ? text -= decoder.decode(chunk.value, {
              stream: true
            }) : (stryCov_9fa48("11208"), text += decoder.decode(chunk.value, stryMutAct_9fa48("11209") ? {} : (stryCov_9fa48("11209"), {
              stream: stryMutAct_9fa48("11210") ? false : (stryCov_9fa48("11210"), true)
            })));
          }
        }
        return stryMutAct_9fa48("11211") ? text - decoder.decode() : (stryCov_9fa48("11211"), text + decoder.decode());
      }
    } finally {
      if (stryMutAct_9fa48("11212")) {
        {}
      } else {
        stryCov_9fa48("11212");
        await reader.cancel();
      }
    }
  }
}
export async function importWebsite(input: string, continuation?: unknown): Promise<ImportResult> {
  if (stryMutAct_9fa48("11213")) {
    {}
  } else {
    stryCov_9fa48("11213");
    const u = publicUrl(input);
    if (stryMutAct_9fa48("11216") ? continuation !== undefined || continuation !== null : stryMutAct_9fa48("11215") ? false : stryMutAct_9fa48("11214") ? true : (stryCov_9fa48("11214", "11215", "11216"), (stryMutAct_9fa48("11218") ? continuation === undefined : stryMutAct_9fa48("11217") ? true : (stryCov_9fa48("11217", "11218"), continuation !== undefined)) && (stryMutAct_9fa48("11220") ? continuation === null : stryMutAct_9fa48("11219") ? true : (stryCov_9fa48("11219", "11220"), continuation !== null)))) {
      if (stryMutAct_9fa48("11221")) {
        {}
      } else {
        stryCov_9fa48("11221");
        if (stryMutAct_9fa48("11224") ? !isImportContinuation(continuation) && continuation.source !== u.href : stryMutAct_9fa48("11223") ? false : stryMutAct_9fa48("11222") ? true : (stryCov_9fa48("11222", "11223", "11224"), (stryMutAct_9fa48("11225") ? isImportContinuation(continuation) : (stryCov_9fa48("11225"), !isImportContinuation(continuation))) || (stryMutAct_9fa48("11227") ? continuation.source === u.href : stryMutAct_9fa48("11226") ? false : (stryCov_9fa48("11226", "11227"), continuation.source !== u.href)))) throw new Error(stryMutAct_9fa48("11229") ? "" : (stryCov_9fa48("11229"), 'Invalid continuation. Preview this source again.'));
        return shopifyPage(u, continuation);
      }
    }
    if (stryMutAct_9fa48("11231") ? false : stryMutAct_9fa48("11230") ? true : (stryCov_9fa48("11230", "11231"), (stryMutAct_9fa48("11235") ? /\/products\/[^/]+\/$/ : stryMutAct_9fa48("11234") ? /\/products\/[/]+\/?$/ : stryMutAct_9fa48("11233") ? /\/products\/[^/]\/?$/ : stryMutAct_9fa48("11232") ? /\/products\/[^/]+\/?/ : (stryCov_9fa48("11232", "11233", "11234", "11235"), /\/products\/[^/]+\/?$/)).test(u.pathname))) {
      if (stryMutAct_9fa48("11236")) {
        {}
      } else {
        stryCov_9fa48("11236");
        try {
          if (stryMutAct_9fa48("11237")) {
            {}
          } else {
            stryCov_9fa48("11237");
            const endpoint = new URL(u);
            endpoint.pathname = endpoint.pathname.replace(stryMutAct_9fa48("11238") ? /\// : (stryCov_9fa48("11238"), /\/$/), stryMutAct_9fa48("11239") ? "Stryker was here!" : (stryCov_9fa48("11239"), '')) + (stryMutAct_9fa48("11240") ? "" : (stryCov_9fa48("11240"), '.js'));
            endpoint.search = stryMutAct_9fa48("11241") ? "Stryker was here!" : (stryCov_9fa48("11241"), '');
            const response = await fetchPublic(endpoint);
            const data: unknown = JSON.parse(await boundedText(response));
            if (stryMutAct_9fa48("11244") ? record(data) && typeof data.title === 'string' || Array.isArray(data.variants) : stryMutAct_9fa48("11243") ? false : stryMutAct_9fa48("11242") ? true : (stryCov_9fa48("11242", "11243", "11244"), (stryMutAct_9fa48("11246") ? record(data) || typeof data.title === 'string' : stryMutAct_9fa48("11245") ? true : (stryCov_9fa48("11245", "11246"), record(data) && (stryMutAct_9fa48("11248") ? typeof data.title !== 'string' : stryMutAct_9fa48("11247") ? true : (stryCov_9fa48("11247", "11248"), typeof data.title === (stryMutAct_9fa48("11249") ? "" : (stryCov_9fa48("11249"), 'string')))))) && Array.isArray(data.variants))) {
              if (stryMutAct_9fa48("11250")) {
                {}
              } else {
                stryCov_9fa48("11250");
                const title = data.title;
                const products = stryMutAct_9fa48("11252") ? data.variants.slice(0, 80).map((variant): ImportedProduct => {
                  const url = new URL(u);
                  if (typeof variant.id === 'number' || typeof variant.id === 'string') url.searchParams.set('variant', String(variant.id));
                  const name = title + (typeof variant.title === 'string' && variant.title !== 'Default Title' ? ' · ' + variant.title : '');
                  return {
                    name,
                    brand: string(data.vendor),
                    url: url.href,
                    sku: string(variant.sku),
                    pricing: {
                      kind: 'unknown'
                    },
                    availability: variant.available === true ? 'Available' : variant.available === false ? 'Unavailable' : ''
                  };
                }) : stryMutAct_9fa48("11251") ? data.variants.filter(record).map((variant): ImportedProduct => {
                  const url = new URL(u);
                  if (typeof variant.id === 'number' || typeof variant.id === 'string') url.searchParams.set('variant', String(variant.id));
                  const name = title + (typeof variant.title === 'string' && variant.title !== 'Default Title' ? ' · ' + variant.title : '');
                  return {
                    name,
                    brand: string(data.vendor),
                    url: url.href,
                    sku: string(variant.sku),
                    pricing: {
                      kind: 'unknown'
                    },
                    availability: variant.available === true ? 'Available' : variant.available === false ? 'Unavailable' : ''
                  };
                }) : (stryCov_9fa48("11251", "11252"), data.variants.filter(record).slice(0, 80).map((variant): ImportedProduct => {
                  if (stryMutAct_9fa48("11253")) {
                    {}
                  } else {
                    stryCov_9fa48("11253");
                    const url = new URL(u);
                    if (stryMutAct_9fa48("11256") ? typeof variant.id === 'number' && typeof variant.id === 'string' : stryMutAct_9fa48("11255") ? false : stryMutAct_9fa48("11254") ? true : (stryCov_9fa48("11254", "11255", "11256"), (stryMutAct_9fa48("11258") ? typeof variant.id !== 'number' : stryMutAct_9fa48("11257") ? false : (stryCov_9fa48("11257", "11258"), typeof variant.id === (stryMutAct_9fa48("11259") ? "" : (stryCov_9fa48("11259"), 'number')))) || (stryMutAct_9fa48("11261") ? typeof variant.id !== 'string' : stryMutAct_9fa48("11260") ? false : (stryCov_9fa48("11260", "11261"), typeof variant.id === (stryMutAct_9fa48("11262") ? "" : (stryCov_9fa48("11262"), 'string')))))) url.searchParams.set(stryMutAct_9fa48("11264") ? "" : (stryCov_9fa48("11264"), 'variant'), String(variant.id));
                    const name = stryMutAct_9fa48("11265") ? title - (typeof variant.title === 'string' && variant.title !== 'Default Title' ? ' · ' + variant.title : '') : (stryCov_9fa48("11265"), title + ((stryMutAct_9fa48("11268") ? typeof variant.title === 'string' || variant.title !== 'Default Title' : stryMutAct_9fa48("11267") ? false : stryMutAct_9fa48("11266") ? true : (stryCov_9fa48("11266", "11267", "11268"), (stryMutAct_9fa48("11270") ? typeof variant.title !== 'string' : stryMutAct_9fa48("11269") ? true : (stryCov_9fa48("11269", "11270"), typeof variant.title === (stryMutAct_9fa48("11271") ? "" : (stryCov_9fa48("11271"), 'string')))) && (stryMutAct_9fa48("11273") ? variant.title === 'Default Title' : stryMutAct_9fa48("11272") ? true : (stryCov_9fa48("11272", "11273"), variant.title !== (stryMutAct_9fa48("11274") ? "" : (stryCov_9fa48("11274"), 'Default Title')))))) ? (stryMutAct_9fa48("11275") ? "" : (stryCov_9fa48("11275"), ' · ')) + variant.title : stryMutAct_9fa48("11276") ? "Stryker was here!" : (stryCov_9fa48("11276"), '')));
                    return stryMutAct_9fa48("11277") ? {} : (stryCov_9fa48("11277"), {
                      name,
                      brand: string(data.vendor),
                      url: url.href,
                      sku: string(variant.sku),
                      pricing: stryMutAct_9fa48("11278") ? {} : (stryCov_9fa48("11278"), {
                        kind: stryMutAct_9fa48("11279") ? "" : (stryCov_9fa48("11279"), 'unknown')
                      }),
                      availability: (stryMutAct_9fa48("11282") ? variant.available !== true : stryMutAct_9fa48("11281") ? false : stryMutAct_9fa48("11280") ? true : (stryCov_9fa48("11280", "11281", "11282"), variant.available === (stryMutAct_9fa48("11283") ? false : (stryCov_9fa48("11283"), true)))) ? stryMutAct_9fa48("11284") ? "" : (stryCov_9fa48("11284"), 'Available') : (stryMutAct_9fa48("11287") ? variant.available !== false : stryMutAct_9fa48("11286") ? false : stryMutAct_9fa48("11285") ? true : (stryCov_9fa48("11285", "11286", "11287"), variant.available === (stryMutAct_9fa48("11288") ? true : (stryCov_9fa48("11288"), false)))) ? stryMutAct_9fa48("11289") ? "" : (stryCov_9fa48("11289"), 'Unavailable') : stryMutAct_9fa48("11290") ? "Stryker was here!" : (stryCov_9fa48("11290"), '')
                    });
                  }
                }));
                if (stryMutAct_9fa48("11292") ? false : stryMutAct_9fa48("11291") ? true : (stryCov_9fa48("11291", "11292"), products.length)) return stryMutAct_9fa48("11293") ? {} : (stryCov_9fa48("11293"), {
                  products,
                  source: u.href,
                  observedAt: new Date().toISOString(),
                  method: stryMutAct_9fa48("11294") ? "" : (stryCov_9fa48("11294"), 'Shopify product JSON'),
                  next: null,
                  coverage: stryMutAct_9fa48("11295") ? "" : (stryCov_9fa48("11295"), 'Up to 80 variants of this product. Price omitted because this endpoint does not establish the presentment currency. Shopify product JSON can truncate very large variant sets.')
                });
              }
            }
          }
        } catch {
          // A non-Shopify product URL may still expose Product JSON-LD below.
        }
      }
    }
    const response = await fetchPublic(u);
    const html = await boundedText(response);
    const shopify = /cdn\.shopify\.com|Shopify\.shop/i.test(html);
    if (stryMutAct_9fa48("11298") ? shopify || collectionHandle(u) : stryMutAct_9fa48("11297") ? false : stryMutAct_9fa48("11296") ? true : (stryCov_9fa48("11296", "11297", "11298"), shopify && collectionHandle(u))) return shopifyPage(u);
    const products = parseStructuredProducts(html, u.href);
    if (stryMutAct_9fa48("11300") ? false : stryMutAct_9fa48("11299") ? true : (stryCov_9fa48("11299", "11300"), products.length)) return stryMutAct_9fa48("11301") ? {} : (stryCov_9fa48("11301"), {
      products,
      source: u.href,
      observedAt: new Date().toISOString(),
      method: stryMutAct_9fa48("11302") ? "" : (stryCov_9fa48("11302"), 'Product structured data'),
      coverage: stryMutAct_9fa48("11303") ? "" : (stryCov_9fa48("11303"), 'Up to 80 product options found on this page. Prices and availability are snapshots; compatibility needs review.'),
      next: null
    });
    if (stryMutAct_9fa48("11305") ? false : stryMutAct_9fa48("11304") ? true : (stryCov_9fa48("11304", "11305"), shopify)) return shopifyPage(u);
    throw new Error(stryMutAct_9fa48("11307") ? "" : (stryCov_9fa48("11307"), 'No readable product data found. This site may need a dedicated importer. Try a specific product URL, or paste its JSON-LD below.'));
  }
}
function collectionHandle(url: URL): string | undefined {
  if (stryMutAct_9fa48("11308")) {
    {}
  } else {
    stryCov_9fa48("11308");
    if (stryMutAct_9fa48("11310") ? false : stryMutAct_9fa48("11309") ? true : (stryCov_9fa48("11309", "11310"), url.pathname.includes(stryMutAct_9fa48("11311") ? "" : (stryCov_9fa48("11311"), '/products/')))) return undefined;
    const value = stryMutAct_9fa48("11312") ? url.pathname.match(/\/collections\/([^/]+)(?:\/|$)/)[1] : (stryCov_9fa48("11312"), url.pathname.match(stryMutAct_9fa48("11315") ? /\/collections\/([^/]+)(?:\/)/ : stryMutAct_9fa48("11314") ? /\/collections\/([/]+)(?:\/|$)/ : stryMutAct_9fa48("11313") ? /\/collections\/([^/])(?:\/|$)/ : (stryCov_9fa48("11313", "11314", "11315"), /\/collections\/([^/]+)(?:\/|$)/))?.[1]);
    return (stryMutAct_9fa48("11318") ? value || value !== 'all' : stryMutAct_9fa48("11317") ? false : stryMutAct_9fa48("11316") ? true : (stryCov_9fa48("11316", "11317", "11318"), value && (stryMutAct_9fa48("11320") ? value === 'all' : stryMutAct_9fa48("11319") ? true : (stryCov_9fa48("11319", "11320"), value !== (stryMutAct_9fa48("11321") ? "" : (stryCov_9fa48("11321"), 'all')))))) ? decodeURIComponent(value) : undefined;
  }
}
const variantFields = stryMutAct_9fa48("11322") ? "" : (stryCov_9fa48("11322"), 'nodes { id title sku price { amount currencyCode } availableForSale } pageInfo { hasNextPage endCursor }');
const productFields = stryMutAct_9fa48("11323") ? "" : (stryCov_9fa48("11323"), 'id title vendor onlineStoreUrl');
function nextCursor(value: unknown): CatalogCursor {
  if (stryMutAct_9fa48("11324")) {
    {}
  } else {
    stryCov_9fa48("11324");
    if (stryMutAct_9fa48("11327") ? !record(value) && typeof value.hasNextPage !== 'boolean' : stryMutAct_9fa48("11326") ? false : stryMutAct_9fa48("11325") ? true : (stryCov_9fa48("11325", "11326", "11327"), (stryMutAct_9fa48("11328") ? record(value) : (stryCov_9fa48("11328"), !record(value))) || (stryMutAct_9fa48("11330") ? typeof value.hasNextPage === 'boolean' : stryMutAct_9fa48("11329") ? false : (stryCov_9fa48("11329", "11330"), typeof value.hasNextPage !== (stryMutAct_9fa48("11331") ? "" : (stryCov_9fa48("11331"), 'boolean')))))) throw new Error(stryMutAct_9fa48("11333") ? "" : (stryCov_9fa48("11333"), 'The store did not return valid pagination details.'));
    if (stryMutAct_9fa48("11336") ? false : stryMutAct_9fa48("11335") ? true : stryMutAct_9fa48("11334") ? value.hasNextPage : (stryCov_9fa48("11334", "11335", "11336"), !value.hasNextPage)) return stryMutAct_9fa48("11337") ? {} : (stryCov_9fa48("11337"), {
      kind: stryMutAct_9fa48("11338") ? "" : (stryCov_9fa48("11338"), 'done')
    });
    if (stryMutAct_9fa48("11341") ? false : stryMutAct_9fa48("11340") ? true : stryMutAct_9fa48("11339") ? cursor(value.endCursor) : (stryCov_9fa48("11339", "11340", "11341"), !cursor(value.endCursor))) throw new Error(stryMutAct_9fa48("11343") ? "" : (stryCov_9fa48("11343"), 'The store has more products but did not return a usable continuation.'));
    return stryMutAct_9fa48("11344") ? {} : (stryCov_9fa48("11344"), {
      kind: stryMutAct_9fa48("11345") ? "" : (stryCov_9fa48("11345"), 'more'),
      after: value.endCursor
    });
  }
}
async function shopifyPage(url: URL, continuation?: ImportContinuation): Promise<ImportResult> {
  if (stryMutAct_9fa48("11346")) {
    {}
  } else {
    stryCov_9fa48("11346");
    const handle = collectionHandle(url);
    const pending = stryMutAct_9fa48("11347") ? continuation?.variants && [] : (stryCov_9fa48("11347"), (stryMutAct_9fa48("11348") ? continuation.variants : (stryCov_9fa48("11348"), continuation?.variants)) ?? (stryMutAct_9fa48("11349") ? ["Stryker was here"] : (stryCov_9fa48("11349"), [])));
    const variables: Record<string, string | null> = {};
    let query: string;
    if (stryMutAct_9fa48("11351") ? false : stryMutAct_9fa48("11350") ? true : (stryCov_9fa48("11350", "11351"), pending.length)) {
      if (stryMutAct_9fa48("11352")) {
        {}
      } else {
        stryCov_9fa48("11352");
        const argumentsList = pending.map(stryMutAct_9fa48("11353") ? () => undefined : (stryCov_9fa48("11353"), (_, index) => stryMutAct_9fa48("11354") ? `` : (stryCov_9fa48("11354"), `$id${index}: ID!, $after${index}: String!`))).join(stryMutAct_9fa48("11355") ? "" : (stryCov_9fa48("11355"), ', '));
        const fields = pending.map((item, index) => {
          if (stryMutAct_9fa48("11356")) {
            {}
          } else {
            stryCov_9fa48("11356");
            variables[(stryMutAct_9fa48("11357") ? "" : (stryCov_9fa48("11357"), 'id')) + index] = item.id;
            variables[(stryMutAct_9fa48("11358") ? "" : (stryCov_9fa48("11358"), 'after')) + index] = item.after;
            return stryMutAct_9fa48("11359") ? `` : (stryCov_9fa48("11359"), `product${index}: product(id: $id${index}) { ${productFields} variants(first: 10, after: $after${index}) { ${variantFields} } }`);
          }
        }).join(stryMutAct_9fa48("11360") ? "" : (stryCov_9fa48("11360"), ' '));
        query = stryMutAct_9fa48("11361") ? `` : (stryCov_9fa48("11361"), `query MoreVariants(${argumentsList}) { ${fields} }`);
      }
    } else {
      if (stryMutAct_9fa48("11362")) {
        {}
      } else {
        stryCov_9fa48("11362");
        variables.after = (stryMutAct_9fa48("11365") ? continuation?.catalog.kind !== 'more' : stryMutAct_9fa48("11364") ? false : stryMutAct_9fa48("11363") ? true : (stryCov_9fa48("11363", "11364", "11365"), (stryMutAct_9fa48("11366") ? continuation.catalog.kind : (stryCov_9fa48("11366"), continuation?.catalog.kind)) === (stryMutAct_9fa48("11367") ? "" : (stryCov_9fa48("11367"), 'more')))) ? continuation.catalog.after : null;
        const products = stryMutAct_9fa48("11368") ? `` : (stryCov_9fa48("11368"), `products(first: 8, after: $after, sortKey: ID) { nodes { ${productFields} variants(first: 10) { ${variantFields} } } pageInfo { hasNextPage endCursor } }`);
        if (stryMutAct_9fa48("11370") ? false : stryMutAct_9fa48("11369") ? true : (stryCov_9fa48("11369", "11370"), handle)) {
          if (stryMutAct_9fa48("11371")) {
            {}
          } else {
            stryCov_9fa48("11371");
            variables.handle = handle;
            query = stryMutAct_9fa48("11372") ? `` : (stryCov_9fa48("11372"), `query CollectionProducts($handle: String!, $after: String) { collection(handle: $handle) { title ${products} } }`);
          }
        } else query = stryMutAct_9fa48("11373") ? `` : (stryCov_9fa48("11373"), `query StoreProducts($after: String) { ${products} }`);
      }
    }
    const response = await fetchPublic(new URL(stryMutAct_9fa48("11374") ? "" : (stryCov_9fa48("11374"), '/api/2026-07/graphql.json'), url), stryMutAct_9fa48("11375") ? {} : (stryCov_9fa48("11375"), {
      method: stryMutAct_9fa48("11376") ? "" : (stryCov_9fa48("11376"), 'POST'),
      headers: stryMutAct_9fa48("11377") ? {} : (stryCov_9fa48("11377"), {
        'Content-Type': stryMutAct_9fa48("11378") ? "" : (stryCov_9fa48("11378"), 'application/json')
      }),
      body: JSON.stringify(stryMutAct_9fa48("11379") ? {} : (stryCov_9fa48("11379"), {
        query,
        variables
      }))
    }));
    const json: unknown = JSON.parse(await boundedText(response));
    if (stryMutAct_9fa48("11382") ? (!record(json) || !record(json.data)) && Array.isArray(json.errors) && json.errors.length : stryMutAct_9fa48("11381") ? false : stryMutAct_9fa48("11380") ? true : (stryCov_9fa48("11380", "11381", "11382"), (stryMutAct_9fa48("11384") ? !record(json) && !record(json.data) : stryMutAct_9fa48("11383") ? false : (stryCov_9fa48("11383", "11384"), (stryMutAct_9fa48("11385") ? record(json) : (stryCov_9fa48("11385"), !record(json))) || (stryMutAct_9fa48("11386") ? record(json.data) : (stryCov_9fa48("11386"), !record(json.data))))) || (stryMutAct_9fa48("11388") ? Array.isArray(json.errors) || json.errors.length : stryMutAct_9fa48("11387") ? false : (stryCov_9fa48("11387", "11388"), Array.isArray(json.errors) && json.errors.length)))) throw new Error(stryMutAct_9fa48("11390") ? "" : (stryCov_9fa48("11390"), 'The store could not provide this catalog page. Try a product URL or a JSON-LD export.'));
    const data = json.data;
    let catalog: CatalogCursor = stryMutAct_9fa48("11391") ? continuation?.catalog && {
      kind: 'done'
    } : (stryCov_9fa48("11391"), (stryMutAct_9fa48("11392") ? continuation.catalog : (stryCov_9fa48("11392"), continuation?.catalog)) ?? (stryMutAct_9fa48("11393") ? {} : (stryCov_9fa48("11393"), {
      kind: stryMutAct_9fa48("11394") ? "" : (stryCov_9fa48("11394"), 'done')
    })));
    let nodes: unknown[];
    let title = stryMutAct_9fa48("11395") ? handle && '' : (stryCov_9fa48("11395"), handle ?? (stryMutAct_9fa48("11396") ? "Stryker was here!" : (stryCov_9fa48("11396"), '')));
    if (stryMutAct_9fa48("11398") ? false : stryMutAct_9fa48("11397") ? true : (stryCov_9fa48("11397", "11398"), pending.length)) {
      if (stryMutAct_9fa48("11399")) {
        {}
      } else {
        stryCov_9fa48("11399");
        nodes = pending.map(stryMutAct_9fa48("11400") ? () => undefined : (stryCov_9fa48("11400"), (_, index) => data[(stryMutAct_9fa48("11401") ? "" : (stryCov_9fa48("11401"), 'product')) + index]));
        if (stryMutAct_9fa48("11404") ? nodes.every(item => item === null) : stryMutAct_9fa48("11403") ? false : stryMutAct_9fa48("11402") ? true : (stryCov_9fa48("11402", "11403", "11404"), nodes.some(stryMutAct_9fa48("11405") ? () => undefined : (stryCov_9fa48("11405"), item => stryMutAct_9fa48("11408") ? item !== null : stryMutAct_9fa48("11407") ? false : stryMutAct_9fa48("11406") ? true : (stryCov_9fa48("11406", "11407", "11408"), item === null))))) throw new Error(stryMutAct_9fa48("11410") ? "" : (stryCov_9fa48("11410"), 'A product changed or disappeared while loading its variants. Preview the source again.'));
      }
    } else {
      if (stryMutAct_9fa48("11411")) {
        {}
      } else {
        stryCov_9fa48("11411");
        const collection = data.collection;
        if (stryMutAct_9fa48("11414") ? handle || !record(collection) : stryMutAct_9fa48("11413") ? false : stryMutAct_9fa48("11412") ? true : (stryCov_9fa48("11412", "11413", "11414"), handle && (stryMutAct_9fa48("11415") ? record(collection) : (stryCov_9fa48("11415"), !record(collection))))) throw new Error(stryMutAct_9fa48("11417") ? "" : (stryCov_9fa48("11417"), 'This collection was not found in the store. Check its URL.'));
        const connection = (stryMutAct_9fa48("11420") ? handle || record(collection) : stryMutAct_9fa48("11419") ? false : stryMutAct_9fa48("11418") ? true : (stryCov_9fa48("11418", "11419", "11420"), handle && record(collection))) ? collection.products : data.products;
        if (stryMutAct_9fa48("11423") ? (!record(connection) || !Array.isArray(connection.nodes)) && connection.nodes.length > 8 : stryMutAct_9fa48("11422") ? false : stryMutAct_9fa48("11421") ? true : (stryCov_9fa48("11421", "11422", "11423"), (stryMutAct_9fa48("11425") ? !record(connection) && !Array.isArray(connection.nodes) : stryMutAct_9fa48("11424") ? false : (stryCov_9fa48("11424", "11425"), (stryMutAct_9fa48("11426") ? record(connection) : (stryCov_9fa48("11426"), !record(connection))) || (stryMutAct_9fa48("11427") ? Array.isArray(connection.nodes) : (stryCov_9fa48("11427"), !Array.isArray(connection.nodes))))) || (stryMutAct_9fa48("11430") ? connection.nodes.length <= 8 : stryMutAct_9fa48("11429") ? connection.nodes.length >= 8 : stryMutAct_9fa48("11428") ? false : (stryCov_9fa48("11428", "11429", "11430"), connection.nodes.length > 8)))) throw new Error(stryMutAct_9fa48("11432") ? "" : (stryCov_9fa48("11432"), 'The store returned an unreadable catalog page.'));
        nodes = connection.nodes;
        catalog = nextCursor(connection.pageInfo);
        if (stryMutAct_9fa48("11435") ? catalog.kind === 'more' && continuation?.catalog.kind === 'more' || catalog.after === continuation.catalog.after : stryMutAct_9fa48("11434") ? false : stryMutAct_9fa48("11433") ? true : (stryCov_9fa48("11433", "11434", "11435"), (stryMutAct_9fa48("11437") ? catalog.kind === 'more' || continuation?.catalog.kind === 'more' : stryMutAct_9fa48("11436") ? true : (stryCov_9fa48("11436", "11437"), (stryMutAct_9fa48("11439") ? catalog.kind !== 'more' : stryMutAct_9fa48("11438") ? true : (stryCov_9fa48("11438", "11439"), catalog.kind === (stryMutAct_9fa48("11440") ? "" : (stryCov_9fa48("11440"), 'more')))) && (stryMutAct_9fa48("11442") ? continuation?.catalog.kind !== 'more' : stryMutAct_9fa48("11441") ? true : (stryCov_9fa48("11441", "11442"), (stryMutAct_9fa48("11443") ? continuation.catalog.kind : (stryCov_9fa48("11443"), continuation?.catalog.kind)) === (stryMutAct_9fa48("11444") ? "" : (stryCov_9fa48("11444"), 'more')))))) && (stryMutAct_9fa48("11446") ? catalog.after !== continuation.catalog.after : stryMutAct_9fa48("11445") ? true : (stryCov_9fa48("11445", "11446"), catalog.after === continuation.catalog.after)))) throw new Error(stryMutAct_9fa48("11448") ? "" : (stryCov_9fa48("11448"), 'The store repeated a catalog page. Preview the source again.'));
        if (stryMutAct_9fa48("11451") ? record(collection) || typeof collection.title === 'string' : stryMutAct_9fa48("11450") ? false : stryMutAct_9fa48("11449") ? true : (stryCov_9fa48("11449", "11450", "11451"), record(collection) && (stryMutAct_9fa48("11453") ? typeof collection.title !== 'string' : stryMutAct_9fa48("11452") ? true : (stryCov_9fa48("11452", "11453"), typeof collection.title === (stryMutAct_9fa48("11454") ? "" : (stryCov_9fa48("11454"), 'string')))))) title = stryMutAct_9fa48("11455") ? collection.title : (stryCov_9fa48("11455"), collection.title.slice(0, 255));
      }
    }
    const products: ImportedProduct[] = stryMutAct_9fa48("11456") ? ["Stryker was here"] : (stryCov_9fa48("11456"), []);
    const variants: ImportContinuation['variants'] = stryMutAct_9fa48("11457") ? ["Stryker was here"] : (stryCov_9fa48("11457"), []);
    const seen = new Set<string>();
    for (const [index, item] of nodes.entries()) {
      if (stryMutAct_9fa48("11458")) {
        {}
      } else {
        stryCov_9fa48("11458");
        if (stryMutAct_9fa48("11461") ? (!record(item) || typeof item.title !== 'string' || !record(item.variants) || !Array.isArray(item.variants.nodes)) && item.variants.nodes.length > 10 : stryMutAct_9fa48("11460") ? false : stryMutAct_9fa48("11459") ? true : (stryCov_9fa48("11459", "11460", "11461"), (stryMutAct_9fa48("11463") ? (!record(item) || typeof item.title !== 'string' || !record(item.variants)) && !Array.isArray(item.variants.nodes) : stryMutAct_9fa48("11462") ? false : (stryCov_9fa48("11462", "11463"), (stryMutAct_9fa48("11465") ? (!record(item) || typeof item.title !== 'string') && !record(item.variants) : stryMutAct_9fa48("11464") ? false : (stryCov_9fa48("11464", "11465"), (stryMutAct_9fa48("11467") ? !record(item) && typeof item.title !== 'string' : stryMutAct_9fa48("11466") ? false : (stryCov_9fa48("11466", "11467"), (stryMutAct_9fa48("11468") ? record(item) : (stryCov_9fa48("11468"), !record(item))) || (stryMutAct_9fa48("11470") ? typeof item.title === 'string' : stryMutAct_9fa48("11469") ? false : (stryCov_9fa48("11469", "11470"), typeof item.title !== (stryMutAct_9fa48("11471") ? "" : (stryCov_9fa48("11471"), 'string')))))) || (stryMutAct_9fa48("11472") ? record(item.variants) : (stryCov_9fa48("11472"), !record(item.variants))))) || (stryMutAct_9fa48("11473") ? Array.isArray(item.variants.nodes) : (stryCov_9fa48("11473"), !Array.isArray(item.variants.nodes))))) || (stryMutAct_9fa48("11476") ? item.variants.nodes.length <= 10 : stryMutAct_9fa48("11475") ? item.variants.nodes.length >= 10 : stryMutAct_9fa48("11474") ? false : (stryCov_9fa48("11474", "11475", "11476"), item.variants.nodes.length > 10)))) throw new Error(stryMutAct_9fa48("11478") ? "" : (stryCov_9fa48("11478"), 'The store returned unreadable product options.'));
        if (stryMutAct_9fa48("11481") ? pending[index] || item.id !== pending[index].id : stryMutAct_9fa48("11480") ? false : stryMutAct_9fa48("11479") ? true : (stryCov_9fa48("11479", "11480", "11481"), pending[index] && (stryMutAct_9fa48("11483") ? item.id === pending[index].id : stryMutAct_9fa48("11482") ? true : (stryCov_9fa48("11482", "11483"), item.id !== pending[index].id)))) throw new Error(stryMutAct_9fa48("11485") ? "" : (stryCov_9fa48("11485"), 'The store returned options for an unexpected product.'));
        const after = nextCursor(item.variants.pageInfo);
        if (stryMutAct_9fa48("11488") ? after.kind !== 'more' : stryMutAct_9fa48("11487") ? false : stryMutAct_9fa48("11486") ? true : (stryCov_9fa48("11486", "11487", "11488"), after.kind === (stryMutAct_9fa48("11489") ? "" : (stryCov_9fa48("11489"), 'more')))) {
          if (stryMutAct_9fa48("11490")) {
            {}
          } else {
            stryCov_9fa48("11490");
            if (stryMutAct_9fa48("11493") ? (typeof item.id !== 'string' || !/^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id)) && after.after === pending[index]?.after : stryMutAct_9fa48("11492") ? false : stryMutAct_9fa48("11491") ? true : (stryCov_9fa48("11491", "11492", "11493"), (stryMutAct_9fa48("11495") ? typeof item.id !== 'string' && !/^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) : stryMutAct_9fa48("11494") ? false : (stryCov_9fa48("11494", "11495"), (stryMutAct_9fa48("11497") ? typeof item.id === 'string' : stryMutAct_9fa48("11496") ? false : (stryCov_9fa48("11496", "11497"), typeof item.id !== (stryMutAct_9fa48("11498") ? "" : (stryCov_9fa48("11498"), 'string')))) || (stryMutAct_9fa48("11499") ? /^gid:\/\/shopify\/Product\/\d{1,30}$/.test(item.id) : (stryCov_9fa48("11499"), !(stryMutAct_9fa48("11503") ? /^gid:\/\/shopify\/Product\/\D{1,30}$/ : stryMutAct_9fa48("11502") ? /^gid:\/\/shopify\/Product\/\d$/ : stryMutAct_9fa48("11501") ? /^gid:\/\/shopify\/Product\/\d{1,30}/ : stryMutAct_9fa48("11500") ? /gid:\/\/shopify\/Product\/\d{1,30}$/ : (stryCov_9fa48("11500", "11501", "11502", "11503"), /^gid:\/\/shopify\/Product\/\d{1,30}$/)).test(item.id))))) || (stryMutAct_9fa48("11505") ? after.after !== pending[index]?.after : stryMutAct_9fa48("11504") ? false : (stryCov_9fa48("11504", "11505"), after.after === (stryMutAct_9fa48("11506") ? pending[index].after : (stryCov_9fa48("11506"), pending[index]?.after)))))) throw new Error(stryMutAct_9fa48("11508") ? "" : (stryCov_9fa48("11508"), 'The store did not return a usable variant continuation.'));
            variants.push(stryMutAct_9fa48("11510") ? {} : (stryCov_9fa48("11510"), {
              id: item.id,
              after: after.after
            }));
          }
        }
        for (const variant of item.variants.nodes) {
          if (stryMutAct_9fa48("11511")) {
            {}
          } else {
            stryCov_9fa48("11511");
            if (stryMutAct_9fa48("11514") ? false : stryMutAct_9fa48("11513") ? true : stryMutAct_9fa48("11512") ? record(variant) : (stryCov_9fa48("11512", "11513", "11514"), !record(variant))) throw new Error(stryMutAct_9fa48("11516") ? "" : (stryCov_9fa48("11516"), 'The store returned an unreadable variant.'));
            const id = stryMutAct_9fa48("11517") ? string(variant.id).match(/^gid:\/\/shopify\/ProductVariant\/(\d+)$/)[1] : (stryCov_9fa48("11517"), string(variant.id).match(stryMutAct_9fa48("11521") ? /^gid:\/\/shopify\/ProductVariant\/(\D+)$/ : stryMutAct_9fa48("11520") ? /^gid:\/\/shopify\/ProductVariant\/(\d)$/ : stryMutAct_9fa48("11519") ? /^gid:\/\/shopify\/ProductVariant\/(\d+)/ : stryMutAct_9fa48("11518") ? /gid:\/\/shopify\/ProductVariant\/(\d+)$/ : (stryCov_9fa48("11518", "11519", "11520", "11521"), /^gid:\/\/shopify\/ProductVariant\/(\d+)$/))?.[1]);
            if (stryMutAct_9fa48("11524") ? false : stryMutAct_9fa48("11523") ? true : stryMutAct_9fa48("11522") ? id : (stryCov_9fa48("11522", "11523", "11524"), !id)) throw new Error(stryMutAct_9fa48("11526") ? "" : (stryCov_9fa48("11526"), 'A product option has no valid variant identity.'));
            if (stryMutAct_9fa48("11528") ? false : stryMutAct_9fa48("11527") ? true : (stryCov_9fa48("11527", "11528"), seen.has(id))) continue;
            if (stryMutAct_9fa48("11529")) {
              ;
            } else {
              stryCov_9fa48("11529");
              seen.add(id);
            }
            const link = new URL(safeLink(item.onlineStoreUrl, url.href));
            if (stryMutAct_9fa48("11532") ? item.onlineStoreUrl || /\/products\/[^/]+\/?$/.test(link.pathname) : stryMutAct_9fa48("11531") ? false : stryMutAct_9fa48("11530") ? true : (stryCov_9fa48("11530", "11531", "11532"), item.onlineStoreUrl && (stryMutAct_9fa48("11536") ? /\/products\/[^/]+\/$/ : stryMutAct_9fa48("11535") ? /\/products\/[/]+\/?$/ : stryMutAct_9fa48("11534") ? /\/products\/[^/]\/?$/ : stryMutAct_9fa48("11533") ? /\/products\/[^/]+\/?/ : (stryCov_9fa48("11533", "11534", "11535", "11536"), /\/products\/[^/]+\/?$/)).test(link.pathname))) link.searchParams.set(stryMutAct_9fa48("11538") ? "" : (stryCov_9fa48("11538"), 'variant'), id);
            const variantTitle = string(variant.title);
            const price = record(variant.price) ? variant.price : {};
            products.push(stryMutAct_9fa48("11540") ? {} : (stryCov_9fa48("11540"), {
              name: stryMutAct_9fa48("11541") ? item.title + (variantTitle && variantTitle !== 'Default Title' ? ' · ' + variantTitle : '') : (stryCov_9fa48("11541"), (stryMutAct_9fa48("11542") ? item.title - (variantTitle && variantTitle !== 'Default Title' ? ' · ' + variantTitle : '') : (stryCov_9fa48("11542"), item.title + ((stryMutAct_9fa48("11545") ? variantTitle || variantTitle !== 'Default Title' : stryMutAct_9fa48("11544") ? false : stryMutAct_9fa48("11543") ? true : (stryCov_9fa48("11543", "11544", "11545"), variantTitle && (stryMutAct_9fa48("11547") ? variantTitle === 'Default Title' : stryMutAct_9fa48("11546") ? true : (stryCov_9fa48("11546", "11547"), variantTitle !== (stryMutAct_9fa48("11548") ? "" : (stryCov_9fa48("11548"), 'Default Title')))))) ? (stryMutAct_9fa48("11549") ? "" : (stryCov_9fa48("11549"), ' · ')) + variantTitle : stryMutAct_9fa48("11550") ? "Stryker was here!" : (stryCov_9fa48("11550"), '')))).slice(0, 300)),
              brand: stryMutAct_9fa48("11551") ? string(item.vendor) : (stryCov_9fa48("11551"), string(item.vendor).slice(0, 150)),
              url: link.href,
              sku: string(variant.sku),
              pricing: exactPrice(price.amount, price.currencyCode),
              availability: (stryMutAct_9fa48("11554") ? variant.availableForSale !== true : stryMutAct_9fa48("11553") ? false : stryMutAct_9fa48("11552") ? true : (stryCov_9fa48("11552", "11553", "11554"), variant.availableForSale === (stryMutAct_9fa48("11555") ? false : (stryCov_9fa48("11555"), true)))) ? stryMutAct_9fa48("11556") ? "" : (stryCov_9fa48("11556"), 'Available') : (stryMutAct_9fa48("11559") ? variant.availableForSale !== false : stryMutAct_9fa48("11558") ? false : stryMutAct_9fa48("11557") ? true : (stryCov_9fa48("11557", "11558", "11559"), variant.availableForSale === (stryMutAct_9fa48("11560") ? true : (stryCov_9fa48("11560"), false)))) ? stryMutAct_9fa48("11561") ? "" : (stryCov_9fa48("11561"), 'Unavailable') : stryMutAct_9fa48("11562") ? "Stryker was here!" : (stryCov_9fa48("11562"), '')
            }));
          }
        }
      }
    }
    const next: ImportContinuation | null = (stryMutAct_9fa48("11565") ? catalog.kind === 'more' && variants.length : stryMutAct_9fa48("11564") ? false : stryMutAct_9fa48("11563") ? true : (stryCov_9fa48("11563", "11564", "11565"), (stryMutAct_9fa48("11567") ? catalog.kind !== 'more' : stryMutAct_9fa48("11566") ? false : (stryCov_9fa48("11566", "11567"), catalog.kind === (stryMutAct_9fa48("11568") ? "" : (stryCov_9fa48("11568"), 'more')))) || variants.length)) ? stryMutAct_9fa48("11569") ? {} : (stryCov_9fa48("11569"), {
      kind: stryMutAct_9fa48("11570") ? "" : (stryCov_9fa48("11570"), 'shopify'),
      source: url.href,
      catalog,
      variants
    }) : null;
    return stryMutAct_9fa48("11571") ? {} : (stryCov_9fa48("11571"), {
      products,
      source: url.href,
      observedAt: new Date().toISOString(),
      method: stryMutAct_9fa48("11572") ? "" : (stryCov_9fa48("11572"), 'Shopify Storefront API'),
      next,
      coverage: (handle ? stryMutAct_9fa48("11573") ? `` : (stryCov_9fa48("11573"), `Collection “${title}”. `) : stryMutAct_9fa48("11574") ? "" : (stryCov_9fa48("11574"), 'Storewide catalog. ')) + (stryMutAct_9fa48("11575") ? "" : (stryCov_9fa48("11575"), 'Up to 80 options per page. ')) + (next ? stryMutAct_9fa48("11576") ? "" : (stryCov_9fa48("11576"), 'More products or variants are available. ') : stryMutAct_9fa48("11577") ? "" : (stryCov_9fa48("11577"), 'Last catalog page. ')) + (stryMutAct_9fa48("11578") ? "" : (stryCov_9fa48("11578"), 'Website filters and sorting are not applied. Prices and stock are snapshots; compatibility needs review.'))
    });
  }
}
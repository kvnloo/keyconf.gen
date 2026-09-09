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
import type { Part, Category } from './catalog.ts';
import { accessoryCatalog, type AccessoryProduct, type AccessoryKind } from './build-accessories.ts';
export const studioDestinations = [{
  id: 'build',
  name: 'Build',
  detail: 'Design, colors and materials',
  keywords: 'studio customize case keycaps'
}, {
  id: 'parts',
  name: 'Parts & accessories',
  detail: 'Components, compatibility and artisan placement',
  keywords: 'mods knobs screens fit'
}, {
  id: 'sound',
  name: 'Sound lab',
  detail: 'Recorded references and listening controls',
  keywords: 'audio switches volume'
}, {
  id: 'play',
  name: 'Typing test',
  detail: 'Try your keyboard',
  keywords: 'play type wpm monkeytype'
}, {
  id: 'discover',
  name: 'Discover',
  detail: 'Community builds, creator drops and research',
  keywords: 'community creators drops releases learn gaming topre magnetic'
}] as const;
export type StudioDestination = typeof studioDestinations[number]['id'];
export type StudioSearchResult = {
  kind: 'destination';
  item: typeof studioDestinations[number];
} | {
  kind: 'part';
  item: Part;
} | {
  kind: 'accessory';
  item: AccessoryProduct;
};
const categoryTerms: Record<Category, string> = stryMutAct_9fa48("14199") ? {} : (stryCov_9fa48("14199"), {
  case: stryMutAct_9fa48("14200") ? "" : (stryCov_9fa48("14200"), 'case cases enclosure'),
  pcb: stryMutAct_9fa48("14201") ? "" : (stryCov_9fa48("14201"), 'pcb pcbs circuit board'),
  plate: stryMutAct_9fa48("14202") ? "" : (stryCov_9fa48("14202"), 'plate plates'),
  switch: stryMutAct_9fa48("14203") ? "" : (stryCov_9fa48("14203"), 'switch switches'),
  keycaps: stryMutAct_9fa48("14204") ? "" : (stryCov_9fa48("14204"), 'keycaps keyset'),
  stabilizers: stryMutAct_9fa48("14205") ? "" : (stryCov_9fa48("14205"), 'stabilizers stabs')
});
const accessoryTerms: Record<AccessoryKind, string> = stryMutAct_9fa48("14206") ? {} : (stryCov_9fa48("14206"), {
  knob: stryMutAct_9fa48("14207") ? "" : (stryCov_9fa48("14207"), 'knob knobs dial dials'),
  encoder: stryMutAct_9fa48("14208") ? "" : (stryCov_9fa48("14208"), 'encoder encoders dial dials rotary'),
  screen: stryMutAct_9fa48("14209") ? "" : (stryCov_9fa48("14209"), 'screen screens display displays'),
  buttons: stryMutAct_9fa48("14210") ? "" : (stryCov_9fa48("14210"), 'buttons controls'),
  macropad: stryMutAct_9fa48("14211") ? "" : (stryCov_9fa48("14211"), 'macropad macropads'),
  artisan: stryMutAct_9fa48("14212") ? "" : (stryCov_9fa48("14212"), 'artisan artisans keycap keycaps')
});
const normalize = stryMutAct_9fa48("14213") ? () => undefined : (stryCov_9fa48("14213"), (() => {
  const normalize = (value: string) => stryMutAct_9fa48("14214") ? value.normalize('NFKD').replace(/\p{M}/gu, '').toUpperCase() : (stryCov_9fa48("14214"), value.normalize(stryMutAct_9fa48("14215") ? "" : (stryCov_9fa48("14215"), 'NFKD')).replace(/\p{M}/gu, stryMutAct_9fa48("14216") ? "Stryker was here!" : (stryCov_9fa48("14216"), '')).toLowerCase());
  return normalize;
})());
export function searchStudio(query: string, parts: readonly Part[], accessories: readonly AccessoryProduct[] = accessoryCatalog): StudioSearchResult[] {
  if (stryMutAct_9fa48("14217")) {
    {}
  } else {
    stryCov_9fa48("14217");
    const terms = stryMutAct_9fa48("14219") ? normalize(query).split(/\s+/).filter(Boolean) : stryMutAct_9fa48("14218") ? normalize(query).trim().split(/\s+/) : (stryCov_9fa48("14218", "14219"), normalize(query).trim().split(stryMutAct_9fa48("14221") ? /\S+/ : stryMutAct_9fa48("14220") ? /\s/ : (stryCov_9fa48("14220", "14221"), /\s+/)).filter(Boolean));
    const destinations: StudioSearchResult[] = studioDestinations.map(stryMutAct_9fa48("14222") ? () => undefined : (stryCov_9fa48("14222"), item => stryMutAct_9fa48("14223") ? {} : (stryCov_9fa48("14223"), {
      kind: stryMutAct_9fa48("14224") ? "" : (stryCov_9fa48("14224"), 'destination'),
      item
    })));
    if (stryMutAct_9fa48("14227") ? false : stryMutAct_9fa48("14226") ? true : stryMutAct_9fa48("14225") ? terms.length : (stryCov_9fa48("14225", "14226", "14227"), !terms.length)) return destinations;
    const candidates: StudioSearchResult[] = stryMutAct_9fa48("14228") ? [] : (stryCov_9fa48("14228"), [...destinations, ...parts.map(stryMutAct_9fa48("14229") ? () => undefined : (stryCov_9fa48("14229"), (item): StudioSearchResult => stryMutAct_9fa48("14230") ? {} : (stryCov_9fa48("14230"), {
      kind: stryMutAct_9fa48("14231") ? "" : (stryCov_9fa48("14231"), 'part'),
      item
    }))), ...accessories.map(stryMutAct_9fa48("14232") ? () => undefined : (stryCov_9fa48("14232"), (item): StudioSearchResult => stryMutAct_9fa48("14233") ? {} : (stryCov_9fa48("14233"), {
      kind: stryMutAct_9fa48("14234") ? "" : (stryCov_9fa48("14234"), 'accessory'),
      item
    })))]);
    return stryMutAct_9fa48("14236") ? candidates.map(result => {
      const name = normalize(result.item.name);
      const context = result.kind === 'destination' ? result.item.keywords : `${result.item.brand} ${result.kind === 'part' ? categoryTerms[result.item.category] : accessoryTerms[result.item.kind]}`;
      const text = normalize(`${result.item.name} ${result.item.detail} ${context}`);
      return {
        result,
        matches: terms.every(term => text.includes(term)),
        score: terms.filter(term => name.includes(term)).length
      };
    }).sort((a, b) => b.score - a.score).map(item => item.result) : stryMutAct_9fa48("14235") ? candidates.map(result => {
      const name = normalize(result.item.name);
      const context = result.kind === 'destination' ? result.item.keywords : `${result.item.brand} ${result.kind === 'part' ? categoryTerms[result.item.category] : accessoryTerms[result.item.kind]}`;
      const text = normalize(`${result.item.name} ${result.item.detail} ${context}`);
      return {
        result,
        matches: terms.every(term => text.includes(term)),
        score: terms.filter(term => name.includes(term)).length
      };
    }).filter(item => item.matches).map(item => item.result) : (stryCov_9fa48("14235", "14236"), candidates.map(result => {
      if (stryMutAct_9fa48("14237")) {
        {}
      } else {
        stryCov_9fa48("14237");
        const name = normalize(result.item.name);
        const context = (stryMutAct_9fa48("14240") ? result.kind !== 'destination' : stryMutAct_9fa48("14239") ? false : stryMutAct_9fa48("14238") ? true : (stryCov_9fa48("14238", "14239", "14240"), result.kind === (stryMutAct_9fa48("14241") ? "" : (stryCov_9fa48("14241"), 'destination')))) ? result.item.keywords : stryMutAct_9fa48("14242") ? `` : (stryCov_9fa48("14242"), `${result.item.brand} ${(stryMutAct_9fa48("14245") ? result.kind !== 'part' : stryMutAct_9fa48("14244") ? false : stryMutAct_9fa48("14243") ? true : (stryCov_9fa48("14243", "14244", "14245"), result.kind === (stryMutAct_9fa48("14246") ? "" : (stryCov_9fa48("14246"), 'part')))) ? categoryTerms[result.item.category] : accessoryTerms[result.item.kind]}`);
        const text = normalize(stryMutAct_9fa48("14247") ? `` : (stryCov_9fa48("14247"), `${result.item.name} ${result.item.detail} ${context}`));
        return stryMutAct_9fa48("14248") ? {} : (stryCov_9fa48("14248"), {
          result,
          matches: stryMutAct_9fa48("14249") ? terms.some(term => text.includes(term)) : (stryCov_9fa48("14249"), terms.every(stryMutAct_9fa48("14250") ? () => undefined : (stryCov_9fa48("14250"), term => text.includes(term)))),
          score: stryMutAct_9fa48("14251") ? terms.length : (stryCov_9fa48("14251"), terms.filter(stryMutAct_9fa48("14252") ? () => undefined : (stryCov_9fa48("14252"), term => name.includes(term))).length)
        });
      }
    }).filter(stryMutAct_9fa48("14253") ? () => undefined : (stryCov_9fa48("14253"), item => item.matches)).sort(stryMutAct_9fa48("14254") ? () => undefined : (stryCov_9fa48("14254"), (a, b) => stryMutAct_9fa48("14255") ? b.score + a.score : (stryCov_9fa48("14255"), b.score - a.score))).map(stryMutAct_9fa48("14256") ? () => undefined : (stryCov_9fa48("14256"), item => item.result)));
  }
}
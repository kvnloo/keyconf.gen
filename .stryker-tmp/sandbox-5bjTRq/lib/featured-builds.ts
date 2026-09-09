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
import { assemblies } from './component-data.ts';
import { defaultBuild, type Build, type Palette } from './build.ts';
import { newDeck, type DeckBuild } from './control-deck.ts';
export type FeaturedBuild = {
  kind: 'keyboard';
  id: string;
  name: string;
  subtitle: string;
  build: Build;
} | {
  kind: 'control-deck';
  id: string;
  name: string;
  subtitle: string;
  build: DeckBuild;
};
function keyboard(id: string, name: string, assemblyId: string, palette: Palette, caseColor: string): FeaturedBuild {
  if (stryMutAct_9fa48("10442")) {
    {}
  } else {
    stryCov_9fa48("10442");
    const assembly = assemblies.find(stryMutAct_9fa48("10443") ? () => undefined : (stryCov_9fa48("10443"), item => stryMutAct_9fa48("10446") ? item.id !== assemblyId : stryMutAct_9fa48("10445") ? false : stryMutAct_9fa48("10444") ? true : (stryCov_9fa48("10444", "10445", "10446"), item.id === assemblyId)));
    if (stryMutAct_9fa48("10449") ? false : stryMutAct_9fa48("10448") ? true : stryMutAct_9fa48("10447") ? assembly : (stryCov_9fa48("10447", "10448", "10449"), !assembly)) throw new Error(stryMutAct_9fa48("10451") ? `` : (stryCov_9fa48("10451"), `Featured assembly is missing: ${assemblyId}`));
    return stryMutAct_9fa48("10452") ? {} : (stryCov_9fa48("10452"), {
      kind: stryMutAct_9fa48("10453") ? "" : (stryCov_9fa48("10453"), 'keyboard'),
      id,
      name,
      subtitle: stryMutAct_9fa48("10454") ? `` : (stryCov_9fa48("10454"), `${assembly.name} · ${assembly.layout}% study${(stryMutAct_9fa48("10457") ? assemblyId !== 'nk65-entry' : stryMutAct_9fa48("10456") ? false : stryMutAct_9fa48("10455") ? true : (stryCov_9fa48("10455", "10456", "10457"), assemblyId === (stryMutAct_9fa48("10458") ? "" : (stryCov_9fa48("10458"), 'nk65-entry')))) ? stryMutAct_9fa48("10459") ? "" : (stryCov_9fa48("10459"), ' · retired kit') : stryMutAct_9fa48("10460") ? "Stryker was here!" : (stryCov_9fa48("10460"), '')}`),
      build: stryMutAct_9fa48("10461") ? {} : (stryCov_9fa48("10461"), {
        ...defaultBuild,
        name,
        palette,
        caseColor,
        layout: assembly.layout,
        finish: assembly.finish,
        selection: stryMutAct_9fa48("10462") ? {} : (stryCov_9fa48("10462"), {
          ...assembly.selection
        })
      })
    });
  }
}
export const featuredBuilds: FeaturedBuild[] = stryMutAct_9fa48("10463") ? [] : (stryCov_9fa48("10463"), [keyboard(stryMutAct_9fa48("10464") ? "" : (stryCov_9fa48("10464"), 'forest-line'), stryMutAct_9fa48("10465") ? "" : (stryCov_9fa48("10465"), 'Forest Line'), stryMutAct_9fa48("10466") ? "" : (stryCov_9fa48("10466"), 'bakeneko60'), stryMutAct_9fa48("10467") ? {} : (stryCov_9fa48("10467"), {
  name: stryMutAct_9fa48("10468") ? "" : (stryCov_9fa48("10468"), 'Forest Line'),
  alpha: stryMutAct_9fa48("10469") ? "" : (stryCov_9fa48("10469"), '#e7e1cd'),
  mod: stryMutAct_9fa48("10470") ? "" : (stryCov_9fa48("10470"), '#30473b'),
  accent: stryMutAct_9fa48("10471") ? "" : (stryCov_9fa48("10471"), '#688765'),
  space: stryMutAct_9fa48("10472") ? "" : (stryCov_9fa48("10472"), '#95aa86')
}), stryMutAct_9fa48("10473") ? "" : (stryCov_9fa48("10473"), '#c1bcb0')), keyboard(stryMutAct_9fa48("10474") ? "" : (stryCov_9fa48("10474"), 'blush'), stryMutAct_9fa48("10475") ? "" : (stryCov_9fa48("10475"), 'Blush'), stryMutAct_9fa48("10476") ? "" : (stryCov_9fa48("10476"), 'nk65-entry'), stryMutAct_9fa48("10477") ? {} : (stryCov_9fa48("10477"), {
  name: stryMutAct_9fa48("10478") ? "" : (stryCov_9fa48("10478"), 'Blush'),
  alpha: stryMutAct_9fa48("10479") ? "" : (stryCov_9fa48("10479"), '#ead6cd'),
  mod: stryMutAct_9fa48("10480") ? "" : (stryCov_9fa48("10480"), '#bb9699'),
  accent: stryMutAct_9fa48("10481") ? "" : (stryCov_9fa48("10481"), '#745558'),
  space: stryMutAct_9fa48("10482") ? "" : (stryCov_9fa48("10482"), '#b5757c')
}), stryMutAct_9fa48("10483") ? "" : (stryCov_9fa48("10483"), '#735256')), keyboard(stryMutAct_9fa48("10484") ? "" : (stryCov_9fa48("10484"), 'midnight'), stryMutAct_9fa48("10485") ? "" : (stryCov_9fa48("10485"), 'Midnight'), stryMutAct_9fa48("10486") ? "" : (stryCov_9fa48("10486"), 'q1-max'), stryMutAct_9fa48("10487") ? {} : (stryCov_9fa48("10487"), {
  name: stryMutAct_9fa48("10488") ? "" : (stryCov_9fa48("10488"), 'Midnight'),
  alpha: stryMutAct_9fa48("10489") ? "" : (stryCov_9fa48("10489"), '#343b3f'),
  mod: stryMutAct_9fa48("10490") ? "" : (stryCov_9fa48("10490"), '#20282b'),
  accent: stryMutAct_9fa48("10491") ? "" : (stryCov_9fa48("10491"), '#526c75'),
  space: stryMutAct_9fa48("10492") ? "" : (stryCov_9fa48("10492"), '#4b6067')
}), stryMutAct_9fa48("10493") ? "" : (stryCov_9fa48("10493"), '#272f33')), keyboard(stryMutAct_9fa48("10494") ? "" : (stryCov_9fa48("10494"), 'retro'), stryMutAct_9fa48("10495") ? "" : (stryCov_9fa48("10495"), 'Retro'), stryMutAct_9fa48("10496") ? "" : (stryCov_9fa48("10496"), 'tofu60'), stryMutAct_9fa48("10497") ? {} : (stryCov_9fa48("10497"), {
  name: stryMutAct_9fa48("10498") ? "" : (stryCov_9fa48("10498"), 'Retro'),
  alpha: stryMutAct_9fa48("10499") ? "" : (stryCov_9fa48("10499"), '#e3dbc7'),
  mod: stryMutAct_9fa48("10500") ? "" : (stryCov_9fa48("10500"), '#a5a99e'),
  accent: stryMutAct_9fa48("10501") ? "" : (stryCov_9fa48("10501"), '#c97b44'),
  space: stryMutAct_9fa48("10502") ? "" : (stryCov_9fa48("10502"), '#d1b48a')
}), stryMutAct_9fa48("10503") ? "" : (stryCov_9fa48("10503"), '#c3b69b')), stryMutAct_9fa48("10504") ? {} : (stryCov_9fa48("10504"), {
  kind: stryMutAct_9fa48("10505") ? "" : (stryCov_9fa48("10505"), 'control-deck'),
  id: stryMutAct_9fa48("10506") ? "" : (stryCov_9fa48("10506"), 'grok-bot'),
  name: stryMutAct_9fa48("10507") ? "" : (stryCov_9fa48("10507"), 'Grok Bot'),
  subtitle: stryMutAct_9fa48("10508") ? "" : (stryCov_9fa48("10508"), 'Independent control-deck concept'),
  build: newDeck(stryMutAct_9fa48("10509") ? "" : (stryCov_9fa48("10509"), 'grok-bot'))
}), stryMutAct_9fa48("10510") ? {} : (stryCov_9fa48("10510"), {
  kind: stryMutAct_9fa48("10511") ? "" : (stryCov_9fa48("10511"), 'control-deck'),
  id: stryMutAct_9fa48("10512") ? "" : (stryCov_9fa48("10512"), 'codex-micro'),
  name: stryMutAct_9fa48("10513") ? "" : (stryCov_9fa48("10513"), 'Codex Micro'),
  subtitle: stryMutAct_9fa48("10514") ? "" : (stryCov_9fa48("10514"), 'OpenAI × Work Louder · study'),
  build: newDeck(stryMutAct_9fa48("10515") ? "" : (stryCov_9fa48("10515"), 'codex-micro'))
})]);
export function customizeFeatured(featured: FeaturedBuild & {
  kind: 'keyboard';
}, current: Build): Build {
  if (stryMutAct_9fa48("10516")) {
    {}
  } else {
    stryCov_9fa48("10516");
    return stryMutAct_9fa48("10517") ? {} : (stryCov_9fa48("10517"), {
      ...featured.build,
      customParts: current.customParts,
      audio: stryMutAct_9fa48("10518") ? {} : (stryCov_9fa48("10518"), {
        ...current.audio
      })
    });
  }
}
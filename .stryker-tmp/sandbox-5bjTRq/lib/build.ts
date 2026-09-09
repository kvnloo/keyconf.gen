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
import { parseCustomAccessories, resolveAccessoryProducts, type ImportedAccessory } from './imported-accessories.ts';
import { catalog, categories, initialSelection, type Part, type Selection } from './catalog.ts';
import { soundPacks } from './sound-packs.ts';
import { publicUrl } from './import-products.ts';
import { parseAccessories, parseAccessorySnapshot, type AccessorySelection } from './build-accessories.ts';
export const palettes = stryMutAct_9fa48("6870") ? [] : (stryCov_9fa48("6870"), [stryMutAct_9fa48("6871") ? {} : (stryCov_9fa48("6871"), {
  name: stryMutAct_9fa48("6872") ? "" : (stryCov_9fa48("6872"), 'Matcha & cream'),
  alpha: stryMutAct_9fa48("6873") ? "" : (stryCov_9fa48("6873"), '#e8e2cd'),
  mod: stryMutAct_9fa48("6874") ? "" : (stryCov_9fa48("6874"), '#cec5aa'),
  accent: stryMutAct_9fa48("6875") ? "" : (stryCov_9fa48("6875"), '#db7843'),
  space: stryMutAct_9fa48("6876") ? "" : (stryCov_9fa48("6876"), '#acbca0')
}), stryMutAct_9fa48("6877") ? {} : (stryCov_9fa48("6877"), {
  name: stryMutAct_9fa48("6878") ? "" : (stryCov_9fa48("6878"), 'Midnight'),
  alpha: stryMutAct_9fa48("6879") ? "" : (stryCov_9fa48("6879"), '#3e454a'),
  mod: stryMutAct_9fa48("6880") ? "" : (stryCov_9fa48("6880"), '#272e33'),
  accent: stryMutAct_9fa48("6881") ? "" : (stryCov_9fa48("6881"), '#c67746'),
  space: stryMutAct_9fa48("6882") ? "" : (stryCov_9fa48("6882"), '#667c7a')
}), stryMutAct_9fa48("6883") ? {} : (stryCov_9fa48("6883"), {
  name: stryMutAct_9fa48("6884") ? "" : (stryCov_9fa48("6884"), 'Porcelain'),
  alpha: stryMutAct_9fa48("6885") ? "" : (stryCov_9fa48("6885"), '#f0f0e9'),
  mod: stryMutAct_9fa48("6886") ? "" : (stryCov_9fa48("6886"), '#d6d9d9'),
  accent: stryMutAct_9fa48("6887") ? "" : (stryCov_9fa48("6887"), '#518ba4'),
  space: stryMutAct_9fa48("6888") ? "" : (stryCov_9fa48("6888"), '#99b7c6')
}), stryMutAct_9fa48("6889") ? {} : (stryCov_9fa48("6889"), {
  name: stryMutAct_9fa48("6890") ? "" : (stryCov_9fa48("6890"), 'Botanical'),
  alpha: stryMutAct_9fa48("6891") ? "" : (stryCov_9fa48("6891"), '#d8e0ca'),
  mod: stryMutAct_9fa48("6892") ? "" : (stryCov_9fa48("6892"), '#9aa78b'),
  accent: stryMutAct_9fa48("6893") ? "" : (stryCov_9fa48("6893"), '#53725e'),
  space: stryMutAct_9fa48("6894") ? "" : (stryCov_9fa48("6894"), '#53725e')
})]);
export type Palette = typeof palettes[number];
export const caseColors = stryMutAct_9fa48("6895") ? [] : (stryCov_9fa48("6895"), [stryMutAct_9fa48("6896") ? {} : (stryCov_9fa48("6896"), {
  name: stryMutAct_9fa48("6897") ? "" : (stryCov_9fa48("6897"), 'Champagne'),
  color: stryMutAct_9fa48("6898") ? "" : (stryCov_9fa48("6898"), '#c5b792')
}), stryMutAct_9fa48("6899") ? {} : (stryCov_9fa48("6899"), {
  name: stryMutAct_9fa48("6900") ? "" : (stryCov_9fa48("6900"), 'Silver'),
  color: stryMutAct_9fa48("6901") ? "" : (stryCov_9fa48("6901"), '#deded6')
}), stryMutAct_9fa48("6902") ? {} : (stryCov_9fa48("6902"), {
  name: stryMutAct_9fa48("6903") ? "" : (stryCov_9fa48("6903"), 'Graphite'),
  color: stryMutAct_9fa48("6904") ? "" : (stryCov_9fa48("6904"), '#454c4b')
}), stryMutAct_9fa48("6905") ? {} : (stryCov_9fa48("6905"), {
  name: stryMutAct_9fa48("6906") ? "" : (stryCov_9fa48("6906"), 'Sage'),
  color: stryMutAct_9fa48("6907") ? "" : (stryCov_9fa48("6907"), '#a9b5a3')
}), stryMutAct_9fa48("6908") ? {} : (stryCov_9fa48("6908"), {
  name: stryMutAct_9fa48("6909") ? "" : (stryCov_9fa48("6909"), 'Copper'),
  color: stryMutAct_9fa48("6910") ? "" : (stryCov_9fa48("6910"), '#b17152')
}), stryMutAct_9fa48("6911") ? {} : (stryCov_9fa48("6911"), {
  name: stryMutAct_9fa48("6912") ? "" : (stryCov_9fa48("6912"), 'Slate'),
  color: stryMutAct_9fa48("6913") ? "" : (stryCov_9fa48("6913"), '#606a84')
})]);
export const layouts = ['60', '65', '75'] as const;
export const finishes = ['Aluminum', 'Polycarbonate', 'Brass'] as const;
export const profiles = ['Sculpted', 'Tall sculpted', 'Low uniform'] as const;
export const maxVolume = 2;
export type Build = {
  version: 1;
  name: string;
  palette: Palette;
  caseColor: string;
  layout: typeof layouts[number];
  finish: typeof finishes[number];
  profile: typeof profiles[number];
  selection: Selection;
  customParts: Part[];
  customAccessories?: ImportedAccessory[];
  accessories: AccessorySelection[];
  audio: {
    source: string;
    character: 'linear' | 'tactile' | 'clicky';
    volume: number;
    damping: number;
  };
};
export const defaultBuild: Build = stryMutAct_9fa48("6914") ? {} : (stryCov_9fa48("6914"), {
  version: 1,
  name: stryMutAct_9fa48("6915") ? "" : (stryCov_9fa48("6915"), 'My first build'),
  palette: palettes[0],
  caseColor: caseColors[0].color,
  layout: stryMutAct_9fa48("6916") ? "" : (stryCov_9fa48("6916"), '60'),
  finish: stryMutAct_9fa48("6917") ? "" : (stryCov_9fa48("6917"), 'Aluminum'),
  profile: stryMutAct_9fa48("6918") ? "" : (stryCov_9fa48("6918"), 'Sculpted'),
  selection: initialSelection,
  customParts: stryMutAct_9fa48("6919") ? ["Stryker was here"] : (stryCov_9fa48("6919"), []),
  accessories: stryMutAct_9fa48("6920") ? ["Stryker was here"] : (stryCov_9fa48("6920"), []),
  audio: stryMutAct_9fa48("6921") ? {} : (stryCov_9fa48("6921"), {
    source: stryMutAct_9fa48("6922") ? "" : (stryCov_9fa48("6922"), 'gateron-black-ink'),
    character: stryMutAct_9fa48("6923") ? "" : (stryCov_9fa48("6923"), 'linear'),
    volume: 0.45,
    damping: 0.55
  })
});
function object(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("6924")) {
    {}
  } else {
    stryCov_9fa48("6924");
    return stryMutAct_9fa48("6927") ? typeof value === 'object' && value !== null || !Array.isArray(value) : stryMutAct_9fa48("6926") ? false : stryMutAct_9fa48("6925") ? true : (stryCov_9fa48("6925", "6926", "6927"), (stryMutAct_9fa48("6929") ? typeof value === 'object' || value !== null : stryMutAct_9fa48("6928") ? true : (stryCov_9fa48("6928", "6929"), (stryMutAct_9fa48("6931") ? typeof value !== 'object' : stryMutAct_9fa48("6930") ? true : (stryCov_9fa48("6930", "6931"), typeof value === (stryMutAct_9fa48("6932") ? "" : (stryCov_9fa48("6932"), 'object')))) && (stryMutAct_9fa48("6934") ? value === null : stryMutAct_9fa48("6933") ? true : (stryCov_9fa48("6933", "6934"), value !== null)))) && (stryMutAct_9fa48("6935") ? Array.isArray(value) : (stryCov_9fa48("6935"), !Array.isArray(value))));
  }
}
function text(value: unknown, max = 200): value is string {
  if (stryMutAct_9fa48("6936")) {
    {}
  } else {
    stryCov_9fa48("6936");
    return stryMutAct_9fa48("6939") ? typeof value === 'string' && value.length > 0 || value.length <= max : stryMutAct_9fa48("6938") ? false : stryMutAct_9fa48("6937") ? true : (stryCov_9fa48("6937", "6938", "6939"), (stryMutAct_9fa48("6941") ? typeof value === 'string' || value.length > 0 : stryMutAct_9fa48("6940") ? true : (stryCov_9fa48("6940", "6941"), (stryMutAct_9fa48("6943") ? typeof value !== 'string' : stryMutAct_9fa48("6942") ? true : (stryCov_9fa48("6942", "6943"), typeof value === (stryMutAct_9fa48("6944") ? "" : (stryCov_9fa48("6944"), 'string')))) && (stryMutAct_9fa48("6947") ? value.length <= 0 : stryMutAct_9fa48("6946") ? value.length >= 0 : stryMutAct_9fa48("6945") ? true : (stryCov_9fa48("6945", "6946", "6947"), value.length > 0)))) && (stryMutAct_9fa48("6950") ? value.length > max : stryMutAct_9fa48("6949") ? value.length < max : stryMutAct_9fa48("6948") ? true : (stryCov_9fa48("6948", "6949", "6950"), value.length <= max)));
  }
}
function color(value: unknown): value is string {
  if (stryMutAct_9fa48("6951")) {
    {}
  } else {
    stryCov_9fa48("6951");
    return stryMutAct_9fa48("6954") ? typeof value === 'string' || /^#[\da-f]{6}$/i.test(value) : stryMutAct_9fa48("6953") ? false : stryMutAct_9fa48("6952") ? true : (stryCov_9fa48("6952", "6953", "6954"), (stryMutAct_9fa48("6956") ? typeof value !== 'string' : stryMutAct_9fa48("6955") ? true : (stryCov_9fa48("6955", "6956"), typeof value === (stryMutAct_9fa48("6957") ? "" : (stryCov_9fa48("6957"), 'string')))) && (stryMutAct_9fa48("6962") ? /^#[\Da-f]{6}$/i : stryMutAct_9fa48("6961") ? /^#[^\da-f]{6}$/i : stryMutAct_9fa48("6960") ? /^#[\da-f]$/i : stryMutAct_9fa48("6959") ? /^#[\da-f]{6}/i : stryMutAct_9fa48("6958") ? /#[\da-f]{6}$/i : (stryCov_9fa48("6958", "6959", "6960", "6961", "6962"), /^#[\da-f]{6}$/i)).test(value));
  }
}
function unit(value: unknown): value is number {
  if (stryMutAct_9fa48("6963")) {
    {}
  } else {
    stryCov_9fa48("6963");
    return stryMutAct_9fa48("6966") ? typeof value === 'number' && Number.isFinite(value) && value >= 0 || value <= 1 : stryMutAct_9fa48("6965") ? false : stryMutAct_9fa48("6964") ? true : (stryCov_9fa48("6964", "6965", "6966"), (stryMutAct_9fa48("6968") ? typeof value === 'number' && Number.isFinite(value) || value >= 0 : stryMutAct_9fa48("6967") ? true : (stryCov_9fa48("6967", "6968"), (stryMutAct_9fa48("6970") ? typeof value === 'number' || Number.isFinite(value) : stryMutAct_9fa48("6969") ? true : (stryCov_9fa48("6969", "6970"), (stryMutAct_9fa48("6972") ? typeof value !== 'number' : stryMutAct_9fa48("6971") ? true : (stryCov_9fa48("6971", "6972"), typeof value === (stryMutAct_9fa48("6973") ? "" : (stryCov_9fa48("6973"), 'number')))) && Number.isFinite(value))) && (stryMutAct_9fa48("6976") ? value < 0 : stryMutAct_9fa48("6975") ? value > 0 : stryMutAct_9fa48("6974") ? true : (stryCov_9fa48("6974", "6975", "6976"), value >= 0)))) && (stryMutAct_9fa48("6979") ? value > 1 : stryMutAct_9fa48("6978") ? value < 1 : stryMutAct_9fa48("6977") ? true : (stryCov_9fa48("6977", "6978", "6979"), value <= 1)));
  }
}
function palette(value: unknown): value is Palette {
  if (stryMutAct_9fa48("6980")) {
    {}
  } else {
    stryCov_9fa48("6980");
    return stryMutAct_9fa48("6983") ? object(value) && text(value.name, 80) && color(value.alpha) && color(value.mod) && color(value.accent) || color(value.space) : stryMutAct_9fa48("6982") ? false : stryMutAct_9fa48("6981") ? true : (stryCov_9fa48("6981", "6982", "6983"), (stryMutAct_9fa48("6985") ? object(value) && text(value.name, 80) && color(value.alpha) && color(value.mod) || color(value.accent) : stryMutAct_9fa48("6984") ? true : (stryCov_9fa48("6984", "6985"), (stryMutAct_9fa48("6987") ? object(value) && text(value.name, 80) && color(value.alpha) || color(value.mod) : stryMutAct_9fa48("6986") ? true : (stryCov_9fa48("6986", "6987"), (stryMutAct_9fa48("6989") ? object(value) && text(value.name, 80) || color(value.alpha) : stryMutAct_9fa48("6988") ? true : (stryCov_9fa48("6988", "6989"), (stryMutAct_9fa48("6991") ? object(value) || text(value.name, 80) : stryMutAct_9fa48("6990") ? true : (stryCov_9fa48("6990", "6991"), object(value) && text(value.name, 80))) && color(value.alpha))) && color(value.mod))) && color(value.accent))) && color(value.space));
  }
}
export function parseCustomParts(value: unknown): Part[] {
  if (stryMutAct_9fa48("6992")) {
    {}
  } else {
    stryCov_9fa48("6992");
    if (stryMutAct_9fa48("6995") ? !Array.isArray(value) && value.length > 500 : stryMutAct_9fa48("6994") ? false : stryMutAct_9fa48("6993") ? true : (stryCov_9fa48("6993", "6994", "6995"), (stryMutAct_9fa48("6996") ? Array.isArray(value) : (stryCov_9fa48("6996"), !Array.isArray(value))) || (stryMutAct_9fa48("6999") ? value.length <= 500 : stryMutAct_9fa48("6998") ? value.length >= 500 : stryMutAct_9fa48("6997") ? false : (stryCov_9fa48("6997", "6998", "6999"), value.length > 500)))) throw new Error(stryMutAct_9fa48("7001") ? "" : (stryCov_9fa48("7001"), 'This parts library is too large or damaged. Import the products again.'));
    const ids = new Set<string>();
    return value.map((part: unknown) => {
      if (stryMutAct_9fa48("7002")) {
        {}
      } else {
        stryCov_9fa48("7002");
        if (stryMutAct_9fa48("7005") ? false : stryMutAct_9fa48("7004") ? true : stryMutAct_9fa48("7003") ? object(part) : (stryCov_9fa48("7003", "7004", "7005"), !object(part))) throw new Error(stryMutAct_9fa48("7007") ? "" : (stryCov_9fa48("7007"), 'A saved part could not be read. Import it again.'));
        const category = categories.find(stryMutAct_9fa48("7008") ? () => undefined : (stryCov_9fa48("7008"), c => stryMutAct_9fa48("7011") ? c !== part.category : stryMutAct_9fa48("7010") ? false : stryMutAct_9fa48("7009") ? true : (stryCov_9fa48("7009", "7010", "7011"), c === part.category)));
        if (stryMutAct_9fa48("7014") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:') || ids.has(part.id) || !text(part.name, 300) || !text(part.brand) || typeof part.detail !== 'string' || part.detail.length > 2000 || !text(part.source, 2000)) && part.evidence !== 'unknown' : stryMutAct_9fa48("7013") ? false : stryMutAct_9fa48("7012") ? true : (stryCov_9fa48("7012", "7013", "7014"), (stryMutAct_9fa48("7016") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:') || ids.has(part.id) || !text(part.name, 300) || !text(part.brand) || typeof part.detail !== 'string' || part.detail.length > 2000) && !text(part.source, 2000) : stryMutAct_9fa48("7015") ? false : (stryCov_9fa48("7015", "7016"), (stryMutAct_9fa48("7018") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:') || ids.has(part.id) || !text(part.name, 300) || !text(part.brand) || typeof part.detail !== 'string') && part.detail.length > 2000 : stryMutAct_9fa48("7017") ? false : (stryCov_9fa48("7017", "7018"), (stryMutAct_9fa48("7020") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:') || ids.has(part.id) || !text(part.name, 300) || !text(part.brand)) && typeof part.detail !== 'string' : stryMutAct_9fa48("7019") ? false : (stryCov_9fa48("7019", "7020"), (stryMutAct_9fa48("7022") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:') || ids.has(part.id) || !text(part.name, 300)) && !text(part.brand) : stryMutAct_9fa48("7021") ? false : (stryCov_9fa48("7021", "7022"), (stryMutAct_9fa48("7024") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:') || ids.has(part.id)) && !text(part.name, 300) : stryMutAct_9fa48("7023") ? false : (stryCov_9fa48("7023", "7024"), (stryMutAct_9fa48("7026") ? (!category || !text(part.id, 4000) || !part.id.startsWith('import:')) && ids.has(part.id) : stryMutAct_9fa48("7025") ? false : (stryCov_9fa48("7025", "7026"), (stryMutAct_9fa48("7028") ? (!category || !text(part.id, 4000)) && !part.id.startsWith('import:') : stryMutAct_9fa48("7027") ? false : (stryCov_9fa48("7027", "7028"), (stryMutAct_9fa48("7030") ? !category && !text(part.id, 4000) : stryMutAct_9fa48("7029") ? false : (stryCov_9fa48("7029", "7030"), (stryMutAct_9fa48("7031") ? category : (stryCov_9fa48("7031"), !category)) || (stryMutAct_9fa48("7032") ? text(part.id, 4000) : (stryCov_9fa48("7032"), !text(part.id, 4000))))) || (stryMutAct_9fa48("7033") ? part.id.startsWith('import:') : (stryCov_9fa48("7033"), !(stryMutAct_9fa48("7034") ? part.id.endsWith('import:') : (stryCov_9fa48("7034"), part.id.startsWith(stryMutAct_9fa48("7035") ? "" : (stryCov_9fa48("7035"), 'import:')))))))) || ids.has(part.id))) || (stryMutAct_9fa48("7036") ? text(part.name, 300) : (stryCov_9fa48("7036"), !text(part.name, 300))))) || (stryMutAct_9fa48("7037") ? text(part.brand) : (stryCov_9fa48("7037"), !text(part.brand))))) || (stryMutAct_9fa48("7039") ? typeof part.detail === 'string' : stryMutAct_9fa48("7038") ? false : (stryCov_9fa48("7038", "7039"), typeof part.detail !== (stryMutAct_9fa48("7040") ? "" : (stryCov_9fa48("7040"), 'string')))))) || (stryMutAct_9fa48("7043") ? part.detail.length <= 2000 : stryMutAct_9fa48("7042") ? part.detail.length >= 2000 : stryMutAct_9fa48("7041") ? false : (stryCov_9fa48("7041", "7042", "7043"), part.detail.length > 2000)))) || (stryMutAct_9fa48("7044") ? text(part.source, 2000) : (stryCov_9fa48("7044"), !text(part.source, 2000))))) || (stryMutAct_9fa48("7046") ? part.evidence === 'unknown' : stryMutAct_9fa48("7045") ? false : (stryCov_9fa48("7045", "7046"), part.evidence !== (stryMutAct_9fa48("7047") ? "" : (stryCov_9fa48("7047"), 'unknown')))))) {
          if (stryMutAct_9fa48("7048")) {
            {}
          } else {
            stryCov_9fa48("7048");
            throw new Error(stryMutAct_9fa48("7050") ? "" : (stryCov_9fa48("7050"), 'A saved part could not be read. Import it again.'));
          }
        }
        if (stryMutAct_9fa48("7051")) {
          ;
        } else {
          stryCov_9fa48("7051");
          ids.add(part.id);
        }
        return stryMutAct_9fa48("7052") ? {} : (stryCov_9fa48("7052"), {
          id: part.id,
          category,
          name: part.name,
          brand: part.brand,
          detail: part.detail,
          source: publicUrl(part.source).href,
          family: stryMutAct_9fa48("7053") ? "" : (stryCov_9fa48("7053"), 'unverified'),
          evidence: stryMutAct_9fa48("7054") ? "" : (stryCov_9fa48("7054"), 'unknown')
        });
      }
    });
  }
}
export function parseBuildSnapshot(value: unknown): Build {
  if (stryMutAct_9fa48("7055")) {
    {}
  } else {
    stryCov_9fa48("7055");
    if (stryMutAct_9fa48("7058") ? !object(value) && value.version !== 1 : stryMutAct_9fa48("7057") ? false : stryMutAct_9fa48("7056") ? true : (stryCov_9fa48("7056", "7057", "7058"), (stryMutAct_9fa48("7059") ? object(value) : (stryCov_9fa48("7059"), !object(value))) || (stryMutAct_9fa48("7061") ? value.version === 1 : stryMutAct_9fa48("7060") ? false : (stryCov_9fa48("7060", "7061"), value.version !== 1)))) throw new Error(stryMutAct_9fa48("7063") ? "" : (stryCov_9fa48("7063"), 'This build format is not supported. Open a current Keyconf build file or link.'));
    const layout = layouts.find(stryMutAct_9fa48("7064") ? () => undefined : (stryCov_9fa48("7064"), x => stryMutAct_9fa48("7067") ? x !== value.layout : stryMutAct_9fa48("7066") ? false : stryMutAct_9fa48("7065") ? true : (stryCov_9fa48("7065", "7066", "7067"), x === value.layout)));
    const finish = finishes.find(stryMutAct_9fa48("7068") ? () => undefined : (stryCov_9fa48("7068"), x => stryMutAct_9fa48("7071") ? x !== value.finish : stryMutAct_9fa48("7070") ? false : stryMutAct_9fa48("7069") ? true : (stryCov_9fa48("7069", "7070", "7071"), x === value.finish)));
    const profile = profiles.find(stryMutAct_9fa48("7072") ? () => undefined : (stryCov_9fa48("7072"), x => stryMutAct_9fa48("7075") ? x !== value.profile : stryMutAct_9fa48("7074") ? false : stryMutAct_9fa48("7073") ? true : (stryCov_9fa48("7073", "7074", "7075"), x === value.profile)));
    if (stryMutAct_9fa48("7078") ? (!layout || !finish || !profile || typeof value.name !== 'string' || value.name.length > 80 || !palette(value.palette)) && !color(value.caseColor) : stryMutAct_9fa48("7077") ? false : stryMutAct_9fa48("7076") ? true : (stryCov_9fa48("7076", "7077", "7078"), (stryMutAct_9fa48("7080") ? (!layout || !finish || !profile || typeof value.name !== 'string' || value.name.length > 80) && !palette(value.palette) : stryMutAct_9fa48("7079") ? false : (stryCov_9fa48("7079", "7080"), (stryMutAct_9fa48("7082") ? (!layout || !finish || !profile || typeof value.name !== 'string') && value.name.length > 80 : stryMutAct_9fa48("7081") ? false : (stryCov_9fa48("7081", "7082"), (stryMutAct_9fa48("7084") ? (!layout || !finish || !profile) && typeof value.name !== 'string' : stryMutAct_9fa48("7083") ? false : (stryCov_9fa48("7083", "7084"), (stryMutAct_9fa48("7086") ? (!layout || !finish) && !profile : stryMutAct_9fa48("7085") ? false : (stryCov_9fa48("7085", "7086"), (stryMutAct_9fa48("7088") ? !layout && !finish : stryMutAct_9fa48("7087") ? false : (stryCov_9fa48("7087", "7088"), (stryMutAct_9fa48("7089") ? layout : (stryCov_9fa48("7089"), !layout)) || (stryMutAct_9fa48("7090") ? finish : (stryCov_9fa48("7090"), !finish)))) || (stryMutAct_9fa48("7091") ? profile : (stryCov_9fa48("7091"), !profile)))) || (stryMutAct_9fa48("7093") ? typeof value.name === 'string' : stryMutAct_9fa48("7092") ? false : (stryCov_9fa48("7092", "7093"), typeof value.name !== (stryMutAct_9fa48("7094") ? "" : (stryCov_9fa48("7094"), 'string')))))) || (stryMutAct_9fa48("7097") ? value.name.length <= 80 : stryMutAct_9fa48("7096") ? value.name.length >= 80 : stryMutAct_9fa48("7095") ? false : (stryCov_9fa48("7095", "7096", "7097"), value.name.length > 80)))) || (stryMutAct_9fa48("7098") ? palette(value.palette) : (stryCov_9fa48("7098"), !palette(value.palette))))) || (stryMutAct_9fa48("7099") ? color(value.caseColor) : (stryCov_9fa48("7099"), !color(value.caseColor))))) {
      if (stryMutAct_9fa48("7100")) {
        {}
      } else {
        stryCov_9fa48("7100");
        throw new Error(stryMutAct_9fa48("7102") ? "" : (stryCov_9fa48("7102"), 'The saved design is incomplete. Open another build file or link.'));
      }
    }
    const audio = value.audio;
    if (stryMutAct_9fa48("7105") ? (!object(audio) || typeof audio.source !== 'string' || !text(audio.source, 120) || !(audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky') || typeof audio.volume !== 'number' || !Number.isFinite(audio.volume) || audio.volume < 0 || audio.volume > maxVolume) && !unit(audio.damping) : stryMutAct_9fa48("7104") ? false : stryMutAct_9fa48("7103") ? true : (stryCov_9fa48("7103", "7104", "7105"), (stryMutAct_9fa48("7107") ? (!object(audio) || typeof audio.source !== 'string' || !text(audio.source, 120) || !(audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky') || typeof audio.volume !== 'number' || !Number.isFinite(audio.volume) || audio.volume < 0) && audio.volume > maxVolume : stryMutAct_9fa48("7106") ? false : (stryCov_9fa48("7106", "7107"), (stryMutAct_9fa48("7109") ? (!object(audio) || typeof audio.source !== 'string' || !text(audio.source, 120) || !(audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky') || typeof audio.volume !== 'number' || !Number.isFinite(audio.volume)) && audio.volume < 0 : stryMutAct_9fa48("7108") ? false : (stryCov_9fa48("7108", "7109"), (stryMutAct_9fa48("7111") ? (!object(audio) || typeof audio.source !== 'string' || !text(audio.source, 120) || !(audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky') || typeof audio.volume !== 'number') && !Number.isFinite(audio.volume) : stryMutAct_9fa48("7110") ? false : (stryCov_9fa48("7110", "7111"), (stryMutAct_9fa48("7113") ? (!object(audio) || typeof audio.source !== 'string' || !text(audio.source, 120) || !(audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky')) && typeof audio.volume !== 'number' : stryMutAct_9fa48("7112") ? false : (stryCov_9fa48("7112", "7113"), (stryMutAct_9fa48("7115") ? (!object(audio) || typeof audio.source !== 'string' || !text(audio.source, 120)) && !(audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky') : stryMutAct_9fa48("7114") ? false : (stryCov_9fa48("7114", "7115"), (stryMutAct_9fa48("7117") ? (!object(audio) || typeof audio.source !== 'string') && !text(audio.source, 120) : stryMutAct_9fa48("7116") ? false : (stryCov_9fa48("7116", "7117"), (stryMutAct_9fa48("7119") ? !object(audio) && typeof audio.source !== 'string' : stryMutAct_9fa48("7118") ? false : (stryCov_9fa48("7118", "7119"), (stryMutAct_9fa48("7120") ? object(audio) : (stryCov_9fa48("7120"), !object(audio))) || (stryMutAct_9fa48("7122") ? typeof audio.source === 'string' : stryMutAct_9fa48("7121") ? false : (stryCov_9fa48("7121", "7122"), typeof audio.source !== (stryMutAct_9fa48("7123") ? "" : (stryCov_9fa48("7123"), 'string')))))) || (stryMutAct_9fa48("7124") ? text(audio.source, 120) : (stryCov_9fa48("7124"), !text(audio.source, 120))))) || (stryMutAct_9fa48("7125") ? audio.character === 'linear' || audio.character === 'tactile' || audio.character === 'clicky' : (stryCov_9fa48("7125"), !(stryMutAct_9fa48("7128") ? (audio.character === 'linear' || audio.character === 'tactile') && audio.character === 'clicky' : stryMutAct_9fa48("7127") ? false : stryMutAct_9fa48("7126") ? true : (stryCov_9fa48("7126", "7127", "7128"), (stryMutAct_9fa48("7130") ? audio.character === 'linear' && audio.character === 'tactile' : stryMutAct_9fa48("7129") ? false : (stryCov_9fa48("7129", "7130"), (stryMutAct_9fa48("7132") ? audio.character !== 'linear' : stryMutAct_9fa48("7131") ? false : (stryCov_9fa48("7131", "7132"), audio.character === (stryMutAct_9fa48("7133") ? "" : (stryCov_9fa48("7133"), 'linear')))) || (stryMutAct_9fa48("7135") ? audio.character !== 'tactile' : stryMutAct_9fa48("7134") ? false : (stryCov_9fa48("7134", "7135"), audio.character === (stryMutAct_9fa48("7136") ? "" : (stryCov_9fa48("7136"), 'tactile')))))) || (stryMutAct_9fa48("7138") ? audio.character !== 'clicky' : stryMutAct_9fa48("7137") ? false : (stryCov_9fa48("7137", "7138"), audio.character === (stryMutAct_9fa48("7139") ? "" : (stryCov_9fa48("7139"), 'clicky')))))))))) || (stryMutAct_9fa48("7141") ? typeof audio.volume === 'number' : stryMutAct_9fa48("7140") ? false : (stryCov_9fa48("7140", "7141"), typeof audio.volume !== (stryMutAct_9fa48("7142") ? "" : (stryCov_9fa48("7142"), 'number')))))) || (stryMutAct_9fa48("7143") ? Number.isFinite(audio.volume) : (stryCov_9fa48("7143"), !Number.isFinite(audio.volume))))) || (stryMutAct_9fa48("7146") ? audio.volume >= 0 : stryMutAct_9fa48("7145") ? audio.volume <= 0 : stryMutAct_9fa48("7144") ? false : (stryCov_9fa48("7144", "7145", "7146"), audio.volume < 0)))) || (stryMutAct_9fa48("7149") ? audio.volume <= maxVolume : stryMutAct_9fa48("7148") ? audio.volume >= maxVolume : stryMutAct_9fa48("7147") ? false : (stryCov_9fa48("7147", "7148", "7149"), audio.volume > maxVolume)))) || (stryMutAct_9fa48("7150") ? unit(audio.damping) : (stryCov_9fa48("7150"), !unit(audio.damping))))) throw new Error(stryMutAct_9fa48("7152") ? "" : (stryCov_9fa48("7152"), 'The saved audio settings are not supported. Open another build file or link.'));
    const customParts = parseCustomParts(value.customParts);
    const customAccessories = parseCustomAccessories(value.customAccessories);
    const accessories = parseAccessorySnapshot(value.accessories);
    for (const selected of accessories) {
      if (stryMutAct_9fa48("7153")) {
        {}
      } else {
        stryCov_9fa48("7153");
        if (stryMutAct_9fa48("7156") ? selected.productId.startsWith('import-accessory:') || !customAccessories.some(product => product.id === selected.productId && product.placement === selected.location.kind) : stryMutAct_9fa48("7155") ? false : stryMutAct_9fa48("7154") ? true : (stryCov_9fa48("7154", "7155", "7156"), (stryMutAct_9fa48("7157") ? selected.productId.endsWith('import-accessory:') : (stryCov_9fa48("7157"), selected.productId.startsWith(stryMutAct_9fa48("7158") ? "" : (stryCov_9fa48("7158"), 'import-accessory:')))) && (stryMutAct_9fa48("7159") ? customAccessories.some(product => product.id === selected.productId && product.placement === selected.location.kind) : (stryCov_9fa48("7159"), !(stryMutAct_9fa48("7160") ? customAccessories.every(product => product.id === selected.productId && product.placement === selected.location.kind) : (stryCov_9fa48("7160"), customAccessories.some(stryMutAct_9fa48("7161") ? () => undefined : (stryCov_9fa48("7161"), product => stryMutAct_9fa48("7164") ? product.id === selected.productId || product.placement === selected.location.kind : stryMutAct_9fa48("7163") ? false : stryMutAct_9fa48("7162") ? true : (stryCov_9fa48("7162", "7163", "7164"), (stryMutAct_9fa48("7166") ? product.id !== selected.productId : stryMutAct_9fa48("7165") ? true : (stryCov_9fa48("7165", "7166"), product.id === selected.productId)) && (stryMutAct_9fa48("7168") ? product.placement !== selected.location.kind : stryMutAct_9fa48("7167") ? true : (stryCov_9fa48("7167", "7168"), product.placement === selected.location.kind))))))))))) throw new Error(stryMutAct_9fa48("7170") ? "" : (stryCov_9fa48("7170"), 'The imported accessory reference is missing or has a different placement. Open a complete build.'));
      }
    }
    const selection = stryMutAct_9fa48("7171") ? {} : (stryCov_9fa48("7171"), {
      ...initialSelection
    });
    if (stryMutAct_9fa48("7174") ? false : stryMutAct_9fa48("7173") ? true : stryMutAct_9fa48("7172") ? object(value.selection) : (stryCov_9fa48("7172", "7173", "7174"), !object(value.selection))) throw new Error(stryMutAct_9fa48("7176") ? "" : (stryCov_9fa48("7176"), 'The saved build is missing its component list.'));
    for (const category of categories) {
      if (stryMutAct_9fa48("7177")) {
        {}
      } else {
        stryCov_9fa48("7177");
        const id = value.selection[category];
        if (stryMutAct_9fa48("7180") ? (typeof id !== 'string' || !text(id, 4000)) && id.startsWith('import:') && !customParts.some(part => part.id === id && part.category === category) : stryMutAct_9fa48("7179") ? false : stryMutAct_9fa48("7178") ? true : (stryCov_9fa48("7178", "7179", "7180"), (stryMutAct_9fa48("7182") ? typeof id !== 'string' && !text(id, 4000) : stryMutAct_9fa48("7181") ? false : (stryCov_9fa48("7181", "7182"), (stryMutAct_9fa48("7184") ? typeof id === 'string' : stryMutAct_9fa48("7183") ? false : (stryCov_9fa48("7183", "7184"), typeof id !== (stryMutAct_9fa48("7185") ? "" : (stryCov_9fa48("7185"), 'string')))) || (stryMutAct_9fa48("7186") ? text(id, 4000) : (stryCov_9fa48("7186"), !text(id, 4000))))) || (stryMutAct_9fa48("7188") ? id.startsWith('import:') || !customParts.some(part => part.id === id && part.category === category) : stryMutAct_9fa48("7187") ? false : (stryCov_9fa48("7187", "7188"), (stryMutAct_9fa48("7189") ? id.endsWith('import:') : (stryCov_9fa48("7189"), id.startsWith(stryMutAct_9fa48("7190") ? "" : (stryCov_9fa48("7190"), 'import:')))) && (stryMutAct_9fa48("7191") ? customParts.some(part => part.id === id && part.category === category) : (stryCov_9fa48("7191"), !(stryMutAct_9fa48("7192") ? customParts.every(part => part.id === id && part.category === category) : (stryCov_9fa48("7192"), customParts.some(stryMutAct_9fa48("7193") ? () => undefined : (stryCov_9fa48("7193"), part => stryMutAct_9fa48("7196") ? part.id === id || part.category === category : stryMutAct_9fa48("7195") ? false : stryMutAct_9fa48("7194") ? true : (stryCov_9fa48("7194", "7195", "7196"), (stryMutAct_9fa48("7198") ? part.id !== id : stryMutAct_9fa48("7197") ? true : (stryCov_9fa48("7197", "7198"), part.id === id)) && (stryMutAct_9fa48("7200") ? part.category !== category : stryMutAct_9fa48("7199") ? true : (stryCov_9fa48("7199", "7200"), part.category === category))))))))))))) {
          if (stryMutAct_9fa48("7201")) {
            {}
          } else {
            stryCov_9fa48("7201");
            throw new Error(stryMutAct_9fa48("7203") ? `` : (stryCov_9fa48("7203"), `The saved ${category} is missing from this build. Open a complete build file or link.`));
          }
        }
        selection[category] = id;
      }
    }
    return stryMutAct_9fa48("7204") ? {} : (stryCov_9fa48("7204"), {
      version: 1,
      name: stryMutAct_9fa48("7207") ? value.name.trim() && 'Untitled build' : stryMutAct_9fa48("7206") ? false : stryMutAct_9fa48("7205") ? true : (stryCov_9fa48("7205", "7206", "7207"), (stryMutAct_9fa48("7208") ? value.name : (stryCov_9fa48("7208"), value.name.trim())) || (stryMutAct_9fa48("7209") ? "" : (stryCov_9fa48("7209"), 'Untitled build'))),
      palette: stryMutAct_9fa48("7210") ? {} : (stryCov_9fa48("7210"), {
        name: value.palette.name,
        alpha: value.palette.alpha,
        mod: value.palette.mod,
        accent: value.palette.accent,
        space: value.palette.space
      }),
      caseColor: value.caseColor,
      layout,
      finish,
      profile,
      selection,
      customParts,
      ...(customAccessories.length ? stryMutAct_9fa48("7211") ? {} : (stryCov_9fa48("7211"), {
        customAccessories
      }) : {}),
      accessories,
      audio: stryMutAct_9fa48("7212") ? {} : (stryCov_9fa48("7212"), {
        source: audio.source,
        character: audio.character,
        volume: audio.volume,
        damping: audio.damping
      })
    });
  }
}
export function parseBuild(value: unknown): Build {
  if (stryMutAct_9fa48("7213")) {
    {}
  } else {
    stryCov_9fa48("7213");
    const build = parseBuildSnapshot(value);
    const parts = stryMutAct_9fa48("7214") ? [] : (stryCov_9fa48("7214"), [...catalog, ...build.customParts]);
    for (const category of categories) {
      if (stryMutAct_9fa48("7215")) {
        {}
      } else {
        stryCov_9fa48("7215");
        if (stryMutAct_9fa48("7218") ? false : stryMutAct_9fa48("7217") ? true : stryMutAct_9fa48("7216") ? parts.some(part => part.id === build.selection[category] && part.category === category) : (stryCov_9fa48("7216", "7217", "7218"), !(stryMutAct_9fa48("7219") ? parts.every(part => part.id === build.selection[category] && part.category === category) : (stryCov_9fa48("7219"), parts.some(stryMutAct_9fa48("7220") ? () => undefined : (stryCov_9fa48("7220"), part => stryMutAct_9fa48("7223") ? part.id === build.selection[category] || part.category === category : stryMutAct_9fa48("7222") ? false : stryMutAct_9fa48("7221") ? true : (stryCov_9fa48("7221", "7222", "7223"), (stryMutAct_9fa48("7225") ? part.id !== build.selection[category] : stryMutAct_9fa48("7224") ? true : (stryCov_9fa48("7224", "7225"), part.id === build.selection[category])) && (stryMutAct_9fa48("7227") ? part.category !== category : stryMutAct_9fa48("7226") ? true : (stryCov_9fa48("7226", "7227"), part.category === category))))))))) throw new Error(stryMutAct_9fa48("7229") ? `` : (stryCov_9fa48("7229"), `The saved ${category} is missing from this build. Open a complete build file or link.`));
      }
    }
    if (stryMutAct_9fa48("7232") ? build.audio.source !== 'synthesized' || !soundPacks.some(pack => pack.id === build.audio.source) : stryMutAct_9fa48("7231") ? false : stryMutAct_9fa48("7230") ? true : (stryCov_9fa48("7230", "7231", "7232"), (stryMutAct_9fa48("7234") ? build.audio.source === 'synthesized' : stryMutAct_9fa48("7233") ? true : (stryCov_9fa48("7233", "7234"), build.audio.source !== (stryMutAct_9fa48("7235") ? "" : (stryCov_9fa48("7235"), 'synthesized')))) && (stryMutAct_9fa48("7236") ? soundPacks.some(pack => pack.id === build.audio.source) : (stryCov_9fa48("7236"), !(stryMutAct_9fa48("7237") ? soundPacks.every(pack => pack.id === build.audio.source) : (stryCov_9fa48("7237"), soundPacks.some(stryMutAct_9fa48("7238") ? () => undefined : (stryCov_9fa48("7238"), pack => stryMutAct_9fa48("7241") ? pack.id !== build.audio.source : stryMutAct_9fa48("7240") ? false : stryMutAct_9fa48("7239") ? true : (stryCov_9fa48("7239", "7240", "7241"), pack.id === build.audio.source))))))))) throw new Error(stryMutAct_9fa48("7243") ? "" : (stryCov_9fa48("7243"), 'The saved audio settings are not supported. Open another build file or link.'));
    if (stryMutAct_9fa48("7244")) {
      ;
    } else {
      stryCov_9fa48("7244");
      parseAccessories(build.accessories, resolveAccessoryProducts(build.customAccessories));
    }
    return build;
  }
}
export function readBuildFile(content: string): Build {
  if (stryMutAct_9fa48("7245")) {
    {}
  } else {
    stryCov_9fa48("7245");
    if (stryMutAct_9fa48("7249") ? content.length <= 1_000_000 : stryMutAct_9fa48("7248") ? content.length >= 1_000_000 : stryMutAct_9fa48("7247") ? false : stryMutAct_9fa48("7246") ? true : (stryCov_9fa48("7246", "7247", "7248", "7249"), content.length > 1_000_000)) throw new Error(stryMutAct_9fa48("7251") ? "" : (stryCov_9fa48("7251"), 'This file is too large. Choose a Keyconf build file under 1 MB.'));
    let data: unknown;
    try {
      if (stryMutAct_9fa48("7252")) {
        {}
      } else {
        stryCov_9fa48("7252");
        data = JSON.parse(content);
      }
    } catch {
      if (stryMutAct_9fa48("7253")) {
        {}
      } else {
        stryCov_9fa48("7253");
        throw new Error(stryMutAct_9fa48("7255") ? "" : (stryCov_9fa48("7255"), 'This file is not readable JSON. Choose an exported Keyconf build.'));
      }
    }
    if (stryMutAct_9fa48("7258") ? object(data) || 'build' in data : stryMutAct_9fa48("7257") ? false : stryMutAct_9fa48("7256") ? true : (stryCov_9fa48("7256", "7257", "7258"), object(data) && (stryMutAct_9fa48("7259") ? "" : (stryCov_9fa48("7259"), 'build')) in data)) return parseBuild(data.build);
    if (stryMutAct_9fa48("7262") ? object(data) && data.version === 1 && object(data.visualStudy) && object(data.sound) || Array.isArray(data.components) : stryMutAct_9fa48("7261") ? false : stryMutAct_9fa48("7260") ? true : (stryCov_9fa48("7260", "7261", "7262"), (stryMutAct_9fa48("7264") ? object(data) && data.version === 1 && object(data.visualStudy) || object(data.sound) : stryMutAct_9fa48("7263") ? true : (stryCov_9fa48("7263", "7264"), (stryMutAct_9fa48("7266") ? object(data) && data.version === 1 || object(data.visualStudy) : stryMutAct_9fa48("7265") ? true : (stryCov_9fa48("7265", "7266"), (stryMutAct_9fa48("7268") ? object(data) || data.version === 1 : stryMutAct_9fa48("7267") ? true : (stryCov_9fa48("7267", "7268"), object(data) && (stryMutAct_9fa48("7270") ? data.version !== 1 : stryMutAct_9fa48("7269") ? true : (stryCov_9fa48("7269", "7270"), data.version === 1)))) && object(data.visualStudy))) && object(data.sound))) && Array.isArray(data.components))) {
      if (stryMutAct_9fa48("7271")) {
        {}
      } else {
        stryCov_9fa48("7271");
        const components = stryMutAct_9fa48("7272") ? data.components : (stryCov_9fa48("7272"), data.components.filter(object));
        if (stryMutAct_9fa48("7275") ? components.length !== categories.length && categories.some(category => components.filter(part => part.category === category).length !== 1) : stryMutAct_9fa48("7274") ? false : stryMutAct_9fa48("7273") ? true : (stryCov_9fa48("7273", "7274", "7275"), (stryMutAct_9fa48("7277") ? components.length === categories.length : stryMutAct_9fa48("7276") ? false : (stryCov_9fa48("7276", "7277"), components.length !== categories.length)) || (stryMutAct_9fa48("7278") ? categories.every(category => components.filter(part => part.category === category).length !== 1) : (stryCov_9fa48("7278"), categories.some(stryMutAct_9fa48("7279") ? () => undefined : (stryCov_9fa48("7279"), category => stryMutAct_9fa48("7282") ? components.filter(part => part.category === category).length === 1 : stryMutAct_9fa48("7281") ? false : stryMutAct_9fa48("7280") ? true : (stryCov_9fa48("7280", "7281", "7282"), (stryMutAct_9fa48("7283") ? components.length : (stryCov_9fa48("7283"), components.filter(stryMutAct_9fa48("7284") ? () => undefined : (stryCov_9fa48("7284"), part => stryMutAct_9fa48("7287") ? part.category !== category : stryMutAct_9fa48("7286") ? false : stryMutAct_9fa48("7285") ? true : (stryCov_9fa48("7285", "7286", "7287"), part.category === category))).length)) !== 1))))))) {
          if (stryMutAct_9fa48("7288")) {
            {}
          } else {
            stryCov_9fa48("7288");
            throw new Error(stryMutAct_9fa48("7290") ? "" : (stryCov_9fa48("7290"), 'This older export has missing or duplicate components. Choose another build file.'));
          }
        }
        const study = data.visualStudy;
        const sound = data.sound;
        const source = (stryMutAct_9fa48("7293") ? sound.source !== undefined : stryMutAct_9fa48("7292") ? false : stryMutAct_9fa48("7291") ? true : (stryCov_9fa48("7291", "7292", "7293"), sound.source === undefined)) ? stryMutAct_9fa48("7294") ? "" : (stryCov_9fa48("7294"), 'synthesized') : (stryMutAct_9fa48("7297") ? object(sound.source) || sound.source.kind === 'recorded' : stryMutAct_9fa48("7296") ? false : stryMutAct_9fa48("7295") ? true : (stryCov_9fa48("7295", "7296", "7297"), object(sound.source) && (stryMutAct_9fa48("7299") ? sound.source.kind !== 'recorded' : stryMutAct_9fa48("7298") ? true : (stryCov_9fa48("7298", "7299"), sound.source.kind === (stryMutAct_9fa48("7300") ? "" : (stryCov_9fa48("7300"), 'recorded')))))) ? sound.source.id : (stryMutAct_9fa48("7303") ? object(sound.source) || sound.source.kind === 'synthesized' : stryMutAct_9fa48("7302") ? false : stryMutAct_9fa48("7301") ? true : (stryCov_9fa48("7301", "7302", "7303"), object(sound.source) && (stryMutAct_9fa48("7305") ? sound.source.kind !== 'synthesized' : stryMutAct_9fa48("7304") ? true : (stryCov_9fa48("7304", "7305"), sound.source.kind === (stryMutAct_9fa48("7306") ? "" : (stryCov_9fa48("7306"), 'synthesized')))))) ? stryMutAct_9fa48("7307") ? "" : (stryCov_9fa48("7307"), 'synthesized') : undefined;
        return parseBuild(stryMutAct_9fa48("7308") ? {} : (stryCov_9fa48("7308"), {
          version: 1,
          name: stryMutAct_9fa48("7309") ? "" : (stryCov_9fa48("7309"), 'Imported build'),
          palette: stryMutAct_9fa48("7310") ? {} : (stryCov_9fa48("7310"), {
            name: study.name,
            alpha: study.alpha,
            mod: study.mod,
            accent: study.accent,
            space: study.space
          }),
          caseColor: study.caseColor,
          layout: study.layout,
          finish: study.finish,
          profile: study.profile,
          selection: Object.fromEntries(components.map(stryMutAct_9fa48("7311") ? () => undefined : (stryCov_9fa48("7311"), part => stryMutAct_9fa48("7312") ? [] : (stryCov_9fa48("7312"), [part.category, part.id])))),
          customParts: stryMutAct_9fa48("7313") ? components : (stryCov_9fa48("7313"), components.filter(stryMutAct_9fa48("7314") ? () => undefined : (stryCov_9fa48("7314"), part => stryMutAct_9fa48("7317") ? typeof part.id === 'string' || part.id.startsWith('import:') : stryMutAct_9fa48("7316") ? false : stryMutAct_9fa48("7315") ? true : (stryCov_9fa48("7315", "7316", "7317"), (stryMutAct_9fa48("7319") ? typeof part.id !== 'string' : stryMutAct_9fa48("7318") ? true : (stryCov_9fa48("7318", "7319"), typeof part.id === (stryMutAct_9fa48("7320") ? "" : (stryCov_9fa48("7320"), 'string')))) && (stryMutAct_9fa48("7321") ? part.id.endsWith('import:') : (stryCov_9fa48("7321"), part.id.startsWith(stryMutAct_9fa48("7322") ? "" : (stryCov_9fa48("7322"), 'import:')))))))),
          audio: stryMutAct_9fa48("7323") ? {} : (stryCov_9fa48("7323"), {
            source,
            character: sound.character,
            volume: sound.volume,
            damping: sound.damping
          })
        }));
      }
    }
    return parseBuild(data);
  }
}
export function pruneBuildImports(build: Build): Build {
  if (stryMutAct_9fa48("7324")) {
    {}
  } else {
    stryCov_9fa48("7324");
    const partIds = new Set(Object.values(build.selection));
    const accessoryIds = new Set(build.accessories.map(stryMutAct_9fa48("7325") ? () => undefined : (stryCov_9fa48("7325"), item => item.productId)));
    const selected = stryMutAct_9fa48("7327") ? build.customAccessories.filter(product => accessoryIds.has(product.id)) : stryMutAct_9fa48("7326") ? build.customAccessories : (stryCov_9fa48("7326", "7327"), build.customAccessories?.filter(stryMutAct_9fa48("7328") ? () => undefined : (stryCov_9fa48("7328"), product => accessoryIds.has(product.id))));
    const {
      customAccessories: _customAccessories,
      ...base
    } = build;
    return stryMutAct_9fa48("7329") ? {} : (stryCov_9fa48("7329"), {
      ...base,
      customParts: stryMutAct_9fa48("7330") ? build.customParts : (stryCov_9fa48("7330"), build.customParts.filter(stryMutAct_9fa48("7331") ? () => undefined : (stryCov_9fa48("7331"), part => partIds.has(part.id)))),
      ...((stryMutAct_9fa48("7332") ? selected.length : (stryCov_9fa48("7332"), selected?.length)) ? stryMutAct_9fa48("7333") ? {} : (stryCov_9fa48("7333"), {
        customAccessories: selected
      }) : {})
    });
  }
}
export function encodeBuild(build: Build): string {
  if (stryMutAct_9fa48("7334")) {
    {}
  } else {
    stryCov_9fa48("7334");
    const portable = pruneBuildImports(build);
    const bytes = new TextEncoder().encode(JSON.stringify(portable));
    const encoded = btoa(Array.from(bytes, stryMutAct_9fa48("7335") ? () => undefined : (stryCov_9fa48("7335"), byte => String.fromCharCode(byte))).join(stryMutAct_9fa48("7336") ? "Stryker was here!" : (stryCov_9fa48("7336"), ''))).replaceAll(stryMutAct_9fa48("7337") ? "" : (stryCov_9fa48("7337"), '+'), stryMutAct_9fa48("7338") ? "" : (stryCov_9fa48("7338"), '-')).replaceAll(stryMutAct_9fa48("7339") ? "" : (stryCov_9fa48("7339"), '/'), stryMutAct_9fa48("7340") ? "" : (stryCov_9fa48("7340"), '_')).replace(stryMutAct_9fa48("7342") ? /=$/ : stryMutAct_9fa48("7341") ? /=+/ : (stryCov_9fa48("7341", "7342"), /=+$/), stryMutAct_9fa48("7343") ? "Stryker was here!" : (stryCov_9fa48("7343"), ''));
    if (stryMutAct_9fa48("7347") ? encoded.length <= 24_000 : stryMutAct_9fa48("7346") ? encoded.length >= 24_000 : stryMutAct_9fa48("7345") ? false : stryMutAct_9fa48("7344") ? true : (stryCov_9fa48("7344", "7345", "7346", "7347"), encoded.length > 24_000)) throw new Error(stryMutAct_9fa48("7349") ? "" : (stryCov_9fa48("7349"), 'This build is too large for a link. Download the build file to share it.'));
    return encoded;
  }
}
export function decodeBuild(encoded: string): Build {
  if (stryMutAct_9fa48("7350")) {
    {}
  } else {
    stryCov_9fa48("7350");
    if (stryMutAct_9fa48("7353") ? !/^[\w-]+$/.test(encoded) && encoded.length > 24_000 : stryMutAct_9fa48("7352") ? false : stryMutAct_9fa48("7351") ? true : (stryCov_9fa48("7351", "7352", "7353"), (stryMutAct_9fa48("7354") ? /^[\w-]+$/.test(encoded) : (stryCov_9fa48("7354"), !(stryMutAct_9fa48("7359") ? /^[\W-]+$/ : stryMutAct_9fa48("7358") ? /^[^\w-]+$/ : stryMutAct_9fa48("7357") ? /^[\w-]$/ : stryMutAct_9fa48("7356") ? /^[\w-]+/ : stryMutAct_9fa48("7355") ? /[\w-]+$/ : (stryCov_9fa48("7355", "7356", "7357", "7358", "7359"), /^[\w-]+$/)).test(encoded))) || (stryMutAct_9fa48("7362") ? encoded.length <= 24_000 : stryMutAct_9fa48("7361") ? encoded.length >= 24_000 : stryMutAct_9fa48("7360") ? false : (stryCov_9fa48("7360", "7361", "7362"), encoded.length > 24_000)))) throw new Error(stryMutAct_9fa48("7364") ? "" : (stryCov_9fa48("7364"), 'This build link is incomplete. Ask for a new link or open a build file.'));
    try {
      if (stryMutAct_9fa48("7365")) {
        {}
      } else {
        stryCov_9fa48("7365");
        const binary = atob(encoded.replaceAll(stryMutAct_9fa48("7366") ? "" : (stryCov_9fa48("7366"), '-'), stryMutAct_9fa48("7367") ? "" : (stryCov_9fa48("7367"), '+')).replaceAll(stryMutAct_9fa48("7368") ? "" : (stryCov_9fa48("7368"), '_'), stryMutAct_9fa48("7369") ? "" : (stryCov_9fa48("7369"), '/')));
        return readBuildFile(new TextDecoder(stryMutAct_9fa48("7370") ? "" : (stryCov_9fa48("7370"), 'utf-8'), stryMutAct_9fa48("7371") ? {} : (stryCov_9fa48("7371"), {
          fatal: stryMutAct_9fa48("7372") ? false : (stryCov_9fa48("7372"), true)
        })).decode(Uint8Array.from(binary, stryMutAct_9fa48("7373") ? () => undefined : (stryCov_9fa48("7373"), c => c.charCodeAt(0)))));
      }
    } catch {
      if (stryMutAct_9fa48("7374")) {
        {}
      } else {
        stryCov_9fa48("7374");
        throw new Error(stryMutAct_9fa48("7376") ? "" : (stryCov_9fa48("7376"), 'This build link could not be read. Ask for a new link or open a build file.'));
      }
    }
  }
}
export type BuildHistory = {
  past: Build[];
  present: Build;
  future: Build[];
  group: string | null;
};
export type BuildAction = {
  kind: 'edit';
  patch: Partial<Build>;
  group?: string;
} | {
  kind: 'restore';
  build: Build;
} | {
  kind: 'undo' | 'redo' | 'commit';
};
export const initialHistory: BuildHistory = stryMutAct_9fa48("7377") ? {} : (stryCov_9fa48("7377"), {
  past: stryMutAct_9fa48("7378") ? ["Stryker was here"] : (stryCov_9fa48("7378"), []),
  present: defaultBuild,
  future: stryMutAct_9fa48("7379") ? ["Stryker was here"] : (stryCov_9fa48("7379"), []),
  group: null
});
export function buildReducer(state: BuildHistory, action: BuildAction): BuildHistory {
  if (stryMutAct_9fa48("7380")) {
    {}
  } else {
    stryCov_9fa48("7380");
    switch (action.kind) {
      case stryMutAct_9fa48("7382") ? "" : (stryCov_9fa48("7382"), 'commit'):
        if (stryMutAct_9fa48("7381")) {} else {
          stryCov_9fa48("7381");
          return stryMutAct_9fa48("7383") ? {} : (stryCov_9fa48("7383"), {
            ...state,
            group: null
          });
        }
      case stryMutAct_9fa48("7385") ? "" : (stryCov_9fa48("7385"), 'restore'):
        if (stryMutAct_9fa48("7384")) {} else {
          stryCov_9fa48("7384");
          return stryMutAct_9fa48("7386") ? {} : (stryCov_9fa48("7386"), {
            past: stryMutAct_9fa48("7387") ? ["Stryker was here"] : (stryCov_9fa48("7387"), []),
            present: action.build,
            future: stryMutAct_9fa48("7388") ? ["Stryker was here"] : (stryCov_9fa48("7388"), []),
            group: null
          });
        }
      case stryMutAct_9fa48("7390") ? "" : (stryCov_9fa48("7390"), 'undo'):
        if (stryMutAct_9fa48("7389")) {} else {
          stryCov_9fa48("7389");
          {
            if (stryMutAct_9fa48("7391")) {
              {}
            } else {
              stryCov_9fa48("7391");
              const previous = state.past.at(stryMutAct_9fa48("7392") ? +1 : (stryCov_9fa48("7392"), -1));
              return previous ? stryMutAct_9fa48("7393") ? {} : (stryCov_9fa48("7393"), {
                past: stryMutAct_9fa48("7394") ? state.past : (stryCov_9fa48("7394"), state.past.slice(0, stryMutAct_9fa48("7395") ? +1 : (stryCov_9fa48("7395"), -1))),
                present: previous,
                future: stryMutAct_9fa48("7396") ? [] : (stryCov_9fa48("7396"), [state.present, ...state.future]),
                group: null
              }) : state;
            }
          }
        }
      case stryMutAct_9fa48("7398") ? "" : (stryCov_9fa48("7398"), 'redo'):
        if (stryMutAct_9fa48("7397")) {} else {
          stryCov_9fa48("7397");
          {
            if (stryMutAct_9fa48("7399")) {
              {}
            } else {
              stryCov_9fa48("7399");
              const next = state.future[0];
              return next ? stryMutAct_9fa48("7400") ? {} : (stryCov_9fa48("7400"), {
                past: stryMutAct_9fa48("7401") ? [] : (stryCov_9fa48("7401"), [...state.past, state.present]),
                present: next,
                future: stryMutAct_9fa48("7402") ? state.future : (stryCov_9fa48("7402"), state.future.slice(1)),
                group: null
              }) : state;
            }
          }
        }
      case stryMutAct_9fa48("7404") ? "" : (stryCov_9fa48("7404"), 'edit'):
        if (stryMutAct_9fa48("7403")) {} else {
          stryCov_9fa48("7403");
          {
            if (stryMutAct_9fa48("7405")) {
              {}
            } else {
              stryCov_9fa48("7405");
              const present = stryMutAct_9fa48("7406") ? {} : (stryCov_9fa48("7406"), {
                ...state.present,
                ...action.patch
              });
              if (stryMutAct_9fa48("7409") ? JSON.stringify(present) !== JSON.stringify(state.present) : stryMutAct_9fa48("7408") ? false : stryMutAct_9fa48("7407") ? true : (stryCov_9fa48("7407", "7408", "7409"), JSON.stringify(present) === JSON.stringify(state.present))) return state;
              const grouped = stryMutAct_9fa48("7412") ? action.group !== undefined || action.group === state.group : stryMutAct_9fa48("7411") ? false : stryMutAct_9fa48("7410") ? true : (stryCov_9fa48("7410", "7411", "7412"), (stryMutAct_9fa48("7414") ? action.group === undefined : stryMutAct_9fa48("7413") ? true : (stryCov_9fa48("7413", "7414"), action.group !== undefined)) && (stryMutAct_9fa48("7416") ? action.group !== state.group : stryMutAct_9fa48("7415") ? true : (stryCov_9fa48("7415", "7416"), action.group === state.group)));
              return stryMutAct_9fa48("7417") ? {} : (stryCov_9fa48("7417"), {
                past: grouped ? state.past : stryMutAct_9fa48("7418") ? [] : (stryCov_9fa48("7418"), [...(stryMutAct_9fa48("7419") ? state.past : (stryCov_9fa48("7419"), state.past.slice(stryMutAct_9fa48("7420") ? +59 : (stryCov_9fa48("7420"), -59)))), state.present]),
                present,
                future: stryMutAct_9fa48("7421") ? ["Stryker was here"] : (stryCov_9fa48("7421"), []),
                group: stryMutAct_9fa48("7422") ? action.group && null : (stryCov_9fa48("7422"), action.group ?? null)
              });
            }
          }
        }
      default:
        if (stryMutAct_9fa48("7423")) {} else {
          stryCov_9fa48("7423");
          {
            if (stryMutAct_9fa48("7424")) {
              {}
            } else {
              stryCov_9fa48("7424");
              const unreachable: never = action;
              return unreachable;
            }
          }
        }
    }
  }
}
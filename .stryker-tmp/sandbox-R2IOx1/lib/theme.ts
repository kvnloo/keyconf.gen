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
type PaletteLike = {
  alpha: string;
  mod: string;
  accent: string;
  space: string;
};
function blendColor(c1: string, c2: string, ratio = 0.35): string {
  if (stryMutAct_9fa48("14505")) {
    {}
  } else {
    stryCov_9fa48("14505");
    const p = stryMutAct_9fa48("14506") ? () => undefined : (stryCov_9fa48("14506"), (() => {
      const p = (hex: string, offset: number) => stryMutAct_9fa48("14507") ? parseInt(hex.slice(offset, offset + 2), 16) * 255 : (stryCov_9fa48("14507"), parseInt(stryMutAct_9fa48("14508") ? hex : (stryCov_9fa48("14508"), hex.slice(offset, stryMutAct_9fa48("14509") ? offset - 2 : (stryCov_9fa48("14509"), offset + 2))), 16) / 255);
      return p;
    })());
    const r1 = p(c1, 1),
      g1 = p(c1, 3),
      b1 = p(c1, 5);
    const r2 = p(c2, 1),
      g2 = p(c2, 3),
      b2 = p(c2, 5);
    const blend = stryMutAct_9fa48("14510") ? () => undefined : (stryCov_9fa48("14510"), (() => {
      const blend = (a: number, b: number) => stryMutAct_9fa48("14511") ? Math.round(a * ratio + b * (1 - ratio)) * 255 : (stryCov_9fa48("14511"), Math.round(stryMutAct_9fa48("14512") ? a * ratio - b * (1 - ratio) : (stryCov_9fa48("14512"), (stryMutAct_9fa48("14513") ? a / ratio : (stryCov_9fa48("14513"), a * ratio)) + (stryMutAct_9fa48("14514") ? b / (1 - ratio) : (stryCov_9fa48("14514"), b * (stryMutAct_9fa48("14515") ? 1 + ratio : (stryCov_9fa48("14515"), 1 - ratio)))))) / 255);
      return blend;
    })());
    const toHex = stryMutAct_9fa48("14516") ? () => undefined : (stryCov_9fa48("14516"), (() => {
      const toHex = (v: number) => Math.round(stryMutAct_9fa48("14517") ? v / 255 : (stryCov_9fa48("14517"), v * 255)).toString(16).padStart(2, stryMutAct_9fa48("14518") ? "" : (stryCov_9fa48("14518"), '0'));
      return toHex;
    })());
    return stryMutAct_9fa48("14519") ? `` : (stryCov_9fa48("14519"), `#${toHex(blend(r1, r2))}${toHex(blend(g1, g2))}${toHex(blend(b1, b2))}`);
  }
}
function contrastRatio(ink: string, background: string): number {
  if (stryMutAct_9fa48("14520")) {
    {}
  } else {
    stryCov_9fa48("14520");
    const lum = (hex: string) => {
      if (stryMutAct_9fa48("14521")) {
        {}
      } else {
        stryCov_9fa48("14521");
        const [r, g, b] = (stryMutAct_9fa48("14522") ? [] : (stryCov_9fa48("14522"), [1, 3, 5])).map(stryMutAct_9fa48("14523") ? () => undefined : (stryCov_9fa48("14523"), off => stryMutAct_9fa48("14524") ? parseInt(hex.slice(off, off + 2), 16) * 255 : (stryCov_9fa48("14524"), parseInt(stryMutAct_9fa48("14525") ? hex : (stryCov_9fa48("14525"), hex.slice(off, stryMutAct_9fa48("14526") ? off - 2 : (stryCov_9fa48("14526"), off + 2))), 16) / 255)));
        const adjust = stryMutAct_9fa48("14527") ? () => undefined : (stryCov_9fa48("14527"), (() => {
          const adjust = (v: number) => (stryMutAct_9fa48("14531") ? v > 0.03928 : stryMutAct_9fa48("14530") ? v < 0.03928 : stryMutAct_9fa48("14529") ? false : stryMutAct_9fa48("14528") ? true : (stryCov_9fa48("14528", "14529", "14530", "14531"), v <= 0.03928)) ? stryMutAct_9fa48("14532") ? v * 12.92 : (stryCov_9fa48("14532"), v / 12.92) : Math.pow(stryMutAct_9fa48("14533") ? (v + 0.055) * 1.055 : (stryCov_9fa48("14533"), (stryMutAct_9fa48("14534") ? v - 0.055 : (stryCov_9fa48("14534"), v + 0.055)) / 1.055), 2.4);
          return adjust;
        })());
        return stryMutAct_9fa48("14535") ? 0.2126 * adjust(r) + 0.7152 * adjust(g) - 0.0722 * adjust(b) : (stryCov_9fa48("14535"), (stryMutAct_9fa48("14536") ? 0.2126 * adjust(r) - 0.7152 * adjust(g) : (stryCov_9fa48("14536"), (stryMutAct_9fa48("14537") ? 0.2126 / adjust(r) : (stryCov_9fa48("14537"), 0.2126 * adjust(r))) + (stryMutAct_9fa48("14538") ? 0.7152 / adjust(g) : (stryCov_9fa48("14538"), 0.7152 * adjust(g))))) + (stryMutAct_9fa48("14539") ? 0.0722 / adjust(b) : (stryCov_9fa48("14539"), 0.0722 * adjust(b))));
      }
    };
    const L1 = lum(background),
      L2 = lum(ink);
    return stryMutAct_9fa48("14540") ? Math.max(L1, L2) * Math.min(L1, L2) : (stryCov_9fa48("14540"), (stryMutAct_9fa48("14541") ? Math.min(L1, L2) : (stryCov_9fa48("14541"), Math.max(L1, L2))) / (stryMutAct_9fa48("14542") ? Math.max(L1, L2) : (stryCov_9fa48("14542"), Math.min(L1, L2))));
  }
}
function computeTheme(p: PaletteLike) {
  if (stryMutAct_9fa48("14543")) {
    {}
  } else {
    stryCov_9fa48("14543");
    const paper = blendColor(p.space, stryMutAct_9fa48("14544") ? "" : (stryCov_9fa48("14544"), '#161d19'), 0.35);
    const ink = (stryMutAct_9fa48("14548") ? contrastRatio('#f8f8ef', p.space) <= contrastRatio('#20251f', p.space) : stryMutAct_9fa48("14547") ? contrastRatio('#f8f8ef', p.space) >= contrastRatio('#20251f', p.space) : stryMutAct_9fa48("14546") ? false : stryMutAct_9fa48("14545") ? true : (stryCov_9fa48("14545", "14546", "14547", "14548"), contrastRatio(stryMutAct_9fa48("14549") ? "" : (stryCov_9fa48("14549"), '#f8f8ef'), p.space) > contrastRatio(stryMutAct_9fa48("14550") ? "" : (stryCov_9fa48("14550"), '#20251f'), p.space))) ? stryMutAct_9fa48("14551") ? "" : (stryCov_9fa48("14551"), '#f8f8ef') : stryMutAct_9fa48("14552") ? "" : (stryCov_9fa48("14552"), '#20251f');
    const theme = stryMutAct_9fa48("14553") ? `` : (stryCov_9fa48("14553"), `:root { --bg-color: ${p.space} !important; --main-color: ${p.alpha} !important; --text-color: ${ink} !important; --sub-color: ${p.mod} !important; --caret-color: ${p.accent} !important; --sub-alt-color: ${paper} !important; --error-color: #f29581 !important; --error-extra-color: #c95d4b !important; }`);
    return stryMutAct_9fa48("14554") ? {} : (stryCov_9fa48("14554"), {
      theme,
      ink,
      paper
    });
  }
}
export function applyPaletteTheme(p: PaletteLike, target: Document = document) {
  if (stryMutAct_9fa48("14555")) {
    {}
  } else {
    stryCov_9fa48("14555");
    const {
      theme,
      ink,
      paper
    } = computeTheme(p);
    const style = stryMutAct_9fa48("14556") ? target.head.querySelector<HTMLStyleElement>('#keyconf-theme') && target.createElement('style') : (stryCov_9fa48("14556"), target.head.querySelector<HTMLStyleElement>(stryMutAct_9fa48("14557") ? "" : (stryCov_9fa48("14557"), '#keyconf-theme')) ?? target.createElement(stryMutAct_9fa48("14558") ? "" : (stryCov_9fa48("14558"), 'style')));
    style.id = stryMutAct_9fa48("14559") ? "" : (stryCov_9fa48("14559"), 'keyconf-theme');
    style.textContent = theme;
    if (stryMutAct_9fa48("14562") ? false : stryMutAct_9fa48("14561") ? true : stryMutAct_9fa48("14560") ? style.isConnected : (stryCov_9fa48("14560", "14561", "14562"), !style.isConnected)) if (stryMutAct_9fa48("14563")) {
      ;
    } else {
      stryCov_9fa48("14563");
      target.head.appendChild(style);
    }
    target.documentElement.style.setProperty(stryMutAct_9fa48("14565") ? "" : (stryCov_9fa48("14565"), '--surface'), p.space);
    target.documentElement.style.setProperty(stryMutAct_9fa48("14567") ? "" : (stryCov_9fa48("14567"), '--paper'), paper);
    target.documentElement.style.setProperty(stryMutAct_9fa48("14569") ? "" : (stryCov_9fa48("14569"), '--ink'), ink);
    target.documentElement.style.setProperty(stryMutAct_9fa48("14571") ? "" : (stryCov_9fa48("14571"), '--muted'), p.mod);
    target.documentElement.style.setProperty(stryMutAct_9fa48("14573") ? "" : (stryCov_9fa48("14573"), '--focus'), p.accent);
    target.documentElement.style.setProperty(stryMutAct_9fa48("14575") ? "" : (stryCov_9fa48("14575"), '--green'), p.accent);
    return style;
  }
}
export { computeTheme, blendColor, contrastRatio };
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
function luminance(hex: string) {
  if (stryMutAct_9fa48("5523")) {
    {}
  } else {
    stryCov_9fa48("5523");
    return (stryMutAct_9fa48("5524") ? [] : (stryCov_9fa48("5524"), [1, 3, 5])).reduce((sum, offset, channel) => {
      if (stryMutAct_9fa48("5525")) {
        {}
      } else {
        stryCov_9fa48("5525");
        const value = stryMutAct_9fa48("5526") ? Number.parseInt(hex.slice(offset, offset + 2), 16) * 255 : (stryCov_9fa48("5526"), Number.parseInt(stryMutAct_9fa48("5527") ? hex : (stryCov_9fa48("5527"), hex.slice(offset, stryMutAct_9fa48("5528") ? offset - 2 : (stryCov_9fa48("5528"), offset + 2))), 16) / 255);
        const linear = (stryMutAct_9fa48("5532") ? value > 0.04045 : stryMutAct_9fa48("5531") ? value < 0.04045 : stryMutAct_9fa48("5530") ? false : stryMutAct_9fa48("5529") ? true : (stryCov_9fa48("5529", "5530", "5531", "5532"), value <= 0.04045)) ? stryMutAct_9fa48("5533") ? value * 12.92 : (stryCov_9fa48("5533"), value / 12.92) : (stryMutAct_9fa48("5534") ? (value + 0.055) * 1.055 : (stryCov_9fa48("5534"), (stryMutAct_9fa48("5535") ? value - 0.055 : (stryCov_9fa48("5535"), value + 0.055)) / 1.055)) ** 2.4;
        return stryMutAct_9fa48("5536") ? sum - linear * [0.2126, 0.7152, 0.0722][channel] : (stryCov_9fa48("5536"), sum + (stryMutAct_9fa48("5537") ? linear / [0.2126, 0.7152, 0.0722][channel] : (stryCov_9fa48("5537"), linear * (stryMutAct_9fa48("5538") ? [] : (stryCov_9fa48("5538"), [0.2126, 0.7152, 0.0722]))[channel])));
      }
    }, 0);
  }
}
export function legendInk(background: string) {
  if (stryMutAct_9fa48("5539")) {
    {}
  } else {
    stryCov_9fa48("5539");
    const surface = luminance(background);
    const dark = stryMutAct_9fa48("5540") ? "" : (stryCov_9fa48("5540"), '#20251f');
    const light = stryMutAct_9fa48("5541") ? "" : (stryCov_9fa48("5541"), '#f8f8ef');
    const contrast = (ink: string) => {
      if (stryMutAct_9fa48("5542")) {
        {}
      } else {
        stryCov_9fa48("5542");
        const value = luminance(ink);
        return stryMutAct_9fa48("5543") ? (Math.max(value, surface) + 0.05) * (Math.min(value, surface) + 0.05) : (stryCov_9fa48("5543"), (stryMutAct_9fa48("5544") ? Math.max(value, surface) - 0.05 : (stryCov_9fa48("5544"), (stryMutAct_9fa48("5545") ? Math.min(value, surface) : (stryCov_9fa48("5545"), Math.max(value, surface))) + 0.05)) / (stryMutAct_9fa48("5546") ? Math.min(value, surface) - 0.05 : (stryCov_9fa48("5546"), (stryMutAct_9fa48("5547") ? Math.max(value, surface) : (stryCov_9fa48("5547"), Math.min(value, surface))) + 0.05)));
      }
    };
    return (stryMutAct_9fa48("5551") ? contrast(light) <= contrast(dark) : stryMutAct_9fa48("5550") ? contrast(light) >= contrast(dark) : stryMutAct_9fa48("5549") ? false : stryMutAct_9fa48("5548") ? true : (stryCov_9fa48("5548", "5549", "5550", "5551"), contrast(light) > contrast(dark))) ? light : dark;
  }
}
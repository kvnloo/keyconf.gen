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
export type ScreenPoint = {
  x: number;
  y: number;
};

// Map a readable DOM viewport onto the four corners of the physical screen.
export function monitorTransform([tl, tr, br, bl]: [ScreenPoint, ScreenPoint, ScreenPoint, ScreenPoint], width: number, height: number): string | null {
  if (stryMutAct_9fa48("12941")) {
    {}
  } else {
    stryCov_9fa48("12941");
    const dx1 = stryMutAct_9fa48("12942") ? tr.x + br.x : (stryCov_9fa48("12942"), tr.x - br.x),
      dx2 = stryMutAct_9fa48("12943") ? bl.x + br.x : (stryCov_9fa48("12943"), bl.x - br.x);
    const dy1 = stryMutAct_9fa48("12944") ? tr.y + br.y : (stryCov_9fa48("12944"), tr.y - br.y),
      dy2 = stryMutAct_9fa48("12945") ? bl.y + br.y : (stryCov_9fa48("12945"), bl.y - br.y);
    const dx3 = stryMutAct_9fa48("12946") ? tl.x - tr.x + br.x + bl.x : (stryCov_9fa48("12946"), (stryMutAct_9fa48("12947") ? tl.x - tr.x - br.x : (stryCov_9fa48("12947"), (stryMutAct_9fa48("12948") ? tl.x + tr.x : (stryCov_9fa48("12948"), tl.x - tr.x)) + br.x)) - bl.x);
    const dy3 = stryMutAct_9fa48("12949") ? tl.y - tr.y + br.y + bl.y : (stryCov_9fa48("12949"), (stryMutAct_9fa48("12950") ? tl.y - tr.y - br.y : (stryCov_9fa48("12950"), (stryMutAct_9fa48("12951") ? tl.y + tr.y : (stryCov_9fa48("12951"), tl.y - tr.y)) + br.y)) - bl.y);
    const denominator = stryMutAct_9fa48("12952") ? dx1 * dy2 + dx2 * dy1 : (stryCov_9fa48("12952"), (stryMutAct_9fa48("12953") ? dx1 / dy2 : (stryCov_9fa48("12953"), dx1 * dy2)) - (stryMutAct_9fa48("12954") ? dx2 / dy1 : (stryCov_9fa48("12954"), dx2 * dy1)));
    if (stryMutAct_9fa48("12957") ? (Math.abs(denominator) < 0.001 || width <= 0) && height <= 0 : stryMutAct_9fa48("12956") ? false : stryMutAct_9fa48("12955") ? true : (stryCov_9fa48("12955", "12956", "12957"), (stryMutAct_9fa48("12959") ? Math.abs(denominator) < 0.001 && width <= 0 : stryMutAct_9fa48("12958") ? false : (stryCov_9fa48("12958", "12959"), (stryMutAct_9fa48("12962") ? Math.abs(denominator) >= 0.001 : stryMutAct_9fa48("12961") ? Math.abs(denominator) <= 0.001 : stryMutAct_9fa48("12960") ? false : (stryCov_9fa48("12960", "12961", "12962"), Math.abs(denominator) < 0.001)) || (stryMutAct_9fa48("12965") ? width > 0 : stryMutAct_9fa48("12964") ? width < 0 : stryMutAct_9fa48("12963") ? false : (stryCov_9fa48("12963", "12964", "12965"), width <= 0)))) || (stryMutAct_9fa48("12968") ? height > 0 : stryMutAct_9fa48("12967") ? height < 0 : stryMutAct_9fa48("12966") ? false : (stryCov_9fa48("12966", "12967", "12968"), height <= 0)))) return null;
    const g = stryMutAct_9fa48("12969") ? (dx3 * dy2 - dx2 * dy3) * denominator : (stryCov_9fa48("12969"), (stryMutAct_9fa48("12970") ? dx3 * dy2 + dx2 * dy3 : (stryCov_9fa48("12970"), (stryMutAct_9fa48("12971") ? dx3 / dy2 : (stryCov_9fa48("12971"), dx3 * dy2)) - (stryMutAct_9fa48("12972") ? dx2 / dy3 : (stryCov_9fa48("12972"), dx2 * dy3)))) / denominator);
    const h = stryMutAct_9fa48("12973") ? (dx1 * dy3 - dx3 * dy1) * denominator : (stryCov_9fa48("12973"), (stryMutAct_9fa48("12974") ? dx1 * dy3 + dx3 * dy1 : (stryCov_9fa48("12974"), (stryMutAct_9fa48("12975") ? dx1 / dy3 : (stryCov_9fa48("12975"), dx1 * dy3)) - (stryMutAct_9fa48("12976") ? dx3 / dy1 : (stryCov_9fa48("12976"), dx3 * dy1)))) / denominator);
    return stryMutAct_9fa48("12977") ? `` : (stryCov_9fa48("12977"), `matrix3d(${(stryMutAct_9fa48("12978") ? [] : (stryCov_9fa48("12978"), [stryMutAct_9fa48("12979") ? (tr.x - tl.x + g * tr.x) * width : (stryCov_9fa48("12979"), (stryMutAct_9fa48("12980") ? tr.x - tl.x - g * tr.x : (stryCov_9fa48("12980"), (stryMutAct_9fa48("12981") ? tr.x + tl.x : (stryCov_9fa48("12981"), tr.x - tl.x)) + (stryMutAct_9fa48("12982") ? g / tr.x : (stryCov_9fa48("12982"), g * tr.x)))) / width), stryMutAct_9fa48("12983") ? (tr.y - tl.y + g * tr.y) * width : (stryCov_9fa48("12983"), (stryMutAct_9fa48("12984") ? tr.y - tl.y - g * tr.y : (stryCov_9fa48("12984"), (stryMutAct_9fa48("12985") ? tr.y + tl.y : (stryCov_9fa48("12985"), tr.y - tl.y)) + (stryMutAct_9fa48("12986") ? g / tr.y : (stryCov_9fa48("12986"), g * tr.y)))) / width), 0, stryMutAct_9fa48("12987") ? g * width : (stryCov_9fa48("12987"), g / width), stryMutAct_9fa48("12988") ? (bl.x - tl.x + h * bl.x) * height : (stryCov_9fa48("12988"), (stryMutAct_9fa48("12989") ? bl.x - tl.x - h * bl.x : (stryCov_9fa48("12989"), (stryMutAct_9fa48("12990") ? bl.x + tl.x : (stryCov_9fa48("12990"), bl.x - tl.x)) + (stryMutAct_9fa48("12991") ? h / bl.x : (stryCov_9fa48("12991"), h * bl.x)))) / height), stryMutAct_9fa48("12992") ? (bl.y - tl.y + h * bl.y) * height : (stryCov_9fa48("12992"), (stryMutAct_9fa48("12993") ? bl.y - tl.y - h * bl.y : (stryCov_9fa48("12993"), (stryMutAct_9fa48("12994") ? bl.y + tl.y : (stryCov_9fa48("12994"), bl.y - tl.y)) + (stryMutAct_9fa48("12995") ? h / bl.y : (stryCov_9fa48("12995"), h * bl.y)))) / height), 0, stryMutAct_9fa48("12996") ? h * height : (stryCov_9fa48("12996"), h / height), 0, 0, 1, 0, tl.x, tl.y, 0, 1])).join(stryMutAct_9fa48("12997") ? "" : (stryCov_9fa48("12997"), ','))})`);
  }
}
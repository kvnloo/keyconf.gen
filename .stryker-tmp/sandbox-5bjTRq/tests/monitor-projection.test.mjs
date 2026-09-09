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
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { monitorTransform } from '../lib/monitor-projection.ts';
function transform(css, x, y) {
  if (stryMutAct_9fa48("21129")) {
    {}
  } else {
    stryCov_9fa48("21129");
    const m = stryMutAct_9fa48("21130") ? css.split(',').map(Number) : (stryCov_9fa48("21130"), css.slice(9, stryMutAct_9fa48("21131") ? +1 : (stryCov_9fa48("21131"), -1)).split(stryMutAct_9fa48("21132") ? "" : (stryCov_9fa48("21132"), ',')).map(Number));
    const w = stryMutAct_9fa48("21133") ? m[3] * x + m[7] * y - m[15] : (stryCov_9fa48("21133"), (stryMutAct_9fa48("21134") ? m[3] * x - m[7] * y : (stryCov_9fa48("21134"), (stryMutAct_9fa48("21135") ? m[3] / x : (stryCov_9fa48("21135"), m[3] * x)) + (stryMutAct_9fa48("21136") ? m[7] / y : (stryCov_9fa48("21136"), m[7] * y)))) + m[15]);
    return stryMutAct_9fa48("21137") ? [] : (stryCov_9fa48("21137"), [stryMutAct_9fa48("21138") ? (m[0] * x + m[4] * y + m[12]) * w : (stryCov_9fa48("21138"), (stryMutAct_9fa48("21139") ? m[0] * x + m[4] * y - m[12] : (stryCov_9fa48("21139"), (stryMutAct_9fa48("21140") ? m[0] * x - m[4] * y : (stryCov_9fa48("21140"), (stryMutAct_9fa48("21141") ? m[0] / x : (stryCov_9fa48("21141"), m[0] * x)) + (stryMutAct_9fa48("21142") ? m[4] / y : (stryCov_9fa48("21142"), m[4] * y)))) + m[12])) / w), stryMutAct_9fa48("21143") ? (m[1] * x + m[5] * y + m[13]) * w : (stryCov_9fa48("21143"), (stryMutAct_9fa48("21144") ? m[1] * x + m[5] * y - m[13] : (stryCov_9fa48("21144"), (stryMutAct_9fa48("21145") ? m[1] * x - m[5] * y : (stryCov_9fa48("21145"), (stryMutAct_9fa48("21146") ? m[1] / x : (stryCov_9fa48("21146"), m[1] * x)) + (stryMutAct_9fa48("21147") ? m[5] / y : (stryCov_9fa48("21147"), m[5] * y)))) + m[13])) / w)]);
  }
}
test(stryMutAct_9fa48("21149") ? "" : (stryCov_9fa48("21149"), 'Monitor projection keeps all four corners on a tilted screen'), () => {
  if (stryMutAct_9fa48("21150")) {
    {}
  } else {
    stryCov_9fa48("21150");
    for (const corners of stryMutAct_9fa48("21151") ? [] : (stryCov_9fa48("21151"), [stryMutAct_9fa48("21152") ? [] : (stryCov_9fa48("21152"), [stryMutAct_9fa48("21153") ? {} : (stryCov_9fa48("21153"), {
      x: 20,
      y: 40
    }), stryMutAct_9fa48("21154") ? {} : (stryCov_9fa48("21154"), {
      x: 820,
      y: 40
    }), stryMutAct_9fa48("21155") ? {} : (stryCov_9fa48("21155"), {
      x: 820,
      y: 490
    }), stryMutAct_9fa48("21156") ? {} : (stryCov_9fa48("21156"), {
      x: 20,
      y: 490
    })]), stryMutAct_9fa48("21157") ? [] : (stryCov_9fa48("21157"), [stryMutAct_9fa48("21158") ? {} : (stryCov_9fa48("21158"), {
      x: 130,
      y: 80
    }), stryMutAct_9fa48("21159") ? {} : (stryCov_9fa48("21159"), {
      x: 750,
      y: 140
    }), stryMutAct_9fa48("21160") ? {} : (stryCov_9fa48("21160"), {
      x: 720,
      y: 550
    }), stryMutAct_9fa48("21161") ? {} : (stryCov_9fa48("21161"), {
      x: 100,
      y: 500
    })])])) {
      if (stryMutAct_9fa48("21162")) {
        {}
      } else {
        stryCov_9fa48("21162");
        const css = monitorTransform(corners, 960, 540);
        if (stryMutAct_9fa48("21163")) {
          ;
        } else {
          stryCov_9fa48("21163");
          assert.ok(css);
        }
        for (const [i, [x, y]] of (stryMutAct_9fa48("21164") ? [] : (stryCov_9fa48("21164"), [stryMutAct_9fa48("21165") ? [] : (stryCov_9fa48("21165"), [0, 0]), stryMutAct_9fa48("21166") ? [] : (stryCov_9fa48("21166"), [960, 0]), stryMutAct_9fa48("21167") ? [] : (stryCov_9fa48("21167"), [960, 540]), stryMutAct_9fa48("21168") ? [] : (stryCov_9fa48("21168"), [0, 540])])).entries()) {
          if (stryMutAct_9fa48("21169")) {
            {}
          } else {
            stryCov_9fa48("21169");
            const actual = transform(css, x, y);
            assert.ok(stryMutAct_9fa48("21174") ? Math.abs(actual[0] - corners[i].x) >= 1e-8 : stryMutAct_9fa48("21173") ? Math.abs(actual[0] - corners[i].x) <= 1e-8 : stryMutAct_9fa48("21172") ? false : stryMutAct_9fa48("21171") ? true : (stryCov_9fa48("21171", "21172", "21173", "21174"), Math.abs(stryMutAct_9fa48("21175") ? actual[0] + corners[i].x : (stryCov_9fa48("21175"), actual[0] - corners[i].x)) < 1e-8));
            assert.ok(stryMutAct_9fa48("21180") ? Math.abs(actual[1] - corners[i].y) >= 1e-8 : stryMutAct_9fa48("21179") ? Math.abs(actual[1] - corners[i].y) <= 1e-8 : stryMutAct_9fa48("21178") ? false : stryMutAct_9fa48("21177") ? true : (stryCov_9fa48("21177", "21178", "21179", "21180"), Math.abs(stryMutAct_9fa48("21181") ? actual[1] + corners[i].y : (stryCov_9fa48("21181"), actual[1] - corners[i].y)) < 1e-8));
          }
        }
      }
    }
  }
});
test(stryMutAct_9fa48("21183") ? "" : (stryCov_9fa48("21183"), 'A collapsed monitor cannot produce invalid CSS transforms'), () => {
  if (stryMutAct_9fa48("21184")) {
    {}
  } else {
    stryCov_9fa48("21184");
    assert.equal(monitorTransform(stryMutAct_9fa48("21186") ? Array().fill({
      x: 0,
      y: 0
    }) : (stryCov_9fa48("21186"), Array(4).fill(stryMutAct_9fa48("21187") ? {} : (stryCov_9fa48("21187"), {
      x: 0,
      y: 0
    }))), 960, 540), null);
  }
});
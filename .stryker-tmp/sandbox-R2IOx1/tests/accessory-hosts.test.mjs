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
import test from 'node:test';
import assert from 'node:assert/strict';
import { accessoryHost } from '../lib/accessory-hosts.ts';
import { assessAccessories } from '../lib/build-accessories.ts';
const board = stryMutAct_9fa48("14761") ? {} : (stryCov_9fa48("14761"), {
  layout: stryMutAct_9fa48("14762") ? "" : (stryCov_9fa48("14762"), '75'),
  selection: stryMutAct_9fa48("14763") ? {} : (stryCov_9fa48("14763"), {
    case: stryMutAct_9fa48("14764") ? "" : (stryCov_9fa48("14764"), 'q1-max-case'),
    pcb: stryMutAct_9fa48("14765") ? "" : (stryCov_9fa48("14765"), 'q1-max-pcb'),
    plate: stryMutAct_9fa48("14766") ? "" : (stryCov_9fa48("14766"), 'q1-max-plate')
  })
});
const knob = stryMutAct_9fa48("14767") ? {} : (stryCov_9fa48("14767"), {
  id: stryMutAct_9fa48("14768") ? "" : (stryCov_9fa48("14768"), 'knob'),
  productId: stryMutAct_9fa48("14769") ? "" : (stryCov_9fa48("14769"), 'keychron-aluminum-knob'),
  quantity: 1,
  location: stryMutAct_9fa48("14770") ? {} : (stryCov_9fa48("14770"), {
    kind: stryMutAct_9fa48("14771") ? "" : (stryCov_9fa48("14771"), 'embedded'),
    slotId: stryMutAct_9fa48("14772") ? "" : (stryCov_9fa48("14772"), 'stock-knob')
  })
});
test(stryMutAct_9fa48("14774") ? "" : (stryCov_9fa48("14774"), 'replacement cap is confirmed only on a complete Q1 Max assembly and documented slot'), () => {
  if (stryMutAct_9fa48("14775")) {
    {}
  } else {
    stryCov_9fa48("14775");
    const host = accessoryHost(board);
    assert.equal(assessAccessories(stryMutAct_9fa48("14777") ? [] : (stryCov_9fa48("14777"), [knob]), host).knob.status, stryMutAct_9fa48("14778") ? "" : (stryCov_9fa48("14778"), 'confirmed'));
    for (const category of stryMutAct_9fa48("14779") ? [] : (stryCov_9fa48("14779"), [stryMutAct_9fa48("14780") ? "" : (stryCov_9fa48("14780"), 'case'), stryMutAct_9fa48("14781") ? "" : (stryCov_9fa48("14781"), 'pcb'), stryMutAct_9fa48("14782") ? "" : (stryCov_9fa48("14782"), 'plate')])) {
      if (stryMutAct_9fa48("14783")) {
        {}
      } else {
        stryCov_9fa48("14783");
        const mixed = stryMutAct_9fa48("14784") ? {} : (stryCov_9fa48("14784"), {
          ...board,
          selection: stryMutAct_9fa48("14785") ? {} : (stryCov_9fa48("14785"), {
            ...board.selection,
            [category]: stryMutAct_9fa48("14786") ? "" : (stryCov_9fa48("14786"), 'another-part')
          })
        });
        if (stryMutAct_9fa48("14787")) {
          ;
        } else {
          stryCov_9fa48("14787");
          assert.equal(accessoryHost(mixed), undefined);
        }
        assert.equal(assessAccessories(stryMutAct_9fa48("14789") ? [] : (stryCov_9fa48("14789"), [knob]), accessoryHost(mixed)).knob.status, stryMutAct_9fa48("14790") ? "" : (stryCov_9fa48("14790"), 'unknown'));
      }
    }
    assert.equal(accessoryHost(stryMutAct_9fa48("14792") ? {} : (stryCov_9fa48("14792"), {
      ...board,
      layout: stryMutAct_9fa48("14793") ? "" : (stryCov_9fa48("14793"), '65')
    })), undefined);
    assert.equal(assessAccessories(stryMutAct_9fa48("14795") ? [] : (stryCov_9fa48("14795"), [stryMutAct_9fa48("14796") ? {} : (stryCov_9fa48("14796"), {
      ...knob,
      location: stryMutAct_9fa48("14797") ? {} : (stryCov_9fa48("14797"), {
        kind: stryMutAct_9fa48("14798") ? "" : (stryCov_9fa48("14798"), 'embedded'),
        slotId: stryMutAct_9fa48("14799") ? "" : (stryCov_9fa48("14799"), 'unassigned')
      })
    })]), host).knob.status, stryMutAct_9fa48("14800") ? "" : (stryCov_9fa48("14800"), 'unknown'));
    assert.equal(assessAccessories(stryMutAct_9fa48("14802") ? [] : (stryCov_9fa48("14802"), [knob, stryMutAct_9fa48("14803") ? {} : (stryCov_9fa48("14803"), {
      ...knob,
      id: stryMutAct_9fa48("14804") ? "" : (stryCov_9fa48("14804"), 'duplicate')
    })]), host).knob.status, stryMutAct_9fa48("14805") ? "" : (stryCov_9fa48("14805"), 'conflict'));
    assert.equal(assessAccessories(stryMutAct_9fa48("14807") ? [] : (stryCov_9fa48("14807"), [stryMutAct_9fa48("14808") ? {} : (stryCov_9fa48("14808"), {
      ...knob,
      productId: stryMutAct_9fa48("14809") ? "" : (stryCov_9fa48("14809"), 'adafruit-377-encoder')
    })]), host).knob.status, stryMutAct_9fa48("14810") ? "" : (stryCov_9fa48("14810"), 'conflict'));
    if (stryMutAct_9fa48("14811")) {
      ;
    } else {
      stryCov_9fa48("14811");
      assert.equal(host.keys.length, 81);
    }
    assert.equal(stryMutAct_9fa48("14813") ? host.keys.every(key => key.id === 'AudioVolumeMute') : (stryCov_9fa48("14813"), host.keys.some(stryMutAct_9fa48("14814") ? () => undefined : (stryCov_9fa48("14814"), key => stryMutAct_9fa48("14817") ? key.id !== 'AudioVolumeMute' : stryMutAct_9fa48("14816") ? false : stryMutAct_9fa48("14815") ? true : (stryCov_9fa48("14815", "14816", "14817"), key.id === (stryMutAct_9fa48("14818") ? "" : (stryCov_9fa48("14818"), 'AudioVolumeMute')))))), stryMutAct_9fa48("14819") ? true : (stryCov_9fa48("14819"), false));
  }
});
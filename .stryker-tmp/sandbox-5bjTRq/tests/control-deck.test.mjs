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
import { readFileSync } from 'node:fs';
import { newDeck, parseDeck, encodeDeck, decodeDeck } from '../lib/control-deck.ts';
import { defaultBuild } from '../lib/build.ts';
test(stryMutAct_9fa48("19781") ? "" : (stryCov_9fa48("19781"), 'control deck links retain a distinct device and Unicode customization without keyboard parts'), () => {
  if (stryMutAct_9fa48("19782")) {
    {}
  } else {
    stryCov_9fa48("19782");
    for (const device of stryMutAct_9fa48("19783") ? [] : (stryCov_9fa48("19783"), [stryMutAct_9fa48("19784") ? "" : (stryCov_9fa48("19784"), 'grok-bot'), stryMutAct_9fa48("19785") ? "" : (stryCov_9fa48("19785"), 'codex-micro')])) {
      if (stryMutAct_9fa48("19786")) {
        {}
      } else {
        stryCov_9fa48("19786");
        const build = stryMutAct_9fa48("19787") ? {} : (stryCov_9fa48("19787"), {
          ...newDeck(device),
          name: stryMutAct_9fa48("19788") ? "" : (stryCov_9fa48("19788"), 'Kevin’s study 日本語'),
          colors: stryMutAct_9fa48("19789") ? {} : (stryCov_9fa48("19789"), {
            case: stryMutAct_9fa48("19790") ? "" : (stryCov_9fa48("19790"), '#aBc123'),
            keys: stryMutAct_9fa48("19791") ? "" : (stryCov_9fa48("19791"), '#998877'),
            commands: stryMutAct_9fa48("19792") ? "" : (stryCov_9fa48("19792"), '#223344'),
            wide: stryMutAct_9fa48("19793") ? "" : (stryCov_9fa48("19793"), '#eeeeee')
          }),
          lighting: stryMutAct_9fa48("19794") ? "" : (stryCov_9fa48("19794"), 'After hours'),
          dial: 0.82
        });
        if (stryMutAct_9fa48("19795")) {
          ;
        } else {
          stryCov_9fa48("19795");
          assert.deepEqual(decodeDeck(encodeDeck(build)), build);
        }
        if (stryMutAct_9fa48("19796")) {
          ;
        } else {
          stryCov_9fa48("19796");
          assert.deepEqual(parseDeck(JSON.parse(JSON.stringify(build))), build);
        }
        assert.equal((stryMutAct_9fa48("19798") ? "" : (stryCov_9fa48("19798"), 'selection')) in build, stryMutAct_9fa48("19799") ? true : (stryCov_9fa48("19799"), false));
        assert.equal((stryMutAct_9fa48("19801") ? "" : (stryCov_9fa48("19801"), 'enabled')) in build, stryMutAct_9fa48("19802") ? true : (stryCov_9fa48("19802"), false));
      }
    }
    assert.throws(stryMutAct_9fa48("19804") ? () => undefined : (stryCov_9fa48("19804"), () => parseDeck(defaultBuild)));
  }
});
test(stryMutAct_9fa48("19806") ? "" : (stryCov_9fa48("19806"), 'malformed deck links cannot select arbitrary models or inject unbounded settings'), () => {
  if (stryMutAct_9fa48("19807")) {
    {}
  } else {
    stryCov_9fa48("19807");
    const original = newDeck(stryMutAct_9fa48("19808") ? "" : (stryCov_9fa48("19808"), 'grok-bot'));
    for (const patch of stryMutAct_9fa48("19809") ? [] : (stryCov_9fa48("19809"), [stryMutAct_9fa48("19810") ? {} : (stryCov_9fa48("19810"), {
      version: 2
    }), stryMutAct_9fa48("19811") ? {} : (stryCov_9fa48("19811"), {
      kind: stryMutAct_9fa48("19812") ? "" : (stryCov_9fa48("19812"), 'keyboard')
    }), stryMutAct_9fa48("19813") ? {} : (stryCov_9fa48("19813"), {
      device: stryMutAct_9fa48("19814") ? "" : (stryCov_9fa48("19814"), '../../private')
    }), stryMutAct_9fa48("19815") ? {} : (stryCov_9fa48("19815"), {
      name: (stryMutAct_9fa48("19816") ? "" : (stryCov_9fa48("19816"), 'x')).repeat(81)
    }), stryMutAct_9fa48("19817") ? {} : (stryCov_9fa48("19817"), {
      colors: stryMutAct_9fa48("19818") ? {} : (stryCov_9fa48("19818"), {
        ...original.colors,
        case: stryMutAct_9fa48("19819") ? "" : (stryCov_9fa48("19819"), 'url(https://example.com)')
      })
    }), stryMutAct_9fa48("19820") ? {} : (stryCov_9fa48("19820"), {
      colors: stryMutAct_9fa48("19821") ? {} : (stryCov_9fa48("19821"), {
        ...original.colors,
        keys: null
      })
    }), stryMutAct_9fa48("19822") ? {} : (stryCov_9fa48("19822"), {
      lighting: stryMutAct_9fa48("19823") ? "" : (stryCov_9fa48("19823"), 'Unknown')
    }), stryMutAct_9fa48("19824") ? {} : (stryCov_9fa48("19824"), {
      dial: NaN
    }), stryMutAct_9fa48("19825") ? {} : (stryCov_9fa48("19825"), {
      dial: Infinity
    }), stryMutAct_9fa48("19826") ? {} : (stryCov_9fa48("19826"), {
      dial: stryMutAct_9fa48("19827") ? +0.1 : (stryCov_9fa48("19827"), -0.1)
    }), stryMutAct_9fa48("19828") ? {} : (stryCov_9fa48("19828"), {
      dial: 1.01
    })])) assert.throws(stryMutAct_9fa48("19830") ? () => undefined : (stryCov_9fa48("19830"), () => parseDeck(stryMutAct_9fa48("19831") ? {} : (stryCov_9fa48("19831"), {
      ...original,
      ...patch
    }))));
    for (const input of stryMutAct_9fa48("19832") ? [] : (stryCov_9fa48("19832"), [stryMutAct_9fa48("19833") ? "" : (stryCov_9fa48("19833"), 'bad!'), (stryMutAct_9fa48("19834") ? "" : (stryCov_9fa48("19834"), 'a')).repeat(4001), stryMutAct_9fa48("19835") ? "" : (stryCov_9fa48("19835"), 'bnVsbA'), stryMutAct_9fa48("19836") ? "" : (stryCov_9fa48("19836"), 'e30')])) assert.throws(stryMutAct_9fa48("19838") ? () => undefined : (stryCov_9fa48("19838"), () => decodeDeck(input)));
    assert.equal(parseDeck(stryMutAct_9fa48("19840") ? {} : (stryCov_9fa48("19840"), {
      ...original,
      name: stryMutAct_9fa48("19841") ? "" : (stryCov_9fa48("19841"), '  ')
    })).name, original.name);
  }
});
test(stryMutAct_9fa48("19843") ? "" : (stryCov_9fa48("19843"), 'exported control-deck models retain their distinct visible key counts and real assembly groups'), () => {
  if (stryMutAct_9fa48("19844")) {
    {}
  } else {
    stryCov_9fa48("19844");
    for (const [device, count, extra] of stryMutAct_9fa48("19845") ? [] : (stryCov_9fa48("19845"), [stryMutAct_9fa48("19846") ? [] : (stryCov_9fa48("19846"), [stryMutAct_9fa48("19847") ? "" : (stryCov_9fa48("19847"), 'grok-bot'), 11, stryMutAct_9fa48("19848") ? "" : (stryCov_9fa48("19848"), 'screen')]), stryMutAct_9fa48("19849") ? [] : (stryCov_9fa48("19849"), [stryMutAct_9fa48("19850") ? "" : (stryCov_9fa48("19850"), 'codex-micro'), 12, stryMutAct_9fa48("19851") ? "" : (stryCov_9fa48("19851"), 'control_joystick')])])) {
      if (stryMutAct_9fa48("19852")) {
        {}
      } else {
        stryCov_9fa48("19852");
        const data = readFileSync(new URL(stryMutAct_9fa48("19853") ? `` : (stryCov_9fa48("19853"), `../public/models/${device}.glb`), import.meta.url));
        assert.equal(data.toString(stryMutAct_9fa48("19855") ? "" : (stryCov_9fa48("19855"), 'ascii'), 0, 4), stryMutAct_9fa48("19856") ? "" : (stryCov_9fa48("19856"), 'glTF'));
        const model = JSON.parse(data.subarray(20, stryMutAct_9fa48("19857") ? 20 - data.readUInt32LE(12) : (stryCov_9fa48("19857"), 20 + data.readUInt32LE(12))).toString());
        const nodes = model.nodes;
        const names = nodes.map(stryMutAct_9fa48("19858") ? () => undefined : (stryCov_9fa48("19858"), node => node.name));
        assert.equal(stryMutAct_9fa48("19860") ? names.length : (stryCov_9fa48("19860"), names.filter(stryMutAct_9fa48("19861") ? () => undefined : (stryCov_9fa48("19861"), name => stryMutAct_9fa48("19863") ? name.startsWith('key_') : stryMutAct_9fa48("19862") ? name?.endsWith('key_') : (stryCov_9fa48("19862", "19863"), name?.startsWith(stryMutAct_9fa48("19864") ? "" : (stryCov_9fa48("19864"), 'key_'))))).length), count);
        assert.equal(new Set(stryMutAct_9fa48("19866") ? names : (stryCov_9fa48("19866"), names.filter(stryMutAct_9fa48("19867") ? () => undefined : (stryCov_9fa48("19867"), name => stryMutAct_9fa48("19869") ? name.startsWith('key_') : stryMutAct_9fa48("19868") ? name?.endsWith('key_') : (stryCov_9fa48("19868", "19869"), name?.startsWith(stryMutAct_9fa48("19870") ? "" : (stryCov_9fa48("19870"), 'key_'))))))).size, count);
        for (const name of stryMutAct_9fa48("19871") ? [] : (stryCov_9fa48("19871"), [stryMutAct_9fa48("19872") ? "" : (stryCov_9fa48("19872"), 'plate'), stryMutAct_9fa48("19873") ? "" : (stryCov_9fa48("19873"), 'pcb'), stryMutAct_9fa48("19874") ? "" : (stryCov_9fa48("19874"), 'switches'), stryMutAct_9fa48("19875") ? "" : (stryCov_9fa48("19875"), 'control_dial'), extra])) assert.ok(names.includes(name), stryMutAct_9fa48("19877") ? `` : (stryCov_9fa48("19877"), `${device}: ${name}`));
        assert.ok(stryMutAct_9fa48("19882") ? model.meshes.length >= 60 : stryMutAct_9fa48("19881") ? model.meshes.length <= 60 : stryMutAct_9fa48("19880") ? false : stryMutAct_9fa48("19879") ? true : (stryCov_9fa48("19879", "19880", "19881", "19882"), model.meshes.length < 60), stryMutAct_9fa48("19883") ? "" : (stryCov_9fa48("19883"), 'static details are batched to bound draw calls'));
      }
    }
  }
});
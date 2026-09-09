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
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { adaptQ1MaxModel } from '../lib/q1-model.ts';
const layout = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("21929") ? "" : (stryCov_9fa48("21929"), '../docs/reference-assets/keychron-q1-max-layout.json'), import.meta.url)));
test(stryMutAct_9fa48("21931") ? "" : (stryCov_9fa48("21931"), 'real generic GLB adapts to all Q1 cap positions with a separate measured knob'), async () => {
  if (stryMutAct_9fa48("21932")) {
    {}
  } else {
    stryCov_9fa48("21932");
    const bytes = readFileSync(new URL(stryMutAct_9fa48("21933") ? "" : (stryCov_9fa48("21933"), '../public/models/keyboard-75.glb'), import.meta.url));
    const {
      scene
    } = await new GLTFLoader().parseAsync(stryMutAct_9fa48("21934") ? bytes.buffer : (stryCov_9fa48("21934"), bytes.buffer.slice(bytes.byteOffset, stryMutAct_9fa48("21935") ? bytes.byteOffset - bytes.byteLength : (stryCov_9fa48("21935"), bytes.byteOffset + bytes.byteLength))), stryMutAct_9fa48("21936") ? "Stryker was here!" : (stryCov_9fa48("21936"), ''));
    if (stryMutAct_9fa48("21937")) {
      ;
    } else {
      stryCov_9fa48("21937");
      adaptQ1MaxModel(scene);
    }
    assert.equal(stryMutAct_9fa48("21939") ? scene.children.length : (stryCov_9fa48("21939"), scene.children.filter(stryMutAct_9fa48("21940") ? () => undefined : (stryCov_9fa48("21940"), child => stryMutAct_9fa48("21941") ? child.name.endsWith('key_') : (stryCov_9fa48("21941"), child.name.startsWith(stryMutAct_9fa48("21942") ? "" : (stryCov_9fa48("21942"), 'key_'))))).length), 81);
    for (const key of layout.keys) {
      if (stryMutAct_9fa48("21943")) {
        {}
      } else {
        stryCov_9fa48("21943");
        const mesh = scene.getObjectByName(stryMutAct_9fa48("21944") ? `` : (stryCov_9fa48("21944"), `key_${key.code}`));
        if (stryMutAct_9fa48("21945")) {
          ;
        } else {
          stryCov_9fa48("21945");
          assert.ok(mesh, key.code);
        }
        if (stryMutAct_9fa48("21946")) {
          ;
        } else {
          stryCov_9fa48("21946");
          assert.equal(mesh.position.x, key.x);
        }
        assert.equal(mesh.position.z, stryMutAct_9fa48("21948") ? +key.y : (stryCov_9fa48("21948"), -key.y));
        assert.ok(stryMutAct_9fa48("21950") ? mesh.children.every(child => child.name.startsWith('cap')) : (stryCov_9fa48("21950"), mesh.children.some(stryMutAct_9fa48("21951") ? () => undefined : (stryCov_9fa48("21951"), child => stryMutAct_9fa48("21952") ? child.name.endsWith('cap') : (stryCov_9fa48("21952"), child.name.startsWith(stryMutAct_9fa48("21953") ? "" : (stryCov_9fa48("21953"), 'cap')))))));
      }
    }
    const knob = scene.getObjectByName(stryMutAct_9fa48("21954") ? "" : (stryCov_9fa48("21954"), 'control_dial'));
    assert.equal(stryMutAct_9fa48("21956") ? knob.geometry.parameters.radiusTop * 2 / 19.05 : (stryCov_9fa48("21956"), (stryMutAct_9fa48("21957") ? knob.geometry.parameters.radiusTop / 2 : (stryCov_9fa48("21957"), knob.geometry.parameters.radiusTop * 2)) * 19.05), 16);
    assert.equal(stryMutAct_9fa48("21959") ? knob.geometry.parameters.height / 19.05 : (stryCov_9fa48("21959"), knob.geometry.parameters.height * 19.05), 14);
    if (stryMutAct_9fa48("21960")) {
      ;
    } else {
      stryCov_9fa48("21960");
      assert.equal(knob.position.x, layout.stockEncoder.x);
    }
    assert.equal(scene.getObjectByName(stryMutAct_9fa48("21962") ? "" : (stryCov_9fa48("21962"), 'key_End')), undefined);
  }
});
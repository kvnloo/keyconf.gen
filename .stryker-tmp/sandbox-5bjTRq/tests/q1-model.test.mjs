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
const layout = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("21860") ? "" : (stryCov_9fa48("21860"), '../docs/reference-assets/keychron-q1-max-layout.json'), import.meta.url)));
test(stryMutAct_9fa48("21862") ? "" : (stryCov_9fa48("21862"), 'real generic GLB adapts to all Q1 cap positions with a separate measured knob'), async () => {
  if (stryMutAct_9fa48("21863")) {
    {}
  } else {
    stryCov_9fa48("21863");
    const bytes = readFileSync(new URL(stryMutAct_9fa48("21864") ? "" : (stryCov_9fa48("21864"), '../public/models/keyboard-75.glb'), import.meta.url));
    const {
      scene
    } = await new GLTFLoader().parseAsync(stryMutAct_9fa48("21865") ? bytes.buffer : (stryCov_9fa48("21865"), bytes.buffer.slice(bytes.byteOffset, stryMutAct_9fa48("21866") ? bytes.byteOffset - bytes.byteLength : (stryCov_9fa48("21866"), bytes.byteOffset + bytes.byteLength))), stryMutAct_9fa48("21867") ? "Stryker was here!" : (stryCov_9fa48("21867"), ''));
    if (stryMutAct_9fa48("21868")) {
      ;
    } else {
      stryCov_9fa48("21868");
      adaptQ1MaxModel(scene);
    }
    assert.equal(stryMutAct_9fa48("21870") ? scene.children.length : (stryCov_9fa48("21870"), scene.children.filter(stryMutAct_9fa48("21871") ? () => undefined : (stryCov_9fa48("21871"), child => stryMutAct_9fa48("21872") ? child.name.endsWith('key_') : (stryCov_9fa48("21872"), child.name.startsWith(stryMutAct_9fa48("21873") ? "" : (stryCov_9fa48("21873"), 'key_'))))).length), 81);
    for (const key of layout.keys) {
      if (stryMutAct_9fa48("21874")) {
        {}
      } else {
        stryCov_9fa48("21874");
        const mesh = scene.getObjectByName(stryMutAct_9fa48("21875") ? `` : (stryCov_9fa48("21875"), `key_${key.code}`));
        if (stryMutAct_9fa48("21876")) {
          ;
        } else {
          stryCov_9fa48("21876");
          assert.ok(mesh, key.code);
        }
        if (stryMutAct_9fa48("21877")) {
          ;
        } else {
          stryCov_9fa48("21877");
          assert.equal(mesh.position.x, key.x);
        }
        assert.equal(mesh.position.z, stryMutAct_9fa48("21879") ? +key.y : (stryCov_9fa48("21879"), -key.y));
        assert.ok(stryMutAct_9fa48("21881") ? mesh.children.every(child => child.name.startsWith('cap')) : (stryCov_9fa48("21881"), mesh.children.some(stryMutAct_9fa48("21882") ? () => undefined : (stryCov_9fa48("21882"), child => stryMutAct_9fa48("21883") ? child.name.endsWith('cap') : (stryCov_9fa48("21883"), child.name.startsWith(stryMutAct_9fa48("21884") ? "" : (stryCov_9fa48("21884"), 'cap')))))));
      }
    }
    const knob = scene.getObjectByName(stryMutAct_9fa48("21885") ? "" : (stryCov_9fa48("21885"), 'control_dial'));
    assert.equal(stryMutAct_9fa48("21887") ? knob.geometry.parameters.radiusTop * 2 / 19.05 : (stryCov_9fa48("21887"), (stryMutAct_9fa48("21888") ? knob.geometry.parameters.radiusTop / 2 : (stryCov_9fa48("21888"), knob.geometry.parameters.radiusTop * 2)) * 19.05), 16);
    assert.equal(stryMutAct_9fa48("21890") ? knob.geometry.parameters.height / 19.05 : (stryCov_9fa48("21890"), knob.geometry.parameters.height * 19.05), 14);
    if (stryMutAct_9fa48("21891")) {
      ;
    } else {
      stryCov_9fa48("21891");
      assert.equal(knob.position.x, layout.stockEncoder.x);
    }
    assert.equal(scene.getObjectByName(stryMutAct_9fa48("21893") ? "" : (stryCov_9fa48("21893"), 'key_End')), undefined);
  }
});
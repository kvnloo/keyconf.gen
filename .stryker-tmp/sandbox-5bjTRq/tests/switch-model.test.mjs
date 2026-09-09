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
import * as THREE from 'three';
import { createSwitchAssembly } from '../lib/switch-model.ts';
for (const layout of stryMutAct_9fa48("22244") ? [] : (stryCov_9fa48("22244"), [60, 65, 75])) {
  if (stryMutAct_9fa48("22245")) {
    {}
  } else {
    stryCov_9fa48("22245");
    test(stryMutAct_9fa48("22247") ? `` : (stryCov_9fa48("22247"), `switch instances follow every ${layout}% key center`), () => {
      if (stryMutAct_9fa48("22248")) {
        {}
      } else {
        stryCov_9fa48("22248");
        const bytes = readFileSync(new URL(stryMutAct_9fa48("22249") ? `` : (stryCov_9fa48("22249"), `../public/models/keyboard-${layout}.glb`), import.meta.url));
        const document = JSON.parse(bytes.subarray(20, stryMutAct_9fa48("22250") ? 20 - bytes.readUInt32LE(12) : (stryCov_9fa48("22250"), 20 + bytes.readUInt32LE(12))));
        const keys = stryMutAct_9fa48("22251") ? document.nodes : (stryCov_9fa48("22251"), document.nodes.filter(stryMutAct_9fa48("22252") ? () => undefined : (stryCov_9fa48("22252"), node => stryMutAct_9fa48("22254") ? node.name.startsWith('key_') : stryMutAct_9fa48("22253") ? node.name?.endsWith('key_') : (stryCov_9fa48("22253", "22254"), node.name?.startsWith(stryMutAct_9fa48("22255") ? "" : (stryCov_9fa48("22255"), 'key_'))))));
        const positions = keys.map(stryMutAct_9fa48("22256") ? () => undefined : (stryCov_9fa48("22256"), key => new THREE.Vector3(key.translation[0], 0.3, key.translation[2])));
        const model = createSwitchAssembly(positions, stryMutAct_9fa48("22257") ? "" : (stryCov_9fa48("22257"), 'oil-king'));
        assert.equal(model.group.name, stryMutAct_9fa48("22259") ? "" : (stryCov_9fa48("22259"), 'switches'));
        assert.equal(model.group.children.length, 4, stryMutAct_9fa48("22261") ? "" : (stryCov_9fa48("22261"), 'switch count must not multiply draw calls'));
        const matrix = new THREE.Matrix4();
        for (const mesh of model.group.children) {
          if (stryMutAct_9fa48("22262")) {
            {}
          } else {
            stryCov_9fa48("22262");
            if (stryMutAct_9fa48("22263")) {
              ;
            } else {
              stryCov_9fa48("22263");
              assert.ok(mesh instanceof THREE.InstancedMesh);
            }
            if (stryMutAct_9fa48("22264")) {
              ;
            } else {
              stryCov_9fa48("22264");
              assert.equal(mesh.count, keys.length);
            }
            if (stryMutAct_9fa48("22265")) {
              ;
            } else {
              stryCov_9fa48("22265");
              mesh.computeBoundingBox();
            }
            assert.ok(stryMutAct_9fa48("22269") ? mesh.boundingBox || !mesh.boundingBox.isEmpty() : stryMutAct_9fa48("22268") ? false : stryMutAct_9fa48("22267") ? true : (stryCov_9fa48("22267", "22268", "22269"), mesh.boundingBox && (stryMutAct_9fa48("22270") ? mesh.boundingBox.isEmpty() : (stryCov_9fa48("22270"), !mesh.boundingBox.isEmpty()))));
            keys.forEach((key, index) => {
              if (stryMutAct_9fa48("22272")) {
                {}
              } else {
                stryCov_9fa48("22272");
                if (stryMutAct_9fa48("22273")) {
                  ;
                } else {
                  stryCov_9fa48("22273");
                  mesh.getMatrixAt(index, matrix);
                }
                if (stryMutAct_9fa48("22274")) {
                  ;
                } else {
                  stryCov_9fa48("22274");
                  assert.equal(matrix.elements[12], key.translation[0]);
                }
                if (stryMutAct_9fa48("22275")) {
                  ;
                } else {
                  stryCov_9fa48("22275");
                  assert.equal(matrix.elements[14], key.translation[2]);
                }
              }
            });
          }
        }
        if (stryMutAct_9fa48("22276")) {
          ;
        } else {
          stryCov_9fa48("22276");
          model.separate(0.5);
        }
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22278") ? "" : (stryCov_9fa48("22278"), 'switch_cross_stems')).position.y, 0.575);
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22280") ? "" : (stryCov_9fa48("22280"), 'switch_top_housings')).position.y, 0.325);
        if (stryMutAct_9fa48("22281")) {
          ;
        } else {
          stryCov_9fa48("22281");
          model.separate(1);
        }
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22283") ? "" : (stryCov_9fa48("22283"), 'switch_cross_stems')).position.y, 1.15);
        if (stryMutAct_9fa48("22284")) {
          ;
        } else {
          stryCov_9fa48("22284");
          model.separate(0);
        }
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22286") ? "" : (stryCov_9fa48("22286"), 'switch_cross_stems')).position.y, 0);
        const stems = model.group.getObjectByName(stryMutAct_9fa48("22287") ? "" : (stryCov_9fa48("22287"), 'switch_cross_stems'));
        const oil = stems.material.color.getHexString();
        model.setColor(stryMutAct_9fa48("22289") ? "" : (stryCov_9fa48("22289"), 'g-pro-3-yellow'));
        if (stryMutAct_9fa48("22290")) {
          ;
        } else {
          stryCov_9fa48("22290");
          assert.notEqual(stems.material.color.getHexString(), oil);
        }
        if (stryMutAct_9fa48("22291")) {
          ;
        } else {
          stryCov_9fa48("22291");
          model.dispose();
        }
      }
    });
  }
}
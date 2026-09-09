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
for (const layout of stryMutAct_9fa48("22313") ? [] : (stryCov_9fa48("22313"), [60, 65, 75])) {
  if (stryMutAct_9fa48("22314")) {
    {}
  } else {
    stryCov_9fa48("22314");
    test(stryMutAct_9fa48("22316") ? `` : (stryCov_9fa48("22316"), `switch instances follow every ${layout}% key center`), () => {
      if (stryMutAct_9fa48("22317")) {
        {}
      } else {
        stryCov_9fa48("22317");
        const bytes = readFileSync(new URL(stryMutAct_9fa48("22318") ? `` : (stryCov_9fa48("22318"), `../public/models/keyboard-${layout}.glb`), import.meta.url));
        const document = JSON.parse(bytes.subarray(20, stryMutAct_9fa48("22319") ? 20 - bytes.readUInt32LE(12) : (stryCov_9fa48("22319"), 20 + bytes.readUInt32LE(12))));
        const keys = stryMutAct_9fa48("22320") ? document.nodes : (stryCov_9fa48("22320"), document.nodes.filter(stryMutAct_9fa48("22321") ? () => undefined : (stryCov_9fa48("22321"), node => stryMutAct_9fa48("22323") ? node.name.startsWith('key_') : stryMutAct_9fa48("22322") ? node.name?.endsWith('key_') : (stryCov_9fa48("22322", "22323"), node.name?.startsWith(stryMutAct_9fa48("22324") ? "" : (stryCov_9fa48("22324"), 'key_'))))));
        const positions = keys.map(stryMutAct_9fa48("22325") ? () => undefined : (stryCov_9fa48("22325"), key => new THREE.Vector3(key.translation[0], 0.3, key.translation[2])));
        const model = createSwitchAssembly(positions, stryMutAct_9fa48("22326") ? "" : (stryCov_9fa48("22326"), 'oil-king'));
        assert.equal(model.group.name, stryMutAct_9fa48("22328") ? "" : (stryCov_9fa48("22328"), 'switches'));
        assert.equal(model.group.children.length, 4, stryMutAct_9fa48("22330") ? "" : (stryCov_9fa48("22330"), 'switch count must not multiply draw calls'));
        const matrix = new THREE.Matrix4();
        for (const mesh of model.group.children) {
          if (stryMutAct_9fa48("22331")) {
            {}
          } else {
            stryCov_9fa48("22331");
            if (stryMutAct_9fa48("22332")) {
              ;
            } else {
              stryCov_9fa48("22332");
              assert.ok(mesh instanceof THREE.InstancedMesh);
            }
            if (stryMutAct_9fa48("22333")) {
              ;
            } else {
              stryCov_9fa48("22333");
              assert.equal(mesh.count, keys.length);
            }
            if (stryMutAct_9fa48("22334")) {
              ;
            } else {
              stryCov_9fa48("22334");
              mesh.computeBoundingBox();
            }
            assert.ok(stryMutAct_9fa48("22338") ? mesh.boundingBox || !mesh.boundingBox.isEmpty() : stryMutAct_9fa48("22337") ? false : stryMutAct_9fa48("22336") ? true : (stryCov_9fa48("22336", "22337", "22338"), mesh.boundingBox && (stryMutAct_9fa48("22339") ? mesh.boundingBox.isEmpty() : (stryCov_9fa48("22339"), !mesh.boundingBox.isEmpty()))));
            keys.forEach((key, index) => {
              if (stryMutAct_9fa48("22341")) {
                {}
              } else {
                stryCov_9fa48("22341");
                if (stryMutAct_9fa48("22342")) {
                  ;
                } else {
                  stryCov_9fa48("22342");
                  mesh.getMatrixAt(index, matrix);
                }
                if (stryMutAct_9fa48("22343")) {
                  ;
                } else {
                  stryCov_9fa48("22343");
                  assert.equal(matrix.elements[12], key.translation[0]);
                }
                if (stryMutAct_9fa48("22344")) {
                  ;
                } else {
                  stryCov_9fa48("22344");
                  assert.equal(matrix.elements[14], key.translation[2]);
                }
              }
            });
          }
        }
        if (stryMutAct_9fa48("22345")) {
          ;
        } else {
          stryCov_9fa48("22345");
          model.separate(0.5);
        }
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22347") ? "" : (stryCov_9fa48("22347"), 'switch_cross_stems')).position.y, 0.575);
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22349") ? "" : (stryCov_9fa48("22349"), 'switch_top_housings')).position.y, 0.325);
        if (stryMutAct_9fa48("22350")) {
          ;
        } else {
          stryCov_9fa48("22350");
          model.separate(1);
        }
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22352") ? "" : (stryCov_9fa48("22352"), 'switch_cross_stems')).position.y, 1.15);
        if (stryMutAct_9fa48("22353")) {
          ;
        } else {
          stryCov_9fa48("22353");
          model.separate(0);
        }
        assert.equal(model.group.getObjectByName(stryMutAct_9fa48("22355") ? "" : (stryCov_9fa48("22355"), 'switch_cross_stems')).position.y, 0);
        const stems = model.group.getObjectByName(stryMutAct_9fa48("22356") ? "" : (stryCov_9fa48("22356"), 'switch_cross_stems'));
        const oil = stems.material.color.getHexString();
        model.setColor(stryMutAct_9fa48("22358") ? "" : (stryCov_9fa48("22358"), 'g-pro-3-yellow'));
        if (stryMutAct_9fa48("22359")) {
          ;
        } else {
          stryCov_9fa48("22359");
          assert.notEqual(stems.material.color.getHexString(), oil);
        }
        if (stryMutAct_9fa48("22360")) {
          ;
        } else {
          stryCov_9fa48("22360");
          model.dispose();
        }
      }
    });
  }
}
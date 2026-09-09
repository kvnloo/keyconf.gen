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
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
export function switchColors(id: string) {
  if (stryMutAct_9fa48("14257")) {
    {}
  } else {
    stryCov_9fa48("14257");
    const stems: Record<string, string> = stryMutAct_9fa48("14258") ? {} : (stryCov_9fa48("14258"), {
      'oil-king': stryMutAct_9fa48("14259") ? "" : (stryCov_9fa48("14259"), '#252927'),
      'g-pro-3-white': stryMutAct_9fa48("14260") ? "" : (stryCov_9fa48("14260"), '#f3f0df'),
      'g-pro-3-silver': stryMutAct_9fa48("14261") ? "" : (stryCov_9fa48("14261"), '#9babb2'),
      'g-pro-3-red': stryMutAct_9fa48("14262") ? "" : (stryCov_9fa48("14262"), '#d95048'),
      'g-pro-3-yellow': stryMutAct_9fa48("14263") ? "" : (stryCov_9fa48("14263"), '#e6bd35'),
      'g-pro-3-black': stryMutAct_9fa48("14264") ? "" : (stryCov_9fa48("14264"), '#343c40'),
      'g-pro-3-brown': stryMutAct_9fa48("14265") ? "" : (stryCov_9fa48("14265"), '#986440'),
      'g-pro-3-blue': stryMutAct_9fa48("14266") ? "" : (stryCov_9fa48("14266"), '#477cba')
    });
    return stryMutAct_9fa48("14267") ? {} : (stryCov_9fa48("14267"), {
      housing: (stryMutAct_9fa48("14270") ? id !== 'oil-king' : stryMutAct_9fa48("14269") ? false : stryMutAct_9fa48("14268") ? true : (stryCov_9fa48("14268", "14269", "14270"), id === (stryMutAct_9fa48("14271") ? "" : (stryCov_9fa48("14271"), 'oil-king')))) ? stryMutAct_9fa48("14272") ? "" : (stryCov_9fa48("14272"), '#3a4240') : stryMutAct_9fa48("14273") ? "" : (stryCov_9fa48("14273"), '#a9b7aa'),
      stem: stryMutAct_9fa48("14274") ? stems[id] && '#92aa74' : (stryCov_9fa48("14274"), stems[id] ?? (stryMutAct_9fa48("14275") ? "" : (stryCov_9fa48("14275"), '#92aa74')))
    });
  }
}
function boxes(items: number[][]) {
  if (stryMutAct_9fa48("14276")) {
    {}
  } else {
    stryCov_9fa48("14276");
    const geometries = items.map(([x, y, z, width, height, depth]) => {
      if (stryMutAct_9fa48("14277")) {
        {}
      } else {
        stryCov_9fa48("14277");
        const geometry = new RoundedBoxGeometry(width, height, depth, 2, 0.015);
        if (stryMutAct_9fa48("14278")) {
          ;
        } else {
          stryCov_9fa48("14278");
          geometry.translate(x, y, z);
        }
        return geometry;
      }
    });
    const merged = mergeGeometries(geometries);
    geometries.forEach(stryMutAct_9fa48("14280") ? () => undefined : (stryCov_9fa48("14280"), geometry => geometry.dispose()));
    return merged;
  }
}

// Original MX-style visual study. One instance per key, with shared geometry.
export function createSwitchAssembly(positions: THREE.Vector3[], id: string) {
  if (stryMutAct_9fa48("14281")) {
    {}
  } else {
    stryCov_9fa48("14281");
    const group = new THREE.Group();
    group.name = stryMutAct_9fa48("14282") ? "" : (stryCov_9fa48("14282"), 'switches');
    const colors = switchColors(id);
    const housing = new THREE.MeshStandardMaterial(stryMutAct_9fa48("14283") ? {} : (stryCov_9fa48("14283"), {
      name: stryMutAct_9fa48("14284") ? "" : (stryCov_9fa48("14284"), 'switch_housing'),
      color: colors.housing,
      roughness: 0.3
    }));
    const stem = new THREE.MeshStandardMaterial(stryMutAct_9fa48("14285") ? {} : (stryCov_9fa48("14285"), {
      name: stryMutAct_9fa48("14286") ? "" : (stryCov_9fa48("14286"), 'switch_stem'),
      color: colors.stem,
      roughness: 0.25
    }));
    const metal = new THREE.MeshStandardMaterial(stryMutAct_9fa48("14287") ? {} : (stryCov_9fa48("14287"), {
      name: stryMutAct_9fa48("14288") ? "" : (stryCov_9fa48("14288"), 'switch_contacts'),
      color: stryMutAct_9fa48("14289") ? "" : (stryCov_9fa48("14289"), '#cdb17e'),
      metalness: 0.75,
      roughness: 0.3
    }));
    const baseGeometry = boxes(stryMutAct_9fa48("14290") ? [] : (stryCov_9fa48("14290"), [stryMutAct_9fa48("14291") ? [] : (stryCov_9fa48("14291"), [0, 0.08, 0, 0.66, 0.16, 0.66]), stryMutAct_9fa48("14292") ? [] : (stryCov_9fa48("14292"), [0, 0.17, 0, 0.74, 0.06, 0.74]), stryMutAct_9fa48("14293") ? [] : (stryCov_9fa48("14293"), [stryMutAct_9fa48("14294") ? +0.32 : (stryCov_9fa48("14294"), -0.32), 0.24, 0, 0.06, 0.14, 0.22]), stryMutAct_9fa48("14295") ? [] : (stryCov_9fa48("14295"), [0.32, 0.24, 0, 0.06, 0.14, 0.22]), stryMutAct_9fa48("14296") ? [] : (stryCov_9fa48("14296"), [0, stryMutAct_9fa48("14297") ? +0.045 : (stryCov_9fa48("14297"), -0.045), 0, 0.14, 0.12, 0.14])]));
    const topGeometry = boxes(stryMutAct_9fa48("14298") ? [] : (stryCov_9fa48("14298"), [stryMutAct_9fa48("14299") ? [] : (stryCov_9fa48("14299"), [stryMutAct_9fa48("14300") ? +0.255 : (stryCov_9fa48("14300"), -0.255), 0.31, 0, 0.13, 0.22, 0.59]), stryMutAct_9fa48("14301") ? [] : (stryCov_9fa48("14301"), [0.255, 0.31, 0, 0.13, 0.22, 0.59]), stryMutAct_9fa48("14302") ? [] : (stryCov_9fa48("14302"), [0, 0.31, stryMutAct_9fa48("14303") ? +0.255 : (stryCov_9fa48("14303"), -0.255), 0.39, 0.22, 0.13]), stryMutAct_9fa48("14304") ? [] : (stryCov_9fa48("14304"), [0, 0.31, 0.255, 0.39, 0.22, 0.13])]));
    const stemGeometry = boxes(stryMutAct_9fa48("14305") ? [] : (stryCov_9fa48("14305"), [stryMutAct_9fa48("14306") ? [] : (stryCov_9fa48("14306"), [0, 0.35, 0, 0.29, 0.1, 0.29]), stryMutAct_9fa48("14307") ? [] : (stryCov_9fa48("14307"), [0, 0.47, 0, 0.09, 0.2, 0.3]), stryMutAct_9fa48("14308") ? [] : (stryCov_9fa48("14308"), [0, 0.47, 0, 0.3, 0.2, 0.09])]));
    const pinGeometry = boxes(stryMutAct_9fa48("14309") ? [] : (stryCov_9fa48("14309"), [stryMutAct_9fa48("14310") ? [] : (stryCov_9fa48("14310"), [stryMutAct_9fa48("14311") ? +0.17 : (stryCov_9fa48("14311"), -0.17), stryMutAct_9fa48("14312") ? +0.055 : (stryCov_9fa48("14312"), -0.055), stryMutAct_9fa48("14313") ? +0.18 : (stryCov_9fa48("14313"), -0.18), 0.035, 0.18, 0.055]), stryMutAct_9fa48("14314") ? [] : (stryCov_9fa48("14314"), [0.18, stryMutAct_9fa48("14315") ? +0.055 : (stryCov_9fa48("14315"), -0.055), 0.1, 0.035, 0.18, 0.055])]));
    const matrix = new THREE.Matrix4();
    function instances(name: string, geometry: THREE.BufferGeometry, material: THREE.Material) {
      if (stryMutAct_9fa48("14316")) {
        {}
      } else {
        stryCov_9fa48("14316");
        const mesh = new THREE.InstancedMesh(geometry, material, positions.length);
        mesh.name = name;
        positions.forEach(stryMutAct_9fa48("14318") ? () => undefined : (stryCov_9fa48("14318"), (position, index) => mesh.setMatrixAt(index, matrix.makeTranslation(position.x, position.y, position.z))));
        mesh.castShadow = stryMutAct_9fa48("14319") ? false : (stryCov_9fa48("14319"), true);
        mesh.receiveShadow = stryMutAct_9fa48("14320") ? false : (stryCov_9fa48("14320"), true);
        if (stryMutAct_9fa48("14321")) {
          ;
        } else {
          stryCov_9fa48("14321");
          group.add(mesh);
        }
        return mesh;
      }
    }
    instances(stryMutAct_9fa48("14323") ? "" : (stryCov_9fa48("14323"), 'switch_bases'), baseGeometry, housing);
    const tops = instances(stryMutAct_9fa48("14324") ? "" : (stryCov_9fa48("14324"), 'switch_top_housings'), topGeometry, housing);
    const stems = instances(stryMutAct_9fa48("14325") ? "" : (stryCov_9fa48("14325"), 'switch_cross_stems'), stemGeometry, stem);
    instances(stryMutAct_9fa48("14327") ? "" : (stryCov_9fa48("14327"), 'switch_contact_pins'), pinGeometry, metal);
    return stryMutAct_9fa48("14328") ? {} : (stryCov_9fa48("14328"), {
      group,
      setColor(nextId: string) {
        if (stryMutAct_9fa48("14329")) {
          {}
        } else {
          stryCov_9fa48("14329");
          const next = switchColors(nextId);
          if (stryMutAct_9fa48("14330")) {
            ;
          } else {
            stryCov_9fa48("14330");
            housing.color.set(next.housing);
          }
          if (stryMutAct_9fa48("14331")) {
            ;
          } else {
            stryCov_9fa48("14331");
            stem.color.set(next.stem);
          }
        }
      },
      separate(progress: number) {
        if (stryMutAct_9fa48("14332")) {
          {}
        } else {
          stryCov_9fa48("14332");
          tops.position.y = stryMutAct_9fa48("14333") ? progress / 0.65 : (stryCov_9fa48("14333"), progress * 0.65);
          stems.position.y = stryMutAct_9fa48("14334") ? progress / 1.15 : (stryCov_9fa48("14334"), progress * 1.15);
        }
      },
      dispose() {
        if (stryMutAct_9fa48("14335")) {
          {}
        } else {
          stryCov_9fa48("14335");
          for (const geometry of stryMutAct_9fa48("14336") ? [] : (stryCov_9fa48("14336"), [baseGeometry, topGeometry, stemGeometry, pinGeometry])) if (stryMutAct_9fa48("14337")) {
            ;
          } else {
            stryCov_9fa48("14337");
            geometry.dispose();
          }
          for (const material of stryMutAct_9fa48("14338") ? [] : (stryCov_9fa48("14338"), [housing, stem, metal])) if (stryMutAct_9fa48("14339")) {
            ;
          } else {
            stryCov_9fa48("14339");
            material.dispose();
          }
        }
      }
    });
  }
}
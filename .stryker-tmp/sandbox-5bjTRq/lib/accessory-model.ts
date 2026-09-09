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
import { MAX_UNMOUNTED_PREVIEWS, type AccessorySelection } from './build-accessories.ts';
import { resolveAccessoryProducts, type ImportedAccessory } from './imported-accessories.ts';
const MAX_DESK_PREVIEWS = 6;

// These original studies communicate placement, not manufacturer dimensions or fit.
export function createAccessoryPreview({
  selections,
  customAccessories,
  keys,
  bounds
}: {
  selections: readonly AccessorySelection[];
  customAccessories?: readonly ImportedAccessory[];
  keys: ReadonlyMap<string, THREE.Object3D>;
  bounds: THREE.Box3;
}) {
  if (stryMutAct_9fa48("5113")) {
    {}
  } else {
    stryCov_9fa48("5113");
    const products = resolveAccessoryProducts(customAccessories);
    const group = new THREE.Group();
    group.name = stryMutAct_9fa48("5114") ? "" : (stryCov_9fa48("5114"), 'accessory-previews');
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const instances: THREE.InstancedMesh[] = stryMutAct_9fa48("5115") ? ["Stryker was here"] : (stryCov_9fa48("5115"), []);
    const replacements: {
      group: THREE.Group;
      originals: {
        object: THREE.Object3D;
        visible: boolean;
      }[];
    }[] = stryMutAct_9fa48("5116") ? ["Stryker was here"] : (stryCov_9fa48("5116"), []);
    const counts = stryMutAct_9fa48("5117") ? {} : (stryCov_9fa48("5117"), {
      artisan: 0,
      external: 0,
      planned: 0,
      omitted: 0
    });
    let disposed = stryMutAct_9fa48("5118") ? true : (stryCov_9fa48("5118"), false);
    function material(color: string, roughness = 0.4, metalness = 0) {
      if (stryMutAct_9fa48("5119")) {
        {}
      } else {
        stryCov_9fa48("5119");
        const value = new THREE.MeshStandardMaterial(stryMutAct_9fa48("5120") ? {} : (stryCov_9fa48("5120"), {
          color,
          roughness,
          metalness
        }));
        if (stryMutAct_9fa48("5121")) {
          ;
        } else {
          stryCov_9fa48("5121");
          materials.add(value);
        }
        return value;
      }
    }
    function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, surface: THREE.Material, x = 0, y = 0, z = 0) {
      if (stryMutAct_9fa48("5122")) {
        {}
      } else {
        stryCov_9fa48("5122");
        if (stryMutAct_9fa48("5123")) {
          ;
        } else {
          stryCov_9fa48("5123");
          geometries.add(geometry);
        }
        const value = new THREE.Mesh(geometry, surface);
        if (stryMutAct_9fa48("5124")) {
          ;
        } else {
          stryCov_9fa48("5124");
          value.position.set(x, y, z);
        }
        value.castShadow = value.receiveShadow = stryMutAct_9fa48("5125") ? false : (stryCov_9fa48("5125"), true);
        if (stryMutAct_9fa48("5126")) {
          ;
        } else {
          stryCov_9fa48("5126");
          parent.add(value);
        }
        return value;
      }
    }
    function box(width: number, height: number, depth: number, radius = 0.06) {
      if (stryMutAct_9fa48("5127")) {
        {}
      } else {
        stryCov_9fa48("5127");
        return new RoundedBoxGeometry(width, height, depth, 2, radius);
      }
    }
    function artisan(width: number) {
      if (stryMutAct_9fa48("5128")) {
        {}
      } else {
        stryCov_9fa48("5128");
        const cap = new THREE.Group();
        cap.name = stryMutAct_9fa48("5129") ? "" : (stryCov_9fa48("5129"), 'illustrative-artisan');
        const base = material(stryMutAct_9fa48("5130") ? "" : (stryCov_9fa48("5130"), '#155963'), 0.3);
        mesh(cap, box(stryMutAct_9fa48("5132") ? width + 0.08 : (stryCov_9fa48("5132"), width - 0.08), 0.12, 0.92), base, 0, 0.06);
        const resin = new THREE.MeshPhysicalMaterial(stryMutAct_9fa48("5133") ? {} : (stryCov_9fa48("5133"), {
          color: stryMutAct_9fa48("5134") ? "" : (stryCov_9fa48("5134"), '#82d9cf'),
          roughness: 0.13,
          metalness: 0,
          transparent: stryMutAct_9fa48("5135") ? false : (stryCov_9fa48("5135"), true),
          opacity: 0.42,
          depthWrite: stryMutAct_9fa48("5136") ? true : (stryCov_9fa48("5136"), false),
          clearcoat: 1,
          clearcoatRoughness: 0.12
        }));
        if (stryMutAct_9fa48("5137")) {
          ;
        } else {
          stryCov_9fa48("5137");
          materials.add(resin);
        }
        const shell = mesh(cap, box(stryMutAct_9fa48("5138") ? width + 0.12 : (stryCov_9fa48("5138"), width - 0.12), 0.44, 0.84, 0.1), resin, 0, 0.32);
        shell.name = stryMutAct_9fa48("5139") ? "" : (stryCov_9fa48("5139"), 'translucent-resin-shell');
        shell.castShadow = stryMutAct_9fa48("5140") ? true : (stryCov_9fa48("5140"), false);
        const stone = material(stryMutAct_9fa48("5141") ? "" : (stryCov_9fa48("5141"), '#efd7a8'), 0.65);
        const copper = material(stryMutAct_9fa48("5142") ? "" : (stryCov_9fa48("5142"), '#e4894e'), 0.34, 0.12);
        const moss = material(stryMutAct_9fa48("5143") ? "" : (stryCov_9fa48("5143"), '#417d65'), 0.6);
        const pebble = new THREE.SphereGeometry(1, 10, 6);
        const repeats = stryMutAct_9fa48("5144") ? Math.min(1, Math.floor(width)) : (stryCov_9fa48("5144"), Math.max(1, Math.floor(width)));
        for (let i = 0; stryMutAct_9fa48("5147") ? i >= repeats : stryMutAct_9fa48("5146") ? i <= repeats : stryMutAct_9fa48("5145") ? false : (stryCov_9fa48("5145", "5146", "5147"), i < repeats); stryMutAct_9fa48("5148") ? i-- : (stryCov_9fa48("5148"), i++)) {
          if (stryMutAct_9fa48("5149")) {
            {}
          } else {
            stryCov_9fa48("5149");
            const center = stryMutAct_9fa48("5150") ? ((i + 0.5) / repeats - 0.5) / (width - 0.3) : (stryCov_9fa48("5150"), (stryMutAct_9fa48("5151") ? (i + 0.5) / repeats + 0.5 : (stryCov_9fa48("5151"), (stryMutAct_9fa48("5152") ? (i + 0.5) * repeats : (stryCov_9fa48("5152"), (stryMutAct_9fa48("5153") ? i - 0.5 : (stryCov_9fa48("5153"), i + 0.5)) / repeats)) - 0.5)) * (stryMutAct_9fa48("5154") ? width + 0.3 : (stryCov_9fa48("5154"), width - 0.3)));
            const rock = mesh(cap, pebble, stone, stryMutAct_9fa48("5155") ? center + 0.13 : (stryCov_9fa48("5155"), center - 0.13), 0.2, 0.1);
            if (stryMutAct_9fa48("5156")) {
              ;
            } else {
              stryCov_9fa48("5156");
              rock.scale.set(0.15, 0.1, 0.11);
            }
            const leaf = mesh(cap, pebble, moss, stryMutAct_9fa48("5157") ? center - 0.14 : (stryCov_9fa48("5157"), center + 0.14), 0.2, stryMutAct_9fa48("5158") ? +0.13 : (stryCov_9fa48("5158"), -0.13));
            if (stryMutAct_9fa48("5159")) {
              ;
            } else {
              stryCov_9fa48("5159");
              leaf.scale.set(0.11, 0.06, 0.14);
            }
            const petal = mesh(cap, pebble, copper, stryMutAct_9fa48("5160") ? center - 0.04 : (stryCov_9fa48("5160"), center + 0.04), 0.32, 0.05);
            if (stryMutAct_9fa48("5161")) {
              ;
            } else {
              stryCov_9fa48("5161");
              petal.scale.set(0.13, 0.045, 0.07);
            }
            petal.rotation.y = stryMutAct_9fa48("5162") ? +0.6 : (stryCov_9fa48("5162"), -0.6);
          }
        }
        return cap;
      }
    }
    function macropad() {
      if (stryMutAct_9fa48("5163")) {
        {}
      } else {
        stryCov_9fa48("5163");
        const pad = new THREE.Group();
        pad.name = stryMutAct_9fa48("5164") ? "" : (stryCov_9fa48("5164"), 'illustrative-macropad');
        const dark = material(stryMutAct_9fa48("5165") ? "" : (stryCov_9fa48("5165"), '#303934'), 0.44, 0.4);
        const cream = material(stryMutAct_9fa48("5166") ? "" : (stryCov_9fa48("5166"), '#e6dbc0'));
        const orange = material(stryMutAct_9fa48("5167") ? "" : (stryCov_9fa48("5167"), '#cb7548'));
        const rim = material(stryMutAct_9fa48("5168") ? "" : (stryCov_9fa48("5168"), '#9ca995'), 0.34, 0.65);
        if (stryMutAct_9fa48("5169")) {
          ;
        } else {
          stryCov_9fa48("5169");
          mesh(pad, box(3.65, 0.35, 5.75, 0.14), dark, 0, 0.175);
        }
        if (stryMutAct_9fa48("5170")) {
          ;
        } else {
          stryCov_9fa48("5170");
          mesh(pad, box(3.45, 0.07, 5.55), rim, 0, 0.37);
        }
        const keyGeometry = box(0.86, 0.35, 0.86, 0.09);
        const keycaps = new THREE.InstancedMesh(keyGeometry, cream, 12);
        if (stryMutAct_9fa48("5171")) {
          ;
        } else {
          stryCov_9fa48("5171");
          instances.push(keycaps);
        }
        if (stryMutAct_9fa48("5172")) {
          ;
        } else {
          stryCov_9fa48("5172");
          geometries.add(keyGeometry);
        }
        const matrix = new THREE.Matrix4();
        for (let i = 0; stryMutAct_9fa48("5175") ? i >= 12 : stryMutAct_9fa48("5174") ? i <= 12 : stryMutAct_9fa48("5173") ? false : (stryCov_9fa48("5173", "5174", "5175"), i < 12); stryMutAct_9fa48("5176") ? i-- : (stryCov_9fa48("5176"), i++)) {
          if (stryMutAct_9fa48("5177")) {
            {}
          } else {
            stryCov_9fa48("5177");
            keycaps.setMatrixAt(i, matrix.makeTranslation(stryMutAct_9fa48("5179") ? i % 3 + 1 : (stryCov_9fa48("5179"), (stryMutAct_9fa48("5180") ? i * 3 : (stryCov_9fa48("5180"), i % 3)) - 1), 0.59, stryMutAct_9fa48("5181") ? Math.floor(i / 3) + 0.9 : (stryCov_9fa48("5181"), Math.floor(stryMutAct_9fa48("5182") ? i * 3 : (stryCov_9fa48("5182"), i / 3)) - 0.9)));
            keycaps.setColorAt(i, (stryMutAct_9fa48("5187") ? i >= 3 : stryMutAct_9fa48("5186") ? i <= 3 : stryMutAct_9fa48("5185") ? false : stryMutAct_9fa48("5184") ? true : (stryCov_9fa48("5184", "5185", "5186", "5187"), i < 3)) ? orange.color : cream.color);
          }
        }
        keycaps.name = stryMutAct_9fa48("5188") ? "" : (stryCov_9fa48("5188"), 'macropad-twelve-keys');
        keycaps.castShadow = keycaps.receiveShadow = stryMutAct_9fa48("5189") ? false : (stryCov_9fa48("5189"), true);
        if (stryMutAct_9fa48("5190")) {
          ;
        } else {
          stryCov_9fa48("5190");
          pad.add(keycaps);
        }
        mesh(pad, box(1.8, 0.08, 0.72, 0.04), dark, stryMutAct_9fa48("5192") ? +0.58 : (stryCov_9fa48("5192"), -0.58), 0.44, stryMutAct_9fa48("5193") ? +2.12 : (stryCov_9fa48("5193"), -2.12));
        const display = material(stryMutAct_9fa48("5194") ? "" : (stryCov_9fa48("5194"), '#a4e5c5'), 0.7);
        display.emissive.set(stryMutAct_9fa48("5196") ? "" : (stryCov_9fa48("5196"), '#39715a'));
        display.emissiveIntensity = 0.4;
        const lineGeometry = new THREE.BoxGeometry(1.12, 0.01, 0.045);
        for (let i = 0; stryMutAct_9fa48("5199") ? i >= 3 : stryMutAct_9fa48("5198") ? i <= 3 : stryMutAct_9fa48("5197") ? false : (stryCov_9fa48("5197", "5198", "5199"), i < 3); stryMutAct_9fa48("5200") ? i-- : (stryCov_9fa48("5200"), i++)) mesh(pad, lineGeometry, display, stryMutAct_9fa48("5202") ? +0.65 : (stryCov_9fa48("5202"), -0.65), 0.487, stryMutAct_9fa48("5203") ? -2.3 - i * 0.15 : (stryCov_9fa48("5203"), (stryMutAct_9fa48("5204") ? +2.3 : (stryCov_9fa48("5204"), -2.3)) + (stryMutAct_9fa48("5205") ? i / 0.15 : (stryCov_9fa48("5205"), i * 0.15))));
        mesh(pad, new THREE.CylinderGeometry(0.38, 0.38, 0.42, 20), dark, 1.04, 0.64, stryMutAct_9fa48("5207") ? +2.12 : (stryCov_9fa48("5207"), -2.12));
        mesh(pad, new THREE.BoxGeometry(0.045, 0.015, 0.16), cream, 1.04, 0.857, stryMutAct_9fa48("5209") ? +2.29 : (stryCov_9fa48("5209"), -2.29));
        mesh(pad, box(0.4, 0.15, 0.14, 0.02), dark, stryMutAct_9fa48("5211") ? +0.9 : (stryCov_9fa48("5211"), -0.9), 0.17, stryMutAct_9fa48("5212") ? +2.91 : (stryCov_9fa48("5212"), -2.91));
        return pad;
      }
    }
    function unmounted(kind: 'screen' | 'buttons' | 'encoder') {
      if (stryMutAct_9fa48("5213")) {
        {}
      } else {
        stryCov_9fa48("5213");
        const part = new THREE.Group();
        part.name = stryMutAct_9fa48("5214") ? `` : (stryCov_9fa48("5214"), `unmounted-${kind}`);
        const tray = material(stryMutAct_9fa48("5215") ? "" : (stryCov_9fa48("5215"), '#333a34'), 0.8);
        const pcb = material(stryMutAct_9fa48("5216") ? "" : (stryCov_9fa48("5216"), '#176c58'), 0.65);
        const metal = material(stryMutAct_9fa48("5217") ? "" : (stryCov_9fa48("5217"), '#b7b6ab'), 0.3, 0.8);
        const black = material(stryMutAct_9fa48("5218") ? "" : (stryCov_9fa48("5218"), '#171c1b'), 0.4);
        if (stryMutAct_9fa48("5219")) {
          ;
        } else {
          stryCov_9fa48("5219");
          mesh(part, box(3.8, 0.12, 2.5), tray, 0, 0.06);
        }
        if (stryMutAct_9fa48("5222") ? kind !== 'encoder' : stryMutAct_9fa48("5221") ? false : stryMutAct_9fa48("5220") ? true : (stryCov_9fa48("5220", "5221", "5222"), kind === (stryMutAct_9fa48("5223") ? "" : (stryCov_9fa48("5223"), 'encoder')))) {
          if (stryMutAct_9fa48("5224")) {
            {}
          } else {
            stryCov_9fa48("5224");
            mesh(part, box(0.85, 0.55, 0.8), metal, stryMutAct_9fa48("5226") ? +0.65 : (stryCov_9fa48("5226"), -0.65), 0.4);
            mesh(part, new THREE.CylinderGeometry(0.16, 0.16, 0.6, 16), metal, stryMutAct_9fa48("5228") ? +0.65 : (stryCov_9fa48("5228"), -0.65), 0.95);
            if (stryMutAct_9fa48("5229")) {
              ;
            } else {
              stryCov_9fa48("5229");
              mesh(part, new THREE.CylinderGeometry(0.45, 0.45, 0.55, 24), black, 0.75, 0.4);
            }
            for (let i = 0; stryMutAct_9fa48("5232") ? i >= 3 : stryMutAct_9fa48("5231") ? i <= 3 : stryMutAct_9fa48("5230") ? false : (stryCov_9fa48("5230", "5231", "5232"), i < 3); stryMutAct_9fa48("5233") ? i-- : (stryCov_9fa48("5233"), i++)) mesh(part, box(0.07, 0.07, 0.5, 0.01), metal, stryMutAct_9fa48("5235") ? -0.9 - i * 0.25 : (stryCov_9fa48("5235"), (stryMutAct_9fa48("5236") ? +0.9 : (stryCov_9fa48("5236"), -0.9)) + (stryMutAct_9fa48("5237") ? i / 0.25 : (stryCov_9fa48("5237"), i * 0.25))), 0.2, 0.55);
          }
        } else if (stryMutAct_9fa48("5240") ? kind !== 'screen' : stryMutAct_9fa48("5239") ? false : stryMutAct_9fa48("5238") ? true : (stryCov_9fa48("5238", "5239", "5240"), kind === (stryMutAct_9fa48("5241") ? "" : (stryCov_9fa48("5241"), 'screen')))) {
          if (stryMutAct_9fa48("5242")) {
            {}
          } else {
            stryCov_9fa48("5242");
            if (stryMutAct_9fa48("5243")) {
              ;
            } else {
              stryCov_9fa48("5243");
              mesh(part, box(2.1, 0.1, 1.85), pcb, 0, 0.22);
            }
            mesh(part, box(1.8, 0.06, 1.1), black, 0, 0.31, stryMutAct_9fa48("5245") ? +0.1 : (stryCov_9fa48("5245"), -0.1));
            for (let i = 0; stryMutAct_9fa48("5248") ? i >= 4 : stryMutAct_9fa48("5247") ? i <= 4 : stryMutAct_9fa48("5246") ? false : (stryCov_9fa48("5246", "5247", "5248"), i < 4); stryMutAct_9fa48("5249") ? i-- : (stryCov_9fa48("5249"), i++)) mesh(part, box(0.09, 0.22, 0.09, 0.01), metal, stryMutAct_9fa48("5251") ? -0.4 - i * 0.27 : (stryCov_9fa48("5251"), (stryMutAct_9fa48("5252") ? +0.4 : (stryCov_9fa48("5252"), -0.4)) + (stryMutAct_9fa48("5253") ? i / 0.27 : (stryCov_9fa48("5253"), i * 0.27))), 0.4, 0.7);
          }
        } else {
          if (stryMutAct_9fa48("5254")) {
            {}
          } else {
            stryCov_9fa48("5254");
            if (stryMutAct_9fa48("5255")) {
              ;
            } else {
              stryCov_9fa48("5255");
              mesh(part, box(3.2, 0.1, 1.1), pcb, 0, 0.22);
            }
            for (let i = 0; stryMutAct_9fa48("5258") ? i >= 4 : stryMutAct_9fa48("5257") ? i <= 4 : stryMutAct_9fa48("5256") ? false : (stryCov_9fa48("5256", "5257", "5258"), i < 4); stryMutAct_9fa48("5259") ? i-- : (stryCov_9fa48("5259"), i++)) {
              if (stryMutAct_9fa48("5260")) {
                {}
              } else {
                stryCov_9fa48("5260");
                const x = stryMutAct_9fa48("5261") ? -1.2 - i * 0.8 : (stryCov_9fa48("5261"), (stryMutAct_9fa48("5262") ? +1.2 : (stryCov_9fa48("5262"), -1.2)) + (stryMutAct_9fa48("5263") ? i / 0.8 : (stryCov_9fa48("5263"), i * 0.8)));
                if (stryMutAct_9fa48("5264")) {
                  ;
                } else {
                  stryCov_9fa48("5264");
                  mesh(part, box(0.52, 0.02, 0.52, 0.01), black, x, 0.28);
                }
                for (const z of stryMutAct_9fa48("5265") ? [] : (stryCov_9fa48("5265"), [stryMutAct_9fa48("5266") ? +0.35 : (stryCov_9fa48("5266"), -0.35), 0.35])) if (stryMutAct_9fa48("5267")) {
                  ;
                } else {
                  stryCov_9fa48("5267");
                  mesh(part, new THREE.CylinderGeometry(0.055, 0.055, 0.025, 8), metal, x, 0.28, z);
                }
              }
            }
          }
        }
        return part;
      }
    }
    function referenceObject(width = 2.8, depth = 1.8) {
      if (stryMutAct_9fa48("5268")) {
        {}
      } else {
        stryCov_9fa48("5268");
        const reference = new THREE.Group();
        reference.name = stryMutAct_9fa48("5269") ? "" : (stryCov_9fa48("5269"), 'unavailable-product-geometry');
        reference.userData.geometry = stryMutAct_9fa48("5270") ? "" : (stryCov_9fa48("5270"), 'unavailable');
        mesh(reference, box(width, 0.1, depth), material(stryMutAct_9fa48("5272") ? "" : (stryCov_9fa48("5272"), '#717b74'), 0.8), 0, 0.05);
        mesh(reference, box(stryMutAct_9fa48("5274") ? width / 0.55 : (stryCov_9fa48("5274"), width * 0.55), 0.02, 0.035, 0.01), material(stryMutAct_9fa48("5275") ? "" : (stryCov_9fa48("5275"), '#c7cec4')), 0, 0.11);
        return reference;
      }
    }
    const assigned = new Map<string, number>();
    for (const selection of selections) {
      if (stryMutAct_9fa48("5276")) {
        {}
      } else {
        stryCov_9fa48("5276");
        if (stryMutAct_9fa48("5279") ? selection.location.kind !== 'key' : stryMutAct_9fa48("5278") ? false : stryMutAct_9fa48("5277") ? true : (stryCov_9fa48("5277", "5278", "5279"), selection.location.kind === (stryMutAct_9fa48("5280") ? "" : (stryCov_9fa48("5280"), 'key')))) assigned.set(selection.location.keyId, stryMutAct_9fa48("5282") ? (assigned.get(selection.location.keyId) ?? 0) - 1 : (stryCov_9fa48("5282"), (stryMutAct_9fa48("5283") ? assigned.get(selection.location.keyId) && 0 : (stryCov_9fa48("5283"), assigned.get(selection.location.keyId) ?? 0)) + 1));
      }
    }
    const positions = stryMutAct_9fa48("5284") ? {} : (stryCov_9fa48("5284"), {
      left: 0,
      right: 0,
      above: 0
    });
    const totals = stryMutAct_9fa48("5285") ? {} : (stryCov_9fa48("5285"), {
      left: 0,
      right: 0,
      above: 0
    });
    let planned = 0;
    for (const selection of selections) {
      if (stryMutAct_9fa48("5286")) {
        {}
      } else {
        stryCov_9fa48("5286");
        if (stryMutAct_9fa48("5289") ? selection.location.kind === 'external' && products.some(item => item.id === selection.productId && (item.kind === 'macropad' || item.id.startsWith('import-accessory:'))) || planned < MAX_DESK_PREVIEWS : stryMutAct_9fa48("5288") ? false : stryMutAct_9fa48("5287") ? true : (stryCov_9fa48("5287", "5288", "5289"), (stryMutAct_9fa48("5291") ? selection.location.kind === 'external' || products.some(item => item.id === selection.productId && (item.kind === 'macropad' || item.id.startsWith('import-accessory:'))) : stryMutAct_9fa48("5290") ? true : (stryCov_9fa48("5290", "5291"), (stryMutAct_9fa48("5293") ? selection.location.kind !== 'external' : stryMutAct_9fa48("5292") ? true : (stryCov_9fa48("5292", "5293"), selection.location.kind === (stryMutAct_9fa48("5294") ? "" : (stryCov_9fa48("5294"), 'external')))) && (stryMutAct_9fa48("5295") ? products.every(item => item.id === selection.productId && (item.kind === 'macropad' || item.id.startsWith('import-accessory:'))) : (stryCov_9fa48("5295"), products.some(stryMutAct_9fa48("5296") ? () => undefined : (stryCov_9fa48("5296"), item => stryMutAct_9fa48("5299") ? item.id === selection.productId || item.kind === 'macropad' || item.id.startsWith('import-accessory:') : stryMutAct_9fa48("5298") ? false : stryMutAct_9fa48("5297") ? true : (stryCov_9fa48("5297", "5298", "5299"), (stryMutAct_9fa48("5301") ? item.id !== selection.productId : stryMutAct_9fa48("5300") ? true : (stryCov_9fa48("5300", "5301"), item.id === selection.productId)) && (stryMutAct_9fa48("5303") ? item.kind === 'macropad' && item.id.startsWith('import-accessory:') : stryMutAct_9fa48("5302") ? true : (stryCov_9fa48("5302", "5303"), (stryMutAct_9fa48("5305") ? item.kind !== 'macropad' : stryMutAct_9fa48("5304") ? false : (stryCov_9fa48("5304", "5305"), item.kind === (stryMutAct_9fa48("5306") ? "" : (stryCov_9fa48("5306"), 'macropad')))) || (stryMutAct_9fa48("5307") ? item.id.endsWith('import-accessory:') : (stryCov_9fa48("5307"), item.id.startsWith(stryMutAct_9fa48("5308") ? "" : (stryCov_9fa48("5308"), 'import-accessory:'))))))))))))) && (stryMutAct_9fa48("5311") ? planned >= MAX_DESK_PREVIEWS : stryMutAct_9fa48("5310") ? planned <= MAX_DESK_PREVIEWS : stryMutAct_9fa48("5309") ? true : (stryCov_9fa48("5309", "5310", "5311"), planned < MAX_DESK_PREVIEWS)))) {
          if (stryMutAct_9fa48("5312")) {
            {}
          } else {
            stryCov_9fa48("5312");
            stryMutAct_9fa48("5313") ? totals[selection.location.position]-- : (stryCov_9fa48("5313"), totals[selection.location.position]++);
            stryMutAct_9fa48("5314") ? planned-- : (stryCov_9fa48("5314"), planned++);
          }
        }
      }
    }
    for (const selection of selections) {
      if (stryMutAct_9fa48("5315")) {
        {}
      } else {
        stryCov_9fa48("5315");
        const product = products.find(stryMutAct_9fa48("5316") ? () => undefined : (stryCov_9fa48("5316"), item => stryMutAct_9fa48("5319") ? item.id !== selection.productId : stryMutAct_9fa48("5318") ? false : stryMutAct_9fa48("5317") ? true : (stryCov_9fa48("5317", "5318", "5319"), item.id === selection.productId)));
        const location = selection.location;
        if (stryMutAct_9fa48("5322") ? product?.kind === 'artisan' || location.kind === 'key' : stryMutAct_9fa48("5321") ? false : stryMutAct_9fa48("5320") ? true : (stryCov_9fa48("5320", "5321", "5322"), (stryMutAct_9fa48("5324") ? product?.kind !== 'artisan' : stryMutAct_9fa48("5323") ? true : (stryCov_9fa48("5323", "5324"), (stryMutAct_9fa48("5325") ? product.kind : (stryCov_9fa48("5325"), product?.kind)) === (stryMutAct_9fa48("5326") ? "" : (stryCov_9fa48("5326"), 'artisan')))) && (stryMutAct_9fa48("5328") ? location.kind !== 'key' : stryMutAct_9fa48("5327") ? true : (stryCov_9fa48("5327", "5328"), location.kind === (stryMutAct_9fa48("5329") ? "" : (stryCov_9fa48("5329"), 'key')))))) {
          if (stryMutAct_9fa48("5330")) {
            {}
          } else {
            stryCov_9fa48("5330");
            const key = keys.get(location.keyId);
            const originalCap = stryMutAct_9fa48("5331") ? key.children.find(child => child instanceof THREE.Mesh && child.name.startsWith('cap')) : (stryCov_9fa48("5331"), key?.children.find(stryMutAct_9fa48("5332") ? () => undefined : (stryCov_9fa48("5332"), child => stryMutAct_9fa48("5335") ? child instanceof THREE.Mesh || child.name.startsWith('cap') : stryMutAct_9fa48("5334") ? false : stryMutAct_9fa48("5333") ? true : (stryCov_9fa48("5333", "5334", "5335"), child instanceof THREE.Mesh && (stryMutAct_9fa48("5336") ? child.name.endsWith('cap') : (stryCov_9fa48("5336"), child.name.startsWith(stryMutAct_9fa48("5337") ? "" : (stryCov_9fa48("5337"), 'cap'))))))));
            if (stryMutAct_9fa48("5339") ? false : stryMutAct_9fa48("5338") ? true : (stryCov_9fa48("5338", "5339"), originalCap instanceof THREE.Mesh)) if (stryMutAct_9fa48("5340")) {
              ;
            } else {
              stryCov_9fa48("5340");
              originalCap.geometry.computeBoundingBox();
            }
            const capWidth = originalCap instanceof THREE.Mesh ? stryMutAct_9fa48("5341") ? originalCap.geometry.boundingBox.getSize(new THREE.Vector3()).x : (stryCov_9fa48("5341"), originalCap.geometry.boundingBox?.getSize(new THREE.Vector3()).x) : undefined;
            if (stryMutAct_9fa48("5344") ? (product.sizeU === null || !key || capWidth === undefined || Math.abs(capWidth + 0.08 - product.sizeU) > 0.03 || assigned.get(location.keyId) !== 1) && selection.quantity !== 1 : stryMutAct_9fa48("5343") ? false : stryMutAct_9fa48("5342") ? true : (stryCov_9fa48("5342", "5343", "5344"), (stryMutAct_9fa48("5346") ? (product.sizeU === null || !key || capWidth === undefined || Math.abs(capWidth + 0.08 - product.sizeU) > 0.03) && assigned.get(location.keyId) !== 1 : stryMutAct_9fa48("5345") ? false : (stryCov_9fa48("5345", "5346"), (stryMutAct_9fa48("5348") ? (product.sizeU === null || !key || capWidth === undefined) && Math.abs(capWidth + 0.08 - product.sizeU) > 0.03 : stryMutAct_9fa48("5347") ? false : (stryCov_9fa48("5347", "5348"), (stryMutAct_9fa48("5350") ? (product.sizeU === null || !key) && capWidth === undefined : stryMutAct_9fa48("5349") ? false : (stryCov_9fa48("5349", "5350"), (stryMutAct_9fa48("5352") ? product.sizeU === null && !key : stryMutAct_9fa48("5351") ? false : (stryCov_9fa48("5351", "5352"), (stryMutAct_9fa48("5354") ? product.sizeU !== null : stryMutAct_9fa48("5353") ? false : (stryCov_9fa48("5353", "5354"), product.sizeU === null)) || (stryMutAct_9fa48("5355") ? key : (stryCov_9fa48("5355"), !key)))) || (stryMutAct_9fa48("5357") ? capWidth !== undefined : stryMutAct_9fa48("5356") ? false : (stryCov_9fa48("5356", "5357"), capWidth === undefined)))) || (stryMutAct_9fa48("5360") ? Math.abs(capWidth + 0.08 - product.sizeU) <= 0.03 : stryMutAct_9fa48("5359") ? Math.abs(capWidth + 0.08 - product.sizeU) >= 0.03 : stryMutAct_9fa48("5358") ? false : (stryCov_9fa48("5358", "5359", "5360"), Math.abs(stryMutAct_9fa48("5361") ? capWidth + 0.08 + product.sizeU : (stryCov_9fa48("5361"), (stryMutAct_9fa48("5362") ? capWidth - 0.08 : (stryCov_9fa48("5362"), capWidth + 0.08)) - product.sizeU)) > 0.03)))) || (stryMutAct_9fa48("5364") ? assigned.get(location.keyId) === 1 : stryMutAct_9fa48("5363") ? false : (stryCov_9fa48("5363", "5364"), assigned.get(location.keyId) !== 1)))) || (stryMutAct_9fa48("5366") ? selection.quantity === 1 : stryMutAct_9fa48("5365") ? false : (stryCov_9fa48("5365", "5366"), selection.quantity !== 1)))) {
              if (stryMutAct_9fa48("5367")) {
                {}
              } else {
                stryCov_9fa48("5367");
                stryMutAct_9fa48("5368") ? counts.omitted-- : (stryCov_9fa48("5368"), counts.omitted++);
                continue;
              }
            }
            const originals = key.children.map(stryMutAct_9fa48("5369") ? () => undefined : (stryCov_9fa48("5369"), object => stryMutAct_9fa48("5370") ? {} : (stryCov_9fa48("5370"), {
              object,
              visible: object.visible
            })));
            originals.forEach(({
              object
            }) => {
              if (stryMutAct_9fa48("5372")) {
                {}
              } else {
                stryCov_9fa48("5372");
                object.visible = stryMutAct_9fa48("5373") ? true : (stryCov_9fa48("5373"), false);
              }
            });
            const cap = (stryMutAct_9fa48("5374") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("5374"), product.id.startsWith(stryMutAct_9fa48("5375") ? "" : (stryCov_9fa48("5375"), 'import-accessory:')))) ? referenceObject(stryMutAct_9fa48("5376") ? product.sizeU + 0.08 : (stryCov_9fa48("5376"), product.sizeU - 0.08), 0.92) : artisan(product.sizeU);
            cap.userData.selectionId = selection.id;
            if (stryMutAct_9fa48("5377")) {
              ;
            } else {
              stryCov_9fa48("5377");
              key.add(cap);
            }
            replacements.push(stryMutAct_9fa48("5379") ? {} : (stryCov_9fa48("5379"), {
              group: cap,
              originals
            }));
            stryMutAct_9fa48("5380") ? counts.artisan-- : (stryCov_9fa48("5380"), counts.artisan++);
          }
        } else if (stryMutAct_9fa48("5383") ? product && location.kind === 'external' || product.kind === 'macropad' || product.id.startsWith('import-accessory:') : stryMutAct_9fa48("5382") ? false : stryMutAct_9fa48("5381") ? true : (stryCov_9fa48("5381", "5382", "5383"), (stryMutAct_9fa48("5385") ? product || location.kind === 'external' : stryMutAct_9fa48("5384") ? true : (stryCov_9fa48("5384", "5385"), product && (stryMutAct_9fa48("5387") ? location.kind !== 'external' : stryMutAct_9fa48("5386") ? true : (stryCov_9fa48("5386", "5387"), location.kind === (stryMutAct_9fa48("5388") ? "" : (stryCov_9fa48("5388"), 'external')))))) && (stryMutAct_9fa48("5390") ? product.kind === 'macropad' && product.id.startsWith('import-accessory:') : stryMutAct_9fa48("5389") ? true : (stryCov_9fa48("5389", "5390"), (stryMutAct_9fa48("5392") ? product.kind !== 'macropad' : stryMutAct_9fa48("5391") ? false : (stryCov_9fa48("5391", "5392"), product.kind === (stryMutAct_9fa48("5393") ? "" : (stryCov_9fa48("5393"), 'macropad')))) || (stryMutAct_9fa48("5394") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("5394"), product.id.startsWith(stryMutAct_9fa48("5395") ? "" : (stryCov_9fa48("5395"), 'import-accessory:')))))))) {
          if (stryMutAct_9fa48("5396")) {
            {}
          } else {
            stryCov_9fa48("5396");
            if (stryMutAct_9fa48("5399") ? counts.external >= MAX_DESK_PREVIEWS && bounds.isEmpty() : stryMutAct_9fa48("5398") ? false : stryMutAct_9fa48("5397") ? true : (stryCov_9fa48("5397", "5398", "5399"), (stryMutAct_9fa48("5402") ? counts.external < MAX_DESK_PREVIEWS : stryMutAct_9fa48("5401") ? counts.external > MAX_DESK_PREVIEWS : stryMutAct_9fa48("5400") ? false : (stryCov_9fa48("5400", "5401", "5402"), counts.external >= MAX_DESK_PREVIEWS)) || bounds.isEmpty())) {
              if (stryMutAct_9fa48("5403")) {
                {}
              } else {
                stryCov_9fa48("5403");
                stryMutAct_9fa48("5404") ? counts.omitted-- : (stryCov_9fa48("5404"), counts.omitted++);
                continue;
              }
            }
            const index = stryMutAct_9fa48("5405") ? positions[location.position]-- : (stryCov_9fa48("5405"), positions[location.position]++);
            const row = stryMutAct_9fa48("5406") ? index * 3 : (stryCov_9fa48("5406"), index % 3);
            const column = Math.floor(stryMutAct_9fa48("5407") ? index * 3 : (stryCov_9fa48("5407"), index / 3));
            const centered = stryMutAct_9fa48("5408") ? row + (Math.min(totals[location.position], 3) - 1) / 2 : (stryCov_9fa48("5408"), row - (stryMutAct_9fa48("5409") ? (Math.min(totals[location.position], 3) - 1) * 2 : (stryCov_9fa48("5409"), (stryMutAct_9fa48("5410") ? Math.min(totals[location.position], 3) + 1 : (stryCov_9fa48("5410"), (stryMutAct_9fa48("5411") ? Math.max(totals[location.position], 3) : (stryCov_9fa48("5411"), Math.min(totals[location.position], 3))) - 1)) / 2)));
            const pad = (stryMutAct_9fa48("5412") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("5412"), product.id.startsWith(stryMutAct_9fa48("5413") ? "" : (stryCov_9fa48("5413"), 'import-accessory:')))) ? referenceObject() : macropad();
            pad.userData.selectionId = selection.id;
            const gap = 0.6;
            pad.position.set((stryMutAct_9fa48("5417") ? location.position !== 'left' : stryMutAct_9fa48("5416") ? false : stryMutAct_9fa48("5415") ? true : (stryCov_9fa48("5415", "5416", "5417"), location.position === (stryMutAct_9fa48("5418") ? "" : (stryCov_9fa48("5418"), 'left')))) ? stryMutAct_9fa48("5419") ? bounds.min.x - 1.825 - gap + column * 4.1 : (stryCov_9fa48("5419"), (stryMutAct_9fa48("5420") ? bounds.min.x - 1.825 + gap : (stryCov_9fa48("5420"), (stryMutAct_9fa48("5421") ? bounds.min.x + 1.825 : (stryCov_9fa48("5421"), bounds.min.x - 1.825)) - gap)) - (stryMutAct_9fa48("5422") ? column / 4.1 : (stryCov_9fa48("5422"), column * 4.1))) : (stryMutAct_9fa48("5425") ? location.position !== 'right' : stryMutAct_9fa48("5424") ? false : stryMutAct_9fa48("5423") ? true : (stryCov_9fa48("5423", "5424", "5425"), location.position === (stryMutAct_9fa48("5426") ? "" : (stryCov_9fa48("5426"), 'right')))) ? stryMutAct_9fa48("5427") ? bounds.max.x + 1.825 + gap - column * 4.1 : (stryCov_9fa48("5427"), (stryMutAct_9fa48("5428") ? bounds.max.x + 1.825 - gap : (stryCov_9fa48("5428"), (stryMutAct_9fa48("5429") ? bounds.max.x - 1.825 : (stryCov_9fa48("5429"), bounds.max.x + 1.825)) + gap)) + (stryMutAct_9fa48("5430") ? column / 4.1 : (stryCov_9fa48("5430"), column * 4.1))) : stryMutAct_9fa48("5431") ? centered / 4.1 : (stryCov_9fa48("5431"), centered * 4.1), stryMutAct_9fa48("5432") ? +0.2 : (stryCov_9fa48("5432"), -0.2), (stryMutAct_9fa48("5435") ? location.position !== 'above' : stryMutAct_9fa48("5434") ? false : stryMutAct_9fa48("5433") ? true : (stryCov_9fa48("5433", "5434", "5435"), location.position === (stryMutAct_9fa48("5436") ? "" : (stryCov_9fa48("5436"), 'above')))) ? stryMutAct_9fa48("5437") ? bounds.min.z - 2.875 - gap + column * 6.2 : (stryCov_9fa48("5437"), (stryMutAct_9fa48("5438") ? bounds.min.z - 2.875 + gap : (stryCov_9fa48("5438"), (stryMutAct_9fa48("5439") ? bounds.min.z + 2.875 : (stryCov_9fa48("5439"), bounds.min.z - 2.875)) - gap)) - (stryMutAct_9fa48("5440") ? column / 6.2 : (stryCov_9fa48("5440"), column * 6.2))) : stryMutAct_9fa48("5441") ? centered / 6.2 : (stryCov_9fa48("5441"), centered * 6.2));
            if (stryMutAct_9fa48("5442")) {
              ;
            } else {
              stryCov_9fa48("5442");
              group.add(pad);
            }
            stryMutAct_9fa48("5443") ? counts.external-- : (stryCov_9fa48("5443"), counts.external++);
          }
        } else if (stryMutAct_9fa48("5446") ? location.kind === 'embedded' && product || product.id.startsWith('import-accessory:') || product.kind === 'screen' || product?.kind === 'buttons' || product?.kind === 'encoder' : stryMutAct_9fa48("5445") ? false : stryMutAct_9fa48("5444") ? true : (stryCov_9fa48("5444", "5445", "5446"), (stryMutAct_9fa48("5448") ? location.kind === 'embedded' || product : stryMutAct_9fa48("5447") ? true : (stryCov_9fa48("5447", "5448"), (stryMutAct_9fa48("5450") ? location.kind !== 'embedded' : stryMutAct_9fa48("5449") ? true : (stryCov_9fa48("5449", "5450"), location.kind === (stryMutAct_9fa48("5451") ? "" : (stryCov_9fa48("5451"), 'embedded')))) && product)) && (stryMutAct_9fa48("5453") ? (product.id.startsWith('import-accessory:') || product.kind === 'screen' || product?.kind === 'buttons') && product?.kind === 'encoder' : stryMutAct_9fa48("5452") ? true : (stryCov_9fa48("5452", "5453"), (stryMutAct_9fa48("5455") ? (product.id.startsWith('import-accessory:') || product.kind === 'screen') && product?.kind === 'buttons' : stryMutAct_9fa48("5454") ? false : (stryCov_9fa48("5454", "5455"), (stryMutAct_9fa48("5457") ? product.id.startsWith('import-accessory:') && product.kind === 'screen' : stryMutAct_9fa48("5456") ? false : (stryCov_9fa48("5456", "5457"), (stryMutAct_9fa48("5458") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("5458"), product.id.startsWith(stryMutAct_9fa48("5459") ? "" : (stryCov_9fa48("5459"), 'import-accessory:')))) || (stryMutAct_9fa48("5461") ? product.kind !== 'screen' : stryMutAct_9fa48("5460") ? false : (stryCov_9fa48("5460", "5461"), product.kind === (stryMutAct_9fa48("5462") ? "" : (stryCov_9fa48("5462"), 'screen')))))) || (stryMutAct_9fa48("5464") ? product?.kind !== 'buttons' : stryMutAct_9fa48("5463") ? false : (stryCov_9fa48("5463", "5464"), (stryMutAct_9fa48("5465") ? product.kind : (stryCov_9fa48("5465"), product?.kind)) === (stryMutAct_9fa48("5466") ? "" : (stryCov_9fa48("5466"), 'buttons')))))) || (stryMutAct_9fa48("5468") ? product?.kind !== 'encoder' : stryMutAct_9fa48("5467") ? false : (stryCov_9fa48("5467", "5468"), (stryMutAct_9fa48("5469") ? product.kind : (stryCov_9fa48("5469"), product?.kind)) === (stryMutAct_9fa48("5470") ? "" : (stryCov_9fa48("5470"), 'encoder')))))))) {
          if (stryMutAct_9fa48("5471")) {
            {}
          } else {
            stryCov_9fa48("5471");
            if (stryMutAct_9fa48("5474") ? counts.planned >= MAX_UNMOUNTED_PREVIEWS && bounds.isEmpty() : stryMutAct_9fa48("5473") ? false : stryMutAct_9fa48("5472") ? true : (stryCov_9fa48("5472", "5473", "5474"), (stryMutAct_9fa48("5477") ? counts.planned < MAX_UNMOUNTED_PREVIEWS : stryMutAct_9fa48("5476") ? counts.planned > MAX_UNMOUNTED_PREVIEWS : stryMutAct_9fa48("5475") ? false : (stryCov_9fa48("5475", "5476", "5477"), counts.planned >= MAX_UNMOUNTED_PREVIEWS)) || bounds.isEmpty())) {
              if (stryMutAct_9fa48("5478")) {
                {}
              } else {
                stryCov_9fa48("5478");
                stryMutAct_9fa48("5479") ? counts.omitted-- : (stryCov_9fa48("5479"), counts.omitted++);
                continue;
              }
            }
            const part = (stryMutAct_9fa48("5480") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("5480"), product.id.startsWith(stryMutAct_9fa48("5481") ? "" : (stryCov_9fa48("5481"), 'import-accessory:')))) ? referenceObject() : (stryMutAct_9fa48("5484") ? (product.kind === 'screen' || product.kind === 'buttons') && product.kind === 'encoder' : stryMutAct_9fa48("5483") ? false : stryMutAct_9fa48("5482") ? true : (stryCov_9fa48("5482", "5483", "5484"), (stryMutAct_9fa48("5486") ? product.kind === 'screen' && product.kind === 'buttons' : stryMutAct_9fa48("5485") ? false : (stryCov_9fa48("5485", "5486"), (stryMutAct_9fa48("5488") ? product.kind !== 'screen' : stryMutAct_9fa48("5487") ? false : (stryCov_9fa48("5487", "5488"), product.kind === (stryMutAct_9fa48("5489") ? "" : (stryCov_9fa48("5489"), 'screen')))) || (stryMutAct_9fa48("5491") ? product.kind !== 'buttons' : stryMutAct_9fa48("5490") ? false : (stryCov_9fa48("5490", "5491"), product.kind === (stryMutAct_9fa48("5492") ? "" : (stryCov_9fa48("5492"), 'buttons')))))) || (stryMutAct_9fa48("5494") ? product.kind !== 'encoder' : stryMutAct_9fa48("5493") ? false : (stryCov_9fa48("5493", "5494"), product.kind === (stryMutAct_9fa48("5495") ? "" : (stryCov_9fa48("5495"), 'encoder')))))) ? unmounted(product.kind) : referenceObject();
            part.userData.selectionId = selection.id;
            part.userData.installation = stryMutAct_9fa48("5496") ? "" : (stryCov_9fa48("5496"), 'unmounted');
            part.position.set(stryMutAct_9fa48("5498") ? (counts.planned % 3 - 1) / 4.1 : (stryCov_9fa48("5498"), (stryMutAct_9fa48("5499") ? counts.planned % 3 + 1 : (stryCov_9fa48("5499"), (stryMutAct_9fa48("5500") ? counts.planned * 3 : (stryCov_9fa48("5500"), counts.planned % 3)) - 1)) * 4.1), stryMutAct_9fa48("5501") ? +0.2 : (stryCov_9fa48("5501"), -0.2), stryMutAct_9fa48("5502") ? bounds.max.z + 1.9 - Math.floor(counts.planned / 3) * 2.8 : (stryCov_9fa48("5502"), (stryMutAct_9fa48("5503") ? bounds.max.z - 1.9 : (stryCov_9fa48("5503"), bounds.max.z + 1.9)) + (stryMutAct_9fa48("5504") ? Math.floor(counts.planned / 3) / 2.8 : (stryCov_9fa48("5504"), Math.floor(stryMutAct_9fa48("5505") ? counts.planned * 3 : (stryCov_9fa48("5505"), counts.planned / 3)) * 2.8))));
            if (stryMutAct_9fa48("5506")) {
              ;
            } else {
              stryCov_9fa48("5506");
              group.add(part);
            }
            stryMutAct_9fa48("5507") ? counts.planned-- : (stryCov_9fa48("5507"), counts.planned++);
          }
        } else stryMutAct_9fa48("5508") ? counts.omitted-- : (stryCov_9fa48("5508"), counts.omitted++);
      }
    }
    return stryMutAct_9fa48("5509") ? {} : (stryCov_9fa48("5509"), {
      group,
      counts,
      dispose() {
        if (stryMutAct_9fa48("5510")) {
          {}
        } else {
          stryCov_9fa48("5510");
          if (stryMutAct_9fa48("5512") ? false : stryMutAct_9fa48("5511") ? true : (stryCov_9fa48("5511", "5512"), disposed)) return;
          disposed = stryMutAct_9fa48("5513") ? false : (stryCov_9fa48("5513"), true);
          for (const replacement of replacements) {
            if (stryMutAct_9fa48("5514")) {
              {}
            } else {
              stryCov_9fa48("5514");
              if (stryMutAct_9fa48("5515")) {
                ;
              } else {
                stryCov_9fa48("5515");
                replacement.group.removeFromParent();
              }
              for (const {
                object,
                visible
              } of replacement.originals) object.visible = visible;
            }
          }
          if (stryMutAct_9fa48("5516")) {
            ;
          } else {
            stryCov_9fa48("5516");
            group.removeFromParent();
          }
          instances.forEach(stryMutAct_9fa48("5518") ? () => undefined : (stryCov_9fa48("5518"), instance => instance.dispose()));
          geometries.forEach(stryMutAct_9fa48("5520") ? () => undefined : (stryCov_9fa48("5520"), geometry => geometry.dispose()));
          materials.forEach(stryMutAct_9fa48("5522") ? () => undefined : (stryCov_9fa48("5522"), surface => surface.dispose()));
        }
      }
    });
  }
}
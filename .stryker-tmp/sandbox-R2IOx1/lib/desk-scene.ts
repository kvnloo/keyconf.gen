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
export function createDeskScene(invalidate: () => void) {
  if (stryMutAct_9fa48("9693")) {
    {}
  } else {
    stryCov_9fa48("9693");
    const group = new THREE.Group();
    group.name = stryMutAct_9fa48("9694") ? "" : (stryCov_9fa48("9694"), 'desk-environment');
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const foliage: THREE.Group[] = stryMutAct_9fa48("9695") ? ["Stryker was here"] : (stryCov_9fa48("9695"), []);
    const flutter: Array<{
      mesh: THREE.InstancedMesh;
      poses: THREE.Object3D[];
    }> = stryMutAct_9fa48("9696") ? ["Stryker was here"] : (stryCov_9fa48("9696"), []);
    let disposed = stryMutAct_9fa48("9697") ? true : (stryCov_9fa48("9697"), false);
    function material(color: string, roughness = 0.7, metalness = 0) {
      if (stryMutAct_9fa48("9698")) {
        {}
      } else {
        stryCov_9fa48("9698");
        const result = new THREE.MeshStandardMaterial(stryMutAct_9fa48("9699") ? {} : (stryCov_9fa48("9699"), {
          color,
          roughness,
          metalness
        }));
        if (stryMutAct_9fa48("9700")) {
          ;
        } else {
          stryCov_9fa48("9700");
          materials.add(result);
        }
        return result;
      }
    }
    function mesh(geometry: THREE.BufferGeometry, surface: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0) {
      if (stryMutAct_9fa48("9701")) {
        {}
      } else {
        stryCov_9fa48("9701");
        if (stryMutAct_9fa48("9702")) {
          ;
        } else {
          stryCov_9fa48("9702");
          geometries.add(geometry);
        }
        const item = new THREE.Mesh(geometry, surface);
        if (stryMutAct_9fa48("9703")) {
          ;
        } else {
          stryCov_9fa48("9703");
          item.position.set(x, y, z);
        }
        item.castShadow = item.receiveShadow = stryMutAct_9fa48("9704") ? false : (stryCov_9fa48("9704"), true);
        if (stryMutAct_9fa48("9705")) {
          ;
        } else {
          stryCov_9fa48("9705");
          parent.add(item);
        }
        return item;
      }
    }
    const wood = material(stryMutAct_9fa48("9706") ? "" : (stryCov_9fa48("9706"), '#b4a68e'), 0.84);
    const canvas = document.createElement(stryMutAct_9fa48("9707") ? "" : (stryCov_9fa48("9707"), 'canvas'));
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext(stryMutAct_9fa48("9708") ? "" : (stryCov_9fa48("9708"), '2d'));
    if (stryMutAct_9fa48("9710") ? false : stryMutAct_9fa48("9709") ? true : (stryCov_9fa48("9709", "9710"), ctx)) {
      if (stryMutAct_9fa48("9711")) {
        {}
      } else {
        stryCov_9fa48("9711");
        ctx.fillStyle = stryMutAct_9fa48("9712") ? "" : (stryCov_9fa48("9712"), '#79694f');
        if (stryMutAct_9fa48("9713")) {
          ;
        } else {
          stryCov_9fa48("9713");
          ctx.fillRect(0, 0, 1024, 512);
        }
        for (let i = 0; stryMutAct_9fa48("9716") ? i >= 450 : stryMutAct_9fa48("9715") ? i <= 450 : stryMutAct_9fa48("9714") ? false : (stryCov_9fa48("9714", "9715", "9716"), i < 450); stryMutAct_9fa48("9717") ? i-- : (stryCov_9fa48("9717"), i++)) {
          if (stryMutAct_9fa48("9718")) {
            {}
          } else {
            stryCov_9fa48("9718");
            const y = stryMutAct_9fa48("9719") ? i * 512 * 450 : (stryCov_9fa48("9719"), (stryMutAct_9fa48("9720") ? i / 512 : (stryCov_9fa48("9720"), i * 512)) / 450);
            ctx.strokeStyle = (stryMutAct_9fa48("9723") ? i % 3 !== 0 : stryMutAct_9fa48("9722") ? false : stryMutAct_9fa48("9721") ? true : (stryCov_9fa48("9721", "9722", "9723"), (stryMutAct_9fa48("9724") ? i * 3 : (stryCov_9fa48("9724"), i % 3)) === 0)) ? stryMutAct_9fa48("9725") ? "" : (stryCov_9fa48("9725"), '#282a2216') : stryMutAct_9fa48("9726") ? "" : (stryCov_9fa48("9726"), '#ded6bb12');
            ctx.lineWidth = (stryMutAct_9fa48("9729") ? i % 7 !== 0 : stryMutAct_9fa48("9728") ? false : stryMutAct_9fa48("9727") ? true : (stryCov_9fa48("9727", "9728", "9729"), (stryMutAct_9fa48("9730") ? i * 7 : (stryCov_9fa48("9730"), i % 7)) === 0)) ? 1.3 : 0.5;
            if (stryMutAct_9fa48("9731")) {
              ;
            } else {
              stryCov_9fa48("9731");
              ctx.beginPath();
            }
            if (stryMutAct_9fa48("9732")) {
              ;
            } else {
              stryCov_9fa48("9732");
              ctx.moveTo(0, y);
            }
            ctx.bezierCurveTo(300, stryMutAct_9fa48("9734") ? y - Math.sin(i * 0.25) * 8 : (stryCov_9fa48("9734"), y + (stryMutAct_9fa48("9735") ? Math.sin(i * 0.25) / 8 : (stryCov_9fa48("9735"), Math.sin(stryMutAct_9fa48("9736") ? i / 0.25 : (stryCov_9fa48("9736"), i * 0.25)) * 8))), 750, stryMutAct_9fa48("9737") ? y + 5 : (stryCov_9fa48("9737"), y - 5), 1024, stryMutAct_9fa48("9738") ? y - 3 : (stryCov_9fa48("9738"), y + 3));
            if (stryMutAct_9fa48("9739")) {
              ;
            } else {
              stryCov_9fa48("9739");
              ctx.stroke();
            }
          }
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        if (stryMutAct_9fa48("9740")) {
          ;
        } else {
          stryCov_9fa48("9740");
          texture.repeat.set(3, 3);
        }
        wood.map = texture;
        wood.bumpMap = texture;
        wood.bumpScale = 0.035;
        if (stryMutAct_9fa48("9741")) {
          ;
        } else {
          stryCov_9fa48("9741");
          textures.add(texture);
        }
      }
    }
    mesh(new RoundedBoxGeometry(52, 0.7, 46, 3, 0.25), wood, group, 0, stryMutAct_9fa48("9743") ? +0.59 : (stryCov_9fa48("9743"), -0.59), stryMutAct_9fa48("9744") ? +3 : (stryCov_9fa48("9744"), -3));
    const felt = material(stryMutAct_9fa48("9745") ? "" : (stryCov_9fa48("9745"), '#343e37'), 0.97);
    mesh(new THREE.BoxGeometry(20, 0.035, 9.2), felt, group, 0, stryMutAct_9fa48("9747") ? +0.218 : (stryCov_9fa48("9747"), -0.218), 0);
    const paper = material(stryMutAct_9fa48("9748") ? "" : (stryCov_9fa48("9748"), '#d7cdb3'), 0.9),
      cover = material(stryMutAct_9fa48("9749") ? "" : (stryCov_9fa48("9749"), '#28342c'), 0.78),
      brass = material(stryMutAct_9fa48("9750") ? "" : (stryCov_9fa48("9750"), '#a58d57'), 0.45, 0.6);
    const books = new THREE.Group();
    books.position.set(8, stryMutAct_9fa48("9752") ? +0.2 : (stryCov_9fa48("9752"), -0.2), stryMutAct_9fa48("9753") ? +7.4 : (stryCov_9fa48("9753"), -7.4));
    books.rotation.y = stryMutAct_9fa48("9754") ? +0.16 : (stryCov_9fa48("9754"), -0.16);
    if (stryMutAct_9fa48("9755")) {
      ;
    } else {
      stryCov_9fa48("9755");
      group.add(books);
    }
    if (stryMutAct_9fa48("9756")) {
      ;
    } else {
      stryCov_9fa48("9756");
      mesh(new THREE.BoxGeometry(5, 0.08, 6.8), cover, books, 0, 0.07, 0);
    }
    if (stryMutAct_9fa48("9757")) {
      ;
    } else {
      stryCov_9fa48("9757");
      mesh(new THREE.BoxGeometry(4.85, 0.56, 6.62), paper, books, 0.03, 0.38, 0);
    }
    if (stryMutAct_9fa48("9758")) {
      ;
    } else {
      stryCov_9fa48("9758");
      mesh(new THREE.BoxGeometry(5, 0.08, 6.8), cover, books, 0, 0.71, 0);
    }
    const upper = mesh(new THREE.BoxGeometry(4.5, 0.42, 5.4), material(stryMutAct_9fa48("9759") ? "" : (stryCov_9fa48("9759"), '#79715e')), books, stryMutAct_9fa48("9760") ? +0.25 : (stryCov_9fa48("9760"), -0.25), 0.99, 0.14);
    upper.rotation.y = 0.15;
    for (let i = 0; stryMutAct_9fa48("9763") ? i >= 8 : stryMutAct_9fa48("9762") ? i <= 8 : stryMutAct_9fa48("9761") ? false : (stryCov_9fa48("9761", "9762", "9763"), i < 8); stryMutAct_9fa48("9764") ? i-- : (stryCov_9fa48("9764"), i++)) mesh(new THREE.BoxGeometry(4.86, 0.01, 6.63), material((stryMutAct_9fa48("9766") ? i * 2 : (stryCov_9fa48("9766"), i % 2)) ? stryMutAct_9fa48("9767") ? "" : (stryCov_9fa48("9767"), '#a69b83') : stryMutAct_9fa48("9768") ? "" : (stryCov_9fa48("9768"), '#bdb19a')), books, 0.03, stryMutAct_9fa48("9769") ? 0.12 - i * 0.065 : (stryCov_9fa48("9769"), 0.12 + (stryMutAct_9fa48("9770") ? i / 0.065 : (stryCov_9fa48("9770"), i * 0.065))), 0);
    const leafGeometry = new THREE.BufferGeometry();
    const positions: number[] = stryMutAct_9fa48("9771") ? ["Stryker was here"] : (stryCov_9fa48("9771"), []);
    const indices: number[] = stryMutAct_9fa48("9772") ? ["Stryker was here"] : (stryCov_9fa48("9772"), []);
    const leafUvs: number[] = stryMutAct_9fa48("9773") ? ["Stryker was here"] : (stryCov_9fa48("9773"), []);
    for (let row = 0; stryMutAct_9fa48("9776") ? row > 18 : stryMutAct_9fa48("9775") ? row < 18 : stryMutAct_9fa48("9774") ? false : (stryCov_9fa48("9774", "9775", "9776"), row <= 18); stryMutAct_9fa48("9777") ? row-- : (stryCov_9fa48("9777"), row++)) {
      if (stryMutAct_9fa48("9778")) {
        {}
      } else {
        stryCov_9fa48("9778");
        const t = stryMutAct_9fa48("9779") ? row * 18 : (stryCov_9fa48("9779"), row / 18),
          width = stryMutAct_9fa48("9780") ? Math.sin(Math.PI * t) / 0.34 : (stryCov_9fa48("9780"), Math.sin(stryMutAct_9fa48("9781") ? Math.PI / t : (stryCov_9fa48("9781"), Math.PI * t)) * 0.34);
        for (let col = 0; stryMutAct_9fa48("9784") ? col >= 5 : stryMutAct_9fa48("9783") ? col <= 5 : stryMutAct_9fa48("9782") ? false : (stryCov_9fa48("9782", "9783", "9784"), col < 5); stryMutAct_9fa48("9785") ? col-- : (stryCov_9fa48("9785"), col++)) {
          if (stryMutAct_9fa48("9786")) {
            {}
          } else {
            stryCov_9fa48("9786");
            const side = stryMutAct_9fa48("9787") ? (col - 2) * 2 : (stryCov_9fa48("9787"), (stryMutAct_9fa48("9788") ? col + 2 : (stryCov_9fa48("9788"), col - 2)) / 2);
            leafUvs.push(stryMutAct_9fa48("9790") ? col * 4 : (stryCov_9fa48("9790"), col / 4), t);
            positions.push(stryMutAct_9fa48("9792") ? side / width : (stryCov_9fa48("9792"), side * width), t, stryMutAct_9fa48("9793") ? Math.sin(t * Math.PI) * 0.16 - Math.abs(side) * 0.09 : (stryCov_9fa48("9793"), (stryMutAct_9fa48("9794") ? Math.sin(t * Math.PI) / 0.16 : (stryCov_9fa48("9794"), Math.sin(stryMutAct_9fa48("9795") ? t / Math.PI : (stryCov_9fa48("9795"), t * Math.PI)) * 0.16)) + (stryMutAct_9fa48("9796") ? Math.abs(side) / 0.09 : (stryCov_9fa48("9796"), Math.abs(side) * 0.09))));
          }
        }
      }
    }
    for (let row = 0; stryMutAct_9fa48("9799") ? row >= 18 : stryMutAct_9fa48("9798") ? row <= 18 : stryMutAct_9fa48("9797") ? false : (stryCov_9fa48("9797", "9798", "9799"), row < 18); stryMutAct_9fa48("9800") ? row-- : (stryCov_9fa48("9800"), row++)) for (let col = 0; stryMutAct_9fa48("9803") ? col >= 4 : stryMutAct_9fa48("9802") ? col <= 4 : stryMutAct_9fa48("9801") ? false : (stryCov_9fa48("9801", "9802", "9803"), col < 4); stryMutAct_9fa48("9804") ? col-- : (stryCov_9fa48("9804"), col++)) {
      if (stryMutAct_9fa48("9805")) {
        {}
      } else {
        stryCov_9fa48("9805");
        const a = stryMutAct_9fa48("9806") ? row * 5 - col : (stryCov_9fa48("9806"), (stryMutAct_9fa48("9807") ? row / 5 : (stryCov_9fa48("9807"), row * 5)) + col);
        indices.push(a, stryMutAct_9fa48("9809") ? a - 5 : (stryCov_9fa48("9809"), a + 5), stryMutAct_9fa48("9810") ? a - 1 : (stryCov_9fa48("9810"), a + 1), stryMutAct_9fa48("9811") ? a - 1 : (stryCov_9fa48("9811"), a + 1), stryMutAct_9fa48("9812") ? a - 5 : (stryCov_9fa48("9812"), a + 5), stryMutAct_9fa48("9813") ? a - 6 : (stryCov_9fa48("9813"), a + 6));
      }
    }
    leafGeometry.setAttribute(stryMutAct_9fa48("9815") ? "" : (stryCov_9fa48("9815"), 'position'), new THREE.Float32BufferAttribute(positions, 3));
    if (stryMutAct_9fa48("9816")) {
      ;
    } else {
      stryCov_9fa48("9816");
      leafGeometry.setIndex(indices);
    }
    leafGeometry.setAttribute(stryMutAct_9fa48("9818") ? "" : (stryCov_9fa48("9818"), 'uv'), new THREE.Float32BufferAttribute(leafUvs, 2));
    if (stryMutAct_9fa48("9819")) {
      ;
    } else {
      stryCov_9fa48("9819");
      leafGeometry.computeVertexNormals();
    }
    if (stryMutAct_9fa48("9820")) {
      ;
    } else {
      stryCov_9fa48("9820");
      geometries.add(leafGeometry);
    }
    const leaves = material(stryMutAct_9fa48("9821") ? "" : (stryCov_9fa48("9821"), '#ffffff'), 0.78);
    const leafCanvas = document.createElement(stryMutAct_9fa48("9822") ? "" : (stryCov_9fa48("9822"), 'canvas'));
    leafCanvas.width = 128;
    leafCanvas.height = 256;
    const leafInk = leafCanvas.getContext(stryMutAct_9fa48("9823") ? "" : (stryCov_9fa48("9823"), '2d'));
    if (stryMutAct_9fa48("9825") ? false : stryMutAct_9fa48("9824") ? true : (stryCov_9fa48("9824", "9825"), leafInk)) {
      if (stryMutAct_9fa48("9826")) {
        {}
      } else {
        stryCov_9fa48("9826");
        const gradient = leafInk.createLinearGradient(0, 0, 128, 0);
        gradient.addColorStop(0, stryMutAct_9fa48("9828") ? "" : (stryCov_9fa48("9828"), '#a2ad88'));
        gradient.addColorStop(0.5, stryMutAct_9fa48("9830") ? "" : (stryCov_9fa48("9830"), '#e7e9c9'));
        gradient.addColorStop(1, stryMutAct_9fa48("9832") ? "" : (stryCov_9fa48("9832"), '#acb992'));
        leafInk.fillStyle = gradient;
        if (stryMutAct_9fa48("9833")) {
          ;
        } else {
          stryCov_9fa48("9833");
          leafInk.fillRect(0, 0, 128, 256);
        }
        leafInk.strokeStyle = stryMutAct_9fa48("9834") ? "" : (stryCov_9fa48("9834"), '#ecedc569');
        leafInk.lineWidth = 1;
        if (stryMutAct_9fa48("9835")) {
          ;
        } else {
          stryCov_9fa48("9835");
          leafInk.beginPath();
        }
        if (stryMutAct_9fa48("9836")) {
          ;
        } else {
          stryCov_9fa48("9836");
          leafInk.moveTo(64, 0);
        }
        if (stryMutAct_9fa48("9837")) {
          ;
        } else {
          stryCov_9fa48("9837");
          leafInk.lineTo(64, 256);
        }
        for (let y = 16; stryMutAct_9fa48("9840") ? y >= 240 : stryMutAct_9fa48("9839") ? y <= 240 : stryMutAct_9fa48("9838") ? false : (stryCov_9fa48("9838", "9839", "9840"), y < 240); stryMutAct_9fa48("9841") ? y -= 20 : (stryCov_9fa48("9841"), y += 20)) {
          if (stryMutAct_9fa48("9842")) {
            {}
          } else {
            stryCov_9fa48("9842");
            for (const side of stryMutAct_9fa48("9843") ? [] : (stryCov_9fa48("9843"), [stryMutAct_9fa48("9844") ? +1 : (stryCov_9fa48("9844"), -1), 1])) {
              if (stryMutAct_9fa48("9845")) {
                {}
              } else {
                stryCov_9fa48("9845");
                if (stryMutAct_9fa48("9846")) {
                  ;
                } else {
                  stryCov_9fa48("9846");
                  leafInk.moveTo(64, y);
                }
                leafInk.quadraticCurveTo(stryMutAct_9fa48("9848") ? 64 - side * 18 : (stryCov_9fa48("9848"), 64 + (stryMutAct_9fa48("9849") ? side / 18 : (stryCov_9fa48("9849"), side * 18))), stryMutAct_9fa48("9850") ? y + 10 : (stryCov_9fa48("9850"), y - 10), stryMutAct_9fa48("9851") ? 64 - side * 58 : (stryCov_9fa48("9851"), 64 + (stryMutAct_9fa48("9852") ? side / 58 : (stryCov_9fa48("9852"), side * 58))), stryMutAct_9fa48("9853") ? y + 22 : (stryCov_9fa48("9853"), y - 22));
              }
            }
          }
        }
        if (stryMutAct_9fa48("9854")) {
          ;
        } else {
          stryCov_9fa48("9854");
          leafInk.stroke();
        }
        const texture = new THREE.CanvasTexture(leafCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        leaves.map = texture;
        leaves.bumpMap = texture;
        leaves.bumpScale = 0.014;
        if (stryMutAct_9fa48("9855")) {
          ;
        } else {
          stryCov_9fa48("9855");
          textures.add(texture);
        }
      }
    }
    leaves.side = THREE.DoubleSide;
    const stem = material(stryMutAct_9fa48("9856") ? "" : (stryCov_9fa48("9856"), '#516444'), 0.8),
      soil = material(stryMutAct_9fa48("9857") ? "" : (stryCov_9fa48("9857"), '#292a1f'), 1);
    function plant(x: number, z: number, scale: number, base: number) {
      if (stryMutAct_9fa48("9858")) {
        {}
      } else {
        stryCov_9fa48("9858");
        const plant = new THREE.Group();
        if (stryMutAct_9fa48("9859")) {
          ;
        } else {
          stryCov_9fa48("9859");
          plant.position.set(x, base, z);
        }
        if (stryMutAct_9fa48("9860")) {
          ;
        } else {
          stryCov_9fa48("9860");
          plant.scale.setScalar(scale);
        }
        if (stryMutAct_9fa48("9861")) {
          ;
        } else {
          stryCov_9fa48("9861");
          group.add(plant);
        }
        const ceramic = material(stryMutAct_9fa48("9862") ? "" : (stryCov_9fa48("9862"), '#9d9680'), 0.9);
        const profile = stryMutAct_9fa48("9863") ? [] : (stryCov_9fa48("9863"), [new THREE.Vector2(0.8, 0), new THREE.Vector2(0.94, 0.08), new THREE.Vector2(1.12, 1.65), new THREE.Vector2(1.1, 1.73), new THREE.Vector2(1.02, 1.73), new THREE.Vector2(0.9, 0.16)]);
        if (stryMutAct_9fa48("9864")) {
          ;
        } else {
          stryCov_9fa48("9864");
          mesh(new THREE.LatheGeometry(profile, 48), ceramic, plant);
        }
        const top = mesh(new THREE.CircleGeometry(1.04, 40), soil, plant, 0, 1.6, 0);
        top.rotation.x = stryMutAct_9fa48("9865") ? -Math.PI * 2 : (stryCov_9fa48("9865"), (stryMutAct_9fa48("9866") ? +Math.PI : (stryCov_9fa48("9866"), -Math.PI)) / 2);
        const instanced = new THREE.InstancedMesh(leafGeometry, leaves, 22);
        instanced.castShadow = instanced.receiveShadow = stryMutAct_9fa48("9867") ? false : (stryCov_9fa48("9867"), true);
        const crown = new THREE.Group();
        if (stryMutAct_9fa48("9868")) {
          ;
        } else {
          stryCov_9fa48("9868");
          plant.add(crown);
        }
        if (stryMutAct_9fa48("9869")) {
          ;
        } else {
          stryCov_9fa48("9869");
          crown.add(instanced);
        }
        if (stryMutAct_9fa48("9870")) {
          ;
        } else {
          stryCov_9fa48("9870");
          foliage.push(crown);
        }
        const poses: THREE.Object3D[] = stryMutAct_9fa48("9871") ? ["Stryker was here"] : (stryCov_9fa48("9871"), []);
        const transform = new THREE.Object3D();
        for (let i = 0; stryMutAct_9fa48("9874") ? i >= 22 : stryMutAct_9fa48("9873") ? i <= 22 : stryMutAct_9fa48("9872") ? false : (stryCov_9fa48("9872", "9873", "9874"), i < 22); stryMutAct_9fa48("9875") ? i-- : (stryCov_9fa48("9875"), i++)) {
          if (stryMutAct_9fa48("9876")) {
            {}
          } else {
            stryCov_9fa48("9876");
            const angle = stryMutAct_9fa48("9877") ? i / 2.39996 : (stryCov_9fa48("9877"), i * 2.39996),
              radius = stryMutAct_9fa48("9878") ? 0.6 - i % 4 * 0.25 : (stryCov_9fa48("9878"), 0.6 + (stryMutAct_9fa48("9879") ? i % 4 / 0.25 : (stryCov_9fa48("9879"), (stryMutAct_9fa48("9880") ? i * 4 : (stryCov_9fa48("9880"), i % 4)) * 0.25))),
              height = stryMutAct_9fa48("9881") ? 2.2 - i % 7 * 0.42 : (stryCov_9fa48("9881"), 2.2 + (stryMutAct_9fa48("9882") ? i % 7 / 0.42 : (stryCov_9fa48("9882"), (stryMutAct_9fa48("9883") ? i * 7 : (stryCov_9fa48("9883"), i % 7)) * 0.42)));
            const start = new THREE.Vector3(stryMutAct_9fa48("9884") ? Math.cos(angle) / radius : (stryCov_9fa48("9884"), Math.cos(angle) * radius), height, stryMutAct_9fa48("9885") ? Math.sin(angle) / radius : (stryCov_9fa48("9885"), Math.sin(angle) * radius));
            const direction = new THREE.Vector3(stryMutAct_9fa48("9886") ? Math.cos(angle) / 1.3 : (stryCov_9fa48("9886"), Math.cos(angle) * 1.3), stryMutAct_9fa48("9887") ? 0.1 - i % 3 * 0.25 : (stryCov_9fa48("9887"), 0.1 + (stryMutAct_9fa48("9888") ? i % 3 / 0.25 : (stryCov_9fa48("9888"), (stryMutAct_9fa48("9889") ? i * 3 : (stryCov_9fa48("9889"), i % 3)) * 0.25))), stryMutAct_9fa48("9890") ? Math.sin(angle) / 1.3 : (stryCov_9fa48("9890"), Math.sin(angle) * 1.3)).normalize();
            if (stryMutAct_9fa48("9891")) {
              ;
            } else {
              stryCov_9fa48("9891");
              transform.position.copy(start);
            }
            if (stryMutAct_9fa48("9892")) {
              ;
            } else {
              stryCov_9fa48("9892");
              transform.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
            }
            transform.scale.set(stryMutAct_9fa48("9894") ? 1.6 - i % 3 * 0.2 : (stryCov_9fa48("9894"), 1.6 + (stryMutAct_9fa48("9895") ? i % 3 / 0.2 : (stryCov_9fa48("9895"), (stryMutAct_9fa48("9896") ? i * 3 : (stryCov_9fa48("9896"), i % 3)) * 0.2))), stryMutAct_9fa48("9897") ? 1.8 - i % 4 * 0.22 : (stryCov_9fa48("9897"), 1.8 + (stryMutAct_9fa48("9898") ? i % 4 / 0.22 : (stryCov_9fa48("9898"), (stryMutAct_9fa48("9899") ? i * 4 : (stryCov_9fa48("9899"), i % 4)) * 0.22))), 1.7);
            if (stryMutAct_9fa48("9900")) {
              ;
            } else {
              stryCov_9fa48("9900");
              transform.updateMatrix();
            }
            if (stryMutAct_9fa48("9901")) {
              ;
            } else {
              stryCov_9fa48("9901");
              instanced.setMatrixAt(i, transform.matrix);
            }
            if (stryMutAct_9fa48("9902")) {
              ;
            } else {
              stryCov_9fa48("9902");
              poses.push(transform.clone());
            }
            instanced.setColorAt(i, new THREE.Color().setHSL(stryMutAct_9fa48("9904") ? 0.26 - i % 4 * 0.012 : (stryCov_9fa48("9904"), 0.26 + (stryMutAct_9fa48("9905") ? i % 4 / 0.012 : (stryCov_9fa48("9905"), (stryMutAct_9fa48("9906") ? i * 4 : (stryCov_9fa48("9906"), i % 4)) * 0.012))), 0.26, stryMutAct_9fa48("9907") ? 0.075 - i % 5 * 0.018 : (stryCov_9fa48("9907"), 0.075 + (stryMutAct_9fa48("9908") ? i % 5 / 0.018 : (stryCov_9fa48("9908"), (stryMutAct_9fa48("9909") ? i * 5 : (stryCov_9fa48("9909"), i % 5)) * 0.018)))));
            const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(stryMutAct_9fa48("9910") ? start.x / 0.2 : (stryCov_9fa48("9910"), start.x * 0.2), height, stryMutAct_9fa48("9911") ? start.z / 0.2 : (stryCov_9fa48("9911"), start.z * 0.2)), start);
            mesh(new THREE.TubeGeometry(curve, 10, 0.027, 5, stryMutAct_9fa48("9913") ? true : (stryCov_9fa48("9913"), false)), stem, crown);
          }
        }
        flutter.push(stryMutAct_9fa48("9915") ? {} : (stryCov_9fa48("9915"), {
          mesh: instanced,
          poses
        }));
      }
    }
    plant(8, stryMutAct_9fa48("9917") ? +7.3 : (stryCov_9fa48("9917"), -7.3), 0.85, 1.04);
    plant(stryMutAct_9fa48("9919") ? +11 : (stryCov_9fa48("9919"), -11), 5.8, 1.1, stryMutAct_9fa48("9920") ? +0.22 : (stryCov_9fa48("9920"), -0.22));
    const mug = new THREE.Group();
    mug.position.set(stryMutAct_9fa48("9922") ? +11 : (stryCov_9fa48("9922"), -11), stryMutAct_9fa48("9923") ? +0.2 : (stryCov_9fa48("9923"), -0.2), stryMutAct_9fa48("9924") ? +6.4 : (stryCov_9fa48("9924"), -6.4));
    if (stryMutAct_9fa48("9925")) {
      ;
    } else {
      stryCov_9fa48("9925");
      group.add(mug);
    }
    const cup = material(stryMutAct_9fa48("9926") ? "" : (stryCov_9fa48("9926"), '#b6afa0'), 0.36);
    mesh(new THREE.LatheGeometry(stryMutAct_9fa48("9928") ? [] : (stryCov_9fa48("9928"), [new THREE.Vector2(0.88, 0), new THREE.Vector2(1.02, 0.12), new THREE.Vector2(1.08, 1.66), new THREE.Vector2(0.99, 1.71), new THREE.Vector2(0.92, 0.22)]), 48), cup, mug);
    if (stryMutAct_9fa48("9929")) {
      ;
    } else {
      stryCov_9fa48("9929");
      mesh(new THREE.TorusGeometry(0.6, 0.13, 12, 40), cup, mug, 1.14, 0.9, 0);
    }
    const coffee = mesh(new THREE.CircleGeometry(0.99, 40), material(stryMutAct_9fa48("9930") ? "" : (stryCov_9fa48("9930"), '#241910'), 0.22), mug, 0, 1.43, 0);
    coffee.rotation.x = stryMutAct_9fa48("9931") ? -Math.PI * 2 : (stryCov_9fa48("9931"), (stryMutAct_9fa48("9932") ? +Math.PI : (stryCov_9fa48("9932"), -Math.PI)) / 2);
    mesh(new THREE.CylinderGeometry(1.48, 1.48, 0.09, 48), material(stryMutAct_9fa48("9934") ? "" : (stryCov_9fa48("9934"), '#756c54')), mug, 0, 0.02, 0);
    const steamMaterial = new THREE.ShaderMaterial(stryMutAct_9fa48("9935") ? {} : (stryCov_9fa48("9935"), {
      transparent: stryMutAct_9fa48("9936") ? false : (stryCov_9fa48("9936"), true),
      depthWrite: stryMutAct_9fa48("9937") ? true : (stryCov_9fa48("9937"), false),
      side: THREE.DoubleSide,
      uniforms: stryMutAct_9fa48("9938") ? {} : (stryCov_9fa48("9938"), {
        time: stryMutAct_9fa48("9939") ? {} : (stryCov_9fa48("9939"), {
          value: 0
        }),
        phase: stryMutAct_9fa48("9940") ? {} : (stryCov_9fa48("9940"), {
          value: 0
        })
      }),
      vertexShader: stryMutAct_9fa48("9941") ? `` : (stryCov_9fa48("9941"), `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`),
      fragmentShader: stryMutAct_9fa48("9942") ? `` : (stryCov_9fa48("9942"), `
      varying vec2 vUv; uniform float time; uniform float phase;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.0),f.x),f.y);}
      float cloud(vec2 p){return noise(p)*.57+noise(p*2.07)*.28+noise(p*4.13)*.15;}
      void main(){
        float y=vUv.y;
        float drift=.08*sin(y*9.0-time*.45+phase)+.09*y*sin(time*.17+phase);
        float x=vUv.x-.5-drift;
        float width=.035+y*.24;
        float envelope=exp(-x*x/(width*width))*smoothstep(0.0,.09,y)*pow(1.0-y,1.8);
        vec2 flow=vec2(x*13.0+phase,y*7.0-time*.48);
        float detail=cloud(flow+vec2(cloud(flow*.6+time*.08),0.0));
        float alpha=envelope*smoothstep(.28,.72,detail)*.22;
        gl_FragColor=vec4(.82,.86,.79,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`)
    }));
    if (stryMutAct_9fa48("9943")) {
      ;
    } else {
      stryCov_9fa48("9943");
      materials.add(steamMaterial);
    }
    const steam = mesh(new THREE.PlaneGeometry(3.6, 5.2), steamMaterial, mug, 0, 3.95, 0);
    steam.name = stryMutAct_9fa48("9944") ? "" : (stryCov_9fa48("9944"), 'coffee-steam');
    if (stryMutAct_9fa48("9945")) {
      ;
    } else {
      stryCov_9fa48("9945");
      steam.layers.set(1);
    }
    steam.castShadow = steam.receiveShadow = stryMutAct_9fa48("9946") ? true : (stryCov_9fa48("9946"), false);
    const notebook = new THREE.Group();
    notebook.name = stryMutAct_9fa48("9947") ? "" : (stryCov_9fa48("9947"), 'architect-field-notebook');
    notebook.position.set(11.5, stryMutAct_9fa48("9949") ? +0.16 : (stryCov_9fa48("9949"), -0.16), 5.8);
    notebook.rotation.y = stryMutAct_9fa48("9950") ? +0.22 : (stryCov_9fa48("9950"), -0.22);
    if (stryMutAct_9fa48("9951")) {
      ;
    } else {
      stryCov_9fa48("9951");
      group.add(notebook);
    }
    if (stryMutAct_9fa48("9952")) {
      ;
    } else {
      stryCov_9fa48("9952");
      mesh(new RoundedBoxGeometry(9.25, 0.09, 7.02, 3, 0.04), cover, notebook, 0, 0.05, 0);
    }
    for (const side of stryMutAct_9fa48("9953") ? [] : (stryCov_9fa48("9953"), [stryMutAct_9fa48("9954") ? +1 : (stryCov_9fa48("9954"), -1), 1])) {
      if (stryMutAct_9fa48("9955")) {
        {}
      } else {
        stryCov_9fa48("9955");
        mesh(new RoundedBoxGeometry(4.46, 0.22, 6.8, 2, 0.06), paper, notebook, stryMutAct_9fa48("9957") ? side / 2.26 : (stryCov_9fa48("9957"), side * 2.26), 0.17, 0);
        for (let i = 0; stryMutAct_9fa48("9960") ? i >= 7 : stryMutAct_9fa48("9959") ? i <= 7 : stryMutAct_9fa48("9958") ? false : (stryCov_9fa48("9958", "9959", "9960"), i < 7); stryMutAct_9fa48("9961") ? i-- : (stryCov_9fa48("9961"), i++)) mesh(new THREE.BoxGeometry(4.44, 0.008, 6.79), paper, notebook, stryMutAct_9fa48("9963") ? side / 2.26 : (stryCov_9fa48("9963"), side * 2.26), stryMutAct_9fa48("9964") ? 0.085 - i * 0.027 : (stryCov_9fa48("9964"), 0.085 + (stryMutAct_9fa48("9965") ? i / 0.027 : (stryCov_9fa48("9965"), i * 0.027))), 0);
      }
    }
    const pageGeometry = new THREE.PlaneGeometry(9, 6.75, 72, 12);
    const vertices = pageGeometry.getAttribute(stryMutAct_9fa48("9966") ? "" : (stryCov_9fa48("9966"), 'position'));
    for (let i = 0; stryMutAct_9fa48("9969") ? i >= vertices.count : stryMutAct_9fa48("9968") ? i <= vertices.count : stryMutAct_9fa48("9967") ? false : (stryCov_9fa48("9967", "9968", "9969"), i < vertices.count); stryMutAct_9fa48("9970") ? i-- : (stryCov_9fa48("9970"), i++)) {
      if (stryMutAct_9fa48("9971")) {
        {}
      } else {
        stryCov_9fa48("9971");
        const x = vertices.getX(i),
          z = vertices.getY(i);
        vertices.setXYZ(i, x, stryMutAct_9fa48("9973") ? 0.32 + 0.17 * Math.sin(Math.abs(x) / 4.5 * Math.PI) + 0.1 * Math.exp(-x * x * 15) : (stryCov_9fa48("9973"), (stryMutAct_9fa48("9974") ? 0.32 - 0.17 * Math.sin(Math.abs(x) / 4.5 * Math.PI) : (stryCov_9fa48("9974"), 0.32 + (stryMutAct_9fa48("9975") ? 0.17 / Math.sin(Math.abs(x) / 4.5 * Math.PI) : (stryCov_9fa48("9975"), 0.17 * Math.sin(stryMutAct_9fa48("9976") ? Math.abs(x) / 4.5 / Math.PI : (stryCov_9fa48("9976"), (stryMutAct_9fa48("9977") ? Math.abs(x) * 4.5 : (stryCov_9fa48("9977"), Math.abs(x) / 4.5)) * Math.PI)))))) - (stryMutAct_9fa48("9978") ? 0.1 / Math.exp(-x * x * 15) : (stryCov_9fa48("9978"), 0.1 * Math.exp(stryMutAct_9fa48("9979") ? -x * x / 15 : (stryCov_9fa48("9979"), (stryMutAct_9fa48("9980") ? -x / x : (stryCov_9fa48("9980"), (stryMutAct_9fa48("9981") ? +x : (stryCov_9fa48("9981"), -x)) * x)) * 15))))), stryMutAct_9fa48("9982") ? +z : (stryCov_9fa48("9982"), -z));
      }
    }
    if (stryMutAct_9fa48("9983")) {
      ;
    } else {
      stryCov_9fa48("9983");
      pageGeometry.computeVertexNormals();
    }
    const illustration = material(stryMutAct_9fa48("9984") ? "" : (stryCov_9fa48("9984"), '#ffffff'), 0.93);
    const pages = mesh(pageGeometry, illustration, notebook);
    pages.name = stryMutAct_9fa48("9985") ? "" : (stryCov_9fa48("9985"), 'sketchbook-illustration');
    new THREE.TextureLoader().load(new URL(stryMutAct_9fa48("9987") ? "" : (stryCov_9fa48("9987"), 'textures/solarpunk-sketchbook.png'), document.baseURI).href, texture => {
      if (stryMutAct_9fa48("9988")) {
        {}
      } else {
        stryCov_9fa48("9988");
        if (stryMutAct_9fa48("9990") ? false : stryMutAct_9fa48("9989") ? true : (stryCov_9fa48("9989", "9990"), disposed)) {
          if (stryMutAct_9fa48("9991")) {
            {}
          } else {
            stryCov_9fa48("9991");
            if (stryMutAct_9fa48("9992")) {
              ;
            } else {
              stryCov_9fa48("9992");
              texture.dispose();
            }
            return;
          }
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        if (stryMutAct_9fa48("9993")) {
          ;
        } else {
          stryCov_9fa48("9993");
          textures.add(texture);
        }
        illustration.map = texture;
        illustration.needsUpdate = stryMutAct_9fa48("9994") ? false : (stryCov_9fa48("9994"), true);
        if (stryMutAct_9fa48("9995")) {
          ;
        } else {
          stryCov_9fa48("9995");
          invalidate();
        }
      }
    });
    const ribbon = mesh(new THREE.BoxGeometry(0.16, 0.015, 2.1), material(stryMutAct_9fa48("9996") ? "" : (stryCov_9fa48("9996"), '#958356'), 0.96), notebook, 0.13, 0.07, 3.9);
    ribbon.rotation.y = 0.14;
    const graphite = material(stryMutAct_9fa48("9997") ? "" : (stryCov_9fa48("9997"), '#202822'), 0.34, 0.55),
      steel = material(stryMutAct_9fa48("9998") ? "" : (stryCov_9fa48("9998"), '#b9bbb0'), 0.29, 0.88);
    function pencil(parent: THREE.Object3D, x: number, z: number, angle: number, color: string) {
      if (stryMutAct_9fa48("9999")) {
        {}
      } else {
        stryCov_9fa48("9999");
        const pencil = new THREE.Group();
        pencil.name = stryMutAct_9fa48("10000") ? "" : (stryCov_9fa48("10000"), 'precision-mechanical-pencil');
        if (stryMutAct_9fa48("10001")) {
          ;
        } else {
          stryCov_9fa48("10001");
          pencil.position.set(x, 0.59, z);
        }
        pencil.rotation.set(stryMutAct_9fa48("10003") ? Math.PI * 2 : (stryCov_9fa48("10003"), Math.PI / 2), 0, angle);
        if (stryMutAct_9fa48("10004")) {
          ;
        } else {
          stryCov_9fa48("10004");
          parent.add(pencil);
        }
        const barrel = material(color, 0.34, 0.72);
        if (stryMutAct_9fa48("10005")) {
          ;
        } else {
          stryCov_9fa48("10005");
          mesh(new THREE.CylinderGeometry(0.115, 0.115, 3.55, 6), barrel, pencil, 0, 0.7, 0);
        }
        mesh(new THREE.CylinderGeometry(0.128, 0.128, 1.45, 32), steel, pencil, 0, stryMutAct_9fa48("10007") ? +1.83 : (stryCov_9fa48("10007"), -1.83), 0);
        // Crossed grip cuts are real geometry, so highlights survive a close view.
        const knurlGeometry = new THREE.TorusGeometry(0.129, 0.008, 3, 24);
        const grip = new THREE.InstancedMesh(knurlGeometry, graphite, 28);
        if (stryMutAct_9fa48("10008")) {
          ;
        } else {
          stryCov_9fa48("10008");
          geometries.add(knurlGeometry);
        }
        const pose = new THREE.Object3D();
        for (let i = 0; stryMutAct_9fa48("10011") ? i >= 28 : stryMutAct_9fa48("10010") ? i <= 28 : stryMutAct_9fa48("10009") ? false : (stryCov_9fa48("10009", "10010", "10011"), i < 28); stryMutAct_9fa48("10012") ? i-- : (stryCov_9fa48("10012"), i++)) {
          if (stryMutAct_9fa48("10013")) {
            {}
          } else {
            stryCov_9fa48("10013");
            pose.position.y = stryMutAct_9fa48("10014") ? -2.5 - i * 0.05 : (stryCov_9fa48("10014"), (stryMutAct_9fa48("10015") ? +2.5 : (stryCov_9fa48("10015"), -2.5)) + (stryMutAct_9fa48("10016") ? i / 0.05 : (stryCov_9fa48("10016"), i * 0.05)));
            pose.rotation.set(stryMutAct_9fa48("10018") ? Math.PI * 2 : (stryCov_9fa48("10018"), Math.PI / 2), (stryMutAct_9fa48("10019") ? i * 2 : (stryCov_9fa48("10019"), i % 2)) ? 0.12 : stryMutAct_9fa48("10020") ? +0.12 : (stryCov_9fa48("10020"), -0.12), 0);
            if (stryMutAct_9fa48("10021")) {
              ;
            } else {
              stryCov_9fa48("10021");
              pose.updateMatrix();
            }
            if (stryMutAct_9fa48("10022")) {
              ;
            } else {
              stryCov_9fa48("10022");
              grip.setMatrixAt(i, pose.matrix);
            }
          }
        }
        if (stryMutAct_9fa48("10023")) {
          ;
        } else {
          stryCov_9fa48("10023");
          pencil.add(grip);
        }
        mesh(new THREE.CylinderGeometry(0.115, 0.035, 0.42, 24), steel, pencil, 0, stryMutAct_9fa48("10025") ? +2.76 : (stryCov_9fa48("10025"), -2.76), 0);
        mesh(new THREE.CylinderGeometry(0.027, 0.027, 0.32, 16), steel, pencil, 0, stryMutAct_9fa48("10027") ? +3.12 : (stryCov_9fa48("10027"), -3.12), 0);
        mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 8), graphite, pencil, 0, stryMutAct_9fa48("10029") ? +3.35 : (stryCov_9fa48("10029"), -3.35), 0);
        if (stryMutAct_9fa48("10030")) {
          ;
        } else {
          stryCov_9fa48("10030");
          mesh(new THREE.CylinderGeometry(0.137, 0.137, 0.17, 24), steel, pencil, 0, 2.55, 0);
        }
        if (stryMutAct_9fa48("10031")) {
          ;
        } else {
          stryCov_9fa48("10031");
          mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.34, 24), barrel, pencil, 0, 2.77, 0);
        }
        if (stryMutAct_9fa48("10032")) {
          ;
        } else {
          stryCov_9fa48("10032");
          mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.08, 24), steel, pencil, 0, 2.97, 0);
        }
        const clipCurve = new THREE.CatmullRomCurve3(stryMutAct_9fa48("10033") ? [] : (stryCov_9fa48("10033"), [new THREE.Vector3(0.1, 2.57, 0), new THREE.Vector3(0.2, 2.47, 0), new THREE.Vector3(0.21, 1.38, 0), new THREE.Vector3(0.15, 1.26, 0)]));
        mesh(new THREE.TubeGeometry(clipCurve, 18, 0.025, 7, stryMutAct_9fa48("10035") ? true : (stryCov_9fa48("10035"), false)), steel, pencil);
      }
    }
    pencil(notebook, 3.65, 0.35, 0.13, stryMutAct_9fa48("10037") ? "" : (stryCov_9fa48("10037"), '#4c6054'));
    pencil(group, 8.9, 6.75, stryMutAct_9fa48("10039") ? +0.32 : (stryCov_9fa48("10039"), -0.32), stryMutAct_9fa48("10040") ? "" : (stryCov_9fa48("10040"), '#b79b61'));
    const ruler = new THREE.Group();
    ruler.position.set(11.5, stryMutAct_9fa48("10042") ? +0.12 : (stryCov_9fa48("10042"), -0.12), stryMutAct_9fa48("10043") ? +0.5 : (stryCov_9fa48("10043"), -0.5));
    ruler.rotation.y = stryMutAct_9fa48("10044") ? +0.08 : (stryCov_9fa48("10044"), -0.08);
    if (stryMutAct_9fa48("10045")) {
      ;
    } else {
      stryCov_9fa48("10045");
      group.add(ruler);
    }
    if (stryMutAct_9fa48("10046")) {
      ;
    } else {
      stryCov_9fa48("10046");
      mesh(new THREE.BoxGeometry(7, 0.08, 0.55), brass, ruler);
    }
    for (let i = 0; stryMutAct_9fa48("10049") ? i >= 55 : stryMutAct_9fa48("10048") ? i <= 55 : stryMutAct_9fa48("10047") ? false : (stryCov_9fa48("10047", "10048", "10049"), i < 55); stryMutAct_9fa48("10050") ? i-- : (stryCov_9fa48("10050"), i++)) mesh(new THREE.BoxGeometry(0.012, 0.004, (stryMutAct_9fa48("10054") ? i % 5 !== 0 : stryMutAct_9fa48("10053") ? false : stryMutAct_9fa48("10052") ? true : (stryCov_9fa48("10052", "10053", "10054"), (stryMutAct_9fa48("10055") ? i * 5 : (stryCov_9fa48("10055"), i % 5)) === 0)) ? 0.38 : 0.2), graphite, ruler, stryMutAct_9fa48("10056") ? -3.2 - i * 0.117 : (stryCov_9fa48("10056"), (stryMutAct_9fa48("10057") ? +3.2 : (stryCov_9fa48("10057"), -3.2)) + (stryMutAct_9fa48("10058") ? i / 0.117 : (stryCov_9fa48("10058"), i * 0.117))), 0.044, 0.06);
    const monitor = new THREE.Group();
    monitor.name = stryMutAct_9fa48("10059") ? "" : (stryCov_9fa48("10059"), 'solarpunk-monitor');
    monitor.position.set(0, stryMutAct_9fa48("10061") ? +0.2 : (stryCov_9fa48("10061"), -0.2), stryMutAct_9fa48("10062") ? +10.5 : (stryCov_9fa48("10062"), -10.5));
    if (stryMutAct_9fa48("10063")) {
      ;
    } else {
      stryCov_9fa48("10063");
      group.add(monitor);
    }
    if (stryMutAct_9fa48("10064")) {
      ;
    } else {
      stryCov_9fa48("10064");
      mesh(new RoundedBoxGeometry(6, 0.25, 3.5, 3, 0.12), graphite, monitor, 0, 0.14, 0.8);
    }
    mesh(new RoundedBoxGeometry(1.2, 4.5, 0.7, 3, 0.18), brass, monitor, 0, 2.4, stryMutAct_9fa48("10066") ? +0.15 : (stryCov_9fa48("10066"), -0.15));
    if (stryMutAct_9fa48("10067")) {
      ;
    } else {
      stryCov_9fa48("10067");
      mesh(new RoundedBoxGeometry(20, 12, 0.62, 4, 0.25), graphite, monitor, 0, 9, 0);
    }
    if (stryMutAct_9fa48("10068")) {
      ;
    } else {
      stryCov_9fa48("10068");
      mesh(new RoundedBoxGeometry(20.06, 0.32, 0.67, 3, 0.1), wood, monitor, 0, 3.15, 0);
    }
    const idleCanvas = document.createElement(stryMutAct_9fa48("10069") ? "" : (stryCov_9fa48("10069"), 'canvas'));
    idleCanvas.width = 1600;
    idleCanvas.height = 900;
    const idle = idleCanvas.getContext(stryMutAct_9fa48("10070") ? "" : (stryCov_9fa48("10070"), '2d'));
    if (stryMutAct_9fa48("10072") ? false : stryMutAct_9fa48("10071") ? true : (stryCov_9fa48("10071", "10072"), idle)) {
      if (stryMutAct_9fa48("10073")) {
        {}
      } else {
        stryCov_9fa48("10073");
        idle.fillStyle = stryMutAct_9fa48("10074") ? "" : (stryCov_9fa48("10074"), '#14221c');
        if (stryMutAct_9fa48("10075")) {
          ;
        } else {
          stryCov_9fa48("10075");
          idle.fillRect(0, 0, 1600, 900);
        }
        const glow = idle.createRadialGradient(1050, 250, 0, 900, 340, 850);
        glow.addColorStop(0, stryMutAct_9fa48("10077") ? "" : (stryCov_9fa48("10077"), '#2e5140'));
        glow.addColorStop(1, stryMutAct_9fa48("10079") ? "" : (stryCov_9fa48("10079"), '#13201b'));
        idle.fillStyle = glow;
        if (stryMutAct_9fa48("10080")) {
          ;
        } else {
          stryCov_9fa48("10080");
          idle.fillRect(0, 0, 1600, 900);
        }
      }
    }
    const idleTexture = new THREE.CanvasTexture(idleCanvas);
    idleTexture.colorSpace = THREE.SRGBColorSpace;
    if (stryMutAct_9fa48("10081")) {
      ;
    } else {
      stryCov_9fa48("10081");
      textures.add(idleTexture);
    }
    const screenMaterial = new THREE.MeshBasicMaterial(stryMutAct_9fa48("10082") ? {} : (stryCov_9fa48("10082"), {
      map: idleTexture,
      toneMapped: stryMutAct_9fa48("10083") ? true : (stryCov_9fa48("10083"), false)
    }));
    if (stryMutAct_9fa48("10084")) {
      ;
    } else {
      stryCov_9fa48("10084");
      materials.add(screenMaterial);
    }
    const screen = mesh(new THREE.PlaneGeometry(19.12, 10.82), screenMaterial, monitor, 0, 9, 0.322);
    screen.name = stryMutAct_9fa48("10085") ? "" : (stryCov_9fa48("10085"), 'monitor-screen');
    screen.castShadow = screen.receiveShadow = stryMutAct_9fa48("10086") ? true : (stryCov_9fa48("10086"), false);
    mesh(new THREE.SphereGeometry(0.045, 8, 6), material(stryMutAct_9fa48("10088") ? "" : (stryCov_9fa48("10088"), '#b4cdb2'), 0.4), monitor, 9.25, 3.2, 0.35);
    for (let i = 0; stryMutAct_9fa48("10091") ? i >= 16 : stryMutAct_9fa48("10090") ? i <= 16 : stryMutAct_9fa48("10089") ? false : (stryCov_9fa48("10089", "10090", "10091"), i < 16); stryMutAct_9fa48("10092") ? i-- : (stryCov_9fa48("10092"), i++)) mesh(new THREE.BoxGeometry(0.35, 0.045, 0.08), brass, monitor, stryMutAct_9fa48("10094") ? -3.75 - i * 0.5 : (stryCov_9fa48("10094"), (stryMutAct_9fa48("10095") ? +3.75 : (stryCov_9fa48("10095"), -3.75)) + (stryMutAct_9fa48("10096") ? i / 0.5 : (stryCov_9fa48("10096"), i * 0.5))), 3.16, 0.36);
    const lamp = new THREE.Group();
    lamp.position.set(stryMutAct_9fa48("10098") ? +14 : (stryCov_9fa48("10098"), -14), stryMutAct_9fa48("10099") ? +0.2 : (stryCov_9fa48("10099"), -0.2), stryMutAct_9fa48("10100") ? +11 : (stryCov_9fa48("10100"), -11));
    if (stryMutAct_9fa48("10101")) {
      ;
    } else {
      stryCov_9fa48("10101");
      group.add(lamp);
    }
    if (stryMutAct_9fa48("10102")) {
      ;
    } else {
      stryCov_9fa48("10102");
      mesh(new THREE.CylinderGeometry(1.6, 1.75, 0.22, 48), graphite, lamp, 0, 0.12, 0);
    }
    const arm = new THREE.CatmullRomCurve3(stryMutAct_9fa48("10103") ? [] : (stryCov_9fa48("10103"), [new THREE.Vector3(0, 0.2, 0), new THREE.Vector3(stryMutAct_9fa48("10104") ? +0.3 : (stryCov_9fa48("10104"), -0.3), 5.6, 0), new THREE.Vector3(1.6, 8.6, 0), new THREE.Vector3(3.4, 8.2, 0.5)]));
    mesh(new THREE.TubeGeometry(arm, 40, 0.095, 12, stryMutAct_9fa48("10106") ? true : (stryCov_9fa48("10106"), false)), brass, lamp);
    const shade = mesh(new THREE.ConeGeometry(1.5, 1.2, 48, 1, stryMutAct_9fa48("10107") ? false : (stryCov_9fa48("10107"), true)), graphite, lamp, 3.4, 7.9, 0.5);
    shade.rotation.z = stryMutAct_9fa48("10108") ? +0.12 : (stryCov_9fa48("10108"), -0.12);
    const diffuser = mesh(new THREE.CircleGeometry(1.43, 48), new THREE.MeshBasicMaterial(stryMutAct_9fa48("10109") ? {} : (stryCov_9fa48("10109"), {
      color: stryMutAct_9fa48("10110") ? "" : (stryCov_9fa48("10110"), '#f0d7a2')
    })), lamp, 3.4, 7.32, 0.5);
    if (stryMutAct_9fa48("10111")) {
      ;
    } else {
      stryCov_9fa48("10111");
      materials.add(diffuser.material);
    }
    diffuser.rotation.x = stryMutAct_9fa48("10112") ? -Math.PI * 2 : (stryCov_9fa48("10112"), (stryMutAct_9fa48("10113") ? +Math.PI : (stryCov_9fa48("10113"), -Math.PI)) / 2);
    const lampLight = new THREE.PointLight(stryMutAct_9fa48("10114") ? "" : (stryCov_9fa48("10114"), '#ffddb0'), 16, 18, 2);
    lampLight.position.set(stryMutAct_9fa48("10116") ? +10.6 : (stryCov_9fa48("10116"), -10.6), 6.8, stryMutAct_9fa48("10117") ? +10.5 : (stryCov_9fa48("10117"), -10.5));
    if (stryMutAct_9fa48("10118")) {
      ;
    } else {
      stryCov_9fa48("10118");
      group.add(lampLight);
    }
    const headphoneStand = new THREE.Group();
    headphoneStand.position.set(15, stryMutAct_9fa48("10120") ? +0.2 : (stryCov_9fa48("10120"), -0.2), stryMutAct_9fa48("10121") ? +10.7 : (stryCov_9fa48("10121"), -10.7));
    headphoneStand.rotation.y = stryMutAct_9fa48("10122") ? +0.35 : (stryCov_9fa48("10122"), -0.35);
    if (stryMutAct_9fa48("10123")) {
      ;
    } else {
      stryCov_9fa48("10123");
      group.add(headphoneStand);
    }
    if (stryMutAct_9fa48("10124")) {
      ;
    } else {
      stryCov_9fa48("10124");
      mesh(new RoundedBoxGeometry(3, 0.2, 2.8, 3, 0.1), wood, headphoneStand, 0, 0.15, 0);
    }
    if (stryMutAct_9fa48("10125")) {
      ;
    } else {
      stryCov_9fa48("10125");
      mesh(new RoundedBoxGeometry(0.48, 5, 0.5, 2, 0.1), brass, headphoneStand, 0, 2.7, 0);
    }
    if (stryMutAct_9fa48("10126")) {
      ;
    } else {
      stryCov_9fa48("10126");
      mesh(new RoundedBoxGeometry(2, 0.35, 1.4, 3, 0.16), wood, headphoneStand, 0, 5.3, 0);
    }
    const band = new THREE.EllipseCurve(0, 3.65, 2.04, 2.02, 0, Math.PI, stryMutAct_9fa48("10127") ? true : (stryCov_9fa48("10127"), false), 0).getPoints(40).map(stryMutAct_9fa48("10128") ? () => undefined : (stryCov_9fa48("10128"), p => new THREE.Vector3(p.x, p.y, 0.1)));
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(band), 40, 0.22, 10, stryMutAct_9fa48("10130") ? true : (stryCov_9fa48("10130"), false)), graphite, headphoneStand);
    for (const side of stryMutAct_9fa48("10131") ? [] : (stryCov_9fa48("10131"), [stryMutAct_9fa48("10132") ? +1 : (stryCov_9fa48("10132"), -1), 1])) {
      if (stryMutAct_9fa48("10133")) {
        {}
      } else {
        stryCov_9fa48("10133");
        const cupGroup = new THREE.Group();
        cupGroup.position.set(stryMutAct_9fa48("10135") ? side / 1.97 : (stryCov_9fa48("10135"), side * 1.97), 3.45, 0.1);
        cupGroup.rotation.z = stryMutAct_9fa48("10136") ? side / 0.1 : (stryCov_9fa48("10136"), side * 0.1);
        if (stryMutAct_9fa48("10137")) {
          ;
        } else {
          stryCov_9fa48("10137");
          headphoneStand.add(cupGroup);
        }
        const ear = mesh(new THREE.CylinderGeometry(1, 1, 0.5, 48), steel, cupGroup);
        ear.rotation.z = stryMutAct_9fa48("10138") ? Math.PI * 2 : (stryCov_9fa48("10138"), Math.PI / 2);
        const cushion = mesh(new THREE.TorusGeometry(0.78, 0.21, 12, 48), graphite, cupGroup, stryMutAct_9fa48("10139") ? -side / 0.37 : (stryCov_9fa48("10139"), (stryMutAct_9fa48("10140") ? +side : (stryCov_9fa48("10140"), -side)) * 0.37), 0, 0);
        cushion.rotation.y = stryMutAct_9fa48("10141") ? Math.PI * 2 : (stryCov_9fa48("10141"), Math.PI / 2);
        for (let i = 0; stryMutAct_9fa48("10144") ? i >= 6 : stryMutAct_9fa48("10143") ? i <= 6 : stryMutAct_9fa48("10142") ? false : (stryCov_9fa48("10142", "10143", "10144"), i < 6); stryMutAct_9fa48("10145") ? i-- : (stryCov_9fa48("10145"), i++)) {
          if (stryMutAct_9fa48("10146")) {
            {}
          } else {
            stryCov_9fa48("10146");
            const ring = mesh(new THREE.TorusGeometry(stryMutAct_9fa48("10147") ? 0.22 - i * 0.11 : (stryCov_9fa48("10147"), 0.22 + (stryMutAct_9fa48("10148") ? i / 0.11 : (stryCov_9fa48("10148"), i * 0.11))), 0.014, 4, 40), graphite, cupGroup, stryMutAct_9fa48("10149") ? side / 0.265 : (stryCov_9fa48("10149"), side * 0.265), 0, 0);
            ring.rotation.y = stryMutAct_9fa48("10150") ? Math.PI * 2 : (stryCov_9fa48("10150"), Math.PI / 2);
          }
        }
      }
    }

    // A sunroom beyond the desk gives the workbench a believable setting.
    const plaster = material(stryMutAct_9fa48("10151") ? "" : (stryCov_9fa48("10151"), '#364639'), 0.98),
      timber = material(stryMutAct_9fa48("10152") ? "" : (stryCov_9fa48("10152"), '#86775b'), 0.81);
    mesh(new THREE.BoxGeometry(150, 160, 0.5), plaster, group, 0, stryMutAct_9fa48("10154") ? +2 : (stryCov_9fa48("10154"), -2), stryMutAct_9fa48("10155") ? +25 : (stryCov_9fa48("10155"), -25));
    const windowGlass = new THREE.MeshBasicMaterial(stryMutAct_9fa48("10156") ? {} : (stryCov_9fa48("10156"), {
      color: stryMutAct_9fa48("10157") ? "" : (stryCov_9fa48("10157"), '#80987d'),
      transparent: stryMutAct_9fa48("10158") ? false : (stryCov_9fa48("10158"), true),
      opacity: 0.56
    }));
    if (stryMutAct_9fa48("10159")) {
      ;
    } else {
      stryCov_9fa48("10159");
      materials.add(windowGlass);
    }
    new THREE.TextureLoader().load(new URL(stryMutAct_9fa48("10161") ? "" : (stryCov_9fa48("10161"), 'textures/solarpunk-window-garden.png'), document.baseURI).href, texture => {
      if (stryMutAct_9fa48("10162")) {
        {}
      } else {
        stryCov_9fa48("10162");
        if (stryMutAct_9fa48("10164") ? false : stryMutAct_9fa48("10163") ? true : (stryCov_9fa48("10163", "10164"), disposed)) {
          if (stryMutAct_9fa48("10165")) {
            {}
          } else {
            stryCov_9fa48("10165");
            if (stryMutAct_9fa48("10166")) {
              ;
            } else {
              stryCov_9fa48("10166");
              texture.dispose();
            }
            return;
          }
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        if (stryMutAct_9fa48("10167")) {
          ;
        } else {
          stryCov_9fa48("10167");
          textures.add(texture);
        }
        windowGlass.map = texture;
        windowGlass.color.set(stryMutAct_9fa48("10169") ? "" : (stryCov_9fa48("10169"), '#dde1cb'));
        windowGlass.opacity = 0.9;
        windowGlass.needsUpdate = stryMutAct_9fa48("10170") ? false : (stryCov_9fa48("10170"), true);
        if (stryMutAct_9fa48("10171")) {
          ;
        } else {
          stryCov_9fa48("10171");
          invalidate();
        }
      }
    });
    mesh(new THREE.PlaneGeometry(38, 25), windowGlass, group, stryMutAct_9fa48("10173") ? +8 : (stryCov_9fa48("10173"), -8), 11, stryMutAct_9fa48("10174") ? +24.68 : (stryCov_9fa48("10174"), -24.68));
    for (let i = 0; stryMutAct_9fa48("10177") ? i >= 6 : stryMutAct_9fa48("10176") ? i <= 6 : stryMutAct_9fa48("10175") ? false : (stryCov_9fa48("10175", "10176", "10177"), i < 6); stryMutAct_9fa48("10178") ? i-- : (stryCov_9fa48("10178"), i++)) mesh(new THREE.BoxGeometry(0.22, 25, 0.32), timber, group, stryMutAct_9fa48("10180") ? -27 - i * 7.6 : (stryCov_9fa48("10180"), (stryMutAct_9fa48("10181") ? +27 : (stryCov_9fa48("10181"), -27)) + (stryMutAct_9fa48("10182") ? i / 7.6 : (stryCov_9fa48("10182"), i * 7.6))), 11, stryMutAct_9fa48("10183") ? +24.3 : (stryCov_9fa48("10183"), -24.3));
    for (const y of stryMutAct_9fa48("10184") ? [] : (stryCov_9fa48("10184"), [stryMutAct_9fa48("10185") ? +1.5 : (stryCov_9fa48("10185"), -1.5), 11, 23.5])) mesh(new THREE.BoxGeometry(38, 0.2, 0.32), timber, group, stryMutAct_9fa48("10187") ? +8 : (stryCov_9fa48("10187"), -8), y, stryMutAct_9fa48("10188") ? +24.3 : (stryCov_9fa48("10188"), -24.3));
    for (let i = 0; stryMutAct_9fa48("10191") ? i >= 9 : stryMutAct_9fa48("10190") ? i <= 9 : stryMutAct_9fa48("10189") ? false : (stryCov_9fa48("10189", "10190", "10191"), i < 9); stryMutAct_9fa48("10192") ? i-- : (stryCov_9fa48("10192"), i++)) {
      if (stryMutAct_9fa48("10193")) {
        {}
      } else {
        stryCov_9fa48("10193");
        const louver = mesh(new THREE.BoxGeometry(38, 0.13, 1.2), timber, group, stryMutAct_9fa48("10194") ? +8 : (stryCov_9fa48("10194"), -8), stryMutAct_9fa48("10195") ? 16 - i * 0.85 : (stryCov_9fa48("10195"), 16 + (stryMutAct_9fa48("10196") ? i / 0.85 : (stryCov_9fa48("10196"), i * 0.85))), stryMutAct_9fa48("10197") ? +24.1 : (stryCov_9fa48("10197"), -24.1));
        louver.rotation.x = 0.3;
      }
    }
    mesh(new THREE.BoxGeometry(38, 0.35, 3), wood, group, stryMutAct_9fa48("10199") ? +8 : (stryCov_9fa48("10199"), -8), stryMutAct_9fa48("10200") ? +1.3 : (stryCov_9fa48("10200"), -1.3), stryMutAct_9fa48("10201") ? +23.6 : (stryCov_9fa48("10201"), -23.6));
    plant(stryMutAct_9fa48("10203") ? +20 : (stryCov_9fa48("10203"), -20), stryMutAct_9fa48("10204") ? +20 : (stryCov_9fa48("10204"), -20), 1.9, stryMutAct_9fa48("10205") ? +1.15 : (stryCov_9fa48("10205"), -1.15));
    plant(10, stryMutAct_9fa48("10207") ? +20 : (stryCov_9fa48("10207"), -20), 1.35, stryMutAct_9fa48("10208") ? +1.15 : (stryCov_9fa48("10208"), -1.15));
    mesh(new THREE.BoxGeometry(9, 0.3, 2.8), wood, group, 18, 11, stryMutAct_9fa48("10210") ? +23 : (stryCov_9fa48("10210"), -23));
    for (let i = 0; stryMutAct_9fa48("10213") ? i >= 6 : stryMutAct_9fa48("10212") ? i <= 6 : stryMutAct_9fa48("10211") ? false : (stryCov_9fa48("10211", "10212", "10213"), i < 6); stryMutAct_9fa48("10214") ? i-- : (stryCov_9fa48("10214"), i++)) {
      if (stryMutAct_9fa48("10215")) {
        {}
      } else {
        stryCov_9fa48("10215");
        const volume = mesh(new RoundedBoxGeometry(0.6, stryMutAct_9fa48("10216") ? 2.2 - i % 3 * 0.3 : (stryCov_9fa48("10216"), 2.2 + (stryMutAct_9fa48("10217") ? i % 3 / 0.3 : (stryCov_9fa48("10217"), (stryMutAct_9fa48("10218") ? i * 3 : (stryCov_9fa48("10218"), i % 3)) * 0.3))), 1.5, 2, 0.04), (stryMutAct_9fa48("10219") ? i * 2 : (stryCov_9fa48("10219"), i % 2)) ? cover : paper, group, stryMutAct_9fa48("10220") ? 15.4 - i * 0.68 : (stryCov_9fa48("10220"), 15.4 + (stryMutAct_9fa48("10221") ? i / 0.68 : (stryCov_9fa48("10221"), i * 0.68))), 12.3, stryMutAct_9fa48("10222") ? +23 : (stryCov_9fa48("10222"), -23));
        volume.rotation.z = (stryMutAct_9fa48("10225") ? i !== 5 : stryMutAct_9fa48("10224") ? false : stryMutAct_9fa48("10223") ? true : (stryCov_9fa48("10223", "10224", "10225"), i === 5)) ? stryMutAct_9fa48("10226") ? +0.15 : (stryCov_9fa48("10226"), -0.15) : 0;
      }
    }
    const transform = new THREE.Object3D();
    return stryMutAct_9fa48("10227") ? {} : (stryCov_9fa48("10227"), {
      group,
      monitor,
      screen,
      updateAmbient(time: number, camera: THREE.Camera) {
        if (stryMutAct_9fa48("10228")) {
          {}
        } else {
          stryCov_9fa48("10228");
          foliage.forEach((crown, i) => {
            if (stryMutAct_9fa48("10230")) {
              {}
            } else {
              stryCov_9fa48("10230");
              crown.rotation.z = stryMutAct_9fa48("10231") ? Math.sin(time * 0.37 + i * 1.9) / 0.009 : (stryCov_9fa48("10231"), Math.sin(stryMutAct_9fa48("10232") ? time * 0.37 - i * 1.9 : (stryCov_9fa48("10232"), (stryMutAct_9fa48("10233") ? time / 0.37 : (stryCov_9fa48("10233"), time * 0.37)) + (stryMutAct_9fa48("10234") ? i / 1.9 : (stryCov_9fa48("10234"), i * 1.9)))) * 0.009);
              crown.rotation.x = stryMutAct_9fa48("10235") ? Math.sin(time * 0.29 + i) / 0.006 : (stryCov_9fa48("10235"), Math.sin(stryMutAct_9fa48("10236") ? time * 0.29 - i : (stryCov_9fa48("10236"), (stryMutAct_9fa48("10237") ? time / 0.29 : (stryCov_9fa48("10237"), time * 0.29)) + i)) * 0.006);
            }
          });
          flutter.forEach(({
            mesh,
            poses
          }, plantIndex) => {
            if (stryMutAct_9fa48("10239")) {
              {}
            } else {
              stryCov_9fa48("10239");
              poses.forEach((pose, i) => {
                if (stryMutAct_9fa48("10241")) {
                  {}
                } else {
                  stryCov_9fa48("10241");
                  if (stryMutAct_9fa48("10242")) {
                    ;
                  } else {
                    stryCov_9fa48("10242");
                    transform.position.copy(pose.position);
                  }
                  if (stryMutAct_9fa48("10243")) {
                    ;
                  } else {
                    stryCov_9fa48("10243");
                    transform.scale.copy(pose.scale);
                  }
                  if (stryMutAct_9fa48("10244")) {
                    ;
                  } else {
                    stryCov_9fa48("10244");
                    transform.quaternion.copy(pose.quaternion);
                  }
                  transform.rotateX(stryMutAct_9fa48("10246") ? Math.sin(time * 0.85 + i * 0.7 + plantIndex) * 0.019 - Math.sin(time * 1.9 + i) * 0.004 : (stryCov_9fa48("10246"), (stryMutAct_9fa48("10247") ? Math.sin(time * 0.85 + i * 0.7 + plantIndex) / 0.019 : (stryCov_9fa48("10247"), Math.sin(stryMutAct_9fa48("10248") ? time * 0.85 + i * 0.7 - plantIndex : (stryCov_9fa48("10248"), (stryMutAct_9fa48("10249") ? time * 0.85 - i * 0.7 : (stryCov_9fa48("10249"), (stryMutAct_9fa48("10250") ? time / 0.85 : (stryCov_9fa48("10250"), time * 0.85)) + (stryMutAct_9fa48("10251") ? i / 0.7 : (stryCov_9fa48("10251"), i * 0.7)))) + plantIndex)) * 0.019)) + (stryMutAct_9fa48("10252") ? Math.sin(time * 1.9 + i) / 0.004 : (stryCov_9fa48("10252"), Math.sin(stryMutAct_9fa48("10253") ? time * 1.9 - i : (stryCov_9fa48("10253"), (stryMutAct_9fa48("10254") ? time / 1.9 : (stryCov_9fa48("10254"), time * 1.9)) + i)) * 0.004))));
                  if (stryMutAct_9fa48("10255")) {
                    ;
                  } else {
                    stryCov_9fa48("10255");
                    transform.updateMatrix();
                  }
                  if (stryMutAct_9fa48("10256")) {
                    ;
                  } else {
                    stryCov_9fa48("10256");
                    mesh.setMatrixAt(i, transform.matrix);
                  }
                }
              });
              mesh.instanceMatrix.needsUpdate = stryMutAct_9fa48("10257") ? false : (stryCov_9fa48("10257"), true);
            }
          });
          steamMaterial.uniforms.time.value = time;
          const local = camera.position.clone();
          if (stryMutAct_9fa48("10258")) {
            ;
          } else {
            stryCov_9fa48("10258");
            mug.worldToLocal(local);
          }
          steam.rotation.y = Math.atan2(local.x, local.z);
        }
      },
      dispose() {
        if (stryMutAct_9fa48("10259")) {
          {}
        } else {
          stryCov_9fa48("10259");
          disposed = stryMutAct_9fa48("10260") ? false : (stryCov_9fa48("10260"), true);
          geometries.forEach(stryMutAct_9fa48("10262") ? () => undefined : (stryCov_9fa48("10262"), g => g.dispose()));
          materials.forEach(stryMutAct_9fa48("10264") ? () => undefined : (stryCov_9fa48("10264"), m => m.dispose()));
          textures.forEach(stryMutAct_9fa48("10266") ? () => undefined : (stryCov_9fa48("10266"), t => t.dispose()));
        }
      }
    });
  }
}
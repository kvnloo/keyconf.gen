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
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createAccessoryPreview } from '../lib/accessory-model.ts';
async function keyboard(layout = 60) {
  if (stryMutAct_9fa48("14820")) {
    {}
  } else {
    stryCov_9fa48("14820");
    const bytes = readFileSync(new URL(stryMutAct_9fa48("14821") ? `` : (stryCov_9fa48("14821"), `../public/models/keyboard-${layout}.glb`), import.meta.url));
    const {
      scene
    } = await new GLTFLoader().parseAsync(stryMutAct_9fa48("14822") ? bytes.buffer : (stryCov_9fa48("14822"), bytes.buffer.slice(bytes.byteOffset, stryMutAct_9fa48("14823") ? bytes.byteOffset - bytes.byteLength : (stryCov_9fa48("14823"), bytes.byteOffset + bytes.byteLength))), stryMutAct_9fa48("14824") ? "Stryker was here!" : (stryCov_9fa48("14824"), ''));
    const keys = new Map();
    scene.traverse(object => {
      if (stryMutAct_9fa48("14826")) {
        {}
      } else {
        stryCov_9fa48("14826");
        if (stryMutAct_9fa48("14829") ? object.name.endsWith('key_') : stryMutAct_9fa48("14828") ? false : stryMutAct_9fa48("14827") ? true : (stryCov_9fa48("14827", "14828", "14829"), object.name.startsWith(stryMutAct_9fa48("14830") ? "" : (stryCov_9fa48("14830"), 'key_')))) keys.set(stryMutAct_9fa48("14832") ? object.name : (stryCov_9fa48("14832"), object.name.slice(4)), object);
      }
    });
    return stryMutAct_9fa48("14833") ? {} : (stryCov_9fa48("14833"), {
      scene,
      keys,
      bounds: new THREE.Box3().setFromObject(scene)
    });
  }
}
function artisan(keyId, width = 1, id = keyId) {
  if (stryMutAct_9fa48("14834")) {
    {}
  } else {
    stryCov_9fa48("14834");
    return stryMutAct_9fa48("14835") ? {} : (stryCov_9fa48("14835"), {
      id,
      productId: stryMutAct_9fa48("14836") ? `` : (stryCov_9fa48("14836"), `jelly-key-zen-pond-v-${width}u`),
      quantity: 1,
      location: stryMutAct_9fa48("14837") ? {} : (stryCov_9fa48("14837"), {
        kind: stryMutAct_9fa48("14838") ? "" : (stryCov_9fa48("14838"), 'key'),
        keyId
      })
    });
  }
}
function external(position = stryMutAct_9fa48("14839") ? "" : (stryCov_9fa48("14839"), 'right'), id = position) {
  if (stryMutAct_9fa48("14840")) {
    {}
  } else {
    stryCov_9fa48("14840");
    return stryMutAct_9fa48("14841") ? {} : (stryCov_9fa48("14841"), {
      id,
      productId: stryMutAct_9fa48("14842") ? "" : (stryCov_9fa48("14842"), 'adafruit-5128-macropad'),
      quantity: 100,
      location: stryMutAct_9fa48("14843") ? {} : (stryCov_9fa48("14843"), {
        kind: stryMutAct_9fa48("14844") ? "" : (stryCov_9fa48("14844"), 'external'),
        position
      })
    });
  }
}
for (const layout of stryMutAct_9fa48("14845") ? [] : (stryCov_9fa48("14845"), [60, 65, 75])) {
  if (stryMutAct_9fa48("14846")) {
    {}
  } else {
    stryCov_9fa48("14846");
    test(stryMutAct_9fa48("14848") ? `` : (stryCov_9fa48("14848"), `${layout}% real GLB key replacements follow key transforms and restore originals`), async () => {
      if (stryMutAct_9fa48("14849")) {
        {}
      } else {
        stryCov_9fa48("14849");
        const model = await keyboard(layout);
        const selections = stryMutAct_9fa48("14850") ? [] : (stryCov_9fa48("14850"), [artisan(stryMutAct_9fa48("14851") ? "" : (stryCov_9fa48("14851"), 'KeyA')), artisan(stryMutAct_9fa48("14852") ? "" : (stryCov_9fa48("14852"), 'Enter'), 2.25), artisan(stryMutAct_9fa48("14853") ? "" : (stryCov_9fa48("14853"), 'Space'), 6.25)]);
        const preview = createAccessoryPreview(stryMutAct_9fa48("14854") ? {} : (stryCov_9fa48("14854"), {
          ...model,
          selections
        }));
        assert.deepEqual(preview.counts, stryMutAct_9fa48("14856") ? {} : (stryCov_9fa48("14856"), {
          artisan: 3,
          external: 0,
          planned: 0,
          omitted: 0
        }));
        for (const selection of selections) {
          if (stryMutAct_9fa48("14857")) {
            {}
          } else {
            stryCov_9fa48("14857");
            const key = model.keys.get(selection.location.keyId);
            const cap = key.getObjectByName(stryMutAct_9fa48("14858") ? "" : (stryCov_9fa48("14858"), 'illustrative-artisan'));
            const originals = stryMutAct_9fa48("14859") ? key.children : (stryCov_9fa48("14859"), key.children.filter(stryMutAct_9fa48("14860") ? () => undefined : (stryCov_9fa48("14860"), child => stryMutAct_9fa48("14863") ? child === cap : stryMutAct_9fa48("14862") ? false : stryMutAct_9fa48("14861") ? true : (stryCov_9fa48("14861", "14862", "14863"), child !== cap))));
            if (stryMutAct_9fa48("14864")) {
              ;
            } else {
              stryCov_9fa48("14864");
              assert.equal(cap.parent, key);
            }
            assert.ok(stryMutAct_9fa48("14866") ? originals.some(child => !child.visible) : (stryCov_9fa48("14866"), originals.every(stryMutAct_9fa48("14867") ? () => undefined : (stryCov_9fa48("14867"), child => stryMutAct_9fa48("14868") ? child.visible : (stryCov_9fa48("14868"), !child.visible)))));
            const before = cap.getWorldPosition(new THREE.Vector3());
            stryMutAct_9fa48("14869") ? key.position.y -= 4.8 - 0.14 : (stryCov_9fa48("14869"), key.position.y += stryMutAct_9fa48("14870") ? 4.8 + 0.14 : (stryCov_9fa48("14870"), 4.8 - 0.14));
            key.scale.y = 1.5;
            const after = cap.getWorldPosition(new THREE.Vector3());
            assert.ok(stryMutAct_9fa48("14875") ? Math.abs(after.y - before.y - 4.66) >= 1e-6 : stryMutAct_9fa48("14874") ? Math.abs(after.y - before.y - 4.66) <= 1e-6 : stryMutAct_9fa48("14873") ? false : stryMutAct_9fa48("14872") ? true : (stryCov_9fa48("14872", "14873", "14874", "14875"), Math.abs(stryMutAct_9fa48("14876") ? after.y - before.y + 4.66 : (stryCov_9fa48("14876"), (stryMutAct_9fa48("14877") ? after.y + before.y : (stryCov_9fa48("14877"), after.y - before.y)) - 4.66)) < 1e-6));
            if (stryMutAct_9fa48("14878")) {
              ;
            } else {
              stryCov_9fa48("14878");
              assert.equal(cap.getWorldScale(new THREE.Vector3()).y, 1.5);
            }
          }
        }
        if (stryMutAct_9fa48("14879")) {
          ;
        } else {
          stryCov_9fa48("14879");
          preview.dispose();
        }
        if (stryMutAct_9fa48("14880")) {
          ;
        } else {
          stryCov_9fa48("14880");
          preview.dispose();
        }
        for (const {
          location
        } of selections) {
          if (stryMutAct_9fa48("14881")) {
            {}
          } else {
            stryCov_9fa48("14881");
            const key = model.keys.get(location.keyId);
            assert.equal(key.getObjectByName(stryMutAct_9fa48("14883") ? "" : (stryCov_9fa48("14883"), 'illustrative-artisan')), undefined);
            assert.ok(stryMutAct_9fa48("14885") ? key.children.some(child => child.visible) : (stryCov_9fa48("14885"), key.children.every(stryMutAct_9fa48("14886") ? () => undefined : (stryCov_9fa48("14886"), child => child.visible))));
          }
        }
      }
    });
  }
}
test(stryMutAct_9fa48("14888") ? "" : (stryCov_9fa48("14888"), 'missing, unassigned, wrong-width, duplicate and multiple-quantity caps are omitted'), async () => {
  if (stryMutAct_9fa48("14889")) {
    {}
  } else {
    stryCov_9fa48("14889");
    const model = await keyboard(75);
    const preview = createAccessoryPreview(stryMutAct_9fa48("14890") ? {} : (stryCov_9fa48("14890"), {
      ...model,
      selections: stryMutAct_9fa48("14891") ? [] : (stryCov_9fa48("14891"), [artisan(stryMutAct_9fa48("14892") ? "" : (stryCov_9fa48("14892"), 'unassigned')), artisan(stryMutAct_9fa48("14893") ? "" : (stryCov_9fa48("14893"), 'Escape')), artisan(stryMutAct_9fa48("14894") ? "" : (stryCov_9fa48("14894"), 'Space')), artisan(stryMutAct_9fa48("14895") ? "" : (stryCov_9fa48("14895"), 'KeyA'), 1, stryMutAct_9fa48("14896") ? "" : (stryCov_9fa48("14896"), 'first')), artisan(stryMutAct_9fa48("14897") ? "" : (stryCov_9fa48("14897"), 'KeyA'), 1, stryMutAct_9fa48("14898") ? "" : (stryCov_9fa48("14898"), 'second')), stryMutAct_9fa48("14899") ? {} : (stryCov_9fa48("14899"), {
        ...artisan(stryMutAct_9fa48("14900") ? "" : (stryCov_9fa48("14900"), 'KeyB')),
        quantity: 2
      })])
    }));
    assert.deepEqual(preview.counts, stryMutAct_9fa48("14902") ? {} : (stryCov_9fa48("14902"), {
      artisan: 0,
      external: 0,
      planned: 0,
      omitted: 6
    }));
    assert.ok(stryMutAct_9fa48("14904") ? [...model.keys.values()].some(key => key.children.every(child => child.visible)) : (stryCov_9fa48("14904"), (stryMutAct_9fa48("14905") ? [] : (stryCov_9fa48("14905"), [...model.keys.values()])).every(stryMutAct_9fa48("14906") ? () => undefined : (stryCov_9fa48("14906"), key => stryMutAct_9fa48("14907") ? key.children.some(child => child.visible) : (stryCov_9fa48("14907"), key.children.every(stryMutAct_9fa48("14908") ? () => undefined : (stryCov_9fa48("14908"), child => child.visible)))))));
    if (stryMutAct_9fa48("14909")) {
      ;
    } else {
      stryCov_9fa48("14909");
      preview.dispose();
    }
  }
});
test(stryMutAct_9fa48("14911") ? "" : (stryCov_9fa48("14911"), 'desk modules clear each selected keyboard edge and use one twelve-key illustration per selection'), async () => {
  if (stryMutAct_9fa48("14912")) {
    {}
  } else {
    stryCov_9fa48("14912");
    const model = await keyboard();
    const preview = createAccessoryPreview(stryMutAct_9fa48("14913") ? {} : (stryCov_9fa48("14913"), {
      ...model,
      selections: stryMutAct_9fa48("14914") ? [] : (stryCov_9fa48("14914"), [external(stryMutAct_9fa48("14915") ? "" : (stryCov_9fa48("14915"), 'left')), external(stryMutAct_9fa48("14916") ? "" : (stryCov_9fa48("14916"), 'right')), external(stryMutAct_9fa48("14917") ? "" : (stryCov_9fa48("14917"), 'above'))])
    }));
    assert.deepEqual(preview.counts, stryMutAct_9fa48("14919") ? {} : (stryCov_9fa48("14919"), {
      artisan: 0,
      external: 3,
      planned: 0,
      omitted: 0
    }));
    const [left, right, above] = preview.group.children.map(stryMutAct_9fa48("14920") ? () => undefined : (stryCov_9fa48("14920"), child => new THREE.Box3().setFromObject(child)));
    assert.ok(stryMutAct_9fa48("14925") ? left.max.x >= model.bounds.min.x : stryMutAct_9fa48("14924") ? left.max.x <= model.bounds.min.x : stryMutAct_9fa48("14923") ? false : stryMutAct_9fa48("14922") ? true : (stryCov_9fa48("14922", "14923", "14924", "14925"), left.max.x < model.bounds.min.x));
    assert.ok(stryMutAct_9fa48("14930") ? right.min.x <= model.bounds.max.x : stryMutAct_9fa48("14929") ? right.min.x >= model.bounds.max.x : stryMutAct_9fa48("14928") ? false : stryMutAct_9fa48("14927") ? true : (stryCov_9fa48("14927", "14928", "14929", "14930"), right.min.x > model.bounds.max.x));
    assert.ok(stryMutAct_9fa48("14935") ? above.max.z >= model.bounds.min.z : stryMutAct_9fa48("14934") ? above.max.z <= model.bounds.min.z : stryMutAct_9fa48("14933") ? false : stryMutAct_9fa48("14932") ? true : (stryCov_9fa48("14932", "14933", "14934", "14935"), above.max.z < model.bounds.min.z));
    for (const pad of preview.group.children) {
      if (stryMutAct_9fa48("14936")) {
        {}
      } else {
        stryCov_9fa48("14936");
        const caps = pad.getObjectByName(stryMutAct_9fa48("14937") ? "" : (stryCov_9fa48("14937"), 'macropad-twelve-keys'));
        if (stryMutAct_9fa48("14938")) {
          ;
        } else {
          stryCov_9fa48("14938");
          assert.ok(caps instanceof THREE.InstancedMesh);
        }
        if (stryMutAct_9fa48("14939")) {
          ;
        } else {
          stryCov_9fa48("14939");
          assert.equal(caps.count, 12);
        }
      }
    }
    if (stryMutAct_9fa48("14940")) {
      ;
    } else {
      stryCov_9fa48("14940");
      preview.dispose();
    }
  }
});
test(stryMutAct_9fa48("14942") ? "" : (stryCov_9fa48("14942"), 'preview cap bounds and every owned GPU resource are disposed once without disposing GLB originals'), async () => {
  if (stryMutAct_9fa48("14943")) {
    {}
  } else {
    stryCov_9fa48("14943");
    const model = await keyboard();
    const preview = createAccessoryPreview(stryMutAct_9fa48("14944") ? {} : (stryCov_9fa48("14944"), {
      ...model,
      selections: stryMutAct_9fa48("14945") ? [] : (stryCov_9fa48("14945"), [artisan(stryMutAct_9fa48("14946") ? "" : (stryCov_9fa48("14946"), 'KeyA')), ...Array.from(stryMutAct_9fa48("14947") ? {} : (stryCov_9fa48("14947"), {
        length: 10
      }), stryMutAct_9fa48("14948") ? () => undefined : (stryCov_9fa48("14948"), (_, i) => external(stryMutAct_9fa48("14949") ? "" : (stryCov_9fa48("14949"), 'right'), String(i))))])
    }));
    assert.deepEqual(preview.counts, stryMutAct_9fa48("14951") ? {} : (stryCov_9fa48("14951"), {
      artisan: 1,
      external: 6,
      planned: 0,
      omitted: 4
    }));
    const resources = new Set();
    for (const group of stryMutAct_9fa48("14952") ? [] : (stryCov_9fa48("14952"), [preview.group, model.keys.get(stryMutAct_9fa48("14953") ? "" : (stryCov_9fa48("14953"), 'KeyA')).getObjectByName(stryMutAct_9fa48("14954") ? "" : (stryCov_9fa48("14954"), 'illustrative-artisan'))])) group.traverse(object => {
      if (stryMutAct_9fa48("14956")) {
        {}
      } else {
        stryCov_9fa48("14956");
        if (stryMutAct_9fa48("14959") ? false : stryMutAct_9fa48("14958") ? true : stryMutAct_9fa48("14957") ? object instanceof THREE.Mesh : (stryCov_9fa48("14957", "14958", "14959"), !(object instanceof THREE.Mesh))) return;
        if (stryMutAct_9fa48("14961") ? false : stryMutAct_9fa48("14960") ? true : (stryCov_9fa48("14960", "14961"), object instanceof THREE.InstancedMesh)) if (stryMutAct_9fa48("14962")) {
          ;
        } else {
          stryCov_9fa48("14962");
          resources.add(object);
        }
        if (stryMutAct_9fa48("14963")) {
          ;
        } else {
          stryCov_9fa48("14963");
          resources.add(object.geometry);
        }
        for (const material of Array.isArray(object.material) ? object.material : stryMutAct_9fa48("14964") ? [] : (stryCov_9fa48("14964"), [object.material])) if (stryMutAct_9fa48("14965")) {
          ;
        } else {
          stryCov_9fa48("14965");
          resources.add(material);
        }
      }
    });
    let disposals = 0;
    for (const resource of resources) resource.addEventListener(stryMutAct_9fa48("14967") ? "" : (stryCov_9fa48("14967"), 'dispose'), () => {
      if (stryMutAct_9fa48("14968")) {
        {}
      } else {
        stryCov_9fa48("14968");
        stryMutAct_9fa48("14969") ? disposals-- : (stryCov_9fa48("14969"), disposals++);
      }
    });
    let originalDisposals = 0;
    model.keys.get(stryMutAct_9fa48("14971") ? "" : (stryCov_9fa48("14971"), 'KeyA')).children.find(stryMutAct_9fa48("14972") ? () => undefined : (stryCov_9fa48("14972"), child => stryMutAct_9fa48("14973") ? child.name.endsWith('cap') : (stryCov_9fa48("14973"), child.name.startsWith(stryMutAct_9fa48("14974") ? "" : (stryCov_9fa48("14974"), 'cap'))))).geometry.addEventListener(stryMutAct_9fa48("14975") ? "" : (stryCov_9fa48("14975"), 'dispose'), () => {
      if (stryMutAct_9fa48("14976")) {
        {}
      } else {
        stryCov_9fa48("14976");
        stryMutAct_9fa48("14977") ? originalDisposals-- : (stryCov_9fa48("14977"), originalDisposals++);
      }
    });
    if (stryMutAct_9fa48("14978")) {
      ;
    } else {
      stryCov_9fa48("14978");
      preview.dispose();
    }
    if (stryMutAct_9fa48("14979")) {
      ;
    } else {
      stryCov_9fa48("14979");
      preview.dispose();
    }
    if (stryMutAct_9fa48("14980")) {
      ;
    } else {
      stryCov_9fa48("14980");
      assert.equal(disposals, resources.size);
    }
    if (stryMutAct_9fa48("14981")) {
      ;
    } else {
      stryCov_9fa48("14981");
      assert.equal(originalDisposals, 0);
    }
  }
});
test(stryMutAct_9fa48("14983") ? "" : (stryCov_9fa48("14983"), 'disposal restores an originally hidden key component to its previous visibility'), async () => {
  if (stryMutAct_9fa48("14984")) {
    {}
  } else {
    stryCov_9fa48("14984");
    const model = await keyboard();
    const legend = model.keys.get(stryMutAct_9fa48("14985") ? "" : (stryCov_9fa48("14985"), 'KeyA')).children.find(stryMutAct_9fa48("14986") ? () => undefined : (stryCov_9fa48("14986"), child => stryMutAct_9fa48("14987") ? child.name.endsWith('legend') : (stryCov_9fa48("14987"), child.name.startsWith(stryMutAct_9fa48("14988") ? "" : (stryCov_9fa48("14988"), 'legend')))));
    legend.visible = stryMutAct_9fa48("14989") ? true : (stryCov_9fa48("14989"), false);
    const preview = createAccessoryPreview(stryMutAct_9fa48("14990") ? {} : (stryCov_9fa48("14990"), {
      ...model,
      selections: stryMutAct_9fa48("14991") ? [] : (stryCov_9fa48("14991"), [artisan(stryMutAct_9fa48("14992") ? "" : (stryCov_9fa48("14992"), 'KeyA'))])
    }));
    if (stryMutAct_9fa48("14993")) {
      ;
    } else {
      stryCov_9fa48("14993");
      preview.dispose();
    }
    assert.equal(legend.visible, stryMutAct_9fa48("14995") ? true : (stryCov_9fa48("14995"), false));
  }
});
test(stryMutAct_9fa48("14997") ? "" : (stryCov_9fa48("14997"), 'embedded electronics remain unmounted outside keyboard bounds with capped representative previews'), async () => {
  if (stryMutAct_9fa48("14998")) {
    {}
  } else {
    stryCov_9fa48("14998");
    const model = await keyboard();
    const ids = stryMutAct_9fa48("14999") ? [] : (stryCov_9fa48("14999"), [stryMutAct_9fa48("15000") ? "" : (stryCov_9fa48("15000"), 'adafruit-326-oled'), stryMutAct_9fa48("15001") ? "" : (stryCov_9fa48("15001"), 'adafruit-4980-neokey'), stryMutAct_9fa48("15002") ? "" : (stryCov_9fa48("15002"), 'adafruit-377-encoder')]);
    const selections = Array.from(stryMutAct_9fa48("15003") ? {} : (stryCov_9fa48("15003"), {
      length: 7
    }), stryMutAct_9fa48("15004") ? () => undefined : (stryCov_9fa48("15004"), (_, i) => stryMutAct_9fa48("15005") ? {} : (stryCov_9fa48("15005"), {
      id: String(i),
      productId: ids[stryMutAct_9fa48("15006") ? i * 3 : (stryCov_9fa48("15006"), i % 3)],
      quantity: 20,
      location: stryMutAct_9fa48("15007") ? {} : (stryCov_9fa48("15007"), {
        kind: stryMutAct_9fa48("15008") ? "" : (stryCov_9fa48("15008"), 'embedded'),
        slotId: stryMutAct_9fa48("15009") ? "" : (stryCov_9fa48("15009"), 'unassigned')
      })
    })));
    const preview = createAccessoryPreview(stryMutAct_9fa48("15010") ? {} : (stryCov_9fa48("15010"), {
      ...model,
      selections: stryMutAct_9fa48("15011") ? [] : (stryCov_9fa48("15011"), [...selections, external(stryMutAct_9fa48("15012") ? "" : (stryCov_9fa48("15012"), 'left')), external(stryMutAct_9fa48("15013") ? "" : (stryCov_9fa48("15013"), 'right')), external(stryMutAct_9fa48("15014") ? "" : (stryCov_9fa48("15014"), 'above'))])
    }));
    if (stryMutAct_9fa48("15015")) {
      ;
    } else {
      stryCov_9fa48("15015");
      assert.equal(preview.counts.planned, 6);
    }
    if (stryMutAct_9fa48("15016")) {
      ;
    } else {
      stryCov_9fa48("15016");
      assert.equal(preview.counts.omitted, 1);
    }
    const boxes = preview.group.children.map(stryMutAct_9fa48("15017") ? () => undefined : (stryCov_9fa48("15017"), part => new THREE.Box3().setFromObject(part)));
    for (const [i, part] of stryMutAct_9fa48("15018") ? preview.group.children.entries() : (stryCov_9fa48("15018"), preview.group.children.filter(stryMutAct_9fa48("15019") ? () => undefined : (stryCov_9fa48("15019"), child => stryMutAct_9fa48("15020") ? child.name.endsWith('unmounted-') : (stryCov_9fa48("15020"), child.name.startsWith(stryMutAct_9fa48("15021") ? "" : (stryCov_9fa48("15021"), 'unmounted-'))))).entries())) {
      if (stryMutAct_9fa48("15022")) {
        {}
      } else {
        stryCov_9fa48("15022");
        assert.equal(part.userData.installation, stryMutAct_9fa48("15024") ? "" : (stryCov_9fa48("15024"), 'unmounted'));
        if (stryMutAct_9fa48("15025")) {
          ;
        } else {
          stryCov_9fa48("15025");
          assert.equal(part.userData.selectionId, String(i));
        }
        assert.ok(stryMutAct_9fa48("15030") ? boxes[i].min.z <= model.bounds.max.z : stryMutAct_9fa48("15029") ? boxes[i].min.z >= model.bounds.max.z : stryMutAct_9fa48("15028") ? false : stryMutAct_9fa48("15027") ? true : (stryCov_9fa48("15027", "15028", "15029", "15030"), boxes[i].min.z > model.bounds.max.z));
        for (let j = stryMutAct_9fa48("15031") ? i - 1 : (stryCov_9fa48("15031"), i + 1); stryMutAct_9fa48("15034") ? j >= boxes.length : stryMutAct_9fa48("15033") ? j <= boxes.length : stryMutAct_9fa48("15032") ? false : (stryCov_9fa48("15032", "15033", "15034"), j < boxes.length); stryMutAct_9fa48("15035") ? j-- : (stryCov_9fa48("15035"), j++)) assert.equal(boxes[i].intersectsBox(boxes[j]), stryMutAct_9fa48("15037") ? true : (stryCov_9fa48("15037"), false));
      }
    }
    assert.equal(stryMutAct_9fa48("15039") ? preview.group.children.length : (stryCov_9fa48("15039"), preview.group.children.filter(stryMutAct_9fa48("15040") ? () => undefined : (stryCov_9fa48("15040"), part => stryMutAct_9fa48("15043") ? part.name !== 'unmounted-screen' : stryMutAct_9fa48("15042") ? false : stryMutAct_9fa48("15041") ? true : (stryCov_9fa48("15041", "15042", "15043"), part.name === (stryMutAct_9fa48("15044") ? "" : (stryCov_9fa48("15044"), 'unmounted-screen'))))).length), 2);
    if (stryMutAct_9fa48("15045")) {
      ;
    } else {
      stryCov_9fa48("15045");
      preview.dispose();
    }
    if (stryMutAct_9fa48("15046")) {
      ;
    } else {
      stryCov_9fa48("15046");
      assert.equal(preview.group.parent, null);
    }
  }
});
test(stryMutAct_9fa48("15048") ? "" : (stryCov_9fa48("15048"), 'imported products use neutral markers and never inherit built-in product geometry'), async () => {
  if (stryMutAct_9fa48("15049")) {
    {}
  } else {
    stryCov_9fa48("15049");
    const {
      createImportedAccessory
    } = await import('../lib/imported-accessories.ts');
    const {
      newAccessorySelection
    } = await import('../lib/build-accessories.ts');
    const model = await keyboard();
    const variants = stryMutAct_9fa48("15050") ? [] : (stryCov_9fa48("15050"), [stryMutAct_9fa48("15051") ? {} : (stryCov_9fa48("15051"), {
      kind: stryMutAct_9fa48("15052") ? "" : (stryCov_9fa48("15052"), 'macropad'),
      placement: stryMutAct_9fa48("15053") ? "" : (stryCov_9fa48("15053"), 'external')
    }), stryMutAct_9fa48("15054") ? {} : (stryCov_9fa48("15054"), {
      kind: stryMutAct_9fa48("15055") ? "" : (stryCov_9fa48("15055"), 'screen'),
      placement: stryMutAct_9fa48("15056") ? "" : (stryCov_9fa48("15056"), 'external')
    }), stryMutAct_9fa48("15057") ? {} : (stryCov_9fa48("15057"), {
      kind: stryMutAct_9fa48("15058") ? "" : (stryCov_9fa48("15058"), 'buttons'),
      placement: stryMutAct_9fa48("15059") ? "" : (stryCov_9fa48("15059"), 'embedded')
    }), stryMutAct_9fa48("15060") ? {} : (stryCov_9fa48("15060"), {
      kind: stryMutAct_9fa48("15061") ? "" : (stryCov_9fa48("15061"), 'knob'),
      placement: stryMutAct_9fa48("15062") ? "" : (stryCov_9fa48("15062"), 'embedded')
    }), stryMutAct_9fa48("15063") ? {} : (stryCov_9fa48("15063"), {
      kind: stryMutAct_9fa48("15064") ? "" : (stryCov_9fa48("15064"), 'artisan'),
      placement: stryMutAct_9fa48("15065") ? "" : (stryCov_9fa48("15065"), 'key')
    })]);
    const customAccessories = await Promise.all(variants.map(stryMutAct_9fa48("15066") ? () => undefined : (stryCov_9fa48("15066"), variant => createImportedAccessory(stryMutAct_9fa48("15067") ? {} : (stryCov_9fa48("15067"), {
      ...variant,
      origin: stryMutAct_9fa48("15068") ? "" : (stryCov_9fa48("15068"), 'import'),
      name: stryMutAct_9fa48("15069") ? `` : (stryCov_9fa48("15069"), `Unknown ${variant.kind}`),
      brand: stryMutAct_9fa48("15070") ? "" : (stryCov_9fa48("15070"), 'Maker'),
      detail: stryMutAct_9fa48("15071") ? "" : (stryCov_9fa48("15071"), 'Imported reference'),
      source: stryMutAct_9fa48("15072") ? "" : (stryCov_9fa48("15072"), 'https://example.com/part'),
      sku: null,
      observedAt: stryMutAct_9fa48("15073") ? "" : (stryCov_9fa48("15073"), '2026-09-06T00:00:00.000Z'),
      method: stryMutAct_9fa48("15074") ? "" : (stryCov_9fa48("15074"), 'Structured data'),
      fit: stryMutAct_9fa48("15075") ? "" : (stryCov_9fa48("15075"), 'unknown'),
      geometry: stryMutAct_9fa48("15076") ? "" : (stryCov_9fa48("15076"), 'unavailable'),
      sizeU: null,
      stem: null
    })))));
    const selections = customAccessories.map(stryMutAct_9fa48("15077") ? () => undefined : (stryCov_9fa48("15077"), product => newAccessorySelection(product.id, customAccessories)));
    const preview = createAccessoryPreview(stryMutAct_9fa48("15078") ? {} : (stryCov_9fa48("15078"), {
      ...model,
      customAccessories,
      selections
    }));
    assert.deepEqual(preview.counts, stryMutAct_9fa48("15080") ? {} : (stryCov_9fa48("15080"), {
      artisan: 0,
      external: 2,
      planned: 2,
      omitted: 1
    }));
    if (stryMutAct_9fa48("15081")) {
      ;
    } else {
      stryCov_9fa48("15081");
      assert.equal(preview.group.children.length, 4);
    }
    for (const marker of preview.group.children) {
      if (stryMutAct_9fa48("15082")) {
        {}
      } else {
        stryCov_9fa48("15082");
        assert.equal(marker.name, stryMutAct_9fa48("15084") ? "" : (stryCov_9fa48("15084"), 'unavailable-product-geometry'));
        assert.equal(marker.userData.geometry, stryMutAct_9fa48("15086") ? "" : (stryCov_9fa48("15086"), 'unavailable'));
        if (stryMutAct_9fa48("15087")) {
          ;
        } else {
          stryCov_9fa48("15087");
          assert.equal(marker.children.length, 2);
        }
        if (stryMutAct_9fa48("15088")) {
          ;
        } else {
          stryCov_9fa48("15088");
          assert.ok(marker.userData.selectionId);
        }
      }
    }
    const disposed = new Set();
    preview.group.traverse(object => {
      if (stryMutAct_9fa48("15090")) {
        {}
      } else {
        stryCov_9fa48("15090");
        if (stryMutAct_9fa48("15092") ? false : stryMutAct_9fa48("15091") ? true : (stryCov_9fa48("15091", "15092"), object instanceof THREE.Mesh)) {
          if (stryMutAct_9fa48("15093")) {
            {}
          } else {
            stryCov_9fa48("15093");
            object.geometry.addEventListener(stryMutAct_9fa48("15095") ? "" : (stryCov_9fa48("15095"), 'dispose'), stryMutAct_9fa48("15096") ? () => undefined : (stryCov_9fa48("15096"), () => disposed.add(object.geometry)));
          }
        }
      }
    });
    if (stryMutAct_9fa48("15097")) {
      ;
    } else {
      stryCov_9fa48("15097");
      preview.dispose();
    }
    if (stryMutAct_9fa48("15098")) {
      ;
    } else {
      stryCov_9fa48("15098");
      assert.equal(disposed.size, 8);
    }
    if (stryMutAct_9fa48("15099")) {
      ;
    } else {
      stryCov_9fa48("15099");
      preview.dispose();
    }
    if (stryMutAct_9fa48("15100")) {
      ;
    } else {
      stryCov_9fa48("15100");
      assert.equal(disposed.size, 8);
    }
    const key = model.keys.get(stryMutAct_9fa48("15101") ? "" : (stryCov_9fa48("15101"), 'KeyA'));
    const originals = key.children.map(stryMutAct_9fa48("15102") ? () => undefined : (stryCov_9fa48("15102"), object => stryMutAct_9fa48("15103") ? {} : (stryCov_9fa48("15103"), {
      object,
      visible: object.visible
    })));
    const reviewed = createAccessoryPreview(stryMutAct_9fa48("15104") ? {} : (stryCov_9fa48("15104"), {
      ...model,
      customAccessories: customAccessories.map(stryMutAct_9fa48("15105") ? () => undefined : (stryCov_9fa48("15105"), product => (stryMutAct_9fa48("15108") ? product.kind !== 'artisan' : stryMutAct_9fa48("15107") ? false : stryMutAct_9fa48("15106") ? true : (stryCov_9fa48("15106", "15107", "15108"), product.kind === (stryMutAct_9fa48("15109") ? "" : (stryCov_9fa48("15109"), 'artisan')))) ? stryMutAct_9fa48("15110") ? {} : (stryCov_9fa48("15110"), {
        ...product,
        sizeU: 1,
        stem: stryMutAct_9fa48("15111") ? "" : (stryCov_9fa48("15111"), 'mx')
      }) : product)),
      selections: selections.map(stryMutAct_9fa48("15112") ? () => undefined : (stryCov_9fa48("15112"), selection => (stryMutAct_9fa48("15115") ? selection.location.kind !== 'key' : stryMutAct_9fa48("15114") ? false : stryMutAct_9fa48("15113") ? true : (stryCov_9fa48("15113", "15114", "15115"), selection.location.kind === (stryMutAct_9fa48("15116") ? "" : (stryCov_9fa48("15116"), 'key')))) ? stryMutAct_9fa48("15117") ? {} : (stryCov_9fa48("15117"), {
        ...selection,
        location: stryMutAct_9fa48("15118") ? {} : (stryCov_9fa48("15118"), {
          kind: stryMutAct_9fa48("15119") ? "" : (stryCov_9fa48("15119"), 'key'),
          keyId: stryMutAct_9fa48("15120") ? "" : (stryCov_9fa48("15120"), 'KeyA')
        })
      }) : selection))
    }));
    if (stryMutAct_9fa48("15121")) {
      ;
    } else {
      stryCov_9fa48("15121");
      assert.equal(reviewed.counts.artisan, 1);
    }
    const marker = key.getObjectByName(stryMutAct_9fa48("15122") ? "" : (stryCov_9fa48("15122"), 'unavailable-product-geometry'));
    if (stryMutAct_9fa48("15123")) {
      ;
    } else {
      stryCov_9fa48("15123");
      assert.ok(marker);
    }
    if (stryMutAct_9fa48("15124")) {
      ;
    } else {
      stryCov_9fa48("15124");
      assert.equal(marker.children.length, 2);
    }
    assert.ok(stryMutAct_9fa48("15126") ? originals.some(({
      object
    }) => !object.visible) : (stryCov_9fa48("15126"), originals.every(stryMutAct_9fa48("15127") ? () => undefined : (stryCov_9fa48("15127"), ({
      object
    }) => stryMutAct_9fa48("15128") ? object.visible : (stryCov_9fa48("15128"), !object.visible)))));
    if (stryMutAct_9fa48("15129")) {
      ;
    } else {
      stryCov_9fa48("15129");
      reviewed.dispose();
    }
    assert.ok(stryMutAct_9fa48("15131") ? originals.some(({
      object,
      visible
    }) => object.visible === visible) : (stryCov_9fa48("15131"), originals.every(stryMutAct_9fa48("15132") ? () => undefined : (stryCov_9fa48("15132"), ({
      object,
      visible
    }) => stryMutAct_9fa48("15135") ? object.visible !== visible : stryMutAct_9fa48("15134") ? false : stryMutAct_9fa48("15133") ? true : (stryCov_9fa48("15133", "15134", "15135"), object.visible === visible)))));
  }
});
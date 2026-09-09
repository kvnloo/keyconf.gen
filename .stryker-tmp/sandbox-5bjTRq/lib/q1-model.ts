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
import { q1StockEncoderColor } from './keyboard-variant.ts';
import layout from '../docs/reference-assets/keychron-q1-max-layout.json' with { type: 'json' };
import genericLayouts from '../public/models/layouts.json' with { type: 'json' };

/** Original illustrative enclosure; documented ANSI key positions and knob envelope. */
export function adaptQ1MaxModel(model: THREE.Group): void {
  if (stryMutAct_9fa48("14002")) {
    {}
  } else {
    stryCov_9fa48("14002");
    const templates = new Map(stryMutAct_9fa48("14003") ? model.children.map(child => [child.name.slice(4), child]) : (stryCov_9fa48("14003"), model.children.filter(stryMutAct_9fa48("14004") ? () => undefined : (stryCov_9fa48("14004"), child => stryMutAct_9fa48("14005") ? child.name.endsWith('key_') : (stryCov_9fa48("14005"), child.name.startsWith(stryMutAct_9fa48("14006") ? "" : (stryCov_9fa48("14006"), 'key_'))))).map(stryMutAct_9fa48("14007") ? () => undefined : (stryCov_9fa48("14007"), child => stryMutAct_9fa48("14008") ? [] : (stryCov_9fa48("14008"), [stryMutAct_9fa48("14009") ? child.name : (stryCov_9fa48("14009"), child.name.slice(4)), child])))));
    const caps = layout.keys.map(key => {
      if (stryMutAct_9fa48("14010")) {
        {}
      } else {
        stryCov_9fa48("14010");
        const sourceCode = (stryMutAct_9fa48("14013") ? key.code !== 'ControlRight' : stryMutAct_9fa48("14012") ? false : stryMutAct_9fa48("14011") ? true : (stryCov_9fa48("14011", "14012", "14013"), key.code === (stryMutAct_9fa48("14014") ? "" : (stryCov_9fa48("14014"), 'ControlRight')))) ? stryMutAct_9fa48("14015") ? "" : (stryCov_9fa48("14015"), 'ControlLeft') : (stryMutAct_9fa48("14018") ? key.code !== 'Escape' : stryMutAct_9fa48("14017") ? false : stryMutAct_9fa48("14016") ? true : (stryCov_9fa48("14016", "14017", "14018"), key.code === (stryMutAct_9fa48("14019") ? "" : (stryCov_9fa48("14019"), 'Escape')))) ? stryMutAct_9fa48("14020") ? "" : (stryCov_9fa48("14020"), 'EscapeFn') : key.code;
        const source = templates.get(sourceCode);
        const widthTemplate = genericLayouts[stryMutAct_9fa48("14021") ? "" : (stryCov_9fa48("14021"), '75')].find(stryMutAct_9fa48("14022") ? () => undefined : (stryCov_9fa48("14022"), candidate => stryMutAct_9fa48("14025") ? candidate.width !== key.width : stryMutAct_9fa48("14024") ? false : stryMutAct_9fa48("14023") ? true : (stryCov_9fa48("14023", "14024", "14025"), candidate.width === key.width)));
        const capSource = stryMutAct_9fa48("14028") ? widthTemplate || templates.get(widthTemplate.code) : stryMutAct_9fa48("14027") ? false : stryMutAct_9fa48("14026") ? true : (stryCov_9fa48("14026", "14027", "14028"), widthTemplate && templates.get(widthTemplate.code));
        if (stryMutAct_9fa48("14031") ? !source && !capSource : stryMutAct_9fa48("14030") ? false : stryMutAct_9fa48("14029") ? true : (stryCov_9fa48("14029", "14030", "14031"), (stryMutAct_9fa48("14032") ? source : (stryCov_9fa48("14032"), !source)) || (stryMutAct_9fa48("14033") ? capSource : (stryCov_9fa48("14033"), !capSource)))) throw new Error(stryMutAct_9fa48("14035") ? `` : (stryCov_9fa48("14035"), `Missing Q1 cap template: ${key.code}`));
        const result = new THREE.Group();
        result.name = stryMutAct_9fa48("14036") ? `` : (stryCov_9fa48("14036"), `key_${key.code}`);
        result.position.set(key.x, source.position.y, stryMutAct_9fa48("14038") ? +key.y : (stryCov_9fa48("14038"), -key.y));
        for (const child of capSource.children) {
          if (stryMutAct_9fa48("14039")) {
            {}
          } else {
            stryCov_9fa48("14039");
            if (stryMutAct_9fa48("14042") ? false : stryMutAct_9fa48("14041") ? true : stryMutAct_9fa48("14040") ? child.name.startsWith('legend_') : (stryCov_9fa48("14040", "14041", "14042"), !(stryMutAct_9fa48("14043") ? child.name.endsWith('legend_') : (stryCov_9fa48("14043"), child.name.startsWith(stryMutAct_9fa48("14044") ? "" : (stryCov_9fa48("14044"), 'legend_')))))) {
              if (stryMutAct_9fa48("14045")) {
                {}
              } else {
                stryCov_9fa48("14045");
                const cap = child.clone();
                const original = source.children.find(stryMutAct_9fa48("14046") ? () => undefined : (stryCov_9fa48("14046"), entry => stryMutAct_9fa48("14049") ? entry instanceof THREE.Mesh || !entry.name.startsWith('legend_') : stryMutAct_9fa48("14048") ? false : stryMutAct_9fa48("14047") ? true : (stryCov_9fa48("14047", "14048", "14049"), entry instanceof THREE.Mesh && (stryMutAct_9fa48("14050") ? entry.name.startsWith('legend_') : (stryCov_9fa48("14050"), !(stryMutAct_9fa48("14051") ? entry.name.endsWith('legend_') : (stryCov_9fa48("14051"), entry.name.startsWith(stryMutAct_9fa48("14052") ? "" : (stryCov_9fa48("14052"), 'legend_')))))))));
                if (stryMutAct_9fa48("14055") ? cap instanceof THREE.Mesh || original instanceof THREE.Mesh : stryMutAct_9fa48("14054") ? false : stryMutAct_9fa48("14053") ? true : (stryCov_9fa48("14053", "14054", "14055"), cap instanceof THREE.Mesh && original instanceof THREE.Mesh)) cap.material = original.material;
                if (stryMutAct_9fa48("14056")) {
                  ;
                } else {
                  stryCov_9fa48("14056");
                  result.add(cap);
                }
              }
            }
          }
        }
        for (const child of source.children) {
          if (stryMutAct_9fa48("14057")) {
            {}
          } else {
            stryCov_9fa48("14057");
            if (stryMutAct_9fa48("14060") ? child.name.endsWith('legend_') : stryMutAct_9fa48("14059") ? false : stryMutAct_9fa48("14058") ? true : (stryCov_9fa48("14058", "14059", "14060"), child.name.startsWith(stryMutAct_9fa48("14061") ? "" : (stryCov_9fa48("14061"), 'legend_')))) if (stryMutAct_9fa48("14062")) {
              ;
            } else {
              stryCov_9fa48("14062");
              result.add(child.clone());
            }
          }
        }
        return result;
      }
    });
    for (const key of templates.values()) if (stryMutAct_9fa48("14063")) {
      ;
    } else {
      stryCov_9fa48("14063");
      model.remove(key);
    }
    // Keep the existing original enclosure construction around the wider, deeper layout.
    for (const child of model.children) {
      if (stryMutAct_9fa48("14064")) {
        {}
      } else {
        stryCov_9fa48("14064");
        stryMutAct_9fa48("14065") ? child.position.x /= 16.25 / 16 : (stryCov_9fa48("14065"), child.position.x *= stryMutAct_9fa48("14066") ? 16.25 * 16 : (stryCov_9fa48("14066"), 16.25 / 16));
        stryMutAct_9fa48("14067") ? child.position.z /= 6.5 / 6 : (stryCov_9fa48("14067"), child.position.z *= stryMutAct_9fa48("14068") ? 6.5 * 6 : (stryCov_9fa48("14068"), 6.5 / 6));
        stryMutAct_9fa48("14069") ? child.scale.x /= 16.25 / 16 : (stryCov_9fa48("14069"), child.scale.x *= stryMutAct_9fa48("14070") ? 16.25 * 16 : (stryCov_9fa48("14070"), 16.25 / 16));
        stryMutAct_9fa48("14071") ? child.scale.z /= 6.5 / 6 : (stryCov_9fa48("14071"), child.scale.z *= stryMutAct_9fa48("14072") ? 6.5 * 6 : (stryCov_9fa48("14072"), 6.5 / 6));
      }
    }
    if (stryMutAct_9fa48("14073")) {
      ;
    } else {
      stryCov_9fa48("14073");
      model.add(...caps);
    }
    const radius = stryMutAct_9fa48("14074") ? 8 * 19.05 : (stryCov_9fa48("14074"), 8 / 19.05);
    const height = stryMutAct_9fa48("14075") ? 14 * 19.05 : (stryCov_9fa48("14075"), 14 / 19.05);
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), new THREE.MeshStandardMaterial(stryMutAct_9fa48("14076") ? {} : (stryCov_9fa48("14076"), {
      color: q1StockEncoderColor,
      metalness: 0.85,
      roughness: 0.3
    })));
    knob.name = stryMutAct_9fa48("14077") ? "" : (stryCov_9fa48("14077"), 'control_dial');
    knob.position.set(layout.stockEncoder.x, stryMutAct_9fa48("14079") ? 0.43 - height / 2 : (stryCov_9fa48("14079"), 0.43 + (stryMutAct_9fa48("14080") ? height * 2 : (stryCov_9fa48("14080"), height / 2))), stryMutAct_9fa48("14081") ? +layout.stockEncoder.y : (stryCov_9fa48("14081"), -layout.stockEncoder.y));
    if (stryMutAct_9fa48("14082")) {
      ;
    } else {
      stryCov_9fa48("14082");
      model.add(knob);
    }
  }
}
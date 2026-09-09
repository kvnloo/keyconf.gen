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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSwitchAssembly } from './switch-model';
export function createSwitchScene(element: HTMLElement, id: string, onError: () => void) {
  if (stryMutAct_9fa48("14340")) {
    {}
  } else {
    stryCov_9fa48("14340");
    const renderer = new THREE.WebGLRenderer(stryMutAct_9fa48("14341") ? {} : (stryCov_9fa48("14341"), {
      antialias: stryMutAct_9fa48("14342") ? false : (stryCov_9fa48("14342"), true),
      alpha: stryMutAct_9fa48("14343") ? false : (stryCov_9fa48("14343"), true)
    }));
    renderer.setPixelRatio(stryMutAct_9fa48("14345") ? Math.max(window.devicePixelRatio, 1.5) : (stryCov_9fa48("14345"), Math.min(window.devicePixelRatio, 1.5)));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute(stryMutAct_9fa48("14347") ? "" : (stryCov_9fa48("14347"), 'role'), stryMutAct_9fa48("14348") ? "" : (stryCov_9fa48("14348"), 'application'));
    renderer.domElement.setAttribute(stryMutAct_9fa48("14350") ? "" : (stryCov_9fa48("14350"), 'aria-label'), stryMutAct_9fa48("14351") ? "" : (stryCov_9fa48("14351"), 'Illustrative switch model. Arrow keys rotate; plus and minus zoom.'));
    if (stryMutAct_9fa48("14352")) {
      ;
    } else {
      stryCov_9fa48("14352");
      element.appendChild(renderer.domElement);
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
    const model = createSwitchAssembly(stryMutAct_9fa48("14353") ? [] : (stryCov_9fa48("14353"), [new THREE.Vector3()]), id);
    if (stryMutAct_9fa48("14354")) {
      ;
    } else {
      stryCov_9fa48("14354");
      scene.add(model.group);
    }
    const coil = Array.from(stryMutAct_9fa48("14355") ? {} : (stryCov_9fa48("14355"), {
      length: 161
    }), (_, index) => {
      if (stryMutAct_9fa48("14356")) {
        {}
      } else {
        stryCov_9fa48("14356");
        const angle = stryMutAct_9fa48("14357") ? index / 160 * Math.PI / 12 : (stryCov_9fa48("14357"), (stryMutAct_9fa48("14358") ? index / 160 / Math.PI : (stryCov_9fa48("14358"), (stryMutAct_9fa48("14359") ? index * 160 : (stryCov_9fa48("14359"), index / 160)) * Math.PI)) * 12);
        return new THREE.Vector3(stryMutAct_9fa48("14360") ? Math.cos(angle) / 0.095 : (stryCov_9fa48("14360"), Math.cos(angle) * 0.095), stryMutAct_9fa48("14361") ? 0.19 - index / 160 * 0.42 : (stryCov_9fa48("14361"), 0.19 + (stryMutAct_9fa48("14362") ? index / 160 / 0.42 : (stryCov_9fa48("14362"), (stryMutAct_9fa48("14363") ? index * 160 : (stryCov_9fa48("14363"), index / 160)) * 0.42))), stryMutAct_9fa48("14364") ? Math.sin(angle) / 0.095 : (stryCov_9fa48("14364"), Math.sin(angle) * 0.095));
      }
    });
    const spring = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coil), 160, 0.009, 6, stryMutAct_9fa48("14365") ? true : (stryCov_9fa48("14365"), false)), new THREE.MeshStandardMaterial(stryMutAct_9fa48("14366") ? {} : (stryCov_9fa48("14366"), {
      color: stryMutAct_9fa48("14367") ? "" : (stryCov_9fa48("14367"), '#d5bd86'),
      metalness: 0.7,
      roughness: 0.3
    })));
    spring.visible = stryMutAct_9fa48("14368") ? true : (stryCov_9fa48("14368"), false);
    if (stryMutAct_9fa48("14369")) {
      ;
    } else {
      stryCov_9fa48("14369");
      scene.add(spring);
    }
    scene.add(new THREE.HemisphereLight(stryMutAct_9fa48("14371") ? "" : (stryCov_9fa48("14371"), '#fff8eb'), stryMutAct_9fa48("14372") ? "" : (stryCov_9fa48("14372"), '#566b63'), 3));
    const key = new THREE.DirectionalLight(stryMutAct_9fa48("14373") ? "" : (stryCov_9fa48("14373"), '#ffffff'), 4);
    key.position.set(stryMutAct_9fa48("14375") ? +3 : (stryCov_9fa48("14375"), -3), 5, 4);
    const rim = new THREE.DirectionalLight(stryMutAct_9fa48("14376") ? "" : (stryCov_9fa48("14376"), '#cce1dd'), 3);
    rim.position.set(3, 2, stryMutAct_9fa48("14378") ? +3 : (stryCov_9fa48("14378"), -3));
    if (stryMutAct_9fa48("14379")) {
      ;
    } else {
      stryCov_9fa48("14379");
      scene.add(key, rim);
    }
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = stryMutAct_9fa48("14380") ? true : (stryCov_9fa48("14380"), false);
    controls.enableDamping = stryMutAct_9fa48("14381") ? true : (stryCov_9fa48("14381"), false);
    controls.minDistance = 1.6;
    controls.maxDistance = 7;
    let progress = 0;
    let frame = 0;
    const reducedMotion = window.matchMedia(stryMutAct_9fa48("14382") ? "" : (stryCov_9fa48("14382"), '(prefers-reduced-motion: reduce)'));
    let stopped = stryMutAct_9fa48("14383") ? true : (stryCov_9fa48("14383"), false);
    function render() {
      if (stryMutAct_9fa48("14384")) {
        {}
      } else {
        stryCov_9fa48("14384");
        if (stryMutAct_9fa48("14387") ? false : stryMutAct_9fa48("14386") ? true : stryMutAct_9fa48("14385") ? stopped : (stryCov_9fa48("14385", "14386", "14387"), !stopped)) if (stryMutAct_9fa48("14388")) {
          ;
        } else {
          stryCov_9fa48("14388");
          renderer.render(scene, camera);
        }
      }
    }
    function reset() {
      if (stryMutAct_9fa48("14389")) {
        {}
      } else {
        stryCov_9fa48("14389");
        if (stryMutAct_9fa48("14390")) {
          ;
        } else {
          stryCov_9fa48("14390");
          controls.target.set(0, 0.75, 0);
        }
        if (stryMutAct_9fa48("14391")) {
          ;
        } else {
          stryCov_9fa48("14391");
          camera.position.set(2, 2.4, 2.8);
        }
        if (stryMutAct_9fa48("14392")) {
          ;
        } else {
          stryCov_9fa48("14392");
          controls.update();
        }
        if (stryMutAct_9fa48("14393")) {
          ;
        } else {
          stryCov_9fa48("14393");
          render();
        }
      }
    }
    function resize() {
      if (stryMutAct_9fa48("14394")) {
        {}
      } else {
        stryCov_9fa48("14394");
        if (stryMutAct_9fa48("14395")) {
          ;
        } else {
          stryCov_9fa48("14395");
          renderer.setSize(element.clientWidth, element.clientHeight);
        }
        camera.aspect = stryMutAct_9fa48("14396") ? element.clientWidth * Math.max(1, element.clientHeight) : (stryCov_9fa48("14396"), element.clientWidth / (stryMutAct_9fa48("14397") ? Math.min(1, element.clientHeight) : (stryCov_9fa48("14397"), Math.max(1, element.clientHeight))));
        if (stryMutAct_9fa48("14398")) {
          ;
        } else {
          stryCov_9fa48("14398");
          camera.updateProjectionMatrix();
        }
        if (stryMutAct_9fa48("14399")) {
          ;
        } else {
          stryCov_9fa48("14399");
          render();
        }
      }
    }
    function keydown(event: KeyboardEvent) {
      if (stryMutAct_9fa48("14400")) {
        {}
      } else {
        stryCov_9fa48("14400");
        const angle = (stryMutAct_9fa48("14403") ? event.key !== 'ArrowLeft' : stryMutAct_9fa48("14402") ? false : stryMutAct_9fa48("14401") ? true : (stryCov_9fa48("14401", "14402", "14403"), event.key === (stryMutAct_9fa48("14404") ? "" : (stryCov_9fa48("14404"), 'ArrowLeft')))) ? stryMutAct_9fa48("14405") ? +0.15 : (stryCov_9fa48("14405"), -0.15) : (stryMutAct_9fa48("14408") ? event.key !== 'ArrowRight' : stryMutAct_9fa48("14407") ? false : stryMutAct_9fa48("14406") ? true : (stryCov_9fa48("14406", "14407", "14408"), event.key === (stryMutAct_9fa48("14409") ? "" : (stryCov_9fa48("14409"), 'ArrowRight')))) ? 0.15 : 0;
        if (stryMutAct_9fa48("14411") ? false : stryMutAct_9fa48("14410") ? true : (stryCov_9fa48("14410", "14411"), angle)) {
          if (stryMutAct_9fa48("14412")) {
            {}
          } else {
            stryCov_9fa48("14412");
            if (stryMutAct_9fa48("14413")) {
              ;
            } else {
              stryCov_9fa48("14413");
              camera.position.sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle).add(controls.target);
            }
          }
        } else if (stryMutAct_9fa48("14416") ? event.key === 'ArrowUp' && event.key === 'ArrowDown' : stryMutAct_9fa48("14415") ? false : stryMutAct_9fa48("14414") ? true : (stryCov_9fa48("14414", "14415", "14416"), (stryMutAct_9fa48("14418") ? event.key !== 'ArrowUp' : stryMutAct_9fa48("14417") ? false : (stryCov_9fa48("14417", "14418"), event.key === (stryMutAct_9fa48("14419") ? "" : (stryCov_9fa48("14419"), 'ArrowUp')))) || (stryMutAct_9fa48("14421") ? event.key !== 'ArrowDown' : stryMutAct_9fa48("14420") ? false : (stryCov_9fa48("14420", "14421"), event.key === (stryMutAct_9fa48("14422") ? "" : (stryCov_9fa48("14422"), 'ArrowDown')))))) {
          if (stryMutAct_9fa48("14423")) {
            {}
          } else {
            stryCov_9fa48("14423");
            const offset = camera.position.clone().sub(controls.target);
            const spherical = new THREE.Spherical().setFromVector3(offset);
            spherical.phi = THREE.MathUtils.clamp(stryMutAct_9fa48("14424") ? spherical.phi - (event.key === 'ArrowUp' ? -0.1 : 0.1) : (stryCov_9fa48("14424"), spherical.phi + ((stryMutAct_9fa48("14427") ? event.key !== 'ArrowUp' : stryMutAct_9fa48("14426") ? false : stryMutAct_9fa48("14425") ? true : (stryCov_9fa48("14425", "14426", "14427"), event.key === (stryMutAct_9fa48("14428") ? "" : (stryCov_9fa48("14428"), 'ArrowUp')))) ? stryMutAct_9fa48("14429") ? +0.1 : (stryCov_9fa48("14429"), -0.1) : 0.1)), 0.1, stryMutAct_9fa48("14430") ? Math.PI + 0.1 : (stryCov_9fa48("14430"), Math.PI - 0.1));
            if (stryMutAct_9fa48("14431")) {
              ;
            } else {
              stryCov_9fa48("14431");
              camera.position.copy(controls.target).add(offset.setFromSpherical(spherical));
            }
          }
        } else if (stryMutAct_9fa48("14433") ? false : stryMutAct_9fa48("14432") ? true : (stryCov_9fa48("14432", "14433"), (stryMutAct_9fa48("14434") ? [] : (stryCov_9fa48("14434"), [stryMutAct_9fa48("14435") ? "" : (stryCov_9fa48("14435"), '+'), stryMutAct_9fa48("14436") ? "" : (stryCov_9fa48("14436"), '='), stryMutAct_9fa48("14437") ? "" : (stryCov_9fa48("14437"), '-')])).includes(event.key))) {
          if (stryMutAct_9fa48("14438")) {
            {}
          } else {
            stryCov_9fa48("14438");
            const offset = camera.position.clone().sub(controls.target);
            offset.setLength(THREE.MathUtils.clamp(stryMutAct_9fa48("14440") ? offset.length() / (event.key === '-' ? 1.1 : 0.9) : (stryCov_9fa48("14440"), offset.length() * ((stryMutAct_9fa48("14443") ? event.key !== '-' : stryMutAct_9fa48("14442") ? false : stryMutAct_9fa48("14441") ? true : (stryCov_9fa48("14441", "14442", "14443"), event.key === (stryMutAct_9fa48("14444") ? "" : (stryCov_9fa48("14444"), '-')))) ? 1.1 : 0.9)), controls.minDistance, controls.maxDistance));
            if (stryMutAct_9fa48("14445")) {
              ;
            } else {
              stryCov_9fa48("14445");
              camera.position.copy(controls.target).add(offset);
            }
          }
        } else return;
        if (stryMutAct_9fa48("14446")) {
          ;
        } else {
          stryCov_9fa48("14446");
          event.preventDefault();
        }
        if (stryMutAct_9fa48("14447")) {
          ;
        } else {
          stryCov_9fa48("14447");
          controls.update();
        }
        if (stryMutAct_9fa48("14448")) {
          ;
        } else {
          stryCov_9fa48("14448");
          render();
        }
      }
    }
    function contextLost(event: Event) {
      if (stryMutAct_9fa48("14449")) {
        {}
      } else {
        stryCov_9fa48("14449");
        if (stryMutAct_9fa48("14450")) {
          ;
        } else {
          stryCov_9fa48("14450");
          event.preventDefault();
        }
        stopped = stryMutAct_9fa48("14451") ? false : (stryCov_9fa48("14451"), true);
        if (stryMutAct_9fa48("14452")) {
          ;
        } else {
          stryCov_9fa48("14452");
          onError();
        }
      }
    }
    controls.addEventListener(stryMutAct_9fa48("14454") ? "" : (stryCov_9fa48("14454"), 'change'), render);
    renderer.domElement.addEventListener(stryMutAct_9fa48("14456") ? "" : (stryCov_9fa48("14456"), 'keydown'), keydown);
    renderer.domElement.addEventListener(stryMutAct_9fa48("14458") ? "" : (stryCov_9fa48("14458"), 'webglcontextlost'), contextLost);
    const observer = new ResizeObserver(resize);
    if (stryMutAct_9fa48("14459")) {
      ;
    } else {
      stryCov_9fa48("14459");
      observer.observe(element);
    }
    if (stryMutAct_9fa48("14460")) {
      ;
    } else {
      stryCov_9fa48("14460");
      reset();
    }
    if (stryMutAct_9fa48("14461")) {
      ;
    } else {
      stryCov_9fa48("14461");
      resize();
    }
    return stryMutAct_9fa48("14462") ? {} : (stryCov_9fa48("14462"), {
      reset,
      separate(value: boolean) {
        if (stryMutAct_9fa48("14463")) {
          {}
        } else {
          stryCov_9fa48("14463");
          if (stryMutAct_9fa48("14464")) {
            ;
          } else {
            stryCov_9fa48("14464");
            cancelAnimationFrame(frame);
          }
          const start = progress;
          const target = value ? 1 : 0;
          const began = performance.now();
          function animate(now: number) {
            if (stryMutAct_9fa48("14465")) {
              {}
            } else {
              stryCov_9fa48("14465");
              if (stryMutAct_9fa48("14467") ? false : stryMutAct_9fa48("14466") ? true : (stryCov_9fa48("14466", "14467"), stopped)) return;
              const elapsed = reducedMotion.matches ? 1 : stryMutAct_9fa48("14468") ? Math.max(1, (now - began) / 650) : (stryCov_9fa48("14468"), Math.min(1, stryMutAct_9fa48("14469") ? (now - began) * 650 : (stryCov_9fa48("14469"), (stryMutAct_9fa48("14470") ? now + began : (stryCov_9fa48("14470"), now - began)) / 650)));
              const eased = stryMutAct_9fa48("14471") ? elapsed * elapsed / (3 - 2 * elapsed) : (stryCov_9fa48("14471"), (stryMutAct_9fa48("14472") ? elapsed / elapsed : (stryCov_9fa48("14472"), elapsed * elapsed)) * (stryMutAct_9fa48("14473") ? 3 + 2 * elapsed : (stryCov_9fa48("14473"), 3 - (stryMutAct_9fa48("14474") ? 2 / elapsed : (stryCov_9fa48("14474"), 2 * elapsed)))));
              progress = stryMutAct_9fa48("14475") ? start - (target - start) * eased : (stryCov_9fa48("14475"), start + (stryMutAct_9fa48("14476") ? (target - start) / eased : (stryCov_9fa48("14476"), (stryMutAct_9fa48("14477") ? target + start : (stryCov_9fa48("14477"), target - start)) * eased)));
              if (stryMutAct_9fa48("14478")) {
                ;
              } else {
                stryCov_9fa48("14478");
                model.separate(progress);
              }
              spring.visible = stryMutAct_9fa48("14482") ? progress <= 0 : stryMutAct_9fa48("14481") ? progress >= 0 : stryMutAct_9fa48("14480") ? false : stryMutAct_9fa48("14479") ? true : (stryCov_9fa48("14479", "14480", "14481", "14482"), progress > 0);
              spring.scale.y = stryMutAct_9fa48("14483") ? 0.35 - progress * 0.65 : (stryCov_9fa48("14483"), 0.35 + (stryMutAct_9fa48("14484") ? progress / 0.65 : (stryCov_9fa48("14484"), progress * 0.65)));
              if (stryMutAct_9fa48("14485")) {
                ;
              } else {
                stryCov_9fa48("14485");
                render();
              }
              if (stryMutAct_9fa48("14489") ? elapsed >= 1 : stryMutAct_9fa48("14488") ? elapsed <= 1 : stryMutAct_9fa48("14487") ? false : stryMutAct_9fa48("14486") ? true : (stryCov_9fa48("14486", "14487", "14488", "14489"), elapsed < 1)) frame = requestAnimationFrame(animate);
            }
          }
          if (stryMutAct_9fa48("14490")) {
            ;
          } else {
            stryCov_9fa48("14490");
            animate(began);
          }
        }
      },
      dispose() {
        if (stryMutAct_9fa48("14491")) {
          {}
        } else {
          stryCov_9fa48("14491");
          stopped = stryMutAct_9fa48("14492") ? false : (stryCov_9fa48("14492"), true);
          if (stryMutAct_9fa48("14493")) {
            ;
          } else {
            stryCov_9fa48("14493");
            cancelAnimationFrame(frame);
          }
          if (stryMutAct_9fa48("14494")) {
            ;
          } else {
            stryCov_9fa48("14494");
            observer.disconnect();
          }
          if (stryMutAct_9fa48("14495")) {
            ;
          } else {
            stryCov_9fa48("14495");
            controls.dispose();
          }
          renderer.domElement.removeEventListener(stryMutAct_9fa48("14497") ? "" : (stryCov_9fa48("14497"), 'keydown'), keydown);
          renderer.domElement.removeEventListener(stryMutAct_9fa48("14499") ? "" : (stryCov_9fa48("14499"), 'webglcontextlost'), contextLost);
          if (stryMutAct_9fa48("14500")) {
            ;
          } else {
            stryCov_9fa48("14500");
            model.dispose();
          }
          if (stryMutAct_9fa48("14501")) {
            ;
          } else {
            stryCov_9fa48("14501");
            spring.geometry.dispose();
          }
          if (stryMutAct_9fa48("14502")) {
            ;
          } else {
            stryCov_9fa48("14502");
            spring.material.dispose();
          }
          if (stryMutAct_9fa48("14503")) {
            ;
          } else {
            stryCov_9fa48("14503");
            renderer.dispose();
          }
          if (stryMutAct_9fa48("14504")) {
            ;
          } else {
            stryCov_9fa48("14504");
            renderer.domElement.remove();
          }
        }
      }
    });
  }
}
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
import { adaptQ1MaxModel } from './q1-model';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Build, Palette } from './build';
import { legendInk } from './appearance';
import { createDeskScene } from './desk-scene';
import { createSwitchAssembly, switchColors } from './switch-model';
import { monitorTransform, type ScreenPoint } from './monitor-projection';
import { createAccessoryPreview } from './accessory-model';
import type { AccessorySelection } from './build-accessories';

// Steam contributes to the color pass, but must not cast rectangular occlusion.
class RoomOcclusion extends GTAOPass {
  override render(...args: Parameters<GTAOPass['render']>) {
    if (stryMutAct_9fa48("11792")) {
      {}
    } else {
      stryCov_9fa48("11792");
      if (stryMutAct_9fa48("11793")) {
        ;
      } else {
        stryCov_9fa48("11793");
        this.camera.layers.disable(1);
      }
      try {
        if (stryMutAct_9fa48("11794")) {
          {}
        } else {
          stryCov_9fa48("11794");
          if (stryMutAct_9fa48("11795")) {
            ;
          } else {
            stryCov_9fa48("11795");
            super.render(...args);
          }
        }
      } finally {
        if (stryMutAct_9fa48("11796")) {
          {}
        } else {
          stryCov_9fa48("11796");
          if (stryMutAct_9fa48("11797")) {
            ;
          } else {
            stryCov_9fa48("11797");
            this.camera.layers.enable(1);
          }
        }
      }
    }
  }
}
export type SceneOptions = Pick<Build, 'caseColor' | 'finish' | 'profile'> & Omit<Palette, 'name'> & {
  device: {
    kind: 'keyboard';
    layout: Build['layout'];
    q1Max?: boolean;
  } | {
    kind: 'control-deck';
    model: 'grok-bot' | 'codex-micro';
    dial: number;
    lighting: 'Studio' | 'Daylight' | 'After hours';
  };
  switchId?: string;
  exploded: boolean;
  view: string;
  environment: 'desk' | 'studio' | 'typing';
  roomMotion?: boolean;
  accessories?: readonly AccessorySelection[];
  customAccessories?: Build['customAccessories'];
};
export type SceneStatus = {
  kind: 'loading' | 'ready';
} | {
  kind: 'error';
  message: string;
};
type Callbacks = {
  press: (code: string) => void;
  release: (code: string) => void;
  status: (state: SceneStatus) => void;
};
function disposeModel(model: THREE.Object3D) {
  if (stryMutAct_9fa48("11798")) {
    {}
  } else {
    stryCov_9fa48("11798");
    const materials = new Set<THREE.Material>();
    const geometries = new Set<THREE.BufferGeometry>();
    model.traverse(object => {
      if (stryMutAct_9fa48("11800")) {
        {}
      } else {
        stryCov_9fa48("11800");
        if (stryMutAct_9fa48("11802") ? false : stryMutAct_9fa48("11801") ? true : (stryCov_9fa48("11801", "11802"), object instanceof THREE.Mesh)) {
          if (stryMutAct_9fa48("11803")) {
            {}
          } else {
            stryCov_9fa48("11803");
            if (stryMutAct_9fa48("11804")) {
              ;
            } else {
              stryCov_9fa48("11804");
              geometries.add(object.geometry);
            }
            for (const material of Array.isArray(object.material) ? object.material : stryMutAct_9fa48("11805") ? [] : (stryCov_9fa48("11805"), [object.material])) if (stryMutAct_9fa48("11806")) {
              ;
            } else {
              stryCov_9fa48("11806");
              materials.add(material);
            }
          }
        }
      }
    });
    geometries.forEach(stryMutAct_9fa48("11808") ? () => undefined : (stryCov_9fa48("11808"), geometry => geometry.dispose()));
    materials.forEach(stryMutAct_9fa48("11810") ? () => undefined : (stryCov_9fa48("11810"), material => material.dispose()));
  }
}
export function createKeyboardScene(element: HTMLElement, initial: SceneOptions, events: Callbacks) {
  if (stryMutAct_9fa48("11811")) {
    {}
  } else {
    stryCov_9fa48("11811");
    let callbacks = events;
    let options = initial;
    let stopped = stryMutAct_9fa48("11812") ? true : (stryCov_9fa48("11812"), false);
    let graphicsLost = stryMutAct_9fa48("11813") ? true : (stryCov_9fa48("11813"), false);
    let frame = 0;
    let ambientTimer = 0;
    let visible = stryMutAct_9fa48("11814") ? false : (stryCov_9fa48("11814"), true);
    let lastFrame = 0;
    let generation = 0;
    let model: THREE.Group | null = null;
    let accessories: ReturnType<typeof createAccessoryPreview> | null = null;
    let cameraTarget: THREE.Vector3 | null = null;
    let focusHeight = 0.4;
    let focusX = 0;
    let focusDepth = 0;
    let ambientTime = 0;
    let assembledDistance = 11;
    const models = new Map<string, Promise<THREE.Group>>();
    const loaded = new Set<THREE.Group>();
    const keys = new Map<string, THREE.Object3D>();
    const restingHeight = new WeakMap<THREE.Object3D, number>();
    const layers = new Map<THREE.Object3D, number>();
    const materials = new Map<THREE.MeshStandardMaterial, THREE.Color>();
    const down = new Set<string>();
    let clicked = stryMutAct_9fa48("11815") ? "Stryker was here!" : (stryCov_9fa48("11815"), '');
    const preference = window.matchMedia(stryMutAct_9fa48("11816") ? "" : (stryCov_9fa48("11816"), '(prefers-reduced-motion: reduce)'));
    let reduced = preference.matches;
    const renderer = new THREE.WebGLRenderer(stryMutAct_9fa48("11817") ? {} : (stryCov_9fa48("11817"), {
      antialias: stryMutAct_9fa48("11818") ? false : (stryCov_9fa48("11818"), true),
      alpha: stryMutAct_9fa48("11819") ? false : (stryCov_9fa48("11819"), true),
      powerPreference: stryMutAct_9fa48("11820") ? "" : (stryCov_9fa48("11820"), 'high-performance')
    }));
    const gl = renderer.getContext();
    const debug = gl.getExtension(stryMutAct_9fa48("11821") ? "" : (stryCov_9fa48("11821"), 'WEBGL_debug_renderer_info'));
    const rendererName = String(gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    const software = /swiftshader|llvmpipe|softpipe|software rasterizer|microsoft basic render/i.test(rendererName);
    element.dataset.renderQuality = software ? stryMutAct_9fa48("11822") ? "" : (stryCov_9fa48("11822"), 'efficient') : stryMutAct_9fa48("11823") ? "" : (stryCov_9fa48("11823"), 'full');
    renderer.setPixelRatio(software ? 0.75 : stryMutAct_9fa48("11825") ? Math.max(window.devicePixelRatio, 2) : (stryCov_9fa48("11825"), Math.min(window.devicePixelRatio, 2)));
    renderer.shadowMap.enabled = stryMutAct_9fa48("11826") ? false : (stryCov_9fa48("11826"), true);
    renderer.shadowMap.type = software ? THREE.PCFShadowMap : THREE.VSMShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute(stryMutAct_9fa48("11828") ? "" : (stryCov_9fa48("11828"), 'role'), stryMutAct_9fa48("11829") ? "" : (stryCov_9fa48("11829"), 'application'));
    renderer.domElement.setAttribute(stryMutAct_9fa48("11831") ? "" : (stryCov_9fa48("11831"), 'aria-label'), stryMutAct_9fa48("11832") ? "" : (stryCov_9fa48("11832"), 'Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.'));
    if (stryMutAct_9fa48("11833")) {
      ;
    } else {
      stryCov_9fa48("11833");
      element.appendChild(renderer.domElement);
    }
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, software ? 0 : 0.04, 0.1, 100, stryMutAct_9fa48("11834") ? {} : (stryCov_9fa48("11834"), {
      size: software ? 32 : 256
    }));
    scene.environment = env.texture;
    scene.environmentIntensity = 0.7;
    if (stryMutAct_9fa48("11835")) {
      ;
    } else {
      stryCov_9fa48("11835");
      room.dispose();
    }
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 150);
    if (stryMutAct_9fa48("11836")) {
      ;
    } else {
      stryCov_9fa48("11836");
      camera.position.set(7, 15, 19);
    }
    if (stryMutAct_9fa48("11837")) {
      ;
    } else {
      stryCov_9fa48("11837");
      camera.layers.enable(1);
    }
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = stryMutAct_9fa48("11840") ? !reduced || !software : stryMutAct_9fa48("11839") ? false : stryMutAct_9fa48("11838") ? true : (stryCov_9fa48("11838", "11839", "11840"), (stryMutAct_9fa48("11841") ? reduced : (stryCov_9fa48("11841"), !reduced)) && (stryMutAct_9fa48("11842") ? software : (stryCov_9fa48("11842"), !software)));
    controls.dampingFactor = 0.1;
    controls.minDistance = 12;
    controls.maxDistance = 46;
    controls.maxPolarAngle = stryMutAct_9fa48("11843") ? Math.PI / 0.48 : (stryCov_9fa48("11843"), Math.PI * 0.48);
    if (stryMutAct_9fa48("11844")) {
      ;
    } else {
      stryCov_9fa48("11844");
      controls.target.set(0, 0.4, 0);
    }
    controls.enablePan = stryMutAct_9fa48("11845") ? true : (stryCov_9fa48("11845"), false);
    const light = new THREE.DirectionalLight(stryMutAct_9fa48("11846") ? "" : (stryCov_9fa48("11846"), '#ffffff'), 2.2);
    light.position.set(stryMutAct_9fa48("11848") ? +12 : (stryCov_9fa48("11848"), -12), 19, stryMutAct_9fa48("11849") ? +10 : (stryCov_9fa48("11849"), -10));
    light.castShadow = stryMutAct_9fa48("11850") ? false : (stryCov_9fa48("11850"), true);
    if (stryMutAct_9fa48("11851")) {
      ;
    } else {
      stryCov_9fa48("11851");
      light.shadow.mapSize.set(software ? 512 : 2048, software ? 512 : 2048);
    }
    light.shadow.camera.left = stryMutAct_9fa48("11852") ? +14 : (stryCov_9fa48("11852"), -14);
    light.shadow.camera.right = 14;
    light.shadow.camera.top = 12;
    light.shadow.camera.bottom = stryMutAct_9fa48("11853") ? +12 : (stryCov_9fa48("11853"), -12);
    light.shadow.radius = 3;
    light.shadow.blurSamples = 8;
    light.shadow.normalBias = 0.03;
    light.shadow.bias = stryMutAct_9fa48("11854") ? +0.0001 : (stryCov_9fa48("11854"), -0.0001);
    if (stryMutAct_9fa48("11855")) {
      ;
    } else {
      stryCov_9fa48("11855");
      scene.add(light);
    }
    const fill = new THREE.DirectionalLight(stryMutAct_9fa48("11856") ? "" : (stryCov_9fa48("11856"), '#ffffff'), 0.8);
    fill.position.set(8, 5, stryMutAct_9fa48("11858") ? +5 : (stryCov_9fa48("11858"), -5));
    scene.add(fill, new THREE.AmbientLight(stryMutAct_9fa48("11860") ? "" : (stryCov_9fa48("11860"), '#ffffff'), 0.25));
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial(stryMutAct_9fa48("11861") ? {} : (stryCov_9fa48("11861"), {
      color: stryMutAct_9fa48("11862") ? "" : (stryCov_9fa48("11862"), '#524c3c'),
      opacity: 0.22
    })));
    ground.rotation.x = stryMutAct_9fa48("11863") ? -Math.PI * 2 : (stryCov_9fa48("11863"), (stryMutAct_9fa48("11864") ? +Math.PI : (stryCov_9fa48("11864"), -Math.PI)) / 2);
    ground.position.y = stryMutAct_9fa48("11865") ? +0.22 : (stryCov_9fa48("11865"), -0.22);
    ground.receiveShadow = stryMutAct_9fa48("11866") ? false : (stryCov_9fa48("11866"), true);
    if (stryMutAct_9fa48("11867")) {
      ;
    } else {
      stryCov_9fa48("11867");
      scene.add(ground);
    }
    const desk = createDeskScene(() => {
      if (stryMutAct_9fa48("11868")) {
        {}
      } else {
        stryCov_9fa48("11868");
        deskCacheDirty = stryMutAct_9fa48("11869") ? false : (stryCov_9fa48("11869"), true);
        if (stryMutAct_9fa48("11870")) {
          ;
        } else {
          stryCov_9fa48("11870");
          wake();
        }
      }
    });
    if (stryMutAct_9fa48("11871")) {
      ;
    } else {
      stryCov_9fa48("11871");
      scene.add(desk.group);
    }
    const effects = software ? null : (() => {
      if (stryMutAct_9fa48("11872")) {
        {}
      } else {
        stryCov_9fa48("11872");
        const renderTarget = new THREE.WebGLRenderTarget(1, 1, stryMutAct_9fa48("11873") ? {} : (stryCov_9fa48("11873"), {
          type: THREE.HalfFloatType,
          samples: 2
        }));
        const composer = new EffectComposer(renderer, renderTarget);
        if (stryMutAct_9fa48("11874")) {
          ;
        } else {
          stryCov_9fa48("11874");
          composer.addPass(new RenderPass(scene, camera));
        }
        const occlusion = new RoomOcclusion(scene, camera, 1, 1);
        occlusion.updateGtaoMaterial(stryMutAct_9fa48("11876") ? {} : (stryCov_9fa48("11876"), {
          radius: 0.9,
          thickness: 1.5,
          distanceFallOff: 0.75,
          samples: 12
        }));
        occlusion.blendIntensity = 0.7;
        if (stryMutAct_9fa48("11877")) {
          ;
        } else {
          stryCov_9fa48("11877");
          composer.addPass(occlusion);
        }
        const output = new OutputPass();
        if (stryMutAct_9fa48("11878")) {
          ;
        } else {
          stryCov_9fa48("11878");
          composer.addPass(output);
        }
        return stryMutAct_9fa48("11879") ? {} : (stryCov_9fa48("11879"), {
          composer,
          occlusion,
          output
        });
      }
    })();
    const deskCache = software ? new THREE.WebGLRenderTarget(1, 1, stryMutAct_9fa48("11880") ? {} : (stryCov_9fa48("11880"), {
      type: THREE.HalfFloatType
    })) : null;
    let deskCacheDirty = stryMutAct_9fa48("11881") ? false : (stryCov_9fa48("11881"), true);
    const grain = new Uint8Array(stryMutAct_9fa48("11882") ? 128 * 128 / 4 : (stryCov_9fa48("11882"), (stryMutAct_9fa48("11883") ? 128 / 128 : (stryCov_9fa48("11883"), 128 * 128)) * 4));
    for (let i = 0; stryMutAct_9fa48("11886") ? i >= grain.length : stryMutAct_9fa48("11885") ? i <= grain.length : stryMutAct_9fa48("11884") ? false : (stryCov_9fa48("11884", "11885", "11886"), i < grain.length); stryMutAct_9fa48("11887") ? i -= 4 : (stryCov_9fa48("11887"), i += 4)) {
      if (stryMutAct_9fa48("11888")) {
        {}
      } else {
        stryCov_9fa48("11888");
        const value = stryMutAct_9fa48("11889") ? 150 - Math.floor(Math.random() * 80) : (stryCov_9fa48("11889"), 150 + Math.floor(stryMutAct_9fa48("11890") ? Math.random() / 80 : (stryCov_9fa48("11890"), Math.random() * 80)));
        grain[i] = grain[stryMutAct_9fa48("11891") ? i - 1 : (stryCov_9fa48("11891"), i + 1)] = grain[stryMutAct_9fa48("11892") ? i - 2 : (stryCov_9fa48("11892"), i + 2)] = value;
        grain[stryMutAct_9fa48("11893") ? i - 3 : (stryCov_9fa48("11893"), i + 3)] = 255;
      }
    }
    const noise = new THREE.DataTexture(grain, 128, 128);
    noise.wrapS = noise.wrapT = THREE.RepeatWrapping;
    if (stryMutAct_9fa48("11894")) {
      ;
    } else {
      stryCov_9fa48("11894");
      noise.repeat.set(10, 10);
    }
    noise.magFilter = THREE.LinearFilter;
    noise.minFilter = THREE.LinearMipmapLinearFilter;
    noise.generateMipmaps = stryMutAct_9fa48("11895") ? false : (stryCov_9fa48("11895"), true);
    noise.needsUpdate = stryMutAct_9fa48("11896") ? false : (stryCov_9fa48("11896"), true);
    function wake() {
      if (stryMutAct_9fa48("11897")) {
        {}
      } else {
        stryCov_9fa48("11897");
        if (stryMutAct_9fa48("11898")) {
          ;
        } else {
          stryCov_9fa48("11898");
          window.clearTimeout(ambientTimer);
        }
        ambientTimer = 0;
        if (stryMutAct_9fa48("11901") ? !stopped && !graphicsLost && !frame && visible || !document.hidden : stryMutAct_9fa48("11900") ? false : stryMutAct_9fa48("11899") ? true : (stryCov_9fa48("11899", "11900", "11901"), (stryMutAct_9fa48("11903") ? !stopped && !graphicsLost && !frame || visible : stryMutAct_9fa48("11902") ? true : (stryCov_9fa48("11902", "11903"), (stryMutAct_9fa48("11905") ? !stopped && !graphicsLost || !frame : stryMutAct_9fa48("11904") ? true : (stryCov_9fa48("11904", "11905"), (stryMutAct_9fa48("11907") ? !stopped || !graphicsLost : stryMutAct_9fa48("11906") ? true : (stryCov_9fa48("11906", "11907"), (stryMutAct_9fa48("11908") ? stopped : (stryCov_9fa48("11908"), !stopped)) && (stryMutAct_9fa48("11909") ? graphicsLost : (stryCov_9fa48("11909"), !graphicsLost)))) && (stryMutAct_9fa48("11910") ? frame : (stryCov_9fa48("11910"), !frame)))) && visible)) && (stryMutAct_9fa48("11911") ? document.hidden : (stryCov_9fa48("11911"), !document.hidden)))) {
          if (stryMutAct_9fa48("11912")) {
            {}
          } else {
            stryCov_9fa48("11912");
            frame = requestAnimationFrame(render);
            element.dataset.renderState = stryMutAct_9fa48("11913") ? "" : (stryCov_9fa48("11913"), 'active');
          }
        }
      }
    }
    function appearance(snap = stryMutAct_9fa48("11914") ? true : (stryCov_9fa48("11914"), false)) {
      if (stryMutAct_9fa48("11915")) {
        {}
      } else {
        stryCov_9fa48("11915");
        desk.group.visible = stryMutAct_9fa48("11918") ? options.environment === 'studio' : stryMutAct_9fa48("11917") ? false : stryMutAct_9fa48("11916") ? true : (stryCov_9fa48("11916", "11917", "11918"), options.environment !== (stryMutAct_9fa48("11919") ? "" : (stryCov_9fa48("11919"), 'studio')));
        ground.visible = stryMutAct_9fa48("11920") ? desk.group.visible : (stryCov_9fa48("11920"), !desk.group.visible);
        renderer.domElement.setAttribute(stryMutAct_9fa48("11922") ? "" : (stryCov_9fa48("11922"), 'aria-label'), (stryMutAct_9fa48("11925") ? options.environment !== 'typing' : stryMutAct_9fa48("11924") ? false : stryMutAct_9fa48("11923") ? true : (stryCov_9fa48("11923", "11924", "11925"), options.environment === (stryMutAct_9fa48("11926") ? "" : (stryCov_9fa48("11926"), 'typing')))) ? stryMutAct_9fa48("11927") ? "" : (stryCov_9fa48("11927"), 'Keyboard preview. Type inside the monitor or click a key to try your build.') : stryMutAct_9fa48("11928") ? "" : (stryCov_9fa48("11928"), 'Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.'));
        const lighting = (stryMutAct_9fa48("11931") ? options.device.kind !== 'control-deck' : stryMutAct_9fa48("11930") ? false : stryMutAct_9fa48("11929") ? true : (stryCov_9fa48("11929", "11930", "11931"), options.device.kind === (stryMutAct_9fa48("11932") ? "" : (stryCov_9fa48("11932"), 'control-deck')))) ? options.device.lighting : stryMutAct_9fa48("11933") ? "" : (stryCov_9fa48("11933"), 'Studio');
        light.color.set((stryMutAct_9fa48("11937") ? lighting === 'Daylight' && desk.group.visible : stryMutAct_9fa48("11936") ? false : stryMutAct_9fa48("11935") ? true : (stryCov_9fa48("11935", "11936", "11937"), (stryMutAct_9fa48("11939") ? lighting !== 'Daylight' : stryMutAct_9fa48("11938") ? false : (stryCov_9fa48("11938", "11939"), lighting === (stryMutAct_9fa48("11940") ? "" : (stryCov_9fa48("11940"), 'Daylight')))) || desk.group.visible)) ? stryMutAct_9fa48("11941") ? "" : (stryCov_9fa48("11941"), '#fff1db') : stryMutAct_9fa48("11942") ? "" : (stryCov_9fa48("11942"), '#ffffff'));
        light.intensity = (stryMutAct_9fa48("11945") ? lighting !== 'After hours' : stryMutAct_9fa48("11944") ? false : stryMutAct_9fa48("11943") ? true : (stryCov_9fa48("11943", "11944", "11945"), lighting === (stryMutAct_9fa48("11946") ? "" : (stryCov_9fa48("11946"), 'After hours')))) ? 0.7 : desk.group.visible ? 0.9 : 2.2;
        fill.intensity = (stryMutAct_9fa48("11949") ? lighting !== 'After hours' : stryMutAct_9fa48("11948") ? false : stryMutAct_9fa48("11947") ? true : (stryCov_9fa48("11947", "11948", "11949"), lighting === (stryMutAct_9fa48("11950") ? "" : (stryCov_9fa48("11950"), 'After hours')))) ? 0.3 : 0.8;
        scene.environmentIntensity = (stryMutAct_9fa48("11953") ? lighting !== 'After hours' : stryMutAct_9fa48("11952") ? false : stryMutAct_9fa48("11951") ? true : (stryCov_9fa48("11951", "11952", "11953"), lighting === (stryMutAct_9fa48("11954") ? "" : (stryCov_9fa48("11954"), 'After hours')))) ? 0.35 : desk.group.visible ? 0.72 : 0.7;
        const colors = new Map(stryMutAct_9fa48("11955") ? [] : (stryCov_9fa48("11955"), [stryMutAct_9fa48("11956") ? [] : (stryCov_9fa48("11956"), [stryMutAct_9fa48("11957") ? "" : (stryCov_9fa48("11957"), 'case'), options.caseColor]), stryMutAct_9fa48("11958") ? [] : (stryCov_9fa48("11958"), [stryMutAct_9fa48("11959") ? "" : (stryCov_9fa48("11959"), 'alpha'), options.alpha]), stryMutAct_9fa48("11960") ? [] : (stryCov_9fa48("11960"), [stryMutAct_9fa48("11961") ? "" : (stryCov_9fa48("11961"), 'mod'), options.mod]), stryMutAct_9fa48("11962") ? [] : (stryCov_9fa48("11962"), [stryMutAct_9fa48("11963") ? "" : (stryCov_9fa48("11963"), 'accent'), options.accent]), stryMutAct_9fa48("11964") ? [] : (stryCov_9fa48("11964"), [stryMutAct_9fa48("11965") ? "" : (stryCov_9fa48("11965"), 'space'), options.space]), stryMutAct_9fa48("11966") ? [] : (stryCov_9fa48("11966"), [stryMutAct_9fa48("11967") ? "" : (stryCov_9fa48("11967"), 'switch_housing'), switchColors(stryMutAct_9fa48("11968") ? options.switchId && '' : (stryCov_9fa48("11968"), options.switchId ?? (stryMutAct_9fa48("11969") ? "Stryker was here!" : (stryCov_9fa48("11969"), '')))).housing]), stryMutAct_9fa48("11970") ? [] : (stryCov_9fa48("11970"), [stryMutAct_9fa48("11971") ? "" : (stryCov_9fa48("11971"), 'switch_stem'), switchColors(stryMutAct_9fa48("11972") ? options.switchId && '' : (stryCov_9fa48("11972"), options.switchId ?? (stryMutAct_9fa48("11973") ? "Stryker was here!" : (stryCov_9fa48("11973"), '')))).stem])]));
        for (const [material, target] of materials) {
          if (stryMutAct_9fa48("11974")) {
            {}
          } else {
            stryCov_9fa48("11974");
            const name = material.name.split(stryMutAct_9fa48("11975") ? "" : (stryCov_9fa48("11975"), '.'))[0];
            const legend = stryMutAct_9fa48("11976") ? name.endsWith('legend_') : (stryCov_9fa48("11976"), name.startsWith(stryMutAct_9fa48("11977") ? "" : (stryCov_9fa48("11977"), 'legend_')));
            const color = colors.get(legend ? stryMutAct_9fa48("11978") ? name : (stryCov_9fa48("11978"), name.slice(7)) : name);
            if (stryMutAct_9fa48("11980") ? false : stryMutAct_9fa48("11979") ? true : (stryCov_9fa48("11979", "11980"), color)) if (stryMutAct_9fa48("11981")) {
              ;
            } else {
              stryCov_9fa48("11981");
              target.set(legend ? legendInk(color) : color);
            }
            if (stryMutAct_9fa48("11983") ? false : stryMutAct_9fa48("11982") ? true : (stryCov_9fa48("11982", "11983"), snap)) if (stryMutAct_9fa48("11984")) {
              ;
            } else {
              stryCov_9fa48("11984");
              material.color.copy(target);
            }
            if (stryMutAct_9fa48("11987") ? name !== 'case' : stryMutAct_9fa48("11986") ? false : stryMutAct_9fa48("11985") ? true : (stryCov_9fa48("11985", "11986", "11987"), name === (stryMutAct_9fa48("11988") ? "" : (stryCov_9fa48("11988"), 'case')))) {
              if (stryMutAct_9fa48("11989")) {
                {}
              } else {
                stryCov_9fa48("11989");
                const transparent = stryMutAct_9fa48("11992") ? options.finish !== 'Polycarbonate' : stryMutAct_9fa48("11991") ? false : stryMutAct_9fa48("11990") ? true : (stryCov_9fa48("11990", "11991", "11992"), options.finish === (stryMutAct_9fa48("11993") ? "" : (stryCov_9fa48("11993"), 'Polycarbonate')));
                if (stryMutAct_9fa48("11996") ? material.transparent === transparent : stryMutAct_9fa48("11995") ? false : stryMutAct_9fa48("11994") ? true : (stryCov_9fa48("11994", "11995", "11996"), material.transparent !== transparent)) {
                  if (stryMutAct_9fa48("11997")) {
                    {}
                  } else {
                    stryCov_9fa48("11997");
                    material.transparent = transparent;
                    material.needsUpdate = stryMutAct_9fa48("11998") ? false : (stryCov_9fa48("11998"), true);
                  }
                }
                material.metalness = (stryMutAct_9fa48("12001") ? options.finish !== 'Aluminum' : stryMutAct_9fa48("12000") ? false : stryMutAct_9fa48("11999") ? true : (stryCov_9fa48("11999", "12000", "12001"), options.finish === (stryMutAct_9fa48("12002") ? "" : (stryCov_9fa48("12002"), 'Aluminum')))) ? 0.8 : (stryMutAct_9fa48("12005") ? options.finish !== 'Brass' : stryMutAct_9fa48("12004") ? false : stryMutAct_9fa48("12003") ? true : (stryCov_9fa48("12003", "12004", "12005"), options.finish === (stryMutAct_9fa48("12006") ? "" : (stryCov_9fa48("12006"), 'Brass')))) ? 0.95 : 0;
                material.roughness = transparent ? 0.2 : 0.33;
                material.opacity = transparent ? 0.62 : 1;
                material.depthWrite = stryMutAct_9fa48("12007") ? transparent : (stryCov_9fa48("12007"), !transparent);
              }
            }
          }
        }
        if (stryMutAct_9fa48("12010") ? options.device.kind !== 'keyboard' : stryMutAct_9fa48("12009") ? false : stryMutAct_9fa48("12008") ? true : (stryCov_9fa48("12008", "12009", "12010"), options.device.kind === (stryMutAct_9fa48("12011") ? "" : (stryCov_9fa48("12011"), 'keyboard')))) {
          if (stryMutAct_9fa48("12012")) {
            {}
          } else {
            stryCov_9fa48("12012");
            const switches = stryMutAct_9fa48("12013") ? model.getObjectByName('switches') : (stryCov_9fa48("12013"), model?.getObjectByName(stryMutAct_9fa48("12014") ? "" : (stryCov_9fa48("12014"), 'switches')));
            if (stryMutAct_9fa48("12016") ? false : stryMutAct_9fa48("12015") ? true : (stryCov_9fa48("12015", "12016"), switches)) switches.visible = options.exploded;
          }
        }
        if (stryMutAct_9fa48("12017")) {
          ;
        } else {
          stryCov_9fa48("12017");
          wake();
        }
      }
    }
    function setView() {
      if (stryMutAct_9fa48("12018")) {
        {}
      } else {
        stryCov_9fa48("12018");
        deskCacheDirty = stryMutAct_9fa48("12019") ? false : (stryCov_9fa48("12019"), true);
        const typing = stryMutAct_9fa48("12022") ? options.environment !== 'typing' : stryMutAct_9fa48("12021") ? false : stryMutAct_9fa48("12020") ? true : (stryCov_9fa48("12020", "12021", "12022"), options.environment === (stryMutAct_9fa48("12023") ? "" : (stryCov_9fa48("12023"), 'typing')));
        controls.enableRotate = controls.enableZoom = stryMutAct_9fa48("12024") ? typing : (stryCov_9fa48("12024"), !typing);
        controls.enableDamping = stryMutAct_9fa48("12027") ? !reduced && !software || !typing : stryMutAct_9fa48("12026") ? false : stryMutAct_9fa48("12025") ? true : (stryCov_9fa48("12025", "12026", "12027"), (stryMutAct_9fa48("12029") ? !reduced || !software : stryMutAct_9fa48("12028") ? true : (stryCov_9fa48("12028", "12029"), (stryMutAct_9fa48("12030") ? reduced : (stryCov_9fa48("12030"), !reduced)) && (stryMutAct_9fa48("12031") ? software : (stryCov_9fa48("12031"), !software)))) && (stryMutAct_9fa48("12032") ? typing : (stryCov_9fa48("12032"), !typing)));
        controls.maxDistance = typing ? 80 : 46;
        focusDepth = typing ? stryMutAct_9fa48("12033") ? +3 : (stryCov_9fa48("12033"), -3) : 0;
        focusX = 0;
        desk.monitor.scale.y = (stryMutAct_9fa48("12036") ? typing || element.clientWidth < 700 : stryMutAct_9fa48("12035") ? false : stryMutAct_9fa48("12034") ? true : (stryCov_9fa48("12034", "12035", "12036"), typing && (stryMutAct_9fa48("12039") ? element.clientWidth >= 700 : stryMutAct_9fa48("12038") ? element.clientWidth <= 700 : stryMutAct_9fa48("12037") ? true : (stryCov_9fa48("12037", "12038", "12039"), element.clientWidth < 700)))) ? 1.65 : 1;
        if (stryMutAct_9fa48("12041") ? false : stryMutAct_9fa48("12040") ? true : (stryCov_9fa48("12040", "12041"), typing)) {
          if (stryMutAct_9fa48("12042")) {
            {}
          } else {
            stryCov_9fa48("12042");
            const narrow = stryMutAct_9fa48("12046") ? element.clientWidth >= 700 : stryMutAct_9fa48("12045") ? element.clientWidth <= 700 : stryMutAct_9fa48("12044") ? false : stryMutAct_9fa48("12043") ? true : (stryCov_9fa48("12043", "12044", "12045", "12046"), element.clientWidth < 700);
            focusHeight = narrow ? 10 : 5;
            cameraTarget = new THREE.Vector3(0, narrow ? 25 : 17, narrow ? 52 : 38);
            if (stryMutAct_9fa48("12047")) {
              ;
            } else {
              stryCov_9fa48("12047");
              fitTypingCamera();
            }
            if (stryMutAct_9fa48("12048")) {
              ;
            } else {
              stryCov_9fa48("12048");
              controls.update();
            }
            if (stryMutAct_9fa48("12049")) {
              ;
            } else {
              stryCov_9fa48("12049");
              camera.position.copy(cameraTarget);
            }
            if (stryMutAct_9fa48("12050")) {
              ;
            } else {
              stryCov_9fa48("12050");
              controls.target.set(0, focusHeight, focusDepth);
            }
            if (stryMutAct_9fa48("12051")) {
              ;
            } else {
              stryCov_9fa48("12051");
              controls.update();
            }
            cameraTarget = null;
            if (stryMutAct_9fa48("12052")) {
              ;
            } else {
              stryCov_9fa48("12052");
              wake();
            }
            return;
          }
        }
        if (stryMutAct_9fa48("12053")) {
          ;
        } else {
          stryCov_9fa48("12053");
          resize();
        }
        const deck = stryMutAct_9fa48("12056") ? options.device.kind !== 'control-deck' : stryMutAct_9fa48("12055") ? false : stryMutAct_9fa48("12054") ? true : (stryCov_9fa48("12054", "12055", "12056"), options.device.kind === (stryMutAct_9fa48("12057") ? "" : (stryCov_9fa48("12057"), 'control-deck')));
        const featuredKeyboard = stryMutAct_9fa48("12060") ? !deck && options.environment === 'desk' || options.view === 'perspective' : stryMutAct_9fa48("12059") ? false : stryMutAct_9fa48("12058") ? true : (stryCov_9fa48("12058", "12059", "12060"), (stryMutAct_9fa48("12062") ? !deck || options.environment === 'desk' : stryMutAct_9fa48("12061") ? true : (stryCov_9fa48("12061", "12062"), (stryMutAct_9fa48("12063") ? deck : (stryCov_9fa48("12063"), !deck)) && (stryMutAct_9fa48("12065") ? options.environment !== 'desk' : stryMutAct_9fa48("12064") ? true : (stryCov_9fa48("12064", "12065"), options.environment === (stryMutAct_9fa48("12066") ? "" : (stryCov_9fa48("12066"), 'desk')))))) && (stryMutAct_9fa48("12068") ? options.view !== 'perspective' : stryMutAct_9fa48("12067") ? true : (stryCov_9fa48("12067", "12068"), options.view === (stryMutAct_9fa48("12069") ? "" : (stryCov_9fa48("12069"), 'perspective')))));
        focusX = featuredKeyboard ? stryMutAct_9fa48("12070") ? +2 : (stryCov_9fa48("12070"), -2) : 0;
        const distance = deck ? options.exploded ? 0.55 : 0.46 : (stryMutAct_9fa48("12073") ? options.environment === 'desk' || !featuredKeyboard : stryMutAct_9fa48("12072") ? false : stryMutAct_9fa48("12071") ? true : (stryCov_9fa48("12071", "12072", "12073"), (stryMutAct_9fa48("12075") ? options.environment !== 'desk' : stryMutAct_9fa48("12074") ? true : (stryCov_9fa48("12074", "12075"), options.environment === (stryMutAct_9fa48("12076") ? "" : (stryCov_9fa48("12076"), 'desk')))) && (stryMutAct_9fa48("12077") ? featuredKeyboard : (stryCov_9fa48("12077"), !featuredKeyboard)))) ? 1.24 : 1;
        focusHeight = featuredKeyboard ? stryMutAct_9fa48("12078") ? +1.4 : (stryCov_9fa48("12078"), -1.4) : (stryMutAct_9fa48("12081") ? deck || options.exploded : stryMutAct_9fa48("12080") ? false : stryMutAct_9fa48("12079") ? true : (stryCov_9fa48("12079", "12080", "12081"), deck && options.exploded)) ? 1.35 : (stryMutAct_9fa48("12084") ? options.environment === 'desk' || !featuredKeyboard : stryMutAct_9fa48("12083") ? false : stryMutAct_9fa48("12082") ? true : (stryCov_9fa48("12082", "12083", "12084"), (stryMutAct_9fa48("12086") ? options.environment !== 'desk' : stryMutAct_9fa48("12085") ? true : (stryCov_9fa48("12085", "12086"), options.environment === (stryMutAct_9fa48("12087") ? "" : (stryCov_9fa48("12087"), 'desk')))) && (stryMutAct_9fa48("12088") ? featuredKeyboard : (stryCov_9fa48("12088"), !featuredKeyboard)))) ? 1.8 : 0.4;
        controls.minDistance = (stryMutAct_9fa48("12091") ? options.device.kind !== 'control-deck' : stryMutAct_9fa48("12090") ? false : stryMutAct_9fa48("12089") ? true : (stryCov_9fa48("12089", "12090", "12091"), options.device.kind === (stryMutAct_9fa48("12092") ? "" : (stryCov_9fa48("12092"), 'control-deck')))) ? 7 : 12;
        cameraTarget = (stryMutAct_9fa48("12095") ? options.view !== 'top' : stryMutAct_9fa48("12094") ? false : stryMutAct_9fa48("12093") ? true : (stryCov_9fa48("12093", "12094", "12095"), options.view === (stryMutAct_9fa48("12096") ? "" : (stryCov_9fa48("12096"), 'top')))) ? new THREE.Vector3(0, 26, 0.01) : (stryMutAct_9fa48("12099") ? options.view !== 'front' : stryMutAct_9fa48("12098") ? false : stryMutAct_9fa48("12097") ? true : (stryCov_9fa48("12097", "12098", "12099"), options.view === (stryMutAct_9fa48("12100") ? "" : (stryCov_9fa48("12100"), 'front')))) ? new THREE.Vector3(0, 6, 25) : deck ? new THREE.Vector3(stryMutAct_9fa48("12101") ? +7 : (stryCov_9fa48("12101"), -7), 27, 14) : featuredKeyboard ? new THREE.Vector3(stryMutAct_9fa48("12102") ? +7 : (stryCov_9fa48("12102"), -7), 25, 18) : new THREE.Vector3(stryMutAct_9fa48("12103") ? +7 : (stryCov_9fa48("12103"), -7), 18, 21);
        if (stryMutAct_9fa48("12104")) {
          ;
        } else {
          stryCov_9fa48("12104");
          cameraTarget.multiplyScalar(distance);
        }
        if (stryMutAct_9fa48("12105")) {
          ;
        } else {
          stryCov_9fa48("12105");
          fitAccessories();
        }
        if (stryMutAct_9fa48("12106")) {
          ;
        } else {
          stryCov_9fa48("12106");
          wake();
        }
      }
    }
    function accessoryCorners() {
      if (stryMutAct_9fa48("12107")) {
        {}
      } else {
        stryCov_9fa48("12107");
        if (stryMutAct_9fa48("12110") ? false : stryMutAct_9fa48("12109") ? true : stryMutAct_9fa48("12108") ? accessories?.counts.external || accessories?.counts.planned : (stryCov_9fa48("12108", "12109", "12110"), !(stryMutAct_9fa48("12113") ? accessories?.counts.external && accessories?.counts.planned : stryMutAct_9fa48("12112") ? false : stryMutAct_9fa48("12111") ? true : (stryCov_9fa48("12111", "12112", "12113"), (stryMutAct_9fa48("12114") ? accessories.counts.external : (stryCov_9fa48("12114"), accessories?.counts.external)) || (stryMutAct_9fa48("12115") ? accessories.counts.planned : (stryCov_9fa48("12115"), accessories?.counts.planned)))))) return stryMutAct_9fa48("12116") ? ["Stryker was here"] : (stryCov_9fa48("12116"), []);
        const bounds = new THREE.Box3().setFromObject(accessories.group);
        if (stryMutAct_9fa48("12118") ? false : stryMutAct_9fa48("12117") ? true : (stryCov_9fa48("12117", "12118"), model)) if (stryMutAct_9fa48("12119")) {
          ;
        } else {
          stryCov_9fa48("12119");
          bounds.union(new THREE.Box3().setFromObject(model));
        }
        return (stryMutAct_9fa48("12120") ? [] : (stryCov_9fa48("12120"), [bounds.min.x, bounds.max.x])).flatMap(stryMutAct_9fa48("12121") ? () => undefined : (stryCov_9fa48("12121"), x => (stryMutAct_9fa48("12122") ? [] : (stryCov_9fa48("12122"), [bounds.min.y, bounds.max.y])).flatMap(stryMutAct_9fa48("12123") ? () => undefined : (stryCov_9fa48("12123"), y => (stryMutAct_9fa48("12124") ? [] : (stryCov_9fa48("12124"), [bounds.min.z, bounds.max.z])).map(stryMutAct_9fa48("12125") ? () => undefined : (stryCov_9fa48("12125"), z => new THREE.Vector3(x, y, z)))))));
      }
    }
    function fitAccessories() {
      if (stryMutAct_9fa48("12126")) {
        {}
      } else {
        stryCov_9fa48("12126");
        const corners = accessoryCorners();
        if (stryMutAct_9fa48("12129") ? !cameraTarget && !corners.length : stryMutAct_9fa48("12128") ? false : stryMutAct_9fa48("12127") ? true : (stryCov_9fa48("12127", "12128", "12129"), (stryMutAct_9fa48("12130") ? cameraTarget : (stryCov_9fa48("12130"), !cameraTarget)) || (stryMutAct_9fa48("12131") ? corners.length : (stryCov_9fa48("12131"), !corners.length)))) return;
        const framing = camera.clone();
        if (stryMutAct_9fa48("12132")) {
          ;
        } else {
          stryCov_9fa48("12132");
          framing.position.copy(cameraTarget);
        }
        const target = new THREE.Vector3(focusX, focusHeight, focusDepth);
        if (stryMutAct_9fa48("12133")) {
          ;
        } else {
          stryCov_9fa48("12133");
          framing.lookAt(target);
        }
        if (stryMutAct_9fa48("12134")) {
          ;
        } else {
          stryCov_9fa48("12134");
          framing.updateMatrixWorld();
        }
        const vertical = stryMutAct_9fa48("12135") ? Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / 0.86 : (stryCov_9fa48("12135"), Math.tan(THREE.MathUtils.degToRad(stryMutAct_9fa48("12136") ? camera.fov * 2 : (stryCov_9fa48("12136"), camera.fov / 2))) * 0.86);
        const horizontal = stryMutAct_9fa48("12137") ? vertical / camera.aspect : (stryCov_9fa48("12137"), vertical * camera.aspect);
        let extra = 0;
        for (const corner of corners) {
          if (stryMutAct_9fa48("12138")) {
            {}
          } else {
            stryCov_9fa48("12138");
            if (stryMutAct_9fa48("12139")) {
              ;
            } else {
              stryCov_9fa48("12139");
              corner.applyMatrix4(framing.matrixWorldInverse);
            }
            extra = stryMutAct_9fa48("12140") ? Math.min(extra, Math.abs(corner.x) / horizontal + corner.z, Math.abs(corner.y) / vertical + corner.z) : (stryCov_9fa48("12140"), Math.max(extra, stryMutAct_9fa48("12141") ? Math.abs(corner.x) / horizontal - corner.z : (stryCov_9fa48("12141"), (stryMutAct_9fa48("12142") ? Math.abs(corner.x) * horizontal : (stryCov_9fa48("12142"), Math.abs(corner.x) / horizontal)) + corner.z), stryMutAct_9fa48("12143") ? Math.abs(corner.y) / vertical - corner.z : (stryCov_9fa48("12143"), (stryMutAct_9fa48("12144") ? Math.abs(corner.y) * vertical : (stryCov_9fa48("12144"), Math.abs(corner.y) / vertical)) + corner.z)));
          }
        }
        if (stryMutAct_9fa48("12145")) {
          ;
        } else {
          stryCov_9fa48("12145");
          cameraTarget.add(cameraTarget.clone().sub(target).normalize().multiplyScalar(extra));
        }
        controls.maxDistance = stryMutAct_9fa48("12146") ? Math.min(46, cameraTarget.distanceTo(target) * 1.15) : (stryCov_9fa48("12146"), Math.max(46, stryMutAct_9fa48("12147") ? cameraTarget.distanceTo(target) / 1.15 : (stryCov_9fa48("12147"), cameraTarget.distanceTo(target) * 1.15)));
      }
    }
    function modelIdFor(device: SceneOptions['device']) {
      if (stryMutAct_9fa48("12148")) {
        {}
      } else {
        stryCov_9fa48("12148");
        return (stryMutAct_9fa48("12151") ? device.kind !== 'keyboard' : stryMutAct_9fa48("12150") ? false : stryMutAct_9fa48("12149") ? true : (stryCov_9fa48("12149", "12150", "12151"), device.kind === (stryMutAct_9fa48("12152") ? "" : (stryCov_9fa48("12152"), 'keyboard')))) ? device.q1Max ? stryMutAct_9fa48("12153") ? `` : (stryCov_9fa48("12153"), `keyboard-q1-max`) : stryMutAct_9fa48("12154") ? `` : (stryCov_9fa48("12154"), `keyboard-${device.layout}`) : device.model;
      }
    }
    function updateAccessories() {
      if (stryMutAct_9fa48("12155")) {
        {}
      } else {
        stryCov_9fa48("12155");
        const hadExternal = stryMutAct_9fa48("12156") ? !(accessories?.counts.external || accessories?.counts.planned) : (stryCov_9fa48("12156"), !(stryMutAct_9fa48("12157") ? accessories?.counts.external || accessories?.counts.planned : (stryCov_9fa48("12157"), !(stryMutAct_9fa48("12160") ? accessories?.counts.external && accessories?.counts.planned : stryMutAct_9fa48("12159") ? false : stryMutAct_9fa48("12158") ? true : (stryCov_9fa48("12158", "12159", "12160"), (stryMutAct_9fa48("12161") ? accessories.counts.external : (stryCov_9fa48("12161"), accessories?.counts.external)) || (stryMutAct_9fa48("12162") ? accessories.counts.planned : (stryCov_9fa48("12162"), accessories?.counts.planned)))))));
        stryMutAct_9fa48("12163") ? accessories.dispose() : (stryCov_9fa48("12163"), accessories?.dispose());
        accessories = null;
        if (stryMutAct_9fa48("12166") ? model || options.device.kind === 'keyboard' : stryMutAct_9fa48("12165") ? false : stryMutAct_9fa48("12164") ? true : (stryCov_9fa48("12164", "12165", "12166"), model && (stryMutAct_9fa48("12168") ? options.device.kind !== 'keyboard' : stryMutAct_9fa48("12167") ? true : (stryCov_9fa48("12167", "12168"), options.device.kind === (stryMutAct_9fa48("12169") ? "" : (stryCov_9fa48("12169"), 'keyboard')))))) {
          if (stryMutAct_9fa48("12170")) {
            {}
          } else {
            stryCov_9fa48("12170");
            accessories = createAccessoryPreview(stryMutAct_9fa48("12171") ? {} : (stryCov_9fa48("12171"), {
              selections: stryMutAct_9fa48("12172") ? options.accessories && [] : (stryCov_9fa48("12172"), options.accessories ?? (stryMutAct_9fa48("12173") ? ["Stryker was here"] : (stryCov_9fa48("12173"), []))),
              customAccessories: options.customAccessories,
              keys,
              bounds: new THREE.Box3().setFromObject(model)
            }));
            if (stryMutAct_9fa48("12174")) {
              ;
            } else {
              stryCov_9fa48("12174");
              scene.add(accessories.group);
            }
          }
        }
        element.dataset.accessoryArtisanCount = String(stryMutAct_9fa48("12175") ? accessories?.counts.artisan && 0 : (stryCov_9fa48("12175"), (stryMutAct_9fa48("12176") ? accessories.counts.artisan : (stryCov_9fa48("12176"), accessories?.counts.artisan)) ?? 0));
        element.dataset.accessoryExternalCount = String(stryMutAct_9fa48("12177") ? accessories?.counts.external && 0 : (stryCov_9fa48("12177"), (stryMutAct_9fa48("12178") ? accessories.counts.external : (stryCov_9fa48("12178"), accessories?.counts.external)) ?? 0));
        element.dataset.accessoryPlannedCount = String(stryMutAct_9fa48("12179") ? accessories?.counts.planned && 0 : (stryCov_9fa48("12179"), (stryMutAct_9fa48("12180") ? accessories.counts.planned : (stryCov_9fa48("12180"), accessories?.counts.planned)) ?? 0));
        element.dataset.accessoryOmittedCount = String(stryMutAct_9fa48("12181") ? accessories?.counts.omitted && 0 : (stryCov_9fa48("12181"), (stryMutAct_9fa48("12182") ? accessories.counts.omitted : (stryCov_9fa48("12182"), accessories?.counts.omitted)) ?? 0));
        deskCacheDirty = stryMutAct_9fa48("12183") ? false : (stryCov_9fa48("12183"), true);
        if (stryMutAct_9fa48("12186") ? (hadExternal || accessories?.counts.external) && accessories?.counts.planned : stryMutAct_9fa48("12185") ? false : stryMutAct_9fa48("12184") ? true : (stryCov_9fa48("12184", "12185", "12186"), (stryMutAct_9fa48("12188") ? hadExternal && accessories?.counts.external : stryMutAct_9fa48("12187") ? false : (stryCov_9fa48("12187", "12188"), hadExternal || (stryMutAct_9fa48("12189") ? accessories.counts.external : (stryCov_9fa48("12189"), accessories?.counts.external)))) || (stryMutAct_9fa48("12190") ? accessories.counts.planned : (stryCov_9fa48("12190"), accessories?.counts.planned)))) if (stryMutAct_9fa48("12191")) {
          ;
        } else {
          stryCov_9fa48("12191");
          setView();
        }
        if (stryMutAct_9fa48("12192")) {
          ;
        } else {
          stryCov_9fa48("12192");
          wake();
        }
      }
    }
    async function loadModel(device: SceneOptions['device']) {
      if (stryMutAct_9fa48("12193")) {
        {}
      } else {
        stryCov_9fa48("12193");
        const modelId = modelIdFor(device);
        const request = stryMutAct_9fa48("12194") ? --generation : (stryCov_9fa48("12194"), ++generation);
        callbacks.status(stryMutAct_9fa48("12196") ? {} : (stryCov_9fa48("12196"), {
          kind: stryMutAct_9fa48("12197") ? "" : (stryCov_9fa48("12197"), 'loading')
        }));
        let promise = models.get(modelId);
        if (stryMutAct_9fa48("12200") ? false : stryMutAct_9fa48("12199") ? true : stryMutAct_9fa48("12198") ? promise : (stryCov_9fa48("12198", "12199", "12200"), !promise)) {
          if (stryMutAct_9fa48("12201")) {
            {}
          } else {
            stryCov_9fa48("12201");
            promise = new GLTFLoader().loadAsync(new URL(stryMutAct_9fa48("12202") ? `` : (stryCov_9fa48("12202"), `models/${(stryMutAct_9fa48("12205") ? modelId !== 'keyboard-q1-max' : stryMutAct_9fa48("12204") ? false : stryMutAct_9fa48("12203") ? true : (stryCov_9fa48("12203", "12204", "12205"), modelId === (stryMutAct_9fa48("12206") ? "" : (stryCov_9fa48("12206"), 'keyboard-q1-max')))) ? stryMutAct_9fa48("12207") ? "" : (stryCov_9fa48("12207"), 'keyboard-75') : modelId}.glb`), document.baseURI).href).then(gltf => {
              if (stryMutAct_9fa48("12208")) {
                {}
              } else {
                stryCov_9fa48("12208");
                if (stryMutAct_9fa48("12210") ? false : stryMutAct_9fa48("12209") ? true : (stryCov_9fa48("12209", "12210"), stopped)) {
                  if (stryMutAct_9fa48("12211")) {
                    {}
                  } else {
                    stryCov_9fa48("12211");
                    if (stryMutAct_9fa48("12212")) {
                      ;
                    } else {
                      stryCov_9fa48("12212");
                      disposeModel(gltf.scene);
                    }
                    return gltf.scene;
                  }
                }
                if (stryMutAct_9fa48("12215") ? device.kind !== 'keyboard' : stryMutAct_9fa48("12214") ? false : stryMutAct_9fa48("12213") ? true : (stryCov_9fa48("12213", "12214", "12215"), device.kind === (stryMutAct_9fa48("12216") ? "" : (stryCov_9fa48("12216"), 'keyboard')))) {
                  if (stryMutAct_9fa48("12217")) {
                    {}
                  } else {
                    stryCov_9fa48("12217");
                    if (stryMutAct_9fa48("12219") ? false : stryMutAct_9fa48("12218") ? true : (stryCov_9fa48("12218", "12219"), device.q1Max)) if (stryMutAct_9fa48("12220")) {
                      ;
                    } else {
                      stryCov_9fa48("12220");
                      adaptQ1MaxModel(gltf.scene);
                    }
                    const positions: THREE.Vector3[] = stryMutAct_9fa48("12221") ? ["Stryker was here"] : (stryCov_9fa48("12221"), []);
                    gltf.scene.traverse(object => {
                      if (stryMutAct_9fa48("12223")) {
                        {}
                      } else {
                        stryCov_9fa48("12223");
                        if (stryMutAct_9fa48("12226") ? object.name.endsWith('key_') : stryMutAct_9fa48("12225") ? false : stryMutAct_9fa48("12224") ? true : (stryCov_9fa48("12224", "12225", "12226"), object.name.startsWith(stryMutAct_9fa48("12227") ? "" : (stryCov_9fa48("12227"), 'key_')))) if (stryMutAct_9fa48("12228")) {
                          ;
                        } else {
                          stryCov_9fa48("12228");
                          positions.push(new THREE.Vector3(object.position.x, 0.3, object.position.z));
                        }
                      }
                    });
                    gltf.scene.add(createSwitchAssembly(positions, stryMutAct_9fa48("12230") ? options.switchId && '' : (stryCov_9fa48("12230"), options.switchId ?? (stryMutAct_9fa48("12231") ? "Stryker was here!" : (stryCov_9fa48("12231"), '')))).group);
                  }
                }
                if (stryMutAct_9fa48("12232")) {
                  ;
                } else {
                  stryCov_9fa48("12232");
                  loaded.add(gltf.scene);
                }
                return gltf.scene;
              }
            });
            if (stryMutAct_9fa48("12233")) {
              ;
            } else {
              stryCov_9fa48("12233");
              models.set(modelId, promise);
            }
          }
        }
        try {
          if (stryMutAct_9fa48("12234")) {
            {}
          } else {
            stryCov_9fa48("12234");
            const next = await promise;
            if (stryMutAct_9fa48("12237") ? stopped && request !== generation : stryMutAct_9fa48("12236") ? false : stryMutAct_9fa48("12235") ? true : (stryCov_9fa48("12235", "12236", "12237"), stopped || (stryMutAct_9fa48("12239") ? request === generation : stryMutAct_9fa48("12238") ? false : (stryCov_9fa48("12238", "12239"), request !== generation)))) return;
            stryMutAct_9fa48("12240") ? accessories.dispose() : (stryCov_9fa48("12240"), accessories?.dispose());
            accessories = null;
            if (stryMutAct_9fa48("12242") ? false : stryMutAct_9fa48("12241") ? true : (stryCov_9fa48("12241", "12242"), model)) if (stryMutAct_9fa48("12243")) {
              ;
            } else {
              stryCov_9fa48("12243");
              scene.remove(model);
            }
            model = next;
            if (stryMutAct_9fa48("12244")) {
              ;
            } else {
              stryCov_9fa48("12244");
              keys.clear();
            }
            if (stryMutAct_9fa48("12245")) {
              ;
            } else {
              stryCov_9fa48("12245");
              materials.clear();
            }
            if (stryMutAct_9fa48("12246")) {
              ;
            } else {
              stryCov_9fa48("12246");
              down.clear();
            }
            clicked = stryMutAct_9fa48("12247") ? "Stryker was here!" : (stryCov_9fa48("12247"), '');
            if (stryMutAct_9fa48("12248")) {
              ;
            } else {
              stryCov_9fa48("12248");
              layers.clear();
            }
            for (const [name, offset] of Object.entries(stryMutAct_9fa48("12249") ? {} : (stryCov_9fa48("12249"), {
              plate: 1.01,
              pcb: 0.51,
              switches: (stryMutAct_9fa48("12252") ? device.kind !== 'keyboard' : stryMutAct_9fa48("12251") ? false : stryMutAct_9fa48("12250") ? true : (stryCov_9fa48("12250", "12251", "12252"), device.kind === (stryMutAct_9fa48("12253") ? "" : (stryCov_9fa48("12253"), 'keyboard')))) ? 2.3 : 1.75,
              screen: 1.01,
              control_dial: (stryMutAct_9fa48("12256") ? device.kind !== 'keyboard' : stryMutAct_9fa48("12255") ? false : stryMutAct_9fa48("12254") ? true : (stryCov_9fa48("12254", "12255", "12256"), device.kind === (stryMutAct_9fa48("12257") ? "" : (stryCov_9fa48("12257"), 'keyboard')))) ? 4.8 : 1.01,
              control_joystick: 1.01
            }))) {
              if (stryMutAct_9fa48("12258")) {
                {}
              } else {
                stryCov_9fa48("12258");
                const layer = model.getObjectByName(name);
                if (stryMutAct_9fa48("12260") ? false : stryMutAct_9fa48("12259") ? true : (stryCov_9fa48("12259", "12260"), layer)) {
                  if (stryMutAct_9fa48("12261")) {
                    {}
                  } else {
                    stryCov_9fa48("12261");
                    if (stryMutAct_9fa48("12264") ? false : stryMutAct_9fa48("12263") ? true : stryMutAct_9fa48("12262") ? restingHeight.has(layer) : (stryCov_9fa48("12262", "12263", "12264"), !restingHeight.has(layer))) if (stryMutAct_9fa48("12265")) {
                      ;
                    } else {
                      stryCov_9fa48("12265");
                      restingHeight.set(layer, layer.position.y);
                    }
                    if (stryMutAct_9fa48("12266")) {
                      ;
                    } else {
                      stryCov_9fa48("12266");
                      layers.set(layer, offset);
                    }
                  }
                }
              }
            }
            model.traverse(object => {
              if (stryMutAct_9fa48("12268")) {
                {}
              } else {
                stryCov_9fa48("12268");
                if (stryMutAct_9fa48("12271") ? object.name.endsWith('key_') : stryMutAct_9fa48("12270") ? false : stryMutAct_9fa48("12269") ? true : (stryCov_9fa48("12269", "12270", "12271"), object.name.startsWith(stryMutAct_9fa48("12272") ? "" : (stryCov_9fa48("12272"), 'key_')))) {
                  if (stryMutAct_9fa48("12273")) {
                    {}
                  } else {
                    stryCov_9fa48("12273");
                    keys.set(stryMutAct_9fa48("12275") ? object.name : (stryCov_9fa48("12275"), object.name.slice(4)), object);
                    if (stryMutAct_9fa48("12278") ? false : stryMutAct_9fa48("12277") ? true : stryMutAct_9fa48("12276") ? restingHeight.has(object) : (stryCov_9fa48("12276", "12277", "12278"), !restingHeight.has(object))) if (stryMutAct_9fa48("12279")) {
                      ;
                    } else {
                      stryCov_9fa48("12279");
                      restingHeight.set(object, object.position.y);
                    }
                  }
                }
                if (stryMutAct_9fa48("12281") ? false : stryMutAct_9fa48("12280") ? true : (stryCov_9fa48("12280", "12281"), object instanceof THREE.Mesh)) {
                  if (stryMutAct_9fa48("12282")) {
                    {}
                  } else {
                    stryCov_9fa48("12282");
                    object.castShadow = stryMutAct_9fa48("12283") ? false : (stryCov_9fa48("12283"), true);
                    object.receiveShadow = stryMutAct_9fa48("12284") ? false : (stryCov_9fa48("12284"), true);
                    for (const material of Array.isArray(object.material) ? object.material : stryMutAct_9fa48("12285") ? [] : (stryCov_9fa48("12285"), [object.material])) {
                      if (stryMutAct_9fa48("12286")) {
                        {}
                      } else {
                        stryCov_9fa48("12286");
                        if (stryMutAct_9fa48("12288") ? false : stryMutAct_9fa48("12287") ? true : (stryCov_9fa48("12287", "12288"), material instanceof THREE.MeshStandardMaterial)) {
                          if (stryMutAct_9fa48("12289")) {
                            {}
                          } else {
                            stryCov_9fa48("12289");
                            if (stryMutAct_9fa48("12290")) {
                              ;
                            } else {
                              stryCov_9fa48("12290");
                              materials.set(material, material.color.clone());
                            }
                            if (stryMutAct_9fa48("12293") ? false : stryMutAct_9fa48("12292") ? true : stryMutAct_9fa48("12291") ? material.name.startsWith('legend') : (stryCov_9fa48("12291", "12292", "12293"), !(stryMutAct_9fa48("12294") ? material.name.endsWith('legend') : (stryCov_9fa48("12294"), material.name.startsWith(stryMutAct_9fa48("12295") ? "" : (stryCov_9fa48("12295"), 'legend')))))) {
                              if (stryMutAct_9fa48("12296")) {
                                {}
                              } else {
                                stryCov_9fa48("12296");
                                material.bumpMap = noise;
                                material.bumpScale = 0.003;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            });
            element.dataset.switchCount = String(model.getObjectByName(stryMutAct_9fa48("12297") ? "" : (stryCov_9fa48("12297"), 'switch_bases')) instanceof THREE.InstancedMesh ? keys.size : 0);
            if (stryMutAct_9fa48("12298")) {
              ;
            } else {
              stryCov_9fa48("12298");
              scene.add(model);
            }
            if (stryMutAct_9fa48("12299")) {
              ;
            } else {
              stryCov_9fa48("12299");
              updateAccessories();
            }
            appearance(stryMutAct_9fa48("12301") ? false : (stryCov_9fa48("12301"), true));
            callbacks.status(stryMutAct_9fa48("12303") ? {} : (stryCov_9fa48("12303"), {
              kind: stryMutAct_9fa48("12304") ? "" : (stryCov_9fa48("12304"), 'ready')
            }));
            if (stryMutAct_9fa48("12305")) {
              ;
            } else {
              stryCov_9fa48("12305");
              wake();
            }
          }
        } catch {
          if (stryMutAct_9fa48("12306")) {
            {}
          } else {
            stryCov_9fa48("12306");
            if (stryMutAct_9fa48("12307")) {
              ;
            } else {
              stryCov_9fa48("12307");
              models.delete(modelId);
            }
            if (stryMutAct_9fa48("12310") ? !stopped || request === generation : stryMutAct_9fa48("12309") ? false : stryMutAct_9fa48("12308") ? true : (stryCov_9fa48("12308", "12309", "12310"), (stryMutAct_9fa48("12311") ? stopped : (stryCov_9fa48("12311"), !stopped)) && (stryMutAct_9fa48("12313") ? request !== generation : stryMutAct_9fa48("12312") ? true : (stryCov_9fa48("12312", "12313"), request === generation)))) callbacks.status(stryMutAct_9fa48("12315") ? {} : (stryCov_9fa48("12315"), {
              kind: stryMutAct_9fa48("12316") ? "" : (stryCov_9fa48("12316"), 'error'),
              message: stryMutAct_9fa48("12317") ? "" : (stryCov_9fa48("12317"), 'The keyboard model could not load. Check your connection and try again.')
            }));
          }
        }
      }
    }
    function render(time: number) {
      if (stryMutAct_9fa48("12318")) {
        {}
      } else {
        stryCov_9fa48("12318");
        frame = 0;
        if (stryMutAct_9fa48("12321") ? (stopped || !visible) && document.hidden : stryMutAct_9fa48("12320") ? false : stryMutAct_9fa48("12319") ? true : (stryCov_9fa48("12319", "12320", "12321"), (stryMutAct_9fa48("12323") ? stopped && !visible : stryMutAct_9fa48("12322") ? false : (stryCov_9fa48("12322", "12323"), stopped || (stryMutAct_9fa48("12324") ? visible : (stryCov_9fa48("12324"), !visible)))) || document.hidden)) return;
        const delta = stryMutAct_9fa48("12325") ? Math.max((time - lastFrame) / 1000 || 1 / 60, 0.05) : (stryCov_9fa48("12325"), Math.min(stryMutAct_9fa48("12328") ? (time - lastFrame) / 1000 && 1 / 60 : stryMutAct_9fa48("12327") ? false : stryMutAct_9fa48("12326") ? true : (stryCov_9fa48("12326", "12327", "12328"), (stryMutAct_9fa48("12329") ? (time - lastFrame) * 1000 : (stryCov_9fa48("12329"), (stryMutAct_9fa48("12330") ? time + lastFrame : (stryCov_9fa48("12330"), time - lastFrame)) / 1000)) || (stryMutAct_9fa48("12331") ? 1 * 60 : (stryCov_9fa48("12331"), 1 / 60))), 0.05));
        lastFrame = time;
        let moving = stryMutAct_9fa48("12332") ? true : (stryCov_9fa48("12332"), false);
        const approach = (current: number, target: number, speed: number) => {
          if (stryMutAct_9fa48("12333")) {
            {}
          } else {
            stryCov_9fa48("12333");
            if (stryMutAct_9fa48("12336") ? (reduced || software) && Math.abs(current - target) < 0.0005 : stryMutAct_9fa48("12335") ? false : stryMutAct_9fa48("12334") ? true : (stryCov_9fa48("12334", "12335", "12336"), (stryMutAct_9fa48("12338") ? reduced && software : stryMutAct_9fa48("12337") ? false : (stryCov_9fa48("12337", "12338"), reduced || software)) || (stryMutAct_9fa48("12341") ? Math.abs(current - target) >= 0.0005 : stryMutAct_9fa48("12340") ? Math.abs(current - target) <= 0.0005 : stryMutAct_9fa48("12339") ? false : (stryCov_9fa48("12339", "12340", "12341"), Math.abs(stryMutAct_9fa48("12342") ? current + target : (stryCov_9fa48("12342"), current - target)) < 0.0005)))) return target;
            moving = stryMutAct_9fa48("12343") ? false : (stryCov_9fa48("12343"), true);
            return THREE.MathUtils.damp(current, target, speed, delta);
          }
        };
        for (const [code, key] of keys) {
          if (stryMutAct_9fa48("12344")) {
            {}
          } else {
            stryCov_9fa48("12344");
            key.position.y = approach(key.position.y, stryMutAct_9fa48("12345") ? (restingHeight.get(key) ?? key.position.y) + (options.exploded ? options.device.kind === 'keyboard' ? 4.8 : 2.6 : 0) + (down.has(code) ? 0.14 : 0) : (stryCov_9fa48("12345"), (stryMutAct_9fa48("12346") ? (restingHeight.get(key) ?? key.position.y) - (options.exploded ? options.device.kind === 'keyboard' ? 4.8 : 2.6 : 0) : (stryCov_9fa48("12346"), (stryMutAct_9fa48("12347") ? restingHeight.get(key) && key.position.y : (stryCov_9fa48("12347"), restingHeight.get(key) ?? key.position.y)) + (options.exploded ? (stryMutAct_9fa48("12350") ? options.device.kind !== 'keyboard' : stryMutAct_9fa48("12349") ? false : stryMutAct_9fa48("12348") ? true : (stryCov_9fa48("12348", "12349", "12350"), options.device.kind === (stryMutAct_9fa48("12351") ? "" : (stryCov_9fa48("12351"), 'keyboard')))) ? 4.8 : 2.6 : 0))) - (down.has(code) ? 0.14 : 0)), 19);
            key.scale.y = approach(key.scale.y, (stryMutAct_9fa48("12354") ? options.device.kind !== 'control-deck' : stryMutAct_9fa48("12353") ? false : stryMutAct_9fa48("12352") ? true : (stryCov_9fa48("12352", "12353", "12354"), options.device.kind === (stryMutAct_9fa48("12355") ? "" : (stryCov_9fa48("12355"), 'control-deck')))) ? 1 : (stryMutAct_9fa48("12358") ? options.profile !== 'Tall sculpted' : stryMutAct_9fa48("12357") ? false : stryMutAct_9fa48("12356") ? true : (stryCov_9fa48("12356", "12357", "12358"), options.profile === (stryMutAct_9fa48("12359") ? "" : (stryCov_9fa48("12359"), 'Tall sculpted')))) ? 1.5 : (stryMutAct_9fa48("12362") ? options.profile !== 'Low uniform' : stryMutAct_9fa48("12361") ? false : stryMutAct_9fa48("12360") ? true : (stryCov_9fa48("12360", "12361", "12362"), options.profile === (stryMutAct_9fa48("12363") ? "" : (stryCov_9fa48("12363"), 'Low uniform')))) ? 0.7 : 1, 14);
          }
        }
        for (const [layer, offset] of layers) layer.position.y = approach(layer.position.y, stryMutAct_9fa48("12364") ? (restingHeight.get(layer) ?? layer.position.y) - (options.exploded ? offset : 0) : (stryCov_9fa48("12364"), (stryMutAct_9fa48("12365") ? restingHeight.get(layer) && layer.position.y : (stryCov_9fa48("12365"), restingHeight.get(layer) ?? layer.position.y)) + (options.exploded ? offset : 0)), 12);
        const dial = stryMutAct_9fa48("12366") ? model.getObjectByName('control_dial') : (stryCov_9fa48("12366"), model?.getObjectByName(stryMutAct_9fa48("12367") ? "" : (stryCov_9fa48("12367"), 'control_dial')));
        if (stryMutAct_9fa48("12370") ? dial || options.device.kind === 'control-deck' : stryMutAct_9fa48("12369") ? false : stryMutAct_9fa48("12368") ? true : (stryCov_9fa48("12368", "12369", "12370"), dial && (stryMutAct_9fa48("12372") ? options.device.kind !== 'control-deck' : stryMutAct_9fa48("12371") ? true : (stryCov_9fa48("12371", "12372"), options.device.kind === (stryMutAct_9fa48("12373") ? "" : (stryCov_9fa48("12373"), 'control-deck')))))) dial.rotation.y = approach(dial.rotation.y, stryMutAct_9fa48("12374") ? (options.device.dial - 0.5) * Math.PI / 1.5 : (stryCov_9fa48("12374"), (stryMutAct_9fa48("12375") ? (options.device.dial - 0.5) / Math.PI : (stryCov_9fa48("12375"), (stryMutAct_9fa48("12376") ? options.device.dial + 0.5 : (stryCov_9fa48("12376"), options.device.dial - 0.5)) * Math.PI)) * 1.5), 16);
        for (const [material, target] of materials) {
          if (stryMutAct_9fa48("12377")) {
            {}
          } else {
            stryCov_9fa48("12377");
            material.color.r = approach(material.color.r, target.r, 14);
            material.color.g = approach(material.color.g, target.g, 14);
            material.color.b = approach(material.color.b, target.b, 14);
          }
        }
        if (stryMutAct_9fa48("12379") ? false : stryMutAct_9fa48("12378") ? true : (stryCov_9fa48("12378", "12379"), cameraTarget)) {
          if (stryMutAct_9fa48("12380")) {
            {}
          } else {
            stryCov_9fa48("12380");
            camera.position.x = approach(camera.position.x, cameraTarget.x, 10);
            camera.position.y = approach(camera.position.y, cameraTarget.y, 10);
            camera.position.z = approach(camera.position.z, cameraTarget.z, 10);
            if (stryMutAct_9fa48("12384") ? camera.position.distanceTo(cameraTarget) >= 0.002 : stryMutAct_9fa48("12383") ? camera.position.distanceTo(cameraTarget) <= 0.002 : stryMutAct_9fa48("12382") ? false : stryMutAct_9fa48("12381") ? true : (stryCov_9fa48("12381", "12382", "12383", "12384"), camera.position.distanceTo(cameraTarget) < 0.002)) {
              if (stryMutAct_9fa48("12385")) {
                {}
              } else {
                stryCov_9fa48("12385");
                if (stryMutAct_9fa48("12386")) {
                  ;
                } else {
                  stryCov_9fa48("12386");
                  camera.position.copy(cameraTarget);
                }
                cameraTarget = null;
              }
            }
          }
        }
        controls.target.x = approach(controls.target.x, focusX, 10);
        controls.target.y = approach(controls.target.y, focusHeight, 10);
        controls.target.z = approach(controls.target.z, focusDepth, 10);
        const orbiting = controls.update(delta);
        const ambient = stryMutAct_9fa48("12389") ? desk.group.visible && options.roomMotion !== false && !reduced || !(software && options.environment === 'typing') : stryMutAct_9fa48("12388") ? false : stryMutAct_9fa48("12387") ? true : (stryCov_9fa48("12387", "12388", "12389"), (stryMutAct_9fa48("12391") ? desk.group.visible && options.roomMotion !== false || !reduced : stryMutAct_9fa48("12390") ? true : (stryCov_9fa48("12390", "12391"), (stryMutAct_9fa48("12393") ? desk.group.visible || options.roomMotion !== false : stryMutAct_9fa48("12392") ? true : (stryCov_9fa48("12392", "12393"), desk.group.visible && (stryMutAct_9fa48("12395") ? options.roomMotion === false : stryMutAct_9fa48("12394") ? true : (stryCov_9fa48("12394", "12395"), options.roomMotion !== (stryMutAct_9fa48("12396") ? true : (stryCov_9fa48("12396"), false)))))) && (stryMutAct_9fa48("12397") ? reduced : (stryCov_9fa48("12397"), !reduced)))) && (stryMutAct_9fa48("12398") ? software && options.environment === 'typing' : (stryCov_9fa48("12398"), !(stryMutAct_9fa48("12401") ? software || options.environment === 'typing' : stryMutAct_9fa48("12400") ? false : stryMutAct_9fa48("12399") ? true : (stryCov_9fa48("12399", "12400", "12401"), software && (stryMutAct_9fa48("12403") ? options.environment !== 'typing' : stryMutAct_9fa48("12402") ? true : (stryCov_9fa48("12402", "12403"), options.environment === (stryMutAct_9fa48("12404") ? "" : (stryCov_9fa48("12404"), 'typing')))))))));
        if (stryMutAct_9fa48("12406") ? false : stryMutAct_9fa48("12405") ? true : (stryCov_9fa48("12405", "12406"), ambient)) stryMutAct_9fa48("12407") ? ambientTime -= delta : (stryCov_9fa48("12407"), ambientTime += delta);
        if (stryMutAct_9fa48("12409") ? false : stryMutAct_9fa48("12408") ? true : (stryCov_9fa48("12408", "12409"), desk.group.visible)) if (stryMutAct_9fa48("12410")) {
          ;
        } else {
          stryCov_9fa48("12410");
          desk.updateAmbient(ambientTime, camera);
        }
        if (stryMutAct_9fa48("12413") ? deskCache || options.environment === 'typing' : stryMutAct_9fa48("12412") ? false : stryMutAct_9fa48("12411") ? true : (stryCov_9fa48("12411", "12412", "12413"), deskCache && (stryMutAct_9fa48("12415") ? options.environment !== 'typing' : stryMutAct_9fa48("12414") ? true : (stryCov_9fa48("12414", "12415"), options.environment === (stryMutAct_9fa48("12416") ? "" : (stryCov_9fa48("12416"), 'typing')))))) {
          if (stryMutAct_9fa48("12417")) {
            {}
          } else {
            stryCov_9fa48("12417");
            if (stryMutAct_9fa48("12419") ? false : stryMutAct_9fa48("12418") ? true : (stryCov_9fa48("12418", "12419"), deskCacheDirty)) {
              if (stryMutAct_9fa48("12420")) {
                {}
              } else {
                stryCov_9fa48("12420");
                if (stryMutAct_9fa48("12422") ? false : stryMutAct_9fa48("12421") ? true : (stryCov_9fa48("12421", "12422"), model)) model.visible = stryMutAct_9fa48("12423") ? true : (stryCov_9fa48("12423"), false);
                if (stryMutAct_9fa48("12425") ? false : stryMutAct_9fa48("12424") ? true : (stryCov_9fa48("12424", "12425"), accessories)) accessories.group.visible = stryMutAct_9fa48("12426") ? true : (stryCov_9fa48("12426"), false);
                if (stryMutAct_9fa48("12427")) {
                  ;
                } else {
                  stryCov_9fa48("12427");
                  renderer.setRenderTarget(deskCache);
                }
                if (stryMutAct_9fa48("12428")) {
                  ;
                } else {
                  stryCov_9fa48("12428");
                  renderer.render(scene, camera);
                }
                if (stryMutAct_9fa48("12429")) {
                  ;
                } else {
                  stryCov_9fa48("12429");
                  renderer.setRenderTarget(null);
                }
                if (stryMutAct_9fa48("12431") ? false : stryMutAct_9fa48("12430") ? true : (stryCov_9fa48("12430", "12431"), model)) model.visible = stryMutAct_9fa48("12432") ? false : (stryCov_9fa48("12432"), true);
                if (stryMutAct_9fa48("12434") ? false : stryMutAct_9fa48("12433") ? true : (stryCov_9fa48("12433", "12434"), accessories)) accessories.group.visible = stryMutAct_9fa48("12435") ? false : (stryCov_9fa48("12435"), true);
                deskCacheDirty = stryMutAct_9fa48("12436") ? true : (stryCov_9fa48("12436"), false);
              }
            }
            desk.group.visible = stryMutAct_9fa48("12437") ? true : (stryCov_9fa48("12437"), false);
            ground.visible = stryMutAct_9fa48("12438") ? false : (stryCov_9fa48("12438"), true);
            scene.background = deskCache.texture;
            if (stryMutAct_9fa48("12439")) {
              ;
            } else {
              stryCov_9fa48("12439");
              renderer.render(scene, camera);
            }
            scene.background = null;
            desk.group.visible = stryMutAct_9fa48("12440") ? false : (stryCov_9fa48("12440"), true);
            ground.visible = stryMutAct_9fa48("12441") ? true : (stryCov_9fa48("12441"), false);
          }
        } else if (stryMutAct_9fa48("12444") ? desk.group.visible || effects : stryMutAct_9fa48("12443") ? false : stryMutAct_9fa48("12442") ? true : (stryCov_9fa48("12442", "12443", "12444"), desk.group.visible && effects)) {
          if (stryMutAct_9fa48("12445")) {
            ;
          } else {
            stryCov_9fa48("12445");
            effects.composer.render(delta);
          }
        } else if (stryMutAct_9fa48("12446")) {
          ;
        } else {
          stryCov_9fa48("12446");
          renderer.render(scene, camera);
        }
        if (stryMutAct_9fa48("12447")) {
          ;
        } else {
          stryCov_9fa48("12447");
          projectMonitor();
        }
        if (stryMutAct_9fa48("12450") ? moving && orbiting : stryMutAct_9fa48("12449") ? false : stryMutAct_9fa48("12448") ? true : (stryCov_9fa48("12448", "12449", "12450"), moving || orbiting)) {
          if (stryMutAct_9fa48("12451")) {
            ;
          } else {
            stryCov_9fa48("12451");
            wake();
          }
        } else if (stryMutAct_9fa48("12453") ? false : stryMutAct_9fa48("12452") ? true : (stryCov_9fa48("12452", "12453"), ambient)) ambientTimer = window.setTimeout(wake, stryMutAct_9fa48("12454") ? 1000 * (software ? 12 : 30) : (stryCov_9fa48("12454"), 1000 / (software ? 12 : 30)));
        element.dataset.renderFrames = String(renderer.info.render.frame);
        element.dataset.renderState = (stryMutAct_9fa48("12457") ? frame && ambientTimer : stryMutAct_9fa48("12456") ? false : stryMutAct_9fa48("12455") ? true : (stryCov_9fa48("12455", "12456", "12457"), frame || ambientTimer)) ? stryMutAct_9fa48("12458") ? "" : (stryCov_9fa48("12458"), 'active') : stryMutAct_9fa48("12459") ? "" : (stryCov_9fa48("12459"), 'idle');
      }
    }
    function clearKeys() {
      if (stryMutAct_9fa48("12460")) {
        {}
      } else {
        stryCov_9fa48("12460");
        for (const code of down) if (stryMutAct_9fa48("12461")) {
          ;
        } else {
          stryCov_9fa48("12461");
          callbacks.release(code);
        }
        if (stryMutAct_9fa48("12462")) {
          ;
        } else {
          stryCov_9fa48("12462");
          down.clear();
        }
        clicked = stryMutAct_9fa48("12463") ? "Stryker was here!" : (stryCov_9fa48("12463"), '');
        if (stryMutAct_9fa48("12464")) {
          ;
        } else {
          stryCov_9fa48("12464");
          wake();
        }
      }
    }
    const editable = stryMutAct_9fa48("12465") ? () => undefined : (stryCov_9fa48("12465"), (() => {
      const editable = (target: EventTarget | null) => stryMutAct_9fa48("12468") ? target instanceof HTMLElement || !!target.closest('input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]') : stryMutAct_9fa48("12467") ? false : stryMutAct_9fa48("12466") ? true : (stryCov_9fa48("12466", "12467", "12468"), target instanceof HTMLElement && (stryMutAct_9fa48("12469") ? !target.closest('input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]') : (stryCov_9fa48("12469"), !(stryMutAct_9fa48("12470") ? target.closest('input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]') : (stryCov_9fa48("12470"), !target.closest(stryMutAct_9fa48("12471") ? "" : (stryCov_9fa48("12471"), 'input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]')))))));
      return editable;
    })());
    function keydown(event: KeyboardEvent) {
      if (stryMutAct_9fa48("12472")) {
        {}
      } else {
        stryCov_9fa48("12472");
        if (stryMutAct_9fa48("12475") ? (editable(event.target) || document.querySelector('dialog[open]') || event.metaKey || event.ctrlKey || event.altKey || event.code === 'Tab') && event.code === 'Escape' : stryMutAct_9fa48("12474") ? false : stryMutAct_9fa48("12473") ? true : (stryCov_9fa48("12473", "12474", "12475"), (stryMutAct_9fa48("12477") ? (editable(event.target) || document.querySelector('dialog[open]') || event.metaKey || event.ctrlKey || event.altKey) && event.code === 'Tab' : stryMutAct_9fa48("12476") ? false : (stryCov_9fa48("12476", "12477"), (stryMutAct_9fa48("12479") ? (editable(event.target) || document.querySelector('dialog[open]') || event.metaKey || event.ctrlKey) && event.altKey : stryMutAct_9fa48("12478") ? false : (stryCov_9fa48("12478", "12479"), (stryMutAct_9fa48("12481") ? (editable(event.target) || document.querySelector('dialog[open]') || event.metaKey) && event.ctrlKey : stryMutAct_9fa48("12480") ? false : (stryCov_9fa48("12480", "12481"), (stryMutAct_9fa48("12483") ? (editable(event.target) || document.querySelector('dialog[open]')) && event.metaKey : stryMutAct_9fa48("12482") ? false : (stryCov_9fa48("12482", "12483"), (stryMutAct_9fa48("12485") ? editable(event.target) && document.querySelector('dialog[open]') : stryMutAct_9fa48("12484") ? false : (stryCov_9fa48("12484", "12485"), editable(event.target) || document.querySelector(stryMutAct_9fa48("12486") ? "" : (stryCov_9fa48("12486"), 'dialog[open]')))) || event.metaKey)) || event.ctrlKey)) || event.altKey)) || (stryMutAct_9fa48("12488") ? event.code !== 'Tab' : stryMutAct_9fa48("12487") ? false : (stryCov_9fa48("12487", "12488"), event.code === (stryMutAct_9fa48("12489") ? "" : (stryCov_9fa48("12489"), 'Tab')))))) || (stryMutAct_9fa48("12491") ? event.code !== 'Escape' : stryMutAct_9fa48("12490") ? false : (stryCov_9fa48("12490", "12491"), event.code === (stryMutAct_9fa48("12492") ? "" : (stryCov_9fa48("12492"), 'Escape')))))) return;
        if (stryMutAct_9fa48("12495") ? event.target instanceof HTMLElement && event.target.closest('button,a,summary') || !/^(Key[A-Z]|Digit[0-9])$/.test(event.code) : stryMutAct_9fa48("12494") ? false : stryMutAct_9fa48("12493") ? true : (stryCov_9fa48("12493", "12494", "12495"), (stryMutAct_9fa48("12497") ? event.target instanceof HTMLElement || event.target.closest('button,a,summary') : stryMutAct_9fa48("12496") ? true : (stryCov_9fa48("12496", "12497"), event.target instanceof HTMLElement && event.target.closest(stryMutAct_9fa48("12498") ? "" : (stryCov_9fa48("12498"), 'button,a,summary')))) && (stryMutAct_9fa48("12499") ? /^(Key[A-Z]|Digit[0-9])$/.test(event.code) : (stryCov_9fa48("12499"), !(stryMutAct_9fa48("12503") ? /^(Key[A-Z]|Digit[^0-9])$/ : stryMutAct_9fa48("12502") ? /^(Key[^A-Z]|Digit[0-9])$/ : stryMutAct_9fa48("12501") ? /^(Key[A-Z]|Digit[0-9])/ : stryMutAct_9fa48("12500") ? /(Key[A-Z]|Digit[0-9])$/ : (stryCov_9fa48("12500", "12501", "12502", "12503"), /^(Key[A-Z]|Digit[0-9])$/)).test(event.code))))) return;
        if (stryMutAct_9fa48("12506") ? options.environment !== 'typing' && event.target === renderer.domElement || ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-', '='].includes(event.key) : stryMutAct_9fa48("12505") ? false : stryMutAct_9fa48("12504") ? true : (stryCov_9fa48("12504", "12505", "12506"), (stryMutAct_9fa48("12508") ? options.environment !== 'typing' || event.target === renderer.domElement : stryMutAct_9fa48("12507") ? true : (stryCov_9fa48("12507", "12508"), (stryMutAct_9fa48("12510") ? options.environment === 'typing' : stryMutAct_9fa48("12509") ? true : (stryCov_9fa48("12509", "12510"), options.environment !== (stryMutAct_9fa48("12511") ? "" : (stryCov_9fa48("12511"), 'typing')))) && (stryMutAct_9fa48("12513") ? event.target !== renderer.domElement : stryMutAct_9fa48("12512") ? true : (stryCov_9fa48("12512", "12513"), event.target === renderer.domElement)))) && (stryMutAct_9fa48("12514") ? [] : (stryCov_9fa48("12514"), [stryMutAct_9fa48("12515") ? "" : (stryCov_9fa48("12515"), 'ArrowLeft'), stryMutAct_9fa48("12516") ? "" : (stryCov_9fa48("12516"), 'ArrowRight'), stryMutAct_9fa48("12517") ? "" : (stryCov_9fa48("12517"), 'ArrowUp'), stryMutAct_9fa48("12518") ? "" : (stryCov_9fa48("12518"), 'ArrowDown'), stryMutAct_9fa48("12519") ? "" : (stryCov_9fa48("12519"), '+'), stryMutAct_9fa48("12520") ? "" : (stryCov_9fa48("12520"), '-'), stryMutAct_9fa48("12521") ? "" : (stryCov_9fa48("12521"), '=')])).includes(event.key))) {
          if (stryMutAct_9fa48("12522")) {
            {}
          } else {
            stryCov_9fa48("12522");
            if (stryMutAct_9fa48("12523")) {
              ;
            } else {
              stryCov_9fa48("12523");
              event.preventDefault();
            }
            cameraTarget = null;
            const offset = camera.position.clone().sub(controls.target);
            const spherical = new THREE.Spherical().setFromVector3(offset);
            if (stryMutAct_9fa48("12526") ? event.key !== 'ArrowLeft' : stryMutAct_9fa48("12525") ? false : stryMutAct_9fa48("12524") ? true : (stryCov_9fa48("12524", "12525", "12526"), event.key === (stryMutAct_9fa48("12527") ? "" : (stryCov_9fa48("12527"), 'ArrowLeft')))) stryMutAct_9fa48("12528") ? spherical.theta += 0.12 : (stryCov_9fa48("12528"), spherical.theta -= 0.12);
            if (stryMutAct_9fa48("12531") ? event.key !== 'ArrowRight' : stryMutAct_9fa48("12530") ? false : stryMutAct_9fa48("12529") ? true : (stryCov_9fa48("12529", "12530", "12531"), event.key === (stryMutAct_9fa48("12532") ? "" : (stryCov_9fa48("12532"), 'ArrowRight')))) stryMutAct_9fa48("12533") ? spherical.theta -= 0.12 : (stryCov_9fa48("12533"), spherical.theta += 0.12);
            if (stryMutAct_9fa48("12536") ? event.key !== 'ArrowUp' : stryMutAct_9fa48("12535") ? false : stryMutAct_9fa48("12534") ? true : (stryCov_9fa48("12534", "12535", "12536"), event.key === (stryMutAct_9fa48("12537") ? "" : (stryCov_9fa48("12537"), 'ArrowUp')))) stryMutAct_9fa48("12538") ? spherical.phi += 0.08 : (stryCov_9fa48("12538"), spherical.phi -= 0.08);
            if (stryMutAct_9fa48("12541") ? event.key !== 'ArrowDown' : stryMutAct_9fa48("12540") ? false : stryMutAct_9fa48("12539") ? true : (stryCov_9fa48("12539", "12540", "12541"), event.key === (stryMutAct_9fa48("12542") ? "" : (stryCov_9fa48("12542"), 'ArrowDown')))) stryMutAct_9fa48("12543") ? spherical.phi -= 0.08 : (stryCov_9fa48("12543"), spherical.phi += 0.08);
            if (stryMutAct_9fa48("12546") ? event.key === '+' && event.key === '=' : stryMutAct_9fa48("12545") ? false : stryMutAct_9fa48("12544") ? true : (stryCov_9fa48("12544", "12545", "12546"), (stryMutAct_9fa48("12548") ? event.key !== '+' : stryMutAct_9fa48("12547") ? false : (stryCov_9fa48("12547", "12548"), event.key === (stryMutAct_9fa48("12549") ? "" : (stryCov_9fa48("12549"), '+')))) || (stryMutAct_9fa48("12551") ? event.key !== '=' : stryMutAct_9fa48("12550") ? false : (stryCov_9fa48("12550", "12551"), event.key === (stryMutAct_9fa48("12552") ? "" : (stryCov_9fa48("12552"), '=')))))) stryMutAct_9fa48("12553") ? spherical.radius /= 0.9 : (stryCov_9fa48("12553"), spherical.radius *= 0.9);
            if (stryMutAct_9fa48("12556") ? event.key !== '-' : stryMutAct_9fa48("12555") ? false : stryMutAct_9fa48("12554") ? true : (stryCov_9fa48("12554", "12555", "12556"), event.key === (stryMutAct_9fa48("12557") ? "" : (stryCov_9fa48("12557"), '-')))) stryMutAct_9fa48("12558") ? spherical.radius /= 1.1 : (stryCov_9fa48("12558"), spherical.radius *= 1.1);
            spherical.radius = THREE.MathUtils.clamp(spherical.radius, controls.minDistance, controls.maxDistance);
            spherical.phi = THREE.MathUtils.clamp(spherical.phi, 0.01, controls.maxPolarAngle);
            if (stryMutAct_9fa48("12559")) {
              ;
            } else {
              stryCov_9fa48("12559");
              camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
            }
            if (stryMutAct_9fa48("12560")) {
              ;
            } else {
              stryCov_9fa48("12560");
              wake();
            }
            return;
          }
        }
        if (stryMutAct_9fa48("12563") ? !event.repeat || keys.has(event.code) : stryMutAct_9fa48("12562") ? false : stryMutAct_9fa48("12561") ? true : (stryCov_9fa48("12561", "12562", "12563"), (stryMutAct_9fa48("12564") ? event.repeat : (stryCov_9fa48("12564"), !event.repeat)) && keys.has(event.code))) {
          if (stryMutAct_9fa48("12565")) {
            {}
          } else {
            stryCov_9fa48("12565");
            if (stryMutAct_9fa48("12566")) {
              ;
            } else {
              stryCov_9fa48("12566");
              event.preventDefault();
            }
            if (stryMutAct_9fa48("12567")) {
              ;
            } else {
              stryCov_9fa48("12567");
              down.add(event.code);
            }
            if (stryMutAct_9fa48("12568")) {
              ;
            } else {
              stryCov_9fa48("12568");
              callbacks.press(event.code);
            }
            if (stryMutAct_9fa48("12569")) {
              ;
            } else {
              stryCov_9fa48("12569");
              wake();
            }
          }
        }
      }
    }
    function keyup(event: KeyboardEvent) {
      if (stryMutAct_9fa48("12570")) {
        {}
      } else {
        stryCov_9fa48("12570");
        if (stryMutAct_9fa48("12572") ? false : stryMutAct_9fa48("12571") ? true : (stryCov_9fa48("12571", "12572"), down.delete(event.code))) {
          if (stryMutAct_9fa48("12573")) {
            {}
          } else {
            stryCov_9fa48("12573");
            if (stryMutAct_9fa48("12574")) {
              ;
            } else {
              stryCov_9fa48("12574");
              callbacks.release(event.code);
            }
            if (stryMutAct_9fa48("12575")) {
              ;
            } else {
              stryCov_9fa48("12575");
              wake();
            }
          }
        }
      }
    }
    function demo(event: Event) {
      if (stryMutAct_9fa48("12576")) {
        {}
      } else {
        stryCov_9fa48("12576");
        if (stryMutAct_9fa48("12579") ? false : stryMutAct_9fa48("12578") ? true : stryMutAct_9fa48("12577") ? event instanceof CustomEvent : (stryCov_9fa48("12577", "12578", "12579"), !(event instanceof CustomEvent))) return;
        if (stryMutAct_9fa48("12582") ? event.detail.reset : stryMutAct_9fa48("12581") ? false : stryMutAct_9fa48("12580") ? true : (stryCov_9fa48("12580", "12581", "12582"), event.detail?.reset)) {
          if (stryMutAct_9fa48("12583")) {
            ;
          } else {
            stryCov_9fa48("12583");
            down.clear();
          }
        } else if (stryMutAct_9fa48("12586") ? typeof event.detail?.code !== 'string' : stryMutAct_9fa48("12585") ? false : stryMutAct_9fa48("12584") ? true : (stryCov_9fa48("12584", "12585", "12586"), typeof (stryMutAct_9fa48("12587") ? event.detail.code : (stryCov_9fa48("12587"), event.detail?.code)) === (stryMutAct_9fa48("12588") ? "" : (stryCov_9fa48("12588"), 'string')))) {
          if (stryMutAct_9fa48("12589")) {
            {}
          } else {
            stryCov_9fa48("12589");
            if (stryMutAct_9fa48("12591") ? false : stryMutAct_9fa48("12590") ? true : (stryCov_9fa48("12590", "12591"), event.detail.down)) {
              if (stryMutAct_9fa48("12592")) {
                ;
              } else {
                stryCov_9fa48("12592");
                down.add(event.detail.code);
              }
            } else if (stryMutAct_9fa48("12593")) {
              ;
            } else {
              stryCov_9fa48("12593");
              down.delete(event.detail.code);
            }
          }
        }
        if (stryMutAct_9fa48("12594")) {
          ;
        } else {
          stryCov_9fa48("12594");
          wake();
        }
      }
    }
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    function pointerdown(event: PointerEvent) {
      if (stryMutAct_9fa48("12595")) {
        {}
      } else {
        stryCov_9fa48("12595");
        if (stryMutAct_9fa48("12598") ? !event.isPrimary && event.button !== 0 : stryMutAct_9fa48("12597") ? false : stryMutAct_9fa48("12596") ? true : (stryCov_9fa48("12596", "12597", "12598"), (stryMutAct_9fa48("12599") ? event.isPrimary : (stryCov_9fa48("12599"), !event.isPrimary)) || (stryMutAct_9fa48("12601") ? event.button === 0 : stryMutAct_9fa48("12600") ? false : (stryCov_9fa48("12600", "12601"), event.button !== 0)))) return;
        renderer.domElement.focus(stryMutAct_9fa48("12603") ? {} : (stryCov_9fa48("12603"), {
          preventScroll: stryMutAct_9fa48("12604") ? false : (stryCov_9fa48("12604"), true)
        }));
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.set(stryMutAct_9fa48("12606") ? (event.clientX - rect.left) / rect.width * 2 + 1 : (stryCov_9fa48("12606"), (stryMutAct_9fa48("12607") ? (event.clientX - rect.left) / rect.width / 2 : (stryCov_9fa48("12607"), (stryMutAct_9fa48("12608") ? (event.clientX - rect.left) * rect.width : (stryCov_9fa48("12608"), (stryMutAct_9fa48("12609") ? event.clientX + rect.left : (stryCov_9fa48("12609"), event.clientX - rect.left)) / rect.width)) * 2)) - 1), stryMutAct_9fa48("12610") ? -((event.clientY - rect.top) / rect.height) * 2 - 1 : (stryCov_9fa48("12610"), (stryMutAct_9fa48("12611") ? -((event.clientY - rect.top) / rect.height) / 2 : (stryCov_9fa48("12611"), (stryMutAct_9fa48("12612") ? +((event.clientY - rect.top) / rect.height) : (stryCov_9fa48("12612"), -(stryMutAct_9fa48("12613") ? (event.clientY - rect.top) * rect.height : (stryCov_9fa48("12613"), (stryMutAct_9fa48("12614") ? event.clientY + rect.top : (stryCov_9fa48("12614"), event.clientY - rect.top)) / rect.height)))) * 2)) + 1));
        if (stryMutAct_9fa48("12615")) {
          ;
        } else {
          stryCov_9fa48("12615");
          ray.setFromCamera(pointer, camera);
        }
        if (stryMutAct_9fa48("12618") ? false : stryMutAct_9fa48("12617") ? true : stryMutAct_9fa48("12616") ? model : (stryCov_9fa48("12616", "12617", "12618"), !model)) return;
        let hit: THREE.Object3D | null = stryMutAct_9fa48("12619") ? ray.intersectObject(model, true)[0]?.object && null : (stryCov_9fa48("12619"), (stryMutAct_9fa48("12620") ? ray.intersectObject(model, true)[0].object : (stryCov_9fa48("12620"), ray.intersectObject(model, stryMutAct_9fa48("12621") ? false : (stryCov_9fa48("12621"), true))[0]?.object)) ?? null);
        while (stryMutAct_9fa48("12623") ? hit || !hit.name.startsWith('key_') : stryMutAct_9fa48("12622") ? false : (stryCov_9fa48("12622", "12623"), hit && (stryMutAct_9fa48("12624") ? hit.name.startsWith('key_') : (stryCov_9fa48("12624"), !(stryMutAct_9fa48("12625") ? hit.name.endsWith('key_') : (stryCov_9fa48("12625"), hit.name.startsWith(stryMutAct_9fa48("12626") ? "" : (stryCov_9fa48("12626"), 'key_')))))))) hit = hit.parent;
        if (stryMutAct_9fa48("12628") ? false : stryMutAct_9fa48("12627") ? true : (stryCov_9fa48("12627", "12628"), hit)) {
          if (stryMutAct_9fa48("12629")) {
            {}
          } else {
            stryCov_9fa48("12629");
            clicked = stryMutAct_9fa48("12630") ? hit.name : (stryCov_9fa48("12630"), hit.name.slice(4));
            if (stryMutAct_9fa48("12631")) {
              ;
            } else {
              stryCov_9fa48("12631");
              down.add(clicked);
            }
            if (stryMutAct_9fa48("12632")) {
              ;
            } else {
              stryCov_9fa48("12632");
              callbacks.press(clicked);
            }
            if (stryMutAct_9fa48("12633")) {
              ;
            } else {
              stryCov_9fa48("12633");
              wake();
            }
          }
        }
      }
    }
    function pointerup() {
      if (stryMutAct_9fa48("12634")) {
        {}
      } else {
        stryCov_9fa48("12634");
        if (stryMutAct_9fa48("12637") ? clicked || down.delete(clicked) : stryMutAct_9fa48("12636") ? false : stryMutAct_9fa48("12635") ? true : (stryCov_9fa48("12635", "12636", "12637"), clicked && down.delete(clicked))) if (stryMutAct_9fa48("12638")) {
          ;
        } else {
          stryCov_9fa48("12638");
          callbacks.release(clicked);
        }
        clicked = stryMutAct_9fa48("12639") ? "Stryker was here!" : (stryCov_9fa48("12639"), '');
        if (stryMutAct_9fa48("12640")) {
          ;
        } else {
          stryCov_9fa48("12640");
          wake();
        }
      }
    }
    function fitTypingCamera() {
      if (stryMutAct_9fa48("12641")) {
        {}
      } else {
        stryCov_9fa48("12641");
        const framing = camera.clone();
        framing.position.copy(stryMutAct_9fa48("12643") ? cameraTarget && camera.position : (stryCov_9fa48("12643"), cameraTarget ?? camera.position));
        if (stryMutAct_9fa48("12644")) {
          ;
        } else {
          stryCov_9fa48("12644");
          framing.lookAt(0, focusHeight, focusDepth);
        }
        if (stryMutAct_9fa48("12645")) {
          ;
        } else {
          stryCov_9fa48("12645");
          framing.updateMatrixWorld();
        }
        let tangent = 0;
        const bounds = stryMutAct_9fa48("12646") ? [] : (stryCov_9fa48("12646"), [...(stryMutAct_9fa48("12647") ? [] : (stryCov_9fa48("12647"), [stryMutAct_9fa48("12648") ? +10.3 : (stryCov_9fa48("12648"), -10.3), 10.3])).flatMap(stryMutAct_9fa48("12649") ? () => undefined : (stryCov_9fa48("12649"), x => (stryMutAct_9fa48("12650") ? [] : (stryCov_9fa48("12650"), [3, stryMutAct_9fa48("12651") ? 15.2 / desk.monitor.scale.y : (stryCov_9fa48("12651"), 15.2 * desk.monitor.scale.y)])).map(stryMutAct_9fa48("12652") ? () => undefined : (stryCov_9fa48("12652"), y => new THREE.Vector3(x, y, stryMutAct_9fa48("12653") ? +10.5 : (stryCov_9fa48("12653"), -10.5)))))), ...(stryMutAct_9fa48("12654") ? [] : (stryCov_9fa48("12654"), [stryMutAct_9fa48("12655") ? +8.5 : (stryCov_9fa48("12655"), -8.5), 8.5])).flatMap(stryMutAct_9fa48("12656") ? () => undefined : (stryCov_9fa48("12656"), x => (stryMutAct_9fa48("12657") ? [] : (stryCov_9fa48("12657"), [stryMutAct_9fa48("12658") ? +3.5 : (stryCov_9fa48("12658"), -3.5), 3.5])).map(stryMutAct_9fa48("12659") ? () => undefined : (stryCov_9fa48("12659"), z => new THREE.Vector3(x, 0, z))))), ...accessoryCorners()]);
        for (const bound of bounds) {
          if (stryMutAct_9fa48("12660")) {
            {}
          } else {
            stryCov_9fa48("12660");
            const point = bound.applyMatrix4(framing.matrixWorldInverse);
            tangent = stryMutAct_9fa48("12661") ? Math.min(tangent, Math.abs(point.y / point.z), Math.abs(point.x / point.z) / camera.aspect) : (stryCov_9fa48("12661"), Math.max(tangent, Math.abs(stryMutAct_9fa48("12662") ? point.y * point.z : (stryCov_9fa48("12662"), point.y / point.z)), stryMutAct_9fa48("12663") ? Math.abs(point.x / point.z) * camera.aspect : (stryCov_9fa48("12663"), Math.abs(stryMutAct_9fa48("12664") ? point.x * point.z : (stryCov_9fa48("12664"), point.x / point.z)) / camera.aspect)));
          }
        }
        camera.fov = THREE.MathUtils.radToDeg(stryMutAct_9fa48("12665") ? 2 / Math.atan(tangent * 1.055) : (stryCov_9fa48("12665"), 2 * Math.atan(stryMutAct_9fa48("12666") ? tangent / 1.055 : (stryCov_9fa48("12666"), tangent * 1.055))));
        if (stryMutAct_9fa48("12667")) {
          ;
        } else {
          stryCov_9fa48("12667");
          camera.updateProjectionMatrix();
        }
      }
    }
    function projectMonitor() {
      if (stryMutAct_9fa48("12668")) {
        {}
      } else {
        stryCov_9fa48("12668");
        const display = element.querySelector<HTMLElement>(stryMutAct_9fa48("12669") ? "" : (stryCov_9fa48("12669"), '.monitor-display'));
        if (stryMutAct_9fa48("12672") ? !display && options.environment !== 'typing' : stryMutAct_9fa48("12671") ? false : stryMutAct_9fa48("12670") ? true : (stryCov_9fa48("12670", "12671", "12672"), (stryMutAct_9fa48("12673") ? display : (stryCov_9fa48("12673"), !display)) || (stryMutAct_9fa48("12675") ? options.environment === 'typing' : stryMutAct_9fa48("12674") ? false : (stryCov_9fa48("12674", "12675"), options.environment !== (stryMutAct_9fa48("12676") ? "" : (stryCov_9fa48("12676"), 'typing')))))) return;
        const project = (x: number, y: number): ScreenPoint => {
          if (stryMutAct_9fa48("12677")) {
            {}
          } else {
            stryCov_9fa48("12677");
            const point = desk.screen.localToWorld(new THREE.Vector3(x, y, 0)).project(camera);
            return stryMutAct_9fa48("12678") ? {} : (stryCov_9fa48("12678"), {
              x: stryMutAct_9fa48("12679") ? (point.x + 1) * element.clientWidth * 2 : (stryCov_9fa48("12679"), (stryMutAct_9fa48("12680") ? (point.x + 1) / element.clientWidth : (stryCov_9fa48("12680"), (stryMutAct_9fa48("12681") ? point.x - 1 : (stryCov_9fa48("12681"), point.x + 1)) * element.clientWidth)) / 2),
              y: stryMutAct_9fa48("12682") ? (1 - point.y) * element.clientHeight * 2 : (stryCov_9fa48("12682"), (stryMutAct_9fa48("12683") ? (1 - point.y) / element.clientHeight : (stryCov_9fa48("12683"), (stryMutAct_9fa48("12684") ? 1 + point.y : (stryCov_9fa48("12684"), 1 - point.y)) * element.clientHeight)) / 2)
            });
          }
        };
        const corners: [ScreenPoint, ScreenPoint, ScreenPoint, ScreenPoint] = stryMutAct_9fa48("12685") ? [] : (stryCov_9fa48("12685"), [project(stryMutAct_9fa48("12686") ? +9.56 : (stryCov_9fa48("12686"), -9.56), 5.41), project(9.56, 5.41), project(9.56, stryMutAct_9fa48("12687") ? +5.41 : (stryCov_9fa48("12687"), -5.41)), project(stryMutAct_9fa48("12688") ? +9.56 : (stryCov_9fa48("12688"), -9.56), stryMutAct_9fa48("12689") ? +5.41 : (stryCov_9fa48("12689"), -5.41))]);
        const width = stryMutAct_9fa48("12690") ? Math.min(320, Math.round(Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y))) : (stryCov_9fa48("12690"), Math.max(320, Math.round(Math.hypot(stryMutAct_9fa48("12691") ? corners[1].x + corners[0].x : (stryCov_9fa48("12691"), corners[1].x - corners[0].x), stryMutAct_9fa48("12692") ? corners[1].y + corners[0].y : (stryCov_9fa48("12692"), corners[1].y - corners[0].y)))));
        const height = stryMutAct_9fa48("12693") ? width * 10.82 * desk.monitor.scale.y * 19.12 : (stryCov_9fa48("12693"), (stryMutAct_9fa48("12694") ? width * 10.82 / desk.monitor.scale.y : (stryCov_9fa48("12694"), (stryMutAct_9fa48("12695") ? width / 10.82 : (stryCov_9fa48("12695"), width * 10.82)) * desk.monitor.scale.y)) / 19.12);
        const transform = monitorTransform(corners, width, height);
        if (stryMutAct_9fa48("12698") ? false : stryMutAct_9fa48("12697") ? true : stryMutAct_9fa48("12696") ? transform : (stryCov_9fa48("12696", "12697", "12698"), !transform)) return;
        display.style.width = stryMutAct_9fa48("12699") ? `` : (stryCov_9fa48("12699"), `${width}px`);
        display.style.height = stryMutAct_9fa48("12700") ? `` : (stryCov_9fa48("12700"), `${height}px`);
        display.style.transform = transform;
        element.dataset.monitor = stryMutAct_9fa48("12701") ? "" : (stryCov_9fa48("12701"), 'projected');
        const keyFront = new THREE.Vector3(0, 1, 4).project(camera);
        element.dataset.keyboardY = String(stryMutAct_9fa48("12702") ? (1 - keyFront.y) * element.clientHeight * 2 : (stryCov_9fa48("12702"), (stryMutAct_9fa48("12703") ? (1 - keyFront.y) / element.clientHeight : (stryCov_9fa48("12703"), (stryMutAct_9fa48("12704") ? 1 + keyFront.y : (stryCov_9fa48("12704"), 1 - keyFront.y)) * element.clientHeight)) / 2));
      }
    }
    function resize() {
      if (stryMutAct_9fa48("12705")) {
        {}
      } else {
        stryCov_9fa48("12705");
        const width = stryMutAct_9fa48("12706") ? Math.min(element.clientWidth, 1) : (stryCov_9fa48("12706"), Math.max(element.clientWidth, 1)),
          height = stryMutAct_9fa48("12707") ? Math.min(element.clientHeight, 1) : (stryCov_9fa48("12707"), Math.max(element.clientHeight, 1));
        const aspect = stryMutAct_9fa48("12708") ? width * height : (stryCov_9fa48("12708"), width / height);
        if (stryMutAct_9fa48("12709")) {
          ;
        } else {
          stryCov_9fa48("12709");
          renderer.setSize(width, height);
        }
        stryMutAct_9fa48("12710") ? deskCache.setSize(Math.max(1, Math.round(width * renderer.getPixelRatio())), Math.max(1, Math.round(height * renderer.getPixelRatio()))) : (stryCov_9fa48("12710"), deskCache?.setSize(stryMutAct_9fa48("12711") ? Math.min(1, Math.round(width * renderer.getPixelRatio())) : (stryCov_9fa48("12711"), Math.max(1, Math.round(stryMutAct_9fa48("12712") ? width / renderer.getPixelRatio() : (stryCov_9fa48("12712"), width * renderer.getPixelRatio())))), stryMutAct_9fa48("12713") ? Math.min(1, Math.round(height * renderer.getPixelRatio())) : (stryCov_9fa48("12713"), Math.max(1, Math.round(stryMutAct_9fa48("12714") ? height / renderer.getPixelRatio() : (stryCov_9fa48("12714"), height * renderer.getPixelRatio()))))));
        deskCacheDirty = stryMutAct_9fa48("12715") ? false : (stryCov_9fa48("12715"), true);
        stryMutAct_9fa48("12716") ? effects.composer.setSize(width, height) : (stryCov_9fa48("12716"), effects?.composer.setSize(width, height));
        stryMutAct_9fa48("12717") ? effects.occlusion.setSize(Math.round(width * 0.75), Math.round(height * 0.75)) : (stryCov_9fa48("12717"), effects?.occlusion.setSize(Math.round(stryMutAct_9fa48("12718") ? width / 0.75 : (stryCov_9fa48("12718"), width * 0.75)), Math.round(stryMutAct_9fa48("12719") ? height / 0.75 : (stryCov_9fa48("12719"), height * 0.75))));
        camera.aspect = aspect;
        camera.fov = THREE.MathUtils.radToDeg(stryMutAct_9fa48("12720") ? 2 / Math.atan(Math.tan(THREE.MathUtils.degToRad(34) / 2) * Math.max(1, 1.5 / aspect)) : (stryCov_9fa48("12720"), 2 * Math.atan(stryMutAct_9fa48("12721") ? Math.tan(THREE.MathUtils.degToRad(34) / 2) / Math.max(1, 1.5 / aspect) : (stryCov_9fa48("12721"), Math.tan(stryMutAct_9fa48("12722") ? THREE.MathUtils.degToRad(34) * 2 : (stryCov_9fa48("12722"), THREE.MathUtils.degToRad(34) / 2)) * (stryMutAct_9fa48("12723") ? Math.min(1, 1.5 / aspect) : (stryCov_9fa48("12723"), Math.max(1, stryMutAct_9fa48("12724") ? 1.5 * aspect : (stryCov_9fa48("12724"), 1.5 / aspect))))))));
        if (stryMutAct_9fa48("12727") ? options.environment !== 'typing' : stryMutAct_9fa48("12726") ? false : stryMutAct_9fa48("12725") ? true : (stryCov_9fa48("12725", "12726", "12727"), options.environment === (stryMutAct_9fa48("12728") ? "" : (stryCov_9fa48("12728"), 'typing')))) {
          if (stryMutAct_9fa48("12729")) {
            {}
          } else {
            stryCov_9fa48("12729");
            desk.monitor.scale.y = (stryMutAct_9fa48("12733") ? width >= 700 : stryMutAct_9fa48("12732") ? width <= 700 : stryMutAct_9fa48("12731") ? false : stryMutAct_9fa48("12730") ? true : (stryCov_9fa48("12730", "12731", "12732", "12733"), width < 700)) ? 1.65 : 1;
            focusHeight = (stryMutAct_9fa48("12737") ? width >= 700 : stryMutAct_9fa48("12736") ? width <= 700 : stryMutAct_9fa48("12735") ? false : stryMutAct_9fa48("12734") ? true : (stryCov_9fa48("12734", "12735", "12736", "12737"), width < 700)) ? 10 : 5;
            cameraTarget = new THREE.Vector3(0, (stryMutAct_9fa48("12741") ? width >= 700 : stryMutAct_9fa48("12740") ? width <= 700 : stryMutAct_9fa48("12739") ? false : stryMutAct_9fa48("12738") ? true : (stryCov_9fa48("12738", "12739", "12740", "12741"), width < 700)) ? 25 : 17, (stryMutAct_9fa48("12745") ? width >= 700 : stryMutAct_9fa48("12744") ? width <= 700 : stryMutAct_9fa48("12743") ? false : stryMutAct_9fa48("12742") ? true : (stryCov_9fa48("12742", "12743", "12744", "12745"), width < 700)) ? 52 : 38);
            if (stryMutAct_9fa48("12746")) {
              ;
            } else {
              stryCov_9fa48("12746");
              fitTypingCamera();
            }
            if (stryMutAct_9fa48("12747")) {
              ;
            } else {
              stryCov_9fa48("12747");
              camera.position.copy(cameraTarget);
            }
            if (stryMutAct_9fa48("12748")) {
              ;
            } else {
              stryCov_9fa48("12748");
              controls.target.set(0, focusHeight, focusDepth);
            }
            if (stryMutAct_9fa48("12749")) {
              ;
            } else {
              stryCov_9fa48("12749");
              controls.update();
            }
            cameraTarget = null;
          }
        } else {
          if (stryMutAct_9fa48("12750")) {
            {}
          } else {
            stryCov_9fa48("12750");
            if (stryMutAct_9fa48("12751")) {
              ;
            } else {
              stryCov_9fa48("12751");
              camera.updateProjectionMatrix();
            }
            if (stryMutAct_9fa48("12754") ? accessories?.counts.external && accessories?.counts.planned : stryMutAct_9fa48("12753") ? false : stryMutAct_9fa48("12752") ? true : (stryCov_9fa48("12752", "12753", "12754"), (stryMutAct_9fa48("12755") ? accessories.counts.external : (stryCov_9fa48("12755"), accessories?.counts.external)) || (stryMutAct_9fa48("12756") ? accessories.counts.planned : (stryCov_9fa48("12756"), accessories?.counts.planned)))) {
              if (stryMutAct_9fa48("12757")) {
                {}
              } else {
                stryCov_9fa48("12757");
                stryMutAct_9fa48("12758") ? cameraTarget &&= camera.position.clone() : (stryCov_9fa48("12758"), cameraTarget ??= camera.position.clone());
                if (stryMutAct_9fa48("12759")) {
                  ;
                } else {
                  stryCov_9fa48("12759");
                  fitAccessories();
                }
              }
            }
          }
        }
        if (stryMutAct_9fa48("12760")) {
          ;
        } else {
          stryCov_9fa48("12760");
          wake();
        }
      }
    }
    function visibility() {
      if (stryMutAct_9fa48("12761")) {
        {}
      } else {
        stryCov_9fa48("12761");
        if (stryMutAct_9fa48("12763") ? false : stryMutAct_9fa48("12762") ? true : (stryCov_9fa48("12762", "12763"), document.hidden)) {
          if (stryMutAct_9fa48("12764")) {
            {}
          } else {
            stryCov_9fa48("12764");
            if (stryMutAct_9fa48("12765")) {
              ;
            } else {
              stryCov_9fa48("12765");
              clearKeys();
            }
            if (stryMutAct_9fa48("12766")) {
              ;
            } else {
              stryCov_9fa48("12766");
              cancelAnimationFrame(frame);
            }
            if (stryMutAct_9fa48("12767")) {
              ;
            } else {
              stryCov_9fa48("12767");
              window.clearTimeout(ambientTimer);
            }
            ambientTimer = 0;
            frame = 0;
            element.dataset.renderState = stryMutAct_9fa48("12768") ? "" : (stryCov_9fa48("12768"), 'paused');
          }
        } else {
          if (stryMutAct_9fa48("12769")) {
            {}
          } else {
            stryCov_9fa48("12769");
            lastFrame = performance.now();
            if (stryMutAct_9fa48("12770")) {
              ;
            } else {
              stryCov_9fa48("12770");
              wake();
            }
          }
        }
      }
    }
    function motion() {
      if (stryMutAct_9fa48("12771")) {
        {}
      } else {
        stryCov_9fa48("12771");
        reduced = preference.matches;
        controls.enableDamping = stryMutAct_9fa48("12774") ? !reduced && !software || options.environment !== 'typing' : stryMutAct_9fa48("12773") ? false : stryMutAct_9fa48("12772") ? true : (stryCov_9fa48("12772", "12773", "12774"), (stryMutAct_9fa48("12776") ? !reduced || !software : stryMutAct_9fa48("12775") ? true : (stryCov_9fa48("12775", "12776"), (stryMutAct_9fa48("12777") ? reduced : (stryCov_9fa48("12777"), !reduced)) && (stryMutAct_9fa48("12778") ? software : (stryCov_9fa48("12778"), !software)))) && (stryMutAct_9fa48("12780") ? options.environment === 'typing' : stryMutAct_9fa48("12779") ? true : (stryCov_9fa48("12779", "12780"), options.environment !== (stryMutAct_9fa48("12781") ? "" : (stryCov_9fa48("12781"), 'typing')))));
        if (stryMutAct_9fa48("12782")) {
          ;
        } else {
          stryCov_9fa48("12782");
          wake();
        }
      }
    }
    function orbitStart() {
      if (stryMutAct_9fa48("12783")) {
        {}
      } else {
        stryCov_9fa48("12783");
        cameraTarget = null;
        if (stryMutAct_9fa48("12784")) {
          ;
        } else {
          stryCov_9fa48("12784");
          wake();
        }
      }
    }
    function contextLost(event: Event) {
      if (stryMutAct_9fa48("12785")) {
        {}
      } else {
        stryCov_9fa48("12785");
        if (stryMutAct_9fa48("12786")) {
          ;
        } else {
          stryCov_9fa48("12786");
          event.preventDefault();
        }
        graphicsLost = stryMutAct_9fa48("12787") ? false : (stryCov_9fa48("12787"), true);
        if (stryMutAct_9fa48("12788")) {
          ;
        } else {
          stryCov_9fa48("12788");
          cancelAnimationFrame(frame);
        }
        if (stryMutAct_9fa48("12789")) {
          ;
        } else {
          stryCov_9fa48("12789");
          window.clearTimeout(ambientTimer);
        }
        ambientTimer = 0;
        frame = 0;
        callbacks.status(stryMutAct_9fa48("12791") ? {} : (stryCov_9fa48("12791"), {
          kind: stryMutAct_9fa48("12792") ? "" : (stryCov_9fa48("12792"), 'error'),
          message: stryMutAct_9fa48("12793") ? "" : (stryCov_9fa48("12793"), 'The 3D preview paused after a graphics reset. Try loading it again.')
        }));
      }
    }
    const observer = new ResizeObserver(resize);
    if (stryMutAct_9fa48("12794")) {
      ;
    } else {
      stryCov_9fa48("12794");
      observer.observe(element);
    }
    const intersection = new IntersectionObserver(([entry]) => {
      if (stryMutAct_9fa48("12795")) {
        {}
      } else {
        stryCov_9fa48("12795");
        visible = entry.isIntersecting;
        if (stryMutAct_9fa48("12797") ? false : stryMutAct_9fa48("12796") ? true : (stryCov_9fa48("12796", "12797"), visible)) {
          if (stryMutAct_9fa48("12798")) {
            {}
          } else {
            stryCov_9fa48("12798");
            lastFrame = performance.now();
            if (stryMutAct_9fa48("12799")) {
              ;
            } else {
              stryCov_9fa48("12799");
              wake();
            }
          }
        } else {
          if (stryMutAct_9fa48("12800")) {
            {}
          } else {
            stryCov_9fa48("12800");
            if (stryMutAct_9fa48("12801")) {
              ;
            } else {
              stryCov_9fa48("12801");
              cancelAnimationFrame(frame);
            }
            if (stryMutAct_9fa48("12802")) {
              ;
            } else {
              stryCov_9fa48("12802");
              window.clearTimeout(ambientTimer);
            }
            ambientTimer = 0;
            frame = 0;
            element.dataset.renderState = stryMutAct_9fa48("12803") ? "" : (stryCov_9fa48("12803"), 'paused');
          }
        }
      }
    });
    if (stryMutAct_9fa48("12804")) {
      ;
    } else {
      stryCov_9fa48("12804");
      intersection.observe(element);
    }
    controls.addEventListener(stryMutAct_9fa48("12806") ? "" : (stryCov_9fa48("12806"), 'change'), wake);
    controls.addEventListener(stryMutAct_9fa48("12808") ? "" : (stryCov_9fa48("12808"), 'start'), orbitStart);
    window.addEventListener(stryMutAct_9fa48("12810") ? "" : (stryCov_9fa48("12810"), 'keydown'), keydown);
    window.addEventListener(stryMutAct_9fa48("12812") ? "" : (stryCov_9fa48("12812"), 'keyup'), keyup);
    window.addEventListener(stryMutAct_9fa48("12814") ? "" : (stryCov_9fa48("12814"), 'blur'), clearKeys);
    window.addEventListener(stryMutAct_9fa48("12816") ? "" : (stryCov_9fa48("12816"), 'pointerup'), pointerup);
    window.addEventListener(stryMutAct_9fa48("12818") ? "" : (stryCov_9fa48("12818"), 'pointercancel'), pointerup);
    window.addEventListener(stryMutAct_9fa48("12820") ? "" : (stryCov_9fa48("12820"), 'keyconf-demo'), demo);
    document.addEventListener(stryMutAct_9fa48("12822") ? "" : (stryCov_9fa48("12822"), 'visibilitychange'), visibility);
    preference.addEventListener(stryMutAct_9fa48("12824") ? "" : (stryCov_9fa48("12824"), 'change'), motion);
    renderer.domElement.addEventListener(stryMutAct_9fa48("12826") ? "" : (stryCov_9fa48("12826"), 'pointerdown'), pointerdown);
    renderer.domElement.addEventListener(stryMutAct_9fa48("12828") ? "" : (stryCov_9fa48("12828"), 'webglcontextlost'), contextLost);
    if (stryMutAct_9fa48("12829")) {
      ;
    } else {
      stryCov_9fa48("12829");
      resize();
    }
    if (stryMutAct_9fa48("12830")) {
      ;
    } else {
      stryCov_9fa48("12830");
      setView();
    }
    appearance(stryMutAct_9fa48("12832") ? false : (stryCov_9fa48("12832"), true));
    void loadModel(initial.device);
    return stryMutAct_9fa48("12833") ? {} : (stryCov_9fa48("12833"), {
      update(next: SceneOptions, handlers: Callbacks) {
        if (stryMutAct_9fa48("12834")) {
          {}
        } else {
          stryCov_9fa48("12834");
          callbacks = handlers;
          const modelChanged = stryMutAct_9fa48("12837") ? modelIdFor(next.device) === modelIdFor(options.device) : stryMutAct_9fa48("12836") ? false : stryMutAct_9fa48("12835") ? true : (stryCov_9fa48("12835", "12836", "12837"), modelIdFor(next.device) !== modelIdFor(options.device));
          const viewChanged = stryMutAct_9fa48("12840") ? (next.view !== options.view || modelChanged) && next.environment !== options.environment : stryMutAct_9fa48("12839") ? false : stryMutAct_9fa48("12838") ? true : (stryCov_9fa48("12838", "12839", "12840"), (stryMutAct_9fa48("12842") ? next.view !== options.view && modelChanged : stryMutAct_9fa48("12841") ? false : (stryCov_9fa48("12841", "12842"), (stryMutAct_9fa48("12844") ? next.view === options.view : stryMutAct_9fa48("12843") ? false : (stryCov_9fa48("12843", "12844"), next.view !== options.view)) || modelChanged)) || (stryMutAct_9fa48("12846") ? next.environment === options.environment : stryMutAct_9fa48("12845") ? false : (stryCov_9fa48("12845", "12846"), next.environment !== options.environment)));
          const assemblyChanged = stryMutAct_9fa48("12849") ? next.exploded === options.exploded : stryMutAct_9fa48("12848") ? false : stryMutAct_9fa48("12847") ? true : (stryCov_9fa48("12847", "12848", "12849"), next.exploded !== options.exploded);
          const accessoriesChanged = stryMutAct_9fa48("12852") ? JSON.stringify(next.accessories) !== JSON.stringify(options.accessories) && JSON.stringify(next.customAccessories) !== JSON.stringify(options.customAccessories) : stryMutAct_9fa48("12851") ? false : stryMutAct_9fa48("12850") ? true : (stryCov_9fa48("12850", "12851", "12852"), (stryMutAct_9fa48("12854") ? JSON.stringify(next.accessories) === JSON.stringify(options.accessories) : stryMutAct_9fa48("12853") ? false : (stryCov_9fa48("12853", "12854"), JSON.stringify(next.accessories) !== JSON.stringify(options.accessories))) || (stryMutAct_9fa48("12856") ? JSON.stringify(next.customAccessories) === JSON.stringify(options.customAccessories) : stryMutAct_9fa48("12855") ? false : (stryCov_9fa48("12855", "12856"), JSON.stringify(next.customAccessories) !== JSON.stringify(options.customAccessories))));
          const changed = stryMutAct_9fa48("12859") ? JSON.stringify(options) === JSON.stringify(next) : stryMutAct_9fa48("12858") ? false : stryMutAct_9fa48("12857") ? true : (stryCov_9fa48("12857", "12858", "12859"), JSON.stringify(options) !== JSON.stringify(next));
          options = next;
          if (stryMutAct_9fa48("12861") ? false : stryMutAct_9fa48("12860") ? true : (stryCov_9fa48("12860", "12861"), modelChanged)) void loadModel(next.device);else if (stryMutAct_9fa48("12863") ? false : stryMutAct_9fa48("12862") ? true : (stryCov_9fa48("12862", "12863"), accessoriesChanged)) if (stryMutAct_9fa48("12864")) {
            ;
          } else {
            stryCov_9fa48("12864");
            updateAccessories();
          }
          if (stryMutAct_9fa48("12866") ? false : stryMutAct_9fa48("12865") ? true : (stryCov_9fa48("12865", "12866"), viewChanged)) {
            if (stryMutAct_9fa48("12867")) {
              ;
            } else {
              stryCov_9fa48("12867");
              setView();
            }
          } else if (stryMutAct_9fa48("12869") ? false : stryMutAct_9fa48("12868") ? true : (stryCov_9fa48("12868", "12869"), assemblyChanged)) {
            if (stryMutAct_9fa48("12870")) {
              {}
            } else {
              stryCov_9fa48("12870");
              const offset = camera.position.clone().sub(controls.target);
              if (stryMutAct_9fa48("12872") ? false : stryMutAct_9fa48("12871") ? true : (stryCov_9fa48("12871", "12872"), next.exploded)) assembledDistance = offset.length();
              focusHeight = next.exploded ? 1.35 : 0.4;
              offset.setLength(next.exploded ? stryMutAct_9fa48("12874") ? Math.min(14, offset.length()) : (stryCov_9fa48("12874"), Math.max(14, offset.length())) : assembledDistance);
              cameraTarget = offset.add(new THREE.Vector3(0, focusHeight, 0));
            }
          }
          if (stryMutAct_9fa48("12876") ? false : stryMutAct_9fa48("12875") ? true : (stryCov_9fa48("12875", "12876"), changed)) if (stryMutAct_9fa48("12877")) {
            ;
          } else {
            stryCov_9fa48("12877");
            appearance();
          }
        }
      },
      dispose() {
        if (stryMutAct_9fa48("12878")) {
          {}
        } else {
          stryCov_9fa48("12878");
          stopped = stryMutAct_9fa48("12879") ? false : (stryCov_9fa48("12879"), true);
          stryMutAct_9fa48("12880") ? generation-- : (stryCov_9fa48("12880"), generation++);
          if (stryMutAct_9fa48("12881")) {
            ;
          } else {
            stryCov_9fa48("12881");
            cancelAnimationFrame(frame);
          }
          if (stryMutAct_9fa48("12882")) {
            ;
          } else {
            stryCov_9fa48("12882");
            window.clearTimeout(ambientTimer);
          }
          ambientTimer = 0;
          if (stryMutAct_9fa48("12883")) {
            ;
          } else {
            stryCov_9fa48("12883");
            observer.disconnect();
          }
          if (stryMutAct_9fa48("12884")) {
            ;
          } else {
            stryCov_9fa48("12884");
            intersection.disconnect();
          }
          if (stryMutAct_9fa48("12885")) {
            ;
          } else {
            stryCov_9fa48("12885");
            controls.dispose();
          }
          window.removeEventListener(stryMutAct_9fa48("12887") ? "" : (stryCov_9fa48("12887"), 'keydown'), keydown);
          window.removeEventListener(stryMutAct_9fa48("12889") ? "" : (stryCov_9fa48("12889"), 'keyup'), keyup);
          window.removeEventListener(stryMutAct_9fa48("12891") ? "" : (stryCov_9fa48("12891"), 'blur'), clearKeys);
          window.removeEventListener(stryMutAct_9fa48("12893") ? "" : (stryCov_9fa48("12893"), 'pointerup'), pointerup);
          window.removeEventListener(stryMutAct_9fa48("12895") ? "" : (stryCov_9fa48("12895"), 'pointercancel'), pointerup);
          window.removeEventListener(stryMutAct_9fa48("12897") ? "" : (stryCov_9fa48("12897"), 'keyconf-demo'), demo);
          document.removeEventListener(stryMutAct_9fa48("12899") ? "" : (stryCov_9fa48("12899"), 'visibilitychange'), visibility);
          preference.removeEventListener(stryMutAct_9fa48("12901") ? "" : (stryCov_9fa48("12901"), 'change'), motion);
          renderer.domElement.removeEventListener(stryMutAct_9fa48("12903") ? "" : (stryCov_9fa48("12903"), 'pointerdown'), pointerdown);
          renderer.domElement.removeEventListener(stryMutAct_9fa48("12905") ? "" : (stryCov_9fa48("12905"), 'webglcontextlost'), contextLost);
          stryMutAct_9fa48("12906") ? accessories.dispose() : (stryCov_9fa48("12906"), accessories?.dispose());
          if (stryMutAct_9fa48("12907")) {
            ;
          } else {
            stryCov_9fa48("12907");
            loaded.forEach(disposeModel);
          }
          if (stryMutAct_9fa48("12908")) {
            ;
          } else {
            stryCov_9fa48("12908");
            desk.dispose();
          }
          stryMutAct_9fa48("12909") ? effects.occlusion.dispose() : (stryCov_9fa48("12909"), effects?.occlusion.dispose());
          stryMutAct_9fa48("12910") ? effects.output.dispose() : (stryCov_9fa48("12910"), effects?.output.dispose());
          stryMutAct_9fa48("12911") ? effects.composer.dispose() : (stryCov_9fa48("12911"), effects?.composer.dispose());
          stryMutAct_9fa48("12912") ? deskCache.dispose() : (stryCov_9fa48("12912"), deskCache?.dispose());
          if (stryMutAct_9fa48("12913")) {
            ;
          } else {
            stryCov_9fa48("12913");
            ground.geometry.dispose();
          }
          if (stryMutAct_9fa48("12914")) {
            ;
          } else {
            stryCov_9fa48("12914");
            ground.material.dispose();
          }
          if (stryMutAct_9fa48("12915")) {
            ;
          } else {
            stryCov_9fa48("12915");
            noise.dispose();
          }
          if (stryMutAct_9fa48("12916")) {
            ;
          } else {
            stryCov_9fa48("12916");
            env.dispose();
          }
          if (stryMutAct_9fa48("12917")) {
            ;
          } else {
            stryCov_9fa48("12917");
            pmrem.dispose();
          }
          if (stryMutAct_9fa48("12918")) {
            ;
          } else {
            stryCov_9fa48("12918");
            renderer.dispose();
          }
          if (stryMutAct_9fa48("12919")) {
            ;
          } else {
            stryCov_9fa48("12919");
            renderer.domElement.remove();
          }
        }
      }
    });
  }
}
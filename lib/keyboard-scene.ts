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
import { monitorTransform, type ScreenPoint } from './monitor-projection';

// Steam contributes to the color pass, but must not cast rectangular occlusion.
class RoomOcclusion extends GTAOPass {
  override render(...args: Parameters<GTAOPass['render']>) {
    this.camera.layers.disable(1);
    try {
      super.render(...args);
    } finally {
      this.camera.layers.enable(1);
    }
  }
}

export type SceneOptions = Pick<Build, 'caseColor' | 'finish' | 'profile'> &
  Omit<Palette, 'name'> & {
    device:
      | { kind: 'keyboard'; layout: Build['layout'] }
      | {
          kind: 'control-deck';
          model: 'grok-bot' | 'codex-micro';
          dial: number;
          lighting: 'Studio' | 'Daylight' | 'After hours';
        };
    exploded: boolean;
    view: string;
    environment: 'desk' | 'studio' | 'typing';
    roomMotion?: boolean;
  };
export type SceneStatus =
  | { kind: 'loading' | 'ready' }
  | { kind: 'error'; message: string };
type Callbacks = {
  press: (code: string) => void;
  release: (code: string) => void;
  status: (state: SceneStatus) => void;
};

function disposeModel(model: THREE.Object3D) {
  const materials = new Set<THREE.Material>();
  const geometries = new Set<THREE.BufferGeometry>();
  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material])
        materials.add(material);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
}

export function createKeyboardScene(
  element: HTMLElement,
  initial: SceneOptions,
  events: Callbacks,
) {
  let callbacks = events;
  let options = initial;
  let stopped = false;
  let graphicsLost = false;
  let frame = 0;
  let ambientTimer = 0;
  let visible = true;
  let lastFrame = 0;
  let generation = 0;
  let model: THREE.Group | null = null;
  let cameraTarget: THREE.Vector3 | null = null;
  let focusHeight = 0.4;
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
  let clicked = '';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = preference.matches;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'application');
  renderer.domElement.setAttribute(
    'aria-label',
    'Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.',
  );
  element.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  scene.environmentIntensity = 0.7;
  room.dispose();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 150);
  camera.position.set(7, 15, 19);
  camera.layers.enable(1);
  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.domElement.style.touchAction = 'pan-y pinch-zoom';
  controls.enableDamping = !reduced;
  controls.dampingFactor = 0.1;
  controls.minDistance = 12;
  controls.maxDistance = 46;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.target.set(0, 0.4, 0);
  controls.enablePan = false;
  const light = new THREE.DirectionalLight('#ffffff', 2.2);
  light.position.set(-12, 19, -10);
  light.castShadow = true;
  light.shadow.mapSize.set(2048, 2048);
  light.shadow.camera.left = -14;
  light.shadow.camera.right = 14;
  light.shadow.camera.top = 12;
  light.shadow.camera.bottom = -12;
  light.shadow.radius = 3;
  light.shadow.blurSamples = 8;
  light.shadow.normalBias = 0.03;
  light.shadow.bias = -0.0001;
  scene.add(light);
  const fill = new THREE.DirectionalLight('#ffffff', 0.8);
  fill.position.set(8, 5, -5);
  scene.add(fill, new THREE.AmbientLight('#ffffff', 0.25));
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ color: '#524c3c', opacity: 0.22 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.22;
  ground.receiveShadow = true;
  scene.add(ground);
  const desk = createDeskScene(wake);
  scene.add(desk.group);
  const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: 2,
  });
  const composer = new EffectComposer(renderer, renderTarget);
  composer.addPass(new RenderPass(scene, camera));
  const occlusion = new RoomOcclusion(scene, camera, 1, 1);
  occlusion.updateGtaoMaterial({
    radius: 0.9,
    thickness: 1.5,
    distanceFallOff: 0.75,
    samples: 12,
  });
  occlusion.blendIntensity = 0.7;
  composer.addPass(occlusion);
  const output = new OutputPass();
  composer.addPass(output);
  const grain = new Uint8Array(128 * 128 * 4);
  for (let i = 0; i < grain.length; i += 4) {
    const value = 150 + Math.floor(Math.random() * 80);
    grain[i] = grain[i + 1] = grain[i + 2] = value;
    grain[i + 3] = 255;
  }
  const noise = new THREE.DataTexture(grain, 128, 128);
  noise.wrapS = noise.wrapT = THREE.RepeatWrapping;
  noise.repeat.set(10, 10);
  noise.magFilter = THREE.LinearFilter;
  noise.minFilter = THREE.LinearMipmapLinearFilter;
  noise.generateMipmaps = true;
  noise.needsUpdate = true;

  function wake() {
    window.clearTimeout(ambientTimer);
    ambientTimer = 0;
    if (!stopped && !graphicsLost && !frame && visible && !document.hidden) {
      frame = requestAnimationFrame(render);
      element.dataset.renderState = 'active';
    }
  }
  function appearance(snap = false) {
    desk.group.visible = options.environment !== 'studio';
    ground.visible = !desk.group.visible;
    renderer.domElement.setAttribute(
      'aria-label',
      options.environment === 'typing'
        ? 'Keyboard preview. Type inside the monitor or click a key to try your build.'
        : 'Keyboard preview. Type to press keys. Arrow keys rotate the view; plus and minus zoom. Tab returns to page controls.',
    );
    const lighting =
      options.device.kind === 'control-deck'
        ? options.device.lighting
        : 'Studio';
    light.color.set(
      lighting === 'Daylight' || desk.group.visible ? '#fff1db' : '#ffffff',
    );
    light.intensity =
      lighting === 'After hours' ? 0.7 : desk.group.visible ? 0.9 : 2.2;
    fill.intensity = lighting === 'After hours' ? 0.3 : 0.8;
    scene.environmentIntensity =
      lighting === 'After hours' ? 0.35 : desk.group.visible ? 0.72 : 0.7;
    const colors = new Map([
      ['case', options.caseColor],
      ['alpha', options.alpha],
      ['mod', options.mod],
      ['accent', options.accent],
      ['space', options.space],
    ]);
    for (const [material, target] of materials) {
      const name = material.name.split('.')[0];
      const legend = name.startsWith('legend_');
      const color = colors.get(legend ? name.slice(7) : name);
      if (color) target.set(legend ? legendInk(color) : color);
      if (snap) material.color.copy(target);
      if (name === 'case') {
        const transparent = options.finish === 'Polycarbonate';
        if (material.transparent !== transparent) {
          material.transparent = transparent;
          material.needsUpdate = true;
        }
        material.metalness =
          options.finish === 'Aluminum'
            ? 0.8
            : options.finish === 'Brass'
              ? 0.95
              : 0;
        material.roughness = transparent ? 0.2 : 0.33;
        material.opacity = transparent ? 0.62 : 1;
        material.depthWrite = !transparent;
      }
    }
    wake();
  }
  function setView() {
    const typing = options.environment === 'typing';
    controls.enableRotate = controls.enableZoom = !typing;
    controls.enableDamping = !reduced && !typing;
    controls.maxDistance = typing ? 80 : 46;
    focusDepth = typing ? -3 : 0;
    desk.monitor.scale.y = typing && element.clientWidth < 700 ? 1.65 : 1;
    if (typing) {
      const narrow = element.clientWidth < 700;
      focusHeight = narrow ? 10 : 5;
      cameraTarget = new THREE.Vector3(0, narrow ? 25 : 17, narrow ? 52 : 38);
      fitTypingCamera();
      controls.update();
      camera.position.copy(cameraTarget);
      controls.target.set(0, focusHeight, focusDepth);
      controls.update();
      cameraTarget = null;
      wake();
      return;
    }
    resize();
    const deck = options.device.kind === 'control-deck';
    const distance = deck
      ? options.exploded
        ? 0.55
        : 0.46
      : options.environment === 'desk'
        ? 1.24
        : 1;
    focusHeight =
      deck && options.exploded
        ? 1.35
        : options.environment === 'desk'
          ? 1.8
          : 0.4;
    controls.minDistance = options.device.kind === 'control-deck' ? 7 : 12;
    cameraTarget =
      options.view === 'top'
        ? new THREE.Vector3(0, 26, 0.01)
        : options.view === 'front'
          ? new THREE.Vector3(0, 6, 25)
          : deck
            ? new THREE.Vector3(-7, 27, 14)
            : new THREE.Vector3(-7, 18, 21);
    cameraTarget.multiplyScalar(distance);
    wake();
  }
  function modelIdFor(device: SceneOptions['device']) {
    return device.kind === 'keyboard'
      ? `keyboard-${device.layout}`
      : device.model;
  }
  async function loadModel(device: SceneOptions['device']) {
    const modelId = modelIdFor(device);
    const request = ++generation;
    callbacks.status({ kind: 'loading' });
    let promise = models.get(modelId);
    if (!promise) {
      promise = new GLTFLoader()
        .loadAsync(new URL(`models/${modelId}.glb`, document.baseURI).href)
        .then((gltf) => {
          if (stopped) {
            disposeModel(gltf.scene);
            return gltf.scene;
          }
          loaded.add(gltf.scene);
          return gltf.scene;
        });
      models.set(modelId, promise);
    }
    try {
      const next = await promise;
      if (stopped || request !== generation) return;
      if (model) scene.remove(model);
      model = next;
      keys.clear();
      materials.clear();
      down.clear();
      clicked = '';
      layers.clear();
      for (const [name, offset] of Object.entries({
        plate: 1.01,
        pcb: 0.51,
        switches: 1.75,
        screen: 1.01,
        control_dial: 1.01,
        control_joystick: 1.01,
      })) {
        const layer = model.getObjectByName(name);
        if (layer) {
          if (!restingHeight.has(layer))
            restingHeight.set(layer, layer.position.y);
          layers.set(layer, offset);
        }
      }
      model.traverse((object) => {
        if (object.name.startsWith('key_')) {
          keys.set(object.name.slice(4), object);
          if (!restingHeight.has(object))
            restingHeight.set(object, object.position.y);
        }
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material]) {
            if (material instanceof THREE.MeshStandardMaterial) {
              materials.set(material, material.color.clone());
              if (!material.name.startsWith('legend')) {
                material.bumpMap = noise;
                material.bumpScale = 0.003;
              }
            }
          }
        }
      });
      scene.add(model);
      appearance(true);
      callbacks.status({ kind: 'ready' });
      wake();
    } catch {
      models.delete(modelId);
      if (!stopped && request === generation)
        callbacks.status({
          kind: 'error',
          message:
            'The keyboard model could not load. Check your connection and try again.',
        });
    }
  }
  function render(time: number) {
    frame = 0;
    if (stopped || !visible || document.hidden) return;
    const delta = Math.min((time - lastFrame) / 1000 || 1 / 60, 0.05);
    lastFrame = time;
    let moving = false;
    const approach = (current: number, target: number, speed: number) => {
      if (reduced || Math.abs(current - target) < 0.0005) return target;
      moving = true;
      return THREE.MathUtils.damp(current, target, speed, delta);
    };
    for (const [code, key] of keys) {
      key.position.y = approach(
        key.position.y,
        (restingHeight.get(key) ?? key.position.y) +
          (options.exploded ? 2.6 : 0) -
          (down.has(code) ? 0.14 : 0),
        19,
      );
      key.scale.y = approach(
        key.scale.y,
        options.device.kind === 'control-deck'
          ? 1
          : options.profile === 'Tall sculpted'
            ? 1.5
            : options.profile === 'Low uniform'
              ? 0.7
              : 1,
        14,
      );
    }
    for (const [layer, offset] of layers)
      layer.position.y = approach(
        layer.position.y,
        (restingHeight.get(layer) ?? layer.position.y) +
          (options.exploded ? offset : 0),
        12,
      );
    const dial = model?.getObjectByName('control_dial');
    if (dial && options.device.kind === 'control-deck')
      dial.rotation.y = approach(
        dial.rotation.y,
        (options.device.dial - 0.5) * Math.PI * 1.5,
        16,
      );
    for (const [material, target] of materials) {
      material.color.r = approach(material.color.r, target.r, 14);
      material.color.g = approach(material.color.g, target.g, 14);
      material.color.b = approach(material.color.b, target.b, 14);
    }
    if (cameraTarget) {
      camera.position.x = approach(camera.position.x, cameraTarget.x, 10);
      camera.position.y = approach(camera.position.y, cameraTarget.y, 10);
      camera.position.z = approach(camera.position.z, cameraTarget.z, 10);
      if (camera.position.distanceTo(cameraTarget) < 0.002) {
        camera.position.copy(cameraTarget);
        cameraTarget = null;
      }
    }
    controls.target.y = approach(controls.target.y, focusHeight, 10);
    controls.target.z = approach(controls.target.z, focusDepth, 10);
    const orbiting = controls.update(delta);
    const ambient =
      desk.group.visible && options.roomMotion !== false && !reduced;
    if (ambient) ambientTime += delta;
    if (desk.group.visible) desk.updateAmbient(ambientTime, camera);
    if (desk.group.visible) composer.render(delta);
    else renderer.render(scene, camera);
    projectMonitor();
    if (moving || orbiting) wake();
    else if (ambient) ambientTimer = window.setTimeout(wake, 1000 / 30);
    element.dataset.renderFrames = String(renderer.info.render.frame);
    element.dataset.renderState = frame || ambientTimer ? 'active' : 'idle';
  }
  function clearKeys() {
    for (const code of down) callbacks.release(code);
    down.clear();
    clicked = '';
    wake();
  }
  const editable = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    !!target.closest(
      'input,textarea,select,dialog,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]',
    );
  function keydown(event: KeyboardEvent) {
    if (
      editable(event.target) ||
      document.querySelector('dialog[open]') ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.code === 'Tab' ||
      event.code === 'Escape'
    )
      return;
    if (
      event.target instanceof HTMLElement &&
      event.target.closest('button,a,summary') &&
      !/^(Key[A-Z]|Digit[0-9])$/.test(event.code)
    )
      return;
    if (
      options.environment !== 'typing' &&
      event.target === renderer.domElement &&
      [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        '+',
        '-',
        '=',
      ].includes(event.key)
    ) {
      event.preventDefault();
      cameraTarget = null;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      if (event.key === 'ArrowLeft') spherical.theta -= 0.12;
      if (event.key === 'ArrowRight') spherical.theta += 0.12;
      if (event.key === 'ArrowUp') spherical.phi -= 0.08;
      if (event.key === 'ArrowDown') spherical.phi += 0.08;
      if (event.key === '+' || event.key === '=') spherical.radius *= 0.9;
      if (event.key === '-') spherical.radius *= 1.1;
      spherical.radius = THREE.MathUtils.clamp(
        spherical.radius,
        controls.minDistance,
        controls.maxDistance,
      );
      spherical.phi = THREE.MathUtils.clamp(
        spherical.phi,
        0.01,
        controls.maxPolarAngle,
      );
      camera.position
        .copy(controls.target)
        .add(new THREE.Vector3().setFromSpherical(spherical));
      wake();
      return;
    }
    if (!event.repeat && keys.has(event.code)) {
      event.preventDefault();
      down.add(event.code);
      callbacks.press(event.code);
      wake();
    }
  }
  function keyup(event: KeyboardEvent) {
    if (down.delete(event.code)) {
      callbacks.release(event.code);
      wake();
    }
  }
  function demo(event: Event) {
    if (!(event instanceof CustomEvent)) return;
    if (event.detail?.reset) down.clear();
    else if (typeof event.detail?.code === 'string') {
      if (event.detail.down) down.add(event.detail.code);
      else down.delete(event.detail.code);
    }
    wake();
  }
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function pointerdown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    renderer.domElement.focus({ preventScroll: true });
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    ray.setFromCamera(pointer, camera);
    if (!model) return;
    let hit: THREE.Object3D | null =
      ray.intersectObject(model, true)[0]?.object ?? null;
    while (hit && !hit.name.startsWith('key_')) hit = hit.parent;
    if (hit) {
      clicked = hit.name.slice(4);
      down.add(clicked);
      callbacks.press(clicked);
      wake();
    }
  }
  function pointerup() {
    if (clicked && down.delete(clicked)) callbacks.release(clicked);
    clicked = '';
    wake();
  }
  function fitTypingCamera() {
    const framing = camera.clone();
    framing.position.copy(cameraTarget ?? camera.position);
    framing.lookAt(0, focusHeight, focusDepth);
    framing.updateMatrixWorld();
    let tangent = 0;
    const bounds = [
      ...[-10.3, 10.3].flatMap((x) =>
        [3, 15.2 * desk.monitor.scale.y].map(
          (y) => new THREE.Vector3(x, y, -10.5),
        ),
      ),
      ...[-8.5, 8.5].flatMap((x) =>
        [-3.5, 3.5].map((z) => new THREE.Vector3(x, 0, z)),
      ),
    ];
    for (const bound of bounds) {
      const point = bound.applyMatrix4(framing.matrixWorldInverse);
      tangent = Math.max(
        tangent,
        Math.abs(point.y / point.z),
        Math.abs(point.x / point.z) / camera.aspect,
      );
    }
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(tangent * 1.055));
    camera.updateProjectionMatrix();
  }
  function projectMonitor() {
    const display = element.querySelector<HTMLElement>('.monitor-display');
    if (!display || options.environment !== 'typing') return;
    const corners = [
      [-9.56, 5.41],
      [9.56, 5.41],
      [9.56, -5.41],
      [-9.56, -5.41],
    ].map(([x, y]) => {
      const point = desk.screen
        .localToWorld(new THREE.Vector3(x, y, 0))
        .project(camera);
      return {
        x: ((point.x + 1) * element.clientWidth) / 2,
        y: ((1 - point.y) * element.clientHeight) / 2,
      };
    }) as [ScreenPoint, ScreenPoint, ScreenPoint, ScreenPoint];
    const width = Math.max(
      320,
      Math.round(
        Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y),
      ),
    );
    const height = (width * 10.82 * desk.monitor.scale.y) / 19.12;
    const transform = monitorTransform(corners, width, height);
    if (!transform) return;
    display.style.width = `${width}px`;
    display.style.height = `${height}px`;
    display.style.transform = transform;
    element.dataset.monitor = 'projected';
    const keyFront = new THREE.Vector3(0, 1, 4).project(camera);
    element.dataset.keyboardY = String(
      ((1 - keyFront.y) * element.clientHeight) / 2,
    );
  }
  function resize() {
    const width = Math.max(element.clientWidth, 1),
      height = Math.max(element.clientHeight, 1);
    const aspect = width / height;
    renderer.setSize(width, height);
    composer.setSize(width, height);
    occlusion.setSize(Math.round(width * 0.75), Math.round(height * 0.75));
    camera.aspect = aspect;
    camera.fov = THREE.MathUtils.radToDeg(
      2 *
        Math.atan(
          Math.tan(THREE.MathUtils.degToRad(34) / 2) *
            Math.max(1, 1.5 / aspect),
        ),
    );
    if (options.environment === 'typing') {
      desk.monitor.scale.y = width < 700 ? 1.65 : 1;
      focusHeight = width < 700 ? 10 : 5;
      cameraTarget = new THREE.Vector3(
        0,
        width < 700 ? 25 : 17,
        width < 700 ? 52 : 38,
      );
      fitTypingCamera();
    } else camera.updateProjectionMatrix();
    wake();
  }
  function visibility() {
    if (document.hidden) {
      clearKeys();
      cancelAnimationFrame(frame);
      window.clearTimeout(ambientTimer);
      ambientTimer = 0;
      frame = 0;
      element.dataset.renderState = 'paused';
    } else {
      lastFrame = performance.now();
      wake();
    }
  }
  function motion() {
    reduced = preference.matches;
    controls.enableDamping = !reduced && options.environment !== 'typing';
    wake();
  }
  function orbitStart() {
    cameraTarget = null;
    wake();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    graphicsLost = true;
    cancelAnimationFrame(frame);
    window.clearTimeout(ambientTimer);
    ambientTimer = 0;
    frame = 0;
    callbacks.status({
      kind: 'error',
      message:
        'The 3D preview paused after a graphics reset. Try loading it again.',
    });
  }
  const observer = new ResizeObserver(resize);
  observer.observe(element);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      lastFrame = performance.now();
      wake();
    } else {
      cancelAnimationFrame(frame);
      window.clearTimeout(ambientTimer);
      ambientTimer = 0;
      frame = 0;
      element.dataset.renderState = 'paused';
    }
  });
  intersection.observe(element);
  controls.addEventListener('change', wake);
  controls.addEventListener('start', orbitStart);
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);
  window.addEventListener('blur', clearKeys);
  window.addEventListener('pointerup', pointerup);
  window.addEventListener('pointercancel', pointerup);
  window.addEventListener('keyconf-demo', demo);
  document.addEventListener('visibilitychange', visibility);
  preference.addEventListener('change', motion);
  renderer.domElement.addEventListener('pointerdown', pointerdown);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  resize();
  setView();
  appearance(true);
  void loadModel(initial.device);
  return {
    update(next: SceneOptions, handlers: Callbacks) {
      callbacks = handlers;
      const modelChanged =
        modelIdFor(next.device) !== modelIdFor(options.device);
      const viewChanged =
        next.view !== options.view ||
        modelChanged ||
        next.environment !== options.environment;
      const assemblyChanged = next.exploded !== options.exploded;
      const changed = JSON.stringify(options) !== JSON.stringify(next);
      options = next;
      if (modelChanged) void loadModel(next.device);
      if (viewChanged) setView();
      else if (assemblyChanged && next.device.kind === 'control-deck') {
        const offset = camera.position.clone().sub(controls.target);
        if (next.exploded) assembledDistance = offset.length();
        focusHeight = next.exploded ? 1.35 : 0.4;
        offset.setLength(
          next.exploded ? Math.max(14, offset.length()) : assembledDistance,
        );
        cameraTarget = offset.add(new THREE.Vector3(0, focusHeight, 0));
      }
      if (changed) appearance();
    },
    dispose() {
      stopped = true;
      generation++;
      cancelAnimationFrame(frame);
      window.clearTimeout(ambientTimer);
      ambientTimer = 0;
      observer.disconnect();
      intersection.disconnect();
      controls.dispose();
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', clearKeys);
      window.removeEventListener('pointerup', pointerup);
      window.removeEventListener('pointercancel', pointerup);
      window.removeEventListener('keyconf-demo', demo);
      document.removeEventListener('visibilitychange', visibility);
      preference.removeEventListener('change', motion);
      renderer.domElement.removeEventListener('pointerdown', pointerdown);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      loaded.forEach(disposeModel);
      desk.dispose();
      occlusion.dispose();
      output.dispose();
      composer.dispose();
      ground.geometry.dispose();
      ground.material.dispose();
      noise.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Build, Palette } from './build';
import { legendInk } from './appearance';

export type SceneOptions = Pick<
  Build,
  'layout' | 'caseColor' | 'finish' | 'profile'
> &
  Omit<Palette, 'name'> & {
    exploded: boolean;
    view: string;
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
  let visible = true;
  let lastFrame = 0;
  let generation = 0;
  let model: THREE.Group | null = null;
  let cameraTarget: THREE.Vector3 | null = null;
  const models = new Map<string, Promise<THREE.Group>>();
  const loaded = new Set<THREE.Group>();
  const keys = new Map<string, THREE.Object3D>();
  const materials = new Map<THREE.MeshStandardMaterial, THREE.Color>();
  const down = new Set<string>();
  let plate: THREE.Object3D | undefined;
  let pcb: THREE.Object3D | undefined;
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
  renderer.shadowMap.type = THREE.PCFShadowMap;
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
  light.position.set(-5, 14, 7);
  light.castShadow = true;
  light.shadow.mapSize.set(2048, 2048);
  light.shadow.camera.left = -14;
  light.shadow.camera.right = 14;
  light.shadow.camera.top = 12;
  light.shadow.camera.bottom = -12;
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
    if (!stopped && !graphicsLost && !frame && visible && !document.hidden) {
      frame = requestAnimationFrame(render);
      element.dataset.renderState = 'active';
    }
  }
  function appearance(snap = false) {
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
    cameraTarget =
      options.view === 'top'
        ? new THREE.Vector3(0, 26, 0.01)
        : options.view === 'front'
          ? new THREE.Vector3(0, 6, 25)
          : new THREE.Vector3(7, 15, 19);
    wake();
  }
  async function loadLayout(layout: SceneOptions['layout']) {
    const request = ++generation;
    callbacks.status({ kind: 'loading' });
    let promise = models.get(layout);
    if (!promise) {
      promise = new GLTFLoader()
        .loadAsync(
          new URL(`models/keyboard-${layout}.glb`, document.baseURI).href,
        )
        .then((gltf) => {
          if (stopped) {
            disposeModel(gltf.scene);
            return gltf.scene;
          }
          loaded.add(gltf.scene);
          return gltf.scene;
        });
      models.set(layout, promise);
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
      plate = model.getObjectByName('plate');
      pcb = model.getObjectByName('pcb');
      model.traverse((object) => {
        if (object.name.startsWith('key_'))
          keys.set(object.name.slice(4), object);
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
      models.delete(layout);
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
        0.43 + (options.exploded ? 2.6 : 0) - (down.has(code) ? 0.14 : 0),
        19,
      );
      key.scale.y = approach(
        key.scale.y,
        options.profile === 'Tall sculpted'
          ? 1.5
          : options.profile === 'Low uniform'
            ? 0.7
            : 1,
        14,
      );
    }
    if (plate)
      plate.position.y = approach(
        plate.position.y,
        options.exploded ? 1.4 : 0.39,
        12,
      );
    if (pcb)
      pcb.position.y = approach(
        pcb.position.y,
        options.exploded ? 0.8 : 0.29,
        12,
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
    const orbiting = controls.update(delta);
    renderer.render(scene, camera);
    if (moving || orbiting) wake();
    element.dataset.renderFrames = String(renderer.info.render.frame);
    element.dataset.renderState = frame ? 'active' : 'idle';
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
  function resize() {
    const width = Math.max(element.clientWidth, 1),
      height = Math.max(element.clientHeight, 1);
    const aspect = width / height;
    renderer.setSize(width, height);
    camera.aspect = aspect;
    camera.fov = THREE.MathUtils.radToDeg(
      2 *
        Math.atan(
          Math.tan(THREE.MathUtils.degToRad(34) / 2) *
            Math.max(1, 1.5 / aspect),
        ),
    );
    camera.updateProjectionMatrix();
    wake();
  }
  function visibility() {
    if (document.hidden) {
      clearKeys();
      cancelAnimationFrame(frame);
      frame = 0;
      element.dataset.renderState = 'paused';
    } else {
      lastFrame = performance.now();
      wake();
    }
  }
  function motion() {
    reduced = preference.matches;
    controls.enableDamping = !reduced;
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
  void loadLayout(initial.layout);
  return {
    update(next: SceneOptions, handlers: Callbacks) {
      callbacks = handlers;
      const layoutChanged = next.layout !== options.layout;
      const viewChanged = next.view !== options.view;
      const changed = JSON.stringify(options) !== JSON.stringify(next);
      options = next;
      if (layoutChanged) void loadLayout(next.layout);
      if (viewChanged) setView();
      if (changed) appearance();
    },
    dispose() {
      stopped = true;
      generation++;
      cancelAnimationFrame(frame);
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

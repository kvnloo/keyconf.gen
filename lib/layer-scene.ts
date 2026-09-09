import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { legendInk } from './appearance.ts';
import type { Build, Palette } from './build.ts';

export type InspectedLayer = 'keycaps' | 'plate' | 'pcb' | 'case';

export type LayerSceneOptions = Pick<Build, 'caseColor' | 'finish'> &
  Omit<Palette, 'name'> & {
    layer: InspectedLayer;
    asset: string;
  };

// The case is six separate solids in the source model; there is no single
// node named "case" to isolate.
const caseNodes = new Set([
  'case_bottom',
  'weight',
  'case_rear',
  'case_front',
  'case_left',
  'case_right',
]);

export function layerHolds(layer: InspectedLayer, name: string) {
  if (layer === 'keycaps') return name.startsWith('key_');
  if (layer === 'case') return caseNodes.has(name);
  return name === layer;
}

function disposeObject(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    for (const material of Array.isArray(object.material)
      ? object.material
      : [object.material])
      material.dispose();
  });
}

export async function createLayerScene(
  element: HTMLElement,
  options: LayerSceneOptions,
  onError: () => void,
) {
  // The studio caches one shared model per keyboard, so this view loads its
  // own copy rather than deleting layers out from under the board on screen.
  const gltf = await new GLTFLoader().loadAsync(
    new URL(`models/${options.asset}`, document.baseURI).href,
  );
  const model = new THREE.Group();
  // Copied because adding a child to the isolated group removes it from this
  // list, which would skip entries mid-iteration.
  for (const child of gltf.scene.children.slice())
    if (layerHolds(options.layer, child.name)) model.add(child);
    else disposeObject(child);
  const kept = model.children.length;
  if (!kept) {
    disposeObject(model);
    throw new Error(`No ${options.layer} geometry in ${options.asset}`);
  }

  const colors = new Map([
    ['case', options.caseColor],
    ['alpha', options.alpha],
    ['mod', options.mod],
    ['accent', options.accent],
    ['space', options.space],
  ]);
  const transparent = options.finish === 'Polycarbonate';
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    for (const material of Array.isArray(object.material)
      ? object.material
      : [object.material]) {
      if (!(material instanceof THREE.MeshStandardMaterial)) continue;
      const name = material.name.split('.')[0];
      const legend = name.startsWith('legend_');
      const color = colors.get(legend ? name.slice(7) : name);
      if (color) material.color.set(legend ? legendInk(color) : color);
      if (name !== 'case') continue;
      material.transparent = transparent;
      material.metalness =
        options.finish === 'Aluminum'
          ? 0.8
          : options.finish === 'Brass'
            ? 0.95
            : 0;
      material.roughness = transparent ? 0.2 : 0.33;
      material.opacity = transparent ? 0.62 : 1;
      material.depthWrite = !transparent;
      material.needsUpdate = true;
    }
  });

  const bounds = new THREE.Box3().setFromObject(model);
  const centre = bounds.getCenter(new THREE.Vector3());
  model.position.sub(centre);
  const radius = bounds.getBoundingSphere(new THREE.Sphere()).radius;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'application');
  renderer.domElement.setAttribute(
    'aria-label',
    `Illustrative ${options.layer} geometry on its own. Arrow keys rotate; plus and minus zoom.`,
  );
  element.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(model);
  const camera = new THREE.PerspectiveCamera(32, 1, radius / 100, radius * 40);
  scene.add(new THREE.HemisphereLight('#fff8eb', '#566b63', 3));
  const key = new THREE.DirectionalLight('#ffffff', 4);
  key.position.set(-3, 5, 4);
  const rim = new THREE.DirectionalLight('#cce1dd', 3);
  rim.position.set(3, 2, -3);
  scene.add(key, rim);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = false;
  // A plate and a PCB are nearly flat, so distance follows the isolated
  // layer's own radius instead of a fixed range tuned to one part.
  const framed = radius / Math.sin((camera.fov * Math.PI) / 360);
  controls.minDistance = framed * 0.45;
  controls.maxDistance = framed * 3;
  let stopped = false;
  function render() {
    if (!stopped) renderer.render(scene, camera);
  }
  function reset() {
    controls.target.set(0, 0, 0);
    camera.position.set(framed * 0.42, framed * 0.72, framed * 0.86);
    controls.update();
    render();
  }
  function resize() {
    renderer.setSize(element.clientWidth, element.clientHeight);
    camera.aspect = element.clientWidth / Math.max(1, element.clientHeight);
    camera.updateProjectionMatrix();
    render();
  }
  function keydown(event: KeyboardEvent) {
    const angle =
      event.key === 'ArrowLeft' ? -0.15 : event.key === 'ArrowRight' ? 0.15 : 0;
    if (angle) {
      camera.position
        .sub(controls.target)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), angle)
        .add(controls.target);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.phi = THREE.MathUtils.clamp(
        spherical.phi + (event.key === 'ArrowUp' ? -0.1 : 0.1),
        0.1,
        Math.PI - 0.1,
      );
      camera.position
        .copy(controls.target)
        .add(offset.setFromSpherical(spherical));
    } else if (['+', '=', '-'].includes(event.key)) {
      const offset = camera.position.clone().sub(controls.target);
      offset.setLength(
        THREE.MathUtils.clamp(
          offset.length() * (event.key === '-' ? 1.1 : 0.9),
          controls.minDistance,
          controls.maxDistance,
        ),
      );
      camera.position.copy(controls.target).add(offset);
    } else return;
    event.preventDefault();
    controls.update();
    render();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    stopped = true;
    onError();
  }
  controls.addEventListener('change', render);
  renderer.domElement.addEventListener('keydown', keydown);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  const observer = new ResizeObserver(resize);
  observer.observe(element);
  reset();
  resize();
  return {
    nodes: kept,
    reset,
    dispose() {
      stopped = true;
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener('keydown', keydown);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      disposeObject(model);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSwitchAssembly } from './switch-model';

export function createSwitchScene(
  element: HTMLElement,
  id: string,
  onError: () => void,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'application');
  renderer.domElement.setAttribute(
    'aria-label',
    'Illustrative switch model. Arrow keys rotate; plus and minus zoom.',
  );
  renderer.domElement.style.touchAction = 'pan-y pinch-zoom';
  element.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  const model = createSwitchAssembly([new THREE.Vector3()], id);
  scene.add(model.group);
  const coil = Array.from({ length: 161 }, (_, index) => {
    const angle = (index / 160) * Math.PI * 12;
    return new THREE.Vector3(
      Math.cos(angle) * 0.095,
      0.19 + (index / 160) * 0.42,
      Math.sin(angle) * 0.095,
    );
  });
  const spring = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(coil),
      160,
      0.009,
      6,
      false,
    ),
    new THREE.MeshStandardMaterial({
      color: '#d5bd86',
      metalness: 0.7,
      roughness: 0.3,
    }),
  );
  spring.visible = false;
  scene.add(spring);
  scene.add(new THREE.HemisphereLight('#fff8eb', '#566b63', 3));
  const key = new THREE.DirectionalLight('#ffffff', 4);
  key.position.set(-3, 5, 4);
  const rim = new THREE.DirectionalLight('#cce1dd', 3);
  rim.position.set(3, 2, -3);
  scene.add(key, rim);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.minDistance = 1.6;
  controls.maxDistance = 7;
  let opened = false;
  let stopped = false;
  function render() {
    if (!stopped) renderer.render(scene, camera);
  }
  function reset() {
    controls.target.set(0, opened ? 0.8 : 0.25, 0);
    camera.position.set(
      opened ? 2 : 1.2,
      opened ? 2.4 : 1.25,
      opened ? 2.8 : 1.65,
    );
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
    reset,
    separate(value: boolean) {
      opened = value;
      model.separate(value);
      spring.visible = value;
      reset();
    },
    dispose() {
      stopped = true;
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener('keydown', keydown);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      model.dispose();
      spring.geometry.dispose();
      spring.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

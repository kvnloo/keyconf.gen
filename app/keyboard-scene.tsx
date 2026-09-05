'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type SceneOptions = {
  layout: string;
  caseColor: string;
  alpha: string;
  mod: string;
  accent: string;
  space: string;
  finish: string;
  exploded: boolean;
  view: string;
  profile: string;
};
export default function KeyboardScene({
  options,
  onPress,
  onRelease,
}: {
  options: SceneOptions;
  onPress: (code: string) => void;
  onRelease: (code: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef(options);
  state.current = options;
  const press = useRef(onPress);
  press.current = onPress;
  const release = useRef(onRelease);
  release.current = onRelease;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setError(
        '3D needs WebGL. Try a browser with hardware acceleration enabled.',
      );
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.tabIndex = 0;
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
    controls.enableDamping = true;
    controls.minDistance = 12;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.target.set(0, 0.4, 0);
    controls.enablePan = false;
    const light = new THREE.DirectionalLight('#fff5e4', 5);
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
    const fill = new THREE.DirectionalLight('#dbe7ff', 2);
    fill.position.set(8, 5, -5);
    scene.add(fill);
    scene.add(new THREE.AmbientLight('#ffffff', 0.5));
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.ShadowMaterial({ color: '#524c3c', opacity: 0.22 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.22;
    ground.receiveShadow = true;
    scene.add(ground);
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;
    const ctx = noiseCanvas.getContext('2d');
    if (ctx) {
      const data = ctx.createImageData(128, 128);
      for (let i = 0; i < data.data.length; i += 4) {
        const n = 150 + Math.random() * 80;
        data.data[i] = n;
        data.data[i + 1] = n;
        data.data[i + 2] = n;
        data.data[i + 3] = 255;
      }
      ctx.putImageData(data, 0, 0);
    }
    const noise = new THREE.CanvasTexture(noiseCanvas);
    noise.wrapS = noise.wrapT = THREE.RepeatWrapping;
    noise.repeat.set(10, 10);
    const keys = new Map<string, THREE.Object3D>();
    const down = new Set<string>();
    let model: THREE.Group | undefined;
    let stopped = false;
    setLoading(true);
    setError('');
    new GLTFLoader().load(
      new URL('models/keyboard-' + options.layout + '.glb', document.baseURI)
        .href,
      (gltf) => {
        if (stopped) {
          gltf.scene.traverse((o) => {
            if (o instanceof THREE.Mesh) o.geometry.dispose();
          });
          return;
        }
        model = gltf.scene;
        scene.add(model);
        model.traverse((o) => {
          if (o.name.startsWith('key_')) keys.set(o.name.slice(4), o);
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            for (const m of mats) {
              if (
                m instanceof THREE.MeshStandardMaterial &&
                !m.name.startsWith('legend')
              ) {
                m.bumpMap = noise;
                m.bumpScale = 0.003;
              }
            }
          }
        });
        setLoading(false);
      },
      undefined,
      () => {
        if (!stopped) {
          setLoading(false);
          setError('The keyboard model could not load. Reload to try again.');
        }
      },
    );
    const editable = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      !!t.closest('input,textarea,select,button,[contenteditable=true]');
    const keydown = (e: KeyboardEvent) => {
      if (editable(e.target) || e.metaKey || e.ctrlKey || e.altKey || e.repeat)
        return;
      if (keys.has(e.code)) {
        e.preventDefault();
        down.add(e.code);
        press.current(e.code);
      }
    };
    const demo = (e: Event) => {
      if (e instanceof CustomEvent && e.detail?.reset) {
        down.clear();
        return;
      }
      if (e instanceof CustomEvent && typeof e.detail?.code === 'string') {
        e.detail.down ? down.add(e.detail.code) : down.delete(e.detail.code);
      }
    };
    window.addEventListener('keyconf-demo', demo);
    const keyup = (e: KeyboardEvent) => {
      if (down.delete(e.code)) release.current(e.code);
    };
    const blur = () => down.clear();
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    window.addEventListener('blur', blur);
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let clicked = '';
    const start = (e: PointerEvent) => {
      renderer.domElement.focus();
      const r = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        (-(e.clientY - r.top) / r.height) * 2 + 1,
      );
      ray.setFromCamera(pointer, camera);
      let o: THREE.Object3D | undefined = ray.intersectObjects(
        scene.children,
        true,
      )[0]?.object;
      while (o && !o.name.startsWith('key_')) o = o.parent ?? undefined;
      if (o) {
        clicked = o.name.slice(4);
        down.add(clicked);
        press.current(clicked);
      }
    };
    const end = () => {
      if (clicked && down.delete(clicked)) release.current(clicked);
      clicked = '';
    };
    renderer.domElement.addEventListener('pointerdown', start);
    window.addEventListener('pointerup', end);
    const size = () => {
      const w = element.clientWidth,
        h = element.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(size);
    observer.observe(element);
    size();
    let lastView = 'perspective';
    let frame = 0;
    const render = () => {
      if (stopped) return;
      frame = requestAnimationFrame(render);
      const s = state.current;
      if (s.view !== lastView) {
        camera.position.copy(
          s.view === 'top'
            ? new THREE.Vector3(0, 25, 0.01)
            : s.view === 'front'
              ? new THREE.Vector3(0, 5, 25)
              : new THREE.Vector3(7, 15, 19),
        );
        lastView = s.view;
      }
      if (model)
        model.traverse((o) => {
          if (o.name.startsWith('key_')) {
            const target =
              0.43 +
              (s.exploded ? 2.6 : 0) -
              (down.has(o.name.slice(4)) ? 0.14 : 0);
            o.position.y = THREE.MathUtils.lerp(o.position.y, target, 0.23);
            o.scale.y = THREE.MathUtils.lerp(
              o.scale.y,
              s.profile === 'Tall sculpted'
                ? 1.5
                : s.profile === 'Low uniform'
                  ? 0.7
                  : 1,
              0.18,
            );
          }
          if (o.name === 'plate')
            o.position.y = THREE.MathUtils.lerp(
              o.position.y,
              s.exploded ? 1.4 : 0.39,
              0.12,
            );
          if (o.name === 'pcb')
            o.position.y = THREE.MathUtils.lerp(
              o.position.y,
              s.exploded ? 0.8 : 0.29,
              0.12,
            );
          if (o instanceof THREE.Mesh) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            for (const m of mats) {
              if (!(m instanceof THREE.MeshStandardMaterial)) continue;
              const name = m.name.split('.')[0];
              const color =
                name === 'case'
                  ? s.caseColor
                  : name === 'alpha'
                    ? s.alpha
                    : name === 'mod'
                      ? s.mod
                      : name === 'accent'
                        ? s.accent
                        : name === 'space'
                          ? s.space
                          : null;
              if (color) m.color.set(color);
              if (name === 'case') {
                m.metalness =
                  s.finish === 'Aluminum'
                    ? 0.8
                    : s.finish === 'Brass'
                      ? 0.95
                      : 0;
                m.roughness = s.finish === 'Polycarbonate' ? 0.2 : 0.33;
                m.transparent = s.finish === 'Polycarbonate';
                m.opacity = s.finish === 'Polycarbonate' ? 0.62 : 1;
                m.depthWrite = !m.transparent;
              }
            }
          }
        });
      controls.update();
      renderer.render(scene, camera);
    };
    render();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      window.removeEventListener('keyconf-demo', demo);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', blur);
      window.removeEventListener('pointerup', end);
      renderer.domElement.removeEventListener('pointerdown', start);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          for (const m of Array.isArray(o.material) ? o.material : [o.material])
            m.dispose();
        }
      });
      noise.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [options.layout]);
  return (
    <div
      className="scene-host"
      ref={host}
      role="img"
      aria-label="Interactive 3D keyboard. Drag to rotate, scroll to zoom, or type to press keys."
    >
      {loading && !error && (
        <div className="model-status">Preparing your keyboard…</div>
      )}
      {error && <div className="model-status">{error}</div>}
    </div>
  );
}

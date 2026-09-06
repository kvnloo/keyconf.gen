import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import layouts from '../assets/data/layouts.json';
import cues from '../assets/audio/cinematic-cues.json';

const clamp = (v) => Math.max(0, Math.min(1, v));
const ease = (v) => {
  const x = clamp(v);
  return x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2;
};
const mix = (a, b, v) => a + (b - a) * v;
const phase = (t, a, b) => ease((t - a) / (b - a));
const palettes = [
  {
    name: 'Forest Line',
    alpha: '#e7e1cd',
    mod: '#30473b',
    accent: '#688765',
    space: '#95aa86',
    case: '#c1bcb0',
  },
  {
    name: 'Blush',
    alpha: '#f1ded6',
    mod: '#bc8993',
    accent: '#be6e83',
    space: '#ce8096',
    case: '#d3bbb2',
  },
  {
    name: 'Midnight',
    alpha: '#22252a',
    mod: '#12181b',
    accent: '#8978b2',
    space: '#424054',
    case: '#383d40',
  },
];
const canvas = document.getElementById('cinematic-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: true,
});
renderer.setSize(1920, 1080, false);
renderer.setPixelRatio(1.5);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#111713');
scene.fog = new THREE.Fog('#111713', 45, 95);
const camera = new THREE.PerspectiveCamera(35, 1920 / 1080, 0.05, 150);
const pmrem = new THREE.PMREMGenerator(renderer);
const room = new RoomEnvironment();
scene.environment = pmrem.fromScene(room, 0.04).texture;
scene.environmentIntensity = 0.23;
room.dispose();
pmrem.dispose();
scene.add(new THREE.HemisphereLight('#e9ede6', '#273226', 0.2));

function light(position, color, intensity, size) {
  const l = new THREE.DirectionalLight(color, intensity);
  l.position.set(...position);
  l.castShadow = true;
  l.shadow.mapSize.set(size, size);
  Object.assign(l.shadow.camera, {
    left: -15,
    right: 15,
    top: 15,
    bottom: -15,
    near: 1,
    far: 55,
  });
  l.shadow.normalBias = 0.018;
  l.shadow.bias = -0.00005;
  l.shadow.radius = 3;
  scene.add(l);
  return l;
}
const keyLight = light([-8, 6, 7], '#fff0d5', 3.2, 4096);
const rim = new THREE.DirectionalLight('#d1dbc8', 2.0);
rim.position.set(4, 8, -7);
scene.add(rim);
const fill = new THREE.DirectionalLight('#d6e1ec', 0.18);
fill.position.set(9, 4, 8);
scene.add(fill);

function noiseTexture() {
  const size = 256,
    data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const v = 110 + Math.round(((Math.sin(i * 12.9898) * 43758.5453) % 1) * 28);
    data.set([v, v, v, 255], i * 4);
  }
  const t = new THREE.DataTexture(data, size, size);
  t.needsUpdate = true;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}
const grain = noiseTexture();
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({
    color: '#080c0a',
    roughness: 0.86,
    bumpMap: grain,
    bumpScale: 0.022,
  }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.235;
floor.receiveShadow = true;
scene.add(floor);
const board = new THREE.Group();
scene.add(board);
const keys = [],
  switches = [],
  caseMaterials = [];
const model = await new GLTFLoader().loadAsync('assets/models/keyboard-60.glb');
await document.fonts.load('290px KeyconfFilmSans');
board.add(model.scene);
const steel = new THREE.MeshStandardMaterial({
  color: '#a6a699',
  metalness: 0.88,
  roughness: 0.29,
});
const stemMat = new THREE.MeshStandardMaterial({
  color: '#2c3431',
  metalness: 0.05,
  roughness: 0.34,
});
const housingMat = new THREE.MeshPhysicalMaterial({
  color: '#67716a',
  roughness: 0.22,
  metalness: 0.08,
  transparent: true,
  opacity: 0.88,
});

function keyGeometry(width) {
  const vertices = [],
    indices = [];
  const rings = [
    [width - 0.09, 0.91, 0.065, 0],
    [width - 0.09, 0.91, 0.065, 0.045],
    [width - 0.19, 0.78, 0.073, 0.37],
    [width - 0.22, 0.75, 0.083, 0.405],
    [width - 0.27, 0.7, 0.085, 0.421],
    [width - 0.33, 0.64, 0.078, 0.416],
    [width - 0.46, 0.45, 0.065, 0.385],
    [width - 0.54, 0.2, 0.035, 0.372],
  ];
  for (const [w, d, r, h] of rings) {
    for (let c = 0; c < 4; c++)
      for (let i = 0; i < 9; i++) {
        const a = (c * Math.PI) / 2 + ((i / 8) * Math.PI) / 2;
        const cx = (c === 0 || c === 3 ? 1 : -1) * (w / 2 - r);
        const cz = (c < 2 ? 1 : -1) * (d / 2 - r);
        vertices.push(cx + r * Math.cos(a), h, cz + r * Math.sin(a));
      }
  }
  const n = 36;
  for (let j = 0; j < rings.length - 1; j++)
    for (let k = 0; k < n; k++) {
      const a = j * n + k,
        b = j * n + ((k + 1) % n),
        c = (j + 1) * n + k,
        d = (j + 1) * n + ((k + 1) % n);
      indices.push(a, c, b, b, c, d);
    }
  const center = vertices.length / 3;
  vertices.push(0, 0.372, 0);
  for (let k = 0; k < n; k++)
    indices.push(
      (rings.length - 1) * n + k,
      center,
      (rings.length - 1) * n + ((k + 1) % n),
    );
  const uv = [];
  for (let i = 0; i < vertices.length; i += 3)
    uv.push(vertices[i] / width + 0.5, vertices[i + 2] / 0.91 + 0.5);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
function legend(label, color) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = (label.length > 2 ? '170' : '290') + 'px KeyconfFilmSans';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 512, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(0.68, 0.34),
    new THREE.MeshStandardMaterial({
      map: t,
      transparent: true,
      roughness: 0.64,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    }),
  );
  m.rotation.x = -Math.PI / 2;
  m.position.set(0, 0.375, 0.015);
  return m;
}
model.scene.traverse((o) => {
  if (!o.isMesh) return;
  o.castShadow = true;
  o.receiveShadow = true;
  if (o.material.name === 'case') {
    o.material = new THREE.MeshStandardMaterial({
      color: palettes[0].case,
      metalness: 0.83,
      roughness: 0.32,
      bumpMap: grain,
      bumpScale: 0.003,
    });
    caseMaterials.push(o.material);
  }
  if (o.name.startsWith('cap') || o.name.startsWith('legend'))
    o.visible = false;
});
for (const data of layouts['60']) {
  const group =
    data.code === 'Space'
      ? 'space'
      : ['Escape', 'Enter'].includes(data.code)
        ? 'accent'
        : data.label.length === 1
          ? 'alpha'
          : 'mod';
  const parent = model.scene.getObjectByName('key_' + data.code);
  const mat = new THREE.MeshPhysicalMaterial({
    color: palettes[0][group],
    roughness: 0.43,
    bumpMap: grain,
    bumpScale: 0.006,
    clearcoat: 0.12,
    clearcoatRoughness: 0.4,
  });
  const cap = new THREE.Mesh(keyGeometry(data.width), mat);
  cap.castShadow = true;
  cap.receiveShadow = true;
  parent.add(cap);
  const ink = legend(data.label, '#ffffff');
  parent.add(ink);
  keys.push({ parent, mat, ink, group, data, base: parent.position.y });
  const sw = new THREE.Group();
  sw.position.set(data.x, 0.28, -data.y);
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(0.64, 0.22, 0.64, 2, 0.035),
    housingMat,
  );
  body.castShadow = true;
  sw.add(body);
  const top = new THREE.Mesh(
    new RoundedBoxGeometry(0.51, 0.17, 0.51, 2, 0.02),
    stemMat,
  );
  top.position.y = 0.14;
  sw.add(top);
  for (const dim of [
    [0.3, 0.15, 0.1],
    [0.1, 0.15, 0.3],
  ]) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(...dim), stemMat);
    s.position.y = 0.29;
    sw.add(s);
  }
  board.add(sw);
  switches.push(sw);
}
const oldPlate = model.scene.getObjectByName('plate');
oldPlate.visible = false;
const shape = new THREE.Shape();
shape.moveTo(-7.45, -2.44);
shape.lineTo(7.45, -2.44);
shape.lineTo(7.45, 2.44);
shape.lineTo(-7.45, 2.44);
shape.closePath();
for (const data of layouts['60']) {
  const h = new THREE.Path();
  const x = data.x,
    y = data.y,
    r = 0.35;
  h.moveTo(x - r, y - r);
  h.lineTo(x - r, y + r);
  h.lineTo(x + r, y + r);
  h.lineTo(x + r, y - r);
  h.closePath();
  shape.holes.push(h);
}
const plate = new THREE.Mesh(
  new THREE.ExtrudeGeometry(shape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelSize: 0.014,
    bevelThickness: 0.008,
    bevelSegments: 2,
    steps: 1,
  }),
  steel,
);
plate.rotation.x = -Math.PI / 2;
plate.position.y = 0.38;
plate.castShadow = true;
plate.receiveShadow = true;
board.add(plate);
const pcb = model.scene.getObjectByName('pcb');
pcb.material = new THREE.MeshStandardMaterial({
  color: '#153c2c',
  roughness: 0.49,
  metalness: 0.1,
});
const traceMat = new THREE.MeshStandardMaterial({
  color: '#a28a50',
  metalness: 0.6,
  roughness: 0.4,
});
for (const data of layouts['60']) {
  const trace = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.003, 0.025),
    traceMat,
  );
  trace.position.set(data.x, 0.337, -data.y);
  pcb.attach(trace);
}
const colorsA = new THREE.Color(),
  colorsB = new THREE.Color();
const target = new THREE.Vector3();
class FixedSSAO extends SSAOPass {
  _generateSampleKernel(count) {
    for (let i = 0; i < count; i++) {
      const a = i * 2.399963229728653,
        z = (i + 0.5) / count,
        r = Math.sqrt(1 - z * z);
      this.kernel.push(
        new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, z).multiplyScalar(
          0.1 + 0.9 * (i / count) ** 2,
        ),
      );
    }
  }
  _generateRandomKernelRotations() {
    const data = Float32Array.from({ length: 16 }, (_, i) =>
      Math.sin(i * 2.399963229728653),
    );
    this.noiseTexture = new THREE.DataTexture(
      data,
      4,
      4,
      THREE.RedFormat,
      THREE.FloatType,
    );
    this.noiseTexture.wrapS = this.noiseTexture.wrapT = THREE.RepeatWrapping;
    this.noiseTexture.needsUpdate = true;
  }
}
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const ao = new FixedSSAO(scene, camera, 2880, 1620, 16);
ao.kernelRadius = 0.42;
ao.minDistance = 0.00007;
ao.maxDistance = 0.006;
composer.addPass(ao);
const dof = new BokehPass(scene, camera, {
  focus: 6,
  aperture: 0.0018,
  maxblur: 0.008,
});
composer.addPass(dof);
composer.addPass(new OutputPass());
const path = [
  { t: 0, p: [-4.7, 2.5, 4.9], look: [-2.8, 0.77, 0.15] },
  { t: 2.4, p: [-1.5, 2.6, 5.0], look: [-1, 0.72, 0.1] },
  { t: 5.3, p: [9.5, 12.5, 18.5], look: [-1.9, 0.5, 0] },
  { t: 6, p: [9.5, 12.5, 18.5], look: [-1.9, 0.5, 0] },
  { t: 10, p: [-3.5, 14.5, 19.5], look: [0, 0.7, 0] },
  { t: 14.5, p: [10, 10.5, 18.5], look: [-0.7, 2.3, 0] },
  { t: 16, p: [9, 13.5, 22], look: [-6, 0.9, 0] },
  { t: 19, p: [9, 13.5, 22], look: [-6, 0.9, 0] },
  { t: 19.01, p: [-3, 2.5, 5.4], look: [-1.4, 0.7, 0.2] },
  { t: 22.5, p: [0.2, 2.8, 5.4], look: [1.2, 0.7, 0.1] },
  { t: 23, p: [8, 17, 22], look: [0, 4.4, 0] },
  { t: 27, p: [8, 17, 22], look: [0, 4.4, 0] },
  { t: 28.2, p: [-6, 14, 20], look: [-2, 0.5, 0] },
  { t: 31, p: [8, 12, 18], look: [-2.8, 0.5, 0] },
  { t: 36, p: [8, 12, 18], look: [-2.8, 0.5, 0] },
];
const keyCues = [...cues.intro, ...cues.audition, ...cues.typing];
function sampleCamera(t) {
  let b = path.findIndex((s) => s.t > t);
  if (b < 0) b = path.length - 1;
  if (b === 0) b = 1;
  const a = path[b - 1],
    z = path[b];
  let u = (t - a.t) / (z.t - a.t);
  u = a.t === 0 || a.t === 19.01 ? clamp(u) : ease(u);
  camera.position.set(...a.p.map((v, i) => mix(v, z.p[i], u)));
  target.set(...a.look.map((v, i) => mix(v, z.look[i], u)));
  camera.lookAt(target);
}
function renderAt(t) {
  sampleCamera(t);
  const exploded = phase(t, 10.2, 12.9) * (1 - phase(t, 14.6, 15.85));
  let a = 0,
    b = 0,
    start = 0,
    end = 1;
  if (t >= 6.1 && t < 7.6) {
    a = 0;
    b = 1;
    start = 6.1;
    end = 7.4;
  }
  if (t >= 7.6 && t < 9) {
    a = 1;
    b = 2;
    start = 7.6;
    end = 8.9;
  }
  if (t >= 9 && t < 10.4) {
    a = 2;
    b = 0;
    start = 9;
    end = 10.3;
  }
  if (t >= 27 && t < 28.2) {
    a = 0;
    b = 1;
    start = 27;
    end = 28;
  }
  if (t >= 28.2 && t < 29.4) {
    a = 1;
    b = 2;
    start = 28.2;
    end = 29.2;
  }
  if (t >= 29.4 && t < 30.7) {
    a = 2;
    b = 0;
    start = 29.4;
    end = 30.6;
  }
  for (const k of keys) {
    const progress = clamp(
      (t - start - (k.data.x + 7.5) * 0.036) / (end - start - 0.54),
    );
    k.mat.color
      .copy(colorsA.set(palettes[a][k.group]))
      .lerp(colorsB.set(palettes[b][k.group]), ease(progress));
    const c = k.mat.color;
    k.ink.material.color.set(
      0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b > 0.25 ? '#273127' : '#edf0e3',
    );
    const depression = keyCues
      .filter((e) => e.code === k.data.code)
      .reduce(
        (n, e) =>
          n +
          0.14 * Math.max(0, 1 - Math.abs((t - e.t) / (t < e.t ? 0.06 : 0.12))),
        0,
      );
    k.parent.position.y = k.base + exploded * 4.5 - depression;
  }
  for (const m of caseMaterials)
    m.color
      .copy(colorsA.set(palettes[a].case))
      .lerp(colorsB.set(palettes[b].case), phase(t, start, end));
  for (const sw of switches) sw.position.y = 0.28 + exploded * 2.8;
  plate.position.y = 0.38 + exploded * 1.45;
  pcb.position.y = 0.29 + exploded * 0.64;
  board.rotation.y = -0.08;
  keyLight.intensity = 3.2;
  dof.uniforms.focus.value = camera.position.distanceTo(target);
  const macro = Math.max(
    1 - phase(t, 2.4, 3),
    phase(t, 19, 19.05) * (1 - phase(t, 22.5, 23)),
  );
  dof.enabled = macro > 0.001;
  dof.uniforms.aperture.value = mix(0.00007, 0.0018, macro);
  composer.render(0);
  renderer.getContext().finish();
  window.__keyconfPose = {
    time: t,
    camera: camera.position.toArray(),
    exploded,
  };
}
window.__keyconfRenderAt = renderAt;
window.__keyconfReady = true;
renderAt(window.__hfThreeTime || 0);
window.__keyconfBooted();

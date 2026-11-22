import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import {
  ROOM_LIGHT,
  brightnessGain,
  type LightingState,
  type RoomLight,
} from './studio-lighting';
import {
  forestLayerCanvas,
  plasterCanvas,
  seeded,
  skyCanvas,
  walnutCanvas,
  wallpaperCanvas,
  type Wallpaper,
} from './room-textures';

/**
 * A front-facing studio room built around the keyboard, which stays at the
 * origin. Scene units follow the keyboard model: one unit is one 19.05 mm key
 * pitch, so the desk top sits at y = -0.22, the floor 74 cm below it and the
 * back wall 33 cm behind the monitor.
 */
export const ROOM = {
  deskTop: -0.22,
  floor: -39,
  ceiling: 96,
  backWall: -17.5,
  /** Window opening in the back wall, left of the monitor. */
  window: { x0: -62, x1: -16, y0: 2.2, y1: 40, mullion: -39 },
  /** The lowered blind covers the opening from here to the top. */
  blindBottom: 23,
  slatSpacing: 1.3,
  slatDepth: 1.1,
  desk: { x0: -30, x1: 50, z0: -17.2, z1: 12 },
} as const;

/** The sun's travel direction for a preset (pointing from the sun into the room). */
export function sunTravel(
  light: Pick<RoomLight, 'sunElevation' | 'sunAzimuth'>,
) {
  const elevation = THREE.MathUtils.degToRad(light.sunElevation);
  const heading = THREE.MathUtils.degToRad(66 + light.sunAzimuth * 0.3);
  return new THREE.Vector3(
    Math.cos(elevation) * Math.sin(heading),
    -Math.sin(elevation),
    Math.cos(elevation) * Math.cos(heading),
  ).normalize();
}

/** Fraction of the blind's pitch that lets light through at a slat tilt. */
export function blindOpening(tilt: number, elevationDegrees: number) {
  const blocked =
    (ROOM.slatDepth *
      Math.abs(Math.sin(tilt + THREE.MathUtils.degToRad(elevationDegrees))) +
      0.08) /
    ROOM.slatSpacing;
  return THREE.MathUtils.clamp(1 - blocked, 0.08, 0.92);
}

type Mixed = {
  [K in keyof RoomLight]: RoomLight[K] extends string ? THREE.Color : number;
};
const colorKeys = [
  'sunColor',
  'skyColor',
  'groundColor',
  'outside',
  'shaftColor',
  'wall',
] as const;
const numberKeys = [
  'sunElevation',
  'sunAzimuth',
  'sunIntensity',
  'skyIntensity',
  'environment',
  'exposure',
  'lampIntensity',
  'screenGain',
  'outsideGain',
  'shaftDensity',
  'blindTilt',
  'rain',
  'keyFill',
] as const;

function mixedFrom(light: RoomLight) {
  const result = {} as Record<string, THREE.Color | number>;
  for (const key of colorKeys) result[key] = new THREE.Color(light[key]);
  for (const key of numberKeys) result[key] = light[key];
  return result as unknown as Omit<Mixed, 'screen'>;
}

export function createDeskScene(
  invalidate: () => void,
  { software = false }: { software?: boolean } = {},
) {
  const group = new THREE.Group();
  group.name = 'desk-environment';
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const foliage: THREE.Group[] = [];
  const flutter: Array<{ mesh: THREE.InstancedMesh; poses: THREE.Object3D[] }> =
    [];
  let disposed = false;
  function material(color: string, roughness = 0.7, metalness = 0) {
    const result = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
    materials.add(result);
    return result;
  }
  function mesh(
    geometry: THREE.BufferGeometry,
    surface: THREE.Material,
    parent: THREE.Object3D,
    x = 0,
    y = 0,
    z = 0,
  ) {
    geometries.add(geometry);
    const item = new THREE.Mesh(geometry, surface);
    item.position.set(x, y, z);
    item.castShadow = item.receiveShadow = true;
    parent.add(item);
    return item;
  }
  function canvasTexture(source: HTMLCanvasElement, srgb = true) {
    const texture = new THREE.CanvasTexture(source);
    if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = software ? 1 : 8;
    textures.add(texture);
    return texture;
  }
  const random = seeded(2211);

  // ---------------------------------------------------------------- shell
  const plasterMap = canvasTexture(plasterCanvas(), false);
  plasterMap.wrapS = plasterMap.wrapT = THREE.RepeatWrapping;
  plasterMap.repeat.set(5, 3);
  const plaster = new THREE.MeshStandardMaterial({
    color: ROOM_LIGHT.afternoon.wall,
    roughness: 0.94,
    roughnessMap: plasterMap,
    bumpMap: plasterMap,
    bumpScale: 0.6,
  });
  materials.add(plaster);
  const { x0, x1, y0, y1 } = ROOM.window;
  const wallDepth = 6;
  const wallZ = ROOM.backWall - wallDepth / 2;
  const span = { left: -170, right: 170 };
  // The back wall is four boxes around the window opening, so the opening has
  // real reveals that cast the sun's edges.
  mesh(
    new THREE.BoxGeometry(x0 - span.left, ROOM.ceiling - ROOM.floor, wallDepth),
    plaster,
    group,
    (span.left + x0) / 2,
    (ROOM.ceiling + ROOM.floor) / 2,
    wallZ,
  );
  mesh(
    new THREE.BoxGeometry(
      span.right - x1,
      ROOM.ceiling - ROOM.floor,
      wallDepth,
    ),
    plaster,
    group,
    (span.right + x1) / 2,
    (ROOM.ceiling + ROOM.floor) / 2,
    wallZ,
  );
  mesh(
    new THREE.BoxGeometry(x1 - x0, ROOM.ceiling - y1, wallDepth),
    plaster,
    group,
    (x0 + x1) / 2,
    (ROOM.ceiling + y1) / 2,
    wallZ,
  );
  mesh(
    new THREE.BoxGeometry(x1 - x0, y0 - ROOM.floor, wallDepth),
    plaster,
    group,
    (x0 + x1) / 2,
    (y0 + ROOM.floor) / 2,
    wallZ,
  );
  // Ceiling and floor close the box so sunlight only enters through the glass.
  mesh(
    new THREE.BoxGeometry(span.right - span.left, 2, 200),
    material('#2a3431', 0.95),
    group,
    0,
    ROOM.ceiling + 1,
    ROOM.backWall + 99,
  );
  const floorWood = material('#2b1e16', 0.78);
  mesh(
    new THREE.BoxGeometry(span.right - span.left, 1, 200),
    floorWood,
    group,
    0,
    ROOM.floor - 0.5,
    ROOM.backWall + 99,
  );
  // Skirting board.
  mesh(
    new THREE.BoxGeometry(span.right - span.left, 4, 0.6),
    material('#1f2a27', 0.8),
    group,
    0,
    ROOM.floor + 2,
    ROOM.backWall + 0.3,
  );

  // --------------------------------------------------------------- window
  const frame = material('#171a19', 0.55, 0.2);
  const windowGroup = new THREE.Group();
  windowGroup.name = 'studio-window';
  group.add(windowGroup);
  const frameDepth = 1.4,
    glassZ = ROOM.backWall - 3.2;
  for (const x of [x0 + 0.6, ROOM.window.mullion, x1 - 0.6])
    mesh(
      new THREE.BoxGeometry(
        x === ROOM.window.mullion ? 1 : 1.2,
        y1 - y0,
        frameDepth,
      ),
      frame,
      windowGroup,
      x,
      (y0 + y1) / 2,
      glassZ,
    );
  for (const y of [y0 + 0.6, y1 - 0.6])
    mesh(
      new THREE.BoxGeometry(x1 - x0, 1.2, frameDepth),
      frame,
      windowGroup,
      (x0 + x1) / 2,
      y,
      glassZ,
    );
  // Sill: a deep ledge inside the room, at desk height.
  const sillWood = material('#2a2421', 0.62);
  mesh(
    new THREE.BoxGeometry(x1 - x0 + 3, 1, wallDepth + 2.5),
    sillWood,
    windowGroup,
    (x0 + x1) / 2,
    y0 - 0.5,
    ROOM.backWall - wallDepth / 2 + 1.25,
  );
  // Rain-capable glass pane.
  const glassUniforms = {
    time: { value: 0 },
    rain: { value: 0 },
    tint: { value: new THREE.Color('#cfe0da') },
    flash: { value: 0 },
  };
  const glassMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: glassUniforms,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float time, rain, flash; uniform vec3 tint;
      float hash(float n){ return fract(sin(n)*43758.5453); }
      void main(){
        vec2 uv = vUv*vec2(46.0, 58.0);
        float streaks = 0.0;
        for (int layer = 0; layer < 2; layer++) {
          float scale = layer == 0 ? 1.0 : 1.9;
          vec2 p = uv*scale;
          float column = floor(p.x);
          float speed = 2.0 + hash(column*3.1 + float(layer))*4.0;
          float y = fract(p.y*0.08 + time*speed*0.12 + hash(column));
          float x = abs(fract(p.x) - 0.5);
          float drop = (1.0 - smoothstep(0.02, 0.16, x)) * smoothstep(0.0, 0.08, y) * (1.0 - smoothstep(0.08, 0.4, y));
          streaks += drop * step(0.55, hash(column*7.7 + float(layer)*13.0));
        }
        float beads = step(0.985, hash(floor(uv.x*3.0)*91.0 + floor(uv.y*3.0)*17.0)) * 0.6;
        float wet = clamp(streaks + beads, 0.0, 1.0) * rain;
        vec3 color = mix(tint * 0.3, vec3(0.62, 0.7, 0.74), wet) + flash * 0.6;
        gl_FragColor = vec4(color, 0.04 + wet * 0.26 + rain * 0.2 + flash * 0.3);
        #include <colorspace_fragment>
      }`,
  });
  materials.add(glassMaterial);
  const pane = mesh(
    new THREE.PlaneGeometry(x1 - x0, y1 - y0),
    glassMaterial,
    windowGroup,
    (x0 + x1) / 2,
    (y0 + y1) / 2,
    glassZ - 0.2,
  );
  pane.name = 'window-glass';
  pane.castShadow = pane.receiveShadow = false;

  // Forest beyond the window: three painted layers at increasing depth so the
  // view shifts as the camera moves, plus a soft sky.
  const outsideMaterials: THREE.MeshBasicMaterial[] = [];
  const skyMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture(skyCanvas()),
    fog: false,
  });
  materials.add(skyMaterial);
  outsideMaterials.push(skyMaterial);
  const outside = new THREE.Group();
  outside.name = 'forest-backdrop';
  group.add(outside);
  const sky = mesh(
    new THREE.PlaneGeometry(700, 420),
    skyMaterial,
    outside,
    -120,
    60,
    -240,
  );
  sky.castShadow = sky.receiveShadow = false;
  [
    { z: -200, w: 620, h: 300, y: 10 },
    { z: -120, w: 380, h: 190, y: 2 },
    { z: -55, w: 210, h: 110, y: 8 },
  ].forEach((spec, layer) => {
    const surface = new THREE.MeshBasicMaterial({
      map: canvasTexture(forestLayerCanvas(layer)),
      transparent: true,
      alphaTest: 0.02,
      fog: false,
    });
    materials.add(surface);
    outsideMaterials.push(surface);
    const plane = mesh(
      new THREE.PlaneGeometry(spec.w, spec.h),
      surface,
      outside,
      -60 - layer * 10,
      spec.y + spec.h / 2 - 40,
      spec.z,
    );
    plane.castShadow = plane.receiveShadow = false;
  });

  // Blinds: instanced slats lowered over the top third of the window.
  const slatCount = Math.floor((y1 - ROOM.blindBottom) / ROOM.slatSpacing);
  const slatGeometry = new THREE.BoxGeometry(
    x1 - x0 - 1.2,
    0.08,
    ROOM.slatDepth,
  );
  geometries.add(slatGeometry);
  const slatMaterial = material('#cbbfa9', 0.7);
  const slats = new THREE.InstancedMesh(slatGeometry, slatMaterial, slatCount);
  slats.name = 'blind-slats';
  slats.castShadow = slats.receiveShadow = true;
  windowGroup.add(slats);
  const slatPose = new THREE.Object3D();
  function placeSlats(tilt: number) {
    for (let i = 0; i < slatCount; i++) {
      slatPose.position.set(
        (x0 + x1) / 2,
        y1 - 1 - i * ROOM.slatSpacing,
        ROOM.backWall - 1.2,
      );
      slatPose.rotation.set(tilt, 0, 0);
      slatPose.updateMatrix();
      slats.setMatrixAt(i, slatPose.matrix);
    }
    slats.instanceMatrix.needsUpdate = true;
  }
  placeSlats(ROOM_LIGHT.afternoon.blindTilt);
  mesh(
    new THREE.BoxGeometry(x1 - x0 - 0.6, 0.5, 1.5),
    material('#b9ad97', 0.6),
    windowGroup,
    (x0 + x1) / 2,
    ROOM.blindBottom - 0.4,
    ROOM.backWall - 1.2,
  );
  for (const x of [x0 + 9, x1 - 9]) {
    const cord = mesh(
      new THREE.CylinderGeometry(0.05, 0.05, y1 - ROOM.blindBottom, 5),
      material('#e0d8c8', 0.8),
      windowGroup,
      x,
      (y1 + ROOM.blindBottom) / 2,
      ROOM.backWall - 0.55,
    );
    cord.castShadow = false;
  }

  // ----------------------------------------------------------------- desk
  const walnutTexture = canvasTexture(walnutCanvas());
  walnutTexture.wrapS = walnutTexture.wrapT = THREE.RepeatWrapping;
  const walnut = new THREE.MeshStandardMaterial({
    map: walnutTexture,
    roughness: 0.46,
    bumpMap: walnutTexture,
    bumpScale: 0.05,
  });
  materials.add(walnut);
  const desk = ROOM.desk;
  const deskWidth = desk.x1 - desk.x0,
    deskDepth = desk.z1 - desk.z0;
  const top = mesh(
    new RoundedBoxGeometry(deskWidth, 1.9, deskDepth, 3, 0.45),
    walnut,
    group,
    (desk.x0 + desk.x1) / 2,
    ROOM.deskTop - 0.95,
    (desk.z0 + desk.z1) / 2,
  );
  top.name = 'walnut-desk';
  const apron = material('#5c2f1b', 0.55);
  // Drawer bank under the right of the desk and a slim apron drawer.
  const drawers = new THREE.Group();
  drawers.name = 'desk-drawers';
  group.add(drawers);
  mesh(
    new THREE.BoxGeometry(deskWidth - 2, 4.2, 1),
    apron,
    drawers,
    (desk.x0 + desk.x1) / 2,
    ROOM.deskTop - 4,
    desk.z1 - 1.6,
  );
  const brassPull = material('#b59a62', 0.35, 0.8);
  for (const x of [-12, 14, 34]) {
    mesh(
      new RoundedBoxGeometry(17, 3.4, 0.5, 2, 0.15),
      walnut,
      drawers,
      x,
      ROOM.deskTop - 4,
      desk.z1 - 1,
    );
    mesh(
      new RoundedBoxGeometry(3.2, 0.35, 0.5, 2, 0.15),
      brassPull,
      drawers,
      x,
      ROOM.deskTop - 4,
      desk.z1 - 0.6,
    );
  }
  for (const x of [desk.x0 + 2, desk.x1 - 2])
    for (const z of [desk.z0 + 2, desk.z1 - 2.5])
      mesh(
        new THREE.BoxGeometry(2.2, -ROOM.floor + ROOM.deskTop - 2, 2.2),
        apron,
        group,
        x,
        (ROOM.floor + ROOM.deskTop - 2) / 2,
        z,
      );

  // ---------------------------------------------------------------- chair
  const chair = new THREE.Group();
  chair.name = 'office-chair';
  chair.position.set(-21, 2.5, 17.5);
  chair.rotation.y = 0.18;
  group.add(chair);
  const mesh_ = material('#1b2022', 0.62);
  const steelDark = material('#2a2d2f', 0.3, 0.85);
  const back = mesh(
    new RoundedBoxGeometry(15, 12, 1.1, 5, 0.55),
    mesh_,
    chair,
    0,
    -3.5,
    0,
  );
  back.rotation.x = -0.12;
  // A thin frame around the mesh back catches the window light.
  const rim = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-7.6, -9.5, 0.2),
      new THREE.Vector3(-7.8, 1.6, -0.9),
      new THREE.Vector3(0, 2.9, -1.1),
      new THREE.Vector3(7.8, 1.6, -0.9),
      new THREE.Vector3(7.6, -9.5, 0.2),
    ],
    false,
  );
  mesh(new THREE.TubeGeometry(rim, 40, 0.32, 8, false), steelDark, chair);
  mesh(new RoundedBoxGeometry(18, 1.6, 17, 3, 0.6), mesh_, chair, 0, -16, -8);
  for (const side of [-1, 1]) {
    const arm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 9.2, -16, -14),
      new THREE.Vector3(side * 9.6, -9, -9),
      new THREE.Vector3(side * 9.4, -8.5, -2),
      new THREE.Vector3(side * 8.8, -12, 0.6),
      new THREE.Vector3(side * 8.6, 2, 0.6),
    ]);
    mesh(new THREE.TubeGeometry(arm, 32, 0.32, 8, false), steelDark, chair);
  }
  mesh(
    new THREE.CylinderGeometry(0.9, 0.9, 14, 12),
    steelDark,
    chair,
    0,
    -24,
    -8,
  );

  // -------------------------------------------------------------- monitor
  // Keep the screen plane and group placement the typing test projects onto.
  const monitor = new THREE.Group();
  monitor.name = 'studio-display';
  monitor.position.set(0, -0.2, -10.5);
  group.add(monitor);
  const aluminium = material('#b4b7ba', 0.3, 0.9);
  mesh(
    new RoundedBoxGeometry(8, 0.28, 5.4, 3, 0.12),
    aluminium,
    monitor,
    0,
    0.16,
    0.4,
  );
  const neck = mesh(
    new RoundedBoxGeometry(2.6, 8.6, 0.3, 2, 0.1),
    aluminium,
    monitor,
    0,
    4.3,
    -1.3,
  );
  neck.rotation.x = -0.2;
  mesh(
    new RoundedBoxGeometry(20.3, 12, 0.5, 4, 0.22),
    aluminium,
    monitor,
    0,
    9,
    -0.05,
  );
  mesh(
    new RoundedBoxGeometry(19.82, 11.52, 0.06, 2, 0.02),
    material('#050606', 0.25),
    monitor,
    0,
    9,
    0.24,
  );
  const wallpapers = new Map<Wallpaper, THREE.CanvasTexture>();
  function wallpaper(kind: Wallpaper) {
    let texture = wallpapers.get(kind);
    if (!texture) {
      texture = canvasTexture(wallpaperCanvas(kind));
      wallpapers.set(kind, texture);
    }
    return texture;
  }
  const screenUniforms = {
    mapA: { value: wallpaper('day') },
    mapB: { value: wallpaper('day') },
    mixT: { value: 0 },
    gain: { value: 1 },
  };
  const screenMaterial = new THREE.ShaderMaterial({
    uniforms: screenUniforms,
    toneMapped: false,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform sampler2D mapA, mapB; uniform float mixT, gain;
      void main(){
        vec3 color = mix(texture2D(mapA, vUv).rgb, texture2D(mapB, vUv).rgb, mixT) * gain;
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  materials.add(screenMaterial);
  const screen = mesh(
    new THREE.PlaneGeometry(19.12, 10.82),
    screenMaterial,
    monitor,
    0,
    9,
    0.322,
  );
  screen.name = 'monitor-screen';
  screen.castShadow = screen.receiveShadow = false;
  // Screen spill onto the desk and wall.
  const screenLight = new THREE.PointLight('#cfdcf0', 0, 40, 2);
  screenLight.position.set(0, 7, 5);
  monitor.add(screenLight);

  // -------------------------------------------------------- desk objects
  const leafGeometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];
  const leafUvs: number[] = [];
  for (let row = 0; row <= 18; row++) {
    const t = row / 18,
      width = Math.sin(Math.PI * t) * 0.34;
    for (let col = 0; col < 5; col++) {
      const side = (col - 2) / 2;
      leafUvs.push(col / 4, t);
      positions.push(
        side * width,
        t,
        Math.sin(t * Math.PI) * 0.16 + Math.abs(side) * 0.09,
      );
    }
  }
  for (let row = 0; row < 18; row++)
    for (let col = 0; col < 4; col++) {
      const a = row * 5 + col;
      indices.push(a, a + 5, a + 1, a + 1, a + 5, a + 6);
    }
  leafGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  );
  leafGeometry.setIndex(indices);
  leafGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(leafUvs, 2));
  leafGeometry.computeVertexNormals();
  geometries.add(leafGeometry);
  const leaves = material('#ffffff', 0.78);
  const leafCanvas = document.createElement('canvas');
  leafCanvas.width = 128;
  leafCanvas.height = 256;
  const leafInk = leafCanvas.getContext('2d');
  if (leafInk) {
    const gradient = leafInk.createLinearGradient(0, 0, 128, 0);
    gradient.addColorStop(0, '#a2ad88');
    gradient.addColorStop(0.5, '#e7e9c9');
    gradient.addColorStop(1, '#acb992');
    leafInk.fillStyle = gradient;
    leafInk.fillRect(0, 0, 128, 256);
    leafInk.strokeStyle = '#ecedc569';
    leafInk.lineWidth = 1;
    leafInk.beginPath();
    leafInk.moveTo(64, 0);
    leafInk.lineTo(64, 256);
    for (let y = 16; y < 240; y += 20) {
      for (const side of [-1, 1]) {
        leafInk.moveTo(64, y);
        leafInk.quadraticCurveTo(
          64 + side * 18,
          y - 10,
          64 + side * 58,
          y - 22,
        );
      }
    }
    leafInk.stroke();
    const texture = canvasTexture(leafCanvas);
    leaves.map = texture;
    leaves.bumpMap = texture;
    leaves.bumpScale = 0.014;
  }
  leaves.side = THREE.DoubleSide;
  const stem = material('#516444', 0.8),
    soil = material('#292a1f', 1);
  function plant(
    x: number,
    z: number,
    scale: number,
    base: number,
    pot = '#9d9680',
  ) {
    const plant = new THREE.Group();
    plant.position.set(x, base, z);
    plant.scale.setScalar(scale);
    group.add(plant);
    const ceramic = material(pot, 0.9);
    const profile = [
      new THREE.Vector2(0.8, 0),
      new THREE.Vector2(0.94, 0.08),
      new THREE.Vector2(1.12, 1.65),
      new THREE.Vector2(1.1, 1.73),
      new THREE.Vector2(1.02, 1.73),
      new THREE.Vector2(0.9, 0.16),
    ];
    mesh(new THREE.LatheGeometry(profile, 40), ceramic, plant);
    const top = mesh(
      new THREE.CircleGeometry(1.04, 32),
      soil,
      plant,
      0,
      1.6,
      0,
    );
    top.rotation.x = -Math.PI / 2;
    const instanced = new THREE.InstancedMesh(leafGeometry, leaves, 22);
    instanced.castShadow = instanced.receiveShadow = true;
    const crown = new THREE.Group();
    plant.add(crown);
    crown.add(instanced);
    foliage.push(crown);
    const poses: THREE.Object3D[] = [];
    const transform = new THREE.Object3D();
    for (let i = 0; i < 22; i++) {
      const angle = i * 2.39996,
        radius = 0.6 + (i % 4) * 0.25,
        height = 2.2 + (i % 7) * 0.42;
      const start = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      );
      const direction = new THREE.Vector3(
        Math.cos(angle) * 1.3,
        0.1 + (i % 3) * 0.25,
        Math.sin(angle) * 1.3,
      ).normalize();
      transform.position.copy(start);
      transform.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction,
      );
      transform.scale.set(1.6 + (i % 3) * 0.2, 1.8 + (i % 4) * 0.22, 1.7);
      transform.updateMatrix();
      instanced.setMatrixAt(i, transform.matrix);
      poses.push(transform.clone());
      instanced.setColorAt(
        i,
        new THREE.Color().setHSL(
          0.26 + (i % 4) * 0.012,
          0.3,
          0.09 + (i % 5) * 0.02,
        ),
      );
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(start.x * 0.2, height, start.z * 0.2),
        start,
      );
      mesh(new THREE.TubeGeometry(curve, 8, 0.027, 5, false), stem, crown);
    }
    flutter.push({ mesh: instanced, poses });
    return plant;
  }
  // Sill plants, one each side of the mullion, and a tall one on the floor.
  plant(-24, ROOM.backWall - 1.2, 2.2, y0, '#6f6a5c');
  plant(-50, ROOM.backWall - 1.6, 2.8, y0, '#8e7f69');
  plant(-34, 2, 4.2, ROOM.floor, '#3b3c35');

  // Pencil cup with pencils.
  const pencilCup = new THREE.Group();
  pencilCup.name = 'pencil-cup';
  pencilCup.position.set(-12.5, ROOM.deskTop, -6.5);
  group.add(pencilCup);
  mesh(
    new THREE.LatheGeometry(
      [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.35, 0),
        new THREE.Vector2(1.4, 3.6),
        new THREE.Vector2(1.28, 3.6),
        new THREE.Vector2(1.22, 0.25),
        new THREE.Vector2(0, 0.25),
      ],
      32,
    ),
    material('#5a5148', 0.85),
    pencilCup,
  );
  const pencilPaint = ['#c8a24a', '#30353a', '#9b4a35', '#c8a24a'];
  pencilPaint.forEach((color, i) => {
    const pencil = new THREE.Group();
    const angle = i * 1.7;
    pencil.position.set(Math.cos(angle) * 0.55, 0.3, Math.sin(angle) * 0.55);
    pencil.rotation.set(Math.sin(angle) * 0.16, 0, -Math.cos(angle) * 0.16);
    pencilCup.add(pencil);
    const lead = material(color, 0.5);
    mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 6.2, 6),
      lead,
      pencil,
      0,
      3.1,
      0,
    );
    mesh(
      new THREE.ConeGeometry(0.15, 0.6, 6),
      material('#d9c39a', 0.8),
      pencil,
      0,
      6.5,
      0,
    );
  });

  // Mouse.
  const mouse = mesh(
    new THREE.SphereGeometry(1, 32, 16),
    material('#3a3532', 0.48, 0.1),
    group,
    12.4,
    ROOM.deskTop + 0.18,
    1,
  );
  mouse.name = 'desk-mouse';
  mouse.scale.set(1.15, 0.62, 1.9);

  // Small notepad and pen, front left.
  const notepad = new THREE.Group();
  notepad.name = 'notepad';
  notepad.position.set(-15, ROOM.deskTop, 4.5);
  notepad.rotation.y = 0.32;
  group.add(notepad);
  mesh(
    new RoundedBoxGeometry(5.2, 0.24, 7, 2, 0.05),
    material('#dcd3c1', 0.92),
    notepad,
    0,
    0.12,
    0,
  );
  const pen = mesh(
    new THREE.CylinderGeometry(0.13, 0.1, 6.4, 10),
    material('#1d2227', 0.35, 0.5),
    notepad,
    1.1,
    0.38,
    0,
  );
  pen.rotation.x = Math.PI / 2;
  pen.rotation.z = 0.2;
  pen.name = 'pen';

  // Coffee mug with steam (kept from the earlier desk; the room ambience checks rely on it).
  const mug = new THREE.Group();
  mug.position.set(21, ROOM.deskTop, -2.5);
  mug.scale.setScalar(0.9);
  group.add(mug);
  const cup = material('#b6afa0', 0.36);
  mesh(
    new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.88, 0),
        new THREE.Vector2(1.02, 0.12),
        new THREE.Vector2(1.08, 1.66),
        new THREE.Vector2(0.99, 1.71),
        new THREE.Vector2(0.92, 0.22),
      ],
      40,
    ),
    cup,
    mug,
  );
  mesh(new THREE.TorusGeometry(0.6, 0.13, 10, 32), cup, mug, 1.14, 0.9, 0);
  const coffee = mesh(
    new THREE.CircleGeometry(0.99, 32),
    material('#241910', 0.22),
    mug,
    0,
    1.43,
    0,
  );
  coffee.rotation.x = -Math.PI / 2;
  const steamMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { time: { value: 0 }, phase: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float time; uniform float phase;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.0),f.x),f.y);}
      float cloud(vec2 p){return noise(p)*.57+noise(p*2.07)*.28+noise(p*4.13)*.15;}
      void main(){
        float y=vUv.y;
        float drift=.08*sin(y*9.0-time*.45+phase)+.09*y*sin(time*.17+phase);
        float x=vUv.x-.5-drift;
        float width=.035+y*.24;
        float envelope=exp(-x*x/(width*width))*smoothstep(0.0,.09,y)*pow(1.0-y,1.8);
        vec2 flow=vec2(x*13.0+phase,y*7.0-time*.48);
        float detail=cloud(flow+vec2(cloud(flow*.6+time*.08),0.0));
        float alpha=envelope*smoothstep(.28,.72,detail)*.22;
        gl_FragColor=vec4(.82,.86,.79,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  materials.add(steamMaterial);
  const steam = mesh(
    new THREE.PlaneGeometry(3.6, 5.2),
    steamMaterial,
    mug,
    0,
    3.95,
    0,
  );
  steam.name = 'coffee-steam';
  steam.layers.set(1);
  steam.castShadow = steam.receiveShadow = false;

  // Open sketchbook to the right (the existing original illustration).
  const paper = material('#d7cdb3', 0.9),
    cover = material('#28342c', 0.78);
  const notebook = new THREE.Group();
  notebook.name = 'architect-field-notebook';
  notebook.position.set(25, ROOM.deskTop + 0.04, 3);
  notebook.rotation.y = -0.3;
  notebook.scale.setScalar(0.85);
  group.add(notebook);
  mesh(
    new RoundedBoxGeometry(9.25, 0.09, 7.02, 3, 0.04),
    cover,
    notebook,
    0,
    0.05,
    0,
  );
  for (const side of [-1, 1])
    mesh(
      new RoundedBoxGeometry(4.46, 0.22, 6.8, 2, 0.06),
      paper,
      notebook,
      side * 2.26,
      0.17,
      0,
    );
  const pageGeometry = new THREE.PlaneGeometry(9, 6.75, 48, 8);
  const vertices = pageGeometry.getAttribute('position');
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i),
      z = vertices.getY(i);
    vertices.setXYZ(
      i,
      x,
      0.32 +
        0.17 * Math.sin((Math.abs(x) / 4.5) * Math.PI) -
        0.1 * Math.exp(-x * x * 15),
      -z,
    );
  }
  pageGeometry.computeVertexNormals();
  const illustration = material('#ffffff', 0.93);
  const pages = mesh(pageGeometry, illustration, notebook);
  pages.name = 'sketchbook-illustration';
  new THREE.TextureLoader().load(
    new URL('textures/solarpunk-sketchbook.png', document.baseURI).href,
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      textures.add(texture);
      illustration.map = texture;
      illustration.needsUpdate = true;
      invalidate();
    },
  );

  // ----------------------------------------------- right: books and lamp
  const bookColors = [
    '#6d4a33',
    '#2f3d3a',
    '#8b6b45',
    '#43302a',
    '#a08a68',
    '#273330',
  ];
  function bookStack(
    x: number,
    y: number,
    z: number,
    count: number,
    angle = 0,
  ) {
    const stack = new THREE.Group();
    stack.position.set(x, y, z);
    stack.rotation.y = angle;
    group.add(stack);
    let height = 0;
    for (let i = 0; i < count; i++) {
      const thickness = 0.8 + random() * 0.7;
      const book = mesh(
        new RoundedBoxGeometry(
          7.5 + random() * 2,
          thickness,
          5.2 + random() * 1.2,
          2,
          0.08,
        ),
        material(bookColors[Math.floor(random() * bookColors.length)], 0.82),
        stack,
        (random() - 0.5) * 0.6,
        height + thickness / 2,
        0,
      );
      book.rotation.y = (random() - 0.5) * 0.18;
      height += thickness;
    }
    return { stack, height };
  }
  const lampStack = bookStack(19, ROOM.deskTop, -12, 3, 0.08);
  bookStack(30, ROOM.deskTop, -10.5, 4, -0.2);
  // Mushroom lamp: frosted cap glowing warm over a stem.
  const lamp = new THREE.Group();
  lamp.name = 'mushroom-lamp';
  lamp.position.set(19, ROOM.deskTop + lampStack.height, -12);
  lamp.scale.setScalar(0.72);
  group.add(lamp);
  const glow = new THREE.MeshStandardMaterial({
    color: '#e9c9a0',
    emissive: '#ff9f4a',
    emissiveIntensity: 1.2,
    roughness: 0.5,
  });
  materials.add(glow);
  mesh(new THREE.CylinderGeometry(1.9, 2.1, 0.5, 32), glow, lamp, 0, 0.25, 0);
  mesh(new THREE.CylinderGeometry(0.75, 1.1, 5.2, 24), glow, lamp, 0, 2.9, 0);
  const cap = mesh(
    new THREE.SphereGeometry(4.2, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    glow,
    lamp,
    0,
    5.2,
    0,
  );
  cap.scale.y = 0.72;
  cap.castShadow = false;
  const capUnder = mesh(
    new THREE.CircleGeometry(4.2, 40),
    new THREE.MeshBasicMaterial({ color: '#ffd9a3' }),
    lamp,
    0,
    5.19,
    0,
  );
  materials.add(capUnder.material as THREE.Material);
  capUnder.rotation.x = Math.PI / 2;
  capUnder.castShadow = false;
  const lampLight = new THREE.PointLight('#ffb86e', 0, 0, 2);
  lampLight.position.set(19, ROOM.deskTop + lampStack.height + 3.2, -11);
  lampLight.castShadow = false;
  group.add(lampLight);
  // Bounce on the wall behind the lamp: an additive glow card.
  const bounceCanvas = document.createElement('canvas');
  bounceCanvas.width = bounceCanvas.height = 128;
  const bounceInk = bounceCanvas.getContext('2d');
  if (bounceInk) {
    const gradient = bounceInk.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,.35)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    bounceInk.fillStyle = gradient;
    bounceInk.fillRect(0, 0, 128, 128);
  }
  const bounceMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture(bounceCanvas),
    color: '#ff9f55',
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  materials.add(bounceMaterial);
  const bounce = mesh(
    new THREE.PlaneGeometry(52, 40),
    bounceMaterial,
    group,
    19,
    ROOM.deskTop + lampStack.height + 6,
    ROOM.backWall + 0.2,
  );
  bounce.castShadow = bounce.receiveShadow = false;
  bounce.name = 'lamp-bounce';

  // Floating shelf above with books, a vase and a twig.
  const shelf = mesh(
    new THREE.BoxGeometry(22, 0.8, 5),
    sillWood,
    group,
    31,
    20,
    ROOM.backWall + 2.5,
  );
  shelf.name = 'wall-shelf';
  for (let i = 0; i < 7; i++) {
    const h = 5 + random() * 2.2;
    const book = mesh(
      new RoundedBoxGeometry(0.9 + random() * 0.4, h, 4, 2, 0.06),
      material(bookColors[i % bookColors.length], 0.84),
      group,
      22 + i * 1.25,
      20.4 + h / 2,
      ROOM.backWall + 2.5,
    );
    if (i === 6) book.rotation.z = -0.24;
  }
  const vase = mesh(
    new THREE.LatheGeometry(
      [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.1, 0),
        new THREE.Vector2(1.5, 1.4),
        new THREE.Vector2(0.9, 3.2),
        new THREE.Vector2(0.55, 4.2),
        new THREE.Vector2(0.7, 4.6),
      ],
      28,
    ),
    material('#8f7f6c', 0.7),
    group,
    36.5,
    20.4,
    ROOM.backWall + 2.6,
  );
  vase.name = 'vase';
  const twigMaterial = material('#3b2a1e', 0.9);
  for (let i = 0; i < 3; i++) {
    const lean = (i - 1) * 0.5;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(36.5, 24.6, ROOM.backWall + 2.6),
      new THREE.Vector3(36.5 + lean * 1.5, 28, ROOM.backWall + 2.6),
      new THREE.Vector3(36.5 + lean * 3.2, 32 + i, ROOM.backWall + 2.3),
    ]);
    mesh(
      new THREE.TubeGeometry(curve, 12, 0.08, 4, false),
      twigMaterial,
      group,
    );
  }

  // --------------------------------------------------------------- lights
  const sun = new THREE.DirectionalLight('#ffffff', 0);
  sun.name = 'room-sun';
  sun.castShadow = true;
  sun.shadow.mapSize.set(software ? 1024 : 2048, software ? 1024 : 2048);
  Object.assign(sun.shadow.camera, {
    left: -70,
    right: 70,
    top: 70,
    bottom: -70,
    near: 1,
    far: 320,
  });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.normalBias = 0.05;
  sun.shadow.bias = -0.0004;
  sun.shadow.radius = 2;
  sun.shadow.blurSamples = 6;
  sun.target.position.set(-6, 0, 0);
  group.add(sun, sun.target);
  const skyLight = new THREE.HemisphereLight('#c4d4d6', '#4a3e2e', 0);
  skyLight.name = 'room-sky';
  group.add(skyLight);
  // A soft key from the viewer's side keeps keycaps legible in every preset.
  const keyFill = new THREE.DirectionalLight('#f2efe8', 0);
  keyFill.position.set(10, 26, 30);
  keyFill.target.position.set(0, 0, 0);
  group.add(keyFill, keyFill.target);

  // ------------------------------------------------- efficient-path shafts
  // Software GL cannot afford the raymarched pass, so a swept prism from the
  // window aperture carries striped additive light instead.
  const shaftUniforms = {
    travel: { value: new THREE.Vector3(0, -1, 1) },
    color: { value: new THREE.Color('#fff2dc') },
    density: { value: 0 },
    opening: { value: 0.5 },
  };
  const shaftMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: shaftUniforms,
    // The prism is a unit box mapped onto (window width, window height, sun
    // travel), so box-local position is directly (u, v, distance along the beam).
    vertexShader: `varying vec3 vLocal; void main(){ vLocal = position + 0.5; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec3 vLocal; uniform vec3 travel, color; uniform float density, opening;
      void main(){
        float px = ${x0.toFixed(1)} + vLocal.x * ${(x1 - x0).toFixed(1)};
        float py = ${y0.toFixed(1)} + vLocal.y * ${(y1 - y0).toFixed(1)};
        float t = vLocal.z * 120.0;
        float u = smoothstep(0.0, 0.09, vLocal.x) * (1.0 - smoothstep(0.91, 1.0, vLocal.x));
        float v = smoothstep(0.0, 0.08, vLocal.y) * (1.0 - smoothstep(0.92, 1.0, vLocal.y));
        float mullion = smoothstep(0.6, 1.6, abs(px - (${ROOM.window.mullion.toFixed(1)})));
        float slat = fract((${y1.toFixed(1)} - py) / ${ROOM.slatSpacing.toFixed(2)});
        float clear = 1.0 - smoothstep(opening * 0.5 - 0.2, opening * 0.5 + 0.2, abs(slat - 0.5));
        float blind = py > ${ROOM.blindBottom.toFixed(1)} ? mix(0.3, 0.9, clear) : 0.4;
        float beam = px + py * 0.45;
        float gaps = pow(max(0.0, sin(beam * 0.42 + 0.9) * 0.62 + sin(beam * 0.93 + 2.1) * 0.38), 2.6);
        float fade = exp(-t / 70.0) * smoothstep(0.0, 6.0, t);
        // One surface stands in for a whole column of air, hence the larger gain.
        float a = u * v * mullion * blind * fade * (0.04 + gaps) * density * 0.065;
        gl_FragColor = vec4(color * a, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  materials.add(shaftMaterial);
  // Interior slices through the beam volume (a box's own faces would sit on
  // the aperture edge, where the beam fades to nothing): vertical sheets
  // across the window width and horizontal sheets through its height.
  const slices: number[] = [];
  const quad = (a: number[], b: number[], c: number[], d: number[]) =>
    slices.push(...a, ...b, ...c, ...a, ...c, ...d);
  for (let i = 1; i < 8; i++) {
    const x = i / 8 - 0.5;
    quad([x, -0.5, -0.5], [x, 0.5, -0.5], [x, 0.5, 0.5], [x, -0.5, 0.5]);
  }
  for (let j = 1; j < 5; j++) {
    const y = j / 5 - 0.5;
    quad([-0.5, y, -0.5], [0.5, y, -0.5], [0.5, y, 0.5], [-0.5, y, 0.5]);
  }
  const shaftGeometry = new THREE.BufferGeometry();
  shaftGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(slices, 3),
  );
  geometries.add(shaftGeometry);
  const shaftVolume = new THREE.Mesh(shaftGeometry, shaftMaterial);
  shaftVolume.name = 'efficient-shafts';
  shaftVolume.matrixAutoUpdate = false;
  shaftVolume.visible = software;
  shaftVolume.frustumCulled = false;
  shaftVolume.renderOrder = 5;
  group.add(shaftVolume);
  function placeShaftVolume(travel: THREE.Vector3) {
    const length = 120;
    const width = new THREE.Vector3(x1 - x0, 0, 0);
    const height = new THREE.Vector3(0, y1 - y0, 0);
    const along = travel.clone().multiplyScalar(length);
    const origin = new THREE.Vector3(
      (x0 + x1) / 2,
      (y0 + y1) / 2,
      ROOM.backWall,
    ).addScaledVector(along, 0.5);
    shaftVolume.matrix.makeBasis(width, height, along).setPosition(origin);
    shaftVolume.matrixWorldNeedsUpdate = true;
  }

  // ---------------------------------------------------------- transitions
  let target: LightingState = { preset: 'afternoon', brightness: 72 };
  let from = mixedFrom(ROOM_LIGHT.afternoon);
  const to = mixedFrom(ROOM_LIGHT.afternoon);
  const current = mixedFrom(ROOM_LIGHT.afternoon);
  let progress = 1;
  let gainFrom = brightnessGain(72),
    gainTo = gainFrom,
    gain = gainFrom;
  let screenKind: Wallpaper = 'day';
  let flash = 0;
  let nextFlash = 4;
  const travel = new THREE.Vector3();
  function copyMixed(
    into: ReturnType<typeof mixedFrom>,
    source: ReturnType<typeof mixedFrom>,
  ) {
    for (const key of colorKeys) into[key].copy(source[key]);
    for (const key of numberKeys) into[key] = source[key];
  }
  function apply() {
    const light = current;
    travel.copy(sunTravel(light));
    sun.position.copy(sun.target.position).addScaledVector(travel, -150);
    sun.color.copy(light.sunColor);
    sun.intensity = light.sunIntensity;
    skyLight.color.copy(light.skyColor);
    skyLight.groundColor.copy(light.groundColor);
    skyLight.intensity = light.skyIntensity * (1 + flash * 4);
    keyFill.intensity = light.keyFill;
    lampLight.intensity = light.lampIntensity * 60;
    glow.emissiveIntensity = 0.25 + light.lampIntensity * 0.55;
    bounceMaterial.opacity = Math.min(1, 0.12 + light.lampIntensity * 0.12);
    screenUniforms.gain.value = light.screenGain;
    screenLight.intensity = light.screenGain * 14;
    for (const surface of outsideMaterials)
      surface.color
        .copy(light.outside)
        .multiplyScalar(light.outsideGain * (1 + flash * 2.5));
    plaster.color.copy(light.wall);
    glassUniforms.rain.value = light.rain;
    glassUniforms.tint.value.copy(light.outside);
    glassUniforms.flash.value = flash;
    placeSlats(light.blindTilt);
    shaftUniforms.travel.value.copy(travel);
    shaftUniforms.color.value.copy(light.shaftColor);
    shaftUniforms.density.value = light.shaftDensity * light.sunIntensity * 0.4;
    shaftUniforms.opening.value = blindOpening(
      light.blindTilt,
      light.sunElevation,
    );
    placeShaftVolume(travel);
  }
  apply();

  const transform = new THREE.Object3D();
  return {
    group,
    monitor,
    screen,
    sun,
    /** Current blended light, read by the renderer for exposure and the shaft pass. */
    light: current,
    travel,
    get gain() {
      return gain;
    },
    get flash() {
      return flash;
    },
    get progress() {
      return progress;
    },
    setShaftMode(mode: 'raymarch' | 'geometry' | 'off') {
      shaftVolume.visible = mode === 'geometry';
    },
    /** Retarget the room; it eases there over ~1.2 s unless `instant`. */
    setLighting(next: LightingState, instant: boolean) {
      const presetChanged = next.preset !== target.preset;
      target = next;
      from = mixedFrom(ROOM_LIGHT.afternoon);
      copyMixed(from, current);
      copyMixed(to, mixedFrom(ROOM_LIGHT[next.preset]));
      gainFrom = gain;
      gainTo = brightnessGain(next.brightness);
      const kind = ROOM_LIGHT[next.preset].screen;
      if (kind !== screenKind) {
        screenUniforms.mapA.value =
          screenUniforms.mixT.value > 0.5
            ? screenUniforms.mapB.value
            : screenUniforms.mapA.value;
        screenUniforms.mapB.value = wallpaper(kind);
        screenUniforms.mixT.value = 0;
        screenKind = kind;
      }
      progress = presetChanged || gainFrom !== gainTo ? 0 : progress;
      if (instant) {
        progress = 1;
        copyMixed(current, to);
        gain = gainTo;
        screenUniforms.mapA.value = screenUniforms.mapB.value;
        screenUniforms.mixT.value = 0;
        apply();
      }
      invalidate();
    },
    /**
     * Advance transitions and weather. Returns true while something is still
     * moving, so the renderer keeps drawing frames.
     */
    step(delta: number, ambient: boolean, reduced: boolean) {
      let moving = false;
      if (progress < 1) {
        progress = reduced ? 1 : Math.min(1, progress + delta / 1.2);
        const t = progress * progress * (3 - 2 * progress);
        for (const key of colorKeys)
          current[key].copy(from[key]).lerp(to[key], t);
        for (const key of numberKeys)
          current[key] = from[key] + (to[key] - from[key]) * t;
        gain = gainFrom + (gainTo - gainFrom) * t;
        if (screenUniforms.mapA.value !== screenUniforms.mapB.value) {
          screenUniforms.mixT.value = t;
          if (progress >= 1) {
            screenUniforms.mapA.value = screenUniforms.mapB.value;
            screenUniforms.mixT.value = 0;
          }
        }
        moving = progress < 1;
      }
      // Lightning: occasional soft flashes during the storm, never under reduced motion.
      const storm = current.rain > 0.5 && ambient && !reduced;
      if (storm) {
        nextFlash -= delta;
        if (nextFlash <= 0) {
          flash = 1;
          nextFlash = 6 + random() * 9;
        }
      }
      if (flash > 0) {
        flash = storm ? Math.max(0, flash - delta * 2.6) : 0;
        moving = true;
      }
      apply();
      return moving;
    },
    updateAmbient(time: number, camera: THREE.Camera) {
      foliage.forEach((crown, i) => {
        crown.rotation.z = Math.sin(time * 0.37 + i * 1.9) * 0.009;
        crown.rotation.x = Math.sin(time * 0.29 + i) * 0.006;
      });
      flutter.forEach(({ mesh, poses }, plantIndex) => {
        poses.forEach((pose, i) => {
          transform.position.copy(pose.position);
          transform.scale.copy(pose.scale);
          transform.quaternion.copy(pose.quaternion);
          transform.rotateX(
            Math.sin(time * 0.85 + i * 0.7 + plantIndex) * 0.019 +
              Math.sin(time * 1.9 + i) * 0.004,
          );
          transform.updateMatrix();
          mesh.setMatrixAt(i, transform.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
      });
      steamMaterial.uniforms.time.value = time;
      glassUniforms.time.value = time;
      const local = camera.position.clone();
      mug.worldToLocal(local);
      steam.rotation.y = Math.atan2(local.x, local.z);
    },
    dispose() {
      disposed = true;
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      sun.shadow.map?.dispose();
    },
  };
}

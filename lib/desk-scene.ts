import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createDeskScene(invalidate: () => void) {
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
  const wood = material('#b4a68e', 0.84);
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#79694f';
    ctx.fillRect(0, 0, 1024, 512);
    for (let i = 0; i < 450; i++) {
      const y = (i * 512) / 450;
      ctx.strokeStyle = i % 3 === 0 ? '#282a2216' : '#ded6bb12';
      ctx.lineWidth = i % 7 === 0 ? 1.3 : 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(
        300,
        y + Math.sin(i * 0.25) * 8,
        750,
        y - 5,
        1024,
        y + 3,
      );
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    wood.map = texture;
    wood.bumpMap = texture;
    wood.bumpScale = 0.035;
    textures.add(texture);
  }
  mesh(new RoundedBoxGeometry(52, 0.7, 46, 3, 0.25), wood, group, 0, -0.59, -3);
  const felt = material('#343e37', 0.97);
  mesh(new THREE.BoxGeometry(20, 0.035, 9.2), felt, group, 0, -0.218, 0);

  const paper = material('#d7cdb3', 0.9),
    cover = material('#28342c', 0.78),
    brass = material('#a58d57', 0.45, 0.6);
  const books = new THREE.Group();
  books.position.set(8, -0.2, -7.4);
  books.rotation.y = -0.16;
  group.add(books);
  mesh(new THREE.BoxGeometry(5, 0.08, 6.8), cover, books, 0, 0.07, 0);
  mesh(new THREE.BoxGeometry(4.85, 0.56, 6.62), paper, books, 0.03, 0.38, 0);
  mesh(new THREE.BoxGeometry(5, 0.08, 6.8), cover, books, 0, 0.71, 0);
  const upper = mesh(
    new THREE.BoxGeometry(4.5, 0.42, 5.4),
    material('#79715e'),
    books,
    -0.25,
    0.99,
    0.14,
  );
  upper.rotation.y = 0.15;
  for (let i = 0; i < 8; i++)
    mesh(
      new THREE.BoxGeometry(4.86, 0.01, 6.63),
      material(i % 2 ? '#a69b83' : '#bdb19a'),
      books,
      0.03,
      0.12 + i * 0.065,
      0,
    );

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
    const texture = new THREE.CanvasTexture(leafCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    leaves.map = texture;
    leaves.bumpMap = texture;
    leaves.bumpScale = 0.014;
    textures.add(texture);
  }
  leaves.side = THREE.DoubleSide;
  const stem = material('#516444', 0.8),
    soil = material('#292a1f', 1);
  function plant(x: number, z: number, scale: number, base: number) {
    const plant = new THREE.Group();
    plant.position.set(x, base, z);
    plant.scale.setScalar(scale);
    group.add(plant);
    const ceramic = material('#9d9680', 0.9);
    const profile = [
      new THREE.Vector2(0.8, 0),
      new THREE.Vector2(0.94, 0.08),
      new THREE.Vector2(1.12, 1.65),
      new THREE.Vector2(1.1, 1.73),
      new THREE.Vector2(1.02, 1.73),
      new THREE.Vector2(0.9, 0.16),
    ];
    mesh(new THREE.LatheGeometry(profile, 48), ceramic, plant);
    const top = mesh(
      new THREE.CircleGeometry(1.04, 40),
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
          0.26,
          0.075 + (i % 5) * 0.018,
        ),
      );
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 1.5, 0),
        new THREE.Vector3(start.x * 0.2, height, start.z * 0.2),
        start,
      );
      mesh(new THREE.TubeGeometry(curve, 10, 0.027, 5, false), stem, crown);
    }
    flutter.push({ mesh: instanced, poses });
  }
  plant(8, -7.3, 0.85, 1.04);
  plant(-11, 5.8, 1.1, -0.22);

  const mug = new THREE.Group();
  mug.position.set(-11, -0.2, -6.4);
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
      48,
    ),
    cup,
    mug,
  );
  mesh(new THREE.TorusGeometry(0.6, 0.13, 12, 40), cup, mug, 1.14, 0.9, 0);
  const coffee = mesh(
    new THREE.CircleGeometry(0.99, 40),
    material('#241910', 0.22),
    mug,
    0,
    1.43,
    0,
  );
  coffee.rotation.x = -Math.PI / 2;
  mesh(
    new THREE.CylinderGeometry(1.48, 1.48, 0.09, 48),
    material('#756c54'),
    mug,
    0,
    0.02,
    0,
  );

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

  const notebook = new THREE.Group();
  notebook.name = 'architect-field-notebook';
  notebook.position.set(11.5, -0.16, 5.8);
  notebook.rotation.y = -0.22;
  group.add(notebook);
  mesh(
    new RoundedBoxGeometry(9.25, 0.09, 7.02, 3, 0.04),
    cover,
    notebook,
    0,
    0.05,
    0,
  );
  for (const side of [-1, 1]) {
    mesh(
      new RoundedBoxGeometry(4.46, 0.22, 6.8, 2, 0.06),
      paper,
      notebook,
      side * 2.26,
      0.17,
      0,
    );
    for (let i = 0; i < 7; i++)
      mesh(
        new THREE.BoxGeometry(4.44, 0.008, 6.79),
        paper,
        notebook,
        side * 2.26,
        0.085 + i * 0.027,
        0,
      );
  }
  const pageGeometry = new THREE.PlaneGeometry(9, 6.75, 72, 12);
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
  const ribbon = mesh(
    new THREE.BoxGeometry(0.16, 0.015, 2.1),
    material('#958356', 0.96),
    notebook,
    0.13,
    0.07,
    3.9,
  );
  ribbon.rotation.y = 0.14;

  const graphite = material('#202822', 0.34, 0.55),
    steel = material('#b9bbb0', 0.29, 0.88);
  function pencil(
    parent: THREE.Object3D,
    x: number,
    z: number,
    angle: number,
    color: string,
  ) {
    const pencil = new THREE.Group();
    pencil.name = 'precision-mechanical-pencil';
    pencil.position.set(x, 0.59, z);
    pencil.rotation.set(Math.PI / 2, 0, angle);
    parent.add(pencil);
    const barrel = material(color, 0.34, 0.72);
    mesh(
      new THREE.CylinderGeometry(0.115, 0.115, 3.55, 6),
      barrel,
      pencil,
      0,
      0.7,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(0.128, 0.128, 1.45, 32),
      steel,
      pencil,
      0,
      -1.83,
      0,
    );
    // Crossed grip cuts are real geometry, so highlights survive a close view.
    const knurlGeometry = new THREE.TorusGeometry(0.129, 0.008, 3, 24);
    const grip = new THREE.InstancedMesh(knurlGeometry, graphite, 28);
    geometries.add(knurlGeometry);
    const pose = new THREE.Object3D();
    for (let i = 0; i < 28; i++) {
      pose.position.y = -2.5 + i * 0.05;
      pose.rotation.set(Math.PI / 2, i % 2 ? 0.12 : -0.12, 0);
      pose.updateMatrix();
      grip.setMatrixAt(i, pose.matrix);
    }
    pencil.add(grip);
    mesh(
      new THREE.CylinderGeometry(0.115, 0.035, 0.42, 24),
      steel,
      pencil,
      0,
      -2.76,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(0.027, 0.027, 0.32, 16),
      steel,
      pencil,
      0,
      -3.12,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.16, 8),
      graphite,
      pencil,
      0,
      -3.35,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(0.137, 0.137, 0.17, 24),
      steel,
      pencil,
      0,
      2.55,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.34, 24),
      barrel,
      pencil,
      0,
      2.77,
      0,
    );
    mesh(
      new THREE.CylinderGeometry(0.125, 0.125, 0.08, 24),
      steel,
      pencil,
      0,
      2.97,
      0,
    );
    const clipCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 2.57, 0),
      new THREE.Vector3(0.2, 2.47, 0),
      new THREE.Vector3(0.21, 1.38, 0),
      new THREE.Vector3(0.15, 1.26, 0),
    ]);
    mesh(new THREE.TubeGeometry(clipCurve, 18, 0.025, 7, false), steel, pencil);
  }
  pencil(notebook, 3.65, 0.35, 0.13, '#4c6054');
  pencil(group, 8.9, 6.75, -0.32, '#b79b61');

  const ruler = new THREE.Group();
  ruler.position.set(11.5, -0.12, -0.5);
  ruler.rotation.y = -0.08;
  group.add(ruler);
  mesh(new THREE.BoxGeometry(7, 0.08, 0.55), brass, ruler);
  for (let i = 0; i < 55; i++)
    mesh(
      new THREE.BoxGeometry(0.012, 0.004, i % 5 === 0 ? 0.38 : 0.2),
      graphite,
      ruler,
      -3.2 + i * 0.117,
      0.044,
      0.06,
    );

  const monitor = new THREE.Group();
  monitor.name = 'solarpunk-monitor';
  monitor.position.set(0, -0.2, -10.5);
  group.add(monitor);
  mesh(
    new RoundedBoxGeometry(6, 0.25, 3.5, 3, 0.12),
    graphite,
    monitor,
    0,
    0.14,
    0.8,
  );
  mesh(
    new RoundedBoxGeometry(1.2, 4.5, 0.7, 3, 0.18),
    brass,
    monitor,
    0,
    2.4,
    -0.15,
  );
  mesh(
    new RoundedBoxGeometry(20, 12, 0.62, 4, 0.25),
    graphite,
    monitor,
    0,
    9,
    0,
  );
  mesh(
    new RoundedBoxGeometry(20.06, 0.32, 0.67, 3, 0.1),
    wood,
    monitor,
    0,
    3.15,
    0,
  );
  const idleCanvas = document.createElement('canvas');
  idleCanvas.width = 1600;
  idleCanvas.height = 900;
  const idle = idleCanvas.getContext('2d');
  if (idle) {
    idle.fillStyle = '#14221c';
    idle.fillRect(0, 0, 1600, 900);
    const glow = idle.createRadialGradient(1050, 250, 0, 900, 340, 850);
    glow.addColorStop(0, '#2e5140');
    glow.addColorStop(1, '#13201b');
    idle.fillStyle = glow;
    idle.fillRect(0, 0, 1600, 900);
    idle.fillStyle = '#d8dfc9';
    idle.font = '54px sans-serif';
    idle.fillText('keyconf', 110, 750);
    idle.font = '16px monospace';
    idle.fillStyle = '#91aa91';
    idle.fillText('A SPACE TO MAKE THINGS.', 114, 792);
  }
  const idleTexture = new THREE.CanvasTexture(idleCanvas);
  idleTexture.colorSpace = THREE.SRGBColorSpace;
  textures.add(idleTexture);
  const screenMaterial = new THREE.MeshBasicMaterial({
    map: idleTexture,
    toneMapped: false,
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
  mesh(
    new THREE.SphereGeometry(0.045, 8, 6),
    material('#b4cdb2', 0.4),
    monitor,
    9.25,
    3.2,
    0.35,
  );
  for (let i = 0; i < 16; i++)
    mesh(
      new THREE.BoxGeometry(0.35, 0.045, 0.08),
      brass,
      monitor,
      -3.75 + i * 0.5,
      3.16,
      0.36,
    );

  const lamp = new THREE.Group();
  lamp.position.set(-14, -0.2, -11);
  group.add(lamp);
  mesh(
    new THREE.CylinderGeometry(1.6, 1.75, 0.22, 48),
    graphite,
    lamp,
    0,
    0.12,
    0,
  );
  const arm = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.2, 0),
    new THREE.Vector3(-0.3, 5.6, 0),
    new THREE.Vector3(1.6, 8.6, 0),
    new THREE.Vector3(3.4, 8.2, 0.5),
  ]);
  mesh(new THREE.TubeGeometry(arm, 40, 0.095, 12, false), brass, lamp);
  const shade = mesh(
    new THREE.ConeGeometry(1.5, 1.2, 48, 1, true),
    graphite,
    lamp,
    3.4,
    7.9,
    0.5,
  );
  shade.rotation.z = -0.12;
  const diffuser = mesh(
    new THREE.CircleGeometry(1.43, 48),
    new THREE.MeshBasicMaterial({ color: '#f0d7a2' }),
    lamp,
    3.4,
    7.32,
    0.5,
  );
  materials.add(diffuser.material);
  diffuser.rotation.x = -Math.PI / 2;
  const lampLight = new THREE.PointLight('#ffddb0', 16, 18, 2);
  lampLight.position.set(-10.6, 6.8, -10.5);
  group.add(lampLight);

  const headphoneStand = new THREE.Group();
  headphoneStand.position.set(15, -0.2, -10.7);
  headphoneStand.rotation.y = -0.35;
  group.add(headphoneStand);
  mesh(
    new RoundedBoxGeometry(3, 0.2, 2.8, 3, 0.1),
    wood,
    headphoneStand,
    0,
    0.15,
    0,
  );
  mesh(
    new RoundedBoxGeometry(0.48, 5, 0.5, 2, 0.1),
    brass,
    headphoneStand,
    0,
    2.7,
    0,
  );
  mesh(
    new RoundedBoxGeometry(2, 0.35, 1.4, 3, 0.16),
    wood,
    headphoneStand,
    0,
    5.3,
    0,
  );
  const band = new THREE.EllipseCurve(0, 3.65, 2.04, 2.02, 0, Math.PI, false, 0)
    .getPoints(40)
    .map((p) => new THREE.Vector3(p.x, p.y, 0.1));
  mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(band),
      40,
      0.22,
      10,
      false,
    ),
    graphite,
    headphoneStand,
  );
  for (const side of [-1, 1]) {
    const cupGroup = new THREE.Group();
    cupGroup.position.set(side * 1.97, 3.45, 0.1);
    cupGroup.rotation.z = side * 0.1;
    headphoneStand.add(cupGroup);
    const ear = mesh(
      new THREE.CylinderGeometry(1, 1, 0.5, 48),
      steel,
      cupGroup,
    );
    ear.rotation.z = Math.PI / 2;
    const cushion = mesh(
      new THREE.TorusGeometry(0.78, 0.21, 12, 48),
      graphite,
      cupGroup,
      -side * 0.37,
      0,
      0,
    );
    cushion.rotation.y = Math.PI / 2;
    for (let i = 0; i < 6; i++) {
      const ring = mesh(
        new THREE.TorusGeometry(0.22 + i * 0.11, 0.014, 4, 40),
        graphite,
        cupGroup,
        side * 0.265,
        0,
        0,
      );
      ring.rotation.y = Math.PI / 2;
    }
  }

  // A sunroom beyond the desk gives the workbench a believable setting.
  const plaster = material('#364639', 0.98),
    timber = material('#86775b', 0.81);
  mesh(new THREE.BoxGeometry(150, 160, 0.5), plaster, group, 0, -2, -25);
  const windowGlass = new THREE.MeshBasicMaterial({
    color: '#80987d',
    transparent: true,
    opacity: 0.56,
  });
  materials.add(windowGlass);
  new THREE.TextureLoader().load(
    new URL('textures/solarpunk-window-garden.png', document.baseURI).href,
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      textures.add(texture);
      windowGlass.map = texture;
      windowGlass.color.set('#dde1cb');
      windowGlass.opacity = 0.9;
      windowGlass.needsUpdate = true;
      invalidate();
    },
  );
  mesh(new THREE.PlaneGeometry(38, 25), windowGlass, group, -8, 11, -24.68);
  for (let i = 0; i < 6; i++)
    mesh(
      new THREE.BoxGeometry(0.22, 25, 0.32),
      timber,
      group,
      -27 + i * 7.6,
      11,
      -24.3,
    );
  for (const y of [-1.5, 11, 23.5])
    mesh(new THREE.BoxGeometry(38, 0.2, 0.32), timber, group, -8, y, -24.3);
  for (let i = 0; i < 9; i++) {
    const louver = mesh(
      new THREE.BoxGeometry(38, 0.13, 1.2),
      timber,
      group,
      -8,
      16 + i * 0.85,
      -24.1,
    );
    louver.rotation.x = 0.3;
  }
  mesh(new THREE.BoxGeometry(38, 0.35, 3), wood, group, -8, -1.3, -23.6);
  plant(-20, -20, 1.9, -1.15);
  plant(10, -20, 1.35, -1.15);
  mesh(new THREE.BoxGeometry(9, 0.3, 2.8), wood, group, 18, 11, -23);
  for (let i = 0; i < 6; i++) {
    const volume = mesh(
      new RoundedBoxGeometry(0.6, 2.2 + (i % 3) * 0.3, 1.5, 2, 0.04),
      i % 2 ? cover : paper,
      group,
      15.4 + i * 0.68,
      12.3,
      -23,
    );
    volume.rotation.z = i === 5 ? -0.15 : 0;
  }
  const transform = new THREE.Object3D();
  return {
    group,
    monitor,
    screen,
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
      const local = camera.position.clone();
      mug.worldToLocal(local);
      steam.rotation.y = Math.atan2(local.x, local.z);
    },
    dispose() {
      disposed = true;
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
  };
}

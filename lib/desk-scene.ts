import * as THREE from 'three';

export function createDeskScene() {
  const group = new THREE.Group();
  group.name = 'desk-environment';
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
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
  const wood = material('#494337', 0.84);
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#6e6454';
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
  mesh(new THREE.BoxGeometry(200, 0.6, 200), wood, group, 0, -0.54, 0);
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
  for (let row = 0; row <= 18; row++) {
    const t = row / 18,
      width = Math.sin(Math.PI * t) * 0.34;
    for (let col = 0; col < 5; col++) {
      const side = (col - 2) / 2;
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
  leafGeometry.computeVertexNormals();
  geometries.add(leafGeometry);
  const leaves = material('#ffffff', 0.68);
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
    plant.add(instanced);
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
      mesh(new THREE.TubeGeometry(curve, 10, 0.027, 5, false), stem, plant);
    }
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

  const notebook = new THREE.Group();
  notebook.position.set(12, -0.16, 5);
  notebook.rotation.y = 0.27;
  group.add(notebook);
  mesh(new THREE.BoxGeometry(4.5, 0.36, 6.3), paper, notebook, 0, 0.18, 0);
  mesh(new THREE.BoxGeometry(4.65, 0.045, 6.45), cover, notebook, 0, 0.39, 0);
  mesh(new THREE.BoxGeometry(0.13, 0.025, 6.5), brass, notebook, 1.75, 0.43, 0);
  const pen = new THREE.Group();
  pen.position.set(1, 0.55, -0.6);
  pen.rotation.z = -Math.PI / 2;
  pen.rotation.x = 0.36;
  notebook.add(pen);
  mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 3.8, 12),
    material('#bba773', 0.4, 0.6),
    pen,
  );
  mesh(
    new THREE.ConeGeometry(0.1, 0.35, 12),
    material('#202725', 0.35, 0.7),
    pen,
    0,
    2.04,
    0,
  );
  return {
    group,
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
  };
}

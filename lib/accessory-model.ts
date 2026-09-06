import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import {
  accessoryCatalog,
  type AccessorySelection,
} from './build-accessories.ts';

const MAX_DESK_PREVIEWS = 6;

// These original studies communicate placement, not manufacturer dimensions or fit.
export function createAccessoryPreview({
  selections,
  keys,
  bounds,
}: {
  selections: readonly AccessorySelection[];
  keys: ReadonlyMap<string, THREE.Object3D>;
  bounds: THREE.Box3;
}) {
  const group = new THREE.Group();
  group.name = 'accessory-previews';
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const instances: THREE.InstancedMesh[] = [];
  const replacements: {
    group: THREE.Group;
    originals: { object: THREE.Object3D; visible: boolean }[];
  }[] = [];
  const counts = { artisan: 0, external: 0, omitted: 0 };
  let disposed = false;
  function material(color: string, roughness = 0.4, metalness = 0) {
    const value = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
    materials.add(value);
    return value;
  }
  function mesh(
    parent: THREE.Object3D,
    geometry: THREE.BufferGeometry,
    surface: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
  ) {
    geometries.add(geometry);
    const value = new THREE.Mesh(geometry, surface);
    value.position.set(x, y, z);
    value.castShadow = value.receiveShadow = true;
    parent.add(value);
    return value;
  }
  function box(width: number, height: number, depth: number, radius = 0.06) {
    return new RoundedBoxGeometry(width, height, depth, 2, radius);
  }
  function artisan(width: number) {
    const cap = new THREE.Group();
    cap.name = 'illustrative-artisan';
    const base = material('#155963', 0.3);
    mesh(cap, box(width - 0.08, 0.12, 0.92), base, 0, 0.06);
    const resin = new THREE.MeshPhysicalMaterial({
      color: '#82d9cf',
      roughness: 0.13,
      metalness: 0,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    materials.add(resin);
    const shell = mesh(cap, box(width - 0.12, 0.44, 0.84, 0.1), resin, 0, 0.32);
    shell.name = 'translucent-resin-shell';
    shell.castShadow = false;
    const stone = material('#efd7a8', 0.65);
    const copper = material('#e4894e', 0.34, 0.12);
    const moss = material('#417d65', 0.6);
    const pebble = new THREE.SphereGeometry(1, 10, 6);
    const repeats = Math.max(1, Math.floor(width));
    for (let i = 0; i < repeats; i++) {
      const center = ((i + 0.5) / repeats - 0.5) * (width - 0.3);
      const rock = mesh(cap, pebble, stone, center - 0.13, 0.2, 0.1);
      rock.scale.set(0.15, 0.1, 0.11);
      const leaf = mesh(cap, pebble, moss, center + 0.14, 0.2, -0.13);
      leaf.scale.set(0.11, 0.06, 0.14);
      const petal = mesh(cap, pebble, copper, center + 0.04, 0.32, 0.05);
      petal.scale.set(0.13, 0.045, 0.07);
      petal.rotation.y = -0.6;
    }
    return cap;
  }
  function macropad() {
    const pad = new THREE.Group();
    pad.name = 'illustrative-macropad';
    const dark = material('#303934', 0.44, 0.4);
    const cream = material('#e6dbc0');
    const orange = material('#cb7548');
    const rim = material('#9ca995', 0.34, 0.65);
    mesh(pad, box(3.65, 0.35, 5.75, 0.14), dark, 0, 0.175);
    mesh(pad, box(3.45, 0.07, 5.55), rim, 0, 0.37);
    const keyGeometry = box(0.86, 0.35, 0.86, 0.09);
    const keycaps = new THREE.InstancedMesh(keyGeometry, cream, 12);
    instances.push(keycaps);
    geometries.add(keyGeometry);
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < 12; i++) {
      keycaps.setMatrixAt(
        i,
        matrix.makeTranslation((i % 3) - 1, 0.59, Math.floor(i / 3) - 0.9),
      );
      keycaps.setColorAt(i, i < 3 ? orange.color : cream.color);
    }
    keycaps.name = 'macropad-twelve-keys';
    keycaps.castShadow = keycaps.receiveShadow = true;
    pad.add(keycaps);
    mesh(pad, box(1.8, 0.08, 0.72, 0.04), dark, -0.58, 0.44, -2.12);
    const display = material('#a4e5c5', 0.7);
    display.emissive.set('#39715a');
    display.emissiveIntensity = 0.4;
    const lineGeometry = new THREE.BoxGeometry(1.12, 0.01, 0.045);
    for (let i = 0; i < 3; i++)
      mesh(pad, lineGeometry, display, -0.65, 0.487, -2.3 + i * 0.15);
    mesh(
      pad,
      new THREE.CylinderGeometry(0.38, 0.38, 0.42, 20),
      dark,
      1.04,
      0.64,
      -2.12,
    );
    mesh(
      pad,
      new THREE.BoxGeometry(0.045, 0.015, 0.16),
      cream,
      1.04,
      0.857,
      -2.29,
    );
    mesh(pad, box(0.4, 0.15, 0.14, 0.02), dark, -0.9, 0.17, -2.91);
    return pad;
  }
  const assigned = new Map<string, number>();
  for (const selection of selections) {
    if (selection.location.kind === 'key')
      assigned.set(
        selection.location.keyId,
        (assigned.get(selection.location.keyId) ?? 0) + 1,
      );
  }
  const positions = { left: 0, right: 0, above: 0 };
  const totals = { left: 0, right: 0, above: 0 };
  let planned = 0;
  for (const selection of selections) {
    if (
      selection.location.kind === 'external' &&
      accessoryCatalog.find((item) => item.id === selection.productId)?.kind ===
        'macropad' &&
      planned < MAX_DESK_PREVIEWS
    ) {
      totals[selection.location.position]++;
      planned++;
    }
  }
  for (const selection of selections) {
    const product = accessoryCatalog.find(
      (item) => item.id === selection.productId,
    );
    const location = selection.location;
    if (product?.kind === 'artisan' && location.kind === 'key') {
      const key = keys.get(location.keyId);
      const originalCap = key?.children.find(
        (child) => child instanceof THREE.Mesh && child.name.startsWith('cap'),
      );
      if (originalCap instanceof THREE.Mesh)
        originalCap.geometry.computeBoundingBox();
      const capWidth =
        originalCap instanceof THREE.Mesh
          ? originalCap.geometry.boundingBox?.getSize(new THREE.Vector3()).x
          : undefined;
      if (
        !key ||
        capWidth === undefined ||
        Math.abs(capWidth + 0.08 - product.sizeU) > 0.03 ||
        assigned.get(location.keyId) !== 1 ||
        selection.quantity !== 1
      ) {
        counts.omitted++;
        continue;
      }
      const originals = key.children.map((object) => ({
        object,
        visible: object.visible,
      }));
      originals.forEach(({ object }) => {
        object.visible = false;
      });
      const cap = artisan(product.sizeU);
      cap.userData.selectionId = selection.id;
      key.add(cap);
      replacements.push({ group: cap, originals });
      counts.artisan++;
    } else if (product?.kind === 'macropad' && location.kind === 'external') {
      if (counts.external >= MAX_DESK_PREVIEWS || bounds.isEmpty()) {
        counts.omitted++;
        continue;
      }
      const index = positions[location.position]++;
      const row = index % 3;
      const column = Math.floor(index / 3);
      const centered = row - (Math.min(totals[location.position], 3) - 1) / 2;
      const pad = macropad();
      pad.userData.selectionId = selection.id;
      const gap = 0.6;
      pad.position.set(
        location.position === 'left'
          ? bounds.min.x - 1.825 - gap - column * 4.1
          : location.position === 'right'
            ? bounds.max.x + 1.825 + gap + column * 4.1
            : centered * 4.1,
        -0.2,
        location.position === 'above'
          ? bounds.min.z - 2.875 - gap - column * 6.2
          : centered * 6.2,
      );
      group.add(pad);
      counts.external++;
    } else counts.omitted++;
  }
  return {
    group,
    counts,
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const replacement of replacements) {
        replacement.group.removeFromParent();
        for (const { object, visible } of replacement.originals)
          object.visible = visible;
      }
      group.removeFromParent();
      instances.forEach((instance) => instance.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((surface) => surface.dispose());
    },
  };
}

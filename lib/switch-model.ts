import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function switchColors(id: string) {
  const stems: Record<string, string> = {
    'oil-king': '#252927',
    'g-pro-3-white': '#f3f0df',
    'g-pro-3-silver': '#9babb2',
    'g-pro-3-red': '#d95048',
    'g-pro-3-yellow': '#e6bd35',
    'g-pro-3-black': '#343c40',
    'g-pro-3-brown': '#986440',
    'g-pro-3-blue': '#477cba',
  };
  return {
    housing: id === 'oil-king' ? '#3a4240' : '#a9b7aa',
    stem: stems[id] ?? '#92aa74',
  };
}

function boxes(items: number[][]) {
  const geometries = items.map(([x, y, z, width, height, depth]) => {
    const geometry = new RoundedBoxGeometry(width, height, depth, 2, 0.015);
    geometry.translate(x, y, z);
    return geometry;
  });
  const merged = mergeGeometries(geometries);
  geometries.forEach((geometry) => geometry.dispose());
  return merged;
}

// Original MX-style visual study. One instance per key, with shared geometry.
export function createSwitchAssembly(positions: THREE.Vector3[], id: string) {
  const group = new THREE.Group();
  group.name = 'switches';
  const colors = switchColors(id);
  const housing = new THREE.MeshStandardMaterial({
    name: 'switch_housing',
    color: colors.housing,
    roughness: 0.3,
  });
  const stem = new THREE.MeshStandardMaterial({
    name: 'switch_stem',
    color: colors.stem,
    roughness: 0.25,
  });
  const metal = new THREE.MeshStandardMaterial({
    name: 'switch_contacts',
    color: '#cdb17e',
    metalness: 0.75,
    roughness: 0.3,
  });
  const baseGeometry = boxes([
    [0, 0.08, 0, 0.66, 0.16, 0.66],
    [0, 0.17, 0, 0.74, 0.06, 0.74],
    [-0.32, 0.24, 0, 0.06, 0.14, 0.22],
    [0.32, 0.24, 0, 0.06, 0.14, 0.22],
    [0, -0.045, 0, 0.14, 0.12, 0.14],
  ]);
  const topGeometry = boxes([
    [-0.255, 0.31, 0, 0.13, 0.22, 0.59],
    [0.255, 0.31, 0, 0.13, 0.22, 0.59],
    [0, 0.31, -0.255, 0.39, 0.22, 0.13],
    [0, 0.31, 0.255, 0.39, 0.22, 0.13],
  ]);
  const stemGeometry = boxes([
    [0, 0.35, 0, 0.29, 0.1, 0.29],
    [0, 0.47, 0, 0.09, 0.2, 0.3],
    [0, 0.47, 0, 0.3, 0.2, 0.09],
  ]);
  const pinGeometry = boxes([
    [-0.17, -0.055, -0.18, 0.035, 0.18, 0.055],
    [0.18, -0.055, 0.1, 0.035, 0.18, 0.055],
  ]);
  const matrix = new THREE.Matrix4();
  function instances(
    name: string,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
  ) {
    const mesh = new THREE.InstancedMesh(geometry, material, positions.length);
    mesh.name = name;
    positions.forEach((position, index) =>
      mesh.setMatrixAt(
        index,
        matrix.makeTranslation(position.x, position.y, position.z),
      ),
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  instances('switch_bases', baseGeometry, housing);
  const tops = instances('switch_top_housings', topGeometry, housing);
  const stems = instances('switch_cross_stems', stemGeometry, stem);
  instances('switch_contact_pins', pinGeometry, metal);
  return {
    group,
    setColor(nextId: string) {
      const next = switchColors(nextId);
      housing.color.set(next.housing);
      stem.color.set(next.stem);
    },
    separate(open: boolean) {
      tops.position.y = open ? 0.65 : 0;
      stems.position.y = open ? 1.15 : 0;
    },
    dispose() {
      for (const geometry of [
        baseGeometry,
        topGeometry,
        stemGeometry,
        pinGeometry,
      ])
        geometry.dispose();
      for (const material of [housing, stem, metal]) material.dispose();
    },
  };
}

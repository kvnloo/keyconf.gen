import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { sceneUnitsFromMm } from './cad-twin.ts';

/**
 * Cherry MX Series datasheet (MX1A-11NW): 15.6 mm square housing, 11.6 mm of
 * housing above the PCB, 3.6 mm of stem above that for 15.2 mm overall, and
 * 4 mm travel. Cherry publishes the keycap slot rather than the male stem, so
 * the cross is modeled to that 4.1 mm / 1.17 mm figure. Plate cutout is the
 * standard 14 mm. Wall thicknesses and the internal shoulder are proportional,
 * not published, which is why this stays a study rather than a CAD twin.
 */
const mm = sceneUnitsFromMm;

export function switchColors(id: string) {
  const stems: Record<string, string> = {
    'oil-king': '#252927',
    'am-icy-silver': '#c5d0d6',
    'g-pro-3-white': '#f3f0df',
    'g-pro-3-silver': '#9babb2',
    'g-pro-3-red': '#d95048',
    'g-pro-3-yellow': '#e6bd35',
    'g-pro-3-black': '#343c40',
    'g-pro-3-brown': '#986440',
    'g-pro-3-blue': '#477cba',
  };
  return {
    housing:
      id === 'oil-king'
        ? '#3a4240'
        : id === 'am-icy-silver'
          ? '#d7dee3'
          : '#a9b7aa',
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
    [0, mm(2.5), 0, mm(13.9), mm(5), mm(13.9)],
    [0, mm(5), 0, mm(15.6), mm(0.8), mm(15.6)],
    [-mm(7), mm(3), 0, mm(0.8), mm(2.4), mm(4.2)],
    [mm(7), mm(3), 0, mm(0.8), mm(2.4), mm(4.2)],
    [0, -mm(1), 0, mm(4), mm(2), mm(4)],
  ]);
  const topGeometry = boxes([
    [-mm(6.9), mm(8.5), 0, mm(1.8), mm(6.2), mm(15.6)],
    [mm(6.9), mm(8.5), 0, mm(1.8), mm(6.2), mm(15.6)],
    [0, mm(8.5), -mm(6.9), mm(12), mm(6.2), mm(1.8)],
    [0, mm(8.5), mm(6.9), mm(12), mm(6.2), mm(1.8)],
  ]);
  const stemGeometry = boxes([
    [0, mm(10.6), 0, mm(7), mm(2), mm(7)],
    [0, mm(13.4), 0, mm(1.17), mm(3.6), mm(4.1)],
    [0, mm(13.4), 0, mm(4.1), mm(3.6), mm(1.17)],
  ]);
  const pinGeometry = boxes([
    [-mm(3.24), -mm(1.05), -mm(3.43), mm(0.67), mm(3.43), mm(1.05)],
    [mm(3.43), -mm(1.05), mm(1.91), mm(0.67), mm(3.43), mm(1.05)],
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
    separate(progress: number) {
      tops.position.y = progress * 0.65;
      stems.position.y = progress * 1.15;
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

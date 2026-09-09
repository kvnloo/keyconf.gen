import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import layout from '../docs/reference-assets/am-hatsu-layout.json' with { type: 'json' };

/** Original illustrative split; official 4x6 concept without manufacturer CAD. */
export function adaptHatsuModel(model: THREE.Group): void {
  const templates = new Map(
    model.children
      .filter((child) => child.name.startsWith('key_'))
      .map((child) => [child.name.slice(4), child]),
  );
  const capSource = templates.get('KeyA');
  if (!capSource) throw new Error('Missing 1u HATSU cap template: KeyA');
  const keyHeight = capSource.position.y;
  const caps = layout.keys.map((key) => {
    const legendSource = templates.get(key.code);
    const result = new THREE.Group();
    result.name = `key_${key.code}`;
    result.position.set(key.x, keyHeight, -key.y);
    for (const child of capSource.children) {
      if (!child.name.startsWith('legend_')) result.add(child.clone());
    }
    if (legendSource)
      for (const child of legendSource.children) {
        if (child.name.startsWith('legend_')) {
          const legend = child.clone();
          legend.name = `legend_${key.code}`;
          result.add(legend);
        }
      }
    return result;
  });
  while (model.children.length) model.remove(model.children[0]);
  model.add(...caps);
  const caseMat = new THREE.MeshStandardMaterial({
    name: 'case',
    color: '#4a5564',
    metalness: 0.8,
    roughness: 0.33,
  });
  const plateMat = new THREE.MeshStandardMaterial({
    name: 'plate',
    color: '#30343a',
    metalness: 0.4,
    roughness: 0.35,
  });
  const pcbMat = new THREE.MeshStandardMaterial({
    name: 'pcb',
    color: '#0f2e24',
    roughness: 0.65,
  });
  const cases = new THREE.Group();
  cases.name = 'case_bottom';
  const plates = new THREE.Group();
  plates.name = 'plate';
  const pcbs = new THREE.Group();
  pcbs.name = 'pcb';
  for (const half of ['left', 'right'] as const) {
    const centerX = layout.halves[half].centerX;
    const shell = new THREE.Mesh(
      new RoundedBoxGeometry(6.7, 0.42, 4.7, 4, 0.16),
      caseMat,
    );
    shell.name = `case_${half}`;
    shell.position.set(centerX, 0.05, 0);
    cases.add(shell);
    const plate = new THREE.Mesh(
      new RoundedBoxGeometry(6.15, 0.05, 4.15, 2, 0.04),
      plateMat,
    );
    plate.name = `plate_${half}`;
    plate.position.set(centerX, 0.39, 0);
    plates.add(plate);
    const pcb = new THREE.Mesh(
      new RoundedBoxGeometry(6.1, 0.08, 4.1, 2, 0.04),
      pcbMat,
    );
    pcb.name = `pcb_${half}`;
    pcb.position.set(centerX, 0.29, 0);
    pcbs.add(pcb);
  }
  model.add(cases, plates, pcbs);
}

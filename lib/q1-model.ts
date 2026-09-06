import * as THREE from 'three';
import layout from '../docs/reference-assets/keychron-q1-max-layout.json' with { type: 'json' };
import genericLayouts from '../public/models/layouts.json' with { type: 'json' };

/** Original illustrative enclosure; documented ANSI key positions and knob envelope. */
export function adaptQ1MaxModel(model: THREE.Group): void {
  const templates = new Map(
    model.children
      .filter((child) => child.name.startsWith('key_'))
      .map((child) => [child.name.slice(4), child]),
  );
  const caps = layout.keys.map((key) => {
    const sourceCode =
      key.code === 'ControlRight'
        ? 'ControlLeft'
        : key.code === 'Escape'
          ? 'EscapeFn'
          : key.code;
    const source = templates.get(sourceCode);
    const widthTemplate = genericLayouts['75'].find(
      (candidate) => candidate.width === key.width,
    );
    const capSource = widthTemplate && templates.get(widthTemplate.code);
    if (!source || !capSource)
      throw new Error(`Missing Q1 cap template: ${key.code}`);
    const result = new THREE.Group();
    result.name = `key_${key.code}`;
    result.position.set(key.x, source.position.y, -key.y);
    for (const child of capSource.children) {
      if (!child.name.startsWith('legend_')) {
        const cap = child.clone();
        const original = source.children.find(
          (entry) =>
            entry instanceof THREE.Mesh && !entry.name.startsWith('legend_'),
        );
        if (cap instanceof THREE.Mesh && original instanceof THREE.Mesh)
          cap.material = original.material;
        result.add(cap);
      }
    }
    for (const child of source.children) {
      if (child.name.startsWith('legend_')) result.add(child.clone());
    }
    return result;
  });
  for (const key of templates.values()) model.remove(key);
  // Keep the existing original enclosure construction around the wider, deeper layout.
  for (const child of model.children) {
    child.position.x *= 16.25 / 16;
    child.position.z *= 6.5 / 6;
    child.scale.x *= 16.25 / 16;
    child.scale.z *= 6.5 / 6;
  }
  model.add(...caps);
  const radius = 8 / 19.05;
  const height = 14 / 19.05;
  const knob = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, 64),
    new THREE.MeshStandardMaterial({
      color: '#858887',
      metalness: 0.85,
      roughness: 0.3,
    }),
  );
  knob.name = 'control_dial';
  knob.position.set(
    layout.stockEncoder.x,
    0.43 + height / 2,
    -layout.stockEncoder.y,
  );
  model.add(knob);
}

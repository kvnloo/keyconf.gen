import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const cyberboardPanel = {
  rows: 5,
  columns: 40,
  width: 14,
  depth: 1.55,
  y: 0.58,
  z: -3.42,
} as const;

/** Original 75% study plus an illustrative 5x40 panel. Not R2 CAD. */
export function adaptCyberboardR2Model(model: THREE.Group): void {
  if (model.getObjectByName('display_panel')) return;
  const panel = new THREE.Group();
  panel.name = 'display_panel';
  const back = new THREE.Mesh(
    new RoundedBoxGeometry(
      cyberboardPanel.width + 0.18,
      0.08,
      cyberboardPanel.depth + 0.12,
      2,
      0.04,
    ),
    new THREE.MeshStandardMaterial({
      name: 'mod',
      color: '#111114',
      metalness: 0.2,
      roughness: 0.4,
    }),
  );
  back.position.set(0, cyberboardPanel.y, cyberboardPanel.z);
  panel.add(back);
  const pixelW = cyberboardPanel.width / cyberboardPanel.columns;
  const pixelD = cyberboardPanel.depth / cyberboardPanel.rows;
  const pixel = new THREE.BoxGeometry(pixelW * 0.72, 0.03, pixelD * 0.72);
  const glow = new THREE.MeshStandardMaterial({
    name: 'accent',
    color: '#5ce1ff',
    emissive: '#5ce1ff',
    emissiveIntensity: 0.55,
    roughness: 0.35,
  });
  const grid = new THREE.InstancedMesh(
    pixel,
    glow,
    cyberboardPanel.rows * cyberboardPanel.columns,
  );
  grid.name = 'display_pixels';
  const matrix = new THREE.Matrix4();
  let index = 0;
  const originX = -cyberboardPanel.width / 2 + pixelW / 2;
  const originZ = cyberboardPanel.z - cyberboardPanel.depth / 2 + pixelD / 2;
  for (let row = 0; row < cyberboardPanel.rows; row++) {
    for (let column = 0; column < cyberboardPanel.columns; column++) {
      grid.setMatrixAt(
        index++,
        matrix.makeTranslation(
          originX + column * pixelW,
          cyberboardPanel.y + 0.055,
          originZ + row * pixelD,
        ),
      );
    }
  }
  panel.add(grid);
  model.add(panel);
}

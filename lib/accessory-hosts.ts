import type { AccessoryHost } from './build-accessories.ts';
import { isQ1MaxAssembly } from './keyboard-variant.ts';
import layout from '../docs/reference-assets/keychron-q1-max-layout.json' with { type: 'json' };

const source = 'https://www.keychron.com/products/keychron-aluminum-knob';
const q1MaxHost: AccessoryHost = {
  id: 'q1-max-ansi',
  source: layout.source.layoutUrl,
  slots: [{ id: 'stock-knob', kinds: ['knob'], capacity: 1 }],
  keys: layout.keys.map((key) => ({
    id: key.code,
    sizeU: key.width,
    stem: null,
  })),
  claims: [
    {
      productId: 'keychron-aluminum-knob',
      locationId: 'stock-knob',
      aspect: 'mount',
      status: 'confirmed',
      reason:
        'Keychron lists its aluminum replacement knob for Q Max knob versions.',
      source,
    },
    {
      productId: 'keychron-aluminum-knob',
      locationId: 'stock-knob',
      aspect: 'clearance',
      status: 'confirmed',
      reason:
        'Manufacturer compatibility covers replacement of the stock knob cap.',
      source,
    },
  ],
};

export function accessoryHost(
  build: Parameters<typeof isQ1MaxAssembly>[0],
): AccessoryHost | undefined {
  return isQ1MaxAssembly(build) ? q1MaxHost : undefined;
}

export function documentedKeys(build: Parameters<typeof isQ1MaxAssembly>[0]) {
  return isQ1MaxAssembly(build) ? layout.keys : undefined;
}

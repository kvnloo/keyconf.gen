export type AccessoryKind =
  | 'knob'
  | 'encoder'
  | 'screen'
  | 'buttons'
  | 'macropad'
  | 'artisan';
export type AccessoryLocation =
  | { kind: 'embedded'; slotId: string }
  | { kind: 'external'; position: 'left' | 'right' | 'above' }
  | { kind: 'key'; keyId: string };

type ProductInfo = {
  id: string;
  name: string;
  brand: string;
  detail: string;
  source: string;
};
export type AccessoryProduct = ProductInfo &
  (
    | {
        kind: 'artisan';
        placement: 'key';
        sizeU: number;
        stem: 'mx' | 'choc' | null;
      }
    | {
        kind: 'knob' | 'encoder';
        placement: 'embedded';
        sizeU: null;
        stem: null;
      }
    | {
        kind: 'screen' | 'buttons';
        placement: 'embedded' | 'external';
        sizeU: null;
        stem: null;
      }
    | { kind: 'macropad'; placement: 'external'; sizeU: null; stem: null }
  );

export const accessoryCatalog: readonly AccessoryProduct[] = [
  {
    id: 'keychron-aluminum-knob',
    name: 'Aluminum knob',
    brand: 'Keychron',
    kind: 'knob',
    placement: 'embedded',
    sizeU: null,
    stem: null,
    detail:
      'Replacement cap for supported Keychron knob versions. Does not add an encoder to a PCB.',
    source: 'https://www.keychron.com/products/keychron-aluminum-knob',
  },
  {
    id: 'adafruit-377-encoder',
    name: 'Rotary Encoder + Extras',
    brand: 'Adafruit',
    kind: 'encoder',
    placement: 'embedded',
    sizeU: null,
    stem: null,
    detail:
      '24-pulse encoder with push switch and included knob. Requires wiring, mounting and firmware support.',
    source: 'https://www.adafruit.com/product/377',
  },
  {
    id: 'adafruit-326-oled',
    name: '0.96 inch 128×64 OLED module',
    brand: 'Adafruit',
    kind: 'screen',
    placement: 'embedded',
    sizeU: null,
    stem: null,
    detail:
      'Display module for a controller project. Requires enclosure clearance, wiring and a display driver.',
    source: 'https://www.adafruit.com/product/326',
  },
  {
    id: 'adafruit-4980-neokey',
    name: 'NeoKey 1×4 QT button module',
    brand: 'Adafruit',
    kind: 'buttons',
    placement: 'embedded',
    sizeU: null,
    stem: null,
    detail:
      'Four-key I2C PCB. Switches, keycaps and microcontroller are separate; requires a mounting design.',
    source: 'https://www.adafruit.com/product/4980',
  },
  {
    id: 'adafruit-5128-macropad',
    name: 'MacroPad RP2040 starter kit',
    brand: 'Adafruit',
    kind: 'macropad',
    placement: 'external',
    sizeU: null,
    stem: null,
    detail:
      'Separate USB controller kit with 12 keys, encoder and OLED. Assembly and programming required.',
    source: 'https://www.adafruit.com/product/5128',
  },
  ...[1, 2.25, 6.25].map(
    (sizeU): AccessoryProduct => ({
      id: `jelly-key-zen-pond-v-${sizeU}u`,
      name: `Zen Pond V · ${sizeU}u`,
      brand: 'Jelly Key',
      kind: 'artisan',
      placement: 'key',
      sizeU,
      stem: 'mx',
      detail:
        'MX-stem artisan reference. Choose the exact profile and variant with the maker; clearance remains unverified. Historical group buy.',
      source: 'https://www.jellykey.com/artisan-keycaps/zen-pond-v',
    }),
  ),
];

export type AccessorySelection = {
  id: string;
  productId: string;
  quantity: number;
  location: AccessoryLocation;
};

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function identifier(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(value)
  );
}
function parseLocation(value: unknown): AccessoryLocation {
  if (object(value)) {
    if (value.kind === 'embedded' && identifier(value.slotId))
      return { kind: 'embedded', slotId: value.slotId };
    if (value.kind === 'key' && identifier(value.keyId))
      return { kind: 'key', keyId: value.keyId };
    if (
      value.kind === 'external' &&
      (value.position === 'left' ||
        value.position === 'right' ||
        value.position === 'above')
    )
      return { kind: 'external', position: value.position };
  }
  throw new Error('Choose a valid accessory slot, key or desk position.');
}

export function newAccessorySelection(productId: string): AccessorySelection {
  const product = accessoryCatalog.find((item) => item.id === productId);
  if (!product)
    throw new Error('This accessory is not in the product library.');
  const location: AccessoryLocation =
    product.placement === 'key'
      ? { kind: 'key', keyId: 'unassigned' }
      : product.placement === 'embedded'
        ? { kind: 'embedded', slotId: 'unassigned' }
        : { kind: 'external', position: 'right' };
  return { id: crypto.randomUUID(), productId, quantity: 1, location };
}

export function parseAccessories(value: unknown): AccessorySelection[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 100)
    throw new Error('The accessory list is damaged or exceeds 100 selections.');
  const ids = new Set<string>();
  return value.map((item: unknown) => {
    if (
      !object(item) ||
      !identifier(item.id) ||
      ids.has(item.id) ||
      typeof item.quantity !== 'number' ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 100
    )
      throw new Error(
        'Each accessory needs a unique ID and a quantity from 1 to 100.',
      );
    const product = accessoryCatalog.find(
      (entry) => entry.id === item.productId,
    );
    if (!product)
      throw new Error('This accessory is not in the product library.');
    const location = parseLocation(item.location);
    if (location.kind !== product.placement)
      throw new Error('This accessory cannot use that type of placement.');
    if (location.kind === 'key' && item.quantity !== 1)
      throw new Error('Assign each artisan keycap to its own key.');
    ids.add(item.id);
    return {
      id: item.id,
      productId: product.id,
      quantity: item.quantity,
      location,
    };
  });
}

export type AccessoryAspect =
  | 'mount'
  | 'electrical'
  | 'firmware'
  | 'size'
  | 'stem'
  | 'clearance'
  | 'connection';
export type AccessoryClaim = {
  productId: string;
  locationId: string;
  aspect: AccessoryAspect;
  status: 'confirmed' | 'conflict';
  reason: string;
  source: string;
};
export type AccessoryHost = {
  id: string;
  source: string;
  slots:
    | readonly {
        id: string;
        kinds: readonly AccessoryKind[];
        capacity: number;
      }[]
    | null;
  keys:
    | readonly {
        id: string;
        sizeU: number | null;
        stem: 'mx' | 'choc' | null;
      }[]
    | null;
  claims: readonly AccessoryClaim[];
};
export type AccessoryCompatibility = {
  status: 'confirmed' | 'unknown' | 'conflict';
  reasons: string[];
  sources: string[];
};

export function accessoryLocationId(location: AccessoryLocation): string {
  switch (location.kind) {
    case 'embedded':
      return location.slotId;
    case 'external':
      return location.position;
    case 'key':
      return location.keyId;
    default: {
      const unreachable: never = location;
      return unreachable;
    }
  }
}

const requirements: Record<AccessoryKind, readonly AccessoryAspect[]> = {
  knob: ['mount', 'clearance'],
  encoder: ['mount', 'electrical', 'firmware', 'clearance'],
  screen: ['mount', 'electrical', 'firmware', 'clearance'],
  buttons: ['mount', 'electrical', 'firmware', 'clearance'],
  macropad: ['connection', 'firmware'],
  artisan: ['size', 'stem', 'clearance'],
};

export function assessAccessoryCompatibility(
  selection: AccessorySelection,
  host?: AccessoryHost,
): AccessoryCompatibility {
  const product = accessoryCatalog.find(
    (item) => item.id === selection.productId,
  );
  if (!product)
    return {
      status: 'unknown',
      reasons: ['The product specification is missing.'],
      sources: [],
    };
  const locationId = accessoryLocationId(selection.location);
  const conflicts: string[] = [];
  const unknown: string[] = [];
  const confirmed: string[] = [];
  const sources = new Set([product.source]);
  const covered = new Set<AccessoryAspect>();
  if (selection.location.kind !== product.placement)
    conflicts.push('The placement type does not match this accessory.');
  if (locationId === 'unassigned')
    unknown.push('Choose a specific slot or key.');
  if (host) {
    sources.add(host.source);
    if (
      selection.location.kind === 'embedded' &&
      host.slots !== null &&
      locationId !== 'unassigned'
    ) {
      const slot = host.slots.find((entry) => entry.id === locationId);
      if (!slot)
        conflicts.push('This host has no documented slot at that location.');
      else {
        if (!slot.kinds.includes(product.kind))
          conflicts.push('This slot does not accept this accessory type.');
        if (selection.quantity > slot.capacity)
          conflicts.push('The selected quantity exceeds this slot capacity.');
      }
    }
    if (
      selection.location.kind === 'key' &&
      host.keys !== null &&
      locationId !== 'unassigned'
    ) {
      const key = host.keys.find((entry) => entry.id === locationId);
      if (!key)
        conflicts.push('This key is absent from the documented layout.');
      else if (product.kind === 'artisan') {
        if (key.sizeU !== null) {
          covered.add('size');
          if (key.sizeU !== product.sizeU)
            conflicts.push(
              `The ${product.sizeU}u artisan does not fit this ${key.sizeU}u key.`,
            );
          else confirmed.push('The key width matches the listed artisan size.');
        }
        if (key.stem !== null && product.stem !== null) {
          covered.add('stem');
          if (key.stem !== product.stem)
            conflicts.push('The artisan and switch stems differ.');
          else confirmed.push('The documented stem types match.');
        }
      }
    }
    for (const claim of host.claims) {
      if (
        claim.productId !== product.id ||
        claim.locationId !== locationId ||
        locationId === 'unassigned'
      )
        continue;
      if (!claim.source.startsWith('https://') || !claim.reason.trim())
        continue;
      covered.add(claim.aspect);
      sources.add(claim.source);
      (claim.status === 'conflict' ? conflicts : confirmed).push(claim.reason);
    }
  }
  for (const aspect of requirements[product.kind]) {
    if (!covered.has(aspect))
      unknown.push(
        `${aspect[0].toUpperCase()}${aspect.slice(1)} compatibility has not been verified for this location.`,
      );
  }
  return {
    status: conflicts.length
      ? 'conflict'
      : unknown.length
        ? 'unknown'
        : 'confirmed',
    reasons: [...conflicts, ...unknown, ...confirmed],
    sources: [...sources],
  };
}

export function assessAccessories(
  selections: readonly AccessorySelection[],
  host?: AccessoryHost,
): Record<string, AccessoryCompatibility> {
  const results: Record<string, AccessoryCompatibility> = {};
  for (const selection of selections) {
    const result = assessAccessoryCompatibility(selection, host);
    const location = selection.location;
    const locationId = accessoryLocationId(location);
    if (location.kind !== 'external' && locationId !== 'unassigned') {
      const product = accessoryCatalog.find(
        (entry) => entry.id === selection.productId,
      );
      const used = selections
        .filter((other) => {
          const otherProduct = accessoryCatalog.find(
            (entry) => entry.id === other.productId,
          );
          return (
            other.location.kind === location.kind &&
            accessoryLocationId(other.location) === locationId &&
            (otherProduct?.kind === 'knob') === (product?.kind === 'knob')
          );
        })
        .reduce((total, other) => total + other.quantity, 0);
      const capacity =
        location.kind === 'key'
          ? 1
          : host?.slots?.find((slot) => slot.id === locationId)?.capacity;
      if (capacity !== undefined && used > capacity) {
        result.status = 'conflict';
        result.reasons.unshift(
          'Multiple selections exceed the capacity of this location.',
        );
      }
    }
    results[selection.id] = result;
  }
  return results;
}

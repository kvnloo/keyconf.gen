import type { AccessoryProduct } from './build-accessories.ts';
import { accessoryCatalog } from './build-accessories.ts';
import { publicUrl } from './import-products.ts';
import { digestText } from './content-digest.ts';

export type ImportedAccessory = AccessoryProduct & {
  origin: 'import';
  sku: string | null;
  observedAt: string;
  method: string;
  fit: 'unknown';
  geometry: 'unavailable';
};
function text(value: unknown, limit: number): string {
  if (
    typeof value !== 'string' ||
    !value.trim() ||
    value.length > limit ||
    /[\u0000-\u001f\u007f]/.test(value)
  )
    throw new Error('Imported accessory text is missing or invalid.');
  return value.trim();
}
export function parseImportedAccessory(value: unknown): ImportedAccessory {
  if (typeof value !== 'object' || value === null || Array.isArray(value))
    throw new Error('Invalid imported accessory reference.');
  const item: Record<string, unknown> = Object.fromEntries(
    Object.entries(value),
  );
  const id = text(item.id, 120);
  if (!/^import-accessory:[a-f0-9]{64}$/.test(id))
    throw new Error('Imported accessories need their own source identity.');
  if (
    item.origin !== 'import' ||
    item.fit !== 'unknown' ||
    item.geometry !== 'unavailable'
  )
    throw new Error(
      'Imported accessory fit and geometry must remain unverified.',
    );
  const source = publicUrl(text(item.source, 4000)).href;
  const observedAt = text(item.observedAt, 40);
  if (
    !Number.isFinite(Date.parse(observedAt)) ||
    new Date(observedAt).toISOString() !== observedAt
  )
    throw new Error('Invalid accessory observation date.');
  const info = {
    id,
    name: text(item.name, 300),
    brand: text(item.brand, 160),
    detail: text(item.detail, 2000),
    source,
    origin: 'import' as const,
    sku: item.sku === null ? null : text(item.sku, 512),
    observedAt,
    method: text(item.method, 120),
    fit: 'unknown' as const,
    geometry: 'unavailable' as const,
  };
  const kind = item.kind;
  if (kind === 'artisan') {
    if (
      item.placement !== 'key' ||
      (item.sizeU !== null &&
        (typeof item.sizeU !== 'number' ||
          !Number.isFinite(item.sizeU) ||
          item.sizeU <= 0 ||
          item.sizeU > 10)) ||
      (item.stem !== null && item.stem !== 'mx' && item.stem !== 'choc')
    )
      throw new Error('Invalid imported artisan specification.');
    return {
      ...info,
      kind,
      placement: 'key',
      sizeU: item.sizeU,
      stem: item.stem,
    };
  }
  if (item.sizeU !== null || item.stem !== null)
    throw new Error('Module references cannot supply keycap dimensions.');
  if (kind === 'knob' || kind === 'encoder') {
    if (item.placement !== 'embedded')
      throw new Error('Choose an embedded placement for this accessory.');
    return { ...info, kind, placement: 'embedded', sizeU: null, stem: null };
  }
  if (kind === 'macropad') {
    if (item.placement !== 'external')
      throw new Error('A macropad needs an external placement.');
    return { ...info, kind, placement: 'external', sizeU: null, stem: null };
  }
  if (kind === 'screen' || kind === 'buttons') {
    if (item.placement !== 'external' && item.placement !== 'embedded')
      throw new Error('Choose a module placement.');
    return {
      ...info,
      kind,
      placement: item.placement,
      sizeU: null,
      stem: null,
    };
  }
  throw new Error('Choose a supported accessory category.');
}
export function parseCustomAccessories(value: unknown): ImportedAccessory[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 100)
    throw new Error('Choose at most 100 imported accessory references.');
  const products = value.map(parseImportedAccessory);
  if (new Set(products.map((product) => product.id)).size !== products.length)
    throw new Error('Duplicate imported accessory identity.');
  return products;
}
export function resolveAccessoryProducts(
  custom: readonly ImportedAccessory[] = [],
): readonly AccessoryProduct[] {
  return [...accessoryCatalog, ...custom];
}
export async function createImportedAccessory(
  value: Omit<ImportedAccessory, 'id'>,
): Promise<ImportedAccessory> {
  const normalized = parseImportedAccessory({
    ...value,
    id: `import-accessory:${'0'.repeat(64)}`,
  });
  const identity = await digestText(
    JSON.stringify([
      normalized.source,
      normalized.sku,
      normalized.name,
      normalized.kind,
      normalized.placement,
    ]),
  );
  return { ...normalized, id: `import-accessory:${identity}` };
}

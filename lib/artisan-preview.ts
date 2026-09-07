import type { Build } from './build.ts';
import { resolveAccessoryProducts } from './imported-accessories.ts';
import { documentedKeys } from './accessory-hosts.ts';
import layouts from '../public/models/layouts.json' with { type: 'json' };

export function artisanPreviewNote(
  build: Pick<
    Build,
    'layout' | 'selection' | 'accessories' | 'customAccessories'
  >,
  id: string,
): string | null {
  const item = build.accessories.find((entry) => entry.id === id);
  const product = resolveAccessoryProducts(build.customAccessories).find(
    (entry) => entry.id === item?.productId,
  );
  if (!item || item.location.kind !== 'key' || product?.kind !== 'artisan')
    return null;
  if (product.sizeU === null)
    return 'Not shown: the artisan width is unknown. Confirm its size with the maker before choosing a target key.';
  const keyId = item.location.keyId;
  if (keyId === 'unassigned')
    return 'Not shown yet: choose a target key for this artisan.';
  const key = (documentedKeys(build) ?? layouts[build.layout]).find(
    (entry) => entry.code === keyId,
  );
  if (!key)
    return 'Not shown: the target key is absent from this layout. Choose another key.';
  if (key.width !== product.sizeU)
    return `Not shown: this ${product.sizeU}u cap is assigned to a ${key.width}u key. Choose a matching-width key.`;
  if (
    build.accessories.some(
      (other) =>
        other.id !== id &&
        other.location.kind === 'key' &&
        other.location.keyId === keyId,
    )
  )
    return 'Not shown: multiple artisan selections target this key. Move or remove one selection.';
  return 'Assigned to the visual key. The preview is an illustrative sculpt; stem, profile and physical clearance still need verification.';
}

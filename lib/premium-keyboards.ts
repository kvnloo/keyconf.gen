import type { CatalogGeometry } from './cad-twin.ts';

export type KeyboardOffer = {
  amount: number;
  currency: string;
  configuration: string;
  kind: 'complete' | 'kit';
  basis: 'store-listing' | 'historical-launch';
  availability: 'available' | 'sold-out' | 'unknown';
  observedAt: string;
  source: string;
};

export type PremiumKeyboard = {
  id: string;
  brand: string;
  name: string;
  source: string;
  description: string;
  offers: KeyboardOffer[];
  geometry: CatalogGeometry;
};

export type PriceScope = Pick<KeyboardOffer, 'currency' | 'kind' | 'basis'>;

export function comparableOffer(keyboard: PremiumKeyboard, scope: PriceScope) {
  return keyboard.offers
    .filter(
      (offer) =>
        offer.currency === scope.currency &&
        offer.kind === scope.kind &&
        offer.basis === scope.basis &&
        // A price nobody recorded is stored as zero. Ranking that number would
        // publish a free keyboard, so an unrecorded price stays uncomparable.
        offer.amount > 0,
    )
    .reduce<KeyboardOffer | null>(
      (highest, offer) =>
        !highest || offer.amount > highest.amount ? offer : highest,
      null,
    );
}

export function mostExpensiveFirst(
  keyboards: PremiumKeyboard[],
  scope: PriceScope,
) {
  return [...keyboards].sort((a, b) => {
    const left = comparableOffer(a, scope);
    const right = comparableOffer(b, scope);
    if (!left && right) return 1;
    if (left && !right) return -1;
    return (
      (right?.amount ?? 0) - (left?.amount ?? 0) ||
      a.name.localeCompare(b.name) ||
      a.id.localeCompare(b.id)
    );
  });
}

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

/** What the catalog actually covers, so the page can state it instead of implying breadth. */
export type CatalogCoverage = {
  models: number;
  brands: string[];
};

export function catalogCoverage(keyboards: PremiumKeyboard[]): CatalogCoverage {
  return {
    models: keyboards.length,
    brands: [...new Set(keyboards.map((board) => board.brand))].sort((a, b) =>
      a.localeCompare(b),
    ),
  };
}

function evidenceLink(url: string) {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

function nameTokens(name: string) {
  return name.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * A product is admitted only as a distinct model backed by primary evidence.
 * Returns one message per broken rule; an empty list means the catalog holds.
 */
export function admissionFaults(keyboards: PremiumKeyboard[]) {
  const faults: string[] = [];
  const seen = new Set<string>();
  for (const board of keyboards) {
    if (seen.has(board.id)) faults.push(`${board.id}: duplicate id`);
    seen.add(board.id);
    if (!evidenceLink(board.source))
      faults.push(`${board.id}: no primary evidence link`);
    for (const offer of board.offers)
      if (!evidenceLink(offer.source))
        faults.push(
          `${board.id}: offer "${offer.configuration}" has no evidence link`,
        );
  }
  // A colorway or edition is a configuration of one model, not another model.
  // Its name carries the base model's name plus a qualifier, so a name that
  // extends another name of the same brand is a variant filed as a product.
  for (const board of keyboards)
    for (const other of keyboards) {
      if (board.id === other.id || board.brand !== other.brand) continue;
      const base = nameTokens(board.name);
      const longer = nameTokens(other.name);
      if (
        longer.length > base.length &&
        base.every((token, index) => token === longer[index])
      )
        faults.push(
          `${other.id}: "${other.name}" is a variant of "${board.name}"; record it as an offer configuration`,
        );
    }
  return faults;
}

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

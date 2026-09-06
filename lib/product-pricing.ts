export type ProductPrice =
  | { kind: 'unknown' }
  | { kind: 'exact'; amount: string; currency: string }
  | { kind: 'from'; amount: string; currency: string }
  | { kind: 'range'; min: string; max: string; currency: string };

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function amount(value: unknown): string | null {
  const text = typeof value === 'number' ? String(value) : value;
  return typeof text === 'string' && /^\d{1,12}(?:\.\d{1,6})?$/.test(text)
    ? text
    : null;
}
function currency(value: unknown): string | null {
  return typeof value === 'string' && /^[A-Za-z]{3}$/.test(value)
    ? value.toUpperCase()
    : null;
}
export function exactPrice(value: unknown, code: unknown): ProductPrice {
  const money = amount(value),
    unit = currency(code);
  return money !== null && unit
    ? { kind: 'exact', amount: money, currency: unit }
    : { kind: 'unknown' };
}
function offerPrice(value: unknown): ProductPrice {
  if (!record(value)) return { kind: 'unknown' };
  const unit = currency(value.priceCurrency);
  if (!unit) return { kind: 'unknown' };
  if (value.lowPrice !== undefined || value.highPrice !== undefined) {
    const min = amount(value.lowPrice),
      max = amount(value.highPrice);
    if (min === null || (value.highPrice !== undefined && max === null))
      return { kind: 'unknown' };
    if (max === null) return { kind: 'from', amount: min, currency: unit };
    if (Number(min) > Number(max)) return { kind: 'unknown' };
    return { kind: 'range', min, max, currency: unit };
  }
  return exactPrice(value.price, unit);
}
export function offerPricing(offers: unknown[]): ProductPrice {
  const prices = offers.map(offerPrice);
  const first = prices[0];
  if (!first || first.kind === 'unknown') return { kind: 'unknown' };
  let min = first.kind === 'range' ? first.min : first.amount;
  let max = first.kind === 'range' ? first.max : first.amount;
  let open = first.kind === 'from';
  for (const price of prices) {
    if (price.kind === 'unknown' || price.currency !== first.currency)
      return { kind: 'unknown' };
    const low = price.kind === 'range' ? price.min : price.amount;
    const high = price.kind === 'range' ? price.max : price.amount;
    if (Number(low) < Number(min)) min = low;
    if (Number(high) > Number(max)) max = high;
    open ||= price.kind === 'from';
  }
  if (open) return { kind: 'from', amount: min, currency: first.currency };
  if (prices.length === 1) return first;
  return Number(min) === Number(max)
    ? { kind: 'exact', amount: min, currency: first.currency }
    : { kind: 'range', min, max, currency: first.currency };
}
export function isProductPrice(value: unknown): value is ProductPrice {
  if (!record(value)) return false;
  if (value.kind === 'unknown') return true;
  if (
    typeof value.currency !== 'string' ||
    currency(value.currency) !== value.currency
  )
    return false;
  if (value.kind === 'exact' || value.kind === 'from')
    return typeof value.amount === 'string' && amount(value.amount) !== null;
  return (
    value.kind === 'range' &&
    typeof value.min === 'string' &&
    typeof value.max === 'string' &&
    amount(value.min) !== null &&
    amount(value.max) !== null &&
    Number(value.min) <= Number(value.max)
  );
}
export function formatProductPrice(price: ProductPrice): string {
  switch (price.kind) {
    case 'unknown':
      return 'Price unverified';
    case 'exact':
      return price.currency + ' ' + price.amount;
    case 'from':
      return 'From ' + price.currency + ' ' + price.amount;
    case 'range':
      return price.currency + ' ' + price.min + ' to ' + price.max;
    default: {
      const exhaustive: never = price;
      return exhaustive;
    }
  }
}

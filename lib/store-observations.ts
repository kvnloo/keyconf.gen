import snapshot from '../data/store-observations.json' with { type: 'json' };
import { isImportResult } from './import-products.ts';

export const storeSource = snapshot.source;
function pageListings(result: unknown) {
  if (!isImportResult(result) || result.source !== storeSource)
    throw new Error('Invalid store observation snapshot.');
  return result.products.map((product) => ({
    ...product,
    observedAt: result.observedAt,
  }));
}
export const storeListings = snapshot.evidence.flatMap(({ result }) =>
  pageListings(result),
);

import { importEndpoint } from './import-endpoint.ts';
import { parseCatalogSnapshot } from './catalog-snapshot.ts';
import { requestText } from './request-text.ts';
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

export async function loadStoreObservations(
  location: URL,
  signal: AbortSignal,
) {
  try {
    const endpoint = new URL(importEndpoint(location), location);
    endpoint.pathname = '/api/catalog';
    endpoint.searchParams.set('source', storeSource);
    const response = await fetch(endpoint, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
    });
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error('Hosted catalog unavailable.');
    }
    const payload = await requestText(response, 500_000);
    if (payload === null) throw new Error('Hosted catalog is too large.');
    const catalog = await parseCatalogSnapshot(payload);
    if (catalog.source !== storeSource)
      throw new Error('Unexpected catalog source.');
    return {
      origin: 'hosted' as const,
      storeSource,
      storeListings: catalog.listings,
    };
  } catch (error) {
    if (signal.aborted) throw error;
    return { origin: 'bundled' as const, storeSource, storeListings };
  }
}

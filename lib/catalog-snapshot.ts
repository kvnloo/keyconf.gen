import { isImportResult, publicUrl } from './import-products.ts';

export async function snapshotDigest(payload: string) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(payload),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function parseCatalogSnapshot(payload: string) {
  if (new TextEncoder().encode(payload).byteLength > 500_000)
    throw new Error('Catalog snapshot exceeds 500 KB.');
  const value: unknown = JSON.parse(payload);
  if (
    !value ||
    typeof value !== 'object' ||
    !('schemaVersion' in value) ||
    value.schemaVersion !== 1 ||
    !('source' in value) ||
    typeof value.source !== 'string' ||
    publicUrl(value.source).href !== value.source ||
    !('evidence' in value) ||
    !Array.isArray(value.evidence) ||
    value.evidence.length < 1 ||
    value.evidence.length > 100 ||
    !('pages' in value) ||
    value.pages !== value.evidence.length ||
    !('observations' in value)
  )
    throw new Error('Invalid catalog snapshot.');
  let observations = 0;
  const evidence: unknown[] = value.evidence;
  for (const [index, page] of evidence.entries()) {
    if (
      !page ||
      typeof page !== 'object' ||
      !('page' in page) ||
      !('result' in page) ||
      !('sha256' in page) ||
      page.page !== index + 1 ||
      !isImportResult(page.result) ||
      page.result.source !== value.source ||
      !Number.isFinite(Date.parse(page.result.observedAt)) ||
      page.sha256 !== (await snapshotDigest(JSON.stringify(page.result)))
    )
      throw new Error('Catalog page evidence failed verification.');
    observations += page.result.products.length;
  }
  if (observations !== value.observations)
    throw new Error('Catalog observation count does not match its evidence.');
  return {
    id: await snapshotDigest(payload),
    source: value.source,
    payload,
    observations,
    pages: value.pages,
  };
}

import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { parseCatalogSnapshot } from '../lib/catalog-snapshot.ts';

try {
  const { values } = parseArgs({
    options: {
      file: { type: 'string' },
      endpoint: { type: 'string' },
    },
  });
  if (!values.file || !values.endpoint)
    throw new Error(
      'Provide --file SNAPSHOT.json and --endpoint https://SITE/api/catalog.',
    );
  const endpoint = new URL(values.endpoint);
  if (
    endpoint.protocol !== 'https:' ||
    endpoint.username ||
    endpoint.password ||
    endpoint.search ||
    endpoint.hash
  )
    throw new Error(
      'Use an HTTPS catalog endpoint without credentials, query or fragment.',
    );
  const token = process.env.CATALOG_PUBLISH_TOKEN;
  if (!token) throw new Error('Set CATALOG_PUBLISH_TOKEN in the environment.');
  const payload = await readFile(values.file, 'utf8');
  const snapshot = await parseCatalogSnapshot(payload);
  const response = await fetch(endpoint, {
    method: 'PUT',
    redirect: 'error',
    signal: AbortSignal.timeout(30000),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  if (!response.ok)
    throw new Error(`Publication failed with HTTP ${response.status}.`);
  endpoint.searchParams.set('source', snapshot.source);
  const stored = await fetch(endpoint, {
    redirect: 'error',
    signal: AbortSignal.timeout(30000),
  });
  if (!stored.ok || (await stored.text()) !== payload)
    throw new Error(
      'Publication could not be verified against the public reader.',
    );
  console.log(
    JSON.stringify({
      published: snapshot.id,
      source: snapshot.source,
      observations: snapshot.observations,
    }),
  );
} catch (error) {
  console.error(
    error instanceof Error ? error.message : 'Catalog publication failed.',
  );
  process.exitCode = 1;
}

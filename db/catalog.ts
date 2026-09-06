import { env } from 'cloudflare:workers';
import { parseCatalogSnapshot } from '../lib/catalog-snapshot.ts';

declare global {
  // oxlint-disable-next-line typescript/no-namespace -- Workers bindings extend the platform-provided Cloudflare.Env interface.
  namespace Cloudflare {
    interface Env {
      DB: D1Database;
      CATALOG_PUBLISH_TOKEN?: string;
    }
  }
}

export function catalogPublishToken() {
  return env.CATALOG_PUBLISH_TOKEN;
}
export async function publishCatalog(payload: string) {
  const snapshot = await parseCatalogSnapshot(payload);
  await env.DB.batch([
    env.DB.prepare(
      'INSERT INTO catalog_snapshot(id, source, payload, published_at) VALUES(?,?,?,?) ON CONFLICT(id) DO NOTHING',
    ).bind(
      snapshot.id,
      snapshot.source,
      snapshot.payload,
      new Date().toISOString(),
    ),
    env.DB.prepare(
      'INSERT INTO catalog_publication(source, snapshot_id) VALUES(?,?) ON CONFLICT(source) DO UPDATE SET snapshot_id=excluded.snapshot_id',
    ).bind(snapshot.source, snapshot.id),
  ]);
  return {
    id: snapshot.id,
    source: snapshot.source,
    pages: snapshot.pages,
    observations: snapshot.observations,
  };
}
export async function readCatalog(source: string) {
  return env.DB.prepare(
    'SELECT s.payload FROM catalog_publication p JOIN catalog_snapshot s ON s.id=p.snapshot_id WHERE p.source=?',
  )
    .bind(source)
    .first<string>('payload');
}

import { CommunityError, parseCommunityProfile } from '../lib/community.ts';
import {
  parseCollectionRequest,
  type CollectionRequest,
} from '../lib/collection.ts';
import { parsePublicationRequest } from '../lib/publication.ts';

type Database = Pick<D1Database, 'prepare'>;
type Row = {
  id: string;
  metadata: string;
  author: string;
  createdAt: string;
  withdrawnAt: string | null;
  requestDigest: string;
};
type EntryRow = {
  publicationId: string;
  metadata: string;
  author: string;
  publishedAt: string;
};

const projection =
  'c.id, c.metadata, c.author, c.created_at AS createdAt, c.withdrawn_at AS withdrawnAt, c.request_digest AS requestDigest';
const joins =
  'FROM community_collection c JOIN community_account a ON a.id=c.account_id';

function collection(row: Row, entries: readonly EntryRow[]) {
  const metadata = parseCollectionRequest(JSON.parse(row.metadata));
  const author = parseCommunityProfile(JSON.parse(row.author));
  return {
    id: row.id,
    title: metadata.title,
    note: metadata.note,
    author,
    entries: entries.map((entry) => ({
      publicationId: entry.publicationId,
      title: parsePublicationRequest(JSON.parse(entry.metadata)).title,
      author: parseCommunityProfile(JSON.parse(entry.author)),
      publishedAt: entry.publishedAt,
    })),
    createdAt: row.createdAt,
    withdrawnAt: row.withdrawnAt,
  };
}

export type PublicCollection = ReturnType<typeof collection>;

function operationResult(
  row: Row,
  entries: readonly EntryRow[],
  requestDigest: string,
) {
  if (row.requestDigest !== requestDigest)
    throw new CommunityError(
      'operation_conflict',
      'This collection operation was already used for different content.',
      409,
    );
  return row.withdrawnAt === null
    ? collection(row, entries)
    : { id: row.id, withdrawnAt: row.withdrawnAt };
}

async function entriesFor(db: Database, id: string) {
  const { results } = await db
    .prepare(
      `SELECT i.publication_id AS publicationId, p.metadata, p.author, p.published_at AS publishedAt
       FROM community_collection_item i JOIN community_publication p ON p.id=i.publication_id
       WHERE i.collection_id=? AND p.withdrawn_at IS NULL ORDER BY i.position ASC`,
    )
    .bind(id)
    .all<EntryRow>();
  return results;
}

export async function createCollection(
  db: Database,
  subject: string,
  input: CollectionRequest,
) {
  const request = parseCollectionRequest(input);
  const metadata = JSON.stringify(request);
  const digestBytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(metadata),
  );
  const requestDigest = Array.from(new Uint8Array(digestBytes), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  const lookup = () =>
    db
      .prepare(
        `SELECT ${projection} ${joins} WHERE a.subject=? AND c.operation_id=?`,
      )
      .bind(subject, request.operationId)
      .first<Row>();
  const existing = await lookup();
  if (existing)
    return operationResult(
      existing,
      await entriesFor(db, existing.id),
      requestDigest,
    );
  const placeholders = request.publicationIds.map(() => '?').join(',');
  const { results: available } = await db
    .prepare(
      `SELECT id FROM community_publication WHERE id IN (${placeholders}) AND withdrawn_at IS NULL`,
    )
    .bind(...request.publicationIds)
    .all<{ id: string }>();
  if (available.length !== request.publicationIds.length)
    throw new CommunityError(
      'publication_not_found',
      'A published build in this collection is no longer available.',
      404,
    );
  const id = crypto.randomUUID();
  const profile = request.reviewedProfile;
  await db
    .prepare(`INSERT INTO community_collection(id,account_id,operation_id,request_digest,metadata,author,created_at)
    SELECT ?,a.id,?,?,?,json_object('handle',f.handle,'displayName',f.display_name,'bio',f.bio,'links',json(f.links)),?
    FROM community_account a JOIN community_profile f ON f.account_id=a.id
    WHERE a.subject=? ${profile ? 'AND f.handle=? AND f.display_name=? AND f.bio=? AND f.links=?' : ''} ON CONFLICT(account_id,operation_id) DO NOTHING`)
    .bind(
      id,
      request.operationId,
      requestDigest,
      metadata,
      new Date().toISOString(),
      subject,
      ...(profile
        ? [
            profile.handle,
            profile.displayName,
            profile.bio,
            JSON.stringify(profile.links),
          ]
        : []),
    )
    .run();
  const row = await lookup();
  if (!row)
    throw new CommunityError(
      profile ? 'profile_changed' : 'profile_required',
      profile
        ? 'Your creator profile changed. Review it again before saving a collection.'
        : 'Choose your creator profile before saving a collection.',
      409,
    );
  if (row.id === id)
    for (const [position, publicationId] of request.publicationIds.entries())
      await db
        .prepare(
          'INSERT INTO community_collection_item(collection_id,publication_id,position) VALUES(?,?,?) ON CONFLICT DO NOTHING',
        )
        .bind(id, publicationId, position)
        .run();
  return operationResult(row, await entriesFor(db, row.id), requestDigest);
}

export async function readPublicCollection(db: Database, id: string) {
  const row = await db
    .prepare(
      `SELECT ${projection} ${joins} WHERE c.id=? AND c.withdrawn_at IS NULL`,
    )
    .bind(id)
    .first<Row>();
  if (!row)
    throw new CommunityError(
      'collection_not_found',
      'This collection is not available.',
      404,
    );
  return collection(row, await entriesFor(db, id));
}

export async function withdrawCollection(
  db: Database,
  subject: string,
  id: string,
) {
  await db
    .prepare(
      'UPDATE community_collection SET withdrawn_at=COALESCE(withdrawn_at,?) WHERE id=? AND account_id=(SELECT id FROM community_account WHERE subject=?)',
    )
    .bind(new Date().toISOString(), id, subject)
    .run();
  const row = await db
    .prepare(
      'SELECT c.id, c.withdrawn_at AS withdrawnAt FROM community_collection c JOIN community_account a ON a.id=c.account_id WHERE c.id=? AND a.subject=?',
    )
    .bind(id, subject)
    .first<{ id: string; withdrawnAt: string }>();
  if (!row)
    throw new CommunityError(
      'collection_not_found',
      'This collection is not available.',
      404,
    );
  return row;
}

export async function listOwnedCollections(
  db: Database,
  subject: string,
  cursor?: { createdAt: string; id: string },
) {
  if (
    cursor &&
    (!/^[a-zA-Z0-9_-]{16,100}$/.test(cursor.id) ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(cursor.createdAt) ||
      !Number.isFinite(Date.parse(cursor.createdAt)) ||
      new Date(cursor.createdAt).toISOString() !== cursor.createdAt)
  )
    throw new CommunityError(
      'invalid_request',
      'This collection page cursor is invalid.',
      400,
    );
  const where = cursor ? ' AND (created_at<? OR (created_at=? AND id<?))' : '';
  const statement = db.prepare(
    `SELECT id,metadata,created_at AS createdAt,withdrawn_at AS withdrawnAt FROM community_collection WHERE account_id=(SELECT id FROM community_account WHERE subject=?)${where} ORDER BY created_at DESC,id DESC LIMIT 26`,
  );
  const query = cursor
    ? statement.bind(subject, cursor.createdAt, cursor.createdAt, cursor.id)
    : statement.bind(subject);
  const { results } =
    await query.all<
      Pick<Row, 'id' | 'metadata' | 'createdAt' | 'withdrawnAt'>
    >();
  const items = results.slice(0, 25).map((row) => {
    const metadata = parseCollectionRequest(JSON.parse(row.metadata));
    return {
      id: row.id,
      title: metadata.title,
      count: metadata.publicationIds.length,
      createdAt: row.createdAt,
      withdrawnAt: row.withdrawnAt,
    };
  });
  const last = items.at(-1);
  return {
    items,
    next:
      results.length > 25 && last
        ? { createdAt: last.createdAt, id: last.id }
        : null,
  };
}

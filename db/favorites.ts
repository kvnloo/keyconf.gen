import { accountId } from './community.ts';
import { CommunityError } from '../lib/community.ts';
import { parsePublicationRequest } from '../lib/publication.ts';

type Database = Pick<D1Database, 'prepare'>;

export async function addFavorite(
  db: Database,
  subject: string,
  publicationId: string,
) {
  const owner = await accountId(db, subject);
  await db
    .prepare(
      'INSERT INTO community_favorite(account_id,publication_id,created_at) SELECT ?,id,? FROM community_publication WHERE id=? AND withdrawn_at IS NULL ON CONFLICT(account_id,publication_id) DO NOTHING',
    )
    .bind(owner, new Date().toISOString(), publicationId)
    .run();
  const row = await db
    .prepare(
      'SELECT f.publication_id AS publicationId,f.created_at AS createdAt FROM community_favorite f JOIN community_publication p ON p.id=f.publication_id WHERE f.account_id=? AND f.publication_id=? AND p.withdrawn_at IS NULL',
    )
    .bind(owner, publicationId)
    .first<{ publicationId: string; createdAt: string }>();
  if (!row)
    throw new CommunityError(
      'publication_not_found',
      'This published build is not available.',
      404,
    );
  return row;
}

export async function removeFavorite(
  db: Database,
  subject: string,
  publicationId: string,
) {
  await db
    .prepare(
      'DELETE FROM community_favorite WHERE publication_id=? AND account_id=(SELECT id FROM community_account WHERE subject=?)',
    )
    .bind(publicationId, subject)
    .run();
}

export async function listFavorites(
  db: Database,
  subject: string,
  cursor?: { createdAt: string; publicationId: string },
) {
  if (
    cursor &&
    (!/^[a-zA-Z0-9_-]{16,100}$/.test(cursor.publicationId) ||
      !Number.isFinite(Date.parse(cursor.createdAt)) ||
      new Date(cursor.createdAt).toISOString() !== cursor.createdAt)
  )
    throw new CommunityError(
      'invalid_request',
      'This favorites page cursor is invalid.',
      400,
    );
  const where = cursor
    ? ' AND (f.created_at<? OR (f.created_at=? AND f.publication_id<?))'
    : '';
  const statement = db.prepare(
    `SELECT f.publication_id AS publicationId,f.created_at AS createdAt,CASE WHEN p.withdrawn_at IS NULL THEN p.metadata ELSE NULL END AS metadata FROM community_favorite f JOIN community_publication p ON p.id=f.publication_id WHERE f.account_id=(SELECT id FROM community_account WHERE subject=?)${where} ORDER BY f.created_at DESC,f.publication_id DESC LIMIT 26`,
  );
  const query = cursor
    ? statement.bind(
        subject,
        cursor.createdAt,
        cursor.createdAt,
        cursor.publicationId,
      )
    : statement.bind(subject);
  const { results } = await query.all<{
    publicationId: string;
    createdAt: string;
    metadata: string | null;
  }>();
  const items = results
    .slice(0, 25)
    .map(({ publicationId, createdAt, metadata }) => {
      if (metadata === null)
        return { publicationId, createdAt, status: 'unavailable' as const };
      const release = parsePublicationRequest(JSON.parse(metadata));
      return {
        publicationId,
        createdAt,
        status: 'available' as const,
        title: release.title,
        kind: release.kind,
      };
    });
  const last = items.at(-1);
  return {
    items,
    next:
      results.length > 25 && last
        ? { createdAt: last.createdAt, publicationId: last.publicationId }
        : null,
  };
}

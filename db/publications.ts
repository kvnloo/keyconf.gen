import { CommunityError, parseCommunityProfile } from '../lib/community.ts';
import { parseBuild, type Build } from '../lib/build.ts';
import {
  parsePublicationRequest,
  type PublicationRequest,
} from '../lib/publication.ts';

type Database = Pick<D1Database, 'prepare'>;
type Row = {
  id: string;
  metadata: string;
  author: string;
  publishedAt: string;
  withdrawnAt: string | null;
  requestDigest: string;
  payload: string;
  evidence: string;
};
const projection =
  'p.id, p.metadata, p.author, p.published_at AS publishedAt, p.withdrawn_at AS withdrawnAt, p.request_digest AS requestDigest, b.payload, b.evidence';
const joins =
  'FROM community_publication p JOIN community_build b ON b.id=p.build_id AND b.account_id=p.account_id JOIN community_account a ON a.id=p.account_id';

function publication(row: Row) {
  const metadata = parsePublicationRequest(JSON.parse(row.metadata));
  const author = parseCommunityProfile(JSON.parse(row.author));
  const { build, evidence } = restoreSnapshot(row);
  return {
    id: row.id,
    title: metadata.title,
    note: metadata.note,
    release:
      metadata.kind === 'build'
        ? { kind: 'build' as const }
        : {
            kind: 'drop' as const,
            availability: metadata.availability,
            externalUrl: metadata.externalUrl,
          },
    author,
    build: { ...build, name: metadata.title },
    evidence,
    publishedAt: row.publishedAt,
    withdrawnAt: row.withdrawnAt,
  };
}

function restoreSnapshot(row: Pick<Row, 'payload' | 'evidence'>) {
  try {
    const build: Build = parseBuild(JSON.parse(row.payload));
    const evidence: unknown = JSON.parse(row.evidence);
    return { build, evidence };
  } catch {
    throw new CommunityError(
      'saved_build_unavailable',
      'This saved build cannot currently be restored. Its snapshot is retained.',
      422,
    );
  }
}
function operationResult(row: Row, requestDigest: string) {
  if (row.requestDigest !== requestDigest)
    throw new CommunityError(
      'operation_conflict',
      'This publication operation was already used for different content.',
      409,
    );
  return row.withdrawnAt === null
    ? publication(row)
    : { id: row.id, withdrawnAt: row.withdrawnAt };
}

export async function publishBuild(
  db: Database,
  subject: string,
  input: PublicationRequest,
) {
  const request = parsePublicationRequest(input);
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
        `SELECT ${projection} ${joins} WHERE a.subject=? AND p.operation_id=?`,
      )
      .bind(subject, request.operationId)
      .first<Row>();
  const existing = await lookup();
  if (existing) return operationResult(existing, requestDigest);
  const owned = await db
    .prepare(
      'SELECT b.payload,b.evidence FROM community_build b JOIN community_account a ON a.id=b.account_id WHERE b.id=? AND a.subject=?',
    )
    .bind(request.buildId, subject)
    .first<Pick<Row, 'payload' | 'evidence'>>();
  if (!owned)
    throw new CommunityError(
      'build_not_found',
      'This build is not available in your account.',
      404,
    );
  restoreSnapshot(owned);
  await db
    .prepare(`INSERT INTO community_publication(id,account_id,build_id,operation_id,request_digest,metadata,author,published_at)
    SELECT ?,a.id,b.id,?,?,?,json_object('handle',f.handle,'displayName',f.display_name,'bio',f.bio,'links',json(f.links)),?
    FROM community_build b JOIN community_account a ON a.id=b.account_id JOIN community_profile f ON f.account_id=a.id
    WHERE b.id=? AND a.subject=? ON CONFLICT(account_id,operation_id) DO NOTHING`)
    .bind(
      crypto.randomUUID(),
      request.operationId,
      requestDigest,
      metadata,
      new Date().toISOString(),
      request.buildId,
      subject,
    )
    .run();
  const row = await lookup();
  if (row) return operationResult(row, requestDigest);
  throw new CommunityError(
    'profile_required',
    'Choose your creator profile before publishing.',
    409,
  );
}

export async function readPublicPublication(db: Database, id: string) {
  const row = await db
    .prepare(
      `SELECT ${projection} ${joins} WHERE p.id=? AND p.withdrawn_at IS NULL`,
    )
    .bind(id)
    .first<Row>();
  if (!row)
    throw new CommunityError(
      'publication_not_found',
      'This publication is not available.',
      404,
    );
  return publication(row);
}

export async function withdrawPublication(
  db: Database,
  subject: string,
  id: string,
) {
  await db
    .prepare(
      'UPDATE community_publication SET withdrawn_at=COALESCE(withdrawn_at,?) WHERE id=? AND account_id=(SELECT id FROM community_account WHERE subject=?)',
    )
    .bind(new Date().toISOString(), id, subject)
    .run();
  const row = await db
    .prepare(
      'SELECT p.id, p.withdrawn_at AS withdrawnAt FROM community_publication p JOIN community_account a ON a.id=p.account_id WHERE p.id=? AND a.subject=?',
    )
    .bind(id, subject)
    .first<{ id: string; withdrawnAt: string }>();
  if (!row)
    throw new CommunityError(
      'publication_not_found',
      'This publication is not available.',
      404,
    );
  return row;
}

export async function listOwnedPublications(
  db: Database,
  subject: string,
  cursor?: { publishedAt: string; id: string },
) {
  if (
    cursor &&
    (!/^[a-zA-Z0-9_-]{16,100}$/.test(cursor.id) ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(
        cursor.publishedAt,
      ) ||
      !Number.isFinite(Date.parse(cursor.publishedAt)))
  )
    throw new CommunityError(
      'invalid_request',
      'This publication page cursor is invalid.',
      400,
    );
  const where = cursor
    ? ' AND (published_at<? OR (published_at=? AND id<?))'
    : '';
  const statement = db.prepare(
    `SELECT id,metadata,published_at AS publishedAt,withdrawn_at AS withdrawnAt FROM community_publication WHERE account_id=(SELECT id FROM community_account WHERE subject=?)${where} ORDER BY published_at DESC,id DESC LIMIT 26`,
  );
  const query = cursor
    ? statement.bind(subject, cursor.publishedAt, cursor.publishedAt, cursor.id)
    : statement.bind(subject);
  const { results } =
    await query.all<
      Pick<Row, 'id' | 'metadata' | 'publishedAt' | 'withdrawnAt'>
    >();
  const items = results.slice(0, 25).map((row) => {
    const metadata = parsePublicationRequest(JSON.parse(row.metadata));
    return {
      id: row.id,
      title: metadata.title,
      kind: metadata.kind,
      publishedAt: row.publishedAt,
      withdrawnAt: row.withdrawnAt,
    };
  });
  const last = items.at(-1);
  return {
    items,
    next:
      results.length > 25 && last
        ? { publishedAt: last.publishedAt, id: last.id }
        : null,
  };
}

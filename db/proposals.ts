import { CommunityError, parseCommunityProfile } from '../lib/community.ts';
import {
  parseProposalRequest,
  parseProposalRotation,
  type ProposalRequest,
  type ProposalRotation,
} from '../lib/proposal.ts';
import { restoreBuildSnapshot } from './build-snapshot.ts';

type Database = Pick<D1Database, 'prepare'>;
type ReceiptRow = {
  id: string;
  requestDigest: string;
  tokenDigest: string;
  closedAt: string | null;
};
async function digest(value: string) {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
function unavailable() {
  return new CommunityError(
    'proposal_not_found',
    'This proposal is not available.',
    404,
  );
}
function receipt(row: ReceiptRow, requestDigest: string) {
  if (row.requestDigest !== requestDigest)
    throw new CommunityError(
      'operation_conflict',
      'This proposal operation was already used for different content.',
      409,
    );
  return { id: row.id, closedAt: row.closedAt };
}

export async function createProposal(
  db: Database,
  subject: string,
  input: ProposalRequest,
) {
  const request = parseProposalRequest(input);
  const requestDigest = await digest(JSON.stringify(request));
  const lookup = () =>
    db
      .prepare(
        'SELECT p.id,p.request_digest AS requestDigest,p.token_digest AS tokenDigest,p.closed_at AS closedAt FROM community_proposal p JOIN community_account a ON a.id=p.account_id WHERE a.subject=? AND p.operation_id=?',
      )
      .bind(subject, request.operationId)
      .first<ReceiptRow>();
  const existing = await lookup();
  if (existing) return { ...receipt(existing, requestDigest), token: null };
  const owned = await db
    .prepare(
      'SELECT b.payload,b.evidence FROM community_build b JOIN community_account a ON a.id=b.account_id WHERE b.id=? AND a.subject=?',
    )
    .bind(request.buildId, subject)
    .first<{ payload: string; evidence: string }>();
  if (!owned)
    throw new CommunityError(
      'build_not_found',
      'This build is not available in your account.',
      404,
    );
  restoreBuildSnapshot(owned);
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  const tokenDigest = await digest(token);
  await db
    .prepare(`INSERT INTO community_proposal(id,account_id,build_id,operation_id,request_digest,title,brief,author,token_digest,created_at)
    SELECT ?,a.id,b.id,?,?,?,?,json_object('handle',f.handle,'displayName',f.display_name,'bio',f.bio,'links',json(f.links)),?,?
    FROM community_build b JOIN community_account a ON a.id=b.account_id JOIN community_profile f ON f.account_id=a.id
    WHERE b.id=? AND a.subject=? ON CONFLICT(account_id,operation_id) DO NOTHING`)
    .bind(
      crypto.randomUUID(),
      request.operationId,
      requestDigest,
      request.title,
      request.brief,
      tokenDigest,
      new Date().toISOString(),
      request.buildId,
      subject,
    )
    .run();
  const stored = await lookup();
  if (!stored)
    throw new CommunityError(
      'profile_required',
      'Choose your creator name and handle before sharing a proposal.',
      409,
    );
  return {
    ...receipt(stored, requestDigest),
    token:
      stored.tokenDigest === tokenDigest && stored.closedAt === null
        ? token
        : null,
  };
}

export async function readProposalPreview(db: Database, token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) throw unavailable();
  const row = await db
    .prepare(
      'SELECT p.id,p.title,p.brief,p.author,p.created_at AS createdAt,b.payload,b.evidence FROM community_proposal p JOIN community_build b ON b.id=p.build_id AND b.account_id=p.account_id WHERE p.token_digest=? AND p.closed_at IS NULL',
    )
    .bind(await digest(token))
    .first<{
      id: string;
      title: string;
      brief: string;
      author: string;
      createdAt: string;
      payload: string;
      evidence: string;
    }>();
  if (!row) throw unavailable();
  const { build, evidence } = restoreBuildSnapshot(row, true);
  const selected = new Set(Object.values(build.selection));
  return {
    id: row.id,
    title: row.title,
    brief: row.brief,
    author: parseCommunityProfile(JSON.parse(row.author)),
    createdAt: row.createdAt,
    build: {
      ...build,
      name: row.title,
      customParts: build.customParts.filter((part) => selected.has(part.id)),
    },
    evidence,
  };
}

export async function closeProposal(db: Database, subject: string, id: string) {
  await db
    .prepare(
      'UPDATE community_proposal SET closed_at=COALESCE(closed_at,?) WHERE id=? AND account_id=(SELECT id FROM community_account WHERE subject=?)',
    )
    .bind(new Date().toISOString(), id, subject)
    .run();
  const row = await db
    .prepare(
      'SELECT id,closed_at AS closedAt FROM community_proposal WHERE id=? AND account_id=(SELECT id FROM community_account WHERE subject=?)',
    )
    .bind(id, subject)
    .first<{ id: string; closedAt: string }>();
  if (!row) throw unavailable();
  return row;
}

export async function listOwnedProposals(
  db: Database,
  subject: string,
  cursor?: { createdAt: string; id: string },
) {
  if (
    cursor &&
    (!/^[a-zA-Z0-9_-]{16,100}$/.test(cursor.id) ||
      !Number.isFinite(Date.parse(cursor.createdAt)) ||
      new Date(cursor.createdAt).toISOString() !== cursor.createdAt)
  )
    throw new CommunityError(
      'invalid_request',
      'This proposal page cursor is invalid.',
      400,
    );
  const where = cursor ? ' AND (created_at<? OR (created_at=? AND id<?))' : '';
  const statement = db.prepare(
    `SELECT id,title,created_at AS createdAt,closed_at AS closedAt,token_version AS tokenVersion FROM community_proposal WHERE account_id=(SELECT id FROM community_account WHERE subject=?)${where} ORDER BY created_at DESC,id DESC LIMIT 26`,
  );
  const query = cursor
    ? statement.bind(subject, cursor.createdAt, cursor.createdAt, cursor.id)
    : statement.bind(subject);
  const { results } = await query.all<{
    id: string;
    title: string;
    createdAt: string;
    closedAt: string | null;
    tokenVersion: number;
  }>();
  const items = results.slice(0, 25);
  const last = items.at(-1);
  return {
    items,
    next:
      results.length > 25 && last
        ? { createdAt: last.createdAt, id: last.id }
        : null,
  };
}

export async function rotateProposalLink(
  db: Database & Pick<D1Database, 'batch'>,
  subject: string,
  input: ProposalRotation,
) {
  const request = parseProposalRotation(input);
  const targetVersion = request.expectedVersion + 1;
  const lookup = () =>
    db
      .prepare(`SELECT p.id,p.closed_at AS closedAt,p.token_version AS currentVersion,p.token_digest AS currentDigest,r.version,r.token_digest AS issuedDigest
    FROM community_proposal_rotation r JOIN community_proposal p ON p.id=r.proposal_id JOIN community_account a ON a.id=p.account_id
    WHERE p.id=? AND r.operation_id=? AND a.subject=?`)
      .bind(request.proposalId, request.operationId, subject)
      .first<{
        id: string;
        closedAt: string | null;
        currentVersion: number;
        currentDigest: string;
        version: number;
        issuedDigest: string;
      }>();
  function result(
    row: NonNullable<Awaited<ReturnType<typeof lookup>>>,
    candidate: { token: string; hash: string } | null,
  ) {
    if (row.version !== targetVersion)
      throw new CommunityError(
        'operation_conflict',
        'This link operation was already used for a different version.',
        409,
      );
    return {
      id: row.id,
      tokenVersion: row.currentVersion,
      closedAt: row.closedAt,
      token:
        candidate &&
        row.closedAt === null &&
        row.currentVersion === row.version &&
        row.currentDigest === candidate.hash &&
        row.issuedDigest === candidate.hash
          ? candidate.token
          : null,
    };
  }
  const existing = await lookup();
  if (existing) return result(existing, null);
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  const hash = await digest(token);
  await db.batch([
    db
      .prepare(`INSERT INTO community_proposal_rotation(proposal_id,operation_id,version,token_digest,created_at)
      SELECT p.id,?,?,?,? FROM community_proposal p JOIN community_account a ON a.id=p.account_id
      WHERE p.id=? AND a.subject=? AND p.closed_at IS NULL AND p.token_version=? ON CONFLICT(proposal_id,operation_id) DO NOTHING`)
      .bind(
        request.operationId,
        targetVersion,
        hash,
        new Date().toISOString(),
        request.proposalId,
        subject,
        request.expectedVersion,
      ),
    db
      .prepare(`UPDATE community_proposal SET token_digest=(SELECT r.token_digest FROM community_proposal_rotation r WHERE r.proposal_id=community_proposal.id AND r.operation_id=? AND r.version=?),token_version=?
      WHERE id=? AND account_id=(SELECT id FROM community_account WHERE subject=?) AND closed_at IS NULL AND token_version=?
      AND EXISTS(SELECT 1 FROM community_proposal_rotation r WHERE r.proposal_id=community_proposal.id AND r.operation_id=? AND r.version=?)`)
      .bind(
        request.operationId,
        targetVersion,
        targetVersion,
        request.proposalId,
        subject,
        request.expectedVersion,
        request.operationId,
        targetVersion,
      ),
  ]);
  const stored = await lookup();
  if (stored) return result(stored, { token, hash });
  const owned = await db
    .prepare(
      'SELECT closed_at AS closedAt FROM community_proposal WHERE id=? AND account_id=(SELECT id FROM community_account WHERE subject=?)',
    )
    .bind(request.proposalId, subject)
    .first<{ closedAt: string | null }>();
  if (!owned || owned.closedAt !== null) throw unavailable();
  throw new CommunityError(
    'operation_conflict',
    'This proposal link has changed. Refresh before replacing it.',
    409,
  );
}

import { digestText } from '../lib/content-digest.ts';
import {
  CommunityError,
  parseCommunityProfile,
  parseSaveBuildRequest,
} from '../lib/community.ts';
import {
  parseProposalResponse,
  type ProposalResponseRequest,
} from '../lib/proposal.ts';
import { restoreBuildSnapshot, snapshotEvidence } from './build-snapshot.ts';

type Database = Pick<D1Database, 'prepare'>;
type Receipt = {
  id: string;
  proposalId: string;
  createdAt: string;
  requestDigest: string;
};
function unavailable() {
  return new CommunityError(
    'proposal_not_found',
    'This proposal link is not available for new responses.',
    404,
  );
}
function receipt(row: Receipt, expected: string) {
  if (row.requestDigest !== expected)
    throw new CommunityError(
      'operation_conflict',
      'This response operation was already used for different content.',
      409,
    );
  return { id: row.id, proposalId: row.proposalId, createdAt: row.createdAt };
}

export async function submitProposalResponse(
  db: Database,
  subject: string,
  token: string,
  input: ProposalResponseRequest,
) {
  if (!/^[a-f0-9]{64}$/.test(token)) throw unavailable();
  const tokenDigest = await digestText(token);
  const proposalId = await db
    .prepare(
      'SELECT id FROM community_proposal WHERE token_digest=? AND closed_at IS NULL',
    )
    .bind(tokenDigest)
    .first<string>('id');
  if (!proposalId) throw unavailable();
  const request = parseProposalResponse(input);
  const payload = JSON.stringify(request.build);
  const requestDigest = await digestText(
    JSON.stringify({ build: request.build, note: request.note }),
  );
  const lookup = () =>
    db
      .prepare(
        'SELECT r.id,r.proposal_id AS proposalId,r.created_at AS createdAt,r.request_digest AS requestDigest FROM community_proposal_response r JOIN community_account a ON a.id=r.account_id WHERE r.proposal_id=? AND a.subject=? AND r.operation_id=?',
      )
      .bind(proposalId, subject, request.operationId)
      .first<Receipt>();
  const existing = await lookup();
  if (existing) return receipt(existing, requestDigest);
  const profile = await db
    .prepare(
      'SELECT f.account_id FROM community_profile f JOIN community_account a ON a.id=f.account_id WHERE a.subject=?',
    )
    .bind(subject)
    .first();
  if (!profile)
    throw new CommunityError(
      'profile_required',
      'Choose your name and handle before sending a response.',
      409,
    );
  const { build } = parseSaveBuildRequest(request);
  const evidence = await snapshotEvidence(build);
  await db
    .prepare(`INSERT INTO community_proposal_response(id,proposal_id,account_id,operation_id,request_digest,payload,evidence,note,author,link_version,created_at)
    SELECT ?,p.id,a.id,?,?,?,?,?,json_object('handle',f.handle,'displayName',f.display_name,'bio',f.bio,'links',json(f.links)),p.token_version,?
    FROM community_proposal p JOIN community_account a ON a.subject=? JOIN community_profile f ON f.account_id=a.id
    WHERE p.id=? AND p.token_digest=? AND p.closed_at IS NULL ON CONFLICT(proposal_id,account_id,operation_id) DO NOTHING`)
    .bind(
      crypto.randomUUID(),
      request.operationId,
      requestDigest,
      payload,
      evidence,
      request.note,
      new Date().toISOString(),
      subject,
      proposalId,
      tokenDigest,
    )
    .run();
  const stored = await lookup();
  if (!stored) throw unavailable();
  return receipt(stored, requestDigest);
}

export async function readProposalResponse(
  db: Database,
  subject: string,
  id: string,
) {
  const row = await db
    .prepare(`SELECT r.id,r.proposal_id AS proposalId,r.payload,r.evidence,r.note,r.author,r.link_version AS linkVersion,r.created_at AS createdAt
    FROM community_proposal_response r JOIN community_proposal p ON p.id=r.proposal_id JOIN community_account viewer ON viewer.subject=?
    WHERE r.id=? AND (viewer.id=r.account_id OR viewer.id=p.account_id)`)
    .bind(subject, id)
    .first<{
      id: string;
      proposalId: string;
      payload: string;
      evidence: string;
      note: string;
      author: string;
      linkVersion: number;
      createdAt: string;
    }>();
  if (!row)
    throw new CommunityError(
      'response_not_found',
      'This response is not available in your account.',
      404,
    );
  const snapshot = restoreBuildSnapshot(row, true);
  return {
    id: row.id,
    proposalId: row.proposalId,
    note: row.note,
    author: parseCommunityProfile(JSON.parse(row.author)),
    linkVersion: row.linkVersion,
    createdAt: row.createdAt,
    ...snapshot,
  };
}

export async function listProposalResponses(
  db: Database,
  subject: string,
  proposalId: string,
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
      'This response page cursor is invalid.',
      400,
    );
  const where = cursor
    ? ' AND (r.created_at<? OR (r.created_at=? AND r.id<?))'
    : '';
  const statement = db.prepare(
    `SELECT r.id,r.author,r.link_version AS linkVersion,r.created_at AS createdAt FROM community_proposal_response r JOIN community_proposal p ON p.id=r.proposal_id JOIN community_account viewer ON viewer.subject=? WHERE p.id=? AND (viewer.id=p.account_id OR viewer.id=r.account_id)${where} ORDER BY r.created_at DESC,r.id DESC LIMIT 26`,
  );
  const query = cursor
    ? statement.bind(
        subject,
        proposalId,
        cursor.createdAt,
        cursor.createdAt,
        cursor.id,
      )
    : statement.bind(subject, proposalId);
  const { results } = await query.all<{
    id: string;
    author: string;
    linkVersion: number;
    createdAt: string;
  }>();
  const items = results
    .slice(0, 25)
    .map((row) => ({
      id: row.id,
      author: parseCommunityProfile(JSON.parse(row.author)),
      linkVersion: row.linkVersion,
      createdAt: row.createdAt,
    }));
  const last = items.at(-1);
  return {
    items,
    next:
      results.length > 25 && last
        ? { createdAt: last.createdAt, id: last.id }
        : null,
  };
}

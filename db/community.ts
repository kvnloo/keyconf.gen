import { parseBuild } from '../lib/build.ts';
import { accessoryHost } from '../lib/accessory-hosts.ts';
import { catalog, categories, checkBuild } from '../lib/catalog.ts';
import {
  accessoryCatalog,
  assessAccessories,
} from '../lib/build-accessories.ts';
import { soundPacks } from '../lib/sound-packs.ts';
import {
  CommunityError,
  parseCommunityProfile,
  type CommunityProfile,
  type SaveBuildRequest,
  type SavedBuild,
  type SavedBuildSummary,
} from '../lib/community.ts';

type Database = Pick<D1Database, 'prepare'>;

async function accountId(db: Database, subject: string): Promise<string> {
  await db
    .prepare(
      'INSERT INTO community_account(id, subject, created_at) VALUES(?,?,?) ON CONFLICT(subject) DO NOTHING',
    )
    .bind(crypto.randomUUID(), subject, new Date().toISOString())
    .run();
  const id = await db
    .prepare('SELECT id FROM community_account WHERE subject=?')
    .bind(subject)
    .first<string>('id');
  if (!id) throw new Error('Account was not stored.');
  return id;
}

export async function readProfile(
  db: Database,
  subject: string,
): Promise<CommunityProfile | null> {
  const row = await db
    .prepare(
      'SELECT p.handle, p.display_name AS displayName, p.bio, p.links FROM community_profile p JOIN community_account a ON a.id=p.account_id WHERE a.subject=?',
    )
    .bind(subject)
    .first<Omit<CommunityProfile, 'links'> & { links: string }>();
  return row
    ? parseCommunityProfile({ ...row, links: JSON.parse(row.links) })
    : null;
}

export async function saveProfile(
  db: Database,
  subject: string,
  profile: CommunityProfile,
): Promise<CommunityProfile> {
  const owner = await accountId(db, subject);
  try {
    await db
      .prepare(
        'INSERT INTO community_profile(account_id, handle, display_name, bio, links) VALUES(?,?,?,?,?) ON CONFLICT(account_id) DO UPDATE SET handle=excluded.handle, display_name=excluded.display_name, bio=excluded.bio, links=excluded.links',
      )
      .bind(
        owner,
        profile.handle,
        profile.displayName,
        profile.bio,
        JSON.stringify(profile.links),
      )
      .run();
  } catch (error) {
    if (
      error instanceof Error &&
      /UNIQUE constraint failed: community_profile.handle/.test(error.message)
    ) {
      throw new CommunityError(
        'handle_taken',
        'That handle is already taken. Choose another.',
        409,
      );
    }
    throw error;
  }
  return profile;
}

export async function listBuilds(
  db: Database,
  subject: string,
): Promise<SavedBuildSummary[]> {
  const result = await db
    .prepare(
      'SELECT id, name, created_at AS createdAt FROM community_build WHERE account_id=(SELECT id FROM community_account WHERE subject=?) ORDER BY created_at DESC, id DESC LIMIT 100',
    )
    .bind(subject)
    .all<SavedBuildSummary>();
  return result.results;
}

type StoredBuild = SavedBuildSummary & { payload: string };

function savedBuild(row: StoredBuild): SavedBuild {
  try {
    return {
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
      build: parseBuild(JSON.parse(row.payload)),
    };
  } catch {
    throw new CommunityError(
      'saved_build_unavailable',
      'This saved build uses parts or settings that are no longer supported. Its original snapshot is still saved.',
      422,
    );
  }
}

export async function readBuild(
  db: Database,
  subject: string,
  id: string,
): Promise<SavedBuild> {
  const row = await db
    .prepare(
      'SELECT b.id, b.name, b.payload, b.created_at AS createdAt FROM community_build b JOIN community_account a ON a.id=b.account_id WHERE b.id=? AND a.subject=?',
    )
    .bind(id, subject)
    .first<StoredBuild>();
  if (!row)
    throw new CommunityError(
      'build_not_found',
      'This build is not available in your account.',
      404,
    );
  return savedBuild(row);
}

async function digest(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function saveBuild(
  db: Database,
  subject: string,
  request: SaveBuildRequest,
): Promise<SavedBuild> {
  const owner = await accountId(db, subject);
  const { build, operationId } = request;
  const payload = JSON.stringify(build);
  const requestDigest = await digest(payload);
  const parts = [...catalog, ...build.customParts];
  const recording =
    soundPacks.find((pack) => pack.id === build.audio.source) ?? null;
  const evidence = JSON.stringify({
    version: 1,
    catalogDigest: await digest(JSON.stringify(catalog)),
    components: categories.map((category) =>
      parts.find((part) => part.id === build.selection[category]),
    ),
    compatibility: checkBuild(build.selection, parts, build.layout),
    accessoryReferences: accessoryCatalog.filter((product) =>
      build.accessories.some((accessory) => accessory.productId === product.id),
    ),
    accessoryCompatibility: assessAccessories(
      build.accessories,
      accessoryHost(build),
    ),
    sound: {
      ...build.audio,
      accuracy: recording
        ? 'recorded switch reference; full build match unverified'
        : 'synthesized approximation',
      recording,
    },
  });
  await db
    .prepare(
      'INSERT INTO community_build(id, account_id, operation_id, request_digest, name, payload, evidence, created_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(account_id, operation_id) DO NOTHING',
    )
    .bind(
      crypto.randomUUID(),
      owner,
      operationId,
      requestDigest,
      build.name,
      payload,
      evidence,
      new Date().toISOString(),
    )
    .run();
  const row = await db
    .prepare(
      'SELECT id, name, payload, request_digest AS requestDigest, created_at AS createdAt FROM community_build WHERE account_id=? AND operation_id=?',
    )
    .bind(owner, operationId)
    .first<StoredBuild & { requestDigest: string }>();
  if (!row) throw new Error('Build was not stored.');
  if (row.requestDigest !== requestDigest)
    throw new CommunityError(
      'operation_conflict',
      'This save ID was already used for a different build. Save the current draft as a new copy.',
      409,
    );
  return savedBuild(row);
}

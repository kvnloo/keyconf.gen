import {
  CommunityError,
  parseCommunityProfile,
  parseSaveBuildRequest,
  parseSavedBuild,
  parseSavedBuildSummaries,
  type CommunityErrorCode,
  type CommunityProfile,
  type SaveBuildRequest,
  type SavedBuildSummary,
} from './community.ts';
import { requestText } from './request-text.ts';
import { parseBuildSnapshot } from './build.ts';
import { parsePublicBuildEvidence } from './build-evidence.ts';
import {
  parsePublicationRequest,
  type PublicationRequest,
} from './publication.ts';
import type { PublicPublication } from '../db/publications.ts';

export type SavedBuildCursor = Pick<SavedBuildSummary, 'createdAt' | 'id'>;
export type SavedBuildPage = {
  items: SavedBuildSummary[];
  next: SavedBuildCursor | null;
};
export type CommunityRequestOptions = { signal?: AbortSignal };
type ClientErrorCode =
  | CommunityErrorCode
  | 'invalid_response'
  | 'network_error'
  | 'timeout';

export class CommunityClientError extends Error {
  readonly code: ClientErrorCode;
  readonly status: number;
  constructor(code: ClientErrorCode, message: string, status = 0) {
    super(message);
    this.name = 'CommunityClientError';
    this.code = code;
    this.status = status;
  }
}

const serverErrors = [
  [
    'authentication_required',
    'Sign in to use your account. Your device draft is safe.',
  ],
  ['invalid_origin', 'Open your account on this Keyconf site and try again.'],
  ['invalid_request', 'Review the account details and try again.'],
  [
    'request_too_large',
    'This save is too large. Export your build to keep a copy.',
  ],
  ['handle_taken', 'That handle is already taken. Choose another.'],
  [
    'operation_conflict',
    'This save ID was already used for different content. Save the current draft as a new copy.',
  ],
  ['build_not_found', 'This build is not available in your account.'],
  ['publication_not_found', 'This publication is not available.'],
  ['proposal_not_found', 'This proposal is not available.'],
  ['response_not_found', 'This response is not available.'],
  ['profile_required', 'Choose your profile before continuing.'],
  [
    'saved_build_unavailable',
    'This saved build uses unsupported parts or settings. Its snapshot is still saved.',
  ],
  [
    'storage_unavailable',
    'Your account could not be reached. Your device draft is safe. Try again.',
  ],
] satisfies [CommunityErrorCode, string][];

function object(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
function unreadable() {
  return new CommunityClientError(
    'invalid_response',
    'The account response could not be read. Try again.',
  );
}
function cursor(value: unknown): SavedBuildCursor {
  if (
    !object(value) ||
    typeof value.id !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) ||
    typeof value.createdAt !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value.createdAt) ||
    !Number.isFinite(Date.parse(value.createdAt)) ||
    new Date(value.createdAt).toISOString() !== value.createdAt
  )
    throw unreadable();
  return { id: value.id, createdAt: value.createdAt };
}
function older(left: SavedBuildCursor, right: SavedBuildCursor) {
  return (
    left.createdAt < right.createdAt ||
    (left.createdAt === right.createdAt && left.id < right.id)
  );
}

export function parseSavedBuildPage(value: unknown): SavedBuildPage {
  try {
    if (
      !object(value) ||
      !Array.isArray(value.items) ||
      value.items.length > 25
    )
      throw unreadable();
    const items = parseSavedBuildSummaries(value.items);
    for (const [index, item] of items.entries()) {
      cursor(item);
      if (index > 0 && !older(item, items[index - 1])) throw unreadable();
    }
    if (new Set(items.map((item) => item.id)).size !== items.length)
      throw unreadable();
    const next = value.next === null ? null : cursor(value.next);
    const last = items.at(-1);
    if (
      next &&
      (!last || next.id !== last.id || next.createdAt !== last.createdAt)
    )
      throw unreadable();
    return { items, next };
  } catch {
    throw unreadable();
  }
}

export type FavoriteCursor = { publicationId: string; createdAt: string };
export type FavoriteItem = FavoriteCursor &
  (
    | { status: 'unavailable' }
    | { status: 'available'; title: string; kind: 'build' | 'drop' }
  );
export type FavoritePage = {
  items: FavoriteItem[];
  next: FavoriteCursor | null;
};

function favoriteCursor(value: unknown): FavoriteCursor {
  if (!object(value)) throw unreadable();
  const parsed = cursor({
    id: value.publicationId,
    createdAt: value.createdAt,
  });
  return { publicationId: parsed.id, createdAt: parsed.createdAt };
}
function olderFavorite(left: FavoriteCursor, right: FavoriteCursor) {
  return older(
    { id: left.publicationId, createdAt: left.createdAt },
    { id: right.publicationId, createdAt: right.createdAt },
  );
}
export function parseFavoritePage(value: unknown): FavoritePage {
  if (!object(value) || !Array.isArray(value.items) || value.items.length > 25)
    throw unreadable();
  const items = value.items.map((item): FavoriteItem => {
    const key = favoriteCursor(item);
    if (!object(item)) throw unreadable();
    if (item.status === 'unavailable') return { ...key, status: 'unavailable' };
    if (
      item.status !== 'available' ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.length > 80 ||
      (item.kind !== 'build' && item.kind !== 'drop')
    )
      throw unreadable();
    return { ...key, status: 'available', title: item.title, kind: item.kind };
  });
  for (const [index, item] of items.entries())
    if (index > 0 && !olderFavorite(item, items[index - 1])) throw unreadable();
  if (new Set(items.map((item) => item.publicationId)).size !== items.length)
    throw unreadable();
  const next = value.next === null ? null : favoriteCursor(value.next);
  const last = items.at(-1);
  if (
    next &&
    (!last ||
      next.publicationId !== last.publicationId ||
      next.createdAt !== last.createdAt)
  )
    throw unreadable();
  return { items, next };
}

export type PublicationCursor = Pick<PublicPublication, 'id' | 'publishedAt'>;
export type OwnedPublicationSummary = PublicationCursor &
  Pick<PublicPublication, 'title' | 'withdrawnAt'> & {
    kind: PublicationRequest['kind'];
  };
export type OwnedPublicationPage = {
  items: OwnedPublicationSummary[];
  next: PublicationCursor | null;
};
export type PublicationWithdrawal = { id: string; withdrawnAt: string };
export type PublicationReceipt =
  | ({ status: 'published' } & Pick<
      PublicPublication,
      'id' | 'publishedAt' | 'title' | 'note' | 'release' | 'author'
    >)
  | ({ status: 'withdrawn' } & PublicationWithdrawal);

function publicationCursor(value: unknown): PublicationCursor {
  if (!object(value)) throw unreadable();
  const parsed = cursor({ id: value.id, createdAt: value.publishedAt });
  return { id: parsed.id, publishedAt: parsed.createdAt };
}
function olderPublication(left: PublicationCursor, right: PublicationCursor) {
  return older(
    { id: left.id, createdAt: left.publishedAt },
    { id: right.id, createdAt: right.publishedAt },
  );
}
function publicationWithdrawal(value: unknown): PublicationWithdrawal {
  if (!object(value)) throw unreadable();
  const parsed = cursor({ id: value.id, createdAt: value.withdrawnAt });
  return { id: parsed.id, withdrawnAt: parsed.createdAt };
}
export function parseOwnedPublicationPage(
  value: unknown,
): OwnedPublicationPage {
  if (!object(value) || !Array.isArray(value.items) || value.items.length > 25)
    throw unreadable();
  const items = value.items.map((item): OwnedPublicationSummary => {
    const key = publicationCursor(item);
    if (
      !object(item) ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.length > 80 ||
      /\p{Cc}/u.test(item.title) ||
      (item.kind !== 'build' && item.kind !== 'drop')
    )
      throw unreadable();
    const withdrawnAt =
      item.withdrawnAt === null
        ? null
        : publicationWithdrawal(item).withdrawnAt;
    return { ...key, title: item.title, kind: item.kind, withdrawnAt };
  });
  for (const [index, item] of items.entries())
    if (index > 0 && !olderPublication(item, items[index - 1]))
      throw unreadable();
  if (new Set(items.map((item) => item.id)).size !== items.length)
    throw unreadable();
  const next = value.next === null ? null : publicationCursor(value.next);
  const last = items.at(-1);
  if (
    next &&
    (!last || next.id !== last.id || next.publishedAt !== last.publishedAt)
  )
    throw unreadable();
  return { items, next };
}

function publicationReceipt(
  value: unknown,
  request: PublicationRequest,
): PublicationReceipt {
  if (
    !object(value) ||
    value.operationId !== request.operationId ||
    value.buildId !== request.buildId
  )
    throw unreadable();
  if (value.withdrawnAt !== null)
    return { status: 'withdrawn', ...publicationWithdrawal(value) };
  const key = publicationCursor(value);
  if (
    value.title !== request.title ||
    value.note !== request.note ||
    !object(value.release) ||
    value.release.kind !== request.kind ||
    (request.kind === 'drop' &&
      (value.release.availability !== request.availability ||
        value.release.externalUrl !== request.externalUrl)) ||
    (value.customization !== 'available' &&
      value.customization !== 'unavailable')
  )
    throw unreadable();
  const build = parseBuildSnapshot(value.build);
  if (build.name !== request.title) throw unreadable();
  parsePublicBuildEvidence(value.evidence, build);
  return {
    status: 'published',
    ...key,
    title: request.title,
    note: request.note,
    release:
      request.kind === 'build'
        ? { kind: 'build' }
        : {
            kind: 'drop',
            availability: request.availability,
            externalUrl: request.externalUrl,
          },
    author: parseCommunityProfile(value.author),
  };
}

function profileResponse(value: unknown) {
  if (!object(value) || !('profile' in value)) throw unreadable();
  return value.profile === null ? null : parseCommunityProfile(value.profile);
}

function input<T>(parse: () => T): T {
  try {
    return parse();
  } catch (error) {
    if (error instanceof CommunityError)
      throw new CommunityClientError(error.code, error.message, error.status);
    throw new CommunityClientError(
      'invalid_request',
      'Review the account request and try again.',
      400,
    );
  }
}

export function createCommunityClient({
  fetch: fetcher = globalThis.fetch,
  timeoutMs = 15000,
}: {
  fetch?: typeof globalThis.fetch;
  timeoutMs?: number;
} = {}) {
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000)
    throw new Error(
      'Use an account request timeout between 1 and 60000 milliseconds.',
    );

  async function send<T>(
    path: string,
    method: 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE',
    parse: (value: unknown) => T,
    options: CommunityRequestOptions,
    body?: unknown,
  ): Promise<T> {
    options.signal?.throwIfAborted();
    const timeout = new AbortController();
    const timer = setTimeout(() => timeout.abort(), timeoutMs);
    const signal = options.signal
      ? AbortSignal.any([options.signal, timeout.signal])
      : timeout.signal;
    try {
      const response = await fetcher(path, {
        method,
        credentials: 'same-origin',
        cache: 'no-store',
        redirect: 'error',
        signal,
        headers: {
          Accept: 'application/json',
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
      const text = await requestText(response, response.ok ? 256 * 1024 : 4096);
      signal.throwIfAborted();
      let value: unknown;
      if (
        text !== null &&
        response.headers
          .get('content-type')
          ?.split(';')[0]
          .trim()
          .toLowerCase() === 'application/json'
      ) {
        try {
          value = JSON.parse(text);
        } catch {
          value = undefined;
        }
      }
      if (!response.ok) {
        const code =
          response.status === 401
            ? 'authentication_required'
            : object(value) && object(value.error)
              ? value.error.code
              : undefined;
        const known = serverErrors.find(([candidate]) => candidate === code);
        throw new CommunityClientError(
          known?.[0] ?? 'storage_unavailable',
          known?.[1] ??
            'Your account could not be reached. Your device draft is safe. Try again.',
          response.status,
        );
      }
      try {
        return parse(value);
      } catch {
        throw unreadable();
      }
    } catch (error) {
      options.signal?.throwIfAborted();
      if (timeout.signal.aborted)
        throw new CommunityClientError(
          'timeout',
          'Your account took too long to respond. Your device draft is safe. Try again.',
        );
      if (error instanceof CommunityClientError) throw error;
      throw new CommunityClientError(
        'network_error',
        'Your account could not be reached. Your device draft is safe. Try again.',
      );
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    listOwnedPublications(
      before: PublicationCursor | null = null,
      options: CommunityRequestOptions = {},
    ) {
      const validated =
        before === null ? null : input(() => publicationCursor(before));
      const query = validated
        ? '?' +
          new URLSearchParams({
            before: validated.publishedAt,
            id: validated.id,
          })
        : '';
      return send(
        '/api/community/publications' + query,
        'GET',
        (value) => {
          const page = parseOwnedPublicationPage(value);
          if (
            validated &&
            page.items[0] &&
            !olderPublication(page.items[0], validated)
          )
            throw unreadable();
          return page;
        },
        options,
      );
    },
    publishBuild(
      request: PublicationRequest,
      options: CommunityRequestOptions = {},
    ) {
      const validated = input(() => parsePublicationRequest(request));
      return send(
        '/api/community/publications',
        'POST',
        (value) => publicationReceipt(value, validated),
        options,
        validated,
      );
    },
    withdrawPublication(id: string, options: CommunityRequestOptions = {}) {
      if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(id))
        throw new CommunityClientError(
          'invalid_request',
          'This publication identifier is invalid.',
          400,
        );
      return send(
        '/api/community/publications/' + encodeURIComponent(id),
        'DELETE',
        (value) => {
          const receipt = publicationWithdrawal(value);
          if (receipt.id !== id) throw unreadable();
          return receipt;
        },
        options,
        {},
      );
    },
    listFavorites(
      before: FavoriteCursor | null = null,
      options: CommunityRequestOptions = {},
    ) {
      const validated =
        before === null ? null : input(() => favoriteCursor(before));
      const query = validated
        ? '?' +
          new URLSearchParams({
            before: validated.createdAt,
            id: validated.publicationId,
          })
        : '';
      return send(
        '/api/community/favorites' + query,
        'GET',
        (value) => {
          const page = parseFavoritePage(value);
          if (
            validated &&
            page.items[0] &&
            !olderFavorite(page.items[0], validated)
          )
            throw unreadable();
          return page;
        },
        options,
      );
    },
    setFavorite(
      publicationId: string,
      favorite: boolean,
      options: CommunityRequestOptions = {},
    ) {
      if (!/^[a-zA-Z0-9_-]{16,100}$/.test(publicationId))
        throw new CommunityClientError(
          'invalid_request',
          'This published-build identifier is invalid.',
          400,
        );
      return send(
        '/api/community/favorites/' + encodeURIComponent(publicationId),
        favorite ? 'PUT' : 'DELETE',
        (value) => {
          if (favorite) {
            const receipt = favoriteCursor(value);
            if (receipt.publicationId !== publicationId) throw unreadable();
          } else if (
            !object(value) ||
            value.publicationId !== publicationId ||
            value.removed !== true
          )
            throw unreadable();
          return { publicationId, favorite };
        },
        options,
        {},
      );
    },
    readProfile(options: CommunityRequestOptions = {}) {
      return send('/api/community/profile', 'GET', profileResponse, options);
    },
    saveProfile(
      profile: CommunityProfile,
      options: CommunityRequestOptions = {},
    ) {
      return send(
        '/api/community/profile',
        'PATCH',
        (value) => {
          const saved = profileResponse(value);
          if (!saved) throw unreadable();
          return saved;
        },
        options,
        input(() => parseCommunityProfile(profile)),
      );
    },
    listBuilds(
      before: SavedBuildCursor | null = null,
      options: CommunityRequestOptions = {},
    ) {
      const validated = before === null ? null : input(() => cursor(before));
      const query = validated
        ? '?' +
          new URLSearchParams({ before: validated.createdAt, id: validated.id })
        : '';
      return send(
        '/api/community/builds' + query,
        'GET',
        (value) => {
          const page = parseSavedBuildPage(value);
          if (validated && page.items[0] && !older(page.items[0], validated))
            throw unreadable();
          return page;
        },
        options,
      );
    },
    saveBuild(
      request: SaveBuildRequest,
      options: CommunityRequestOptions = {},
    ) {
      return send(
        '/api/community/builds',
        'POST',
        parseSavedBuild,
        options,
        input(() => parseSaveBuildRequest(request)),
      );
    },
    readBuild(id: string, options: CommunityRequestOptions = {}) {
      if (!/^[a-zA-Z0-9_-]{16,100}$/.test(id))
        throw new CommunityClientError(
          'invalid_request',
          'This saved-build identifier is invalid.',
          400,
        );
      return send(
        '/api/community/builds/' + encodeURIComponent(id),
        'GET',
        (value) => {
          const saved = parseSavedBuild(value);
          if (saved.id !== id) throw unreadable();
          return saved;
        },
        options,
      );
    },
  };
}

export type CommunityClient = ReturnType<typeof createCommunityClient>;

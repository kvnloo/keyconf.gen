import { parseBuild, type Build } from './build.ts';
import { requestText } from './request-text.ts';

export type CommunityProfile = {
  handle: string;
  displayName: string;
  bio: string;
};
export type SavedBuildSummary = { id: string; name: string; createdAt: string };
export type SavedBuild = SavedBuildSummary & { build: Build };
export type SaveBuildRequest = { operationId: string; build: Build };
export type CommunityErrorCode =
  | 'authentication_required'
  | 'invalid_origin'
  | 'invalid_request'
  | 'request_too_large'
  | 'handle_taken'
  | 'operation_conflict'
  | 'build_not_found'
  | 'saved_build_unavailable'
  | 'storage_unavailable';

export class CommunityError extends Error {
  readonly code: CommunityErrorCode;
  readonly status: number;
  constructor(code: CommunityErrorCode, message: string, status: number) {
    super(message);
    this.name = 'CommunityError';
    this.code = code;
    this.status = status;
  }
}

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const reservedHandles = new Set([
  'account',
  'admin',
  'administrator',
  'api',
  'auth',
  'build',
  'builds',
  'callback',
  'community',
  'discover',
  'help',
  'keyconf',
  'login',
  'logout',
  'moderator',
  'official',
  'openai',
  'profile',
  'settings',
  'signin',
  'signout',
  'staff',
  'support',
  'system',
  'www',
]);

export function parseCommunityProfile(value: unknown): CommunityProfile {
  if (
    !object(value) ||
    typeof value.handle !== 'string' ||
    typeof value.displayName !== 'string' ||
    typeof value.bio !== 'string'
  ) {
    throw new CommunityError(
      'invalid_request',
      'Choose a handle, display name and bio.',
      400,
    );
  }
  const handle = value.handle.trim().toLowerCase();
  const displayName = value.displayName.trim();
  const bio = value.bio.trim();
  if (
    !/^[a-z0-9][a-z0-9_]{2,23}$/.test(handle) ||
    reservedHandles.has(handle)
  ) {
    throw new CommunityError(
      'invalid_request',
      'Choose an available handle of 3–24 letters, numbers or underscores, starting with a letter or number. Staff and service names are reserved.',
      400,
    );
  }
  if (
    !displayName ||
    displayName.length > 60 ||
    bio.length > 160 ||
    (displayName + bio)
      .split('')
      .some(
        (character) =>
          character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
      )
  ) {
    throw new CommunityError(
      'invalid_request',
      'Use a display name of 1–60 characters and a bio of at most 160 characters, without line breaks or control characters.',
      400,
    );
  }
  return { handle, displayName, bio };
}

export function parseSaveBuildRequest(value: unknown): SaveBuildRequest {
  if (
    !object(value) ||
    typeof value.operationId !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.operationId)
  ) {
    throw new CommunityError(
      'invalid_request',
      'This save needs a valid operation ID. Start a new account save.',
      400,
    );
  }
  try {
    const build = parseBuild(value.build);
    const selected = new Set(Object.values(build.selection));
    return {
      operationId: value.operationId,
      build: parseBuild({
        ...build,
        customParts: build.customParts.filter((part) => selected.has(part.id)),
      }),
    };
  } catch (error) {
    throw new CommunityError(
      'invalid_request',
      error instanceof Error ? error.message : 'This build could not be read.',
      400,
    );
  }
}

function parseSavedBuildSummary(value: unknown): SavedBuildSummary {
  if (
    !object(value) ||
    typeof value.id !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) ||
    typeof value.name !== 'string' ||
    !value.name ||
    value.name.length > 80 ||
    typeof value.createdAt !== 'string' ||
    !Number.isFinite(Date.parse(value.createdAt))
  ) {
    throw new Error(
      'The saved build response could not be read. Try loading your account again.',
    );
  }
  return { id: value.id, name: value.name, createdAt: value.createdAt };
}

export function parseSavedBuild(value: unknown): SavedBuild {
  const summary = parseSavedBuildSummary(value);
  if (!object(value))
    throw new Error('The saved build response could not be read.');
  return { ...summary, build: parseBuild(value.build) };
}

export function parseSavedBuildSummaries(value: unknown): SavedBuildSummary[] {
  if (!Array.isArray(value) || value.length > 100)
    throw new Error('The saved build list could not be read.');
  return value.map(parseSavedBuildSummary);
}

export function communityResponse(value: unknown, status = 200): Response {
  return Response.json(value, {
    status,
    headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
  });
}

export function communityErrorResponse(error: unknown): Response {
  const failure =
    error instanceof CommunityError
      ? error
      : new CommunityError(
          'storage_unavailable',
          'Your account could not be reached. Your device draft is safe. Try again.',
          503,
        );
  return communityResponse(
    { error: { code: failure.code, message: failure.message } },
    failure.status,
  );
}

export async function communityRequest(
  request: Request,
  maxBytes = 128 * 1024,
): Promise<unknown> {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    throw new CommunityError(
      'invalid_origin',
      'Save from this Keyconf site. Refresh the page and try again.',
      403,
    );
  }
  if (
    request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !==
    'application/json'
  ) {
    throw new CommunityError(
      'invalid_request',
      'Send a JSON account request.',
      400,
    );
  }
  const content = await requestText(request, maxBytes);
  if (content === null)
    throw new CommunityError(
      'request_too_large',
      'This account save is too large. Export the build file to keep a copy.',
      413,
    );
  try {
    return JSON.parse(content);
  } catch {
    throw new CommunityError(
      'invalid_request',
      'This request is not readable JSON. Try again.',
      400,
    );
  }
}

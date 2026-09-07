import {
  listBuilds,
  readBuild,
  readProfile,
  saveBuild,
  saveProfile,
} from '../db/community.ts';
import {
  CommunityError,
  communityErrorResponse,
  communityRequest,
  communityResponse,
  parseCommunityProfile,
  parseSaveBuildRequest,
} from './community.ts';

export type CommunityIdentityResolver = (
  request: Request,
) => Promise<{ subject: string } | null>;

export function createCommunityApi({
  db,
  resolveIdentity,
}: {
  db: Parameters<typeof readProfile>[0];
  // The caller verifies identity; request fields are never an identity source here.
  resolveIdentity: CommunityIdentityResolver;
}) {
  async function authenticated(
    request: Request,
    action: (subject: string) => Promise<Response>,
  ) {
    try {
      const identity = await resolveIdentity(request);
      if (!identity)
        throw new CommunityError(
          'authentication_required',
          'Sign in to use your account. Your device draft is safe.',
          401,
        );
      return await action(identity.subject);
    } catch (error) {
      return communityErrorResponse(error);
    }
  }

  return {
    profile(request: Request) {
      return authenticated(request, async (subject) => {
        if (request.method === 'GET')
          return communityResponse({ profile: await readProfile(db, subject) });
        if (request.method === 'PATCH') {
          const profile = parseCommunityProfile(
            await communityRequest(request),
          );
          return communityResponse({
            profile: await saveProfile(db, subject, profile),
          });
        }
        return methodNotAllowed('GET, PATCH');
      });
    },
    builds(request: Request) {
      return authenticated(request, async (subject) => {
        if (request.method === 'GET') {
          const params = new URL(request.url).searchParams;
          const createdAt = params.get('before');
          const id = params.get('id');
          if ((createdAt === null) !== (id === null))
            throw new CommunityError(
              'invalid_request',
              'This saved-build page cursor is invalid.',
              400,
            );
          return communityResponse(
            await listBuilds(
              db,
              subject,
              createdAt !== null && id !== null ? { createdAt, id } : undefined,
            ),
          );
        }
        if (request.method === 'POST') {
          const input = parseSaveBuildRequest(await communityRequest(request));
          return communityResponse(await saveBuild(db, subject, input));
        }
        return methodNotAllowed('GET, POST');
      });
    },
    build(request: Request, id: string) {
      return authenticated(request, async (subject) => {
        if (request.method !== 'GET') return methodNotAllowed('GET');
        if (!/^[a-zA-Z0-9_-]{16,100}$/.test(id))
          throw new CommunityError(
            'invalid_request',
            'This saved-build identifier is invalid.',
            400,
          );
        return communityResponse(await readBuild(db, subject, id));
      });
    },
  };
}

function methodNotAllowed(allow: string) {
  const response = communityResponse(
    {
      error: {
        code: 'invalid_request',
        message: 'This account action is not supported.',
      },
    },
    405,
  );
  response.headers.set('Allow', allow);
  return response;
}

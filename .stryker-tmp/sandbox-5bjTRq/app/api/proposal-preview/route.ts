// @ts-nocheck
import { env } from 'cloudflare:workers';
import { readProposalPreview } from '../../../db/proposals';
import { CommunityError } from '../../../lib/community';
import { requestText } from '../../../lib/request-text';

function reply(value: unknown, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      'Cache-Control': 'private, no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return reply({ error: 'Open the proposal from this Keyconf site.' }, 403);
  if (
    request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !==
    'application/json'
  )
    return reply({ error: 'A JSON proposal request is required.' }, 400);
  let token: string;
  try {
    const body = await requestText(request, 256);
    if (body === null)
      return reply({ error: 'This request is too large.' }, 413);
    const value: unknown = JSON.parse(body);
    if (
      typeof value !== 'object' ||
      value === null ||
      !('token' in value) ||
      typeof value.token !== 'string' ||
      !/^[a-f0-9]{64}$/.test(value.token)
    )
      return reply({ error: 'This proposal is not available.' }, 404);
    token = value.token;
  } catch {
    return reply({ error: 'This proposal request could not be read.' }, 400);
  }
  try {
    return reply(await readProposalPreview(env.DB, token));
  } catch (error) {
    if (error instanceof CommunityError && error.code === 'proposal_not_found')
      return reply({ error: 'This proposal is not available.' }, 404);
    return reply(
      { error: 'This proposal could not load. Try again later.' },
      503,
    );
  }
}

export function GET() {
  return reply({ error: 'Open the complete proposal invitation link.' }, 405);
}

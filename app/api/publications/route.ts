import { env } from 'cloudflare:workers';
import { listPublicPublications } from '../../../db/publications';
import { parseDiscoveryQuery } from '../../../lib/discovery';
import { CommunityError } from '../../../lib/community';

function reply(value: unknown, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function GET(request: Request) {
  if (request.url.length > 2048)
    return reply({ error: 'This discovery request is too long.' }, 400);
  try {
    const query = parseDiscoveryQuery(new URL(request.url).searchParams);
    return reply(await listPublicPublications(env.DB, query));
  } catch (error) {
    if (error instanceof CommunityError && error.code === 'invalid_request')
      return reply({ error: error.message }, 400);
    return reply({ error: 'Published builds could not load. Try again.' }, 503);
  }
}

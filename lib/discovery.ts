import { CommunityError } from './community.ts';

export type DiscoveryQuery = {
  query: string;
  kind: 'all' | 'build' | 'drop';
  cursor: { publishedAt: string; id: string } | null;
};

export function parseDiscoveryQuery(params: URLSearchParams): DiscoveryQuery {
  const query = (params.get('q') ?? '').trim();
  const kind = params.get('kind') ?? 'all';
  const publishedAt = params.get('before');
  const id = params.get('id');
  if (
    query.length > 100 ||
    /\p{Cc}/u.test(query) ||
    !['all', 'build', 'drop'].includes(kind)
  )
    throw new CommunityError(
      'invalid_request',
      'Use a search under 100 characters and a valid release type.',
      400,
    );
  if (
    (publishedAt === null) !== (id === null) ||
    (publishedAt !== null &&
      (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(publishedAt) ||
        !Number.isFinite(Date.parse(publishedAt)))) ||
    (id !== null && !/^[a-zA-Z0-9_-]{16,100}$/.test(id))
  )
    throw new CommunityError(
      'invalid_request',
      'This discovery page cursor is invalid.',
      400,
    );
  return {
    query,
    kind: kind === 'build' || kind === 'drop' ? kind : 'all',
    cursor: publishedAt !== null && id !== null ? { publishedAt, id } : null,
  };
}

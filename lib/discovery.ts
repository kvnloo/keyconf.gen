import { CommunityError } from './community.ts';
import { parseBuildThumbnail, type BuildThumbnail } from './build-thumbnail.ts';

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

export type DiscoveryPage = {
  items: {
    id: string;
    title: string;
    kind: 'build' | 'drop';
    author: { handle: string; displayName: string };
    publishedAt: string;
    thumbnail: BuildThumbnail | null;
  }[];
  next: DiscoveryQuery['cursor'];
};

export function parseDiscoveryPage(value: unknown): DiscoveryPage {
  const object = (entry: unknown) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry))
      throw new Error('Published builds could not be read.');
    const fields: Record<string, unknown> = Object.fromEntries(
      Object.entries(entry),
    );
    return fields;
  };
  const text = (entry: unknown, limit: number) => {
    if (typeof entry !== 'string' || !entry.trim() || entry.length > limit)
      throw new Error('Published build details could not be read.');
    return entry;
  };
  const data = object(value);
  if (!Array.isArray(data.items) || data.items.length > 25)
    throw new Error('Published builds could not be read.');
  const items = data.items.map((entry): DiscoveryPage['items'][number] => {
    const item = object(entry);
    const author = object(item.author);
    const id = text(item.id, 100);
    const publishedAt = text(item.publishedAt, 30);
    parseDiscoveryQuery(new URLSearchParams({ id, before: publishedAt }));
    if (item.kind !== 'build' && item.kind !== 'drop')
      throw new Error('Unknown publication type.');
    return {
      id,
      publishedAt,
      thumbnail: parseBuildThumbnail(item.thumbnail),
      kind: item.kind,
      title: text(item.title, 80),
      author: {
        handle: text(author.handle, 30),
        displayName: text(author.displayName, 60),
      },
    };
  });
  if (new Set(items.map((item) => item.id)).size !== items.length)
    throw new Error('Repeated publication in this page.');
  let next: DiscoveryQuery['cursor'] = null;
  if (data.next !== null) {
    const cursor = object(data.next);
    next = parseDiscoveryQuery(
      new URLSearchParams({
        id: text(cursor.id, 100),
        before: text(cursor.publishedAt, 30),
      }),
    ).cursor;
    const last = items.at(-1);
    if (!last || next?.id !== last.id || next.publishedAt !== last.publishedAt)
      throw new Error('This publication page is incomplete.');
  }
  return { items, next };
}

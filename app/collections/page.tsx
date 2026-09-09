import Link from 'next/link';
import type { Metadata } from 'next';
import { env } from 'cloudflare:workers';
import {
  listPublicCollections,
  type PublicCollectionIndex,
} from '../../db/collections';
import '../published-collection.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Collections | Keyconf',
  description:
    'Sets of published builds, each gathered and ordered by the creator who curated it.',
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ before?: string; id?: string }>;
}) {
  const { before, id } = await searchParams;
  let page: PublicCollectionIndex | null = null;
  try {
    page = await listPublicCollections(
      env.DB,
      before !== undefined && id !== undefined
        ? { createdAt: before, id }
        : undefined,
    );
  } catch {
    // An unreadable page and an invalid cursor both leave the reader somewhere
    // they can still act, rather than on a stack trace.
  }
  return (
    <main className="published-collection collection-index">
      <header>
        <span className="preview-eyebrow">COLLECTIONS</span>
        <h1>Sets someone put together.</h1>
        <p>
          Each collection is a group of already-published builds, chosen and
          ordered by the creator named on it.
        </p>
      </header>
      {!page ? (
        <p role="alert" className="published-collection-empty">
          Collections could not load. Try this page again later.
        </p>
      ) : page.items.length === 0 ? (
        <p className="published-collection-empty">
          {before === undefined
            ? 'No collections have been published yet. Curated sets will appear here.'
            : 'There are no more collections on this page.'}
        </p>
      ) : (
        <ul className="collection-index-list">
          {page.items.map((item) => (
            <li key={item.id}>
              <Link href={`/collections/${item.id}`}>{item.title}</Link>
              <span className="published-collection-author">
                Curated by {item.author.displayName}{' '}
                <small>@{item.author.handle}</small>
              </span>
              <span className="collection-index-meta">
                {item.count} {item.count === 1 ? 'build' : 'builds'} ·{' '}
                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toISOString().slice(0, 10)}
                </time>
              </span>
            </li>
          ))}
        </ul>
      )}
      {page?.next && (
        <Link
          className="button secondary"
          href={`/collections?before=${encodeURIComponent(page.next.createdAt)}&id=${encodeURIComponent(page.next.id)}`}
        >
          Older collections
        </Link>
      )}
      <p className="published-collection-basis">
        A collection counts only the builds still published — when a creator
        withdraws a build it leaves every collection that pointed to it, and a
        collection with nothing left to show drops off this page. Keyconf does
        not hold stock, take payment, or represent anyone listed here.
      </p>
    </main>
  );
}

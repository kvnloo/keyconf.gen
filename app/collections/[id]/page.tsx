import Link from 'next/link';
import type { Metadata } from 'next';
import { env } from 'cloudflare:workers';
import { notFound } from 'next/navigation';
import {
  readPublicCollection,
  type PublicCollection,
} from '../../../db/collections';
import { CommunityError } from '../../../lib/community';
import PublishedCollection from '../../published-collection';

export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (/^[a-zA-Z0-9_-]{16,100}$/.test(id)) {
    try {
      const collection = await readPublicCollection(env.DB, id);
      return {
        title: `${collection.title} | Keyconf`,
        description:
          `A collection by ${collection.author.displayName}. ${collection.note}`.slice(
            0,
            300,
          ),
      };
    } catch {
      // Missing, withdrawn and unreadable records share neutral metadata.
    }
  }
  return {
    title: 'Collection unavailable | Keyconf',
    description: 'This collection is not available.',
    robots: { index: false, follow: false },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9_-]{16,100}$/.test(id)) notFound();
  let collection: PublicCollection | null = null;
  try {
    collection = await readPublicCollection(env.DB, id);
  } catch (error) {
    if (
      error instanceof CommunityError &&
      error.code === 'collection_not_found'
    )
      notFound();
  }
  if (!collection)
    return (
      <main className="preview-link-error">
        <h1>This collection couldn’t load</h1>
        <p>
          Its saved record may be temporarily unavailable. Try this link again
          later.
        </p>
        <Link href="/#studio">Open your studio</Link>
      </main>
    );
  return <PublishedCollection collection={collection} />;
}

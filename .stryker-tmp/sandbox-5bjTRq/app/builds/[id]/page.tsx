// @ts-nocheck
import Link from 'next/link';
import type { Metadata } from 'next';
import { env } from 'cloudflare:workers';
import { notFound } from 'next/navigation';
import {
  readPublicPublication,
  type PublicPublication,
} from '../../../db/publications';
import { CommunityError } from '../../../lib/community';
import PublishedBuild from '../../published-build';

export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (/^[a-zA-Z0-9_-]{16,100}$/.test(id)) {
    try {
      const publication = await readPublicPublication(env.DB, id);
      return {
        title: `${publication.title} | Keyconf`,
        description:
          `${publication.title} by ${publication.author.displayName}. ${publication.note}`.slice(
            0,
            300,
          ),
      };
    } catch {
      // Missing, withdrawn and unreadable records share neutral metadata.
    }
  }
  return {
    title: 'Build unavailable | Keyconf',
    description: 'This keyboard release is not available.',
    robots: { index: false, follow: false },
  };
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9_-]{16,100}$/.test(id)) notFound();
  let publication: PublicPublication | null = null;
  try {
    publication = await readPublicPublication(env.DB, id);
  } catch (error) {
    if (
      error instanceof CommunityError &&
      error.code === 'publication_not_found'
    )
      notFound();
  }
  if (!publication)
    return (
      <main className="preview-link-error">
        <h1>This build couldn’t load</h1>
        <p>
          Its saved release may be temporarily unavailable. Try this link again
          later.
        </p>
        <Link href="/#studio">Open your studio</Link>
      </main>
    );
  return <PublishedBuild publication={publication} />;
}

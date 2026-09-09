import Link from 'next/link';
import type { PublicCollection } from '../db/collections';
import './published-collection.css';

export default function PublishedCollection({
  collection,
}: {
  collection: PublicCollection;
}) {
  const { author, entries } = collection;
  return (
    <main className="published-collection">
      <header>
        <span className="preview-eyebrow">COLLECTION</span>
        <h1>{collection.title}</h1>
        <p className="published-collection-curator">
          Curated by {author.displayName} <small>@{author.handle}</small>
        </p>
        {collection.note && <p>{collection.note}</p>}
        <div className="publication-links">
          {author.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
      </header>
      {entries.length === 0 ? (
        <p className="published-collection-empty">
          Every build this collection pointed to has since been withdrawn by its
          creator, so there is nothing left to show.
        </p>
      ) : (
        <ol className="published-collection-entries">
          {entries.map((entry) => (
            <li key={entry.publicationId}>
              <Link href={`/builds/${entry.publicationId}`}>{entry.title}</Link>
              <span className="published-collection-author">
                by {entry.author.displayName}{' '}
                <small>@{entry.author.handle}</small>
              </span>
            </li>
          ))}
        </ol>
      )}
      <p className="published-collection-basis">
        {author.displayName} chose these published builds and wrote the note
        above. Each build belongs to the creator listed beside it, who published
        it themselves and can withdraw it at any time — a withdrawn build leaves
        this page. Keyconf does not hold stock, take payment, or represent
        anyone named here.
      </p>
    </main>
  );
}

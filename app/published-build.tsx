'use client';
import ArchivedBuild from './archived-build';
import type { PublicPublication } from '../db/publications';
import { encodeBuild } from '../lib/build';
import SharedBuildPreview from './shared-build-preview';
import './shared-build-preview.css';

export default function PublishedBuild({
  publication,
}: {
  publication: PublicPublication;
}) {
  const { author, release } = publication;
  const creatorDetails = (
    <section className="publication-author" aria-label="Creator and release">
      <div>
        <span className="preview-eyebrow">
          {release.kind === 'drop' ? 'CREATOR DROP' : 'PUBLISHED BUILD'}
        </span>
        <h2>
          {author.displayName} <small>@{author.handle}</small>
        </h2>
        <p>{publication.note}</p>
      </div>
      <div className="publication-links">
        {author.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
      {release.kind === 'drop' && (
        <div>
          <p>{release.availability}</p>
          {release.externalUrl && (
            <a href={release.externalUrl} target="_blank" rel="noreferrer">
              Visit the creator ↗
            </a>
          )}
        </div>
      )}
      <button
        onClick={() => {
          const url = URL.createObjectURL(
            new Blob([JSON.stringify(publication.build, null, 2)], {
              type: 'application/json',
            }),
          );
          const link = document.createElement('a');
          link.href = url;
          link.download = 'keyconf-build.json';
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }}
      >
        Download build file
      </button>
    </section>
  );
  return (
    <>
      {publication.customization === 'available' ? (
        <SharedBuildPreview
          build={publication.build}
          record={{ kind: 'publication', value: publication }}
          creatorDetails={creatorDetails}
          onCustomize={(draft) => {
            window.location.href = `/#build=${encodeBuild(draft)}`;
          }}
        />
      ) : (
        <ArchivedBuild
          snapshot={publication}
          details={creatorDetails}
          kind="publication"
        />
      )}
    </>
  );
}

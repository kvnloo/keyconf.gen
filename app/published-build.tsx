'use client';
import Link from 'next/link';
import AccessoryFitNotes from './accessory-fit-notes';
import { useState } from 'react';
import type { PublicPublication } from '../db/publications';
import { encodeBuild } from '../lib/build';
import SharedBuildPreview from './shared-build-preview';
import './shared-build-preview.css';

export default function PublishedBuild({
  publication,
}: {
  publication: PublicPublication;
}) {
  const { author, release, evidence } = publication;
  const [notice, setNotice] = useState('');
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
      <output aria-live="polite">{notice}</output>
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
          publication={publication}
          creatorDetails={creatorDetails}
          onCustomize={() => {
            try {
              window.location.href = `/#build=${encodeBuild(publication.build)}`;
            } catch {
              setNotice(
                'This build is too large for a link. Download its build file, then open it in your studio.',
              );
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }}
        />
      ) : (
        <main className="shared-preview publication-archive">
          {creatorDetails}
          <Link href="/#studio">Open your studio →</Link>
          <h1>{publication.title}</h1>
          <p>
            Some parts or recordings are no longer supported in the studio. The
            original parts and sources are preserved below.
          </p>
          <h2>Original parts</h2>
          <ul className="preview-parts">
            {[...evidence.components, ...evidence.accessoryReferences].map(
              (part) => (
                <li key={part.id}>
                  <a href={part.source} target="_blank" rel="noreferrer">
                    {part.brand} {part.name} ↗
                  </a>
                  <p>{part.detail}</p>
                </li>
              ),
            )}
          </ul>
          <h2>Compatibility at publication</h2>
          {evidence.compatibility.map((check, index) => (
            <section key={index}>
              <h3>
                {check.title} · {check.status}
              </h3>
              <p>{check.detail}</p>
              {check.source && (
                <a href={check.source} target="_blank" rel="noreferrer">
                  Original source ↗
                </a>
              )}
            </section>
          ))}
          <AccessoryFitNotes
            selections={publication.build.accessories}
            products={evidence.accessoryReferences}
            checks={evidence.accessoryCompatibility}
          />
          <h2>Sound reference</h2>
          <p>{evidence.sound.accuracy}</p>
          {evidence.sound.recording && (
            <a
              href={evidence.sound.recording.source}
              target="_blank"
              rel="noreferrer"
            >
              {evidence.sound.recording.name} ·{' '}
              {evidence.sound.recording.creator} ↗
            </a>
          )}
        </main>
      )}
    </>
  );
}

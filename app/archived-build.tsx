'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Build } from '../lib/build';
import type { PublicBuildEvidence } from '../lib/build-evidence';
import AccessoryFitNotes from './accessory-fit-notes';
import BuildFeedback from './build-feedback';
import BuildComparison from './build-comparison';
import './shared-build-preview.css';

export default function ArchivedBuild({
  snapshot,
  details,
  kind,
}: {
  snapshot: { title: string; build: Build; evidence: PublicBuildEvidence };
  details: ReactNode;
  kind: 'publication' | 'proposal';
}) {
  const { evidence } = snapshot;
  return (
    <main className="shared-preview publication-archive">
      {details}
      <Link href="/#studio">Open your studio →</Link>
      <h1>{snapshot.title}</h1>
      <p>
        Some parts or recordings are no longer supported in the studio. The
        original parts and sources are preserved below.
      </p>
      <BuildFeedback
        build={snapshot.build}
        linkMode={kind === 'publication' ? 'publication' : 'file'}
      />
      <BuildComparison build={snapshot.build} />
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
      <h2>Original compatibility</h2>
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
        selections={snapshot.build.accessories}
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
          {evidence.sound.recording.name} · {evidence.sound.recording.creator} ↗
        </a>
      )}
    </main>
  );
}

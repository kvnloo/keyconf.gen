'use client';
import { useRef, useState } from 'react';
import { readBuildFile, type Build } from '../lib/build';
import type { PublicBuildEvidence } from '../lib/build-evidence';
import { compareBuilds } from '../lib/build-comparison';

export default function BuildComparison({
  build,
  evidence,
}: {
  build: Build;
  evidence?: PublicBuildEvidence;
}) {
  const [candidate, setCandidate] = useState<Build | null>(null);
  const [message, setMessage] = useState('');
  const generation = useRef(0);
  const changes = candidate ? compareBuilds(build, candidate, evidence) : [];
  async function open(file: File | undefined) {
    const current = ++generation.current;
    if (!file) return;
    setMessage('Reading build…');
    try {
      if (file.size > 1_000_000)
        throw new Error('Choose a Keyconf build file under 1 MB.');
      const next = readBuildFile(await file.text());
      if (current !== generation.current) return;
      setCandidate(next);
      setMessage('Comparison ready. Neither build has been changed.');
    } catch (error) {
      if (current !== generation.current) return;
      setMessage(
        error instanceof Error
          ? error.message
          : 'This build could not be read.',
      );
    }
  }
  return (
    <details className="preview-feedback preview-comparison">
      <summary>Compare another build</summary>
      <p>
        Choose an exported Keyconf build to compare with this preview. Files are
        read on this device.
        {evidence &&
          ' This preview uses the creator’s saved product details; the compared file uses current catalog details.'}
      </p>
      <label htmlFor="comparison-file">Build file to compare</label>
      <input
        id="comparison-file"
        type="file"
        accept=".json,application/json"
        onChange={(event) => {
          void open(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      <output aria-live="polite">{message}</output>
      {candidate && (
        <>
          <h3>This preview → {candidate.name}</h3>
          <p>
            {changes.length
              ? `${changes.length} ${changes.length === 1 ? 'setting differs' : 'settings differ'}.`
              : 'The compared parts and settings match.'}{' '}
            Names and unused imported parts are excluded. Visual and audio
            settings do not establish physical fit or exact sound.
          </p>
          <dl>
            {changes.map((change) => (
              <div key={change.label}>
                <dt>{change.label}</dt>
                <dd>
                  <span>Preview</span>
                  {change.before}
                  {change.beforeSources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit {source.name} ↗
                    </a>
                  ))}
                </dd>
                <dd>
                  <span>Compared build</span>
                  {change.after}
                  {change.afterSources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit {source.name} ↗
                    </a>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <button
            className="preview-customize"
            onClick={() => {
              generation.current++;
              setCandidate(null);
              setMessage('Comparison cleared.');
            }}
          >
            Clear comparison
          </button>
        </>
      )}
    </details>
  );
}

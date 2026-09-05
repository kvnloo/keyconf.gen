'use client';
import { useState } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import catalog from '../data/sound-references.json';

export type SoundReference = (typeof catalog.records)[number];
export default function SoundReferences({
  onSelect,
  selected,
}: {
  onSelect: (record: SoundReference | null) => void;
  selected: SoundReference | null;
}) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const results = catalog.records.filter(
    (record) =>
      (family === 'all' || record.family === family) &&
      `${record.name} ${record.family}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section className="sound-library" aria-label="Switch recording library">
      <h3>Explore more switches</h3>
      <p className="muted">
        {catalog.records.length} original sound tests by Click and Thock. Listen
        to the recorded build and compare switches.
      </p>
      <label htmlFor="sound-search">Find a switch</label>
      <input
        id="sound-search"
        type="search"
        placeholder="Oil King, Alps, silent…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <label htmlFor="sound-family">Switch family</label>
      <select
        id="sound-family"
        value={family}
        onChange={(event) => setFamily(event.target.value)}
      >
        <option value="all">All families</option>
        {Array.from(new Set(catalog.records.map((record) => record.family)))
          .sort((a, b) => a.localeCompare(b))
          .map((name) => (
            <option key={name} value={name}>
              {name === '---' ? 'Comparisons / unspecified' : name}
            </option>
          ))}
      </select>
      {selected && (
        <div className="reference-player">
          <div className="reference-heading">
            <strong>{selected.name}</strong>
            <button
              className="icon-button"
              aria-label="Close recording"
              onClick={() => onSelect(null)}
            >
              <X size={16} />
            </button>
          </div>
          <iframe
            key={selected.videoId}
            title={`${selected.name} sound test by Click and Thock`}
            src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <small>
            Original video · Lubed:{' '}
            {selected.lubed === '---' ? 'Not specified' : selected.lubed}
          </small>
          <a href={selected.source} target="_blank" rel="noreferrer">
            Build details & creator <ArrowUpRight size={13} />
          </a>
          <a
            href={`https://www.youtube.com/watch?v=${selected.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            Open on YouTube <ArrowUpRight size={13} />
          </a>
        </div>
      )}
      <output className="recording-count">
        {results.length} {results.length === 1 ? 'recording' : 'recordings'}
        {query || family !== 'all' ? ' found' : ' available'}
      </output>
      <div className="sound-results">
        {results.map((record) => (
          <button
            key={record.id}
            onClick={() => {
              onSelect(record);
            }}
            aria-pressed={selected?.id === record.id}
          >
            <span>
              <strong>{record.name}</strong>
              <small>
                {record.family === '---'
                  ? 'Comparison / unspecified'
                  : record.family}
              </small>
            </span>
            <Play size={15} aria-hidden="true" />
          </button>
        ))}
        {results.length === 0 && (
          <div className="catalog-empty">
            <p className="muted">No recording indexed for that search yet.</p>
            <button
              className="text-button"
              onClick={() => {
                setQuery('');
                setFamily('all');
              }}
            >
              Clear recording filters
            </button>
          </div>
        )}
      </div>
      <small>
        Videos play through YouTube. Coverage grows as we index more sources.
      </small>
    </section>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import catalog from '../data/sound-references.json';

export default function SoundReferences({
  onListen,
  nativeEnabled,
}: {
  onListen: () => void;
  nativeEnabled: boolean;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<
    (typeof catalog.records)[number] | null
  >(null);
  useEffect(() => {
    if (nativeEnabled) setSelected(null);
  }, [nativeEnabled]);
  const results = catalog.records.filter((record) =>
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
      {selected && (
        <div className="reference-player">
          <div className="reference-heading">
            <strong>{selected.name}</strong>
            <button
              className="icon-button"
              aria-label="Close recording"
              onClick={() => setSelected(null)}
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
          <small>Original video · Lubed: {selected.lubed}</small>
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
      <small role="status">
        {results.length} recordings{query ? ' found' : ' available'}
      </small>
      <div className="sound-results">
        {results.map((record) => (
          <button
            key={record.id}
            onClick={() => {
              onListen();
              setSelected(record);
            }}
            aria-pressed={selected?.id === record.id}
          >
            <span>
              <strong>{record.name}</strong>
              <small>{record.family}</small>
            </span>
            <Play size={15} aria-hidden="true" />
          </button>
        ))}
        {results.length === 0 && (
          <p className="muted">No recording indexed for that switch yet.</p>
        )}
      </div>
      <small>
        Videos play through YouTube. Coverage grows as we index more sources.
      </small>
    </section>
  );
}

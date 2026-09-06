'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import type { Part } from '../lib/catalog';
import type { AccessoryProduct } from '../lib/build-accessories';
import {
  searchStudio,
  type StudioDestination,
  type StudioSearchResult,
} from '../lib/studio-search';
import './studio-search.css';

type ProductResult = Exclude<StudioSearchResult, { kind: 'destination' }>;
export default function StudioSearch({
  parts,
  canAddAccessory,
  onNavigate,
  onPart,
  onAccessory,
}: {
  parts: Part[];
  canAddAccessory: boolean;
  onNavigate: (destination: StudioDestination) => void;
  onPart: (part: Part) => void;
  onAccessory: (part: AccessoryProduct) => void;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ProductResult | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const results = useRef<HTMLUListElement>(null);
  const matches = searchStudio(query, parts);
  useEffect(() => {
    if (selected) title.current?.focus();
    else input.current?.focus();
  }, [selected]);
  if (selected)
    return (
      <section className="studio-search search-detail">
        <button className="text-button" onClick={() => setSelected(null)}>
          <ArrowLeft size={16} /> Back to results
        </button>
        <p className="search-kind">
          {selected.kind === 'part'
            ? selected.item.category
            : selected.item.kind}{' '}
          · {selected.item.brand}
        </p>
        <h2 tabIndex={-1} ref={title}>
          {selected.item.name}
        </h2>
        <p>{selected.item.detail}</p>
        <a
          className="search-source"
          href={selected.item.source}
          target="_blank"
          rel="noreferrer"
        >
          Visit original source <ArrowUpRight size={16} />
        </a>
        <p className="search-scope">
          {selected.kind === 'part'
            ? 'Selecting a part updates your parts list. Check compatibility in the builder. Appearance and sound remain separate choices.'
            : 'Adds a product reference to your plan. Choose its placement in Parts & accessories. Physical fit and exact geometry may be unverified.'}
        </p>
        <button
          className="button"
          disabled={selected.kind === 'accessory' && !canAddAccessory}
          onClick={() =>
            selected.kind === 'part'
              ? onPart(selected.item)
              : onAccessory(selected.item)
          }
        >
          {selected.kind === 'part' ? 'Use in build' : 'Add to plan'}{' '}
          <ArrowRight size={16} />
        </button>
        {selected.kind === 'accessory' && !canAddAccessory && (
          <p>
            There are already 100 accessory selections. Remove one from your
            plan before adding another.
          </p>
        )}
      </section>
    );
  return (
    <section className="studio-search">
      <h2>Find your next detail.</h2>
      <label className="search-entry">
        <Search size={20} />
        <input
          ref={input}
          type="search"
          name="studio-search"
          aria-label="Search parts and studio"
          placeholder="Parts, makers, or a place to go…"
          maxLength={120}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              results.current?.querySelector('button')?.focus();
            }
          }}
        />
      </label>
      <output className="search-count">
        {query.trim()
          ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'} in your catalog`
          : 'Jump to a workspace, or search parts and makers.'}
      </output>
      {matches.length === 0 ? (
        <p className="search-empty">
          No matches yet. Try a maker, switch name, or “artisan”. This catalog
          is curated, not exhaustive. You can also import a website from the
          studio.
        </p>
      ) : (
        <ul ref={results} className="search-results">
          {matches.map((result) => (
            <li key={`${result.kind}:${result.item.id}`}>
              <button
                onKeyDown={(event) => {
                  if (
                    !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
                  )
                    return;
                  const buttons = Array.from(
                    results.current?.querySelectorAll('button') ?? [],
                  );
                  const current = buttons.findIndex(
                    (button) => button === event.target,
                  );
                  if (current < 0) return;
                  event.preventDefault();
                  const index =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? buttons.length - 1
                        : (current +
                            (event.key === 'ArrowDown' ? 1 : -1) +
                            buttons.length) %
                          buttons.length;
                  buttons[index]?.focus();
                }}
                onClick={() =>
                  result.kind === 'destination'
                    ? onNavigate(result.item.id)
                    : setSelected(result)
                }
              >
                <span>
                  <strong>{result.item.name}</strong>
                  <small>
                    {result.kind === 'destination'
                      ? result.item.detail
                      : `${result.item.brand} · ${result.kind === 'part' ? result.item.category : result.item.kind}`}
                  </small>
                </span>
                <ArrowRight size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="search-hint">
        Arrow keys to browse · Enter to open · Esc to close
      </p>
    </section>
  );
}

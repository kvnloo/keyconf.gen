'use client';
import { useState, useMemo } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import data from '../data/premium-keyboards.json';

export default function PremiumKeyboards() {
  const [query, setQuery] = useState('');
  const [kindFilter, setKindFilter] = useState<'all' | 'complete' | 'kit'>(
    'all',
  );
  const boards = data.boards;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return boards.filter((b) => {
      const match =
        !q ||
        b.brand.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q);
      if (!match) return false;
      if (kindFilter === 'all') return true;
      return b.offers.some((o) => o.kind === kindFilter);
    });
  }, [boards, query, kindFilter]);

  return (
    <section
      className="research-products"
      aria-label="Premium keyboard catalog"
    >
      <h3>Premium keyboard discovery</h3>
      <p className="muted">
        Source-backed product references for high-price keyboard boards, kits,
        and charging ecosystems. Geometry is unmodeled until verified CAD is
        released. Prices are from official listings (2026-09-08) and may vary.
      </p>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search premium keyboards"
          placeholder="Search Angry Miao, CYBERBOARD, HATSU..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <fieldset className="catalog-filters" aria-label="Premium type filter">
        {[
          ['all', 'All'],
          ['complete', 'Full'],
          ['kit', 'Kit'],
        ].map(([value, name]) => (
          <button
            key={value}
            aria-pressed={kindFilter === value}
            onClick={() => setKindFilter(value as typeof kindFilter)}
          >
            {name}
          </button>
        ))}
      </fieldset>
      <div className="research-product-list">
        {filtered.map((board) => {
          const best = board.offers.reduce((a, b) =>
            b.amount > a.amount ? b : a,
          );
          return (
            <a
              key={board.id}
              href={board.source}
              target="_blank"
              rel="noreferrer"
              className="research-product"
              aria-label={`${board.brand} ${board.name}: ${best.amount} USD, ${best.availability}`}
            >
              <span className="catalog-brand">
                {board.brand} · {best.kind === 'complete' ? 'Full' : 'Kit'}
              </span>
              <strong>
                {board.name} <ArrowUpRight size={14} />
              </strong>
              <span>
                {best.amount > 0 ? `$${best.amount}` : 'Price unverified'} ·{' '}
                {best.availability === 'available'
                  ? 'Available'
                  : best.availability === 'sold-out'
                    ? 'Sold out'
                    : 'Unknown'}
                {board.geometry.status === 'unmodeled' ? ' · Unmodeled' : ''}
              </span>
            </a>
          );
        })}
        {!filtered.length && (
          <p>No premium keyboards match. Try a different search.</p>
        )}
      </div>
      <p className="catalog-provenance">
        Source-backed 2026-09-08. All geometry remains unmodeled until a
        licensed dimensioned source is published; previews are visual studies,
        not manufacturer CAD.
      </p>
    </section>
  );
}

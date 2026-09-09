'use client';
import { useState, useMemo } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { geometryGrade, sceneLabel } from '../lib/cad-twin.ts';
import {
  catalogCoverage,
  comparableOffer,
  mostExpensiveFirst,
  type KeyboardOffer,
  type PremiumKeyboard,
} from '../lib/premium-keyboards.ts';
import data from '../data/premium-keyboards.json';

// Ordering only means something inside one currency and one price basis, so the
// ranking is scoped rather than run over every number in the file.
const SCOPE_CURRENCY = 'USD';
const SCOPE_BASIS = 'store-listing';

const KIND_LABEL = { complete: 'Full board', kit: 'Kit' } as const;
const AVAILABILITY_LABEL = {
  available: 'Available',
  'sold-out': 'Sold out',
  unavailable: 'Unavailable',
  unknown: 'Availability unknown',
} as const;

function money(offer: KeyboardOffer) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: offer.currency,
    maximumFractionDigits: 0,
  }).format(offer.amount);
}

export default function PremiumKeyboards() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<'complete' | 'kit'>('complete');
  const boards = data.boards as PremiumKeyboard[];
  const coverage = catalogCoverage(boards);

  const { ranked, unranked } = useMemo(() => {
    const scope = {
      currency: SCOPE_CURRENCY,
      kind,
      basis: SCOPE_BASIS,
    } as const;
    const q = query.toLowerCase().trim();
    const matched = boards.filter(
      (b) =>
        !q ||
        b.brand.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q),
    );
    // Every match stays on the page. A board with no listing in this scope is
    // moved below the ranking rather than dropped or given a placeholder price.
    const ordered = mostExpensiveFirst(matched, scope);
    const priced = ordered
      .map((board) => ({ board, offer: comparableOffer(board, scope) }))
      .filter((row) => row.offer);
    return {
      ranked: priced as { board: PremiumKeyboard; offer: KeyboardOffer }[],
      unranked: ordered.filter((board) => !comparableOffer(board, scope)),
    };
  }, [boards, query, kind]);

  return (
    <section
      className="research-products"
      aria-label="Premium keyboard catalog"
    >
      <h3>Premium keyboard discovery</h3>
      <p className="muted">
        Source-backed product references for high-price keyboard boards, kits,
        and charging ecosystems. A CAD twin requires licensed or measured case,
        plate, and PCB solids. Illustrative studies are labeled; other geometry
        stays unmodeled until that evidence exists.
      </p>
      <p className="catalog-basis" data-premium-coverage={coverage.models}>
        Covering {coverage.models} distinct{' '}
        {coverage.models === 1 ? 'keyboard' : 'keyboards'} from{' '}
        {coverage.brands.length}{' '}
        {coverage.brands.length === 1 ? 'brand' : 'brands'} (
        {coverage.brands.join(', ')}), each linked to the listing published by
        its maker. Colorways and limited editions are configurations of a model
        here, not separate entries. This is the count actually researched, not a
        survey of the premium market.
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
      <fieldset className="catalog-filters" aria-label="Price comparison scope">
        {(['complete', 'kit'] as const).map((value) => (
          <button
            key={value}
            aria-pressed={kind === value}
            onClick={() => setKind(value)}
          >
            {KIND_LABEL[value]}
          </button>
        ))}
      </fieldset>
      <p className="muted" data-premium-scope={kind}>
        Ordered by highest {KIND_LABEL[kind].toLowerCase()} store listing in{' '}
        {SCOPE_CURRENCY}. Kit and full-board prices are never ranked against
        each other, and a keyboard whose price is unrecorded is listed without
        one instead of being treated as free.
      </p>
      <div className="research-product-list">
        {ranked.map(({ board, offer }) => (
          <a
            key={board.id}
            href={board.source}
            target="_blank"
            rel="noreferrer"
            className="research-product"
            data-premium-amount={offer.amount}
            aria-label={`${board.brand} ${board.name}: ${money(offer)} ${offer.currency}, ${offer.configuration}, ${AVAILABILITY_LABEL[offer.availability]}`}
          >
            <span className="catalog-brand">
              {board.brand} · {KIND_LABEL[offer.kind]}
            </span>
            <strong>
              {board.name} <ArrowUpRight size={14} />
            </strong>
            <span>
              {money(offer)} · {offer.configuration} ·{' '}
              {AVAILABILITY_LABEL[offer.availability]} ·{' '}
              {sceneLabel(geometryGrade(board.geometry))}
            </span>
            <span className="catalog-basis">
              Highest listed configuration, observed {offer.observedAt}
            </span>
          </a>
        ))}
        {!ranked.length && (
          <p>
            No {KIND_LABEL[kind].toLowerCase()} listing in {SCOPE_CURRENCY}{' '}
            matches that search.
          </p>
        )}
      </div>
      {unranked.length > 0 && (
        <div className="research-product-list" data-premium-unranked="">
          <p className="muted">
            No {KIND_LABEL[kind].toLowerCase()} price recorded for these, so
            they are listed without a position in the ordering.
          </p>
          {unranked.map((board) => (
            <a
              key={board.id}
              href={board.source}
              target="_blank"
              rel="noreferrer"
              className="research-product"
              aria-label={`${board.brand} ${board.name}: price unverified`}
            >
              <span className="catalog-brand">{board.brand}</span>
              <strong>
                {board.name} <ArrowUpRight size={14} />
              </strong>
              <span>
                Price unverified · {sceneLabel(geometryGrade(board.geometry))}
              </span>
            </a>
          ))}
        </div>
      )}
      <p className="catalog-provenance">
        Observed {data.accessed_at} from official listings and subject to
        change. CAD twin means cad-derived or measured case, plate, and PCB.
        Illustrative studies are not manufacturer CAD. Unmodeled products stay
        listed until a licensed dimensioned source is published.
      </p>
    </section>
  );
}

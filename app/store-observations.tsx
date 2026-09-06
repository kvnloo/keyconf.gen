'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { formatProductPrice } from '../lib/product-pricing';
type StoreData = Awaited<
  ReturnType<typeof import('../lib/store-observations').loadStoreObservations>
>;
type LoadState =
  | { kind: 'idle' | 'loading' | 'error' }
  | { kind: 'ready'; data: StoreData; refreshing: boolean };

export default function StoreObservations({
  onReview,
}: {
  onReview: (source: string) => void;
}) {
  const [state, setState] = useState<LoadState>({ kind: 'idle' });
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function load() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setState((current) =>
      current.kind === 'ready'
        ? { ...current, refreshing: true }
        : { kind: 'loading' },
    );
    try {
      const catalogModule = await import('../lib/store-observations');
      const data = await catalogModule.loadStoreObservations(
        new URL(window.location.href),
        controller.signal,
      );
      if (!controller.signal.aborted)
        setState({ kind: 'ready', data, refreshing: false });
    } catch {
      if (!controller.signal.aborted) setState({ kind: 'error' });
    }
  }
  return (
    <details
      className="research-products store-observations"
      onToggle={(event) => {
        if (!event.currentTarget.open || state.kind !== 'idle') return;
        void load();
      }}
    >
      <summary>
        Browse{' '}
        {state.kind === 'ready' ? state.data.storeListings.length + ' ' : ''}
        observed switch options
      </summary>
      {state.kind === 'loading' && <output>Loading store observations…</output>}
      {state.kind === 'error' && (
        <div>
          <p>
            The store observations could not be loaded. Your build is unchanged.
          </p>
          <button
            className="button secondary"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      )}
      {state.kind === 'ready' && (
        <>
          <output className="catalog-provenance">
            {state.refreshing
              ? 'Checking the hosted catalog…'
              : state.data.origin === 'hosted'
                ? 'Published catalog loaded. Observation dates are shown below.'
                : 'Hosted catalog unavailable. Showing the bundled snapshot.'}
          </output>
          {state.data.origin === 'bundled' && (
            <button
              className="button secondary"
              disabled={state.refreshing}
              onClick={() => void load()}
            >
              Retry hosted catalog
            </button>
          )}
          <ObservedOptions data={state.data} onReview={onReview} />
        </>
      )}
    </details>
  );
}

function ObservedOptions({
  data: { storeListings, storeSource },
  onReview,
}: {
  data: StoreData;
  onReview: (source: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const words = query.toLowerCase().trim().split(/\s+/);
  const matches = storeListings.filter((product) => {
    const text =
      `${product.brand} ${product.name} ${product.sku}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });
  return (
    <>
      <p className="muted">
        A partial snapshot of Divinikey&apos;s switch collection. Each row is a
        store variant, which may be a pack. Prices are for the named option, not
        per switch. Stock and prices may have changed. Fit has not been
        verified.
      </p>
      <a href={storeSource} target="_blank" rel="noreferrer">
        Check the current collection <ArrowUpRight size={14} />
      </a>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search observed switch options"
          placeholder="Search brand, switch or variant"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setLimit(12);
          }}
        />
      </label>
      <output className="catalog-provenance">
        Showing {Math.min(limit, matches.length)} of {matches.length} matching
        options.
      </output>
      <div className="research-product-list">
        {matches.slice(0, limit).map((product, index) => (
          <article
            className="research-product"
            key={`${product.url}|${product.sku}|${product.observedAt}|${index}`}
          >
            <span className="catalog-brand">
              {product.brand} · Store observation
            </span>
            <a href={product.url} target="_blank" rel="noreferrer">
              <strong>
                {product.name} <ArrowUpRight size={14} />
              </strong>
            </a>
            <span>{formatProductPrice(product.pricing)} · Named option</span>
            <span>
              Observed{' '}
              <time dateTime={product.observedAt}>
                {product.observedAt.slice(0, 10)}
              </time>
              {product.availability ? ` · ${product.availability} then` : ''}
            </span>
            <button
              className="text-button"
              onClick={() => onReview(product.url)}
              aria-label={`Review import of ${product.name}`}
            >
              Review import
            </button>
          </article>
        ))}
      </div>
      {!matches.length && (
        <p>No observed options match. Try a brand or switch name.</p>
      )}
      {matches.length > limit && (
        <button
          className="button secondary"
          onClick={() => setLimit(limit + 12)}
        >
          Show more options
        </button>
      )}
    </>
  );
}

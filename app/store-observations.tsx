'use client';
import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { storeListings, storeSource } from '../lib/store-observations';
import { formatProductPrice } from '../lib/product-pricing';

export default function StoreObservations() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const words = query.toLowerCase().trim().split(/\s+/);
  const matches = storeListings.filter((product) => {
    const text =
      `${product.brand} ${product.name} ${product.sku}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });
  return (
    <details className="research-products store-observations">
      <summary>Browse {storeListings.length} observed switch options</summary>
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
        {matches.slice(0, limit).map((product) => (
          <a
            className="research-product"
            key={`${product.url}|${product.sku}`}
            href={product.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="catalog-brand">
              {product.brand} · Store observation
            </span>
            <strong>
              {product.name} <ArrowUpRight size={14} />
            </strong>
            <span>{formatProductPrice(product.pricing)} · Named option</span>
            <span>
              Observed{' '}
              <time dateTime={product.observedAt}>
                {product.observedAt.slice(0, 10)}
              </time>
              {product.availability ? ` · ${product.availability} then` : ''}
            </span>
          </a>
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
    </details>
  );
}

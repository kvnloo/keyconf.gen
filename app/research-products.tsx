'use client';
import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import data from '../data/research-seed.json';

export default function ResearchProducts() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const products = data.products.filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      `${product.brand} ${product.name}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section className="research-products">
      <h3>Explore the product references</h3>
      <p className="muted">
        Keyboard, case and switch observations from the research dataset. These
        references expand the reading list; they do not establish a compatible
        assembly.
      </p>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search research products"
          placeholder="Search keyboards, cases and switches"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <fieldset
        className="catalog-filters"
        aria-label="Research product category"
      >
        {[
          ['all', 'All'],
          ['keyboard', 'Keyboards'],
          ['case', 'Cases'],
          ['switch', 'Switches'],
        ].map(([value, name]) => (
          <button
            key={value}
            aria-pressed={category === value}
            onClick={() => setCategory(value)}
          >
            {name}
          </button>
        ))}
      </fieldset>
      <p className="catalog-provenance">
        Observed {data.accessed_at}. July switch ranks come from kbd.news
        contributor lists, not global sales. ProSettings observations describe
        its tracked VALORANT players. Neither ranks every keyboard or case.
      </p>
      <div className="research-product-list">
        {products.map((product) => {
          const source = data.sources.find(
            (source) => source.id === product.source_id,
          );
          const rank = data.popularity.find(
            (item) =>
              item.product_id === product.id &&
              item.metric === 'aggregated_vendor_rank',
          );
          return (
            <a
              key={product.id}
              href={source?.url}
              target="_blank"
              rel="noreferrer"
              className="research-product"
            >
              <span className="catalog-brand">
                {product.brand} · {product.category}
              </span>
              <strong>
                {product.name} <ArrowUpRight size={14} />
              </strong>
              <span>
                {source?.publisher}
                {rank ? ` · July 2026 contributor rank ${rank.value}` : ''}
              </span>
            </a>
          );
        })}
        {!products.length && (
          <p>No references match. Try a different name or category.</p>
        )}
      </div>
    </section>
  );
}

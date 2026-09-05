'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Globe, LoaderCircle } from 'lucide-react';
import { categories, type Part, type Category } from '../lib/catalog';
import {
  parseStructuredProducts,
  publicUrl,
  type ImportResult,
  type ImportedProduct,
} from '../lib/import-products';
function isResult(x: unknown): x is ImportResult {
  return (
    typeof x === 'object' &&
    x !== null &&
    'products' in x &&
    Array.isArray(x.products) &&
    x.products.every(
      (p: unknown) =>
        typeof p === 'object' &&
        p !== null &&
        [
          'name',
          'brand',
          'url',
          'sku',
          'price',
          'currency',
          'availability',
        ].every((k) => k in p && typeof Reflect.get(p, k) === 'string'),
    ) &&
    ['method', 'source', 'observedAt', 'coverage'].every(
      (k) => k in x && typeof Reflect.get(x, k) === 'string',
    )
  );
}
export default function ImportDialog({
  onAdd,
}: {
  onAdd: (parts: Part[]) => void;
}) {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ImportResult | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [category, setCategory] = useState<Category>('case');
  const [raw, setRaw] = useState('');
  const [added, setAdded] = useState(false);
  const request = useRef<AbortController | null>(null);
  const urlInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function preview() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setBusy(true);
    setError('');
    setResult(null);
    setAdded(false);
    try {
      const source = publicUrl(url).href;
      if (raw.trim()) {
        const products = parseStructuredProducts(
          '<script type="application/ld+json">' + raw + '</script>',
          source,
        );
        if (!products.length)
          throw new Error('This JSON-LD does not contain a Product.');
        setResult({
          products,
          source,
          method: 'Pasted JSON-LD',
          coverage: 'Pasted data only. No live price or stock verification.',
          observedAt: new Date().toISOString(),
        });
        setSelected(new Set(products.map((_, i) => i)));
      } else {
        const response = await fetch(
          window.location.hostname === 'kvnloo.github.io'
            ? 'https://keyconf-studio.kvnloo.chatgpt.site/api/import'
            : '/api/import',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: source }),
            signal: controller.signal,
          },
        );
        const data: unknown = await response.json();
        if (!response.ok) {
          throw new Error(
            typeof data === 'object' &&
              data !== null &&
              'error' in data &&
              typeof data.error === 'string'
              ? data.error
              : 'The store could not be read.',
          );
        }
        if (!isResult(data)) throw new Error('Unexpected importer response.');
        setResult(data);
        setSelected(new Set(data.products.map((_, i) => i)));
      }
    } catch (e) {
      if (controller.signal.aborted) return;
      setError(e instanceof Error ? e.message : 'Import failed.');
      urlInput.current?.focus();
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  }
  function add() {
    if (!result) return;
    const parts: Part[] = result.products.flatMap((p: ImportedProduct, i) =>
      selected.has(i)
        ? [
            {
              id: 'import:' + category + ':' + p.url + ':' + (p.sku || p.name),
              name: p.name,
              brand: p.brand || new URL(result.source).hostname,
              category,
              detail: [
                p.sku,
                p.price && p.currency
                  ? p.currency + ' ' + p.price
                  : 'Price not verified',
                p.availability,
                'Observed ' + result.observedAt.slice(0, 10),
              ]
                .filter(Boolean)
                .join(' · '),
              source: p.url,
              family: 'unverified',
              evidence: 'unknown',
            },
          ]
        : [],
    );
    try {
      onAdd(parts);
      setAdded(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'These products could not be added. Try a smaller selection.',
      );
    }
  }
  return (
    <div className="import-content">
      <div className="modal-icon">
        <Globe size={24} />
      </div>
      <h2>Bring your favorite store.</h2>
      <p className="muted">
        Paste a website or product URL. Review what we find before adding it to
        your parts library.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void preview();
        }}
      >
        <label htmlFor="store-url">Website URL</label>
        <div className="url-row">
          <input
            id="store-url"
            ref={urlInput}
            name="store-url"
            type="url"
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'import-error' : 'import-support'}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-favorite-store.com"
          />
          <button className="button" type="submit" disabled={busy}>
            {busy ? (
              <LoaderCircle className="spin" size={17} />
            ) : (
              <ArrowUpRight size={17} />
            )}{' '}
            {busy ? 'Reading…' : 'Preview'}
          </button>
        </div>
      </form>
      <details>
        <summary>Have a product data export?</summary>
        <p className="muted">
          Paste Product or ProductGroup JSON-LD when a website cannot be read.
        </p>
        <textarea
          aria-label="Product JSON-LD"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={'{"@type":"Product","name":"My keyboard"}'}
        />
      </details>
      <p className="import-note" id="import-support">
        Supports product structured data and public Shopify catalogs. Some
        stores require a dedicated importer. No compatibility or asset rights
        are inferred.
      </p>
      {error && (
        <p className="error-box" role="alert" id="import-error">
          {error} Check the URL and try again, or paste product data above.
        </p>
      )}
      {result && (
        <div className="import-results">
          <div className="result-heading">
            <strong>
              {result.products.length}{' '}
              {result.products.length === 1 ? 'product' : 'products'} found
            </strong>
            <span>{result.method}</span>
          </div>
          <p className="muted">{result.coverage}</p>
          <p className="import-note">
            Observed{' '}
            <time dateTime={result.observedAt}>
              {new Date(result.observedAt).toLocaleString()}
            </time>{' '}
            ·{' '}
            <a href={result.source} target="_blank" rel="noreferrer">
              Source page
            </a>
          </p>
          <label htmlFor="import-category">Add selected products as</label>
          <select
            id="import-category"
            value={category}
            onChange={(e) => {
              const c = categories.find((c) => c === e.target.value);
              if (c) setCategory(c);
            }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <div className="import-list">
            {result.products.map((p, i) => (
              <label key={p.url + p.sku + i} className="import-product">
                <input
                  type="checkbox"
                  checked={selected.has(i)}
                  onChange={() =>
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    })
                  }
                />
                <span>
                  <strong>{p.name}</strong>
                  <small>
                    {p.brand} {p.sku && '· ' + p.sku}
                  </small>
                </span>
                <span>
                  {p.currency} {p.price || '—'}
                  <small>{p.availability || 'Stock unverified'}</small>
                </span>
              </label>
            ))}
          </div>
          <button
            className="button full"
            disabled={!selected.size || added}
            onClick={add}
          >
            {added ? (
              <>
                <Check size={16} /> Added to this browser
              </>
            ) : (
              'Add ' + selected.size + ' selected products'
            )}
          </button>
          <small>
            Imported parts are saved on this device and marked “Needs review”.
          </small>
        </div>
      )}
    </div>
  );
}

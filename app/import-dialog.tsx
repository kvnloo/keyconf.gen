'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Globe, LoaderCircle } from 'lucide-react';
import { categories, type Part, type Category } from '../lib/catalog';
import StudioSelect from './studio-select';
import { formatProductPrice } from '../lib/product-pricing';
import { importEndpoint } from '../lib/import-endpoint';
import {
  parseStructuredProducts,
  publicUrl,
  isImportResult,
  type ImportResult,
  type ImportedProduct,
  type ImportContinuation,
} from '../lib/import-products';
type PreviewResult = Omit<ImportResult, 'products'> & {
  products: (ImportedProduct & { observedAt: string })[];
};
type ImportError = { kind: 'preview' | 'more' | 'add'; message: string };
export default function ImportDialog({
  onAdd,
}: {
  onAdd: (parts: Part[]) => void;
}) {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ImportError | null>(null);
  const [result, setResult] = useState<PreviewResult | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [category, setCategory] = useState<Category>('case');
  const [raw, setRaw] = useState('');
  const [added, setAdded] = useState(false);
  const request = useRef<AbortController | null>(null);
  const urlInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function preview(next?: ImportContinuation) {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setBusy(true);
    setError(null);
    if (!next) setResult(null);
    setAdded(false);
    try {
      const source = next ? next.source : publicUrl(url).href;
      if (!next && raw.trim()) {
        const products = parseStructuredProducts(
          '<script type="application/ld+json">' + raw + '</script>',
          source,
        );
        if (!products.length)
          throw new Error('This JSON-LD does not contain a Product.');
        const observedAt = new Date().toISOString();
        setResult({
          products: products.map((product) => ({ ...product, observedAt })),
          source,
          method: 'Pasted JSON-LD',
          coverage: 'Pasted data only. No live price or stock verification.',
          observedAt,
        });
        setSelected(new Set(products.map((_, i) => i)));
      } else {
        const response = await fetch(
          importEndpoint(new URL(window.location.href)),
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: source, next }),
            signal: controller.signal,
          },
        );
        const data: unknown = await response.json();
        if (controller.signal.aborted) return;
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
        if (!isImportResult(data) || data.source !== source)
          throw new Error('Unexpected importer response.');
        const captured = data.products.map((product) => ({
          ...product,
          observedAt: data.observedAt,
        }));
        if (next && result) {
          const key = (product: ImportedProduct) =>
            JSON.stringify([product.url, product.sku, product.name]);
          const known = new Set(result.products.map(key));
          const additional = captured.filter((product) => {
            const identity = key(product);
            if (known.has(identity)) return false;
            known.add(identity);
            return true;
          });
          setResult({ ...data, products: [...result.products, ...additional] });
        } else {
          setResult({ ...data, products: captured });
          setSelected(new Set(data.products.map((_, i) => i)));
        }
      }
    } catch (e) {
      if (controller.signal.aborted) return;
      setError({
        kind: next ? 'more' : 'preview',
        message: e instanceof Error ? e.message : 'Import failed.',
      });
      if (!next) urlInput.current?.focus();
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  }
  function add() {
    if (!result) return;
    setError(null);
    const parts: Part[] = result.products.flatMap((p, i) =>
      selected.has(i)
        ? [
            {
              id: 'import:' + category + ':' + p.url + ':' + (p.sku || p.name),
              name: p.name,
              brand: p.brand || new URL(result.source).hostname,
              category,
              detail: [
                p.sku,
                formatProductPrice(p.pricing),
                p.availability,
                'Observed ' + p.observedAt.slice(0, 10),
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
      setError({
        kind: 'add',
        message:
          error instanceof Error
            ? error.message
            : 'These products could not be added. Try a smaller selection.',
      });
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
            aria-invalid={error?.kind === 'preview'}
            aria-describedby={
              error?.kind === 'preview' ? 'import-error' : 'import-support'
            }
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
          {error.message}{' '}
          {error.kind === 'preview'
            ? 'Check the URL and try again, or paste product data above.'
            : error.kind === 'more'
              ? 'Try loading this page again. Your earlier choices are still here.'
              : ''}
        </p>
      )}
      {result && (
        <div className="import-results">
          <output
            className="result-heading"
            aria-live="polite"
            aria-atomic="true"
          >
            <strong>
              {result.products.length}{' '}
              {result.products.length === 1 ? 'product' : 'products'} found
            </strong>
            <span>{result.method}</span>
          </output>
          <p className="muted">{result.coverage}</p>
          <p className="import-note">
            Last page observed{' '}
            <time dateTime={result.observedAt}>
              {new Date(result.observedAt).toLocaleString()}
            </time>{' '}
            ·{' '}
            <a href={result.source} target="_blank" rel="noreferrer">
              Source page
            </a>
          </p>
          <label htmlFor="import-category">Add selected products as</label>
          <StudioSelect
            id="import-category"
            value={category}
            onValueChange={(value) => {
              const c = categories.find((c) => c === value);
              if (c) setCategory(c);
            }}
            options={categories.map((c) => ({ value: c, label: c }))}
          />
          <div className="import-list">
            {result.products.map((p, i) => (
              <label key={p.url + p.sku + i} className="import-product">
                <input
                  type="checkbox"
                  checked={selected.has(i)}
                  onChange={() => {
                    setAdded(false);
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      return next;
                    });
                  }}
                />
                <span>
                  <strong>{p.name}</strong>
                  <small>
                    {p.brand} {p.sku && '· ' + p.sku}
                  </small>
                </span>
                <span>
                  {formatProductPrice(p.pricing)}
                  <small>{p.availability || 'Stock unverified'}</small>
                </span>
              </label>
            ))}
          </div>
          {result.next && (
            <button
              className="button secondary full"
              disabled={busy}
              aria-describedby={
                error?.kind === 'more' ? 'import-error' : undefined
              }
              onClick={() => {
                if (result.next) void preview(result.next);
              }}
            >
              {busy ? 'Loading more…' : 'Load more options'}
            </button>
          )}
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

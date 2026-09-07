'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import {
  parseDiscoveryPage,
  type DiscoveryPage,
  type DiscoveryQuery,
} from '../lib/discovery';
import { importEndpoint } from '../lib/import-endpoint';
import { requestText } from '../lib/request-text';
import StudioSelect from './studio-select';
import './community-discovery.css';

type State =
  | { kind: 'loading'; previous: DiscoveryPage | null }
  | { kind: 'ready'; page: DiscoveryPage }
  | { kind: 'error'; previous: DiscoveryPage | null };
export default function CommunityDiscovery() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<DiscoveryQuery['kind']>('all');
  const [request, setRequest] = useState<DiscoveryQuery>({
    query: '',
    kind: 'all',
    cursor: null,
  });
  const [state, setState] = useState<State>({
    kind: 'loading',
    previous: null,
  });
  const [origin, setOrigin] = useState('');
  const pending = useRef<AbortController | null>(null);
  const nextFocus = useRef<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    pending.current = controller;
    const site = new URL(
      importEndpoint(new URL(window.location.href)),
      window.location.href,
    );
    site.pathname = '/api/publications';
    site.search = new URLSearchParams({
      q: request.query,
      kind: request.kind,
      ...(request.cursor
        ? { before: request.cursor.publishedAt, id: request.cursor.id }
        : {}),
    }).toString();
    void (async () => {
      try {
        const response = await fetch(site, {
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(15000),
          ]),
          credentials: 'omit',
        });
        if (!response.ok) throw new Error('Unavailable');
        const raw = await requestText(response, 100_000);
        if (raw === null) throw new Error('Too large');
        const page = parseDiscoveryPage(JSON.parse(raw));
        if (
          request.cursor &&
          page.next?.id === request.cursor.id &&
          page.next.publishedAt === request.cursor.publishedAt
        )
          throw new Error('This publication page did not advance.');
        if (!controller.signal.aborted) {
          setOrigin(site.origin);
          if (request.cursor) nextFocus.current = page.items[0]?.id ?? null;
          setState((previous) => {
            const earlier =
              previous.kind === 'ready' ? previous.page : previous.previous;
            const items =
              request.cursor && earlier
                ? Array.from(
                    new Map(
                      [...earlier.items, ...page.items].map((item) => [
                        item.id,
                        item,
                      ]),
                    ).values(),
                  )
                : page.items;
            return { kind: 'ready', page: { ...page, items } };
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setOrigin(site.origin);
          setState((previous) => ({
            kind: 'error',
            previous:
              previous.kind === 'ready' ? previous.page : previous.previous,
          }));
        }
      }
    })();
    return () => controller.abort();
  }, [request]);
  useEffect(() => {
    if (state.kind === 'ready' && nextFocus.current) {
      document.getElementById(`publication-${nextFocus.current}`)?.focus();
      nextFocus.current = null;
    }
  }, [state]);
  function load(next: DiscoveryQuery) {
    nextFocus.current = null;
    pending.current?.abort();
    setState((previous) => ({
      kind: 'loading',
      previous: next.cursor
        ? previous.kind === 'ready'
          ? previous.page
          : previous.previous
        : null,
    }));
    setRequest(next);
  }
  const page = state.kind === 'ready' ? state.page : state.previous;
  return (
    <section
      className="community-discovery"
      aria-labelledby="community-heading"
    >
      <div>
        <span className="eyebrow">FROM THE COMMUNITY</span>
        <h2 id="community-heading">Built to be shared.</h2>
        <p>
          Explore published builds and creator drops. Open one to hear it,
          inspect its parts, or make a copy.
        </p>
      </div>
      <form
        className="community-search"
        onSubmit={(event) => {
          event.preventDefault();
          load({ query: query.trim(), kind, cursor: null });
        }}
      >
        <label className="community-query">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            aria-label="Search community builds"
            placeholder="Build or creator name"
            maxLength={100}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <StudioSelect
          aria-label="Release type"
          value={kind}
          options={[
            { value: 'all', label: 'All releases' },
            { value: 'build', label: 'Builds' },
            { value: 'drop', label: 'Drops' },
          ]}
          onValueChange={(value) => {
            if (value === 'all' || value === 'build' || value === 'drop')
              setKind(value);
          }}
        />
        <button className="button secondary" type="submit">
          Search
        </button>
      </form>
      <output aria-live="polite">
        {state.kind === 'loading'
          ? 'Loading published builds…'
          : state.kind === 'ready' && !page?.items.length
            ? request.query || request.kind !== 'all'
              ? 'No matching releases. Try another name or release type.'
              : 'No community builds published yet. Shared releases will appear here.'
            : state.kind === 'ready'
              ? `${page?.items.length ?? 0} published builds shown.`
              : ''}
      </output>
      {state.kind === 'error' && (
        <div className="community-error">
          <p role="alert">Published builds could not load.</p>
          <button
            className="button secondary"
            onClick={() => load({ ...request })}
          >
            Try again
          </button>
        </div>
      )}
      {!!page?.items.length && (
        <ul className="community-grid">
          {page.items.map((item) => (
            <li key={item.id}>
              <a
                id={`publication-${item.id}`}
                href={`${origin}/builds/${encodeURIComponent(item.id)}`}
              >
                <span className="eyebrow">
                  {item.kind === 'drop' ? 'CREATOR DROP' : 'COMMUNITY BUILD'}
                </span>
                <h3>{item.title}</h3>
                <p>
                  {item.author.displayName} <span>@{item.author.handle}</span>
                </p>
                <div>
                  <time dateTime={item.publishedAt}>
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </time>
                  <span>
                    Experience build{' '}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
      {state.kind !== 'error' && page?.next && (
        <button
          className="button secondary"
          disabled={state.kind === 'loading'}
          onClick={() => load({ ...request, cursor: page.next })}
        >
          Load more builds
        </button>
      )}
    </section>
  );
}

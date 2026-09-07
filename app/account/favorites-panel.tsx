'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Heart, LockKeyhole } from 'lucide-react';
import {
  CommunityClientError,
  createCommunityClient,
  type FavoriteCursor,
  type FavoritePage,
} from '../../lib/community-client';
import './favorites-panel.css';

const client = createCommunityClient();

function failure(cause: unknown) {
  return cause instanceof CommunityClientError
    ? cause.message
    : 'Your favorites could not be reached. Try again.';
}

type FavoriteButtonProps = {
  publicationId: string;
  favorite?: boolean;
  title?: string;
  onChange?: (favorite: boolean) => void;
};

export function FavoriteButton(props: FavoriteButtonProps) {
  return (
    <FavoriteControl
      key={`${props.publicationId}:${props.favorite ?? false}`}
      {...props}
    />
  );
}

function FavoriteControl({
  publicationId,
  favorite = false,
  title = 'this build',
  onChange,
}: FavoriteButtonProps) {
  const [saved, setSaved] = useState(favorite);
  const [state, setState] = useState<
    { kind: 'idle' } | { kind: 'saving' } | { kind: 'error'; message: string }
  >({ kind: 'idle' });
  const pending = useRef<AbortController | null>(null);
  const errorId = useId();

  useEffect(() => () => pending.current?.abort(), []);

  async function toggle() {
    if (pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setState({ kind: 'saving' });
    try {
      const result = await client.setFavorite(publicationId, !saved, {
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      setSaved(result.favorite);
      setState({ kind: 'idle' });
      onChange?.(result.favorite);
    } catch (cause) {
      if (!controller.signal.aborted)
        setState({ kind: 'error', message: failure(cause) });
    } finally {
      if (pending.current === controller) pending.current = null;
    }
  }

  return (
    <div className="favorite-control">
      <button
        type="button"
        className="favorite-button"
        aria-label={
          saved ? `Remove ${title} from favorites` : `Add ${title} to favorites`
        }
        aria-describedby={state.kind === 'error' ? errorId : undefined}
        disabled={state.kind === 'saving'}
        onClick={() => void toggle()}
      >
        <Heart
          size={16}
          fill={saved ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        {state.kind === 'saving'
          ? saved
            ? 'Removing…'
            : 'Adding…'
          : saved
            ? 'Remove favorite'
            : 'Add to favorites'}
      </button>
      {state.kind === 'error' && (
        <p id={errorId} role="alert">
          {state.message} Retry with the button above.
        </p>
      )}
    </div>
  );
}

type ListState =
  | { kind: 'loading'; page: FavoritePage | null }
  | { kind: 'ready'; page: FavoritePage }
  | { kind: 'error'; page: FavoritePage | null; message: string };

export default function FavoritesPanel({
  refreshKey = 0,
}: {
  refreshKey?: number;
}) {
  return <FavoritesList key={refreshKey} />;
}

function FavoritesList() {
  const [state, setState] = useState<ListState>({
    kind: 'loading',
    page: null,
  });
  const [request, setRequest] = useState<{ cursor: FavoriteCursor | null }>({
    cursor: null,
  });
  const [notice, setNotice] = useState('');
  const pending = useRef<AbortController | null>(null);
  const removed = useRef(new Set<string>());
  const heading = useRef<HTMLHeadingElement | null>(null);
  const headingId = useId();

  useEffect(() => {
    const controller = new AbortController();
    pending.current = controller;
    void client
      .listFavorites(request.cursor, { signal: controller.signal })
      .then(
        (page) => {
          if (controller.signal.aborted) return;
          setState((current) => {
            const earlier = request.cursor ? (current.page?.items ?? []) : [];
            const items = Array.from(
              new Map(
                [...earlier, ...page.items]
                  .filter((item) => !removed.current.has(item.publicationId))
                  .map((item) => [item.publicationId, item]),
              ).values(),
            );
            return { kind: 'ready', page: { ...page, items } };
          });
        },
        (cause: unknown) => {
          if (!controller.signal.aborted)
            setState((current) => ({
              kind: 'error',
              page: current.page,
              message: failure(cause),
            }));
        },
      );
    return () => controller.abort();
  }, [request]);

  function load(cursor: FavoriteCursor | null) {
    pending.current?.abort();
    setNotice('');
    setState((current) => ({ kind: 'loading', page: current.page }));
    setRequest({ cursor });
  }

  function remove(publicationId: string) {
    removed.current.add(publicationId);
    setState((current) =>
      current.page
        ? {
            ...current,
            page: {
              ...current.page,
              items: current.page.items.filter(
                (item) => item.publicationId !== publicationId,
              ),
            },
          }
        : current,
    );
    setNotice('Removed from your favorites.');
    heading.current?.focus();
  }

  const page = state.page;
  return (
    <section className="favorites-panel" aria-labelledby={headingId}>
      <header>
        <span className="favorites-eyebrow">
          <LockKeyhole size={13} aria-hidden="true" /> ONLY YOU
        </span>
        <h2 id={headingId} ref={heading} tabIndex={-1}>
          Your favorites
        </h2>
        <p>
          Keep published builds and creator drops close. Your favorites are
          private.
        </p>
      </header>
      <output className="favorites-status" aria-live="polite">
        {state.kind === 'loading'
          ? page
            ? 'Loading more favorites…'
            : 'Loading favorites…'
          : notice ||
            (page?.items.length ? `${page.items.length} favorites shown.` : '')}
      </output>
      {state.kind === 'error' && (
        <div className="favorites-error">
          <p role="alert">{state.message}</p>
          <button
            type="button"
            className="favorite-button"
            onClick={() => load(request.cursor)}
          >
            Try again
          </button>
        </div>
      )}
      {state.kind === 'ready' && !page?.items.length && (
        <div className="favorites-empty">
          <Heart size={24} aria-hidden="true" />
          <h3>
            {page?.next ? 'No favorites on this page' : 'No favorites yet'}
          </h3>
          <p>
            {page?.next
              ? 'Load more to see your earlier favorites.'
              : 'Builds you favorite will appear here as links to their published releases.'}
          </p>
        </div>
      )}
      {!!page?.items.length && (
        <ul className="favorites-list">
          {page.items.map((item) => (
            <li key={item.publicationId}>
              <div className="favorite-details">
                <span className="favorites-eyebrow">
                  {item.status === 'unavailable'
                    ? 'UNAVAILABLE'
                    : item.kind === 'drop'
                      ? 'CREATOR DROP'
                      : 'PUBLISHED BUILD'}
                </span>
                <h3>
                  {item.status === 'available' ? (
                    <a
                      href={`/builds/${encodeURIComponent(item.publicationId)}`}
                    >
                      {item.title} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    'This release is unavailable'
                  )}
                </h3>
                {item.status === 'unavailable' && (
                  <p>You can remove it from your favorites.</p>
                )}
              </div>
              <FavoriteButton
                publicationId={item.publicationId}
                favorite
                title={
                  item.status === 'available'
                    ? item.title
                    : 'this unavailable release'
                }
                onChange={(favorite) => {
                  if (!favorite) remove(item.publicationId);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      {page?.next && state.kind !== 'error' && (
        <button
          type="button"
          className="favorite-button"
          disabled={state.kind === 'loading'}
          onClick={() => load(page.next)}
        >
          {state.kind === 'loading' ? 'Loading…' : 'Load more favorites'}
        </button>
      )}
    </section>
  );
}

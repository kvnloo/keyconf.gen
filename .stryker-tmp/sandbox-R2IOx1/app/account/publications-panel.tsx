// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createCommunityClient,
  type OwnedPublicationPage,
} from '../../lib/community-client';

const client = createCommunityClient();
function message(cause: unknown) {
  return cause instanceof Error
    ? cause.message
    : 'Your publications could not be reached. Try again.';
}

export default function PublicationsPanel() {
  const [page, setPage] = useState<OwnedPublicationPage | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const lifetime = useRef<AbortController | null>(null);
  const pending = useRef(false);
  const focusId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    lifetime.current = controller;
    pending.current = true;
    void client
      .listOwnedPublications(null, { signal: controller.signal })
      .then((next) => {
        if (!controller.signal.aborted) setPage(next);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(message(cause));
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          pending.current = false;
          setBusy(false);
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (focusId.current) {
      document.getElementById(`publication-${focusId.current}`)?.focus();
      focusId.current = null;
    }
  }, [page]);

  async function load(more: boolean) {
    const signal = lifetime.current?.signal;
    if (!signal || pending.current) return;
    pending.current = true;
    setBusy(true);
    setError('');
    try {
      const next = await client.listOwnedPublications(
        more ? page?.next : null,
        { signal },
      );
      if (signal.aborted) return;
      if (more) focusId.current = next.items[0]?.id ?? null;
      setPage((current) => {
        if (!more || !current) return next;
        const existing = new Set(current.items.map((item) => item.id));
        return {
          items: [
            ...current.items,
            ...next.items.filter((item) => !existing.has(item.id)),
          ],
          next: next.next,
        };
      });
    } catch (cause) {
      if (!signal.aborted) setError(message(cause));
    } finally {
      pending.current = false;
      if (!signal.aborted) setBusy(false);
    }
  }

  async function withdraw(id: string) {
    const signal = lifetime.current?.signal;
    if (!signal || pending.current) return;
    pending.current = true;
    setBusy(true);
    setError('');
    try {
      const receipt = await client.withdrawPublication(id, { signal });
      if (signal.aborted) return;
      focusId.current = id;
      setPage(
        (current) =>
          current && {
            ...current,
            items: current.items.map((item) =>
              item.id === id
                ? { ...item, withdrawnAt: receipt.withdrawnAt }
                : item,
            ),
          },
      );
      setConfirm(null);
      setNotice(
        'Publication withdrawn. Your private saved build is unchanged.',
      );
    } catch (cause) {
      if (!signal.aborted)
        setError(
          message(cause) + ' You can retry withdrawing this same publication.',
        );
    } finally {
      pending.current = false;
      if (!signal.aborted) setBusy(false);
    }
  }

  return (
    <section aria-label="Your publications">
      <h2>Published builds and drops</h2>
      <p>
        Share a published revision or withdraw it from the site. Copies already
        saved by others cannot be recalled.
      </p>
      {error && <p role="alert">{error}</p>}
      <button
        disabled={busy || confirm !== null}
        onClick={() => void load(false)}
      >
        {busy ? 'Updating publications…' : 'Refresh publications'}
      </button>
      {page?.items.length === 0 && (
        <p>No publications yet. Prepare one from a saved build.</p>
      )}
      <ul className="account-build-list">
        {page?.items.map((item) => (
          <li key={item.id} id={`publication-${item.id}`} tabIndex={-1}>
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.kind === 'drop' ? 'Creator drop' : 'Build'} ·{' '}
                {item.withdrawnAt ? 'Withdrawn' : 'Published'}
              </p>
            </div>
            {!item.withdrawnAt && (
              <>
                <a href={`/builds/${encodeURIComponent(item.id)}`}>
                  View publication
                </a>
                {confirm === item.id ? (
                  <div>
                    <p>
                      Withdraw {item.title}? Its public preview will become
                      unavailable.
                    </p>
                    <button
                      disabled={busy}
                      onClick={() => void withdraw(item.id)}
                    >
                      Confirm withdrawal
                    </button>
                    <button disabled={busy} onClick={() => setConfirm(null)}>
                      Keep published
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={busy || confirm !== null}
                    onClick={() => setConfirm(item.id)}
                    aria-label={`Withdraw ${item.title}`}
                  >
                    Withdraw
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {page?.next && (
        <button
          disabled={busy || confirm !== null}
          onClick={() => void load(true)}
        >
          Load more publications
        </button>
      )}
      <output>{notice}</output>
    </section>
  );
}

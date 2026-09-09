// @ts-nocheck
'use client';

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Build } from '../../lib/build';
import type { CommunityProfile, SaveBuildRequest } from '../../lib/community';
import {
  CommunityClientError,
  createCommunityClient,
  type SavedBuildPage,
} from '../../lib/community-client';
import PublicationsPanel from './publications-panel';
import './account-panel.css';

const PublicationReview = lazy(() => import('./publication-review'));
const client = createCommunityClient();
const emptyProfile: CommunityProfile = {
  handle: '',
  displayName: '',
  bio: '',
  links: [],
};
type SaveState =
  | { kind: 'idle' }
  | { kind: 'saving'; request: SaveBuildRequest }
  | { kind: 'failed'; request: SaveBuildRequest; message: string }
  | { kind: 'saved'; name: string };

export default function AccountPanel({
  draft,
  onOpen,
}: {
  draft: Build;
  onOpen: (build: Build) => void;
}) {
  const [page, setPage] = useState<SavedBuildPage | null>(null);
  const [profile, setProfile] = useState<CommunityProfile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expired, setExpired] = useState(false);
  const [save, setSave] = useState<SaveState>({ kind: 'idle' });
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [moreBusy, setMoreBusy] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [reviewId, setReviewId] = useState<string | null>(null);
  const lifetime = useRef<AbortController | null>(null);
  const pendingSave = useRef<SaveBuildRequest | null>(null);
  const nextFocus = useRef<string | null>(null);

  const failure = useCallback((cause: unknown) => {
    if (
      cause instanceof CommunityClientError &&
      cause.code === 'authentication_required'
    ) {
      setExpired(true);
      const message =
        'Your session ended. Sign in again, then retry. Your device draft is unchanged.';
      setError(message);
      return message;
    }
    return cause instanceof Error
      ? cause.message
      : 'Your account could not be reached. Try again.';
  }, []);

  const load = useCallback(
    (signal: AbortSignal) =>
      Promise.all([
        client.readProfile({ signal }),
        client.listBuilds(null, { signal }),
      ])
        .then(([nextProfile, nextPage]) => {
          if (signal.aborted) return;
          setProfile(nextProfile ?? emptyProfile);
          setPage(nextPage);
          setExpired(false);
          setError('');
        })
        .catch((cause: unknown) => {
          if (!signal.aborted) setError(failure(cause));
        })
        .finally(() => {
          if (!signal.aborted) setLoading(false);
        }),
    [failure],
  );

  useEffect(() => {
    const controller = new AbortController();
    lifetime.current = controller;
    void load(controller.signal);
    return () => lifetime.current?.abort();
  }, [load]);

  useEffect(() => {
    if (nextFocus.current) {
      document.getElementById(`account-build-${nextFocus.current}`)?.focus();
      nextFocus.current = null;
    }
  }, [page]);

  function retryAccount() {
    lifetime.current?.abort();
    const controller = new AbortController();
    lifetime.current = controller;
    pendingSave.current = null;
    setProfileBusy(false);
    setMoreBusy(false);
    setOpening(null);
    setSave((current) =>
      current.kind === 'saving'
        ? {
            kind: 'failed',
            request: current.request,
            message:
              'The save was interrupted before confirmation. Retry the same snapshot.',
          }
        : current,
    );
    setLoading(true);
    setError('');
    void load(controller.signal);
  }

  async function saveDraft() {
    if (pendingSave.current || expired) return;
    const signal = lifetime.current?.signal;
    if (!signal) return;
    const request =
      save.kind === 'failed'
        ? save.request
        : { operationId: crypto.randomUUID(), build: structuredClone(draft) };
    pendingSave.current = request;
    setSave({ kind: 'saving', request });
    try {
      const saved = await client.saveBuild(request, { signal });
      if (signal.aborted) return;
      setSave({ kind: 'saved', name: saved.name });
      setPage(
        (current) =>
          current && {
            ...current,
            items: [
              saved,
              ...current.items.filter((item) => item.id !== saved.id),
            ].sort((left, right) => {
              if (left.createdAt !== right.createdAt)
                return left.createdAt > right.createdAt ? -1 : 1;
              return left.id === right.id ? 0 : left.id > right.id ? -1 : 1;
            }),
          },
      );
    } catch (cause) {
      if (!signal.aborted)
        setSave({ kind: 'failed', request, message: failure(cause) });
    } finally {
      if (pendingSave.current === request) pendingSave.current = null;
    }
  }

  async function saveProfile() {
    if (profileBusy || expired) return;
    const signal = lifetime.current?.signal;
    if (!signal) return;
    setProfileBusy(true);
    setProfileMessage('');
    try {
      const saved = await client.saveProfile(profile, { signal });
      if (!signal.aborted) {
        setProfile(saved);
        setProfileMessage('Profile saved. Nothing has been published.');
      }
    } catch (cause) {
      if (!signal.aborted) setProfileMessage(failure(cause));
    } finally {
      if (!signal.aborted) setProfileBusy(false);
    }
  }

  async function loadMore() {
    if (!page?.next || moreBusy || expired) return;
    const signal = lifetime.current?.signal;
    if (!signal) return;
    setMoreBusy(true);
    setError('');
    try {
      const next = await client.listBuilds(page.next, { signal });
      if (signal.aborted) return;
      nextFocus.current = next.items[0]?.id ?? null;
      setPage((current) => {
        if (!current) return current;
        const existing = new Set(current.items.map((item) => item.id));
        const added = next.items.filter((item) => !existing.has(item.id));
        return { items: [...current.items, ...added], next: next.next };
      });
      setNotice('More saved builds loaded.');
    } catch (cause) {
      if (!signal.aborted) setError(failure(cause));
    } finally {
      if (!signal.aborted) setMoreBusy(false);
    }
  }

  async function openBuild(id: string) {
    if (opening || expired) return;
    const signal = lifetime.current?.signal;
    if (!signal) return;
    setOpening(id);
    setError('');
    try {
      const saved = await client.readBuild(id, { signal });
      if (!signal.aborted) {
        onOpen(saved.build);
        setNotice(
          `${saved.name} opened in your studio. Undo returns to your previous build.`,
        );
      }
    } catch (cause) {
      if (!signal.aborted) setError(failure(cause));
    } finally {
      if (!signal.aborted) setOpening(null);
    }
  }

  return (
    <section
      className="account-panel"
      aria-label="Your account"
      aria-busy={loading}
    >
      <header>
        <span className="account-eyebrow">YOUR WORKSPACE</span>
        <h1>Your builds</h1>
        <p>Private snapshots of the keyboards you want to make.</p>
      </header>
      {loading && <output>Loading your account…</output>}
      {error && <p role="alert">{error}</p>}
      {(!page || expired) && !loading && (
        <button onClick={retryAccount}>Retry account</button>
      )}
      {page && !expired && !loading && (
        <>
          <section
            className="account-current"
            aria-label="Current device draft"
          >
            <div>
              <span className="account-eyebrow">ON THIS DEVICE</span>
              <h2>{draft.name}</h2>
              <p>Save a private snapshot. Your studio stays editable.</p>
            </div>
            <button
              onClick={() => void saveDraft()}
              disabled={save.kind === 'saving'}
            >
              {save.kind === 'saving'
                ? 'Saving snapshot…'
                : save.kind === 'failed'
                  ? `Retry saving ${save.request.build.name}`
                  : 'Save current build'}
            </button>
            <div className="account-receipt" aria-live="polite">
              {save.kind === 'saved' && `${save.name} saved to your account.`}
              {save.kind === 'failed' && (
                <>
                  <p role="alert">
                    {save.message} Retry sends the same snapshot.
                  </p>
                  <button onClick={() => setSave({ kind: 'idle' })}>
                    Use current draft for a new save
                  </button>
                  <p>
                    If the connection failed, the earlier snapshot may already
                    be saved. Check My builds before creating another.
                  </p>
                </>
              )}
            </div>
          </section>
          <section aria-labelledby="account-builds-heading">
            <h2 id="account-builds-heading">
              My builds <small>Private</small>
            </h2>
            <p>
              Opening a snapshot changes your device draft. Undo restores the
              previous build.
            </p>
            {!page.items.length && (
              <p>No saved builds yet. Start with the keyboard on your desk.</p>
            )}
            <ul className="account-build-list">
              {page.items.map((item) => (
                <li key={item.id} id={`account-build-${item.id}`} tabIndex={-1}>
                  <div>
                    <h3>{item.name}</h3>
                    <time dateTime={item.createdAt}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <button
                    disabled={opening !== null}
                    onClick={() => void openBuild(item.id)}
                    aria-label={`Open ${item.name}`}
                  >
                    {opening === item.id ? 'Opening…' : 'Open in studio'}
                  </button>
                  <button
                    id={`account-publish-${item.id}`}
                    disabled={reviewId !== null}
                    onClick={() => setReviewId(item.id)}
                    aria-label={`Prepare publication for ${item.name}`}
                  >
                    Prepare publication
                  </button>
                </li>
              ))}
            </ul>
            {page.next && (
              <button aria-disabled={moreBusy} onClick={() => void loadMore()}>
                {moreBusy ? 'Loading more…' : 'Load more saved builds'}
              </button>
            )}
            <output>{notice}</output>
          </section>
          <PublicationsPanel />
          {reviewId && (
            <Suspense fallback={<output>Loading publication review…</output>}>
              <PublicationReview
                savedBuildId={reviewId}
                onCancel={() => {
                  const button = document.getElementById(
                    `account-publish-${reviewId}`,
                  );
                  setReviewId(null);
                  requestAnimationFrame(() => button?.focus());
                }}
              />
            </Suspense>
          )}
          <details id="account-profile" className="account-profile">
            <summary>Your creator profile</summary>
            <p>
              Choose the identity you want to share. Saving this profile does
              not publish it or your builds.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void saveProfile();
              }}
            >
              <fieldset disabled={profileBusy}>
                <legend className="sr-only">Creator identity</legend>
                <label>
                  Display name
                  <input
                    required
                    maxLength={60}
                    autoComplete="off"
                    value={profile.displayName}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        displayName: event.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Handle
                  <input
                    required
                    minLength={3}
                    maxLength={24}
                    autoCapitalize="none"
                    spellCheck={false}
                    value={profile.handle}
                    onChange={(event) =>
                      setProfile({ ...profile, handle: event.target.value })
                    }
                  />
                </label>
                <label>
                  About you
                  <input
                    maxLength={160}
                    value={profile.bio}
                    onChange={(event) =>
                      setProfile({ ...profile, bio: event.target.value })
                    }
                  />
                </label>
                {profile.links.map((link, index) => (
                  <div className="account-profile-link" key={index}>
                    <label>
                      Link {index + 1} label
                      <input
                        required
                        maxLength={40}
                        value={link.label}
                        onChange={(event) =>
                          setProfile({
                            ...profile,
                            links: profile.links.map((item, position) =>
                              position === index
                                ? { ...item, label: event.target.value }
                                : item,
                            ),
                          })
                        }
                      />
                    </label>
                    <label>
                      Link {index + 1} URL
                      <input
                        required
                        type="url"
                        maxLength={2048}
                        placeholder="https://"
                        value={link.url}
                        onChange={(event) =>
                          setProfile({
                            ...profile,
                            links: profile.links.map((item, position) =>
                              position === index
                                ? { ...item, url: event.target.value }
                                : item,
                            ),
                          })
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          links: profile.links.filter(
                            (_, position) => position !== index,
                          ),
                        })
                      }
                    >
                      Remove link {index + 1}
                    </button>
                  </div>
                ))}
                {profile.links.length < 5 && (
                  <button
                    type="button"
                    onClick={() =>
                      setProfile({
                        ...profile,
                        links: [...profile.links, { label: '', url: '' }],
                      })
                    }
                  >
                    Add creator link
                  </button>
                )}
                <button type="submit">
                  {profileBusy ? 'Saving profile…' : 'Save profile'}
                </button>
              </fieldset>
              <output>{profileMessage}</output>
            </form>
          </details>
        </>
      )}
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import type { CommunityProfile, SavedBuild } from '../../lib/community';
import {
  CommunityClientError,
  createCommunityClient,
  type PublicationReceipt,
} from '../../lib/community-client';
import {
  parsePublicationRequest,
  type PublicationRequest,
} from '../../lib/publication';
import { createBuildThumbnail } from '../../lib/build-thumbnail';
import BuildThumbnail from '../build-thumbnail';
import AccessoryFitNotes from '../accessory-fit-notes';
import './account-panel.css';
import './publication-review.css';

const client = createCommunityClient();
type Ready = { saved: SavedBuild; profile: CommunityProfile | null };
type Load =
  | { kind: 'loading' }
  | { kind: 'ready'; value: Ready }
  | { kind: 'failed'; message: string };
type Decision =
  | { kind: 'editing'; notice: string }
  | { kind: 'review'; request: PublicationRequest; profile: CommunityProfile }
  | {
      kind: 'publishing';
      request: PublicationRequest;
      profile: CommunityProfile;
    }
  | {
      kind: 'failed';
      request: PublicationRequest;
      profile: CommunityProfile;
      message: string;
      profileRequired: boolean;
    }
  | { kind: 'complete'; receipt: PublicationReceipt };

function message(cause: unknown) {
  if (cause instanceof CommunityClientError) {
    if (cause.code === 'authentication_required')
      return 'Your session ended. Sign in again in another tab, then retry here. Your prepared details and publication request are kept while this screen stays open.';
    if (cause.code === 'operation_conflict')
      return 'This publication operation already has different content. Check your publications before starting another operation.';
  }
  return cause instanceof Error
    ? cause.message
    : 'The publication response could not be confirmed. Try again.';
}

export default function PublicationReview(props: {
  savedBuildId: string;
  onCancel: () => void;
}) {
  return <Review key={props.savedBuildId} {...props} />;
}

function Review({
  savedBuildId,
  onCancel,
}: {
  savedBuildId: string;
  onCancel: () => void;
}) {
  const [load, setLoad] = useState<Load>({ kind: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [decision, setDecision] = useState<Decision>({
    kind: 'editing',
    notice: '',
  });
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [drop, setDrop] = useState(false);
  const [availability, setAvailability] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const lifetime = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const heading = useRef<HTMLHeadingElement | null>(null);
  const notice = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    lifetime.current = controller;
    void Promise.all([
      client.readBuild(savedBuildId, { signal: controller.signal }),
      client.readProfile({ signal: controller.signal }),
    ])
      .then(([saved, profile]) => {
        if (controller.signal.aborted) return;
        setLoad({ kind: 'ready', value: { saved, profile } });
        setTitle((current) => current || saved.name);
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setLoad({ kind: 'failed', message: message(cause) });
      });
    return () => controller.abort();
  }, [savedBuildId, attempt]);

  useEffect(() => {
    heading.current?.focus();
  }, [load.kind, decision.kind]);
  useEffect(() => {
    if (error) notice.current?.focus();
  }, [error]);

  function editProfile() {
    const details = document.getElementById('account-profile');
    if (details instanceof HTMLDetailsElement) details.open = true;
    details?.querySelector('summary')?.focus();
  }

  async function refreshProfile() {
    const signal = lifetime.current?.signal;
    if (!signal || busy.current || refreshing) return;
    setRefreshing(true);
    setError('');
    try {
      const profile = await client.readProfile({ signal });
      if (signal.aborted) return;
      setLoad((current) =>
        current.kind === 'ready'
          ? { kind: 'ready', value: { ...current.value, profile } }
          : current,
      );
      if (profile)
        setDecision((current) =>
          current.kind === 'failed' && current.profileRequired
            ? { ...current, profile, profileRequired: false }
            : current,
        );
      setError(
        profile
          ? 'Creator profile refreshed. Review the profile before publishing.'
          : 'Choose and save your creator profile, then refresh it here. Your details are kept.',
      );
    } catch (cause) {
      if (!signal.aborted) setError(message(cause));
    } finally {
      if (!signal.aborted) setRefreshing(false);
    }
  }

  function review() {
    if (
      load.kind !== 'ready' ||
      !load.value.profile ||
      !load.value.saved.evidence
    )
      return;
    try {
      const request = parsePublicationRequest({
        operationId: savedBuildId,
        buildId: savedBuildId,
        title,
        note,
        ...(drop
          ? {
              kind: 'drop',
              availability,
              externalUrl: externalUrl.trim() || null,
            }
          : { kind: 'build' }),
      });
      setError('');
      setDecision({
        kind: 'review',
        request,
        profile: structuredClone(load.value.profile),
      });
    } catch (cause) {
      setError(message(cause));
    }
  }

  async function publish() {
    const signal = lifetime.current?.signal;
    if (
      !signal ||
      busy.current ||
      (decision.kind !== 'review' && decision.kind !== 'failed')
    )
      return;
    const request =
      decision.kind === 'failed'
        ? decision.request
        : parsePublicationRequest({
            ...decision.request,
            operationId: crypto.randomUUID(),
          });
    const profile = decision.profile;
    busy.current = true;
    setError('');
    setDecision({ kind: 'publishing', request, profile });
    try {
      const receipt = await client.publishBuild(request, { signal });
      if (!signal.aborted) setDecision({ kind: 'complete', receipt });
    } catch (cause) {
      if (!signal.aborted)
        setDecision({
          kind: 'failed',
          request,
          profile,
          message: message(cause),
          profileRequired:
            cause instanceof CommunityClientError &&
            cause.code === 'profile_required',
        });
    } finally {
      busy.current = false;
    }
  }

  const ready = load.kind === 'ready' ? load.value : null;
  const reviewing =
    decision.kind === 'review' ||
    decision.kind === 'publishing' ||
    decision.kind === 'failed'
      ? decision
      : null;
  const missingProfile =
    !!ready &&
    (!ready.profile ||
      (decision.kind === 'failed' && decision.profileRequired));
  const screenTitle =
    decision.kind === 'complete'
      ? 'Publication receipt'
      : decision.kind === 'editing'
        ? 'Prepare publication'
        : 'Review publication';

  return (
    <section
      className="account-panel publication-review"
      aria-label="Prepare publication"
      aria-busy={load.kind === 'loading' || decision.kind === 'publishing'}
    >
      <span className="account-eyebrow">CREATOR PUBLICATION</span>
      <h1 ref={heading} tabIndex={-1}>
        {screenTitle}
      </h1>
      {load.kind === 'loading' && (
        <output>Loading your saved revision and creator profile…</output>
      )}
      {load.kind === 'failed' && (
        <>
          <p role="alert">{load.message}</p>
          <button
            onClick={() => {
              setLoad({ kind: 'loading' });
              setAttempt((value) => value + 1);
            }}
          >
            Retry saved revision
          </button>
        </>
      )}
      {error && (
        <p ref={notice} tabIndex={-1} role="alert">
          {error}
        </p>
      )}
      {ready && decision.kind !== 'complete' && (
        <>
          <section aria-label="Saved revision">
            <h2>{ready.saved.name}</h2>
            <p>
              Saved revision from{' '}
              <time dateTime={ready.saved.createdAt}>
                {new Date(ready.saved.createdAt).toLocaleString()}
              </time>
              . This publication uses this saved revision. Later studio edits do
              not change it.
            </p>
            <Snapshot
              saved={ready.saved}
              publicTitle={reviewing?.request.title ?? title}
            />
          </section>
          {missingProfile && (
            <output>
              Choose and save a creator profile before publishing. Your prepared
              details stay here.
            </output>
          )}
          {(decision.kind === 'editing' || missingProfile) && (
            <div className="publication-actions">
              <a href="#account-profile" onClick={editProfile}>
                Edit creator profile
              </a>
              <button
                disabled={refreshing}
                onClick={() => void refreshProfile()}
              >
                {refreshing ? 'Refreshing profile…' : 'Refresh creator profile'}
              </button>
            </div>
          )}
          {decision.kind === 'editing' && (
            <>
              {decision.notice && <output>{decision.notice}</output>}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  review();
                }}
              >
                <fieldset>
                  <legend>Publication details</legend>
                  <div className="publication-kind">
                    <label>
                      <input
                        type="radio"
                        name="publication-kind"
                        checked={!drop}
                        onChange={() => setDrop(false)}
                      />{' '}
                      Build
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="publication-kind"
                        checked={drop}
                        onChange={() => setDrop(true)}
                      />{' '}
                      Creator drop
                    </label>
                  </div>
                  <label>
                    Publication title
                    <input
                      required
                      maxLength={80}
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </label>
                  <label>
                    Creator note <small>Optional, plain text</small>
                    <textarea
                      rows={4}
                      maxLength={1200}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </label>
                  {drop && (
                    <>
                      <label>
                        Availability <small>Optional, in your own words</small>
                        <input
                          maxLength={240}
                          value={availability}
                          onChange={(event) =>
                            setAvailability(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        Original purchase or enquiry link{' '}
                        <small>Optional, HTTPS</small>
                        <input
                          type="url"
                          maxLength={2048}
                          placeholder="https://"
                          value={externalUrl}
                          onChange={(event) =>
                            setExternalUrl(event.target.value)
                          }
                        />
                      </label>
                      <p>
                        Describe only the availability you know. Visitors follow
                        your original link for purchase or enquiries.
                      </p>
                    </>
                  )}
                  <button
                    disabled={
                      !ready.profile || !ready.saved.evidence || refreshing
                    }
                    type="submit"
                  >
                    Review publication
                  </button>
                </fieldset>
              </form>
            </>
          )}
          {reviewing && (
            <section aria-label="Public information">
              <h2>{reviewing.request.title}</h2>
              <p>
                {reviewing.request.kind === 'drop' ? 'Creator drop' : 'Build'}{' '}
                by {reviewing.profile.displayName} · @{reviewing.profile.handle}
              </p>
              {reviewing.profile.bio && <p>{reviewing.profile.bio}</p>}
              <ul>
                {reviewing.profile.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="publication-note">
                {reviewing.request.note || 'No creator note.'}
              </p>
              {reviewing.request.kind === 'drop' && (
                <>
                  <p>
                    Availability:{' '}
                    {reviewing.request.availability || 'Not specified'}
                  </p>
                  {reviewing.request.externalUrl && (
                    <a
                      href={reviewing.request.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {reviewing.request.externalUrl}
                    </a>
                  )}
                </>
              )}
              <p>
                Anyone with access to the public site can view and copy this
                configuration, creator profile, note and original source links.
                Private account identifiers, email and unrelated saves are
                excluded.
              </p>
              {decision.kind === 'failed' && (
                <>
                  <p role="alert">{decision.message}</p>
                  <p>
                    A release may already exist if the response was lost. Retry
                    sends the same saved revision and details with the same
                    operation ID. Check your publications before starting
                    another operation.
                  </p>
                </>
              )}
              <div className="publication-actions">
                <button
                  disabled={decision.kind === 'publishing' || refreshing}
                  onClick={() => void publish()}
                >
                  {decision.kind === 'publishing'
                    ? 'Publishing…'
                    : decision.kind === 'failed'
                      ? 'Retry same publication'
                      : reviewing.request.kind === 'drop'
                        ? 'Publish drop'
                        : 'Publish build'}
                </button>
                <button
                  className="publication-secondary"
                  disabled={decision.kind === 'publishing'}
                  onClick={() => {
                    setError('');
                    setDecision({
                      kind: 'editing',
                      notice:
                        decision.kind === 'failed'
                          ? 'The earlier release may already exist. Check your publications before confirming a new operation. Your entered details are kept.'
                          : '',
                    });
                  }}
                >
                  Return to editing
                </button>
              </div>
            </section>
          )}
        </>
      )}
      {decision.kind === 'complete' && (
        <div aria-live="polite">
          {decision.receipt.status === 'published' ? (
            <>
              <h2>{decision.receipt.title} published</h2>
              <p>
                Published as {decision.receipt.author.displayName} · @
                {decision.receipt.author.handle}.
              </p>
              <p>
                Acknowledged saved revision: {ready?.saved.name}, saved{' '}
                {ready && new Date(ready.saved.createdAt).toLocaleString()}.
              </p>
              <a href={`/builds/${encodeURIComponent(decision.receipt.id)}`}>
                View published {decision.receipt.release.kind}
              </a>
            </>
          ) : (
            <>
              <h2>This release was withdrawn</h2>
              <p>
                The original publication operation was acknowledged, but its
                release was withdrawn on{' '}
                {new Date(decision.receipt.withdrawnAt).toLocaleString()}.
                Retrying did not publish it again.
              </p>
            </>
          )}
        </div>
      )}
      <div className="publication-actions">
        <button
          className="publication-secondary"
          disabled={decision.kind === 'publishing'}
          onClick={onCancel}
        >
          {decision.kind === 'complete'
            ? 'Back to your builds'
            : 'Cancel publication'}
        </button>
      </div>
    </section>
  );
}

function Snapshot({
  saved,
  publicTitle,
}: {
  saved: SavedBuild;
  publicTitle: string;
}) {
  const build = saved.build;
  const evidence = saved.evidence;
  if (!evidence)
    return (
      <p role="alert">
        Saved source evidence is unavailable. Reload this review before
        publishing.
      </p>
    );
  const products = evidence.accessoryReferences;
  const selected = [...evidence.components, ...products];
  const pack = evidence.sound.recording;
  return (
    <>
      <BuildThumbnail thumbnail={createBuildThumbnail(build)} />
      <p>
        Illustrative geometry. Product dimensions are unverified. The thumbnail
        omits accessories.
      </p>
      <p>
        {pack
          ? 'Recorded switch reference. Not a recording of this complete build.'
          : 'Synthesized approximation, not a measured keyboard sound.'}
      </p>
      {pack && (
        <p>
          <a href={pack.source} target="_blank" rel="noreferrer">
            {pack.name} · {pack.creator}
          </a>{' '}
          · {pack.license}. {pack.capture}
        </p>
      )}
      <details>
        <summary>Original parts and source links</summary>
        <ul>
          {selected.map((part) => (
            <li key={part.id}>
              <a href={part.source} target="_blank" rel="noreferrer">
                {part.brand} {part.name}
              </a>
              <p>{part.detail}</p>
            </li>
          ))}
        </ul>
        {evidence.compatibility.map((check, index) => (
          <p key={index}>
            {check.title} · {check.status}. {check.detail}{' '}
            {check.source && (
              <a href={check.source} target="_blank" rel="noreferrer">
                Compatibility source
              </a>
            )}
          </p>
        ))}
        <AccessoryFitNotes
          selections={build.accessories}
          products={products}
          checks={evidence.accessoryCompatibility}
        />
      </details>
      <details>
        <summary>Complete configuration to be published</summary>
        <p>
          The publication title replaces the private snapshot name. These are
          the configuration fields visitors can copy.
        </p>
        <pre>
          {JSON.stringify(
            {
              ...build,
              name: publicTitle.trim(),
              customParts: build.customParts.filter((part) =>
                Object.values(build.selection).includes(part.id),
              ),
            },
            null,
            2,
          )}
        </pre>
      </details>
    </>
  );
}

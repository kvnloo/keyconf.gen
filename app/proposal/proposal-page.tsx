'use client';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { parseProposalPreview, type ProposalPreview } from '../../lib/proposal';
import { encodeBuild } from '../../lib/build';
import SharedBuildPreview from '../shared-build-preview';
import ArchivedBuild from '../archived-build';
import '../shared-build-preview.css';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

export default function ProposalPage() {
  const hash = useSyncExternalStore<string | null>(
    subscribe,
    () => window.location.hash,
    () => null,
  );
  if (hash === null)
    return (
      <main className="shared-preview publication-archive">
        <h1>Opening your proposal…</h1>
      </main>
    );
  const token = /^#token=([a-f0-9]{64})$/.exec(hash)?.[1];
  return token ? <LoadProposal key={token} token={token} /> : <Unavailable />;
}

function Unavailable() {
  return (
    <main className="shared-preview publication-archive">
      <Link className="brand" href="/#home">
        keyconf
      </Link>
      <h1>This proposal is unavailable</h1>
      <p>
        Open the complete invitation link. If it no longer works, ask your
        builder for a new one.
      </p>
      <Link href="/#studio">Open your studio →</Link>
    </main>
  );
}

type PreviewState =
  | { kind: 'loading' }
  | { kind: 'unavailable' }
  | { kind: 'error' }
  | { kind: 'ready'; proposal: ProposalPreview };

function LoadProposal({ token }: { token: string }) {
  const [state, setState] = useState<PreviewState>({ kind: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/api/proposal-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
          cache: 'no-store',
          credentials: 'omit',
          referrerPolicy: 'no-referrer',
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        if (response.status === 404) {
          setState({ kind: 'unavailable' });
          return;
        }
        if (!response.ok) throw new Error('Proposal unavailable');
        const proposal = parseProposalPreview(await response.json());
        if (!controller.signal.aborted) setState({ kind: 'ready', proposal });
      } catch {
        if (!controller.signal.aborted) setState({ kind: 'error' });
      }
    }
    void load();
    return () => controller.abort();
  }, [token, attempt]);
  if (state.kind === 'unavailable') return <Unavailable />;
  if (state.kind === 'ready')
    return <ProposalExperience proposal={state.proposal} />;
  return (
    <main className="shared-preview publication-archive">
      <Link className="brand" href="/#home">
        keyconf
      </Link>
      <h1>
        {state.kind === 'loading'
          ? 'Opening your proposal…'
          : 'This proposal couldn’t load'}
      </h1>
      <output>
        {state.kind === 'loading'
          ? 'Getting the builder’s saved keyboard and notes.'
          : 'Your builder’s proposal may be temporarily unavailable. Try again.'}
      </output>
      {state.kind === 'error' && (
        <button
          className="preview-customize"
          onClick={() => {
            setState({ kind: 'loading' });
            setAttempt((value) => value + 1);
          }}
        >
          Try again
        </button>
      )}
      <Link href="/#studio">Open your studio →</Link>
    </main>
  );
}

function ProposalExperience({ proposal }: { proposal: ProposalPreview }) {
  const { author } = proposal;
  const details = (
    <section className="publication-author" aria-label="Creator and proposal">
      <span className="preview-eyebrow">YOUR BUILDER</span>
      <h2>
        {author.displayName} <small>@{author.handle}</small>
      </h2>
      <p>{proposal.brief}</p>
      <div className="publication-links">
        {author.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
      <p className="preview-tip">
        Anyone with this invitation link can view the proposal. Your experiments
        leave the builder’s original unchanged.
      </p>
      {proposal.customization === 'unavailable' && (
        <button
          onClick={() => {
            const url = URL.createObjectURL(
              new Blob([JSON.stringify(proposal.build, null, 2)], {
                type: 'application/json',
              }),
            );
            const link = document.createElement('a');
            link.href = url;
            link.download = 'keyconf-proposal.json';
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          Download build file
        </button>
      )}
    </section>
  );
  return proposal.customization === 'available' ? (
    <SharedBuildPreview
      build={proposal.build}
      record={{ kind: 'proposal', value: proposal }}
      creatorDetails={details}
      onCustomize={(build) => {
        window.location.href = `/#build=${encodeBuild(build)}`;
      }}
    />
  ) : (
    <ArchivedBuild snapshot={proposal} details={details} kind="proposal" />
  );
}

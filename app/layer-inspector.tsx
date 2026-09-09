'use client';

import { useId, useRef } from 'react';
import type { Part } from '../lib/catalog';
import './layer-inspector.css';

export default function LayerInspector({
  label,
  part,
}: {
  label: string;
  part: Part | undefined;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        ref={dialog}
        className="layer-inspector"
        aria-labelledby={titleId}
      >
        <form method="dialog">
          <button className="button secondary" autoFocus>
            Back to exploded view
          </button>
        </form>
        <p className="eyebrow">YOUR BUILD / {label.toUpperCase()}</p>
        <h2 id={titleId}>
          {part
            ? `${part.brand} ${part.name}`
            : `${label} reference unavailable`}
        </h2>
        {part ? (
          <>
            <p>{part.detail}</p>
            <dl>
              <dt>Evidence</dt>
              <dd>
                {part.evidence === 'documented'
                  ? 'Catalog documentation reference (fit not guaranteed)'
                  : 'Catalog reference; compatibility and fit not verified'}
              </dd>
              <dt>Assembly family</dt>
              <dd>{part.family}</dd>
            </dl>
            <a
              className="button secondary"
              href={part.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source evidence ↗
            </a>
            <p>
              The studio geometry is illustrative. Check the maker’s dimensions,
              layout and mounting requirements before choosing physical parts.
            </p>
          </>
        ) : (
          <p>
            This saved selection has no catalog reference available on this
            device. Your build has not been changed.
          </p>
        )}
      </dialog>
    </>
  );
}

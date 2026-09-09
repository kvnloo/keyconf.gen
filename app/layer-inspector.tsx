'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Part } from '../lib/catalog';
import type { SceneOptions } from '../lib/keyboard-scene';
import type { InspectedLayer } from '../lib/layer-scene';
import './layer-inspector.css';

export type LayerAppearance = Pick<
  SceneOptions,
  'device' | 'caseColor' | 'finish' | 'alpha' | 'mod' | 'accent' | 'space'
>;

function IsolatedLayer({
  layer,
  appearance,
}: {
  layer: InspectedLayer;
  appearance: LayerAppearance;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<Awaited<
    ReturnType<typeof import('../lib/layer-scene').createLayerScene>
  > | null>(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    setStatus('loading');
    void (async () => {
      try {
        // Both imports are dynamic so the studio's three.js graph stays out
        // of the page bundle, and the asset rule stays shared with the board.
        const [{ createLayerScene }, { modelIdFor, sourceGlb }] =
          await Promise.all([
            import('../lib/layer-scene'),
            import('../lib/keyboard-scene'),
          ]);
        if (cancelled) return;
        const scene = await createLayerScene(
          element,
          {
            layer,
            asset: sourceGlb(modelIdFor(appearance.device)),
            caseColor: appearance.caseColor,
            finish: appearance.finish,
            alpha: appearance.alpha,
            mod: appearance.mod,
            accent: appearance.accent,
            space: appearance.space,
          },
          () => setStatus('error'),
        );
        if (cancelled) {
          scene.dispose();
          return;
        }
        controller.current = scene;
        element.dataset.layerNodes = String(scene.nodes);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, [layer, appearance, attempt]);
  return (
    <>
      <div ref={host} className="layer-canvas" data-layer-status={status} />
      {status === 'loading' && (
        <output className="layer-status">Preparing {layer}…</output>
      )}
      {status === 'error' ? (
        <div className="layer-status" role="alert">
          <p>
            The isolated 3D view is unavailable. The details below are still
            accurate.
          </p>
          <button
            className="button secondary"
            onClick={() => {
              setStatus('loading');
              setAttempt(attempt + 1);
            }}
          >
            Try 3D again
          </button>
        </div>
      ) : (
        <>
          <div className="layer-actions">
            <button
              className="button secondary"
              disabled={status !== 'ready'}
              onClick={() => controller.current?.reset()}
            >
              Reset view
            </button>
          </div>
          <p className="layer-status">
            This {layer} layer is lifted out of the studio board in your
            colours. Drag to orbit · Arrow keys rotate · + / − zoom
          </p>
        </>
      )}
    </>
  );
}

export default function LayerInspector({
  label,
  layer,
  appearance,
  part,
}: {
  label: string;
  layer: InspectedLayer;
  appearance: LayerAppearance;
  part: Part | undefined;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        {label}
      </button>
      <dialog
        ref={dialog}
        className="layer-inspector"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
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
        {/* Mounted only while open, so a closed dialog holds no WebGL context. */}
        {open && <IsolatedLayer layer={layer} appearance={appearance} />}
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

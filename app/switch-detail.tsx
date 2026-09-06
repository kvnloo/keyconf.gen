'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Layers,
  Plus,
  RotateCcw,
} from 'lucide-react';
import type { Part, FitCheck } from '../lib/catalog';
import { catalogObservedAt, switchInterface } from '../lib/component-data';
import recordings from '../data/sound-references.json';
import './switch-detail.css';

function SwitchPreview({ id }: { id: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<Awaited<
    ReturnType<typeof import('../lib/switch-scene').createSwitchScene>
  > | null>(null);
  const [status, setStatus] = useState('loading');
  const [exploded, setExploded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    void import('../lib/switch-scene')
      .then(({ createSwitchScene }) => {
        if (cancelled) return;
        controller.current = createSwitchScene(element, id, () =>
          setStatus('error'),
        );
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, [id, attempt]);
  return (
    <div className="switch-preview">
      <div className="switch-preview-heading">
        <span>COMPONENT STUDY</span>
        <span>01 / SWITCH</span>
      </div>
      <div ref={host} className="switch-canvas" data-switch-status={status} />
      {status === 'loading' && (
        <output className="switch-preview-status">Preparing switch…</output>
      )}
      {status === 'error' && (
        <div className="switch-preview-status" role="alert">
          <p>
            The 3D preview is unavailable. Specs and build actions are still
            available.
          </p>
          <button
            className="button secondary"
            onClick={() => {
              setStatus('loading');
              setAttempt(attempt + 1);
              setExploded(false);
            }}
          >
            Try 3D again
          </button>
        </div>
      )}
      <div className="switch-preview-controls">
        <button
          className="button secondary"
          disabled={status !== 'ready'}
          aria-pressed={exploded}
          onClick={() => {
            controller.current?.separate(!exploded);
            setExploded(!exploded);
          }}
        >
          <Layers size={16} />
          {exploded ? 'Assemble switch' : 'Separate housing'}
        </button>
        <button
          className="button secondary"
          disabled={status !== 'ready'}
          onClick={() => controller.current?.reset()}
        >
          <RotateCcw size={16} />
          Reset view
        </button>
      </div>
      <p className="switch-model-note">
        Original switch study. Shape, color and separation are illustrative, not
        manufacturer CAD.
      </p>
      <p className="switch-gesture-note">
        Drag to orbit · Arrow keys rotate · + / − zoom
      </p>
    </div>
  );
}

const interfaceNames = {
  'mx-contact': 'MX mechanical contact',
  'keychron-ultrafast': 'Keychron Ultra-Fast magnetic',
  'keychron-double-rail': 'Gateron Double-Rail magnetic',
  'other-magnetic': 'Magnetic, exact PCB support needs review',
};

export default function SwitchDetail({
  part,
  parts,
  selected,
  checks,
  onSelect,
}: {
  part: Part | undefined;
  parts: Part[];
  selected: string;
  checks: FitCheck[];
  onSelect: (part: Part) => void;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    title.current?.focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [part?.id]);
  if (!part)
    return (
      <section className="switch-detail">
        <a className="switch-back" href="#studio">
          <ArrowLeft size={16} />
          Back to build
        </a>
        <h1 ref={title} tabIndex={-1}>
          Switch not found.
        </h1>
        <p>
          This reference is unavailable on this device. Open the build that
          contains it or choose another switch in Parts.
        </p>
      </section>
    );
  const electrical = switchInterface(part);
  const matches = recordings.records.filter(
    (record) =>
      record.name.toLowerCase() === `${part.brand} ${part.name}`.toLowerCase(),
  );
  const facts = part.detail.split(' · ');
  const inBuild = selected === part.id;
  const compatibility = checks.find((check) =>
    /switch|interface/i.test(check.title),
  );
  const otherSwitches = parts.filter(
    (item) => item.category === 'switch' && item.id !== part.id,
  );
  return (
    <section className="switch-detail" aria-label="Switch detail">
      <a className="switch-back" href="#studio">
        <ArrowLeft size={16} />
        Back to build
      </a>
      <div className="switch-detail-grid">
        <SwitchPreview key={part.id} id={part.id} />
        <div className="switch-inspector" id="switch-information" tabIndex={-1}>
          <span className="eyebrow">{part.brand} / SWITCHES</span>
          <h1 ref={title} tabIndex={-1}>
            {part.name}
          </h1>
          <p className="switch-summary">{part.detail}</p>
          <div className="switch-detail-actions">
            <button
              className="button"
              disabled={inBuild}
              onClick={() => onSelect(part)}
            >
              {inBuild ? <Check size={17} /> : <Plus size={17} />}
              {inBuild ? 'In your build' : 'Add to build'}
            </button>
            <a
              className="button secondary"
              href={part.source}
              target="_blank"
              rel="noreferrer"
            >
              {part.evidence === 'documented'
                ? 'Product source'
                : 'Unverified source'}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <nav className="switch-section-links" aria-label="Switch sections">
            {[
              ['switch-specifications', 'Specs'],
              ['switch-recordings', 'Sound'],
              ['switch-fit', 'Fit'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  const section = document.getElementById(id);
                  section?.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                  });
                  section?.focus({ preventScroll: true });
                }}
              >
                {label}
              </button>
            ))}
          </nav>
          <section id="switch-specifications" tabIndex={-1}>
            <h2>Specifications</h2>
            <p className="muted">
              {part.evidence === 'documented'
                ? `Catalog facts reviewed ${catalogObservedAt}. Check the linked source for the exact variant.`
                : 'Imported reference. These details have not been verified against manufacturer documentation.'}
            </p>
            <dl className="switch-specs">
              {facts.map((fact, index) => (
                <div key={`${index}-${fact}`}>
                  <dt>
                    {index === 0
                      ? 'Type / description'
                      : /bottom.?out/i.test(fact)
                        ? 'Bottom-out force'
                        : /operating/i.test(fact) ||
                            (part.id.startsWith('g-pro-3-') && /gf/.test(fact))
                          ? 'Operating force'
                          : /pre-travel/.test(fact)
                            ? 'Pre-travel'
                            : /travel/.test(fact)
                              ? 'Total travel'
                              : /pin/.test(fact)
                                ? 'Mount'
                                : /lub/.test(fact)
                                  ? 'Lubrication'
                                  : 'Catalog note'}
                  </dt>
                  <dd>{fact}</dd>
                </div>
              ))}
              <div>
                <dt>Electrical interface</dt>
                <dd>
                  {electrical ? interfaceNames[electrical] : 'Not verified'}
                </dd>
              </div>
            </dl>
          </section>
          <section id="switch-recordings" tabIndex={-1}>
            <h2>Hear this switch</h2>
            {matches.length ? (
              <>
                <p className="muted">
                  Original recordings of this named switch. The recorded
                  keyboard and microphone affect the sound.
                </p>
                {matches.map((record) => (
                  <div className="switch-recording" key={record.id}>
                    <strong>{record.name}</strong>
                    <span>
                      {record.creator} · {record.published} · Lubed:{' '}
                      {record.lubed}
                    </span>
                    <a
                      href={`https://www.youtube.com/watch?v=${record.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch sound test
                      <ArrowUpRight size={15} />
                    </a>
                    <a href={record.source} target="_blank" rel="noreferrer">
                      Recording setup & source
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                ))}
              </>
            ) : (
              <p className="muted">
                No exact recording is indexed for this switch.{' '}
                <a href="#sound">Explore the sound library</a> for other
                recorded references.
              </p>
            )}
          </section>
          <section id="switch-fit" tabIndex={-1}>
            <h2>Fit with your build</h2>
            <p
              className={
                'switch-fit-status ' + (compatibility?.status ?? 'unknown')
              }
            >
              {compatibility?.status === 'documented'
                ? 'Documented interface relationship'
                : compatibility?.status === 'incompatible'
                  ? 'Incompatible interface'
                  : 'Compatibility needs review'}
            </p>
            <p className="muted">
              {compatibility?.detail ??
                'Review the exact switch family, PCB support, pin count and housing clearances before buying.'}
            </p>
          </section>
        </div>
      </div>
      <section className="switch-alternatives">
        <h2>Keep exploring</h2>
        <p className="muted">
          Inspect another switch before adding it to your build.
        </p>
        <div>
          {otherSwitches.map((item) => (
            <a key={item.id} href={`#switch=${encodeURIComponent(item.id)}`}>
              <span>{item.brand}</span>
              <strong>{item.name}</strong>
              <small>{item.detail.split(' · ')[0]}</small>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

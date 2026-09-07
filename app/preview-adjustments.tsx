'use client';
import { palettes, caseColors, type Build } from '../lib/build';
import { catalog, type FitCheck } from '../lib/catalog';
import { soundPacks } from '../lib/sound-packs';
import { compareBuilds } from '../lib/build-comparison';
import StudioSelect from './studio-select';

export default function PreviewAdjustments({
  original,
  build,
  onChange,
  checks,
}: {
  checks: FitCheck[];
  original: Build;
  build: Build;
  onChange: (build: Build) => void;
}) {
  const changes = compareBuilds(original, build);
  const conflicts = checks.filter((check) => check.status === 'incompatible');
  const unknown = checks.filter((check) => check.status === 'unknown').length;
  const switches = [...catalog, ...build.customParts].filter(
    (part) => part.category === 'switch',
  );
  return (
    <details className="preview-feedback preview-adjustments">
      <summary>Try changes</summary>
      <p>
        Experiment here before opening the full studio. The original and your
        saved studio stay untouched.
      </p>
      <label htmlFor="preview-switch">Switches</label>
      <StudioSelect
        id="preview-switch"
        value={build.selection.switch}
        options={switches.map((part) => ({
          value: part.id,
          label: `${part.brand} ${part.name}`,
        }))}
        onValueChange={(id) =>
          onChange({ ...build, selection: { ...build.selection, switch: id } })
        }
      />
      <p className="preview-tip">
        Changing switches does not select a recording automatically.
      </p>
      <div className="preview-change-fit" aria-live="polite">
        {conflicts.map((check) => (
          <p key={check.title}>
            <strong>Incompatible: {check.title}</strong>
            <br />
            {check.detail}{' '}
            {check.source && (
              <a href={check.source} target="_blank" rel="noreferrer">
                Maker documentation ↗
              </a>
            )}
          </p>
        ))}
        {unknown > 0 && (
          <p>
            {unknown} compatibility{' '}
            {unknown === 1 ? 'check needs' : 'checks need'} confirmation. Review
            the compatibility notes before ordering.
          </p>
        )}
        {conflicts.length === 0 && unknown === 0 && (
          <p>
            Selected interfaces are documented. Check exact product variants
            before ordering.
          </p>
        )}
      </div>
      <label htmlFor="preview-recording">Sound reference</label>
      <StudioSelect
        id="preview-recording"
        value={build.audio.source}
        options={[
          { value: 'synthesized', label: 'Synthesized study' },
          ...soundPacks.map((pack) => ({ value: pack.id, label: pack.name })),
        ]}
        onValueChange={(source) =>
          onChange({ ...build, audio: { ...build.audio, source } })
        }
      />
      <fieldset>
        <legend>Keycap colors</legend>
        <div className="preview-options">
          {palettes.map((palette) => (
            <button
              key={palette.name}
              aria-pressed={
                JSON.stringify(palette) === JSON.stringify(build.palette)
              }
              onClick={() => onChange({ ...build, palette })}
            >
              <span
                aria-hidden="true"
                style={{
                  background: `linear-gradient(90deg, ${palette.alpha} 50%, ${palette.accent} 50%)`,
                }}
              />
              {palette.name}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Case color</legend>
        <div className="preview-options">
          {caseColors.map((item) => (
            <button
              key={item.name}
              aria-pressed={build.caseColor === item.color}
              onClick={() => onChange({ ...build, caseColor: item.color })}
            >
              <span aria-hidden="true" style={{ background: item.color }} />
              {item.name}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="preview-tip">
        Colors are visual studies, not confirmed finishes sold by the maker.
      </p>
      <output aria-live="polite">
        {changes.length
          ? `${changes.length} settings changed from the original.`
          : 'Viewing the original build.'}
      </output>
      <button
        className="preview-customize"
        onClick={() => {
          const url = URL.createObjectURL(
            new Blob([JSON.stringify(build, null, 2)], {
              type: 'application/json',
            }),
          );
          const link = document.createElement('a');
          link.href = url;
          link.download = 'keyconf-variation.json';
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }}
      >
        Download this variation
      </button>
      {changes.length > 0 && (
        <>
          <ul>
            {changes.map((change) => (
              <li key={change.label}>{change.label}</li>
            ))}
          </ul>
          <button
            className="preview-customize"
            onClick={() => onChange(original)}
          >
            Reset to original
          </button>
        </>
      )}
    </details>
  );
}

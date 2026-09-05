import type { SamplePreview } from '../lib/audio-preview';
export default function SampleWaveform({
  preview,
  synthesized,
  playing,
}: {
  preview: SamplePreview | null;
  synthesized: boolean;
  playing: boolean;
}) {
  const peak = preview ? Math.max(...preview.waveform, 0.001) : 1;
  return (
    <figure className={'sample-waveform' + (playing ? ' playing' : '')}>
      <svg viewBox="0 0 300 78" aria-hidden="true">
        <path d="M0 39H300" className="waveform-axis" />
        {preview?.waveform.map((value, index) => (
          <line
            key={index}
            x1={(index * 300) / preview.waveform.length + 1}
            x2={(index * 300) / preview.waveform.length + 1}
            y1={39 - (value / peak) * 32}
            y2={39 + (value / peak) * 32}
          />
        ))}
      </svg>
      <figcaption>
        <span>
          {synthesized
            ? 'Synthesized sound study'
            : 'Recorded press · waveform shape'}
        </span>
        {preview && <span>{Math.round(preview.duration * 1000)} ms</span>}
      </figcaption>
    </figure>
  );
}

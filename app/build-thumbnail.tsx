import genericLayouts from '../public/models/layouts.json';
import q1Layout from '../docs/reference-assets/keychron-q1-max-layout.json';
import type { BuildThumbnail as Thumbnail } from '../lib/build-thumbnail';
import { q1StockEncoderColor } from '../lib/keyboard-variant';
import './build-thumbnail.css';

const layouts = {
  'generic-60': {
    keys: genericLayouts['60'],
    width: 15,
    height: 5,
    label: '60% layout study',
  },
  'generic-65': {
    keys: genericLayouts['65'],
    width: 16,
    height: 5,
    label: '65% layout study',
  },
  'generic-75': {
    keys: genericLayouts['75'],
    width: 16,
    height: 6,
    label: '75% layout study',
  },
  'q1-max-ansi': {
    keys: q1Layout.keys,
    ...q1Layout.bounds,
    label: 'Q1 Max ANSI · illustrated case',
  },
};

export default function BuildThumbnail({
  thumbnail,
}: {
  thumbnail: Thumbnail | null;
}) {
  if (!thumbnail)
    return (
      <div className="build-thumbnail-unavailable">
        Visual preview unavailable
      </div>
    );
  const { keys, width, height, label } = layouts[thumbnail.geometry];
  const { colors } = thumbnail;
  return (
    <figure
      className="build-thumbnail"
      data-geometry={thumbnail.geometry}
      aria-label={`${label}. Saved keyboard colors; accessories not shown.`}
    >
      <svg
        viewBox={`${-width / 2 - 1} ${-height / 2 - 0.9} ${width + 2} ${height + 1.8}`}
        aria-hidden="true"
      >
        <rect
          x={-width / 2 - 0.35}
          y={-height / 2 - 0.2}
          width={width + 0.7}
          height={height + 0.7}
          rx="0.35"
          fill="#000000"
          opacity="0.35"
        />
        <rect
          data-part="case"
          x={-width / 2 - 0.3}
          y={-height / 2 - 0.3}
          width={width + 0.6}
          height={height + 0.6}
          rx="0.3"
          fill={thumbnail.caseColor}
          stroke="#ffffff"
          strokeOpacity="0.25"
          strokeWidth="0.04"
        />
        <rect
          x={-width / 2 - 0.06}
          y={-height / 2 - 0.06}
          width={width + 0.12}
          height={height + 0.12}
          rx="0.13"
          fill="#000000"
          opacity="0.28"
        />
        {keys.map((key) => {
          const role = ['Escape', 'EscapeFn', 'Enter'].includes(key.code)
            ? 'accent'
            : key.code === 'Space' || key.code.startsWith('Arrow')
              ? 'space'
              : key.label.length === 1
                ? 'alpha'
                : 'mod';
          return (
            <g key={key.code} data-key={key.code} data-color-role={role}>
              <rect
                x={key.x - key.width / 2 + 0.04}
                y={-key.y - 0.44}
                width={key.width - 0.08}
                height="0.91"
                rx="0.11"
                fill={colors[role]}
              />
              <rect
                x={key.x - key.width / 2 + 0.11}
                y={-key.y - 0.39}
                width={key.width - 0.22}
                height="0.67"
                rx="0.09"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.18"
                strokeWidth="0.035"
              />
              <path
                d={`M${key.x - key.width / 2 + 0.13},${-key.y + 0.36}h${key.width - 0.26}`}
                stroke="#000000"
                strokeOpacity="0.18"
                strokeWidth="0.055"
                strokeLinecap="round"
              />
            </g>
          );
        })}
        {thumbnail.geometry === 'q1-max-ansi' && (
          <g data-part="encoder">
            <circle
              cx={q1Layout.stockEncoder.x}
              cy={-q1Layout.stockEncoder.y}
              r="0.42"
              fill={q1StockEncoderColor}
              stroke="#ffffff"
              strokeOpacity="0.4"
              strokeWidth="0.04"
            />
            <circle
              cx={q1Layout.stockEncoder.x}
              cy={-q1Layout.stockEncoder.y}
              r="0.29"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.2"
              strokeWidth="0.025"
            />
          </g>
        )}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

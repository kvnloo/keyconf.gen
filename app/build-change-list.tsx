import type { compareBuilds } from '../lib/build-comparison';

export default function BuildChangeList({
  changes,
  beforeLabel,
  afterLabel,
}: {
  changes: ReturnType<typeof compareBuilds>;
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <dl className="build-change-list">
      {changes.map((change) => (
        <div key={change.label}>
          <dt>{change.label}</dt>
          <dd>
            <span>{beforeLabel}</span>
            {/^#[0-9a-f]{6}$/i.test(change.before) && (
              <i
                aria-hidden="true"
                style={{ backgroundColor: change.before }}
              />
            )}
            {change.before}
            {change.beforeSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {source.name} ↗
              </a>
            ))}
          </dd>
          <dd>
            <span>{afterLabel}</span>
            {/^#[0-9a-f]{6}$/i.test(change.after) && (
              <i aria-hidden="true" style={{ backgroundColor: change.after }} />
            )}
            {change.after}
            {change.afterSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {source.name} ↗
              </a>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

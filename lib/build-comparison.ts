import type { Build } from './build.ts';
import { catalog, categories } from './catalog.ts';
import { accessoryCatalog } from './build-accessories.ts';
import { soundPacks } from './sound-packs.ts';

function values(build: Build) {
  const parts = [...build.customParts, ...catalog];
  const accessories = build.accessories
    .map((item) => {
      const product = accessoryCatalog.find(
        (entry) => entry.id === item.productId,
      );
      const location = item.location;
      const placement =
        location.kind === 'key'
          ? location.keyId
          : location.kind === 'embedded'
            ? location.slotId
            : location.position;
      return `${product?.name ?? item.productId} × ${item.quantity} · ${location.kind}: ${placement}`;
    })
    .sort();
  return [
    ...categories.map((category) => {
      const part = parts.find(
        (entry) => entry.id === build.selection[category],
      );
      return {
        label: category,
        identity: build.selection[category],
        value: part
          ? `${part.brand} ${part.name} · ${part.source} · ${part.detail}`
          : build.selection[category],
      };
    }),
    { label: 'Layout', value: `${build.layout}%` },
    { label: 'Case finish study', value: build.finish },
    { label: 'Keycap profile study', value: build.profile },
    { label: 'Case color', value: build.caseColor.toLowerCase() },
    ...(['alpha', 'mod', 'accent', 'space'] as const).map((key) => ({
      label: `${key} key color`,
      value: build.palette[key].toLowerCase(),
    })),
    {
      label: 'Accessories',
      value: accessories.join('\n') || 'None',
      identity: JSON.stringify(
        build.accessories
          .map((item) => [
            item.productId,
            item.quantity,
            item.location.kind,
            item.location.kind === 'key'
              ? item.location.keyId
              : item.location.kind === 'embedded'
                ? item.location.slotId
                : item.location.position,
          ])
          .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
      ),
    },
    {
      label: 'Sound reference',
      identity: build.audio.source,
      value:
        soundPacks.find((pack) => pack.id === build.audio.source)?.name ??
        build.audio.source,
    },
    { label: 'Synthesized switch character', value: build.audio.character },
    {
      label: 'Playback volume',
      value: `${(build.audio.volume * 100).toLocaleString('en-US', { maximumSignificantDigits: 15 })}%`,
      identity: String(build.audio.volume),
    },
    { label: 'Sound damping', value: String(build.audio.damping) },
  ];
}

export function compareBuilds(original: Build, candidate: Build) {
  const before = new Map(values(original).map((item) => [item.label, item]));
  return values(candidate).flatMap((item) => {
    const previous = before.get(item.label);
    if (
      !previous ||
      (previous.value === item.value && previous.identity === item.identity)
    )
      return [];
    const sameLabel = previous.value === item.value;
    return [
      {
        label: item.label,
        before: sameLabel
          ? `${previous.value} (${previous.identity})`
          : previous.value,
        after: sameLabel ? `${item.value} (${item.identity})` : item.value,
      },
    ];
  });
}

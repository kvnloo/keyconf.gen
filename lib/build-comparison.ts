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
    { label: 'Accessories', value: accessories.join('\n') || 'None' },
    {
      label: 'Sound reference',
      value:
        soundPacks.find((pack) => pack.id === build.audio.source)?.name ??
        build.audio.source,
    },
    { label: 'Synthesized switch character', value: build.audio.character },
    {
      label: 'Playback volume',
      value: `${Math.round(build.audio.volume * 100)}%`,
    },
    { label: 'Sound damping', value: String(build.audio.damping) },
  ];
}

export function compareBuilds(original: Build, candidate: Build) {
  const before = new Map(
    values(original).map((item) => [item.label, item.value]),
  );
  return values(candidate).flatMap((item) => {
    const previous = before.get(item.label);
    return previous !== undefined && previous !== item.value
      ? [{ label: item.label, before: previous, after: item.value }]
      : [];
  });
}

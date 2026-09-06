import type { Build } from './build.ts';
import { categories, type Part, type FitCheck } from './catalog.ts';
import type {
  AccessoryProduct,
  AccessoryCompatibility,
} from './build-accessories.ts';
import { publicUrl } from './import-products.ts';

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Invalid evidence object.');
  return Object.fromEntries(Object.entries(value));
}
function text(value: unknown): string {
  if (typeof value !== 'string' || value.length > 4096)
    throw new Error('Invalid evidence text.');
  return value;
}
function list(value: unknown): unknown[] {
  if (!Array.isArray(value) || value.length > 100)
    throw new Error('Invalid evidence list.');
  return value;
}
function choice<const T extends string>(
  value: unknown,
  choices: readonly T[],
): T {
  const found = choices.find((item) => item === value);
  if (found === undefined) throw new Error('Invalid evidence choice.');
  return found;
}
function source(value: unknown, empty = false): string {
  const url = text(value);
  if (!url && empty) return '';
  publicUrl(url);
  return url;
}
function part(value: unknown): Part {
  const item = object(value);
  return {
    id: text(item.id),
    name: text(item.name),
    brand: text(item.brand),
    category: choice(item.category, categories),
    detail: text(item.detail),
    source: source(item.source),
    family: text(item.family),
    evidence: choice(item.evidence, ['documented', 'unknown']),
  };
}
function accessory(value: unknown): AccessoryProduct {
  const item = object(value);
  const info = {
    id: text(item.id),
    name: text(item.name),
    brand: text(item.brand),
    detail: text(item.detail),
    source: source(item.source),
  };
  const kind = choice(item.kind, [
    'artisan',
    'knob',
    'encoder',
    'screen',
    'buttons',
    'macropad',
  ]);
  if (kind === 'artisan') {
    if (
      item.placement !== 'key' ||
      typeof item.sizeU !== 'number' ||
      !Number.isFinite(item.sizeU) ||
      item.sizeU <= 0 ||
      item.sizeU > 10
    )
      throw new Error('Invalid artisan evidence.');
    return {
      ...info,
      kind,
      placement: 'key',
      sizeU: item.sizeU,
      stem: item.stem === null ? null : choice(item.stem, ['mx', 'choc']),
    };
  }
  if (item.sizeU !== null || item.stem !== null)
    throw new Error('Invalid module evidence.');
  if (kind === 'macropad')
    return {
      ...info,
      kind,
      placement: choice(item.placement, ['external']),
      sizeU: null,
      stem: null,
    };
  if (kind === 'knob' || kind === 'encoder')
    return {
      ...info,
      kind,
      placement: choice(item.placement, ['embedded']),
      sizeU: null,
      stem: null,
    };
  return {
    ...info,
    kind,
    placement: choice(item.placement, ['embedded', 'external']),
    sizeU: null,
    stem: null,
  };
}
function exactIds(actual: string[], expected: string[]) {
  if (
    new Set(actual).size !== actual.length ||
    actual.length !== expected.length ||
    actual.some((id) => !expected.includes(id))
  )
    throw new Error('Evidence does not match the build.');
}

export function parsePublicBuildEvidence(value: unknown, build: Build) {
  const data = object(value);
  if (
    data.version !== 1 ||
    typeof data.catalogDigest !== 'string' ||
    !/^[a-f0-9]{64}$/.test(data.catalogDigest)
  )
    throw new Error('Unsupported build evidence.');
  const components = list(data.components).map(part);
  exactIds(
    components.map((item) => item.category),
    [...categories],
  );
  for (const item of components) {
    if (build.selection[item.category] !== item.id)
      throw new Error('Component evidence mismatch.');
    const imported = build.customParts.find((part) => part.id === item.id);
    if (
      imported &&
      (item.evidence !== 'unknown' ||
        Object.entries(item).some(
          ([key, value]) => Reflect.get(imported, key) !== value,
        ))
    )
      throw new Error('Imported evidence mismatch.');
  }
  const compatibility: FitCheck[] = list(data.compatibility).map((value) => {
    const item = object(value);
    return {
      status: choice(item.status, ['documented', 'incompatible', 'unknown']),
      title: text(item.title),
      detail: text(item.detail),
      source: source(item.source, true),
    };
  });
  const accessoryReferences = list(data.accessoryReferences).map(accessory);
  exactIds(
    accessoryReferences.map((item) => item.id),
    [...new Set(build.accessories.map((item) => item.productId))],
  );
  for (const selected of build.accessories) {
    const reference = accessoryReferences.find(
      (item) => item.id === selected.productId,
    );
    if (reference?.placement !== selected.location.kind)
      throw new Error('Accessory placement evidence mismatch.');
  }
  const checks = object(data.accessoryCompatibility);
  exactIds(
    Object.keys(checks),
    build.accessories.map((item) => item.id),
  );
  const accessoryCompatibility: Record<string, AccessoryCompatibility> =
    Object.fromEntries(
      Object.entries(checks).map(([id, value]) => {
        const item = object(value);
        return [
          id,
          {
            status: choice(item.status, ['confirmed', 'unknown', 'conflict']),
            reasons: list(item.reasons).map(text),
            sources: list(item.sources).map((value) => source(value)),
          },
        ];
      }),
    );
  const audio = object(data.sound);
  for (const [key, value] of Object.entries(build.audio))
    if (audio[key] !== value) throw new Error('Sound evidence mismatch.');
  let sound;
  if (build.audio.source === 'synthesized') {
    if (
      audio.recording !== null ||
      audio.accuracy !== 'synthesized approximation'
    )
      throw new Error('Invalid synthesized evidence.');
    sound = {
      ...build.audio,
      kind: 'synthesized' as const,
      accuracy: 'synthesized approximation' as const,
      recording: null,
    };
  } else {
    const recording = object(audio.recording);
    if (
      recording.id !== build.audio.source ||
      audio.accuracy !==
        'recorded switch reference; full build match unverified'
    )
      throw new Error('Invalid recording evidence.');
    sound = {
      ...build.audio,
      kind: 'recorded' as const,
      accuracy:
        'recorded switch reference; full build match unverified' as const,
      recording: {
        id: text(recording.id),
        name: text(recording.name),
        creator: text(recording.creator),
        license: text(recording.license),
        capture: text(recording.capture),
        source: source(recording.source),
      },
    };
  }
  return {
    version: 1 as const,
    catalogDigest: data.catalogDigest,
    components,
    compatibility,
    accessoryReferences,
    accessoryCompatibility,
    sound,
  };
}
export type PublicBuildEvidence = ReturnType<typeof parsePublicBuildEvidence>;

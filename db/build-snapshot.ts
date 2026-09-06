import { accessoryHost } from '../lib/accessory-hosts.ts';
import { catalog, categories, checkBuild } from '../lib/catalog.ts';
import {
  accessoryCatalog,
  assessAccessories,
} from '../lib/build-accessories.ts';
import { soundPacks } from '../lib/sound-packs.ts';
import { digestText as digest } from '../lib/content-digest.ts';
import { parsePublicBuildEvidence } from '../lib/build-evidence.ts';
import { parseBuild, parseBuildSnapshot, type Build } from '../lib/build.ts';
import { CommunityError } from '../lib/community.ts';

export function restoreBuildSnapshot(
  row: { payload: string; evidence: string },
  historical = false,
) {
  try {
    const build: Build = historical
      ? parseBuildSnapshot(JSON.parse(row.payload))
      : parseBuild(JSON.parse(row.payload));
    const evidence = parsePublicBuildEvidence(JSON.parse(row.evidence), build);
    return { build, evidence };
  } catch {
    throw new CommunityError(
      'saved_build_unavailable',
      'This saved build cannot currently be restored. Its snapshot is retained.',
      422,
    );
  }
}

export async function snapshotEvidence(build: Build): Promise<string> {
  const parts = [...catalog, ...build.customParts];
  const recording =
    soundPacks.find((pack) => pack.id === build.audio.source) ?? null;
  return JSON.stringify({
    version: 1,
    catalogDigest: await digest(JSON.stringify(catalog)),
    components: categories.map((category) =>
      parts.find((part) => part.id === build.selection[category]),
    ),
    compatibility: checkBuild(build.selection, parts, build.layout),
    accessoryReferences: accessoryCatalog.filter((product) =>
      build.accessories.some((accessory) => accessory.productId === product.id),
    ),
    accessoryCompatibility: assessAccessories(
      build.accessories,
      accessoryHost(build),
    ),
    sound: {
      ...build.audio,
      accuracy: recording
        ? 'recorded switch reference; full build match unverified'
        : 'synthesized approximation',
      recording,
    },
  });
}

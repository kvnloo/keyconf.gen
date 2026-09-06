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

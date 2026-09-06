import { parseBuildSnapshot } from './build.ts';
import { CommunityError } from './community.ts';

export function parseProposalRequest(value: unknown) {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value) ||
    !('operationId' in value) ||
    typeof value.operationId !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.operationId) ||
    !('buildId' in value) ||
    typeof value.buildId !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.buildId) ||
    !('title' in value) ||
    typeof value.title !== 'string' ||
    !('brief' in value) ||
    typeof value.brief !== 'string'
  )
    throw new CommunityError(
      'invalid_request',
      'A proposal needs a saved build, operation ID, title and brief.',
      400,
    );
  const title = value.title.trim();
  const brief = value.brief.replaceAll('\r\n', '\n').trim();
  if (
    !title ||
    title.length > 80 ||
    brief.length > 2000 ||
    forbiddenControl(title, false) ||
    forbiddenControl(brief, true)
  )
    throw new CommunityError(
      'invalid_request',
      'Use a single-line title up to 80 characters and a brief up to 2,000 characters.',
      400,
    );
  return {
    operationId: value.operationId,
    buildId: value.buildId,
    title,
    brief,
  };
}
export type ProposalRequest = ReturnType<typeof parseProposalRequest>;

function forbiddenControl(value: string, multiline: boolean) {
  for (const character of value) {
    const code = character.charCodeAt(0);
    if ((code < 32 && !(multiline && character === '\n')) || code === 127)
      return true;
  }
  return false;
}

export function parseProposalRotation(value: unknown) {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value) ||
    !('proposalId' in value) ||
    typeof value.proposalId !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.proposalId) ||
    !('operationId' in value) ||
    typeof value.operationId !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.operationId) ||
    !('expectedVersion' in value) ||
    typeof value.expectedVersion !== 'number' ||
    !Number.isSafeInteger(value.expectedVersion) ||
    value.expectedVersion < 0 ||
    value.expectedVersion >= Number.MAX_SAFE_INTEGER
  )
    throw new CommunityError(
      'invalid_request',
      'Refresh the proposal before replacing its link.',
      400,
    );
  return {
    proposalId: value.proposalId,
    operationId: value.operationId,
    expectedVersion: value.expectedVersion,
  };
}
export type ProposalRotation = ReturnType<typeof parseProposalRotation>;

export function parseProposalResponse(value: unknown) {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value) ||
    !('operationId' in value) ||
    typeof value.operationId !== 'string' ||
    !/^[a-zA-Z0-9_-]{16,100}$/.test(value.operationId) ||
    !('note' in value) ||
    typeof value.note !== 'string' ||
    !('build' in value)
  )
    throw new CommunityError(
      'invalid_request',
      'A response needs a keyboard build, note and operation ID.',
      400,
    );
  const note = value.note.replaceAll('\r\n', '\n').trim();
  if (note.length > 2000 || forbiddenControl(note, true))
    throw new CommunityError(
      'invalid_request',
      'Use a plain-text note up to 2,000 characters.',
      400,
    );
  try {
    const build = parseBuildSnapshot(value.build);
    const selected = new Set(Object.values(build.selection));
    return {
      operationId: value.operationId,
      note,
      build: {
        ...build,
        customParts: build.customParts.filter((part) => selected.has(part.id)),
      },
    };
  } catch {
    throw new CommunityError(
      'invalid_request',
      'This response does not contain a readable keyboard build.',
      400,
    );
  }
}
export type ProposalResponseRequest = ReturnType<typeof parseProposalResponse>;

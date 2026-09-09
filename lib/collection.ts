import {
  CommunityError,
  parseCommunityProfile,
  type CommunityProfile,
} from './community.ts';

export const COLLECTION_LIMIT = 50;

export type CollectionRequest = {
  reviewedProfile?: CommunityProfile;
  operationId: string;
  title: string;
  note: string;
  publicationIds: string[];
};

export function parseCollectionRequest(value: unknown): CollectionRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value))
    throw invalid('Choose published builds before saving a collection.');
  if (!('operationId' in value) || !identifier(value.operationId))
    throw invalid('Saving a collection needs a valid operation ID.');
  if (!('title' in value) || !('note' in value))
    throw invalid('Add a title and note for the collection.');
  return {
    ...('reviewedProfile' in value
      ? { reviewedProfile: parseCommunityProfile(value.reviewedProfile) }
      : {}),
    operationId: value.operationId,
    title: text(value.title, 80, false),
    note: text(value.note, 1200, true, true),
    publicationIds: parsePublicationIds(
      'publicationIds' in value ? value.publicationIds : undefined,
    ),
  };
}

function parsePublicationIds(value: unknown): string[] {
  if (!Array.isArray(value) || value.length === 0)
    throw invalid('A collection needs at least one published build.');
  if (value.length > COLLECTION_LIMIT)
    throw invalid(
      `A collection holds at most ${COLLECTION_LIMIT} published builds.`,
    );
  const seen = new Set<string>();
  return value.map((entry: unknown) => {
    if (!identifier(entry))
      throw invalid('This published-build identifier is invalid.');
    if (seen.has(entry))
      throw invalid('List each published build once in a collection.');
    seen.add(entry);
    return entry;
  });
}

function identifier(value: unknown): value is string {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{16,100}$/.test(value);
}
function text(
  value: unknown,
  limit: number,
  allowEmpty: boolean,
  multiline = false,
): string {
  if (typeof value !== 'string')
    throw invalid('Collection text must be plain text.');
  const result = value.replaceAll('\r\n', '\n').trim();
  if (
    (!allowEmpty && !result) ||
    result.length > limit ||
    result
      .split('')
      .some(
        (character) =>
          (character.charCodeAt(0) < 32 &&
            !(multiline && character === '\n')) ||
          character.charCodeAt(0) === 127,
      )
  )
    throw invalid(
      `Use ${multiline ? 'plain text' : 'single-line text'} of at most ${limit} characters.`,
    );
  return result;
}
function invalid(message: string) {
  return new CommunityError('invalid_request', message, 400);
}

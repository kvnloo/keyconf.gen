import { CommunityError } from './community.ts';

export type PublicationRequest = {
  operationId: string;
  buildId: string;
  title: string;
  note: string;
} & (
  | { kind: 'build' }
  | { kind: 'drop'; availability: string; externalUrl: string | null }
);

export function parsePublicationRequest(value: unknown): PublicationRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value))
    throw invalid('Review a saved build before publishing.');
  if (
    !('operationId' in value) ||
    !identifier(value.operationId) ||
    !('buildId' in value) ||
    !identifier(value.buildId)
  )
    throw invalid('Publishing needs a saved build and a valid operation ID.');
  if (!('title' in value) || !('note' in value))
    throw invalid('Add a title and note for the publication.');
  const common = {
    operationId: value.operationId,
    buildId: value.buildId,
    title: text(value.title, 80, false),
    note: text(value.note, 1200, true, true),
  };
  if ('kind' in value && value.kind === 'build')
    return { ...common, kind: 'build' };
  if (
    'kind' in value &&
    value.kind === 'drop' &&
    'availability' in value &&
    'externalUrl' in value
  ) {
    const availability = text(value.availability, 240, true);
    let externalUrl: string | null = null;
    if (value.externalUrl !== null) {
      if (
        typeof value.externalUrl !== 'string' ||
        value.externalUrl.length > 2048
      )
        throw invalid('Use a complete HTTPS enquiry or purchase link.');
      let url: URL;
      try {
        url = new URL(value.externalUrl);
      } catch {
        throw invalid('Use a complete HTTPS enquiry or purchase link.');
      }
      if (
        url.protocol !== 'https:' ||
        url.username ||
        url.password ||
        url.href.length > 2048
      )
        throw invalid('Use an HTTPS link without embedded credentials.');
      externalUrl = url.href;
    }
    return { ...common, kind: 'drop', availability, externalUrl };
  }
  throw invalid('Choose a build publication or creator drop.');
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
    throw invalid('Publication text must be plain text.');
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

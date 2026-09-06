import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePublicationRequest } from '../lib/publication.ts';
const request = {
  operationId: 'publication-operation-01',
  buildId: 'saved-build-reference-01',
  title: ' Client build ',
  note: 'First paragraph.\r\n\r\nSecond paragraph.',
  kind: 'build',
};
test('publication request normalizes release text and excludes client ownership and evidence claims', () => {
  assert.deepEqual(
    parsePublicationRequest({
      ...request,
      accountId: 'forged',
      evidence: { status: 'confirmed' },
    }),
    {
      operationId: request.operationId,
      buildId: request.buildId,
      title: 'Client build',
      note: 'First paragraph.\n\nSecond paragraph.',
      kind: 'build',
    },
  );
  const drop = parsePublicationRequest({
    ...request,
    kind: 'drop',
    availability: 'Ask the creator',
    externalUrl: 'https://example.com',
  });
  assert.equal(drop.externalUrl, 'https://example.com/');
});
test('publication boundary rejects invalid revision references and unsafe drop links', () => {
  for (const value of [
    { ...request, buildId: 'missing' },
    { ...request, title: '' },
    { ...request, title: 'two\nlines' },
    { ...request, note: 'x'.repeat(1201) },
    { ...request, kind: 'unknown' },
    {
      ...request,
      kind: 'drop',
      availability: '',
      externalUrl: 'javascript:alert(1)',
    },
    {
      ...request,
      kind: 'drop',
      availability: '',
      externalUrl: 'https://user:secret@example.com',
    },
  ])
    assert.throws(() => parsePublicationRequest(value), {
      code: 'invalid_request',
    });
});

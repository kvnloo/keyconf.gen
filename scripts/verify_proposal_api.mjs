import assert from 'node:assert/strict';

export async function verifyProposalApi(dispatch, base, fixtures) {
  const endpoint = new URL('/api/proposal-preview', base).href;
  const headers = {
    Origin: new URL(base).origin,
    'Content-Type': 'application/json',
  };
  const post = (token, extra = {}) =>
    dispatch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ token }),
      ...extra,
    });
  const response = await post(fixtures.proposal_active.token);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control'), /no-store/);
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  const payload = await response.json();
  assert.equal(payload.build.name, 'Local active proposal');
  for (const secret of [
    fixtures.proposal_active.token,
    'local-test-subject',
    'Private fixture active',
    'operationId',
    'tokenDigest',
  ])
    assert.equal(JSON.stringify(payload).includes(secret), false);
  for (const token of [
    fixtures.proposal_withdrawn.token,
    fixtures.proposal_replaced.token,
    'f'.repeat(64),
    'invalid',
  ]) {
    const unavailable = await post(token);
    assert.equal(unavailable.status, 404);
    assert.match(unavailable.headers.get('cache-control'), /no-store/);
    await unavailable.text();
  }
  const current = await post(fixtures.proposal_replacement.token);
  assert.equal(current.status, 200);
  await current.text();
  for (const [request, status] of [
    [
      {
        method: 'POST',
        headers: { ...headers, Origin: 'https://unrelated.example' },
        body: JSON.stringify({ token: fixtures.proposal_active.token }),
      },
      403,
    ],
    [
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ token: 'x'.repeat(300) }),
      },
      413,
    ],
    [{ method: 'GET' }, 405],
    [{ method: 'POST', headers, body: '{' }, 400],
    [
      {
        method: 'POST',
        headers: { Origin: headers.Origin, 'Content-Type': 'text/plain' },
        body: 'invalid',
      },
      400,
    ],
  ]) {
    const rejected = await dispatch(endpoint, request);
    assert.equal(rejected.status, status);
    assert.match(rejected.headers.get('cache-control'), /no-store/);
    assert.equal(rejected.headers.get('referrer-policy'), 'no-referrer');
    await rejected.text();
  }
  const after = await post(fixtures.proposal_active.token);
  assert.equal(after.status, 200);
  assert.deepEqual(await after.json(), payload);
  console.log(
    'Proposal Worker API: bounded requests, privacy headers, token closure/replacement and continued reads after rejection passed.',
  );
}

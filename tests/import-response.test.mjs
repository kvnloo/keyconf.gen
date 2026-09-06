import test from 'node:test';
import assert from 'node:assert/strict';
import { importWebsite } from '../lib/import-products.ts';

function trackedResponse(init) {
  const state = { canceled: false, pulls: 0 };
  const body = new ReadableStream(
    {
      pull() {
        state.pulls++;
      },
      cancel() {
        state.canceled = true;
      },
    },
    { highWaterMark: 0 },
  );
  return { response: new Response(body, init), state };
}
function serve(t, respond) {
  t.mock.method(globalThis, 'fetch', async (input) =>
    String(input).startsWith('https://cloudflare-dns.com/')
      ? Response.json({ Answer: [{ type: 1, data: '1.1.1.1' }] })
      : respond(String(input)),
  );
}
for (const { name, init, message } of [
  { name: 'HTTP error', init: { status: 503 }, message: /HTTP 503/ },
  {
    name: 'declared oversize',
    init: { headers: { 'content-length': '2000001' } },
    message: /too large/,
  },
  {
    name: 'redirect without a destination',
    init: { status: 302 },
    message: /redirected/,
  },
]) {
  test(`import cancels ${name} without reading its body`, async (t) => {
    const { response, state } = trackedResponse(init);
    serve(t, () => response);
    await assert.rejects(
      importWebsite('https://switch-shop.example/catalog'),
      message,
    );
    assert.equal(state.canceled, true);
    assert.equal(state.pulls, 0);
  });
}
test('redirect response is canceled before requesting its destination', async (t) => {
  const { response, state } = trackedResponse({
    status: 302,
    headers: { location: '/destination' },
  });
  let canceledAtDestination = false;
  serve(t, (url) => {
    if (url.endsWith('/catalog')) return response;
    canceledAtDestination = state.canceled;
    return new Response(
      '<script type="application/ld+json">{"@type":"Product","name":"Switch"}</script>',
    );
  });
  const result = await importWebsite('https://switch-shop.example/catalog');
  assert.equal(result.products[0].name, 'Switch');
  assert.equal(canceledAtDestination, true);
  assert.equal(state.pulls, 0);
});

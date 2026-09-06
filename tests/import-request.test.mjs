import assert from 'node:assert/strict';
import { test } from 'node:test';
import { POST } from '../app/api/import/route.ts';

const endpoint = 'https://keyconf.example/api/import';
const headers = {
  origin: 'https://keyconf.example',
  'content-type': 'application/json',
};

test('An oversized streamed import stops before reading its remaining body', async () => {
  let pulls = 0;
  let canceled = false;
  const body = new ReadableStream(
    {
      pull(controller) {
        pulls++;
        if (pulls === 1) controller.enqueue(new Uint8Array(12_289));
        else controller.error(new Error('The remainder must not be read'));
      },
      cancel() {
        canceled = true;
      },
    },
    { highWaterMark: 0 },
  );
  const response = await POST(
    new Request(endpoint, { method: 'POST', headers, body, duplex: 'half' }),
  );
  assert.equal(response.status, 413);
  assert.equal(pulls, 1);
  assert.equal(canceled, true);
  assert.equal(
    response.headers.get('Access-Control-Allow-Origin'),
    headers.origin,
  );
});

test('The import request limit counts UTF-8 bytes, not JavaScript characters', async () => {
  const body = JSON.stringify({
    url: 'https://localhost/',
    note: 'é'.repeat(6500),
  });
  assert.ok(body.length < 12_288);
  const response = await POST(
    new Request(endpoint, { method: 'POST', headers, body }),
  );
  assert.equal(response.status, 413);
});

test('An oversized declared body is canceled without consuming chunks', async () => {
  let canceled = false;
  const body = new ReadableStream(
    {
      pull() {
        assert.fail('The declared oversized body must not be read');
      },
      cancel() {
        canceled = true;
      },
    },
    { highWaterMark: 0 },
  );
  const response = await POST(
    new Request(endpoint, {
      method: 'POST',
      headers: { ...headers, 'content-length': '12289' },
      body,
      duplex: 'half',
    }),
  );
  assert.equal(response.status, 413);
  assert.equal(canceled, true);
});

test('A split UTF-8 sequence reaches normal request validation below the limit', async () => {
  const bytes = new TextEncoder().encode(
    JSON.stringify({ url: 'https://localhost/', note: 'é' }),
  );
  const split = bytes.indexOf(0xc3) + 1;
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes.slice(0, split));
      controller.enqueue(bytes.slice(split));
      controller.close();
    },
  });
  const response = await POST(
    new Request(endpoint, { method: 'POST', headers, body, duplex: 'half' }),
  );
  assert.equal(response.status, 422);
  assert.match((await response.json()).error, /public|local/i);
});

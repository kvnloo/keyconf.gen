import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import {
  loadStoreObservations,
  storeListings,
} from '../lib/store-observations.ts';

async function server(t, handler) {
  const http = createServer(handler);
  http.listen(0, '127.0.0.1');
  await once(http, 'listening');
  t.after(() => {
    http.closeAllConnections();
    http.close();
  });
  const address = http.address();
  assert.ok(address && typeof address === 'object');
  return new URL(`http://127.0.0.1:${address.port}/#discover`);
}

test('catalog reader uses real HTTP data and rejects damaged or oversized responses', async (t) => {
  const snapshot = await readFile(
    new URL('../data/store-observations.json', import.meta.url),
    'utf8',
  );
  let body = snapshot;
  const location = await server(t, (request, response) => {
    assert.equal(new URL(request.url, 'http://local').pathname, '/api/catalog');
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    });
    response.end(body);
  });
  const signal = new AbortController().signal;
  const hosted = await loadStoreObservations(location, signal);
  assert.equal(hosted.origin, 'hosted');
  assert.deepEqual(hosted.storeListings, storeListings);
  const changed = JSON.parse(snapshot);
  changed.evidence[0].result.products[0].name =
    'Altered without matching evidence';
  for (const invalid of [
    JSON.stringify(changed),
    ' '.repeat(500001),
    '<html>Server error</html>',
  ]) {
    body = invalid;
    const fallback = await loadStoreObservations(location, signal);
    assert.equal(fallback.origin, 'bundled');
    assert.deepEqual(fallback.storeListings, storeListings);
  }
});

test('an interrupted catalog read aborts the real connection instead of returning fallback data', async (t) => {
  const controller = new AbortController();
  let requestArrived;
  const arrived = new Promise((resolve) => {
    requestArrived = resolve;
  });
  const location = await server(t, (_request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write('{');
    requestArrived({ closed: once(response, 'close') });
  });
  const loading = loadStoreObservations(location, controller.signal);
  const { closed } = await arrived;
  controller.abort();
  await assert.rejects(loading, { name: 'AbortError' });
  await closed;
});

test(
  'a stalled catalog body times out to the included snapshot and closes its connection',
  { timeout: 12000 },
  async (t) => {
    let connectionClosed;
    const closed = new Promise((resolve) => {
      connectionClosed = resolve;
    });
    const location = await server(t, (request, response) => {
      response.on('close', connectionClosed);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write('{');
    });
    const result = await loadStoreObservations(
      location,
      new AbortController().signal,
    );
    assert.equal(result.origin, 'bundled');
    assert.deepEqual(result.storeListings, storeListings);
    await closed;
  },
);

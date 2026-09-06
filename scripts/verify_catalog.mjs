import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const url = new URL(
  process.env.KEYCONF_CATALOG_URL ?? 'http://localhost:4176/api/catalog',
);
const token = process.env.CATALOG_PUBLISH_TOKEN;
assert.ok(token, 'Set CATALOG_PUBLISH_TOKEN for the test publisher.');
const payload = await readFile('data/store-observations.json', 'utf8');
const snapshot = JSON.parse(payload);
url.searchParams.set('source', snapshot.source);
const put = async (body, auth) => {
  const r = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body,
  });
  return { status: r.status, body: await r.text() };
};
assert.equal((await put(payload, 'Bearer wrong')).status, 403);
assert.equal((await put(' '.repeat(500001), 'Bearer ' + token)).status, 413);
const altered = structuredClone(snapshot);
altered.evidence[0].result.products[0].name = 'Tampered';
assert.equal(
  (await put(JSON.stringify(altered), 'Bearer ' + token)).status,
  422,
);
const result = await put(payload, 'Bearer ' + token);
assert.equal(result.status, 200, result.body);
const get = await fetch(url);
assert.equal(get.status, 200);
assert.equal(await get.text(), payload);
assert.equal(get.headers.get('access-control-allow-origin'), '*');
const repeated = await put(payload, 'Bearer ' + token);
assert.equal(repeated.status, 200);
console.log(
  'Actual worker: authorized publication/read/replay pass; wrong credentials, oversized body and altered evidence are rejected.',
);

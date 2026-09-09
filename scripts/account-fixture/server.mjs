import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { DatabaseSync } from 'node:sqlite';
import { readFile, readdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createCommunityApi } from '../../lib/community-api.ts';

export async function accountFixture() {
  const directory = await mkdtemp(join(tmpdir(), 'keyconf-account-fixture-'));
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const file of (await readdir(new URL('../../drizzle/', import.meta.url)))
    .filter((file) => file.endsWith('.sql'))
    .sort())
    sqlite.exec(
      await readFile(new URL(`../../drizzle/${file}`, import.meta.url), 'utf8'),
    );
  const db = {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      return {
        bind(...parameters) {
          return {
            run: () => statement.run(...parameters),
            async first(column) {
              const row = statement.get(...parameters);
              return row ? (column ? row[column] : { ...row }) : null;
            },
            async all() {
              return {
                results: statement
                  .all(...parameters)
                  .map((row) => ({ ...row })),
              };
            },
          };
        },
      };
    },
  };
  const alice = crypto.randomUUID();
  const bob = crypto.randomUUID();
  const sessions = new Map([
    [alice, 'fixture:alice'],
    [bob, 'fixture:bob'],
  ]);
  const api = createCommunityApi({
    db,
    resolveIdentity: async (request) => {
      const token = request.headers
        .get('cookie')
        ?.split(';')
        .map((value) => value.trim())
        .find((value) => value.startsWith('fixture_session='))
        ?.slice('fixture_session='.length);
      const subject = token && sessions.get(token);
      return subject ? { subject } : null;
    },
  });
  let loseNextSaveResponse = false;
  let loseNextPublicationResponse = false;
  const holds = [];
  const releases = new Set();
  const server = await createServer({
    configFile: false,
    publicDir: false,
    cacheDir: join(directory, 'vite'),
    optimizeDeps: { entries: ['scripts/account-fixture/entry.tsx'] },
    plugins: [
      react(),
      {
        name: 'isolated-account-fixture',
        configureServer(vite) {
          vite.middlewares.use(async (incoming, outgoing, next) => {
            const path = incoming.url ?? '/';
            if (
              path.split('?')[0] !== '/' &&
              !path.startsWith('/api/community/')
            )
              return next();
            try {
              if (path.split('?')[0] === '/') {
                const html = await vite.transformIndexHtml(
                  '/',
                  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Account verification fixture</title></head><body><div id="root"></div><script type="module" src="/scripts/account-fixture/entry.tsx"></script></body></html>',
                );
                outgoing.setHeader('Content-Type', 'text/html');
                outgoing.end(html);
                return;
              }
              const chunks = [];
              for await (const chunk of incoming) chunks.push(chunk);
              const body = Buffer.concat(chunks);
              const request = new Request(
                `http://${incoming.headers.host}${path}`,
                {
                  method: incoming.method,
                  headers: Object.fromEntries(
                    Object.entries(incoming.headers).filter(
                      ([, value]) => typeof value === 'string',
                    ),
                  ),
                  ...(body.length ? { body } : {}),
                },
              );
              const pathname = new URL(request.url).pathname;
              const collections = new Map([
                ['/api/community/profile', (request) => api.profile(request)],
                ['/api/community/builds', (request) => api.builds(request)],
                [
                  '/api/community/favorites',
                  (request) => api.favorites(request),
                ],
                [
                  '/api/community/publications',
                  (request) => api.publications(request),
                ],
                [
                  '/api/community/collections',
                  (request) => api.collections(request),
                ],
              ]);
              const records = new Map([
                [
                  '/api/community/builds/',
                  (request, id) => api.build(request, id),
                ],
                [
                  '/api/community/favorites/',
                  (request, id) => api.favorite(request, id),
                ],
                [
                  '/api/community/publications/',
                  (request, id) => api.publication(request, id),
                ],
                [
                  '/api/community/collections/',
                  (request, id) => api.collection(request, id),
                ],
              ]);
              const collection = collections.get(pathname);
              const record = [...records].find(([prefix]) =>
                pathname.startsWith(prefix),
              );
              const response = collection
                ? await collection(request)
                : record
                  ? await record[1](request, pathname.slice(record[0].length))
                  : new Response('Not found', { status: 404 });
              const holdIndex = holds.findIndex(
                (hold) =>
                  hold.path === pathname && hold.method === request.method,
              );
              if (holdIndex >= 0) {
                const [hold] = holds.splice(holdIndex, 1);
                hold.arrived();
                await hold.wait;
              }
              if (
                loseNextSaveResponse &&
                pathname === '/api/community/builds' &&
                request.method === 'POST' &&
                response.ok
              ) {
                loseNextSaveResponse = false;
                outgoing.statusCode = 502;
                outgoing.setHeader('Content-Type', 'text/plain');
                outgoing.end('The save acknowledgement was lost.');
                return;
              }
              if (
                loseNextPublicationResponse &&
                pathname === '/api/community/publications' &&
                request.method === 'POST' &&
                response.ok
              ) {
                loseNextPublicationResponse = false;
                outgoing.statusCode = 502;
                outgoing.setHeader('Content-Type', 'text/plain');
                outgoing.end('The publication acknowledgement was lost.');
                return;
              }
              outgoing.statusCode = response.status;
              for (const [name, value] of response.headers)
                outgoing.setHeader(name, value);
              outgoing.end(Buffer.from(await response.arrayBuffer()));
            } catch {
              outgoing.statusCode = 500;
              outgoing.end('Fixture failed');
            }
          });
        },
      },
    ],
    server: { host: '127.0.0.1', port: 0 },
    appType: 'custom',
  });
  await server.listen();
  const url = server.resolvedUrls.local[0];
  return {
    url,
    sqlite,
    db,
    sessions,
    alice,
    bob,
    losePublicationResponse() {
      loseNextPublicationResponse = true;
    },
    loseSaveResponse() {
      loseNextSaveResponse = true;
    },
    holdNext(path, method) {
      const arrival = Promise.withResolvers();
      const gate = Promise.withResolvers();
      const release = () => {
        gate.resolve();
        releases.delete(release);
      };
      releases.add(release);
      holds.push({
        path,
        method,
        arrived: arrival.resolve,
        wait: gate.promise,
      });
      return { arrived: arrival.promise, release };
    },
    async close() {
      for (const release of releases) release();
      await server.close();
      sqlite.close();
      await rm(directory, { recursive: true, force: true });
    },
  };
}

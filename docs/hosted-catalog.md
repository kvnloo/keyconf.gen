# Hosted catalog publication, in progress

The nightly source includes a D1-backed catalog publication endpoint. It is not yet deployed or connected to the Discover UI. The existing public snapshot remains the source used by Discover.

`PUT /api/catalog` requires a server-side `CATALOG_PUBLISH_TOKEN`. No credential means publication is denied. This is an administrative machine credential, not visitor sign-in. Never put it in browser code or Git. The route accepts a deliberately selected collector export up to 500,000 bytes. It validates page ordering, source, page hashes and counts before atomically storing an immutable snapshot and updating the published pointer for that source. Publishing an earlier snapshot is an explicit rollback; publication order controls the pointer. No observed option becomes an approved builder part.

`GET /api/catalog?source=...` reads the currently published snapshot without authentication. It returns the original JSON bytes, permits public cross-origin reads and returns 404 when no snapshot exists. Old snapshots remain stored by content hash. The generated schema has two tables and uses their primary-key indexes for the read query. Migrations are schema-only. No runtime DDL or dataset seeding occurs.

The schema is in `db/schema.ts`; `npm run db:generate` creates Drizzle migrations. The nightly Sites binding is `DB`. Only the nightly hosting manifest changes. Do not copy its project identity over the main manifest.

After deploying and configuring the publisher credential, an operator can publish and verify a chosen snapshot with:

```sh
CATALOG_PUBLISH_TOKEN=... npm run catalog:publish -- --file data/store-observations.json --endpoint https://keyconf-nightly.kvnloo.chatgpt.site/api/catalog
```

Use a secure environment assignment in practice rather than entering a credential into retained shell history. The CLI refuses non-HTTPS endpoints and redirects, validates locally, then compares the public readback byte for byte. A failed verification is not reported as success.

## Verification checkpoint

81 tests, strict types, lint, formatting, generated migration inspection and the worker build pass. Real SQLite confirms the foreign key and indexed lookup. Drizzle Kit pulled an obsolete esbuild through `@esbuild-kit/core-utils`; a scoped override to esbuild 0.25.12 restores zero known advisories, and migration generation succeeds with no unexpected schema changes.

The actual local Worker/D1 runtime accepts the twelve-page, 128-option snapshot and returns all original bytes. An isolated oversized request returns 413, and an isolated unauthorized request returns 403. However, a rapid sequence of rejected uploads causes Wrangler's local proxy to report `Network connection lost` and exit. This also occurred with verified Node 24.19.0 and with body cancellation temporarily removed from the generated artifact. The earlier purported Node 22 command actually selected Node 26; that comparison was invalid. The original artifact was restored. A minimal standalone Worker did not reproduce the failure. Cause remains unresolved, so the backend is not claimed production-ready or published.

`npm run verify:catalog` retains the failing sequence, using `KEYCONF_CATALOG_URL` and `CATALOG_PUBLISH_TOKEN` from the environment. It is not yet a passing CI gate. Resolve this runtime failure, verify persistence across a controlled restart, configure the hosted credential, deploy the migrations/backend, verify the real hosted endpoint, then connect Discover with loading and recovery behavior before calling hosted publication complete.

Platform references: [Vinext Workers bindings](https://vinext.io/) and [Drizzle migration generation](https://orm.drizzle.team/docs/drizzle-kit-generate). Raw prepared D1 statements handle runtime reads/writes; Drizzle is a development-time schema tool.

## Runtime isolation

The identical full rejection/publication/readback sequence passes against the same local Worker and D1 database through its internal authenticated development endpoint. Temporary entry tracing showed the failing second request through Wrangler never reached the catalog handler. No application workaround or weakened assertion was retained. A controlled Worker stop/restart followed by a read-only request preserved all 128 observations byte for byte. This isolates the failure to the local front-proxy path; it does not establish behavior of the hosted gateway. The next release must run the same sequence against the actual nightly URL.

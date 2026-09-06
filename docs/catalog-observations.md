# Durable catalog observations

The nightly branch adds a local SQLite collector for the existing public-product importer. It retains observed options, prices, availability, source, method, coverage and retrieval time. It does not add those options to the reviewed builder catalog or upload them to a hosted database. Browser imports and browser saves retain their existing behavior.

## Collect and resume

From the repository root:

```sh
npm run catalog:observe -- --url https://divinikey.com/collections/switches --run divinikey-switches-2026-09-06 --pages 3
```

The default database is `data/catalog-observations.sqlite`. Use `--db` to choose another local file. Database files and their WAL/SHM sidecars are ignored by Git. Keep the database separate from the curated research seeds; observing a retailer listing does not approve its specifications or compatibility.

`--pages` is the **total page limit for that run**, not a request to fetch that many additional pages. Repeating the command reuses committed pages. Raising it to 6 continues from the saved cursor up to six total pages. A different source cannot reuse the run ID. Use a new run ID when taking a new observation of the same source.

The default limit is one page and the maximum is 100. A one-second delay separates new page requests in each invocation. Network errors leave the last committed checkpoint intact and exit with an error; there is no automatic retry storm. This is a bounded local collection tool, not a production job queue or a general website crawler.

Export a run's complete normalized evidence without needing to copy cursors:

```sh
node --experimental-strip-types scripts/observe_catalog.mjs \
  --url https://divinikey.com/collections/switches \
  --run divinikey-switches-2026-09-06 --pages 3 --export > work/switch-observations.json
```

The same page limit makes this a local read once three pages have been committed. The JSON includes the run state, each page's original result and its normalized-payload SHA-256. These hashes detect payload changes; they are not retailer signatures or hashes of the original HTML/GraphQL response.

## Evidence model

- `catalog_run` binds a stable run ID to one canonical source URL and start time.
- `catalog_page` retains page order, requested cursor, original timestamp, method, coverage, normalized payload and hash.
- `catalog_product_observation` indexes each observed row by its page, product URL and SKU. It preserves exact/from/range/unknown pricing as JSON with decimal strings. No currency conversion, per-switch price calculation or product-identity merge occurs.

A page and all its options commit in one transaction. Replaying identical evidence is a no-op; conflicting evidence for an already committed page is rejected. Concurrent collectors can read the same checkpoint, but cannot overwrite each other's committed page. A worker encountering a conflict must restart from the saved checkpoint. No database transaction is held during network requests or delays.

A later run adds history instead of replacing earlier prices or dates. The same option appearing on multiple pages or runs is retained as multiple observations. Observation count is not a count of unique products, keyboards, or compatibility-approved parts.

The continuation state distinguishes:

| State | Meaning |
| --- | --- |
| `pending` | No page has committed yet. |
| `more` | A supported continuation remains; the current page limit may have stopped the run. |
| `pagination-ended` | The source returned the end of this supported pagination sequence. Its coverage qualification still applies. |
| `preview-only` | The importer supplied no supported continuation. This does not establish an exhaustive catalog. |

Repeated cursors are rejected before another page commits. Collection pages are live observations rather than a transactionally frozen retail inventory. Failed or expired source cursors may require a new run; previous evidence remains available.

For price/history review, join observations to their page timestamps:

```sql
SELECT r.source_url, p.observed_at, o.name, o.product_url, o.sku,
       o.pricing_json, o.availability
FROM catalog_product_observation AS o
JOIN catalog_page AS p USING (run_id, page_number)
JOIN catalog_run AS r ON r.id = o.run_id
ORDER BY p.observed_at, o.run_id, o.page_number, o.row_number;
```

The implementation uses the built-in [Node SQLite API](https://nodejs.org/download/release/v22.13.1/docs/api/sqlite.html), prepared statements, foreign keys, WAL and full synchronous transactions. It adds no runtime package dependency. The database is an administrative local artifact; it is not bundled into either website build.

## Verification and remaining work

Eight tests exercise real temporary SQLite files: persistence and original price history, idempotent replays with reordered input fields, conflicting source/page writes, two connections using a stale checkpoint, page-wide rollback after an injected insert failure, interrupted-run resume, total page limits, unsupported pagination, cursor cycles, malformed observations and altered-payload detection. The complete 55-test suite passes on the development runtime and Node 22.13.1. Type checking, lint and both website builds pass.

A live Divinikey collection run on September 6, 2026 retained 12, 11 and 12 options on three pages: **35 distinct variant URL/SKU pairs**, with timestamps from 09:11:25 to 09:11:28 UTC. Replaying and exporting the same run under Node 22.13.1 with `fetch` replaced by a throwing function passed without network access. SQLite integrity and foreign-key checks passed; the run correctly remained `more`. The local export is `work/divinikey-observations-20260906.json` and its SHA-256 is `53c7bc218c703501dd425d0b2cc6a993a1b5f676ef5d1e72271635f83cf390db`.

Further work includes reviewer workflows, approved product/variant identity mapping, raw-source and extractor-version archives where appropriate, hosted persistence, scheduler-wide rate controls, and additional supported adapters. The collector does not establish redistribution rights, complete specifications, mechanical fit, measured acoustics or current stock after the observation time. Public Pages still calls the independently deployed stable Sites API; this local collector does not deploy or change that backend.

## Searchable store snapshot

Nightly Discover now includes a separate, collapsible store-observation browser. Its committed input is `data/store-observations.json`, exported from run `divinikey-switches-2026-09-06`: twelve pages, 128 distinct variant URL/SKU pairs and 21 brands observed September 6, 2026. This is a partial Divinikey switch collection, not 128 unique switch models or a popularity ranking. The earlier three-page run remains in SQLite under its original ID.

Search matches brand, product name and SKU. The browser initially shows twelve options, expands on request, retains variant links and dates, and labels each price as the named option's price. It does not divide pack prices, claim present stock, or make these options selectable as verified builder parts. A regression verifies every exported page's normalized-payload hash and each listing's original values. The browser journey checks search, expansion, empty/reset states, keyboard disclosure, links and overflow at 320 and 1920 pixels.

Refresh the snapshot from a deliberately chosen collector run using `--export`. Write to a temporary file first and replace the committed JSON only after the collector succeeds. Review the source, coverage, timestamps, counts and test results before publishing. Keep the full page evidence in the committed snapshot; do not copy just names and prices. This static publication makes observations available to readers but does not replace the pending hosted ingestion and review workflow.

The nightly importer now has its own deployed Sites backend, as documented in [Nightly backend](nightly-backend.md). Main and dev continue using the stable importer.

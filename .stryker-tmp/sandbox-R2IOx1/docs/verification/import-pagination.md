# Collection and variant pagination

Implemented on `nightly`, September 6, 2026. The existing public Sites backend is still the stable release; this checkpoint has not been promoted to it.

## Behavior

A Shopify collection URL now queries that collection by handle before using incidental page-level product structured data. A missing collection produces an error instead of a storewide preview. `/collections/all` remains a storewide listing; product URLs retain their product-specific import path. Collection tags, website filters and sorting are not applied and the preview says so.

Catalog requests return up to eight products with ten variants each. If products have remaining variants, continuation requests finish those variants before advancing the product cursor. Every response stays within 80 options without silently dropping the tail of a product page. Product ordering uses the API's ID sort. Price currency and variant purchase links remain explicit. The catalog is live data, not a transactionally frozen snapshot.

Continuations are bounded data tied to the original source URL. IDs and cursors are validated before network access; public-target and response-size checks still apply. These are public catalog cursors, not signed authorization credentials. Missing pagination information, repeated cursors, disappearing products and partial GraphQL failures fail visibly rather than reporting false completeness.

Load more preserves previous checkbox choices and leaves newly loaded options unselected. Repeated rows are removed. A failed next-page request preserves the current list and its continuation for retry, without marking a valid website URL as invalid. Each row keeps its own page's observation date when exported. Adding another selection after an earlier successful add now works without restarting the preview.

## Evidence

The first four regressions failed before implementation: the collection preview returned storewide switch lube, no continuation was exposed, a missing collection fell back to the store, and a mismatched continuation reached network access. They now pass. Two further tests cover partial/repeated responses and the actual HTTP endpoint forwarding/rejecting continuations. The older storewide variant-price fixture now uses a store URL and supplies the cursor requested by the API; all original price and identity assertions remain.

Validation passed:

- 47 unit/data/API tests, TypeScript, lint and actionlint.
- Server production build and the Pages build with `/keyconf.gen/nightly/` as its actual base.
- The 320px pagination browser flow: temporary failure and retry, source binding even after editing the input field, retained choices, duplicate removal, explicit new selections, repeated add, and observation dates in the downloaded build.
- Existing mobile import/share, shared-build restore, audio-recovery and storage-denial browser journeys.

A live Divinikey `collections/switches` request returned 12 options, followed by 11 options on the next product page, with no overlapping variant URL/SKU pairs. The API named the source collection “Keyboard Switches” and supplied exact currency-bearing prices and distinct variant URLs. This verifies those sampled pages, not complete supplier coverage or stock guarantees.

## API references

The implementation uses Shopify Storefront API `2026-07`. Shopify documents [collection lookup by handle](https://shopify.dev/docs/api/storefront/latest/queries/collection), [nested collection product connections](https://shopify.dev/docs/api/storefront/latest/objects/collection), and [tokenless products/collections with a query-complexity limit](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api). Sources checked September 6, 2026. Requests remain small and user initiated; there is no unbounded store crawl.

## Remaining work

Publish an appropriately isolated nightly backend before claiming that the public nightly Pages preview exposes pagination. All Pages channels currently call the stable Sites import API, which can return a one-page response without `next`; the new client remains compatible with that response. Durable source observations, large catalog storage, unsupported sites and product pages with exceptionally large variant sets remain separate work. The browser parts library still validates a maximum of 500 imported parts.

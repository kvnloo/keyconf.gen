# Import accuracy verification

Reviewed September 5, 2026, America/Chicago. This pass fixes the existing preview and preserves its explicit-add workflow.

## Contract and evidence

- An aggregate low/high offer is a range, not an exact price. A low price without an upper bound is a starting price. Missing currency, invalid amounts and conflicting currencies remain unverified. The model follows [Schema.org AggregateOffer](https://schema.org/AggregateOffer).
- ProductGroup variants inherit a group name and brand when needed, while retaining their own SKU, URL, price and stock. Group offers are not assigned to every variant. References can precede definitions and use equivalent relative or absolute identifiers. See [ProductGroup](https://schema.org/ProductGroup) and [JSON-LD node identifiers](https://www.w3.org/TR/json-ld11/#node-identifiers).
- Shopify catalog results expose each returned variant, rather than silently choosing the first. Numeric variant IDs identify purchase links when the API supplies an online product URL. [ProductVariant](https://shopify.dev/docs/api/storefront/latest/objects/ProductVariant) documents variant-specific price and availability; a missing [onlineStoreUrl](https://shopify.dev/docs/api/storefront/latest/objects/Product) does not justify inventing a product URL.
- Imports remain unverified compatibility references. Source URLs and SKU/price observations survive download and selected-part sharing. No live inventory promise is added.

## Regression evidence

Before the production changes, four tests in `tests/import-products.test.mjs` failed: a range became a single price, conflicting offers lacked an honest combined result, referenced variants lost their group identity, and Shopify returned only one of two variants. A fifth failing-before check reproduced relative/absolute reference mismatch, returning `Sage` instead of `Desk keycaps · Sage`.

All six import tests now pass, including malformed price/API-result checks. The complete unit/data/model suite passes 38 tests, with type checking, lint and both production builds passing. The adjacent browser suite also passes sharing, file restore, audio retry/cancellation and storage-denial recovery. The existing ProductGroup test now asserts the exact-price representation rather than the retired internal currency field.

`npm run verify:imports` uses the running app at 320 px. It previews an ivory range, a sage starting price and an unpriced clear variant, deselects sage, adds two keycaps, selects ivory and downloads the build. A fresh 1280 px browser opens the shared link and retains the selected variant, price range and source. The downloaded data retains unknown compatibility and the unpriced option. Import rows do not overflow the narrow dialog; the screenshot was inspected. No page errors occurred. The new journey is a GitHub Actions gate. Its first run used an incorrect CSS selector for the final product card; the visible article and its reference link confirmed the actual app state, and the corrected semantic locator passed.

## Live sources

Observed September 6 UTC through the local server route:

- KBDfans `tofu60-redux-plate` returned both polycarbonate and aluminum black options, with distinct SKUs and variant links. Prices remained unverified because Shopify product JSON does not establish currency.
- Divinikey's switches collection triggered the public Storefront fallback and returned 80 options with exact currency-tagged prices, availability and variant links. The first product had both 3 mL and 5 mL options with different prices and stock.
- KBDfans and NovelKeys homepages exceeded the 2 MB response limit and returned an explicit size error. This is a supported failure path, not complete homepage ingestion.

## Remaining limits

The Storefront fallback is a storewide first-page preview even when entered through a collection. It inspects up to 40 products and 20 variants per product, returns at most 80 options and reports further products/variants. Collection filtering, full pagination and durable observation history remain ingestion work. The structured-data parser supports common Schema.org fields and local references; it is not a complete JSON-LD processor for remote contexts, aliases or custom base rules.

Old browser tabs can still read the API's legacy price/currency fields. The server fills those fields only for exact prices, so a range never becomes an invented exact price during rollout. The new UI uses the explicit price model. Saved builds keep the existing portable format.

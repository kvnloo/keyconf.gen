# Public build discovery

Public discovery is live on nightly. Google setup remains deferred. Visitors can browse deliberately published releases without an account. Creator publishing controls and sign-in are separate unfinished workflows.

## User journey

Discover shows recent published builds and drops. A visitor filters by release type or searches public title and frozen creator attribution, opens the existing immersive publication page, follows original maker links and customizes a separate copy. The page has loading, empty, error/retry and load-more states. No fabricated creators or production fixtures fill an empty gallery.

## Data boundary

Only nonwithdrawn `community_publication` records qualify. Return a small allowlisted summary using frozen release/author data. Never include private drafts, account subjects, operation IDs, profile-only accounts, favorites, proposal briefs/tokens or responses. Withdrawal excludes listings and direct reads. Use stable descending publication time plus ID pagination and a corresponding global listing index.

Do not infer creator-profile visibility or ownership from a current handle. Profiles currently have no public opt-in field, and handles can change or be reassigned while publication author evidence is frozen. Dedicated public creator pages need a separate stable identity and visibility contract.

## Implementation

- `db/publications.ts`: bounded public listing query over active publications.
- `db/schema.ts` and generated migration: public listing index.
- `lib/discovery.ts`: query/filter/cursor parsing and allowlisted summary validation.
- `app/api/publications/route.ts`: anonymous read endpoint.
- `app/community-discovery.tsx` and styles: minimal gallery in existing Discover.
- Static Pages: reuse the configured hosted Sites destination for server-backed reads and publication navigation; do not invent an origin.

## Acceptance

Use real SQLite and Worker/browser fixtures. Verify anonymous gallery-to-release-to-customize, privacy exclusions, withdrawal, timestamp-tie pagination, frozen attribution after handle reassignment, original component/accessory source links, drop destination/availability, local-draft isolation and retired-part recovery. Check narrow layouts, keyboard navigation, empty and error recovery. Run types, unit tests, build and relevant publication verification. Update product status only from that evidence.

## Visual preview contract

The public summary adds a small thumbnail recipe after validating the frozen publication snapshot: geometry ID, case color and four key colors. It excludes private build names, palette names, component selections, imported reference libraries, audio settings and account fields. No database migration or remote image service is required. Older API responses without a recipe render an explicit unavailable preview; malformed supplied recipes reject.

Inline SVG cards use the bundled 60/65/75 study coordinates or the documented Q1 Max ANSI positions. The Q1 variant requires its matching case/PCB/plate assembly, not merely a 75% layout choice. Key-color roles match the studio, and both views share the stock Q1 encoder color. Card illustrations show layout and saved colors, not exact enclosure materials, artisan sculpts or accessory geometry. Captions state the geometry scope; the full build retains original part links and detailed preview limits.

Retired snapshots retain their saved layout and colors rather than substituting current catalog choices. The gallery uses no thumbnail canvases or per-card media requests. The recipe parser bounds geometry choices and accepts only six-digit hex colors.

The release progress record contains the current verification and deployment state. Tests cover frozen appearance, Q1 detection, legacy responses, malformed recipes and privacy exclusions. Compiled-Worker browser coverage includes all four geometry variants and preserved retired snapshots alongside existing pagination, search, error recovery and accessibility checks.

## Search semantics and operations

Search uses an FTS5 `unicode61` index over frozen public title, creator display name and handle. Queries are bound as a quoted phrase with a prefix on the last word. This supports Unicode case folding and accent-insensitive name discovery; it is no longer arbitrary substring search. User-supplied FTS operators are treated as literal text. Migration `0010_publication_search.sql` backfills existing active publications and maintains insert/update/delete/withdrawal behavior with triggers. Cursor and release filters remain in the same SQL query.

The index is derived: it contains no unique source data, private draft text, proposal text or current profile data. Its canonical inputs remain in `community_publication.metadata` and `.author`. Cloudflare documents FTS5 support and a SQL-export limitation for databases containing virtual tables: https://developers.cloudflare.com/d1/sql-api/sql-statements/ and https://developers.cloudflare.com/d1/best-practices/import-export-data/. Tokenizer behavior is documented at https://www.sqlite.org/fts5.html#unicode61_tokenizer.

SQL-export maintenance requires pausing writes, removing the three `community_publication_search_*` triggers and the derived virtual table, exporting the canonical database, then recreating/backfilling the index with migration 0010 before resuming writes. Do not run this maintenance automatically or against the live site as part of feature verification. The index must also be recreated after restoring such an export. This operational limitation is accepted for the Unicode-aware SQL search implementation and must remain documented.

The original gallery release passed compiled-Worker browser checks for pagination focus, Unicode search, retry and mobile accessibility before publication. Later changes must retain those checks. See `docs/product-progress.md` for exact release evidence.

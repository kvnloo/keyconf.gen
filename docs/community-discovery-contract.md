# Public build discovery

Next community increment after the accessory import release. Google setup remains deferred. This feature is anonymous discovery of deliberately published releases, not an alternative account system.

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

Read-only high-effort review identified this gap in `db/publications.ts`, `app/page.tsx`, `db/schema.ts` and existing community/publication tests. No implementation or completion is claimed by this contract.

## Storage checkpoint

The public listing query, global recent-publication index and read-only API are implemented locally. The query returns only ID, title, release kind, frozen creator name/handle and publication time. It validates the underlying immutable snapshot before returning a summary. Search is literal over public title and frozen author fields; it does not search private notes or current profile records.

All 37 community SQLite tests pass, including unpublished/withdrawn exclusions, timestamp-tie pagination, profile changes/handle reassignment, literal search and malformed cursor handling. Types, lint and formatting pass. The API has not yet been exercised against the compiled Worker. Client response parsing, gallery UI, static-host navigation and full browser coverage remain unfinished.

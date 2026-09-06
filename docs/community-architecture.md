# Community architecture

Status: private storage foundation deployed on nightly, September 6, 2026; Google setup explicitly deferred by the user. This document defines a buildable extension. It does not claim accounts, community publishing or client proposals are shipped.

## Product decision

Keep the keyboard studio as the main activity. Add a public collection of people's builds, private favorites, and client proposals that open directly into a preconfigured design. A creator drop is a named, published configuration with an author and a release date. It may carry creator-written availability text and a validated external purchase or enquiry link. Keyconf does not infer stock, operate checkout, accept payment or claim endorsements.

Visitors can browse and customize without signing in. Sign in with Google is the chosen account entry point, required to save account builds, favorite a published build, publish, or submit attributed feedback. Existing device saves, portable links, exports, imported parts, sound, typing, compatibility checks and independent control-deck studies stay available.

## Current implementation and consequences

| Existing behavior | Consequence for this extension |
| --- | --- |
| `app/page.tsx` is a client component with hash navigation. `app/pages-entry.tsx` also renders it in static GitHub Pages. | Preserve the studio. Add server-rendered community routes on Sites instead of converting the whole application or importing server authentication into the shared client entry. |
| `app/use-build.ts` saves one keyboard draft in channel-scoped local storage and supports undo/redo. | Treat this as the device draft. Account saving is an explicit action with its own state and destination. Signing in must not silently replace either draft. |
| `lib/build.ts` validates version-1 keyboard builds, imported parts and audio settings. Links retain selected imported parts and have a 24,000-character limit. | Reuse its validator. Store validated JSON in D1 for account records. Keep current file/link import contracts. A database share link references an immutable revision and is independent of the portable-link size limit. |
| `lib/control-deck.ts` has a separate version-1 validator and format. | Use a discriminated document envelope for keyboard and control-deck records. Do not coerce control decks into keyboard parts or imply device connectivity. |
| Featured builds are bundled presets without community accounts. | Label them Keyconf presets. Do not manufacture creator profiles, followers, activity or endorsements for them. |
| The nightly Sites app already declares D1 `DB`; catalog tables and publication APIs are separate administrative functions. | Add community tables to the same logical binding. Keep catalog publication credentials and permissions out of visitor account flows. No R2 is needed for the initial release. |
| Stable, nightly and Pages have separate deployment behavior. Sites user IDs are stable within a Site, not across Sites. | Nightly accounts and content are test-channel data. Do not promise automatic account migration to stable or shared sign-in on Pages. |

The product contract remains [product-goal.md](product-goal.md). Current backend evidence is in [hosted-catalog.md](hosted-catalog.md) and [nightly-backend.md](nightly-backend.md).

## Smallest useful interface

Preserve Build, Sound, Play and Discover. Use one Community destination and an account control in the compact primary navigation, with the existing studio destinations available in context. Keep Resume visible. Public discovery gets one search entry over published build titles and chosen creator handles, with bounded results and a clear empty state. On small screens use the existing compact navigation pattern and allow normal scrolling.

| View | Content and primary action |
| --- | --- |
| `/community` | Recent published builds and drops in a compact grid. Each card has a build preview, name, actual author and build kind. Open a build. Empty state says no builds have been published and links to the studio. No fake popularity counts. |
| `/u/[handle]` | User-chosen display name, handle, optional short bio and creator links, and that person's published builds/drops. Private builds and favorites are excluded. An unpublished profile returns not found to other visitors. |
| `/b/[publicationId]` | Immutable published build, author, parts and recording provenance, and Customize / Favorite actions. A drop adds its title, short note and publication date. Previewing never writes the device draft. |
| `/account` | Protected page with My builds, Favorites and Proposals. Show whether each build is private or published. Save, reopen, publish and create a proposal from a saved revision. |
| `/p/[token]` | A preconfigured proposal with the creator's brief, version, and visible notice that anyone with the link can view it. Customize opens a separate proposal draft. Submit changes sends that draft and an optional note after sign-in. |
| `/account/proposals/[id]` | Creator sees the original and submitted revisions, a concise field/part comparison, feedback author and time. Open a submitted version or create a revised proposal. No silent merge into the creator's build. |

Use existing keyboard rendering for preview, with at most one active 3D preview at a time. Cards can use a lightweight deterministic representation of the configuration. Generated photos, profile uploads and a thumbnail service are not prerequisites.

Publishing has a small review dialog showing exactly what becomes public: chosen profile identity, title, selected parts and their source links, recording attribution, and description. Offer Publish and Keep private. Imported source URLs may contain user-specific query data; review those URLs before publishing. Neither the platform email nor the full device import library belongs in the public document.

A saved account build shows “Saved to your account” only after the server acknowledges its revision. During local editing show “Changes on this device” until the next explicit account save. Network failure leaves the draft usable and offers Retry and Export. Expired sign-in preserves the draft before top-level navigation. An account save with a stale revision shows a conflict and offers Save as copy or reopen the current account revision.

Proposal editing uses its own local draft key, separate from `keyconf-build-v1`, with the proposal identity and base revision. Viewing, editing and submitting a proposal cannot overwrite the visitor's personal studio draft. Returning from sign-in restores that proposal draft. Sign-in return targets may include the bearer token, so redact it from retained request diagnostics and verify the platform return flow does not expose it in public metadata. Submission is explicit. The original proposal and every received response remain unchanged.

## Identity and authorization boundary

Google is the selected provider as of September 6, 2026. The user has not created a Google project and explicitly deferred setup. Provider-neutral storage and validation are implemented; no account route or authentication endpoint is exposed. The previous SIWC implementation plan is superseded. Google sign-in is not live. The available Sites documentation describes dispatch-owned ChatGPT authentication but does not establish an external Google authentication path. Confirm that integration before shipping provider-specific routes or buttons; do not label a ChatGPT redirect as Google sign-in.

Google Identity Services requires a web OAuth client ID and registered site origins. See [Google setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid). Production configuration and an end-to-end hosted sign-in/sign-out test remain release requirements.

Keep storage provider-neutral. Map a server-verified, provider-qualified subject to a private account row. Never accept an owner ID from request JSON. Validate identity server-side for every private API; anonymous requests return 401. Account responses must not be shared-cached. Public display names and handles are explicitly chosen; identity email/name must not be published automatically. Signing in must preserve the device draft.

Keep account and proposal write APIs same-origin on Sites. Require the expected Origin for browser mutations, reject missing or mismatched origins, and do not enable credentialed cross-origin writes for Pages. Public reads may remain separate. On Pages, Community/account controls navigate to the matching Sites channel. Existing public catalog/import CORS policies do not become authentication policies.

Authenticated pages, private APIs and proposal responses use `Cache-Control: private, no-store`. Do not cache identity-bearing responses in a public edge cache. Verify on the hosted dispatcher that anonymous client-supplied identity headers cannot impersonate a user; local header injection is only a test fixture.

The first API contract stays small:

| Endpoint | Boundary |
| --- | --- |
| `GET/PATCH /api/community/profile` | Signed-in user's profile only; reject invalid/reserved handles with an actionable response. |
| `GET/POST /api/community/builds` | List/create private account builds. A client operation ID makes a retried create idempotent. |
| `GET/PUT /api/community/builds/[id]` | Owner-only read/save; PUT includes expected revision and a unique operation ID. |
| `POST /api/community/proposals` | Owner creates a proposal from an owned immutable revision; return the bearer link once. |
| `GET /api/community/proposal-preview/[token]` | Link-holder read, excluding private account fields and all responses. |
| `POST /api/community/proposal-preview/[token]/responses` | Signed-in link holder submits a validated snapshot and revision-specific note. |
| `GET/PATCH /api/community/proposals/[id]` | Owner sees responses and closes or rotates the link; anonymous/other-account requests are denied. |

Keep private save/create operations idempotent with a per-account operation key and request digest in a small operation record or equivalent unique row constraint. Reusing a key for different content returns a conflict. This prevents a lost response from creating duplicate proposals or revisions.

## Records and invariants

Define the schema in `db/schema.ts`; add generated, inspected, schema-only Drizzle migrations. Runtime queries belong in `db/community.ts`, using prepared statements and bounded D1 batches. Do not change deployed catalog migrations or create tables during requests.

| Record | Required fields and constraints |
| --- | --- |
| `community_account` | App ID primary key, unique private Sites subject, creation time. No public email field. |
| `community_profile` | Account ID primary/foreign key, unique lowercase handle, display name, short bio, validated creator links, optional public-since time. Only the owner edits it. |
| `community_build` | ID, owner account, document kind, latest revision number, created/updated times. Index owner and update time for My builds. |
| `community_build_revision` | Composite primary key of build ID and revision number, validated document JSON, selected-part evidence JSON, schema version, created time. Immutable. |
| `community_publication` | ID, owner, build ID and revision number, kind `build` or `drop`, title, note, optional creator-written availability and external enquiry/purchase URL, published time, optional withdrawn time. Index active publication time and owner. Each points to an owned immutable revision. |
| `community_favorite` | Account ID and publication ID as composite primary key, creation time. Add account/time index only for the private favorite-list query. PUT/DELETE are idempotent. |
| `community_proposal` | ID, owner, base build/revision, brief, unique token digest, created time, optional closed time. A proposal references the owner's revision. Index owner/time. |
| `community_proposal_response` | ID, proposal ID, verified author account, validated submitted document JSON, note, created time, client operation ID unique within author/proposal. Append-only; no visitor mutation of the base build. Index proposal/time. |

Use foreign keys for account/build/revision relationships. Composite revision references keep the revision attached to its build. Enforce same-owner publication/proposal references with composite ownership keys or a guarded `INSERT ... SELECT`, not a prior unguarded existence check. Saving a new revision and advancing the latest pointer must be one atomic operation with an expected-revision condition. Reject stale versions with 409 and no orphan revision.

The document envelope is either `{ kind: 'keyboard', build: Build }` or `{ kind: 'control-deck', build: DeckBuild }`. Parse unknown input once at the API boundary through the existing matching validator. Strip unselected imported parts when publishing/sharing and validate a second time after normalization. Limit request bytes before JSON parsing; an initial 128 KiB document cap, 80-character build title, 160-character profile bio and 2,000-character proposal note are concrete starting limits. Oversized drafts retain file export and a clear error.

For keyboard revisions, derive the selected-part evidence and compatibility/recording disclosure on the server. Client text cannot promote an imported part's `unknown` evidence to approved compatibility. The existing export includes selected components, compatibility checks and recording context; extract that logic for reuse instead of creating competing claims. Preserve the source catalog version or digest with the revision. If a later catalog removes an ID, show the stored evidence and an unavailable-part warning; do not silently substitute parts. Restoring editable older records requires an explicit supported migration or repair step.

A drop is an immutable publication, so changing the working build cannot change a released drop. A later edit produces another revision/publication. Unpublishing hides its public detail and removes it from feeds. A favorite of a withdrawn item displays “Build unavailable”; it does not reveal the retained private revision.

Proposals use cryptographically random tokens with at least 256 bits of entropy; store only a digest. Only a link holder can read or submit, and submission additionally requires a verified signed-in account. This is a bearer-link invitation, not proof that the holder is the intended client. The UI must say that plainly. The owner can close a proposal or rotate its token. Because only a digest is retained, a lost create response can recover the proposal by operation ID and issue a fresh link through rotation; the server cannot recover the original token. Check openness and token validity in the response insert itself to prevent a close/submit race. Responses are visible only to their author and the proposal owner.

Exclude proposals from public search, sitemap and metadata previews; send `noindex` and `Referrer-Policy: no-referrer`, and avoid third-party assets on proposal pages. Redact raw tokens from application logs. A copied link can still be forwarded, and closing it cannot retract a previously downloaded configuration.

## First vertical slice

Ship one complete proposal loop on nightly before building a public feed:

1. Integrate verified Google sign-in and account/profile records. A visitor signs in and explicitly chooses a public display name only when sharing with another person.
2. Save one keyboard build as a private immutable account revision, with visible save and failure states. Preserve current device save and export behavior.
3. Create a proposal from that revision and copy its link. Open the link in a separate anonymous browser context and preview it without changing that browser's saved studio build.
4. Customize the proposal in its isolated draft. Sign in as another user and submit the configuration plus a note once. A retry returns the existing response through its operation ID.
5. The creator opens Proposals and reads the attributed response and changed parts/colors. Opening a response creates a local draft; it does not mutate the original. Closing the proposal prevents new reads/submissions through its token.

This slice uses accounts, profiles, builds/revisions, proposals and responses. Do not add publication/favorite tables until the next working unit. Initially restrict account proposal creation to keyboards with an explicit UI explanation; existing control decks continue working locally. Add control-deck account serialization before exposing their account save action.

The next unit adds public profile publication, public build/drop detail and private favorites together. The public feed follows only when publishing, withdrawal and real empty states work. Public launch also needs an operator hide path and per-account write limits, with durable atomic counters or supported platform controls. The current backend has no global rate limiter; do not describe browser disabling or process memory as one.

Optional music belongs after the community loop. Keep it off by default with its own volume/mute state. A shared playback coordinator must mute music before keyboard recordings or reference videos start, and restore it gently only when those sources stop and the user still wants music. Page visibility and stale playback callbacks must not restart it. Reuse no track until its source and reuse terms are recorded. The later typed/voice companion must use explicit supported studio actions and permission/state for microphone use; neither feature is part of the first slice.

## Acceptance checks and risks

| Check | Required evidence |
| --- | --- |
| Real identity | Hosted Google sign-in completes and returns to the exact proposal/account route; sign-out works. Anonymous API writes return 401. Forged identity headers cannot impersonate an account on the hosted URL. |
| Two-account isolation | Account B cannot read, save, publish, withdraw or list account A's private builds through changed IDs. A sees only responses to A's proposals; another client cannot see those responses. |
| Anonymous continuity | Browse and existing studio/portable-link flows work before sign-in. Save, preview, sign-in return and proposal editing preserve the preexisting keyboard/control-deck drafts and undo behavior. |
| Persistence | Account saves and submitted responses survive fresh browser sessions and Worker restarts. A stale save returns 409 without losing either revision. Identical response retries produce one row. |
| Proposal revocation | Invalid, closed and rotated tokens fail without leaking private titles. A close/submit race never inserts a response after the close takes effect. |
| Data integrity | Real SQLite tests prove foreign keys, unique handles/favorites, owner guards and atomic revision saves. Malformed, oversized, mismatched-kind and unknown-part payloads recover visibly. Source evidence stays unknown for imported parts. |
| Public privacy | Public routes exclude subject/email, private revisions, favorites and proposal data. Withdrawn publications disappear from reads and favorites without exposing their retained payload. |
| Client usability | At 320/390px and desktop, keyboard navigation, focus, loading, server errors, expired sign-in and conflict recovery permit completion. Observe the full creator/client loop in separate sessions. |
| Release | Existing regression suite, types, lint and both Sites/Pages builds pass. Inspect new migrations; deploy nightly backend before dependent clients; run hosted checks. Retain stable's deployment identity. |

The first slice is complete only after the hosted two-user loop and isolation checks pass. Local fake headers and a successful build cannot prove dispatch behavior. Catalog changes remain a restore risk until revision migration/repair is implemented. Link proposals provide convenient sharing but are not suitable for claims of named-recipient confidentiality. Public profile and drop content needs withdrawal and operator removal before opening unrestricted publishing.

Authentication and storage decisions follow the installed Sites [authentication guidance](/home/kvn/.codex/plugins/cache/openai-bundled/sites/0.1.57/skills/sites-building/references/authentication.md), [storage guidance](/home/kvn/.codex/plugins/cache/openai-bundled/sites/0.1.57/skills/sites-building/references/persistence-and-storage.md) and [SQLite guidance](/home/kvn/.codex/plugins/cache/openai-bundled/sites/0.1.57/skills/sites-building/references/sqlite.md). Recheck their current helper contract at implementation time.

## Account storage implementation, September 6

`db/community.ts`, `lib/community.ts`, and migration `0001_panoramic_ken_ellis.sql` implement private account/profile/build storage. Eight real SQLite tests cover chosen normalized handles, owner-only reads, idempotent operations, conflict retries, source-evidence retention, invalid input, bounded request bodies and private error responses. The list returns the newest 100 snapshots using the owner/date index; pagination is still needed before promising an unlimited library.

The unfinished ChatGPT-specific account page and API drafts were removed when Google was selected and setup deferred. No sign-in button, account page, or community API is being shipped with this storage foundation. The UI, hosted Google identity/session boundary, end-to-end account verification, favorites, public profiles and proposals remain pending.

## Portable preview release

The `#preview=` flow shipped on nightly September 6, 2026. It reuses validated
portable build data and provides independent geometry, audio, source links and
explicit customization. It creates no account or publication record and is not
a revocable client proposal. A clean visitor receives no device draft until
customizing. Existing `#build=` links retain direct-import compatibility.

Next account-independent UI work is a single search entry across available
parts and studio destinations. Show only implemented destinations and real
product references. Creator search, favorites and attributed feedback remain
dependent on the Google/account integration; do not fill them with fake users.

### Creator link storage

Profiles accept up to five labeled HTTPS links for channels, shops or commission
pages. Labels are limited to 40 characters and URLs to 2048 characters. The
boundary rejects credentials in URLs, duplicate normalized URLs and control
characters in labels. Links are outbound references; the server does not fetch
them or claim verification of the creator's ownership. Saving an empty list
removes the saved links. Migration `0002_far_famine.sql` adds a non-null JSON
list with an empty default, preserving pre-existing profile identity and bio.
This storage support does not expose public profiles or enable sign-in.

### Publication storage in progress

A publication references an existing immutable `community_build` snapshot.
Creation derives ownership from the trusted subject and requires the owner's
chosen profile. Release metadata and author profile are frozen. Retries use a
per-owner operation key and a digest of normalized request fields, independent
of later profile edits. Public projection excludes private owner/operation/build
identifiers and replaces the private draft name with the reviewed release title.
Recorded evidence is read from the saved snapshot rather than regenerated.

Withdrawal returns only an ID and the original withdrawal timestamp. It must
remain available even when a retired part makes the saved build unrestorable.
The public read then returns not found, and retrying publication returns the
withdrawal receipt without making the release public again. The persistence
implementation is under review; no publication endpoints or UI are exposed.

The publication write path now checks existing operations before restoring
snapshots, validates new owned payload/evidence before inserting, and rereads
the winning row after the guarded insert. An independent review found and
confirmed the correction to an earlier insert-before-validation ordering. SQLite
regressions cover zero writes for malformed/retired snapshots, unchanged
operation keys after failure, profile-independent retries, and simultaneous
identical/conflicting requests. Eighteen focused checks, types and lint pass.
The full release suite is pending; public evidence response shapes and API/UI
integration still require implementation before enabling publishing.

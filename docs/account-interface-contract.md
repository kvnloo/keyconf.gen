# Account interface contract

Status: implemented and tested in an isolated browser fixture; not exposed in the public app. Google setup remains deferred. No production account route, identity adapter or session endpoint is added by this work.

## What the interface does

`app/account/account-panel.tsx` receives the current device keyboard and an explicit open callback. The fixture wires that callback to the existing `useBuild.edit`, so opening a saved snapshot is an undoable studio edit. Reading an account, editing a profile and saving a snapshot do not replace the device draft.

The main view contains the current device draft, a private saved-build list and a collapsed creator-profile form. Profile fields are chosen by the user, including up to five original creator links. No email or provider name is automatically published. Saving a profile or keyboard creates no public publication.

Each keyboard save captures its payload and operation ID before sending. A lost acknowledgement leaves that exact request available for retry, even if the device draft has changed. A rejected request also offers an explicit return to the current draft for a new save, with a warning that an earlier uncertain save may already exist. A success receipt names the acknowledged snapshot rather than whichever draft is currently visible.

Pagination merges into current list state so an overlapping save cannot disappear. Newly loaded rows accept programmatic focus even while Open buttons are disabled by another read. Replacing the account request controller resets transient busy states and preserves an interrupted keyboard save as retryable. Aborted completions cannot update the reloaded interface.

## Request boundaries

`lib/community-client.ts` calls fixed same-origin paths with same-origin credentials, no caching and no redirects. Requests accept caller cancellation and have bounded timeouts. Responses are byte-limited, validated and projected into account types. Saved-build pages contain at most 25 unique, descending summaries with a canonical cursor matching the last entry. Subsequent pages must advance past the requested cursor.

Server error codes become bounded local messages. The client does not render arbitrary provider or database errors. `authentication_required` is distinct from network failure. The caller supplies operation IDs; the transport never invents a new ID when resending a save.

The request handlers in `lib/community-api.ts` remain separate from identity verification. A production adapter must establish the server-verified account before exposing these operations. The isolated fixture cookie is test-only, not an authentication implementation.

## Evidence

`npm run verify:account` creates a temporary SQLite database with the real migrations, uses the real request handlers through a localhost Vite server, and drives the actual account component in Chromium. Each run has its own temporary dependency cache and generated fixture session tokens. The fixture is not imported by production routes or the Pages entry point.

The browser journey verifies:

- A failed acknowledgement after a committed save, followed by retry, creates one snapshot and preserves a changed device draft.
- Opening a snapshot and Undo restore the respective keyboard values.
- Profile fields and original creator links survive reload; another account cannot see the saved builds.
- Session expiry preserves the device draft; same-page reauthentication restores the interface and allows an interrupted save to retry.
- Held pagination, save, profile and open responses exercise list merging, busy-state recovery and final-page focus.
- A corrected draft can escape a previously rejected save request.
- The 320px interface has no page overflow or Axe violations; phone and desktop screenshots are inspected.

Ten client tests cover response parsing, malformed cursors/pages, private request shapes, cancellation, timeout and errors. Seven request-handler integration tests cover ownership, origin checks, idempotency and safe failures. The complete unit suite has 189 passing tests at this checkpoint. The account browser journey is included in GitHub CI.

## Still required before public activation

- Establish the supported Google identity/session path on Sites, configure the chosen Google project, and verify hosted sign-in and sign-out.
- Add same-origin authenticated routes and account navigation. Static Pages must navigate to the corresponding Sites account origin.
- Verify real cross-device saves and actual account switching. The fixture supplies identities and cannot prove provider or dispatcher security.
- Preserve uncertain save operation IDs and appropriate draft/history state through a full top-level sign-in redirect. Current retry state survives only while the account component remains mounted.
- Implement account favorites, deliberate profile publication, creator publishing/drop controls and client proposal management/submission. Their internal storage is not a completed user workflow.

Do not enable a fake Google button, expose fixture identity controls, or describe the account experience as live until these activation requirements are met.

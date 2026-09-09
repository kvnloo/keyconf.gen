# Code quality audit, September 6, 2026

The user requested a comprehensive review of complexity, quality checks and feature completion. This audit covers application code, import boundaries, persistence, rendering/audio lifecycle, release scripts, dependencies and the existing launch-video tooling. It does not establish 100% test coverage or absence of every defect.

## Changes

- Removed 13 unused UI starter dependencies, the unused `cn` utility and its obsolete component-generator configuration. Moved Three.js type definitions to development dependencies. Runtime dependencies fell from 21 to 7. The lockfile fell from 711 to 370 package entries, including platform-specific entries; npm removed 342 installed packages during cleanup. A subsequent clean installation succeeded.
- Shared the existing audio-demo reset callback with route-change cleanup. Preserved cancellation revisions, scheduled voice cancellation and key reset behavior.
- Derived the study tool's supported layouts and palettes from the builder's existing lists. Removed a duplicate layout check and added malformed-input cases to the existing boundary test.
- Constructed the monitor's four projected corners as an explicit tuple instead of asserting an arbitrary array had four entries. The screen transform and projection values are unchanged.
- Fixed an import request-size bug. The handler previously read the entire body before checking its JavaScript string length. It now stops and cancels the stream after 12,288 bytes, rejects oversized declared lengths without reading, preserves split UTF-8 characters and returns HTTP 413 with CORS headers. Three regression cases failed before the fix; all four pass afterward.
- Enabled TypeScript's unused-local and unused-parameter checks, made lint warnings fail the lint gate and added a formatting check to CI. Formatted eight video scripts. Their normalized esbuild output is identical before and after formatting, and the encoded video was revalidated.

## Review decisions

The application import graph has 36 modules, no unreachable runtime modules and no runtime cycles after removing the dead utility. The graph includes default imports, mixed default/type imports, dynamic imports and the server route. Initial scanner output incorrectly treated two mixed imports as type-only; inspection corrected the scanner before accepting its report.

Reviewed state ownership and cleanup in the builder, control decks, import dialog, audio engine, scene wrapper, room renderer and typing bridge. Kept cancellation, source provenance and persistence checks that protect actual behavior. The large studio component combines controls with their state; splitting it into many forwarding components would move code without removing decisions. Larger scene files contain geometry and lifecycle work, not interchangeable service layers. No wholesale rewrite was justified by this pass.

A broader optional lint scan produced 730 diagnostics before changes. Most were inapplicable framework/style suggestions: 595 required a legacy React import despite the automatic JSX transform; 78 requested parallel work inside deliberately sequential browser journeys or cursor pagination. Reviewed callback name shadowing, positional keys in fixed geometry/waveforms, immutable object copies, CSS side-effect imports, optional React effect cleanups and trusted typing/video embeds. These were not treated as runtime failures. The unchecked tuple assertion was corrected. Existing correctness rules were not weakened to obtain a pass.

## Verification

- Clean dependency installation, strict types including unused checks, zero-warning lint, formatting and actionlint pass.
- The initial audit passed all 66 Node tests, including real SQLite transaction/resume checks and the four new streamed-request cases. The actual local import route also returned HTTP 413 with CORS headers for oversized UTF-8 input.
- Both the server build and the actual `/keyconf.gen/nightly/` Pages build pass.
- Portable builds, file restore, import selection/pricing, paginated import retry, featured-build isolation/navigation, control-deck undo/save/share and five-width/200% zoom accessibility journeys pass.
- The production preview-storage check and the real rendered typing journey pass, including recorded audio, key animation, mute, mobile settings, retry and Back.
- The production room test passes actual pixel movement, frozen pause, offscreen suspension, live reduced-motion changes, texture loads and a 390px WebGL-failure typing fallback.
- Root and video dependency audits report zero known advisories in the inspected registry snapshot. This is not a penetration test or a permanent guarantee.
- The existing MP4 revalidates at 1920×1080, 30 fps, 1,080 frames and 36 seconds, with complete decoding and zero near-black intervals. Its original audio measurements remain -19.08 LUFS and -1.19 dBTP. No new video was generated.

GitHub run [34041169225](https://github.com/kvnloo/keyconf.gen/actions/runs/34041169225) passed every check and deployed commit `9a7e3a5a0d2aefd119d6ca10edc2f00ffec4818e` to nightly. Public release metadata and a fresh 390×844 browser journey confirmed that exact commit at 15:12:53 UTC. Room rendering, horizontal bounds, projected Monkeytype, settings, Back and root query/hash preservation passed with no runtime errors or failed same-origin HTTP asset responses. These checks used software graphics, not a physical phone.

Main passed the first portion of a combined public journey. That run then timed out waiting for dev's monitor projection; its cause remains unconfirmed. A fresh dev-only run passed at 15:07:24 UTC with no runtime errors or failed asset responses. The later nightly-only run also passed. The original timeout remains inconclusive evidence rather than being erased by the retries. Main remains `70c8afa`, dev remains `74619e8`.

The existing Hyperframes composition check passed 11 sampled times with zero runtime/layout issues and 8/8 text contrast checks. One timeline organization warning remains for four sequential elements in act-one. The configured automatic motion pass does not establish cinematographic quality. The encoded MP4 validation above is separate from this composition check.

Build notices about the large lazy Three.js chunk and Vinext's API classification remain upstream/tooling observations. Physical-phone performance across devices, standardized listening tests and production ingestion hardening remain separate acceptance work.

## Feature status

| Area | Implemented and verified | Remaining |
| --- | --- | --- |
| Desk and builder | Featured previews, explicit Customize/Resume, workshop, materials/colors, exploded view, breeze/steam, notebook/pencils, reduced motion and fallback | Manufacturer-exact models/material scans and wider physical-device performance measurements |
| Typing and sound | Real self-hosted Monkeytype in the monitor, seven recorded packs, reference search, 0–200% volume, mute/retry and key response | More licensed recordings and measured complete-build acoustics; arbitrary combinations are not exact |
| Product imports | Supported Shopify/structured-data preview, variant identity/pricing, local collection pagination and request bounds | Nightly now uses its separately deployed backend with pagination and bounded request/response handling. Production queues/rate controls and an egress policy against DNS rebinding remain open |
| Catalog | 45 builder parts, six assemblies, explicit compatibility evidence, 128 browsable store observations and a resumable SQLite collector | The observation collector is local. Review workflow, hosted ingestion and expanded verified coverage are incomplete |
| Persistence and release | Autosave/recovery, undo/redo, portable links/files, isolated preview saves and three public Pages channels | Deliberate promotion from nightly to dev/main; no automatic feature promotion |
| Launch video | Verified 36-second revision with original cinematic scene and real UI/typing footage | Updating footage for later room/features is a new revision; subjective S+ quality is not established by technical checks |

The main/dev/nightly split is complete. The broader product goal remains active; universal store import, every keyboard and exact sound simulation are not finished features.

## Latest checkpoint

The suite now contains 75 passing tests. Strict types, zero-warning lint and formatting pass again. The production dependency audit reports zero known advisories in this snapshot. Selected-switch reference search is committed at `d8642be`, but its GitHub run `34045112167` failed the production phone typing width assertion and skipped deployment. The last confirmed public nightly source is `c5e35e3`. Do not equate pushed source with a published release.

The phone verifier waited for iframe readiness but, unlike the desktop path, did not wait for the 3D monitor projection. A controlled delayed-renderer experiment confirmed independent readiness: iframe content appeared while the renderer was loading, then the projected monitor measured 321.54px. That experiment did not reproduce the original sub-300px measurement. The verifier now waits for both renderer readiness and projection before measuring, retains the 300px requirement, and includes the actual width in a failure. This is a verification correction; the original CI failure remains inconclusive until subsequent evidence.

The earlier application graph count describes the initial audit, before the observation modules were added. No claim of current exhaustive graph coverage or 100% test coverage follows from it. Hosted ingestion/review, wider licensed audio coverage, calibrated geometry/acoustics, physical-device performance and deliberate stable promotion remain unfinished.

After the readiness correction, the complete production typing journey passes locally with headed software graphics, including desktop recording/mute, the 390px monitor/settings flow, and failed-frame recovery. The server build, actionlint, formatting and full dependency audit also pass. Public release metadata still reports `c5e35e3`; publication of this correction is a separate CI checkpoint.

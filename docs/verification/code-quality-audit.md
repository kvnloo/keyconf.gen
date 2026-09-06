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
- All 66 Node tests pass, including real SQLite transaction/resume checks and the four new streamed-request cases. The actual local import route also returned HTTP 413 with CORS headers for oversized UTF-8 input.
- Both the server build and the actual `/keyconf.gen/nightly/` Pages build pass.
- Portable builds, file restore, import selection/pricing, paginated import retry, featured-build isolation/navigation, control-deck undo/save/share and five-width/200% zoom accessibility journeys pass.
- The production preview-storage check and the real rendered typing journey pass, including recorded audio, key animation, mute, mobile settings, retry and Back.
- The production room test passes actual pixel movement, frozen pause, offscreen suspension, live reduced-motion changes, texture loads and a 390px WebGL-failure typing fallback.
- Root and video dependency audits report zero known advisories in the inspected registry snapshot. This is not a penetration test or a permanent guarantee.
- The existing MP4 revalidates at 1920×1080, 30 fps, 1,080 frames and 36 seconds, with complete decoding and zero near-black intervals. Its original audio measurements remain -19.08 LUFS and -1.19 dBTP. No new video was generated.

Final public-preview and new GitHub CI results are recorded below after execution. Build notices about the large lazy Three.js chunk and Vinext's API classification remain upstream/tooling observations, not evidence of an inaccessible interface. Physical-phone performance across devices, standardized listening tests and production ingestion hardening remain separate acceptance work.

## Feature status

| Area | Implemented and verified | Remaining |
| --- | --- | --- |
| Desk and builder | Featured previews, explicit Customize/Resume, workshop, materials/colors, exploded view, breeze/steam, notebook/pencils, reduced motion and fallback | Manufacturer-exact models/material scans and wider physical-device performance measurements |
| Typing and sound | Real self-hosted Monkeytype in the monitor, seven recorded packs, reference search, 0–200% volume, mute/retry and key response | More licensed recordings and measured complete-build acoustics; arbitrary combinations are not exact |
| Product imports | Supported Shopify/structured-data preview, variant identity/pricing, local collection pagination and request bounds | Publish a separately selected backend release; Pages still calls stable Sites. Production queues/rate controls and an egress policy against DNS rebinding remain open |
| Catalog | Curated parts, explicit compatibility evidence, research records and a resumable SQLite collector | The observation collector is local. Review workflow, hosted ingestion and expanded verified coverage are incomplete |
| Persistence and release | Autosave/recovery, undo/redo, portable links/files, isolated preview saves and three public Pages channels | Deliberate promotion from nightly to dev/main; no automatic feature promotion |
| Launch video | Verified 36-second revision with original cinematic scene and real UI/typing footage | Updating footage for later room/features is a new revision; subjective S+ quality is not established by technical checks |

The main/dev/nightly split is complete. The broader product goal remains active; universal store import, every keyboard and exact sound simulation are not finished features.

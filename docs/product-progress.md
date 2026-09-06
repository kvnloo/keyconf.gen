# Product progress

## September 5, 2026: baseline audit

The product goal is active. Baseline commit: `b3bea24`.

Source inspected: `app/page.tsx`, `app/keyboard-scene.tsx`, `app/import-dialog.tsx`, `app/sound-references.tsx`, `app/globals.css`, `lib/catalog.ts`, `lib/audio.ts`, `lib/webmcp.ts`, current tests and deployment workflow. The repository has no project-specific AGENTS.md or interface design guide. Existing React, Three.js, native controls, CSS and design direction will be retained.

| Priority | Finding                                                                                 | Evidence                                                                           | Action                                                             |
| -------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| High     | Current build is lost on refresh; export cannot be restored in the UI                   | `Home` keeps all configuration in independent state; only imported parts persist   | Introduce validated portable build state, autosave, undo and share |
| High     | Tab controls declare a tablist without arrow-key navigation or a tab/panel relationship | `.config-tabs` in `app/page.tsx`                                                   | Implement complete tab semantics                                   |
| High     | Three.js motion ignores reduced motion                                                  | Render interpolation in `app/keyboard-scene.tsx`; CSS media query only affects CSS | Use the preference in scene transitions                            |
| Medium   | Camera switches jump and the full scene is rebuilt when layout changes                  | View assignment and effect dependency in `app/keyboard-scene.tsx`                  | Interruptible camera transition; improve model/render lifecycle    |
| Medium   | Render loop does repeated scene/material work every frame, including while idle         | Unconditional requestAnimationFrame and model traversal                            | Index animated objects/materials and render only while needed      |
| Medium   | Import errors lack field association and requests continue after closing                | `preview` and URL input in `app/import-dialog.tsx`                                 | Abort stale requests and associate actionable errors               |
| Medium   | Mobile hides the only Research entry                                                    | Header navigation hidden below 760 px                                              | Preserve access through a visible secondary action                 |
| Medium   | Notifications mount only after an update                                                | Conditional `.toast` in `app/page.tsx`                                             | Stable status region and explicit dismiss                          |
| Medium   | Small text and duplicate responsive overrides obscure intended layout                   | `app/globals.css`                                                                  | Consolidate relevant rules and improve text/control sizes          |

All six interface domains were reviewed at source level: accessibility, layout, writing, typography, colors and UI polish. Rendered contrast, visual composition, zoom/reflow, screen-reader behavior and live animation quality are **not verified** by this audit. No approval verdict is implied.

## Current work

- [x] Create the active goal and write the product completion contract.
- [x] Inspect the existing primary flow and identify source-level gaps.
- [x] Implement reliable state, undo/redo, portable sharing and import recovery.
- [x] Improve the scene and input lifecycle. Full device verification remains in the completion pass.
- [x] Expose and expand useful product evidence. Full coverage and exact kit inventory remain data work.
- [x] Refine the listening experience. Further recording coverage remains a data task.
- [ ] Complete interaction and presentation verification.
- [ ] Publish the finished release and record remaining data limits.

## Reliable workbench implementation

Implemented a versioned build document shared by configuration, history, browser autosave, file restore and portable links. The link contains only selected imported parts and does not require server accounts or a matching local library. Opening a shared link consumes its URL fragment so subsequent refreshes restore the edited local build. Audio enablement remains a user action.

Added undo/redo with grouped color, volume and text gestures and a 60-edit history bound. Invalid imported parts cannot claim manufacturer compatibility or inject unsafe source URLs. Invalid saved builds retain a recovery copy before autosave can replace them; storage failure is visible. Added a share dialog, filename-independent JSON restore, accessible settings tabs, a stable notification region, mobile research access and cancellable import requests.

Verified: 16 tests pass, including full portable round trips with selected imports, Unicode, malformed settings, unsafe links, forged compatibility evidence, wrong-category components, undo branching and grouped edits. Type checking and the Sites production build pass. Local route responds HTTP 200. Browser interaction, rendering quality, and storage-denial behavior remain unverified. The optional lint command also exposes existing React-compiler/accessibility issues and several new warnings; these are tracked for the completion pass and are not represented as passing.

## Scene and first runtime checks

The scene now keeps one renderer across layout changes and caches the three loaded models. Animated keys, component layers and materials are indexed once. Camera and key transitions use elapsed time, respond to reduced-motion changes, and stop requesting frames after settling. Hidden and offscreen rendering pauses. Async model loads ignore stale selections and dispose their resources on teardown. Added model retry, graphics-reset recovery, keyboard camera controls and a full-workbench Focus view with Escape exit.

Changed the lighting to preserve more material color and adapted field of view to the viewport aspect ratio. A narrow-screen inspection found cropped keys; the revised framing shows the entire model at the 320 px viewport. Page Tab navigation is no longer intercepted by the simulated keyboard. The 3D engine loads as a separate chunk.

Live checks in the existing in-app browser:

- Selected 65%, Porcelain and Brass. Undo restored Aluminum; redo restored Brass. A reload restored 65%, Porcelain and Brass.
- ArrowRight moved the settings selection from Design to Components.
- Share produced a self-contained build link; Escape dismissed the dialog. Portable decoding on another browser origin is not yet verified. The attempted 127.0.0.1 preview is not forwarded by this environment.
- Tab from the canvas reached the sound toggle instead of getting trapped.
- Entered Focus on a narrow viewport; its Back to builder control was visible and Escape exited.
- Inspected the default large viewport, 1280 × 900 and 320 × 780. At the narrow viewport, document scroll width matched client width, and the keyboard fit after the camera adjustment. Other widths, 200% zoom and reduced-motion rendering remain pending.
- Read the actual renderer frame counter twice while idle; it stayed at 38. This verifies idle stopping in the observed state, not a general FPS or hardware-performance claim.
- The runtime check exposed a pre-existing development asset-path failure. `index.html` hardcoded the GitHub Pages base path even for localhost, producing model and sample 404s. It now uses Vite's BASE_URL placeholder. The model loaded and sound became available after the fix.

Remaining acceptance work: catalog and technology presentation, more deliberate sound interaction, complete responsive/accessibility review, remaining lint issues, source-format compatibility for legacy exports, complete published sharing tests, and a final deployment audit. The goal remains active.

## Playback level correction

The user reported quiet keyboard playback. The recorded path applied a fixed 0.22 gain before the volume slider, leaving the default 45% setting at 9.9% of source amplitude. Removed that extra gain node. Recordings now pass directly through the user's master level, raising output by 13.15 dB at every nonzero slider setting. Existing saved volume settings still apply. Sample bytes, pitch, timing and spectral balance are unchanged.

Decoded all 78 MP3 files to inspect their levels, then measured actual browser playback of press/release sequences across all seven presets at 45% volume. Observed peaks ranged from approximately -19.5 to -12.1 dBFS with no clipping in those sequences. The 16 existing tests, type checking, Sites build and Pages build pass. This addresses playback attenuation; headphone listening quality and acoustic fidelity remain part of the wider listening work.

## Component discovery and evidence

Expanded the builder from 11 to 39 part references, with five named starting assemblies across 60%, 65% and 75%. Added a searchable component picker, technology filters, selected-part tiles, manufacturer links, recovery from empty searches, and a visible conflict shortcut. Choosing an assembly updates its layout, material and component selection in one undoable edit. Retired NK65 Entry records are labeled; bundled board components are not presented as independently purchasable offers.

Compatibility now uses explicit assembly triples and documented electrical relationships, including Keychron's specific Double-Rail support and Jade/KS-20 exclusions. The Redux Durock exclusion no longer accidentally applies to every screw-in stabilizer. Mixed or unverified core parts and unverified magnetic combinations remain unknown. Keycap width/row coverage remains an explicit separate check.

Added an inline switch/feel/gaming guide and exposed the existing 20 product observations through a searchable research browser. Manufacturer provenance and the scope of popularity rankings are visible. See [Catalog evidence](catalog.md) for sources and limitations.

Verified 21 tests, including all assembly records, mechanical/magnetic conflicts, magnetic-family exclusions, mixed/unknown evidence, stabilizer exceptions, share round trips and whole-assembly undo. Type checking passes. In the live browser, selected Q1 HE, searched for Magnetic Jade, observed the conflict, and used Undo to restore Nebula. Verified empty-search recovery, NK65 selection, HHKB research search and mobile dialog close. Inspected the desktop, 390 px and 320 px layouts; scroll width matched document width at both narrow sizes. Found and fixed notification shrink-to-fit and a dialog close button that scrolled out of reach. Corrected Surprise me's palette identity comparison and replaced the deprecated Three.js shadow-map constant.

The new catalog files have no lint findings. Existing lint issues elsewhere and the broader listening, import and complete-interface acceptance checks remain pending. The full product goal remains active.

## Listening controls and recovery

Added letter-key and spacebar audition buttons, a peak envelope calculated from the actual decoded press recording, duration and format details, and family filters for the original-video library. Waveform height is normalized for visual inspection only; playback is not normalized or processed. Recorded audio still preserves the original MP3 bytes and passes through the user's master level without pitch, EQ or reverb changes. Capture-build and microphone details remain unknown.

The finite 16 ms master ramp reaches exact zero when muted. Changing presets, stopping playback and opening an original-video reference cancel scheduled native sources and visual timers. Enabling native sound closes the original player. Async actions are invalidated when the selected source changes. Typing a letter immediately after enabling audio now works even while that button retains focus; its Space/Enter activation and navigation keys remain native controls.

Fixed the existing lint findings by making loading and save status follow their underlying state, keeping ref updates out of render, and using native control semantics. Older exported builds can now be restored through the validated current build model; exported compatibility claims and audio enablement are not trusted. Import previews retain observation dates and availability. Long imported names now survive the same boundary used for saved builds.

Verification:

- All 24 unit tests, type checking and full-repository lint pass. Added waveform/transient/format tests and legacy-export migration checks. The original sample hashes and licenses still pass.
- Measured actual browser playback across all seven packs at 45%: observed sequence peaks were approximately -19.5 to -12.1 dBFS; mute reached zero. This is not a claim about arbitrary simultaneous key combinations or subjective headphone fidelity.
- A fresh Chromium context restored a shared build containing an imported case, consumed its share fragment, retained subsequent edits after refresh and restored the actual downloaded file. Failed recording requests recovered on retry; preset changes and mute cancelled actual scheduled AudioBufferSourceNodes. Storage denial left a usable builder and visible export fallback. `npm run verify:browser` reproduces these checks and is included in CI. It deliberately disables WebGL; 3D appearance and performance are reviewed separately.
- In the live 3D browser, a letter key responded directly after enabling audio; Space on the focused button muted it. The actual waveform and single-key controls were visible. Opening an Oil King reference loaded its original YouTube player and muted native audio; enabling native sound removed the iframe.
- A live NovelKeys NK65 product URL returned six variants with availability and observation date; uncertain currency omitted the price. Added variants were searchable in the library, then undone. A rejected localhost URL recovered through pasted Product JSON-LD with SKU, USD price and stock status. The pasted fixture was previewed without adding it.

Updated React/RSC to 19.2.8, Vinext to beta.9, Vite to 8.2.2 and their compatible Cloudflare/RSC tooling after the release audit identified affected older versions. Installation now reports zero known npm vulnerabilities. Type checking, lint, all 24 tests, the fresh-browser checks, and both Sites and Pages production builds pass on the updated dependencies. Public deployment and CI status are verified after pushing this unit.

Still pending for the full product goal: the remaining viewport/zoom and reduced-motion review, graphics failure/recovery and rapid-change checks, the complete interaction/presentation acceptance matrix, and the final release audit. Catalog growth and measurement-backed acoustic modelling remain explicit ongoing data work.

## Checkpoint before the new visual direction

The user requested a commit and push before starting the supplied desk-scene redesign. This checkpoint preserves the current implementation; it is not a completed visual or release certification.

- Replaced all seven native selects with styled, anchored Base UI menus. The implementation agent verified selection, typeahead, Escape, focus restoration, touch, viewport collision handling, and menus inside the import dialog. Existing browser recovery tests pass with the new controls.
- Added interface checks for keyboard focus, dialog behavior, five widths from 320 to 1920 pixels, real 200% browser zoom, and automated accessibility checks. The implementation agent ran this suite successfully before the typing integration.
- Fixed vertical touch scrolling over the 3D preview, focus/contrast issues, and per-key-group legend contrast. Regenerated the three original Blender models and moved to neutral tone mapping with neutral lights. This remains illustrative geometry and material treatment.
- Added a Monkeytype guest iframe above the existing keyboard, using a pinned build of the actual GPLv3 frontend. Source, static inputs, license, integration patch, and regeneration instructions accompany the assets. The integration preserves the upstream typing/results engine and disables remote account services, analytics, ads, and service workers. Key events connect to the existing scene and sound engine. A complete typing test reached results in the local widget.
- Added browser verification for typing, audio, keyboard response, restart, mobile layout and retry. The complete new suite is still pending a successful run. A compact-widget layout regression was found and corrected; the latest correction requires re-verification.

The blind verifier wrote and froze its expectations before inspecting the candidate, without access to implementation. Its baseline confirmed native popup styling and missing typing mode. It did not reproduce the reported centered popup. Candidate runs encountered general rendering/interaction stalls in software-rendered Chromium, preventing a reliable independent pass. These stalls remain unresolved; build or unit-test success must not be treated as UX completion. The frozen evidence is retained in the working environment at `/tmp/keyconf-blind-ux/`.

Next: finish renderer/typing verification, add a visible volume dial with gain above unity for quiet recordings, then implement the user-supplied landing/workshop/Sound/Play/Discover design with desk objects and plants while preserving all existing functionality. The redesign and volume dial have not started in this checkpoint. The product goal remains active.

## Reference audit and control decks

Read the two generated UI references against the actual build, catalog, audio and persistence code. [The component audit](ui-reference-audit.md) retains the desk atmosphere and task-based navigation while rejecting invented prices, compatibility, account state, acoustic controls and component variants. The landing must preview a featured build without replacing the working build; Customize makes that choice explicit. The desk landing, plants and conventional keyboard workshop redesign are still pending.

Read Linear backlog card PER-786 and downloaded its attached Grok Bot video into the local reference library. It is a silent, 16-second concept demonstration. The companion OpenAI product is Codex Micro. [Reference notes](control-deck-references.md) record the source links, observations, video hash and distinction between a hypothetical device and a documented product.

Added separate original Blender models and studio views for both devices. They have their own saved state, portable links/files, appearance controls, visual lighting, dial rotation, key feedback and exploded layers. Visiting a deck preserves the conventional keyboard. These studies have no keyboard part compatibility claims, live agent connection or verified hardware sound. Detailed manufacturer geometry remains unknown.

The independent reviewer froze source-based expectations before seeing implementation. Headed Chromium checks covered both silhouettes, local key/touch feedback, color changes, save/reload, fresh-context sharing, file restore, focus navigation and 390 px layout. The reviewer found hidden-keyboard undo, missing mobile source links, and clipped/obscured Grok framing. Corrected shortcut ownership, retained source access in the narrow inspector and revised the camera. Supplemental rechecks confirmed deck undo/redo preserves the conventional keyboard. Visual captures were inspected separately from state tests. Headless software rendering remains unreliable locally and is not represented as a visual pass.

Also fixed the Monkeytype result-transition race exposed by the previous GitHub Actions run: test completion cancels pending word-layout frames before removing the completed test's words. A controlled delayed-frame run reproduced the old failure and passed after the fix, including repeated finish/restart cycles. Rebuilt the guest frontend and its corresponding GPL source archive, and verified the patch against the pinned upstream checkout. The full typing journey remains a CI release gate.

Type checking, repository lint, 29 unit/data/model tests and both production builds pass. The independent `verify:decks` browser regression passes and is now included in CI. It checks deck undo and both redo shortcuts, preservation of the conventional keyboard, fresh-context shared state and mobile source links with WebGL disabled. Headed rendering, canvas input and visual framing were verified separately. Public release status is recorded after deployment. The product goal remains active, including the requested volume dial and larger visual redesign.

## Published control-deck checkpoint

Published commit `29d40feb01797a9a16d1626c6b374b3fc11c8f35` to the existing public Sites URL and GitHub Pages. [GitHub Actions run 33994942445](https://github.com/kvnloo/keyconf.gen/actions/runs/33994942445) passed types, lint, 29 tests, portable/import/audio recovery, five-width/200% zoom accessibility, deck isolation and the complete real Monkeytype typing journey. The two models were inspected on the public Sites page. This closes the prior checkpoint's deployment and full typing-test uncertainty; local headless software graphics remain distinct from those successful runtime checks.

## Desk landing, four destinations and volume dial — candidate

Implemented the corrected reference mapping: six independently previewable featured builds, explicit Customize and Resume, a shared conventional build across Build/Sound/Play/Discover, a parts inspector, the actual Monkeytype widget above the keyboard, and waveform/audition controls below the Sound Lab object. Existing imports, compatibility, source references, files, sharing and undo remain accessible. Current-build history shortcuts are inactive while browsing the landing and Discover.

The live desk uses original Three.js plants, ceramic pots and mug, books, notebook, pen, desk mat and textured wood under shared lighting. The workshop removes those objects for focused inspection. Gallery thumbnails are rendered from the actual Blender models and preset colors. The retired NK65 kit and illustrative geometry/palette scope are disclosed. No account avatar, fabricated price, acoustic room model or inert comparison control was copied from the generated images.

Added a native range input styled as a rotary volume control. Vertical drag and keyboard actions set 0–200% gain; the shared Sound slider and portable build parser use the same range. Master gain retains its finite ramp, recordings retain their source bytes and original spectrum, and loading/restoring does not enable sound. Above-unity gain can clip with sufficiently loud or overlapping sources; this change does not establish a universal output peak limit.

The independent reviewer froze expectations before seeing the candidate (acceptance SHA-256 `ac5a32dc8d6822c5af86da9bec841dd7b94e3d0f168489b69bf877f42a65efb0`). Its review and measured gain checks are underway. Types, lint, 32 unit/data/model tests and both production builds pass. Browser tests are being adapted to enter the explicit workshop route; an audio observation failure is still being investigated. This candidate has not been published, and the product goal remains active.

### Corrected candidate verification

The independent first pass found three regressions: hidden mobile page navigation, missing navigation/build utilities in Play, and a native range value of 46 while the default readout said 45%. Removed the obsolete navigation-hiding CSS and allowed every integer percentage in the range input. Added route/inspector scroll reset and kept transient notifications from intercepting controls. Targeted independent rechecks passed all three corrections, all four destination links at 320/390, desktop Play utilities, and mobile Customize/notification interaction. The review's frozen expectations are preserved in [desk-volume acceptance](verification/desk-volume-acceptance.md).

Measured a branch from the actual WebAudio output using MediaRecorder. A sample at 100% had peak 0.225644; at 200%, 0.480223; at 0%, approximately 2e-34. These are directional gain checks, not calibrated loudness ratios: Opus encoding, sample variation and capture intervals differ. At a retained 120% level, mute produced no audio packets; no numerical muted RMS is claimed. Both single-key audition buttons produced sound. A provisional silence finding from a JavaScript analyser was withdrawn because main-thread delays caused it to miss short transients. Audio-thread recording superseded that measurement.

The first-party audio regression now observes source starts across the whole sequence and performs mute/cancellation within the page while scheduled voices are active, avoiding transport delays that can outlast short recordings. Preview isolation, one-step customization undo, four-route persistence, muted reload and mobile/desktop navigation are now a dedicated CI journey. Existing portable/import/audio-retry and deck-isolation suites pass. Types, lint, 32 tests and both production builds pass. Final typing/interface release checks are recorded below when complete.

The independent pass covered actual headed WebGL and narrow layouts, with a reflow equivalent rather than real browser zoom. The first-party suite performs real 200% browser zoom separately. The scene is stylized, not photoreal or a measured product scan. No second desk-light state or physical-phone/OS-audio test was performed. A local headless WebGL screenshot stalled; the same full typing journey is being retried headed and remains a release gate. No claim of exhaustive or flawless UX is made.

### Typing transition corrections

The full typing regression found an audio-startup race introduced by routing: changing to Play could invalidate pending audio startup. Start typing test now finishes that explicit startup action before navigating and ignores a stale action if the user leaves. The test deliberately delays AudioContext.resume to exercise this race. A separate plain Play navigation keeps a fresh session muted.

The independent reviewer confirmed first-key recorded output at 45% (peak 0.105956, RMS 0.003421), completed a 15-second Monkeytype test at 100% accuracy, and verified that plain Play emitted no audio in a fresh muted session. It also reproduced the regression's Back focus failure. Focus restoration now runs after the Build view commits; an independent keyboard recheck confirmed a visible focus ring on Start typing test and Enter reopening Play. Original failing and corrected observations remain in the review evidence.

The corrected five-width and actual 200% zoom accessibility suite passes. All reviewed desk/dial/navigation/focus findings are resolved within their tested cases. Final full-suite CI and publication remain release gates, not assumptions.

The complete headed typing regression now passes with deliberately delayed audio startup: rendered key response, recorded audio, mute, ten-word result, restart, preserved build/focus on return, 390px settings/entry, failed-frame retry and repeated entry. GitHub's first desk run exposed a test observing Sound's selected state before the hash navigation had rendered. Tab and destination assertions now wait for the expected public selected/current state; they still fail if navigation does not complete. No arbitrary sleep or assertion removal was used.

### Published desk and volume checkpoint

Published commit `052506917ca4ecaefba57695bfc99cc278b180a4` to the public Sites URL as version 8 and to GitHub Pages. [Actions run 33999093432](https://github.com/kvnloo/keyconf.gen/actions/runs/33999093432) passed types, lint, 32 tests, the browser/interface/featured/deck/real-typing regressions, and deployment. Sites deployment `appgdep_6a9ca980090c8191be82cdcdb793aba7` succeeded on September 5, 2026 at 23:47 UTC. The subsequent public-site film capture loaded the keyboard and completed an active Monkeytype word-mode sequence without a page error. This closes the prior candidate's CI and publication gates.

### Hyperframes launch film

Created the 36-second launch film in [videos/keyconf-launch](../videos/keyconf-launch/README.md). It combines original Blender shots of the app model, real preset and inspector captures, the recorded Ink Black audition, and active Monkeytype footage from the public site. Hyperframes and its official production skills are installed locally. The portable project includes local assets, licensed sample attribution, a 24-bit audio master, and scripts to edit and render it again.

The final MP4 contains all 1,080 frames at 1920×1080/30 fps with 36-second stereo audio. Its measured loudness is −17.9 LUFS with −4.5 dBTP; no limiter or compressor was used. Frame, runtime, layout, contrast, final decoding, and visual checks are recorded in the film's verification documentation. The launch film is complete. The broader product goal remains active, including catalog depth, ingestion coverage, and the limits of unmeasured keyboard acoustics.

### Repository-based launch film revision

Replaced the first cut with three continuous Three.js acts after studying Hyperframes' shipped launch sources, its documented 3D adapter and motion recipes, and Ordinary Folk's Spline, Webflow and Gemini production accounts. [The research and decision record](../videos/keyconf-launch/docs/references/launch-craft.md) explains the source-quality failures, camera/geometry changes, real-interface crops and visual review corrections. This supersedes the film description and audio measurements above.

The revised 36-second MP4 contains 1,080 frames at 1920×1080/30 fps, 48 kHz stereo AAC, explicit Rec.709 color metadata, measured −19.08 LUFS and −1.19 dBTP. Final decoding and frame checks found no black intervals. Commit `9e0a1e5cc816beaab17ff4e2464469e8fd0c6c4b` is public; [Actions run 34005821024](https://github.com/kvnloo/keyconf.gen/actions/runs/34005821024) passed and deployed Pages. The film remains an original representative study, not manufacturer CAD or measured build acoustics.

### Import price and variant accuracy

Fixed aggregate offers being presented as exact prices, mixed-currency/stock ambiguity, lost ProductGroup identities and first-variant-only Shopify catalog results. The preview and saved part details now distinguish exact, starting, range and unverified prices. Variant names, SKUs and purchase links stay distinct; compatibility remains unknown. The API retains exact-only legacy price fields for already-open browser tabs.

[Import verification](verification/import-fidelity.md) records five failing-before cases, six passing import tests, the 38-test full suite, passing type/lint checks and both production builds, and a passing 320 px import-to-download/share journey into a fresh desktop browser. The adjacent sharing/audio/recovery browser suite also passes. Live local-server requests returned both KBDfans plate options and 80 Divinikey options; oversized KBDfans/NovelKeys homepages failed explicitly. The CI workflow now runs the import journey. Publication outcomes follow the release checks.

The broader goal remains active. Next ingestion work is collection-specific previews and pagination, followed by durable source observations and further catalog evidence. The current generic preview is not universal ingestion.

### Published import checkpoint

Published `b40e245cd17fb21ed0928c2106fcf555e37a544a` to Sites version 9 and GitHub Pages. [Actions run 34007099673](https://github.com/kvnloo/keyconf.gen/actions/runs/34007099673) passed all checks and deployed Pages. Sites deployment `appgdep_6a9cd44951a08191863a288f9bfe2be6` succeeded September 6, 2026 at 02:47:54 UTC. The complete import/mobile/download/share regression passed against the public Sites URL, and the production API returned 80 distinct Divinikey options with exact prices, variant links and explicit coverage. This closes the prior paragraph's publication gate.

The source push took several minutes after its upload finished, then succeeded. A subsequent idempotent push confirmed it was current. No source rollback, force push or alternate Site was needed. The shipped runtime is the validated commit above; this progress note is a documentation follow-up.

## Solarpunk room and monitor typing

Expanded the live Three.js desk with an open architectural field notebook, original mechanical/botanical sketch texture, two detailed mechanical pencils, an etched brass ruler, a task lamp, a headphone stand, books, window joinery and an original conservatory view. Leaves move with slow independent stem and leaf motion; coffee steam rises through a noise shader. The room uses ambient occlusion, softened shadows and warm wood/brass materials. These accessories are original visual studies. The garden beyond the physical window is an image texture, not navigable geometry.

Monkeytype now runs in the physical monitor. Its real same-origin iframe remains React-owned and is projected onto the monitor's four corners. The phone view changes monitor proportions and camera framing. Results remain scrollable and keyboard reachable. A dark display palette matches the room. Back to builder, source attribution, input/audio messages, mute, gain, results, restart and failed-load retry remain available. Typing locks the camera to keep the monitor usable; Back to builder restores orbit and assembly controls. WebGL failure leaves a normal readable typing viewport.

Ambient motion has an explicit pause control, respects reduced motion, and stops offscreen or when the tab is hidden. Idle ambience is scheduled at up to 30 fps; key and camera interactions can wake immediately. Studio views still settle to an idle renderer. The scene disposes textures, render targets, materials and pending animation work on teardown. Steam is excluded from the ambient-occlusion pass so it cannot cast rectangular shadows.

Verified locally: 40 unit/data/model checks, types, lint; headed Chromium typing journey with actual recorded sound and rendered key response, results/restart, mobile settings, retry, repeated entry and return focus. Room checks compare actual rendered pixels before/after motion, prove a paused image stays unchanged, prove offscreen rendering stops, and exercise live reduced-motion changes. Both generated textures load successfully with no shader/runtime errors. The typing test also works with WebGL disabled at 390px. The room journey is now a GitHub Actions release check. Production build and remaining shared-workbench checks are recorded with publication below.

Original generated assets and exact prompts are documented in `docs/assets/room-assets.md`. The broader product goal remains active. Collection-aware import pagination work is parked in `work/import-pagination.test.mjs.pending` while this requested room update ships; catalog coverage and compatibility evidence remain separate product work.

Release checks passed: types, lint, 40 unit/data/model tests, server and Pages builds, shared-build/import/audio recovery, all primary panels and dialogs at 320/390/768/1280/1920px and real 200% browser zoom, featured-build isolation and deck regressions. The final typing rerun uses Monkeytype's responsive settings menu at readable native sizing and verifies that returning restores the prior exploded builder view. Visual review included the landing room, desktop/phone monitor and WebGL-failure fallback. Publication status follows after the deployment completes.

## Software rendering and release-check follow-up

Sites version 10 published the solarpunk room at `8ccad2b8d406c69fc7c1f1a3eb49d26ab0253a20`. Public monitor typing and recorded audio passed. A public console check also caught an unlinked favicon; the existing SVG icon is now declared in server metadata.

The initial GitHub release check stopped during screenshot capture. Software rendering receives smaller environment-light and shadow maps, a capped pixel ratio, and a direct render path without ambient occlusion. In software-rendered typing mode, the fixed room is cached; keypresses redraw the keyboard over that background. Room assets and resizing invalidate the cache. Ambient room motion stays available outside typing, while GPU rendering retains the complete effects pipeline and live typing-room motion. The graphics release checks now run the built Pages artifact in a full Chromium session under Xvfb, following [Playwright's Linux CI guidance](https://playwright.dev/docs/ci#running-headed). Development-server watching excludes generated builds, evidence and video work so exporting artifacts cannot reload a typing session.

The typing fixture selects a word-count run and uses modifier keys for the rendering/audio captures before starting the scored test. Screenshot capture can stall software graphics long enough to activate Monkeytype's slow-timer protection; it must not run during the measured typing interval. The engine's protection remains enabled, and the real ten-word run must finish with 100% accuracy. Keyboard-image assertions crop below the monitor, so typed letters inside the iframe cannot produce a false pass. Leaf-motion assertions compare two frames after the control label has already changed. Cold graphics/iframe startup has its own bounded readiness allowance; ordinary interaction timeouts remain separate. The same audio, results, return-focus, motion-pause and failure-recovery assertions remain in place.

## Local continuation and branch previews

The user canceled the cloud continuation and requested local overnight work. Created `nightly` for new overnight development and `dev` for integration; the initial stable baseline includes the previously requested room release. Added independent `/main/`, `/dev/` and `/nightly/` Pages builds. Publishing preserves the other channels in a generated `gh-pages` branch, serializes deployments and records each tested source commit. The previous root URL redirects to main while retaining portable-build fragments. Environment rules now permit all three source branches. Subsequent overnight features stay on nightly and are not automatically promoted to stable or the Sites backend.

The final software-rendered room check passes: actual pixels move, pause freezes them, offscreen frames stop, reduced motion disables ambience, and Monkeytype remains readable with WebGL disabled at 390px. The earlier resumed-frame capture stopped inside Playwright's element-stability wait. Instrumentation observed unchanged canvas/host bounds across eight samples; a viewport screenshot clipped to those measured bounds completes while retaining the actual pixel assertions. The committed check now uses that capture method and separately asserts unchanged bounds. No arbitrary timeout increase or graphics-workaround hypothesis was added. Software snap/damping changes from the handoff checkpoint are now exercised by this passing pause/resume check.

Validation for deployment setup: 41 tests, type checking, lint, the server production build, and actionlint pass. The new filesystem-level deployment regression proves channel preservation, removal of obsolete assets only within the changed channel, rejection of a wrong base path, and refusal of stale/repeated releases. Public publication and CI results are recorded after they actually finish. The full product goal remains unfinished.

Preview isolation regression: the first live `/nightly/` test inherited a seeded main build and failed at the expected assertion. Added scoped keys for preview keyboard/deck autosaves, legacy part reads and recovery copies; main's existing keys remain intact. The browser check edits both device types, reloads them, exercises a malformed preview-save recovery, and verifies the stable build, stable deck and stable recovery document are unchanged. The new check runs against built dev/nightly artifacts in CI. Initial deployment also waits for a valid main tree before changing the public root.

Publication checkpoint: Sites version 11 deployed `70c8afafd4a6ecdb174d03f33d95c3a0ab406b61` successfully at 07:11:33 UTC on September 6. A fresh 390px public browser verified the efficient room, no horizontal overflow, projected Monkeytype, settings and Back with no page errors. The built `/nightly/` typing journey passed actual key pixels, recorded audio, mute, ten-word results, retry, mobile settings and return. The new preview-storage regression also passes after correcting its corruption fixture to run before app startup rather than being overwritten by the app's valid pagehide save.

All three source branches are public. Main points to `70c8afa`; the initial dev/nightly baseline `74619e8` adds isolated preview saves. At this checkpoint GitHub runs main `34018381869`, nightly `34018874902`, and dev `34018875765` are queued for an `ubuntu-latest` runner. They have not executed or passed checks yet, and the three Pages paths are not claimed live. Continue by inspecting the actual runs, fixing any reported failures, then verifying each URL and its `release.json`. The existing Sites link is already updated.

## Nightly collection pagination

Implemented collection-scoped Shopify queries, explicit continuation through both product and variant pages, and a Load more flow that preserves selected rows through retry. New options start unselected; overlapping rows are removed; original observation dates survive later page loads and export. Missing collections, partial API failures and repeated cursors no longer become misleading complete previews. The source URL stays bound to its continuation even if the URL input is edited while browsing existing results.

The four failing-before cases, six passing pagination/API tests, 47-test complete suite, type/lint/actionlint checks, both production builds, and 320px import/retry/export plus adjacent import/share/audio recovery checks are documented in [Import pagination verification](verification/import-pagination.md). Live Divinikey pages returned 12 and 11 distinct options with no overlap. This checkpoint stays on nightly; stable Sites, main and dev are unchanged. The public Pages previews still use the stable importer, so pagination activation awaits an isolated backend release. GitHub preview builds remain queued for runners at this checkpoint, with no executed check failure on these branch baselines.

## Nightly landing composition and preset clarity

Refined the landing camera so the keyboard stays clear of the headline actions and featured cards. Removed duplicate lettering on the idle monitor. Two independent image reviewers identified unclear customization entry points, small part details, an easily missed keycap-color qualification, and no obvious way to discover offscreen presets. Both entry buttons now name the selected build, decision details are larger, the color qualification sits beside Keycaps, and visible Previous/More buttons browse all six presets without changing selection.

[Landing verification](verification/landing-composition.md) records the independent review, the scroll-padding regression found and fixed during the phone journey, passing featured/build/undo/navigation checks, five-width and 200% zoom checks, the real typing and room suites, 47 tests, types/lint and both builds. Desktop/phone captures cover the efficient renderer and a fresh native preview reporting full graphics. Native checks confirm the complete keyboard and on-screen gallery controls at 390px without horizontal overflow. Browser-command timeouts during an earlier inspection were not treated as proof of a driver problem. This work remains on nightly. Main and dev have now passed their complete GitHub check jobs; their deployment jobs are waiting for runners/serialization at this checkpoint. Public preview URLs are still pending deployment verification.

Overnight release follow-up: frequent checkpoints were canceling nightly checks while GitHub kept them waiting for a runner. Nightly now lets its current check finish and coalesces newer pending checks; other branches keep cancellation of obsolete work. This preserves a path to publishing a tested checkpoint during a long queue. Actionlint passes; no release checks were removed.

The first main preview is now public at `/keyconf.gen/main/`; its fetched release metadata matches `70c8afa`, workflow number 24. Dev's complete checks passed, but GitHub canceled its waiting deployment when another branch entered the publish group. The nightly publisher now gathers the latest checked candidate for every channel and preserves each channel's source identity, recovering canceled publications without a source merge. Eight focused tests, all 62 repository tests, types/lint/actionlint and local assembly of the three actual GitHub artifacts passed. [Publication recovery evidence](verification/pages-recovery.md) distinguishes these checks from the still-pending public dev/nightly verification. Main and dev source refs remain unchanged.

## Nightly durable source observations

Added a local SQLite catalog collector with stable run IDs, source-bound cursors, atomic page/option commits, original observation timestamps, preserved pricing kinds and append-only collection behavior. Repeated commands resume toward the same total page limit. Identical page replays do not duplicate data; conflicting writers, cursor cycles and changed stored payloads fail explicitly. Unsupported pagination is labeled preview-only rather than complete. Reviewed builder parts and browser-local saves are unchanged.

[Catalog observation documentation](catalog-observations.md) records the command, schema, transaction behavior, limitations and evidence. Eight real-SQLite tests cover persistence, idempotence, conflicting writes, rollback and interrupted resume; the full 55-test suite passes on the development runtime and Node 22.13.1. Types, lint and both builds pass. A live three-page Divinikey run saved 35 distinct switch options with original timestamps and remained correctly resumable. An offline replay/export made no requests or duplicate writes. The database and evidence export remain local, outside Git and website assets; hosted ingestion and reviewed catalog expansion remain future work.

## Preview identity

Dev and nightly now identify themselves in the keyboard and control-deck headers, including narrow phone layouts. The label uses the same base-path decision as isolated saves; stable URLs retain their existing presentation. It introduces no audio or navigation action. The production preview-storage journey checks the visible label and overflow at 320, 390, 768 and 1280px while retaining its save/recovery assertions. Featured-build navigation, the complete five-width/200% zoom interface check, all 62 tests, types/lint and both builds pass. Rendered desktop and 320px keyboard/deck captures are retained as `outputs/preview-label-*.png`; they use software graphics and do not establish physical-phone performance.

Publication checkpoint: the fetched public manifest now includes main `70c8afa` and nightly `dddbf8f`. Dev still awaits the publication repair's GitHub execution. The header label is a later local checkpoint and is not claimed live yet.

## Daytime code quality audit

The user requested continued local work and a comprehensive complexity/quality review. The expired overnight automation is paused. All three preview publications have completed; the latest checked public manifest contains main `70c8afa`, dev `74619e8` and nightly `3d0b5fd`. Run `34025776737` passed every check and its aggregate deployment recovered dev. The preceding `c1b238e` check was interrupted by a runner shutdown during room verification; the subsequent complete run passed.

[The code quality audit](verification/code-quality-audit.md) records the review scope, accepted simplifications, warning triage and feature status. Removed 13 unused dependencies, a dead utility and unused generator configuration; runtime dependencies fell from 21 to 7. Consolidated audio reset behavior and study-tool options, removed an unchecked monitor tuple assertion, and made formatting/unused-variable checks enforceable. Eight video scripts were formatted with identical normalized JavaScript; the existing MP4 revalidated successfully.

The boundary audit found and fixed an unbounded request-body read and character-based size check. Three cases failed before the fix; all four streaming/UTF-8 tests pass afterward. The actual local importer rejects oversized input with HTTP 413. A clean install, 66 tests, strict types, zero-warning lint, formatting, actionlint, both builds, all app browser journeys, production preview storage, actual typing/audio and room-motion/fallback checks pass. New CI/publication results are recorded after they finish. Backend fixes remain on nightly source until a separate backend release is selected; the public Pages clients still call stable Sites.

Final audit checkpoint: GitHub run `34041169225` passed checks and deployment for `9a7e3a5`. A fresh public nightly phone-size journey confirmed that exact release at 15:12:53 UTC, including room rendering, projected Monkeytype, settings and Back, with no runtime errors or failed asset responses. Main and dev source versions remain unchanged. An earlier combined public run passed main then timed out on dev monitor projection; the cause is unconfirmed, and a fresh dev-only run passed. The audit retains both results. The existing Hyperframes composition also passed its 11 sampled frames and all eight text contrast checks, with one timeline organization warning. This documentation checkpoint does not alter the deployed application.

## Import response cleanup

The next backend review found response streams left open when a store returned an HTTP error, redirected, or declared an oversized page. The importer now cancels these bodies before rejecting or following a redirect. Four tests using real Web Streams failed before the change and pass afterward, including cancellation before the destination request and zero body reads for rejected responses. The full suite passes 70 tests; type checking and the server build pass. This is resource cleanup, not a DNS-rebinding defense or a production rate limit. It remains nightly backend source pending deployment; public import behavior is unchanged.

## Separate nightly backend published

Sites version 1 at https://keyconf-nightly.kvnloo.chatgpt.site deployed source `b473f150d4484c108c2ce488cbe7e6e0ec14f309` successfully at 15:37:25 UTC on September 6. Deployment `appgdep_6a9d887ebe6481918c24311cf59e7210` is succeeded. The initial source upload took about fourteen minutes; it completed without being restarted. [Nightly backend ownership](nightly-backend.md) documents the separate project and branch-specific manifest.

Live HTTP verification at 15:37:37 UTC returned 12 and 11 Divinikey collection variants on successive pages with no overlap. Pages-origin preflight returned 204, allowed-origin headers were present on both responses, oversized UTF-8 requests returned 413 and an unrelated origin returned 403. These are actual hosted API responses. Collection pagination and response/request bounds are now active on the nightly backend; main and dev still use the stable backend. The connected Pages client awaits its own GitHub publication checkpoint.

The source change passes 72 tests, strict types, lint, formatting, both builds and the local 320px import/retry/export journey. The prior response-cleanup GitHub run `34041815913` completed successfully, including deployment. CI for the new routing is recorded separately after execution.

During the upload, a new local run `divinikey-switches-2026-09-06` retained 128 distinct variant URL/SKU pairs across 21 brands and twelve pages, observed from 15:34:05 to 15:34:19 UTC. More pagination remains. This was a fresh run, not a resume: the original `divinikey-switches-20260906-nightly` run and its 35 observations remain intact. SQLite integrity and foreign-key checks pass. The new evidence export is `work/divinikey-observations-expanded.json`; these observations have not been published as reviewed builder parts.

## Discover store observations

Added a separate, collapsible browser for the 128 source observations in Discover. Search covers brand, name and SKU; twelve options appear initially, with explicit expansion, empty states and reset. Cards preserve original variant links, pack names, observed prices, timestamps and historical availability. The interface explicitly identifies partial coverage, named-option pricing and unknown compatibility. These listings do not enter the builder's approved parts catalog.

The committed snapshot retains complete normalized page evidence and hashes. A regression confirms all hashes, unique variant identities and original values; all 73 tests pass. Types, lint, formatting, actionlint and both builds pass. The actual browser journey passes at 320 and 1920 pixels in development and the production Pages build, covering search, expansion, links, keyboard disclosure, empty/reset and overflow. Captures were inspected, and this journey now runs in CI. Hosted ingestion and review remain unfinished.

The preceding backend-routing release `c7c5121` passed GitHub run `34042941703` and is public on nightly Pages, confirmed by release metadata. The observation browser is a later source change; its public release is recorded only after CI and deployment complete.

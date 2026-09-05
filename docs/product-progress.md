# Product progress

## September 5, 2026: baseline audit

The product goal is active. Baseline commit: `b3bea24`.

Source inspected: `app/page.tsx`, `app/keyboard-scene.tsx`, `app/import-dialog.tsx`, `app/sound-references.tsx`, `app/globals.css`, `lib/catalog.ts`, `lib/audio.ts`, `lib/webmcp.ts`, current tests and deployment workflow. The repository has no project-specific AGENTS.md or interface design guide. Existing React, Three.js, native controls, CSS and design direction will be retained.

| Priority | Finding | Evidence | Action |
| --- | --- | --- | --- |
| High | Current build is lost on refresh; export cannot be restored in the UI | `Home` keeps all configuration in independent state; only imported parts persist | Introduce validated portable build state, autosave, undo and share |
| High | Tab controls declare a tablist without arrow-key navigation or a tab/panel relationship | `.config-tabs` in `app/page.tsx` | Implement complete tab semantics |
| High | Three.js motion ignores reduced motion | Render interpolation in `app/keyboard-scene.tsx`; CSS media query only affects CSS | Use the preference in scene transitions |
| Medium | Camera switches jump and the full scene is rebuilt when layout changes | View assignment and effect dependency in `app/keyboard-scene.tsx` | Interruptible camera transition; improve model/render lifecycle |
| Medium | Render loop does repeated scene/material work every frame, including while idle | Unconditional requestAnimationFrame and model traversal | Index animated objects/materials and render only while needed |
| Medium | Import errors lack field association and requests continue after closing | `preview` and URL input in `app/import-dialog.tsx` | Abort stale requests and associate actionable errors |
| Medium | Mobile hides the only Research entry | Header navigation hidden below 760 px | Preserve access through a visible secondary action |
| Medium | Notifications mount only after an update | Conditional `.toast` in `app/page.tsx` | Stable status region and explicit dismiss |
| Medium | Small text and duplicate responsive overrides obscure intended layout | `app/globals.css` | Consolidate relevant rules and improve text/control sizes |

All six interface domains were reviewed at source level: accessibility, layout, writing, typography, colors and UI polish. Rendered contrast, visual composition, zoom/reflow, screen-reader behavior and live animation quality are **not verified** by this audit. No approval verdict is implied.

## Current work

- [x] Create the active goal and write the product completion contract.
- [x] Inspect the existing primary flow and identify source-level gaps.
- [x] Implement reliable state, undo/redo, portable sharing and import recovery.
- [x] Improve the scene and input lifecycle. Full device verification remains in the completion pass.
- [x] Expose and expand useful product evidence. Full coverage and exact kit inventory remain data work.
- [ ] Refine the listening experience.
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

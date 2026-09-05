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
- [ ] Ship reliable state, undo/redo, portable sharing and import recovery.
- [ ] Improve the scene and input lifecycle.
- [ ] Expose and expand useful product evidence.
- [ ] Refine the listening experience.
- [ ] Complete interaction and presentation verification.
- [ ] Publish the finished release and record remaining data limits.

## Reliable workbench implementation

Implemented a versioned build document shared by configuration, history, browser autosave, file restore and portable links. The link contains only selected imported parts and does not require server accounts or a matching local library. Opening a shared link consumes its URL fragment so subsequent refreshes restore the edited local build. Audio enablement remains a user action.

Added undo/redo with grouped color, volume and text gestures and a 60-edit history bound. Invalid imported parts cannot claim manufacturer compatibility or inject unsafe source URLs. Invalid saved builds retain a recovery copy before autosave can replace them; storage failure is visible. Added a share dialog, filename-independent JSON restore, accessible settings tabs, a stable notification region, mobile research access and cancellable import requests.

Verified: 16 tests pass, including full portable round trips with selected imports, Unicode, malformed settings, unsafe links, forged compatibility evidence, wrong-category components, undo branching and grouped edits. Type checking and the Sites production build pass. Local route responds HTTP 200. Browser interaction, rendering quality, and storage-denial behavior remain unverified. The optional lint command also exposes existing React-compiler/accessibility issues and several new warnings; these are tracked for the completion pass and are not represented as passing.

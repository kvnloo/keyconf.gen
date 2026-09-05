# Keyconf product goal

Status: active. Created September 5, 2026. This document is the completion contract for the project, not a list of features already shipped.

## Product promise

Make choosing a keyboard feel like having a beautiful workbench full of parts. A newcomer can start with a coherent build, change its look, understand what fits, hear useful recordings, and send a friend the result. An enthusiast can inspect the evidence behind each component, import products, and make deliberate choices about mounting, switch technology, sound, and gaming behavior.

The keyboard is the main event. It should be satisfying to rotate, take apart, recolor, and type on. Controls stay nearby, use familiar names, and explain specialist terms where a decision needs them. Fun comes from immediate feedback and easy experimentation.

## Design direction

Use the user's September 5 desk/workshop references: a coherent dark desk scene with plants and a few small objects, featured build previews, and a transition into a focused workshop. Returning users can resume their saved build directly. Build, Sound, Play and Discover organize the existing functions. Keep readable typography, restrained controls, useful material lighting and space around the object. Avoid endless settings, surprise audio, and animation that delays input. The component-by-component decisions are in [UI reference audit](ui-reference-audit.md).

Changes respond immediately. Camera and assembly transitions are interruptible and respect reduced motion. Selection stays visible after motion ends. On a small screen the keyboard and primary controls remain useful; the page scrolls normally instead of trapping every touch in the canvas.

## What completion means

The release is complete when every release requirement below has implementation evidence and an appropriate verification result. A build or type check cannot stand in for visual or interaction verification. Record gaps as pending or inconclusive. Do not call an unmeasured experience flawless.

The original ambition includes every keyboard and exact acoustics. Coverage is an ongoing data program, not a finite list that can honestly be declared exhaustive. The product must make supported coverage useful, searchable, and expandable, while identifying missing data. Simulation cannot establish acoustic accuracy without reference measurements. No release may label an approximation as an exact recording of the selected build.

| ID | Release requirement | Acceptance evidence | Baseline / remaining work |
| --- | --- | --- | --- |
| FLOW-1 | Choose or resume a build | Landing contains an interactive featured preview, explicit Customize action and direct Resume path; previewing does not overwrite saved work | Revised by the user's desk-scene request; pending implementation |
| FLOW-2 | Experiment without losing work | Refresh restores the current build; undo and redo preserve edits; invalid saved state recovers visibly | Missing |
| FLOW-3 | Share and revisit | A self-contained link reconstructs appearance, selected parts, and audio preference on a clean device; downloads retain evidence | JSON export exists; link and restore missing |
| FLOW-4 | Intuitive interaction | Tabs, dialogs, controls, loading, empty, error, success, and disabled states have clear meaning and recovery | Partial; tab keyboard handling and import recovery need work |
| VIS-1 | Detailed 3D keyboard | Separate case, plate, PCB, keys and legends; layout, finish, color and silhouette changes remain legible from supported views | Three original Blender studies, 60/65/75%; improve scene behavior |
| VIS-2 | Deliberate materials and lighting | Metal, polymer and keycaps have coherent roughness, highlights, shadows and color management | Illustrative materials; no claim of calibrated product scans |
| VIS-3 | Responsive motion | Key down/up, assembly separation, view changes and controls react without blocking input; reduced-motion path exists | Camera jumps; 3D ignores reduced motion |
| VIS-4 | Immersive exploration | Easy view reset, useful keyboard-accessible view controls, assembly inspection and distraction-free exploration | Basic orbit, top and explode exist |
| VIS-5 | Coherent desk and workshop | Plants and small desk objects share the object's light/perspective; decorations do not block input or impede rendering; narrow layouts remain useful | Reference audited; implementation pending |
| DEVICE-1 | Grok and Codex Micro presets | Dedicated control-deck geometry, sourced identity, local control feedback and device-appropriate save/share/restore; no false keyboard-parts compatibility or agent connection claims | [Video and product references gathered](control-deck-references.md); implementation pending |
| DATA-1 | Useful catalog | Searchable product references across representative board layouts and switch technologies, with source and observation provenance | 11 builder references; broader research data not exposed |
| DATA-2 | Evidence-based compatibility | Explicit mechanical/electrical conflicts; unknown means unknown; case/PCB/plate, stem, stabilizers, layout and kit coverage considered | Two 60% ecosystems and explicit exclusions tested |
| DATA-3 | Understand the options | Explain linear/tactile/clicky behavior separately from mechanical, Hall-effect, optical, capacitive/Topre and low-profile technologies | Research exists; decision support needs UI |
| DATA-4 | Useful gaming context | Distinguish USB polling, scan rate, measured latency, rapid trigger and wireless mode; no false equivalence between 8 kHz and end-to-end latency | Research exists; structured presentation pending |
| IMPORT-1 | Bring products from stores | Supported Shopify and structured-data URLs produce a reviewable preview with source, variants, currency, coverage and errors | Implemented; usability/retry audit pending |
| IMPORT-2 | Handle unsupported stores | Preserve the URL; explain what could be read; provide pasted structured-data fallback; never invent listings or infer fit | Partial |
| SOUND-1 | Play real recordings | Recorded down/up samples, variation and special-key mappings; no unannounced synthesized fallback | Seven presets, 78 files verified |
| SOUND-2 | Broad listening coverage | Search original switch tests, identify creator/build limits, open original player, clear empty states | 266 original video references |
| SOUND-3 | Controlled listening | Explicit audio enable, master level, stop, source selection, no overlapping embedded/native playback, reliable demo timing | Implemented; interaction audit pending |
| SOUND-4 | Audiophile integrity | Preserve source bytes, disclose recording format and build match; avoid arbitrary pitch/EQ/reverb on recordings; report actual limitations | Mono MP3 sources; higher-quality sources remain a data task |
| QUALITY-1 | Accessible interaction | Keyboard paths, visible focus, meaningful names, proper tab/dialog behavior, persistent status and recovery | Source audit pending fixes |
| QUALITY-2 | Responsive interface | Core flow usable at 320, 390, 768, 1280 and 1920 CSS px and 200% zoom, with no hidden primary controls | Runtime verification pending |
| QUALITY-3 | Efficient rendering | Renderer sleeps when settled/offscreen/hidden; capped pixel ratio; geometry/material disposal; recoverable WebGL/model failure | Constant rendering and layout reinitialization need work |
| QUALITY-4 | Evidence for polish | Inspect complete design/parts/sound/import/share flow, narrow widths, reduced motion, failed loading and rapid changes; record actual observations | Not yet verified |
| SHIP-1 | Reproducible public release | Passing types/tests/builds, committed source, successful GitHub CI and public deployment from that source | Established; verify each milestone |

## Work sequence

1. **Reliable workbench.** One validated build model; local autosave; undo/redo; portable sharing; safe import/export boundaries; clear status. Finish with round-trip and malformed-state checks.
2. **Tactile interaction.** Improve camera and assembly transitions, rendering lifecycle, input behavior, material treatment and exploration controls. Honor reduced motion and device constraints.
3. **Product clarity.** Make components discoverable, expose the useful existing research, connect technologies to decisions, and distinguish the visual model from product fit. Expand supported catalog evidence without inventing compatibility.
4. **Listening experience.** Refine recorded playback, search/filtering, source details and demo controls. Keep existing-recording acquisition as the strategy. Add further native packs only with explicit source evidence and appropriate reuse terms.
5. **Complete-interface pass.** Tighten typography, spacing, contrast, focus, loading and recovery. Review desktop and narrow layouts and every primary interaction. Resolve observed failures.
6. **Release.** Verify the full acceptance matrix, update documentation with actual coverage, commit/push, check CI and publish. Leave the source and ingestion process maintainable.

Each unit ends in working code and appropriate checks. Keep GitHub updated as work proceeds. Continue the active goal after interruptions using this file and the progress record; do not restart completed work.

## Data and acoustic expansion

Use dedicated ingestion adapters feeding normalized products, variants, observations, compatibility claims, layouts and media. Keep a stable source ID and retrieval timestamp. Retail SKU counts, firmware definitions, recordings and unique keyboards are different counts. The existing SQLite research database is a useful ingestion artifact; choose hosted SQL only when a deployed data workflow needs durable server records. Browser preferences and self-contained build links do not require user accounts.

Prioritize manufacturer documentation, existing licensed sample packs, original sound-test embeds and documented community data. Creator recording equipment, microphone position, room, desk, processing, switches, caps, plate, foam and mounting all affect sound. Missing capture details remain unknown. A future measured impulse-response/modal model may help approximate combinations, but cannot be sold as exact sound for unmeasured products.

Do not require the user to own keyboards or make recordings. Do not treat universal website ingestion, unverified sales rankings, accurate acoustic simulation or manufacturer CAD coverage as solved by a generic importer or an attractive render.

## Progress

See [Product progress](product-progress.md) for implementation, decisions, verification and remaining work.

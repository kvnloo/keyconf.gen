# Keyconf product goal

Status: active. Created September 5, 2026. This document is the completion contract for the project, not a list of features already shipped.

## Community and creator direction

Updated September 6, 2026 at the user's request. This direction supersedes the previous build-first work sequence. Preserve the existing keyboard studio, evidence, sound and accessibility work as the foundation; prioritize the community and creator workflows below. Do not continue unrelated catalog/search expansion ahead of this pivot.

## Product promise

Keyconf is a place to discover people through their keyboards, save inspiring builds and collaborate on a keyboard before it is made. A creator can prepare a build, send a client an immersive preview, gather feedback on a specific revision and share an audience-facing drop. A visitor can experience that build, favorite it or customize a personal copy without overwriting the creator's original or their own saved work.

The studio remains the core experience. Community features should make it easier to find, understand and share builds. They should not turn the site into a crowded feed or administrative dashboard. Treat creator workflow research as evidence for priorities; distinguish public facts from inferred pain points and validate assumptions through later user feedback. Do not imply that researched creators endorse or use Keyconf.

Keyconf is a discovery and configuration portal, not a seller of keyboard products. Every catalog part, accessory, artisan variant, imported listing and part shown in a shared build must retain a direct link to its original maker or source listing. Make those links easy to find in product details and build summaries. Creator drops link to the creator's original purchase or enquiry page. Do not introduce platform checkout, cart, inventory reservations or payment collection for these products. Merchandise is a separate possible future direction, not current scope.

## Community release requirements

| ID | Requirement | Acceptance evidence | Status |
| --- | --- | --- | --- |
| COMMUNITY-1 | Accounts and profiles | Platform-backed sign-in; persistent profile with chosen handle, display name and creator links; private account data excluded from public responses; server-side ownership checks | Pending |
| COMMUNITY-2 | Saved and favorite builds | Account-backed private drafts and favorites survive devices; favorites reference real published builds; no publication caused by saving | Pending |
| COMMUNITY-3 | Creator build pages | Creator attribution, immutable published revision, source-backed parts and honest sound/geometry scope; recipient can experience it without changing existing local work | Pending |
| COMMUNITY-4 | Client proposals | Creator sends an unlisted preconfigured preview; client can leave feedback tied to the viewed revision and create a separate customization; distinguish a proposal from an accepted commission | Pending |
| COMMUNITY-5 | Drops and collections | Creator can deliberately publish a curated build/drop with availability language and an external purchase/enquiry link; drafts remain private; no invented stock, checkout or affiliation | Pending |
| COMMUNITY-6 | Minimal discovery | One prominent search/command entry and a few primary destinations; contextual actions expose favorite, share and customize; no fake AI answers or empty dashboard modules | Pending |
| COMMUNITY-7 | Voice companion, later | Separate optional assistant can accept typed/voice input, explain suggested changes and execute only supported actions; microphone permission and listening state explicit; Synergy code and current provider capabilities verified before reuse | Research first |
| COMMUNITY-8 | Optional music | Off by default; independent music volume/mute; keyboard recordings and sound-reference videos take priority and mute music, with gentle restoration only if the user still wants music; visibility, loading/error and autoplay rules tested | Pending |
| COMMUNITY-9 | Durable collaboration and privacy | D1-backed ownership and publication boundaries; private client notes/drafts absent from public search; revoked/invalid links recover clearly; untrusted links/content validated | Pending |

## Configurator completeness, in parallel

The September 6 reference reconciliation and accessory request are part of the community direction. Creator proposals must represent the actual parts a client is choosing. Keep this work moving alongside account and collaboration foundations.

| ID | Requirement | Acceptance evidence | Status |
| --- | --- | --- | --- |
| PART-1 | Visible switch assembly | Separate switch housings and stems appear beneath keys in the exploded view; no invisible placeholder layer; inspect desktop and mobile renders | Implemented; rendered and GLB tests pass |
| PART-2 | Focused switch page | Interactive switch view, sourced specifications, recording scope, return navigation and explicit add-to-build; generic geometry labeled honestly | Implemented; navigation, source links, accessibility and recovery pass |
| PART-3 | Dials and encoders | Distinguish a replacement knob from an encoder; placement, shaft/mount, PCB and firmware requirements affect compatibility; selected parts survive save/share/undo | Pending |
| PART-4 | Screens and extra controls | Distinguish integrated modules from external displays, buttons and macropads; mounting, connectors, power and firmware support are sourced or unknown; no arbitrary snap-on fit | Pending |
| PART-5 | Artisan keycaps | Support individual key placement, quantity, key width, stem, profile/clearance and sourced maker/variant identity, including Jelly Key; preserve normal keyset selection | In progress; picker and illustrative preview implemented; exact variants and physical fit remain |
| PART-6 | Extensible product coverage | New categories retain source, variants, fit evidence and media provenance; unsupported geometry and fit remain explicit; imports require review before application | Pending |

Expose these choices contextually in the build's parts/mods flow. A separate control-deck preset does not satisfy configurable keyboard accessories. A catalog entry does not satisfy an implemented visual part. Do not claim all keyboard products are supported until their selection, persistence and experience paths work.

## First delivery sequence

1. Research representative creators' actual public commission, content and drop workflows. Record sources, uncertainties and inferred opportunities.
2. Build the account/profile and private saved-build foundation using Sites authentication and D1. Keep static Pages account actions pointed at the same-origin Sites flow.
3. Deliver one complete creator-to-client journey: save a revision, share an unlisted preview, experience it, customize a separate copy and submit revision-specific feedback.
4. Add favorites and opt-in public creator profiles/build collections. Add drops through existing purchase/enquiry destinations before considering commerce infrastructure.
5. Add optional background music with verified keyboard-audio priority. Research music generation/licensing; do not publish unlicensed tracks or silently start playback.
6. Introduce the separate conversational/voice companion only after its actions and provider connection are real and tested.

## Design direction

Use the user's September 5 desk/workshop references: a coherent dark desk scene with plants and a few small objects, featured build previews, and a transition into a focused workshop. Returning users can resume their saved build directly. Build, Sound, Play and Discover organize the existing functions. Keep readable typography, restrained controls, useful material lighting and space around the object. Avoid endless settings, surprise audio, and animation that delays input. The component-by-component decisions are in [UI reference audit](ui-reference-audit.md).

Changes respond immediately. Camera and assembly transitions are interruptible and respect reduced motion. Selection stays visible after motion ends. On a small screen the keyboard and primary controls remain useful; the page scrolls normally instead of trapping every touch in the canvas.

## What completion means

The release is complete when every release requirement below has implementation evidence and an appropriate verification result. A build or type check cannot stand in for visual or interaction verification. Record gaps as pending or inconclusive. Do not call an unmeasured experience flawless.

The original ambition includes every keyboard and exact acoustics. Coverage is an ongoing data program, not a finite list that can honestly be declared exhaustive. The product must make supported coverage useful, searchable, and expandable, while identifying missing data. Simulation cannot establish acoustic accuracy without reference measurements. No release may label an approximation as an exact recording of the selected build.

| ID        | Release requirement               | Acceptance evidence                                                                                                                                                                        | Baseline / remaining work                                                                                                |
| --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| FLOW-1    | Choose or resume a build          | Landing contains an interactive featured preview, explicit Customize action and direct Resume path; previewing does not overwrite saved work                                               | Implemented; independent preview/customize/undo/resume and mobile transition checks pass                                 |
| FLOW-2    | Experiment without losing work    | Refresh restores the current build; undo and redo preserve edits; invalid saved state recovers visibly                                                                                     | Published desk navigation, refresh and undo regressions pass, including build isolation                                  |
| FLOW-3    | Share and revisit                 | A self-contained link reconstructs appearance, selected parts, and audio preference on a clean device; downloads retain evidence                                                           | Portable links, file restore and selected imports verified; consumed links now open #studio                              |
| FLOW-4    | Intuitive interaction             | Tabs, dialogs, controls, loading, empty, error, success, and disabled states have clear meaning and recovery                                                                               | Anchored menus, dialogs and four-page navigation published; mobile/focus corrections verified                            |
| VIS-1     | Detailed 3D keyboard              | Separate case, plate, PCB, keys and legends; layout, finish, color and silhouette changes remain legible from supported views                                                              | Three original keyboard models plus two distinct control decks; illustrative dimensions                                  |
| VIS-2     | Deliberate materials and lighting | Metal, polymer and keycaps have coherent roughness, highlights, shadows and color management                                                                                               | Per-material colors, roughness, lighting and legible key groups; no calibrated product scans                             |
| VIS-3     | Responsive motion                 | Key down/up, assembly separation, view changes and controls react without blocking input; reduced-motion path exists                                                                       | Elapsed-time transitions, reduced motion and idle rendering implemented; desk interaction checks pass                    |
| VIS-4     | Immersive exploration             | Easy view reset, useful keyboard-accessible view controls, assembly inspection and distraction-free exploration                                                                            | Orbit, top/reset, explode, focus and keyboard camera input implemented                                                   |
| VIS-5     | Coherent desk and workshop        | Plants and small desk objects share the object's light/perspective; decorations do not block input or impede rendering; narrow layouts remain useful                                       | Original procedural desk and props implemented; headed visual and narrow-layout checks pass, stylized geometry disclosed |
| DEVICE-1  | Grok and Codex Micro presets      | Dedicated control-deck geometry, sourced identity, local control feedback and device-appropriate save/share/restore; no false keyboard-parts compatibility or agent connection claims      | Both studies published and verified with isolated save/share/undo, source links and original Blender geometry            |
| DATA-1    | Useful catalog                    | Searchable product references across representative board layouts and switch technologies, with source and observation provenance                                                          | 45 builder parts, six assemblies, 20 research references and 128 separate store observations; sources and scope disclosed                      |
| DATA-2    | Evidence-based compatibility      | Explicit mechanical/electrical conflicts; unknown means unknown; case/PCB/plate, stem, stabilizers, layout and kit coverage considered                                                     | Assembly triples, electrical families, explicit stabilizer exceptions and unknown fits tested                            |
| DATA-3    | Understand the options            | Explain linear/tactile/clicky behavior separately from mechanical, Hall-effect, optical, capacitive/Topre and low-profile technologies                                                     | Technology/feel decision guide implemented and exposed through Discover                                                  |
| DATA-4    | Useful gaming context             | Distinguish USB polling, scan rate, measured latency, rapid trigger and wireless mode; no false equivalence between 8 kHz and end-to-end latency                                           | Guide distinguishes polling, latency and rapid trigger; no unsupported performance equivalence                           |
| IMPORT-1  | Bring products from stores        | Supported Shopify and structured-data URLs produce a reviewable preview with source, variants, currency, coverage and errors                                                               | Variant identities and honest price ranges corrected; six import tests and mobile/share journey pass                     |
| IMPORT-2  | Handle unsupported stores         | Preserve the URL; explain what could be read; provide pasted structured-data fallback; never invent listings or infer fit                                                                  | Rejected targets recover visibly; pasted JSON-LD preview and explicit add verified                                       |
| SOUND-1   | Play real recordings              | Recorded down/up samples, variation and special-key mappings; no unannounced synthesized fallback                                                                                          | Seven attributed presets, 78 original files; hashes and key mappings verified                                            |
| SOUND-2   | Broad listening coverage          | Search original switch tests, identify creator/build limits, open original player, clear empty states                                                                                      | 266 searchable original switch-test videos; source/recording scope visible                                               |
| SOUND-3   | Controlled listening              | Explicit audio enable, master level, stop, source selection, no overlapping embedded/native playback, reliable demo timing                                                                 | 0–200% dial, pointer/keyboard operation, measured gain, mute and persistence verified                                    |
| SOUND-4   | Audiophile integrity              | Preserve source bytes, disclose recording format and build match; avoid arbitrary pitch/EQ/reverb on recordings; report actual limitations                                                 | Original mono MP3 bytes and dynamics retained; format and unknown capture details disclosed                              |
| QUALITY-1 | Accessible interaction            | Keyboard paths, visible focus, meaningful names, proper tab/dialog behavior, persistent status and recovery                                                                                | Dark interface contrast/focus suite and independent corrected navigation/focus cases pass                                |
| QUALITY-2 | Responsive interface              | Core flow usable at 320, 390, 768, 1280 and 1920 CSS px and 200% zoom, with no hidden primary controls                                                                                     | Published desk passes five-width checks and real 200% browser zoom; import flow also checked at 320 px                   |
| QUALITY-3 | Efficient rendering               | Studio renderer sleeps when settled; room ambience pauses on request, reduced motion, offscreen or hidden; capped pixel ratio; geometry/material disposal; recoverable WebGL/model failure | Room breeze/steam pause and pixel checks pass; monitor typing and WebGL failure recovery verified                        |
| QUALITY-4 | Evidence for polish               | Inspect complete design/parts/sound/import/share flow, narrow widths, reduced motion, failed loading and rapid changes; record actual observations                                         | Independent frozen review plus browser regression gates; no claim of flawless UX or user-study results                   |
| SHIP-1    | Reproducible public release       | Passing types/tests/builds, committed source, successful GitHub CI and public deployment from that source                                                                                  | Import accuracy published at b40e245 to Sites version 9 and Pages; full CI and public import journey pass                |

## Foundation work sequence, retained for reference

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

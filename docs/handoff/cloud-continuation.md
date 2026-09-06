# Keyconf cloud continuation — September 6, 2026

## Preserve the goal and execution settings

The user explicitly asked to continue this project in the cloud using **GPT-6 Astra, Ultra reasoning**, and to transfer the **exact existing goal and context**. `goal.json` contains the objective copied verbatim from the active goal tool, with no token budget. Establish that same active goal in the destination when goal tools are available. Do not replace it with “finish the room” or call it complete when this checkpoint ships.

The desktop cloud-creation tool does not expose model/thinking arguments. The requested model and effort are requirements, not proof of the actual runtime settings. Verify them from task configuration; do not claim that a prompt can change the model. Report an inability to select or verify the required settings.

Read `../product-goal.md` and `../product-progress.md` next. They contain the complete acceptance matrix and the accumulated implementation/verification trail. Revalidate current code, CI and deployment state. Some acceptance-table baseline cells predate the latest release and must not be mistaken for current proof.

## Repository and published state

- Public repository: https://github.com/kvnloo/keyconf.gen
- Continuation branch: `codex/keyconf-cloud-continuation`. Clone this branch and inspect its actual HEAD; the handoff commit includes this document.
- GitHub `main` at handoff: `a1671ef94c60fa1cf3f3fb791d8c2cd03c6505fa` (software graphics follow-up). That source was also pushed successfully to the Sites source repository. It has **not** been published to Sites.
- Public app: https://keyconf-studio.kvnloo.chatgpt.site/
- Sites project ID: `appgprj_6a9c361eee048191a07f7c833254ded8`, also in `.openai/hosting.json`. Reuse this site. Access was verified public.
- Sites live version 10 is `8ccad2b8d406c69fc7c1f1a3eb49d26ab0253a20`, “Create a living solarpunk desk and monitor typing experience.” Version ID: `appgprj_6a9c361eee048191a07f7c833254ded8~appgver_6f2c30ee45388191a1739dd0acfd90f7`; successful deployment ID: `appgdep_6a9ce25f773081918786a33facebca70`.
- GitHub Pages: https://kvnloo.github.io/keyconf.gen/ . It was still on the prior import release because subsequent CI did not deploy. Inspect before relying on this historical statement.
- Latest inspected CI: https://github.com/kvnloo/keyconf.gen/actions/runs/34012313014 . All non-graphics journeys and the production typing journey passed. The runner then received a shutdown signal during `verify:room` (exit 143). This is **not** a passing room check and not an assertion failure proving a particular cause. Relevant log excerpt is adjacent.

## User intent and standing preferences

The original goal is a deeply researched, highly polished keyboard configurator: real configurations and explicit fit, useful imports, accurate-looking materials and animation, enjoyable audio, intuitive UI, sharing and persistence. The user wants S+ quality, not merely successful compilation. They have HD800S headphones and care about recorded-audio integrity and usable volume. They cannot record every keyboard; source recordings and reference coverage are the acquisition strategy.

They explicitly authorized public source, regular commits/pushes and publishing to the existing website. Continue authorized reversible implementation without repetitive permission requests. Preserve existing functionality. Do not send messages to other people without authorization. Do not claim exhaustive keyboard coverage, exact acoustic simulation, measured latency from polling rate, or flawless UX without evidence.

Original visual reference: https://x.com/blueemi99/status/2096217626334650719 . The user identified Three.js. They later supplied generated desk/workshop references and requested a skeptical component-by-component UX audit before mapping existing behavior onto them; see `../ui-reference-audit.md`. Another Linear reference concerned a hypothetical Grok control deck and a ChatGPT/Codex counterpart; see `../control-deck-references.md`.

Latest design request, verbatim: “can you make the leaves animate very slightly and add a slight breeze, add some natural looking smoke. add some high quality mechanical pencils + architecture notebook open w/ scribbles should feel kinda leo da vinci. add more items in the room and just make it feel like a real setup - on typing mode we can have monkey type just play inside a monitor. be creative and just use high temperature thinking - make it feel futuristicy and solar punky”.

## Implemented room and typing experience

`lib/desk-scene.ts` now builds a warm wood/felt workbench, four plants with independent stem/crown/leaf motion, noise-shader coffee steam, a curved open architectural notebook with original sketches, two detailed mechanical pencils, an etched brass ruler, a task lamp, headphones/stand, a physical monitor, books, window joinery/louvers and a garden beyond the window. Generated texture prompts/provenance are in `../assets/`; both textures are committed under `public/textures/`. These accessories are original visual studies, not calibrated manufacturer models. The exterior garden is an image texture.

`lib/keyboard-scene.ts` owns the renderer, keyboard models, room and lifecycle. The full path uses environment lighting, VSM shadows, GTAO and output color handling. Steam is excluded only from the ambient-occlusion pass so it does not make rectangular occlusion shadows. A room-pause control, reduced motion, offscreen suspension and hidden-tab suspension prevent unnecessary ambient work; disposal covers render targets, textures, geometry, materials and timers.

Typing uses the real, same-origin bundled Monkeytype in a React-owned iframe projected onto the monitor corners through `lib/monitor-projection.ts`. The camera locks while typing. Mobile uses a taller physical monitor and different framing. The page and iframe remain scrollable. Back to builder restores the previous exploded state, saved build and focus. Results, test settings, retry, source attribution, recorded key audio, mute and gain are retained. WebGL failure retains a normal readable typing viewport. It is not a fake screenshot of Monkeytype.

## Current performance work and unresolved verification

The `a1671ef` follow-up detects known software renderer names. On that path only, it uses a 0.75 pixel ratio, 32px environment map, 512px PCF shadow map and no postprocessing. In typing mode it caches the fixed desk in a half-float render target and redraws the keyboard over it. Texture completion and resizing invalidate that cache. Software typing freezes ambient room motion; full GPU typing retains live ambience. Keep those limitations honest.

The handoff branch also includes a small **unverified candidate fix** beyond `a1671ef`: software rendering snaps position/color transitions and disables OrbitControls damping. It was intended to address a room test that did not reach `renderState=idle` within 45 seconds after Pause. This is not established as the root cause. Inspect actual camera/target/controls state and pending wake sources if it recurs; do not simply keep increasing timeouts or remove the pause assertion. The native and software reruns were interrupted by a local environment restart. Their handles and `/tmp` logs are gone. No terminal result exists for those runs. Run one graphics browser at a time and collect concrete diagnostics before making further changes.

Important test fixes already committed:

- Screenshots must not run during Monkeytype's scored interval: software capture can stall the engine and trigger its legitimate slow-timer protection. Visual/audio checks now hold a **modifier** before the actual ten-word test begins. The actual ten-word test must still produce 100% accuracy. The protection remains enabled.
- Keyboard pixel comparisons crop below the monitor, excluding iframe letters that could create a false pass.
- Room-motion comparisons capture two frames after the button label has changed, so changing a label alone cannot pass.
- Graphics CI runs the built Pages artifact under full Chromium/Xvfb. Non-graphics journeys still run on the dev server. Vite ignores generated `dist`, `pages-dist`, `outputs`, `work` and video changes so artifact generation cannot reload a typing session.
- Metadata now links the existing favicon SVG; the prior public smoke test caught a favicon.ico 404.

Evidence: `typing-verification.json`, `room-verification.json`, and the adjacent screenshots are preserved snapshots with original timestamps. The room evidence predates the latest software path. The production typing JSON and CI excerpt verify the `a1671ef` path. Do not treat these files as fresh execution results for the candidate patch.

## Immediate continuation sequence

1. Verify the required GPT-6 Astra / Ultra execution settings and restore the exact goal. Clone the continuation branch; read the goal, progress record and this handoff.
2. Complete the room pause/resume, offscreen, reduced-motion and fallback checks on the current candidate. Inspect real frames. Keep the full GPU design and meaningful assertions. Verify typing responsiveness without screenshots during the scored run. Diagnose any failure from actual state, not conjecture.
3. Run required types, lint, 40-test baseline and affected browser checks; build both server and Pages artifacts. Push the validated changes, get passing CI, and publish the exact tested source to the existing Sites project. Rebuild archives: the local `/tmp` archive and credentials were lost/expired after a restart and were never saved as a new Sites version.
4. Verify the public app after publication and update the acceptance/progress records with exact source, version and CI evidence.
5. Continue the full product goal. The next parked implementation is collection-aware Shopify preview/pagination, followed by durable source observations and further catalog/compatibility evidence. Audit the full acceptance matrix before declaring completion; passing this room release is only one checkpoint.

## Catalog, imports, audio and adjacent work

The supported importer already handles Shopify and JSON-LD, exact/range/starting/unverified prices, variant identities, explicit coverage, manual structured-data fallback, mobile preview/add, share and file round trips. Universal ingestion is not solved. A candidate pagination test is preserved as `import-pagination.test.mjs.pending`; it is deliberately outside the test glob. Its import path assumes eventual placement in `tests/`. It sketches collection scoping, outstanding-variant pagination before catalog advancement, deduplication, missing-collection behavior and source-bound continuation validation. It is **not implemented or validated**; improve the contract rather than blindly mirroring the draft.

Read `../research.md`, `../catalog.md`, `../audio-research.md`, their plans, and `../verification/import-fidelity.md`. Existing recordings preserve attributed original bytes and disclose capture/build limitations. The documented baseline is seven native presets, 78 source files and 266 original switch-test reference videos; inspect current manifests before making claims. Do not invent acoustics by arbitrary pitch/EQ/reverb, scrape and rehost creator media without evidence of reuse permission, or require the user to own all keyboards.

Hyperframes launch work is under `videos/keyconf-launch/` with its own `AGENTS.md`. The film v2 work was separate and parked while this room request shipped. The continuation snapshot also preserves the user's editor-added `data-hf-id` attributes in `act-two.html` and `act-three.html`; these do not constitute new video-quality work. Read the local Hyperframes guidance if video work resumes. The user criticized weak source renders and unexciting cinematography and explicitly asked for deeper study of the Hyperframes repository, examples and case studies.

## Commands and cloud portability

The project is Vite/vinext, React, TypeScript and Three.js. CI uses Node 22. Run `npm ci`, then scripts in `package.json`. `npm run dev` serves port 3000. `npm run build:pages` followed by `npx vite preview --config vite.pages.config.ts --host 127.0.0.1 --port 4173` serves `/keyconf.gen/`. Set `KEYCONF_BASE_URL=http://127.0.0.1:4173/keyconf.gen/`, `KEYCONF_HEADED=1` and `KEYCONF_SOFTWARE=1` for full Chromium with software graphics under `xvfb-run -a`. Install Playwright Chromium and normal Linux dependencies in the cloud. Do not assume local processes or absolute desktop skill paths exist there.

Sites publishing requires its connector and hosting/building skills. Use `.openai/hosting.json`; push the exact source to the returned source repository using an ephemeral credential, then read the full HEAD SHA, package the successfully built artifact, save a version with that SHA and deploy that exact saved version. Verify deployment status. Never expose or persist credentials. If cloud access differs, identify the concrete missing capability and continue other independent goal work rather than inventing deployment success.

The desktop task must not claim the whole product goal complete or continue competing edits after a verified cloud handoff. The destination must preserve the full objective through continuations and maintain an auditable acceptance record.

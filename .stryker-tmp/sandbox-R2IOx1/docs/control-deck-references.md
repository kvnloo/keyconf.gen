# Control deck presets

Added September 5, 2026, from the user's Linear backlog reference. This extends the keyboard studio to small control decks. The Grok example is a speculative design. Codex Micro is a documented OpenAI × Work Louder product; our reconstruction is an illustrative study of that product.

## Reference video

- Backlog card: [PER-786, keyconf.gen](https://linear.app/0ism/issue/PER-786/keyconfgen). Its description is empty and it has no comments. The relevant content is its X attachment.
- Post: [Elvis, September 5, 2026](https://x.com/omarsar0/status/2096321091148947887). The author attributes the demo to GPT-6 Astra using one image reference. The retrieved post does not identify its rendering library or publish source code.
- [Original 1080p video](https://video.twimg.com/amplify_video/2096319964198400000/vid/avc1/1860x1080/EiDMUiEh-ZBeU7Gk.mp4?tag=29).
- Download inspected: 1860 × 1080, 16.133 seconds, H.264, **no audio stream**. It provides no keyboard sound reference.
- Local reference library: `/home/kvn/workspace/keyconf-reference-library/grok-bot-01/reference.mp4`. Inspection frames are beside it. Reference media remains outside the public app bundle.
- Video SHA-256: `3da2cc7b11eae39afcda576c196c9f62b6f68eb308f2902952ed994b1884bef5`.

## What is visible in the Grok demo

The object is a compact rectangular control deck, with a dark lower enclosure and a thin rounded metal top plate. Exposed corner screws, a connected cable and a shallow perimeter seam give the object scale. Eleven visible keycaps occupy a three-row, four-column area; the bottom middle keycap spans two positions. A horizontal screen and a large knurled rotary dial occupy the top strip.

Four upper keys identify bot roles using mint, periwinkle, amber and lilac symbols and thin illuminated rims. The other keys are charcoal with pale legends, except the cream double-width Delegate key. Readable commands include Focus, Routine, Approve, Pause, Voice and Next task. The small screen changes to acknowledge the selected role or dial state. These observations describe the concept's presentation, not working agent integrations.

The recording demonstrates orbit, close inspection, lighting changes and an exploded assembly. In the exploded view, keycaps, switch bodies, plate, a board layer and the lower enclosure separate along the same axis. The camera retains a useful three-quarter angle. A Studio / Daylight / After hours selector changes the **visual light**, and an Atmosphere slider appears to change its strength. Those controls have no demonstrated acoustic meaning. The page explicitly calls the device an independent concept.

## What earns a place in our preset

| Visible element                             | Purpose in Keyconf                      | Actual implementation contract                                                                                                             |
| ------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Distinct small footprint                    | Make the preset recognizable            | Use dedicated control-deck geometry and a key/control layout. Never stretch or recolor a 60/65/75% keyboard and call it the same device.   |
| Rounded metal plate, screws, seam and cable | Explain construction and scale          | Model these details with shared materials and bounded geometry. The cable is a scene detail, not a connection indicator.                   |
| Role keys with colored rims                 | Give each control a clear identity      | Editable visual accents and local press feedback. A light demonstrates a state only when the UI says it is a preview.                      |
| Cream Delegate key                          | Create a clear primary physical control | Preserve the two-position cap and press animation. It must not delegate work or grant permissions.                                         |
| Knurled dial                                | Make the device feel tangible           | Local rotation with pointer and keyboard alternatives; expose the value in the inspector. Do not claim to change a real agent's reasoning. |
| Small screen                                | Confirm a local selection               | Show the selected key, preview state or studio parameter. Do not fabricate connected bots or live task data.                               |
| Layer separation                            | Explain the visible construction        | Animate only modeled layers. Interior geometry inferred from the clip remains illustrative, not manufacturing CAD.                         |
| Lighting presets                            | Help inspect shape and materials        | Change real scene lights. Preserve a neutral inspection option and respect reduced motion.                                                 |
| Sound toggle                                | Audition a chosen reference             | Use the studio's existing audio engine with explicit recording identity. This silent video cannot supply a Grok recording.                 |

## Codex Micro companion

The primary reference is [OpenAI Supply Co., Work Louder collaboration](https://openai.com/supply/co-lab/work-louder/), checked September 5, 2026. Its published specifications list 13 mechanical switches, a touch sensor, rotary encoder and planar joystick; Bluetooth/USB-C; PC and aluminum construction; PBT/PC caps; and clicky/silent options. The [official packaging photograph](https://cdn.openai.com/supply/co-lab/work-louder/openai-pack-open-080-v1.webp) shows a pale enclosure, translucent upper caps, opaque command caps and distinct knob/joystick controls. One wider cap means visible cap count must not be equated with switch count.

This is a separate shape from the Grok concept. It needs its own key arrangement, upper translucent caps, control positions and shell. Its real product functions can be described with attribution. In Keyconf, key presses, status colors, dial and joystick remain local demonstrations unless a real integration is separately implemented. Do not label those previews connected to Codex.

## Data and navigation changes required

The current `Build` supports three keyboard layouts and requires six replaceable part categories. A control deck cannot truthfully inherit a Tofu case, keyboard PCB and stabilizer set. Add a distinct device variant before exposing these presets as saved builds. Keep product identity, illustrative geometry, appearance choices and audio provenance separate.

The new landing gallery will include conventional keyboard builds and these two control decks. Previewing a card must preserve the working build. Customizing it opens the same studio frame with controls appropriate to that device. Fixed or undocumented internals are read-only/unknown, not freely interchangeable parts. A macropad is not a complete typing keyboard; Play must explain its mapped controls while preserving the existing Monkeytype test for keyboards.

Acceptance requires both distinct silhouettes, local control feedback, orbit/explode/reset, editable appearance, correct source labels, safe save/share/restore for the device variant, no accidental agent actions, and no invented audio or compatibility claims.

## Current implementation

The two studies are now accessible from Research and at `#deck/grok-bot` and `#deck/codex-micro`. Each has its own validated `DeckBuild`, local save, portable link/file, undo/redo and appearance settings. The working keyboard remains in the parent state while a deck is open. Decks do not enter the keyboard compatibility checker or inherit its parts.

Original Blender assets are generated by `scripts/build_control_decks.py`; `scripts/render_featured.py` renders all gallery thumbnails from the GLBs and the featured-build palettes. The Grok study has 11 cap groups and 46 mesh batches. The Codex study has 12 cap groups, with two switch bodies under its wide key, and 42 mesh batches. Corners, cap profiles and interior proportions remain illustrative. The shader uses the user's chosen colors; rendered thumbnails use the same initial colors as the live presets.

The studio supports orbit, top/reset, layer separation, physical/mouse keypress feedback, scene lights and dial rotation. Keys and dial have no remote effects. Neither device has a verified sound pack in this release. The new desk landing and final gallery integration are still pending.

Data/model tests and both production builds pass. Independent headed-browser checks covered desktop and 390 px touch layouts, visible models, color edits, key feedback, view controls, local restoration, portable sharing and file restore. Findings for wrong-device undo, mobile source access and Grok framing were corrected and rechecked. `npm run verify:decks` preserves the shortcut isolation, fresh shared state and mobile source checks in CI with WebGL disabled. It focuses a normal deck control when no canvas exists; actual canvas input and appearance were checked separately with WebGL enabled. This is bounded verification, not a claim of exhaustive device fidelity or flawless UX.

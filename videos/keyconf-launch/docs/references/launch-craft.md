# Launch-film revision: research and production decisions

Reviewed 2026-09-05. Revision follows the user's rejection of v1 source quality and motion.

## Sources inspected

- [Hyperframes launch sources](https://github.com/heygen-com/hyperframes-launches), particularly `heygen-apple-motion/README.md`, `01-ui-sting/index.html`, `01-ui-sting/ledger.json`, and `sfx-music-launch/STORYBOARD.md`. The UI sting's actual rendered c01 clip was sampled at 2 fps for a 20-frame sheet. This was visual frame analysis, not a claim of having watched every public film.
- [Official launch-film documentation](https://hyperframes.heygen.com/launch-videos) identifies these as shipped projects and explains the adapter mix and beat-timed audio.
- [Product-launch motion doctrine](https://github.com/heygen-com/hyperframes/blob/main/skills/product-launch-video/references/motion-language.md), visual-design method and cut catalog. Read source recipes, including matching axis, direction and speed across cuts, restrained blur, delayed reveals, and deliberate holds.
- [Three.js adapter](https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes-animation/adapters/three.md) and `registry/blocks/vfx-iphone-device/vfx-iphone-device.html`. The actual implementation pairs model, camera and look-at poses and renders from deterministic timeline state. Product lighting uses a reflection environment instead of a flat ambient fill.
- [Ordinary Folk, Introducing Spline](https://www.ordinaryfolk.co/project/introducing-spline). Its production account describes learning the product to make its brand film. Inference for Keyconf: the editable 3D keyboard should be the storytelling mechanism.
- [Ordinary Folk, Webflow Ecommerce](https://www.ordinaryfolk.co/project/webflow-ecommerce). The studio describes combining 2D and 3D while keeping real UI and message clarity central. Inference for Keyconf: art-directed keyboard shots establish desire; real, enlarged interface crops establish proof.
- [Ordinary Folk, Gemini](https://www.ordinaryfolk.co/project/gemini). The case study makes meaningful text animation and capabilities the focus. Inference: type should respond to the demonstrated action, with fewer words.

No external film, licensed font, brand mark or music is included in Keyconf's output. The downloaded reference clip remains outside the product repository.

## V1 diagnosis

1. Six equal six-second cards flattened the rhythm. Almost all information arrived early in each shot.
2. Full-page screenshots had unreadably small interface text and a small keyboard. Scaling their wrappers simulated camera movement but revealed no new dimension.
3. The procedural app model's keycaps had over-rounded profiles; text geometry intersected the cap tops. Low-sample denoised stills and further image scaling softened the source again.
4. Background score and picture were planned separately. The sound showcase did not visibly actuate the corresponding keys.
5. Technical checks confirmed files and timing, not storytelling, material quality or convincing motion.

## Revision contract

- The keyboard remains the persistent subject through macro, full-board, color and assembly views.
- A real Three.js camera changes perspective and occlusion. Materials and geometry need to hold up before any full-film render.
- Enriched geometry is an original representative keyboard study derived from the app's layout and model. It is not manufacturer CAD or proof of exact vendor hardware.
- Keep actual app controls as captured pixels; crop around the interaction at sufficient source resolution.
- One coherent easing family. Cut while movement is in flight when continuity matters. Explicit holds serve listening and final URL reading.
- Use recorded switch events for keypress choreography. Preserve their attribution and distinguish reference sound from exact build acoustics.
- Audit first, middle and final poses, actual frame export, seek reproducibility and short moving proofs. A successful CLI exit is insufficient evidence of visual quality.

## Runtime decision

The project is already on latest Hyperframes 0.8.29, confirmed with the official read-only upgrade check. Use the documented `hf-seek` Three.js adapter and a local bundled renderer. Initial source renders at 2880 × 1620 into a 1920 × 1080 composition, providing supersampling without enlarging a low-resolution still. Source model, layout, libraries and fonts resolve locally.

## Review findings resolved

The first assembled revision exposed issues that structural checks missed: a typing crop covered the board’s top rows, component lists reduced important text below comfortable reading size, and moving from the selected Oil King to an Ink Black recording could imply a false match. The final source crops to the actual word area, shows the selected row and product card at 700px width, and explicitly labels the recording as the sound library. An independent frame reviewer flagged the remaining macro material softness; surface bump, plastic clearcoat and grazing light were adjusted and inspected again.

A stale generic frame specification also contained unrelated slide templates and false font-axis assumptions. It was replaced with the actual film’s visual rules. The six superseded scene files remain recoverable in Git history rather than cluttering Studio’s active composition list.

## Diagnostic limits

The CLI keyframe report describes the GSAP text and footage wrappers. Its canvas ghost output did not reliably show intermediate custom Three.js poses, so it is not used as evidence that the 3D camera moves correctly. Separate forward/reverse pixel comparisons and inspection of actual exported frames verify that part of the film. The CLI’s automated motion pass is disabled in this configuration.

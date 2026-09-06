# Nightly landing composition and preset navigation

September 6, 2026. This is a nightly checkpoint, not a stable promotion.

## Observations and changes

A native desktop inspection showed the idle monitor taking most of the upper scene, with the keyboard low enough to meet the featured cards. The landing perspective now brings the keyboard closer, higher and to the right of the headline actions. Other view presets retain their existing framing, including the physical typing monitor. The duplicate idle-monitor brand text was removed because it appeared behind the page headline.

Two independent reviewers received only the rendered image and a neutral task rubric, without source, implementation rationale or each other's findings. Both identified ambiguous starting buttons, small decision details, a visual palette that could be mistaken for the named retail keycaps, and an unclear cue for browsing more presets. Their follow-up images confirmed that the two customization actions now name the selected build, the palette qualification sits beside Keycaps, and there is no visible keyboard/control occlusion. The remaining small tertiary text and the amount of mobile desk space were identified as lower-priority presentation preferences.

The gallery now has visible Previous/More controls, a Selected marker, and Preview labels. Its buttons preserve the selected build while scrolling, respect reduced motion, and disable at the ends. The first browser test exposed the first card snapping three pixels past the start, incorrectly enabling Previous. Matching scroll padding to the strip's inset fixes the cause.

## Verification

- The featured-build browser journey reaches all six cards at 320px, checks both ends, returns through Previous, and verifies scrolling leaves the selected preset unchanged. Both customization buttons name Blush after its preview is chosen; customization and one-step undo preserve the previous build and volume.
- The existing interface journey passes keyboard/dialog focus, all primary panels at 320, 390, 768, 1280 and 1920px, and real 200% browser zoom.
- The built nightly typing journey passes actual rendered key response, recorded output and mute, ten-word results, restart, 390px settings, load retry, repeated entry, and return to the preserved builder.
- The built nightly room journey passes real moving/frozen pixel comparisons, offscreen pausing, live reduced-motion changes, both original textures, no shader/runtime errors, and the 390px WebGL-failure typing fallback.
- Desktop and phone reduced-motion captures show Forest Line and the phone Blush preview without horizontal overflow or page errors. The automated captures use the efficient software renderer. A fresh built preview also passed native full-graphics inspection at desktop and 390px: the complete keyboard is visible, the gallery controls stay inside the viewport, and scroll width matches client width. The browser reports the full rendering path and no captured warning/error logs. These are viewport checks on this computer, not a physical-phone performance benchmark.
- Type checking, lint, 47 unit/data/model tests and server/Pages production builds pass.

Local evidence: `outputs/landing-composition-before.png`, `outputs/landing-framing-1280.png`, `outputs/landing-framing-390.png`, `outputs/landing-framing-phone-blush.png`, `outputs/solarpunk-landing.png`, `outputs/landing-framing-native.png`, `outputs/landing-framing-native-phone.png`, `outputs/typing-verification.json`, and `/tmp/keyconf-framing-*.log`. These screenshots are local artifacts, not part of the source distribution. One typing attempt was terminated before completion; the preview server was subsequently found stopped. Restarting it and repeating the unchanged typing journey produced the passing result above.

Native inspection initially encountered browser-command timeouts; a fresh production-preview tab later became ready and supplied the final native captures. No renderer heuristic or speculative driver workaround was added.

The room remains a stylized original study. These checks establish the observed interactions and framing, not photoreal product accuracy, exhaustive accessibility, or perfect behavior on every physical device.

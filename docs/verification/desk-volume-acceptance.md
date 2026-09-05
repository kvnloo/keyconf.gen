# Frozen independent acceptance: desk workshop and volume

Frozen before seeing the candidate or implementation for this unit. No application source or other implementation tests were read. These expectations add to the existing frozen dropdown, typing and deck requirements; they do not waive prior failures or limitations.

User source material inspected:
- /tmp/codex-clipboard-87c51294-8cf5-4d8c-8c81-31248bbecd81.png
- /tmp/codex-clipboard-c6d31b94-0dec-4e43-bee9-8fc41ce245e8.png
- /home/kvn/.codex/attachments/04e0308a-6162-4ae1-a8fd-f75a105aecde/pasted-text.txt

The first image shows a large keyboard on a physical desk, warm directional light, plants/books, restrained translucent panels, four navigation destinations and featured build previews. The second is a montage of workshop, component, exploded, Sound and Play views. The written reference emphasizes a large persistent object, contextual controls, reversible experimentation and useful hierarchy. Its pictured prices, product mappings, estimated acoustic effects, comparison tools, mods and other proposed features are not evidence of implemented backend behavior. The current user's explicit four destinations and original Monkeytype requirement take precedence over proposed alternatives in that text.

## Frozen cases

D01. Four understandable destinations. Build, Sound, Play and Discover are present and reachable by pointer and keyboard. Each leads to the corresponding working area with a clear active state. Browser back/forward and a visible return path remain understandable. Navigation must not silently alter the current build. A destination cannot be an inert label or a broken placeholder.

D02. Reference-based hierarchy. At a wide desktop width, the keyboard is the main visual subject within a convincing desk/workshop scene. Navigation is restrained, the inspector is contextual and readable, and featured items are secondary to the active object. The composition should use coherent materials, lighting, depth and spacing from the references, not simply darken the prior form layout. Text/control legibility takes precedence over copying the source's faint labels. Verify by side-by-side screenshots; no pixel-perfect or exact-brand-asset requirement is inferred.

D03. Preview versus current work. Seed a distinctly named and configured keyboard. Selecting multiple featured previews can change the featured object and its descriptive information, but must not change the saved/current keyboard. Resume must explicitly return to that keyboard. Customize must explicitly enter an editable workshop for the selected preview; applying a featured configuration must require that intentional action rather than happen during browsing. The selected preview and current work must be distinguishable. Merely returning, reloading or using a featured card must not discard current work.

D04. Preserve workshop behavior. Layout/material/color and component choices remain editable and visibly affect the object. View, rotate/reset and explode/assemble remain usable. Undo/redo belong to the active editor, including the control-deck isolation previously verified. Existing save/reload, share/restore, import/export, parts/research and distinct Grok Bot/Codex Micro access remain reachable where applicable. Reorganization must not remove a working feature behind a decorative substitute. Use focused existing journeys; do not claim full coverage without running it.

D05. Original typing experience. Play or a clearly named typing action presents the actual original Monkeytype experience above the visible keyboard, with a clear way back. It must accept text and provide working test progress/results rather than be a static imitation. The keyboard remains available in the same experience. Input and scrolling must not be trapped by the preview or frame. Check keyboard and narrow layouts, and record iframe/origin or other public UI evidence of the original experience. Existing typing expectations remain unchanged.

D06. Real volume range. A clearly named volume dial exposes 0–200%, reaches both endpoints and intermediate values, and never exceeds that range. Pointer dragging changes volume continuously and predictably; releasing the pointer ends the drag, including when released outside the knob. Keyboard users can focus it, use arrows for bounded changes, Home for 0% and End for 200%, or an equally clear documented equivalent. The accessible value and visible percentage agree. This audio control must not be confused with a concept deck's local device-dial preview.

D07. Audio effect and mute. Volume changes actual playback output, not only text or knob rotation. Under a reproducible sound source, 0% and mute produce silence; 200% produces more output than 100% when the source has headroom. Muting and unmuting preserve the chosen nonzero level. Playing keys still gives appropriate visual feedback while muted. Observe real output or the browser audio boundary and explain what was measured. A changing slider value alone is insufficient evidence of volume behavior.

D08. Persistence and consistency. The chosen volume and mute state survive reload and switching Build/Sound/Play/Discover. Multiple visible volume controls stay consistent. A reset, unmute or mode change must not unexpectedly jump to full volume. Any intentional scope, such as browser-local preferences, must be understandable. No requirement is inferred that a shared build must override another person's audio preferences.

D09. Shared scene light. Plants and other desk objects must respond coherently with the keyboard and desk to the scene's actual light changes. Compare at least two supported light states for direction, brightness, color and shadows across those objects. Check spatial grounding/occlusion where the exposed view controls permit it. Static decorative imagery that visibly ignores changing scene light does not satisfy the request. A black-box visual response can demonstrate coherence; exact internal scene-graph membership cannot be proven without source inspection and must not be claimed from screenshots alone.

D10. Narrow layout and zoom. At 390 × 844 and a smaller/reflow-constrained width, the primary object, mode navigation, Resume/Customize, inspector, typing widget and volume/mute controls remain reachable without horizontal page overflow, overlapping text or clipped controls. At 200% browser zoom, functionality and reading order remain intact; vertical scrolling is acceptable. Prefer actual browser zoom, and explicitly label an emulated reflow check if tooling cannot establish the browser zoom level. Touch targets must be usable and must not activate content behind a panel.

D11. Focus and keyboard behavior. Focus is visible and follows a sensible order through destinations, featured cards, editor actions and audio controls. Tab can leave the canvas and Monkeytype frame. Escape dismisses an open menu/dialog without losing unrelated work. Sliders and dial arrow keys do not unexpectedly rotate the keyboard or trigger typing sounds. Typing in fields must not activate global scene shortcuts. Meaningful control names and state are available to accessibility APIs.

D12. Reduced motion. With prefers-reduced-motion enabled, automatic scene motion and large transitions are removed or reduced while direct controls still work. Mode changes, explode/assemble and focus navigation must leave a stable usable result. Do not substitute an animation-free screenshot for actually exercising controls under that preference.

D13. Honest controls and data. Every newly presented search, save, compare, component, mic, profile or acoustic control has working behavior or a clear unavailable state. No fake prices, inventory, compatibility guarantees, physical sound simulations or connected-agent claims may be inferred from the generated reference images. Recorded sounds remain distinguishable from synthesis or illustrative effects. Existing product/concept/local-action labels remain honest.

## Planned independent evidence

- One active browser/session at a time. Prefer the headed Chromium setup that rendered the prior candidate reliably; keep old headless rendering stalls on record.
- Desktop screenshots aligned with the reference composition, narrow screenshots, and a separately documented 200% zoom/reflow check.
- Distinct fixture build values recorded before preview navigation and after Resume/reload; explicit Customize checked separately.
- Dial endpoint, pointer capture, keyboard, mute and persisted-state values, plus audio-output/boundary evidence.
- Functional typing journey, scene-light before/after captures, focus observations and reduced-motion interactions.
- Separate results for each frozen case: pass, failure or unverified, with actual evidence and limits. Passing this unit does not imply the application is flawless or waive unrelated frozen checks.

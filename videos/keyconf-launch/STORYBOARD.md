---
format: 1920x1080
duration: 36s
message: Make a keyboard that feels like you.
arc: Invitation → Explore → Customize → Hear → Play → Start
audience: Keyboard enthusiasts and first-time builders
mode: autonomous
music: original sparse ambient pulse with keyboard percussion
---

## Video direction

keyconf is an inviting, tactile studio. Six six-second scenes. Use frame.md's captured dark forest palette, Arial display and local JetBrains Mono labels. Typography should feel like the app: light, huge and generously spaced, sentence case. Consistent small keyconf wordmark top left and scene number top right. Scene footage is the real current app, never rebuild the full website. Original Blender photography uses the app's exact Forest Line GLB and palette. No generic stock footage, fake testimonials, statistics, or acoustic accuracy claims. Global safe margins 96px horizontally and 64px vertically. No voiceover/captions band. Title weight 400–500. A scene is allowed a quiet final read. Do not add little dashboard cards around every shot. Motion uses smooth power3 curves, measured masks, and one focal movement at a time. Avoid decorative bounce.

## Frame 1 — The invitation

- scene: Intimate keycap photography resolves into the whole Forest Line keyboard.
- duration: 6s
- poster: 4.8s
- transition_in: cut
- status: animated
- src: compositions/frames/01-invitation.html
- asset_candidates: assets/stills/macro.png, assets/stills/product.png
- rules: dynamic-content-sequencing, multi-phase-camera

Scene 1 (0–1.8s): full-bleed macro.png, a real Blender photograph of our app model. A tight crop shows the sculpted caps. Small keyconf wordmark at(96,64). Copy "Your next keyboard." reveals at(96,170), max900px width, 116px Arial. Use the installed line-by-line-slide pattern with smooth power3 settle. Keep image as an inner visual wrapper for camera movement.
Scene 2 (1.8–3.3s): a measured pull-back reveals the full product.png photograph using an intentional image cut under a very short dark fade. Do not imply true 3D from two stills. Copy "Starts here." appears below the first line at2.4s, sage accent, same size. Image composition occupies lower/right field; typography must stay legible.
Scene 3 (3.3–6s): hold the complete keyboard, copy resolves. At4.3s bottom label appears "A studio for your next build." 30px. Keep 20px original3Dstudy note if needed. No exit animation: next scene owns the cut.

## Frame 2 — Find your starting point

- scene: The actual featured-build gallery and selected preset respond together.
- duration: 6s
- poster: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/02-explore.html
- asset_candidates: assets/stills/landing.png, assets/stills/blush.png, assets/stills/midnight.png
- rules: dynamic-content-sequencing, theme-crossfade-morph

Scene 1 (0–1.5s): dark forest ground. Headline "Find your starting point." at(96,138), 88px. Real landing screenshot in a single measured rectangle at(250,300), width1420 height799; crop below canvas intentionally within a .screen viewport height670. Screenshot's browser scrollbar stays outside crop. A thin border and8pxradius only.
Scene 2 (1.5–3.6s): the same framed viewport switches to blush.png at1.8, then midnight.png at3.2. These are actual snapshots taken after selecting those exact presets. Use 0.18s crossfades within the fixed crop, no made-up UI controls. Fixed position/scale preserves gallery and3D alignment.
Scene 3 (3.6–6s): final preset holds. Supporting label "Featured builds. Room to experiment." appears at4.3s,30px. Small consistent brand/scene label. Don't show fabricated counts/prices.

## Frame 3 — Build from the inside out

- scene: The current keyboard separates into its actual modeled layers.
- duration: 6s
- poster: 4.5s
- transition_in: cut
- status: animated
- src: compositions/frames/03-build.html
- asset_candidates: assets/stills/build.png, assets/stills/exploded.png
- rules: dynamic-content-sequencing, svg-path-draw

Scene 1 (0–1.5s): forest ground. Headline "Make every layer yours." at(96,140),88px. Real build screenshot presented at(96,300), width1728 andheight972, cropped in a viewportheight675. Show UI itself as evidence.
Scene 2 (1.5–3.7s): same screenshot location switches to exploded.png at1.7 via0.2s opacity crossfade. True actual3Dexploded state, never create fictitious layer geometry. A small label "Explore the assembly" appears bottom-left around3s outside footage only if legible.
Scene 3 (3.7–6s): pause on real exploded model and inspector. Small label "Cases · keycaps · switches · plates" appears in an available header region at4.3s. Do not cover actual keyboard. No fake movable sliders or changing unsupported parameters.

## Frame 4 — The listening room

- scene: The real Sound Lab with recorded switch playback; a waveform from the same sound.
- duration: 6s
- poster: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/04-sound.html
- asset_candidates: assets/stills/sound.png, assets/audio/audition.wav, assets/audio/audition-wave.json
- rules: dynamic-content-sequencing, svg-path-draw

Scene 1 (0–1.6s): headline "Hear the difference." at(96,140),96px. Real Sound Lab screenshot inset at(720,275),width1120,height630. On the left at(96,360), label "Recorded switch sounds",36px. Small source text "Gateron Ink Black · recorded reference",24px. Preserve audio honesty, not an exact assembly measurement.
Scene 2 (1.6–4.5s): a simple actual source waveform on left in a520×180box at(96,520). Read static amplitude samples from audition-wave.json. A playhead traverses the measured wave with a linear tween in sync with the audio starting1.6s. No decorative random waveform. Hold screenshot at fixed position.
Scene 3 (4.5–6s): label "Listen before you build." appears bottom-left at4.6s. Preserve the transients; score gets quieter during audition. Root owns global audio; don't add source media audio elements here.

## Frame 5 — Find your rhythm

- scene: A real Monkeytype run with the interactive keyboard below.
- duration: 6s
- poster: 3s
- transition_in: cut
- status: animated
- src: compositions/frames/05-play.html
- asset_candidates: assets/footage/typing.mp4, assets/stills/play.png
- rules: dynamic-content-sequencing

Scene 1 (0–1s): headline "Find your rhythm." at (96,220), 96px. The real 1180×1040 crop of the typing capture sits at (700,170), width 1120 and height 875. Both the Monkeytype test and keyboard are visible. Video is muted and owned by the root timeline.
Scene 2 (1–4.5s): the actual typing take plays at its original speed. The source segment starts at 20.2 seconds. Copy "Monkeytype, with your build." appears below the title. No WPM or results are invented.
Scene 3 (4.5–6s): hold the real typing state. The root soundtrack uses the recorded press/release samples at the corresponding input-event times.

## Frame 6 — Your studio is open

- scene: A large keyconf lockup with the finished Forest Line and launch URL.
- duration: 6s
- poster: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/06-start.html
- asset_candidates: assets/stills/product.png
- rules: dynamic-content-sequencing, multi-phase-camera

Scene 1 (0–1.8s): full-bleed product.png photograph, actual keyboard on dark forestground. Large "Make it yours." text at(96,160),120px. Small keyconfwordmark top-left96,64. Keep calm negative space and enough contrast by placing copy on darkest portion.
Scene 2 (1.8–3.6s): a cream CTAplate at(96,770),820×94px,8pxradius. Text "Start building" at(132,794),32px and a simple right arrow. It's a filmCTAgraphic, not fakeappinteraction. Under it the URL "keyconf-studio.kvnloo.chatgpt.site" at(96,906),28pxmono. URL comes from publishedsite, no inventedshortdomain.
Scene 3 (3.6–6s): wordmark "keyconf" at(96,370),200px if it fitswithoutcoveringkeyboard; or keep thetopwordmark andletproductdominate ifherooccupiesit. Final readableholdatleast2s. Noendblackframe. Optional small "Build · Sound · Play · Discover" atbottomrightonlyifclear. All text must fitinside96pxsafemargins.

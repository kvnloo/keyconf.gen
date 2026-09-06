# keyconf launch film

A 36-second, 1920×1080 film made in Hyperframes 0.8.29. It shows the current keyconf app, its original keyboard model, featured builds, component customization, Sound Lab, and the bundled Monkeytype guest test.

## Preview and render

Requires Node.js 22 or newer, Chrome, and FFmpeg. Hyperframes can install its pinned Chrome build.

```sh
npm ci
npx hyperframes skills update product-launch-video
npx hyperframes doctor
npx hyperframes preview --background --port 3333
npm run check
npm run snapshot
npm run render
```

Open `http://localhost:3333/#project/keyconf-launch`. The finished file is `renders/keyconf-launch.mp4`. `index.html` is the authoritative assembled composition; its six editable scenes live in `compositions/frames`. The root owns video timing, audio, and music automation. GSAP and fonts are local, so the film requires no runtime network requests.

## What is real

- App screenshots come from keyconf commit `052506917ca4ecaefba57695bfc99cc278b180a4`. Captures use actual controls and preset selections, with no reconstructed UI.
- Blender stills use `assets/models/keyboard-60.glb`, the same original geometry used in the app, recolored with the actual Forest Line palette. These are product illustrations, not photographs of manufactured hardware.
- Typing footage is a real guest-test run. Its source segment and key-event times are in `assets/audio/typing-cues.json`.
- The listening scene uses Gateron Ink Black press/release recordings from tplai/kbsim under MIT. The film changes level and modest stereo position, without pitch shifting. It does not claim to reproduce a specific complete assembly or recording environment.
- The score is an original deterministic 80 BPM composition. `scripts/compose-score.py` regenerates it. Music fades around the recorded audition so keyboard transients remain audible.

## Source and attribution

`assets/licenses` includes the sample MIT license, Liberation Sans and JetBrains Mono font licenses, and Monkeytype's GPLv3 license. The screenshot and typing footage show the modified guest distribution maintained in the keyconf repository. Monkeytype source: https://github.com/monkeytypegame/monkeytype. Guest integration source: https://github.com/kvnloo/keyconf.gen/tree/main/third_party/monkeytype.

Animation uses GSAP 3.13.0 under its standard no-charge license, https://gsap.com/standard-license/. Its distributed header is retained in `assets/gsap.min.js`. Hyperframes source: https://github.com/heygen-com/hyperframes.

To regenerate the original music, install Python `numpy` and `soundfile`, then run `python scripts/compose-score.py`. `scripts/render-product.py` runs under Blender 4.3's Python API. Existing stills and audio are included, so neither Python nor Blender is required to edit text, preview, or render the film.

Raw browser takes, dependency caches, and temporary diagnostics are excluded from the portable source package. The source package includes all media needed to render the final composition.

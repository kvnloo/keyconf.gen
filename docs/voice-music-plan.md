# Optional music and a separate assistant

Research date: 2026-09-06. This is a proposal based on source inspection and official provider documentation. No music was downloaded or generated, no provider session was started, and no application code was changed for this research.

Ship one optional instrumental track first. Music starts only after a person presses Play, stays quiet, and fully mutes for keyboard audio and embedded sound tests. Keep a later conversational assistant in its own panel, with its own microphone and Stop controls. The Grok Bot device remains a configurable object in the scene.

## What the repositories support today

| Location | Verified behavior | Consequence |
| --- | --- | --- |
| `lib/audio.ts`, `KeyboardAudio` | Creates an interactive Web Audio context; loads recorded samples; synthesizes fallback sound; tracks scheduled sources; exposes `unlock`, `prepare`, `play`, `setLevel`, `stop`, and `close`. Source completion is private. | Music needs a separate gain control. Actual note activity is not currently exposed to a coordinator. |
| `app/page.tsx`, `playbackEnabled`, `enableSound`, `playSequence`, `stopDemo` | Sound begins disabled. Native playback is gated by the current screen. A revision counter invalidates pending actions; demos schedule both down and up samples. Hash navigation stops demos and clears the selected reference. | Reuse the cancellation pattern. A keydown timeout alone would miss future scheduled notes, key releases, and sample tails. |
| `app/page.tsx`, `SoundReferences.onSelect` | Selecting a reference stops demos, mutes native output, and disables native sound. Enabling native sound clears the reference. | There is already a useful exclusion rule between native keyboard audio and reference playback. |
| `app/sound-references.tsx` | Mounts an autoplay YouTube privacy-enhanced iframe for the selected record. No IFrame Player API integration or playback-state callbacks are present. | Reference presence is the only reliable local signal today. Keep music muted for the entire time a reference is mounted, including pauses and buffering. |
| `app/typing-test.tsx` | Same-origin iframe messages pass validated key events to native keyboard playback. | Typing audio must pass through the same music suppression path as physical and onscreen keys. |
| `lib/webmcp.ts` | Registers a build reader and a validated layout/palette mutation if `document.modelContext` exists. | These functions suggest a bounded assistant contract, but this is not a voice transport or an assistant backend. |
| `lib/control-deck.ts`, `lib/featured-builds.ts`, `public/models/grok-bot.glb` | The Grok Bot is a hypothetical control-deck device and model asset. | Do not treat selecting it as consent to open a microphone or connect an AI account. |

The following Synergy findings come from read-only inspection of `/home/kvn/workspace/synergy.ai`. Credential files, vault contents, environment secrets, and browser credentials were not inspected.

* `app.js:1474-1596` implements optional browser `SpeechRecognition` dictation into an input. The UI shows listening state, handles permission failure, and exposes Stop. The consent controls and hidden-tab cleanup are around lines 1686-1713. It does not implement a spoken model conversation.
* `companion-bot.js:461` reads reader, board, and `voice-is-live` DOM state to choose a visual mood. The companion is a presentation layer, not a Grok connection.
* `companion/synergy_companion/adapters.py:120` lists Hermes `xai-oauth` among authentication providers. This is an authentication adapter, not proof of Grok voice access.
* `README.md:45-70` describes a paired loopback companion with exact-origin checks, encrypted credentials, and provider tokens kept outside browser JavaScript. Current evidence Q&A uses OpenRouter. The README explicitly treats full-duplex voice as future work and separates subscription authentication from API entitlements.

These patterns are reusable: explicit voice activation, visible session state, cleanup on exit, and a trusted credential boundary. The source does not establish that Grok voice is already implemented or that a consumer Grok subscription pays for an API session.

## Minimal music experience

Place a small Music control beside the existing sound controls. Its closed state says `Music off`. Opening it shows Play/Pause, one track name, a modest volume slider, and source/license details. Initial gain should be low, for example 0.12, then tuned by listening to the actual mastered asset. A slider value is not a loudness measurement.

Keep music preference outside exported keyboard build data. Remember track and volume locally if useful, but require Play again after a reload. Do not fetch the track or resume an AudioContext before opt-in. An unavailable track should leave a usable keyboard and a short retry message.

When music is requested but suppressed, say `Music paused for keyboard sound` or `Music paused for sound test`. Do not switch the visible Play preference off merely because another sound temporarily has priority. If the person presses Pause during suppression, closing the sound test must not restart music.

## Priority and lifecycle contract

For the first version, use full muting. It satisfies the required suppression even with an unobservable cross-origin player and avoids masking subtle switch differences.

| State | Music | Native keyboard | Assistant |
| --- | --- | --- | --- |
| No explicit music Play, page hidden, or player disposed | Off | Follow existing sound setting; stop on page teardown | End microphone capture and playback on teardown |
| Embedded sound reference mounted | Muted and paused before mounting iframe | Stop voices and disable native audio, as today | Suspend listening and speech |
| Native keyboard audio enabled on an eligible screen, including demos | Muted and paused before enabling native output | Normal playback | Keep answers as text; suspend speech during testing |
| Explicit assistant session, once implemented | Muted | Do not start a demo automatically | Mic/speech only while session is active |
| Music requested, visible page, no blockers | Play at user volume | Disabled or inactive | Idle |

The first implementation deliberately reserves quiet while native sound is enabled, even between key presses. That is the smallest reliable design with the current APIs. It lets people type with music when keyboard audio is off. If music between isolated notes is important later, replace that conservative blocker with actual source lifetimes as described below.

Maintain user intent separately from a set of suppression reasons. Compute effective music state from both. Clearing one reason must never resume music while another reason remains. Acquire suppression synchronously in `enableSound`, `playSequence`, and reference selection before any `await`, source start, or iframe mount. A React effect that runs after playback begins is too late.

After all blockers clear, wait 250 ms and fade music back over 400 ms. Those are proposed tuning values, not measured requirements. Cancel the release timer immediately when another blocker arrives. Hidden-tab handling pauses music and invalidates pending loads and resumes; returning to the tab shows Play without restarting. On unmount, abort fetches, stop media, clear timers, disconnect nodes, and ignore stale promise completion using a generation counter. A rejected `play()` promise never changes the UI to Playing.

For a future implementation that follows individual notes, extend `KeyboardAudio` to notify a coordinator before each valid source is scheduled and after its `onended`. Count all sources, including both synthesized nodes and recorded key-up samples. A demo must also hold a reservation across the entire scheduled phrase. Release once on natural completion, `stop`, failed scheduling, pack change, or `close`. Repeated cleanup must be harmless. Only begin music recovery after the last source and demo reservation end. Use a music gate that reaches zero before the native source starts, without delaying keyboard response through React state updates.

For more accurate YouTube behavior later, integrate `YT.Player`, enable JavaScript control, and supply the expected origin. The official API reports playing, paused, ended, buffering, and errors. Keep suppression during startup and buffering, and retain the conservative mounted-player rule if state is unknown. Do not attempt to read audio from the cross-origin iframe. [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

## Music acquisition options

The enabled tool inventory in this session has no direct music-generation connector. Browser research and official provider APIs establish possible acquisition routes; configured credentials, billing, quota, and generated quality remain unverified. No plugin installation is needed to plan a single prepared asset.

| Option | Verified capability | Fit for Keyconf |
| --- | --- | --- |
| Google Gemini API / AI Studio | Current documentation lists `lyria-3-clip-preview` for 30-second MP3 clips and `lyria-3.5` for longer music through the Interactions API, with 44.1 kHz stereo output and instrumental prompting. The model page marks Lyria 3.5 as Preview. | Generate and review a fixed instrumental track outside the app; serve the approved file. This is the simplest Google route. [Music generation](https://ai.google.dev/gemini-api/docs/music-generation), [Lyria 3.5 model](https://ai.google.dev/gemini-api/docs/models/lyria-3.5) |
| Google Cloud Lyria | Cloud documentation separately lists Lyria 3 Pro Preview, up to 184 seconds, and Clip Preview. | An option if the project already uses Cloud billing. Do not assume model identifiers are interchangeable between Cloud and Gemini API. [Cloud Lyria models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/lyria/lyria-3) |
| Google Lyria RealTime | Experimental instrumental generation over a persistent WebSocket; weighted prompts, music controls, and play/pause/stop. Its guide explicitly includes lo-fi genres. | Save for a later generative-music experiment. Buffering, cancellation, provider sessions, and ongoing usage add work that one background track does not need. [Lyria RealTime](https://ai.google.dev/gemini-api/docs/realtime-music-generation) |
| Eleven Music | Website generation and a paid-subscriber Music API, instrumental output, and MP3/WAV export. Commercial use depends on plan and music terms. | Another route for an original prepared loop when the chosen plan covers this use. No paid call or license purchase was made here. [Music documentation](https://elevenlabs.io/docs/overview/capabilities/music), [Music terms](https://elevenlabs.io/music-terms) |
| Pixabay Music | Free content use and adaptation under a content license with restrictions, including standalone redistribution. | A discovery source, not blanket clearance for packaging a raw file in a public repository. Record the exact track's license and distribution permission before bundling. [License summary](https://pixabay.com/service/license-summary/) |

Recommended creative brief: original instrumental lo-fi, soft electric piano, sparse percussion, warm bass, steady tempo, no vocals, no spoken samples, no keyboard sound effects, no sharp drops. Ask for a restrained repeating arrangement. A model's output is not guaranteed to make a seamless loop; audition and edit the loop boundary before publishing.

For the chosen file, retain title, creator/provider, exact source URL or generation ID, model, generation date, prompt, applicable license/plan evidence, and permitted distribution scope. Google API use remains subject to its service terms; generation alone does not establish exclusive rights or clear every possible third-party claim. [Gemini API terms](https://ai.google.dev/gemini-api/terms)

## Separate conversational assistant, later

Add an `Ask about this build` panel outside the keyboard and control-deck controls. Begin with text, then offer an explicit `Start voice` action with a visible microphone state and End button. Close means disconnect, stop capture tracks, stop queued output, clear playback buffers, and release music suppression. Do not automatically reconnect or reopen the microphone after a hidden tab, navigation, or network failure.

xAI documents a current speech-to-speech API using `wss://api.x.ai/v1/realtime?model=grok-voice-latest`. Its supported browser authentication path is a short-lived token created server-side through `POST /v1/realtime/client_secrets`. This verifies a provider capability, not a working integration in either repository. Keep the long-lived API key in a trusted backend and give browsers only scoped, expiring session access. [Speech-to-speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech), [Ephemeral tokens](https://docs.x.ai/developers/model-capabilities/audio/ephemeral-tokens)

Pass the selected build and known compatibility findings through a narrow context reader. Reuse the validation ideas in `lib/webmcp.ts` if layout/palette changes are later allowed. Keep purchases, arbitrary shell execution, and undisclosed account access outside this assistant's contract. A spoken answer should not claim a part's sound was measured when only a reference recording exists.

## Verification before shipping

Listen to the actual music and test physical keys, onscreen keys, typing iframe input, native demos, recorded key releases, and synthesized tails. Music must be inaudible throughout native playback and throughout a mounted reference's startup, buffering, playback, and replacement. Verify Pause while suppressed, repeated enable/disable clicks, failed audio loads, tab hiding, navigation, unmount, and a late `play()` resolution. None may restart unwanted audio. Check browser autoplay denial and touch controls on a real mobile browser. A later assistant needs separate checks for denied microphone permission, pending permission during navigation, connection failure, interrupted speech, and teardown while audio is queued.

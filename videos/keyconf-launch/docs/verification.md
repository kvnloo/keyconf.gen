# Film verification

The final Hyperframes check passed lint, browser runtime, layout, and sampled WCAG contrast with zero errors and warnings. Four informational layout notes describe intentional image crops and the opening camera overscan. The automated motion pass was not enabled by this CLI configuration; the individual frame timelines were inspected separately.

Visual review covered the opening macro, all six scene midpoints, and both sides of every scene cut. It caught an expired typing test that static checks could not identify. That footage was replaced with an active 50-word Monkeytype run captured on the public production site. The replacement was inspected at 24.2, 26, and 29.5 seconds. The typing scene stays in the test and keeps its keyboard visible throughout.

The real production site loaded the 3D model, opened its guest test, switched to words mode, and accepted 12 words without a browser page error during the final capture.

All photographic keyboard imagery is original Blender rendering of the app model. UI footage retains original colors. Audio is separately authored: an original score, licensed recorded switch samples, and an amplitude-derived waveform. No precision acoustic claim is made.

## Final artifact

Hyperframes' PNG-sequence export succeeded with all 1,080 frames. Every PNG header was checked for 1920×1080 dimensions and a complete consecutive sequence. The final H.264 MP4 decodes to 1,080 frames at 30 fps, with video and audio both exactly 36.000 seconds. It is 4,822,143 bytes. The stereo AAC track is 48 kHz, encoded with a 320 kbps target.

Decoded MP4 loudness measured −17.9 LUFS integrated and −4.5 dB true peak. The separate 24-bit PCM master measured −18.00 LUFS and −4.54 dBTP. Full-file decoding reported no errors; black-frame detection reported no interval above its 99% near-black threshold. A contact sheet extracted from the actual MP4 was inspected after encoding. The earlier truncated streaming MP4 was discarded and is not a deliverable.

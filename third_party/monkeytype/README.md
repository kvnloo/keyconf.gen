# Monkeytype guest integration

The widget uses Monkeytype's real frontend from [revision 91bd24b](https://github.com/monkeytypegame/monkeytype/tree/91bd24bb8513785c7364cbea29296ff7adafac41), version 26.32.0, under GPLv3. It is an independent modified guest build. The hosted monkeytype.com response blocks embedding with `frame-ancestors 'none'` and `X-Frame-Options: DENY`; this integration builds the published source instead.

`keyconf.patch` contains every modification, including its build instructions. `public/monkeytype/` contains the compiled frontend and three corresponding-source archives. These contain the entire modified upstream checkout and static inputs, without node_modules or generated build output. The widget links to the source and license. Other third-party assets retain upstream licensing.

To regenerate, install Node 24 and pnpm 11.21.0, then run `bash scripts/build_monkeytype.sh` from this project's root. The script checks out the pinned revision, applies the patch, builds the workspace dependencies and frontend, and packages runtime assets and source together. Normal Keyconf builds use the checked-in widget and do not rebuild or download Monkeytype.

Changes disable remote accounts and backend requests, analytics, ads, reCAPTCHA, service-worker registration and cookie prompts. Settings use a namespaced device-local key. Internal routes stay within the widget; assets use relative paths so Sites and GitHub Pages both work. The compact styling and keypress message bridge connect it to the existing Keyconf scene and audio engine. The upstream typing, scoring, words, quotes, test modes and restart implementation remains intact.

The parent accepts key events only from its own iframe and origin, validates message fields, bounds requested heights, ignores repeated presses, clears held keys on blur/unmount, and shows a retry state when the frame does not become ready. No typing text or scores are sent to a server by this integration. Guest results last for the current session.

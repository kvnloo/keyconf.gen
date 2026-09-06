# Development and releases

| Branch    | Purpose                                 | Browser preview                               |
| --------- | --------------------------------------- | --------------------------------------------- |
| `main`    | Reviewed stable releases                | https://kvnloo.github.io/keyconf.gen/main/    |
| `dev`     | Integration and review before promotion | https://kvnloo.github.io/keyconf.gen/dev/     |
| `nightly` | All unattended overnight development    | https://kvnloo.github.io/keyconf.gen/nightly/ |

The user requested this policy on September 6, 2026. Do overnight implementation on `nightly`, verify it, commit and push regularly. Do not automatically merge overnight feature work into `dev` or `main`. Start the next overnight session from the existing nightly work; inspect remote changes and merge deliberately rather than resetting a branch. Preserve the complete objective in `product-goal.md` and `handoff/goal.json`. Record verified work and remaining gaps in `product-progress.md`.

The first setup carries the already-requested room release and shared deployment plumbing into the stable baseline. After that, promotion is deliberate: merge a reviewed nightly checkpoint into dev, verify the integration preview, then promote the accepted revision to main. Keep unready work on nightly. No force pushes are needed.

## One Pages site, three independent builds

Each push to these branches runs the existing checks and builds with its own Vite base path. The exact tested build is uploaded as a candidate. A single serialized publish job replaces only that channel in `gh-pages`, which contains generated output rather than development source. Other channels keep their last successful files. `gh-pages` also retains those files when temporary Actions artifacts expire. Do not edit this generated branch manually.

The combined artifact is deployed through the official GitHub Pages actions. Per-channel `release.json` records the source commit and workflow number; `environments.json` lists all published channels. The assembler rejects a misbased artifact and ignores older or repeated workflow numbers, so delayed runs cannot roll a channel backward. The repository root redirects to main and preserves query strings and shared-build hashes.

The Pages environment permits deployments from main, dev and nightly. Pull requests never deploy. Publishing jobs share one concurrency group across all three branches. A failing check retains the previous publication. Nightly checks already running or waiting for a runner are allowed to finish when a new overnight commit arrives; newer pending checks coalesce to the latest commit. This keeps long runner queues from starving the nightly preview. Main, dev and pull-request checks still cancel obsolete work. GitHub can replace an older pending concurrency job with a newer one; rerun that branch's successful workflow if its preview has not advanced. No overlapping jobs can overwrite another channel's output.

Pages hosts the browser app. All three previews use the existing Sites import API at https://keyconf-studio.kvnloo.chatgpt.site/api/import. These paths do not create isolated backend databases. Backend changes require a separate local/server verification and an explicitly selected Sites release. Unattended nightly work must not deploy an experimental backend to the stable public site.

This follows GitHub's [custom Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [deployment concurrency](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments) model.

## Overnight continuation

The current local task has a 30-minute heartbeat through 08:00 America/Chicago on September 6, 2026. It preserves this task's model settings and exact product goal. It resumes concrete unfinished work, runs one graphics browser at a time, records evidence and publishes only the nightly preview after successful checks. The computer and Codex must remain running for local work. The morning report should include actual published commits, checks and unresolved work; a scheduled wake-up is not proof that a release completed.

Dev and nightly autosaves have independent keys for keyboards, imported legacy parts, recovery documents and control decks. Main keeps the original save keys, so existing users retain their builds after the root redirect. Share links and exported files can deliberately carry a build between previews. These paths share a browser origin, so this is save isolation, not a security boundary; Monkeytype's own guest preferences may remain shared.

During first-time setup, a preview can finish before main. Its tested files are retained in the generated branch, but the combined site is not deployed until a main build exists. This prevents replacing the original public link with a redirect to a missing page.

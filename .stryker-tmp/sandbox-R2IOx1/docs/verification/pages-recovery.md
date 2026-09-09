# Publication after a canceled waiting job

On September 6, 2026, dev run `34018875765` passed its complete `check` job. Its waiting `deploy` job was canceled when nightly run `34022702962` entered the same concurrency group. Both source commits had successful checks, but dev had no generated public files because staging happened inside its canceled job.

The nightly publisher now selects checked candidates from all three branches before assembling the site. It does not require the entire workflow to have succeeded, since deployment can still be queued or canceled. It requires the actual `check` job to have succeeded and validates each artifact's repository, branch, commit and run. Main and dev source refs are unchanged.

## Verification

- Eight focused tests cover candidate eligibility, failed/pending checks, old reruns, expired/missing/mismatched artifacts, API failures, preservation of other branches, recovery of an unpublished dev candidate and idempotent reassembly. The new module's initial missing-module failure was a scaffold check, not proof of the original deployment behavior. The original failure was reproduced by the actual GitHub job states above.
- All 62 repository tests, types, lint and actionlint passed locally. No browser application code changed in this fix.
- A read-only selection against the real GitHub API selected main run `34018381869` at `70c8afa`, dev run `34018875765` at `74619e8`, and nightly run `34022702962` at `dddbf8f`. All three `check` jobs had succeeded. Dev remained eligible despite its canceled deploy.
- Downloaded those exact Actions candidates into ignored `work/pages-recovery-artifacts/`. Assembled all three into `work/pages-recovery-site/`, validated the branch-specific base paths, and obtained a combined tree of approximately 533 MiB. A second assembly returned `published: false` for every channel without changing release metadata.
- Main's actual public `release.json` was fetched successfully and matched `70c8afafd4a6ecdb174d03f33d95c3a0ab406b61`, workflow number 24. The site manifest contained main only at that point. Local assembly is not evidence that the dev and nightly URLs have been deployed.

Candidate selection inspects the latest 100 workflow runs per branch. Temporary candidates expire after seven days; the generated `gh-pages` files persist. An unpublished candidate outside that window needs a new check run. GitHub runner capacity and the actual download/deploy actions still require successful execution before this repair is considered publicly verified.

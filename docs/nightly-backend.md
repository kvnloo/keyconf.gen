# Nightly backend

The nightly branch owns a separate Sites project, `appgprj_6a9d84431fb48191b58bf203bb2fb609`, at `https://keyconf-nightly.kvnloo.chatgpt.site`. Its branch-local `.openai/hosting.json` selects this project. Main retains the stable project `appgprj_6a9c361eee048191a07f7c833254ded8` at `https://keyconf-studio.kvnloo.chatgpt.site`.

Nightly GitHub Pages calls the nightly `/api/import`. Main and dev Pages continue calling the stable importer. Local development and both Sites apps use their own same-origin endpoint. The nightly Sites app identifies itself as Nightly and scopes its saves accordingly.

Publish the validated nightly source and Worker archive to the nightly Sites project before pushing a Pages client that depends on a new backend contract. GitHub Actions deploys static Pages only; it does not deploy the Worker. A successful Pages run alone is not evidence of backend publication. Never copy nightly's hosting manifest onto main when promoting features; retain each channel's deployment identity.

The backend supports collection pagination and streamed request/response bounds. It does not provide a hosted catalog collector, job queue, global rate limit, or DNS-rebinding-safe egress policy. Imported options remain observations for review, not approved compatibility claims.

Verification before publication: 72 tests, strict type checking, lint and formatting pass. Deployment and live-store results are recorded in the product progress log after execution.

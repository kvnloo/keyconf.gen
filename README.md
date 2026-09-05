# Keyconf studio

A keyboard configurator built with React, Three.js, and original Blender geometry.

- Rotate a keyboard, change layouts, materials and colors, and animate individual keypresses.
- Inspect component-family evidence and known stabilizer / sensing conflicts.
- Preview public product data from JSON-LD and Shopify, then explicitly add reviewed products to a browser-local library.
- Explore synthesized sound characters. These are **approximations**, not recordings or predictions of selected retail parts.
- Export a build with its selected components, evidence links, and limitations.

## Development

Node 22.18+ is required.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

## Deployment

GitHub Actions checks types, tests compatibility/import parsing/assets, and deploys the browser app to [GitHub Pages](https://kvnloo.github.io/keyconf.gen/) whenever `main` changes. PRs run checks without deploying. Public assets include the original `.blend` source.

The Pages version calls the server-backed Sites importer at `https://keyconf-studio.kvnloo.chatgpt.site/api/import`. The server permits only its own origin and `https://kvnloo.github.io`. Pasted JSON-LD imports also work without that service. Server changes must be built and published through Sites separately; the GitHub workflow does not hold Sites credentials or deploy its backend. The workflow is complete for the Pages app, not automatic backend releases.

## Blender source

`scripts/build_keyboard.py` builds three illustrative keyboard studies. Install Blender's Python runtime `bpy==4.3.0` in a Python 3.11 virtual environment to run it. Pin NumPy below 2 for this Blender release. No third-party CAD was redistributed.

The model uses a 19.05 mm key pitch as a design unit. It is not dimensionally validated manufacturer CAD. Tall / low silhouettes scale the study; they are not precise named commercial keycap profiles. Material color and finish are appearance studies, not calibrated product scans.

## Catalog and research

See `docs/research.md` for source coverage and the database design. Imported product data is a review draft. Layout percentage, stem family, and "hot-swap" alone cannot prove compatibility. The current checker intentionally keeps incomplete matches unknown.

Sound sources are not downloaded from YouTube. Exact-build audio requires licensed recordings and full recording/build metadata. The current Web Audio engine is explicitly synthesized.

The URL importer reads at most 2 MB per response and follows at most three redirects, rejecting non-public destinations. Shopify catalog previews read up to 40 products and one variant per product. Product-URL previews read up to 80 variants and omit prices when currency is not established. This is not a complete catalog crawler. Production ingestion needs queued adapters, retries, rate controls, versioned observations, and an egress policy that prevents DNS rebinding.

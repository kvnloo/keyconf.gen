# Solarpunk room assets

Generated with the built-in imagegen tool on September 6, 2026. These are original visual assets, not source photographs of a manufacturer or authentic historical drawings. No reference images were submitted to the generation calls.

- `public/textures/solarpunk-sketchbook.png`: 1448 × 1086 RGB PNG. Flat two-page graphite/sepia mechanical and botanical studies. Mapped onto curved paper geometry in the open notebook. Exact prompt: [solarpunk-sketchbook.prompt.txt](solarpunk-sketchbook.prompt.txt).
- `public/textures/solarpunk-window-garden.png`: 1536 × 1024 RGB PNG. Planted terraces, foliage and curved conservatory ribs in hazy morning light. Used only beyond the physical room window. Exact prompt: [solarpunk-window-garden.prompt.txt](solarpunk-window-garden.prompt.txt).

Both images were visually inspected before integration. Pencil, notebook binding/pages, monitor, lamp, ruler, headphones, window framing and plants are live Three.js geometry. The small diagram annotations are decorative studies, not verified engineering instructions. Audio recordings and their existing provenance are unchanged.

## Studio Glass room (November 2026)

The landing room was rebuilt as a front-facing studio after Meng To's "Studio Glass" three.js demo (threeui.com/studio-glass). No images, models or code were downloaded into the app for it.

- Procedural and seeded (`lib/room-textures.ts`): teal plaster wall, walnut grain running along the desk's long axis, the forest beyond the window (three parallax layers of pines and broadleaf canopy over a sky gradient), and the monitor's mountain-lake wallpaper in day, sunset, storm and night variants. Each is a small `CanvasTexture` painted at load from a fixed seed.
- Live geometry (`lib/desk-scene.ts`): window opening with depth, frame, mullion, sill and instanced blind slats, sill plants (existing foliage code), desk with drawers, chair, studio display and stand, pencil cup, mouse, right-hand shelf with books, vase and twig, and a mushroom lamp with an emissive shade and a point light.
- `public/textures/solarpunk-sketchbook.png` is still mapped onto the notebook. `public/textures/solarpunk-window-garden.png` is no longer used by the room, because the procedural forest replaced it. It stays in the repository for the earlier room.
- Light shafts: the full-quality path raymarches the window aperture and blind slats against the depth buffer (`lib/shaft-pass.ts`). The efficient path (software GL, phones) draws additive interior slices through the beam volume, striped by the same slats.
- Liquid glass: `lib/glass-pass.ts` draws each registered panel and tile as a rounded-box SDF lens that refracts a copy of the rendered frame. It adds a press indent, and a release wave with a brief RGB split. Text remains DOM above it. Where WebGL is unavailable, CSS `backdrop-filter` glass is used instead.

### Credit

The refraction lens, the press and release wave, and the coupled room-lighting and shaft approach are adapted from Meng To's MIT-licensed skills: `refract-liquid-glass`, `shade-glass-button-press` and `light-a-threejs-workspace`. Their demo pages were read as references and were not run. See `THIRD-PARTY.md`.

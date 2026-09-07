# Imported accessory implementation contract

This is the next PART-6 implementation, not a claim that accessory imports already work. The September 6 audit found that `ImportDialog` converts products only into six core `Part` categories, while accessory validation, rendering, search and snapshots resolve products from the fixed global `accessoryCatalog`. Adding a dropdown alone would produce accessories that fail on reload or lose their source evidence.

## Product behavior

A user previews a supported store URL or pasted structured data, explicitly classifies the selected product as an accessory, reviews its variant/source, then adds it to the build. Adding its reference and its selection is one history action. It survives reload, export, portable previews, creator snapshots and client variations. Undo reverses the addition. There is no checkout or stock promise.

Imported products retain source URL, SKU/variant, name, brand, observation time and import method. Classification and placement are user-reviewed. Import data cannot supply compatibility claims. Unknown artisan width and stem stay unknown; names do not establish 1u sizing or MX stems. An unknown-width cap cannot replace a key.

## Data and compatibility boundaries

- Add build-owned custom accessory references and a single resolver combining them with built-ins. Reject duplicate identities and attempts to shadow built-ins.
- Use a deterministic short `import-accessory:` identity derived from canonical source/variant and reviewed category/placement. The existing accessory ID boundary allows only 120 ASCII characters; core part URL-based IDs are unsuitable.
- Preserve existing snapshot and retry behavior. Empty custom-accessory libraries must normalize to the old serialized shape, rather than silently adding an empty field to all existing request digests. Test previously accepted operation retries explicitly. An optional serialized field is justified by this backward-compatibility requirement; consumers resolve missing to an empty library.
- Parse references before selections. A selected imported ID must resolve to its own validated reference. Historical unknown built-in IDs remain readable through the existing archived-build path.
- Structural placement conflicts remain valid. Imported records cannot become confirmed physical fit merely by sharing a built-in's name, category or descriptive text.
- Freeze selected references and computed assessments in database snapshots. Validate frozen imported metadata against the original build-owned references, including source URLs. Strip unused references from portable and account/proposal payloads.

## Rendering boundary

Current macropad, button-board and encoder studies describe known catalog products. Imported products must not inherit these layouts or included components. Use a clearly labeled neutral reference object when product geometry is unavailable. Do not create twelve keys or an OLED on an arbitrary imported macropad. Unknown-width artisans remain unplaced. Keep preview limits, framing, disposal and per-selection source details.

## Required implementation coverage

1. Shared reference parser/resolver and backward-compatible build normalization in `lib/build-accessories.ts`, `lib/build.ts` and a focused imported-reference module.
2. Discriminated import result and explicit review controls in `app/import-dialog.tsx`; atomic history application in `app/page.tsx`.
3. Resolved references throughout the accessory editor, search, scene options, renderer, preview notes and build comparisons. Reference edits invalidate the relevant rendered preview.
4. Server evidence creation/validation in `db/build-snapshot.ts` and `lib/build-evidence.ts`; pruning in `lib/community.ts` and `lib/proposal.ts`.
5. Shared, historical and archived views retain original maker links and distinguish unavailable geometry from verified physical fit.

## Acceptance evidence

- Real supported-store or pasted structured-data review, explicit classification, add and single-step Undo.
- Reload, exported file and clean-device portable preview preserve variant identity and original source.
- Creator publication/proposal snapshots preserve imported references and reject source/specification substitution or confirmed-fit escalation.
- Built-in ID spoofing, duplicate imports, missing selected references, unsafe URLs and malformed metadata reject at the boundary.
- Old files and old accepted idempotent write requests retain their behavior.
- Unknown dimensions do not acquire fabricated widths/stems or branded geometry. Desktop/mobile rendering, removed selections, preview limits and resource disposal are verified.

Do not expose the import choice until this complete path works. The account UI and Google setup remain separate unfinished work; accessory imports must also function in the current public studio.

## Implementation checkpoint, September 6

Reference parsing, build serialization/pruning, snapshot evidence validation and editor/shared-review resolution are implemented. Imported selections now reach scene options and invalidate previews when references change. The renderer uses neutral placement markers instead of the built-in product studies, including external screens and unmounted knobs; unknown-width artisans remain omitted. UI copy identifies unavailable geometry.

Verification: 167 tests and type/lint/format checks passed for the persistence/UI commit `ba8953e`. The subsequent renderer change passed all nine real-GLB accessory model tests, including imported-product geometry isolation and disposal. `scripts/verify_imported_accessory_rendering.mjs` passed against the local app at desktop/mobile widths, and both screenshots were inspected. Type/lint/format checks also passed for that change.

Still unfinished: reviewed import controls and atomic addition, search/export lookup migration, broader round-trip/browser coverage, and deployment. These checkpoints do not satisfy the complete import contract or authorize calling PART-6 finished.

The next checkpoint adds reviewed accessory type/placement choices to `ImportDialog`, variant-level source links, and atomic reference-plus-selection history updates. Search resolves build-owned imports; export includes selected accessory reference metadata while retaining the complete editable library in the build file. Reimporting an existing identity refreshes its reference without duplicating its selection.

`verify_accessory_imports.mjs` passed the local mobile review/add flow, Undo/Redo, reload, exported SKU/source/reference equality, search detail source link, and a clean-device shared preview. Existing `verify_imports.mjs` also passed. All 168 unit tests and type/lint/format checks passed before the final source-link markup; the final browser flow passed afterward. Production build, worker coverage, CI and public deployment remain pending for this checkpoint. The complete account/community scope remains unfinished.

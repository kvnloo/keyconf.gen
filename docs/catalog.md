# Component catalog

Reviewed September 5, 2026. The builder contains 39 part references and five starting assemblies. The separate research browser exposes 20 retail/product observations from `data/research-seed.json`. Neither count represents exhaustive keyboard coverage. Kit components, switch variants and complete retail keyboards are different records.

`lib/component-data.ts` adds curated manufacturer facts to the original references in `lib/catalog.ts`. Each part has a source URL. The catalog observation date is displayed in the builder. Imports remain unverified and cannot acquire these compatibility relationships merely by matching a category or product name.

## Starting assemblies

| Reference | Layout | Evidence and qualification |
| --- | --- | --- |
| [KBDfans Tofu60 Redux](https://kbdfans.com/products/tofu60-redux-plate) | 60% | Named Redux PCB/plate relationship. Durock stabilizer exclusion is specific to the product, not a blanket ban on all screw-in stabilizers. |
| [CannonKeys Bakeneko60](https://docs.cannonkeys.com/bakeneko/) | 60% | AN-C V2 solder build guide and O-ring clearance requirements. Clip-in stabilizer reference retained. |
| [NovelKeys NK65 Entry Edition](https://novelkeys.com/products/nk65-entry-edition) | 65% | Archived, retired kit. Current archive states polycarbonate case and plate, plate-mounted stabilizers, and 3/5-pin MX hot-swap support. Older revisions must be checked separately. |
| [Keychron Q1 Max](https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard) | 75% | Mechanical contact PCB, polycarbonate plate, aluminum case, screw-in PCB stabilizers. Bundled-component references do not imply separate sale. |
| [Keychron Q1 HE](https://www.keychron.com/products/keychron-q1-he-qmk-wireless-custom-keyboard) | 75% | Original product page, distinct from Q1 HE 8K. Manufacturer currently describes TMR sensing; verify the purchased revision. Specific Gateron Double-Rail compatibility, with Jade and KS-20 explicitly excluded. |

Selecting an assembly updates layout, displayed case material and the six chosen parts in one undoable edit. The case color, keycap palette and audio remain independent choices. The 3D assets are original illustrative layout models, not manufacturer CAD.

## Switches and caps

- [Gateron Oil King](https://www.gateron.com/products/gateron-oil-king-pre-lubed-switches-linear): contact linear, five pins, nominal operating force and travel from the manufacturer.
- [Gateron G Pro 3.0](https://www.gateron.com/products/gateron-g-pro-30-switch-set): seven color variants, including linear, tactile and clicky. The manufacturer offers three- and five-pin packs. Records preserve that choice instead of inventing one exact SKU.
- [Gateron Double-Rail on Keychron](https://www.keychron.com/products/gateron-double-rail-magnetic-switch): Dawn, Nebula and Aurora. Specific compatibility does not extend to every magnetic PCB or Q HE 8K.
- Keychron Cherry-profile PBT [Black on White](https://www.keychron.com/collections/cherry-profile-double-shot-pbt-keycaps/products/cherry-profile-double-shot-pbt-full-set-keycaps-black-on-white-bow), [Hacker Mint](https://www.keychron.com/collections/cherry-profile-double-shot-pbt-keycaps/products/double-shot-pbt-cherry-full-set-keycap-set-hacker) and [Shine-Through](https://www.keychron.com/products/cherry-profile-double-shot-pbt-shine-through-keycap-set) retain kit-size, profile and stem details. Per-row coverage is not inferred from those facts.

## Compatibility scope

Core fit requires an explicitly listed case/PCB/plate combination, documented source records and the corresponding scene layout. A mixed assembly stays unknown. Switch checks distinguish contact PCBs from magnetic sensors, known magnetic families, explicit exclusions and unverified combinations. Stabilizer checks distinguish the Redux exception, Bakeneko O-ring interference and the NK65 plate-mount assembly. Keycap row/width coverage remains a separate unknown check until exact kit inventories are modeled.

A documented relationship is not a claim that the whole build is verified. Price, inventory, purchase quantities, board revision, physical tolerances and mounting hardware remain ordering checks. No checkout or purchasing action is performed.

The in-app technology guide separates feel from contact, Hall, TMR, optical, electrocapacitive and low-profile characteristics. Gaming guidance separates polling intervals, scanning/debounce, connection mode and measured end-to-end latency. Popularity observations identify their contributor/player populations and dates.

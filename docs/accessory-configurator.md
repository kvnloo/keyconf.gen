# Accessory configurator

The accessory planner stores product references, quantities and placements alongside the keyboard build. It covers replacement knobs, encoders, display modules, button modules, external macropads and individual artisan keycaps. These selections do not imply that the current case or PCB supports them.

`lib/build-accessories.ts` owns the catalog, JSON boundary validation and compatibility assessment. It does not generate geometry, modify keyboard firmware or connect to hardware.

## Product references

Primary sources checked September 6, 2026. These are product references, not inventory or price observations. Open the manufacturer page for the current offer and exact variant.

| Reference | Verified manufacturer information | Configurator treatment |
| --- | --- | --- |
| [Keychron aluminum knob](https://www.keychron.com/products/keychron-aluminum-knob) | Replacement knob for supported knob-version keyboards. The page lists 16 mm outer diameter and 14 mm height. | Cosmetic replacement. Its selection does not establish an encoder footprint, wiring or firmware support. |
| [Adafruit Rotary Encoder + Extras, 377](https://www.adafruit.com/product/377) | 24-pulse encoder, separate push switch and included knob. The page describes three encoder pins and two switch pins. | Embedded encoder requiring mounting, electrical, firmware and clearance evidence. |
| [Adafruit OLED, 326](https://www.adafruit.com/product/326) | 128×64 monochrome display module. The page specifies a 29.2×26.7 mm PCB, 6.2 mm thickness and I2C address selection. | Embedded screen module. It needs a controller, enclosure opening, power, wiring and display driver. |
| [Adafruit NeoKey 1×4 QT, 4980](https://www.adafruit.com/product/4980) | Four-key I2C PCB. Switches, keycaps and microcontroller are excluded. | Embedded button module, with quantity measured in modules. Selecting one module does not add four independently assigned keycaps. |
| [Adafruit MacroPad RP2040 starter kit, 5128](https://www.adafruit.com/product/5128) | External controller kit with twelve switches and keycaps, encoder, OLED and enclosure parts. USB-C carries power and data. | Separate desk device. Firmware and host connection remain unverified for the user's setup. The built-in OLED and encoder are part of the kit. |
| [Jelly Key Zen Pond V](https://www.jellykey.com/artisan-keycaps/zen-pond-v) | The page explicitly specifies MX stems and lists 1u, 2.25u and 6.25u among its sizes. Multiple profiles and 2.25u position variants exist. The page identifies a historical group buy. | Three size references, each assigned to one key. These are not exact color/profile SKUs. Stem and width cannot establish neighboring-key, stabilizer or enclosure clearance. |

A separate [Adafruit 4991 encoder breakout](https://www.adafruit.com/product/4991) was checked during research. That board excludes the actual encoder. The initial catalog uses product 377 so an encoder selection includes an encoder.

## Stored data and validation

`AccessorySelection` has a stable `id`, `productId`, integer `quantity` and one location variant:

- `embedded` with a named `slotId` for a knob, encoder, screen or button module.
- `external` with `left`, `right` or `above` desk position for a separate device.
- `key` with a named `keyId` for one artisan.

A newly added embedded or artisan item has the location `unassigned`. This is a planning state and never counts as a fit confirmation.

`parseAccessories` accepts missing data as an empty array for existing build files. It rejects unknown products, duplicate selection IDs, invalid placements, malformed locations and unbounded lists or quantities. It allows at most 100 selections and quantities of 1 through 100. Artisan quantity is always one because each artisan needs its own key placement. Location identifiers contain at most 120 ASCII letters, digits, dots, underscores, colons or hyphens and begin with a letter or digit.

The parser reconstructs only the selection fields. Imported compatibility badges, source URLs and evidence cannot promote an item to confirmed. Exported files and links store the selections; host evidence stays in the trusted application catalog.

## Compatibility assessment

`assessAccessoryCompatibility(selection, host?)` returns `confirmed`, `unknown` or `conflict`, explanations and source URLs. `assessAccessories(selections, host?)` also detects selections that exceed a key or documented slot capacity. Knob caps and encoder hardware occupy separate layers of the same named slot, but each still needs its own fit evidence.

An `AccessoryHost` describes one exact board or device variant, its sourced slot and key inventory, and product/location-specific claims. `null` inventories mean unknown. Empty inventories mean the documented host has no matching locations. The current keyboard catalog does not supply these host records yet, so normal selections remain unknown.

Confirmation requires every relevant aspect. A matching artisan width and stem still needs clearance evidence. Embedded electronics need mount, electrical, firmware and clearance evidence. A knob needs mount and clearance evidence. An external macropad needs connection and firmware evidence. Explicit conflicts override confirmations, including contradictory claims about the same aspect. A claim for another product or location does not apply.

The host records and claims are trusted application data, not an import format. Their source URLs must support the specific claim. A product page alone is insufficient evidence of compatibility with an unrelated PCB or case.

## Next integration work

1. Add exact board-variant host records with sourced encoder footprints, existing encoder shafts, screen openings and connector/firmware support. Reassess after a case, PCB, plate or switch change. Do not infer accessory support from a 60%, 65% or 75% layout label.
2. Replace freeform key and slot IDs with renderer-backed pickers. Use actual key widths, switch stems, stabilizer positions and neighboring geometry. Keep one selection per artisan key.
3. Add explicit artisan profile, row, color and vendor variant identifiers before claiming exact variant compatibility. Source clearance or measure the selected geometry. A width label does not encode stabilizer spacing or shell height.
4. Add documented external screen and external button-controller products. The type model distinguishes external products from embedded modules, but the starter screen and button entries are embedded only.
5. Add assembly requirements, cable/power budgets and bus/address conflicts for multiple electronic modules. The current assessor checks capacity, not aggregate electrical constraints.
6. Build accessible preview placement and licensed geometry. Current accessory selections do not alter the 3D board. No exact Jelly Key likeness, texture or model is supplied by this change.

Control-deck studies remain in `lib/control-deck.ts`. Their concept geometry and dial preview are separate from this product compatibility model. Integrating these records into control-deck persistence requires an explicit schema update.

## Verification

`node --experimental-strip-types --test tests/build-accessories.test.mjs` covers JSON round trips across all families, malformed input, forged compatibility fields, artisan size/stem/clearance, scoped evidence, duplicate key occupancy, aggregate slot capacity and separation of cosmetic knobs from encoder support. Host evidence in these tests is explicitly synthetic and does not enter the production catalog.

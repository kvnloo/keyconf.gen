# Angry Miao premium keyboard and charging-mat research

This note is a source-bound reference for product modeling and interaction design. It uses Angry Miao's official store, product pages, manuals, and software page only. Store and machine-readable product records were checked on 2026-09-08. Prices are USD because that is the currency returned by the official international store.

The hard boundary is deliberate. A product photograph, marketing render, or pixel-art image is useful visual reference, but it is not a dimensioned drawing. Where the official material does not publish a measurement, display pixel pitch, or CAD model, this document says **unknown**.

## Evidence rules

1. A current store state comes from the official product's Shopify `.js` record, linked in the sources. It carries variant prices and `available` status. The visible product pages sometimes disagree with that record, likely because of cached or separately rendered storefront content. Such conflicts are recorded rather than silently resolved.
2. A crossed-out or `compare_at_price` is called a **store reference price**, not a verified launch price. Angry Miao does not give a date or explain whether it was MSRP, a previous sale price, or a launch price in those records.
3. R2 and R3 share a manual. Any shared-manual specification is reported as covering the documented R2/R3 manual family. It should not be projected to R1, R4, Terminal, Glacier R2, or later boards without a model-specific source.
4. "Qi compatible" means the manual or product page says Qi. It does not prove that a device will align with a particular mat's coil placement through a particular desk pad.

## Fast decision table

| Product | What the official material proves | Geometry safe to model | Current store observation | What remains unsafe to assume |
| --- | --- | --- | --- | --- |
| AM HATSU | Wireless split ergonomic board, 4x6 layout, BLE 5.0, two 5,000 mAh batteries, 3 W Qi charging | Two separate, 3D-curved metal halves, combined weight 1.54 kg. The source does not publish a text total-key count, half footprints, key coordinates, tent angle, or keycap/switch height. | API says one $1,099 variant is available, with $1,600 store reference price. The rendered listing found by the crawler says $999 and sold out. | Exact body geometry, official 3D model, current checkout result, and protocol details beyond BLE 5.0 plus the stated low-frequency inter-half link. |
| CYBERMAT R1 | 15 coils, up to six devices, 45 W charger, aluminum one-piece frame | No official dimensions found in the reviewed material. | No current official product record found. | Price, present availability, exact coil map, and HATSU-specific mechanical placement. |
| CYBERMAT R2 | 12 coils, four zones, six Qi devices, 340 x 900 mm, 4.2 kg, 90 W charger included; HATSU-specific central coils | Rectangular 900 x 340 mm mat, 2 mm cloth pad, 323 x 883 mm internal marked area shown in the manual installation graphic. | No active official store product record found. | Price, current stock, exact coil-center coordinates, magnetic field geometry, and a CAD file. |
| CYBERMAT R3 | 11 coils, up to five Qi devices, 909 x 405 mm fabric surface, foldable silicone base | Surface rectangle 909 x 405 mm; base 42 x 92 cm. | $149, unavailable in the product API. | HATSU-specific fit or alignment. The R3 listing does not make that claim. |
| CYBERBOARD R2 | 75%-class board with 5 x 40 LED panel, 200 panel LEDs, 81 in-switch LEDs, BLE 5.0 plus USB-C, Qi charging | 5 x 40 pixel grid and 81 switch-light positions. The manual gives no outer length, width, height, or panel physical size. | All six current variants are unavailable. $599 to $799, with variant-specific store reference prices. | Exterior dimensions, individual LED pitch, panel physical dimensions, a CAD model, and an open display protocol. |

## AM HATSU

### Confirmed form, layout, and electrical facts

The official product page calls HATSU a "Wireless Charging + Connection | 3D Curved Metal Body | Split Ergo Keyboard." It also identifies its layout as 4x6, and the store collection calls it a 45% split ortholinear keyboard.^1 The manual names it "AM HATSU Wireless Split Ergo Keyboard" and gives a combined left-plus-right weight of 1.54 kg, including switches and keycaps.^2

The manual establishes the following implementation facts:

| Field | Officially documented value | Modeling/use implication |
| --- | --- | --- |
| Key structure | 4 x 6 per the product page. The manual illustration shows two halves and two layers. | Model the documented split 4 x 6 concept. The reviewed text does not state whether 4 x 6 is per half or total, so do not report a sourced total-key count. |
| Body | 3D-curved metal; official page says aerospace-level five-axis CNC machining. | Use organic, asymmetric curved halves for visual reference. Do not derive spline paths or wall thickness from photos. |
| Mass | 1.54 +/- 0.1 kg, including switches and keycaps. | Useful for a product-data card, not for case density or thickness. |
| Switches | Icy Silver linear switches, soldered. | A switch swap UI would be fiction for the documented stock board. |
| Keycaps | Angry Miao Glacier transparent keycap set, black Ergo kit. | The manual names a keycap family but gives no cap profile dimensions. |
| Per-key illumination | White, single-color PCB lighting. | Do not give HATSU full RGB per-key effects. Layer 0 lighting is off by default and Layer 1 lights the relevant switch LEDs. |
| Wired data | USB 2.0 Type-C, C-to-C supported. The getting-started instructions say to connect both halves separately. | One Type-C data connection per half is supported by the instructions. The manual does not state their exact positions. |
| Wireless host connection | Bluetooth 5.0. | The manual has pairing and switching for devices 1, 2, and 3 through BUTTON + Tab/A/S. |
| Inter-half connection | Official Chinese product page says a proprietary low-frequency wireless protocol connects the two halves, with claimed latency as low as 5 ms. | Show it as a private internal link, not as Bluetooth, Wi-Fi, or a published RF protocol. |
| Batteries | Two 5,000 mAh lithium-polymer cells. | One cell per half is explicit. Battery voltage, run time under lighting, and charge curves are unknown. |
| Qi | Qi protocol, 3 W output. | It can charge on a Qi-capable source, subject to coil alignment. |
| Maximum consumption | 1 W per device. | Keep it as a manual-reported value; it conflicts superficially with a 3 W Qi charging specification because the document does not define the measurement condition. |

The HATSU manual says all keys except the BUTTON key can be customized in the DIY site. It has exactly two supported layers, Layer 0 and Layer 1. It says new layers were not supported at publication and that firmware may later add them. The manual does not describe a public keymap file schema or an API.^2

### HATSU controls worth reproducing

These controls are unusually specific and are better than generic keyboard behavior in a product replica:

| Function | Official control | Observable feedback |
| --- | --- | --- |
| Left-half power | Hold left BUTTON + Esc for 1 second | Green breathing side light when working or on standby. |
| Right-half power | Hold right BUTTON + `|` for 1 second | Same side-light behavior. |
| Shut down both halves | Hold left BUTTON + Esc for 5 seconds | Side lights off. |
| Pair Bluetooth host 1/2/3 | Hold BUTTON + Tab/A/S for 3 seconds | The corresponding Tab/A/S key breathes while pairing; it flashes quickly for 3 seconds on connection, switching, sleep, or wake. |
| Switch Bluetooth host | BUTTON + Tab/A/S | Same corresponding-key feedback. |
| Check charge | BUTTON + P, labelled F11 in the manual's physical diagram | Side strip: green 75-100%, light green 50-75%, orange 25-50%, red 0-25%. |
| Reset | Hold BUTTON + O, labelled F10, for 3 seconds | All keys flash for 3 seconds. |
| Momentary layer | Hold Fn | Uses the other layer. |
| Persistent layer | Press FNSW | Cycles Layer 0 and Layer 1. |

These are manual controls, not a claim that every current firmware keeps the same bindings. The only HATSU lighting the manual documents is white switch lighting and the status side strip. There is no HATSU RGB LED matrix or display.^2

### HATSU price, edition, and availability record

| Official item | Variant | API state on 2026-09-08 | Observed price | Store reference price | Caveat |
| --- | --- | --- | ---: | ---: | --- |
| AM HATSU | AM HATSU | `available: true` | $1,099.00 | $1,600.00 | The separate rendered product page crawled earlier says $999 and "Sold Out." The direct official product API is newer evidence but not a completed checkout. |
| AM HATSU BATTLESHIP Limited Edition | AM HATSU BATTLESHIP | `available: false` | $2,350.00 | $2,350.00 | Store calls it limited. No product-specific technical deviation is published in the reviewed store page. |

The product API gives no currency field, but the international storefront labels checkout values in USD. The $1,600 figure is a compare-at value, not a confirmed historical sale or launch price.^3

### HATSU and CYBERMAT compatibility

R2 is the only CYBERMAT generation that explicitly says its ten central coils are specially designed for AM HATSU. It also says those coils can provide power to CYBERBOARD. The HATSU manual separately confirms Qi charging. This is enough to call HATSU-to-R2 support official. It does **not** publish the HATSU footprint, coil locations, dock tolerances, or a placement coordinate, so an exact charging overlay cannot be made responsibly.^2 ^4

R1's page says it can charge CYBERBOARD and "every wireless-charging digital device". That supports a general Qi claim, but does not name HATSU or publish a fit diagram. R3 describes Qi charging zones but also does not name HATSU. Treat R1 and R3 HATSU placement as unverified rather than incompatible.^5 ^6

## CYBERMAT generations

### R1

Angry Miao's R1 page says CYBERMAT has 15 coils in three charging sections, a supplied 45 W charger, an all-aluminum-alloy one-piece frame, and capacity for six devices. It specifically names iPhone, AirPods, wireless mice, and CYBERBOARD. The page does not give exterior size, mass, Qi version, per-zone wattage, or a coil diagram that can support exact layout work.^5

### R2

R2 changes the documented design from R1's 15 coils to 12 coils. The product page says it still supports six devices, with ten coils in the central area aimed at HATSU and able to power CYBERBOARD. It adds magnetic charging areas at both sides and includes a random-color global CYBERCHARGE 90 W GaN charger.^4

The R2 manual supplies the most useful exact geometry and electrical data:

| Field | Official value |
| --- | --- |
| External dimensions | 340 x 900 mm |
| Manual installation graphic | 323 mm marked depth, 883 mm marked width, 900 x 340 mm overall |
| Weight | 4.2 +/- 0.1 kg |
| Fabric pad | 2 mm thick |
| Input | 45 W, 15 V, 3 A |
| Magnetic single-coil output | 5 W |
| Multi-coil output | 11 W with two outputs, 7.5 W with one output |
| Supported protocol | Qi |
| Charging distance, including cloth | 3 to 6 mm |
| Conversion efficiency | at least 65% |
| Wireless charging frequency | 110 to 205 kHz |
| Simultaneous devices | Up to six Qi devices in four zones. Each multi-coil zone supports up to two devices. |
| Working temperature | -10 C to 60 C |
| Safety | overcurrent, overvoltage, undervoltage, overheat, short circuit, and foreign-object detection |

R2's four status lights map to the four charging zones. Charging is green breathing. Fault interpretation is also documented: yellow flashing covers overheating, overvoltage, undervoltage, and other faults, while red flashing marks FOD. The official manual's diagram is the only reviewed geometry beyond the external rectangle. It does not disclose coil centers, zone bounds, the precise shapes of the magnetic pads, cloth cutout radius, or a mechanical drawing.^7

### R3

R3 is a materially different construction, not merely a cosmetic R2. The official storefront describes a lightweight foldable silicone base and separate modules: one single-coil module and two five-coil modules, for 11 coils total. It charges up to five Qi devices. The left zone is a 15 W magnetic phone zone. The two central five-coil zones deliver 15 W to one device or up to 15 W shared by two devices in the same zone. The right side is intentionally left open for mouse movement. The set includes a 65 W power adapter.^6

| Field | Official R3 value |
| --- | --- |
| Fabric surface | 909 x 405 mm, 2 mm thick |
| Silicone base | 42 x 92 cm |
| Base-only weight | 2.4 kg |
| Input | 60 W, 20 V, 3 A |
| Single-coil output | 15 W |
| Five-coil module output | 15 W |
| Device capacity | Five Qi-enabled devices |
| Current official store state | $149.00, unavailable |

The R3 page says its surface is 17.65% larger than R2, yet its listed 909 x 405 mm fabric surface and R2's documented 900 x 340 mm overall dimensions do not yield that percentage when multiplied. This may compare a different usable area or component. Do not use the percentage to correct either published dimension.^6 ^7

### Compatibility matrix

| Device or requirement | R1 | R2 | R3 |
| --- | --- | --- | --- |
| Generic Qi device | Official page claims broad wireless-charging-device support. Exact Qi spec and zone limits unknown. | Yes. Manual says Qi, four zones, up to six devices. | Yes. Store says five Qi-enabled devices. |
| CYBERBOARD | Officially named. | Officially named as a central-area recipient. | A keyboard is mentioned as an example of the five-device setup, but no model list is given. |
| AM HATSU | Not named. Qi makes electrical compatibility plausible, but placement is unverified. | Officially supported. Ten central coils are described as specially designed for it. | Not named. Electrical Qi compatibility is plausible, but placement and charge behavior are unverified. |
| Magnetic phone alignment | Not documented in reviewed R1 text. | Product page says both sides have magnetic charging areas. Power is 5 W in the manual's magnetic single-coil zone. | One 15 W left magnetic zone, described as MagSafe compatible. |
| Exact reusable coil layout | No | No | No |

## CYBERBOARD R2

### What the R2/R3 manual confirms

The official R2/R3 manual calls the product "CYBERBOARD" and documents shared hardware and controls. It confirms a 10-degree typing incline, gasket mount, hot-swappable switch mounting, N-key rollover, USB 2.0 Type-C with C-to-C support, BLE 5.0, two 5,000 mAh lithium batteries, 5 W Qi wireless charging, 256 LED colors, and maximum power consumption of 8 W.^8

The charging rule has a useful behavioral detail. The manual says Qi charging turns on when charge is below 85% and turns off when the keyboard is full. It does not name a mat generation or prescribe the orientation on CYBERMAT. That is separate from R2's product-page claim of CYBERMAT compatibility.^4 ^8

### RGB panel and display geometry

The manual's LED count is exact: a 5 x 40 dynamic dot matrix, or 200 screen LEDs, plus 81 in-switch LEDs. The official product page calls R2's panel upgraded hardware with 256-level DC dimming, higher refresh rate, more DIY lighting slots, and richer color reproduction. It does not publish panel width, height, LED pitch, refresh rate in hertz, LED controller part number, colour space, or panel orientation dimensions. A faithful implementation can use a **40-column by 5-row** programmable RGB matrix. It should not claim real-world millimeter dimensions for that matrix.^8 ^9

The current store FAQ describes the general CYBERBOARD matrix as an independently controlled, programmable panel for pixel-art animation and layered RGB effects. That is a current family-level description; the R2 manual is the stronger source for R2's 200-LED count.^10

### R2 controls

| Control | Effect documented by the R2/R3 manual |
| --- | --- |
| Hold Fn + Esc for 3 seconds | Keyboard on or off |
| Fn + F9 | Toggle PCB lighting |
| Fn + F10 | Toggle LED panel |
| Fn + F11 | Change PCB lighting effect |
| Fn + F12 | Change LED effect. Its last effect is battery status. |
| Fn + Up / Down | Increase / decrease panel brightness |
| Fn + Right / Left | Increase / decrease panel animation speed |
| Fn + `=` / `-` | Increase / decrease PCB brightness |
| Hold Fn + 1 / 2 / 3 for 5 seconds in Bluetooth mode | Pair host 1 / 2 / 3 |
| Fn + 1 / 2 / 3 | Switch connected host |
| Bluetooth idle for 15 minutes | Panel switches off while Bluetooth stays connected; any key wakes it |
| Fn + R for 5 seconds | Factory reset |

For R2/R3, the older DIY workflow is explicit: edit lighting and keys at `diy.angrymiao.com`, generate and download a config file, then use the Angry Miao Loader on Windows to import `PROFILE.json` while the keyboard is connected by USB. The manual allows sharing those configuration files. It does not publish a JSON schema, HID command set, REST API, or license that would make the effect protocol open for reuse.^8

### R2 materials and visible variants

The official R2 landing page identifies Le Smoking R2 as a gasket-mount board with four plate choices: black aluminum default, brushed brass, Golden Black FR-4, and 1.5 mm translucent PC. It names Jet Black and Psychedelic finish options. The current store's retained R2 product record contains Jet Black, Meteor Grey, and Psychedelic, each as a Bundle or a Base Kit without keycaps and switches. This may represent later inventory rather than the original launch offer.^9 ^11

| Current retained official R2 variant | API availability | Price | Store reference price |
| --- | ---: | ---: | ---: |
| Jet Black / Bundle | false | $799.00 | $850.00 |
| Jet Black / Base Kit, no keycap and switch | false | $599.00 | $670.00 |
| Meteor Grey / Bundle | false | $735.64 | $735.64 |
| Meteor Grey / Base Kit, no keycap and switch | false | $660.00 | $670.00 |
| Psychedelic / Bundle | false | $799.00 | $826.00 |
| Psychedelic / Base Kit, no keycap and switch | false | $635.00 | $665.00 |

The R2 product record therefore establishes a current catalog record, not availability. The $599 to $799 range in the collection is consistent with the retained variant data. It is not evidence that any R2 can be added to cart today.^11 ^12

### Geometry and CAD limitations

No reviewed official R2 source publishes case length, width, front/rear height, corner radii, screw positions, switch center coordinates, display-panel physical dimensions, plate outline, or a STEP, STL, DXF, DWG, or other CAD download. The R2/R3 manual contains disassembly information and calls out three PCBs: keyboard, USB, and LED. That is useful component structure, but it is not a mechanical drawing.^8

For a visually close but honest representation:

- Use a 40 x 5 pixel RGB array for the top matrix and 81 RGB switch lights.
- Use the specified 10-degree typing incline only as an angle, without inventing total height.
- Offer the documented Fn controls, panel/PCB brightness, speed, and host switching.
- Treat the case silhouette, plate shape, display area in millimeters, and any 3D asset as an original approximation until a licensed, dimensioned source appears.

## Related premium Angry Miao boards

The current official catalog still contains several high-price CYBERBOARD products. They matter as visual and product-data references, but their presence does not transfer R2 controls, geometry, or LED counts to another revision.

| Board | Current official store variants and state on 2026-09-08 | Reuse notes |
| --- | --- | --- |
| CYBERBOARD R4 Graffiti | Paisley Bundle is `available: true` at $899, with $830 compare-at. Paisley Base Kit, Bebop Bundle, and Bebop Base Kit are unavailable at $699, $799, and $699 respectively. | The availability flag conflicts with the rendered product page's "Sold Out" notification copy. Do not promise purchase availability without a cart check. |
| CYBERBOARD R4 | Seven listed variants, all unavailable. Prices range from $545 to $745. | Current FAQ says the family has a three-stage adjustable leaf-spring mount and RGB, but R4 is not evidence for R2's gasket mount or exact lighting hardware. |
| CYBERBOARD R3, Inspired by Wes Anderson | Eight listed variants, all unavailable. $539 to $780. | Shared R2/R3 manual supports control reuse only where the manual is explicit. |
| CYBERBOARD Glacier R2 | Bundle $850 and Base Kit $650, both unavailable. | Official landing page describes translucent PC body, adjustable leaf-spring mount, hot-swap RGB PCB, and white internal parts. It is a distinct construction from Le Smoking R2. |
| CYBERBOARD Terminal | Engraved bundle $810 and base kit $528, both unavailable. | AM Master's support page treats Terminal as supported beside R2 and newer devices. |
| CYBERBOARD Novel projects | Gold Paisley, Eclipse, Euphoria, and Wukong entries remain in the catalog, all unavailable, at $659 to $999 depending on variant. | Treat them as editions and inventory records. No reviewed source establishes shared CAD. |
| AM Relic 80 | Chalk White $660 and RAW $699, both `available: true`. | It is a current premium Angry Miao board but has no bearing on HATSU split geometry or CYBERBOARD panel hardware. |

The catalog's prices are current product-record observations. Compare-at data on the R4 Graffiti records are sometimes below the selling price, so it clearly cannot be read as a universal "previous price." That is why this report preserves the raw field as a store reference price rather than calling it a discount history.^12

## Software, customization, and reusable assets

Angry Miao's current software page says AM Master supports CYBERBOARD R2, Terminal, and newer; AM HATSU; and several other products. It excludes CYBERBOARD R1, Xmas, and Glacier R1, directing them to legacy software. AM Master detects compatible devices connected by cable, reports firmware, can update firmware, and can apply keyboard custom-configuration JSON files.^13

This provides good evidence for a **user-facing customization concept**: cable-connected setup, firmware status, saved configurations, keymaps, and lighting presets. It does not provide permission or a protocol for cloning the software. The pages reviewed do not publish source code, a developer SDK, an API description, a JSON schema, a CAD package, or a public 3D asset pack.

| Asset or data type | Official evidence found | Safe reuse conclusion |
| --- | --- | --- |
| Product photography and renders | Official product pages contain image assets and explicitly warn that renders are for reference and actual products prevail. | Use as inspiration or linked reference. Do not trace into "exact" geometry. Obtain permission before redistributing. |
| HATSU layout behavior | Manual documents two layers and customization limits. | Recreate the interaction behavior, not undocumented legends or physical coordinates. |
| R2/R3 lighting profiles | Manual describes generated `PROFILE.json` imported by Loader; AM Master accepts JSON configurations. | A configuration-import flow is supported. Format, schema, compatibility, and redistribution rights are unknown. |
| R2 5 x 40 pixel matrix | R2/R3 manual provides LED count. | Recreate a 40 by 5 abstract grid. Pixel spacing and artwork assets are unknown. |
| CAD / 3D mechanical model | No official download found in the researched source set. | Treat as unavailable. |

## Recommended implementation boundaries

For a keyboard catalog or configurator, HATSU is strong material for a wireless split ergonomics interaction. It should use the documented split 4 x 6 concept, three Bluetooth host slots, two key layers, white key lighting, side-strip battery feedback, Qi charging, and a clear note that the physical case is an approximation. CYBERMAT R2 can be a precise 900 x 340 mm rectangular product with a 2 mm surface pad, four status zones, and documented charge/fault indicators. Its coil placement should remain abstract.

CYBERBOARD R2 is strong material for a 40 x 5 programmable matrix demo. It has a better-defined control model than physical case geometry: panel toggle, PCB toggle, effect switching, brightness, animation speed, host selection, battery view, and 15-minute panel sleep. Do not present a screenshot, generated mesh, or SVG as an official R2 CAD reconstruction.

## Sources

1. Angry Miao. [AM HATSU product page](https://store.angrymiao.com/products/am-hatsu). Accessed 2026-09-08. Also see [official HATSU product page](https://www.angrymiao.com/en/am-hatsu/).
2. Angry Miao. [AM HATSU User Manual PDF](https://cdn-www.angrymiao.com/pdf/AMHATSUUserManual%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf). Accessed 2026-09-08.
3. Angry Miao. [AM HATSU machine-readable store record](https://store.angrymiao.com/products/am-hatsu.js) and [AM HATSU BATTLESHIP machine-readable store record](https://store.angrymiao.com/products/am-hatsu-battleship.js). Accessed 2026-09-08.
4. Angry Miao. [CYBERMAT R2 product page](https://www.angrymiao.com/cybermat-r2/). Accessed 2026-09-08.
5. Angry Miao. [CYBERMAT R1 product page](https://www.angrymiao.com/cybermat/?p=0). Accessed 2026-09-08.
6. Angry Miao. [CYBERMAT R3 product page](https://store.angrymiao.com/products/cybermat-r3-wireless-charging-mat) and [machine-readable store record](https://store.angrymiao.com/products/cybermat-r3-wireless-charging-mat.js). Accessed 2026-09-08.
7. Angry Miao. [CYBERMAT R2 User Manual PDF](https://cdn-official.angrymiao.com/cybermat_r2/CYBERMAT_R2.pdf). Accessed 2026-09-08.
8. Angry Miao. [CYBERBOARD R2 and R3 User Manual PDF](https://cdn-official.angrymiao.com/pdf/CYBERBOARD_R2%26R3%20User%20Manual%20%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf). Accessed 2026-09-08.
9. Angry Miao. [CYBERBOARD R2 Le Smoking product page](https://www.angrymiao.com/cyberboard-r2/). Accessed 2026-09-08.
10. Angry Miao. [CYBERBOARD collection and FAQ](https://store.angrymiao.com/collections/cyberboard-collection). Accessed 2026-09-08.
11. Angry Miao. [CYBERBOARD R2 product page](https://store.angrymiao.com/products/cyberboard-r2-1) and [machine-readable variant record](https://store.angrymiao.com/products/cyberboard-r2-1.js). Accessed 2026-09-08.
12. Angry Miao. [Current product feed](https://store.angrymiao.com/products.json?limit=250), [CYBERBOARD R4 Graffiti record](https://store.angrymiao.com/products/am-cyberboard-r4-graffiti.js), and [CYBERBOARD collection](https://store.angrymiao.com/collections/cyberboard-collection). Accessed 2026-09-08.
13. Angry Miao. [AM Master software page](https://store.angrymiao.com/pages/software). Accessed 2026-09-08.

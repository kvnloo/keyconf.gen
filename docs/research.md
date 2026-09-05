# Keyboard catalog research

Research snapshot: September 5, 2026. Prepared for the Keyconf builder. This is a source-backed starting catalog and architecture assessment, not an exhaustive inventory of every keyboard.

## Decision

Build our own evidence catalog, importing from several sources. No reviewed source provides all retail parts, exact mechanical compatibility, licensed 3D geometry, calibrated materials, and exact-build sound. Start with SQLite for reproducible research and review. Use PostgreSQL when a deployed service needs concurrent import workers, reviewers, accounts, and saved builds. Keep large assets in object storage.

The locally generated `data/keyboards.sqlite` is a real research database. It contains 7,267 firmware-definition records and 9,047 QMK layouts, plus 20 curated product seeds, 24 claims and 15 popularity observations. Raw upstream payloads remain local while dataset redistribution rights are reviewed; the public repository contains the schema, curated seeds, provenance, and rebuild script. `data/summary.json` contains verified row counts. Product seeds and popularity observations are separate from QMK/VIA firmware records. They must stay separate during deduplication.

## Existing databases and APIs

| Source | What we found | What it does not establish |
|---|---|---|
| [KeebFinder](https://keeb-finder.com/keyboards) | 2,207 keyboard listings in the inspected snapshot. Related category pages showed 1,620 keycap sets and 1,060 switches. | No documented public API, bulk export permission, or audited unique-product count found. Contact for a data partnership. |
| [QMK API](https://github.com/qmk/qmk_api/blob/master/docs/keyboard_api.md) | Bulk firmware-target metadata with named layouts, key positions and identifiers. Live inventory retrieved. | Not a retail catalog. Revisions, aliases, custom boards and firmware targets are not unique buyable products. |
| [VIA definitions](https://github.com/the-via/keyboards) | JSON definitions and USB/layout identity. Recursive Git tree retrieved at a pinned SHA. | Older/newer definitions overlap. Compatibility with VIA is not mechanical compatibility. |
| [SwitchDB](https://github.com/skwee357/switchdb) | GPL-3.0 TypeScript switch data and a reusable domain schema. | Freshness and complete item count not audited. |
| [ThereminGoat force curves](https://github.com/ThereminGoat/force-curves) | Downloadable measurements and plots; valuable for force/travel characterization. | Bulk reuse rights not established in this pass. Force curves are not sound recordings. |
| [SwitchesDB](https://github.com/heralden/switchesdb) | Aggregation of multiple force-curve datasets with CSV-generation tooling. | Underlying data rights must be reviewed independently of code. |
| [kbd.news switch database](https://kbd.news/switch/) | Hundreds of models, specs, vendor links, and periodic sales-derived rankings. | Public count descriptions differed, around 500 versus 550+. No public bulk API/license found. |
| [KeebDepot](https://keebdepot.com/) | Inspected page reports 368 keyboards, 199 switches, 71 keycap sets, 22 stabilizers. | Its popularity label reflects views/search activity, not retail unit sales. No bulk license established. |
| [KeebScout](https://keebscout.com/) | Reports 502 keyboards and 227 switches. | Self-reported coverage; no audited API or data license found. |
| [KeebTracker](https://keebtracker.org/) | Reports 342 items, including 300 switches, across 12 vendors. | Community inventory and stock signals, not authoritative physical fit. |

These are observed snapshots, not guarantees of current totals. Public visibility does not establish permission to republish a complete database. Our initial bulk import uses the QMK/VIA source inventories; other sites are research references and partnership candidates.

## What is popular now

Competitive-gaming usage has better public evidence than general consumer keyboard sales. The parent-agent retrieval of [ProSettings' VALORANT dataset](https://prosettings.net/guides/valorant-keyboard/) showed **694 tracked players**: Wooting 60HE+ 126, 60HE V2 113, Razer Huntsman V3 Pro TKL 99, Wooting 80HE 56, Huntsman V3 Pro Mini 42. An earlier retrieval showed a different population of 692. Store the retrieval time and denominator; do not combine those snapshots. These are tracked professional players, not global market share.

For switches, [kbd.news' July 2026 report](https://kbd.news/Best-selling-keyboard-switches-of-July-2026-2895.html), published August 6, aggregates 20 contributors representing roughly 600,000 switches. Its ranking weights appearance across multiple stores, so it is not a simple all-market unit-sales table. The reported top ten are:

1. Keygeek Y2
2. Sillyworks × Gateron Type R
3. Keygeek Blue Cheese V2
4. TTC Frozen V2 Silent
5. HMX Yogurt S
6. Gateron Oil King
7. TTC Bluish White V2 Silent
8. Huano Sakura V2
9. Gateron Milky Yellow Pro
10. Akko Cream Yellow Pro V5

No defensible broad case-sales ranking was found. Tofu60 Redux, Bakeneko60 and other documented ecosystems are useful initial compatibility targets, not proven most-popular cases. Keep sales rank, tracked pro use, click popularity, editorial recommendation, stock, and group-buy activity as different metric types.

## Switch taxonomy

| Sensing / construction | Examples | What the catalog must distinguish |
|---|---|---|
| Electrical contact | [CHERRY MX families](https://www.cherry.de/en-gb/products/switches/mx-standard) | Linear, tactile and clicky describe feel; silent is another attribute. Record contact footprint, pins, travel and separate force measurements. |
| Electrocapacitive | [Topre / HHKB](https://hhkeyboard.us/about/history) | Rubber dome and conical spring with capacitance sensing. Do not conflate with MX or assume adjustable actuation. Keycap interface needs explicit evidence. |
| Hall-effect magnetic | [Wooting 80HE](https://wooting.io/wooting-80he) | Sensor, magnet polarity/geometry, board calibration, revision and firmware support. An MX-style cap stem does not establish electrical compatibility. |
| TMR magnetic | [Akko 5075 V5 TMR](https://en.akkogear.com/product/5075-v5-tmr-magnetic-switch-keyboard/) | TMR is a sensor technology. This particular PCB claims both magnetic and 5-pin contact-switch support. Rules must permit explicit mixed-sensing boards. |
| Optical, digital or analog | [Razer analog optical Gen-2](https://www.razer.com/newsroom/product-news/razer-analog-optical-switches-gen-2) | Optical does not automatically mean analog. Track continuous position output, adjustable actuation and dynamic reset separately. |
| Low-profile formats | [Kailh Choc V2](https://www.kailh.net/products/kailh-choc-v2-low-profile-switch-set), [Razer low-profile analog optical](https://www.razer.com/newsroom/product-news/huntsman-v3-pro-low-profile-tenkeyless-8khz) | Low-profile is a geometry axis independent of sensing. Footprint, stem, housing clearance, pitch and stabilizer offsets matter. |

[Akko's polarity FAQ](https://en.akkogear.com/faq/compatible-magnetic-switches-for-akko-magnetic-keyboards/) documents model-specific magnetic switch restrictions. A generic "HE-compatible" field is insufficient. Preserve ambiguous vendor terminology and contradictory force/lubrication claims for review rather than silently normalizing them.

## Gaming performance

An 8 kHz report interval is **0.125 ms** by arithmetic. It is not total finger-to-screen latency. The full path includes key travel, sensing, scanning, filtering/debounce, firmware, USB/wireless delivery, OS/game scheduling and display presentation. [Wooting's engineering explanation](https://wooting.io/zh-CN/post/wooting-80he-the-true-polling-rate) distinguishes scanning from USB polling.

[RTINGS' latency method](https://www.rtings.com/keyboard/tests/latency) measures from solenoid/keycap contact to intercepted USB transmission; it excludes game and display latency. Its public method page and the current 80HE review show different test-bench versions. The [80HE review](https://www.rtings.com/keyboard/reviews/wooting/80he) verifies effective 8 kHz with Tachyon enabled, but the exact numeric latency results were inaccessible in this research. They have not been invented or imported.

Store polling per connection and output interface, scan scope/rate, firmware version, press/release delay, debounce/filter type, start/end measurement events, test apparatus and sample distribution. [QMK's debounce documentation](https://docs.qmk.fm/feature_debounce_type) includes eager and deferred methods, so "all mechanical keyboards add 5 ms" is false.

Keep adjustable actuation, Rapid Trigger, continuous analog output, dual-stage actions, and SOCD priority separate. [Valve's input-automation notice](https://store.steampowered.com/news/posts/?appids=730&enddate=1724103958&feed=steam_community_announcements) concerns particular automation features, not every magnetic switch. Game and tournament rules need their own dated records and rechecking.

## Compatibility and visual fidelity

A manufacturer-named assembly is stronger evidence than shared labels. The [Tofu60 Redux plate](https://kbdfans.com/products/tofu60-redux-plate) explicitly excludes Durock and Typeplus × YIKB screw-in stabilizers. The [Bakeneko guide](https://docs.cannonkeys.com/bakeneko/) explains screw-in interference with its O-ring mount. These are concrete examples for conditional compatibility rules.

For each revision, capture case/PCB outlines, screw/standoff positions, mounting method, plate cutouts, daughterboard connector and cable, switch orientation, stabilizer clearance, layout key widths and cap row inventory. "Unknown" must remain distinct from "compatible".

[Keychron's hardware repository](https://github.com/Keychron/Keychron-Keyboards-Hardware-Design) is a promising CAD source with source-available restrictions and uneven file coverage. [CannonKeys resources](https://docs.cannonkeys.com/resources/) license PCB STEP files under CC BY 4.0 but plate files under CC BY-NC-ND 4.0. Asset rights belong to individual files. The current app uses original Blender studies instead of redistributing these assets.

## Sound

Existing examples such as [Mechvibes](https://github.com/hainguyents13/mechvibes/wiki/Config-Versions) map keys to recorded samples. We found no validated general library that predicts arbitrary completed-keyboard sound from material and keycap inputs. This is a bounded search result, not proof none exists.

Use three explicit levels: licensed recording of this build; recording of a named similar build; synthesized approximation. Capture key-down/up separately with repeated takes and special handling for stabilized keys. Store the owner/license, build revision, microphone/distance, desk/mat, room, and processing. [Kinetic Labs' recording guide](https://kineticlabs.com/blog/tips-for-recording-a-good-keyboard-typing-sound-test) explains why recording conditions matter. [Taeha Types](https://www.taehatypes.com/) is a craft/reference source; no audio reuse permission was obtained.

The [dedicated audio research](audio-research.md) extends this into a current engine/library comparison, a reference capture protocol, headphone playback requirements, and a measured-model validation plan.

## Data architecture

The SQLite schema separates sources, products, revisions, specs, firmware targets, layouts, compatibility, offers/observations, popularity and assets. Every imported claim points to evidence. Offer history preserves currency, region, pack quantity and observation time instead of overwriting a product's universal "price".

Ingestion should run as `URL → source adapter → immutable response snapshot → parsed variants/offers → reviewable claims → accepted catalog revision`. Use official vendor APIs first, [JSON-LD ProductGroup](https://developers.google.com/search/docs/appearance/structured-data/product-variants) second, and maintained website-specific extractors when needed. [Shopify Storefront](https://shopify.dev/docs/api/storefront/latest) provides cursor-paginated catalog access; a preview of the first page is not a full import.

SQLite is appropriate for this research catalog. [SQLite's deployment guidance](https://www.sqlite.org/whentouse.html) and [WAL documentation](https://www.sqlite.org/wal.html) distinguish read concurrency from the single-writer limit. PostgreSQL becomes useful for concurrent import/review workers and production accounts. [JSONB](https://www.postgresql.org/docs/current/datatype-json.html) can retain vendor payloads, while fit-critical fields remain typed and indexed.

Next coverage priorities are manufacturer-authorized CAD/material scans, exact keycap inventories, revision-specific magnetic-switch compatibility, licensed standardized sound sessions, and contracted retail feeds. Further general searching will not replace those data agreements or measurements.

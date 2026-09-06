# First documented knob host

Reviewed September 6, 2026. This is implementation evidence, not a claim that
installed knob geometry is already available in the studio.

## Manufacturer references

[Keychron aluminum knob](https://www.keychron.com/products/keychron-aluminum-knob)
explicitly includes knob-version Q Max boards among its supported families.
The listed outer diameter is 16 mm, inner diameter 13 mm and height 14 mm.
The [Q1 Max listing](https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard)
offers assembled and barebone knob versions. These statements support a
replacement cap on the stock knob assembly. They do not document mounting an
Adafruit encoder or display on that PCB. The 13 mm inner cavity measurement is
not a documented encoder shaft diameter.

The knob page links a [manufacturer STEP reference](https://cdn.shopify.com/s/files/1/0059/0630/1017/files/Keychron_Aluminum_Knob_3D_File.stp?v=1672710755).
Its header dates the file to January 3, 2023 and names a Q1 Pro assembly. Do not
present it as a scan of every current Q Max product or silently import all of
its bodies as one replacement cap.

## CAD inspection

The downloaded reference is 677,659 bytes, SHA-256
`efaca83434082b06d5002b04bca1c4677b3b0fbc59a3a0252c7a514b5688032e`.
`scripts/inspect_step.py` imports STEP in millimeters and measures solid geometry
with OCCT AddOptimal, triangulation disabled. This avoids the larger bounds that
can result from measuring cached display tessellation. CadQuery 2.8.0 reports
three valid solids. The first measures 16 × 16 × 14 mm within 0.00001 mm of the
listed dimensions. Visual inspection identifies it as the outer cylindrical
cap. The other two bodies must not be treated as part of that cap's envelope.

The factual measurement report is in
`docs/reference-assets/keychron-knob-inspection.json`. The manufacturer CAD file
is not redistributed in the repository. For reproduction, download the linked
reference, install `cadquery==2.8.0` in an isolated Python environment, and run:

```sh
python scripts/inspect_step.py /path/to/Keychron_Aluminum_Knob_3D_File.stp
```

## Layout and integration boundary

Keychron's [Q1 Max ANSI encoder layout](https://github.com/Keychron/qmk_firmware/blob/9ada9b7baecb9591c469b9b068146ac5891a480a/keyboards/keychron/q1_max/ansi_encoder/keyboard.json)
defines `LAYOUT_ansi_82` with 82 matrix positions. The top row's rightmost
position is x=15.25, y=0, matrix [0,14]. Its
[default keymap](https://github.com/Keychron/qmk_firmware/blob/9ada9b7baecb9591c469b9b068146ac5891a480a/keyboards/keychron/q1_max/ansi_encoder/keymaps/default/keymap.c)
maps that position to mute. The parent
[board definition](https://github.com/Keychron/qmk_firmware/blob/9ada9b7baecb9591c469b9b068146ac5891a480a/keyboards/keychron/q1_max/info.json)
documents a rotary encoder on B14/B15. Combined with the knob-version product
listing, this supports treating that position as the stock knob control rather
than a normal keycap. The positions include function-row spacing absent from
the current generic model.

The studio's current 75% model has 83 keycaps. Replacing its End key with a knob
would retain the wrong layout. Implement an explicit Q1 Max ANSI visual adapter
from the documented coordinates before showing the replacement as installed.
Keep board geometry, switch positions and artisan placement targets consistent.

Resolve this host only for the matching Q1 Max case/PCB/plate and 75% layout.
A documented stock-knob slot can confirm cap mounting and clearance; it must
not confer encoder electrical or firmware support on unrelated modules. Mixed
assemblies return to unknown fit. Duplicate occupants exceed the slot capacity.
Keep the same assessment in editor, shared preview and private revision evidence.
Exact case geometry, cap finish variants and any other board host remain separate
work; firmware coordinates alone do not prove enclosure clearances.

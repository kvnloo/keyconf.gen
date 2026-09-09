"""Generate CAD twins from published millimetres or licensed STEP.

Run in an isolated environment with CadQuery installed, same as
scripts/inspect_step.py. STEP lengths are millimetres. Photo-only products
stay unmodeled; this script will not ingest images.

Usage:
  python scripts/cad_twin.py knob
  python scripts/cad_twin.py plate --layout docs/reference-assets/keychron-q1-max-layout.json
  python scripts/cad_twin.py step path/to/licensed.step --name plate
"""

from __future__ import annotations

import argparse
import hashlib
import json
import struct
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAD_DIR = ROOT / "public" / "models" / "cad"
UNIT_MM = 19.05
MX_HOLE_MM = 14
PLATE_THICKNESS_MM = 1.5
KNOB_OD_MM = 16
KNOB_ID_MM = 13
KNOB_HEIGHT_MM = 14


def require_cadquery():
    try:
        import cadquery as cq
    except ImportError as error:
        raise SystemExit(
            "CadQuery is required. Install it in an isolated environment "
            "and rerun this generator."
        ) from error
    return cq


def write_glb(path: Path, name: str, vertices, triangles) -> None:
    # CadQuery models Z-up in millimetres; glTF is Y-up in scene units. The
    # -90 degree turn about X keeps the winding, so the faces stay outward.
    positions = [
        coord / UNIT_MM for x, y, z in vertices for coord in (x, z, -y)
    ]
    indices = [index for triangle in triangles for index in triangle]
    position_bytes = struct.pack(f"<{len(positions)}f", *positions)
    index_bytes = struct.pack(f"<{len(indices)}H", *indices)
    while len(position_bytes) % 4:
        position_bytes += b"\x00"
    while len(index_bytes) % 4:
        index_bytes += b"\x00"
    binary = position_bytes + index_bytes
    gltf = {
        "asset": {"version": "2.0", "generator": "keyconf cad_twin.py"},
        "buffers": [{"byteLength": len(binary)}],
        "bufferViews": [
            {
                "buffer": 0,
                "byteOffset": 0,
                "byteLength": len(position_bytes),
                "target": 34962,
            },
            {
                "buffer": 0,
                "byteOffset": len(position_bytes),
                "byteLength": len(index_bytes),
                "target": 34963,
            },
        ],
        "accessors": [
            {
                "bufferView": 0,
                "componentType": 5126,
                "count": len(vertices),
                "type": "VEC3",
                "min": [min(positions[i::3]) for i in range(3)],
                "max": [max(positions[i::3]) for i in range(3)],
            },
            {
                "bufferView": 1,
                "componentType": 5123,
                "count": len(indices),
                "type": "SCALAR",
            },
        ],
        "meshes": [
            {
                "name": name,
                "primitives": [{"attributes": {"POSITION": 0}, "indices": 1}],
            }
        ],
        "nodes": [{"name": name, "mesh": 0}],
        "scenes": [{"nodes": [0]}],
        "scene": 0,
    }
    json_bytes = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
    while len(json_bytes) % 4:
        json_bytes += b" "
    chunks = (
        struct.pack("<I", len(json_bytes))
        + b"JSON"
        + json_bytes
        + struct.pack("<I", len(binary))
        + b"BIN\x00"
        + binary
    )
    header = b"glTF" + struct.pack("<II", 2, 12 + len(chunks))
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(header + chunks)


def export_solid(cq, solid, name: str, stem: str) -> dict:
    CAD_DIR.mkdir(parents=True, exist_ok=True)
    step_path = CAD_DIR / f"{stem}.step"
    glb_path = CAD_DIR / f"{stem}.glb"
    cq.exporters.export(solid, str(step_path))
    vertices, triangles = solid.val().tessellate(0.08)
    write_glb(glb_path, name, vertices, triangles)
    sha256 = hashlib.sha256(step_path.read_bytes()).hexdigest()
    glb_sha256 = hashlib.sha256(glb_path.read_bytes()).hexdigest()
    glb_relative = glb_path.relative_to(ROOT).as_posix()
    bbox = solid.val().BoundingBox()
    return {
        "name": name,
        "step": step_path.relative_to(ROOT).as_posix(),
        "glb": glb_relative,
        "sha256": sha256,
        "glb_sha256": glb_sha256,
        # Paste onto the CadPart in docs/reference-assets/cad-revisions.json.
        "scene": {"glb": glb_relative, "sha256": glb_sha256},
        "units": "mm",
        "bounds_mm": {"size": [bbox.xlen, bbox.ylen, bbox.zlen]},
    }


def build_knob(cq):
    return (
        cq.Workplane("XY")
        .circle(KNOB_OD_MM / 2)
        .circle(KNOB_ID_MM / 2)
        .extrude(KNOB_HEIGHT_MM)
    )


def build_plate(cq, layout_path: Path):
    layout = json.loads(layout_path.read_text())
    keys = [
        key for key in layout["keys"] if key.get("kind", "keycap") == "keycap"
    ]
    width = layout["bounds"]["width"] * UNIT_MM
    height = layout["bounds"]["height"] * UNIT_MM
    points = [(key["x"] * UNIT_MM, key["y"] * UNIT_MM) for key in keys]
    return (
        cq.Workplane("XY")
        .box(width, height, PLATE_THICKNESS_MM)
        .faces(">Z")
        .workplane()
        .pushPoints(points)
        .hole(MX_HOLE_MM)
    )


def import_step(cq, path: Path):
    model = cq.importers.importStep(str(path))
    solids = model.solids()
    if not solids.vals():
        raise ValueError(f"{path} contains no solid bodies")
    return solids


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("knob")
    plate = sub.add_parser("plate")
    plate.add_argument("--layout", type=Path, required=True)
    licensed = sub.add_parser("step")
    licensed.add_argument("file", type=Path)
    licensed.add_argument("--name", required=True)
    args = parser.parse_args(argv)
    cq = require_cadquery()
    if args.command == "knob":
        report = export_solid(
            cq, build_knob(cq), "control_dial", "keychron-aluminum-knob"
        )
    elif args.command == "plate":
        report = export_solid(
            cq,
            build_plate(cq, args.layout),
            "plate",
            args.layout.stem.replace("-layout", "") + "-plate",
        )
    else:
        report = export_solid(
            cq, import_step(cq, args.file), args.name, args.file.stem
        )
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

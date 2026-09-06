"""Inspect manufacturer STEP references before adapting them for the studio.

Run in an isolated environment with CadQuery installed. STEP lengths are imported
in millimeters by CadQuery. This reports geometry, not product compatibility.
"""

import argparse
import hashlib
import json
from pathlib import Path

import cadquery as cq
from OCP.Bnd import Bnd_Box
from OCP.BRepBndLib import BRepBndLib


def inspect(path: Path):
    model = cq.importers.importStep(str(path))
    solids = model.solids().vals()
    if not solids:
        raise ValueError("The reference contains no solid bodies")
    result = []
    for index, solid in enumerate(solids):
        bounds = Bnd_Box()
        BRepBndLib.AddOptimal_s(solid.wrapped, bounds, False, False)
        xmin, ymin, zmin, xmax, ymax, zmax = bounds.Get()
        center = solid.Center()
        result.append({
            "index": index,
            "valid": solid.isValid(),
            "bounds_mm": {
                "min": [xmin, ymin, zmin],
                "max": [xmax, ymax, zmax],
                "size": [xmax - xmin, ymax - ymin, zmax - zmin],
            },
            "center_mm": [center.x, center.y, center.z],
            "volume_mm3": solid.Volume(),
            "face_count": len(solid.Faces()),
        })
    return {
        "file": path.name,
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "cadquery_version": cq.__version__,
        "units": "mm",
        "bounds_method": "OCCT AddOptimal, triangulation disabled",
        "solid_count": len(result),
        "solids": result,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path)
    args = parser.parse_args()
    print(json.dumps(inspect(args.file), indent=2))

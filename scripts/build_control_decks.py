"""Original illustrative control decks, reconstructed from cited visual references.

Run with /tmp/keyconf-blender/bin/python scripts/build_control_decks.py.
Coordinates use approximate key units, not manufacturer dimensions or CAD.
Source references and geometry limits: docs/control-deck-references.md.
"""
import math
from pathlib import Path

import bpy

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "models"


def material(name, color, metal=0, roughness=.35, emission=0, alpha=1):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, alpha)
    mat.use_nodes = True
    node = mat.node_tree.nodes.get("Principled BSDF")
    node.inputs["Base Color"].default_value = (*color, alpha)
    node.inputs["Metallic"].default_value = metal
    node.inputs["Roughness"].default_value = roughness
    node.inputs["Alpha"].default_value = alpha
    if emission:
        node.inputs["Emission Color"].default_value = (*color, 1)
        node.inputs["Emission Strength"].default_value = emission
    return mat


def group(name, location=(0, 0, 0), parent=None):
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.parent = parent
    return obj


def finish(obj, name, mat, parent=None, bevel=0):
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = parent
    if bevel:
        mod = obj.modifiers.new("Machined edge", "BEVEL")
        mod.width = bevel
        mod.segments = 4
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier=mod.name)
    for polygon in obj.data.polygons:
        polygon.use_smooth = True
    return obj


def box(name, size, location, mat, parent=None, bevel=.06):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(obj, name, mat, parent, bevel)


def cylinder(name, radius, depth, location, mat, parent=None, vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius,
                                      depth=depth, location=location)
    return finish(bpy.context.object, name, mat, parent, .015)


def label(name, text, location, size, mat, parent=None):
    curve = bpy.data.curves.new(name, "FONT")
    curve.body = text
    curve.align_x = "CENTER"
    curve.align_y = "CENTER"
    curve.size = size
    curve.extrude = .0002
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.parent = parent
    obj.data.materials.append(mat)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.convert(target="MESH")
    obj.select_set(False)


def rounded_outline(width, height, radius, z):
    vertices = []
    for cx, cy, start in [(width/2-radius, height/2-radius, 0),
                          (-width/2+radius, height/2-radius, 90),
                          (-width/2+radius, -height/2+radius, 180),
                          (width/2-radius, -height/2+radius, 270)]:
        for step in range(7):
            angle = math.radians(start + step * 90/6)
            vertices.append((cx + radius*math.cos(angle),
                             cy + radius*math.sin(angle), z))
    return vertices


def cap(width, mat, parent, low=False):
    height = .25 if low else .47
    rings = [rounded_outline(width-.10, .90, .12, 0),
             rounded_outline(width-.10, .90, .14, .07),
             rounded_outline(width-.18, .82, .16, height),
             rounded_outline(width-.36, .64, .16, height+.015),
             rounded_outline(width-.54, .44, .14, height-.04)]
    n = len(rings[0])
    vertices = [point for ring in rings for point in ring]
    faces = []
    for layer in range(len(rings)-1):
        for j in range(n):
            faces.append((layer*n+j, layer*n+(j+1)%n,
                          (layer+1)*n+(j+1)%n, (layer+1)*n+j))
    faces.append(tuple(range((len(rings)-1)*n, len(rings)*n)))
    mesh = bpy.data.meshes.new("Dished keycap")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new("cap", mesh)
    bpy.context.collection.objects.link(obj)
    finish(obj, "cap", mat, parent)
    return height


def wire(points, radius, mat):
    curve = bpy.data.curves.new("Cable", "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = 3
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points)-1)
    for node, point in zip(spline.bezier_points, points):
        node.co = point
        node.handle_left_type = node.handle_right_type = "AUTO"
    obj = bpy.data.objects.new("cable", curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.convert(target="MESH")
    obj.select_set(False)


def create(device):
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for mat in list(bpy.data.materials):
        bpy.data.materials.remove(mat)
    micro = device == "codex-micro"
    shell = material("case", (.80, .83, .82) if micro else (.12, .15, .16), .7)
    dark = material("hardware", (.025, .03, .034), .55, .27)
    trim = material("trim", (.65, .70, .72), .9, .23)
    alpha = material("alpha", (.80, .84, .83) if micro else (.105, .13, .14),
                     roughness=.29, alpha=.58 if micro else 1)
    mod = material("mod", (.83, .86, .83) if micro else (.08, .10, .105))
    space = material("space", (.90, .91, .86))
    legend = material("legend_mod", (.025, .035, .035) if micro else (.76, .82, .80))
    pale_ink = material("legend_space", (.08, .12, .12))
    pcbmat = material("pcb", (.035, .09, .075), roughness=.65)
    stem = material("stem", (.34, .37, .33))
    glass = material("glass", (.012, .025, .027), .15, .15)
    light = material("screen_ink", (.48, .80, .71), emission=.35)
    led_colors = [( .26,.66,.54), (.30,.43,.85), (.86,.63,.20), (.64,.32,.83)]
    leds = [material("led_"+str(i), color, emission=1.2) for i, color in enumerate(led_colors)]
    neutral_led = material("led_neutral", (.64,.75,.71), emission=.5)
    width, height = (5.30, 5.30) if micro else (5.45, 5.55)
    box("case_bottom", (width, height, .40), (0, 0, .01), shell, bevel=.25)
    box("case_seam", (width-.06, height-.06, .045), (0, 0, .20), dark, bevel=.20)
    plate = group("plate", (0, 0, .39))
    box("top_plate", (width-.10, height-.10, .12), (0, 0, 0), shell, plate, .20)
    pcb = group("pcb", (0, 0, .29))
    box("board", (width-.36, height-.36, .07), (0, 0, 0), pcbmat, pcb, .13)
    for x in [-width/2+.42, width/2-.42]:
        for y in [-height/2+.42, height/2-.42]:
            cylinder("screw", .09, .035, (x, y, .09), dark if micro else trim, plate, 24)
            box("screw_slot", (.11,.022,.008), (x, y, .111), dark, plate, .005)
            cylinder("foot", .16, .06, (x, y, -.22), dark, vertices=24)
    switches = group("switches", (0, 0, .43))
    if micro:
        keys = [("Agent 1", "Digit1", -.50, 1.45, 1, 0),
                ("Agent 2", "Digit2", .50, 1.45, 1, 1)]
        keys += [("Agent "+str(i+3), "Digit"+str(i+3), x, .45, 1, i%4)
                 for i, x in enumerate([-1.5,-.5,.5,1.5])]
        keys += [(text, code, x, -.55, 1, -1) for text, code, x in
                 [("Fast", "KeyQ", -1.5), ("Accept", "KeyW", -.5),
                  ("Decline", "KeyE", .5), ("Fork", "KeyR", 1.5)]]
        keys += [("Voice", "Space", 0, -1.55, 2, -1),
                 ("Send", "Enter", 1.5, -1.55, 1, -1)]
    else:
        keys = [(text, code, x, .90, 1, i) for i, (text, code, x) in enumerate(
            [("Chief", "Digit1", -1.5), ("Research", "Digit2", -.5),
             ("Build", "Digit3", .5), ("Comms", "Digit4", 1.5)])]
        keys += [(text, code, x, -.10, 1, -1) for text, code, x in
                 [("Focus", "KeyQ", -1.5), ("Routine", "KeyW", -.5),
                  ("Approve", "KeyE", .5), ("Pause", "KeyR", 1.5)]]
        keys += [("Voice", "KeyA", -1.5, -1.10, 1, -1),
                 ("Delegate", "Space", 0, -1.10, 2, -1),
                 ("Next task", "KeyF", 1.5, -1.10, 1, -1)]
    for text, code, x, y, w, accent in keys:
        key = group("key_"+code, (x, y, .72 if micro else .75))
        key["label"] = text
        mat = space if w == 2 else alpha if accent >= 0 else mod
        capheight = cap(w, mat, key, micro)
        ink = pale_ink if w == 2 or micro else legend
        if accent >= 0 and not micro:
            cylinder("role_symbol", .095, .004, (0, .08, capheight-.014), leds[accent], key, 24)
        label("legend_"+code, text if not micro or accent < 0 else text.split()[-1],
              (0, -.12 if accent >= 0 and not micro else 0, capheight-.02),
              .095 if len(text) > 5 else .115, ink, key)
        for offset in ([-.5,.5] if micro and w == 2 else [0]):
            box("switch_housing", (.67,.67,.18), (x+offset,y,.15), dark, switches)
            box("switch_stem", (.26,.09,.09), (x+offset,y,.275), stem, switches, .015)
            box("switch_stem_cross", (.09,.26,.09), (x+offset,y,.275), stem, switches, .015)
        box("light_rim", (w-.07,.94,.026), (x,y,.23),
            leds[accent] if accent >= 0 else neutral_led, switches, .10)
    dial_x, dial_y = (-1.5,1.45) if micro else (1.58,2.0)
    dial = group("control_dial", (dial_x,dial_y,.53))
    cylinder("dial_barrel", .43, .36, (0,0,.17), trim if not micro else space, dial)
    for i in range(64):
        a = i*math.tau/64
        cylinder("knurl", .012, .27, (.431*math.cos(a),.431*math.sin(a),.17), dark, dial, 6)
    cylinder("dial_face", .425, .045, (0,0,.36), dark if not micro else space, dial)
    box("dial_indicator", (.018,.16,.006), (0,.24,.386), pale_ink if micro else space, dial, .003)
    if micro:
        joystick = group("control_joystick", (1.5,1.45,.61))
        cylinder("joystick_boot", .39,.16,(0,0,0),dark,joystick)
        cylinder("joystick_cap", .35,.15,(0,0,.12),dark,joystick)
        cylinder("touch_sensor", .24,.015,(-1.5,-1.55,.47),dark)
        for i in range(3):
            box("indicator", (.065,.055,.025), (-2.02,-1.34-i*.14,.49), neutral_led)
        label("device_identity", "CODEX MICRO / STUDY", (0,-2.14,.465), .11, pale_ink)
    else:
        screen = group("screen",(-.63,2.0,.47))
        box("screen_bezel", (2.98,.68,.07),(0,0,0), trim,screen,.04)
        box("screen_glass", (2.90,.59,.012),(0,0,.041),glass,screen,.03)
        label("screen_title", "HELLO, HUMAN.", (-.30,.08,.050), .13,light,screen)
        label("screen_status", "STUDIO PREVIEW", (-.30,-.12,.050), .08,light,screen)
        label("device_identity", "G R O K   B O T  /  0 1", (0,-2.04,.465), .12,legend)
    box("usb_housing", (.47,.40,.17), (0,height/2+.08,.13),dark)
    wire([(0,height/2+.22,.13), (.15,height/2+.8,.08),
          (.65,height/2+1.25,.04), (.35,height/2+1.95,.01)], .045,dark)
    batches = {}
    for obj in list(bpy.context.scene.objects):
        if obj.type == "MESH":
            batches.setdefault((obj.parent, tuple(obj.data.materials)), []).append(obj)
    for objects in batches.values():
        if len(objects) < 2:
            continue
        bpy.ops.object.select_all(action="DESELECT")
        for obj in objects:
            obj.select_set(True)
        bpy.context.view_layer.objects.active = objects[0]
        bpy.ops.object.join()
    bpy.ops.export_scene.gltf(filepath=str(OUT/(device+".glb")), export_format="GLB",
                              export_yup=True, export_apply=True, export_extras=True)


OUT.mkdir(exist_ok=True)
for device in ["grok-bot", "codex-micro"]:
    create(device)
print("Exported original Grok concept and Codex Micro studies.")

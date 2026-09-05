"""Render preview thumbnails from the original control-deck GLBs with Blender."""
import bpy
from pathlib import Path
from mathutils import Vector
root=Path(__file__).resolve().parents[1] / 'public' / 'models'
for name in ['grok-bot','codex-micro']:
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    bpy.ops.import_scene.gltf(filepath=str(root/(name+'.glb')))
    scene=bpy.context.scene
    scene.render.engine='CYCLES'
    scene.render.threads_mode='FIXED'
    scene.render.threads=4
    scene.cycles.samples=24
    scene.cycles.use_denoising=True
    scene.render.resolution_x=1000
    scene.render.resolution_y=900
    scene.render.resolution_percentage=100
    scene.render.film_transparent=True
    scene.render.image_settings.file_format='PNG'
    scene.world.use_nodes=True
    scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.35,.37,.39,1)
    scene.world.node_tree.nodes['Background'].inputs[1].default_value=.3
    scene.view_settings.view_transform='AgX'
    bpy.ops.object.camera_add(location=(6,-8,11))
    camera=bpy.context.object
    camera.rotation_euler=(Vector((0,.25,.2))-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.data.type='ORTHO'
    camera.data.ortho_scale=8.2
    scene.camera=camera
    for position,power,size in [((-4,-2,9),1400,7),((5,3,6),650,5),((-1,5,4),350,4)]:
        bpy.ops.object.light_add(type='AREA',location=position)
        light=bpy.context.object
        light.data.energy=power
        light.data.shape='DISK'
        light.data.size=size
        light.rotation_euler=(Vector((0,0,0))-light.location).to_track_quat('-Z','Y').to_euler()
    scene.render.filepath=str(root/(name+'.png'))
    bpy.ops.render.render(write_still=True)

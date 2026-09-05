"""Render all featured thumbnails from their actual model and preset colors."""
import json
import subprocess
from pathlib import Path
import bpy
from mathutils import Vector

root = Path(__file__).resolve().parents[1]
presets = json.loads(subprocess.check_output([
    'node', '--experimental-strip-types', '--input-type=module', '-e',
    "import {featuredBuilds} from './lib/featured-builds.ts'; console.log(JSON.stringify(featuredBuilds));"
], cwd=root))

def linear(hex_color):
    values=[int(hex_color[i:i+2],16)/255 for i in (1,3,5)]
    return tuple(v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in values)

for preset in presets:
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
    for material in list(bpy.data.materials): bpy.data.materials.remove(material)
    deck=preset['kind']=='control-deck'; build=preset['build']
    name=build['device'] if deck else 'keyboard-'+build['layout']
    bpy.ops.import_scene.gltf(filepath=str(root/'public/models'/(name+'.glb')))
    if deck:
        c=build['colors']; colors={'case':c['case'],'alpha':c['keys'],'mod':c['commands'],'space':c['wide']}
    else:
        colors={**build['palette'],'case':build['caseColor']}
    for material in bpy.data.materials:
        key=material.name.split('.')[0]; color=colors.get(key)
        if key.startswith('legend_'):
            base=colors.get(key[7:])
            if base:
                rgb=linear(base); luminance=sum(a*b for a,b in zip(rgb,[.2126,.7152,.0722]))
                color='#19221d' if luminance>.38 else '#f1f3e8'
        if color and color.startswith('#') and material.use_nodes:
            material.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(*linear(color),1)
    scene=bpy.context.scene; scene.render.engine='CYCLES'; scene.render.threads_mode='FIXED';scene.render.threads=4
    scene.cycles.samples=16;scene.cycles.use_denoising=True
    scene.render.resolution_x=640;scene.render.resolution_y=380;scene.render.resolution_percentage=100
    scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG'
    scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.5,.5,.5,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.5
    scene.view_settings.view_transform='AgX'
    bpy.ops.object.camera_add(location=(7,-10,15) if not deck else (-5,-8,15))
    camera=bpy.context.object; camera.rotation_euler=(Vector((0,0,.25))-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.data.type='ORTHO';camera.data.ortho_scale=21 if not deck else 12.2;scene.camera=camera
    for position,power,size in [((-6,-4,12),1700,9),((7,4,9),1200,7)]:
        bpy.ops.object.light_add(type='AREA',location=position);light=bpy.context.object
        light.data.energy=power;light.data.size=size;light.rotation_euler=(Vector((0,0,0))-light.location).to_track_quat('-Z','Y').to_euler()
    scene.render.filepath=str(root/'public/models'/(preset['id']+'.png'))
    bpy.ops.render.render(write_still=True)

"""Cinematic still photography of keyconf's original product models."""
from pathlib import Path
import bpy, math, os
from mathutils import Vector

project=Path(__file__).resolve().parents[1]

out=project/'assets/stills';out.mkdir(parents=True,exist_ok=True)

def linear(color):
    return tuple((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4) for v in [int(color[i:i+2],16)/255 for i in (1,3,5)])

bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=str(project/'assets/models/keyboard-60.glb'))
colors={'alpha':'#e7e1cd','mod':'#30473b','accent':'#688765','space':'#95aa86','case':'#c1bcb0'}
for mat in bpy.data.materials:
    key=mat.name.split('.')[0];color=colors.get(key)
    if key.startswith('legend_'):
        base=colors.get(key[7:])
        if base:
            lum=sum(v*w for v,w in zip(linear(base),[.2126,.7152,.0722]))
            color='#19221d' if lum>.38 else '#f1f3e8'
    if color and mat.use_nodes:
        bsdf=mat.node_tree.nodes.get('Principled BSDF')
        bsdf.inputs['Base Color'].default_value=(*linear(color),1)
        bsdf.inputs['Roughness'].default_value=.32 if key=='case' else .37

scene=bpy.context.scene;scene.render.engine='CYCLES'
scene.render.threads_mode='FIXED';scene.render.threads=6
scene.cycles.samples=24;scene.cycles.use_denoising=True
scene.cycles.use_adaptive_sampling=True;scene.cycles.adaptive_threshold=.065
scene.render.resolution_x=1920;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=False
scene.view_settings.view_transform='AgX'
scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.07,.1,.075,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.35

floor=bpy.data.materials.new('Studio forest cloth');floor.use_nodes=True
n=floor.node_tree.nodes;links=floor.node_tree.links;bsdf=n.get('Principled BSDF')
bsdf.inputs['Base Color'].default_value=(*linear('#17271e'),1);bsdf.inputs['Roughness'].default_value=.89
noise=n.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=190
bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.13;bump.inputs['Distance'].default_value=.035
links.new(noise.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],bsdf.inputs['Normal'])
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.24));bpy.context.object.data.materials.append(floor)
for pos,power,size,color in [((-6,-6,13),2100,8,(1,.9,.75)),((6,5,10),1650,6,(.75,.88,1)),((3,-1,10),500,4,(.8,1,.84))]:
    bpy.ops.object.light_add(type='AREA',location=pos);light=bpy.context.object
    light.data.energy=power;light.data.size=size;light.data.color=color
    light.rotation_euler=(Vector((0,0,0))-light.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(11,-15,17));cam=bpy.context.object;scene.camera=cam

shots=[('hero',(11,-15,18),(0,0,.35),48,False),('macro',(-8,-8,5.6),(-3,-.8,.75),62,True)]
if os.environ.get('KEYCONF_PRODUCT_ONLY')=='1':
    scene.render.film_transparent=True
    for obj in scene.objects:
        if obj.type=='MESH' and any(m.name=='Studio forest cloth' for m in obj.data.materials):
            obj.is_shadow_catcher=True
    shots=[('product',(12,-17,20),(0,0,.35),36,False)]
for name,position,target,lens,dof in shots:
    cam.location=position;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler()
    cam.data.lens=lens;cam.data.dof.use_dof=dof;cam.data.dof.focus_distance=(Vector(target)-cam.location).length;cam.data.dof.aperture_fstop=4.5
    scene.render.filepath=str(out/f'{name}.png');bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=str(project/'assets/keyconf-product.blend'))

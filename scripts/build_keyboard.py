"""Original parametric keyboard study. Blender 4.3; units are 19.05 mm.
Not manufacturer CAD. Regenerate: /tmp/keyconf-blender/bin/python scripts/build_keyboard.py
"""
import bpy, math, os, json
from mathutils import Vector
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def material(name, color, metal=0, rough=.36):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Metallic'].default_value=metal; p.inputs['Roughness'].default_value=rough
    return m

def box(name, size, loc, mat, bevel=.1):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o=bpy.context.object; o.name=name
    o.dimensions=size; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(mat)
    mod=o.modifiers.new('Machined edge','BEVEL'); mod.width=bevel; mod.segments=5
    bpy.ops.object.modifier_apply(modifier=mod.name)
    for p in o.data.polygons:p.use_smooth=True
    mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL'); bpy.ops.object.modifier_apply(modifier=mod.name)
    return o

def outline(w,h,r,z):
    result=[]
    for cx,cy,start in [(w/2-r,h/2-r,0),(-w/2+r,h/2-r,90),(-w/2+r,-h/2+r,180),(w/2-r,-h/2+r,270)]:
        for i in range(9):
            a=math.radians(start+i*90/8); result.append((cx+r*math.cos(a),cy+r*math.sin(a),z))
    return result

def cap(width,mat,parent):
    w=width-.08; rings=[outline(w,.92,.13,0),outline(w,.92,.14,.10),outline(w-.10,.82,.17,.42),outline(w-.20,.72,.17,.49),outline(w-.32,.57,.15,.46),outline(w-.49,.36,.12,.42)]
    vertices=[v for ring in rings for v in ring]; n=len(rings[0]); faces=[]
    for j in range(len(rings)-1):
        for k in range(n): faces.append((j*n+k,j*n+(k+1)%n,(j+1)*n+(k+1)%n,(j+1)*n+k))
    faces.append(tuple(range((len(rings)-1)*n,len(rings)*n)))
    mesh=bpy.data.meshes.new('Sculpted keycap'); mesh.from_pydata(vertices,[],faces); mesh.update()
    o=bpy.data.objects.new('cap',mesh); bpy.context.collection.objects.link(o); o.parent=parent; o.data.materials.append(mat)
    for f in mesh.polygons:f.use_smooth=True
    return o

rows=[
 [('Esc','Escape',1)]+[(s,'Digit'+s,1) for s in '1234567890']+[('-','Minus',1),('=','Equal',1),('Backspace','Backspace',2)],
 [('Tab','Tab',1.5)]+[(s,'Key'+s,1) for s in 'QWERTYUIOP']+[('[','BracketLeft',1),(']','BracketRight',1),('\\','Backslash',1.5)],
 [('Caps','CapsLock',1.75)]+[(s,'Key'+s,1) for s in 'ASDFGHJKL']+[(';','Semicolon',1),("'",'Quote',1),('Enter','Enter',2.25)],
 [('Shift','ShiftLeft',2.25)]+[(s,'Key'+s,1) for s in 'ZXCVBNM']+[(',','Comma',1),('.','Period',1),('/','Slash',1),('Shift','ShiftRight',2.75)],
 [('Ctrl','ControlLeft',1.25),('Win','MetaLeft',1.25),('Alt','AltLeft',1.25),('','Space',6.25),('Alt','AltRight',1.25),('Fn','Fn',1.25),('Menu','ContextMenu',1.25),('Ctrl','ControlRight',1.25)]
]
all_layouts={}
for layout in ['60','65','75']:
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
    mats={n:material(n,c,m,r) for n,c,m,r in [('case',(.72,.64,.50),.72,.3),('alpha',(.86,.83,.73),0,.35),('mod',(.73,.69,.56),0,.37),('accent',(.83,.29,.10),0,.30),('space',(.53,.64,.47),0,.32),('plate',(.19,.20,.16),.4,.35),('pcb',(.06,.18,.13),0,.65),('legend',(.13,.14,.12),0,.4),('weight',(.48,.28,.10),.85,.22)]}
    row_data=[list(r) for r in rows]
    if layout!='60':
        row_data[0].append(('Del','Delete',1));row_data[1].append(('PgUp','PageUp',1));row_data[2].append(('PgDn','PageDown',1))
        row_data[3][-1]=('Shift','ShiftRight',1.75);row_data[3]+=[('↑','ArrowUp',1),('End','End',1)]
        row_data[4]=row_data[4][:4]+[('', 'Gap', 1),('Alt','AltRight',1),('Fn','Fn',1),('←','ArrowLeft',1),('↓','ArrowDown',1),('→','ArrowRight',1)]
    if layout=='75':
        row_data[0][0]=('`','Backquote',1)
        row_data.insert(0,[('Esc','EscapeFn',1)]+[('F'+str(i),'F'+str(i),1) for i in range(1,13)]+[('Del','DeleteFn',1),('Home','Home',1),('End','EndFn',1)])
    width=15 if layout=='60' else 16; height=len(row_data); cy=(height-1)/2
    body=box('case_bottom',(width+.62,height+.62,.42),(0,0,.05),mats['case'],.20)
    box('weight',(width-1,height-1,.04),(0,0,-.17),mats['weight'],.12)
    for name,size,loc in [('rear',(width+.6,.31,.35),(0,height/2+.13,.36)),('front',(width+.6,.31,.35),(0,-height/2-.13,.36)),('left',(.31,height,.35),(-width/2-.13,0,.36)),('right',(.31,height,.35),(width/2+.13,0,.36))]:box('case_'+name,size,loc,mats['case'],.10)
    box('pcb',(width-.12,height-.12,.08),(0,0,.29),mats['pcb'],.04)
    box('plate',(width-.09,height-.09,.05),(0,0,.39),mats['plate'],.04)
    keys=[]
    for row,items in enumerate(row_data):
        cursor=-width/2
        for label,code,w in items:
            x=cursor+w/2; y=cy-row; cursor+=w
            if code=='Gap':continue
            parent=bpy.data.objects.new('key_'+code,None); bpy.context.collection.objects.link(parent);parent.location=(x,y,.43)
            group='accent' if code in ['Escape','EscapeFn','Enter'] else 'space' if code=='Space' or code.startswith('Arrow') else 'alpha' if len(label)==1 else 'mod'
            cap(w,mats[group],parent)
            if label:
                curve=bpy.data.curves.new('Legend','FONT');curve.body=label;curve.align_x='CENTER';curve.align_y='CENTER';curve.size=.14 if len(label)>2 else .20;curve.extrude=.0006
                text=bpy.data.objects.new('legend_'+code,curve);bpy.context.collection.objects.link(text);text.parent=parent;text.location=(0,.035,.445);text.data.materials.append(mats['legend'])
                bpy.context.view_layer.objects.active=text;text.select_set(True);bpy.ops.object.convert(target='MESH');text.select_set(False)
            keys.append({'label':label,'code':code,'width':w,'x':x,'y':y})
    all_layouts[layout]=keys
    bpy.ops.export_scene.gltf(filepath=os.path.join(ROOT,'public/models/keyboard-'+layout+'.glb'),export_format='GLB',export_yup=True,export_apply=True)
    if layout=='60':bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'public/models/keyboard-study.blend'))
with open(os.path.join(ROOT,'public/models/layouts.json'),'w') as f:json.dump(all_layouts,f)
print('Exported original Blender studies: 60%, 65%, 75%.')

"""HTTP verification of the running app. No browser/visual assertions."""
import json, sys, urllib.request, urllib.error
base=sys.argv[1].rstrip('/')
def request(path,body=None,origin=None):
 headers={}
 if body is not None:headers={'Content-Type':'application/json','Origin':origin or base};body=json.dumps(body).encode()
 r=urllib.request.Request(base+path,data=body,headers=headers)
 try:
  with urllib.request.urlopen(r,timeout=45) as response:return response.status,response.read(),dict(response.headers)
 except urllib.error.HTTPError as e:return e.code,e.read(),dict(e.headers)
status, body, _ = request('/')
assert status == 200, 'Root HTTP '+str(status)+': '+body[:300].decode('utf8', errors='replace')
for layout in ['60','65','75']:
 status,body,_=request('/models/keyboard-'+layout+'.glb');assert status==200 and body[:4]==b'glTF'
assert request('/api/import',{'url':'https://127.0.0.1'})[0]==422
assert request('/api/import',{'url':'https://example.com'},'https://unrelated.example')[0]==403
status,body,headers=request('/api/import',{'url':'https://kbdfans.com/products/tofu60-redux-plate'})
data=json.loads(body)
print('Root and all three GLB assets: HTTP 200. Local-address and cross-origin rejections passed.')
if status!=200:raise RuntimeError('Live vendor import failed: '+str(data))
assert len(data['products'])>0
print('Live vendor import:',data['method'],len(data['products']),'products; first:',data['products'][0]['name'])

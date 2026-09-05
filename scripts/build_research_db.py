"""Build an idempotent evidence catalog. Firmware targets are NOT retail products."""
import argparse, hashlib, json, pathlib, sqlite3
ROOT=pathlib.Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--inventory',type=pathlib.Path);args=parser.parse_args()
seed=json.loads((ROOT/'data/research-seed.json').read_text())
db=sqlite3.connect(ROOT/'data/keyboards.sqlite');db.executescript((ROOT/'data/schema.sql').read_text())
with db:
 for s in seed['sources']:
  db.execute('INSERT OR REPLACE INTO source_document VALUES(?,?,?,?,?,?,?,?,?)',(s['id'],s['title'],s['publisher'],s['url'],seed['accessed_at'],s.get('published_at'),s.get('rights_status','Source consulted; bulk reuse not established'),s['coverage'],s.get('sha256')))
 for p in seed['products']:db.execute('INSERT OR REPLACE INTO product VALUES(?,?,?,?,?,?)',(p['id'],p['name'],p['brand'],p['category'],p['source_id'],'research_seed'))
 for c in seed['claims']:db.execute('INSERT OR REPLACE INTO spec_claim VALUES(?,?,?,?,?,?,?,?,?)',(c['id'],c.get('product_id'),c['subject'],c['field'],json.dumps(c['value']),c.get('unit'),c['source_id'],c['status'],c.get('conditions','')))
 for p in seed['popularity']:db.execute('INSERT OR REPLACE INTO popularity_observation VALUES(?,?,?,?,?,?,?)',(p['id'],p['product_id'],p['metric'],p['value'],p['population'],p['period'],p['source_id']))
 if args.inventory:
  path=args.inventory/'qmk-all.json'
  if path.exists():
   raw=path.read_bytes();payload=json.loads(raw);records=payload.get('keyboards',payload)
   if not isinstance(records,dict):raise ValueError('Unexpected QMK inventory shape')
   db.execute('UPDATE source_document SET content_sha256=? WHERE id=?',(hashlib.sha256(raw).hexdigest(),'qmk'))
   for target,value in records.items():
    if not isinstance(value,dict):continue
    db.execute('INSERT OR REPLACE INTO firmware_target VALUES(?,?,?,?,?)',('qmk',target,value.get('keyboard_name'),value.get('manufacturer'),json.dumps(value)))
    for name,layout in value.get('layouts',{}).items():
     positions=layout.get('layout',[])
     db.execute('INSERT OR REPLACE INTO layout VALUES(?,?,?,?,?,?)',('qmk:'+target+':'+name,'qmk',target,name,len(positions),json.dumps(positions)))
  path=args.inventory/'via-tree.json'
  if path.exists():
   raw=path.read_bytes();payload=json.loads(raw)
   if payload.get('truncated'):raise ValueError('VIA tree is truncated')
   db.execute('UPDATE source_document SET content_sha256=? WHERE id=?',(hashlib.sha256(raw).hexdigest(),'via'))
   for entry in payload.get('tree',[]):
    path=entry.get('path','')
    if path.endswith('.json') and path.startswith(('src/','v2/','v3/')):
     db.execute('INSERT OR REPLACE INTO firmware_target VALUES(?,?,?,?,?)',('via',path,path.rsplit('/',1)[-1][:-5],None,json.dumps(entry)))
counts={t:db.execute('SELECT COUNT(*) FROM '+t).fetchone()[0] for t in ['source_document','product','spec_claim','popularity_observation','firmware_target','layout']}
assert db.execute('PRAGMA integrity_check').fetchone()[0]=='ok';assert not db.execute('PRAGMA foreign_key_check').fetchall()
db.execute('PRAGMA optimize');db.close()
(ROOT/'data/summary.json').write_text(json.dumps({'accessed_at':seed['accessed_at'],'counts':counts,'scope':'Research seed and firmware targets. Not a complete retail catalog or verified compatibility database.'},indent=2)+'\n')
print(json.dumps(counts,indent=2))

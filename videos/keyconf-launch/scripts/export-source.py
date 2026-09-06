"""Package the renderable project without raw takes or machine caches."""
from pathlib import Path
import shutil, zipfile, argparse
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--copy-to',type=Path);args=parser.parse_args()
files=[]
for name in ['README.md','AGENTS.md','BRIEF.md','STORYBOARD.md','frame.md','index.html','hyperframes.json','meta.json','package.json','package-lock.json','audio_meta.json','.gitignore']:
 files.append(root/name)
for folder in ['assets','compositions','scripts','docs']:
 for path in (root/folder).rglob('*'):
  if not path.is_file() or path.suffix in ['.blend','.blend1','.webm','.pyc'] or '__pycache__' in path.parts:continue
  files.append(path)
output=root/'renders';output.mkdir(exist_ok=True)
with zipfile.ZipFile(output/'keyconf-launch-source.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as archive:
 for path in sorted(files):
  relative=path.relative_to(root)
  archive.write(path,Path('keyconf-launch')/relative)
  if args.copy_to:
   destination=args.copy_to/relative;destination.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(path,destination)
print(f'Packaged {len(files)} source files')

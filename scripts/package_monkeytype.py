#!/usr/bin/env python3
"""Package the pinned guest build and its corresponding source together."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import sys
import tarfile

source = Path(sys.argv[1]).resolve()
project = Path(__file__).resolve().parent.parent
output = project / 'public/monkeytype'
build = source / 'frontend/dist'
if not (build / 'index.html').is_file():
    raise SystemExit('Build Monkeytype before packaging it.')
shutil.rmtree(output, ignore_errors=True)
shutil.copytree(build, output)
for file in [output / 'sw.js', output / 'manifest.json', *output.glob('workbox-*.js')]:
    file.unlink(missing_ok=True)
files = [name for name in subprocess.check_output(
    ['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], cwd=source
).decode().split('\0') if name]
for group in ['code', 'assets', 'languages']:
    suffix = 'tar.xz' if group == 'languages' else 'tar.gz'
    mode = 'w:xz' if group == 'languages' else 'w:gz'
    with tarfile.open(output / ('source-' + group + '.' + suffix), mode,
                      **({'preset': 3} if group == 'languages' else {})) as archive:
        for name in files:
            kind = 'languages' if name.startswith('frontend/static/languages/') else 'assets' if name.startswith('frontend/static/') else 'code'
            if kind == group:
                archive.add(source / name, arcname='monkeytype/' + name, recursive=False)
shutil.copy(project / 'third_party/monkeytype/source.html', output / 'source.html')
shutil.copy(source / 'LICENSE', output / 'LICENSE.txt')
manifest = {
    'upstream': 'https://github.com/monkeytypegame/monkeytype',
    'revision': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=source, text=True).strip(),
    'patch_sha256': hashlib.sha256((project / 'third_party/monkeytype/keyconf.patch').read_bytes()).hexdigest(),
    'license': 'GPL-3.0',
    'modifications': 'Keyconf guest widget; see corresponding source and KEYCONF_BUILD.md',
}
(output / 'upstream.json').write_text(json.dumps(manifest, indent=2) + '\n')
large = [str(file.relative_to(output)) for file in output.rglob('*') if file.is_file() and file.stat().st_size > 25 * 1024 * 1024]
if large:
    raise SystemExit('Assets exceed hosting file limit: ' + ', '.join(large))
print('Packaged Monkeytype guest widget, source archives, and attribution.')

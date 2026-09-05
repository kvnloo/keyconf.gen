"""Import the upstream packs that carry an explicit audio-specific MIT notice."""
import concurrent.futures
import hashlib
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REVISION = '6785c7ac17b9f4db1f3d7f3d1d87a23067944517'
REPO = 'https://github.com/nathan-fiscaletti/keyboardsounds'
RAW = f'https://raw.githubusercontent.com/nathan-fiscaletti/keyboardsounds/{REVISION}/keyboardsounds/profiles'
PACKS = [
    ('alpaca', 'Durock Alpaca', 'linear'),
    ('gateron-black-ink', 'Gateron Ink Black', 'linear'),
    ('gateron-red-ink', 'Gateron Ink Red', 'linear'),
    ('holy-panda', 'Holy Panda', 'tactile'),
    ('mx-black', 'Cherry MX Black', 'linear'),
    ('mx-blue', 'Cherry MX Blue', 'clicky'),
    ('mx-brown', 'Cherry MX Brown', 'tactile'),
]


def read(url):
    with urllib.request.urlopen(url, timeout=30) as response:
        content = response.read(2_000_001)
    if len(content) > 2_000_000:
        raise ValueError('Sound source exceeds size limit')
    return content


def import_pack(pack):
    pack_id, name, character = pack
    license_text = read(f'{RAW}/{pack_id}/LICENSE')
    if b'Audio samples from https://github.com/tplai/kbsim' not in license_text or b'Permission is hereby granted' not in license_text:
        raise ValueError(f'{pack_id}: audio license changed; review before importing')
    directory = ROOT / 'public/sounds' / pack_id
    directory.mkdir(parents=True, exist_ok=True)
    (directory / 'LICENSE.txt').write_bytes(license_text)
    groups = {
        'down': {'default': [f'press_key{i}.mp3' for i in range(1, 6)]},
        'up': {'default': ['release.mp3' if pack_id == 'mx-blue' else 'release_key.mp3']},
    }
    if pack_id != 'mx-blue':
        for code, suffix in [('Space', 'space'), ('Enter', 'enter'), ('Backspace', 'back')]:
            groups['down'][code] = [f'press_{suffix}.mp3']
            groups['up'][code] = [f'release_{suffix}.mp3']
    files = sorted({f for events in groups.values() for group in events.values() for f in group})
    hashes = {}
    for filename in files:
        content = read(f'{RAW}/{pack_id}/{filename}')
        (directory / filename).write_bytes(content)
        hashes[filename] = hashlib.sha256(content).hexdigest()
    return {
        'id': pack_id, 'name': name, 'character': character,
        'creator': 'Thomas Lai / kbsim', 'license': 'MIT',
        'source': f'{REPO}/tree/{REVISION}/keyboardsounds/profiles/{pack_id}',
        'upstream': 'https://github.com/tplai/kbsim',
        'capture': 'Full build and microphone details were not supplied with these samples.',
        'groups': groups, 'sha256': hashes,
    }


if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        packs = list(pool.map(import_pack, PACKS))
    (ROOT / 'data/sound-packs.json').write_text(json.dumps({
        'revision': REVISION, 'packs': packs,
    }, indent=2) + '\n')
    print(f'Imported {len(packs)} licensed packs, {sum(len(p["sha256"]) for p in packs)} files')

"""Index public recording references. Does not download or extract video audio."""
import concurrent.futures
import datetime
import hashlib
import json
import re
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = 'https://www.clickandthock.com'
PAGES = ['linear-switches-1', 'tactile-switches-1', 'clicky-switches',
         'silent-switches-1', 'low-profile-switches-1', 'alps-switches-1']


class WarmupParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.chunks = []

    def handle_starttag(self, tag, attrs):
        if tag == 'script':
            self.active = dict(attrs).get('id') == 'wix-warmup-data'

    def handle_endtag(self, tag):
        if tag == 'script':
            self.active = False

    def handle_data(self, data):
        if self.active:
            self.chunks.append(data)


def objects(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from objects(child)
    elif isinstance(value, list):
        for child in value:
            yield from objects(child)


def extract(html):
    parser = WarmupParser()
    parser.feed(html)
    records = {}
    for item in objects(json.loads(''.join(parser.chunks))):
        name = item.get('productName') or item.get('title')
        video = item.get('youtubeId')
        if not video:
            match = re.search(r'(?:youtu\.be/|[?&]v=)([\w-]{11})', str(item.get('youtubeUrl', '')))
            video = match.group(1) if match else None
        path = next((v for k, v in item.items() if k.startswith('link-') and
                     k.endswith('-title') and isinstance(v, str) and v.startswith('/')), None)
        if not isinstance(name, str) or not isinstance(video, str) or not path:
            continue
        if not re.fullmatch(r'[A-Za-z0-9_-]{11}', video):
            continue
        if re.search(r'compilation|comparison|top\s*3|best.*switch', name, re.I):
            continue
        source = HOST + path
        records[source] = {
            'id': hashlib.sha256(source.encode()).hexdigest()[:16],
            'name': name.strip(), 'family': str(item.get('type') or 'Unspecified'),
            'videoId': video, 'source': source, 'creator': 'Click and Thock',
            'published': str(item.get('uploadDate') or ''),
            'lubed': str(item.get('lubed') or 'Not stated'),
        }
    return list(records.values())


def fetch(page):
    request = urllib.request.Request(HOST + '/' + page, headers={'User-Agent': 'Keyconf recording-reference index'})
    with urllib.request.urlopen(request, timeout=30) as response:
        html = response.read(8_000_001)
    if len(html) > 8_000_000:
        raise ValueError('Reference page exceeds size limit')
    records = extract(html.decode())
    if not records:
        raise ValueError(f'No video references found on {page}; source format may have changed')
    print(f'{page}: {len(records)} references')
    return records


if __name__ == '__main__':
    records = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for group in pool.map(fetch, PAGES):
            records.update((record['source'], record) for record in group)
    target = ROOT / 'data/sound-references.json'
    target.write_text(json.dumps({
        'checkedAt': datetime.date.today().isoformat(),
        'access': 'Original YouTube player or creator page. No extracted video/audio assets.',
        'records': sorted(records.values(), key=lambda r: r['name'].casefold()),
    }, indent=2) + '\n')
    print(f'Saved {len(records)} recording references')

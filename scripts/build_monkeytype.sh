#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ "$(node -p 'process.versions.node.split(".")[0]')" != 24 ]]; then
  echo 'Regenerating Monkeytype requires Node 24.' >&2
  exit 1
fi
if [[ "$(pnpm --version)" != 11.21.0 ]]; then
  echo 'Regenerating Monkeytype requires pnpm 11.21.0.' >&2
  exit 1
fi
checkout="$(mktemp -d -t keyconf-monkeytype.XXXXXX)"
git clone --quiet https://github.com/monkeytypegame/monkeytype.git "$checkout"
git -C "$checkout" checkout --quiet 91bd24bb8513785c7364cbea29296ff7adafac41
git -C "$checkout" apply "$project_dir/third_party/monkeytype/keyconf.patch"
cd "$checkout"
pnpm --filter @monkeytype/frontend... install --frozen-lockfile
pnpm exec turbo run build --filter='@monkeytype/frontend^...'
RECAPTCHA_SITE_KEY='' BACKEND_URL='/monkeytype/guest-api' pnpm --filter @monkeytype/frontend exec vite build
python3 "$project_dir/scripts/package_monkeytype.py" "$checkout"
echo "Source checkout retained at $checkout"

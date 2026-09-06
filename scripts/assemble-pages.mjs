import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function assemblePages({
  artifact,
  destination,
  channel,
  sha,
  runNumber,
  repository,
}) {
  if (!['main', 'dev', 'nightly'].includes(channel))
    throw new Error('Unknown release channel');
  if (!/^[a-f0-9]{40}$/.test(sha))
    throw new Error('Expected a full source commit');
  if (!Number.isSafeInteger(runNumber) || runNumber < 1)
    throw new Error('Invalid workflow run number');
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository))
    throw new Error('Invalid repository');
  const base = `/${repository.split('/')[1]}/${channel}/`;
  const html = await readFile(path.join(artifact, 'index.html'), 'utf8');
  if (!html.includes(`<base href="${base}"`))
    throw new Error(`Artifact must be built for ${base}`);
  const target = path.join(destination, channel);
  let previous;
  try {
    previous = JSON.parse(
      await readFile(path.join(target, 'release.json'), 'utf8'),
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (previous && previous.runNumber >= runNumber)
    return { published: false, release: previous };
  const release = {
    channel,
    sha,
    runNumber,
    base,
    publishedAt: new Date().toISOString(),
  };
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  await cp(artifact, target, { recursive: true });
  await writeFile(
    path.join(target, 'release.json'),
    JSON.stringify(release, null, 2) + '\n',
  );
  const releases = {};
  for (const name of ['main', 'dev', 'nightly']) {
    try {
      releases[name] = JSON.parse(
        await readFile(path.join(destination, name, 'release.json'), 'utf8'),
      );
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  await writeFile(
    path.join(destination, 'environments.json'),
    JSON.stringify(releases, null, 2) + '\n',
  );
  await writeFile(path.join(destination, '.nojekyll'), '');
  await writeFile(
    path.join(destination, 'index.html'),
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Keyconf Studio</title>
<script>location.replace(new URL('./main/', location.href).pathname + location.search + location.hash)</script>
<meta http-equiv="refresh" content="0;url=./main/"></head><body><a href="./main/">Open Keyconf Studio</a></body></html>\n`,
  );
  return { published: true, release };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const [artifact, destination, channel, sha, runNumber, repository] =
    process.argv.slice(2);
  console.log(
    JSON.stringify(
      await assemblePages({
        artifact,
        destination,
        channel,
        sha,
        runNumber: Number(runNumber),
        repository,
      }),
    ),
  );
}

import { execFile } from 'node:child_process';
import { appendFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execute = promisify(execFile);
const channels = ['main', 'dev', 'nightly'];
const positiveInteger = (value) => Number.isSafeInteger(value) && value > 0;

function trustedRun(run, repository, channel) {
  return (
    positiveInteger(run.id) &&
    positiveInteger(run.run_number) &&
    /^[a-f0-9]{40}$/.test(run.head_sha) &&
    run.head_branch === channel &&
    run.path === '.github/workflows/publish.yml' &&
    ['push', 'workflow_dispatch'].includes(run.event) &&
    run.repository?.full_name === repository &&
    run.head_repository?.full_name === repository &&
    positiveInteger(run.repository.id) &&
    run.head_repository.id === run.repository.id
  );
}

function matchingArtifact(artifact, run) {
  return (
    positiveInteger(artifact.id) &&
    artifact.name === 'pages-candidate' &&
    artifact.expired === false &&
    artifact.workflow_run?.id === run.id &&
    artifact.workflow_run.head_sha === run.head_sha &&
    artifact.workflow_run.head_branch === run.head_branch &&
    artifact.workflow_run.repository_id === run.repository.id &&
    artifact.workflow_run.head_repository_id === run.repository.id
  );
}

export async function selectPagesCandidates({ repository, readApi }) {
  if (
    !/^[\w.-]+\/[\w.-]+$/.test(repository) ||
    repository.split('/').some((part) => /^\.+$/.test(part))
  )
    throw new Error('Invalid repository');
  const entries = await Promise.all(
    channels.map(async (channel) => {
      const prefix = `repos/${repository}/actions`;
      const { workflow_runs: runs } = await readApi(
        `${prefix}/workflows/publish.yml/runs?branch=${channel}&per_page=100`,
      );
      const eligible = runs
        .filter((run) => trustedRun(run, repository, channel))
        .sort((left, right) => right.run_number - left.run_number);
      for (const run of eligible) {
        const { jobs } = await readApi(
          `${prefix}/runs/${run.id}/jobs?filter=latest&per_page=100`,
        );
        const checks = jobs.filter(
          (job) => job.name === 'check' && job.run_id === run.id,
        );
        if (checks.length !== 1 || checks[0].conclusion !== 'success') continue;
        const { artifacts } = await readApi(
          `${prefix}/runs/${run.id}/artifacts?per_page=100`,
        );
        const artifact = artifacts
          .filter((item) => matchingArtifact(item, run))
          .sort((left, right) =>
            right.created_at.localeCompare(left.created_at),
          )[0];
        if (artifact)
          return [
            channel,
            {
              runId: run.id,
              runNumber: run.run_number,
              sha: run.head_sha,
              artifactId: artifact.id,
            },
          ];
      }
      return null;
    }),
  );
  return Object.fromEntries(entries.filter(Boolean));
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const [repository, outputPath] = process.argv.slice(2);
  if (!outputPath)
    throw new Error(
      'Usage: select-pages-candidates.mjs owner/repo output.json',
    );
  const candidates = await selectPagesCandidates({
    repository,
    readApi: async (endpoint) => {
      const { stdout } = await execute('gh', ['api', endpoint], {
        timeout: 30_000,
        maxBuffer: 4 * 1024 * 1024,
      });
      return JSON.parse(stdout);
    },
  });
  const json = JSON.stringify(candidates);
  await writeFile(outputPath, json + '\n');
  if (process.env.GITHUB_OUTPUT)
    await appendFile(process.env.GITHUB_OUTPUT, `candidates=${json}\n`);
  console.log(json);
}

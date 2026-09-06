import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selectPagesCandidates } from '../scripts/select-pages-candidates.mjs';

const repository = 'kvnloo/keyconf.gen';
const repo = { id: 123, full_name: repository };
const run = (id, branch = 'nightly', overrides = {}) => ({
  id,
  run_number: id,
  head_branch: branch,
  head_sha: String(id % 10).repeat(40),
  path: '.github/workflows/publish.yml',
  event: 'push',
  repository: repo,
  head_repository: repo,
  ...overrides,
});
const artifact = (source, overrides = {}) => ({
  id: source.id + 1000,
  name: 'pages-candidate',
  expired: false,
  created_at: '2026-09-06T09:00:00Z',
  workflow_run: {
    id: source.id,
    head_sha: source.head_sha,
    head_branch: source.head_branch,
    repository_id: repo.id,
    head_repository_id: repo.id,
  },
  ...overrides,
});

function fixture(runs, { checks = {}, artifacts = {} } = {}) {
  const requests = [];
  return {
    requests,
    readApi: async (endpoint) => {
      requests.push(endpoint);
      const url = new URL(endpoint, 'https://api.github.com/');
      const list = `/repos/${repository}/actions/workflows/publish.yml/runs`;
      if (url.pathname === list)
        return {
          workflow_runs: runs.filter(
            (item) => item.head_branch === url.searchParams.get('branch'),
          ),
        };
      const match = url.pathname.match(/\/runs\/(\d+)\/(jobs|artifacts)$/);
      assert.ok(match, `Unexpected request: ${endpoint}`);
      const source = runs.find((item) => item.id === Number(match[1]));
      assert.ok(source);
      if (match[2] === 'jobs')
        return {
          jobs: [
            {
              name: 'check',
              run_id: source.id,
              conclusion: checks[source.id] ?? 'success',
            },
          ],
        };
      return { artifacts: artifacts[source.id] ?? [artifact(source)] };
    },
  };
}

test('A canceled deployment still contributes its checked branch artifact', async () => {
  const runs = [
    run(10, 'main'),
    run(11, 'dev', { conclusion: 'cancelled' }),
    run(12),
  ];
  const candidates = await selectPagesCandidates({
    repository,
    ...fixture(runs),
  });
  assert.deepEqual(Object.keys(candidates), ['main', 'dev', 'nightly']);
  assert.deepEqual(candidates.dev, {
    runId: 11,
    runNumber: 11,
    sha: '1'.repeat(40),
    artifactId: 1011,
  });
});

test('Pending and failed checks do not displace an older successful build', async () => {
  const runs = [run(5), run(4), run(3), run(2), run(1)];
  const data = fixture(runs, {
    checks: { 5: 'failure', 4: 'cancelled', 3: 'in_progress' },
    artifacts: { 2: [] },
  });
  const candidates = await selectPagesCandidates({ repository, ...data });
  assert.equal(candidates.nightly.runId, 1);
  assert.equal(candidates.main, undefined);
  assert.ok(
    !data.requests.some((endpoint) => /runs\/[345]\/artifacts/.test(endpoint)),
  );
});

test('Run number wins over API ordering or a later artifact from an old rerun', async () => {
  const older = run(10, 'nightly', { run_number: 1 });
  const newer = run(11, 'nightly', { run_number: 2 });
  const data = fixture([older, newer], {
    artifacts: {
      10: [artifact(older, { created_at: '2026-09-07T00:00:00Z' })],
    },
  });
  const candidates = await selectPagesCandidates({ repository, ...data });
  assert.equal(candidates.nightly.runId, 11);
});

test('Only this repository and workflow on authorized branch events are eligible', async () => {
  const runs = [
    run(8, 'nightly', { event: 'pull_request' }),
    run(7, 'nightly', { repository: { ...repo, full_name: 'someone/else' } }),
    run(6, 'nightly', {
      head_repository: { id: 456, full_name: 'fork/keyconf.gen' },
    }),
    run(5, 'nightly', { path: '.github/workflows/unrelated.yml' }),
    run(4, 'nightly', { head_sha: 'invalid' }),
    run(3, 'nightly', { run_number: -1 }),
    run(2, 'feature'),
    run(1, 'nightly', { event: 'workflow_dispatch' }),
  ];
  const data = fixture(runs);
  const candidates = await selectPagesCandidates({ repository, ...data });
  assert.equal(candidates.nightly.runId, 1);
  assert.equal(
    data.requests.filter((endpoint) => endpoint.includes('/jobs')).length,
    1,
  );
  await assert.rejects(
    selectPagesCandidates({ repository: '../bad', ...data }),
    /repository/i,
  );
});

test('Expired, mismatched and missing artifacts cannot be published', async () => {
  const runs = [run(6), run(5), run(4), run(3), run(2), run(1)];
  const artifacts = {
    6: [artifact(runs[0], { expired: true })],
    5: [artifact(runs[1], { name: 'verification-failure' })],
    4: [
      artifact(runs[2], {
        workflow_run: {
          ...artifact(runs[2]).workflow_run,
          head_sha: 'a'.repeat(40),
        },
      }),
    ],
    3: [
      artifact(runs[3], {
        workflow_run: {
          ...artifact(runs[3]).workflow_run,
          head_repository_id: 456,
        },
      }),
    ],
    2: [
      artifact(runs[4], {
        workflow_run: { ...artifact(runs[4]).workflow_run, id: 999 },
      }),
    ],
  };
  const candidates = await selectPagesCandidates({
    repository,
    ...fixture(runs, { artifacts }),
  });
  assert.equal(candidates.nightly.runId, 1);
});

test('API failures stop publication instead of silently omitting a branch', async () => {
  await assert.rejects(
    selectPagesCandidates({
      repository,
      readApi: async () => {
        throw new Error('API unavailable');
      },
    }),
    /API unavailable/,
  );
});

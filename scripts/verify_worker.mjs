import {
  createTestHarness,
  unstable_splitSqlQuery as splitSqlQuery,
} from 'wrangler';
import { readFile } from 'node:fs/promises';
import { verifyProposalApi } from './verify_proposal_api.mjs';

await import('./seed_publication_fixture.mjs');
const server = createTestHarness({
  workers: [{ configPath: './dist/server/wrangler.json' }],
});
try {
  const { url } = await server.listen();
  const worker = server.getWorker();
  const { DB } = await worker.getEnv();
  const sql = await readFile('/tmp/keyconf-publication-fixtures.sql', 'utf8');
  for (const statement of splitSqlQuery(sql)) await DB.prepare(statement).run();
  const fixtures = JSON.parse(
    await readFile('/tmp/keyconf-publication-fixtures.json', 'utf8'),
  );
  await verifyProposalApi(
    (input, init) => worker.fetch(input, init),
    url,
    fixtures,
  );
  process.env.KEYCONF_PUBLICATION_BASE_URL = url.href;
  await import('./verify_publication.mjs');
  await import('./verify_proposal.mjs');
} catch (error) {
  server.debug();
  throw error;
} finally {
  await server.close();
}

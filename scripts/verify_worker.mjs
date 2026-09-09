import {
  createTestHarness,
  unstable_splitSqlQuery as splitSqlQuery,
} from 'wrangler';
import { readFile } from 'node:fs/promises';
import { verifyProposalApi } from './verify_proposal_api.mjs';

const focus = process.argv[2] ?? 'full';
if (
  process.argv.length > 3 ||
  !['full', '--discovery', '--artisan-imports'].includes(focus)
)
  throw new Error('Use no arguments, --discovery, or --artisan-imports.');

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
  process.env.KEYCONF_PUBLICATION_BASE_URL = url.href;
  if (focus === 'full') {
    await verifyProposalApi(
      (input, init) => worker.fetch(input, init),
      url,
      fixtures,
    );
    await import('./verify_publication.mjs');
    await import('./verify_collection.mjs');
    await import('./verify_proposal.mjs');
  }
  if (focus === 'full' || focus === '--discovery') {
    for (let index = 0; index < 27; index++) {
      await DB.prepare(`INSERT INTO community_publication(id,account_id,build_id,operation_id,request_digest,metadata,author,published_at)
      SELECT ?,account_id,build_id,?,request_digest,json_set(metadata,'$.title',?),json_set(author,'$.displayName','Élodie'),? FROM community_publication WHERE id=?`)
        .bind(
          `discovery-page-fixture-${index.toString().padStart(3, '0')}`,
          `discovery-operation-${index}`,
          `Émeraude ${index}`,
          new Date().toISOString(),
          fixtures.active,
        )
        .run();
    }
    await import('./verify_discovery.mjs');
  }
  if (focus === 'full' || focus === '--artisan-imports') {
    process.env.KEYCONF_BASE_URL = url.href;
    await import('./verify_artisan_import_specs.mjs');
  }
} catch (error) {
  server.debug();
  throw error;
} finally {
  await server.close();
}

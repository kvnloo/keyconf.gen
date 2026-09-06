import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { ObservationCatalog, collectCatalog } from './catalog/observations.ts';

const usage = `Retain source-backed product observations in a local SQLite catalog.

node --experimental-strip-types scripts/observe_catalog.mjs \\
  --url https://store.example/collections/switches --run switches-2026-09-06 --pages 3

--run     Stable observation-run ID. Reuse it to resume; change it for a new snapshot.
--pages   Total page limit for this run, from 1 to 100 (default 1).
--db      SQLite path (default data/catalog-observations.sqlite).
--export  Print the complete evidence JSON instead of the compact checkpoint.

Repeating the same command reuses committed pages. A one-second delay separates
new pages. Results remain unreviewed observations, not verified fit or a complete
retail inventory. This command does not publish data or alter browser saves.`;

let catalog;
try {
  const { values } = parseArgs({
    options: {
      url: { type: 'string' },
      run: { type: 'string' },
      pages: { type: 'string', default: '1' },
      db: {
        type: 'string',
        default: fileURLToPath(
          new URL('../data/catalog-observations.sqlite', import.meta.url),
        ),
      },
      export: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) console.log(usage);
  else {
    if (!values.url || !values.run)
      throw new Error('Provide --url and --run. Use --help for examples.');
    const path = resolve(values.db);
    await mkdir(dirname(path), { recursive: true });
    catalog = new ObservationCatalog(path);
    const checkpoint = await collectCatalog(catalog, {
      runId: values.run,
      source: values.url,
      targetPages: Number(values.pages),
    });
    console.log(
      JSON.stringify(
        values.export ? catalog.export(values.run) : checkpoint,
        null,
        2,
      ),
    );
  }
} catch (error) {
  console.error(
    error instanceof Error ? error.message : 'The catalog observation failed.',
  );
  console.error(
    'Committed pages are retained. Repeat the same run ID to resume.',
  );
  process.exitCode = 1;
} finally {
  catalog?.close();
}

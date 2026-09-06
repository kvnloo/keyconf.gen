import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { setTimeout as delay } from 'node:timers/promises';
import {
  importWebsite,
  isImportResult,
  publicUrl,
  type ImportContinuation,
  type ImportResult,
} from '../../lib/import-products.ts';
import type { ProductPrice } from '../../lib/product-pricing.ts';
import { archiveExtractor } from './extractor.ts';

type Progress =
  | { kind: 'pending' }
  | { kind: 'more'; next: ImportContinuation }
  | { kind: 'pagination-ended' }
  | { kind: 'preview-only' };
export type CatalogCheckpoint = {
  runId: string;
  source: string;
  startedAt: string;
  pages: number;
  observations: number;
  progress: Progress;
};

function isoDate(value: string) {
  if (
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString() !== value
  )
    throw new Error(
      'An observation needs an ISO timestamp, including its timezone.',
    );
  return value;
}
function pricing(price: ProductPrice): ProductPrice {
  switch (price.kind) {
    case 'unknown':
      return { kind: 'unknown' };
    case 'exact':
    case 'from':
      return {
        kind: price.kind,
        amount: price.amount,
        currency: price.currency,
      };
    case 'range':
      return {
        kind: 'range',
        min: price.min,
        max: price.max,
        currency: price.currency,
      };
  }
}
function continuation(next: ImportContinuation): ImportContinuation {
  return {
    kind: 'shopify',
    source: next.source,
    catalog:
      next.catalog.kind === 'done'
        ? { kind: 'done' }
        : { kind: 'more', after: next.catalog.after },
    variants: next.variants.map(({ id, after }) => ({ id, after })),
  };
}
function observation(value: unknown): ImportResult {
  if (!isImportResult(value)) throw new Error('Invalid catalog observation.');
  if (
    publicUrl(value.source).href !== value.source ||
    !value.method ||
    !value.coverage
  )
    throw new Error(
      'An observation needs its canonical source, method and coverage.',
    );
  const result: ImportResult = {
    source: value.source,
    observedAt: isoDate(value.observedAt),
    method: value.method,
    coverage: value.coverage,
    products: value.products.map((p) => {
      publicUrl(p.url);
      return {
        name: p.name,
        brand: p.brand,
        url: p.url,
        sku: p.sku,
        pricing: pricing(p.pricing),
        availability: p.availability,
      };
    }),
    ...(value.next === undefined
      ? {}
      : { next: value.next === null ? null : continuation(value.next) }),
  };
  if (Buffer.byteLength(JSON.stringify(result)) > 2_000_000)
    throw new Error('The normalized observation exceeds 2 MB.');
  return result;
}
function storedText(value: unknown): string {
  if (typeof value !== 'string')
    throw new Error('Invalid catalog storage record.');
  return value;
}
function storedCount(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0)
    throw new Error('Invalid catalog storage count.');
  return value;
}
function storedPage(row: Record<string, unknown>): ImportResult {
  const payload = storedText(row.payload_json);
  if (createHash('sha256').update(payload).digest('hex') !== row.payload_sha256)
    throw new Error('A stored observation failed its payload integrity check.');
  return observation(JSON.parse(payload));
}

export class ObservationCatalog {
  #db: DatabaseSync;
  constructor(path: string) {
    this.#db = new DatabaseSync(path);
    try {
      this.#db.exec(
        'PRAGMA foreign_keys=ON; PRAGMA busy_timeout=3000; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL;',
      );
      this.#db.exec(
        readFileSync(
          new URL('../../data/import-observations.sql', import.meta.url),
          'utf8',
        ),
      );
    } catch (error) {
      this.#db.close();
      throw error;
    }
  }
  close() {
    this.#db.close();
  }
  #transaction<T>(mode: 'IMMEDIATE' | 'DEFERRED', action: () => T): T {
    this.#db.exec(`BEGIN ${mode}`);
    try {
      const result = action();
      this.#db.exec('COMMIT');
      return result;
    } catch (error) {
      this.#db.exec('ROLLBACK');
      throw error;
    }
  }
  #read(runId: string): CatalogCheckpoint {
    const run = this.#db
      .prepare('SELECT source_url, started_at FROM catalog_run WHERE id=?')
      .get(runId);
    if (!run) throw new Error('Catalog run not found.');
    const last = this.#db
      .prepare(
        'SELECT page_number, payload_sha256, payload_json FROM catalog_page WHERE run_id=? ORDER BY page_number DESC LIMIT 1',
      )
      .get(runId);
    const page = last ? storedPage(last) : null;
    if (page && page.source !== run.source_url)
      throw new Error('Stored observation source does not match its run.');
    const count = this.#db
      .prepare(
        'SELECT COUNT(*) AS total FROM catalog_product_observation WHERE run_id=?',
      )
      .get(runId);
    return {
      runId,
      source: storedText(run.source_url),
      startedAt: storedText(run.started_at),
      pages: last ? storedCount(last.page_number) : 0,
      observations: storedCount(count?.total),
      progress: !page
        ? { kind: 'pending' }
        : page.next
          ? { kind: 'more', next: page.next }
          : page.next === null
            ? { kind: 'pagination-ended' }
            : { kind: 'preview-only' },
    };
  }
  checkpoint(runId: string) {
    return this.#transaction('DEFERRED', () => this.#read(runId));
  }
  start(runId: string, source: string, startedAt = new Date().toISOString()) {
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(runId))
      throw new Error(
        'Use a run ID of 1–100 letters, digits, dots, underscores or hyphens.',
      );
    const url = publicUrl(source).href;
    isoDate(startedAt);
    return this.#transaction('IMMEDIATE', () => {
      this.#db
        .prepare(
          'INSERT INTO catalog_run(id, source_url, started_at) VALUES(?,?,?) ON CONFLICT(id) DO NOTHING',
        )
        .run(runId, url, startedAt);
      const run = this.#read(runId);
      if (run.source !== url)
        throw new Error(
          'This run ID belongs to a different source. Use a new run ID.',
        );
      return run;
    });
  }
  append(
    runId: string,
    previousPages: number,
    value: unknown,
    extractor?: ReturnType<typeof archiveExtractor>,
  ): boolean {
    if (!Number.isSafeInteger(previousPages) || previousPages < 0)
      throw new Error('Invalid previous page count.');
    const page = observation(value);
    const payload = JSON.stringify(page);
    const hash = createHash('sha256').update(payload).digest('hex');
    if (
      extractor &&
      createHash('sha256').update(extractor.payload).digest('hex') !==
        extractor.sha256
    )
      throw new Error('Extractor archive failed its integrity check.');
    return this.#transaction('IMMEDIATE', () => {
      const run = this.#read(runId);
      if (page.source !== run.source)
        throw new Error('Observation source does not match the catalog run.');
      const existing = this.#db
        .prepare(
          'SELECT payload_sha256 FROM catalog_page WHERE run_id=? AND page_number=?',
        )
        .get(runId, previousPages + 1);
      if (existing) {
        if (existing.payload_sha256 === hash) return false;
        throw new Error(
          'This page already has different committed evidence. Restart from the saved checkpoint.',
        );
      }
      if (run.pages !== previousPages)
        throw new Error(
          'The catalog run advanced. Restart from its saved checkpoint.',
        );
      if (run.progress.kind !== 'pending' && run.progress.kind !== 'more')
        throw new Error(
          'This preview has ended. Start a new run to observe it again.',
        );
      const requested =
        run.progress.kind === 'more' ? JSON.stringify(run.progress.next) : null;
      if (page.next) {
        const next = JSON.stringify(page.next);
        if (
          next === requested ||
          this.#db
            .prepare(
              'SELECT 1 FROM catalog_page WHERE run_id=? AND request_cursor_json=?',
            )
            .get(runId, next)
        )
          throw new Error(
            'The source repeated an earlier pagination cursor. No page was committed.',
          );
      }
      const number = previousPages + 1;
      this.#db
        .prepare('INSERT INTO catalog_page VALUES(?,?,?,?,?,?,?,?)')
        .run(
          runId,
          number,
          page.observedAt,
          page.method,
          page.coverage,
          requested,
          hash,
          payload,
        );
      const insert = this.#db.prepare(
        'INSERT INTO catalog_product_observation VALUES(?,?,?,?,?,?,?,?,?)',
      );
      if (extractor) {
        this.#db
          .prepare(
            'INSERT INTO catalog_extractor VALUES(?,?) ON CONFLICT(sha256) DO NOTHING',
          )
          .run(extractor.sha256, extractor.payload);
        this.#db
          .prepare('INSERT INTO catalog_page_extractor VALUES(?,?,?)')
          .run(runId, number, extractor.sha256);
      }
      for (const [index, product] of page.products.entries())
        insert.run(
          runId,
          number,
          index,
          product.name,
          product.brand,
          product.url,
          product.sku,
          JSON.stringify(product.pricing),
          product.availability,
        );
      return true;
    });
  }
  export(runId: string) {
    return this.#transaction('DEFERRED', () => ({
      schemaVersion: 1,
      ...this.#read(runId),
      extractors: this.#db
        .prepare(
          'SELECT DISTINCT e.sha256, e.archive_json FROM catalog_extractor e JOIN catalog_page_extractor p ON p.extractor_sha256=e.sha256 WHERE p.run_id=? ORDER BY e.sha256',
        )
        .all(runId)
        .map((row) => {
          const archive = storedText(row.archive_json);
          if (createHash('sha256').update(archive).digest('hex') !== row.sha256)
            throw new Error(
              'Stored extractor archive failed its integrity check.',
            );
          return { sha256: storedText(row.sha256), archive };
        }),
      evidence: this.#db
        .prepare(
          'SELECT p.page_number, p.payload_sha256, p.payload_json, e.extractor_sha256 FROM catalog_page p LEFT JOIN catalog_page_extractor e USING(run_id, page_number) WHERE p.run_id=? ORDER BY p.page_number',
        )
        .all(runId)
        .map((row) => ({
          page: storedCount(row.page_number),
          sha256: storedText(row.payload_sha256),
          extractorSha256:
            row.extractor_sha256 === null
              ? null
              : storedText(row.extractor_sha256),
          result: storedPage(row),
        })),
    }));
  }
}

export async function collectCatalog(
  catalog: ObservationCatalog,
  options: {
    runId: string;
    source: string;
    targetPages: number;
    delayMs?: number;
  },
  loadPage: typeof importWebsite = importWebsite,
) {
  if (
    !Number.isInteger(options.targetPages) ||
    options.targetPages < 1 ||
    options.targetPages > 100
  )
    throw new Error('Choose a total page limit from 1 to 100.');
  const delayMs = options.delayMs ?? 1000;
  if (!Number.isFinite(delayMs) || delayMs < 0 || delayMs > 60000)
    throw new Error('Invalid delay between pages.');
  let run = catalog.start(options.runId, options.source);
  const extractor = loadPage === importWebsite ? archiveExtractor() : undefined;
  let requested = false;
  while (
    run.pages < options.targetPages &&
    (run.progress.kind === 'pending' || run.progress.kind === 'more')
  ) {
    if (requested) await delay(delayMs);
    const page = await loadPage(
      run.source,
      run.progress.kind === 'more' ? run.progress.next : undefined,
    );
    catalog.append(run.runId, run.pages, page, extractor);
    run = catalog.checkpoint(run.runId);
    requested = true;
  }
  return run;
}

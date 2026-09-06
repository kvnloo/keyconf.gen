import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export function archiveExtractor() {
  const files = Object.fromEntries(
    ['lib/import-products.ts', 'lib/product-pricing.ts'].map((path) => [
      path,
      readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8'),
    ]),
  );
  const payload = JSON.stringify({ files, runtime: process.version });
  return {
    sha256: createHash('sha256').update(payload).digest('hex'),
    payload,
  };
}

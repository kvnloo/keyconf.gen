CREATE TABLE IF NOT EXISTS catalog_run (
  id TEXT PRIMARY KEY,
  source_url TEXT NOT NULL,
  started_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS catalog_page (
  run_id TEXT NOT NULL REFERENCES catalog_run(id),
  page_number INTEGER NOT NULL CHECK(page_number > 0),
  observed_at TEXT NOT NULL,
  method TEXT NOT NULL,
  coverage TEXT NOT NULL,
  request_cursor_json TEXT CHECK(request_cursor_json IS NULL OR json_valid(request_cursor_json)),
  payload_sha256 TEXT NOT NULL CHECK(length(payload_sha256) = 64),
  payload_json TEXT NOT NULL CHECK(json_valid(payload_json)),
  PRIMARY KEY(run_id, page_number)
) STRICT;

CREATE TABLE IF NOT EXISTS catalog_product_observation (
  run_id TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  row_number INTEGER NOT NULL CHECK(row_number >= 0),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  product_url TEXT NOT NULL,
  sku TEXT NOT NULL,
  pricing_json TEXT NOT NULL CHECK(json_valid(pricing_json)),
  availability TEXT NOT NULL,
  PRIMARY KEY(run_id, page_number, row_number),
  FOREIGN KEY(run_id, page_number) REFERENCES catalog_page(run_id, page_number)
) STRICT;

CREATE INDEX IF NOT EXISTS catalog_product_history
  ON catalog_product_observation(product_url, sku);

CREATE TABLE IF NOT EXISTS catalog_extractor (
  sha256 TEXT PRIMARY KEY CHECK(length(sha256) = 64),
  archive_json TEXT NOT NULL CHECK(json_valid(archive_json))
) STRICT;

CREATE TABLE IF NOT EXISTS catalog_page_extractor (
  run_id TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  extractor_sha256 TEXT NOT NULL REFERENCES catalog_extractor(sha256),
  PRIMARY KEY(run_id, page_number),
  FOREIGN KEY(run_id, page_number) REFERENCES catalog_page(run_id, page_number)
) STRICT;

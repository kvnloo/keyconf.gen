PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS source_document (
 id TEXT PRIMARY KEY, title TEXT NOT NULL, publisher TEXT NOT NULL, url TEXT NOT NULL,
 accessed_at TEXT NOT NULL, published_at TEXT, rights_status TEXT NOT NULL,
 coverage TEXT NOT NULL, content_sha256 TEXT
);
CREATE TABLE IF NOT EXISTS product (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, brand TEXT NOT NULL,
 category TEXT NOT NULL CHECK(category IN ('keyboard','case','pcb','plate','switch','keycaps','stabilizer')),
 source_id TEXT NOT NULL REFERENCES source_document(id), review_status TEXT NOT NULL DEFAULT 'research_seed'
);
CREATE TABLE IF NOT EXISTS product_revision (
 id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES product(id), revision TEXT NOT NULL,
 source_id TEXT REFERENCES source_document(id), UNIQUE(product_id,revision)
);
CREATE TABLE IF NOT EXISTS spec_claim (
 id TEXT PRIMARY KEY, product_id TEXT REFERENCES product(id), subject TEXT NOT NULL, field TEXT NOT NULL,
 value_json TEXT NOT NULL CHECK(json_valid(value_json)), unit TEXT, source_id TEXT NOT NULL REFERENCES source_document(id),
 status TEXT NOT NULL CHECK(status IN ('manufacturer_claim','measured','documented','unknown','conflicting')),
 conditions TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS firmware_target (
 source_id TEXT NOT NULL REFERENCES source_document(id), target_id TEXT NOT NULL,
 name TEXT, manufacturer TEXT, payload_json TEXT NOT NULL CHECK(json_valid(payload_json)),
 PRIMARY KEY(source_id,target_id)
);
CREATE TABLE IF NOT EXISTS layout (
 id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES source_document(id), target_id TEXT NOT NULL,
 layout_name TEXT NOT NULL, key_count INTEGER NOT NULL, geometry_json TEXT NOT NULL CHECK(json_valid(geometry_json))
);
CREATE TABLE IF NOT EXISTS compatibility_rule (
 id TEXT PRIMARY KEY, subject_id TEXT NOT NULL REFERENCES product(id), counterpart_id TEXT NOT NULL REFERENCES product(id),
 verdict TEXT NOT NULL CHECK(verdict IN ('compatible','incompatible','unknown')),
 conditions TEXT NOT NULL, source_id TEXT NOT NULL REFERENCES source_document(id)
);
CREATE TABLE IF NOT EXISTS popularity_observation (
 id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES product(id), metric TEXT NOT NULL,
 value REAL NOT NULL, population TEXT NOT NULL, period TEXT NOT NULL,
 source_id TEXT NOT NULL REFERENCES source_document(id)
);
CREATE TABLE IF NOT EXISTS vendor_offer (
 id TEXT PRIMARY KEY, product_revision_id TEXT NOT NULL REFERENCES product_revision(id),
 vendor TEXT NOT NULL, url TEXT NOT NULL, sku TEXT, region TEXT
);
CREATE TABLE IF NOT EXISTS offer_observation (
 id TEXT PRIMARY KEY, offer_id TEXT NOT NULL REFERENCES vendor_offer(id), observed_at TEXT NOT NULL,
 price_minor INTEGER, currency TEXT, pack_quantity INTEGER, availability TEXT,
 source_id TEXT NOT NULL REFERENCES source_document(id)
);
CREATE TABLE IF NOT EXISTS asset (
 id TEXT PRIMARY KEY, product_revision_id TEXT REFERENCES product_revision(id),
 kind TEXT NOT NULL CHECK(kind IN ('cad','mesh','texture','material','audio')),
 url TEXT NOT NULL, sha256 TEXT, rights_status TEXT NOT NULL,
 fidelity TEXT NOT NULL, source_id TEXT NOT NULL REFERENCES source_document(id),
 metadata_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(metadata_json))
);
CREATE INDEX IF NOT EXISTS idx_product_category ON product(category);
CREATE INDEX IF NOT EXISTS idx_claim_subject_field ON spec_claim(subject,field);
CREATE INDEX IF NOT EXISTS idx_layout_target ON layout(source_id,target_id);

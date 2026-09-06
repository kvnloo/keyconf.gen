import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const catalogSnapshots = sqliteTable('catalog_snapshot', {
  id: text('id').primaryKey(),
  source: text('source').notNull(),
  payload: text('payload').notNull(),
  publishedAt: text('published_at').notNull(),
});

export const catalogPublications = sqliteTable('catalog_publication', {
  source: text('source').primaryKey(),
  snapshotId: text('snapshot_id')
    .notNull()
    .references(() => catalogSnapshots.id),
});

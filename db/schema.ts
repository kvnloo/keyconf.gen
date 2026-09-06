import { index, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

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

export const communityAccounts = sqliteTable('community_account', {
  id: text('id').primaryKey(),
  subject: text('subject').notNull().unique(),
  createdAt: text('created_at').notNull(),
});

export const communityProfiles = sqliteTable('community_profile', {
  accountId: text('account_id')
    .primaryKey()
    .references(() => communityAccounts.id),
  handle: text('handle').notNull().unique(),
  displayName: text('display_name').notNull(),
  bio: text('bio').notNull(),
  links: text('links').notNull().default('[]'),
});

export const communityBuilds = sqliteTable(
  'community_build',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id')
      .notNull()
      .references(() => communityAccounts.id),
    operationId: text('operation_id').notNull(),
    requestDigest: text('request_digest').notNull(),
    name: text('name').notNull(),
    payload: text('payload').notNull(),
    evidence: text('evidence').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    uniqueIndex('community_build_account_operation').on(
      table.accountId,
      table.operationId,
    ),
    index('community_build_account_created').on(
      table.accountId,
      table.createdAt,
      table.id,
    ),
  ],
);

export const communityPublications = sqliteTable(
  'community_publication',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id')
      .notNull()
      .references(() => communityAccounts.id),
    buildId: text('build_id')
      .notNull()
      .references(() => communityBuilds.id),
    operationId: text('operation_id').notNull(),
    requestDigest: text('request_digest').notNull(),
    metadata: text('metadata').notNull(),
    author: text('author').notNull(),
    publishedAt: text('published_at').notNull(),
    withdrawnAt: text('withdrawn_at'),
  },
  (table) => [
    uniqueIndex('community_publication_account_operation').on(
      table.accountId,
      table.operationId,
    ),
    index('community_publication_account_published').on(
      table.accountId,
      table.publishedAt,
      table.id,
    ),
  ],
);

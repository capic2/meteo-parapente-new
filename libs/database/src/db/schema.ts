import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const settingsTable = sqliteTable('settings', {
  providerKey: text('provider_key').primaryKey(),
});

export const providerTable = sqliteTable('provider', {
  key: text('key').primaryKey(),
  name: text('name').notNull(),
});
export type DbProviderInsertType = typeof providerTable.$inferInsert;



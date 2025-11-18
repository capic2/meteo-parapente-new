import Database from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { populateDb } from './dbClient';

const MIGRATIONS_FOLDER = `${import.meta.dirname}/../drizzle`;

export async function createTestDatabase(): Promise<{
  db: BetterSQLite3Database;
  sqlite: Database.Database;
}> {
  const sqlite = new Database(':memory:');
  const db = drizzle(sqlite);

  // Lire et exécuter les migrations SQL
  const migrationFiles = readdirSync(MIGRATIONS_FOLDER)
    .filter((file) => file.endsWith('.sql'))
    .sort(); // Important : ordre chronologique

  for (const file of migrationFiles) {
    const sqlContent = readFileSync(join(MIGRATIONS_FOLDER, file), 'utf-8');
    sqlite.exec(sqlContent);
  }

  await populateDb(db);

  return { db, sqlite };
}

export function closeTestDatabase(sqlite: Database.Database) {
  sqlite.close();
}

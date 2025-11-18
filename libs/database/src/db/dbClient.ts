import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { providerTable } from './schema';

export const populateDb = async (db: BetterSQLite3Database) => {
  if ((await db.$count(providerTable)) === 0) {
    await populateProviders(db);
  }
};

const populateProviders = async (db: BetterSQLite3Database) => {
  await db.insert(providerTable).values({
    key: 'meteo-blue',
    name: 'Meteo Blue',
  });
  await db.insert(providerTable).values({
    key: 'meteo-parapente',
    name: 'Meteo Parapente',
  });
  await db.insert(providerTable).values({
    key: 'meteo-ciel',
    name: 'Meteo Ciel',
  });
};

export const connect = async ({ path }: { path: string }) => {
  const sqlite = new Database(path);
  const db = drizzle(sqlite);

  await populateDb(db);

  return { db };
};

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { providerTable } from './schema';
import 'dotenv/config';

const client = createClient({
  url: import.meta.url + process.env.DB_FILE_NAME,
});
export const db = drizzle({ client });

const populateProviders = async () => {
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

export const populateDb = async () => {
  if ((await db.select().from(providerTable).all()).length === 0) {
    await populateProviders();
  }
};

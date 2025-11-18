import { MeteoDataType } from '@meteo-parapente-new/common-types';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

declare module 'fastify' {
  interface FastifyInstance {
    db: BetterSQLite3Database;
  }
}

export type MeteoProperty = Record<string, MeteoDataType>;

export type MeteoStandardProviderStructure = Record<
  string,
  Record<string, MeteoProperty> | MeteoProperty
>;


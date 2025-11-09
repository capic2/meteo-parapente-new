import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { workspaceRoot } from '@nx/devkit';

export default defineConfig({
  out: './drizzle',
  schema: `${workspaceRoot}/libs/database/src/db/schema.ts`,
  dialect: 'sqlite',
  dbCredentials: {
    url: `${workspaceRoot}/apps/meteo-parapente-new-server/${process.env.DB_FILE_NAME!}`,
  },
});

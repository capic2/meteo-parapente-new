import '@dotenvx/dotenvx';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'libs/database/drizzle',
  schema: `libs/database/src/db/schema.ts`,
  dialect: 'sqlite',

  dbCredentials: {
    url: `${process.env.DB_FILE_NAME!}`,
  },
});

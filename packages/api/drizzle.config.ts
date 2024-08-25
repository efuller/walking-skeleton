import 'dotenv/config'; // make sure to install dotenv package
import { defineConfig } from 'drizzle-kit';
import isCI from 'is-ci';

const outPath = isCI && process.env.NODE_ENV === 'production' ? './packages/api/src/shared/persistence/drizzle' : './src/shared/persistence/drizzle';
const schemaPath = isCI && process.env.NODE_ENV === 'production' ? './packages/api/src/shared/persistence/drizzle/schema.ts' : './src/shared/persistence/drizzle/schema.ts';

export default defineConfig({
  dialect: 'postgresql',
  out: outPath,
  schema: schemaPath,
  dbCredentials: {
    ssl: false,
    url: process.env.DATABASE_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: false,
  schemaFilter: ['public'],
});

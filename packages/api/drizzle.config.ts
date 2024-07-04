import 'dotenv/config'; // make sure to install dotenv package
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './src/shared/persistence/drizzle',
  schema: './src/shared/persistence/drizzle/schema.ts',
  dbCredentials: {
    ssl: false,
    url: process.env.DATABASE_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: false,
});

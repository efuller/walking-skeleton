import 'dotenv/config'; // make sure to install dotenv package
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './src/shared/persistence/drizzle',
  schema: './src/shared/persistence/drizzle/schema.ts',
  dbCredentials: {
    ssl: false,
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: false,
});

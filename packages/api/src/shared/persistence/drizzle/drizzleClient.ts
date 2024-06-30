import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from "drizzle-orm"
import { Client } from 'pg';
import * as schema from './schema';

import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';

export class DrizzleClient {
  private readonly drizzleClient;
  private readonly client: Client;

  private constructor(drizzleClient: NodePgDatabase<typeof schema>, client: Client) {
    this.client = client;
    this.drizzleClient = drizzleClient;
  }

  public static async create() {
    const client = new Client({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    });

    await client.connect();

    const drizzleClient = drizzle(client, { schema });

    return new DrizzleClient(drizzleClient, client);
  }

  getClient() {
    return this.drizzleClient;
  }

  async disconnect() {
    await this.client.end();
  }

  async isConnected(): Promise<boolean> {
    const result = await this.drizzleClient.execute(sql`SELECT 1`);

    if (!Array.isArray(result.rows) || result.rows.length !== 1) {
      return false;
    }
    return true;
  }

  async reset() {
    const query = sql<string>`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

    const tables = await this.drizzleClient.execute(query);// retrieve tables

    const test = [...[tables]];

    for (const table of test) {
      // @ts-expect-error Not great but it works.
      const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
      await this.drizzleClient.execute(query); // Truncate (clear all the data) the table
    }
  }
}

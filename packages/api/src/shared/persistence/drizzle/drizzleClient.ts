// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from "drizzle-orm"
import { Client } from 'pg';
import * as schema from './schema';

import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';

export class DrizzleClient {
  private readonly drizzleClient;
  private readonly client: Client;

  public constructor(drizzleClient: NodePgDatabase<typeof schema>, client: Client) {
    this.client = client;
    this.drizzleClient = drizzleClient;
  }

  public static async create() {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
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
}

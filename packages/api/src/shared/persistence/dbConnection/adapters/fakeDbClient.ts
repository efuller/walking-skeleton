import { DbConnection } from '@efuller/api/src/shared/persistence/dbConnection/dbConnection';
import { DbClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';

export class FakeDbClient implements DbConnection<DbClient> {
  getClient(): DbClient {
    return {} as DbClient;
  }

  disconnect(): Promise<void> {
    return Promise.resolve();
  }
}
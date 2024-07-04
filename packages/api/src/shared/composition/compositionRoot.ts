import { ApiServer } from '../http/apiServer';
import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';
import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { Database } from '@efuller/api/src/shared/persistence/database';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';

export class CompositionRoot {
  private readonly db: Database;
  private readonly apiServer: ApiServer;

  /**
   * TODO: Create an abstraction for a database client class.
   */
  constructor(private readonly drizzleClient: DrizzleClient) {
    this.db = this.createDatabase(drizzleClient);
    this.apiServer = this.createApiServer();
  }

  public static async create() {
    const drizzleClient = await DrizzleClient.create();
    const compositionRoot = new CompositionRoot(drizzleClient);
    return compositionRoot;
  }

  private createDatabase(drizzleClient: DrizzleClient) {
    return {
      journals: new DrizzleJournalRepo(drizzleClient),
      reset: async () => {
        await drizzleClient.reset();
      }
    }
  }

  createApiServer() {
    const journalService = new JournalService(this.db);
    const journalController = new JournalController(journalService);

    return new ApiServer({ journal: journalController });
  }

  getApiServer() {
    return this.apiServer;
  }

  getDatabase() {
    return this.db;
  }

  async disconnectDb() {
    await this.drizzleClient.disconnect();
  }
}
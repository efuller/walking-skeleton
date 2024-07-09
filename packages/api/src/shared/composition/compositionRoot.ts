import { ApiServer } from '../http/apiServer';
import { JournalController } from '@efuller/api/src/modules/journals/journal.controller';
import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { Database } from '@efuller/api/src/shared/persistence/database';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';

export class CompositionRoot {
  private static instance: CompositionRoot;
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
    if (!CompositionRoot.instance) {
      const drizzleClient = await DrizzleClient.create();
      CompositionRoot.instance = new CompositionRoot(drizzleClient);
    }
    return CompositionRoot.instance;
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

  static getInstance() {
   if (!CompositionRoot.instance) {
      throw new Error('CompositionRoot not initialized. Call create() first.');
   }
    return CompositionRoot.instance;
  }

  async disconnectDb() {
    await this.drizzleClient.disconnect();
  }
}
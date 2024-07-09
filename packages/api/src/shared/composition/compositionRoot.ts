import { ApiServer } from '../http/apiServer';
import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { Database } from '@efuller/api/src/shared/persistence/database';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';
import { AppInterface } from '@efuller/api/src/shared/application';

export class CompositionRoot {
  private static instance: CompositionRoot;
  private readonly db: Database;
  private readonly apiServer: ApiServer;
  private readonly application!: AppInterface;

  /**
   * TODO: Create an abstraction for a database client class.
   */
  constructor(private readonly drizzleClient: DrizzleClient) {
    this.db = this.createDatabase(drizzleClient);
    this.application = this.createApplication();
    this.apiServer = this.createApiServer();
  }

  public static async create() {
    if (!CompositionRoot.instance) {
      const drizzleClient = await DrizzleClient.create();
      CompositionRoot.instance = new CompositionRoot(drizzleClient);
    }
    return CompositionRoot.instance;
  }

  private createJournalService() {
    return new JournalService(this.db);
  }

  private createApplication(): AppInterface {
    return {
      journals: this.getJournalService(),
    }
  }

  public getJournalService() {
    if (!this.application?.journals) {
      return this.createJournalService();
    }
    return this.application.journals;
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
    return new ApiServer(this.application);
  }

  public getApiServer() {
    return this.apiServer;
  }

  public getDatabase() {
    return this.db;
  }

  public static getInstance() {
   if (!CompositionRoot.instance) {
      throw new Error('CompositionRoot not initialized. Call create() first.');
   }
    return CompositionRoot.instance;
  }

  public async disconnectDb() {
    await this.drizzleClient.disconnect();
  }
}
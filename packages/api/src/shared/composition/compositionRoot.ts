import { ApiServer } from '../http/apiServer';
import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';
import { AppInterface } from '@efuller/api/src/shared/application';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';

export class CompositionRoot {
  private static instance: CompositionRoot;
  private readonly apiServer: ApiServer;
  private readonly application!: AppInterface;
  private readonly journalsRepo: JournalRepo;

  /**
   * TODO: Create an abstraction for a database client class.
   */
  constructor(private readonly drizzleClient: DrizzleClient) {
    this.application = this.createApplication();
    this.apiServer = this.createApiServer();
    this.journalsRepo = this.createJournalRepo(drizzleClient);
  }

  public static async create() {
    if (!CompositionRoot.instance) {
      const drizzleClient = await DrizzleClient.create();
      CompositionRoot.instance = new CompositionRoot(drizzleClient);
    }
    return CompositionRoot.instance;
  }

  private createJournalRepo(drizzleClient: DrizzleClient) {
    return new DrizzleJournalRepo(drizzleClient);
  }

  private createJournalService() {
    return new JournalService(this.journalsRepo);
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

  createApiServer() {
    return new ApiServer(this.application);
  }

  public getApiServer() {
    return this.apiServer;
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
import { ApiServer } from '../http/apiServer';
import { JournalService } from '@efuller/api/src/modules/journals/journal.service';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { DrizzleJournalRepo } from '@efuller/api/src/modules/journals/adapters/drizzleJournal.repo';
import { AppInterface } from '@efuller/api/src/shared/application';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { DbConnection } from '@efuller/api/src/shared/persistence/dbConnection/dbConnection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';
import * as schema from '@efuller/api/src/shared/persistence/drizzle/schema';
import { InMemoryJournalRepo } from '@efuller/api/src/modules/journals/adapters/inMemoryJournal.repo';
import { FakeDbClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/fakeDbClient';

type Context = 'test' | 'test:unit' | 'development' | 'production';

export class CompositionRoot {
  private static instance: CompositionRoot;
  private readonly apiServer: ApiServer;
  private readonly application!: AppInterface;
  private readonly journalsRepo: JournalRepo;

  /**
   * TODO: Create an abstraction for a database client class.
   */
  constructor(
    private readonly context: Context,
    private readonly dbClient: DbConnection<NodePgDatabase<typeof schema>>
  ) {
    this.journalsRepo = this.createJournalRepo();
    this.application = this.createApplication();
    this.apiServer = this.createApiServer();
  }

  /**
   * @todo: We could remove this static factory method and use a bootstrap function instead and inject the db client.
   */
  public static async create(context: Context = 'development') {
    if (!CompositionRoot.instance) {

      if (context === 'test:unit') {
        CompositionRoot.instance = new CompositionRoot(context, new FakeDbClient());
        return CompositionRoot.instance;
      }

      const dbClient = await DrizzleClient.create();
      CompositionRoot.instance = new CompositionRoot(context, dbClient);
    }
    return CompositionRoot.instance;
  }

  private createJournalRepo() {
    if (this.context === 'test:unit') {
      return new InMemoryJournalRepo();
    }
    return new DrizzleJournalRepo(this.dbClient.getClient());
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
    await this.dbClient.disconnect();
  }
}
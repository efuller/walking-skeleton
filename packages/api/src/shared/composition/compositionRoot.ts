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
import { MembersService } from '@efuller/api/src/modules/members/members.service';
import { MembersRepo } from '@efuller/api/src/modules/members/ports/members.repo';
import { InMemoryMembersRepo } from '@efuller/api/src/modules/members/adapters/inMemoryMembersRepo';
import { DrizzleMembersRepo } from '@efuller/api/src/modules/members/adapters/drizzleMembers.repo';
import { AuthMiddleware } from '@efuller/api/src/shared/http/middleware/auth.middleware';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';
import { SupabaseAuthenticator } from '@efuller/shared/src/modules/auth/adapters/supabaseAuthenticator';
import { MockAuthenticator } from '@efuller/shared/src/modules/auth/adapters/mockAuthenticator';

export type Context = 'test' | 'test:unit' | 'development' | 'production';

export class CompositionRoot {
  private static instance: CompositionRoot;
  private readonly apiServer: ApiServer;
  private readonly application!: AppInterface;
  private readonly journalsRepo: JournalRepo;
  private readonly membersRepo: MembersRepo;
  private readonly authService: AuthService;
  private readonly authMiddleware: AuthMiddleware;

  private constructor(
    private readonly context: Context,
    private readonly dbClient: DbConnection<NodePgDatabase<typeof schema>>
  ) {
    this.authService = this.createAuthService();
    this.authMiddleware = this.createAuthMiddleware();
    this.journalsRepo = this.createJournalRepo();
    this.membersRepo = this.createMembersRepo();
    this.application = this.createApplication();
    this.apiServer = this.createApiServer();
  }

  /**
   * TODO: We could remove this static factory method and use a bootstrap function instead and inject the db client.
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

  public getApplication() {
    return this.application;
  }

  private createApplication(): AppInterface {
    return {
      journals: this.getJournalService(),
      members: this.getMembersService(),
      authMiddleware: this.getAuthMiddleware(),
    }
  }

  public getAuthMiddleware() {
    return this.authMiddleware;
  }

  public createAuthMiddleware() {
    return new AuthMiddleware(this.getAuthService());
  }

  private createAuthService() {
    return new AuthService(this.createAuthenticator());
  }

  private createAuthenticator() {
    if (this.context === 'test:unit') {
      return new MockAuthenticator();
    }
    return new SupabaseAuthenticator();
  }

  public getAuthService() {
    return this.authService;
  }

  public getMembersService() {
    if (!this.application?.members) {
      return this.createMembersService();
    }
    return this.application.members;
  }

  private createMembersService() {
    return new MembersService(this.membersRepo);
  }

  private createMembersRepo() {
    if (this.context === 'test:unit') {
      return new InMemoryMembersRepo();
    }
    return new DrizzleMembersRepo(this.dbClient.getClient());
  }

  public getJournalService() {
    if (!this.application?.journals) {
      return this.createJournalService();
    }
    return this.application.journals;
  }

  private createJournalService() {
    return new JournalService(this.journalsRepo);
  }

  createApiServer() {
    return new ApiServer(this.application, this.context);
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
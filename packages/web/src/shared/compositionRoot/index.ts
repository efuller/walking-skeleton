import { AuthModule } from '@/modules/auth/auth.module.ts';
import { AppRouter } from '@/shared/router';
import { MembersModule } from '@/modules/members/members.module.ts';
import { ClientApi } from '@efuller/shared/src/api';
import { AppConfig } from '@/shared/appConfig';

export class CompositionRoot {
  private static instance: CompositionRoot;
  private readonly authModule: AuthModule;
  private readonly membersModule: MembersModule;
  private readonly appRouter: AppRouter;
  private readonly clientApi: ClientApi;
  private readonly apiUrl = process.env.API_URL || 'http://localhost:3000';

  private constructor(private readonly config: AppConfig) {
    this.clientApi = ClientApi.create(this.apiUrl, this.config);
    this.authModule = new AuthModule(this.config);
    this.membersModule = new MembersModule(this.config, this.clientApi.app.app.members);
    this.appRouter = new AppRouter(this.authModule, this.membersModule);
  }

  public static async create(config: AppConfig) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new CompositionRoot(config);
    }
    return CompositionRoot.instance;
  }

  public static getInstance() {
    if (!CompositionRoot.instance) {
      throw new Error('CompositionRoot not initialized. Call create() first.');
    }
    return CompositionRoot.instance;
  }

  public getAuthModule() {
    return this.authModule;
  }

  public getMembersModule() {
    return this.membersModule;
  }

  public getAppRouter() {
    return this.appRouter;
  }

  public getClientApi() {
    return this.clientApi.app;
  }
}
import { AuthModule } from '@/modules/auth/auth.module.ts';
import { AppRouter } from '@/shared/router';
import { MembersModule } from '@/modules/members/members.module.ts';

export class CompositionRoot {
  private static instance: CompositionRoot;
  private readonly authModule: AuthModule;
  private readonly membersModule: MembersModule;
  private readonly appRouter: AppRouter;

  private constructor(private readonly context: 'test' | 'production' = 'production') {
    this.authModule = new AuthModule(context);
    this.membersModule = new MembersModule(context);
    this.appRouter = new AppRouter(this.authModule);
  }

  public static async create(context: 'test' | 'production' = 'production') {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new CompositionRoot(context);
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
}
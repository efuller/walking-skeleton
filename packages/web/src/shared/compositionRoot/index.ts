import { AuthModule } from '@/modules/auth/auth.module.ts';
import { AppRouter } from '@/shared/router';

export class CompositionRoot {
  private readonly authModule: AuthModule;
  private readonly appRouter: AppRouter;

  constructor(private readonly context: 'test' | 'production' = 'production') {
    this.authModule = new AuthModule(context);
    this.appRouter = new AppRouter(this.authModule);
  }

  public getAuthModule() {
    return this.authModule;
  }

  public getAppRouter() {
    return this.appRouter;
  }
}
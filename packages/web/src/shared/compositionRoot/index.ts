import { AuthModule } from '@/modules/auth/auth.module.ts';

export class CompositionRoot {
  private readonly authModule: AuthModule;

  constructor(private readonly context: 'test' | 'production' = 'production') {
    this.authModule = new AuthModule(context);
  }

  public getAuthModule() {
    return this.authModule;
  }
}
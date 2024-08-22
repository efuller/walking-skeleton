import { AuthPresenter } from './auth.presenter';
import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { AuthService } from '@/modules/auth/auth.service.ts';
import { SupabaseAuthenticator } from '@/modules/auth/adapters/supabaseAuthenticator.ts';
import { MockAuthenticator } from '@/modules/auth/adapters/mockAuthenticator.ts';
import { AuthRepo } from '@/modules/auth/auth.repo.ts';
import { AuthController } from './auth.controller';
import { AppConfig } from '@/shared/appConfig';

export class AuthModule {
  private readonly authPresenter: AuthPresenter;
  private readonly authenticator!: Authenticator;
  private readonly authRepo: AuthRepo;
  private readonly authService: AuthService;
  private readonly authController: AuthController;

  constructor(private readonly config: AppConfig){
    this.authRepo = new AuthRepo();
    this.authPresenter = new AuthPresenter(this.authRepo);
    this.authenticator = this.buildAuthenticator();
    this.authService = new AuthService(this.authenticator);
    this.authController = new AuthController(this.authService, this.authRepo);
  }

  private buildAuthenticator() {
    if (!this.config.useMocks()) {
      return new SupabaseAuthenticator();
    }

    return new MockAuthenticator();
  }

  public getAuthPresenter() {
    return this.authPresenter;
  }

  public getAuthenticator() {
    return this.authenticator;
  }

  public getAuthController() {
    return this.authController;
  }
}
import { AuthPresenter } from './auth.presenter';
import { AuthController } from './auth.controller';
import { Authenticator } from './ports/authenticator';
import { AuthService } from './auth.service';
import { AuthRepo } from './auth.repo';
import { SupabaseAuthenticator } from './adapters/supabaseAuthenticator';
import { MockAuthenticator } from './adapters/mockAuthenticator';
import { AppConfig } from '../../shared/appConfig';

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

  public getAccessToken() {
    return this.authRepo.getAccessToken();
  }
}
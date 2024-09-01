import { AuthRepo } from './auth.repo';
import { AuthService } from '@efuller/shared/src/modules/auth/auth.service';

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  email: string;
  password: string;
}

export class AuthController {
  constructor(
    public readonly authService: AuthService,
    public readonly authRepo: AuthRepo,
  ){}

  public async register(user: UserRegisterDto) {
    try {
      const result = await this.authService.register(user);
      if (result) {
        this.authRepo.setAuthenticated(true);
        this.authRepo.setUser(result.data.data.user);
        this.authRepo.setAccessToken(result.data.data.session?.access_token || '');
        return;
      }
      this.authRepo.setAuthenticated(false);
      this.authRepo.setUser(null);
      this.authRepo.setAccessToken('');
      return;
    } catch (error) {
      this.authRepo.setAuthenticated(false);
      this.authRepo.setUser(null);
      this.authRepo.setAccessToken('');
      console.error('Error logging in', error);
    }
  }

  public async login(user: UserLoginDto) {
    try {
      const result = await this.authService.login(user);
      if (result.success) {
        this.authRepo.setAuthenticated(true);
        this.authRepo.setUser(result.data.data.user);
        this.authRepo.setAccessToken(result.data.data.session?.access_token || '');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  public async logout() {
    try {
      await this.authService.logout();
      this.authRepo.setAuthenticated(false);
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  public async refreshSession() {
    try {
      const result = await this.authService.getSession();
      if (result.success) {
        this.authRepo.setAuthenticated(true);
        this.authRepo.setUser(result.data.data.user);
        this.authRepo.setAccessToken(result.data.data.session?.access_token || '');
        return true;
      }
      return false
    } catch (error) {
      console.error('Error refreshing session', error);
    }
  }
}
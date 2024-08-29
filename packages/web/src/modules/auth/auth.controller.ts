import { AuthService } from '@/modules/auth/auth.service.ts';
import { AuthRepo } from '@/modules/auth/auth.repo.ts';

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
        return;
      }
      this.authRepo.setAuthenticated(false);
      this.authRepo.setUser(null);
      return;
    } catch (error) {
      this.authRepo.setAuthenticated(false);
      this.authRepo.setUser(null);
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
        return true;
      }
      return false
    } catch (error) {
      console.error('Error refreshing session', error);
    }
  }
}
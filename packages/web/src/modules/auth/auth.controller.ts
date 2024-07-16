import { AuthService } from '@/modules/auth/auth.service.ts';
import { AuthRepo } from '@/modules/auth/auth.repo.ts';

export interface UserLoginDto {
  email: string;
  password: string;
}

export class AuthController {
  constructor(
    public readonly authService: AuthService,
    public readonly authRepo: AuthRepo,
  ){}

  public async login(user: UserLoginDto) {
    try {
      const result = await this.authService.login(user);
      if (result.success) {
        this.authRepo.setAuthenticated(true);
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  }
}
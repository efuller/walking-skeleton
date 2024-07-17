import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { ApiResponse } from '@efuller/shared/dist/api';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';

export class AuthService {
  constructor(private readonly authClient: Authenticator) {}

  async login(user: UserLoginDto): Promise<ApiResponse<null>> {
    const result = await this.authClient.login(user);

    if (!result) {
      return {
        success: false,
        data: null,
        error: 'Error logging in',
      };
    }

    return {
      success: true,
      data: null
    };
  }

  async register(user: UserRegisterDto): Promise<boolean> {
    return await this.authClient.register(user);
  }

  async logout(): Promise<void> {
    await this.authClient.logout();
  }

  async getSession(): Promise<ApiResponse<null>> {
    return await this.authClient.refreshSession();
  }
}

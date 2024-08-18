import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { ApiResponse } from '@efuller/shared/dist/api';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

export class AuthService {
  constructor(private readonly authClient: Authenticator) {}

  async login(user: UserLoginDto): Promise<ApiResponse<AuthTokenResponsePassword>> {
    const result = await this.authClient.login(user);

    if (!result) {
      return {
        success: false,
        data: result,
        error: new Error('Invalid credentials'),
      };
    }

    return {
      success: true,
      data: result
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

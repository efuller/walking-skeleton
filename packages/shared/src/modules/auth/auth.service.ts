import { ApiResponse } from '@efuller/shared/dist/api';
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
import { Authenticator } from '@efuller/shared/src/modules/auth/ports/authenticator';
import { UserLoginDto, UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

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

  async register(user: UserRegisterDto): Promise<ApiResponse<AuthResponse>> {
    const result = await this.authClient.register(user);

    if (result.error) {
      return {
        success: false,
        data: result,
        error: new Error(result.error.message),
      };
    }

    return {
      success: true,
      data: result
    };
  }

  async logout(): Promise<void> {
    await this.authClient.logout();
  }

  async getSession(): Promise<ApiResponse<AuthResponse>> {
    const result = await this.authClient.refreshSession();

    if (result.error) {
      return {
        success: false,
        data: result,
        error: new Error(result.error.message),
      };
    }

    return {
      success: true,
      data: result
    };
  }
}

import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { ApiResponse } from '@efuller/shared/dist/api';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { AuthResponse, AuthTokenResponsePassword, UserResponse } from '@supabase/supabase-js';

export class AuthService {
  constructor(private readonly authClient: Authenticator) {}

  async login(user: UserLoginDto): Promise<ApiResponse<AuthTokenResponsePassword>> {
    const result = await this.authClient.login(user);

    if (result.error) {
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

  async authorize(token: string): Promise<ApiResponse<UserResponse>> {
    const result = await this.authClient.authorize(token);

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

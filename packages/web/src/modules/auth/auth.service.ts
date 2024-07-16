import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { ApiResponse } from '@efuller/shared/dist/api';
import { UserLoginDto } from '@/modules/auth/auth.controller.ts';

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

  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getSession(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

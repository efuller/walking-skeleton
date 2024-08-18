import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { ApiResponse } from '@efuller/shared/dist/api';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

export class MockAuthenticator implements Authenticator {
  private loginResponse!: AuthTokenResponsePassword;

  public async login(user: UserLoginDto): Promise<AuthTokenResponsePassword> {
    console.log('Logging user in', user);
    return this.loginResponse;
  }

  public async logout(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async refreshSession(): Promise<ApiResponse<null>> {
    throw new Error('Method not implemented.');
  }

  public setLoginResponse(response: AuthTokenResponsePassword) {
    this.loginResponse = response;
  }

  register(user: UserRegisterDto): Promise<boolean> {
    console.log('Registering user', user);
    return Promise.resolve(false);
  }
}
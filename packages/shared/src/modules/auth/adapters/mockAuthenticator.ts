import { Authenticator } from '@efuller/shared/src/modules/auth/ports/authenticator';
import { AuthResponse, AuthTokenResponsePassword, UserResponse } from '@supabase/supabase-js';
import { UserLoginDto, UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

export class MockAuthenticator implements Authenticator {
  private loginResponse!: AuthTokenResponsePassword;

  public async login(user: UserLoginDto): Promise<AuthTokenResponsePassword> {
    console.log('Logging user in', user);
    return this.loginResponse;
  }

  public async logout(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async refreshSession(): Promise<AuthResponse> {
    throw new Error('Method not implemented.');
  }

  public setLoginResponse(response: AuthTokenResponsePassword) {
    this.loginResponse = response;
  }

  register(user: UserRegisterDto): Promise<AuthResponse> {
    console.log('Registering user', user);
    return Promise.resolve({} as AuthResponse);
  }

  authorize(token: string): Promise<UserResponse> {
    console.log('Authorized user token', token);
    return Promise.resolve({} as UserResponse);
  }
}
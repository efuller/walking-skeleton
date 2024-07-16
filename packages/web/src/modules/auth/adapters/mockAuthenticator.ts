import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { UserLoginDto } from '@/modules/auth/auth.controller.ts';

export class MockAuthenticator implements Authenticator {
  private loginResponse = false;

  public async login(user: UserLoginDto): Promise<boolean> {
    console.log('Logging user in', user);
    return this.loginResponse;
  }

  public async logout(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async getSession(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public setLoginResponse(response: boolean) {
    this.loginResponse = response;
  }
}
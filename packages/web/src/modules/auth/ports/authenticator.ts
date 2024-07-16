import { UserLoginDto } from '@/modules/auth/auth.controller.ts';

export interface Authenticator {
  login(user: UserLoginDto): Promise<boolean>;
  logout(): Promise<boolean>;
  getSession(): Promise<void>;
}
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { AuthResponse, AuthTokenResponsePassword, UserResponse } from '@supabase/supabase-js';

// @todo we will need to create an abstraction for AuthResponse and AuthTokenResponsePassword
export interface Authenticator {
  login(user: UserLoginDto): Promise<AuthTokenResponsePassword>;
  logout(): Promise<boolean>;
  refreshSession(): Promise<AuthResponse>;
  register(user: UserRegisterDto): Promise<AuthResponse>;
  authorize(token: string): Promise<UserResponse>;
}
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { ApiResponse } from '@efuller/shared/dist/api';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

export interface Authenticator {
  login(user: UserLoginDto): Promise<AuthTokenResponsePassword>;
  logout(): Promise<boolean>;
  refreshSession(): Promise<ApiResponse<null>>;
  register(user: UserRegisterDto): Promise<boolean>
}
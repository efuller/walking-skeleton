import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { ApiResponse } from '@efuller/shared/dist/api';

export interface Authenticator {
  login(user: UserLoginDto): Promise<boolean>;
  logout(): Promise<boolean>;
  refreshSession(): Promise<ApiResponse<null>>;
  register(user: UserRegisterDto): Promise<boolean>
}
import {
  AuthResponse,
  AuthTokenResponsePassword,
  createClient,
  SupabaseClient,
  UserResponse
} from '@supabase/supabase-js';
import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';

export class SupabaseAuthenticator implements Authenticator {
  private readonly authClient: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL || '';
    const key = process.env.SUPABASE_ANON_KEY || '';

    if (!url || !key) {
      throw new Error('Supabase URL and key not provided');
    }

    this.authClient = createClient(url, key)
  }

  async login(user: UserLoginDto): Promise<AuthTokenResponsePassword> {
    const result = await this.authClient.auth.signInWithPassword(user);

    return result;
  }

  async logout(): Promise<boolean> {
    const result = await this.authClient.auth.signOut();

    if (result.error) {
      return false;
    }
    return true;
  }

  async refreshSession(): Promise<AuthResponse> {
    const result = await this.authClient.auth.refreshSession();

    return result;
  }

  async register(user: UserRegisterDto): Promise<AuthResponse> {
    const result = await this.authClient.auth.signUp(user);

    return result;
  }

  async authorize(token: string): Promise<UserResponse> {
    const result = await this.authClient.auth.getUser(token);

    return result;
  }
}
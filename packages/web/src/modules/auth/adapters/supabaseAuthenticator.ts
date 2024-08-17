import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { ApiResponse } from '@efuller/shared/dist/api';

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

  async login(user: UserLoginDto): Promise<boolean> {
    const result = await this.authClient.auth.signInWithPassword(user);

    if (result.error) {
      return false;
    }
    return true;
  }

  async logout(): Promise<boolean> {
    const result = await this.authClient.auth.signOut();

    if (result.error) {
      return false;
    }
    return true;
  }

  async refreshSession(): Promise<ApiResponse<null>> {
    const result = await this.authClient.auth.refreshSession();

    if (result.error) {
      return {
        success: false,
        data: null,
        error: new Error(result.error.message)
      };
    }

    return {
      success: true,
      data: null
    }
  }

  async register(user: UserRegisterDto): Promise<boolean> {
    const result = await this.authClient.auth.signUp(user);

    if (result.error) {
      return false;
    }
    return true;
  }
}
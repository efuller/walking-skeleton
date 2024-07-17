import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Authenticator } from '@/modules/auth/ports/authenticator.ts';
import { UserLoginDto, UserRegisterDto } from '@/modules/auth/auth.controller.ts';
import { ApiResponse } from '@efuller/shared/dist/api';

export class SupabaseAuthenticator implements Authenticator {
  private readonly authClient: SupabaseClient;

  constructor() {
    this.authClient = createClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')
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
        error: result.error.message
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
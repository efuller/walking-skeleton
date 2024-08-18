import { CompositionRoot } from '@/shared/compositionRoot';
import { AuthModule } from '@/modules/auth/auth.module.ts';
import { MockAuthenticator } from '@/modules/auth/adapters/mockAuthenticator.ts';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

describe('auth', () => {
  let compositionRoot: CompositionRoot;
  let authModule: AuthModule;

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create('test');
    authModule = compositionRoot.getAuthModule();
  });

  it('should start with the user as not authenticated', () => {
    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(false);
  });

  it('should show the user as being authenticated successfully logged in', async () => {
    const authenticator = authModule.getAuthenticator() as MockAuthenticator;
    const response = {
      data: {
        user: { email: 'test@test.com' }
      },
    }
    authenticator.setLoginResponse(response as AuthTokenResponsePassword);

    await authModule.getAuthController().login({ email: 'test@test.com', password: 'password' });

    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(true);
  });
});

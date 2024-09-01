import { CompositionRoot } from '@/shared/compositionRoot';
import { AuthModule } from '@/modules/auth/auth.module.ts';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';
import { AppConfig } from '@/shared/appConfig';
import { MockAuthenticator } from '@efuller/shared/src/modules/auth/adapters/mockAuthenticator.ts';

describe('auth', () => {
  let compositionRoot: CompositionRoot;
  let authModule: AuthModule;
  let authenticator: MockAuthenticator;
  const appConfig = new AppConfig({
    environment: 'test',
    script: 'test-unit',
  });

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create(appConfig);
    authModule = compositionRoot.getAuthModule();
    authModule.getAuthController().authRepo.setAuthenticated(false);
    authenticator = authModule.getAuthenticator() as MockAuthenticator;
    authenticator.setLoginResponse({ data: { user: null, session: null } } as AuthTokenResponsePassword);
  });

  it('should start with the user as not authenticated', () => {
    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(false);
    expect(authModule.getAuthPresenter().viewModel.accessToken).toBe('');
  });

  it('should show the user as being authenticated successfully logged in', async () => {
    const authenticator = authModule.getAuthenticator() as MockAuthenticator;
    const response = {
      data: {
        user: { email: 'test@test.com' },
        session: {
          access_token: 'custom-access-token',
        }
      },
    }
    authenticator.setLoginResponse(response as AuthTokenResponsePassword);

    await authModule.getAuthController().login({ email: 'test@test.com', password: 'password' });

    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(true);
    expect(authModule.getAuthPresenter().viewModel.accessToken).toBe('custom-access-token');
  });

  it('should not log the user in if the user was not found in the DB', async () => {
    const authenticator = authModule.getAuthenticator() as MockAuthenticator;
    const response = {
      data: {
        user: null,
      },
      error: new Error('User not found'),
    }
    authenticator.setLoginResponse(response as AuthTokenResponsePassword);

    await authModule.getAuthController().login({ email: 'test@test.com', password: 'password' });

    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(false);
  });
});

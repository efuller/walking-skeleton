import { CompositionRoot } from '@/shared/compositionRoot';
import { AuthModule } from '@/modules/auth/auth.module.ts';
import { MockAuthenticator } from '@/modules/auth/adapters/mockAuthenticator.ts';

describe('auth', () => {
  let compositionRoot: CompositionRoot;
  let authModule: AuthModule;

  beforeEach(() => {
    compositionRoot = new CompositionRoot('test');
    authModule = compositionRoot.getAuthModule();
  });

  it('should redirect user to homepage if not authenticated', () => {
    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(false);
    expect(authModule.getAuthPresenter().viewModel.redirectTo).toEqual('/');
  });

  it('should show the user as being authenticated successfully logged in', async () => {
    const authenticator = authModule.getAuthenticator() as MockAuthenticator;
    authenticator.setLoginResponse(true)

    await authModule.getAuthController().login({ email: 'test@test.com', password: 'password' });

    expect(authModule.getAuthPresenter().viewModel.isAuthenticated).toBe(true);
  });
});

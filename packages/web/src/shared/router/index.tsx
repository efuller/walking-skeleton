import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { redirect, RouteObject, useNavigate } from 'react-router-dom';
import { HomePage } from '@/pages/home.page.tsx';
import { JournalsPage } from '@/modules/jounals/journals.page';
import { RegisterPage } from '@/pages/register.page.tsx';
import { AppPage } from '@/pages/app.page.tsx';
import { AuthModule } from '@/modules/auth/auth.module.ts';
import { MembersModule } from '@/modules/members/members.module.ts';
import { MembersPresenter } from '@/modules/members/members.presenter.ts';

interface LoadingProfileProps {
  presenter: MembersPresenter;
}

const LoadingProfile = observer(({presenter}: LoadingProfileProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loaded = presenter.isMemberLoaded();

    if (loaded) {
      navigate('/app/journals');
    }
  }, []);
  return (
    <h2>Loading profile...</h2>
  );
});

export class AppRouter {
  constructor(
    private readonly authModule: AuthModule,
    private readonly membersModule: MembersModule
  ) {}

  private async protectedLoader() {
    const controller = this.authModule.getAuthController();
    const presenter = this.authModule.getAuthPresenter();
    const isAuthenticated = presenter.viewModel.isAuthenticated;

    if (!isAuthenticated) {
      const result = await controller.refreshSession();
      if (!result) {
        return redirect('/');
      }
    }

    return null;
  }

  private async appStateLoader() {
    const presenter = this.membersModule.getMembersPresenter();
    const authPresenter = this.authModule.getAuthPresenter();
    if (authPresenter.viewModel.user?.email) {
      await presenter.loadMember(authPresenter.viewModel.user.email);
    }
    return null;
  }

  public getRouteMap(): RouteObject[] {
    return [
      {
        path: '/',
        element: <HomePage authPresenter={this.authModule.getAuthPresenter()} authController={this.authModule.getAuthController()} />,
      },
      {
        path: '/register',
        element: <RegisterPage authPresenter={this.authModule.getAuthPresenter()} authController={this.authModule.getAuthController()}/>,
      },
      {
        path: 'app',
        element: <AppPage authController={this.authModule.getAuthController()} />,
        loader: this.protectedLoader.bind(this),
        children: [
          {
            path: 'load-profile',
            element: <LoadingProfile presenter={this.membersModule.getMembersPresenter()} />,
            loader: this.appStateLoader.bind(this),
          },
          {
            path: 'journals',
            element: <JournalsPage />,
          }
        ]
      }
    ]
  }
}
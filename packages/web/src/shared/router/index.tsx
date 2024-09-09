import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { redirect, RouteObject, useNavigate } from 'react-router-dom';
import { JournalsPage } from '@efuller/web/modules/journals/journals.page';
import { RegisterPage } from '@efuller/web/pages/register.page.tsx';
import { AppPage } from '@efuller/web/pages/app.page.tsx';
import { AuthModule } from '@efuller/web/modules/auth/auth.module.ts';
import { MembersModule } from '@efuller/web/modules/members/members.module.ts';
import { MembersPresenter } from '@efuller/web/modules/members/members.presenter.ts';
import { JournalsModule } from '@efuller/web/modules/journals/journals.module.ts';
import { HomePage } from '@efuller/web/pages/home.page.tsx';

interface LoadingProfileProps {
  presenter: MembersPresenter;
}

export const LoadingProfile = observer(({presenter}: LoadingProfileProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loaded = presenter.isMemberLoaded();

    if (loaded) {
      navigate('/app/journals');
    }
  }, [navigate, presenter]);
  return (
    <h2>Loading profile...</h2>
  );
});

export class AppRouter {
  constructor(
    private readonly authModule: AuthModule,
    private readonly membersModule: MembersModule,
    private readonly journalsModule: JournalsModule
  ) {}

  private async protectedLoader() {
    const controller = this.authModule.getAuthController();
    const presenter = this.authModule.getAuthPresenter();
    const authPresenter = this.authModule.getAuthPresenter();
    const memberPresenter = this.membersModule.getMembersPresenter();
    const isAuthenticated = presenter.viewModel.isAuthenticated;

    if (!isAuthenticated) {
      const result = await controller.refreshSession();
      if (!result) {
        return redirect('/');
      }
    }

    if (!memberPresenter.viewModel.email && authPresenter.viewModel.user?.email) {
      await memberPresenter.loadMember(authPresenter.viewModel.user?.email);
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
        element: <AppPage authController={this.authModule.getAuthController()} membersPresenter={this.membersModule.getMembersPresenter()} />,
        loader: this.protectedLoader.bind(this),
        children: [
          {
            path: 'load-profile',
            element: <LoadingProfile presenter={this.membersModule.getMembersPresenter()} />,
            loader: this.appStateLoader.bind(this),
          },
          {
            path: 'journals',
            element: <JournalsPage presenter={this.journalsModule.getJournalsPresenter()} controller={this.journalsModule.getJournalsController()} />,
          }
        ]
      }
    ]
  }
}
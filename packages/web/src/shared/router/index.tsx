import { redirect, RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/home.page.tsx';
import { JournalsPage } from '@/modules/jounals/journals.page';
import { RegisterPage } from '@/pages/register.page.tsx';
import { AppPage } from '@/pages/app.page.tsx';
import { AuthModule } from '@/modules/auth/auth.module.ts';

export class AppRouter {
  constructor(private readonly authModule: AuthModule) {}

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
            path: 'journals',
            element: <JournalsPage />,
          }
        ]
      }
    ]
  }
}
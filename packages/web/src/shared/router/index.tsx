import { RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/home.page.tsx';
import { JournalsPage } from '@/modules/jounals/journals.page';
import { RegisterPage } from '@/pages/register.page.tsx';

export class AppRouter {
  public getRouteMap(): RouteObject[] {
    return [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: 'app',
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
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import { CompositionRoot } from '@/shared/compositionRoot';
import { AppConfig, Environment, TestScript } from '@/shared/appConfig';

const environment: Environment = process.env.NODE_ENV as Environment;
const script: TestScript = process.env.TEST_SCRIPT as TestScript || 'test-unit';

if (!environment) {
  throw new Error('Environment var is not defined');
}

const config = new AppConfig({
  environment,
  script
});

const compositionRoot = await CompositionRoot.create(config);
const router = compositionRoot.getAppRouter();
const routeMap = router.getRouteMap();
const browserRouter = createBrowserRouter(routeMap);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
);

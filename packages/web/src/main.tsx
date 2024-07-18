import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import { CompositionRoot } from '@/shared/compositionRoot';

const compositionRoot = await CompositionRoot.create();
const router = compositionRoot.getAppRouter();
const routeMap = router.getRouteMap();
const browserRouter = createBrowserRouter(routeMap);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
);

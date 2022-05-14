import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));


// Components

const Accordions = Loader(lazy(() => import('src/content/pages/Components/Accordions')));
const Router = Loader(lazy(() => import('src/content/pages/Components/Router')));
const Tooltips = Loader(lazy(() => import('src/content/pages/Components/Tooltips')));

// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));

const routes = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'components',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'router',
        element: <Router />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
    ]
  }
];

export default routes;

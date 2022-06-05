import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(lazy(() => import("src/content/overview")));

// Components
const Oversigt = Loader(
  lazy(() => import("src/content/pages/Components/Oversigt"))
);
const VLAN = Loader(lazy(() => import("src/content/pages/Components/VLAN")));
const Router = Loader(
  lazy(() => import("src/content/pages/Components/Router"))
);
const Switch = Loader(
  lazy(() => import("src/content/pages/Components/Switch"))
);

// Status

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusReportError = Loader(
  lazy(() => import("src/content/pages/Status/ReportError"))
);

const routes = [
  {
    path: "*",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Navigate to="" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
          {
            path: "report-error",
            element: <StatusReportError />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "components",
    element: <SidebarLayout />,
    children: [
      {
        path: "oversigt",
        element: <Oversigt />,
      },
      {
        path: "vlan",
        element: <VLAN />,
      },
      {
        path: "router",
        element: <Router />,
      },
      {
        path: "switch",
        element: <Switch />,
      },
    ],
  },
];

export default routes;

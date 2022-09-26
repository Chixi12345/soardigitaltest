import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  useNavigate,
} from "react-router-dom";

import { MaintenanceTablePage } from "./pages";

const RoutesE = () => {
  let routes = useRoutes([{ path: "/", element: <MaintenanceTablePage /> }]);

  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <RoutesE />
    </Router>
  );
};

export default AppWrapper;

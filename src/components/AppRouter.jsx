import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoute } from "../router/Router";

const AppRouter = () => {
  return (
    <Routes>
      {publicRoute.map((route) => (
        <Route
          path={route.path}
          Component={route.component}
          exact={route.exact}
          key={route.path}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;

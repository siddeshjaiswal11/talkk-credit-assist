import React from 'react'
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routesNodes from "./router";
import Layout from "./layout/Layout";
import "./assets/icons/style.css";
import "./assets/css/global.css";


const App = () => {
  const routes = routesNodes();
  const authRoutes = ["/login"];
  return (
      <Routes>
          {routes?.children
            ?.filter((route) => authRoutes.includes(route.path))
            .map((route, index) => {
              const Component = lazy(() => route.load());
              return (
                <Route
                  key={`auth-${index}`}
                  path={route.path}
                  element={
                    <Suspense fallback={"loading"}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
            <Route element={<Layout />}>
            {routes?.children
              ?.filter((route) => !authRoutes.includes(route.path))
              .map((route, index) => {
                const Component = lazy(() => route.load());
                return (
                  <Route
                    key={`protected-${index}`}
                    path={route.path}
                    element={
                      <Suspense fallback={"loading"}>
                        {route.private ? (
                            <Component />
                        ) : (
                          <Component />
                        )}
                      </Suspense>
                    }
                  />
                );
              })}
          </Route>
      </Routes>
  )
}

export default App

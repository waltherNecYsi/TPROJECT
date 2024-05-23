import { Navigate, useRoutes, Outlet } from "react-router-dom";
import {  PATH_AUTH } from "./paths";

import { LoginPage } from "./elements";

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
}

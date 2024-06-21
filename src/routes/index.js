import { Navigate, useRoutes, Outlet } from "react-router-dom";
import { PATH_AUTH } from "./paths";

import GuestGuard from "../auth/GuestGuard";

import DashboardLayout from '../layouts/dashboard';

import {
  // Auth
  LoginPage,
  RegisterPage,

  /// Dashboard
  // Registro
  RegistroClientesPage,
  RegistroCitasPage,
  RegistroEstilistasPage,
} from "./elements";

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: 'dashboard',
      element: (
        // <GuestGuard>
          <DashboardLayout />
        // </GuestGuard>
      ),
      children: [
        {
          path: 'registro',
          children: [
            { element: <Navigate to="/dashboard/registro/clientes" replace />, index: true },
            { path: 'clientes', element: <RegistroClientesPage /> },
            { path: 'citas', element: <RegistroCitasPage /> },
            { path: 'estilistas', element: <RegistroEstilistasPage /> },
          ],
        },
      ]
    }

  ]);
}

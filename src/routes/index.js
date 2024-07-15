import { Navigate, useRoutes, Outlet } from "react-router-dom";
import { PATH_AUTH, PATH_CONSULTA } from "./paths";

import GuestGuard from "../auth/GuestGuard";
import { PATH_AFTER_LOGIN } from "../config-global";

import DashboardLayout from "../layouts/dashboard";
import CompactLayout from "../layouts/compact";

import {
  // Consulta
  ConsultaPage,
  // Auth
  LoginPage,
  RegisterPage,

  // Main
  GeneralBookingPage,

  /// Dashboard
  // Registro
  RegistroClientesPage,
  RegistroCitasPage,
  RegistroEstilistasPage,
  RegistroServiciosPage,
  ConsultaCitasPage,
} from "./elements";

export default function Router() {
  return useRoutes([
    {
      path: "consultar",
      children: [
        { element: <Navigate to={PATH_CONSULTA.index} replace />, index: true },
        { path: "miCita", element: <ConsultaPage /> },
      ],
    },
    {
      path: "*",
      element: (
        <GuestGuard>
          <Navigate to={PATH_AUTH.login} replace />,
        </GuestGuard>
      ),
    },

    // Auth
    {
      path: "auth",
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
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

    // Dashboard
    {
      path: "dashboard",
      element: (
        // <GuestGuard>
          <DashboardLayout />
        // </GuestGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "app", element: <GeneralBookingPage /> },
        {
          path: "registro",
          children: [
            {
              element: <Navigate to="/dashboard/registro/clientes" replace />,
              index: true,
            },
            { path: "clientes", element: <RegistroClientesPage /> },
            { path: "citas", element: <RegistroCitasPage /> },
            { path: "estilistas", element: <RegistroEstilistasPage /> },
            { path: "servicios", element: <RegistroServiciosPage /> },
          ],
        },
        {
          path: "consulta",
          children: [{ path: "citas", element: <ConsultaCitasPage /> }],
        },
      ],
    },
  ]);
}

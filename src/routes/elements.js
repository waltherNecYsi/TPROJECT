import { Suspense , lazy } from "react";

import LoadingScreen from '../components/loading-screen';

  

const Loadable = (Component) => (props) =>
    (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );

// Consulta
export const ConsultaPage = Loadable(lazy(() => import('../pages/Main/ConsultaPage')));


// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')))
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));

// Main
export const GeneralBookingPage = Loadable(
  lazy(() => import('../pages/dashboard/GeneralBookingPage'))
);

// pages
export const RegistroClientesPage = Loadable(
  lazy(() => import('../pages/dashboard/Registro/RegistroClientesPage'))
);
export const RegistroCitasPage = Loadable(
  lazy(() => import('../pages/dashboard/Registro/RegistroCitasPage'))
);
export const RegistroEstilistasPage = Loadable(
  lazy(() => import('../pages/dashboard/Registro/RegistroEstilistasPage'))
);
export const RegistroServiciosPage = Loadable(
  lazy(() => import('../pages/dashboard/Registro/RegistroServiciosPage'))
);

export const ConsultaCitasPage = Loadable(
  lazy(() => import('../pages/dashboard/Consulta/ConsultaCitasPage'))
);

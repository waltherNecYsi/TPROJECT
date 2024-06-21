import { Suspense , lazy } from "react";


export function Loading() {
    return (
      <div>Loading...</div>
    )
  }
  

const Loadable = (Component) => (props) =>
    (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')))
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));

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


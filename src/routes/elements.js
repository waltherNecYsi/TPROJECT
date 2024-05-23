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



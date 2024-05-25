import { Helmet } from "react-helmet-async";

import Login from "../../sections/auth/Login";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Nubefa</title>
      </Helmet>
      <Login />
    </>
  );
}

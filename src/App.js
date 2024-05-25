import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Router from "./routes";

import AuthProvider from "./auth/JwtContext";

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}

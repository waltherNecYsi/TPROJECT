import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Router from "./routes";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </HelmetProvider>
  );
}

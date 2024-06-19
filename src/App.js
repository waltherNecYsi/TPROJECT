import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Router from "./routes";

import SnackbarProvider from "./components/snackbar";
import { ThemeSettings, SettingsProvider } from "./components/settings";
// theme
import ThemeProvider from "./theme";
import AuthProvider from "./auth/JwtContext";

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ThemeSettings>
                <SnackbarProvider>
                  <Router />
                </SnackbarProvider>
              </ThemeSettings>
            </ThemeProvider>
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

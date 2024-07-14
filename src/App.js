import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from 'date-fns/locale/es';

import Router from "./routes";

import SnackbarProvider from "./components/snackbar";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { store, persistor } from "./redux/store";

// theme
import ThemeProvider from "./theme";
import AuthProvider from "./auth/JwtContext";

import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
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
          </LocalizationProvider>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

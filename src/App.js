import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Router from "./routes";

import SnackbarProvider from "./components/snackbar";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { store, persistor } from "./redux/store";

// theme
import ThemeProvider from "./theme";
import AuthProvider from "./auth/JwtContext";

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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

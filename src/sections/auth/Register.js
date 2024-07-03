import { Link as RouterLink } from "react-router-dom";
// @mui
import { Stack, Typography, Link } from "@mui/material";
// layouts
import LoginLayout from "../../layouts/login";
// routes
import { PATH_AUTH } from "../../routes/paths";

//
// import AuthWithSocial from './AuthWithSocial';

import AuthRegisterForm from "./AuthRegisterForm";

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Regístrate</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">¿Ya tienes una cuenta?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle2">
            Iniciar Sesión
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"Al inscribirme, acepto "}
        <Link underline="always" color="text.primary">
          Terminos de Servicio
        </Link>
        {" y "}
        <Link underline="always" color="text.primary">
          Politica de Privacidad
        </Link>
        .
      </Typography>

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}

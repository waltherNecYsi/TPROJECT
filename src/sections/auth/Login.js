import { Link as RouterLink } from "react-router-dom";

// @mui
import { Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from "../../routes/paths";
// layouts
import LoginLayout from "../../layouts/login";

import AuthLoginForm from './AuthLoginForm';


export default function Login() {

    const { method } = useAuthContext();

  return (
    <>
      <LoginLayout>
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h4">inicia Sesión en SUKHA</Typography>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">Nuevo usuario?</Typography>

            <Link
              component={RouterLink}
              to={PATH_AUTH.register}
              variant="subtitle2"
            >
              Crea una cuenta
            </Link>
          </Stack>

          <Tooltip title={method} placement="left">
            <Box
              component="img"
              alt={method}
              src={`/assets/icons/auth/ic_${method}.png`}
              sx={{ width: 32, height: 32, position: "absolute", right: 0 }}
            />
          </Tooltip>
        </Stack>
        <AuthLoginForm />
      </LoginLayout>
    </>
  );
}

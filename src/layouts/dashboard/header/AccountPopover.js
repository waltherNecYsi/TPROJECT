import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Drawer,
  Tooltip,
  IconButton,
  Icon,
} from "@mui/material";
// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../../routes/paths";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import { useSnackbar } from "../../../components/snackbar";
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import { bgBlur } from "../../../utils/cssStyles";
import { NAV } from "../../../config-global";
import Scrollbar from "../../../components/scrollbar";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const PATH_PROFILE = PATH_DASHBOARD.root;
// const PATH_SIDEBARNAV = PATH_DASHBOARD.sidebarNav;

// const SIDEBARNAV = [
//   {
//     SECCION: [
//       {
//         label: 'Clave Secuandaria',
//         // linkTo: PATH_SIDEBARNAV.claveSecundaria,
//         icon: 'solar:key-broken',
//       },
//     ],
//   },
//   {
//     SECCION: [
//       {
//         label: 'Cuentas y Ajustes',
//         linkTo: PATH_SIDEBARNAV.cuentAjuste,
//         // icon: "ic:outline-manage-accounts"
//         icon: 'fluent:person-settings-20-regular',
//       },
//     ],
//   },
//   {
//     SECCION: [
//       {
//         label: 'Todas las Listas',
//         linkTo: PATH_SIDEBARNAV.listas,
//         icon: 'solar:tuning-3-broken',
//       },
//       {
//         label: 'Tipo de Cambio',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:hand-money-broken',
//       },
//       {
//         label: 'Transacciones Recurrentes',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:sort-horizontal-broken',
//       },
//       {
//         label: 'Accesorios',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:sort-horizontal-broken',
//       },
//     ],
//   },
//   {
//     SECCION: [
//       {
//         label: 'Importar Datos',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:import-broken',
//       },
//       {
//         label: 'Exportar Datos',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:export-broken',
//       },
//       {
//         label: 'Conciliaciones',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:hand-heart-broken',
//       },
//       {
//         label: 'Registro de Auditoria',
//         linkTo: PATH_PROFILE,
//         icon: 'solar:document-add-broken',
//       },
//     ],
//   },
// ];

const SPACING = 2.5;


const OPTIONS = [
  {
    label: 'Inicio',
    linkTo: PATH_DASHBOARD.root,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          name={user?.displayName}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        {/* <Drawer
        anchor="right"
        open={openPopover}
        onClose={handleClosePopover}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
            width: NAV.W_BASE,
            boxShadow: `40px 0px 40px 0 ${alpha(
              theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
              0.16
            )}`,
          },
        }}
        sx={{
          '.MuiPaper-root': {
            borderRadius: '12px 0px 0px 0px',
            background: theme.palette.background.default,
          },
          '.MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          '.MuiDivider-root': {
            borderColor: '#bdbdbd',
          },
          '.MuiTypography-root': {
            fontSize: 14,
          },
          '.MuiMenuItem-root': {
            fontSize: 14,
          },
        }}
      > */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pt: 2, pb: 0, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>
          <Divider sx={{ borderStyle: "dashed" }} />


          <IconButton onClick={handleClosePopover}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Scrollbar sx={{ pb: 0 }}>
          {/* <Stack
            sx={{
              p: 1.5,
              ".MuiMenuItem-root:hover": {
                borderRadius: "6px",
              },
              color: "text.secondary",
            }}
          > */}
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {user?.role}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack sx={{ p: 1 }}>
              {OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  onClick={() => handleClickItem(option.linkTo)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            {/* {SIDEBARNAV.map((seccion, index) => (
              <Box key={index}>
                {seccion.SECCION.map((item, key) => (
                  <MenuItem key={key} onClick={() => handleClickItem(item.linkTo)}>
                    <Box sx={{ width: '100%', display: 'flex' }}>
                      <Iconify icon={item.icon} />
                      <Typography ml="0.5rem">{item.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
                <Divider />
              </Box>
            ))} */}
            <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
              Cerrar Sesión
            </MenuItem>
          {/* </Stack> */}
        </Scrollbar>
        {/* </Drawer> */}
      </MenuPopover>
    </>
  );
}

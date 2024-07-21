import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Box, Stack, Drawer, Typography } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// config
import { NAV } from "../../../config-global";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
//
import navConfig , { navConfigAdmin } from "./config-navigation";
// import NavDocs from './NavDocs';
import NavAccount from "./NavAccount";
import NavToggleButton from "./NavToggleButton";
import { useAuthContext } from "../../../auth/useAuthContext";

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const { user } = useAuthContext();

  const isAdmin = user?.rol === "Administrador";

  const [configAdmin, setConfigAdmin] = useState(
    isAdmin ? navConfigAdmin : navConfig
  );

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo />
          <Typography variant="subtitle2" color="#dfb326">
            SUKHA
          </Typography>
        </Box>

        <NavAccount />
      </Stack>

      <NavSectionVertical data={configAdmin} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          alt="Nav_img.png"
          src="/assets/illustrations/Nav_Img.png"
          sx={{
            maskImage:
              "linear-gradient(transparent,black 50% , black 50%, transparent)",
            filter: "blur(1px)",
            maxWidth: "80%",
            mt: "20%",
            userSelect: "none",
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* <NavDocs /> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

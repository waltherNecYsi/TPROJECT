import { Helmet } from "react-helmet-async";
import { useState, useEffect, useCallback } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Card, Container, Divider } from "@mui/material";



import { PATH_DASHBOARD } from "../../../routes/paths";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../components/settings";

import useResponsive from "../../../hooks/useResponsive";


import { CitasCalendar, CitasCalendarToolbar } from "../../../sections/@dashboard/Consultas/Citas";



export default function ConsultaCitasPage() {
  const { themeStretch } = useSettingsContext();

  const data = [
    {
      Id: 1,
      Subject: "Cita",
      Location: "Space Center USA",
      StartTime: new Date(2024, 5, 30, 10, 0),
      EndTime: new Date(2024, 5, 30, 12, 30),
    },
  ];

  const isDesktop = useResponsive("up", "md");


  return (
    <>
      <Helmet>
        <title>Consulta Citas</title>
      </Helmet>
      <Container
        // maxWidth={themeStretch ? false : "lg"}
        sx={{ padding: isDesktop ? "0px" : "0px", maxWidth: "100%!important" }}
      >
        {" "}
        <CustomBreadcrumbs
          heading="Consulta Citas"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            {
              name: "Consultas",
              href: PATH_DASHBOARD.consulta.root,
            },
            {
              name: "Citas",
            },
          ]}
        />
        <Card>
          <CitasCalendarToolbar />
          <CitasCalendar />
        </Card>
      </Container>
    </>
  );
}

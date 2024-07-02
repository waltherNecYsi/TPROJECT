import { Helmet } from "react-helmet-async";
import { useState, useEffect, useCallback } from "react";
import sumBy from "lodash/sumBy";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoadingButton } from '@mui/lab';

// @mui
import { useTheme } from "@mui/material/styles";
import {
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from "@mui/material";
import axios from "../../../utils/axios";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// utils
import { fTimestamp } from "../../../utils/formatTime";
// import { tenantUrl } from '../../../auth/TenantUtils';

// _mock_

// import { _invoices } from '../../_mock/arrays';
// components
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import ConfirmDialog from "../../../components/confirm-dialog";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../components/settings";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "../../../components/table";
// sections
import useResponsive from "../../../hooks/useResponsive";

import {
  CitasTableRow,
  CitasTableToolbar,
  CitasTableButtom,
  CitasTableEdit,
  CitasInfo,
  CitasCalendar,
  CitasCalendarToolbar,
} from "../../../sections/@dashboard/Registro/Citas";

import CitasCalendarV2 from "../../../sections/@dashboard/Registro/Citas/newCalendar/CitasCalendarV2";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function RegistroCitasPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const isDesktop = useResponsive("up", "md");

  return (
    <>
      <Helmet>
        <title>Clientes</title>
      </Helmet>

      <Container
        // maxWidth={themeStretch ? false : "lg"}
        sx={{ padding: isDesktop ? "0px" : "0px" , maxWidth: "100%!important" }}
      >
        <CustomBreadcrumbs
          heading="Crear Cita"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            {
              name: "Registros",
              href: PATH_DASHBOARD.registro.root,
            },
            {
              name: "Citas",
            },
          ]}
          action={
            <Card
            sx={{
              gap: '15px',
              display: 'flex',
              borderRadius: '0px',
              flexDirection: isDesktop ? 'row' : 'column',
            }}
          >
            <Button variant="contained" size="small " color="error" >
              <Iconify icon="material-symbols:close" />
              {isDesktop ? 'Cerrar' : ''}
            </Button>
            <LoadingButton
              variant="contained"
              // loading={isLoading}
              loading={false}
              size="small "
              // onClick={ventasEnvio}
            >
              <Iconify icon="material-symbols:check" />
              {isDesktop ? 'Guardar' : ''}
            </LoadingButton>
          </Card>
          }
        />
        <Card
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Card sx={{ width: isDesktop ? "25%" : "100%" }}>
            <CitasInfo />
          </Card>
          <Card sx={{ width: isDesktop ? "75%" : "100%" }}>
            <CitasCalendarToolbar />
            <CitasCalendarV2 />
          </Card>
        </Card>
      </Container>
    </>
  );
}

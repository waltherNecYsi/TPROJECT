import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import {
  Link,
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from "@mui/material";
// utils
import { fDate } from "../../../../utils/formatTime";
import { fCurrency } from "../../../../utils/formatNumber";
// components
import Label from "../../../../components/label";
import Iconify from "../../../../components/iconify";
import { CustomAvatar } from "../../../../components/custom-avatar";
import MenuPopover from "../../../../components/menu-popover";
import ConfirmDialog from "../../../../components/confirm-dialog";

import { useAuthContext } from "../../../../auth/useAuthContext";

// ----------------------------------------------------------------------

ServiciosTableRow.propTypes = {
  row: PropTypes.object,
  keyIndex: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onActive: PropTypes.func,
};

export default function ServiciosTableRow({
  row,
  keyIndex,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  onActive,
}) {
  const {
    Nomb_Serv,
    Desc_Serv,
    Precio_Serv,
    DurMin_Serv,
    FechaReg_Serv,
    idEstado,
  } = row;

  const { user } = useAuthContext();

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox" align="center">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        {/* <TableCell align="left">{keyIndex + 1}</TableCell> */}

        <TableCell align="left">{Nomb_Serv}</TableCell>

        <TableCell align="left">{Desc_Serv}</TableCell>

        <TableCell align="left">{Precio_Serv}</TableCell>

        <TableCell align="left">{DurMin_Serv}</TableCell>

        <TableCell align="left">{FechaReg_Serv}</TableCell>

        {user?.rol === "Administrador" ? (
          <TableCell align="left">
            <Button
              variant="contained"
              color={idEstado === 0 ? "error" : "success"}
              sx={{
                fontSize: "0.7rem",
                ...(idEstado === 1 && {
                  backgroundColor: "#00ab55!important",
                  color: "white!important",
                }),
              }}
              onClick={onActive}
              // onClick={alert("Activar Usuario")}
            >
              {" "}
              {idEstado === 0 ? "Eliminado" : "Activo"}
            </Button>
          </TableCell>
        ) : null}

        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {/* <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Eliminar
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Eliminar"
        content="Esta seguro que desea eliminar?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

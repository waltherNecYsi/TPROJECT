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

EstilistasTableRow.propTypes = {
  row: PropTypes.object,
  keyIndex: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onActive: PropTypes.func,
};

export default function EstilistasTableRow({
  row,
  keyIndex,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  onActive,
}) {
  const { Nombr_Est, Apell_Est, Telef_Est, Email_Est, created_at, idEstado } =
    row;

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

        <TableCell align="left">{keyIndex + 1}</TableCell>

        <TableCell align="left">{Nombr_Est}</TableCell>

        <TableCell align="left">{Apell_Est}</TableCell>

        <TableCell align="left">{Telef_Est}</TableCell>

        <TableCell align="left">{Email_Est}</TableCell>

        <TableCell align="left">{created_at}</TableCell>

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

        {/* <TableCell align="left">{fDate(created_at)}</TableCell> */}

        {/* <TableCell align="left">{fDate(createDate)}</TableCell>

        <TableCell align="left">{fDate(dueDate)}</TableCell>

        <TableCell align="center">{fCurrency(totalPrice)}</TableCell>
        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {sent}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'unpaid' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>
*/}

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
          Elininar
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Elininar"
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
            Elininar
          </Button>
        }
      />
    </>
  );
}

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
  Tooltip,
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
import FileThumbnail, { fileData } from "../../../../components/file-thumbnail";

import { DataApiGet } from "../../../../utils/connectApis";
import generateTicket from "../../../Main/Mainticket";

// ----------------------------------------------------------------------

CliTableRow.propTypes = {
  row: PropTypes.object,
  keyIndex: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function CliTableRow({
  row,
  keyIndex,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { CitaID, Nomb_Clt, Nomb_Serv, Nombr_Est, FechaCreacion } = row;

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

  const DownloadTicket = async () => {
    const data = await DataApiGet(`/api/consulta_ticket/${CitaID}`);
    const ticket = await generateTicket("print", data);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox" align="center">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell align="left">{CitaID.toString()}</TableCell>

        {/* <TableCell align="left">{ane_numdoc}</TableCell> */}

        <TableCell align="left">{Nomb_Clt}</TableCell>

        <TableCell align="left">{Nomb_Serv}</TableCell>

        <TableCell align="left">{Nombr_Est}</TableCell>

        <TableCell align="left">{FechaCreacion}</TableCell>

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
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "center" }}
          >
             {/* <Tooltip title="Editar" placement="top" arrow>
              <IconButton sx={{}} color="default" onClick={ () => {
                alert("zzz");
              }}>
                <Iconify icon="eva:edit-fill" width="1rem" height="1rem" />
              </IconButton>
            </Tooltip>  */}
            <Tooltip title="Eliminar" placement="top" arrow>
              <IconButton
                sx={{}}
                color="default"
                onClick={() => {
                  handleOpenConfirm();
                  handleClosePopover();
                }}
              >
                <Iconify
                  icon="eva:trash-2-outline"
                  width="1rem"
                  height="1rem"
                />
              </IconButton>
            </Tooltip> 
            <Tooltip title="Ticket Pago" placement="top" arrow>
              <IconButton color="default" onClick={DownloadTicket}>
                <FileThumbnail
                  imageView
                  file="pdfv2"
                  sx={{ width: "0.9rem", height: "0.9rem" }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
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
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Eliminar"
        content="Estas seguro que deseas eliminar esta cita?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />
    </>
  );
}

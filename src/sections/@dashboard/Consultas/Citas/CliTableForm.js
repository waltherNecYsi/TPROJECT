import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import {
  MenuItem,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  FormControlLabel,
  Autocomplete,
  Stack,
} from "@mui/material";
import { useForm, useFormContext, Controller } from "react-hook-form";
import {
  RHFTextField,
  RHFAutocomplete,
} from "../../../../components/hook-form";
import FormProvider from "../../../../components/hook-form/FormProvider";

import axios from "../../../../utils/axios";

export default function CliTableForm({
  inputs,
  request,
  closeModal,
  fetchDataFromAPI,
  rowData,
}) {
  const defaultValues = {
    nombre: rowData?.Nomb_Clt ?? "",
    apellido_mat: rowData?.Apell_Clt ?? "",
    apellido_pat: rowData?.Apell_Pater ?? "",
    telefono: rowData?.Telef_Clt ?? "",
    email: rowData?.Email_Clt ?? "",
  };

  const [openModal, setOpenModal] = useState(true);

  const methods = useForm({
    defaultValues,
  });
  const values = methods.getValues();

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const handleSubmitDef = async (formData) => {
    // setIsSubmitting(true);
    console.log("hola");
    try {
      await request(formData);
      closeModal();
      // fetchDataFromAPI();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    // setIsSubmitting(false);
  };

  const onSubmit = async () => {
    const valuesSubmit = methods.getValues();

    const DataSubmit = {
      Nomb_Clt: valuesSubmit.nombre,
      Apell_Pater: valuesSubmit.apellido_pat,
      Apell_Clt: valuesSubmit.apellido_mat,
      Telef_Clt: valuesSubmit.telefono,
      Email_Clt: valuesSubmit.email,
      ane_id: rowData?.ClienteID,
    };

    try {
      handleSubmitDef(DataSubmit);
      closeModal();
      fetchDataFromAPI();
    } catch (error) {
      console.error(error);
      alert("no se ha podido registrar");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <Dialog
          open={openModal}
          sx={{
            padding: "2vh",
            ".css-1j416gi-MuiPaper-root-MuiDialog-paper": {
              padding: "2vh",
            },
            ".MuiPaper-root": {
              padding: "2rem",
            },
            "& .MuiDialogContent-root": {
              padding: 2,
            },
            "& .MuiDialogActions-root": {
              padding: 1,
            },
            "& .MuiPaper-root.MuiDialog-paper": {
              maxWidth: "max-content",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "row" },
              flexWrap: "nowrap",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "1vh 0vh",
            }}
          >
            <DialogTitle sx={{ p: 2 }} id="customized-dialog-title">
              Añadir Cliente
            </DialogTitle>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "row" },
                flexWrap: "nowrap",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                type="submit"
                onClick={onSubmit}
                autoFocus
              >
                Guardar
              </Button>
              <IconButton
                aria-label="close"
                onClick={() => closeModal()}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Icon icon="mdi:window-close" style={{ fontSize: "24px" }} />
              </IconButton>
            </Box>
          </Box>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                alignItems: "center",
              }}
            >
              <RHFTextField
                name="nombre"
                size="small"
                label="Nombre"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />

              <RHFTextField
                name="apellido_mat"
                size="small"
                label="Apellido Materno"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />
              <RHFTextField
                name="apellido_pat"
                size="small"
                label="Apellido Paterno"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                alignItems: "center",
              }}
            >
              <RHFTextField
                name="telefono"
                size="small"
                label="Telefono"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />

              <RHFTextField
                name="email"
                size="small"
                label="Email"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Stack>
    </FormProvider>
  );
}

CliTableForm.propTypes = {
  inputs: PropTypes.array,
  request: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  fetchDataFromAPI: PropTypes.func,
  rowData: PropTypes.object,
};
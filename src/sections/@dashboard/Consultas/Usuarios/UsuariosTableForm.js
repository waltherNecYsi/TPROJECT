import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  InputAdornment,
  Stack,
} from "@mui/material";
import { useForm, useFormContext, Controller } from "react-hook-form";
import {
  RHFTextField,
  RHFAutocomplete,
} from "../../../../components/hook-form";
import Iconify from "../../../../components/iconify/Iconify";
import FormProvider from "../../../../components/hook-form/FormProvider";

import axios from "../../../../utils/axios";

const validateFields = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  email: Yup.string().required("Requerido"),
  DNI: Yup.string().required("Requerido"),
  password: Yup.string().required("Requerido"),
  rol: Yup.object().required("Requerido"),
});

export default function CliTableForm({
  inputs,
  request,
  closeModal,
  fetchDataFromAPI,
  rowData,
}) {
  const defaultValues = {
    name: rowData?.name ?? "",
    email: rowData?.email ?? "",
    DNI: rowData?.DNI ?? "",
    password: rowData?.password ?? "",
    rol: rowData?.rol ?? null,
  };

  const [openModal, setOpenModal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validateFields),
    defaultValues,
    shouldUnregister: true,
  });
  const values = methods.getValues();

  const {
    control,
    register,
    getValues,
    watch,
    reset,
    setValue,
    handleSubmit,
    trigger,
    formState: { isSubmitting, isValid },
  } = methods;

  const handleSubmitDef = async (formData) => {
    // setIsSubmitting(true);
    await trigger();
    if (isValid) {
      try {
        await request(formData);
        closeModal();
        fetchDataFromAPI();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
      // setIsSubmitting(false);
    }
  };

  const onSubmit = async () => {
    const valuesSubmit = getValues();

    const formData = {
      ...valuesSubmit,
      rol: valuesSubmit?.rol?.value,
      id: rowData?.id ?? "",
    };

    try {
      await handleSubmitDef(formData);
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
                name="name"
                label="Nombre completo"
                size="small"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />

              <RHFTextField
                name="email"
                label="Direccion de correo"
                size="small"
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
                name="DNI"
                label="Documento de Identidad"
                type="number"
                size="small"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />

              <RHFTextField
                name="password"
                label="Contraseña"
                size="small"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />
              <RHFAutocomplete
                name="rol"
                label="Rol"
                size="small"
                freesolo
                sx={{ width: "-webkit-fill-available", m: 1 }}
                getOptionLabel={(option) => option.rol}
                options={[
                  { rol: "Administrador", value: 1 },
                  { rol: "Atencion al Cliente", value: 2 },
                ]}
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

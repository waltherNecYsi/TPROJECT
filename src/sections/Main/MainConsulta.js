import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// @mui
import { Tooltip, Stack, Typography, Link, Box } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// routes
import { PATH_AUTH } from "../../routes/paths";
// layouts
import LoginLayout from "../../layouts/login";

import FormProvider, { RHFTextField } from "../../components/hook-form";

import { DataApiGet } from "../../utils/connectApis";

import generateTicket from "./Mainticket";

const schema = yup.object().shape({
  codigo: yup.string().required("Codigo requerido"),
});

export default function MainConsulta() {
  const defaultValues = {
    codigo: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const values = methods.getValues();

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    try {
      const data = await DataApiGet(`/api/consulta_ticket/${formData.codigo}`);
      const ticket = await generateTicket("print", data);
      reset();
      if (ticket) {
        reset();
        console.log(ticket);
      }
    } catch (error) {
      reset();
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <LoginLayout>
          <Stack spacing={2} sx={{ mb: 4, position: "relative" }}>
            <Typography variant="h4">Te damos la Bienvenida a SUKHA</Typography>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="paragraph">Consulta tu Cita</Typography>
            </Stack>
          </Stack>
          <Stack spacing={2} sx={{ mb: 3, position: "relative" }}>
            <RHFTextField
              name="codigo"
              label="Codigo"
              placeholder="Ingresa tu codigo"
            />
          </Stack>
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              bgcolor: "#2f54eb",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
              "&:hover": {
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            Consultar
          </LoadingButton>
        </LoginLayout>
      </FormProvider>
    </>
  );
}

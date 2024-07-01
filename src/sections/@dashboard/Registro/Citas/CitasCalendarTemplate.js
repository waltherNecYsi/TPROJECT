import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

import formatTimeAP from "../../../../utils/formatTimeAP";

import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFCheckbox,
  RHFAutocompleteModalv2,
} from "../../../../components/hook-form";

export const useEditorTemplate = (props) => {
  const defaultValues = {
    Stylist: "",
    fecha_ini: dayjs("2022-04-17T15:30"),
    fecha_fin: dayjs("2022-04-17T15:30"),
  };
  const methods = useForm({ defaultValues });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        type="text"
        name="title"
        label="Título"
        size="small"
        sx={{ m: 1, width: "-webkit-fill-available" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Controller
          name="fecha_ini"
          control={control}
          size="small"
          defaultValue={dayjs("2022-04-17T15:30")}
          render={({ field, fieldState: { error } }) => (
            <MobileTimePicker
              onChange={(date) => field.onChange(date)}
              name="fecha_ini"
              label="Inicio"
              size="small"
              control={control}
              slotProps={{ textField: { size: "small" } }}
              sx={{ m: 1, width: "-webkit-fill-available" }}
            />
          )}
        />

        <Controller
          name="fecha_fin"
          control={control}
          size="small"
          defaultValue={dayjs("2022-04-17T15:30")}
          render={({ field, fieldState: { error } }) => (
            <MobileTimePicker
              onChange={(date) => field.onChange(date)}
              name="fecha_fin"
              label="Fin"
              size="small"
              control={control}
              slotProps={{ textField: { size: "small" } }}
              sx={{ m: 1, width: "-webkit-fill-available" }}
            />
          )}
        />
      </Box>

      {/* <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button> */}
    </FormProvider>
  );
};

export const dayEventTemplate = (props) => {
  const { Stylist, StartTime, EndTime } = props;
  return (
    <div className="e-subject">
      <Typography variant="h6" gutterBottom>
        Cita
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Estilista: {Stylist}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Horario: {formatTimeAP(StartTime)} - {formatTimeAP(EndTime)}
      </Typography>
    </div>
  );
};

dayEventTemplate.propTypes = {
  Stylist: PropTypes.string,
};

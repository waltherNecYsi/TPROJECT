import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";

import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFSelect,
  RHFCheckbox,
  RHFAutocompleteModalv2,
} from "../../../../components/hook-form";
import useResponsive from "../../../../hooks/useResponsive";
import axios from "../../../../utils/axios";

export default function CitasCalendarToolbar() {
  const defaultValues = {
    cliente: "",
  };
  const upMd = useResponsive("up", "md");
  const methods = useForm({ defaultValues });
  const isDesktop = useResponsive("up", "md");

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [cliOption, setCliOption] = useState([]);
  const [stylistOption, setStylistOption] = useState([]);
  const [serviceOption, setServiceOption] = useState([]);

  const filter = createFilterOptions();

  const handleSearchService = async (inputValue, setCuentaEOptions) => {
    if (inputValue === undefined) {
      inputValue = "";
    }

    if (typeof inputValue === "string" && inputValue !== "") {
      const response = await axios.post(`/api/servicio-buscar/${inputValue}`);
      setCuentaEOptions(response.data);
    } else {
      setValue(inputValue);
      setCuentaEOptions([]);
    }
  };

  const handleSearchStylist = async (inputValue, setCuentaEOptions) => {
    if (inputValue === undefined) {
      inputValue = "";
    }

    if (typeof inputValue === "string" && inputValue !== "") {
      const response = await axios.post(`/api/estilista-buscar/${inputValue}`);
      setCuentaEOptions(response.data);
    } else {
      setValue(inputValue);
      setCuentaEOptions([]);
    }
  };

  const buscarCliente = async (nombre) => {
    try {
      const response = await axios.post(`/api/cliente-buscar/${nombre}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const ApiBuscarCliente = async (nombre) => {
    if (!nombre) {
      setCliOption([]);
      return;
    }

    try {
      const response = await buscarCliente(nombre);
      if (response !== undefined) {
        setCliOption(response);
        if (response.length > 0 && nombre === response[0].ane_nom) {
          setValue("cliente", response[0], { shouldValidate: true });
        } else {
          setValue("cliente", "", { shouldValidate: true });
        }
      }
    } catch (error) {
      console.error("Validation errors:", error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: upMd ? "0vh" : "2vh",
        }}
      >
        <RHFAutocomplete
          name="servicio"
          label="Servicio"
          autoHighlight
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          size="small"
          options={cliOption}
          sx={{ m: 1, width: "-webkit-fill-available" }}
          isOptionEqualToValue={(option, value) =>
            option.ane_id === value.ane_id
          }
          handleAutoGetOptions={ApiBuscarCliente}
          renderOption={(props, option) => (
            <li {...props}>
              {option.ane_nom}
              {option.ane_apepat}
              {option.ane_apemat}{" "}
            </li>
          )}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }
            if (option.ane_apepat === null && option.ane_apemat === null) {
              return option.ane_nom;
            }
            return `${option.ane_nom} ${option.ane_apepat} ${option.ane_apemat}`;
          }}
          onInputChange={(event, newInputValue) => {
            handleSearchService(newInputValue, setServiceOption);
          }}
        />
        <Controller
          name="fechas"
          control={control}
          size="small"
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              {...field}
              name="fechas"
              label="Tiempo || Fecha"
              inputFormat="dd/MM/yyyy"
              size="small"
              slotProps={{ textField: { size: "small" } }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  fullWidth
                  sx={{ m: 1, width: "-webkit-fill-available" }}
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          )}
        />

        <RHFAutocomplete
          name="estilista"
          label="Estilista"
          autoHighlight
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          size="small"
          options={cliOption}
          sx={{ m: 1, width: "-webkit-fill-available" }}
          isOptionEqualToValue={(option, value) =>
            option.ane_id === value.ane_id
          }
          handleAutoGetOptions={ApiBuscarCliente}
          renderOption={(props, option) => (
            <li {...props}>
              {option.ane_nom}
              {option.ane_apepat}
              {option.ane_apemat}{" "}
            </li>
          )}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }
            if (option.ane_apepat === null && option.ane_apemat === null) {
              return option.ane_nom;
            }
            return `${option.ane_nom} ${option.ane_apepat} ${option.ane_apemat}`;
          }}
          onInputChange={(event, newInputValue) => {
            handleSearchStylist(newInputValue, setStylistOption);
          }}
        />
      </Box>
    </FormProvider>
  );
}

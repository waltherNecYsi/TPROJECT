import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";

import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFAutocompleteChange,
  RHFSelect,
  RHFCheckbox,
  RHFAutocompleteModalv2,
} from "../../../../components/hook-form";
import useResponsive from "../../../../hooks/useResponsive";
import axios from "../../../../utils/axios";
import { useCitasContext } from "./Context/CitasContextPage";
import { setFilterToolbar } from "./Context/CitasActionspage";

export default function CitasCalendarToolbar() {
  const defaultValues = {
    servicio: null,
    fechas: new Date(),
    estilista: null,
  };

  const { state, dispatch } = useCitasContext();

  const { filterToolbar } = state;

  const upMd = useResponsive("up", "md");
  const methods = useForm({ defaultValues });
  const isDesktop = useResponsive("up", "md");

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const [cliOption, setCliOption] = useState([]);
  const [stylistOption, setStylistOption] = useState([]);
  const [serviceOption, setServiceOption] = useState([]);

  const [dateValue, setDateValue] = useState(new Date());

  // const stylistOption2 = [
  //   { ane_nom: "hola", ane_apepat: "hola", ane_apemat: "hola", ane_id: 1 },
  //   { ane_nom: "hola2", ane_apepat: "hola2", ane_apemat: "hola2", ane_id: 2 },
  // ];

  // const serviceOption2 = [
  //   { ane_nom: "hola3", ane_apepat: "hola3", ane_apemat: "hola3", ane_id: 3 },
  //   { ane_nom: "hola4", ane_apepat: "hola4", ane_apemat: "hola4", ane_id: 4 },
  // ];

  const filter = createFilterOptions();

  const handleSearchService = async (inputValue, setCuentaEOptions) => {
    if (inputValue === undefined) {
      inputValue = "";
    }

    if (typeof inputValue === "string" && inputValue !== "") {
      const response = await axios.post(`/api/buscar_servicios/${inputValue}`);
      setServiceOption(response.data);
    } else {
      // setValue(inputValue);
      setServiceOption([]);
    }
  };

  const handleSearchStylist = async (inputValue, setCuentaEOptions) => {
    if (inputValue === undefined) {
      inputValue = "";
    }

    if (typeof inputValue === "string" && inputValue !== "") {
      const response = await axios.post(`/api/buscar_estilistas`, {
        Nombr_Est: inputValue,
      });
      setStylistOption(response.data);
    } else {
      // setValue(inputValue);
      setStylistOption([]);
    }
  };

  // const buscarCliente = async (nombre) => {
  //   try {
  //     const response = await axios.post(`/api/cliente-buscar/${nombre}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // };

  // const ApiBuscarCliente = async (nombre) => {
  //   if (!nombre) {
  //     setCliOption([]);
  //     return;
  //   }

  //   try {
  //     const response = await buscarCliente(nombre);
  //     if (response !== undefined) {
  //       setCliOption(response);
  //       if (response.length > 0 && nombre === response[0].ane_nom) {
  //         setValue("cliente", response[0], { shouldValidate: true });
  //       } else {
  //         setValue("cliente", "", { shouldValidate: true });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Validation errors:", error);
  //   }
  // };

  return (
    <FormProvider methods={methods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: upMd ? "0vh" : "2vh",
        }}
      >
        <RHFAutocompleteModalv2
          name="servicio"
          label="Servicio"
          autoHighlight
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          size="small"
          options={stylistOption}
          sx={{ m: 1, width: "-webkit-fill-available" }}
          isOptionEqualToValue={(option, value) =>
            option.ane_id === value.ane_id
          }
          handleAutoGetOptions={handleSearchService}
          renderOption={(props, option) => (
            <li {...props}>
              {option.ane_nom}
              {/* {option.ane_apepat}
              {option.ane_apemat}{" "} */}
            </li>
          )}
          getOptionLabel={(option) => option.ane_nom}
          onChange={(event, newInputValue) => {
            setValue("estilista", event.target.value);
            const values = getValues();
            setFilterToolbar(dispatch, values);
          }}
          // onInputChange={(event, newInputValue) => {
          //   handleSearchStylist(newInputValue, setStylistOption);
          // }}
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
              value={dateValue}
              slotProps={{ textField: { size: "small" } }}
              onChange={(date) => {
                setValue("fechas", date);
                setDateValue(date);
                const values = getValues();
                setFilterToolbar(dispatch, values);
              }}
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

        <RHFAutocompleteModalv2
          name="estilista"
          label="Estilista"
          autoHighlight
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          size="small"
          options={stylistOption}
          sx={{ m: 1, width: "-webkit-fill-available" }}
          isOptionEqualToValue={(option, value) =>
            option.EstilistaID === value.EstilistaID
          }
          handleAutoGetOptions={handleSearchStylist}
          renderOption={(props, option) => (
            <li {...props}>
              {option.Nombr_Est}
              {/* {option.ane_apepat}
              {option.ane_apemat}{" "} */}
            </li>
          )}
          getOptionLabel={(option) => option.Nombr_Est}
          onChange={(event, newInputValue) => {
            // setValue("estilista", event.target.value);
            const values = getValues();
            setFilterToolbar(dispatch, values);
          }}
        />
      </Box>
    </FormProvider>
  );
}

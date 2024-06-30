import React, { useState } from "react";
import { Box , Dialog, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { createFilterOptions } from "@mui/material/Autocomplete";
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFCheckbox,
  RHFAutocompleteModalv2,
} from "../../../../components/hook-form";
import useResponsive from "../../../../hooks/useResponsive";
import axios from "../../../../utils/axios";
import CliTableForm from "../Clientes/CliTableForm";

export default function CitasInfo() {
  const defaultValues = {
    cliente: "",
  };
  const upMd = useResponsive("up", "md");
  const methods = useForm({ defaultValues });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [cliOption, setCliOption] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const filter = createFilterOptions();

  const closeModal = () => {
    setOpenModal(false);
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
          flexDirection: "column",
          marginTop: upMd ? "0vh" : "2vh",
        }}
      >
        <RHFAutocompleteModalv2
          name="cliente"
          label="Cliente"
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
          filterOptions={(options, params) => {
            const filtered = filter(cliOption, params);
            const { inputValue } = params;
            const isExisting = cliOption.some(
              (option) => inputValue === option.ane_nom
            );
            const isExistingA = cliOption.some(
              (option) => option.ane_id === "a"
            );
            if (!isExistingA && !isExisting) {
              filtered.push({
                ane_id: "a",
                ane_nom: `Añadir Cliente`,
                ane_apepat: null,
                ane_apemat: null,
              });
            }
            return filtered;
          }}
          onChange={(event, value) => {
            if (value && value.ane_id === "a") {
              setOpenModal(true);
              console.log("agregar");
            }
          }}
        />
        <RHFTextField
          name="servicios"
          label="Servicios"
          size="small"
          fullWidth
          multiline
          rows={4}
          disabled
          placeholder="Servicios"
          sx={{ m: 1, width: "-webkit-fill-available" }}
        />

        <RHFTextField
          name="fechas"
          label="Tiempo // Fechas"
          size="small"
          fullWidth
          multiline
          rows={4}
          disabled
          sx={{ m: 1, width: "-webkit-fill-available" }}
        />
        <RHFTextField
          name="estilistas"
          label="Estilistas"
          size="small"
          fullWidth
          multiline
          rows={4}
          disabled
          sx={{ m: 1, width: "-webkit-fill-available" }}
        />
      </Box>

      <Dialog
        open={openModal}
        sx={{
          padding: "2vh",
          "& .MuiPaper-root.MuiDialog-paper": {
            padding: "2vh",
          },
        }}
      >
        <DialogContent>
          <CliTableForm
            closeModal={closeModal}
            // fetchDataFromAPI={fetchCliente}
          />
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}

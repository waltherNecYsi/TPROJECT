import React, { useState } from "react";
import { Box, Dialog, DialogContent } from "@mui/material";
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
import { useCitasContext } from "./Context/CitasContextPage";
import { setInfoToolbar } from "./Context/CitasActionspage";

export default function CitasInfo() {
  const { state, dispatch } = useCitasContext();

  const { infoToolbar } = state;

  console.log(infoToolbar);

  const defaultValues = {
    cliente: infoToolbar.cliente ?? null,
    servicios: infoToolbar.servicios ?? [],
    fechas: infoToolbar.tiempo ?? '',
    estilistas:  infoToolbar.estilistas ?? '',
  };
  const upMd = useResponsive("up", "md");
  const methods = useForm({ defaultValues });



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
  const [openModal, setOpenModal] = useState(false);

  const clienteOption2 = [
    { ane_nom: "hola", ane_apepat: "hola", ane_apemat: "hola", ane_id: 1 },
    { ane_nom: "hola2", ane_apepat: "hola2", ane_apemat: "hola2", ane_id: 2 },
  ];

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
          sx={{ m: 1, width: "-webkit-fill-available" }}
          // options={cliOption}
          options={clienteOption2}
          isOptionEqualToValue={(option, value) =>
            option.ane_id === value.ane_id
          }
          handleAutoGetOptions={ApiBuscarCliente}
          renderOption={(props, option) => (
            <li {...props}>
              {option.ane_nom}
              {/* {option.ane_apepat}
              {option.ane_apemat}{" "} */}
            </li>
          )}
          getOptionLabel={(option) => option.ane_nom}
          filterOptions={(options, params) => {
            const filtered = filter(clienteOption2, params);
            const { inputValue } = params;
            const isExisting = clienteOption2.some(
              (option) => inputValue === option.ane_nom
            );
            const isExistingA = clienteOption2.some(
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
            if (value && value.ane_id !== "a") {
              const values = getValues();
              setInfoToolbar(dispatch, values);
            }
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

import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { createFilterOptions } from "@mui/material/Autocomplete";
import format from "date-fns/format";

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

  const defaultValues = {
    cliente: infoToolbar.cliente ?? null,
    servicios: infoToolbar?.servicios ?? [],
    fechas: infoToolbar?.tiempo ?? [],
    estilistas:
      infoToolbar?.estilista?.map((estilistas) => estilistas.text) ?? "",
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

  // const clienteOption2 = [
  //   { ane_nom: "hola", ane_apepat: "hola", ane_apemat: "hola", ane_id: 1 },
  //   { ane_nom: "hola2", ane_apepat: "hola2", ane_apemat: "hola2", ane_id: 2 },
  // ];

  const filter = createFilterOptions();

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log(infoToolbar);
  }, [infoToolbar]);

  const buscarCliente = async (nombre) => {
    try {
      const response = await axios.get(`/api/buscar_clientes`, {
        params: {
          nombre,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:");
      throw error;
    }
  };

  const ApiBuscarCliente = async (nombre) => {
    if (!nombre || nombre === "" || nombre === undefined) {
      setCliOption([]);
      return;
    }

    try {
      const response = await buscarCliente(nombre);
      if (response !== undefined && response.length > 0) {
        setCliOption(response);
        // if (response.length > 0 && nombre === response[0].Nomb_Clt) {
        //   setValue("cliente", response[0], { shouldValidate: true });
        // } else {
        //   setValue("cliente", "", { shouldValidate: true });
        // }
      }
    } catch (error) {
      console.error("Validation errors:");
    }
  };

  const TiempoFecha = () =>
    defaultValues?.fechas?.map((tiempos) => {
      const formattedDate = format(new Date(tiempos), "dd/MM/yyyy HH:mm:ss");
      return formattedDate;
    }) ?? [];

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
          options={cliOption}
          isOptionEqualToValue={(option, value) =>
            option.ClienteID === value.ClienteID
          }
          handleAutoGetOptions={ApiBuscarCliente}
          renderOption={(props, option) => (
            <li {...props}>
              {option.Nomb_Clt}
              {/* {option.ane_apepat}
              {option.ane_apemat}{" "} */}
            </li>
          )}
          getOptionLabel={(option) => option.Nomb_Clt}
          filterOptions={(options, params) => {
            const filtered = filter(cliOption, params);
            const { inputValue } = params;
            const isExisting = cliOption.some(
              (option) => inputValue === option.Nomb_Clt
            );
            const isExistingA = cliOption.some(
              (option) => option.ClienteID === "a"
            );
            if (!isExistingA && !isExisting) {
              filtered.push({
                ClienteID: "a",
                Nomb_Clt: `Añadir Cliente`,
                ane_apepat: null,
                ane_apemat: null,
              });
            }
            return filtered;
          }}
          onChange={(event, value) => {
            if (value && value.ClienteID !== "a") {
              console.log(state);
              const values = getValues();
              const newValues = {
                ...defaultValues,
                cliente: value,
              };
              setInfoToolbar(dispatch, newValues);
            }
            if (value && value.ClienteID === "a") {
              setOpenModal(true);
              console.log("agregar");
            }
          }}
        />
        <RHFTextField
          name="servicios"
          label="Servicios"
          size="small"
          value={
            infoToolbar?.servicios?.flatMap((subArray) =>
              subArray?.map((item) => item.text ?? item.name)
            ) ?? ""
          }
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
          value={TiempoFecha?.length > 0 ? TiempoFecha?.join("\n") : ""}
          fullWidth
          multiline
          rows={4}
          disabled
          sx={{ m: 1, width: "-webkit-fill-available" }}
        />
        <RHFTextField
          name="estilistas"
          label="Estilistas"
          value={defaultValues.estilistas}
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

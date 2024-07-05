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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  RHFTextField,
  RHFAutocomplete,
} from "../../../../components/hook-form";
import FormProvider from "../../../../components/hook-form/FormProvider";

import axios from "../../../../utils/axios";

export default function ServiciosTableForm({
  inputs,
  request,
  closeModal,
  fetchDataFromAPI,
  rowData,
}) {
  const defaultValues = {
    Nomb_Serv: rowData.Nomb_Serv ?? "",
    Desc_Serv: rowData.Desc_Serv ?? "",
    Precio_Serv: rowData.Precio_Serv ?? 0,
    DurMin_Serv: rowData.DurMin_Serv ?? 0,
  };
  const [openModal, setOpenModal] = useState(true);

  const [docOptions, setDocOptions] = useState([]);
  const [cndPagoOptiom, setCndPagoOptiom] = useState([]);

  const [documentTypeSelect, setDocumentTypeSelect] = useState(null);
  const [documentLenght, setDocumentLenght] = useState(null);

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

  const [duration, setDuration] = useState("90");

  const changeHandler = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmitDef = async (formData) => {
    // setIsSubmitting(true);
    console.log("hola");
    try {
      await request(formData);
      closeModal();
      fetchDataFromAPI();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    // setIsSubmitting(false);
  };

  const onSubmit = async () => {
    const valuesSubmit = methods.getValues();

    const DataSubmit = {
      ...valuesSubmit,
      ServicioID: rowData?.ServicioID,
    };

    try {
      // const response = await axios.post(`/api/cliente`, DataSubmit);
      handleSubmitDef(DataSubmit);
      closeModal();
      fetchDataFromAPI();
    } catch (error) {
      console.error(error);
      alert("no se ha podido registrar");
    }
  };

  // useEffect(() => {
  //   if (documentType && documentType.id !== documentTypeSelect?.id) {
  //     reset(resetValues);
  //   }
  // }, [documentType, documentTypeSelect, reset, resetValues]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <Dialog
          open={openModal}
          sx={{
            padding: "2vh",
            ".MuiPaper-root.MuiDialog-paper": {
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
              Añadir Servicio
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
                name="Nomb_Serv"
                size="small"
                label="Servicio"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />
              <RHFTextField
                name="Precio_Serv"
                size="small"
                label="Precio"
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
                name="Desc_Serv"
                size="small"
                label="Descripcion"
                fullWidth
                multiline
                rows={4}
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />
              <RHFTextField
                name="DurMin_Serv"
                size="small"
                label="Duracion"
                sx={{ width: "-webkit-fill-available", m: 1 }}
              />

              {/* <TimePicker
                views={["minutes", "seconds"]}
                format="mm:ss"
                name="DurMin_Serv"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    sx={{ width: "-webkit-fill-available", m: 1 }}
                  />
                )}
                onChange={(e) => {
                  console.log(e?.target?.value ?? "b");
                }}
              /> */}
            </Box>
          </DialogContent>
        </Dialog>
      </Stack>
    </FormProvider>
  );
}

ServiciosTableForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      defaultValue: PropTypes.string.isRequired,
      helperText: PropTypes.node,
    })
  ),
  request: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  fetchDataFromAPI: PropTypes.func,
  rowData: PropTypes.object,
};

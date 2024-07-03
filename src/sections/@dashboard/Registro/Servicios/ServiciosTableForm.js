import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
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
} from '@mui/material';
import { useForm, useFormContext, Controller } from 'react-hook-form';
import { RHFTextField, RHFAutocomplete } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form/FormProvider';

import axios from '../../../../utils/axios';

export const defaultValues = {
  documento: {
    created_at: null,
    doc_nomb: 'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)',
    id: '1',
    updated_at: null,
  },
  nro_doc: '',
  alias: '',
  ane_nom: '',
  direccion: '',
  ubigeo: null,
  email: '',
  movil: '',
  fijo: '',
};

export default function EstilistasTableForm({ inputs, request, closeModal, fetchDataFromAPI, rowData }) {
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

  const UBIGEO = useMemo(
    () => [
      { ubi_id: 1, ubicacion: 'LIMA - LIMA - LIMA' },
      { ubi_id: 2, ubicacion: 'CALLAO - PROV. CONST. DEL CALLAO - BELLAVISTA' },
    ],
    []
  );

  const [ubigeoOptions, setUbigeoOptions] = useState([]);

  const busquedaUbigeo = (inputValue) => {
    if (inputValue === undefined) {
      inputValue = '';
    }

    if (typeof inputValue === 'string') {
      axios
        .post('/api/busquedaubigeo', { distrito: inputValue })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setUbigeoOptions(response.data);
          } else {
            console.error(
              'El servidor no devolvió un array válido de opciones de producto:',
              response.data
            );
          }
        })
        .catch((error) => {
          console.error('Error al obtener las opciones de producto:', error);
        });
    }
  };

  useEffect(() => {
    if (rowData) {
      const selectedOption = UBIGEO.find(
        (option) => option.ubi_id === parseInt(rowData.ubi_id, 10)
      );

      const modifiedRowData = {
        documento: {
          id: rowData.ane_tipdoc,
          doc_nomb: rowData.doc_nomb,
        },
        nro_doc: rowData.ane_numdoc,
        ane_nom: rowData.ane_nom,
        alias: rowData.ane_nom,
        ubigeo: selectedOption,
        direccion: rowData.ane_dir,
        email: rowData.ane_ema,
        movil: rowData.ane_tel,
        fijo: rowData.ane_tel,
      };

      console.log(selectedOption);
      methods.reset(modifiedRowData);
    }
  }, [rowData, methods, UBIGEO]);

  const documentType = watch('documento', null);

  const resetValues = useMemo(
    () => ({
      documento: values.documento,
      nro_doc: '',
      ane_nom: '',
      alias: '',
      direccion: '',
      ubigeo: null,
      email: '',
      movil: '',
      fijo: '',
    }),
    [values.documento]
  );

  const resetSearch = useMemo(
    () => ({
      documento: documentType,
      nro_doc: '',
      ane_nom: '',
      alias: '',
      direccion: '',
      ubigeo: null,
      email: values.email,
      movil: values.movil,
      fijo: values.fijo,
    }),
    [values, documentType]
  );

  const busquedaSunat = async () => {
    const documentoValue = methods.getValues('documento');
    const docvalue = methods.getValues('nro_doc');
    let requestBody;
  
    if (documentoValue.id === '1') {
      requestBody = { dni: docvalue };
    } else if (documentoValue.id === '6') {
      requestBody = { ruc: docvalue };
    } else {
      console.error('Tipo de documento no soportado');
      return;
    }
    try {
      const response = await axios.post(`/api/consulta-ruc`, requestBody);
      if (documentoValue.id === '1') {
        setValue('ane_nom', response.data.nombre_completo, { shouldValidate: true });
        setValue('alias', response.data.nombre_completo, { shouldValidate: true });
        setValue('direccion', '- - - -', { shouldValidate: true });
      } else if (documentoValue.id === '6') {
        setValue('ane_nom', response.data.nombre_o_razon_social, { shouldValidate: true });
        setValue('alias', response.data.nombre_o_razon_social, { shouldValidate: true });
        setValue('direccion', response.data.direccion, { shouldValidate: true });
        try {
          const busquedaubisunat = await axios.post(`/api/busquedaubigeo`, { distrito: response.data.distrito });
          if (busquedaubisunat.data !== null) {
            setUbigeoOptions(busquedaubisunat.data);
            const ubigsunat = busquedaubisunat.data.find(
              (option) => option.id_ubig === parseInt(response.data.ubigeo, 10)
            );
            console.log(busquedaubisunat.data);
            console.log(parseInt(response.data.ubigeo, 10));
            if (ubigsunat) {
              setUbigeoOptions([ubigsunat]);
              setValue('ubigeo', ubigsunat, { shouldValidate: true });
              console.log(ubigeoOptions);
            } else {
              console.log('No se encontró el ubigeo');
            }
          }
        } catch (error) {
          console.error('Error al obtener las opciones de producto:', error);
        }
      } else {
        console.error('Tipo de documento no soportado');
        return;
      }
  
      console.log(response.data);
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
      throw error;
    }
  };
  

  const handleLimpiarBusquedaClick = () => {
    reset(resetSearch);
  };

  const handleLimpiarTodoClick = () => {
    reset(resetValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docResponse, cndPagoResponse] = await Promise.all([
          axios.post(`/api/document`),
          axios.post(`/api/condicionPago-dominio`),
        ]);

        setDocOptions(docResponse.data);
        setCndPagoOptiom(cndPagoResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmitDef = async (formData) => {
    // setIsSubmitting(true);
    console.log('hola');
    try {
      await request(formData);
      closeModal();
      fetchDataFromAPI();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
    // setIsSubmitting(false);
  };

  const onSubmit = async () => {
    const valuesSubmit = methods.getValues();

    const DataSubmit = {
      ane_tipdoc: valuesSubmit.documento.id,
      ane_numdoc: valuesSubmit.nro_doc,
      ane_nom: valuesSubmit.ane_nom,
      ane_dir: valuesSubmit.direccion,
      ubi_id: valuesSubmit.ubigeo.ubi_id,
      ane_fijo: valuesSubmit.fijo,
      ane_tel: valuesSubmit.movil,
      ane_ema: valuesSubmit.email,
    };

    try {
      const response = await axios.post(`/api/cliente`, DataSubmit);
      closeModal();
      fetchDataFromAPI();
    } catch (error) {
      console.error(error);
      alert('no se ha podido registrar');
    }
  };

  useEffect(() => {
    if (documentType && documentType.id != null) {
      setDocumentTypeSelect(documentType);
      if (documentType.id === '1') {
        setDocumentLenght(8);
      } else if (documentType.id === '6') {
        setDocumentLenght(11);
      }
    }
  }, [documentType]);

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
            padding: '2vh',
            '.css-1j416gi-MuiPaper-root-MuiDialog-paper': {
              padding: '2vh',
            },
            '.MuiPaper-root': {
              padding: '2rem',
            },
            '& .MuiDialogContent-root': {
              padding: 2,
            },
            '& .MuiDialogActions-root': {
              padding: 1,
            },
            '& .css-1nk0ik3-MuiPaper-root-MuiDialog-paper': {
              maxWidth: 'max-content',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'row' },
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '1vh 0vh',
            }}
          >
            <DialogTitle sx={{ p: 2 }} id="customized-dialog-title">
              Añadir Cliente
            </DialogTitle>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'row' },
                flexWrap: 'nowrap',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Button variant="contained" autoFocus onClick={handleLimpiarBusquedaClick}>
                Limpiar Busqueda
              </Button>
              <Button variant="contained" autoFocus onClick={handleLimpiarTodoClick}>
                Limpiar Todo
              </Button>
              <Button variant="contained" type="submit" onClick={onSubmit} autoFocus>
                Guardar
              </Button>
              <IconButton
                aria-label="close"
                onClick={() => closeModal()}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Icon icon="mdi:window-close" style={{ fontSize: '24px' }} />
              </IconButton>
            </Box>
          </Box>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                <RHFAutocomplete
                  label="Tipo"
                  name="documento"
                  autoHighlight
                  size="small"
                  options={docOptions}
                  defaultValue={docOptions[0] || null}
                  sx={{ width: '-webkit-fill-available', m: 1 }}
                  getOptionLabel={(option) => option.doc_nomb}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />

                <RHFTextField
                  name="nro_doc"
                  size="small"
                  label="Nro documento"
                  inputProps={{ maxLength: documentLenght }}
                  sx={{ width: '-webkit-fill-available', m: 1 }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  size="medium"
                  sx={{ width: '-webkit-fill-available', m: 1, maxWidth: '50%' }}
                  onClick={() => {
                    busquedaSunat();
                  }}
                >
                  Buscar con Sunat
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                {typeof documentTypeSelect?.id === 'string' && documentTypeSelect?.id !== '6' && (
                  <RHFTextField
                    name="ane_nom"
                    size="small"
                    label="Nombres y Apellidos"
                    sx={{ width: '-webkit-fill-available', m: 1 }}
                  />
                )}

                {documentTypeSelect?.id === '6' && (
                  <RHFTextField
                    name="ane_nom"
                    size="small"
                    label="Razon Social"
                    sx={{ width: '-webkit-fill-available', m: 1 }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                {(documentTypeSelect?.id === '1' || documentTypeSelect?.id === '6') && (
                  <RHFTextField
                    name="alias"
                    size="small"
                    label="Mostrar Nombre como (Alias)"
                    sx={{ width: '-webkit-fill-available', m: 1 }}
                  />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <RHFTextField
                name="direccion"
                size="small"
                label="Direccion"
                sx={{ width: '-webkit-fill-available', m: 1 }}
              />

              <RHFAutocomplete
                name="ubigeo"
                label="Ubigeo (Distrito)"
                autoHighlight
                size="small"
                options={ubigeoOptions}
                sx={{ width: '-webkit-fill-available', m: 1 }}
                getOptionLabel={(option) =>
                  `${option.departamento} ${option.provincia} ${option.distrito}`
                }
                isOptionEqualToValue={(option, value) => option.id_ubig === value.id_ubig}
                onInputChange={(event, newInputValue) => {
                  busquedaUbigeo(newInputValue);
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                <RHFTextField
                  name="email"
                  size="small"
                  label="Email"
                  sx={{ width: '-webkit-fill-available', m: 1 }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                <RHFTextField
                  name="movil"
                  size="small"
                  label="Telefono Movil"
                  sx={{ width: '-webkit-fill-available', m: 1 }}
                />
                <RHFTextField
                  name="fijo"
                  size="small"
                  label="Telefono Fijo"
                  sx={{ width: '-webkit-fill-available', m: 1 }}
                />
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Stack>
    </FormProvider>
  );
}

EstilistasTableForm.propTypes = {
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

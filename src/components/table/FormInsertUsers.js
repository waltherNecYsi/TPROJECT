import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import Iconify from '../iconify/Iconify';
import { RHFTextField } from '../hook-form';
import { useAuthContext } from '../../auth/useAuthContext';
import axios from '../../utils/axios';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../../pages/Main/style.css';

const RegisterSchema = Yup.object().shape({
  nomyape: Yup.string().required('Tus nombres completos es requerido'),
  gmail: Yup.string()
    .required('Email es requerido')
    .email('Email debe ser una direccion de correo valido'),
  ruc: Yup.string().required('Tu RUC completo es requerido'),
  telefono: Yup.string().required('El número de teléfono no es válido'),
  password: Yup.string().required('Contraseña es requerida'),
  razonsocial: Yup.string().required('Razón Social es requerida'),
});

export default function FormInsertUsers() {
  const { Mainregister } = useAuthContext();
  
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      nomyape: '',
      gmail: '',
      ruc: '',
      telefono: '',
      password: '',
      razonsocial: '',
    },
  });

  const [responseData, setResponseData] = useState(null);

  const [msgError, setMsgError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async (data) => {
    try {
      const response = await axios.post(`/api/consulta-ruc`, {ruc: data.ruc});
      setResponseData(response.data);
      console.log(response.dataa);
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
      throw error;
    }
  }, []);
  
  useEffect(() => {
    const updateRazonSocialField = () => {
      if (responseData && responseData.nombre_o_razon_social) {
        methods.setValue('razonsocial', responseData.nombre_o_razon_social);
      } else {
        methods.setValue('razonsocial', '');
      }
    };

    updateRazonSocialField();
  }, [responseData, methods]);

  const onSubmit = async (data) => {
    console.log('Intentando enviar formulario. Datos:', data);
    setIsSubmitting(true);
  
    try {
      console.log('Enviando solicitud a /api/main');
      const response = await axios.post(`/api/main`, {
        nombres: data.nomyape,
        gmail: data.gmail,
        ruc: data.ruc,
        telefono: data.telefono,
        password: data.password,
        razon_social: data.razonsocial
      });
  
      console.log('Respuesta recibida:', response.data);
  
      if (response.status === 200) {
        console.log("ok")
      } else if (response.status === 404) {
        const errorMessage = response.data.message;
        setMsgError(errorMessage);
      } else {
        console.error('La solicitud falló con código de estado:', response.status);
        setMsgError(`Error en la respuesta del servidor: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      methods.reset();
      methods.setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  


  const handlePasswordChange = (e) => {
    methods.setValue('password', e.target.value);
  };

  const fetchPrub = useCallback(() => {
    console.log('ruc con 11 caracteres');
  }, []);


  const handleInput = async () => {
    const rucValue = methods.watch('ruc');

    if (rucValue && rucValue.length === 11) {
      const isValid = await RegisterSchema.fields.ruc.isValid(rucValue);

      if (isValid) {
        fetchPrub();
        fetchData({ ruc: rucValue });
      }
    } else {
      setResponseData(null);
    }
  };




  useEffect(() => {
    const rucValue = methods.watch('ruc');
    const fetchDataAndPrub = async () => {
      if (rucValue && rucValue.length === 11) {
        const isValid = await RegisterSchema.fields.ruc.isValid(rucValue);
        if (isValid) {
          fetchPrub();
          fetchData({ ruc: rucValue });
        }
      } else {
        setResponseData(null);
      }
    };

    fetchDataAndPrub();
  }, [methods, fetchPrub, fetchData]);





  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormProvider {...methods}>
      <h2 className="text-uppercase text-center mb-4">Regístro de Usuario</h2>
      <p className="text-uppercase text-center mb-2">
        Completa los datos para el registro.
      </p>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          {!!msgError && <Alert severity="error">{msgError}</Alert>}
          {!!methods.formState.errors.afterSubmit && (
            <Alert severity="error">{methods.formState.errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            name="ruc"
            label="RUC"
            type="text"
            className="text-field-amount"
            onInput={handleInput}
          />


          <RHFTextField
            name="razonsocial"
            label="Razon Social"
            value={responseData ? responseData.nombre_o_razon_social : ''}
            style={{ background: '#e8ecef' }}
            disabled
          />

          <RHFTextField name="nomyape" label="Nombres y Apellidos" />

          <RHFTextField
            name="gmail"
            label="Email"
            placeholder="Ingresa tu dirección de correo electrónico"
          />

          <RHFTextField name="telefono" label="Celular de Contacto" />

          <RHFTextField
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={
              isSubmitting
            }
            sx={{
              bgcolor: '#2f54eb',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
            }}
          >
            Continuar
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  );
}

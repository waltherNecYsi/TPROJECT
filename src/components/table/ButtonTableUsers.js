import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormInsertUsers from './FormInsertUsers';
import { RHFTextField } from '../hook-form';
import axios from '../../utils/axios';
import Iconify from '../iconify/Iconify';

export default function ButtonTableUsers({ selectedRows, onUpdateTable }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateInquilinoModal, setShowCreateInquilinoModal] = useState(false);

  const formMethods = useForm();

  const handleClose = () => {
    setShowEditModal(false);
    setShowCreateInquilinoModal(false);
  };

  const handleShowEdit = () => {
    const userData = selectedRows.length > 0 ? selectedRows[0] : {};
    formMethods.reset(userData);
    setShowEditModal(true);
  };

  const handleShowCrearInquilino = () => {
    const userData = selectedRows.length > 0 ? selectedRows[0] : {};
    formMethods.reset(userData);
    setShowCreateInquilinoModal(true);
  };

  const handleButtonClickInquilino = () => {
    // Verifica si hay un usuario seleccionado antes de abrir el modal
    if (selectedRows.length > 0) {
      handleShowCrearInquilino();
    } else {
      alert('se debe seleccionar inquilino');
    }
  };

  const handleButtonClick = () => {
    if (buttonText === 'Editar') {
      // Verifica si hay un usuario seleccionado antes de abrir el modal
      if (selectedRows.length > 0) {
        handleShowEdit();
      }
    } else {
      handleShowEdit();
    }
  };

  const handleEditClick = () => {
    if (selectedRows.length > 0) {
      handleShowEdit();
    }
  };

  const buttonText = Array.isArray(selectedRows) && selectedRows.length > 0 ? 'Editar' : 'Añadir';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const requestData = {
        idregistro: selectedRows[0].id,
        ...data,
      };

      // Hacer la llamada al punto final de actualización
      const response = await axios.put(`/api/actualizar`, requestData);

      console.log('Datos actualizados:', response.data);

      // Llamar a la función onUpdateTable para actualizar el estado en MainUsers
      onUpdateTable();
      handleClose();
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    formMethods.setValue('password', e.target.value);
  };

  useEffect(() => {
    // Si hay un usuario seleccionado, carga sus datos al abrir el modal
    if (buttonText === 'Editar' && selectedRows.length > 0) {
      console.log('Editar y filas seleccionadas'); // Puedes poner aquí tu lógica
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows, buttonText]);

  const CrearInquilino = async (data) => {
    try {
      setIsSubmitting(true);

      const requestData = {
        idusuario: data.idregistro,
        id: data.inquilino,
      };

      console.log(requestData);

      // Hacer la llamada al punto final de actualización
      const response = await axios.post(`/api/tenant`, requestData);

      console.log('Datos actualizados:', response.data);

      // Llamar a la función onUpdateTable para actualizar el estado en MainUsers
      onUpdateTable();
      handleClose();
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={handleButtonClick} variant="outlined" size="medium">
        {buttonText}
      </Button>

      <Button onClick={handleButtonClickInquilino} variant="outlined" color="error" size="medium">
        Crear Inquilino
      </Button>

      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{buttonText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {buttonText === 'Editar' ? (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Stack spacing={2.5}>
                  <RHFTextField name="nombres_apellidos" label="Nombres y Apellidos" />

                  <RHFTextField
                    name="gmail"
                    label="Email"
                    placeholder="Ingresa tu dirección de correo electrónico"
                  />

                  <RHFTextField name="telefono" label="Celular de Contacto" />

                  {/* <RHFTextField
                    name="password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={formMethods.watch('password') || ''}
                    onChange={(e) => handlePasswordChange(e)}
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
                  /> */}

                  <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
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
          ) : (
            <FormInsertUsers />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showCreateInquilinoModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Inquilino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(CrearInquilino)}>
              <Stack spacing={2.5}>
                <RHFTextField
                  name="inquilino"
                  label="Inquilino"
                  placeholder="Ingresa el nombre del Inquilino"
                />

                <LoadingButton
                  fullWidth
                  color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
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
        </Modal.Body>
      </Modal>
    </>
  );
}

ButtonTableUsers.propTypes = {
  selectedRows: PropTypes.array,
  onUpdateTable: PropTypes.func,
};

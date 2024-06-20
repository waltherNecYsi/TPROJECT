import {
  TextField,
  MenuItem,
  Box,
  FormControlLabel,
  Radio,
  Grid,
  RadioGroup,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { RHFTextFieldNubefa } from '../../../components/hook-form';

export default function ComponenteGenerar({ isSubmitting, firstValues, handleSubmitDef, children }) {
  const methods = useForm();

  const combineData = () => {
    const secondValues = methods.getValues();
    const backValues = firstValues();
    const AllData = {
      ...backValues,
      ...secondValues
    };
    handleSubmitDef(AllData)
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          marginTop: 2,
          borderRadius: '10px',
        }}
        // padding="24px"
      >
        <RHFTextFieldNubefa
          xs={6}
          {...methods.register('desde', { shouldUnregister: true })}
          label="Desde"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
        />
        <RHFTextFieldNubefa
          xs={6}
          {...methods.register('hasta', { shouldUnregister: true })}
          label="Hasta"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
        />
      </Box>
      {children}
      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          gridTemplateAreas: `". . boton . ." }}"`,
        }}
      >
        <Grid sx={{ display: 'flex', justifyContent: 'center', gridArea: 'boton' }}>
          <LoadingButton
            color="primary"
            variant="extended"
            onClick={() => combineData()}
            sx={{
              marginTop: '1rem',
              height: '2.5rem',
              minHeight: '2.5rem',
            }}
            loading={isSubmitting ? true : undefined}
            type="submit"
          >
            <Iconify icon="mdi:repost" width={24} />
            Generar
          </LoadingButton>
        </Grid>
      </Box>
    </FormProvider>
  );
}

ComponenteGenerar.propTypes = {
  isSubmitting: PropTypes.bool,
  children: PropTypes.node,
  firstValues: PropTypes.func,
  handleSubmitDef: PropTypes.func,
};

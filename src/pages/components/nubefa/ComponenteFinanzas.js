import {
  TextField,
  MenuItem,
  Box,
  FormControlLabel,
  Radio,
  Fab,
  Grid,
  RadioGroup,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify';
import ComponenteGenerar from './ComponenteGenerar';

export default function ComponenteFinanzas({
  AcOptions,
  cliente,
  setCliente,
  tipo,
  isSubmitting,
}) {

  const handleChangeRadio = (event) => {
    setCliente(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          border: '1px solid #cfcfcf',
          borderRadius: '10px',
        }}
        padding="32px"
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            gridTemplateAreas: `"titulo titulo"
          "radio radio"
          "cliente cliente"`,
          }}
        >
          <Box sx={{ gridArea: 'titulo', textAlign: 'center' }}>
            <Typography variant="h3">Cuentas por Cobrar</Typography>
          </Box>
          <Box sx={{ gridArea: 'radio' }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Todos"
              value={cliente}
              onChange={handleChangeRadio}
              name="radio-buttons-group"
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}
            >
              <FormControlLabel
                sx={{ justifyContent: 'center' }}
                value="Todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                sx={{ justifyContent: 'center' }}
                value={tipo}
                control={<Radio size="small" />}
                label={tipo}
              />
            </RadioGroup>
          </Box>
          {cliente === tipo && (
            <Box gridArea="cliente">
              <Autocomplete
                size="small"
                options={AcOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="Moneda" />}
              />
            </Box>
          )}
        </Box>
        <ComponenteGenerar isSubmitting={isSubmitting} />
      </Box>
    </>
  );
}

ComponenteFinanzas.propTypes = {
  AcOptions: PropTypes.object,
  cliente: PropTypes.string,
  setCliente: PropTypes.string,
  tipo: PropTypes.string,
  isSubmitting: PropTypes.bool
};

import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function RHFAutocompleteTable({
  columns,
  label,
  helperText,
  name,
  data = [],
  handleAutoGetOptions,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field , fieldState: { error } }) => (
        <Autocomplete
          {...field}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onInputChange={(event, newInputValue) => {
            handleAutoGetOptions(newInputValue);
          }}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
            handleAutoGetOptions(other.getOptionLabel ? other.getOptionLabel(newValue) : null);
          }}
          {...other}
          renderInput={(params) => (
            <TextField
            label={label}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...params}
            />
          )}
          {...other}
          options={data}
          PaperComponent={({ children }) => (
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#212B36',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                borderRadius: '4px',
                lineHeight: 1.5,
                fontSize: '1rem',
                fontFamily: 'Metropolis, sans-serif',
                fontWeight: 400,
                overflow: 'auto',
                boxShadow:
                  '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#fbeaec!important',
                  p: 1,
                }}
              >
                {columns.map((column, index) => {
                  let columnName;
                  if (column === 'pro_nom') {
                    columnName = 'Producto';
                  } else if (column === 'idPre') {
                    columnName = 'Prst.';
                  } else if (column === 'stock') {
                    columnName = 'Stock';
                  } else if (column === 'pro_pre') {
                    columnName = 'Precio';
                  } else {
                    columnName = column;
                  }
                  return <Typography key={index}>{columnName}</Typography>;
                })}
              </Box>
              {children}
            </Box>
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              style={{ display: 'flex', justifyContent: 'space-between' }}
              {...props}
            >
              {columns.map((column, index) => (
                <Typography key={index}>{option[column]}</Typography>
              ))}
            </Box>
          )}
        />

      )}
    />
  );
}

RHFAutocompleteTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleAutoGetOptions: PropTypes.func.isRequired,
  helperText: PropTypes.node,
};

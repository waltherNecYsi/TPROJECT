import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const RHFTextFieldNubefa = forwardRef(({ name, helperText, ...other }, ref) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { value } = field;
        return (
          <TextField
            {...field}
            ref={ref} // Añade la referencia al TextField
            error={!!error}
            helperText={error ? error?.message : helperText}
            fullWidth
            size='small'
            {...other}
          />
        );
      }}
    />
  );
});

RHFTextFieldNubefa.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default RHFTextFieldNubefa;

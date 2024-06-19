import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

// ----------------------------------------------------------------------

const RHFAutocompleteNubefa = forwardRef(({ name, label, helperText, onChange, ...other }, ref) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange: change } = field;
        return (
          <Autocomplete
            {...field}
            ref={ref}
            onChange={(event, newValue) => {
              setValue(name, newValue, { shouldValidate: true });
              change?.({ target: { name, value: newValue } });
              console.log(newValue);
            }}
            size="small"
            renderInput={(params) => (
              <TextField
                label={label}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
});

RHFAutocompleteNubefa.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  onChange: PropTypes.func,
};

export default RHFAutocompleteNubefa;

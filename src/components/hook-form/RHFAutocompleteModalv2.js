import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

RHFAutocompleteModal.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  onChange: PropTypes.func,
  handleAutoGetOptions: PropTypes.func,
};

export default function RHFAutocompleteModal({
  name,
  label,
  helperText,
  onChange,
  handleAutoGetOptions,
  ...other
}) {
  const { control, setValue } = useFormContext();

  const { ...autocompleteProps } = other;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          {...autocompleteProps}
          onInputChange={(event, newInputValue) => {
            handleAutoGetOptions(newInputValue);
          }}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
            console.log(newValue);
            if (onChange) {
              onChange(event, newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
        />
      )}
    />
  );
}

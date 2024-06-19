import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const RHFDatePicker = forwardRef(({ name, label, helperText, onChange, ...other }, ref) => {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { value, onChange: change } = field;
        return (
          <DatePicker
            {...field}
            ref={ref}
            label={label}
            onChange={(date) => {
              change(date);
            }}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                fullWidth
                type="date"
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
                size="small"
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
});

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  onChange: PropTypes.func,
};

export default RHFDatePicker;

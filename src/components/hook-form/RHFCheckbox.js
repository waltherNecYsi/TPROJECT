import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {BpCheckedIcon , BpIcon} from '../../pages/components/nubefa/RadioChecked';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

export function RHFCheckbox({ name, helperText, checked, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                icon={<BpIcon />}
                checkedIcon={<BpCheckedIcon />}
                checked={checked}
                onChange={onChange}
              />
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText} </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  row: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  spacing: PropTypes.number,
  helperText: PropTypes.node,
};

export function RHFMultiCheckbox({ row, name, label, options, spacing, helperText, ...other }) {
  const { control } = useFormContext();

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row',
              }),
              '& .MuiFormControlLabel-root': {
                '&:not(:last-of-type)': {
                  mb: spacing || 0,
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2,
                  },
                }),
              },
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value, option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

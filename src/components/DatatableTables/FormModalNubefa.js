import { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { FormProvider, useForm, useFormContext, Controller } from 'react-hook-form';
import RHFTextFieldNubefa from '../hook-form/RHFTextFieldNubefa';

const FormModalNubefa = ({ inputs, request }) => {
  const methods = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputFields = inputs.map((input) => (
    <Controller
      key={input.name}
      name={input.name}
      control={methods.control}
      defaultValue={input.defaultValue}
      render={({ field, fieldState }) => (
        <RHFTextFieldNubefa
          name={input.name}
          label={input.label}
          helperText={input.helperText}
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : input.helperText}
          variant="outlined"
          fullWidth
          type={input.type}
        />
      )}
    />
  ));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(request)}>
      <Stack spacing={2.5}>
        {inputFields}

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
  );
};

FormModalNubefa.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      defaultValue: PropTypes.string.isRequired,
      helperText: PropTypes.node,
    })
  ).isRequired,
  request: PropTypes.func.isRequired,
};

export default FormModalNubefa;
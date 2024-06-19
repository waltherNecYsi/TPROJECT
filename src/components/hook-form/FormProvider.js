import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default function FormProvider({ children, onSubmit, methods, ...other }) {
  return (
    <Form {...methods} {...other}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

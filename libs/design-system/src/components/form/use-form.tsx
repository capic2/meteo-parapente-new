import { createFormHook } from '@tanstack/react-form';
import { Form } from './Form';
import { fieldContext, formContext } from './use-form-context';
import { InputTSF } from '../input/InputTSF';

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: InputTSF,
  },
  formComponents: {
    Form
  },
  fieldContext,
  formContext,
});

export { useAppForm };

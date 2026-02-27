import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { useFieldContext } from '../form/use-form-context';
import { tv } from 'tailwind-variants';
import { Input, InputProps } from './Input';

export const inputTSF = tv({
  // add the component styles
  base: '',
});

export interface InputTSFProps
  extends PropsWithChildren<VariantProps<typeof inputTSF>>,
    Omit<InputProps, 'value' | 'isInvalid'> {
  // add the component props here
}

const InputTSF = forwardRef<HTMLDivElement, InputTSFProps>(
  (
    { children, onChange, onBlur, isLoading, readOnly, disabled, ...props },
    ref
  ) => {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <Input
        ref={ref}
        className={inputTSF()}
        {...props}
        isInvalid={isInvalid}
        value={field.state.value}
        onChange={(event) => {
          field.handleChange(event.target.value);
          onChange?.(event);
        }}
        onBlur={(event) => {
          field.handleBlur();
          onBlur?.(event);
        }}
        isLoading={isLoading}
        readOnly={readOnly}
        disabled={disabled}
      >
        {children}
      </Input>
    );
  }
);

InputTSF.displayName = 'InputTSF';

export { InputTSF };

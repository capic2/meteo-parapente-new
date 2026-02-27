import { forwardRef } from 'react';
import type { InputProps as AriaInputProps } from 'react-aria-components';
import { Input as AriaInput } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Spinner } from '../spinner/Spinner';

const input = tv({
  slots: {
    base: 'flex h-2 border border-solid rounded-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-utility-focus-ring focus-within:ring-offset-2 active:border-border-form-active',
    inputWrapper:
      'flex gap-1 flex-grow flex-nowrap pt-2 pb-2 pl-11 pr-11 rounded-1 max-w-full justify-between',
    input:
      'w-full flex-1 outline-none typography-body placeholder:text-content-neutral-lowest min-w-0 max-w-full',
    state: 'flex gap-1 items-center shrink-0',
  },
  variants: {
    isInvalid: {
      true: {
        base: 'border-border-form-error bg-surface-form-error',
        inputWrapper: 'bg-surface-form-error',
        input: 'bg-surface-form-error',
        state: 'text-content-form-error',
      },
    },
    isReadOnly: {
      true: {
        base: 'border-border-form-disabled bg-surface-form-disabled',
        inputWrapper: 'border-border-form-disabled bg-surface-form-disabled',
        input: 'bg-surface-form-disabled text-content-form-readonly',
      },
    },
    isDisabled: {
      true: {
        base: 'border-border-form-disabled bg-surface-form-disabled',
        inputWrapper: 'bg-surface-form-disabled text-content-form-disabled',
        input: 'bg-surface-form-disabled text-content-form-disabled',
      },
    },
  },
  compoundVariants: [
    {
      isInvalid: false,
      isDisabled: false,
      isReadOnly: false,
      className: {
        base: 'border-border-form-enabled bg-surface-form-enabled',
        inputWrapper: 'border-border-form-enabled bg-surface-form-enabled',
        input: 'text-content-form-enabled bg-surface-form-enabled',
        state: 'text-content-neutral-disabled',
      },
    },
  ],
});

export interface InputProps extends VariantProps<typeof input>, AriaInputProps {
  isLoading?: boolean;
  isInvalid?: boolean;
}

const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      children,
      type,
      isLoading = false,
      isInvalid = false,
      readOnly,
      disabled,
      ...props
    },
    ref
  ) => {
    const {
      base,
      inputWrapper,
      input: inputStyle,
      state,
    } = input({
      isInvalid,
      isReadOnly: !!readOnly,
      isDisabled: !!disabled,
    });

    return (
      <div className={base()}>
        <div className={inputWrapper()}>
          <AriaInput
            className={inputStyle()}
            {...props}
            ref={ref}
            type={type}
            aria-busy={isLoading}
            aria-invalid={isInvalid}
            readOnly={readOnly}
            disabled={disabled}
          >
            <div className={state()}>{isLoading && <Spinner />}</div>
          </AriaInput>
        </div>
        /
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

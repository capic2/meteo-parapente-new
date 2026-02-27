import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const textField = tv({
  // add the component styles
  base: '',
});

export interface TextFieldProps
  extends PropsWithChildren<VariantProps<typeof textField>> {
  // add the component props here
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className={textField()} {...props}>
        {children}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };

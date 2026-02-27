import { forwardRef } from 'react';
import {CheckboxGroup as AriaCheckboxGroup} from 'react-aria-components';
import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const checkboxGroup = tv({
  // add the component styles
  base: '',
});

export interface CheckboxGroupProps
  extends PropsWithChildren<VariantProps<typeof checkboxGroup>> {
  // add the component props here
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <AriaCheckboxGroup ref={ref} className={checkboxGroup()} {...props}>
        {children}
      </AriaCheckboxGroup>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export { CheckboxGroup };

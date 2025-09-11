import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { Link } from 'react-aria-components';
import { useIntl } from 'react-intl';

export const paginationLink = tv({
  // add the component styles
  base: '',
  variants: {
    isActive: {
      true: 'font-medium hover:font-semibold',
      false: 'font-normal hover:text-medium cursor-pointer',
    },
  },
});

export interface PaginationLinkProps
  extends PropsWithChildren<VariantProps<typeof paginationLink>> {
  isActive?: boolean;
  isDisabled?: boolean;
}

const PaginationLink = forwardRef<HTMLDivElement, PaginationLinkProps>(
  ({ children, isActive, isDisabled, ...rest }, ref) => {
    const intl = useIntl();
    return (
      <Link
        ref={ref}
        className={paginationLink({ isActive })}
        isDisabled={isDisabled}
        aria-current={isActive ? 'page' : undefined}
        aria-label={intl.formatMessage({
          id: 'lib.design-system.pagination.pagination-link.link.label',
        })}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

PaginationLink.displayName = 'PaginationLink';

export { PaginationLink };

import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { Column } from 'react-aria-components';

export const dataTableRowHeader = tv({
  base: 'bg-gray-50 group px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
});

export interface DataTableRowHeaderProps
  extends PropsWithChildren<VariantProps<typeof dataTableRowHeader>> {
  isRaw?: boolean;
}

const DataTableRowHeader = forwardRef<HTMLDivElement, DataTableRowHeaderProps>(
  ({ children, isRaw = false, ...rest }, ref) => {
    return isRaw ? (
      <th ref={ref} className={dataTableRowHeader()}>
        {children}
      </th>
    ) : (
      <Column
        ref={ref}
        className={dataTableRowHeader()}
        {...rest}
      >
        {children}
      </Column>
    );
  }
);

DataTableRowHeader.displayName = 'RowHeader';

export { DataTableRowHeader };

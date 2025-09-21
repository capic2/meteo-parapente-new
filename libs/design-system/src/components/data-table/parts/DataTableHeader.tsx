import { forwardRef, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const dataTableHeader = tv({
  base: 'bg-gray-50',
});

export interface DataTableHeaderProps
  extends VariantProps<typeof dataTableHeader> {
  children?: ReactNode;
  isRowHeader?: boolean;
}

const DataTableHeader = forwardRef<HTMLDivElement, DataTableHeaderProps>(
  ({ children, isRowHeader = false, ...rest }, ref) => {
    return (
      <th
        ref={ref}
        role={isRowHeader ? 'rowheader' : undefined}
        className={dataTableHeader()}
        {...rest}
      >
        {children}
      </th>
    );
  }
);

DataTableHeader.displayName = 'DataTableHeader';

export { DataTableHeader };

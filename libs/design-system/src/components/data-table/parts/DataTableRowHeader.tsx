import type { PropsWithChildren } from 'react';
import { forwardRef, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const dataTableRowHeader = tv({
  base: 'bg-gray-50 group px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
});

export interface DataTableRowHeaderProps
  extends PropsWithChildren<VariantProps<typeof dataTableRowHeader>> {
  children: ReactNode;
}

const DataTableRowHeader = forwardRef<HTMLDivElement, DataTableRowHeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <th ref={ref} className={dataTableRowHeader()} {...rest}>
        {children}
      </th>
    );
  }
);

DataTableRowHeader.displayName = 'RowHeader';

export { DataTableRowHeader };

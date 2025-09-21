import { forwardRef, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const dataTableRow = tv({
  base: 'not-last:border-b border-gray-200 hover:bg-gray-100',
});

export interface DataTableRowProps extends VariantProps<typeof dataTableRow> {
  children: ReactNode;
}

const DataTableRow = forwardRef<HTMLDivElement, DataTableRowProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tr ref={ref} className={dataTableRow()} {...rest}>
        {children}
      </tr>
    );
  }
);

DataTableRow.displayName = 'DataTableRow';

export { DataTableRow };

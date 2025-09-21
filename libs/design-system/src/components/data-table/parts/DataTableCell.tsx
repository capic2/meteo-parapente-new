import { forwardRef, ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const dataTableCell = tv({
  base: 'p-2',
});

export interface DataTableCellProps extends VariantProps<typeof dataTableCell> {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

const DataTableCell = forwardRef<HTMLDivElement, DataTableCellProps>(
  ({ children, colSpan, rowSpan, ...props }, ref) => {
    return (
      <td
        ref={ref}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={dataTableCell()}
        {...props}
      >
        {children}
      </td>
    );
  }
);

DataTableCell.displayName = 'DataTableCell';

export { DataTableCell };

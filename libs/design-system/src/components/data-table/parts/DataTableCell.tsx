import { forwardRef } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Cell, CellProps } from 'react-aria-components';

export const dataTableCell = tv({
  base: 'p-2',
});

export type DataTableCellProps = VariantProps<typeof dataTableCell> & CellProps;

const DataTableCell = forwardRef<HTMLDivElement, DataTableCellProps>(
  ({ children, ...props }, ref) => {
    return (
      <Cell ref={ref} className={dataTableCell()} {...props}>
        {children}
      </Cell>
    );
  }
);

DataTableCell.displayName = 'DataTableCell';

export { DataTableCell };

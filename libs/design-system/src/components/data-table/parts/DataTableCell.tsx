import { forwardRef } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Cell, CellProps } from 'react-aria-components';

export const dataTableCell = tv({
  base: 'p-2',
});

export interface DataTableCellProps
  extends VariantProps<typeof dataTableCell>,
    CellProps {
  isRaw?: boolean;
}

const DataTableCell = forwardRef<HTMLDivElement, DataTableCellProps>(
  ({ children, isRaw, ...props }, ref) => {
    return isRaw ? (
      <td ref={ref} className={dataTableCell()}>
        {children}
      </td>
    ) : (
      <Cell ref={ref} className={dataTableCell()} {...props}>
        {children}
      </Cell>
    );
  }
);

DataTableCell.displayName = 'DataTableCell';

export { DataTableCell };

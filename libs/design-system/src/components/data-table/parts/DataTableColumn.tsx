import { forwardRef } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Column, ColumnProps } from 'react-aria-components';

export const dataTableColumn = tv({
  base: 'group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
});

export type DataTableColumnProps = VariantProps<typeof dataTableColumn> &
  ColumnProps;

const DataTableColumn = forwardRef<HTMLDivElement, DataTableColumnProps>(
  ({ children, ...props }, ref) => {
    return (
      <Column ref={ref} className={dataTableColumn()} {...props}>
        {children}
      </Column>
    );
  }
);

DataTableColumn.displayName = 'DataTableColumn';

export { DataTableColumn };

import { tv, VariantProps } from 'tailwind-variants';
import { DataTableProvider } from './DataTable.context';
import { ReactNode } from 'react';

export const dataTable = tv({
  base: 'min-w-full divide-y divide-gray-200',
});

export interface DataTableProps extends VariantProps<typeof dataTable> {
  isLoading?: boolean;
  children: ReactNode;
}

const DataTable = ({
  children,
  isLoading = false,
  ...rest
}: DataTableProps) => {
  return (
    <DataTableProvider isLoading={isLoading}>
      <table className={dataTable()} {...rest}>
        {children}
      </table>
    </DataTableProvider>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable };

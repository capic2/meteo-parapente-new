import {
  ResizableTableContainer,
  Table,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from 'react-aria-components';
import { tv, VariantProps } from 'tailwind-variants';
import { DataTableProvider } from './DataTable.context';

export const dataTable = tv({
  base: 'min-w-full divide-y divide-gray-200',
});

export interface DataTableProps<T extends object>
  extends VariantProps<typeof dataTable>,
    TableProps {
  isLoading?: boolean;
  columns?: TableHeaderProps<T>['columns'];
  items?: TableBodyProps<T>['items'];
}

const DataTable = <T extends object>({
  children,
  isLoading = false,
  columns,
  items,
  ...rest
}: DataTableProps<T>) => {
  return (
    <DataTableProvider isLoading={isLoading}>
      <ResizableTableContainer>
        <Table className={dataTable()} {...rest}>
          {children}
        </Table>
      </ResizableTableContainer>
    </DataTableProvider>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable };

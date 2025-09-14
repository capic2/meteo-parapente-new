import {
  ResizableTableContainer,
  Table,
  TableProps,
} from 'react-aria-components';
import { tv, VariantProps } from 'tailwind-variants';

export const dataTable = tv({
  base: 'min-w-full divide-y divide-gray-200',
});

export type DataTableProps = VariantProps<typeof dataTable> & TableProps;

const DataTable = ({ children, ...rest }: DataTableProps) => {
  return (
    <ResizableTableContainer>
      <Table className={dataTable()} {...rest}>
        {children}
      </Table>
    </ResizableTableContainer>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable };

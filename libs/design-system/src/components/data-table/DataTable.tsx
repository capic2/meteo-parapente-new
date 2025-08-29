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

const DataTable = ({ children }: DataTableProps) => {
  return (
    <ResizableTableContainer>
      <Table className={dataTable()}>
        {children}
        {/*<TableHeader className="bg-gray-50">
        <Row>
          <Column className="group px-6 py-3 text-left text -xs font-medium text-gray-500 uppercase tracking-wider">
            Column 1
          </Column>
          <Column className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Column 2
          </Column>
          <Column className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Column 3
          </Column>
        </Row>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        <Row>
          <Cell className="px-6 py-4 whitespace-nowrap">Cell 1</Cell>
          <Cell className="px-6 py-4 whitespace-nowrap">Cell 2</Cell>
          <Cell className="px-6 py-4 whitespace-nowrap">Cell 3</Cell>
        </Row>
        <Row>
          <Cell className="px-6 py-4 whitespace-nowrap">Cell 1</Cell>
          <Cell className="px-6 py-4 whitespace-nowrap">Cell 2</Cell>
          <Cell className="px-6 py-4 whitespace-nowrap">Cell 3</Cell>
        </Row>
      </TableBody>*/}
      </Table>
    </ResizableTableContainer>
  );
};

DataTable.displayName = 'DataTable';

export { DataTable };

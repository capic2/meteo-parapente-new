import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import { DataTableHeader } from './parts/DataTableHeader';
import { DataTableRow } from './parts/DataTableRow';
import { DataTableColumn } from './parts/DataTableColumn';
import { DataTableBody } from './parts/DataTableBody';
import { DataTableCell } from './parts/DataTableCell';
import { DataTableRowHeader } from './parts/DataTableRowHeader';
import { Row, Cell, TableHeader } from 'react-aria-components';
import { Spinner } from '../spinner/Spinner';
const meta = {
  component: DataTable,
  title: 'DataTable',
} satisfies Meta<typeof DataTable>;
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Primary: Story = {
  args: {},
  render: (args) => (
    <DataTable {...args}>
      <DataTableHeader>
        <DataTableColumn />
        <DataTableColumn>09h - 12h</DataTableColumn>
        <DataTableColumn>12h - 16h</DataTableColumn>
        <DataTableColumn>16h - 19h</DataTableColumn>
      </DataTableHeader>
      <DataTableBody>
        <DataTableRow>
          <DataTableRowHeader>Header A</DataTableRowHeader>
          <DataTableCell>Cell 1</DataTableCell>
          <DataTableCell>Cell 1</DataTableCell>
          <DataTableCell>Cell 1</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableRowHeader>Header B</DataTableRowHeader>
          <DataTableCell>Cell 2</DataTableCell>
          <DataTableCell>Cell 2</DataTableCell>
          <DataTableCell>Cell 2</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableRowHeader>Header C</DataTableRowHeader>
          <DataTableCell>Cell 3</DataTableCell>
          <DataTableCell>Cell 3</DataTableCell>
          <DataTableCell>Cell 3</DataTableCell>
        </DataTableRow>
        <DataTableRow>
          <DataTableRowHeader>Header D</DataTableRowHeader>
          <DataTableCell>Cell 4</DataTableCell>
          <DataTableCell>Cell 4</DataTableCell>
          <DataTableCell>Cell 4</DataTableCell>
        </DataTableRow>
      </DataTableBody>
    </DataTable>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => (
    <DataTable {...args}>
      <DataTableHeader>
        <DataTableColumn />
        <DataTableColumn>09h - 12h</DataTableColumn>
        <DataTableColumn>12h - 16h</DataTableColumn>
        <DataTableColumn>16h - 19h</DataTableColumn>
      </DataTableHeader>
      <DataTableBody>

      </DataTableBody>
    </DataTable>
  ),
};


export const WithCustomLoading: Story = {
  args: {
    isLoading: true,
    children: [],
    items: []
  },
  render: (args) => (
    <DataTable isLoading={args.isLoading} items={args.items}>
      <DataTableHeader>
        <DataTableColumn isRowHeader={true}/>
        <DataTableColumn>09h - 12h</DataTableColumn>
        <DataTableColumn>12h - 16h</DataTableColumn>
        <DataTableColumn>16h - 19h</DataTableColumn>
      </DataTableHeader>
      <DataTableBody renderLoadingState={
        <>
        <DataTableRow isRaw={true}>
          <DataTableRowHeader isRaw={true}>property 1</DataTableRowHeader>
          <td colSpan={999} rowSpan={999}><div

            className="flex h-full items-center justify-center py-40"

          >
            <Spinner size={24} />
          </div></td>
        </DataTableRow>
        <tr>
          <th>property 2</th>
        </tr>
        <tr>
          <th>property 3</th>
        </tr>
</>
        }>
        {args.children}
      </DataTableBody>
    </DataTable>
  ),
}

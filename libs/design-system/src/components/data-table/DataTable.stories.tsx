import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import { DataTableHeader } from './parts/DataTableHeader';
import { DataTableRow } from './parts/DataTableRow';
import { DataTableColumn } from './parts/DataTableColumn';
import { DataTableBody } from './parts/DataTableBody';
import { DataTableCell } from './parts/DataTableCell';
import { DataTableRowHeader } from './parts/DataTableRowHeader';

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

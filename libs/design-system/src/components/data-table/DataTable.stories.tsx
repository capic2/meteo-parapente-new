import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import { DataTableHeader } from './parts/DataTableHeader';
import { DataTableRow } from './parts/DataTableRow';
import { DataTableBody } from './parts/DataTableBody';
import { DataTableCell } from './parts/DataTableCell';
import { DataTableRowHeader } from './parts/DataTableRowHeader';
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
      <DataTableRow>
        <DataTableHeader isRowHeader={true} />
        <DataTableHeader>09h - 12h</DataTableHeader>
        <DataTableHeader>12h - 16h</DataTableHeader>
        <DataTableHeader>16h - 19h</DataTableHeader>
      </DataTableRow>
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
      <DataTableRow>
        <DataTableHeader isRowHeader={true} />
        <DataTableHeader>09h - 12h</DataTableHeader>
        <DataTableHeader>12h - 16h</DataTableHeader>
        <DataTableHeader>16h - 19h</DataTableHeader>
      </DataTableRow>
      <DataTableBody>
        aaa
      </DataTableBody>
    </DataTable>
  ),
};


export const WithCustomLoading: Story = {
  args: {
    isLoading: true,
    children: [],
  },
  render: (args) => (
    <DataTable isLoading={args.isLoading}>
      <DataTableRow>
        <DataTableHeader isRowHeader={true}/>
        <DataTableHeader>09h - 12h</DataTableHeader>
        <DataTableHeader>12h - 16h</DataTableHeader>
        <DataTableHeader>16h - 19h</DataTableHeader>
      </DataTableRow>
      <DataTableBody renderLoadingBodyContentState={
        <>
          <DataTableRow>
            <DataTableRowHeader>header 1</DataTableRowHeader>
            <DataTableCell colSpan={999} rowSpan={999}>
              <div className="flex flex-col justify-center py-8 items-center">
                <Spinner />
                This is the loading state
              </div>
            </DataTableCell>
          </DataTableRow>
        <DataTableRow>
          <DataTableRowHeader>header 2</DataTableRowHeader>
        </DataTableRow>
        <DataTableRow>
          <DataTableRowHeader>header 3</DataTableRowHeader>
        </DataTableRow>
          </>
        }>
        {args.children}
      </DataTableBody>
    </DataTable>
  ),
}

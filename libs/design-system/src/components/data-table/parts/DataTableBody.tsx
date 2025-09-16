import { ForwardedRef, forwardRef, JSX } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { TableBody, TableBodyProps } from 'react-aria-components';
import { DataTableRowProps } from './DataTableRow';
import { useDataTableContext } from '../DataTable.context';
import { DataTableBodyLoading } from './DataTableBodyLoading';
import { DataTableBodyNoData } from './DataTableBodyNoData';

export const dataTableBody = tv({
  // add the component styles
  base: '',
});

export type DataTableBodyProps<T extends object> = VariantProps<
  typeof dataTableBody
> &
  TableBodyProps<T>;

const DataTableBodyInternal = <T extends object>(
  { children, ...rest }: DataTableBodyProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { isLoading,items } = useDataTableContext();
  console.log({ isLoading });
  return (
    <TableBody
      ref={ref}
      items={items}
      className={dataTableBody()}
      renderEmptyState={() =>
        isLoading ? <DataTableBodyLoading /> : <DataTableBodyNoData />
      }
      {...rest}
    >
      {children}
    </TableBody>
  );
};

type DataTableRowComponent = (<T extends object>(
  props: DataTableRowProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

const DataTableBody = forwardRef(
  <T extends object>(
    props: DataTableBodyProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return DataTableBodyInternal<T>(props, ref);
  }
) as DataTableRowComponent;

DataTableBody.displayName = 'DataTableBody';

export { DataTableBody };

import { ForwardedRef, forwardRef, JSX } from 'react';
import { TableBody, TableBodyProps } from 'react-aria-components';
import { DataTableRowProps } from './DataTableRow';
import { DataTableBodyLoading } from './DataTableBodyLoading';
import { useDataTableContext } from '../DataTable.context';

export interface DataTableBodyProps<T extends object>
  extends Omit<TableBodyProps<T>, 'renderEmptyState'> {
  renderEmptyState?: JSX.Element;
  renderLoadingState?: JSX.Element;
}

const DataTableBodyInternal = <T extends object>(
  {
    children,
    renderEmptyState,
    renderLoadingState,
    ...rest
  }: DataTableBodyProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { isLoading } = useDataTableContext();

    const LoadingState = renderLoadingState ? (
      renderLoadingState
    ) : (
      <DataTableBodyLoading />
    );

  return (
    <TableBody ref={ref} {...rest}>
      {isLoading ? LoadingState : children}
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

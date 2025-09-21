import { forwardRef, JSX, ReactElement, ReactNode } from 'react';
import { DataTableBodyLoading } from './DataTableBodyLoading';
import { useDataTableContext } from '../DataTable.context';

export interface DataTableBodyProps {
  renderEmptyBodyContentState?: JSX.Element;
  renderLoadingBodyContentState?: ReactElement | ReactElement[];
  children: ReactNode;
}

const DataTableBody = forwardRef<HTMLDivElement, DataTableBodyProps>(
  ({ children, renderEmptyBodyContentState, renderLoadingBodyContentState, ...rest }, ref) => {
    const { isLoading } = useDataTableContext();

    const LoadingState = renderLoadingBodyContentState ? (
      renderLoadingBodyContentState
    ) : (
      <DataTableBodyLoading />
    );

    return (
      <tbody ref={ref} {...rest}>
        {isLoading ? LoadingState : children}
      </tbody>
    );
  }
);

DataTableBody.displayName = 'DataTableBody';

export { DataTableBody };

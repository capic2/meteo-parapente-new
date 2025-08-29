import { ForwardedRef, forwardRef, JSX } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { TableHeader, TableHeaderProps } from 'react-aria-components';

export const dataTableHeader = tv({
  base: 'bg-gray-50',
});

export type DataTableHeaderProps<T extends object> = VariantProps<
  typeof dataTableHeader
> &
  TableHeaderProps<T>;

const DataTableHeaderInternal = <T extends object>(
  { children, ...rest }: DataTableHeaderProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <TableHeader ref={ref} className={dataTableHeader()} {...rest}>
      {children}
    </TableHeader>
  );
};

type DataTableHeaderComponent = (<T extends object>(
  props: DataTableHeaderProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

const DataTableHeader = forwardRef(
  <T extends object>(
    props: DataTableHeaderProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return DataTableHeaderInternal<T>(props, ref);
  }
) as DataTableHeaderComponent;

DataTableHeader.displayName = 'DataTableHeader';

export { DataTableHeader };

import { ForwardedRef, forwardRef, JSX } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Row, RowProps } from 'react-aria-components';

export const dataTableRow = tv({
  // add the component styles
  base: '',
});

export type DataTableRowProps<T extends object> = VariantProps<
  typeof dataTableRow
> &
  RowProps<T>;

const DataTableRowInternal = <T extends object>(
  { children, ...rest }: DataTableRowProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <Row ref={ref} className={dataTableRow()} {...rest}>
      {children}
    </Row>
  );
};

type DataTableRowComponent = (<T extends object>(
  props: DataTableRowProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

const DataTableRow = forwardRef(
  <T extends object>(
    props: DataTableRowProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return DataTableRowInternal<T>(props, ref);
  }
) as DataTableRowComponent;

DataTableRow.displayName = 'DataTableRow';

export { DataTableRow };

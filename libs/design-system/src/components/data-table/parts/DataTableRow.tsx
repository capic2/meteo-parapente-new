import { ForwardedRef, forwardRef, JSX } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Row, RowProps } from 'react-aria-components';

export const dataTableRow = tv({
  base: 'not-last:border-b border-gray-200 hover:bg-gray-100',
});

export interface DataTableRowProps<T extends object>
  extends VariantProps<typeof dataTableRow>,
    RowProps<T> {
  isRaw?: boolean;
}

const DataTableRowInternal = <T extends object>(
  { children, isRaw = false, ...rest }: DataTableRowProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return isRaw ? (
    <tr ref={ref} className={dataTableRow()}>
      {children}
    </tr>
  ) : (
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

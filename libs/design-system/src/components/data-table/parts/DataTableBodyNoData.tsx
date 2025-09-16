import { forwardRef } from 'react';

const DataTableBodyNoData = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-full items-center justify-center py-40"
      {...props}
    >
      No data
    </div>
  );
});

DataTableBodyNoData.displayName = 'DataTableBodyNoData';

export { DataTableBodyNoData };

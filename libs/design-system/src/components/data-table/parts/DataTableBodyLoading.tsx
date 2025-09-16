import { forwardRef } from 'react';
import { Spinner } from '../../spinner/Spinner';

const DataTableBodyLoading = forwardRef<HTMLDivElement>(({ ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-full items-center justify-center py-40"
      {...props}
    >
      <Spinner size={24} />
    </div>
  );
});

DataTableBodyLoading.displayName = 'DataTableBodyLoading';

export { DataTableBodyLoading };

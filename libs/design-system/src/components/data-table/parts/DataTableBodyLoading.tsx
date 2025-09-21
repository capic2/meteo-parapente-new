import { forwardRef } from 'react';
import { Spinner } from '../../spinner/Spinner';

const DataTableBodyLoading = forwardRef<HTMLDivElement>(({ ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className="flex h-full items-center justify-center py-40"
      {...props}
    >
      <tr>
        <td colSpan={999} rowSpan={999}>
          <div
            className="flex h-full items-center justify-center py-40"
            {...props}
          >
            <Spinner size={24} />
          </div>
        </td>
      </tr>
    </tbody>
  );
});

DataTableBodyLoading.displayName = 'DataTableBodyLoading';

export { DataTableBodyLoading };

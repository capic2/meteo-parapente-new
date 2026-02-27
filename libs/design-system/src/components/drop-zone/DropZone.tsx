import { forwardRef } from 'react';

import type { VariantProps } from 'tailwind-variants';
import { DropZone as AriaDropZone } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export const dropZone = tv({
  base: 'flex items-center justify-center p-8 min-h-24 font-sans text-white text-center rounded-lg border border-1 border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900',
  variants: {
    isFocusVisible: {
      true: 'outline outline-2 -outline-offset-1 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]',
    },
    isDropTarget: {
      true: 'bg-blue-200 dark:bg-blue-800 outline outline-2 -outline-offset-1 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]',
    },
  },
});

export interface DropZoneProps extends VariantProps<typeof dropZone> {
  text: string;
  onFileSelected: (file: File) => void;
}

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  ({ text, onFileSelected, ...rest }, ref) => {
    return (
      <AriaDropZone
        ref={ref}
        className={dropZone()}
        getDropOperation={(types) =>{
          console.log({types})
          return [
            'text/gpx+xml',
            'application/gpx+xml',
            'application/octet-stream',
          ].some((t) => types.has(t))
            ? 'copy'
            : 'cancel';
        }}
        onDrop={async (event) => {
          const item = event.items.at(0);

          if (item?.kind === 'file') {
            const file = await item.getFile();
            onFileSelected(file);
          }
        }}
        {...rest}
      >
        {text}
      </AriaDropZone>
    );
  }
);

DropZone.displayName = 'DropZone';

export { DropZone };

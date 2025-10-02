import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

export const appMenuContent = tv({
  // add the component styles
  base: '',
});

export interface AppMenuContentProps
  extends PropsWithChildren<VariantProps<typeof appMenuContent>> {
  // add the component props here
}

const AppMenuContent = forwardRef<HTMLDivElement, AppMenuContentProps>(
  ({ children, ...props }, ref) => {
    const containerStyles = twMerge (
      'flex-col overflow-y-auto overflow-x-hidden gap-y-2 pl-4 pr-4 pb-4 scroll-py-2 md:flex',
      'bg-canvas md:bg-[transparent]',
      'absolute top-15 left-0 right-0 z-10 h-svh md:static md:w-auto md:pl-1 md:pr-1 md:pb-1',
      'data-[mobile-open=false]:hidden md:data-[mobile-open=false]:flex data-[mobile-open=true]:flex',
    )

    return (
      <div
        className={containerStyles}
      >
        {children}
      </div>
    );
  }
);

AppMenuContent.displayName = 'AppMenuContent';

export { AppMenuContent };

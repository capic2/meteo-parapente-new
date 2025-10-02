import type { ReactNode } from 'react';
import { forwardRef } from 'react';

export interface AppMenuProps {
  children: ReactNode;
}

const AppMenu = forwardRef<HTMLDivElement, AppMenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className="relative z-[1] flex flex-col p-3 gap-y-300 md:max-w-app-menu md:h-full"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

AppMenu.displayName = 'AppMenu';

export { AppMenu };

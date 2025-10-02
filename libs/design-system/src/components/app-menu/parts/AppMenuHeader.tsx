import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { IconButton } from '../../icon-button/IconButton';
import { CiBoxList } from "react-icons/ci";
import { Link } from '../../link/Link';

export const appMenuHeader = tv({
  // add the component styles
  base: '',
});

export interface AppMenuHeaderProps
  extends PropsWithChildren<VariantProps<typeof appMenuHeader>> {
  // add the component props here
}

const AppMenuHeader = forwardRef<HTMLDivElement, AppMenuHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <header className="flex flex-col gap-y- pl-1 pr-1">
        <div className="justify-between items-center uy-flex">
          <Link to={linkHref}>
            {environment === 'production' ? (
              <PayFitBrand label={linkLabel} width={104} />
            ) : (
              <PayFitBrandPreprod label={linkLabel} env={environment} />
            )}
          </Link>
          {notificationsComponent}
        </div>
        <div className="uy-hidden md:uy-flex">{searchComponent}</div>
      </header>
    );
  }
);

AppMenuHeader.displayName = 'AppMenuHeader';

export { AppMenuHeader };

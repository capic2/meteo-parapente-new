import type { PropsWithChildren } from 'react';
import { forwardRef, HTMLAttributes } from 'react';
import { useId } from 'react-aria';

export type NavProps = PropsWithChildren<
  Pick<
    HTMLAttributes<HTMLDivElement>,
    | 'aria-label'
    | 'aria-describedby'
    | 'aria-labelledby'
    | 'aria-hidden'
    | 'aria-live'
  > & {
    /** The title of the navigation menu. */
    title?: string; //TODO: remove the optional when GB and ES have section title
  }
>;
const Nav = forwardRef<HTMLDivElement, NavProps>(
  ({ title, children, ...rest }, ref) => {
    const labelId = useId();
    const navTitleId = `nav-title-${labelId}`;
    return (
      <nav
        {...rest}
        className="flex flex-col gap-1 min-w-[264px]"
        aria-labelledby={navTitleId}
      >
        {/* TODO: typograhpy */}
        <h3 id={navTitleId} className="uy-typography-body-strong py-2 px-3">
          {title}
        </h3>
        <ul className="flex flex-col gap-1 list-none">{children}</ul>
      </nav>
    );
  }
);

Nav.displayName = 'Nav';

export { Nav };

import { createLink, LinkProps as TSkLinkProps } from '@tanstack/react-router';
import { Link } from 'react-aria-components';
import { navItem, NavItemBaseProps } from './NavItem.variants';
import { twMerge } from 'tailwind-merge';

export interface NavLinkProps
  extends NavItemBaseProps,
    Omit<TSkLinkProps, 'children' | 'target'> {
  onPress?: never;
  isCurrent?: never;
}

const TSLink = createLink(Link);

const NavLink = ({
  prefix,
  suffix,
  to,
  activeOptions,
  isDisabled,
  level,
  from,
  children,
  ...rest
}: NavLinkProps) => {
  const {
    base,
    label,
    prefix: prefixStyles,
    suffix: suffixStyles,
  } = navItem({ level, isDisabled });

  return (
    <TSLink
      to={to}
      from={from}
      className={twMerge(base(), label())}
      isDisabled={isDisabled}
      data-level={level}
      activeProps={{
        ...activeOptions,
        'data-current': true,
        //'aria-current': 'page',
      }}
      {...rest}
    >
      {({ isActive }) => {
        return (
          <>
            {prefix && (
              <span className={prefixStyles()}>
                {prefix({ isCurrent: isActive })}
              </span>
            )}
            <span className={label()}>{children}</span>
            {suffix && <span className={suffixStyles()}>{suffix}</span>}
          </>
        );
      }}
    </TSLink>
  );
};

export { NavLink };

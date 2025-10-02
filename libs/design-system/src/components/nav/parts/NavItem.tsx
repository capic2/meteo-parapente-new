import { NavLink, NavLinkProps } from './NavLink';
import { NavButton, NavButtonProps } from './NavButton';

/**
 * The `NavItem` component represents a single, fully accessible navigation item in a `Nav` component, with support for custom elements at the start or the end of the element. It can render a link or a button depending on the provided properties.
 */
const NavItem = ({
  children,
  level = 0,
  prefix,
  suffix,
  onPress,
  href,
  isCurrent,
  activeOptions,
  from,
  isDisabled = false,
  ...dataAttributes
}: NavLinkProps | NavButtonProps) => {
  return (
    <li>
      {href ? (
        <NavLink
          to={href}
          isDisabled={isDisabled}
          prefix={prefix}
          suffix={suffix}
          activeOptions={activeOptions}
          level={level}
          from={from}
          {...dataAttributes}
        >
          {children}
        </NavLink>
      ) : (
        <NavButton
          prefix={prefix}
          suffix={suffix}
          isDisabled={isDisabled}
          onPress={onPress}
          isCurrent={isCurrent}
          level={level}
          {...dataAttributes}
        >
          {children}
        </NavButton>
      )}
    </li>
  );
};

NavItem.displayName = 'NavItem';

export { NavItem };

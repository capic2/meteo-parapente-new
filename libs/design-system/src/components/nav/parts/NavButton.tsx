import { Button, ButtonProps } from 'react-aria-components';
import { navItem, NavItemBaseProps } from './NavItem.variants';
import { PropsWithChildren } from 'react';

export interface NavButtonProps
  extends NavItemBaseProps,
    Omit<ButtonProps, 'children'> {
  isCurrent?: boolean;
  href?: never;
  activeOptions?: never;
  from?: never;
}

const NavButton = ({
  children,
  prefix,
  suffix,
  isDisabled,
  onPress,
  isCurrent = false,
  level,
}: PropsWithChildren<NavButtonProps>) => {
  const {
    base,
    label,
    prefix: prefixStyles,
    suffix: suffixStyles,
  } = navItem({ level, isDisabled });

  return (
    <Button
      className={base()}
      onPress={onPress}
      isDisabled={isDisabled}
      data-level={level}
      data-current={isCurrent}
      //tabIndex={isDisabled ? -1 : undefined}
    >
      {prefix && (
        <span className={prefixStyles()}>{prefix({ isCurrent })}</span>
      )}
      <span className={label()}>{children}</span>
      {suffix && <span className={suffixStyles()}>{suffix}</span>}
    </Button>
  );
};

export { NavButton };

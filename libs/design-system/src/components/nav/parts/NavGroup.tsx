import type { ReactNode } from 'react';
import React, { useCallback, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import type { NavItem } from './NavItem';

import { Button } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { useId } from 'react-aria';
import { navItem } from './NavItem.variants';
import { NavLinkProps } from './NavLink';
import { NavButtonProps } from './NavButton';

const navGroup = tv({
  extend: navItem,
  slots: {
    caret:
      'transition-transform duration-3 delay-1/2 ease-linear motion-reduce:transition-none',
    contentWrapper:
      'transition-[max-height] duration-4 ease-linear motion-reduce:transition-none',
    content:
      'list-none flex flex-col gap-1 transition-opacity duration-3 delay-1/2 ease-linear',
  },
  variants: {
    expanded: {
      true: {
        caret: 'rotate-180',
        contentWrapper: 'max-h-[1000px] overflow-visible',
        label: 'typography-body-strong',
        content: 'opacity-100 visible',
      },
      false: {
        caret: 'rotate-0',
        contentWrapper: 'max-h-0 overflow-hidden',
        content: 'opacity-0 invisible pointer-events-none',
        label: 'typography-body',
      },
    },
  },
});

type NavGroupChildren = React.ReactElement<NavLinkProps | NavButtonProps, typeof NavItem>;

type NavGroupProps = {
  /** The child elements to be rendered inside the NavGroup. They must be `<NavItem>` components. */
  children: NavGroupChildren | NavGroupChildren[];
  /** The label to show for the NavGroup. */
  label: string;
  /** The prefix element to be displayed before the label. It can be any valid React element. */
  prefix?: ({ isExpanded }: { isExpanded: boolean }) => ReactNode;
  /** The suffix element to be displayed after the label.  It can be any valid React element. */
  suffix?: ReactNode;
  /** Whether the NavGroup is currently expanded. Use it to switch the component to a controlled mode. */
  isExpanded?: boolean;
  /** Whether the NavGroup is expanded by default. It only has effect in uncontrolled mode */
  defaultExpanded?: boolean;
  /** Callback function to be called when the NavGroup is expanded or collapsed. */
  onToggle?: (isExpanded: boolean) => void;
};

/**
 * The `NavGroup` component represents a tree of navigation items grouped under a single root element in a `Nav` component. It can be expanded or collapsed to show or hide its children.
 */
export function NavGroup({
  children,
  label,
  prefix,
  suffix,
  defaultExpanded = false,
  isExpanded: controlledIsExpanded,
  onToggle,
  ...dataAttributes
}: NavGroupProps) {
  const id = useId();
  const [uncontrolledIsExpanded, setUncontrolledIsExpanded] =
    useState(defaultExpanded);
  const isControlled = controlledIsExpanded !== undefined;
  const isExpanded = isControlled
    ? controlledIsExpanded
    : uncontrolledIsExpanded;

  const handleToggle = useCallback(() => {
    if (!isControlled) {
      setUncontrolledIsExpanded((prev) => !prev);
    }
    onToggle?.(!isExpanded);
  }, [isControlled, isExpanded, onToggle]);

  const focusableSubitems = React.Children.map(children, (child) => {
    // add isDisabled prop to child element if isExpanded is false
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isDisabled: !isExpanded, level: 1 });
    }
    return child;
  });

  const toggleId = `${id}-toggle`;
  const contentId = `${id}-content`;

  const {
    base,
    prefix: prefixStyles,
    label: labelStyles,
    suffix: suffixStyles,
    content,
    contentWrapper,
    caret,
  } = navGroup({ level: 0, expanded: isExpanded });

  return (
    <li className="flex flex-col gap-1">
      <Button
        id={toggleId}
        className={twMerge(base(), 'w-full')}
        onPress={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        {...dataAttributes}
      >
        {prefix && (
          <span className={prefixStyles()}>{prefix({ isExpanded })}</span>
        )}
        <span className={labelStyles()}>{label}</span>
        <span className={suffixStyles()} role="presentation">
          {suffix}
          <FaCaretDown className={caret()} />
        </span>
      </Button>
      <div
        className={contentWrapper()}
        style={{ maxHeight: isExpanded ? 1000 : 0 }}
      >
        <ul
          id={contentId}
          className={content()}
          aria-labelledby={toggleId}
          aria-hidden={!isExpanded}
        >
          {focusableSubitems}
        </ul>
      </div>
    </li>
  );
}

NavGroup.displayName = 'NavGroup';

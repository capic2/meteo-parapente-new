import type { AriaRole } from 'react';
import { forwardRef } from 'react';

import type {
  IconButtonGhost,
  IconButtonPrimary,
  IconButtonSecondary,
} from './IconButton.variants';
import {
  iconButtonGhost,
  iconButtonPrimary,
  iconButtonSecondary,
} from './IconButton.variants';

import { Button } from 'react-aria-components';

import { Spinner } from '../spinner/Spinner';
import { Tooltip } from '../tooltip/Tooltip';
import { useId } from 'react-aria';
import { IconType } from 'react-icons';

interface IconButtonBaseProps {
  /** Label used to describe the action of the button */
  label: string;
  /** The icon to display inside the button */
  icon: IconType;
  /** The function to trigger when the button is clicked */
  onClick?: () => void;
  /** Override the icon role */
  iconRole?: AriaRole;
  /** className to add to the button */
  className?: string;
}

interface IconButtonVariantsPrimaryProps
  extends IconButtonBaseProps,
    Omit<IconButtonPrimary, 'variant' | 'color'>,
    Required<Pick<IconButtonPrimary, 'variant' | 'color'>> {}

interface IconButtonVariantsSecondaryProps
  extends IconButtonBaseProps,
    Omit<IconButtonSecondary, 'variant' | 'color'>,
    Required<Pick<IconButtonSecondary, 'variant' | 'color'>> {}

interface IconButtonVariantsGhostProps
  extends IconButtonBaseProps,
    Omit<IconButtonGhost, 'variant' | 'color'>,
    Required<Pick<IconButtonGhost, 'variant' | 'color'>> {}

const iconButtonType = ({
  variant,
  color,
  isLoading,
  isDisabled,
}:
  | IconButtonVariantsPrimaryProps
  | IconButtonVariantsSecondaryProps
  | IconButtonVariantsGhostProps) => {
  if (variant === 'primary') {
    return iconButtonPrimary({
      variant,
      color,
      isDisabled,
      isLoading,
    });
  }

  if (variant === 'secondary') {
    return iconButtonSecondary({
      variant,
      color,
      isDisabled,
      isLoading,
    });
  }

  return iconButtonGhost({
    variant,
    color,
    isDisabled,
    isLoading,
  });
};

export const IconButton = forwardRef<
  HTMLButtonElement,
  | IconButtonVariantsPrimaryProps
  | IconButtonVariantsSecondaryProps
  | IconButtonVariantsGhostProps
>(
  (
    props:
      | IconButtonVariantsPrimaryProps
      | IconButtonVariantsSecondaryProps
      | IconButtonVariantsGhostProps,
    ref
  ) => {
    const id = useId();
    const { button, icon: iconClx } = iconButtonType(props);
    const { onClick, icon, isLoading, label, isDisabled, iconRole, ...rest } =
      props;
    const labelId = `icon-button-label-${id}`;
    const Icon = icon;

    return (
      <Tooltip content={label}>
        <Button
          ref={ref}
          data-dd-privacy="allow"
          {...rest}
          className={button({ class: props.className })}
          onPress={onClick}
          isDisabled={isDisabled || isLoading}
          aria-label={label}
        >
          {isLoading ? (
            <Spinner size={20} /* label="Loading"*/ />
          ) : (
            <Icon className={iconClx()}  />
          )}
          <span id={labelId} className="sr-only">
            {label}
          </span>
        </Button>
      </Tooltip>
    );
  }
);

IconButton.displayName = 'IconButton';

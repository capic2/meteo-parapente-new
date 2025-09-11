import { forwardRef } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { Button, ButtonProps } from 'react-aria-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

export const paginationNavButton = tv({
  base: '',
  variants: {
    isDisabled: {
      true: 'cursor-not-allowed text-gray-400',
      false: 'cursor-pointer',
    },
  },
});

export interface PaginationNavButtonProps
  extends VariantProps<typeof paginationNavButton>,
    ButtonProps {
  variant: 'previous' | 'next';
  isDisabled?: boolean;
}

const PaginationNavButton = forwardRef<
  HTMLDivElement,
  PaginationNavButtonProps
>(({ variant, isDisabled, ...rest }, ref) => {
  return (
    <Button
      ref={ref}
      className={paginationNavButton({ isDisabled })}
      isDisabled={isDisabled}
      {...rest}
    >
      {variant === 'previous' ? <VscChevronLeft /> : <VscChevronRight />}
    </Button>
  );
});

PaginationNavButton.displayName = 'PaginationNavButton';

export { PaginationNavButton };

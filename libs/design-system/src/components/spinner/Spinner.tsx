import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { ImSpinner8 } from 'react-icons/im';

export const spinner = tv({
  // add the component styles
  base: 'animate-spin',
  variants: {
    size: {
      20: 'w-5 h-5',
      24: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 20,
  },
});

export interface SpinnerProps extends VariantProps<typeof spinner> {
  size?: 20 | 24;
}

const Spinner = ({ size = 20, ...props }: SpinnerProps) => {
  return <ImSpinner8 className={spinner({ size })} {...props} />;
};

Spinner.displayName = 'Spinner';

export { Spinner };

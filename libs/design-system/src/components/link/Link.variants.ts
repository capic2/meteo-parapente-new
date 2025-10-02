import { tv } from 'tailwind-variants';

export const link = tv({
  slots: {
    base: [
      'uy:rounded-50 uy:underline uy:transition-colors uy:underline-offset-3',
      'uy:disabled:text-content-neutral-disabled',
      'uy:focus-visible:outline-none uy:focus-visible:text-content-neutral-focus uy:focus-visible:ring-2 uy:focus-visible:ring-offset-2 uy:focus-visible:ring-utility-focus-ring',
    ],
    icon: ['uy:inline uy:ml-25'],
  },
  variants: {
    variant: {
      inline: {
        base: 'uy:inline uy:text-(length:inherit) uy:font-medium uy:leading-inherit',
        icon: 'uy:align-top',
      },
      standalone: {
        base: 'uy:flex uy:gap-x-25 uy:items-end',
        icon: 'uy:self-center',
      },
    },
    size: {
      default: { base: 'uy:typography-action' },
      large: { base: 'uy:typography-action-large' },
      small: { base: 'uy:typography-action-small' },
      inherit: { base: 'uy:text-inherit' },
    },
    color: {
      primary: {
        base: 'uy:text-content-primary-enabled uy:hover:text-content-primary-hover uy:active:text-content-primary-active uy:data-[pressed]:text-content-primary-active uy:data-[current]:text-content-primary-active uy:aria-[current]:text-content-primary-active',
      },
      secondary: {
        base: 'uy:text-content-neutral-enabled uy:hover:text-content-neutral-hover uy:active:text-content-neutral-active uy:data-[pressed]:text-content-neutral-pressed uy:data-[current]:text-content-neutral-active uy:aria-[current]:text-content-neutral-active',
      },
      inherit: { base: 'uy:text-(color:inherit)' },
    },
    isDisabled: {
      true: { base: 'uy:data-[disabled]:cursor-not-allowed' },
      false: { base: 'uy:enabled:cursor-pointer' },
    },
    isTruncated: {
      true: { base: 'uy:truncate uy:max-w-[var(--uy-link-max-w)]' },
      false: { base: '' },
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      isDisabled: true,
      class: { base: 'uy:data-[disabled]:text-content-primary-disabled' },
    },
    {
      color: 'secondary',
      isDisabled: true,
      class: {
        base: 'uy:data-[disabled]:text-content-neutral-lowest-disabled',
      },
    },
    {
      color: 'inherit',
      isDisabled: true,
      class: {
        base: 'uy:data-[disabled]:text-content-neutral-lowest-disabled',
      },
    },
  ],
  defaultVariants: {
    variant: 'inline',
    color: 'primary',
    isDisabled: false,
    size: 'inherit',
  },
});

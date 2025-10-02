import { tv, VariantProps } from 'tailwind-variants';

const buttonBase = tv({
  base: [
    'group',
    'cursor-pointer rounded-1 px-4 h-10 inline-flex items-center justify-center whitespace-nowrap typography-action transition-colors',
    'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-utility-focus-ring',
  ],
  variants: {
    isDisabled: {
      true: 'disabled:cursor-not-allowed',
      false: '',
    },
    isLoading: {
      true: 'data-[loading]:cursor-progress data-[loading]:text-content-neutral-disabled',
      false: '',
    },
    size: {
      default: 'w-auto grow-0 basis-auto',
      full: 'grow-1 w-full basis-full',
    },
  },
  defaultVariants: {
    isDisabled: false,
    isLoading: false,
    size: 'default',
  },
});

export const buttonFilled = tv({
  extend: buttonBase,
  variants: {
    color: {
      primary: [
        'bg-surface-primary-enabled text-content-inverted-enabled',
        'hover:bg-surface-primary-hover hover:text-content-inverted-hover',
        'active:bg-surface-primary-active active:text-content-inverted-hover',
        'data-[pressed]:bg-surface-primary-pressed data-[pressed]:text-content-inverted-pressed',
      ],
      warning: [
        'bg-surface-warning-enabled text-content-neutral-enabled',
        'hover:bg-surface-warning-hover hover:text-content-neutral-hover',
        'active:bg-surface-warning-active active:text-content-neutral-active',
        'data-[pressed]:bg-surface-warning-pressed data-[pressed]:text-content-neutral-pressed',
      ],
      danger: [
        'bg-surface-danger-enabled text-content-inverted-enabled',
        'hover:bg-surface-danger-hover hover:text-content-inverted-hover',
        'active:bg-surface-danger-active active:text-content-inverted',
        'data-[pressed]:bg-surface-danger-pressed data-[pressed]:text-content-inverted',
      ],
      inverted: [
        'bg-surface-neutral-enabled text-content-neutral-enabled',
        'hover:bg-surface-neutral-hover hover:text-content-neutral-hover',
        'active:bg-surface-neutral-active active:text-content-neutral-active',
        'data-[pressed]:bg-surface-neutral-active data-[pressed]:text-content-neutral-pressed',
        'focus-visible:outline-utility-inverted-focus-ring focus-visible:text-content-neutral-focus focus-visible:bg-surface-neutral-focus',
      ],
    },
    isDisabled: {
      true: 'disabled:bg-surface-neutral-disabled disabled:text-content-neutral-disabled',
      false: '',
    },
    isLoading: {
      true: 'data-[loading]:bg-surface-neutral-disabled data-[loading]:text-content-neutral-disabled',
      false: '',
    },
  },
});

export const buttonOutlined = tv({
  extend: buttonBase,
  base: 'border border-solid',
  variants: {
    color: {
      primary: [
        'bg-transparent text-content-neutral-enabled border-border-neutral-high-enabled',
        'hover:text-content-neutral-hover hover:border-border-neutral-high-hover',
        'active:text-content-neutral-active active:border-border-neutral-high-pressed',
        'data-[pressed]:text-content-neutral-pressed data-[pressed]:border-border-neutral-high-pressed',
        'focus-visible:border-border-neutral-high-focus focus-visible:text-content-neutral-focus',
      ],
      inverted: [
        'bg-transparent text-content-inverted border-border-inverted-enabled',
        'focus-visible:outline-utility-inverted-focus-ring',
      ],
    },
    isDisabled: {
      true: 'disabled:text-content-neutral-disabled disabled:border-border-neutral-disabled',
      false: '',
    },
    isLoading: {
      true: 'data-[loading]:text-content-neutral-disabled data-[loading]:border-border-neutral-disabled',
    },
  },
});

export const buttonGhost = tv({
  extend: buttonBase,
  variants: {
    color: {
      primary: [
        'bg-transparent text-content-primary-enabled',
        'enabled:hover:bg-surface-primary-lowest-hover enabled:hover:text-content-primary-hover',
        'enabled:active:bg-surface-primary-lowest-active enabled:active:text-content-primary-active',
        'enabled:data-[pressed=true]:bg-surface-primary-lowest-pressed enabled:data-[pressed=true]:text-content-primary-pressed',
        'focus-visible:bg-transparent',
      ],
      warning: [
        'bg-transparent text-content-warning-enabled',
        'enabled:hover:bg-surface-warning-lowest-hover enabled:hover:text-content-warning-hover',
        'enabled:active:bg-surface-warning-lowest-active enabled:active:text-content-warning-active',
        'enabled:data-[pressed=true]:bg-surface-warning-lowest-pressed enabled:data-[pressed=true]:text-content-warning-pressed',
        'focus-visible:bg-transparent',
      ],
      danger: [
        'bg-transparent text-content-danger-enabled',
        'enabled:hover:bg-surface-danger-lowest-hover enabled:hover:text-content-danger-hover',
        'enabled:active:bg-surface-danger-lowest-active enabled:active:text-content-danger-active',
        'enabled:data-[pressed=true]:bg-surface-danger-lowest-pressed enabled:data-[pressed=true]:text-content-danger-pressed',
        'focus-visible:bg-transparent',
      ],
      neutral: [
        'bg-transparent text-content-neutral-enabled',
        'enabled:hover:bg-surface-neutral-hover enabled:hover:text-content-neutral-hover',
        'enabled:active:bg-surface-neutral-active enabled:active:text-content-neutral-active',
        'enabled:data-[pressed=true]:bg-surface-neutral-pressed enabled:data-[pressed=true]:text-content-neutral-pressed',
        'focus-visible:bg-transparent',
      ],
      inverted: [
        'bg-transparent text-content-inverted-enabled',
        'enabled:hover:bg-surface-inverted-hover enabled:hover:text-content-inverted-hover',
        'enabled:active:bg-surface-inverted-active enabled:active:text-content-inverted-active',
        'enabled:data-[pressed=true]:bg-surface-inverted-pressed enabled:data-[pressed=true]:text-content-inverted-pressed',
        'focus-visible:outline-utility-inverted-focus-ring focus-visible:bg-transparent',
      ],
    },
    isDisabled: {
      true: 'disabled:text-content-neutral-disabled disabled:bg-transparent',
      false: '',
    },
    isLoading: {
      true: 'data-[loading]:text-content-neutral-disabled data-[loading]:bg-transparent',
      false: '',
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: 'inverted',
      className: ['disabled:text-content-inverted-disabled'],
    },
    {
      isLoading: true,
      color: 'inverted',
      className: ['data-[loading]:text-content-inverted-disabled'],
    },
  ],
});

export type ButtonBase = VariantProps<typeof buttonBase>;
export type ButtonFilled = VariantProps<typeof buttonFilled>;
export type ButtonOutlined = VariantProps<typeof buttonOutlined>;
export type ButtonGhost = VariantProps<typeof buttonGhost>;

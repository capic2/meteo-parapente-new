import { tv, VariantProps } from 'tailwind-variants';

const iconButtonBase = tv({
  slots: {
    button: [
      'group',
      'w-10 min-w-10 h-10 min-h-10 flex justify-center items-center rounded-75 cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-utility-focus-ring',
    ],
    icon: 'w-5 h-5',
  },
  variants: {
    isDisabled: {
      true: {
        button: 'cursor-not-allowed',
      },
      false: {
        button: '',
      },
    },
    isLoading: {
      true: {
        button: 'cursor-progress text-content-neutral-disabled',
        icon: '',
      },
      false: {
        button: '',
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
    isLoading: false,
  },
});
export const iconButtonPrimary = tv({
  extend: iconButtonBase,
  variants: {
    variant: {
      primary: '',
    },
    color: {
      primary: '',
      danger: '',
      warning: '',
      inverted: 'focus-visible:outline-utility-inverted-focus-ring',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      color: 'primary',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'bg-surface-primary-enabled',
          'hover:bg-surface-primary-hover',
          'active:bg-surface-primary-active',
          'focus-visible:bg-surface-primary-focus',
          'data-[pressed]:bg-surface-primary-pressed',
        ],
        icon: [
          'text-content-inverted-enabled',
          'group-hover:text-content-inverted-hover',
          'active:text-content-inverted-active',
          'focus-visible:text-content-inverted-focus',
          'data-[pressed]:text-content-inverted-pressed',
        ],
      },
    },
    {
      variant: 'primary',
      color: 'danger',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'bg-surface-danger-enabled',
          'hover:bg-surface-danger-hover',
          'active:bg-surface-danger-active',
          'focus:bg-surface-danger-focus',
          'data-[pressed]:bg-surface-danger-pressed',
        ],
        icon: [
          'text-content-inverted-enabled',
          'group-hover:text-content-inverted-hover',
          'active:text-content-inverted-active',
          'focus:text-content-inverted-focus',
          'data-[pressed]:text-content-inverted-pressed',
        ],
      },
    },
    {
      variant: 'primary',
      color: 'warning',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'bg-surface-warning-enabled',
          'hover:bg-surface-warning-hover',
          'active:bg-surface-warning-pressed',
          'focus-visible:bg-surface-warning-focus',
          'data-[pressed]:bg-surface-warning-pressed',
        ],
        icon: [
          'text-content-neutral-enabled',
          'group-hover:text-content-neutral-hover',
          'active:text-content-neutral-pressed',
          'focus-visible:text-content-neutral-focus',
          'data-[pressed]:text-content-neutral-pressed',
        ],
      },
    },
    {
      variant: 'primary',
      color: 'inverted',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'bg-surface-neutral-enabled',
          'hover:bg-surface-neutral-hover',
          'active:bg-surface-neutral-pressed',
          'focus-visible:bg-surface-neutral-focus',
          'data-[pressed]:bg-surface-neutral-pressed',
        ],
        icon: [
          'text-content-neutral-enabled',
          'group-hover:text-content-neutral-hover',
          'active:text-content-neutral-pressed',
          'focus-visible:text-content-neutral-focus',
          'data-[pressed]:text-content-neutral-pressed',
        ],
      },
    },
    {
      variant: 'primary',
      color: 'primary',
      isDisabled: true,
      isLoading: false,
      class: {
        button: 'bg-surface-neutral-disabled',
        icon: 'text-content-neutral-disabled',
      },
    },
    {
      variant: 'primary',
      color: ['primary', 'danger', 'warning', 'inverted'],
      isLoading: true,
      isDisabled: false,
      class: {
        button: 'bg-surface-neutral-disabled',
        icon: 'text-content-neutral-disabled',
      },
    },
  ],
});
export const iconButtonSecondary = tv({
  extend: iconButtonBase,
  variants: {
    variant: {
      secondary: { button: 'focus-visible:outline-offset-4' },
    },
    color: {
      primary: '',
      inverted: 'focus-visible:outline-utility-inverted-focus-ring',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'border border-solid border-border-neutral-high-enabled',
          'hover:border-border-neutral-high-hover',
          'active:border-border-neutral-high-active',
          'data-[pressed]:border-border-neutral-high-pressed',
        ],
        icon: [
          'text-content-neutral-low-enabled',
          'group-hover:text-content-low-neutral-hover',
          'active:text-content-neutral-low-active',
          'data-[pressed]:text-content-neutral-low-pressed',
          'focus-visible:text-content-neutral-low-focus',
        ],
      },
    },
    {
      color: 'primary',
      isLoading: true,
      isDisabled: false,
      class: {
        button: [
          'border border-solid border-border-neutral-disabled',
          'focus-visible:border-border-primary-focus',
        ],
        icon: ['text-content-neutral-disabled'],
      },
    },
    {
      color: 'primary',
      isLoading: false,
      isDisabled: true,
      class: {
        button: [
          'border border-solid border-border-neutral-disabled',
          'focus-visible:border-border-primary-focus',
        ],
        icon: ['text-content-neutral-disabled'],
      },
    },
    {
      color: 'inverted',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'border border-solid border-border-inverted',
          'hover:border-border-inverted-hover',
          'data-[pressed]:border-border-inverted-pressed',
          'active:border-border-inverted-active',
          'focus-visible:border-border-inverted-focus focus-visible:outline-utility-inverted-focus-ring',
        ],
        icon: [
          'text-content-inverted',
          'group-hover:text-content-inverted-hover',
          'data-[pressed]:text-content-inverted-pressed',
          'active:text-content-inverted-active',
          'focus-visible:text-content-inverted-focus',
        ],
      },
    },
    {
      color: 'inverted',
      isLoading: false,
      isDisabled: true,
      class: {
        button: [
          'border border-solid border-border-inverted-disabled',
          'focus-visible:border-border-primary-focus',
        ],
        icon: ['text-content-inverted-disabled'],
      },
    },
  ],
});
export const iconButtonGhost = tv({
  extend: iconButtonBase,
  variants: {
    variant: {
      ghost: '',
    },
    color: {
      neutral: '',
      primary: '',
      danger: '',
      warning: '',
      inverted: '',
    },
  },
  compoundVariants: [
    {
      color: 'inverted',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'bg-transparent',
          'hover:bg-surface-inverted-hover',
          'active:bg-surface-inverted-active',
          'data-[pressed=true]:bg-surface-inverted-pressed',
          'focus-visible:outline-utility-inverted-focus-ring',
          'focus-visible:bg-transparent',
        ],
        icon: [
          'text-content-inverted',
          'group-hover:text-content-inverted-hover',
          'data-[pressed]:text-content-inverted-pressed',
          'active:text-content-inverted-active',
          'focus-visible:text-content-inverted-focus',
        ],
      },
    },
    {
      color: 'neutral',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'hover:bg-surface-neutral-hover',
          'data-[pressed]:bg-surface-neutral-pressed',
          'active:bg-surface-neutral-active',
        ],
        icon: ['text-content-neutral-low'],
      },
    },
    {
      color: 'primary',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'text-content-primary-enabled',
          'hover:bg-surface-primary-lowest-hover',
          'data-[pressed]:bg-surface-primary-lowest-pressed',
          'active:bg-surface-primary-lowest-active',
        ],
        icon: [
          'text-content-primary',
          'group-hover:text-content-primary',
          'data-[pressed]:text-content-primary',
          'focus-visible:text-content-primary',
          'active:text-content-primary',
        ],
      },
    },
    {
      color: 'danger',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'hover:bg-surface-danger-lowest-hover',
          'data-[pressed]:bg-surface-danger-lowest-pressed',
          'active:bg-surface-danger-lowest-active',
        ],
        icon: [
          'text-content-danger',
          'group-hover:text-content-danger',
          'data-[pressed]:text-content-danger',
          'focus-visible:text-content-danger',
          'active:text-content-danger',
        ],
      },
    },
    {
      color: 'warning',
      isDisabled: false,
      isLoading: false,
      class: {
        button: [
          'hover:bg-surface-warning-lowest-hover',
          'data-[pressed]:bg-surface-warning-lowest-pressed',
          'active:bg-surface-warning-lowest-active',
        ],
        icon: [
          'text-content-warning-high',
          'group-hover:text-content-warning-high',
          'data-[pressed]:text-content-warning-high',
          'focus-visible:text-content-warning-high',
          'active:text-content-warning-high',
        ],
      },
    },
    {
      color: ['primary', 'neutral', 'danger', 'warning', 'inverted'],
      isDisabled: true,
      isLoading: false,
      class: {
        button: '',
        icon: 'text-content-neutral-disabled',
      },
    },
    {
      color: ['primary', 'neutral', 'danger', 'warning', 'inverted'],
      isDisabled: false,
      isLoading: true,
      class: {
        button: '',
        icon: 'text-content-neutral-disabled',
      },
    },
  ],
});

export type IconButtonPrimary = VariantProps<typeof iconButtonPrimary>;
export type IconButtonSecondary = VariantProps<typeof iconButtonSecondary>;
export type IconButtonGhost = VariantProps<typeof iconButtonGhost>;

import { tv, type VariantProps } from 'tailwind-variants';
import type { ReactNode } from 'react';

export const navItem = tv({
  slots: {
    base: [
      'group grid w-full grid-cols-[auto_1fr_auto] items-center py-2 px-3 gap-2 rounded-2 outline-0 transition-all cursor-pointer',
      'hover:bg-gray-100 active:bg-gray-100 data-[pressed]:bg-gray-200',
      'focus:outline-0 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-utility-focus-ring data-[focus-visible]:ring-offset-2',
      'data-[current=true]:bg-gray-100',
    ],
    prefix: ['p-1 empty:hidden text-content-neutral-low', 'data-[current=true]:text-content-neutral'],
    suffix:
      'flex gap-2 items-center text-content-neutral-low justify-self-end text-right empty:hidden',
    label: [
      'flex-1 basis-full text-left truncate overflow-hidden whitespace-break-spaces typography-body text-content-neutral',
      'data-[current=true]:typography-body-strong',
    ],
  },
  variants: {
    level: {
      0: 'pl-3',
      1: 'pl-6',
    },
    isDisabled: {
      true: {
        base: 'pointer-events-none',
        label: 'text-content-neutral-disabled',
      },
      false: '',
    },
  },
});


export interface NavItemBaseProps extends Pick<VariantProps<typeof navItem>, 'level'> {
  /** The prefix element to be displayed before the label. */
  prefix?: ({ isCurrent }: { isCurrent: boolean }) => ReactNode;
  /** The suffix element to be displayed after the label. */
  suffix?: ReactNode;
  /** Whether the nav item is disabled. */
  isDisabled?: boolean;
  children: ReactNode;
}

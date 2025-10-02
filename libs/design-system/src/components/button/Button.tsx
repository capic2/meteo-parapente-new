import { forwardRef, ReactNode, useMemo } from 'react';

import type { PropsWithChildren } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'

import type {
  ButtonBase,
  ButtonFilled,
  ButtonGhost,
  ButtonOutlined,
} from './Button.variants'

import { Button as AriaButton } from 'react-aria-components'

import { Spinner } from '../spinner/Spinner'
import { buttonFilled, buttonGhost, buttonOutlined } from './Button.variants'
import { twMerge } from 'tailwind-merge';

type UnityButtonProps = AriaButtonProps &
  ButtonBase & {
  /**
   * The button's appearance. It can be one of the following: 'primary', 'secondary', 'ghost'.
   * @default 'primary'
   */
  variant: 'primary' | 'secondary' | 'ghost'
  /**
   * The button size. It can be full size or default size (min-content).
   * @default 'default'
   */
  size?: ButtonBase['size']
  /**
   * The button's color. It can be one of the following: 'primary', 'inverted'.
   * @default 'primary'
   */
  color?:
    | ButtonFilled['color']
    | ButtonOutlined['color']
    | ButtonGhost['color']
  /**
   * The button's prefix icon. It has to be one of the icons from the Unity Icons package.
   */
  prefixIcon?: ReactNode
  /**
   * The loading state of the button.
   * @default false
   */
  isLoading?: boolean
}

type UnionButtonProps =
  | (UnityButtonProps & { variant: 'primary' } & ButtonFilled)
  | (UnityButtonProps & { variant: 'secondary' } & ButtonOutlined)
  | (UnityButtonProps & { variant: 'ghost' } & ButtonGhost)

export type ButtonProps = PropsWithChildren<Omit<UnionButtonProps, 'style'>>

const renderIcon = (isLoading: boolean, icon?: ReactNode) => {
  if (isLoading) {
    return <Spinner size={20} />
  }
  return icon ?? null
}

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      children,
      color = 'primary',
      size = 'default',
      isDisabled = false,
      isLoading = false,
      prefixIcon = undefined,
      ...rest
    },
    ref,
  ) => {
    const clsx = useMemo(() => {
      const baseVariants = { size, isDisabled, isLoading }
      switch (variant) {
        case 'primary': {
          const variants = {
            ...baseVariants,
            color: color as ButtonFilled['color'],
          }
          return twMerge(buttonFilled(variants))
        }
        case 'secondary': {
          const variants = {
            ...baseVariants,
            color: color as ButtonOutlined['color'],
          }
          return twMerge(buttonOutlined(variants))
        }
        case 'ghost': {
          const variants = {
            ...baseVariants,
            color: color as ButtonGhost['color'],
          }
          return twMerge(buttonGhost(variants))
        }
      }
    }, [variant, color, size, isDisabled, isLoading])

    const dataAttrs = {
      ...(isLoading && { 'data-loading': isLoading }),
    }

    return (
      <AriaButton
        data-dd-privacy="allow"
        {...rest}
        ref={ref}
        isDisabled={isDisabled || isLoading}
        className={clsx}
        {...dataAttrs}
      >
        <span className="uy:inline-flex uy:gap-50 uy:leading-[1.75] uy:items-center">
          {renderIcon(isLoading, prefixIcon)}
          {children}
        </span>
      </AriaButton>
    )
  },
)

Button.displayName = 'Button'

export { Button }

import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

import { link } from './Link.variants';
import { isExternalUrl } from './utils';
import { VariantProps } from 'tailwind-variants';
import { createLink } from '@tanstack/react-router';

export type LinkProps = Omit<AriaLinkProps, 'style' | 'className'> & {
  /**
   * The URL the link navigates to.
   */
  href: HTMLAnchorElement['href'];

  /**
   * The link id
   */
  id?: HTMLAttributes<HTMLLinkElement>['id'];

  /**
   * The link's size.
   * @default 'inherit'
   */
  size?: VariantProps<typeof link>['size'];
  /**
   * The link's display variant. Links can be inline with text or standalone (block).
   * @default 'inline'
   */
  variant?: VariantProps<typeof link>['variant'];

  /**
   * The link's color.
   * @default 'primary'
   */
  color?: VariantProps<typeof link>['color'];

  /**
   * Whether the link navigates to an external page. If true, the link will open in a new tab and display an indicator icon.
   * @default false
   */
  isExternal?: boolean;

  maxCharactersTruncation?: number;
};

/**
 * Links allow users to navigate to different pages or sections.
 */
const Link = forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(
  (
    {
      href,
      children,
      variant = 'inline',
      color = 'primary',
      isDisabled = false,
      isExternal: isExternalProp,
      maxCharactersTruncation,
      size = 'inherit',
      ...rest
    },
    ref
  ) => {
    const TSLink = createLink(Link);
    const isExternal = isExternalProp ?? isExternalUrl(href);

    const { base, icon } = link({
      variant,
      color,
      isDisabled,
      size,
      isTruncated: !!maxCharactersTruncation,
    });
    const isTruncated = !!maxCharactersTruncation;

    return (
      <TSLink
        data-dd-privacy="allow"
        {...rest}
        href={href}
        ref={ref}
        style={
          isTruncated
            ? ({
                '--uy-link-max-w': `${maxCharactersTruncation}ch`,
              } as CSSProperties)
            : {}
        }
        className={base()}
        isDisabled={isDisabled}
        target={isExternal ? '_blank' : rest.target}
        rel={isExternal && !rest.rel ? 'noopener noreferrer' : rest.rel}
        activeProps={{
          'aria-current': 'page',
        }}
      >
        {children}
        {isExternal && <LuSquareArrowOutUpRight className={icon()} />}
      </TSLink>
    );
  }
);

Link.displayName = 'Link';

export { Link };

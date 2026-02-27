import preview from '../../../../.storybook/preview';

import { PaginationNavButton } from './PaginationNavButton';

/**
 * Meta data for the `PaginationNavButton` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta = preview.meta({
  component: PaginationNavButton,
  title: 'Navigation/Pagination/PaginationNavButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

/**
 * Default story for the `PaginationNavButton` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default = meta.story({
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    // complete the args!
  },
});

export const Previous = meta.story({
  args: {
    variant: 'previous',
  },
});

export const Next = meta.story({
  args: {
    variant: 'next',
  },
});

export const Disabled = meta.story({
  args: {
    variant: 'previous',
    isDisabled: true,
  },
});

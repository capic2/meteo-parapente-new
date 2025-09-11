import type { Meta, StoryObj } from '@storybook/react';

import { PaginationNavButton } from './PaginationNavButton';

/**
 * Meta data for the `PaginationNavButton` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof PaginationNavButton> = {
  component: PaginationNavButton,
  title: 'Navigation/Pagination/PaginationNavButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PaginationNavButton>;

/**
 * Default story for the `PaginationNavButton` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default: Story = {
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    // complete the args!
  },
};

export const Previous: Story = {
  args: {
    variant: 'previous',
  },
};

export const Next: Story = {
  args: {
    variant: 'next',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'previous',
    isDisabled: true,
  },
};

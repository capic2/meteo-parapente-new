import type { Meta, StoryObj } from '@storybook/react';

import { PaginationLink } from './PaginationLink';

/**
 * Meta data for the `PaginationLink` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof PaginationLink> = {
  component: PaginationLink,
  title: 'Navigation/Pagination/PaginationLink',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PaginationLink>;

/**
 * Default story for the `PaginationLink` component.
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

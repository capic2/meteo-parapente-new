import type { Meta, StoryObj } from '@storybook/react';

import { AppMenuContent } from './AppMenuContent';

/**
 * Meta data for the `AppMenuContent` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof AppMenuContent> = {
  component: AppMenuContent,
  title: 'AppMenuContent',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppMenuContent>;

/**
 * Default story for the `AppMenuContent` component.
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

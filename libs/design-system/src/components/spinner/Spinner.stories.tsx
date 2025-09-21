import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

/**
 * Meta data for the `Spinner` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Spinner',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

/**
 * Default story for the `Spinner` component.
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

export const Size20: Story = {
  args: {
    size: 20,
  },
};

export const Size24: Story = {
  args: {
    size: 24,
  },
};

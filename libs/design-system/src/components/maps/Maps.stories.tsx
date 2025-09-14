import type { Meta, StoryObj } from '@storybook/react';

import { Maps } from './Maps';

/**
 * Meta data for the `Maps` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof Maps> = {
  component: Maps,
  title: 'Maps',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    latitude: 46.971161,
    longitude: 5.885981,
  },
};

export default meta;

type Story = StoryObj<typeof Maps>;

/**
 * Default story for the `Maps` component.
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

export const WithClick: Story = {
  args: {
    latitude: 46.971161,
    longitude: 5.885981,
  },
  render: function Render(args) {
    const handleClick = (event: LeafletMouseEvent) => {
      alert([event.latlng.lat, event.latlng.lng]);
    };

    return <Maps {...args} click={handleClick} />;
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

/**
 * Meta data for the `Pagination` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Navigation/Pagination',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/**
 * Default story for the `Pagination` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default: Story = {
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    pagesList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    currentPage: '5',
  },
};

export const Simple: Story = {
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    pagesList: ['20/04/1982', '21/04/1982', '22/04/1982', '23/04/1982', '24/04/1982'],
    currentPage: '20/04/1982',
    mode: 'simple',
  },
};

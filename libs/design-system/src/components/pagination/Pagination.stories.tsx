import preview from '../../../.storybook/preview';

import { Pagination } from './Pagination';

/**
 * Meta data for the `Pagination` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta = preview.meta({
  component: Pagination,
  title: 'Navigation/Pagination',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

/**
 * Default story for the `Pagination` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default = meta.story({
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    pagesList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    currentPage: '5',
  },
});

export const Simple = meta.story({
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    pagesList: [
      '20/04/1982',
      '21/04/1982',
      '22/04/1982',
      '23/04/1982',
      '24/04/1982',
    ],
    currentPage: '20/04/1982',
    mode: 'simple',
  },
});

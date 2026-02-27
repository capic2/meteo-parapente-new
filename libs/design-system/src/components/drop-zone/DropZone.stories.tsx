import preview from '../../../.storybook/preview';

import { DropZone } from './DropZone';

/**
 * Meta data for the `DropZone` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta = preview.meta({
  component: DropZone,
  title: 'DropZone',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

/**
 * Default story for the `DropZone` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default = meta.story({
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: 'Déposer le fichier',
  },
});

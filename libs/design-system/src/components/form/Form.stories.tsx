import preview from '../../../.storybook/preview';

import { Form } from './Form';

/**
 * Meta data for the `Form` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta = preview.meta({
  component: Form,
  title: 'Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});

/**
 * Default story for the `Form` component.
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

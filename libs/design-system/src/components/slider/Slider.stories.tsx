import preview from '../../../.storybook/preview';

import { Slider } from './Slider';

/**
 * Meta data for the `Slider` component.
 * This comment will show up as the main opening paragraph in Storybook's Autodocs.
 */
const meta = preview.meta({
  component: Slider,
  title: 'Slider',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-3">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
});

/**
 * Default story for the `Slider` component.
 * This comment will show up as the story's description in Storybook's Autodocs.
 */
export const Default = meta.story({
  parameters: {
    actions: { disable: true },
    chromatic: { disableSnapshot: true },
  },
  args: {
    minValue: 0,
    maxValue: 10,
  },
});

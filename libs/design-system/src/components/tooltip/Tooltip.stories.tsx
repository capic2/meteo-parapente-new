import preview from '../../../.storybook/preview';
import { Tooltip } from './Tooltip';

const meta = preview.meta({
  component: Tooltip,
  title: 'Tooltip',
  parameters: {
    layout: 'centered',
  },
});

export const Default = meta.story({
  args: {
    content: <>Tooltip</>,
    children: <>I am a button</>,
  },
});

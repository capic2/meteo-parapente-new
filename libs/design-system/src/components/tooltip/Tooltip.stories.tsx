import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta = {
  component: Tooltip,
  title: 'Tooltip',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: <>Tooltip</>,
    children: <>I am a button</>,
  },
};

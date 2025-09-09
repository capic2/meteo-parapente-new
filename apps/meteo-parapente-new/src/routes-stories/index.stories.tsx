import { Index } from '../routes';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { http } from 'msw';

const meta = {
  component: Index,
  title: 'App',
} satisfies Meta<typeof Index>;
export default meta;

type Story = StoryObj<typeof Index>;

export const Primary: Story = {};

export const NoData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:3000/meteo`, () => {
          return new Response(null, { status: 204 });
        }),
      ],
    },
  },
};

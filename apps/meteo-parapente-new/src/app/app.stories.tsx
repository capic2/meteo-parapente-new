import App from './app';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { http } from 'msw';

const meta = {
  component: App,
  title: 'App',
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof App>;

export const Primary: Story = {};

export const NoData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/meteo', () => {
          return new Response(null, { status: 204 });
        }),
      ],
    },
  },
};

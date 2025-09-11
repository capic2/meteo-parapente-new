import { Index } from '../routes';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';

const meta = {
  component: Index,
  title: 'App',
  parameters: {
    router: {
      initialEntries: ['/?startDate=20250910'],
      initialIndex: 0,
    },
    date: new Date(2025,8,10),
  },
} satisfies Meta<typeof Index>;
export default meta;

type Story = StoryObj<typeof Index>;

export const Primary: Story = {};

export const NoData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:3000/meteo`, () => {
          return HttpResponse.json({}, { status: 200 });
        }),
      ],
    },
  }
};

import { Index } from '../routes';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { delay, http, HttpResponse } from 'msw';
import structureJson from '../../mocks/structure.json' with { type: 'json' };
import meteoJson from '../../mocks/meteo.json' with { type: 'json' };

const meta = {
  component: Index,
  title: 'App',
  parameters: {
    router: {
      initialEntries: ['/?startDate="20250910"&lat=46.971161&lon=5.885981'],
      initialIndex: 0,
    },
    date: new Date(2025,8,10),
  },
} satisfies Meta<typeof Index>;
export default meta;

type Story = StoryObj<typeof Index>;

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:3000/structure`, () => {
          return HttpResponse.json(structureJson);
        }),
        http.get(`http://localhost:3000/meteo`, () => {
          return HttpResponse.json(meteoJson);
        }),
      ],
    },
  }
};

export const NoData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:3000/meteo`, () => {
          return HttpResponse.json(null, { status: 400 });
        }),
      ],
    },
  }
};

export const DataLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:3000/meteo`, async() => {
          await delay('infinite');
          return new Response()
        }),
      ],
    },
  }
};

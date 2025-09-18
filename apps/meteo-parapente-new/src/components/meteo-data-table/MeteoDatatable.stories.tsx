import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeteoDataTable } from './MeteoDataTable';

const meta = {
  component: MeteoDataTable,
  title: 'MeteoDataTable',
  args: {
    structure: {
      hourRanges: ['09-12', '12-16', '16-19'],
      properties: [
        {
          id: 'wind',
          label: 'app.meteo.wind',
          properties: [
            {
              id: 'direction',
              label: 'app.meteo.meteo-blue.wind.direction',
            },
            {
              id: 'speed',
              label: 'app.meteo.meteo-blue.wind.speed',
            },
            {
              id: 'gust',
              label: 'app.meteo.meteo-blue.wind.gust',
            },
          ],
        },
        {
          id: 'rain',
          label: 'app.meteo.rain',
        },
        {
          id: 'clouds',
          label: 'app.meteo.clouds',
        },
        {
          id: 'temperature',
          label: 'app.meteo.temperature',
        },
      ],
    },
  }
} satisfies Meta<typeof MeteoDataTable>;
export default meta;

type Story = StoryObj<typeof MeteoDataTable>;

export const Primary: Story = {};

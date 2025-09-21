import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeteoDataTable } from './MeteoDataTable';
import structureJson from '../../../mocks/structure.json' with { type: 'json' };
import meteoJson from '../../../mocks/meteo.json' with { type: 'json' };

const meta = {
  component: MeteoDataTable,
  title: 'MeteoDataTable',
  args: {
    structure: structureJson,
    meteoResponse: meteoJson,
  }
} satisfies Meta<typeof MeteoDataTable>;
export default meta;

type Story = StoryObj<typeof MeteoDataTable>;

export const Primary: Story = {};

export const WithLoading: Story = {
  args: {
    structure: structureJson,
    meteoResponse: undefined,
    isLoading: true,
  },
};

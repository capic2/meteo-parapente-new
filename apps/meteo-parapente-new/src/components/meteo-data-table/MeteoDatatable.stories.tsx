import preview from '../../../.storybook/preview';
import { MeteoDataTable } from './MeteoDataTable';
import structureJson from '../../../mocks/structure.json' with { type: 'json' };
import meteoJson from '../../../mocks/meteo.json' with { type: 'json' };

const meta = preview.meta({
  component: MeteoDataTable,
  title: 'Components/MeteoDataTable',
  args: {
    structure: structureJson,
    meteoResponse: meteoJson,
  },
});

export const Primary = meta.story();

export const WithLoading = meta.story({
  args: {
    structure: structureJson,
    meteoResponse: undefined,
    isLoading: true,
  },
});

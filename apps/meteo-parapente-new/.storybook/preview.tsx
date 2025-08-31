import { initialize, mswLoader } from 'storybook-msw-addon';
import { http, HttpResponse } from 'msw';
import { Preview } from '@storybook/react-vite';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { meteo } from '../mocks/meteo.ts';
import '../src/styles.css';
import { IntlProvider } from 'react-intl';
import fr from '../i18n/fr-FR.json';

void initialize();

const preview: Preview = {
  parameters: {
    msw: {
      handlers: [
        http.get('/meteo', () => {
          return HttpResponse.json(meteo);
        }),
      ],
    },
  },
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={new QueryClient()}>
          <IntlProvider locale="fr-FR" messages={fr}>
            <Story />
          </IntlProvider>
        </QueryClientProvider>
      );
    },
  ],
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;

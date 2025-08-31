import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import fr from '../i18n/fr-FR.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <IntlProvider locale="fr-FR" messages={fr}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IntlProvider>
    </QueryClientProvider>
  </StrictMode>
);

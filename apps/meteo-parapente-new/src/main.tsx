import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import fr from '../i18n/fr-FR.json';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const queryClient = new QueryClient();
// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (!import.meta.env.API_URL) {
  alert(
    'The API_URL environment variable is not set. Please set it to the URL of your API.'
  );
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="fr-FR" messages={fr}>
        <RouterProvider router={router} />
      </IntlProvider>
    </QueryClientProvider>
  </StrictMode>
);

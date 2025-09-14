import { initialize, mswLoader } from 'storybook-msw-addon';
import { http, HttpResponse } from 'msw';
import { Preview, StoryContext } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import meteoJsonMock from '../mocks/meteo.json' with { type: 'json' };
import '../src/styles.css';
import { IntlProvider } from 'react-intl';
import dsFr from '@meteo-parapente-new/design-system/i18n/fr-FR.json';
import fr from '../i18n/fr-FR.json';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  ErrorComponent,
  Outlet,
  RouterProvider
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

void initialize();

interface RouterDecoratorContext extends StoryContext {
  parameters: {
    router?: {
      initialEntries?: string[];
      initialIndex?: number;
      routes?: string[];
    };
  };
}

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:3000/meteo`, () => {
          return HttpResponse.json(meteoJsonMock);
        }),
      ],
    },
  },
  decorators: [
    mockDateDecorator,
    (Story, { parameters }: RouterDecoratorContext) => {
      const {
        initialEntries = ['/'],
        initialIndex = 0,
        routes = ['/'],
      } = parameters?.router || {};
      const rootRoute = createRootRoute({
        errorComponent: ErrorComponent,
        component: () => (
          <>
            <Outlet />
            <TanStackRouterDevtools />
          </>
        ),
      });
      rootRoute.addChildren(
        routes.map((path) =>
          createRoute({
            path,
            getParentRoute: () => rootRoute,
            component: Story,
          })
        )
      );

      const router = createRouter({
        history: createMemoryHistory({ initialEntries, initialIndex }),
        routeTree: rootRoute,
        context: {
          queryClient,
        },
      });

      return <RouterProvider router={router} />;
    },
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <IntlProvider locale="fr-FR" messages={{...fr, ...dsFr}}>
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

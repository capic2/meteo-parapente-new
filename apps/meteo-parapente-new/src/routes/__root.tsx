import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { formatDateYYYYMMDD } from '../utils/misc';

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link
        to="/"
        search={{ startDate: formatDateYYYYMMDD(new Date()) }}
        className="[&.active]:font-bold"
      >
        Meteo
      </Link>{' '}
      <Link to="/settings" className="[&.active]:font-bold">
        Settings
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({ component: RootLayout });

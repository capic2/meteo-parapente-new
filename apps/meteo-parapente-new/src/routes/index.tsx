import { createFileRoute, redirect } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meteoSchema } from '@meteo-parapente-new/common-types';
import { FormattedDate } from 'react-intl';
import { MeteoDataTable } from '../components/meteo-data-table/MeteoDataTable';
import ky from 'ky';
import { z } from 'zod';
import { formatDateYYYYMMDD } from '../utils/misc';

const meteoOptions = (startDate: string) =>
  queryOptions({
    queryKey: ['meteo'],
    queryFn: async () => {
      const response = await ky.get(
        `${
          import.meta.env.VITE_API_URL
        }/meteo?startDate=${startDate}&lat=46.971161&lon=5.885981`
      );
      const json = await response.json();

      return meteoSchema.safeParse(json);
    },
    retry: false,
  });

export const Route = createFileRoute('/')({
  loaderDeps: ({ search: { startDate } }) => ({ startDate }),
  loader: ({ context, deps }) => {
    if (!deps.startDate) {
      return redirect({
        to: '/',
        search: { startDate: formatDateYYYYMMDD(new Date()) },
      });
    }

    return context.queryClient.ensureQueryData(meteoOptions(deps.startDate));
  },
  component: Index,
  validateSearch: z.object({
    startDate: z.string().regex(/^\d{4}\d{2}\d{2}$/).optional(),
  }),
});

export function Index() {
  const startDate = Route.useSearch().startDate;
  const { data } = useSuspenseQuery(meteoOptions(startDate));

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        Bad response
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex h-screen items-center justify-center">
        {data.error.message}
      </div>
    );
  }

  if (!data.data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">
        <FormattedDate value={new Date()} />
      </h1>
      <MeteoDataTable meteoResponse={data.data} />
    </div>
  );
}

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meteoSchema } from '@meteo-parapente-new/common-types';
import { FormattedDate } from 'react-intl';
import { MeteoDataTable } from '../components/meteo-data-table/MeteoDataTable';
import ky from 'ky';
import { z } from 'zod';
import { formatDateYYYYMMDD, formatedDateToDate } from '../utils/misc';
import { Pagination } from '@meteo-parapente-new/design-system';

const meteoOptions = (startDate: string | undefined) =>
  queryOptions({
    queryKey: ['meteo'],
    queryFn: async () => {
      if (!startDate) {
        throw new Error('startDate is required');
      }

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
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(meteoOptions(deps.startDate)),
  component: Index,
  validateSearch: z.object({
    startDate: z
      .string()
      .regex(/^\d{4}\d{2}\d{2}$/)
      .optional()
      .default(formatDateYYYYMMDD(new Date())),
  }),
});

export function Index() {
  const startDate = Route.useSearch().startDate;
  const { data } = useSuspenseQuery(meteoOptions(startDate));
  const navigate = useNavigate();

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

  const listDates = Array.from({ length: 10 }, (_, i) =>
    formatDateYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + i)))
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">
        <Pagination
          currentPage={startDate}
          pagesList={listDates}
          mode="simple"
          renderValue={(value) => (
            <FormattedDate value={formatedDateToDate(value)} />
          )}
          onNextPress={() =>
            navigate({
              to: `/?startDate="${listDates.at(
                listDates.findIndex((date) => date === startDate) + 1
              )}"`,
            })
          }
          onPreviousPress={() =>
            navigate({
              to: `/?startDate="${listDates.at(
                listDates.findIndex((date) => date === startDate) - 1
              )}"`,
            })
          }
        />
      </h1>
      <MeteoDataTable meteoResponse={data.data} />
    </div>
  );
}

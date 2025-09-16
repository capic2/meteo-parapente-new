import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { meteoSchema } from '@meteo-parapente-new/common-types';
import { FormattedDate } from 'react-intl';
import { MeteoDataTable } from '../components/meteo-data-table/MeteoDataTable';
import ky from 'ky';
import { z } from 'zod';
import { formatDateYYYYMMDD, formatedDateToDate } from '../utils/misc';
import {
  Coordinates,
  Maps,
  Pagination,
} from '@meteo-parapente-new/design-system';

const meteoOptions = (startDate: string, lat: number, lon: number) =>
  queryOptions({
    queryKey: ['meteo', startDate, lat, lon],
    queryFn: async () => {
      const response = await ky.get(
        `${
          import.meta.env.VITE_API_URL
        }/meteo?startDate=${startDate}&lat=${lat}&lon=${lon}`
      );
      const json = await response.json();

      return meteoSchema.safeParse(json);
    },
    retry: false,
  });

export const Route = createFileRoute('/')({
  loaderDeps: ({ search: { startDate, lat, lon } }) => ({
    startDate,
    lat,
    lon,
  }),
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(
      meteoOptions(deps.startDate, deps.lat, deps.lon)
    ),
  component: Index,
  validateSearch: z.object({
    startDate: z
      .string()
      .regex(/^\d{4}\d{2}\d{2}$/)
      .optional()
      .default(formatDateYYYYMMDD(new Date())),
    lat: z.number().optional().default(46.971161),
    lon: z.number().optional().default(5.885981),
  }),
});

export function Index() {
  const { startDate, lat, lon } = Route.useSearch();
  const { data, isFetching } = useQuery(meteoOptions(startDate, lat, lon));
  const navigate = useNavigate();

  if (!isFetching && data?.error) {
    return (
      <div className="flex h-screen items-center justify-center">
        {data.error.message}
      </div>
    );
  }

  if (!isFetching && !data?.data) {
    return <div>No data</div>;
  }

  const listDates = Array.from({ length: 10 }, (_, i) =>
    formatDateYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + i)))
  );

  const onCoordinatesChange = ({ lat, lon }: Coordinates) => {
    void navigate({
      to: '/',
      search: {
        startDate,
        lat,
        lon,
      },
    });
  };

  return (
    <div className="flex flex-col gap-10">
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
              to: '/',
              search: {
                startDate: listDates.at(
                  listDates.findIndex((date) => date === startDate) + 1
                ),
                lat,
                lon,
              },
            })
          }
          onPreviousPress={() =>
            navigate({
              to: '/',
              search: {
                startDate: listDates.at(
                  listDates.findIndex((date) => date === startDate) - 1
                ),
                lat,
                lon,
              },
            })
          }
        />
      </h1>
      <MeteoDataTable meteoResponse={data?.data} isLoading={isFetching} />
      <Maps
        className="h-[500px]"
        latitude={lat}
        longitude={lon}
        onCoordinatesChange={onCoordinatesChange}
      />
    </div>
  );
}

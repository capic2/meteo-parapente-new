import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  dataMeteoQueryInputSchema,
  meteoSchema,
  structureMeteoResponseSchema,
} from '@meteo-parapente-new/common-types';
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

const meteoStructureOptions = () =>
  queryOptions({
    queryKey: ['structure'],
    queryFn: async () => {
      const response = await ky.get(
        `${import.meta.env.VITE_API_URL}/structure`
      );
      const json = await response.json();

      return structureMeteoResponseSchema.safeParse(json);
    },
    retry: false,
  });

const meteoOptions = (
  startDate: string,
  lat: number,
  lon: number,
  hourRanges?: string[],
  propertyIds?: string[]
) => {
  return queryOptions({
    queryKey: ['meteo', startDate, lat, lon, hourRanges, propertyIds],
    queryFn: async () => {
      const searchParams = dataMeteoQueryInputSchema.safeParse({
        startDate,
        lat,
        lon,
        hourRanges,
        propertyIds,
      });

      if (searchParams.error) {
        throw searchParams.error;
      }

      const response = await ky.get(`${import.meta.env.VITE_API_URL}/meteo`, {
        searchParams: searchParams.success && searchParams.data,
      });
      const json = await response.json();
      return meteoSchema.safeParse(json);
    },
    enabled: Boolean(hourRanges && propertyIds),
    retry: false,
  });
};

export const Route = createFileRoute('/')({
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(meteoStructureOptions()),
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
  const { data: structureData } = useSuspenseQuery(meteoStructureOptions());
  const { data: meteoData, isFetching } = useQuery(
    meteoOptions(
      startDate,
      lat,
      lon,
      structureData?.data?.hourRanges,
      structureData?.data?.properties.map((property) => property.id)
    )
  );
  const navigate = useNavigate();

  if (structureData?.error) {
    return (
      <div className="flex h-screen items-center justify-center">
        {structureData.error.message}
      </div>
    );
  }

  if (!structureData?.data) {
    return <div>No data</div>;
  }

  if (meteoData?.error) {
    return (
      <div className="flex h-screen items-center justify-center">
        {meteoData.error.message}
      </div>
    );
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
      <MeteoDataTable
        structure={structureData.data}
        meteoResponse={meteoData?.data}
        isLoading={isFetching}
      />
      <Maps
        className="h-[500px]"
        latitude={lat}
        longitude={lon}
        onCoordinatesChange={onCoordinatesChange}
      />
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { formatDateYYYYMMDD } from '../utils/misc';
import { meteoSchema } from '@meteo-parapente-new/common-types';
import { FormattedDate } from 'react-intl';
import { MeteoDataTable } from '../components/meteo-data-table/MeteoDataTable';
import ky from 'ky';

const meteoOptions = queryOptions({
  queryKey: ['meteo'],
  queryFn: async () => {
    const response = await ky.get(
      `${import.meta.env.VITE_API_URL}/meteo?startDate=${formatDateYYYYMMDD(
        new Date()
      )}&lat=46.971161&lon=5.885981`
    );
    const json = await response.json();

    return meteoSchema.safeParse(json);
  },
  retry: false,
});

export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(meteoOptions),
  component: Index,
});

function Index() {
  const { data  } = useSuspenseQuery(meteoOptions);

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

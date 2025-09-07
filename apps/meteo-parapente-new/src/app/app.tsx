import { queryOptions, useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { MeteoDataTable } from '../components/meteo-data-table/MeteoDataTable';
import { meteoSchema } from '@meteo-parapente-new/common-types';
import { FormattedDate } from 'react-intl';
import { formatDateYYYYMMDD } from '../utils/misc';

const meteoOptions = () => {
  return queryOptions({
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
};

export function App() {
  const { data } = useQuery(meteoOptions());

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

export default App;

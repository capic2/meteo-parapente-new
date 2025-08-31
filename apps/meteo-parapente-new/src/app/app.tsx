import { queryOptions, useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { z } from 'zod';
import { meteoSchema } from '../types/schemas.ts';
import { MeteoDataTable } from '../components/meteo-data-table/MeteoDataTable.tsx';

const meteoOptions = () => {
  return queryOptions({
    queryKey: ['meteo'],
    queryFn: async () => {
      const response = await ky.get('/meteo');
      return z.safeParse(meteoSchema, await response.json());
    },
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

  return <MeteoDataTable meteoResponse={data.data} />;
}

export default App;

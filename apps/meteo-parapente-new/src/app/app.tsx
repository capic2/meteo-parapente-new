import {
  DataTable,
  DataTableBody,
  DataTableColumn,
  DataTableHeader,
} from '@meteo-parapente-new/design-system';
import { queryOptions, useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { z } from 'zod';

const meteoSchema = z.record(
  z.string().regex(/[0-9]{2} - [0-9]{2}/),
  z.object({ meteoBlue: z.object({}), meteoParapente: z.object({}) })
);

const meteoOptions = () => {
  return queryOptions({
    queryKey: ['meteo'],
    queryFn: async () => {
      const response = await ky.get('/meteo');
      return z.parse(meteoSchema, await response.json());
    },
  });
};

export function App() {
  const { data } = useQuery(meteoOptions());

  if (!data) {
    return <div className="flex h-screen items-center justify-center">No data...</div>;
  }

  return (
    <DataTable>
      <DataTableHeader>
        {Object.keys(data).map((range) => (
          <DataTableColumn>{range}</DataTableColumn>
        ))}
      </DataTableHeader>
      <DataTableBody>

      </DataTableBody>
    </DataTable>
  );
}

export default App;

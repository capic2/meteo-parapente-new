import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import ky from 'ky';
import { settingsResponseSchema} from '@meteo-parapente-new/common-types';

const settingsOptions = () =>
  queryOptions({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await ky.get(
        `${import.meta.env.VITE_API_URL}/settings`
      );
      const json = await response.json();

      return settingsResponseSchema.safeParse(json);
    },
    retry: false,
  });

export const Route = createFileRoute('/settings')({
  component: Settings,
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(settingsOptions()),
});

function Settings() {
  const { data: settingsData } = useSuspenseQuery(settingsOptions());



  return <div className="p-2">{JSON.stringify(settingsData)}</div>;
}

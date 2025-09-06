import { MeteoDataType } from '@meteo-parapente-new/common-types';

export type MeteoProperty = Record<string, MeteoDataType>;

export type MeteoStandardProviderStructure = Record<
  string,
  Record<string, MeteoProperty> | MeteoProperty
>;

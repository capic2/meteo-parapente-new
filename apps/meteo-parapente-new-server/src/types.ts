import { MeteoPropertyValueType } from '@meteo-parapente-new/common-types';

export type MeteoProperty = Record<string, MeteoPropertyValueType>;

export type MeteoStandardProviderStructure = Record<
  string,
  Record<string, MeteoProperty> | MeteoProperty
>;

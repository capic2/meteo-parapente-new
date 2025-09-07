import {
  MeteoPropertyWithSubPropertiesType,
  MeteoType,
} from '@meteo-parapente-new/common-types';

export function formatDateYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mois de 01 à 12
  const day = String(date.getDate()).padStart(2, '0'); // jour de 01 à 31
  return `${year}${month}${day}`;
}

export function isPropertyWithSubProperties(
  data: MeteoType['data'][number]
): data is MeteoPropertyWithSubPropertiesType {
  return 'properties' in data;
}

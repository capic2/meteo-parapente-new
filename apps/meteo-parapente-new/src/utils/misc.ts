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

export function formatedDateToDate(date: string | undefined): Date {
  if (!date) {
    return new Date();
  }

  return new Date(
    Number(date.substring(0, 4)),
    Number(date.substring(4, 6)) - 1,
    Number(date.substring(6, 8))
  );
}

export function isPropertyWithSubProperties(
  data: MeteoType['data'][number] | undefined
): data is MeteoPropertyWithSubPropertiesType {
  return data !== undefined && 'properties' in data;
}

export function meteoDataToRow(data: MeteoType['data']) {

  return data;
}

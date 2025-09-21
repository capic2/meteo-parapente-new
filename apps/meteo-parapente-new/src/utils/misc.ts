import {
  MeteoPropertyWithSubPropertiesType,
  MeteoType,
  StructureMeteoResponseType,
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
  data: MeteoType[number] | undefined,
  structure: StructureMeteoResponseType,
  key: string
): data is MeteoPropertyWithSubPropertiesType {
  return (
    !!data &&
    structure.properties.find((property) => property.id === key)?.properties !==
      undefined
  );
}

export function meteoDataToRow(data: MeteoType['data']) {
  return data;
}

import { StructureMeteoResponseType } from '@meteo-parapente-new/common-types';


export const buildHeader = (structure: StructureMeteoResponseType) => [
  { id: 'row', name: '', isRowHeader: true },
  ...structure.hourRanges.map((hourRange) => ({
    id: hourRange,
    name: hourRange,
    isRowHeader: false,
  })),
];

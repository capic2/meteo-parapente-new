import { FastifyInstance } from 'fastify';
import { getMeteoBlueData } from '../meteo/meteoBlue';
import {
  DataMeteoQueryInputType,
  MeteoType,
  SettingsResponseType,
  StructureMeteoResponseType,
} from '@meteo-parapente-new/common-types';
import { getMeteoParapenteData } from '../meteo/meteoParapente';
import { allSettledWithIds } from '../utils/promise';
import { MeteoStandardProviderStructure } from '../../types';
import 'dotenv/config';
import { providerTable } from '@meteo-parapente-new/database';

type BaseProperty = {
  id: string;
  label: string;
  type: 'number' | 'string';
  unit?: string;
  format?: Intl.NumberFormatOptions;
};

type ObjectProperty = {
  id: string;
  label: string;
  type: 'object';
  properties: Array<BaseProperty>;
};

type PropertyDefinitions = Array<BaseProperty | ObjectProperty>;

const handleProperty = ({
  provider,
  propertyId,
  subPropertyId,
  hourRange,
  type,
  format,
}: {
  provider: MeteoStandardProviderStructure | null | undefined;
  propertyId: string;
  subPropertyId?: string;
  hourRange: string;
  type: 'number' | 'string';
  format?: Intl.NumberFormatOptions;
}) => {
  if (!provider) {
    return '_';
  }

  const value = subPropertyId
    ? provider[propertyId] &&
      provider[propertyId][subPropertyId] &&
      // @ts-expect-error to fix
      provider[propertyId][subPropertyId][hourRange]
    : provider[propertyId] &&
      provider[propertyId] &&
      provider[propertyId][hourRange];

  if (!value) {
    return '_';
  }

  if (format === undefined || type === 'string') {
    return value;
  }

  return new Intl.NumberFormat('fr-Fr', format).format(value);
};

const propertyDefinitions: PropertyDefinitions = [
  {
    id: 'wind',
    label: 'app.meteo.wind',
    type: 'object',
    properties: [
      {
        id: 'direction',
        label: 'app.meteo.meteo-blue.wind.direction',
        type: 'string',
      },
      {
        id: 'speed',
        label: 'app.meteo.meteo-blue.wind.speed',
        type: 'number',
        format: {
          maximumFractionDigits: 2,
          unit: 'kilometer-per-hour',
        },
        unit: 'km/h',
      },
      {
        id: 'gust',
        label: 'app.meteo.meteo-blue.wind.gust',
        type: 'number',
        unit: 'km/h',
        format: {
          maximumFractionDigits: 2,
          unit: 'kilometer-per-hour',
        },
      },
    ],
  },
  {
    id: 'rain',
    label: 'app.meteo.rain',
    type: 'number',
    unit: 'mm',
  },
  {
    id: 'clouds',
    label: 'app.meteo.clouds',
    type: 'string',
  },
  {
    id: 'temperature',
    label: 'app.meteo.temperature',
    type: 'number',
    unit: '°C',
  },
];

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Reply: StructureMeteoResponseType }>(
    '/structure',
    async function () {
      const structure: StructureMeteoResponseType = {
        hourRanges: ['09-12', '12-16', '16-19'],
        properties: [
          {
            id: 'wind',
            label: 'app.meteo.wind',
            properties: [
              {
                id: 'direction',
                label: 'app.meteo.meteo-blue.wind.direction',
              },
              {
                id: 'speed',
                label: 'app.meteo.meteo-blue.wind.speed',
              },
              {
                id: 'gust',
                label: 'app.meteo.meteo-blue.wind.gust',
              },
            ],
          },
          {
            id: 'rain',
            label: 'app.meteo.rain',
          },
          {
            id: 'clouds',
            label: 'app.meteo.clouds',
          },
          {
            id: 'temperature',
            label: 'app.meteo.temperature',
          },
        ],
      };

      return structure;
    }
  );

  fastify.get<{
    Querystring: DataMeteoQueryInputType;
    Reply: MeteoType | null | string;
  }>('/meteo', async function (request) {
    /*const { lat, lon, startDate, propertyIds, hourRanges } =
      dataMeteoQueryOutputSchema.parse(request.query);*/
    const {
      lat,
      lon,
      startDate,
      propertyIds: propertyIdsString = 'wind,rain,clouds,temperature',
      hourRanges: hourRangesString = '09-12,12-16,16-19',
    } = request.query;

    const propertyIds = propertyIdsString.split(',');
    const hourRanges = hourRangesString.split(',');

    const date = new Date(
      new Date(
        Number(startDate.slice(0, 4)),
        Number(startDate.slice(4, 6)) - 1,
        Number(startDate.slice(6, 8))
      )
    );

    const meteoBlueDataPromise = getMeteoBlueData({
      latitude: lat,
      longitude: lon,
      hourRanges,
      date,
    });

    const meteoParapenteDataPromise = getMeteoParapenteData({
      latitude: lat,
      longitude: lon,
      hourRanges,
      date,
    });

    const results = await allSettledWithIds([
      { id: 'meteoBlue', promise: meteoBlueDataPromise },
      { id: 'meteoParapente', promise: meteoParapenteDataPromise },
    ]);

    const meteoBlueData = results.find(
      (result) => result.id === 'meteoBlue'
    )?.value;
    const meteoParapenteData = results.find(
      (result) => result.id === 'meteoParapente'
    )?.value;

    const meteoResponse: MeteoType = {};

    for (const propertyId of propertyIds) {
      const property = propertyDefinitions.find(
        (property) => property.id === propertyId
      );
      if (!property) {
        continue;
      }

      meteoResponse[propertyId] = {
        ...('unit' in property && { unit: property.unit }),
        ...(property.type === 'object'
          ? {
              properties: Object.fromEntries(
                property.properties.map((subProperty) => [
                  subProperty.id,
                  {
                    ...('unit' in subProperty && {
                      unit: subProperty.unit,
                    }),
                    ranges: Object.fromEntries(
                      hourRanges.map((hourRange) => [
                        hourRange,
                        {
                          meteoBlue: handleProperty({
                            provider: meteoBlueData,
                            propertyId,
                            subPropertyId: subProperty.id,
                            hourRange,
                            type: subProperty.type,
                            format: subProperty.format,
                          }),
                          meteoParapente: handleProperty({
                            provider: meteoParapenteData,
                            propertyId,
                            subPropertyId: subProperty.id,
                            hourRange,
                            type: subProperty.type,
                            format: subProperty.format,
                          }),
                        },
                      ])
                    ),
                  },
                ])
              ),
            }
          : {
              ranges: Object.fromEntries(
                hourRanges.map((hourRange) => [
                  hourRange,
                  {
                    meteoBlue: handleProperty({
                      provider: meteoBlueData,
                      propertyId,
                      hourRange,
                      type: property.type,
                      format: property.format,
                    }),
                    meteoParapente: handleProperty({
                      provider: meteoParapenteData,
                      propertyId,
                      hourRange,
                      type: property.type,
                      format: property.format,
                    }),
                  },
                ])
              ),
            }),
      };
    }

    return meteoResponse;
  });

  fastify.get<{ Reply: SettingsResponseType }>('/settings', async function () {
    const providers = fastify.db.select().from(providerTable).all();

    return {
      providers,
    };
  });
}

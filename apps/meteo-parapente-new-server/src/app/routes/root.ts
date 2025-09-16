import { FastifyInstance } from 'fastify';
import { getMeteoBlueData } from '../meteo/meteoBlue';
import {
  MeteoType,
  StructureMeteoQueryType,
  StructureMeteoResponseType,
} from '@meteo-parapente-new/common-types';
import { getMeteoParapenteData } from '../meteo/meteoParapente';
import { allSettledWithIds } from '../utils/promise';
import { MeteoStandardProviderStructure } from '../../types';

type BaseProperty = {
  label: string;
  type: 'number' | 'string';
  unit?: string;
  format?: Intl.NumberFormatOptions;
};

type ObjectProperty = {
  label: string;
  type: 'object';
  properties: Record<string, BaseProperty>;
};

type PropertyDefinition = Record<string, BaseProperty | ObjectProperty>;

const handleProperty = ({
  provider,
  key,
  propertyKey,
  hourRange,
  type,
  format,
}: {
  provider: MeteoStandardProviderStructure | null | undefined;
  key: string;
  propertyKey?: string;
  hourRange: string;
  type: 'number' | 'string';
  format?: Intl.NumberFormatOptions;
}) => {
  if (!provider) {
    return '_';
  }

  const value = propertyKey
    ? provider[key] &&
      provider[key][propertyKey] &&
      // @ts-expect-error to fix
      provider[key][propertyKey][hourRange]
    : provider[key] && provider[key] && provider[key][hourRange];

  if (!value) {
    return '_';
  }

  if (format === undefined || type === 'string') {
    return value;
  }

  return new Intl.NumberFormat('fr-Fr', format).format(value);
};

const propertyDefinitions = [
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
        properties:  [
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
    Body: StructureMeteoQueryType;
    Querystring: { lat: number; lon: number; startDate: string };
    Reply: MeteoType | null | string;
  }>('/meteo', async function (request) {
    const { lat, lon, startDate } = request.query;
    const { hourRanges, propertyIds } = request.body;

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
      hourRanges: hourRanges,
      date,
    });

    const meteoParapenteDataPromise = getMeteoParapenteData({
      latitude: lat,
      longitude: lon,
      hourRanges: hourRanges,
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

    const data: MeteoType['data'] = {};

    for (const [key, property] of Object.entries(properties)) {
      const dataProperty: MeteoType['data'][keyof MeteoType['data']] = {
        label: property.label,
        ...('unit' in property && { unit: property.unit }),
        ...(property.type === 'object'
          ? {
              properties: Object.fromEntries(
                Object.entries(property.properties).map(
                  ([propertyKey, propertyValue]) => [
                    propertyKey,
                    {
                      label: propertyValue.label,
                      ...('unit' in propertyValue && {
                        unit: propertyValue.unit,
                      }),
                      ranges: Object.fromEntries(
                        hourRanges.map((hourRange) => [
                          hourRange,
                          {
                            meteoBlue: handleProperty({
                              provider: meteoBlueData,
                              key,
                              propertyKey,
                              hourRange,
                              type: propertyValue.type,
                              format: propertyValue.format,
                            }),
                            meteoParapente: handleProperty({
                              provider: meteoParapenteData,
                              key,
                              propertyKey,
                              hourRange,
                              type: propertyValue.type,
                              format: propertyValue.format,
                            }),
                          },
                        ])
                      ),
                    },
                  ]
                )
              ),
            }
          : {
              ranges: Object.fromEntries(
                hourRanges.map((hourRange) => [
                  hourRange,
                  {
                    meteoBlue: handleProperty({
                      provider: meteoBlueData,
                      key,
                      hourRange,
                      type: property.type,
                      format: property.format,
                    }),
                    meteoParapente: handleProperty({
                      provider: meteoParapenteData,
                      key,
                      hourRange,
                      type: property.type,
                      format: property.format,
                    }),
                  },
                ])
              ),
            }),
      };
      data[key] = dataProperty;
    }
    const meteoResponse: MeteoType = {
      data,
    };

    return meteoResponse;
  });
}

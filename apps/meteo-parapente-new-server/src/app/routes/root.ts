import { FastifyInstance } from 'fastify';
import { getMeteoBlueData } from '../meteo/meteoBlue';
import { MeteoType } from '@meteo-parapente-new/common-types';
import { getMeteoParapenteData } from '../meteo/meteoParapente';
import { MeteoStandardProviderStructure } from '../../types';

export default async function (fastify: FastifyInstance) {
  fastify.get<{
    Querystring: { lat: number; lon: number, startDate: string };
    Reply: MeteoType | null | string;
  }>('/', async function (request, reply) {
    const { lat, lon, startDate } = request.query;
    const properties = {
      wind: {
        label: 'app.meteo.wind',
        properties: {
          direction: {
            label: 'app.meteo.meteo-blue.wind.direction',
          },
          speed: {
            label: 'app.meteo.meteo-blue.wind.speed',
            unit: 'km/h',
          },
          gust: {
            label: 'app.meteo.meteo-blue.wind.gust',
            unit: 'km/h',
          },
        },
      },
      rain: {
        label: 'app.meteo.rain',
        unit: 'mm',
      },
      clouds: {
        label: 'app.meteo.clouds',
      },
      temperature: {
        label: 'app.meteo.temperature',
        unit: '°C',
      },
    };

    //todo: récupérer les hourRanges depuis la query
    const hourRanges = ['09-12', '12-16', '16-19'];
    const date = new Date(startDate);

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

    let meteoBlueData: MeteoStandardProviderStructure | null = null;
    let meteoParapenteData: MeteoStandardProviderStructure | null = null;
    try {
      [meteoBlueData, meteoParapenteData] = await Promise.all([
        meteoBlueDataPromise,
        meteoParapenteDataPromise,
      ]);
    } catch (e) {
      if (e instanceof Error) {
        fastify.log.error(e.stack);
        return reply.code(500).send(JSON.stringify(e.message));
      }

      return reply.code(500);
    }

    if (!meteoBlueData || !meteoParapenteData) {
      return null;
    }

    const data: MeteoType['data'] = {};

    for (const [key, property] of Object.entries(properties)) {
      //@ts-expect-error to fix
      const dataProperty: MeteoType['data'][keyof MeteoType['data']] = {
        label: 'app.meteo.' + property.label,
        ...(key in meteoBlueData /*|| key in meteoParapenteData*/ && {
          ...('unit' in property && { unit: property.unit }),
          ...(!('properties' in property) && {
            ranges: Object.fromEntries(
              hourRanges.map((hourRange) => [
                hourRange,
                {
                  meteoBlue:
                    meteoBlueData[key] && meteoBlueData[key][hourRange],
                  meteoParapente:
                    meteoParapenteData[key] &&
                    meteoParapenteData[key][hourRange],
                },
              ])
            ),
          }),
          ...('properties' in property && {
            properties: Object.fromEntries(
              Object.entries(property['properties']).map(
                ([propertyKey, propertyValue]) => [
                  propertyKey,
                  {
                    label: 'app.meteo.' + propertyValue.label,
                    ...('unit' in property && { unit: property.unit }),
                    ranges: Object.fromEntries(
                      hourRanges.map((hourRange) => [
                        hourRange,
                        {
                          meteoBlue:
                            meteoBlueData[key] &&
                            meteoBlueData[key][propertyKey] &&
                            // @ts-expect-error to fix
                            meteoBlueData[key][propertyKey][hourRange],
                          meteoParapente:
                            meteoParapenteData[key] &&
                            meteoParapenteData[key][propertyKey] &&
                            // @ts-expect-error to fix
                            meteoParapenteData[key][propertyKey][hourRange],
                        },
                      ])
                    ),
                  },
                ]
              )
            ),
          }),
        }),
      };
      data[key] = dataProperty;
    }
    const meteoResponse: MeteoType = {
      structure: {
        hourRanges,
        properties: Object.keys(properties),
      },
      data,
    };

    return meteoResponse;
  });
}

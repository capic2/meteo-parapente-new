import { MeteoType } from '@meteo-parapente-new/common-types';
import { app } from './app/app';
import Fastify from 'fastify';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('main', () => {
  const server = Fastify({
    logger: true,
  });

  beforeAll(async () => {
    server.register(app);
    await server.listen();
  });

  afterAll(() => server.close());

  it('returns 200', async () => {
    const response = await server.inject(
      'http://localhost:3000/?lat=46.971161&lon=5.885981'
    );

    expect(response.statusCode).toBe(200);
  });

  it('returns data', async () => {
    const response = server.inject({
      method: 'GET',
      url:'/?lat=46.971161&lon=5.885981'}
    );

    const expected: MeteoType = {
      structure: {
        hourRanges: ['09-12', '12-16', '16-19'],
        properties: ['wind', 'rain'],
      },
      data: {
        wind: {
          label: 'app.meteo.wind',
          properties: {
            direction: {
              label: 'app.meteo.meteo-blue.wind.direction',
              ranges: {
                '09-12': {
                  meteoBlue: 'N',
                  meteoParapente: 'N',
                },
                '12-16': {
                  meteoBlue: 'N',
                  meteoParapente: 'N',
                },
                '16-19': {
                  meteoBlue: 'N',
                  meteoParapente: 'N',
                },
              },
            },
            speed: {
              label: 'app.meteo.meteo-blue.wind.speed',
              unit: 'km/h',
              ranges: {
                '09-12': {
                  meteoBlue: 2.5,
                  meteoParapente: 2.5,
                },
                '12-16': {
                  meteoBlue: 2.5,
                  meteoParapente: 2.5,
                },
                '16-19': {
                  meteoBlue: 2.5,
                  meteoParapente: 2.5,
                },
              },
            },
            gust: {
              label: 'app.meteo.meteo-blue.wind.gust',
              ranges: {
                '09-12': {
                  meteoBlue: 3.6,
                },
                '12-16': {
                  meteoBlue: 3.6,
                },
                '16-19': {
                  meteoBlue: 3.6,
                },
              },
            },
          },
        },
        rain: {
          label: 'app.meteo.rain',
          unit: 'mm',
          ranges: {
            '09-12': {
              meteoBlue: 0,
              meteoParapente: 0,
            },
            '12-16': {
              meteoBlue: 0,
              meteoParapente: 0,
            },
            '16-19': {
              meteoBlue: 0,
              meteoParapente: 0,
            },
          },
        },
      },
    };

    expect((await response).json()).toStrictEqual(expected);
  });
});

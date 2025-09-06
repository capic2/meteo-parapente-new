import { MeteoType } from '@meteo-parapente-new/common-types';
import { app } from './app/app';
import Fastify from 'fastify';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { pinoConfig } from './app/utils/logger';

describe('main', () => {
  const server = Fastify({
    logger: pinoConfig,
  });

  beforeAll(async () => {
    server.register(app);
    await server.listen();
  });

  afterAll(() => server.close());

  it('returns 200', async () => {
    const response = await server.inject(
      'http://localhost/?startDate=2025-08-19&lat=46.971161&lon=5.885981'
    );

    expect(response.statusCode).toBe(200);
  });

  it('returns data', async () => {
    const response = server.inject({
      method: 'GET',
      url: '/?startDate=2025-08-19&lat=46.971161&lon=5.885981',
    });

    const expected: MeteoType = {
      data: {
        clouds: {
          label: 'app.meteo.app.meteo.clouds',
        },
        rain: {
          label: 'app.meteo.app.meteo.rain',
          ranges: {
            '09-12': {
              meteoBlue: 0,
              meteoParapente: 0.3,
            },
            '12-16': {
              meteoBlue: 0.16,
              meteoParapente: 0.2,
            },
            '16-19': {
              meteoBlue: 1.53,
              meteoParapente: 4.1,
            },
          },
          unit: 'mm',
        },
        temperature: {
          label: 'app.meteo.app.meteo.temperature',
        },
        wind: {
          label: 'app.meteo.app.meteo.wind',
          properties: {
            direction: {
              label: 'app.meteo.app.meteo.meteo-blue.wind.direction',
              ranges: {
                '09-12': {
                  meteoBlue: ['S', 'W', 'W', 'SW'],
                  meteoParapente: ['E', 'NE', 'N', 'NE'],
                },
                '12-16': {
                  meteoBlue: ['SW', 'W', 'W', 'SW', 'SW'],
                  meteoParapente: ['NE', 'NE', 'NE', 'N', 'SW'],
                },
                '16-19': {
                  meteoBlue: ['SW', 'SW', 'SW', 'SW'],
                  meteoParapente: ['SW', 'SW', 'W', 'SW'],
                },
              },
            },
            gust: {
              label: 'app.meteo.app.meteo.meteo-blue.wind.gust',
              ranges: {
                '09-12': {
                  meteoBlue: 19.8,
                },
                '12-16': {
                  meteoBlue: 35.892,
                },
                '16-19': {
                  meteoBlue: 35.892,
                },
              },
            },
            speed: {
              label: 'app.meteo.app.meteo.meteo-blue.wind.speed',
              ranges: {
                '09-12': {
                  meteoBlue: 2.69,
                  meteoParapente: 10.63067260336805,
                },
                '12-16': {
                  meteoBlue: 5.22,
                  meteoParapente: 10.63067260336805,
                },
                '16-19': {
                  meteoBlue: 5.22,
                  meteoParapente: 20.969806866063408,
                },
              },
            },
          },
        },
      },
      structure: {
        hourRanges: ['09-12', '12-16', '16-19'],
        properties: ['wind', 'rain', 'clouds', 'temperature'],
      },
    };

    expect((await response).json()).toStrictEqual(expected);
  });
});

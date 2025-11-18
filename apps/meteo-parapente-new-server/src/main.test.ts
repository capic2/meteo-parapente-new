import {
  MeteoType,
  SettingsResponseType,
  StructureMeteoResponseType,
} from '@meteo-parapente-new/common-types';
import Fastify from 'fastify';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { pinoConfig } from './app/utils/logger';
import {
  closeTestDatabase,
  createTestDatabase,
} from '@meteo-parapente-new/database/test-utils';
import { makeApp } from './app/app';

describe('main', async () => {
  const server = Fastify({
    logger: pinoConfig,
  });
  const { sqlite, db } = await createTestDatabase();
  const app = await makeApp(db);

  beforeAll(async () => {
    server.register(app);
    await server.listen();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-08-19 00:00:00 GMT+2'));
  });

  afterAll(() => {
    closeTestDatabase(sqlite);
  });

  afterAll(() => {
    server.close();
    vi.useRealTimers();
  });

  describe('/structure', () => {
    it('returns 200', async () => {
      const response = await server.inject('/structure');
      expect(response.statusCode).toBe(200);
    });

    it('returns data', async () => {
      const response = server.inject({
        method: 'GET',
        url: '/structure',
      });

      const expected: StructureMeteoResponseType = {
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

      expect((await response).json()).toStrictEqual(expected);
    });
  });

  describe('/meteo', () => {
    it('returns 200', async () => {
      const response = server.inject({
        method: 'GET',
        url: '/meteo',
        query: {
          startDate: '20250819',
          lat: '46.971161',
          lon: '5.885981',
          propertyIds: 'wind,rain,clouds,temperature',
          hourRanges: '09-12,12-16,16-19',
        },
      });

      expect((await response).statusCode).toBe(200);
    });

    it('returns data', async () => {
      const response = server.inject({
        method: 'GET',
        url: '/meteo',
        query: {
          startDate: '20250819',
          lat: '46.971161',
          lon: '5.885981',
          propertyIds: 'wind,rain,clouds,temperature',
          hourRanges: '09-12,12-16,16-19',
        },
      });

      const expected: MeteoType = {
        clouds: {
          ranges: {
            '09-12': {
              meteoBlue: '_',
              meteoParapente: '_',
            },
            '12-16': {
              meteoBlue: '_',
              meteoParapente: '_',
            },
            '16-19': {
              meteoBlue: '_',
              meteoParapente: '_',
            },
          },
        },
        rain: {
          ranges: {
            '09-12': {
              meteoBlue: '_',
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
          ranges: {
            '09-12': {
              meteoBlue: '_',
              meteoParapente: '_',
            },
            '12-16': {
              meteoBlue: '_',
              meteoParapente: '_',
            },
            '16-19': {
              meteoBlue: '_',
              meteoParapente: '_',
            },
          },
          unit: '°C',
        },
        wind: {
          properties: {
            direction: {
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
              ranges: {
                '09-12': {
                  meteoBlue: '19,8',
                  meteoParapente: '_',
                },
                '12-16': {
                  meteoBlue: '35,89',
                  meteoParapente: '_',
                },
                '16-19': {
                  meteoBlue: '35,89',
                  meteoParapente: '_',
                },
              },
              unit: 'km/h',
            },
            speed: {
              ranges: {
                '09-12': {
                  meteoBlue: '2,69',
                  meteoParapente: '10,63',
                },
                '12-16': {
                  meteoBlue: '5,22',
                  meteoParapente: '10,63',
                },
                '16-19': {
                  meteoBlue: '5,22',
                  meteoParapente: '20,97',
                },
              },
              unit: 'km/h',
            },
          },
        },
      };

      expect((await response).json()).toStrictEqual(expected);
    });
  });

  describe('/settings', () => {

    it('returns 200', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/settings',
      });

      expect(response.statusCode).toBe(200);
    });

    it('returns data', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/settings',
      });

      const expected: SettingsResponseType = {
        providers: [
          {
            key: 'meteo-blue',
            name: 'Meteo Blue',
          },
          {
            key: 'meteo-parapente',
            name: 'Meteo Parapente',
          },
          {
            key: 'meteo-ciel',
            name: 'Meteo Ciel',
          },
        ],
      };

      expect(response.json()).toStrictEqual(expected);
    });
  });
});

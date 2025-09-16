import { describe } from 'vitest';
import { isPropertyWithSubProperties } from './misc';
import { meteoDataToRow } from './misc';
import meteoJson from '../../mocks/meteo.json' with { type: 'json' };

describe('misc', () => {
  describe('isPropertyWithSubProperties', () => {
    it('returns true if the property has sub properties', () => {
      expect(
        isPropertyWithSubProperties({
          label: 'wind',
          properties: { wind: { label: 'wind' } },
        })
      ).toBeTruthy();
    });

    it('returns false if the property does not have sub properties', () => {
      expect(
        isPropertyWithSubProperties({
          label: 'wind',
          unit: 'km/h',
        })
      ).toBeFalsy();
    });

    it('returns false if the property is not an object', () => {
      expect(isPropertyWithSubProperties(undefined)).toBeFalsy();
    });
  });
  describe('meteoDataToRow', () => {
    it('should return data', () => {
      const data = meteoDataToRow(meteoJson.data);

      const expected = {
        clouds: {
          label: 'app.meteo.clouds',
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
        rain: {
          label: 'app.meteo.rain',
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
          unit: 'mm',
        },
        temperature: {
          label: 'app.meteo.temperature',
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
          unit: '°C',
        },
        wind: {
          direction: {
            '09-12': [
              'E',
              'NE',
              'N',
              'NE',
            ],
            '12-16': [
              'NE',
              'NE',
              'NE',
              'N',
              'SW',
            ],
            '16-19': [
              'SW',
              'SW',
              'W',
              'SW',
            ],
          },
          gust: {
            '09-12': 3.6,
            '12-16': 3.6,
            '16-19': 20.969806866063408,
          },
          label: 'app.meteo.meteo-blue.wind.direction',
          speed: {
            '09-12': 2.69,
            '12-16': 2.69,
            '16-19': 5.22,
          },
          unit: 'km/h',
        },
      };

      expect(data).toStrictEqual(expected);
    });
  });
});
